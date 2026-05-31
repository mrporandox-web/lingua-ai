import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase-клиент для браузера.
 *
 * Берётся из публичных env (NEXT_PUBLIC_*). Если ключей нет —
 * возвращает null, и слой данных падает на localStorage (см. store/index.ts).
 *
 * Auth: анонимная сессия Supabase. RLS-политики в supabase/schema.sql
 * привязаны к auth.uid(), поэтому каждому анонимному юзеру нужен токен —
 * поднимаем его лениво при первом обращении (ensureSession).
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Сконфигурирован ли облачный бэкенд (есть оба ключа). */
export function isSupabaseConfigured(): boolean {
  return Boolean(URL && ANON_KEY);
}

let singleton: SupabaseClient | null = null;

/** Синглтон-клиент или null, если env не заполнен. SSR-safe. */
export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null; // только на клиенте
  if (!isSupabaseConfigured()) return null;
  if (!singleton) {
    singleton = createClient(URL as string, ANON_KEY as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return singleton;
}

/**
 * Гарантировать анонимную сессию. Возвращает auth.uid() текущего юзера
 * или null, если клиент не сконфигурирован / auth не удалась.
 *
 * Анонимный логин нужно включить в Supabase Dashboard:
 *   Authentication → Sign In / Providers → Anonymous sign-ins → Enable.
 */
export async function ensureSession(): Promise<string | null> {
  const sb = getSupabaseClient();
  if (!sb) return null;

  const { data: sessionData } = await sb.auth.getSession();
  if (sessionData.session?.user) {
    return sessionData.session.user.id;
  }

  const { data, error } = await sb.auth.signInAnonymously();
  if (error || !data.user) {
    // Частая причина: анонимная auth выключена в проекте Supabase.
    console.warn("[supabase] anonymous sign-in failed:", error?.message);
    return null;
  }
  return data.user.id;
}
