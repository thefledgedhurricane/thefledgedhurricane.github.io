# Portfolio content, translation, and hosting audit

**Project:** `thefledgedhurricane.github.io`  
**Audit date:** 12 July 2026  
**Scope:** repository architecture, multilingual content, authoring workflow, SEO, accessibility, performance, security, quality assurance, and hosting

## Executive recommendation

Keep **GitHub as the source of truth**, but deploy the current static export to **Cloudflare Pages** behind a custom domain. This is a better fit than GitHub Pages for this portfolio because it provides branch/PR preview deployments, supports the existing `_headers` file, has a global edge network, and leaves room for small server-side features later. The site can remain a static Next.js export; it does not need to become a Workers/SSR application now.

Hosting is not the most urgent problem, however. The first priority is to make the public pages actually consume the content files. The repository has a good multilingual content model in TinaCMS, but much of the visible site bypasses it:

- the blog UI uses four hard-coded French articles from `PostsClient.tsx`, not `content/posts/{locale}/*.mdx`;
- projects and events are also hard-coded in client components, mostly in French;
- all seven courses are shared across every locale route and their `locale` fields are empty;
- the four `hello-world.mdx` translations exist, but they currently have no public article route and do not drive the article list;
- the CMS schemas describe projects, publications, and events, but the corresponding content directories/data pipeline do not exist;
- locale dictionaries translate page chrome, but not most substantive content.

The best sequence is therefore:

1. establish one canonical content pipeline;
2. add content validation and translation-status checks;
3. create real, crawlable article/project routes with locale-aware metadata;
4. improve the content itself;
5. move delivery to Cloudflare Pages and attach a custom domain;
6. measure performance and search results before adding server-side complexity.

## What is already strong

- Next.js App Router with TypeScript and a static export is appropriate for a portfolio and learning-resource site.
- Arabic, French, English, and Spanish routes already exist, including RTL document direction and an Arabic font.
- UI copy is separated into locale dictionaries.
- Blog frontmatter already includes `locale`, `translationKey`, `slug`, summary, tags, date, reading time, and hero image.
- TinaCMS schemas anticipate posts, projects, publications, events, translations, and courses.
- The site has a generated sitemap and robots policy.
- Basic accessibility work exists: focus-visible styles, reduced-motion CSS, some ARIA labels, and RTL-aware classes.
- GitHub Actions already installs with a frozen lockfile, type-checks, builds, and runs dependency audits.
- Static export keeps hosting simple, inexpensive, cacheable, and resilient.

## Current architecture and observed gaps

| Area | Current implementation | Main gap | Priority |
|---|---|---|---|
| UI translations | Four JSON dictionaries | Good for navigation/page chrome only; no automated key-parity check | P1 |
| Blog source | Four localized MDX files | Public blog ignores them and renders hard-coded French JSX | P0 |
| Blog URLs | Selection is client-side state | No crawlable `/[lang]/posts/[slug]/` pages, refreshable URL, or per-article metadata | P0 |
| Projects | Tina schema plus hard-coded client array | No content-backed localized project collection | P0 |
| Events | Tina schema plus hard-coded client array | No content-backed localized event collection | P0 |
| Publications | Hard-coded English records | No content collection/read path; abstracts may not need translation but surrounding text does | P1 |
| Courses | Seven JSON files imported at build time | `locale` is empty and one course is shown under all four languages | P1 |
| CMS | Tina local build/admin is present | Production editorial workflow and authentication are not documented or proven | P1 |
| SEO | Root metadata, sitemap, robots | Missing per-item URLs, canonicals, `hreflang`, OG/Twitter data, structured data, and content dates in sitemap | P0/P1 |
| Security headers | `public/_headers` exists | GitHub Pages does not apply this provider-specific file; CSP also allows inline/eval scripts | P1 |
| Quality | TypeScript and ESLint scripts exist | TypeScript passes; ESLint fails with 2 errors and 62 warnings | P1 |
| Deployment | GitHub Action publishes `out` to `gh-pages` | No preview environment; workflow documentation says Node 22 while workflow uses Node 24 | P2 |

### Important content-system finding

There are currently two competing sources of truth:

```text
TinaCMS/MDX/JSON content  ── currently mostly disconnected
                         X
React client arrays       ── currently rendered publicly
```

Replace this with:

