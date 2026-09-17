# Sito Vetrina Noor Engineering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page, dark-mode, interactive Vue 3 showcase website for Noor Engineering (a building engineering firm), covering Hero, About, Services, Projects, Team and Contact sections, structured for easy future extension with auth (login/registration).

**Architecture:** Vue 3 (Composition API, `<script setup>`) + Vite + TypeScript SPA, styled with Tailwind CSS v4. Vue Router is wired in from the start with a single `/` route so future routes (`/login`, `/register`, ...) can be added without restructuring. Each page section is an isolated component that reads its content from typed data files in `src/data/`, decoupling presentation from content so placeholder content can later be swapped for real content or an API without touching components.

**Tech Stack:** Vue 3.5, Vite 6, TypeScript 5.6, Tailwind CSS 4 (`@tailwindcss/vite`), Vue Router 4, Swiper 11 (hero carousel), @vueuse/core (scroll-reveal), lucide-vue-next (icons).

**Spec:** [docs/superpowers/specs/2026-09-17-sito-vetrina-design.md](../specs/2026-09-17-sito-vetrina-design.md)

## Global Constraints

- Dark mode is the only theme, default background `#0a0a0a` / alt `#111111`.
- Accent color is amber: `#f59e0b` (hover `#fbbf24`, dark `#b45309`).
- Font: Google Font "Inter".
- Composition API with `<script setup lang="ts">` in every `.vue` file — no Options API.
- Vue Router configured now with a single `home` route; no Pinia in this phase (introduce only when real app state, e.g. auth, exists).
- Content is placeholder but realistic Italian copy for a building engineering firm — never lorem ipsum.
- Contact form validates client-side and shows a simulated success state; it must NOT send real email yet. Leave a `// TODO` comment marking where a real integration (EmailJS/Formspree/own backend) would go.
- No automated test suite for this phase. Verification per task is `npm run type-check` (and `npm run build` at the final task) plus, where noted, a scripted dev-server smoke check. No unit test framework is installed.
- All section components read their content exclusively from `src/data/*.ts` — never hardcode copy inside a `sections/*.vue` file.

---

## File Structure Overview

```
index.html
package.json
vite.config.ts
tsconfig.json / tsconfig.app.json / tsconfig.node.json
eslint.config.js
.gitignore
public/favicon.svg
src/
  main.ts
  App.vue
  vite-env.d.ts
  router/index.ts
  views/HomeView.vue
  assets/styles/main.css
  types/index.ts
  data/services.ts, projects.ts, team.ts, stats.ts, hero.ts, contact.ts
  composables/useScrollReveal.ts
  components/
    layout/AppHeader.vue, AppFooter.vue
    ui/BaseButton.vue, SectionHeading.vue, AnimatedCounter.vue,
       ServiceCard.vue, ProjectCard.vue, TeamCard.vue
    sections/HeroSection.vue, AboutSection.vue, ServicesSection.vue,
              ProjectsSection.vue, TeamSection.vue, ContactSection.vue
```

---

### Task 1: Project scaffolding (Vite + Vue 3 + TypeScript + Tailwind v4 + ESLint)

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `.gitignore`
- Create: `index.html`
- Create: `public/favicon.svg`
- Create: `src/vite-env.d.ts`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/assets/styles/main.css`

**Interfaces:**
- Produces: npm scripts `dev`, `build`, `preview`, `type-check`, `lint`; Tailwind theme tokens (`--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--color-accent-dark`, `--font-sans`) usable as Tailwind utilities (`bg-bg`, `text-text`, `text-accent`, etc.) in every later task; `@` path alias resolving to `src/`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "noor-engineering",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc -b --noEmit",
    "lint": "eslint . --ext .vue,.ts"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.4.5",
    "swiper": "^11.1.15",
    "@vueuse/core": "^11.3.0",
    "lucide-vue-next": "^0.454.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.9.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/eslint-config-typescript": "^14.1.3",
    "eslint": "^9.15.0",
    "eslint-plugin-vue": "^9.31.0",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.6.3",
    "vite": "^6.0.1",
    "vue-tsc": "^2.1.10"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 4: Create `tsconfig.app.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}
```

- [ ] **Step 5: Create `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Create `eslint.config.js`**

