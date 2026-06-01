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
