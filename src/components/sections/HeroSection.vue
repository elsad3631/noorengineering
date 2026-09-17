<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { heroSlides } from '@/data/hero'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section
    id="home"
    class="relative h-screen min-h-[600px] w-full"
  >
    <Swiper
      :modules="[Autoplay, Pagination]"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="h-full w-full"
    >
      <SwiperSlide
        v-for="slide in heroSlides"
        :key="slide.id"
      >
        <div class="relative h-full w-full">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="absolute inset-0 h-full w-full object-cover"
          >
          <div class="absolute inset-0 bg-bg/70" />

          <div class="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
            <h1 class="max-w-2xl text-4xl font-bold text-text sm:text-5xl lg:text-6xl">
              {{ slide.title }}
            </h1>
            <p class="mt-6 max-w-xl text-lg text-text-muted">
              {{ slide.subtitle }}
            </p>
            <div class="mt-8">
              <BaseButton
                :href="slide.ctaTarget"
                variant="primary"
              >
                {{ slide.ctaLabel }}
              </BaseButton>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background-color: var(--color-text-muted);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-accent);
}
</style>