```js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
dist
dist-ssr
*.local
.vscode/*
!.vscode/extensions.json
.DS_Store
```

- [ ] **Step 8: Create `index.html`**

```html
<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Noor Engineering — Studio di Ingegneria Edile</title>
    <meta
      name="description"
      content="Noor Engineering è uno studio di ingegneria edile specializzato in progettazione strutturale, direzione lavori e consulenza tecnica per progetti residenziali, commerciali e industriali."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-bg text-text antialiased">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 9: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#0a0a0a"/>
  <path d="M9 23V9h3.2l7.6 10.2V9H23v14h-3.2L12.2 12.8V23H9z" fill="#f59e0b"/>
</svg>
```

- [ ] **Step 10: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 11: Create `src/assets/styles/main.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --color-bg: #0a0a0a;
  --color-bg-alt: #111111;
  --color-surface: #1a1a1a;
  --color-border: #2a2a2a;
  --color-text: #f5f5f5;
  --color-text-muted: #a3a3a3;
  --color-accent: #f59e0b;
  --color-accent-hover: #fbbf24;
  --color-accent-dark: #b45309;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
}

section[id] {
  scroll-margin-top: 5rem;
}
```

- [ ] **Step 12: Create `src/App.vue`**

```vue
<template>
  <div class="flex min-h-screen items-center justify-center">
    <h1 class="text-2xl font-semibold text-text">Noor Engineering</h1>
  </div>
</template>
```

- [ ] **Step 13: Create `src/main.ts`**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'

createApp(App).mount('#app')
```

- [ ] **Step 14: Install dependencies**

Run: `npm install`
Expected: completes with no errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 15: Verify the project builds**

Run: `npm run build`
Expected: completes with no TypeScript or build errors, creates `dist/`.

- [ ] **Step 16: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js .gitignore index.html public/favicon.svg src/vite-env.d.ts src/main.ts src/App.vue src/assets/styles/main.css package-lock.json
git commit -m "chore: scaffold Vue 3 + Vite + TypeScript + Tailwind v4 project"
```

---

### Task 2: Router and base app shell

**Files:**
- Create: `src/router/index.ts`
- Create: `src/views/HomeView.vue`
- Modify: `src/App.vue`
- Modify: `src/main.ts`

**Interfaces:**
- Consumes: `main.css` from Task 1.
- Produces: `router` default export (Vue Router instance) used by `main.ts`; `HomeView.vue` at route `/`, which Task 13 will fill with all page sections.

- [ ] **Step 1: Create `src/views/HomeView.vue`**

```vue
<template>
  <main>
    <p class="p-8 text-text">Home view placeholder</p>
  </main>
</template>
```

- [ ] **Step 2: Create `src/router/index.ts`**

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 3: Replace `src/App.vue`**

```vue
<template>
  <RouterView />
</template>
```

- [ ] **Step 4: Update `src/main.ts`**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 5: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/router/index.ts src/views/HomeView.vue src/App.vue src/main.ts
git commit -m "feat: add Vue Router with home route"
```

---

### Task 3: Domain types and placeholder data

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/team.ts`
- Create: `src/data/stats.ts`
- Create: `src/data/hero.ts`
- Create: `src/data/contact.ts`

**Interfaces:**
- Produces: `Service`, `Project`, `TeamMember`, `Stat`, `HeroSlide` types and the `services`, `projects`, `team`, `stats`, `heroSlides`, `companyInfo` arrays/objects, consumed by every section component in Tasks 7–12.

- [ ] **Step 1: Create `src/types/index.ts`**

```ts
import type { Component } from 'vue'

export interface Service {
  id: string
  icon: Component
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  category: string
  location: string
  year: number
  image: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  email?: string
  linkedin?: string
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaTarget: string
  image: string
}
```

- [ ] **Step 2: Create `src/data/services.ts`**

