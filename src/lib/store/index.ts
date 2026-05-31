import { isSupabaseConfigured } from "../supabase/client";
import { LocalStorageStore } from "./localStorageStore";
import type { ProfileStore } from "./store";
import { SupabaseStore } from "./supabaseStore";

export type { ProfileStore } from "./store";
export * from "./types";

/**
 * Единая точка выбора бэкенда хранилища.
 *
 * - Облачный Supabase сконфигурирован (есть NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)
 *   И мы на клиенте → SupabaseStore (синк профиля между устройствами).
 * - Иначе → LocalStorageStore (оффлайн, без сети, анонимный id).
 *
 * Остальной код приложения работает только через интерфейс ProfileStore
 * и не знает, какой бэкенд активен.
 */
let singleton: ProfileStore | null = null;

export function getProfileStore(): ProfileStore {
  if (singleton) return singleton;

  const onClient = typeof window !== "undefined";
  if (onClient && isSupabaseConfigured()) {
    try {
      singleton = new SupabaseStore();
      return singleton;
    } catch (e) {
      // Не удалось поднять облачный клиент — деградируем на localStorage,
      // чтобы приложение оставалось рабочим.
      console.warn("[store] Supabase недоступен, fallback на localStorage:", e);
    }
  }

  singleton = new LocalStorageStore();
  return singleton;
}
