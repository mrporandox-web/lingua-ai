// Роут диагностики уровня (Блок A) — адаптивный placement-тест.
// Структура зеркалит урок: рамка телефона на десктопе + общий фон + экран.
import { Backdrop } from "@/components/Backdrop";
import { DiagnosticsScreen } from "@/components/diagnostics/DiagnosticsScreen";

export default function DiagnosticsPage() {
  return (
    <div className="phone">
      <Backdrop />
      <DiagnosticsScreen />
    </div>
  );
}
