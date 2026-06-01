# Lyra Redesign Design

Date: 2026-06-01

## Goal

Apply the approved Lyra visual design to the existing working Lingua-AI product without replacing the product mechanics. The shipped app becomes branded as Lyra, while the current Next.js app remains the implementation base.

The design reference is the static prototype in `/Users/exz/Downloads/Ai Techer`. It is treated as a visual source of truth only. The working app is `/Users/exz/projects/_incubator/projects/lingua-ai` and keeps its data model, lesson engine, route structure, tests, PWA setup, TTS, SRS, profile store, and course content.

## Product Decisions

- Brand name in the UI and metadata becomes `Lyra`.
- The product remains for Russian-speaking learners studying English.
- The language-selection step stays, but only English is available for now.
- The static Lyra prototype teaches Spanish in its copy; that content must not be copied into the product.
- The Talk screen from the visual reference is not implemented as fake speaking. It is shown as a visually integrated `soon` area until speaking is built.
- `/Users/exz/Downloads/Ai Techer` must not be edited. It remains the reference artifact.

## Existing Mechanics To Preserve

- Onboarding and diagnostics:
  - Name capture.
  - Adaptive placement test from `src/lib/placement/engine.ts`.
  - Profile updates for `cefrLevel`, `skills`, `weakTopics`, and `onboarded`.
- Course:
  - A1, A2, and B1 curriculum from `src/lib/course/curriculum.ts`.
  - Ready/soon topic statuses.
  - Topic progress and current-topic calculation from `src/lib/course/progress.ts`.
- Lesson:
  - Sentence-builder interaction.
  - Answer checking.
  - Structured feedback and deeper explanations.
  - Concept engine integration.
  - TTS playback through `useTts`.
  - SRS and retention calls through `src/lib/learning/session.ts`.
  - Streak and hearts behavior.
- Profile:
  - CEFR level.
  - Skills.
  - Weak topics.
  - Preferred concept and concept score ranking.
  - Subscription status.
  - Streak and best streak.
- Backend boundaries:
  - Keep `src/lib/store` abstraction intact.
  - Keep Supabase/localStorage behavior intact.
  - Keep API routes for generation and TTS intact.

## Visual Mapping

### Shell

Create a Lyra app shell in the Next.js app that mirrors the reference phone-first presentation:

- Premium dark background.
- Warm gold primary accent.
- Cool violet/blue AI accent.
- Phone frame on desktop.
- Bottom navigation on main app screens.
- Status-like top spacing where appropriate.
- Consistent card, chip, orb, progress, and button primitives.

Implementation should use production React/TypeScript components rather than copying the static Babel files directly.

### Onboarding

Map the reference onboarding to the current onboarding flow:

- Intro screen: Lyra brand, AI tutor positioning, CTA.
- Language selection: a single English option, selected by default.
- Name capture: keep existing profile write.
- Diagnostics CTA: proceed into the existing placement test.

Do not add unsupported daily-goal persistence unless it is backed by the current profile model. If a visual step needs to exist for continuity, it must either map to an existing field or be omitted in the first pass.

### Home / Course Sky

The reference "sky" becomes the visual home for the real course map:

- A1, A2, B1 are sections/constellations.
- Units are grouped paths.
- Topics are stars.
- Topic states map directly:
  - `done` -> lit completed star.
  - `current` -> highlighted pulsing star.
  - `available` -> active but less prominent star.
  - `soon` -> locked/dim star.
- The primary recommendation card uses the current topic from the course-progress engine.
- Start actions route to `/lesson?topic=<topicId>`.

The old `CourseScreen` list layout is replaced visually, not logically.

### Lesson

The lesson keeps the current sentence-builder mechanics and receives Lyra styling:

