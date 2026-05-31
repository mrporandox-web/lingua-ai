import type { UserProfile } from "./types";

/**
 * Контракт слоя данных. Реализуется адаптерами:
 *   - LocalStorageStore (v1, оффлайн, без бэкенда)
 *   - SupabaseStore (Фаза 2+, облако)
 * Смена бэкенда = смена одной реализации, остальной код не трогаем.
 */
export interface ProfileStore {
  /** Прочитать профиль текущего ученика, или null если ещё нет. */
  load(): Promise<UserProfile | null>;

  /** Записать профиль целиком (перетирает). */
  save(profile: UserProfile): Promise<void>;

  /** Частично обновить профиль; обновляет updatedAt автоматически. */
  patch(partial: Partial<UserProfile>): Promise<UserProfile>;

  /** Удалить профиль (выход/сброс прогресса). */
  clear(): Promise<void>;

  /** Прочитать профиль, создав пустой при первом заходе. */
  getOrCreate(): Promise<UserProfile>;
}
