# Lyra Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the working Lingua-AI app as Lyra and apply the approved Lyra visual design while preserving all existing diagnostics, course, lesson, TTS, SRS, profile, and storage mechanics.

**Architecture:** Keep the current Next.js app as the production base. Add a focused `src/components/lyra/` design-system layer, then restyle the existing feature screens route by route. Pure course/branding helpers get unit tests; visual integration is verified through build plus browser screenshots.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4 global CSS, Vitest node tests, existing localStorage/Supabase store abstraction, existing Gemini TTS and Claude generation APIs.

---

## File Structure

Create:

- `src/lib/brand.ts` — shared Lyra product constants and English-only language option.
- `src/lib/brand.test.ts` — verifies brand and language invariants.
- `src/components/lyra/LyraShell.tsx` — phone shell, background, main scroll area.
- `src/components/lyra/LyraPrimitives.tsx` — reusable Orb, Card, Chip, ProgressBar, Ring, and small icon helpers.
- `src/components/lyra/LyraBottomNav.tsx` — bottom navigation for main app routes.
- `src/components/lyra/index.ts` — design-system exports.
- `src/components/course/sky.ts` — pure mapping from curriculum/progress state to sky sections and stars.
- `src/components/course/sky.test.ts` — verifies ready/current/soon star mapping.
- `src/app/talk/page.tsx` — Lyra-styled "speaking soon" route.
- `src/components/talk/TalkSoonScreen.tsx` — honest soon screen for the Talk tab.

Modify:

- `src/app/layout.tsx` — Lyra metadata title/description.
- `src/app/manifest.ts` — Lyra PWA name/short_name.
- `src/app/globals.css` — replace old aurora/neon UI with Lyra tokens and component classes; preserve functional classes used by lesson/diagnostics until converted.
- `src/components/Backdrop.tsx` — either keep as compatibility wrapper around Lyra background or stop importing it where replaced.
- `src/components/home/HomeScreen.tsx` — Lyra onboarding with English-only selection and existing profile write.
- `src/components/diagnostics/DiagnosticsScreen.tsx` — Lyra placement-test styling, same placement engine.
- `src/components/course/CourseScreen.tsx` — sky/constellation view backed by real curriculum/progress.
- `src/components/lesson/LessonScreen.tsx` — Lyra lesson styling, same sentence-builder mechanics and learning calls.
- `src/components/profile/ProfileScreen.tsx` — Lyra profile styling, same profile data.
- `src/app/course/page.tsx`, `src/app/profile/page.tsx`, `src/app/diagnostics/page.tsx`, `src/app/lesson/page.tsx` — wrap screens consistently with Lyra shell where needed.

Do not modify:

- `/Users/exz/Downloads/Ai Techer`.
- `src/lib/lesson/content*.ts` except if tests reveal an existing non-visual issue.
- `src/lib/learning/session.ts`.
- `src/lib/store/*`.
- `src/lib/tts/*`.
- API routes, unless build exposes a brand-only type issue.

---

## Task 1: Brand Constants And Metadata

**Files:**
- Create: `src/lib/brand.ts`
- Create: `src/lib/brand.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/manifest.ts`

- [ ] **Step 1: Write the failing brand test**

Create `src/lib/brand.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  APP_NAME,
  APP_DESCRIPTION,
  TARGET_LANGUAGE,
  LANGUAGE_OPTIONS,
} from "./brand";

describe("Lyra brand constants", () => {
  it("uses Lyra as the app brand", () => {
    expect(APP_NAME).toBe("Lyra");
    expect(APP_DESCRIPTION).toContain("AI-репетитор");
  });

  it("offers only English for now", () => {
    expect(TARGET_LANGUAGE).toEqual({
      id: "en",
      nameRu: "Английский",
      nameEn: "English",
      greeting: "Hello!",
    });
    expect(LANGUAGE_OPTIONS).toEqual([TARGET_LANGUAGE]);
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
pnpm test src/lib/brand.test.ts
```

Expected: FAIL because `src/lib/brand.ts` does not exist.

- [ ] **Step 3: Add the brand module**

Create `src/lib/brand.ts`:

```ts
export const APP_NAME = "Lyra";

export const APP_DESCRIPTION =
  "AI-репетитор английского, который запоминает, как тебе удобнее учиться.";

export const TARGET_LANGUAGE = {
  id: "en",
  nameRu: "Английский",
  nameEn: "English",
  greeting: "Hello!",
} as const;

export const LANGUAGE_OPTIONS = [TARGET_LANGUAGE] as const;
```

- [ ] **Step 4: Update metadata and manifest**

In `src/app/layout.tsx`, import the constants:

```ts
import { APP_DESCRIPTION, APP_NAME } from "@/lib/brand";
```

Set metadata values:

```ts
export const metadata: Metadata = {
  title: `${APP_NAME} — персональный AI-репетитор английского`,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  formatDetection: { telephone: false },
};
```

In `src/app/manifest.ts`, import the constants:

```ts
import { APP_DESCRIPTION, APP_NAME } from "@/lib/brand";
```

Set:

```ts
name: `${APP_NAME} — персональный AI-репетитор английского`,
short_name: APP_NAME,
description: APP_DESCRIPTION,
```

