// Аппенд-лог событий обучения (public.learning_events).
//
// Зачем отдельно от ProfileStore: профиль — это срез "что сейчас знаем про
// ученика" (перетираем целиком). События — это сырой поток "что произошло"
// (только добавляем), из которого позже считаем аналитику и калибруем движок
// памяти. Разные жизненные циклы → разные контракты.
//
// На localStorage-бэкенде лог — тихий no-op: события нужны для серверной
// аналитики, локально их копить смысла нет. Сервис обучения вызывает логгер
// «вслепую», не зная активный бэкенд (см. learning/session.ts).

import { ensureSession, getSupabaseClient } from "../supabase/client";
import type { ConceptId } from "./types";

/** Одно событие обучения — то, что реально произошло на уроке. */
export interface LearningEvent {
  topic: string; // тема, напр. "present-continuous"
  concept: ConceptId; // какой концепцией показывали
  item: string; // id айтема (слово/правило/паттерн)
  correct: boolean; // верно ли ответил
  payload?: Record<string, unknown>; // доп. контекст (ms, level, hintsUsed...)
}

/** Логгер событий: куда-то складывает поток. Реализация зависит от бэкенда. */
export interface EventLog {
  /** Записать событие. Не бросает наружу — лог не должен ронять урок. */
  append(event: LearningEvent): Promise<void>;
}

/** No-op логгер (localStorage / SSR): события не копим. */
class NoopEventLog implements EventLog {
  async append(): Promise<void> {
    // намеренно ничего не делаем
  }
}

/** Supabase-логгер: insert в public.learning_events под текущим anon-uid. */
class SupabaseEventLog implements EventLog {
  async append(event: LearningEvent): Promise<void> {
    const sb = getSupabaseClient();
    if (!sb) return; // клиента нет — деградируем молча
    const userId = await ensureSession();
    if (!userId) return; // нет сессии — событие просто теряем, урок не роняем

    const { error } = await sb.from("learning_events").insert({
      user_id: userId,
      topic: event.topic,
      concept: event.concept,
      item: event.item,
      correct: event.correct,
      payload: event.payload ?? {},
    });
    // Лог — побочный поток: сетевой сбой не должен прерывать обучение.
    if (error) console.warn("[eventLog] append failed:", error.message);
  }
}

let singleton: EventLog | null = null;

/**
 * Активный логгер событий. Supabase, если облако сконфигурировано и мы на
 * клиенте; иначе no-op. Симметрично выбору бэкенда в store/index.ts.
 */
export function getEventLog(): EventLog {
  if (singleton) return singleton;
  const onClient = typeof window !== "undefined";
  singleton =
    onClient && getSupabaseClient() ? new SupabaseEventLog() : new NoopEventLog();
  return singleton;
}
