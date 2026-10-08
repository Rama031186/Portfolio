import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:4173/");
await page.locator("#hero").screenshot({ path: "artifacts/desktop-hero.png" });
await page.locator("#skills").scrollIntoViewIfNeeded();
await page.locator(".react-flow__node").first().waitFor();
await page
  .locator("#skills")
  .screenshot({ path: "artifacts/desktop-skills.png" });
await page.getByRole("button", { name: "Switch to light theme" }).click();
await page.locator("#hero").screenshot({ path: "artifacts/light-hero.png" });
await page.getByRole("button", { name: "Switch to dark theme" }).click();
for (const width of [320, 375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) {
    console.log(
      await page
        .locator("body *")
        .evaluateAll((els) =>
          els
            .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
            .map((e) => ({
              tag: e.tagName,
              cls: e.className,
              right: e.getBoundingClientRect().right,
              text: e.textContent?.slice(0, 50),
            })),
        ),
    );
    throw new Error(`Horizontal overflow at ${width}px`);
  }
}
await page.setViewportSize({ width: 375, height: 812 });
await page.locator("#hero").screenshot({ path: "artifacts/mobile-hero.png" });
await page.goto("http://127.0.0.1:4173/projects/hisaab-ai");
await page
  .locator("#execution")
  .screenshot({ path: "artifacts/mobile-trace.png" });
console.log(
  "Visual captures saved. No overflow at 320, 375, 768, 1024, or 1440 pixels.",
);
await browser.close();
