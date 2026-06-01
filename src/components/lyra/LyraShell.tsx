import type { ReactNode } from "react";

interface LyraShellProps {
  children: ReactNode;
  withBottomNav?: ReactNode;
  className?: string;
}

export function LyraShell({
  children,
  withBottomNav,
  className = "",
}: LyraShellProps) {
  return (
    <div className={`lyra-stage ${className}`}>
      <div className="lyra-phone">
        <div className="lyra-screen">
          <LyraBackground />
          <main className="lyra-view">{children}</main>
          {withBottomNav}
          <div className="lyra-home-ind" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export function LyraBackground() {
  return (
    <div className="lyra-bg" aria-hidden>
      <span className="lyra-star s1" />
      <span className="lyra-star s2" />
      <span className="lyra-star s3" />
    </div>
  );
}