- [ ] **Step 5: Verify**

Run:

```bash
pnpm test src/lib/brand.test.ts
pnpm lint
```

Expected: PASS. No lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/brand.ts src/lib/brand.test.ts src/app/layout.tsx src/app/manifest.ts
git commit -m "feat: rebrand app as Lyra"
```

---

## Task 2: Lyra Design-System Primitives

**Files:**
- Create: `src/components/lyra/LyraShell.tsx`
- Create: `src/components/lyra/LyraPrimitives.tsx`
- Create: `src/components/lyra/LyraBottomNav.tsx`
- Create: `src/components/lyra/index.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the shell component**

Create `src/components/lyra/LyraShell.tsx`:

```tsx
import type { ReactNode } from "react";

interface LyraShellProps {
  children: ReactNode;
  withBottomNav?: ReactNode;
  className?: string;
}

export function LyraShell({ children, withBottomNav, className = "" }: LyraShellProps) {
  return (
    <div className={`lyra-stage ${className}`}>
      <div className="lyra-phone">
        <div className="lyra-screen">
          <LyraBackground />
          <main className="lyra-view">{children}</main>
          {withBottomNav}
          <div className="lyra-home-ind" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function LyraBackground() {
  return (
    <div className="lyra-bg" aria-hidden>
      <span className="lyra-star s1" />
      <span className="lyra-star s2" />
      <span className="lyra-star s3" />
    </div>
  );
}
```

- [ ] **Step 2: Add primitives**

Create `src/components/lyra/LyraPrimitives.tsx`:

```tsx
import type { CSSProperties, ReactNode } from "react";

export function LyraCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={`lyra-card ${className}`} style={style}>
      {children}
    </section>
  );
}

export function LyraChip({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "cool" | "neutral";
  className?: string;
}) {
  return <span className={`lyra-chip ${tone} ${className}`}>{children}</span>;
}

export function LyraOrb({ size = 54, cool = false }: { size?: number; cool?: boolean }) {
  return (
    <span
      className={`lyra-orb${cool ? " cool" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}

export function LyraProgress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="lyra-progress">
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}

export function LyraRing({
  value,
  children,
}: {
  value: number;
  children: ReactNode;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className="lyra-ring" style={{ ["--ring" as string]: `${pct}%` }}>
      <div className="lyra-ring-inner">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Add bottom navigation**

Create `src/components/lyra/LyraBottomNav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/course", label: "Небо", icon: "✦" },
  { href: "/lesson", label: "Урок", icon: "▣" },
  { href: "/talk", label: "Разговор", icon: "◉" },
  { href: "/profile", label: "Профиль", icon: "○" },
] as const;

export function LyraBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lyra-nav" aria-label="Основная навигация">
      {NAV.map((item) => {
        const active =
          item.href === "/lesson"
            ? pathname.startsWith("/lesson")
            : pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`lyra-nav-btn${active ? " on" : ""}`}>
            <span className="lyra-nav-ico" aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Export primitives**

Create `src/components/lyra/index.ts`:

```ts
export { LyraBackground, LyraShell } from "./LyraShell";
export { LyraBottomNav } from "./LyraBottomNav";
export { LyraCard, LyraChip, LyraOrb, LyraProgress, LyraRing } from "./LyraPrimitives";
```

- [ ] **Step 5: Add global Lyra CSS**

Append the Lyra base section to `src/app/globals.css` before route-specific screen styles:

```css
:root {
  --lyra-ink: #08080c;
  --lyra-surface: #131320;
  --lyra-surface-2: #1a1a2a;
  --lyra-surface-3: #232336;
  --lyra-line: rgba(255, 255, 255, 0.08);
  --lyra-text: #f3f0e9;
  --lyra-muted: #aca9be;
  --lyra-dim: #6f6c84;
  --lyra-gold: #efc079;
  --lyra-gold-2: #f4a85c;
  --lyra-gold-deep: #c8893f;
  --lyra-cool: #8fa8ff;
  --lyra-cool-2: #b79bff;
  --lyra-good: #7fd9a6;
  --lyra-bad: #ff8b82;
  --lyra-display: var(--font-sora), var(--font-inter), sans-serif;
}

.lyra-stage {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: radial-gradient(1000px 680px at 30% -10%, #15131f, transparent 60%), var(--lyra-ink);
  color: var(--lyra-text);
}

.lyra-phone {
  position: relative;
  width: min(100vw, 430px);
  min-height: 100dvh;
  background: var(--lyra-ink);
  overflow: hidden;
}

.lyra-screen {
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  isolation: isolate;
}

.lyra-view {
  position: relative;
  z-index: 1;
  min-height: 100dvh;
  overflow-y: auto;
  padding: 58px 22px 110px;
}

.lyra-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 18% 12%, rgba(255,255,255,.55), transparent),
    radial-gradient(1.2px 1.2px at 72% 8%, rgba(255,255,255,.4), transparent),
    radial-gradient(1.6px 1.6px at 88% 40%, rgba(239,192,121,.3), transparent);
}

.lyra-star {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255,255,255,.5);
}
.lyra-star.s1 { left: 18%; top: 22%; }
.lyra-star.s2 { right: 20%; top: 14%; }
.lyra-star.s3 { left: 63%; bottom: 18%; }

