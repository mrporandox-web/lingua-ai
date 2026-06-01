// Роут урока: фон (aurora+grid) внутри рамки телефона + клиентский LessonScreen.
// ?topic=<id> (из карты курса) задаёт тему урока; нет параметра → дефолт-витрина
// (present-continuous + адаптивная AI-генерация под слабую тему).
import { Backdrop } from "@/components/Backdrop";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export default async function LessonPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <div className="phone">
      <Backdrop />
      <LessonScreen topic={topic ?? null} />
    </div>
  );
}
