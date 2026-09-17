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
