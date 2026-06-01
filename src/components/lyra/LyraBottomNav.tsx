"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/course", label: "Небо", icon: "*" },
  { href: "/lesson", label: "Урок", icon: "▣" },
  { href: "/talk", label: "Разговор", icon: "◉" },
  { href: "/profile", label: "Профиль", icon: "○" },
] as const;

export function LyraBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="lyra-nav" aria-label="Основная навигация">
      {NAV.map((item) => {
        const active =
          item.href === "/lesson"
            ? pathname.startsWith("/lesson")
            : pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`lyra-nav-btn${active ? " on" : ""}`}
          >
            <span className="lyra-nav-ico" aria-hidden>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
