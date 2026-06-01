"use client";

import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import {
  DEVICES,
  SCENARIOS,
  SCREENS,
  courseSmokePaths,
  withReloadParam,
  type DeviceId,
  type ScenarioId,
} from "@/lib/dev/deviceLab";
import styles from "./DeviceLab.module.css";

const FRAME_LOAD_TIMEOUT_MS = 8000;
const SCENARIO_TIMEOUT_MS = 12000;

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function textMatches(value: string, matcher: string | RegExp) {
  const text = normalizeText(value);
  if (typeof matcher === "string") return text === matcher;
  const flags = matcher.flags.includes("i")
    ? matcher.flags
    : `${matcher.flags}i`;
  return new RegExp(matcher.source, flags).test(text);
}

function matcherLabel(matcher: string | RegExp) {
  return typeof matcher === "string" ? matcher : matcher.source;
}

function nativeInputValue(input: HTMLInputElement, value: string) {
  const win = input.ownerDocument.defaultView;
  const setter =
    win &&
    Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value")
      ?.set;
  if (setter) setter.call(input, value);
  else input.value = value;
}

export function DeviceLab() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceId, setDeviceId] = useState<DeviceId>("iphone-15");
  const [path, setPath] = useState("/");
  const [reloadKey, setReloadKey] = useState(0);
  const [scenarioId, setScenarioId] = useState<ScenarioId>(
    "onboarding-diagnostics"
  );
  const [running, setRunning] = useState(false);
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

  function clearFrameStorage() {
    const win = iframeRef.current?.contentWindow;
    win?.localStorage.clear();
    win?.sessionStorage.clear();
  }

  function resetProfile() {
    try {
      clearFrameStorage();
      setPath("/");
      setReloadKey(Date.now());
      setStatus("Профиль очищен");
    } catch {
      setStatus("Не смог очистить профиль iframe");
    }
  }

  function frameDocument() {
    const doc = iframeRef.current?.contentDocument;
    if (!doc?.body) throw new Error("Preview ещё не готов");
    return doc;
  }

  function waitForNextFrameLoad(timeoutMs = FRAME_LOAD_TIMEOUT_MS) {
    const frame = iframeRef.current;
    if (!frame) return Promise.reject(new Error("Preview iframe не найден"));

    return new Promise<void>((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        frame.removeEventListener("load", finish);
        resolve();
      };
      frame.addEventListener("load", finish, { once: true });
      window.setTimeout(finish, timeoutMs);
    });
  }

  async function openFrame(nextPath: string) {
    const pendingLoad = waitForNextFrameLoad();
    setPath(nextPath);
    setReloadKey(Date.now());
    await pendingLoad;
    await sleep(140);
  }

  async function waitFor(
    check: () => boolean,
    label: string,
    timeoutMs = SCENARIO_TIMEOUT_MS
  ) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      try {
        if (check()) return;
      } catch {
        // The iframe can be mid-navigation. Keep polling until timeout.
      }
      await sleep(120);
    }
    throw new Error(`Не дождался: ${label}`);
  }

  async function waitForText(matcher: string | RegExp) {
    await waitFor(() => {
      const text = frameDocument().body.innerText;
      return textMatches(text, matcher);
    }, `текст "${matcherLabel(matcher)}"`);
  }

  async function waitForSelector(selector: string) {
    await waitFor(
      () => frameDocument().querySelector(selector) !== null,
      `selector "${selector}"`
    );
  }

  function clickFrameText(matcher: string | RegExp) {
    const doc = frameDocument();
    const targets = Array.from(
      doc.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>("button,a")
    );
    const target = targets.find((element) => {
      if ("disabled" in element && element.disabled) return false;
      return textMatches(element.textContent ?? "", matcher);
    });
    if (!target) throw new Error(`Не нашёл кнопку: ${matcherLabel(matcher)}`);
    target.click();
  }

  function fillFrameInput(value: string) {
    const doc = frameDocument();
    const input = doc.querySelector<HTMLInputElement>(
      'input[aria-label="Твоё имя"], input[placeholder="Твоё имя"]'
    );
    if (!input) throw new Error("Не нашёл поле имени");
    nativeInputValue(input, value);
    const eventInit = { bubbles: true };
    input.dispatchEvent(new Event("input", eventInit));
    input.dispatchEvent(new Event("change", eventInit));
  }

  function clickBankToken(word: string) {
    const doc = frameDocument();
    const bank = doc.querySelector(".lyra-bank");
    const tokens = Array.from(
      bank?.querySelectorAll<HTMLButtonElement>("button.lyra-token") ?? []
    );
    const token = tokens.find(
      (item) =>
        !item.classList.contains("used") &&
        normalizeText(item.textContent ?? "") === word
    );
    if (!token) throw new Error(`Не нашёл токен: ${word}`);
    token.click();
  }

  async function runOnboardingDiagnostics() {
    setStatus("Сценарий: сбрасываю профиль");
    clearFrameStorage();
    await openFrame("/");
    await waitForText(/Какой язык зажигаем/);

    setStatus("Сценарий: язык");
    clickFrameText(/Дальше/);
    await waitForText(/Как тебя зовут/);

    setStatus("Сценарий: имя");
    fillFrameInput("Daniel");
    clickFrameText(/Дальше/);
    await waitForText(/Зачем тебе этот язык/);

    setStatus("Сценарий: цель");
    clickFrameText(/Путешествия/);
    clickFrameText(/Дальше/);
    await waitForText(/Сейчас определим уровень/);

    setStatus("Сценарий: старт диагностики");
    clickFrameText(/Начать диагностику/);
    await waitForText(/Вопрос 1/);
    setStatus("Onboarding OK: дошёл до вопроса 1");
  }

  async function runLessonError() {
    setStatus("Сценарий: открываю урок");
    await openFrame("/lesson?topic=to-be");
    await waitForText(/Я\s*студент/);

    setStatus("Сценарий: собираю ошибочный ответ");
    for (const word of ["I", "is", "a", "student"]) {
      clickBankToken(word);
      await sleep(130);
    }
    clickFrameText("Проверить");
    await waitForText(/Почти! Давай разбер/);
    setStatus("Lesson error OK: feedback виден");
  }

  async function runCoreTabs() {
    setStatus("Сценарий: курс");
    await openFrame("/course");
    await waitForText(/Курс английского/);

    setStatus("Сценарий: разговор");
    await openFrame("/talk");
    await waitForText(/Разговоры появятся скоро|Разговор/);

    setStatus("Сценарий: профиль");
    await openFrame("/profile");
    await waitForText(/Твой профиль|Профиль пуст|Daniel/);
    setStatus("Core tabs OK: курс, разговор, профиль");
  }

  async function runCourseSmoke() {
    const paths = courseSmokePaths();
    for (const [index, lessonPath] of paths.entries()) {
      const topic = lessonPath.split("topic=")[1] ?? lessonPath;
      setStatus(`Course smoke: ${index + 1}/${paths.length} ${topic}`);
      await openFrame(lessonPath);
      await waitForSelector(".lyra-builder");
      await waitForSelector(".lyra-bank button.lyra-token");
      await waitForSelector(".lyra-check");
    }
    setStatus(`Course smoke OK: ${paths.length} тем открылись`);
  }

  async function runScenario() {
    if (running) return;
    setRunning(true);
    try {
      if (scenarioId === "onboarding-diagnostics") {
        await runOnboardingDiagnostics();
      } else if (scenarioId === "lesson-error") {
        await runLessonError();
      } else if (scenarioId === "course-smoke") {
        await runCourseSmoke();
      } else {
        await runCoreTabs();
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Сценарий упал");
    } finally {
      setRunning(false);
    }
  }

  async function captureScreenshot() {
    const frame = iframeRef.current;
    if (!frame || !navigator.mediaDevices?.getDisplayMedia) {
      setStatus("Скриншот недоступен в этом браузере");
      return;
    }

    let stream: MediaStream | null = null;
    try {
      setStatus("Выбери текущую вкладку для скриншота");
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      const video = document.createElement("video");
      video.muted = true;
      video.srcObject = stream;
      await video.play();
      await sleep(260);

      const rect = frame.getBoundingClientRect();
      const scaleX = video.videoWidth / window.innerWidth;
      const scaleY = video.videoHeight / window.innerHeight;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(rect.width * scaleX));
      canvas.height = Math.max(1, Math.round(rect.height * scaleY));

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas недоступен");
      ctx.drawImage(
        video,
        rect.left * scaleX,
        rect.top * scaleY,
        rect.width * scaleX,
        rect.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!blob) throw new Error("Не смог собрать PNG");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lyra-${device.id}-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Скриншот скачан");
    } catch {
      setStatus("Скриншот отменён или не разрешён");
    } finally {
      stream?.getTracks().forEach((track) => track.stop());
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

          <label>
            <span>Scenario</span>
            <select
              value={scenarioId}
              onChange={(event) =>
                setScenarioId(event.target.value as ScenarioId)
              }
            >
              {SCENARIOS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <button type="button" onClick={runScenario} disabled={running}>
            {running ? "Running..." : "Run"}
          </button>
          <button type="button" onClick={captureScreenshot}>
            Screenshot
          </button>
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
