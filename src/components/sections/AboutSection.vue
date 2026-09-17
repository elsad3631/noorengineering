<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import { stats } from '@/data/stats'
</script>

<template>
  <section
    id="about"
    class="bg-bg py-24"
  >
    <div class="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
      <div>
        <SectionHeading
          eyebrow="About Us"
          title="Building solid ideas since 2004"
        />
        <p class="text-base leading-relaxed text-text-muted">
          Noor Engineering is a building engineering firm that designs and
          delivers residential, commercial, and industrial buildings across
          Italy. We combine technical expertise, attention to detail, and a
          sustainability-driven approach to turn every idea into a solid,
          safe, and lasting structure.
        </p>

        <dl class="mt-12 grid grid-cols-2 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.id"
          >
            <dt class="sr-only">
              {{ stat.label }}
            </dt>
            <dd>
              <AnimatedCounter
                :value="stat.value"
                :suffix="stat.suffix"
              />
              <p class="mt-1 text-sm text-text-muted">
                {{ stat.label }}
              </p>
            </dd>
          </div>
        </dl>
      </div>

      <div class="overflow-hidden rounded-2xl border border-border">
        <img
          src="https://images.unsplash.com/photo-1745015446589-7ee6f702d8c1?auto=format&fit=crop&w=900&h=700&q=80"
          alt="Noor Engineering headquarters"
          class="h-full w-full object-cover"
        >
      </div>
    </div>
  </section>
</template>
