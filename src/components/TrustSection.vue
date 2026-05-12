<template>
  <section class="relative bg-black py-24 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-15 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">

      <!-- Top label -->
      <div class="flex items-center gap-6 mb-16">
        <div class="w-6 h-px bg-gold/22"></div>
        <span class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">Nima uchun biz?</span>
        <div class="flex-1 h-px bg-gold/6"></div>
      </div>

      <!-- Big statement -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div ref="statementRef" class="lg:col-span-6 opacity-0">
          <h2 class="font-display text-[clamp(2rem,5vw,5.5rem)] leading-none text-gold/90 mb-8">
            BIZ BINOLARNI<br/>
            <span class="text-gold/35">O'ZGARTIRAMIZ.</span>
          </h2>
          <p class="font-body text-sm text-gold/38 leading-loose max-w-sm">
            Har bir loyihada muhandislik aniqligi va hunarmandchilik mahoratini birlashtiramiz.
            Oddiy bino — premium arxitektura asariga aylanadi.
          </p>
        </div>

        <!-- Stats grid -->
        <div ref="statsRef" class="lg:col-span-6 grid grid-cols-2 gap-px opacity-0">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="stat-card border p-8 group transition-all duration-500"
            style="border-color: rgba(201,168,76,0.07)"
          >
            <div
              class="font-display leading-none mb-3 transition-colors duration-500"
              :class="['text-[clamp(2.2rem,4vw,3.5rem)]', stat.highlight ? 'text-gold/75' : 'text-gold/50']"
            >
              {{ stat.value }}
            </div>
            <div class="font-mono text-[8px] text-gold/22 tracking-[0.4em] uppercase leading-relaxed">
              {{ stat.label }}
            </div>
            <div v-if="stat.desc" class="font-body text-[10px] text-gold/16 mt-2 leading-relaxed">
              {{ stat.desc }}
            </div>
          </div>
        </div>
      </div>

      <!-- Features row -->
      <div ref="featuresRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px opacity-0">
        <div
          v-for="(feat, i) in features"
          :key="i"
          class="border p-8 group transition-all duration-500 relative overflow-hidden"
          style="border-color: rgba(201,168,76,0.07)"
        >
          <!-- Hover fill -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style="background: linear-gradient(135deg, rgba(201,168,76,0.03) 0%, transparent 100%)"></div>

          <div class="relative">
            <div class="font-mono text-[11px] text-gold/18 tracking-[0.5em] uppercase mb-5">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div class="font-body text-sm text-gold/55 mb-3 group-hover:text-gold/80 transition-colors duration-500 leading-snug">
              {{ feat.title }}
            </div>
            <div class="font-body text-[11px] text-gold/22 leading-relaxed">
              {{ feat.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statementRef = ref(null)
const statsRef = ref(null)
const featuresRef = ref(null)
const partnersRef = ref(null)

const stats = [
  { value: '200+', label: 'Tugallangan loyiha', highlight: true, desc: "O'zbekiston bo'ylab" },
  { value: '8 yil', label: 'Bozordagi tajriba', highlight: false, desc: '2016-yildan beri' },
  { value: '40+', label: 'Mutaxassis jamoa', highlight: true, desc: 'Sertifikatlangan installerlar' },
  { value: '15+', label: 'Shahrlarda xizmat', highlight: false, desc: "Butun O'zbekiston" },
]

const features = [
  {
    title: 'Bepul o\'lchov va dizayn',
    desc: 'Har bir loyiha uchun bepul ob\'ekt ko\'rikdan va texnik dizayn taklifi bilan boshlaymiz.'
  },
  {
    title: 'O\'z vaqtida topshirish',
    desc: 'Kelishilgan muddatga qat\'iy rioya qilamiz. Kechikish holatlari uchun jarimalar ko\'zda tutilgan.'
  },
  {
    title: 'Kafolatlangan sifat',
    desc: 'Har bir o\'rnatilgan fasad 10 yillik texnik kafolat bilan qoplanadi.'
  },
  {
    title: 'Kasbiy asbob-uskunalar',
    desc: 'Zamonaviy CNC va o\'rnatish uskunalari bilan millimetr aniqligida ishlash.'
  },
]

const brands = ['ALUCOBOND', 'REYNOBOND', 'ALPOLIC', 'ALUCOIL', 'ALSTRONG']

onMounted(() => {
  const items = [
    { el: statementRef.value, delay: 0 },
    { el: statsRef.value, delay: 0.1 },
    { el: featuresRef.value, delay: 0.15 },
    { el: partnersRef.value, delay: 0.2 },
  ]
  items.forEach(({ el, delay }) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    })
  })
})
</script>

<style scoped>
.stat-card:hover {
  border-color: rgba(201, 168, 76, 0.15) !important;
  background: rgba(201, 168, 76, 0.02);
}
</style>