```ts
import { Building2, HardHat, Leaf, Ruler } from 'lucide-vue-next'
import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'progettazione-strutturale',
    icon: Building2,
    title: 'Progettazione Strutturale',
    description:
      'Progettiamo strutture sicure ed efficienti per edifici residenziali, commerciali e industriali, nel rispetto delle normative sismiche vigenti.',
  },
  {
    id: 'direzione-lavori',
    icon: HardHat,
    title: 'Direzione Lavori',
    description:
      'Seguiamo ogni fase del cantiere garantendo il rispetto di tempi, costi e standard qualitativi, dalla posa delle fondamenta al collaudo finale.',
  },
  {
    id: 'consulenza-energetica',
    icon: Leaf,
    title: 'Consulenza Energetica',
    description:
      'Offriamo consulenza su efficienza energetica e certificazioni per edifici sostenibili, riducendo consumi e impatto ambientale.',
  },
  {
    id: 'rilievi-pratiche-edilizie',
    icon: Ruler,
    title: 'Rilievi e Pratiche Edilizie',
    description:
      'Rilievi topografici, pratiche catastali e gestione delle autorizzazioni edilizie presso gli enti competenti.',
  },
]
```

- [ ] **Step 3: Create `src/data/projects.ts`**

```ts
import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'residenza-aurora',
    title: 'Residenza Aurora',
    category: 'Residenziale',
    location: 'Milano',
    year: 2024,
    image: 'https://picsum.photos/seed/residenza-aurora/800/600',
  },
  {
    id: 'torre-meridiana',
    title: 'Torre Meridiana',
    category: 'Commerciale',
    location: 'Torino',
    year: 2023,
    image: 'https://picsum.photos/seed/torre-meridiana/800/600',
  },
  {
    id: 'complesso-industriale-nord',
    title: 'Complesso Industriale Nord',
    category: 'Industriale',
    location: 'Bergamo',
    year: 2022,
    image: 'https://picsum.photos/seed/complesso-industriale-nord/800/600',
  },
  {
    id: 'villa-serena',
    title: 'Villa Serena',
    category: 'Residenziale',
    location: 'Como',
    year: 2023,
    image: 'https://picsum.photos/seed/villa-serena/800/600',
  },
]
```

- [ ] **Step 4: Create `src/data/team.ts`**

```ts
import type { TeamMember } from '@/types'

export const team: TeamMember[] = [
  {
    id: 'marco-bianchi',
    name: 'Marco Bianchi',
    role: 'Fondatore & Ingegnere Strutturista',
    photo: 'https://i.pravatar.cc/400?img=12',
    email: 'm.bianchi@noorengineering.it',
  },
  {
    id: 'giulia-rossi',
    name: 'Giulia Rossi',
    role: 'Responsabile Progettazione',
    photo: 'https://i.pravatar.cc/400?img=45',
    email: 'g.rossi@noorengineering.it',
  },
  {
    id: 'luca-ferrari',
    name: 'Luca Ferrari',
    role: 'Direttore Lavori',
    photo: 'https://i.pravatar.cc/400?img=33',
    email: 'l.ferrari@noorengineering.it',
  },
  {
    id: 'sara-colombo',
    name: 'Sara Colombo',
    role: 'Ingegnere Energetico',
    photo: 'https://i.pravatar.cc/400?img=47',
    email: 's.colombo@noorengineering.it',
  },
  {
    id: 'andrea-moretti',
    name: 'Andrea Moretti',
    role: 'Responsabile Pratiche Edilizie',
    photo: 'https://i.pravatar.cc/400?img=51',
    email: 'a.moretti@noorengineering.it',
  },
  {
    id: 'elena-ricci',
    name: 'Elena Ricci',
    role: 'Project Manager',
    photo: 'https://i.pravatar.cc/400?img=48',
    email: 'e.ricci@noorengineering.it',
  },
]
```

- [ ] **Step 5: Create `src/data/stats.ts`**

```ts
import type { Stat } from '@/types'

export const stats: Stat[] = [
  { id: 'anni', value: 20, suffix: '+', label: 'Anni di esperienza' },
  { id: 'progetti', value: 150, suffix: '+', label: 'Progetti completati' },
  { id: 'team', value: 25, suffix: '', label: 'Professionisti nel team' },
  { id: 'clienti', value: 98, suffix: '%', label: 'Clienti soddisfatti' },
]
```

- [ ] **Step 6: Create `src/data/hero.ts`**

