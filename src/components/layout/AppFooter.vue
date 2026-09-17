<script setup lang="ts">
import { companyInfo } from '@/data/contact'
import logoUrl from '@/assets/images/logos/noorengineering.jpeg'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-bg-alt">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="inline-flex items-center rounded-lg bg-white px-3 py-1.5">
            <img
              :src="logoUrl"
              alt="Noor Engineering"
              class="h-14 w-auto object-contain"
            >
          </div>
          <p class="mt-4 text-sm text-text-muted">
            A building engineering firm specializing in structural design,
            construction management, and technical consulting.
          </p>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-text">
            Contact
          </p>
          <ul class="mt-3 space-y-2 text-sm text-text-muted">
            <li>{{ companyInfo.address }}</li>
            <li>{{ companyInfo.phone }}</li>
            <li>{{ companyInfo.email }}</li>
            <li>{{ companyInfo.vat }}</li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-text">
            Quick Links
          </p>
          <ul class="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <a
                href="#about"
                class="hover:text-accent"
              >About</a>
            </li>
            <li>
              <a
                href="#services"
                class="hover:text-accent"
              >Services</a>
            </li>
            <li>
              <a
                href="#projects"
                class="hover:text-accent"
              >Projects</a>
            </li>
            <li>
              <a
                href="#contact"
                class="hover:text-accent"
              >Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-border pt-6 text-center text-xs text-text-muted">
        © {{ year }} Noor Engineering. All rights reserved.
      </div>
    </div>
  </footer>
</template>
