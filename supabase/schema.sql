-- Lingua-AI — схема БД (Supabase / Postgres).
-- Зеркалит src/lib/store/types.ts (Learner Model, docs/CONCEPT.md §3 Блок B).
-- Применять в SQL Editor нового Supabase-проекта или через миграции.
--
-- Стратегия v1: один корневой профиль на юзера (анонимная auth Supabase).
-- Вложенные структуры (skills, concept_scores, srs) храним как JSONB —
-- движок памяти их часто меняет целиком, реляционная нормализация пока
-- избыточна. Когда понадобится аналитика по айтемам — вынесем srs/events
-- в отдельные таблицы.

-- ── Профиль ученика ─────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id                uuid primary key default gen_random_uuid(),
  -- владелец строки = auth.uid() анонимной сессии Supabase
  user_id           uuid not null references auth.users (id) on delete cascade,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  -- имя для обращения (спрашиваем при знакомстве); null до онбординга
  name              text,
  -- { plan: free|premium, status, renewsAt } — тариф/статус оплаты
  subscription      jsonb not null default '{"plan":"free","status":"none","renewsAt":null}'::jsonb,

  onboarded         boolean not null default false,
  goal              text,
  cefr_level        text check (cefr_level in ('A1','A2','B1','B2','C1','C2')),

  -- { grammar, vocab, listening, reading, speaking } : 0..100
  skills            jsonb not null default
                      '{"grammar":0,"vocab":0,"listening":0,"reading":0,"speaking":0}'::jsonb,

  -- [{ topic, weight, lastSeen, mastery }]
  weak_topics       jsonb not null default '[]'::jsonb,

  -- rule-first | examples-first | context-story | contrast-native | null
  preferred_concept text check (
                      preferred_concept in
                      ('rule-first','examples-first','context-story','contrast-native')
                    ),

  -- { conceptId: { accuracy, retentionD1, n } }
  concept_scores    jsonb not null default '{}'::jsonb,

  -- [{ item, dueDate, ease, interval, reps,
  --    lastConcept, lastReviewed, retentionScored }]  (мостик к движку памяти)
  srs_queue         jsonb not null default '[]'::jsonb,

  -- { streak, bestStreak, lastActiveDate }  — честный daily-streak (мотивация)
  gamification      jsonb not null default '{"streak":0,"bestStreak":0,"lastActiveDate":null}'::jsonb,

  unique (user_id)
);

create index if not exists profiles_user_id_idx on public.profiles (user_id);

-- ── Миграция существующей таблицы (идемпотентно) ────────────────────────────
-- Добавляет name/subscription к уже созданной profiles. Безопасно гонять
-- повторно. До прогона приложение деградирует мягко (имя живёт в localStorage).
alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists subscription jsonb
  not null default '{"plan":"free","status":"none","renewsAt":null}'::jsonb;

-- ── Лог событий обучения (для накопления сигнала концепций / аналитики) ──────
-- Минимальный аппендли-лог. Pedagogy Engine читает его, чтобы считать
-- accuracy/retention по концепциям. Можно отключить, но дёшево держать.
create table if not exists public.learning_events (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  topic       text,
  concept     text,
  item        text,
  correct     boolean,
  payload     jsonb not null default '{}'::jsonb
);

create index if not exists learning_events_user_idx
  on public.learning_events (user_id, created_at desc);

-- ── updated_at автообновление ───────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ── Row Level Security: каждый видит только свои строки ──────────────────────
alter table public.profiles        enable row level security;
alter table public.learning_events enable row level security;

drop policy if exists "profiles_owner" on public.profiles;
create policy "profiles_owner" on public.profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "events_owner" on public.learning_events;
create policy "events_owner" on public.learning_events
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