```text
Canonical source content
        │
        ├── schema validation
        ├── translation completeness check
        ├── list pages
        ├── detail pages
        ├── sitemap/RSS
        └── SEO metadata and structured data
```

Content must never be duplicated in React components. Components should only render typed content received from the content layer.

## Recommended content architecture

### 1. Use one file per locale and item

Retain a predictable structure:

```text
content/
  posts/{ar,fr,en,es}/{slug}.mdx
  projects/{ar,fr,en,es}/{slug}.mdx
  publications/{publication-id}.json
  events/{ar,fr,en,es}/{event-id}.json
  courses/{ar,fr,en,es}/{course-id}.json
src/dictionaries/{ar,fr,en,es}.json
```

Scientific publication titles, venue names, DOI values, and author names should remain in their published language. Translate the site labels and optionally provide a clearly marked translated abstract; do not silently alter the bibliographic record.

### 2. Give every translated item a stable identity

Use the same `translationKey` in all language versions. A translated slug may differ by language; the key links the versions:

```yaml
locale: en
translationKey: ai-vr-cognitive-assessment
slug: ai-vr-cognitive-assessment
translationStatus: reviewed
sourceLocale: fr
sourceRevision: 2026-07-12
```

Recommended translation states are `draft`, `machine-translated`, `reviewed`, and `published`. Only `published` content should appear in production or the sitemap. Record `sourceRevision` or a source-content hash so CI can flag translations that became stale after the source changed.

### 3. Add content-backed detail routes

Create these static routes:

- `/[lang]/posts/[slug]/`
- `/[lang]/projects/[slug]/`
- optionally `/[lang]/events/[eventId]/`
- keep course IDs stable, but load the requested locale or fall back explicitly.

Each detail page should be generated at build time, have a canonical URL, language alternatives, Open Graph/Twitter metadata, a real published/modified date, and JSON-LD. Avoid opening articles through React state because the article then has no shareable or indexable URL.

### 4. Validate content during CI

Use Zod or generated Tina types to reject:

- invalid/unsupported locales;
- duplicate locale + slug pairs;
- missing `translationKey`;
- broken internal links and missing media;
- invalid dates, DOI values, and external URLs;
- absent image alt text or overly long title/description fields;
- a published translation whose source revision is stale;
- missing dictionary keys in any locale;
- course IDs, lesson IDs, quiz option IDs, or answer IDs that are duplicated.

Compute reading time from the body instead of maintaining it manually. Generate `lastModified` from content metadata or Git history rather than setting every sitemap entry to the build time.

## A sustainable writing and translation workflow

### Canonical-language policy

Choose one source language per article—not necessarily one language for the entire site. For example, research commentary may originate in English, teaching material in French, and community posts in Arabic. Store `sourceLocale` on each item.

### Editorial pipeline

1. **Brief:** audience, search intent, promise, and one primary call to action.
2. **Draft:** write the claim/evidence structure before polishing prose.
3. **Evidence pass:** link primary sources; verify names, dates, DOIs, quotations, and licenses.
4. **Clarity pass:** shorten the opening, use descriptive headings, add examples/figures, and define specialist terms.
5. **Source approval:** mark the canonical version ready for translation.
6. **Machine-assisted first translation:** use a free tool to create a draft, never an automatic publication.
7. **Terminology pass:** apply a project glossary for AI, VR, pedagogy, and Moroccan/institutional names.
8. **Human review:** review meaning, register, links, code, numbers, and Arabic RTL rendering.
9. **Preview:** inspect the Cloudflare preview on mobile and desktop in all four locales.
10. **Publish and measure:** update the source revision, merge, submit the sitemap if needed, and review search/engagement after 30–60 days.

### Translation rules that prevent drift

- Do not translate code, URLs, DOI values, product names, or bibliographic titles unless a recognized localized name exists.
- Keep one shared glossary and style guide in the repository, for example `content/translation/glossary.csv` and `content/translation/style-guide.md`.
- Prefer natural target-language headings over word-for-word translations.
- Review Arabic punctuation, numerals, inline Latin terms, bidirectional text, and alignment manually.
- Add `dir="ltr"` to code, equations, emails, and URLs inside Arabic pages.
- Treat generated text as an editorial draft. The named author remains responsible for factual accuracy and voice.
- When a translation is unavailable, either omit the language alternate or display a clearly labelled fallback. Do not pretend French content is Arabic because it sits under `/ar/`.

## Useful free tools

