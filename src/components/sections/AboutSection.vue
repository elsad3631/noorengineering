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
          eyebrow="Chi siamo"
          title="Costruiamo idee solide dal 2004"
        />
        <p class="text-base leading-relaxed text-text-muted">
          Noor Engineering è uno studio di ingegneria edile che progetta e
          realizza edifici residenziali, commerciali e industriali in tutta
          Italia. Uniamo competenza tecnica, attenzione ai dettagli e un
          approccio orientato alla sostenibilità per trasformare ogni idea in
          una struttura solida, sicura e duratura.
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
          src="https://picsum.photos/seed/noor-office/900/700"
          alt="Sede di Noor Engineering"
          class="h-full w-full object-cover"
        >
      </div>
    </div>
  </section>
</template>
