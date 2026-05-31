// Лендинг Lingua-AI: рекламный посыл + CTA в эталонный урок.
// Визуальный язык общий с уроком (aurora/grid, рамка телефона на десктопе).
import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";

export default function Home() {
  return (
    <div className="phone">
      <Backdrop />
      <div className="app">
        <div className="chip" style={{ marginTop: "auto" }}>
          <span className="dot" /> AI-репетитор английского
        </div>

        <h1
          className="task reveal"
          style={{ fontSize: "32px", marginBottom: "var(--s2)" }}
        >
          {"Учит так, как удобно именно тебе".split(" ").map((w, i) => (
            <span className="line" key={i}>
              <span className="word" style={{ ["--i" as string]: i }}>
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="hintline"
          style={{ fontSize: "15px", marginBottom: "var(--s4)" }}
        >
          Персональный AI-репетитор, который запоминает,{" "}
          <b style={{ color: "var(--txt)" }}>КАК</b> ты учишься лучше — и ведёт
          именно так. Грамматику объясняем на русском.
        </p>

        <div style={{ marginTop: "auto" }}>
          <Link
            href="/diagnostics"
            className="btn go ready"
            style={{ display: "block", textAlign: "center" }}
          >
            Определить мой уровень →
          </Link>
          <Link
            href="/course"
            className="hintline"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "var(--s2)",
              fontSize: "13px",
            }}
          >
            Программа курса
          </Link>
          <Link
            href="/profile"
            className="hintline"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "var(--s2)",
              fontSize: "13px",
            }}
          >
            Мой профиль
          </Link>
        </div>
      </div>
    </div>
  );
}