All tools should run locally or in CI where practical, keeping content in Git and avoiding lock-in.

| Need | Suggested free tool | Recommended use |
|---|---|---|
| Translation workspace | **OmegaT** | Desktop translation memory, glossary, and repeated-segment reuse |
| Collaborative localization | **Weblate Community/self-hosted** | Git-integrated review workflow if multiple translators join; self-hosting has operational cost |
| Local machine translation | **Argos Translate** or **LibreTranslate** | Private first drafts; quality varies considerably by language pair |
| Grammar/style | **LanguageTool** local/community edition | First-pass grammar checks for supported languages; human review still required |
| Editorial style | **Vale** | Repository-specific terminology and writing rules for Markdown/MDX |
| Spelling | **cspell** | Technical vocabulary allowlist and typo checks in source/content |
| Markdown style | **markdownlint-cli2** | Consistent Markdown structure |
| Link checking | **Lychee** | Broken internal/external link detection in CI |
| Content schema | **Zod** | Runtime/build-time validation, already a project dependency |
| Accessibility | **axe-core** plus Lighthouse | Automated checks on generated pages; supplement with keyboard/screen-reader review |
| Performance | Lighthouse CI | Budgets for LCP, CLS, INP, accessibility, and SEO |
| Analytics | **Cloudflare Web Analytics** | Privacy-oriented, lightweight traffic measurement on a Cloudflare deployment |
| Search visibility | Google Search Console and Bing Webmaster Tools | Sitemap submission, indexing, and query/page reporting |
| Image processing | **Squoosh CLI** or Sharp | Local WebP/AVIF generation and fixed responsive dimensions |

Free hosted AI/translation quotas change often and can disappear. Do not make the publishing pipeline depend on an undocumented free quota. Local/open-source tools plus human review are the durable baseline.

## Content enhancement strategy

### Portfolio information architecture

Organize around visitor intent:

- **Home:** one-sentence positioning, three proof points, selected research/project/course, and one primary contact CTA.
- **About:** concise biography, roles, affiliations, research themes, downloadable accessible CV, and verified external profiles.
- **Research/Publications:** filters by topic/year/type, DOI links, BibTeX/citation copy, open-access link when legitimate, and a short contribution summary.
- **Projects:** problem, role, method, measurable outcome, evidence/demo, technology, status, and lessons learned.
- **Teaching:** audience, prerequisites, outcomes, estimated effort, licensing, progress behavior, and course update date.
- **Writing:** topic/category pages, real detail URLs, RSS/Atom feed, related articles, and “last reviewed” dates.
- **Events:** distinguish upcoming from past; add timezone, event status, external registration/source, and `Event` structured data.
- **Contact:** a working form, direct email fallback, response expectation, and privacy notice.

### Better article template

Every substantial article should answer:

1. What problem or question is this about?
2. Why does it matter to the target reader?
3. What is the key claim or learning outcome?
4. What evidence, code, experiment, or example supports it?
5. What are the limitations or alternatives?
6. What should the reader do next?

Add frontmatter for `updatedAt`, `sourceLocale`, `translationStatus`, `sourceRevision`, `authors`, `imageAlt`, `draft`, and optional `canonicalUrl`. Avoid generic stock imagery when a chart, architecture diagram, experiment screenshot, or original visual would communicate expertise better.

### Suggested content program

Use three recurring pillars:

- **Research explained:** accessible explanations of published work, methods, limitations, and datasets.
- **Teaching notes:** focused lessons with prerequisites, runnable examples, exercises, and solutions.
- **Build/research logs:** project decisions, failed approaches, evaluation results, and reproducibility notes.

A realistic cadence is one strong canonical article every 3–4 weeks, with reviewed translations following later. Publishing one accurate article in one language is better than four unreviewed versions. Refresh high-value evergreen pages quarterly and show the review date.

## International SEO requirements

### Must implement

- Self-referencing canonical URLs for every localized page.
- `alternates.languages`/`hreflang` for translations that actually exist, plus `x-default` for the language chooser or default experience.
- Unique titles and descriptions for article/project/course detail pages.
- `Article` or `BlogPosting`, `Person`, `ScholarlyArticle`, `Course`, `BreadcrumbList`, and `Event` JSON-LD where applicable.
- One indexable URL per content item; avoid client-only modal/state navigation.
- Article and project entries in the sitemap, with genuine `lastModified` dates.
- An RSS/Atom feed per language or one feed with explicit language metadata.
- Descriptive image alt text in the content model.
- A custom domain so the canonical identity is independent of a hosting provider.