.lyra-card {
  border: 1px solid var(--lyra-line);
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
  backdrop-filter: blur(8px);
}

.lyra-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  padding: 7px 13px;
  font-size: 12.5px;
  font-weight: 800;
  white-space: nowrap;
}
.lyra-chip.gold { color: var(--lyra-gold); background: rgba(239,192,121,.13); box-shadow: inset 0 0 0 1px rgba(239,192,121,.32); }
.lyra-chip.cool { color: var(--lyra-cool); background: rgba(143,168,255,.13); box-shadow: inset 0 0 0 1px rgba(143,168,255,.32); }
.lyra-chip.neutral { color: var(--lyra-text); background: var(--lyra-surface-2); box-shadow: inset 0 0 0 1px var(--lyra-line); }

.lyra-orb {
  display: inline-block;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #fff 0%, var(--lyra-gold) 22%, var(--lyra-gold-2) 52%, var(--lyra-gold-deep) 100%);
  box-shadow: 0 0 0 1px rgba(255,255,255,.25) inset, 0 8px 30px -6px rgba(239,192,121,.45);
}
.lyra-orb.cool {
  background: radial-gradient(circle at 32% 28%, #fff 0%, var(--lyra-cool) 26%, var(--lyra-cool-2) 60%, #5d54b8 100%);
  box-shadow: 0 0 0 1px rgba(255,255,255,.25) inset, 0 8px 30px -6px rgba(143,168,255,.4);
}

.lyra-progress {
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--lyra-surface-2);
}
.lyra-progress i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--lyra-gold-2), var(--lyra-gold));
  transition: width .4s ease;
}

.lyra-ring {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(var(--lyra-gold) var(--ring), rgba(255,255,255,.12) 0);
}
.lyra-ring-inner {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--lyra-ink);
}

.lyra-nav {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  z-index: 30;
  height: 68px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(16,16,26,.78);
  backdrop-filter: blur(20px) saturate(1.3);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 18px 40px -16px rgba(0,0,0,.8);
}
.lyra-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: var(--lyra-dim);
  font-size: 10px;
  font-weight: 800;
  text-decoration: none;
}
.lyra-nav-btn.on { color: var(--lyra-gold); }
.lyra-nav-ico { font-size: 22px; line-height: 1; }

.lyra-home-ind {
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 134px;
  height: 5px;
  transform: translateX(-50%);
  border-radius: 3px;
  background: rgba(255,255,255,.25);
  z-index: 50;
  pointer-events: none;
}

