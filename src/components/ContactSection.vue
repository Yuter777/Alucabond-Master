<template>
  <section id="contact" class="relative bg-black py-32 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-15"></div>

    <!-- Ambient gold glow -->
    <div class="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-4 pointer-events-none"
         style="background: radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%); filter: blur(60px)">
    </div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">06 — Aloqa</div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Left: Form -->
        <div>
          <h2 ref="titleRef" class="font-display text-[clamp(2.5rem,5vw,6rem)] text-gold/90 leading-none mb-10 opacity-0">
            LOYIHANI<br/><span class="text-steel">BOSHLANG</span>
          </h2>

          <form ref="formRef" class="space-y-0 opacity-0" @submit.prevent="submitForm">
            <div class="form-field">
              <label class="form-label">Ism va Familiya</label>
              <input
                v-model="form.name"
                type="text"
                class="form-input"
                placeholder="Sizning ismingiz"
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label">Telefon Raqam</label>
              <input
                v-model="form.phone"
                type="tel"
                class="form-input"
                placeholder="+998 __ ___ __ __"
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label">Kompaniya / Tashkilot</label>
              <input
                v-model="form.company"
                type="text"
                class="form-input"
                placeholder="Kompaniya nomi"
              />
            </div>

            <div class="form-field">
              <label class="form-label">Loyiha Turi</label>
              <select v-model="form.type" class="form-input form-select">
                <option value="">Tanlang...</option>
                <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <div class="form-field">
              <label class="form-label">Maydon (m²)</label>
              <input
                v-model="form.area"
                type="text"
                class="form-input"
                placeholder="Taxminiy maydon"
              />
            </div>

            <div class="form-field">
              <label class="form-label">Xabar</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="form-input resize-none"
                placeholder="Loyiha haqida qo'shimcha ma'lumot..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-primary w-full mt-6 py-5 text-xs"
              :class="{ 'opacity-50 cursor-not-allowed': sending }"
              :disabled="sending"
            >
              <span v-if="!sent && !sending">So'rov Yuborish →</span>
              <span v-else-if="sending">Yuborilmoqda...</span>
              <span v-else>So'rov Yuborildi ✓</span>
            </button>
          </form>
        </div>

        <!-- Right: Info + Map -->
        <div ref="infoRef" class="opacity-0 pt-4">
          <!-- Contact cards -->
          <div class="space-y-px mb-12">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="p-6 flex items-center gap-6 transition-all duration-500 group cursor-pointer"
              style="border: 1px solid rgba(201,168,76,0.06)"
              :style="{ '--hover-border': 'rgba(201,168,76,0.18)' }"
              @click="info.action && info.action()"
            >
              <div class="font-display text-3xl text-gold/22 group-hover:text-gold/45 transition-colors duration-500 w-8 text-center flex-shrink-0">
                {{ info.icon }}
              </div>
              <div>
                <div class="font-mono text-[8px] text-gold/22 tracking-[0.4em] uppercase mb-1">{{ info.label }}</div>
                <div class="font-mono text-sm text-gold/62 group-hover:text-gold/82 transition-colors duration-300">{{ info.value }}</div>
              </div>
              <div class="ml-auto text-gold/12 group-hover:text-gold/32 transition-colors duration-500 font-mono text-xs">→</div>
            </div>
          </div>

          <!-- Social links -->
          <div class="mb-12">
            <div class="font-mono text-[8px] text-gold/22 tracking-[0.5em] uppercase mb-6">Ijtimoiy Tarmoqlar</div>
            <div class="flex gap-4">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="px-4 py-3 font-mono text-[9px] text-gold/32 tracking-wider uppercase transition-all duration-300"
                style="border: 1px solid rgba(201,168,76,0.12)"
              >
                {{ social.name }}
              </a>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="relative h-56 overflow-hidden" style="border: 1px solid rgba(201,168,76,0.12)">
            <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent)">
              <svg class="w-full h-full" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
                <!-- Fake map grid -->
                <rect width="500" height="220" fill="rgba(201,168,76,0.015)"/>
                <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="100" y1="0" x2="100" y2="220" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="200" y1="0" x2="200" y2="220" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="300" y1="0" x2="300" y2="220" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <line x1="400" y1="0" x2="400" y2="220" stroke="rgba(201,168,76,0.05)" stroke-width="0.5"/>
                <!-- Roads -->
                <path d="M 0 110 Q 150 90 250 110 Q 350 130 500 110" fill="none" stroke="rgba(201,168,76,0.07)" stroke-width="2"/>
                <path d="M 250 0 L 250 220" fill="none" stroke="rgba(201,168,76,0.06)" stroke-width="3"/>
                <!-- Location marker - gold -->
                <circle cx="250" cy="110" r="6" fill="rgba(201,168,76,0.5)">
                  <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="250" cy="110" r="4" fill="#C9A84C"/>
                <text x="260" y="106" font-family="Space Mono" font-size="8" fill="rgba(201,168,76,0.55)" letter-spacing="1">ALUCABOND</text>
                <text x="260" y="118" font-family="Space Mono" font-size="8" fill="rgba(201,168,76,0.35)" letter-spacing="1">CONSTRUCT</text>
              </svg>
            </div>
            <div class="absolute bottom-4 left-4 font-mono text-[8px] text-gold/22 tracking-[0.3em]">
              TOSHKENT, O'ZBEKISTON
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const formRef = ref(null)
const infoRef = ref(null)