### Root language handling

The current `/` page redirects in the browser based on local storage/browser language. Keep a crawlable language chooser as the no-JavaScript fallback. If server-side geolocation/language redirection is introduced later, avoid permanent or country-only redirects, allow users to switch language, and do not redirect search crawlers away from discoverable locale URLs.

## Accessibility and RTL

Automated checks are necessary but insufficient. Add these acceptance tests:

- a visible “skip to content” link is present in the rendered layout and targets a unique `<main id="main-content">`;
- every page has one logical H1 and a sequential heading outline;
- all interactive cards use links/buttons rather than click handlers on `<div>` elements;
- article cards, language controls, course tabs, dialogs, and mobile navigation work by keyboard;
- focus is trapped/restored correctly in dialogs and the Escape key closes them;
- text and controls meet WCAG 2.2 AA contrast and target-size expectations;
- animations and the custom cursor respect reduced motion and never obscure native input behavior;
- zoom to 200–400% does not clip content;
- Arabic layouts are reviewed with mixed Arabic/Latin text, formulas, URLs, dates, and code;
- icon-only controls have localized accessible names;
- the CV and downloadable teaching documents are accessible too.

The current article cards use clickable `<div>` elements and client state, which is both an accessibility and SEO problem. Real `<Link>` elements to detail pages solve both.

## Performance and media

- Replace remote Unsplash query URLs used as permanent production assets with licensed, locally optimized images and attribution where required.
- Generate several image sizes and modern formats during the content build. `images.unoptimized: true` means Next.js will not optimize them at runtime.
- Always provide width/height or aspect ratio to prevent layout shift.
- Lazy-load below-the-fold media and reserve `priority` for the actual LCP image only.
- Measure whether Three.js, React Three Fiber, smooth scrolling, custom cursor, floating orbs, and mesh gradients improve the main portfolio journey. Load showcase/3D code only on the relevant route.
- Self-host fonts when feasible. The build currently depends on Google font fetching through `next/font/google`; test clean/offline CI behavior.
- Add bundle analysis and route-level performance budgets.
- Keep notebooks and future large datasets outside the deployed site when they approach host limits; use releases, an archival repository, or object storage.

Suggested initial budgets on a mid-range mobile profile:

| Metric | Initial target |
|---|---:|
| LCP | <= 2.5 s at the 75th percentile |
| CLS | <= 0.1 |
| INP | <= 200 ms at the 75th percentile |
| Initial JS on ordinary content pages | <= 200 KB compressed |
| Lighthouse accessibility | >= 95 |
| Broken internal links | 0 |

## Security and privacy

- The `_headers` file is useful on Cloudflare Pages but is not enforced by GitHub Pages. Verify headers against the deployed URL after migration.
- Replace deprecated `X-XSS-Protection` with a modern, tested CSP strategy.
- Remove `'unsafe-eval'` and reduce `'unsafe-inline'` from the CSP after measuring which scripts/styles require them. Do not deploy a strict-looking policy that silently breaks the site.
- Narrow `connect-src` to the contact form, analytics, and required services. The current value of only `'self'` may block configured third-party form/analytics requests once headers are enforced.
- Add `Permissions-Policy` and consider `Cross-Origin-Opener-Policy` where compatible.
- Pin GitHub Actions to immutable commit SHAs for stronger supply-chain protection and enable Dependabot/Renovate updates.
- Run lint, tests, content validation, accessibility smoke tests, link checks, and build before deployment.
- Publish a short privacy notice before enabling analytics or collecting contact-form data. Minimize stored personal data and document the third-party form processor.
- Never put secrets in `NEXT_PUBLIC_*`; these values are embedded in browser assets. Public Formspree/analytics identifiers are configuration, not secrets.

## GitHub Pages versus Cloudflare

### Current official limits and features

As of this audit, GitHub documents a published-site limit of 1 GB, a soft bandwidth limit of 100 GB/month, and a 10-minute deployment timeout for Pages. Cloudflare Pages documents 500 builds/month, one concurrent build, a 20-minute build timeout, 20,000 files, and a 25 MiB maximum per asset on its free plan. Cloudflare states that static asset requests are free and unlimited; Functions consume Workers quota. Always recheck these limits before migration because free plans change.

