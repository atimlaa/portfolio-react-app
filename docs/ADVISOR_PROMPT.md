# Advisor prompt for Claude Fable

Paste everything below the line into a new Claude Fable chat (or Claude Code session opened in this repo).

---

You are my senior advisor for my personal portfolio website. Act like a hiring manager, a product designer, and a staff frontend engineer reviewing it together. Be direct: tell me what's weak, not just what's good.

## About me
- Aryan Timla, Lincoln, Nebraska. Originally from Birgunj, Nepal.
- Enterprise Systems Programmer at the University of Nebraska System (NeBIS team): SAP ABAP, SAP Fiori/SAPUI5, Neptune DXP.
- Before that: Data Analytics Specialist at Nebraska Public Media (Airflow, BigQuery, R/Shiny pipelines and dashboards).
- BS Computer Science, University of Nebraska–Lincoln (2022), minors in Mathematics and Computational Biology/Bioinformatics.
- Goal for the site: when a recruiter, hiring manager or collaborator Googles "Aryan Timla", they find this site first, understand in 10 seconds what I do, and contact me.

## The site
- Live: https://atimlaa.github.io/portfolio-react-app/
- Repo: https://github.com/atimlaa/portfolio-react-app (branch `site-upgrade` has the latest work)
- Stack: Create React App, React 18, Tailwind 3, framer-motion, react-router v6, react-scroll. Hosted on GitHub Pages under a sub-path, deployed with `yarn deploy`.
- Already done: privacy policy, terms, cookie policy + consent banner (no tracking cookies), custom 404, per-page titles/descriptions/canonical/Open Graph baked into static HTML at build time (`scripts/prerender-meta.js`, config in `src/seo/pages.json`), JSON-LD Person schema, sitemap, new favicon + OG image, self-hosted fonts, skip link, labeled form fields, keyboard-friendly nav, reduced-motion support, loading states, and a Playwright + axe test suite (`yarn build && yarn test:e2e`) that currently passes.

## How I want you to work
- Keep my existing code style. Make targeted, minimal changes; no wholesale rewrites, no framework migration.
- JavaScript only, no TypeScript.
- Every change must keep `yarn build` (with `CI=true`) and `yarn test:e2e` passing. Add a Playwright test for every new feature.
- Collect only the data a feature truly needs. Anything that adds cookies, analytics or a third party must go through `src/consent.js` and be listed in the Cookie/Privacy pages.
- Never invent testimonials, metrics, employers or clients. If a section needs content only I have, write a placeholder and ask me for it.
- Use the skills in `.claude/skills/`: **impeccable** to critique and polish the design, **design-taste-frontend** (taste) to avoid generic "AI portfolio" look, and **playwright-cli** to click through the real site, take screenshots, and verify on desktop and mobile.

## What I want from you, in this order
1. **Audit (no code yet).** Open the live site with playwright-cli on desktop (1280px) and mobile (Pixel 7). Run `/impeccable critique` and the taste skill's review. Give me the top 10 problems ranked by impact on "does a recruiter contact me?", each with: what's wrong, why it matters, the fix, effort (S/M/L).
2. **Content review.** My hero and About still describe me as a "Data Analytics Specialist / Applications Developer". Suggest sharper copy that reflects my current SAP/Fiori role and my data background, in my own plain voice. Give 2–3 options for the hero line.
3. **Feature roadmap.** Evaluate these and recommend which 3–5 to build first, with reasons:
   - Project case-study pages (`/projects/<slug>`) with problem → approach → result, screenshots, and their own meta/OG tags
   - Work experience timeline (there's an old `feature-work-experience` branch to reuse)
   - Inline resume viewer (react-pdf is already a dependency) next to the download
   - Project filtering by tech (SAP, Data, Web)
   - Short "Notes" / blog for SEO (e.g. Fiori and ABAP write-ups)
   - Light/dark theme toggle
   - Live GitHub activity or pinned repos
   - "Available for" status and a calendar link in the contact section
   - Anything you think is missing
4. **Findability on Google.** Review my SEO setup and tell me what else to do, including whether to move to a custom domain (e.g. aryantimla.com) or the `atimlaa.github.io` root repo, and whether to prerender full HTML (not just meta tags) at build time.
5. **Implementation plan.** For the items I approve, give a step-by-step plan with the files to touch, then implement one item at a time, run the tests, and show me screenshots before moving on.

Ask me up to 3 questions first if anything above is unclear.
