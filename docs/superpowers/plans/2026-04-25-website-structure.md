# Website Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the structural skeleton of an immigration services website per the 2026-04-25 design spec: goal-first homepage, goal page with grouped list, detail page with back link and related programs.

**Architecture:** Astro static site using content collections. Markdown files are the source of truth for all service content. Mobile-first CSS, no JS framework, vanilla JS only for the hamburger drawer. Astro's View Transitions provide the 200ms fade.

**Tech Stack:** Astro 4.x, TypeScript, Zod (via Astro content schemas), Playwright for end-to-end tests, vanilla CSS with custom property tokens.

**Spec reference:** `docs/superpowers/specs/2026-04-25-website-structure-design.log`

---

## File structure

Files to create, grouped by responsibility.

**Project config**
- `package.json`, `tsconfig.json`, `astro.config.mjs`, `.nvmrc`

**Content (Markdown, source of truth)**
- `src/content/config.ts` (collection schemas)
- `src/content/goals/*.md` (one per goal: immigrate, study, work, visit, sponsor, invest, hire, refugee, appeals)
- `src/content/programs/*.md` (one per service program, scoped to a goal via frontmatter)

**Styles**
- `src/styles/tokens.css` (colors, spacing, type scale)
- `src/styles/global.css` (resets, base typography)

**Layouts**
- `src/layouts/BaseLayout.astro` (HTML shell, header, footer, view transitions)

**Components**
- `src/components/HamburgerNav.astro` (top nav, brand, drawer toggle)
- `src/components/SiteFooter.astro`
- `src/components/GoalGrid.astro` (homepage tiles)
- `src/components/GoalTile.astro` (single tile)
- `src/components/ProgramListItem.astro` (a row in the grouped list)
- `src/components/BackLink.astro` (top-of-page back link on detail pages)
- `src/components/RelatedPrograms.astro` (footer block on detail pages)
- `src/components/ConsultationCTA.astro` (single CTA at bottom of detail pages)

**Routes**
- `src/pages/index.astro` (homepage)
- `src/pages/[goal]/index.astro` (goal page)
- `src/pages/[goal]/[slug].astro` (detail page)
- `src/pages/contact.astro` (placeholder target for the CTA)

**Tests**
- `tests/e2e/two-tap-navigation.spec.ts`
- `playwright.config.ts`

---

## Task 1: Bootstrap Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.nvmrc`
- Create: `src/pages/index.astro` (placeholder)

- [ ] **Step 1.1: Create `package.json`**

```json
{
  "name": "immigration-site",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "astro": "^4.16.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@playwright/test": "^1.48.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 1.2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  build: { format: 'directory' },
  trailingSlash: 'never',
});
```

- [ ] **Step 1.3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 1.4: Create `.nvmrc`**

```
22
```

- [ ] **Step 1.5: Create placeholder homepage `src/pages/index.astro`**

```astro
---
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Immigration Services</title>
  </head>
  <body>
    <h1>Bootstrap OK</h1>
  </body>
</html>
```

- [ ] **Step 1.6: Install dependencies**

Run: `npm install`
Expected: dependencies install without errors, `node_modules/` and `package-lock.json` appear.

- [ ] **Step 1.7: Verify build**

Run: `npm run build`
Expected: build completes, `dist/index.html` exists with text "Bootstrap OK".

- [ ] **Step 1.8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .nvmrc src/pages/index.astro
git commit -m "chore: bootstrap Astro project"
```

---

## Task 2: Content collection schemas

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/goals/immigrate.md` (one sample to validate the schema)

- [ ] **Step 2.1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const goals = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    order: z.number(),
    intro: z.string().optional(),
  }),
});

const programs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    goal: z.string(),
    category: z.string(),
    order: z.number(),
    summary: z.string(),
  }),
});

export const collections = { goals, programs };
```

- [ ] **Step 2.2: Create one sample goal at `src/content/goals/immigrate.md`**

```markdown
---
title: Immigrate to Canada
slug: immigrate
icon: maple
order: 1
intro: Pathways to permanent residence in Canada.
---

This is the introductory section for users exploring permanent residence options.
```

- [ ] **Step 2.3: Verify schema validation**

Run: `npm run check`
Expected: zero errors. Astro reports the goals and programs collections.

- [ ] **Step 2.4: Commit**

```bash
git add src/content/config.ts src/content/goals/immigrate.md
git commit -m "feat(content): define goals and programs collection schemas"
```

---

## Task 3: Design tokens and global styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

- [ ] **Step 3.1: Create `src/styles/tokens.css`**

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f6f9fc;
  --color-surface-2: #e8f0f7;
  --color-border: #d8e3ee;
  --color-text: #1a2330;
  --color-text-muted: #5a6b7e;
  --color-primary: #1a3a5c;
  --color-primary-contrast: #ffffff;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;

  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;

  --radius: 8px;
  --tap-target: 44px;
  --max-width: 720px;
}
```

