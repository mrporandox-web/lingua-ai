import type { SupabaseClient } from "@supabase/supabase-js";
import { ensureSession, getSupabaseClient } from "../supabase/client";
import type { ProfileStore } from "./store";
import {
  createEmptyProfile,
  type CefrLevel,
  type ConceptId,
  type ConceptScore,
  type Skills,
  type SrsItem,
  type UserProfile,
  type WeakTopic,
} from "./types";

/**
 * Облачное хранилище профиля на Supabase (Postgres + анонимная auth).
 *
 * Семантика идентификатора: UserProfile.id == auth.uid() анонимной сессии.
 * Одна строка profiles на юзера (unique(user_id) в схеме). Вложенные
 * структуры (skills/conceptScores/srsQueue/weakTopics) лежат в JSONB.
 *
 * Маппинг snake_case (БД) ↔ camelCase (TS) делают rowToProfile/profileToRow.
 */

/** Строка таблицы public.profiles. */
interface ProfileRow {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  onboarded: boolean;
  goal: string | null;
  cefr_level: CefrLevel | null;
  skills: Skills;
  weak_topics: WeakTopic[];
  preferred_concept: ConceptId | null;
  concept_scores: Record<ConceptId, ConceptScore>;
  srs_queue: SrsItem[];
}

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    id: row.user_id, // id ученика = владелец строки (auth.uid)
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    onboarded: row.onboarded,
    goal: row.goal,
    cefrLevel: row.cefr_level,
    skills: row.skills,
    weakTopics: row.weak_topics ?? [],
    preferredConcept: row.preferred_concept,
    conceptScores: row.concept_scores,
    srsQueue: row.srs_queue ?? [],
  };
}

/** Поля профиля → колонки upsert (без created_at/updated_at — их ведёт БД). */
function profileToRow(profile: UserProfile, userId: string) {
  return {
    user_id: userId,
    onboarded: profile.onboarded,
    goal: profile.goal,
    cefr_level: profile.cefrLevel,
    skills: profile.skills,
    weak_topics: profile.weakTopics,
    preferred_concept: profile.preferredConcept,
    concept_scores: profile.conceptScores,
    srs_queue: profile.srsQueue,
  };
}

export class SupabaseStore implements ProfileStore {
  private sb: SupabaseClient;

  constructor(client?: SupabaseClient) {
    const c = client ?? getSupabaseClient();
    if (!c) {
      throw new Error(
        "SupabaseStore: клиент не сконфигурирован (нет NEXT_PUBLIC_SUPABASE_* env)"
      );
    }
    this.sb = c;
  }

  /** uid анонимной сессии (поднимает её при необходимости). */
  private async uid(): Promise<string> {
    const id = await ensureSession();
    if (!id) {
      throw new Error(
        "SupabaseStore: нет анонимной сессии (включи Anonymous sign-ins в Supabase Auth)"
      );
    }
    return id;
  }

  async load(): Promise<UserProfile | null> {
    const userId = await this.uid();
    const { data, error } = await this.sb
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(`SupabaseStore.load: ${error.message}`);
    if (!data) return null;
    return rowToProfile(data as ProfileRow);
  }

  async save(profile: UserProfile): Promise<void> {
    const userId = await this.uid();
    const { error } = await this.sb
      .from("profiles")
      .upsert(profileToRow(profile, userId), { onConflict: "user_id" });
    if (error) throw new Error(`SupabaseStore.save: ${error.message}`);
  }

  async patch(partial: Partial<UserProfile>): Promise<UserProfile> {
    const userId = await this.uid();
    const now = new Date().toISOString();
    const current =
      (await this.load()) ?? createEmptyProfile(userId, now);
    const next: UserProfile = { ...current, ...partial, id: userId, updatedAt: now };
    await this.save(next);
    return next;
  }

  async clear(): Promise<void> {
    const userId = await this.uid();
    const { error } = await this.sb
      .from("profiles")
      .delete()
      .eq("user_id", userId);
    if (error) throw new Error(`SupabaseStore.clear: ${error.message}`);
  }

  /** Получить профиль, создав пустой при первом заходе. */
  async getOrCreate(): Promise<UserProfile> {
    const existing = await this.load();
    if (existing) return existing;
    const userId = await this.uid();
    const fresh = createEmptyProfile(userId, new Date().toISOString());
    await this.save(fresh);
    return fresh;
  }
}
