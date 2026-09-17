<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TeamCard from '@/components/ui/TeamCard.vue'
import { team } from '@/data/team'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="team"
    class="bg-bg-alt py-24"
  >
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading
        eyebrow="Il team"
        title="Le persone dietro ai progetti"
        align="center"
      />

      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <TeamCard
          v-for="member in team"
          :key="member.id"
          :name="member.name"
          :role="member.role"
          :photo="member.photo"
          :email="member.email"
          :linkedin="member.linkedin"
        />
      </div>
    </div>
  </section>
</template>