```ts
import type { HeroSlide } from '@/types'

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: "Progettiamo il futuro dell'edilizia",
    subtitle:
      'Ingegneria strutturale e direzione lavori per progetti residenziali, commerciali e industriali in tutta Italia.',
    ctaLabel: 'Scopri i nostri progetti',
    ctaTarget: '#progetti',
    image: 'https://picsum.photos/seed/construction-site-1/1600/900',
  },
  {
    id: 'slide-2',
    title: 'Sicurezza, precisione, innovazione',
    subtitle:
      'Un team di ingegneri e tecnici al vostro fianco dalla progettazione al collaudo finale.',
    ctaLabel: 'Contattaci',
    ctaTarget: '#contatti',
    image: 'https://picsum.photos/seed/construction-site-2/1600/900',
  },
]
```

- [ ] **Step 7: Create `src/data/contact.ts`**

```ts
export const companyInfo = {
  address: 'Via Roma 123, 20100 Milano (MI)',
  phone: '+39 02 1234567',
  email: 'info@noorengineering.it',
  vat: 'P.IVA 01234567890',
}
```

- [ ] **Step 8: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add src/types/index.ts src/data/services.ts src/data/projects.ts src/data/team.ts src/data/stats.ts src/data/hero.ts src/data/contact.ts
git commit -m "feat: add domain types and placeholder content data"
```

---

### Task 4: UI primitives — BaseButton and SectionHeading

**Files:**
- Create: `src/components/ui/BaseButton.vue`
- Create: `src/components/ui/SectionHeading.vue`

**Interfaces:**
- Produces: `BaseButton` (props: `variant?: 'primary' | 'secondary'`, `href?: string`, `type?: 'button' | 'submit'`, default slot) and `SectionHeading` (props: `eyebrow?: string`, `title: string`, `align?: 'left' | 'center'`), used by every section component from Task 7 onward.

- [ ] **Step 1: Create `src/components/ui/BaseButton.vue`**

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  href: undefined,
  type: 'button',
})

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200'

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-hover',
  secondary:
    'border border-border text-text hover:border-accent hover:text-accent',
}

const classes = `${baseClasses} ${variantClasses[props.variant]}`
</script>

<template>
  <a v-if="href" :href="href" :class="classes">
    <slot />
  </a>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
```

- [ ] **Step 2: Create `src/components/ui/SectionHeading.vue`**

```vue
<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  align: 'left',
})
</script>

<template>
  <div :class="['mb-12 max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <span
      v-if="eyebrow"
      class="mb-3 block text-sm font-semibold uppercase tracking-widest text-accent"
    >
      {{ eyebrow }}
    </span>
    <h2 class="text-3xl font-bold text-text sm:text-4xl">{{ title }}</h2>
  </div>
</template>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/BaseButton.vue src/components/ui/SectionHeading.vue
git commit -m "feat: add BaseButton and SectionHeading UI primitives"
```

---

### Task 5: Header and footer, wired into the app shell

**Files:**
- Create: `src/components/layout/AppHeader.vue`
- Create: `src/components/layout/AppFooter.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `companyInfo` from `src/data/contact.ts` (Task 3).
- Produces: fixed header with in-page anchor navigation (`#about`, `#servizi`, `#progetti`, `#team`, `#contatti`) that later section components must expose as their `id`.

- [ ] **Step 1: Create `src/components/layout/AppHeader.vue`**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Chi siamo', target: '#about' },
  { label: 'Servizi', target: '#servizi' },
  { label: 'Progetti', target: '#progetti' },
  { label: 'Team', target: '#team' },
  { label: 'Contatti', target: '#contatti' },
]

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <a href="#" class="text-xl font-bold text-text">
        Noor<span class="text-accent">Engineering</span>
      </a>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.target"
          :href="link.target"
          class="text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          {{ link.label }}
        </a>
      </nav>

      <a
        href="#contatti"
        class="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover md:inline-flex"
      >
        Richiedi un preventivo
      </a>

      <button
        class="text-text md:hidden"
        aria-label="Apri il menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Menu v-if="!isMenuOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <nav
      v-if="isMenuOpen"
      class="flex flex-col gap-1 border-t border-border bg-bg px-6 py-4 md:hidden"
    >
      <a
        v-for="link in navLinks"
        :key="link.target"
        :href="link.target"
        class="rounded-lg px-3 py-3 text-sm font-medium text-text-muted hover:bg-surface hover:text-accent"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
