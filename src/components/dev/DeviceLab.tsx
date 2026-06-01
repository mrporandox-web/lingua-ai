"use client";

import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import styles from "./DeviceLab.module.css";

const DEVICES = [
  { id: "iphone-se", label: "iPhone SE", width: 375, height: 667 },
  { id: "iphone-15", label: "iPhone 15", width: 393, height: 852 },
  { id: "iphone-plus", label: "iPhone Plus", width: 430, height: 932 },
] as const;

const SCREENS = [
  { label: "Старт", path: "/" },
  { label: "Курс", path: "/course" },
  { label: "Диагностика", path: "/diagnostics" },
  { label: "Урок: to be", path: "/lesson?topic=to-be" },
  { label: "Разговор", path: "/talk" },
  { label: "Профиль", path: "/profile" },
] as const;

type DeviceId = (typeof DEVICES)[number]["id"];

function withReloadParam(path: string, reloadKey: number): string {
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}lab=${reloadKey}`;
}

export function DeviceLab() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceId, setDeviceId] = useState<DeviceId>("iphone-15");
  const [path, setPath] = useState("/");
  const [reloadKey, setReloadKey] = useState(0);
  const [status, setStatus] = useState("Готово");

  const device = DEVICES.find((item) => item.id === deviceId) ?? DEVICES[1];
  const frameSrc = useMemo(
    () => withReloadParam(path, reloadKey),
    [path, reloadKey]
  );
  const frameStyle = {
    "--device-w": `${device.width}px`,
    "--device-h": `${device.height}px`,
  } as CSSProperties;

  function reload() {
    setReloadKey(Date.now());
    setStatus("Перезагрузил preview");
  }

  function resetProfile() {
    try {
      const win = iframeRef.current?.contentWindow;
      win?.localStorage.clear();
      win?.sessionStorage.clear();
      setPath("/");
      setReloadKey(Date.now());
      setStatus("Профиль очищен");
    } catch {
      setStatus("Не смог очистить профиль iframe");
    }
  }

  return (
    <main className={styles.lab}>
      <header className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>Lyra Device Lab</p>
          <h1>iPhone preview</h1>
        </div>

        <div className={styles.controls} aria-label="Preview controls">
          <label>
            <span>Device</span>
            <select
              value={deviceId}
              onChange={(event) => setDeviceId(event.target.value as DeviceId)}
            >
              {DEVICES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} · {item.width}x{item.height}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Screen</span>
            <select
              value={path}
              onChange={(event) => setPath(event.target.value)}
            >
              {SCREENS.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <button type="button" onClick={reload}>
            Reload
          </button>
          <button type="button" onClick={resetProfile}>
            Reset profile
          </button>
          <a href={path} target="_blank" rel="noreferrer">
            Open
          </a>
        </div>
      </header>

      <section className={styles.stage} aria-label="iPhone preview">
        <div className={styles.shell} style={frameStyle}>
          <div className={styles.iphone}>
            <div className={styles.notch} aria-hidden />
            <iframe ref={iframeRef} src={frameSrc} title="Lyra iPhone preview" />
          </div>
        </div>
      </section>

      <footer className={styles.status}>
        <span>{device.label}</span>
        <span>{path}</span>
        <span>{status}</span>
      </footer>
    </main>
  );
}
