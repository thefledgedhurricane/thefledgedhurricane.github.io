# Dr. Ihababdelbasset ANNAKI — Research & Education Platform

An immersive, high-performance academic platform showcasing research, innovation projects, and a state-of-the-art Learning Management System (LMS) for advanced computer science education.

Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **TinaCMS**, designed with a modern 2026 glassmorphism aesthetic.

---

## 🚀 Key Features

*   **Premium Interactive LMS**: Modern learning modules with progressive navigation, code execution copy buttons, and visual graphics.
*   **Coursera-Inspired Quiz Gates**: Automated gating mechanism enforcing $\ge 70\%$ quiz scores to unlock subsequent chapters.
*   **Google Colab Integration**: Single-click interactive notebooks for hands-on student exercises.
*   **TinaCMS Powered Content**: Fully customizable courses, blogs, and projects via an integrated visual admin panel.
*   **Immersive UI/UX**: Custom interactive cursors, smooth scroll behavior, floating digital orbs, animated mesh gradients, and a responsive floating glassmorphism navigation header.

---

## 🛠️ Tech Stack & Architecture

*   **Framework**: Next.js (App Router, Static HTML Export)
*   **Design System**: Vanilla CSS + Tailwind CSS
*   **Content Management**: TinaCMS (Local JSON-based schema)
*   **CI/CD**: GitHub Actions (Automatic static site generation and Pages deployment)
*   **Package Manager**: pnpm

---

## 💻 Local Development Setup

### Prerequisites
Make sure you have Node.js (version 22+) and FNM (Fast Node Manager) or `pnpm` installed.

### 1. Install Dependencies
Navigate to the web project directory and install the packages:
```bash
cd next
pnpm install
```

### 2. Launch Local Servers
Run the development environment (this starts both the Next.js dev server and the local TinaCMS admin client):
```bash
pnpm dev
```
*   **LMS Website**: `http://localhost:3000`
*   **TinaCMS Visual Editor**: `http://localhost:3000/admin/index.html`

### 3. Build & Static Export
To compile the TypeScript project and generate the static production build (`/next/out`):
```bash
pnpm build
```

### 4. Code Quality & Formatting
Run type-checking and code formatting tools:
```bash
pnpm typecheck
pnpm lint
```

---

## 🌐 Deployments (CI/CD)

Any push or pull request to the `main` branch automatically triggers the GitHub Actions build pipeline defined in `.github/workflows/deploy.yml`:
1. Installs dependencies using `pnpm`.
2. Runs TypeScript validation (`typecheck`).
3. Runs TinaCMS build and compiles the Next.js app to raw static assets (`next/out`).
4. Generates a `.nojekyll` file.
5. Deploys the built assets directly to **GitHub Pages**.

---

## 📂 Project Structure

```
├── .github/workflows/      # CI/CD deployment configuration
├── next/
│   ├── content/            # Local JSON courses data and blogs
│   ├── public/             # Static assets (images, SVGs, notebooks)
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # UI elements (Header, Footer, LMS, etc.)
│   │   ├── lib/            # Types and data fetch utilities
│   │   └── types/          # Global type definitions (e.g. PrismJS)
│   ├── tina/               # TinaCMS configuration schemas
│   ├── next.config.js      # Next.js configuration
│   └── package.json        # Dependencies and scripts
└── README.md               # Main repository documentation
```