```

- [ ] **Step 2: Create `src/components/layout/AppFooter.vue`**

```vue
<script setup lang="ts">
import { companyInfo } from '@/data/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-bg-alt">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <p class="text-xl font-bold text-text">
            Noor<span class="text-accent">Engineering</span>
          </p>
          <p class="mt-3 text-sm text-text-muted">
            Studio di ingegneria edile specializzato in progettazione
            strutturale, direzione lavori e consulenza tecnica.
          </p>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-text">
            Contatti
          </p>
          <ul class="mt-3 space-y-2 text-sm text-text-muted">
            <li>{{ companyInfo.address }}</li>
            <li>{{ companyInfo.phone }}</li>
            <li>{{ companyInfo.email }}</li>
            <li>{{ companyInfo.vat }}</li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-text">
            Link rapidi
          </p>
          <ul class="mt-3 space-y-2 text-sm text-text-muted">
            <li><a href="#about" class="hover:text-accent">Chi siamo</a></li>
            <li><a href="#servizi" class="hover:text-accent">Servizi</a></li>
            <li><a href="#progetti" class="hover:text-accent">Progetti</a></li>
            <li><a href="#contatti" class="hover:text-accent">Contatti</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-border pt-6 text-center text-xs text-text-muted">
        © {{ year }} Noor Engineering. Tutti i diritti riservati.
      </div>
    </div>
  </footer>
</template>
```

- [ ] **Step 3: Update `src/App.vue`**

```vue
<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: no errors, `dist/` produced.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/AppHeader.vue src/components/layout/AppFooter.vue src/App.vue
git commit -m "feat: add header and footer layout components"
```

---

### Task 6: Scroll-reveal composable and AnimatedCounter

**Files:**
- Create: `src/composables/useScrollReveal.ts`
- Create: `src/components/ui/AnimatedCounter.vue`

**Interfaces:**
- Produces: `useScrollReveal(): { target: Ref<HTMLElement | null>; isVisible: Ref<boolean> }`, used by `AnimatedCounter` here and by `ServicesSection`/`ProjectsSection`/`TeamSection` in later tasks. `AnimatedCounter` (props: `value: number`, `suffix?: string`, `duration?: number`), used by `AboutSection` in Task 8.

- [ ] **Step 1: Create `src/composables/useScrollReveal.ts`**

```ts
import { ref, type Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useScrollReveal(): {
  target: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
} {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.15 },
  )

  return { target, isVisible }
}
```

- [ ] **Step 2: Create `src/components/ui/AnimatedCounter.vue`**

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  duration: 1500,
})

const { target, isVisible } = useScrollReveal()
const displayValue = ref(0)

watch(isVisible, (visible) => {
  if (!visible) return

  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / props.duration, 1)
    displayValue.value = Math.round(progress * props.value)

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
})
</script>

<template>
  <span ref="target" class="text-4xl font-bold text-accent sm:text-5xl">
    {{ displayValue }}{{ suffix }}
  </span>
</template>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/composables/useScrollReveal.ts src/components/ui/AnimatedCounter.vue
git commit -m "feat: add scroll-reveal composable and animated counter"
```

---

### Task 7: Hero section with Swiper carousel

**Files:**
- Create: `src/components/sections/HeroSection.vue`

**Interfaces:**
- Consumes: `heroSlides` from `src/data/hero.ts` (Task 3), `BaseButton` from Task 4.
- Produces: `HeroSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="home">`.

- [ ] **Step 1: Create `src/components/sections/HeroSection.vue`**

```vue
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { heroSlides } from '@/data/hero'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section id="home" class="relative h-screen min-h-[600px] w-full">
    <Swiper
      :modules="[Autoplay, Pagination]"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="h-full w-full"
    >
      <SwiperSlide v-for="slide in heroSlides" :key="slide.id">
        <div class="relative h-full w-full">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-bg/70" />

          <div class="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <h1 class="max-w-2xl text-4xl font-bold text-text sm:text-5xl lg:text-6xl">
              {{ slide.title }}
            </h1>
            <p class="mt-6 max-w-xl text-lg text-text-muted">
              {{ slide.subtitle }}
            </p>
            <div class="mt-8">
              <BaseButton :href="slide.ctaTarget" variant="primary">
                {{ slide.ctaLabel }}
              </BaseButton>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background-color: var(--color-text-muted);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-accent);
}
</style>
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.vue
git commit -m "feat: add hero section with Swiper carousel"
```

