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
    <h3 class="mt-4 text-xl font-semibold text-text">
      {{ title }}
    </h3>
    <p class="mt-3 text-sm leading-relaxed text-text-muted">
      {{ description }}
    </p>
  </div>
</template>
