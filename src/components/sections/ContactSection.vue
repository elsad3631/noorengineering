<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Mail, Phone, MapPin } from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { companyInfo } from '@/data/contact'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = reactive<Record<keyof ContactForm, string>>({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const isSubmitted = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Inserisci il tuo nome.'
  errors.email = emailPattern.test(form.email) ? '' : 'Inserisci un indirizzo email valido.'
  errors.message = form.message.trim() ? '' : 'Scrivi un messaggio.'
  errors.phone = ''

  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validate()) return

  // TODO: collegare a un servizio di invio email reale (es. EmailJS,
  // Formspree) o a un backend proprio quando l'infrastruttura sarà pronta.
  isSubmitted.value = true
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}
</script>

<template>
  <section
    id="contatti"
    class="bg-bg py-24"
  >
    <div class="mx-auto max-w-7xl px-6">
      <SectionHeading
        eyebrow="Contatti"
        title="Parliamo del tuo progetto"
      />

      <div class="grid gap-16 lg:grid-cols-2">
        <div>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <MapPin
                :size="22"
                class="mt-1 text-accent"
              />
              <span class="text-text-muted">{{ companyInfo.address }}</span>
            </li>
            <li class="flex items-start gap-4">
              <Phone
                :size="22"
                class="mt-1 text-accent"
              />
              <span class="text-text-muted">{{ companyInfo.phone }}</span>
            </li>
            <li class="flex items-start gap-4">
              <Mail
                :size="22"
                class="mt-1 text-accent"
              />
              <span class="text-text-muted">{{ companyInfo.email }}</span>
            </li>
          </ul>
          <p class="mt-6 text-sm text-text-muted">
            {{ companyInfo.vat }}
          </p>
        </div>

        <form
          novalidate
          class="space-y-5"
          @submit.prevent="handleSubmit"
        >
          <div
            v-if="isSubmitted"
            class="rounded-xl border border-accent bg-surface p-4 text-sm text-text"
          >
            Grazie per il messaggio! Ti risponderemo il prima possibile.
          </div>

          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-text"
            >Nome</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="Il tuo nome"
            >
            <p
              v-if="errors.name"
              class="mt-1 text-sm text-red-400"
            >
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-text"
            >Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="nome@esempio.it"
            >
            <p
              v-if="errors.email"
              class="mt-1 text-sm text-red-400"
            >
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="phone"
              class="mb-2 block text-sm font-medium text-text"
            >
              Telefono (opzionale)
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="+39 123 456 7890"
            >
          </div>

          <div>
            <label
              for="message"
              class="mb-2 block text-sm font-medium text-text"
            >
              Messaggio
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
              placeholder="Raccontaci il tuo progetto"
            />
            <p
              v-if="errors.message"
              class="mt-1 text-sm text-red-400"
            >
              {{ errors.message }}
            </p>
          </div>

          <BaseButton
            type="submit"
            variant="primary"
          >
            Invia messaggio
          </BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>
