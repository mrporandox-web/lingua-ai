import pw from "/Users/exz/.npm/_npx/e78b33305587cb7c/node_modules/playwright/index.js";
const { chromium } = pw;
const OUT = "/Users/exz/projects/_incubator/projects/lingua-ai/data-shots";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();

await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await sleep(2500); // дождаться Babel-транспайл + reveal-анимаций

// full-page скрин лендинга
await p.screenshot({ path: `${OUT}/lp-full.png`, fullPage: true });
console.log("✓ lp-full");

// верхний экран (hero) отдельно
await p.screenshot({ path: `${OUT}/lp-hero.png` });
console.log("✓ lp-hero");

// проверка кнопки: кликаем "Попробовать бесплатно" → ждём переход на /start
const btn = p.locator('button:has-text("Попробовать бесплатно")');
await btn.scrollIntoViewIfNeeded();
await sleep(400);
await btn.click();
await p.waitForURL("**/start", { timeout: 8000 });
console.log("✓ button → " + new URL(p.url()).pathname);

await b.close();
console.log("DONE");