@media (min-width: 600px) {
  .lyra-stage { padding: 28px 16px; }
  .lyra-phone {
    width: 390px;
    min-height: 844px;
    border-radius: 52px;
    box-shadow:
      0 0 0 2px rgba(255,255,255,.04),
      0 0 0 11px #0b0b11,
      0 50px 120px -30px rgba(0,0,0,.9);
  }
  .lyra-screen { min-height: 844px; border-radius: 46px; }
  .lyra-view { min-height: 844px; }
}
```

- [ ] **Step 6: Verify**

Run:

```bash
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/lyra src/app/globals.css
git commit -m "feat: add Lyra design primitives"
```

---

## Task 3: Lyra Onboarding And English-Only Selection

**Files:**
- Modify: `src/components/home/HomeScreen.tsx`

- [ ] **Step 1: Update imports**

Add:

```ts
import { APP_NAME, LANGUAGE_OPTIONS, TARGET_LANGUAGE } from "@/lib/brand";
import { LyraCard, LyraChip, LyraOrb, LyraShell } from "@/components/lyra";
```

- [ ] **Step 2: Replace the old layout with Lyra onboarding**

Keep the existing `name`, `onboarded`, `input`, profile loading effect, and `start()` function. Replace the JSX return with:

```tsx
return (
  <LyraShell>
    <div className="lyra-onboarding">
      <div className="lyra-ob-hero">
        <LyraOrb size={118} />
        <div className="lyra-brand">{APP_NAME}</div>
        <p className="lyra-muted">
          AI-наставник по английскому, который запоминает, как тебе удобнее учиться.
        </p>
      </div>

      {known ? (
        <LyraCard className="lyra-ob-card">
          <LyraChip tone="gold">С возвращением</LyraChip>
          <h1 className="lyra-title">{name}, продолжим небо?</h1>
          <p className="lyra-muted">
            Я помню твой уровень, слабые темы и стиль подачи, который тебе подходит.
          </p>
          <Link
            href={onboarded ? "/course" : "/diagnostics"}
            className="lyra-btn primary"
          >
            {onboarded ? "Продолжить учиться" : "Пройти диагностику"}
          </Link>
        </LyraCard>
      ) : (
        <LyraCard className="lyra-ob-card">
          <LyraChip tone="cool">Язык</LyraChip>
          <h1 className="lyra-title">Какой язык зажигаем?</h1>
          <div className="lyra-language-grid">
            {LANGUAGE_OPTIONS.map((lang) => (
              <button key={lang.id} className="lyra-language selected" type="button">
                <span>{lang.greeting}</span>
                <small>{lang.nameRu} · {lang.nameEn}</small>
              </button>
            ))}
          </div>
          <input
            className="lyra-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            placeholder="Как тебя зовут?"
            maxLength={40}
            aria-label="Твоё имя"
          />
          <button className="lyra-btn primary" onClick={start}>
            {input.trim()
              ? `Начать ${TARGET_LANGUAGE.nameRu.toLowerCase()}`
              : "Пропустить и начать"}
          </button>
        </LyraCard>
      )}
    </div>
  </LyraShell>
);
```

- [ ] **Step 3: Add onboarding CSS**

Add classes to `src/app/globals.css`:

```css
.lyra-onboarding { min-height: calc(100dvh - 168px); display: flex; flex-direction: column; justify-content: center; gap: 28px; }
.lyra-ob-hero { text-align: center; display: grid; place-items: center; gap: 14px; }
.lyra-brand { font-family: var(--lyra-display); font-size: 46px; font-weight: 800; letter-spacing: 0; }
.lyra-title { font-family: var(--lyra-display); font-size: 28px; line-height: 1.1; font-weight: 800; letter-spacing: 0; margin: 14px 0 10px; }
.lyra-muted { color: var(--lyra-muted); font-size: 15px; line-height: 1.5; letter-spacing: 0; }
.lyra-ob-card { padding: 20px; }
.lyra-language-grid { display: grid; gap: 10px; margin: 18px 0 14px; }
.lyra-language { text-align: left; border-radius: 18px; padding: 16px; background: rgba(239,192,121,.1); border: 1px solid rgba(239,192,121,.4); color: var(--lyra-text); }
.lyra-language span { display: block; font-family: var(--lyra-display); font-size: 20px; font-weight: 800; }
.lyra-language small { display: block; margin-top: 4px; color: var(--lyra-muted); font-weight: 800; }
.lyra-input { width: 100%; border: 1px solid var(--lyra-line); border-radius: 18px; padding: 15px 16px; margin-top: 4px; background: var(--lyra-surface-2); color: var(--lyra-text); font: inherit; }
.lyra-btn { display: flex; width: 100%; justify-content: center; align-items: center; min-height: 54px; border-radius: 18px; margin-top: 14px; font-weight: 900; text-decoration: none; border: 0; cursor: pointer; }
.lyra-btn.primary { color: #1c1305; background: linear-gradient(180deg, #f6ce8c, var(--lyra-gold), var(--lyra-gold-2)); box-shadow: 0 14px 34px -12px rgba(239,192,121,.45); }
```

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test src/lib/brand.test.ts
pnpm lint
pnpm build
```

Expected: PASS. Build route `/` succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HomeScreen.tsx src/app/globals.css
git commit -m "feat: add Lyra onboarding"
```

---

## Task 4: Course Sky Mapping

**Files:**
- Create: `src/components/course/sky.ts`
- Create: `src/components/course/sky.test.ts`
- Modify: `src/components/course/CourseScreen.tsx`

- [ ] **Step 1: Write the failing pure mapping test**

Create `src/components/course/sky.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createEmptyProfile } from "@/lib/store/types";
import { buildCourseSky } from "./sky";

describe("buildCourseSky", () => {
  it("maps curriculum sections to Lyra constellations", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);

    expect(sky.sections.map((s) => s.cefr)).toEqual(["A1", "A2", "B1"]);
    expect(sky.total).toBe(48);
    expect(sky.ready).toBe(36);
    expect(sky.sections[0].units).toHaveLength(4);
    expect(sky.sections[2].units[0].stars.map((s) => s.id)).toEqual([
      "zero-conditional",
      "second-conditional",
      "wish-past",
      "unless",
    ]);
  });

  it("marks the first unmastered ready topic as current and soon topics as soon", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);
    const a1First = sky.sections[0].units[0].stars[0];
    const b1Soon = sky.sections[2].units[1].stars[0];

    expect(a1First.state).toBe("current");
    expect(b1Soon.id).toBe("present-perfect-continuous");
    expect(b1Soon.state).toBe("soon");
    expect(b1Soon.playable).toBe(false);
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
pnpm test src/components/course/sky.test.ts
```

Expected: FAIL because `sky.ts` does not exist.

- [ ] **Step 3: Implement `buildCourseSky`**

Create `src/components/course/sky.ts`:

```ts
import type { UserProfile } from "@/lib/store/types";
import { SECTIONS, unitsOfSection, getTopic } from "@/lib/course/curriculum";
import {
  courseProgress,
  isTopicPlayable,
  readyShare,
  topicMastery,
  topicStates,
  type TopicState,
  unitProgress,
} from "@/lib/course/progress";

export interface CourseSkyStar {
  id: string;
  title: string;
  blurb: string;
  state: TopicState;
  mastery: number;
  playable: boolean;
}

export interface CourseSkyUnit {
  id: string;
  title: string;
  subtitle: string;
  done: number;
  total: number;
  stars: CourseSkyStar[];
}

export interface CourseSkySection {
  cefr: string;
  title: string;
  units: CourseSkyUnit[];
}

export interface CourseSky {
  done: number;
  total: number;
  ready: number;
  sections: CourseSkySection[];
}

