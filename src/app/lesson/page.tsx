// Роут урока: фон (aurora+grid) внутри рамки телефона + клиентский LessonScreen.
import { Backdrop } from "@/components/Backdrop";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export default function LessonPage() {
  return (
    <div className="phone">
      <Backdrop />
      <LessonScreen />
    </div>
  );
}
