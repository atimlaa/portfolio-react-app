// @ts-check
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const PAGES = [
  { path: "", title: /Aryan Timla — Applications Developer/ },
  { path: "privacy/", title: "Privacy Policy | Aryan Timla" },
  { path: "terms/", title: "Terms and Conditions | Aryan Timla" },
  { path: "cookies/", title: "Cookie Policy | Aryan Timla" },
];

// Scroll the whole page so every scroll-triggered animation has finished
const revealAll = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
};

const dismissBanner = async (page) => {
  await page.addInitScript(() => localStorage.setItem("cookie-consent", "essential"));
};

test.describe("SEO and meta", () => {
  for (const { path, title } of PAGES) {
    test(`/${path} has its own title, description and social tags`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc && desc.length).toBeGreaterThan(50);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png$/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/portfolio-react-app/${path}$`));
    });
  }

  test("static HTML already contains the right title (no JS needed)", async ({ request }) => {
    const html = await (await request.get("privacy/")).text();
    expect(html).toContain("<title>Privacy Policy | Aryan Timla</title>");
  });

  test("sitemap and structured data exist", async ({ page, request }) => {
    const sitemap = await request.get("sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<loc>https://atimlaa.github.io/portfolio-react-app/</loc>");
    await page.goto("");
    const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    expect(ld["@graph"][0].name).toBe("Aryan Timla");
  });

  test("favicon and Open Graph image are served", async ({ request }) => {
    for (const f of ["favicon.ico", "og-image.png", "apple-touch-icon.png", "logo192.png"]) {
      expect((await request.get(f)).status(), f).toBe(200);
    }
  });
});

test.describe("404 page", () => {
  test("unknown URLs return 404 and show the custom page", async ({ page }) => {
    const res = await page.goto("this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found." })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await page.getByRole("link", { name: "Go home" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Aryan Timla." })).toBeVisible();
  });
});

test.describe("Above the fold", () => {
  test("name and primary CTA are visible without scrolling", async ({ page }) => {
    await dismissBanner(page);
    await page.goto("");
    await expect(page.getByRole("heading", { level: 1, name: "Aryan Timla." })).toBeInViewport();
    await expect(page.getByRole("link", { name: /Let's work together/ })).toBeInViewport();
  });
});

test.describe("Resume", () => {
  test("hero download and /files/resume.pdf both serve a PDF", async ({ page, request }) => {
    await dismissBanner(page);
    await page.goto("");
    const link = page.getByRole("link", { name: "Download Resume" });
    await expect(link).toHaveAttribute("download", "Aryan-Timla-Resume.pdf");
    const href = await link.getAttribute("href");
    for (const url of [href, "files/resume.pdf"]) {
      const res = await request.get(url);
      expect(res.status(), url).toBe(200);
      expect((await res.body()).subarray(0, 5).toString(), url).toBe("%PDF-");
    }
  });
});

test.describe("Cookie banner", () => {
  test("shows once, remembers the choice, and can be reopened", async ({ page }) => {
    await page.goto("");
    const banner = page.getByRole("region", { name: "Cookies & privacy" });
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Essential only" }).click();
    await expect(banner).toBeHidden();

    await page.reload();
    await page.waitForTimeout(500);
    await expect(banner).toBeHidden();

    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Accept" }).click();
    expect(await page.evaluate(() => localStorage.getItem("cookie-consent"))).toBe("accepted");
  });

  test("sets no cookies", async ({ page, context }) => {
    await page.goto("");
    await page.getByRole("button", { name: "Accept" }).click();
    expect(await context.cookies()).toHaveLength(0);
  });
});

test.describe("Keyboard and forms", () => {
  test("first Tab reaches the skip link, which jumps to main", async ({ page, browserName }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "keyboard test is desktop-only");
    await dismissBanner(page);
    await page.goto("");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("nav links are keyboard-focusable real links", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "desktop nav only");
    await dismissBanner(page);
    await page.goto("");
    const contact = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" });
    await contact.focus();
    await expect(contact).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByLabel("Name")).toBeInViewport({ timeout: 3000 });
  });

  test("contact form has labels, validates, and announces success", async ({ page }) => {
    await dismissBanner(page);
    await page.route("**/getform.io/**", (route) => route.fulfill({ status: 200, body: "{}" }));
    await page.goto("#contact");

    const name = page.getByLabel("Name");
    const email = page.getByLabel("Email");
    const message = page.getByLabel("Message");
    await expect(name).toHaveAttribute("autocomplete", "name");
    await expect(email).toHaveAttribute("autocomplete", "email");

    await page.getByRole("button", { name: "Send Message" }).click();
    expect(await name.evaluate((el) => el.validity.valueMissing)).toBe(true);

    await name.fill("Test Person");
    await email.fill("test@example.com");
    await message.fill("Hello from Playwright");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Message sent" })).toHaveCount(1);
    await expect(name).toHaveValue("");
  });

  test("mobile menu button is accessible and closes with Escape", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await dismissBanner(page);
    await page.goto("");
    const btn = page.getByRole("button", { name: "Open menu" });
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await btn.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });
});

test.describe("Accessibility (axe)", () => {
  for (const path of ["", "privacy/", "terms/", "cookies/", "nope"]) {
    test(`no serious or critical issues on /${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await dismissBanner(page);
      await page.goto(path);
      await revealAll(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const bad = results.violations.filter((v) => ["serious", "critical"].includes(v.impact || ""));
      expect(
        bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`)
      ).toEqual([]);
    });
  }

  test("every image has alt text", async ({ page }) => {
    await dismissBanner(page);
    await page.goto("");
    await revealAll(page);
    const missing = await page.locator("img:not([alt])").count();
    expect(missing).toBe(0);
  });
});
