<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { services } from '@/data/services'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="servizi"
    class="bg-bg-alt py-24"
  >
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading
        eyebrow="Servizi"
        title="Cosa facciamo"
        align="center"
      />

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