const sending = ref(false)
const sent = ref(false)

const form = reactive({
  name: '', phone: '', company: '', type: '', area: '', message: ''
})

const projectTypes = [
  'Tijorat Binosi',
  'Turar-joy Majmuasi',
  'Industrial Ob\'ekt',
  'Sport Majmuasi',
  'Davlat Binosi',
  'Mehmonxona',
  'Savdo Markazi',
  'Boshqa',
]

const contactInfo = [
  {
    label: 'Telefon',
    value: '+998 71 200 00 00',
    icon: '◎',
    action: () => window.open('tel:+998712000000')
  },
  {
    label: 'WhatsApp',
    value: '+998 90 000 00 00',
    icon: '◈',
    action: () => window.open('https://wa.me/998900000000')
  },
  {
    label: 'Email',
    value: 'info@alucabond.uz',
    icon: '◻',
    action: () => window.open('mailto:info@alucabond.uz')
  },
  {
    label: 'Manzil',
    value: 'Toshkent shahri, Yunusobod tumani',
    icon: '⬡',
    action: null
  },
]

const socials = [
  { name: 'Instagram', url: 'https://instagram.com/alucabond_construct' },
  { name: 'Telegram', url: 'https://t.me/alucabond_construct' },
  { name: 'YouTube', url: '#' },
]

async function submitForm() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
  setTimeout(() => { sent.value = false; Object.assign(form, { name: '', phone: '', company: '', type: '', area: '', message: '' }) }, 4000)
}

onMounted(() => {
  gsap.to(titleRef.value, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: titleRef.value, start: 'top 80%' } })
  gsap.to(formRef.value, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: formRef.value, start: 'top 85%' } })
  gsap.to(infoRef.value, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: infoRef.value, start: 'top 85%' } })
})
</script>

<style scoped>
.form-field {
  border-bottom: 1px solid rgba(201, 168, 76, 0.08);
}

.form-label {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.25);
  padding: 16px 0 8px;
}

.form-input {
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(201, 168, 76, 0.75);
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  padding-bottom: 16px;
  transition: color 0.3s ease;
}

.form-input::placeholder {
  color: rgba(201, 168, 76, 0.15);
  font-size: 11px;
}

.form-input:focus {
  color: rgba(201, 168, 76, 0.95);
}

.form-select {
  cursor: pointer;
  appearance: none;
}

.form-select option {
  background: #080808;
  color: rgba(201, 168, 76, 0.75);
}
</style>
