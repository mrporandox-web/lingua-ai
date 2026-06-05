// Точка входа в приложение для веба: онбординг (язык → имя → цель → диагностика).
// На вебе корень «/» отдаёт маркетинговый лендинг (public/Landing.html через
// rewrite), а кнопка «Попробовать бесплатно» ведёт сюда. В нативе (Capacitor)
// лендинга нет — там корень «/» сразу HomeScreen (см. app/page.tsx).
import { HomeScreen } from "@/components/home/HomeScreen";

export default function Start() {
  return <HomeScreen />;
}
