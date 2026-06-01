import Link from "next/link";
import { LyraBottomNav, LyraCard, LyraOrb, LyraShell } from "@/components/lyra";

export default function TalkPage() {
  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <section className="lyra-talk">
        <div className="lyra-talk-orb">
          <LyraOrb size={88} cool />
        </div>

        <LyraCard className="lyra-talk-card">
          <p className="lyra-eyebrow gold">English speaking</p>
          <h1 className="lyra-title">Разговоры появятся скоро</h1>
          <p className="lyra-muted">
            Здесь будет честная голосовая практика английского с памятью Lyra.
            Пока не показываем имитацию speaking, чтобы не ломать ожидания.
          </p>

          <div className="lyra-talk-list">
            <div className="lyra-talk-item">
              <span className="lyra-star-dot" />
              <span>Сначала закрепляем диагностику, курс и уроки.</span>
            </div>
            <div className="lyra-talk-item">
              <span className="lyra-star-dot" />
              <span>Потом подключим реальную голосовую практику.</span>
            </div>
          </div>

          <Link href="/lesson" className="lyra-btn primary">
            Продолжить урок
          </Link>
        </LyraCard>
      </section>
    </LyraShell>
  );
}