### Decision matrix

| Criterion | GitHub Pages | Cloudflare Pages | Best for this project |
|---|---|---|---|
| Static Next.js export | Supported through current Action | Supported directly | Tie |
| Git repository | Native | Remains on GitHub through integration | Tie |
| PR/branch previews | Requires custom workflow/host | Built in with Git integration | Cloudflare |
| `_headers` support | Not applied | Supported | Cloudflare |
| Bandwidth | Soft 100 GB/month | Static requests documented as free/unlimited | Cloudflare |
| Future functions/forms | No server runtime | Pages Functions/Workers available | Cloudflare |
| Operational simplicity today | Already working | One-time migration/configuration | GitHub |
| Vendor independence | Custom domain reduces lock-in | Custom domain plus static `out` reduces lock-in | Tie |

### Verdict

Move to **Cloudflare Pages**, but keep the application static and keep GitHub for source control, issues, pull requests, and CI. Use a custom domain from day one. Cloudflare currently recommends Workers for full-stack Next.js, but this repository intentionally uses `output: 'export'`; Pages remains the simpler fit until a real server-side requirement appears.

Do not migrate merely to add a contact form or analytics. Formspree (or another form endpoint) and privacy-conscious analytics can work with a static site. Move to Workers only for a justified need such as authenticated authoring, protected course progress, server-side search, rate-limited form handling, or dynamic personalization.

## Cloudflare migration plan

1. Buy/use a custom domain and add it to Cloudflare DNS. Keep the GitHub Pages URL live during validation.
2. Decide the deployment mode **before creating the Pages project**:
   - Git integration gives automatic branch previews and is the recommended default.
   - Direct Upload from GitHub Actions retains one CI pipeline and more explicit quality gates.
   - Cloudflare notes that a Git-integrated Pages project cannot later be converted into a Direct Upload project; automatic Git builds can be disabled and Wrangler deployments used, but choose intentionally.
3. For Git integration configure:
   - production branch: `main`;
   - root directory: `next`;
   - build command: `corepack enable && pnpm install --frozen-lockfile && pnpm build` (or use the platform install step plus `pnpm build`);
   - output directory: `out`;
   - a supported Node version consistent with local CI;
   - the same public environment variables used by the current Action.
4. Keep GitHub Actions for type checking, linting, content validation, security audit, link checking, and tests. Require it before merge.
5. Validate the preview: all locale routes, 404s, trailing slashes, fonts, remote images, contact form, CSP console errors, sitemap, robots, and `_headers`.
6. Attach the custom domain, set `NEXT_PUBLIC_SITE_URL` to its canonical HTTPS origin, and rebuild.
7. Add redirects from the old GitHub Pages URLs where possible and keep canonical tags on the new domain.
8. Submit the new sitemap to search consoles and monitor 404s/index coverage.
9. After a safe overlap period, disable the GitHub Pages deployment job but keep the repository and CI.
10. Document rollback: republish the same `out` directory to GitHub Pages and change DNS if necessary.

## CI/CD improvements

The quality job should run on pull requests as well as pushes and should block deployment. A target sequence is:

```text
install frozen dependencies
  → typecheck
  → lint (zero errors; warning budget decreases over time)
  → validate content and translation parity
  → unit tests
  → build static export
  → link check against out/
  → accessibility/performance smoke test
  → deploy preview/production
  → verify response headers and critical URLs
```

Current validation result from this audit:

- `tsc --noEmit`: **passes**;
- `eslint .`: **fails**, with 2 errors and 62 warnings;
- both errors are `@ts-ignore` usage in `src/components/lms/LessonView.tsx`;
- `pnpm` was not directly available in the audit shell, so local binaries were used;
- a full production build was not used as an acceptance signal in this audit.

Also align documentation and CI: the README says Node 22+, while the deployment workflow currently selects Node 24. Use one actively supported version across `.nvmrc`/`.node-version`, `package.json#engines`, local development, GitHub Actions, and Cloudflare.

## Prioritized implementation roadmap

### Phase 0 — Establish a clean baseline (1–2 days)

- Fix the 2 ESLint errors and classify the 62 warnings.
- Add a Node version file and align README/CI/hosting.
- Add `format`, `test`, and `validate:content` scripts.
- Make PRs run typecheck, lint, audit, validation, and build.
- Preserve the existing user change in `PostsClient.tsx` while refactoring.