export function buildCourseSky(profile: UserProfile): CourseSky {
  const states = topicStates(profile);
  const progress = courseProgress(profile);
  const ready = readyShare();
  return {
    done: progress.done,
    total: progress.total,
    ready: ready.ready,
    sections: SECTIONS.map((section) => ({
      cefr: section.cefr,
      title: section.title,
      units: unitsOfSection(section).map((unit) => {
        const up = unitProgress(profile, unit.id);
        return {
          id: unit.id,
          title: unit.title,
          subtitle: unit.subtitle,
          done: up.done,
          total: up.total,
          stars: unit.topicIds
            .map((id) => {
              const topic = getTopic(id);
              if (!topic) return null;
              const state = states.get(id) ?? "soon";
              return {
                id,
                title: topic.title,
                blurb: topic.blurb,
                state,
                mastery: topicMastery(profile, id),
                playable: isTopicPlayable(state),
              };
            })
            .filter((s): s is CourseSkyStar => s !== null),
        };
      }),
    })),
  };
}
```

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test src/components/course/sky.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/course/sky.ts src/components/course/sky.test.ts
git commit -m "test: cover Lyra course sky mapping"
```

---

## Task 5: Lyra Course Sky Screen

**Files:**
- Modify: `src/components/course/CourseScreen.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `CourseScreen` imports**

Use:

```ts
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LyraBottomNav, LyraCard, LyraChip, LyraOrb, LyraShell } from "@/components/lyra";
import { getProfileStore } from "@/lib/store";
import { createEmptyProfile, type UserProfile } from "@/lib/store/types";
import { buildCourseSky } from "./sky";
```

- [ ] **Step 2: Replace list rendering with sky rendering**

Keep profile loading and `baseProfile`. Use this JSX shape:

```tsx
const sky = useMemo(() => buildCourseSky(baseProfile), [baseProfile]);
const current = sky.sections
  .flatMap((s) => s.units)
  .flatMap((u) => u.stars)
  .find((s) => s.state === "current");

