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

test.describe("Cookie banner", () => {
  test("does not interrupt a first visit while nothing needs consent", async ({ page }) => {
    await page.goto("");
    await expect(page.getByRole("heading", { level: 1, name: "Aryan Timla." })).toBeVisible();
    await page.waitForTimeout(800);
    await expect(page.getByRole("region", { name: "Cookies & privacy" })).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("cookie-consent"))).toBeNull();
  });

  test("opens from Cookie settings, takes focus, and remembers the choice", async ({ page }) => {
    await page.goto("");
    const banner = page.getByRole("region", { name: "Cookies & privacy" });
    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("heading", { name: "Cookies & privacy" })).toBeFocused();
    await banner.getByRole("button", { name: "Essential only" }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem("cookie-consent"))).toBe("essential");

    await page.reload();
    await page.waitForTimeout(500);
    await expect(banner).toBeHidden();

    await page.getByRole("button", { name: "Cookie settings" }).click();
    await banner.getByRole("button", { name: "Accept" }).click();
    expect(await page.evaluate(() => localStorage.getItem("cookie-consent"))).toBe("accepted");
  });

  test("Cookie Policy page can open the settings", async ({ page }) => {
    await page.goto("cookies/");
    await page.getByRole("button", { name: "Open cookie settings" }).click();
    await expect(page.getByRole("region", { name: "Cookies & privacy" })).toBeVisible();
  });

  test("sets no cookies", async ({ page, context }) => {
    await page.goto("");
    await page.getByRole("button", { name: "Cookie settings" }).click();
    await page.getByRole("button", { name: "Accept" }).click();
    expect(await context.cookies()).toHaveLength(0);
  });

  test("first visit on mobile shows all three hero buttons", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("");
    for (const name of [/Let's work together/, "View projects", "Download Resume"]) {
      const link = page.getByRole("link", { name });
      await expect(link).toBeInViewport({ ratio: 1 });
      // Nothing (like a banner) is drawn on top of the button
      const covered = await link.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !el.contains(hit);
      });
      expect(covered, `${name} is covered`).toBe(false);
    }
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

  test("contact section links only to live professional profiles", async ({ page }) => {
    await dismissBanner(page);
    await page.goto("#contact");
    const contact = page.locator("#contact");
    await expect(contact.locator('a[href*="discord"]')).toHaveCount(0);
    await expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/atimlaa");
    await expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin\.com\/in\/aryan-timla/);
    await expect(contact.getByRole("link", { name: "aryantimla@gmail.com" })).toHaveAttribute("href", "mailto:aryantimla@gmail.com");
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