- Lyra top bar with close, progress, streak, and hearts.
- Topic metadata from `getTopic(item.topic)`.
- Sentence-builder bank and answer area styled like Lyra cards/chips.
- Feedback sheet styled like the reference lesson completion/feedback language.
- TTS button stays in feedback and continues using `useTts`.
- Concept chip stays, but copy is adjusted to Lyra's tone.

Do not convert the lesson to the static reference's Spanish multiple-exercise demo. Existing validated English lesson items remain the source of truth.

### Profile

Profile data is preserved and restyled:

- Avatar/ring presentation from Lyra.
- CEFR progress and streak stats.
- Skills as compact progress cards/bars.
- Weekly/activity section uses existing gamification data where available and avoids invented long-term metrics.
- Weak topics and concept-card data remain visible.
- Subscription card remains visible and is restyled.

### Talk

Add or restyle a Lyra Talk tab as a `soon` screen:

- It should match the reference visual language.
- It must not pretend that live speaking is available.
- It can explain briefly that speaking is coming later, but should avoid blocking the rest of the app.

## Architecture

Use a small design-system layer instead of scattering reference CSS through feature files:

- `src/components/lyra/` for reusable visual primitives:
  - app shell / phone frame
  - bottom nav
  - card
  - chip
  - orb
  - progress/ring
  - icon wrappers where needed
- Feature screens keep product responsibility:
  - `HomeScreen` owns start/onboarding landing.
  - `DiagnosticsScreen` owns placement flow.
  - `CourseScreen` owns course state and sky rendering.
  - `LessonScreen` owns lesson mechanics.
  - `ProfileScreen` owns learner profile rendering.

Global styling should be consolidated in `src/app/globals.css` only where it is genuinely global. Component-specific layout should stay near components or in named reusable classes.

## Data Flow

No new product state is required for the redesign.

- Profile is loaded through `getProfileStore()`.
- Diagnostics writes profile fields exactly as today.
- Course state is derived from `UserProfile` plus curriculum helpers.
- Lesson answers flow through `submitAnswer`, `scoreRetention`, and `recordActivity`.
- TTS flows through static manifest, in-memory cache, and `/api/tts`.
- AI generation through `/api/generate` remains unchanged.

## Error Handling

- If profile load fails, screens should degrade to the same behavior as today: anonymous/empty profile state.
- If TTS fails, lesson continues silently.
- If generated lesson content is unavailable, static validated content remains the fallback.
- If speaking/Talk is selected, route to the `soon` state rather than failing or faking a session.
- If a topic is `soon`, it is visible but not playable.

## Testing And Verification

Before claiming completion:

- Run `pnpm test`.
- Run `pnpm lint`.
- Run `pnpm build`.
- Start a local dev server.
- Verify key routes in a browser:
  - `/`
  - `/diagnostics`
  - `/course`
  - `/lesson?topic=zero-conditional`
  - `/profile`
  - Talk/soon route if added
- Capture desktop and mobile screenshots for the main flows.
- Check that:
  - English is the only selectable language.
  - Lyra branding appears consistently.
  - Existing curriculum content is still English.
  - A1/A2/B1 counts and ready/soon states still match curriculum.
  - Lesson answer checking still updates feedback.
  - TTS button still appears and does not block on failure.
  - Profile still renders CEFR, skills, concept scores, weak topics, subscription, and streak.

## Non-Goals

- Do not implement real speaking or microphone evaluation.
- Do not rebuild the app inside the static `Ai Techer` prototype.
- Do not remove or rewrite the course, lesson, SRS, profile, TTS, Supabase, or generation layers.
- Do not introduce new persistent fields unless they are necessary for the approved visual mapping.
- Do not change lesson content from English to Spanish.

## Acceptance Criteria

- The working app is visually aligned with the Lyra reference.
- The app is branded Lyra.
- The language-selection UI offers only English.
- Existing mechanics continue to work through the current Next.js app.
- The reference prototype remains untouched.
- Tests, lint, and production build pass.
- Browser verification covers the major flows and shows no broken layout or obvious text overlap.
