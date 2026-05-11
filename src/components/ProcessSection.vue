<template>
  <section id="process" class="relative bg-black py-28 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-12 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">Jarayon</div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <h2 ref="titleRef" class="font-display text-[clamp(2.2rem,5.5vw,6.5rem)] leading-none text-gold/90 opacity-0">
          QANDAY<br/><span class="text-gold/30">ISHLAYMIZ</span>
        </h2>
        <p ref="descRef" class="max-w-xs font-body text-sm text-gold/32 leading-loose opacity-0">
          O'lchashdan yakuniy tekshiruvgacha — har bir qadam
          nazorat ostida va belgilangan muddatda.
        </p>
      </div>

      <!-- Desktop: horizontal timeline -->
      <div ref="timelineRef" class="hidden md:block opacity-0">
        <!-- Steps row -->
        <div class="grid grid-cols-5 gap-0 relative">
          <!-- Connecting line -->
          <div class="absolute top-8 left-[10%] right-[10%] h-px z-0" style="background: rgba(201,168,76,0.1)">
            <div
              class="h-full transition-all duration-2000"
              style="background: linear-gradient(to right, rgba(201,168,76,0.35), transparent)"
              :style="{ width: `${(activeStep / (steps.length - 1)) * 100}%` }"
            ></div>
          </div>

          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative z-10 flex flex-col items-center cursor-pointer group"
            @click="setStep(i)"
          >
            <!-- Node -->
            <div
              class="w-16 h-16 border flex items-center justify-center mb-8 transition-all duration-500 relative"
              :class="[
                i < activeStep ? 'bg-gold/8' :
                i === activeStep ? 'bg-gold/12' :
                'bg-transparent'
              ]"
              :style="{
                borderColor: i < activeStep
                  ? 'rgba(201,168,76,0.32)'
                  : i === activeStep
                  ? 'rgba(201,168,76,0.55)'
                  : 'rgba(201,168,76,0.1)'
              }"
            >
              <span v-if="i < activeStep" class="text-gold/55 font-mono text-sm">✓</span>
              <span v-else-if="i === activeStep" class="font-display text-xl text-gold/85">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <span v-else class="font-mono text-xs text-gold/18">
                {{ String(i + 1).padStart(2, '0') }}
              </span>

              <!-- Pulse for active -->
              <div
                v-if="i === activeStep"
                class="absolute inset-0 animate-ping"
                style="border: 1px solid rgba(201,168,76,0.22); animation-duration: 2s;"
              ></div>
            </div>

            <!-- Step content -->
            <div class="text-center px-2">
              <div
                class="font-mono text-[9px] tracking-[0.3em] uppercase mb-3 transition-colors duration-400"
                :class="i <= activeStep ? 'text-gold/62' : 'text-gold/18'"
              >
                {{ step.title }}
              </div>
              <div
                class="font-body text-[10px] text-gold/28 leading-relaxed transition-all duration-500"
                :class="i === activeStep ? 'opacity-100' : 'opacity-40'"
              >
                {{ step.brief }}
              </div>
            </div>
          </div>
        </div>

        <!-- Detail panel for active step -->
        <div class="mt-16 p-10 relative overflow-hidden transition-all duration-500"
             style="border: 1px solid rgba(201,168,76,0.06)">
          <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(201,168,76,0.02), transparent)"></div>
          <div class="relative grid grid-cols-12 gap-10 items-start">
            <div class="col-span-4">
              <div class="font-mono text-[8px] text-gold/18 tracking-[0.5em] uppercase mb-3">
                Qadam {{ String(activeStep + 1).padStart(2, '0') }} / {{ String(steps.length).padStart(2, '0') }}
              </div>
              <h3 class="font-display text-4xl text-gold/82 leading-none mb-6">
                {{ steps[activeStep].title }}
              </h3>
              <div class="font-mono text-[8px] text-gold/22 tracking-wider uppercase">
                Muddat: {{ steps[activeStep].duration }}
              </div>
            </div>
            <div class="col-span-5">
              <p class="font-body text-sm text-gold/42 leading-loose">
                {{ steps[activeStep].desc }}
              </p>
            </div>
            <div class="col-span-3">
              <div class="font-mono text-[8px] text-gold/18 tracking-[0.4em] uppercase mb-4">Natijalar</div>
              <ul class="space-y-3">
                <li v-for="item in steps[activeStep].deliverables" :key="item"
                    class="flex items-start gap-3">
                  <span class="text-gold/22 mt-0.5 flex-shrink-0">—</span>
                  <span class="font-body text-xs text-gold/32 leading-snug">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Auto-progress buttons -->
          <div class="flex gap-3 mt-10">
            <button
              v-for="(_, i) in steps"
              :key="i"
              class="h-px flex-1 transition-all duration-300"
              :style="{ background: i === activeStep ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.1)' }"
              @click="setStep(i)"
            ></button>
          </div>
        </div>
      </div>

      <!-- Mobile: vertical accordion -->
      <div ref="accordionRef" class="md:hidden space-y-px opacity-0">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="overflow-hidden"
          style="border: 1px solid rgba(201,168,76,0.06)"
        >
          <button
            class="w-full flex items-center gap-5 p-6 text-left"
            @click="activeStep = activeStep === i ? -1 : i"
          >
            <span class="font-mono text-[9px] text-gold/22 tracking-[0.3em] flex-shrink-0 w-6">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span
              class="font-body text-sm flex-1 transition-colors duration-300"
              :class="activeStep === i ? 'text-gold/82' : 'text-gold/38'"
            >
              {{ step.title }}
            </span>
            <span class="text-gold/22 font-mono text-xs transition-transform duration-300"
                  :class="activeStep === i ? 'rotate-180' : ''">↓</span>
          </button>
          <div
            class="overflow-hidden transition-all duration-500"
            :class="activeStep === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'"
          >
            <div class="px-6 pb-6">
              <p class="font-body text-xs text-gold/32 leading-loose mb-3">{{ step.desc }}</p>
              <span class="font-mono text-[8px] text-gold/18 tracking-wider">{{ step.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const descRef = ref(null)
const timelineRef = ref(null)
const accordionRef = ref(null)
const activeStep = ref(0)
let autoTimer = null

const steps = [
  {
    title: "Ko'rik va O'lchov",
    brief: "Ob'ektni bepul tekshirish",
    duration: '1–2 kun',
    desc: "Mutaxassislarimiz ob'ektga kelib, bino fasadining to'liq o'lchovini oladi va texnik holatini baholaydi. Hech qanday to'lovsiz.",
    deliverables: ["O'lchov natijalari", "Texnik holat xulosasi", "Dastlabki tavsiya"]
  },
  {
    title: 'Dizayn va Hujjat',
    brief: 'Loyiha chizma va smetasi',
    duration: '3–5 kun',
    desc: "AutoCAD va BIM asosida aniq texnik chizmalar tayyorlanadi. Material tanlash, rang palitrasining taqdimoti. Smeta hisob-kitobi.",
    deliverables: ['Texnik chizma (CAD)', "Material tanlash taklifi", 'Smeta va muddat rejasi']
  },
  {
    title: 'Subkonstruktsiya',
    brief: 'Metall karkaslar o\'rnatish',
    duration: '1–3 hafta',
    desc: "Galvanizli po'lat yoki alyuminiy profil asosida subkonstruktsiya tizimi o'rnatiladi. Bu fasadning asosiy skeletini tashkil qiladi.",
    deliverables: ['Profil o\'rnatish', 'Gorizontal va vertikal tekislash', 'Mustahkamlik nazorati']
  },
  {
    title: 'Panel Montaj',
    brief: 'ACP/Alucobond o\'rnatish',
    duration: '2–6 hafta',
    desc: "Tayyorlangan ACP yoki Alucobond panellar reja bo'yicha aniq tartibda o'rnatiladi. Har bir panel millimetr aniqligida tekshiriladi.",
    deliverables: ['Panel qirqish va tayyorlash', 'Montaj va mahkamlash', 'Chok va zo\'r berish']
  },
  {
    title: 'Yakuniy Tekshiruv',
    brief: 'Sifat nazorati va topshirish',
    duration: '1–2 kun',
    desc: "Barcha ishlangan yuzalar ko'rib chiqiladi. Suv o'tkazmasligi testi, vizual tekshirish. Kafolat sertifikati va texnik pasport topshiriladi.",
    deliverables: ['Suv o\'tkazmasligi testi', 'Vizual bosqichli nazorat', 'Kafolat sertifikati topshirish']
  },
]

function setStep(i) {
  activeStep.value = i
  clearInterval(autoTimer)
  startAutoTimer()
}

function startAutoTimer() {
  autoTimer = setInterval(() => {
    activeStep.value = (activeStep.value + 1) % steps.length
  }, 4000)
}

onMounted(() => {
  gsap.to(titleRef.value, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.value, start: 'top 82%' } })
  gsap.to(descRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: descRef.value, start: 'top 82%' } })
  gsap.to(timelineRef.value, {
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: timelineRef.value, start: 'top 80%', onEnter: startAutoTimer }
  })
  if (accordionRef.value) {
    gsap.to(accordionRef.value, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: accordionRef.value, start: 'top 85%' } })
  }
})

onUnmounted(() => {
  clearInterval(autoTimer)
})
</script>