return (
  <LyraShell withBottomNav={<LyraBottomNav />}>
    <div className="lyra-course-head">
      <div>
        <p className="lyra-eyebrow">Твоё небо</p>
        <h1 className="lyra-title">Курс английского</h1>
      </div>
      <LyraChip tone="gold">{sky.done}/{sky.total}</LyraChip>
    </div>

    <LyraCard className="lyra-reco">
      <div className="lyra-reco-top">
        <LyraOrb size={42} />
        <div>
          <p className="lyra-eyebrow gold">Lyra советует</p>
          <p className="lyra-muted">следующая звезда в твоём курсе</p>
        </div>
      </div>
      <h2>{current ? current.title : "Все готовые темы пройдены"}</h2>
      <p className="lyra-muted">{current ? current.blurb : "Можно повторить любую тему."}</p>
      {current && (
        <button className="lyra-btn primary" onClick={() => router.push(`/lesson?topic=${current.id}`)}>
          Зажечь звезду
        </button>
      )}
    </LyraCard>

    <p className="lyra-muted lyra-ready-note">
      Готово {sky.ready} из {sky.total} тем. Остальные появятся по мере наполнения.
    </p>

    {sky.sections.map((section) => (
      <section key={section.cefr} className="lyra-constellation">
        <div className="lyra-section-head">
          <p className="lyra-eyebrow">{section.cefr}</p>
          <h2>{section.title}</h2>
        </div>
        {section.units.map((unit) => (
          <LyraCard className="lyra-unit" key={unit.id}>
            <div className="lyra-unit-head">
              <div>
                <h3>{unit.title}</h3>
                <p>{unit.subtitle}</p>
              </div>
              <LyraChip tone="neutral">{unit.done}/{unit.total}</LyraChip>
            </div>
            <div className="lyra-stars">
              {unit.stars.map((star) => (
                <button
                  key={star.id}
                  className={`lyra-star-btn ${star.state}`}
                  disabled={!star.playable}
                  onClick={() => star.playable && router.push(`/lesson?topic=${star.id}`)}
                >
                  <span className="lyra-star-dot" />
                  <span>{star.title}</span>
                  <small>{star.state === "soon" ? "скоро" : star.blurb}</small>
                </button>
              ))}
            </div>
          </LyraCard>
        ))}
      </section>
    ))}
  </LyraShell>
);
```

- [ ] **Step 3: Add course CSS**

Add:

```css
.lyra-course-head, .lyra-reco-top, .lyra-section-head, .lyra-unit-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.lyra-eyebrow { color: var(--lyra-dim); font-size: 11px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
.lyra-eyebrow.gold { color: var(--lyra-gold); }
.lyra-reco { margin-top: 18px; padding: 20px; overflow: hidden; }
.lyra-reco h2 { font-family: var(--lyra-display); font-size: 24px; line-height: 1.12; margin-top: 16px; letter-spacing: 0; }
.lyra-ready-note { margin: 12px 0 24px; text-align: center; font-size: 12.5px; }
.lyra-constellation { margin-top: 26px; }
.lyra-section-head h2 { font-family: var(--lyra-display); font-size: 20px; letter-spacing: 0; }
.lyra-unit { margin-top: 14px; padding: 16px; }
.lyra-unit-head h3 { font-size: 16px; font-weight: 900; }
.lyra-unit-head p { color: var(--lyra-muted); font-size: 12.5px; margin-top: 3px; }
.lyra-stars { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
.lyra-star-btn { min-height: 108px; border-radius: 18px; border: 1px solid var(--lyra-line); background: rgba(255,255,255,.035); color: var(--lyra-text); padding: 12px; text-align: left; display: flex; flex-direction: column; gap: 7px; }
.lyra-star-btn:disabled { opacity: .42; }
.lyra-star-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--lyra-surface-3); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
.lyra-star-btn.done .lyra-star-dot, .lyra-star-btn.current .lyra-star-dot { background: var(--lyra-gold); box-shadow: 0 0 18px rgba(239,192,121,.45); }
.lyra-star-btn.current { border-color: rgba(239,192,121,.42); }
.lyra-star-btn span:not(.lyra-star-dot) { font-weight: 900; line-height: 1.2; }
.lyra-star-btn small { color: var(--lyra-muted); font-size: 11.5px; line-height: 1.35; }
```

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test src/components/course/sky.test.ts src/lib/course/course.test.ts
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/course/CourseScreen.tsx src/app/globals.css
git commit -m "feat: render course as Lyra sky"
```

---

## Task 6: Lyra Diagnostics Styling

**Files:**
- Modify: `src/app/diagnostics/page.tsx`
- Modify: `src/components/diagnostics/DiagnosticsScreen.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Wrap route in LyraShell**

In `src/app/diagnostics/page.tsx`, replace the old phone/backdrop wrapper with:

```tsx
import { LyraShell } from "@/components/lyra";
import { DiagnosticsScreen } from "@/components/diagnostics/DiagnosticsScreen";

export default function DiagnosticsPage() {
  return (
    <LyraShell>
      <DiagnosticsScreen />
    </LyraShell>
  );
}
```

- [ ] **Step 2: Restyle diagnostics classes**

In `DiagnosticsScreen.tsx`, keep all state and handlers. Change outer return from `<div className="app">` to:

```tsx
<div className="lyra-diagnostics">
```

Replace top progress markup with `lyra-progress` class:

```tsx
<div className="lyra-progress">
  <i style={{ width: `${result ? 100 : progress}%` }} />
</div>
```

Replace `chip`, `card`, `opt`, `pill`, and `btn go ready` class names with Lyra equivalents:

```tsx
className="lyra-chip cool"
className="lyra-card lyra-diag-card"
className={cls.replace("opt", "lyra-option")}
className="lyra-topic-pill hot"
className="lyra-btn primary"
```

Keep answer-pick logic exactly the same.

- [ ] **Step 3: Add diagnostics CSS**

Add:

```css
.lyra-diagnostics { display: flex; flex-direction: column; gap: 18px; min-height: calc(100dvh - 168px); }
.lyra-diag-card { padding: 20px; }
.lyra-question { font-size: 18px; line-height: 1.35; font-weight: 900; margin: 12px 0 16px; }
.lyra-option { display: block; width: 100%; text-align: left; border: 1px solid var(--lyra-line); border-radius: 16px; padding: 14px 15px; margin-bottom: 10px; background: var(--lyra-surface-2); color: var(--lyra-text); font: inherit; font-weight: 800; }
.lyra-option.ok { border-color: var(--lyra-good); background: rgba(127,217,166,.12); }
.lyra-option.bad { border-color: var(--lyra-bad); background: rgba(255,139,130,.12); }
.lyra-topic-pill { display: inline-block; border-radius: 999px; padding: 5px 11px; margin: 0 6px 6px 0; font-size: 12px; font-weight: 800; background: var(--lyra-surface-2); border: 1px solid var(--lyra-line); color: var(--lyra-muted); }
.lyra-topic-pill.hot { color: #ffc2c2; border-color: rgba(255,139,130,.4); }
```

- [ ] **Step 4: Verify**

Run:

```bash
pnpm test src/lib/placement/engine.test.ts
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/diagnostics/page.tsx src/components/diagnostics/DiagnosticsScreen.tsx src/app/globals.css
git commit -m "feat: restyle diagnostics for Lyra"
```

---

## Task 7: Lyra Lesson Screen

**Files:**
- Modify: `src/app/lesson/page.tsx`
- Modify: `src/components/lesson/LessonScreen.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Wrap lesson route in LyraShell**

In `src/app/lesson/page.tsx`, replace `Backdrop` wrapper with:

```tsx
import { LyraShell } from "@/components/lyra";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export default async function LessonPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <LyraShell>
      <LessonScreen topic={topic ?? null} />
    </LyraShell>
  );
}
```

- [ ] **Step 2: Convert top bar and containers**

In `LessonScreen.tsx`, keep all state, effects, callbacks, and learning/TTS calls unchanged. Change only class names and display copy:

```tsx
<div className="lyra-lesson">
  <div className="lyra-lesson-top">
    ...
    <div className="lyra-progress"><i style={{ width: `${prog}%` }} /></div>
    ...
  </div>
  <div className="lyra-chip cool">
    <span className="dot" /> Lyra ведёт так: <b>{CONCEPT_LABEL[activeConcept]}</b>
  </div>
```

Change task/hint/stage classes:

```tsx
<h1 className="lyra-lesson-title reveal" key={idx}>...</h1>
<p className="lyra-muted lyra-lesson-hint">...</p>
<div className={`lyra-builder${shake ? " shake" : ""}`}>
<div className="lyra-answer" ref={answerRef}>
<div className="lyra-bank">
<button className={`lyra-token${usedBank.has(i) ? " used" : ""}`}>
```

Change feedback classes:

```tsx
<div className={`lyra-feedback${fb ? ` ${fb} show` : ""}`}>
  <div className="lyra-feedback-inner">
```

Keep the `ttsBtn`, `fireConfetti`, `submitAnswer`, `scoreRetention`, and `recordActivity` calls unchanged.

- [ ] **Step 3: Add lesson CSS**

Add:

```css
.lyra-lesson { min-height: calc(100dvh - 168px); display: flex; flex-direction: column; }
.lyra-lesson-top { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.lyra-close { color: var(--lyra-muted); font-size: 22px; background: transparent; border: 0; }
.lyra-stat { font-weight: 900; color: var(--lyra-gold); text-decoration: none; white-space: nowrap; }
.lyra-heart { color: #ff9bd0; font-weight: 900; white-space: nowrap; }
.lyra-lesson-title { font-family: var(--lyra-display); font-size: 25px; line-height: 1.18; letter-spacing: 0; margin: 18px 0 8px; }
.lyra-lesson-hint { margin-bottom: 18px; }
.lyra-builder { border: 1px solid var(--lyra-line); border-radius: 24px; padding: 16px; background: rgba(255,255,255,.035); }
.lyra-answer { min-height: 60px; border: 1px dashed rgba(255,255,255,.16); border-radius: 18px; padding: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; }
.lyra-answer:empty::before { content: "нажимай слова ниже..."; color: var(--lyra-dim); font-size: 14px; }
.lyra-bank { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.lyra-token { border: 1px solid var(--lyra-line); border-radius: 14px; padding: 9px 14px; background: var(--lyra-surface-2); color: var(--lyra-text); font-weight: 800; }
.lyra-token.used { opacity: .24; pointer-events: none; }
.lyra-answer .lyra-token { background: rgba(239,192,121,.13); border-color: rgba(239,192,121,.4); color: var(--lyra-gold); }
.lyra-feedback { position: absolute; left: 0; right: 0; bottom: 0; z-index: 40; transform: translateY(110%); transition: transform .36s ease; }
.lyra-feedback.show { transform: translateY(0); }
.lyra-feedback-inner { padding: 18px 20px 30px; border-radius: 24px 24px 0 0; border-top: 1px solid var(--lyra-line); background: rgba(12,12,19,.96); backdrop-filter: blur(16px); }
```

- [ ] **Step 4: Verify lesson mechanics**

Run:

```bash
pnpm test src/lib/lesson/items.test.ts src/lib/learning/session.test.ts src/lib/srs/scheduler.test.ts
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/lesson/page.tsx src/components/lesson/LessonScreen.tsx src/app/globals.css
git commit -m "feat: restyle lesson for Lyra"
```

---

## Task 8: Lyra Profile Screen

**Files:**
- Modify: `src/components/profile/ProfileScreen.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update imports**

Add:

```ts
import { LyraBottomNav, LyraCard, LyraChip, LyraRing, LyraShell } from "@/components/lyra";
```

- [ ] **Step 2: Wrap profile in Lyra shell**

Change `ProfileScreen` return wrapper to:

```tsx
return (
  <LyraShell withBottomNav={<LyraBottomNav />}>
    <div className="lyra-profile">
      ...
    </div>
  </LyraShell>
);
```

Render loading/empty states inside `LyraCard` instead of old `card`.

- [ ] **Step 3: Restyle profile body**

Keep `ProfileBody`, `SubscriptionCard`, and `ConceptCard` data logic. Change their wrappers:

```tsx
<LyraCard className="lyra-profile-hero">
  {profile.name && <h1>{profile.name}</h1>}
  <LyraRing value={profile.cefrLevel ? 0.62 : 0}>
    <span className="lyra-avatar">{profile.name?.[0]?.toUpperCase() ?? "L"}</span>
  </LyraRing>
  <LyraChip tone="gold">{profile.cefrLevel}</LyraChip>
  ...
</LyraCard>
```

For stats, keep values from `profile.gamification`, `skills`, `weakTopics`, and `conceptScores`. Do not invent new persistent stats.

- [ ] **Step 4: Add profile CSS**

Add:

```css
.lyra-profile { display: flex; flex-direction: column; gap: 14px; }
.lyra-profile-hero { padding: 22px; text-align: center; display: grid; justify-items: center; gap: 12px; }
.lyra-avatar { width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, var(--lyra-cool), var(--lyra-cool-2)); color: #0c1024; font-family: var(--lyra-display); font-size: 34px; font-weight: 900; }
.lyra-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.lyra-stat-card { padding: 16px; }
.lyra-stat-card strong { display: block; font-family: var(--lyra-display); font-size: 28px; letter-spacing: 0; }
.lyra-skill-row { margin-top: 12px; }
.lyra-skill-head { display: flex; justify-content: space-between; color: var(--lyra-muted); font-size: 13px; font-weight: 800; margin-bottom: 6px; }
.lyra-win-badge { margin-left: 8px; color: var(--lyra-gold); font-size: 11px; }
```

- [ ] **Step 5: Verify**

Run:

```bash
pnpm test src/lib/gamification/streak.test.ts src/lib/pedagogy/engine.test.ts
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/profile/ProfileScreen.tsx src/app/globals.css
git commit -m "feat: restyle profile for Lyra"
```

---

## Task 9: Talk Soon Route

**Files:**
- Create: `src/components/talk/TalkSoonScreen.tsx`
- Create: `src/app/talk/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add Talk soon component**

Create `src/components/talk/TalkSoonScreen.tsx`:

```tsx
import Link from "next/link";
import { LyraBottomNav, LyraCard, LyraChip, LyraOrb, LyraShell } from "@/components/lyra";

export function TalkSoonScreen() {
  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <div className="lyra-talk-soon">
        <LyraOrb size={92} cool />
        <LyraChip tone="cool">Разговор</LyraChip>
        <h1 className="lyra-title">Speaking скоро появится</h1>
        <p className="lyra-muted">
          Сейчас Lyra уже ведёт уроки, память, повторения и аудирование. Живой разговор
          подключим отдельным этапом, чтобы не делать фейковый микрофон.
        </p>
        <LyraCard className="lyra-talk-card">
          <p>Пока можно тренировать фразы в уроках и слушать правильное произношение после ответа.</p>
          <Link href="/course" className="lyra-btn primary">К небу</Link>
        </LyraCard>
      </div>
    </LyraShell>
  );
}
```

- [ ] **Step 2: Add route**

Create `src/app/talk/page.tsx`:

```tsx
import { TalkSoonScreen } from "@/components/talk/TalkSoonScreen";

export default function TalkPage() {
  return <TalkSoonScreen />;
}
```

- [ ] **Step 3: Add CSS**

Add:

```css
.lyra-talk-soon { min-height: calc(100dvh - 168px); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 16px; }
.lyra-talk-card { padding: 18px; text-align: left; }
.lyra-talk-card p { color: var(--lyra-muted); font-size: 14px; line-height: 1.5; }
```

- [ ] **Step 4: Verify**

Run:

```bash
pnpm lint
pnpm build
```

Expected: `/talk` is included in the build and passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/talk/TalkSoonScreen.tsx src/app/talk/page.tsx src/app/globals.css
git commit -m "feat: add Lyra talk soon screen"
```

---

## Task 10: Cleanup, Browser Verification, And Final Hardening

**Files:**
- Modify only files already touched if verification reveals layout bugs.

- [ ] **Step 1: Full automated verification**

Run:

```bash
pnpm test
pnpm lint
pnpm build
```

Expected:

- All Vitest suites pass.
- ESLint exits 0.
- Next production build exits 0.

- [ ] **Step 2: Start dev server**

Run:

```bash
pnpm dev -- -p 3001
```

Expected: server starts on `http://localhost:3001`. If port 3001 is busy, use `3002`.

- [ ] **Step 3: Browser route verification**

Open and verify:

```text
http://localhost:3001/
http://localhost:3001/diagnostics
http://localhost:3001/course
http://localhost:3001/lesson?topic=zero-conditional
http://localhost:3001/profile
http://localhost:3001/talk
```

Expected:

- `/` shows Lyra brand and only English.
- `/diagnostics` can show the placement flow without layout overlap.
- `/course` shows A1/A2/B1 as Lyra sky/constellation content and marks B1 later units as soon.
- `/lesson?topic=zero-conditional` shows English B1 content, answer bank, progress, hearts, streak, and feedback.
- `/profile` renders empty state or real profile without crashing.
- `/talk` is honest `soon`, not fake live speaking.

- [ ] **Step 4: Capture screenshots**

Capture desktop and mobile screenshots for the six routes. Inspect for:

- blank screens
- text clipped by cards/buttons
- overlapping bottom nav
- non-English course content caused by the Spanish prototype
- hidden or unreachable primary buttons

- [ ] **Step 5: Fix visual defects only**

If a route has clipped text or overlap, fix only the relevant CSS class. Do not change data flow during visual cleanup.

- [ ] **Step 6: Re-run final verification**

Run:

```bash
pnpm test
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 7: Commit final visual fixes**

If Step 5 changed files:

```bash
git add src
git commit -m "fix: polish Lyra responsive layout"
```

If Step 5 changed nothing, do not create an empty commit.

---

## Spec Coverage Check

- Lyra branding: Task 1.
- English-only language selection: Tasks 1 and 3.
- Keep the static reference untouched: enforced by all tasks using only source reads and editing the Next.js app.
- Preserve current mechanics: Tasks 3-8 explicitly retain existing state/data functions; Task 10 verifies.
- Course sky from real curriculum: Tasks 4-5.
- Lesson mechanics inside Lyra visual shell: Task 7.
- Profile mechanics inside Lyra visual shell: Task 8.
- Talk as honest soon state: Task 9.
- Verification with tests, lint, build, browser routes, screenshots: Task 10.
