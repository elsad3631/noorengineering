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
      >
    </div>
    <h3 class="mt-4 text-lg font-semibold text-text">
      {{ name }}
    </h3>
    <p class="text-sm text-text-muted">
      {{ role }}
    </p>
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
