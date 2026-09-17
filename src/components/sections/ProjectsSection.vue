<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="projects"
    class="bg-bg py-24"
  >
    <div
      ref="target"
      class="mx-auto max-w-7xl px-6 transition-all duration-700"
      :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <SectionHeading
        eyebrow="Projects"
        title="Our work"
        align="center"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :title="project.title"
          :category="project.category"
          :location="project.location"
          :year="project.year"
          :image="project.image"
        />
      </div>
    </div>
  </section>
</template>
