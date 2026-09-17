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
    >
    <div
      class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/40 to-transparent p-6"
    >
      <span class="text-xs font-semibold uppercase tracking-widest text-accent">
        {{ category }}
      </span>
      <h3 class="mt-2 text-xl font-semibold text-text">
        {{ title }}
      </h3>
      <p class="mt-1 text-sm text-text-muted">
        {{ location }} — {{ year }}
      </p>
    </div>
  </article>
</template>
