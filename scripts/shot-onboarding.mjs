// Скриншоты финала онбординга: калибровка → вау → ценник.
// Прогоняет фрешевый профиль через /diagnostics и снимает 3 экрана.
import pw from "/Users/exz/.npm/_npx/e78b33305587cb7c/node_modules/playwright/index.js";
const { chromium } = pw;

const BASE = "http://localhost:3000";
const OUT = "/Users/exz/projects/_incubator/projects/lingua-ai/data-shots";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const p = await ctx.newPage();

await p.goto(`${BASE}/diagnostics`, { waitUntil: "networkidle" });
await sleep(500);

// шаг знакомства (имя)
const nameInput = p.locator('input[aria-label="Твоё имя"]');
if (await nameInput.count()) {
  await nameInput.fill("Алекс");
  await p.locator("button.lyra-btn.primary").first().click();
  await sleep(500);
}

// 7 вопросов теста — кликаем первый вариант каждый раз
for (let i = 0; i < 7; i++) {
  const opt = p.locator("button.lyra-option").first();
  await opt.waitFor({ state: "visible", timeout: 5000 });
  await opt.click();
  await sleep(800); // компонент ждёт 650мс перед след. вопросом
}

// финиш диагностики → в калибровку
const finish = p.locator("button.lyra-btn.primary");
await finish.waitFor({ state: "visible", timeout: 5000 });
await finish.click();

// 1) КАЛИБРОВКА
await p.locator(".lyra-calibrate").waitFor({ state: "visible", timeout: 5000 });
await sleep(400);
await p.screenshot({ path: `${OUT}/1-calibrate.png` });
console.log("✓ calibrate");

// выбираем стиль → вау
await p.locator(".lyra-calibrate-card").first().click();

// 2) ВАУ
await p.locator(".lyra-reveal").waitFor({ state: "visible", timeout: 5000 });
await sleep(1900); // дождаться поэтапной анимации
await p.screenshot({ path: `${OUT}/2-reveal.png` });
console.log("✓ reveal");

// дальше → ценник
await p.locator(".lyra-reveal .lyra-btn.primary").click();

// 3) ЦЕННИК
await p.locator(".lyra-paywall").waitFor({ state: "visible", timeout: 5000 });
await sleep(300);
await p.screenshot({ path: `${OUT}/3-paywall.png` });
console.log("✓ paywall");

await b.close();
console.log("DONE");
