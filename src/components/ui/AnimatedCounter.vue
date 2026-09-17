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
  <span
    ref="target"
    class="text-4xl font-bold text-accent sm:text-5xl"
  >
    {{ displayValue }}{{ suffix }}
  </span>
</template>