---

### Task 8: About section with animated stats

**Files:**
- Create: `src/components/sections/AboutSection.vue`

**Interfaces:**
- Consumes: `stats` from `src/data/stats.ts` (Task 3), `SectionHeading` from Task 4, `AnimatedCounter` from Task 6.
- Produces: `AboutSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="about">`.

- [ ] **Step 1: Create `src/components/sections/AboutSection.vue`**

```vue
<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import { stats } from '@/data/stats'
</script>

<template>
  <section id="about" class="bg-bg py-24">
    <div class="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Chi siamo" title="Costruiamo idee solide dal 2004" />
        <p class="text-base leading-relaxed text-text-muted">
          Noor Engineering è uno studio di ingegneria edile che progetta e
          realizza edifici residenziali, commerciali e industriali in tutta
          Italia. Uniamo competenza tecnica, attenzione ai dettagli e un
          approccio orientato alla sostenibilità per trasformare ogni idea in
          una struttura solida, sicura e duratura.
        </p>

        <dl class="mt-12 grid grid-cols-2 gap-8">
          <div v-for="stat in stats" :key="stat.id">
            <dt class="sr-only">{{ stat.label }}</dt>
            <dd>
              <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
              <p class="mt-1 text-sm text-text-muted">{{ stat.label }}</p>
            </dd>
          </div>
        </dl>
      </div>

      <div class="overflow-hidden rounded-2xl border border-border">
        <img
          src="https://picsum.photos/seed/noor-office/900/700"
          alt="Sede di Noor Engineering"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AboutSection.vue
git commit -m "feat: add about section with animated stats"
```

---

### Task 9: Services section

**Files:**
- Create: `src/components/ui/ServiceCard.vue`
- Create: `src/components/sections/ServicesSection.vue`

**Interfaces:**
- Consumes: `services` from `src/data/services.ts` (Task 3), `SectionHeading` from Task 4, `useScrollReveal` from Task 6.
- Produces: `ServiceCard` (props: `icon: Component`, `title: string`, `description: string`, `index: number`); `ServicesSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="servizi">`.

- [ ] **Step 1: Create `src/components/ui/ServiceCard.vue`**

```vue
<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  icon: Component
  title: string
  description: string
  index: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="group rounded-2xl border border-border bg-surface p-8 transition-colors duration-200 hover:border-accent"
  >
    <span class="text-sm font-semibold text-text-muted">
      {{ String(index + 1).padStart(2, '0') }}
    </span>
    <component
      :is="icon"
      :size="32"
      class="mt-4 text-accent transition-transform duration-200 group-hover:scale-110"
    />
    <h3 class="mt-4 text-xl font-semibold text-text">{{ title }}</h3>
    <p class="mt-3 text-sm leading-relaxed text-text-muted">{{ description }}</p>
  </div>
</template>
```

- [ ] **Step 2: Create `src/components/sections/ServicesSection.vue`**

```vue
<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { services } from '@/data/services'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section id="servizi" class="bg-bg-alt py-24">
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading eyebrow="Servizi" title="Cosa facciamo" align="center" />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.id"
          :icon="service.icon"
          :title="service.title"
          :description="service.description"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ServiceCard.vue src/components/sections/ServicesSection.vue
git commit -m "feat: add services section"
```

---

### Task 10: Projects section

**Files:**
- Create: `src/components/ui/ProjectCard.vue`
- Create: `src/components/sections/ProjectsSection.vue`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.ts` (Task 3), `SectionHeading` from Task 4, `useScrollReveal` from Task 6.
- Produces: `ProjectCard` (props: `title: string`, `category: string`, `location: string`, `year: number`, `image: string`); `ProjectsSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="progetti">`.

- [ ] **Step 1: Create `src/components/ui/ProjectCard.vue`**

```vue
<script setup lang="ts">
interface Props {
  title: string
  category: string
  location: string
  year: number
  image: string
}

