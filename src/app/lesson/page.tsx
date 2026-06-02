// Роут урока. ?topic=<id> (из карты курса) читается клиентски (LessonRoute) —
// совместимо со static-export (натив). Нет темы → дефолт-витрина.
import { Suspense } from "react";
import { LessonRoute } from "@/components/lesson/LessonRoute";
import { LyraBottomNav, LyraShell } from "@/components/lyra";

export default function LessonPage() {
  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <Suspense>
        <LessonRoute />
      </Suspense>
    </LyraShell>
  );
}