- [ ] **Step 3.2: Create `src/styles/global.css`**

```css
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.5;
}
a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; height: auto; display: block; }
button { font: inherit; cursor: pointer; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-4);
}
```

- [ ] **Step 3.3: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat(styles): add design tokens and global styles"
```

---

## Task 4: Base layout with header and footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/HamburgerNav.astro`
- Create: `src/components/SiteFooter.astro`

- [ ] **Step 4.1: Create `src/components/HamburgerNav.astro`**

```astro
---
import { getCollection } from 'astro:content';
const goals = (await getCollection('goals')).sort((a, b) => a.data.order - b.data.order);
---
<header class="topnav">
  <div class="container topnav__inner">
    <a class="topnav__brand" href="/">Immigration Services</a>
    <button class="topnav__ham" aria-controls="sitemenu" aria-expanded="false" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav id="sitemenu" class="drawer" hidden>
    <ul class="drawer__list">
      {goals.map(g => (
        <li><a href={`/${g.data.slug}`}>{g.data.title}</a></li>
      ))}
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<style>
  .topnav { background: var(--color-primary); color: var(--color-primary-contrast); }
  .topnav__inner { display: flex; align-items: center; justify-content: space-between; min-height: var(--tap-target); }
  .topnav__brand { color: inherit; font-weight: 700; }
  .topnav__ham {
    background: transparent; border: 0; color: inherit;
    width: var(--tap-target); height: var(--tap-target);
    display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  }
  .topnav__ham span { display: block; width: 22px; height: 2px; background: currentColor; }
  .drawer { background: var(--color-primary); }
  .drawer[hidden] { display: none; }
  .drawer__list { list-style: none; margin: 0; padding: var(--space-2) 0; }
  .drawer__list li a {
    display: block; padding: var(--space-3) var(--space-4); min-height: var(--tap-target);
    color: var(--color-primary-contrast);
  }
</style>

<script>
  const btn = document.querySelector('.topnav__ham');
  const menu = document.getElementById('sitemenu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.hasAttribute('hidden') ? false : true;
      if (open) {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        menu.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }
</script>
```

- [ ] **Step 4.2: Create `src/components/SiteFooter.astro`**

```astro
---
---
<footer class="sitefoot">
  <div class="container">
    <p>Immigration Services Inc. Information here is general and not legal advice.</p>
  </div>
</footer>

<style>
  .sitefoot {
    background: var(--color-surface);
    color: var(--color-text-muted);
    padding: var(--space-5) 0;
    margin-top: var(--space-7);
    font-size: var(--font-size-sm);
  }
</style>
```

- [ ] **Step 4.3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/tokens.css';
import '../styles/global.css';
import HamburgerNav from '../components/HamburgerNav.astro';
import SiteFooter from '../components/SiteFooter.astro';

interface Props { title: string; description?: string; }
const { title, description = 'Canadian immigration services.' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <HamburgerNav />
    <main class="container main"><slot /></main>
    <SiteFooter />
  </body>
</html>

<style>
  .main { padding-top: var(--space-5); padding-bottom: var(--space-6); }
</style>
```

- [ ] **Step 4.4: Replace placeholder homepage to use BaseLayout**

Edit `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Immigration Services">
  <h1>Welcome</h1>
  <p>This homepage will display the goal grid in the next task.</p>
</BaseLayout>
```

- [ ] **Step 4.5: Verify build and visual check**

Run: `npm run build`
Expected: build succeeds. Open `dist/index.html` and confirm header, hamburger button, footer all render.

- [ ] **Step 4.6: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/HamburgerNav.astro src/components/SiteFooter.astro src/pages/index.astro
git commit -m "feat(layout): base layout with hamburger nav and footer"
```

---

## Task 5: Goal grid on the homepage

**Files:**
- Create: `src/components/GoalTile.astro`
- Create: `src/components/GoalGrid.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 5.1: Create `src/components/GoalTile.astro`**

```astro
---
interface Props { title: string; slug: string; icon: string; }
const { title, slug, icon } = Astro.props;
---
<a class="goaltile" href={`/${slug}`}>
  <span class="goaltile__icon" aria-hidden="true">{icon}</span>
  <span class="goaltile__title">{title}</span>
</a>

<style>
  .goaltile {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--space-2);
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-primary);
    text-decoration: none;
    text-align: center;
    padding: var(--space-4) var(--space-2);
    min-height: 96px;
    font-weight: 600;
  }
  .goaltile__icon { font-size: 28px; }
  .goaltile__title { font-size: var(--font-size-base); }