defineProps<Props>()
</script>

<template>
  <article class="group relative overflow-hidden rounded-2xl border border-border">
    <img
      :src="image"
      :alt="title"
      class="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div
      class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/40 to-transparent p-6"
    >
      <span class="text-xs font-semibold uppercase tracking-widest text-accent">
        {{ category }}
      </span>
      <h3 class="mt-2 text-xl font-semibold text-text">{{ title }}</h3>
      <p class="mt-1 text-sm text-text-muted">{{ location }} — {{ year }}</p>
    </div>
  </article>
</template>
```

- [ ] **Step 2: Create `src/components/sections/ProjectsSection.vue`**

```vue
<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section id="progetti" class="bg-bg py-24">
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading eyebrow="Progetti" title="I nostri lavori" align="center" />

      <div class="grid gap-6 sm:grid-cols-2">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :title="project.title"
          :category="project.category"
          :location="project.location"
          :year="project.year"
          :image="project.image"
        />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectCard.vue src/components/sections/ProjectsSection.vue
git commit -m "feat: add projects section"
```

---

### Task 11: Team section

**Files:**
- Create: `src/components/ui/TeamCard.vue`
- Create: `src/components/sections/TeamSection.vue`

**Interfaces:**
- Consumes: `team` from `src/data/team.ts` (Task 3), `SectionHeading` from Task 4, `useScrollReveal` from Task 6.
- Produces: `TeamCard` (props: `name: string`, `role: string`, `photo: string`, `email?: string`, `linkedin?: string`); `TeamSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="team">`.

- [ ] **Step 1: Create `src/components/ui/TeamCard.vue`**

```vue
<script setup lang="ts">
import { Mail, Linkedin } from 'lucide-vue-next'

interface Props {
  name: string
  role: string
  photo: string
  email?: string
  linkedin?: string
}

defineProps<Props>()
</script>

<template>
  <div class="group text-center">
    <div class="overflow-hidden rounded-2xl border border-border">
      <img
        :src="photo"
        :alt="name"
        class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <h3 class="mt-4 text-lg font-semibold text-text">{{ name }}</h3>
    <p class="text-sm text-text-muted">{{ role }}</p>
    <div class="mt-3 flex justify-center gap-3">
      <a
        v-if="email"
        :href="`mailto:${email}`"
        class="text-text-muted transition-colors hover:text-accent"
        aria-label="Invia email"
      >
        <Mail :size="18" />
      </a>
      <a
        v-if="linkedin"
        :href="linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="text-text-muted transition-colors hover:text-accent"
        aria-label="Profilo LinkedIn"
      >
        <Linkedin :size="18" />
      </a>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Create `src/components/sections/TeamSection.vue`**

```vue
<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TeamCard from '@/components/ui/TeamCard.vue'
import { team } from '@/data/team'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section id="team" class="bg-bg-alt py-24">
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading eyebrow="Il team" title="Le persone dietro ai progetti" align="center" />

      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <TeamCard
          v-for="member in team"
          :key="member.id"
          :name="member.name"
          :role="member.role"
          :photo="member.photo"
          :email="member.email"
          :linkedin="member.linkedin"
        />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/TeamCard.vue src/components/sections/TeamSection.vue
git commit -m "feat: add team section"
```

---

### Task 12: Contact section with validated form

**Files:**
- Create: `src/components/sections/ContactSection.vue`

**Interfaces:**
- Consumes: `companyInfo` from `src/data/contact.ts` (Task 3), `SectionHeading` and `BaseButton` from Task 4.
- Produces: `ContactSection.vue`, used by `HomeView.vue` in Task 13. Renders `<section id="contatti">`.

