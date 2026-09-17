# Sito vetrina Noor Engineering — Design

Data: 2026-09-17

## Contesto e obiettivo

Sito web vetrina per uno studio di ingegneria edile. Obiettivo: pubblicizzare
l'azienda mostrando team, progetti realizzati, servizi offerti e dati di
contatto. Stile moderno, dark mode, interattivo, ispirato a
https://duruthemes.com/demo/html/bauen/onepage-dark/index.html (template
"Bauen").

Requisito chiave del committente: il progetto va realizzato in Vue.js in modo
che in futuro sia facile aggiungere funzionalità come login e registrazione,
senza dover ristrutturare l'app esistente.

## Struttura del sito (sezioni, in ordine)

1. Header / navigazione (logo + menu ancorato alle sezioni, responsive con
   menu mobile)
2. Hero — carousel/slider con messaggio principale e call-to-action
3. About — presentazione dello studio
4. Servizi — card con le competenze offerte (es. progettazione strutturale,
   direzione lavori, ecc.)
5. Progetti — griglia di progetti/edifici realizzati, con immagine, categoria
   e titolo
6. Team — card dei membri del team con foto, ruolo, eventuali social
7. Contatti — dati aziendali (indirizzo, telefono, email, P.IVA) + form di
   contatto (solo UI, invio reale rimandato)
8. Footer — riepilogo contatti, copyright, link social

Sezioni del riferimento Bauen scartate per lo scope attuale: Careers, Blog,
Testimonianze, Loghi clienti (possono essere aggiunte in futuro come nuove
sezioni/componenti senza impatti architetturali).

## Stack tecnico

- **Vue 3** (Composition API, `<script setup>`) + **Vite**
- **TypeScript**
- **Tailwind CSS** per lo styling utility-first, tema dark by default
- **Vue Router**, configurato fin da subito con una sola route (`/` →
  `HomeView`). Motivo: rende banale aggiungere in futuro route come
  `/login`, `/register`, `/area-riservata` senza refactoring dell'app.
- **Pinia**: NON incluso in questa fase (YAGNI — nessuno stato applicativo da
  gestire oggi). Verrà introdotto quando servirà davvero uno store (es. stato
  utente autenticato).
- **Swiper** per il carousel della Hero (slider touch-friendly, coerente col
  riferimento)
- **@vueuse/core** per: scroll-reveal delle sezioni (IntersectionObserver) e
  counter numerici animati (se presenti statistiche)
- **lucide-vue-next** per le icone (set moderno, tree-shakable)

## Tema visivo

- Dark mode come tema unico e default (sfondo scuro, es. `#0a0a0a` /
  `#121212`)
- Colore di accento: **ambra/arancio** (richiamo cantiere/edilizia), usato
  per bottoni, link, dettagli e hover
- Tipografia moderna sans-serif (Google Font, es. Inter o Poppins)
- Animazioni moderate: fade-in/slide-in allo scroll, hover su card e
  bottoni, hero con slider, counter animati — niente parallax o effetti
  complessi

## Struttura del progetto

```
src/
  main.ts
  App.vue
  router/
    index.ts
  views/
    HomeView.vue
  components/
    layout/
      AppHeader.vue
      AppFooter.vue
    sections/
      HeroSection.vue
      AboutSection.vue
      ServicesSection.vue
      ProjectsSection.vue
      TeamSection.vue
      ContactSection.vue
    ui/
      BaseButton.vue
      SectionHeading.vue
      ProjectCard.vue
      ServiceCard.vue
      TeamCard.vue
      AnimatedCounter.vue
  composables/
    useScrollReveal.ts
  data/
    projects.ts
    services.ts
    team.ts
  types/
    index.ts
  assets/
    styles/main.css
    images/
```

### Flusso dati

Ogni sezione (`sections/*.vue`) riceve i propri contenuti da file tipizzati
in `src/data/*.ts` (array di oggetti TypeScript, es. `Project[]`,
`Service[]`, `TeamMember[]`). I componenti non contengono contenuti
hardcoded: leggono solo dai file dati. Questo permette di:

- sostituire i contenuti placeholder con quelli reali modificando solo
  `src/data/*.ts`, senza toccare i componenti;
- in futuro, sostituire i file dati statici con chiamate a un'API/CMS senza
  modificare la logica di presentazione dei componenti.

### Contenuti

Contenuti placeholder in italiano, realistici e coerenti con uno studio di
ingegneria edile (non lorem ipsum). Immagini segnaposto da servizi come
Unsplash/Picsum per hero, progetti e team.

## Form di contatto

Form con campi tipici (nome, email, telefono opzionale, messaggio) e
validazione client-side reattiva in Vue (campi obbligatori, formato email) —
nessuna libreria di validazione esterna. Al submit, stato di successo
simulato lato UI (nessun invio email reale in questa fase). Un commento nel
codice indicherà il punto in cui collegare in futuro un servizio come
EmailJS/Formspree o un backend proprio.

## Testing e qualità

Nessuna suite di test automatici per questa fase (sito vetrina statico,
nessuna logica di business complessa). Garanzie di qualità:

- `vue-tsc` per il type-checking
- ESLint per la correttezza del codice
- Verifica manuale nel browser di responsive (mobile/tablet/desktop) e delle
  interazioni (slider hero, scroll-reveal, form) prima della consegna

## Estendibilità futura (fuori scope attuale)

L'architettura (Vue Router pronto, componenti isolati, dati disaccoppiati
dai componenti) è pensata per rendere semplici in futuro, senza refactoring
strutturale:

- Aggiunta di autenticazione (login/registrazione) come nuove route/view,
  con Pinia introdotto in quel momento per lo stato utente
- Passaggio da dati statici a un backend/CMS
- Aggiunta di nuove sezioni (Blog, Testimonianze, Careers, ecc.) come nuovi
  componenti in `components/sections/`