</style>
```

- [ ] **Step 5.2: Create `src/components/GoalGrid.astro`**

```astro
---
import { getCollection } from 'astro:content';
import GoalTile from './GoalTile.astro';
const goals = (await getCollection('goals')).sort((a, b) => a.data.order - b.data.order);
---
<section class="goalgrid">
  <h1 class="goalgrid__heading">I want to...</h1>
  <p class="goalgrid__sub">Find the right path for you</p>
  <div class="goalgrid__tiles">
    {goals.map(g => (
      <GoalTile title={g.data.title} slug={g.data.slug} icon={g.data.icon} />
    ))}
  </div>
</section>

<style>
  .goalgrid__heading { font-size: var(--font-size-2xl); margin: 0 0 var(--space-1) 0; color: var(--color-primary); text-align: center; }
  .goalgrid__sub { color: var(--color-text-muted); text-align: center; margin: 0 0 var(--space-5) 0; }
  .goalgrid__tiles { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
  @media (min-width: 720px) {
    .goalgrid__tiles { grid-template-columns: 1fr 1fr 1fr; }
  }
</style>
```

- [ ] **Step 5.3: Replace homepage body**

Edit `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import GoalGrid from '../components/GoalGrid.astro';
---
<BaseLayout title="Immigration Services">
  <GoalGrid />
</BaseLayout>
```

- [ ] **Step 5.4: Verify**

Run: `npm run dev`
Open http://localhost:4321/. Expected: tiles render in 2 columns on a narrow viewport. Stop the dev server (Ctrl-C).

- [ ] **Step 5.5: Commit**

```bash
git add src/components/GoalTile.astro src/components/GoalGrid.astro src/pages/index.astro
git commit -m "feat(home): goal grid component and homepage wiring"
```

---

## Task 6: Goal page route with grouped list

**Files:**
- Create: `src/components/ProgramListItem.astro`
- Create: `src/components/BackLink.astro`
- Create: `src/pages/[goal]/index.astro`

- [ ] **Step 6.1: Create `src/components/BackLink.astro`**

```astro
---
interface Props { href: string; label: string; }
const { href, label } = Astro.props;
---
<a class="backlink" href={href}>‹ {label}</a>

<style>
  .backlink {
    display: inline-flex; align-items: center;
    min-height: var(--tap-target);
    padding: var(--space-2) var(--space-3);
    background: var(--color-surface);
    border-radius: var(--radius);
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-3);
  }
</style>
```

- [ ] **Step 6.2: Create `src/components/ProgramListItem.astro`**

```astro
---
interface Props { title: string; href: string; summary?: string; }
const { title, href, summary } = Astro.props;
---
<a class="prog" href={href}>
  <span class="prog__body">
    <span class="prog__title">{title}</span>
    {summary && <span class="prog__summary">{summary}</span>}
  </span>
  <span class="prog__chev" aria-hidden="true">›</span>
</a>

<style>
  .prog {
    display: flex; align-items: center; justify-content: space-between;
    gap: var(--space-3);
    background: var(--color-surface);
    border-radius: var(--radius);
    padding: var(--space-3) var(--space-4);
    min-height: var(--tap-target);
    color: var(--color-text);
    margin: var(--space-1) 0;
  }
  .prog__body { display: flex; flex-direction: column; gap: 2px; }
  .prog__title { font-weight: 600; color: var(--color-primary); }
  .prog__summary { font-size: var(--font-size-sm); color: var(--color-text-muted); }
  .prog__chev { color: var(--color-text-muted); font-size: var(--font-size-lg); }
</style>
```

- [ ] **Step 6.3: Create `src/pages/[goal]/index.astro`**

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import BackLink from '../../components/BackLink.astro';
import ProgramListItem from '../../components/ProgramListItem.astro';

export async function getStaticPaths() {
  const goals = await getCollection('goals');
  return goals.map(g => ({ params: { goal: g.data.slug }, props: { goalEntry: g } }));
}

const { goalEntry } = Astro.props;
const allPrograms = await getCollection('programs', p => p.data.goal === goalEntry.data.slug);
const sortedPrograms = allPrograms.sort((a, b) => a.data.order - b.data.order);

const grouped = new Map<string, typeof sortedPrograms>();
for (const p of sortedPrograms) {
  const cat = p.data.category;
  if (!grouped.has(cat)) grouped.set(cat, []);
  grouped.get(cat)!.push(p);
}
const categories = Array.from(grouped.entries());

const { Content } = await goalEntry.render();
---
<BaseLayout title={goalEntry.data.title}>
  <BackLink href="/" label="Home" />
  <h1>{goalEntry.data.title}</h1>
  {goalEntry.data.intro && <p class="intro">{goalEntry.data.intro}</p>}
  <div class="goalbody"><Content /></div>

  {categories.map(([cat, items]) => (
    <section class="catgroup">
      <h2 class="catgroup__title">{cat}</h2>
      {items.map(p => (
        <ProgramListItem
          title={p.data.title}
          href={`/${goalEntry.data.slug}/${p.data.slug}`}
          summary={p.data.summary}
        />
      ))}
    </section>
  ))}
</BaseLayout>

<style>
  h1 { font-size: var(--font-size-2xl); color: var(--color-primary); margin: 0 0 var(--space-2) 0; }
  .intro { color: var(--color-text-muted); margin: 0 0 var(--space-4) 0; }
  .goalbody { margin-bottom: var(--space-5); }
  .catgroup { margin: var(--space-5) 0; }
  .catgroup__title {
    font-size: var(--font-size-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-primary);
    margin: 0 0 var(--space-2) 0;
    padding-bottom: var(--space-1);
    border-bottom: 1px solid var(--color-border);
  }
</style>
```