**Done when:** a clean checkout installs reproducibly and all required checks pass.

### Phase 1 — Connect content to the website (3–6 days)

- Implement a typed content loader for MDX/JSON.
- Replace the hard-coded blog array with localized MDX.
- Add `/[lang]/posts/[slug]/` static pages.
- Move projects/events/publications from components into content collections.
- Add draft and translation-status filtering.
- Generate reading time, sitemap items, RSS, and related-content links.

**Done when:** editing one MDX/JSON item changes its public list/detail pages and no substantive content lives in a React array.

### Phase 2 — Translation workflow (2–4 days)

- Define source locale, status, revision, glossary, and style guide.
- Add locale/dictionary parity and stale-translation checks.
- Add explicit fallback behavior.
- Review the initial four-language “hello world” set and use it as the reference fixture.
- Decide whether Tina local editing is sufficient or hosted collaborative editing is needed.

**Done when:** CI can identify missing/stale translations and only reviewed/published translations ship.

### Phase 3 — Discoverability and trust (2–5 days)

- Add canonicals, `hreflang`, Open Graph/Twitter cards, and JSON-LD.
- Use genuine modified dates in the sitemap.
- Add verified ORCID, Google Scholar, institutional, GitHub, and LinkedIn links where appropriate.
- Add citation exports and open-access links to publications.
- Add a privacy notice and content/editorial disclosure.

**Done when:** every public content page has a unique URL, correct locale metadata, share preview, and structured data validation.

### Phase 4 — Accessibility and performance (3–6 days)

- Convert clickable containers to semantic links/buttons.
- Verify skip navigation, heading hierarchy, dialogs, keyboard behavior, and RTL mixed content.
- Optimize/localize images and audit route bundles.
- Add axe and Lighthouse CI smoke tests with budgets.
- Lazy-load nonessential animation/3D features.

**Done when:** critical routes pass automated AA checks, manual keyboard review, and the initial performance budgets.

### Phase 5 — Cloudflare deployment (1–2 days plus DNS propagation)

- Create preview deployment, verify headers and all routes, attach custom domain, switch canonical site URL, and submit sitemap.
- Retain a documented GitHub Pages rollback until production is stable.

**Done when:** the custom domain serves the verified production build, PR previews work, and monitoring shows no systematic 404/CSP/indexing issue.

### Phase 6 — Ongoing editorial operation

- Monthly: publish/refresh one high-value item, inspect broken links and search queries.
- Quarterly: refresh biography, publications, projects, course dates, dependencies, and top landing pages.
- Twice yearly: accessibility/RTL manual audit and restore test.
- Annually: review domain, third-party services, privacy text, licenses, and content strategy.

## Suggested success measures

Avoid optimizing for page views alone. Track outcomes that match an academic portfolio:

- contact or collaboration enquiries from relevant visitors;
- CV downloads and verified-profile clicks;
- DOI/open-access clicks and citation-copy actions;
- course starts/completions (privacy-preserving and aggregate);
- organic impressions/clicks for research and teaching topics;
- percentage of published content with reviewed translations;
- median time between source update and translated review;
- zero broken internal links and zero published stale translations;
- Core Web Vitals pass rate by locale/device.

## Decisions to record

Create short architecture decision records for:

1. canonical content format and loader;
2. translation source/status/revision policy;
3. TinaCMS local versus hosted editorial workflow;
4. Cloudflare Git integration versus Direct Upload;
5. analytics/contact processors and privacy basis;
6. static Pages versus Workers trigger criteria.

This prevents the project from gradually recreating parallel sources of truth.

## Official references checked

- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages pricing for static assets and Functions](https://developers.cloudflare.com/pages/functions/pricing/)
- [Cloudflare static Next.js deployment guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Google Search Central localized versions guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [Weblate documentation](https://docs.weblate.org/)
- [OmegaT documentation](https://omegat.org/documentation)
- [Vale documentation](https://vale.sh/docs/)
- [Lychee link checker](https://lychee.cli.rs/)

## Final position

Cloudflare Pages is the recommended delivery platform, but the durable investment is a **content-first, Git-backed, translation-aware publishing system**. Once the existing MDX/JSON collections become the only source of truth, free tools can reliably assist writing and translation, previews can support human review, and a hosting change becomes a small operational improvement rather than an attempted solution to a content architecture problem.
