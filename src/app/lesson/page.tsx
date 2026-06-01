// ?topic=<id> (из карты курса) задаёт тему урока; нет параметра → дефолт-витрина
// (present-continuous + адаптивная AI-генерация под слабую тему).
import { LessonScreen } from "@/components/lesson/LessonScreen";
import { LyraShell } from "@/components/lyra";

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