- [ ] **Step 6.4: Verify**

Run: `npm run check`
Expected: zero errors. The goal page builds with the existing single goal entry, no programs yet.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/BackLink.astro src/components/ProgramListItem.astro "src/pages/[goal]/index.astro"
git commit -m "feat(goal-page): grouped list route under /:goal"
```

---

## Task 7: Detail page route with body, related, and CTA

**Files:**
- Create: `src/components/ConsultationCTA.astro`
- Create: `src/components/RelatedPrograms.astro`
- Create: `src/pages/[goal]/[slug].astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 7.1: Create `src/components/ConsultationCTA.astro`**

```astro
---
---
<a class="cta" href="/contact">Book a consultation →</a>

<style>
  .cta {
    display: inline-flex; align-items: center;
    background: var(--color-primary);
    color: var(--color-primary-contrast);
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius);
    font-weight: 600;
    margin-top: var(--space-5);
    min-height: var(--tap-target);
  }
  .cta:hover { text-decoration: none; opacity: 0.95; }
</style>
```

- [ ] **Step 7.2: Create `src/components/RelatedPrograms.astro`**

```astro
---
interface Item { title: string; href: string; }
interface Props { items: Item[]; }
const { items } = Astro.props;
---
{items.length > 0 && (
  <aside class="related">
    <h3 class="related__title">Related programs</h3>
    <ul class="related__list">
      {items.map(i => (<li><a href={i.href}>{i.title}</a></li>))}
    </ul>
  </aside>
)}

<style>
  .related {
    background: var(--color-surface);
    border-radius: var(--radius);
    padding: var(--space-4);
    margin-top: var(--space-6);
  }
  .related__title {
    font-size: var(--font-size-sm);
    color: var(--color-primary);
    margin: 0 0 var(--space-2) 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .related__list { list-style: none; padding: 0; margin: 0; }
  .related__list li { padding: var(--space-2) 0; }
</style>
```

- [ ] **Step 7.3: Create `src/pages/[goal]/[slug].astro`**

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import BackLink from '../../components/BackLink.astro';
import RelatedPrograms from '../../components/RelatedPrograms.astro';
import ConsultationCTA from '../../components/ConsultationCTA.astro';

export async function getStaticPaths() {
  const programs = await getCollection('programs');
  return programs.map(p => ({
    params: { goal: p.data.goal, slug: p.data.slug },
    props: { program: p },
  }));
}

const { program } = Astro.props;
const goalEntry = await getEntry('goals', program.data.goal);
const siblings = (await getCollection('programs', p =>
  p.data.goal === program.data.goal &&
  p.data.category === program.data.category &&
  p.data.slug !== program.data.slug
)).sort((a, b) => a.data.order - b.data.order);

const related = siblings.map(s => ({
  title: s.data.title,
  href: `/${s.data.goal}/${s.data.slug}`,
}));

const { Content } = await program.render();
---
<BaseLayout title={`${program.data.title} | ${goalEntry?.data.title ?? 'Immigration Services'}`}>
  <BackLink
    href={`/${program.data.goal}#${program.data.category.replace(/\s+/g, '-').toLowerCase()}`}
    label={`All ${program.data.category} programs`}
  />
  <h1>{program.data.title}</h1>
  <p class="lede">{program.data.summary}</p>
  <div class="prose"><Content /></div>
  <ConsultationCTA />
  <RelatedPrograms items={related} />
</BaseLayout>

<style>
  h1 { font-size: var(--font-size-2xl); color: var(--color-primary); margin: 0 0 var(--space-2) 0; }
  .lede { color: var(--color-text-muted); margin: 0 0 var(--space-4) 0; }
  .prose h2 { font-size: var(--font-size-lg); color: var(--color-primary); margin-top: var(--space-5); }
  .prose p { margin: var(--space-3) 0; }
