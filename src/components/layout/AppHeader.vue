<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import logoUrl from '@/assets/images/logos/noorengineering.jpeg'

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
      <a
        href="#"
        class="flex items-center rounded-lg bg-white px-3 py-1.5"
      >
        <img
          :src="logoUrl"
          alt="Noor Engineering"
          class="h-12 w-auto object-contain"
        >
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
        <Menu
          v-if="!isMenuOpen"
          :size="28"
        />
        <X
          v-else
          :size="28"
        />
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
