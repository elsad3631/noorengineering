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
  <a
    v-if="href"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="classes"
  >
    <slot />
  </button>
</template>
