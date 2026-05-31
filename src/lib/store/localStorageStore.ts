import type { ProfileStore } from "./store";
import { createEmptyProfile, type UserProfile } from "./types";

const KEY = "lingua-ai:profile:v1";

/** SSR-safe доступ к localStorage. На сервере вернёт null. */
function ls(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null; // приватный режим / отключённое хранилище
  }
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Фолбэк для старых рантаймов.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Хранилище профиля на localStorage. Бэкенд по умолчанию для v1:
 * работает оффлайн, без сети и без авторизации (анонимный id).
 */
export class LocalStorageStore implements ProfileStore {
  async load(): Promise<UserProfile | null> {
    const store = ls();
    if (!store) return null;
    const raw = store.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null; // битые данные — считаем что профиля нет
    }
  }

  async save(profile: UserProfile): Promise<void> {
    const store = ls();
    if (!store) return;
    store.setItem(KEY, JSON.stringify(profile));
  }

  async patch(partial: Partial<UserProfile>): Promise<UserProfile> {
    const now = new Date().toISOString();
    const current = (await this.load()) ?? createEmptyProfile(uuid(), now);
    const next: UserProfile = { ...current, ...partial, updatedAt: now };
    await this.save(next);
    return next;
  }

  async clear(): Promise<void> {
    const store = ls();
    if (!store) return;
    store.removeItem(KEY);
  }

  /** Получить профиль, создав пустой при первом заходе. */
  async getOrCreate(): Promise<UserProfile> {
    const existing = await this.load();
    if (existing) return existing;
    const now = new Date().toISOString();
    const fresh = createEmptyProfile(uuid(), now);
    await this.save(fresh);
    return fresh;
  }
}