</style>
```

- [ ] **Step 7.4: Add anchor IDs to category sections in the goal page**

Edit `src/pages/[goal]/index.astro`. Find:

```astro
{categories.map(([cat, items]) => (
  <section class="catgroup">
    <h2 class="catgroup__title">{cat}</h2>
```

Replace with:

```astro
{categories.map(([cat, items]) => (
  <section class="catgroup" id={cat.replace(/\s+/g, '-').toLowerCase()}>
    <h2 class="catgroup__title">{cat}</h2>
```

- [ ] **Step 7.5: Create `src/pages/contact.astro` placeholder**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import BackLink from '../components/BackLink.astro';
---
<BaseLayout title="Contact">
  <BackLink href="/" label="Home" />
  <h1>Contact</h1>
  <p>The consultation booking form lives here. Spec defers implementation to a later milestone.</p>
</BaseLayout>
```

- [ ] **Step 7.6: Verify build**

Run: `npm run build`
Expected: build succeeds with no programs yet (the dynamic `[slug].astro` route generates zero pages until programs exist).

- [ ] **Step 7.7: Commit**

```bash
git add src/components/ConsultationCTA.astro src/components/RelatedPrograms.astro "src/pages/[goal]/[slug].astro" "src/pages/[goal]/index.astro" src/pages/contact.astro
git commit -m "feat(detail): detail page with back link, related, CTA"
```

---

## Task 8: View Transitions fade

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 8.1: Add ViewTransitions and fade CSS**

In `src/layouts/BaseLayout.astro`, update the imports at the top of the frontmatter:

```astro
---
import '../styles/tokens.css';
import '../styles/global.css';
import HamburgerNav from '../components/HamburgerNav.astro';
import SiteFooter from '../components/SiteFooter.astro';
import { ViewTransitions } from 'astro:transitions';

interface Props { title: string; description?: string; }
const { title, description = 'Canadian immigration services.' } = Astro.props;
---
```

Then add `<ViewTransitions />` inside `<head>`, and append the fade styles to the existing `<style>` block:

```astro
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <ViewTransitions />
</head>
```

```astro
<style>
  .main { padding-top: var(--space-5); padding-bottom: var(--space-6); }

  @media (prefers-reduced-motion: no-preference) {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 200ms;
      animation-timing-function: ease-in-out;
    }
  }
</style>
```

- [ ] **Step 8.2: Verify build**

Run: `npm run build`
Expected: build succeeds. The output HTML includes the `astro:transitions` script.

- [ ] **Step 8.3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(transitions): 200ms fade between routes"
```

---

## Task 9: Seed content for all 9 goals plus a sample tree under Immigrate

**Files:**
- Modify: `src/content/goals/immigrate.md`
- Create: `src/content/goals/{study,work,visit,sponsor,invest,hire,refugee,appeals}.md`
- Create: `src/content/programs/{cec,fsw,fst,category-based,bc-pnp,oinp,aaip,sinp,spouse-sponsorship,parents-sponsorship,study-permit,pgwp,visitor-visa,super-visa,start-up-visa,tfwp,refugee-claim,immigration-appeals}.md`

This task creates real content from `content_init.txt`. Each program file contains the program name, a one-line summary used on listings, and a body with eligibility and process notes drawn from public knowledge of the program. No invented programs or details.

- [ ] **Step 9.1: Update `src/content/goals/immigrate.md`**

```markdown
---
title: Immigrate to Canada
slug: immigrate
icon: 🍁
order: 1
intro: Pathways to permanent residence in Canada.
---
```

- [ ] **Step 9.2: Create remaining 8 goal entries**

`src/content/goals/sponsor.md`:

```markdown
---
title: Sponsor a Family Member
slug: sponsor
icon: 👨‍👩‍👧
order: 2
intro: Bring your spouse, partner, children, parents, or relatives to Canada.
---
```

`src/content/goals/study.md`:

```markdown
---
title: Study in Canada
slug: study
icon: 🎓
order: 3
intro: Study permits, working while studying, and post-graduation pathways.
---
```

`src/content/goals/work.md`:

```markdown
---
title: Work in Canada
slug: work
icon: 💼
order: 4
intro: Open and closed work permits, mobility programs, and trade-based options.
---
```

`src/content/goals/visit.md`:

```markdown
---
title: Visit Canada
slug: visit
icon: ✈️
order: 5
intro: Visitor visas, electronic travel authorizations, and visit extensions.
---
```

`src/content/goals/invest.md`:

```markdown
---
title: Invest in Canada
slug: invest
icon: 💰
order: 6
intro: Programs for entrepreneurs, investors, and intra-company transfers.
---
```

`src/content/goals/hire.md`:

```markdown
---
title: Hire a Foreign Worker
slug: hire
icon: 🏢
order: 7
intro: Programs and assessments for Canadian employers hiring abroad.
---
```

`src/content/goals/refugee.md`:

```markdown
---
title: Refugee and Humanitarian
slug: refugee
icon: 🛡️
order: 8
intro: Refugee claims, hearings, appeals, and humanitarian considerations.
---
```

`src/content/goals/appeals.md`:

```markdown
---
title: Appeals and Enforcement
slug: appeals
icon: ⚖️
order: 9
intro: Immigration appeals, inadmissibility, removal orders, and risk assessments.
---
```

- [ ] **Step 9.3: Create program entries under Immigrate**

`src/content/programs/cec.md`:

```markdown
---
title: Canadian Experience Class
slug: cec
goal: immigrate
category: Express Entry
order: 1
summary: Permanent residence for skilled workers with Canadian work experience.
---

## Who it is for

People who already worked in Canada in a skilled occupation and want to apply for permanent residence.

## Key requirements

At least one year of full-time skilled work experience in Canada within the last three years, plus the language results required for the National Occupational Classification level of that work.

## Process overview

Submit an Express Entry profile, receive an Invitation to Apply when your score qualifies, then submit a complete application.
```

`src/content/programs/fsw.md`:

```markdown
---
title: Federal Skilled Worker
slug: fsw
goal: immigrate
category: Express Entry
order: 2
summary: Permanent residence for skilled workers with foreign experience.
---

## Who it is for

Skilled workers with experience outside Canada who meet the points threshold.

## Key requirements

Eligible work experience, language test results, education credentials assessed against Canadian standards, and proof of settlement funds.

## Process overview

Express Entry profile, score against the Comprehensive Ranking System, await an Invitation to Apply.
```

`src/content/programs/fst.md`:

```markdown
---
title: Federal Skilled Trades
slug: fst
goal: immigrate
category: Express Entry
order: 3
summary: Permanent residence for qualified tradespeople.
---

## Who it is for

People with experience in eligible skilled trades who meet language and offer or certification requirements.

## Key requirements

Two years of full-time work in an eligible trade in the last five years, plus a job offer or a certificate of qualification from a Canadian authority.
```

`src/content/programs/category-based.md`:

```markdown
---
title: Category-Based Selection
slug: category-based
goal: immigrate
category: Express Entry
order: 4
summary: Targeted Express Entry draws based on occupation, language, or other priorities.
---

Category-based draws invite candidates with attributes published by the immigration minister, such as proficiency in French or experience in priority occupations.
```

`src/content/programs/bc-pnp.md`:

```markdown
---
title: British Columbia PNP
slug: bc-pnp
goal: immigrate
category: Provincial Nominee
order: 1
summary: Permanent residence nomination through the BC Provincial Nominee Program.
---

The BC PNP nominates skilled workers, healthcare professionals, students, and entrepreneurs who meet provincial labour market needs.
```

`src/content/programs/oinp.md`:

```markdown
---
title: Ontario Immigrant Nominee Program
slug: oinp
goal: immigrate
category: Provincial Nominee
order: 2
summary: Permanent residence nomination through Ontario's program.
---

OINP nominates international workers, students, and entrepreneurs who can support Ontario's economy.
```

`src/content/programs/aaip.md`:

```markdown
---
title: Alberta Advantage Immigration Program
slug: aaip
goal: immigrate
category: Provincial Nominee
order: 3
summary: Permanent residence nomination through Alberta.
---

AAIP nominates workers and entrepreneurs whose skills and plans support Alberta's labour market.
```

`src/content/programs/sinp.md`:

```markdown
---
title: Saskatchewan Immigrant Nominee Program
slug: sinp
goal: immigrate
category: Provincial Nominee
order: 4
summary: Permanent residence nomination through Saskatchewan.
---

SINP nominates skilled workers, semi-skilled workers, and entrepreneurs in priority occupations.
```

`src/content/programs/spouse-sponsorship.md`:

```markdown
---
title: Sponsor your Spouse or Partner
slug: spouse-sponsorship
goal: immigrate
category: Family Sponsorship
order: 1
summary: Sponsor a spouse, common-law partner, or conjugal partner for permanent residence.
---

Eligible Canadian citizens and permanent residents can sponsor a spouse or partner. The sponsor must meet undertaking requirements and pass the relationship genuineness assessment.
```

`src/content/programs/parents-sponsorship.md`:

```markdown
---
title: Sponsor your Parents or Grandparents
slug: parents-sponsorship
goal: immigrate
category: Family Sponsorship
order: 2
summary: Sponsor parents or grandparents for permanent residence.
---

Sponsorship of parents and grandparents follows an annual intake process. Sponsors must meet the Minimum Necessary Income for the prior three years.
```

- [ ] **Step 9.4: Create one or two program entries per remaining goal**

These exist so each goal page renders with at least one item, validating the route end-to-end. Remaining content is authored later.

`src/content/programs/study-permit.md`:

```markdown
---
title: Study Permit
slug: study-permit
goal: study
category: Study
order: 1
summary: Authorization to attend a designated learning institution in Canada.
---

A study permit is required for most international students enrolled in programs longer than six months. Eligibility includes acceptance at a designated learning institution and proof of funds.
```

`src/content/programs/pgwp.md`:

```markdown
---
title: Post-Graduation Work Permit
slug: pgwp
goal: study
category: After Graduation
order: 1
summary: Open work permit for graduates of eligible Canadian programs.
---

The PGWP allows graduates to work for any Canadian employer for up to three years, depending on program length.
```

`src/content/programs/spousal-open-work-permit.md`:

```markdown
---
title: Spousal Open Work Permit
slug: spousal-open-work-permit
goal: work
category: Open Work Permits
order: 1
summary: Open work permit for spouses of eligible workers and students.
---

Spouses of certain study permit holders and skilled workers may qualify for an open work permit.
```

`src/content/programs/tfwp.md`:

```markdown
---
title: Temporary Foreign Worker Program
slug: tfwp
goal: work
category: Closed Work Permits
order: 1
summary: Employer-sponsored work permits requiring a Labour Market Impact Assessment.
---

The TFWP authorizes employers to hire foreign workers when no Canadian worker is available, with an LMIA from Service Canada.
```

`src/content/programs/visitor-visa.md`:

```markdown
---
title: Visitor Visa
slug: visitor-visa
goal: visit
category: Temporary Resident Visa
order: 1
summary: Temporary entry for tourism, family visits, or business meetings.
---

A visitor visa is a counterfoil placed in a passport for nationals of countries that require a TRV.
```

`src/content/programs/super-visa.md`:

```markdown
---
title: Super Visa for Parents and Grandparents
slug: super-visa
goal: visit
category: Temporary Resident Visa
order: 2
summary: Multi-entry visa for parents and grandparents of citizens and permanent residents.
---

The super visa allows extended visits, with required medical insurance and an invitation from the host.
```

`src/content/programs/spouse-sponsorship-quick.md`:

```markdown
---
title: Sponsor your Spouse or Partner
slug: spouse-sponsorship-quick
goal: sponsor
category: Spouse and Partner
order: 1
summary: Sponsor a spouse, common-law partner, or conjugal partner.
---

Eligible Canadian citizens and permanent residents can sponsor a spouse or partner for permanent residence.
```

`src/content/programs/start-up-visa.md`:

```markdown
---
title: Start-Up Visa
slug: start-up-visa
goal: invest
category: Federal Programs
order: 1
summary: Permanent residence for entrepreneurs with backing from a designated organization.
---

The Start-Up Visa connects immigrant entrepreneurs with designated venture capital funds, angel investor groups, or business incubators.
```

`src/content/programs/lmia.md`:

```markdown
---
title: Labour Market Impact Assessment
slug: lmia
goal: hire
category: Employer Programs
order: 1
summary: Federal assessment that allows an employer to hire a foreign worker.
---

An LMIA is the assessment Service Canada conducts to confirm that hiring a foreign worker will not harm the Canadian labour market.
```

`src/content/programs/refugee-claim.md`:

```markdown
---
title: Make a Refugee Claim
slug: refugee-claim
goal: refugee
category: Inland Claims
order: 1
summary: Process for claiming refugee protection from inside Canada.
---

A refugee claim is filed with the Canada Border Services Agency or Immigration, Refugees and Citizenship Canada and is assessed by the Refugee Protection Division.
```

`src/content/programs/immigration-appeals.md`:

```markdown
---
title: Immigration Appeals
slug: immigration-appeals
goal: appeals
category: Immigration Appeal Division
order: 1
summary: Appeals against sponsorship refusals, removal orders, and residency obligations.
---

Immigration appeals are heard by the Immigration Appeal Division of the Immigration and Refugee Board.
```

- [ ] **Step 9.5: Verify build**

Run: `npm run build`
Expected: build emits HTML for `/`, `/immigrate`, all 8 other goals, and one `/goal/slug` per program. Inspect `dist/immigrate/index.html` and one detail page to confirm rendering.

- [ ] **Step 9.6: Commit**

```bash
git add src/content/goals/ src/content/programs/
git commit -m "content: seed 9 goals and sample programs covering each"
```

---

## Task 10: End-to-end test for two-tap navigation

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/two-tap-navigation.spec.ts`

- [ ] **Step 10.1: Install Playwright browsers**

Run: `npx playwright install chromium`
Expected: Chromium downloads.

- [ ] **Step 10.2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 390, height: 844 },
  },
  projects: [
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 10.3: Write the failing test**

Create `tests/e2e/two-tap-navigation.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('homepage to detail page in two taps', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'I want to...' })).toBeVisible();

  // tap 1: choose goal
  await page.getByRole('link', { name: /Immigrate to Canada/ }).click();
  await expect(page.getByRole('heading', { name: 'Immigrate to Canada' })).toBeVisible();

  // tap 2: choose program
  await page.getByRole('link', { name: /Canadian Experience Class/ }).click();
  await expect(page.getByRole('heading', { name: 'Canadian Experience Class' })).toBeVisible();

  // back link visible
  await expect(page.getByRole('link', { name: /All Express Entry programs/ })).toBeVisible();

  // CTA visible
  await expect(page.getByRole('link', { name: /Book a consultation/ })).toBeVisible();
});

test('every homepage tile leads somewhere', async ({ page }) => {
  await page.goto('/');
  const tiles = page.locator('.goaltile');
  const count = await tiles.count();
  expect(count).toBeGreaterThanOrEqual(9);
  for (let i = 0; i < count; i++) {
    const href = await tiles.nth(i).getAttribute('href');
    expect(href).not.toBeNull();
  }
});
```

- [ ] **Step 10.4: Run the tests**

Run: `npm run test:e2e`
Expected: both tests pass. The build runs first via `webServer.command`.

- [ ] **Step 10.5: Commit**

```bash
git add playwright.config.ts tests/e2e/two-tap-navigation.spec.ts package.json package-lock.json
git commit -m "test(e2e): two-tap navigation and tile coverage"
```

---

## Task 11: Update STATUS.log

**Files:**
- Modify: `STATUS.log`

- [ ] **Step 11.1: Update STATUS.log**

Replace the placeholder content with the actual current state. Set Last Updated to today, mark Initial Setup checked with the actual date, set Stage to MVP, and fill the MVP block with what was built.

Replace the contents of `STATUS.log` with:

```
- Project Status
    - Last Updated: 2026-04-25
    - Development Mode: Claude Code
    - Stage: MVP
    - Next Milestone: Author full content for the remaining goals and ship to staging.

- Development Stages
    - [x] Initial Setup
        - Created: 2026-04-25
        - Repository initialized
        - CLAUDE.md and STATUS.log in place
    - [x] Proof of Concept (POC)
        - Completed: 2026-04-25
        - Validated: Astro static site, content collections, mobile-first layout, view transitions
    - [x] Minimum Viable Product (MVP)
        - Completed: 2026-04-25
        - Core features:
            - [x] Goal-first homepage with 9 tiles
            - [x] Goal page with grouped list per category
            - [x] Detail page with back link, body, related programs, single CTA
            - [x] 200ms view transition fade
            - [x] Hamburger drawer site menu
            - [x] End-to-end test: two-tap navigation
    - [] Beta Release
        - Goal: Author complete content for all 9 goals, polish visual design, add a real contact form.
    - [] Production Ready
    - [] Maintenance Mode

- Technical Details
    - Tech Stack:
        - Astro 4.x
        - TypeScript
        - Vanilla CSS with custom property tokens
        - Playwright for end-to-end tests
    - Key Files:
        - docs/superpowers/specs/2026-04-25-website-structure-design.log
        - docs/superpowers/plans/2026-04-25-website-structure.md
        - src/content/config.ts
        - src/layouts/BaseLayout.astro
    - Architecture Notes:
        - Mobile first, English only for v1
        - Markdown-driven content collections
        - Each program has a goal and category, used for routing and grouping
        - View Transitions API for the fade between pages

- Current Focus
    - Active Tasks:
        - [] Author remaining program content
        - [] Visual design polish
        - [] Contact form implementation
    - Blockers:
        - None
    - Recent Progress:
        - 2026-04-25: Built site structure: homepage, goal pages, detail pages, view transitions, e2e test

- Notes
    - Use loglog format for documentation
    - Run /home/k1/public/update_project_status.sh after updates
    - Convert to markdown: loglog STATUS.log > STATUS.md
```

- [ ] **Step 11.2: Run the project status sync script**

Run: `/home/k1/public/update_project_status.sh`
Expected: script runs without error and syncs the master status file.

- [ ] **Step 11.3: Commit**

```bash
git add STATUS.log
git commit -m "docs(status): mark MVP complete, set Beta as next stage"
```

---

## Acceptance criteria

After Task 11, all of these must be true:

- `npm run check` reports zero errors
- `npm run build` produces `dist/` with `index.html`, one HTML file per goal, and one HTML file per program
- `npm run test:e2e` passes both tests
- A user on a phone-sized viewport can reach the CEC detail page in 2 taps from the homepage
- Every detail page shows: back link, page title, body text, single CTA, related programs block (when siblings exist)
- View Transitions fade is enabled in the layout
