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
    <h2 class="text-3xl font-bold text-text sm:text-4xl">
      {{ title }}
    </h2>
  </div>
</template>
