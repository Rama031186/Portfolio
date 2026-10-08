import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("desktop exploration, route details, trace selection and keyboard palette", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software Engineer",
  );
  await expect(page.locator(".identity-body .status")).toHaveText("ACTIVE");
  await page
    .getByRole("link", { name: "Explore My Work", exact: true })
    .click();
  await expect(
    page.locator("nav a").filter({ hasText: "Work" }),
  ).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("link", { name: "View Case Study", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Payment Compliance Engine",
  );
  await page.getByRole("button", { name: "Rule Engine", exact: true }).click();
  await expect(page.locator(".span-details h4")).toHaveText("Rule Engine");
  await page
    .locator(".architecture-buttons")
    .getByRole("button", { name: "PostgreSQL", exact: true })
    .click();
  await expect(page.locator(".architecture aside h3")).toHaveText("PostgreSQL");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("textbox", { name: "Search commands" }).fill("skills");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.locator(".skill-details")).toContainText(
    "Payment Compliance Engine",
  );
  await page.getByRole("button", { name: "AI / GenAI", exact: true }).click();
  await page.getByRole("button", { name: "RAG", exact: true }).click();
  await expect(page.locator(".skill-details")).toContainText(
    "RAG Knowledge Engine",
  );
  await page.getByRole("button", { name: "Trace", exact: true }).click();
  await expect(page.locator(".experience-trace").first()).toContainText(
    "designed_compliance_engine",
  );
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});
test("mobile routes have no horizontal overflow and menu works", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Skills", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.locator(".skill-details h3")).toHaveText("Java");
  for (const route of [
    "/",
    "/experience",
    "/projects",
    "/projects/hisaab-ai",
    "/projects/resume-intelligence",
    "/skills",
    "/credentials",
    "/lab",
    "/contact",
    "/not-found",
  ]) {
    await page.goto(route);
    await page.locator("h1").waitFor({ state: "attached" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
  await page.goto("/");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(page.locator(".skill-buttons")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("WCAG accessibility checks in both themes and project details", async ({
  page,
}) => {
  for (const route of ["/", "/projects/hisaab-ai"]) {
    await page.goto(route);
    await page.locator("h1").waitFor();
    if (route === "/") await page.locator("#skills").scrollIntoViewIfNeeded();
    await page.locator(".react-flow__node").first().waitFor();
    for (const theme of ["dark", "light"]) {
      if (theme === "light")
        await page
          .getByRole("button", { name: "Switch to light theme" })
          .click();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${route} ${theme}`,
      ).toEqual([]);
    }
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(page.locator(".skill-buttons")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
});

test("homepage fits narrow, tablet and desktop viewports", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${width}px`,
    ).toBe(true);
  }
});