- [ ] **Step 1: Create `src/components/sections/ContactSection.vue`**

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Mail, Phone, MapPin } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { companyInfo } from '@/data/contact'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = reactive<Record<keyof ContactForm, string>>({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const isSubmitted = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Inserisci il tuo nome.'
  errors.email = emailPattern.test(form.email) ? '' : 'Inserisci un indirizzo email valido.'
  errors.message = form.message.trim() ? '' : 'Scrivi un messaggio.'
  errors.phone = ''

  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validate()) return

  // TODO: collegare a un servizio di invio email reale (es. EmailJS,
  // Formspree) o a un backend proprio quando l'infrastruttura sarà pronta.
  isSubmitted.value = true
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>

<template>
  <section id="contatti" class="bg-bg py-24">
    <div class="mx-auto max-w-7xl px-6">
      <SectionHeading eyebrow="Contatti" title="Parliamo del tuo progetto" />

      <div class="grid gap-16 lg:grid-cols-2">
        <div>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <MapPin :size="22" class="mt-1 text-accent" />
              <span class="text-text-muted">{{ companyInfo.address }}</span>
            </li>
            <li class="flex items-start gap-4">
              <Phone :size="22" class="mt-1 text-accent" />
              <span class="text-text-muted">{{ companyInfo.phone }}</span>
            </li>
            <li class="flex items-start gap-4">
              <Mail :size="22" class="mt-1 text-accent" />
              <span class="text-text-muted">{{ companyInfo.email }}</span>
            </li>
          </ul>
          <p class="mt-6 text-sm text-text-muted">{{ companyInfo.vat }}</p>
        </div>

        <form novalidate class="space-y-5" @submit.prevent="handleSubmit">
          <div
            v-if="isSubmitted"
            class="rounded-xl border border-accent bg-surface p-4 text-sm text-text"
          >
            Grazie per il messaggio! Ti risponderemo il prima possibile.
          </div>

          <div>
            <label for="name" class="mb-2 block text-sm font-medium text-text">Nome</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="Il tuo nome"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-400">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-text">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="nome@esempio.it"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-400">{{ errors.email }}</p>
          </div>

          <div>
            <label for="phone" class="mb-2 block text-sm font-medium text-text">
              Telefono (opzionale)
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="+39 123 456 7890"
            />
          </div>

          <div>
            <label for="message" class="mb-2 block text-sm font-medium text-text">
              Messaggio
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="Raccontaci il tuo progetto"
            />
            <p v-if="errors.message" class="mt-1 text-sm text-red-400">{{ errors.message }}</p>
          </div>

          <BaseButton type="submit" variant="primary">Invia messaggio</BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Verify type-check passes**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ContactSection.vue
git commit -m "feat: add contact section with validated form"
```

---

### Task 13: Assemble the home page and final verification

**Files:**
- Modify: `src/views/HomeView.vue`

**Interfaces:**
- Consumes: `HeroSection`, `AboutSection`, `ServicesSection`, `ProjectsSection`, `TeamSection`, `ContactSection` from Tasks 7–12.

- [ ] **Step 1: Replace `src/views/HomeView.vue`**

```vue
<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <TeamSection />
    <ContactSection />
  </main>
</template>
```

- [ ] **Step 2: Run the full type-check**

Run: `npm run type-check`
Expected: no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: completes with no errors, `dist/` regenerated.

- [ ] **Step 3b: Run ESLint**

Run: `npm run lint`
Expected: no errors (warnings, if any, should be reviewed and fixed if trivial).

- [ ] **Step 4: Smoke-test the dev server**

Run (background, then check, then stop):
```bash
npm run dev -- --port 5183 --strictPort &
DEV_PID=$!
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5183/
kill $DEV_PID
```
Expected: HTTP status `200`.

- [ ] **Step 5: Manual browser check (documented for the human reviewer)**

Run: `npm run dev`, open `http://localhost:5173/` in a browser, and confirm:
- All six sections render in order (Hero, Chi siamo, Servizi, Progetti, Team, Contatti) with dark background and amber accents.
- The hero carousel auto-advances between the two slides and pagination dots work.
- Clicking header nav links smoothly scrolls to the right section, and the mobile hamburger menu opens/closes below the `md` breakpoint.
- The stats counters in "Chi siamo" animate up when scrolled into view.
- Submitting the contact form with an empty name/invalid email shows validation errors; submitting valid data shows the success message and clears the form.
- Layout looks correct at mobile (375px), tablet (768px) and desktop (1440px) widths.

- [ ] **Step 6: Commit**

```bash
git add src/views/HomeView.vue
git commit -m "feat: assemble home page with all sections"
```
