<template>
  <section id="about" class="relative bg-black py-28 overflow-hidden">
    <div class="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
         style="background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.06), transparent)"></div>
    <div class="absolute inset-0 grid-overlay opacity-12 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">Biz haqimizda</div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <!-- Split layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start mb-24">
        <!-- Left -->
        <div ref="leftRef" class="opacity-0">
          <h2 class="font-display text-[clamp(2.5rem,5.5vw,6rem)] leading-none text-gold/88 mb-8">
            8 YILLIK<br/>
            <span class="text-gold/30">TAJRIBA,</span><br/>
            200+ LOYIHA
          </h2>
          <div class="w-12 h-px bg-gold/22 mb-8"></div>
          <p class="font-body text-sm text-gold/38 leading-loose mb-8 max-w-sm">
            2016-yildan beri Alucabond Construct O'zbekistondagi eng ishonchli
            fasad o'rnatish kompaniyasi sifatida tan olingan.
            Toshkentdan Farg'onagacha — 15+ shaharda xizmat ko'rsatamiz.
          </p>
          <p class="font-body text-sm text-gold/26 leading-loose max-w-sm">
            Biz material sotmaymiz — biz binolarni o'zgartiramiz.
            Har bir loyiha birinchi ko'rishdan oxirgi finishgacha
            o'z jamoamiz tomonidan boshqariladi.
          </p>
        </div>

        <!-- Right: details accordion -->
        <div ref="rightRef" class="opacity-0">
          <div class="space-y-px">
            <div
              v-for="(item, i) in details"
              :key="i"
              class="transition-all duration-400 cursor-default group relative overflow-hidden"
              style="border: 1px solid rgba(201,168,76,0.06)"
            >
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                   style="background: linear-gradient(to right, rgba(201,168,76,0.02), transparent)"></div>
              <div class="relative flex items-start gap-5 p-6">
                <span class="font-mono text-[8px] text-gold/17 tracking-[0.3em] mt-1 flex-shrink-0 w-5">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <div class="flex-1">
                  <div class="font-body text-sm text-gold/57 group-hover:text-gold/78 transition-colors duration-400 mb-1.5">
                    {{ item.title }}
                  </div>
                  <div class="font-body text-xs text-gold/22 leading-relaxed">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wide visual — technical blueprint feel -->
      <div ref="blueprintRef" class="opacity-0 relative overflow-hidden" style="height: clamp(200px, 35vh, 320px); border: 1px solid rgba(201,168,76,0.09)">
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(201,168,76,0.03), transparent)"></div>

        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="1200" height="300" fill="transparent"/>

          <!-- Isometric building outline in gold -->
          <g opacity="0.12" fill="none" stroke="rgba(201,168,76,1)" stroke-width="0.8">
            <rect x="200" y="40" width="500" height="240" stroke-width="1"/>
            <line x1="283" y1="40" x2="283" y2="280"/>
            <line x1="366" y1="40" x2="366" y2="280"/>
            <line x1="449" y1="40" x2="449" y2="280"/>
            <line x1="532" y1="40" x2="532" y2="280"/>
            <line x1="615" y1="40" x2="615" y2="280"/>
            <line x1="200" y1="88" x2="700" y2="88"/>
            <line x1="200" y1="136" x2="700" y2="136"/>
            <line x1="200" y1="184" x2="700" y2="184"/>
            <line x1="200" y1="232" x2="700" y2="232"/>
            <line x1="700" y1="40" x2="900" y2="80"/>
            <line x1="700" y1="280" x2="900" y2="320"/>
            <line x1="900" y1="80" x2="900" y2="300" stroke-dasharray="4,2" opacity="0.5"/>
            <line x1="700" y1="40" x2="700" y2="280"/>
            <line x1="200" y1="40" x2="400" y2="0"/>
            <line x1="700" y1="40" x2="900" y2="0"/>
            <line x1="400" y1="0" x2="900" y2="0"/>
          </g>

          <!-- Dimension lines in gold -->
          <g opacity="0.18" stroke="rgba(201,168,76,0.5)" stroke-width="0.5" fill="none">
            <line x1="200" y1="295" x2="700" y2="295"/>
            <line x1="200" y1="291" x2="200" y2="299"/>
            <line x1="700" y1="291" x2="700" y2="299"/>
          </g>
          <text x="450" y="300" font-family="Space Mono" font-size="7" fill="rgba(201,168,76,0.22)" text-anchor="middle" letter-spacing="2">
            ALUCABOND PANEL SYSTEM — UMUMIY KO'RINISH
          </text>

          <!-- Animated scan bar in gold -->
          <rect x="200" y="38" width="500" height="2" fill="rgba(201,168,76,0.28)" opacity="0">
            <animate attributeName="y" values="38;278;38" dur="6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.4;0" dur="6s" repeatCount="indefinite"/>
          </rect>

          <!-- Right side: annotation callouts -->
          <g font-family="Space Mono" font-size="7.5" fill="rgba(201,168,76,0.22)" letter-spacing="1.5">
            <text x="820" y="100">ACP PANEL 4MM</text>
            <text x="820" y="130">PVDF QOPLAMA</text>
            <text x="820" y="160">AL SUBKONSTRUKSIYA</text>
            <text x="820" y="190">TERMAL IZOLYASIYA</text>
            <text x="820" y="220">ANKER TIZIMLARI</text>
          </g>
          <!-- Leader lines -->
          <g stroke="rgba(201,168,76,0.09)" stroke-width="0.5" fill="none">
            <line x1="700" y1="96" x2="815" y2="96"/>
            <line x1="700" y1="126" x2="815" y2="126"/>
            <line x1="700" y1="156" x2="815" y2="156"/>
            <line x1="700" y1="186" x2="815" y2="186"/>
            <line x1="700" y1="216" x2="815" y2="216"/>
          </g>
        </svg>

        <div class="absolute top-4 left-4 font-mono text-[7px] text-gold/18 tracking-[0.5em] uppercase">
          Fasad Texnik Ko'rinishi
        </div>
        <div class="absolute top-4 right-4 font-mono text-[7px] text-gold/12 tracking-[0.3em]">
          REV 3.1 — 2024
        </div>
      </div>

      <!-- Team / equipment callout -->
      <div ref="teamRef" class="mt-px grid grid-cols-2 md:grid-cols-4 gap-px opacity-0">
        <div
          v-for="item in teamItems"
          :key="item.label"
          class="p-8 group transition-all duration-400"
          style="border: 1px solid rgba(201,168,76,0.06)"
        >
          <div class="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-gold/48 group-hover:text-gold/68 transition-colors duration-400 mb-3 leading-none">
            {{ item.value }}
          </div>
          <div class="font-mono text-[8px] text-gold/22 tracking-[0.35em] uppercase leading-relaxed">
            {{ item.label }}
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

const leftRef = ref(null)
const rightRef = ref(null)
const blueprintRef = ref(null)
const teamRef = ref(null)

const details = [
  {
    title: "O'z ustaxonamiz va asbob-uskunalarimiz",
    desc: 'Zamonaviy CNC qirqish mashinalari, bukish uskunalari va o\'rnatish jihozlari to\'liq o\'zimizda.'
  },
  {
    title: 'Sertifikatlangan mutaxassislar',
    desc: 'Har bir jamoa a\'zosi fasad o\'rnatish bo\'yicha xalqaro sertifikatga ega.'
  },
  {
    title: 'Grantiya va texnik qo\'llab-quvvatlash',
    desc: 'O\'rnatilgan fasadga 10 yillik kafolat. Har qanday muammo bo\'lsa — bepul xizmat.'
  },
  {
    title: 'Loyiha menedjeri — har bir loyiha uchun',
    desc: 'Bitta mas\'ul odam doimiy aloqada. Jarayon haqida har kuni hisobot.'
  },
]

const teamItems = [
  { value: '40+', label: 'Jamoamiz a\'zolari' },
  { value: '12+', label: 'CNC uskunalar' },
  { value: '3', label: 'Ustaxona' },
  { value: '4 000+', label: 'O\'rnatilgan m² / oy' },
]

onMounted(() => {
  const items = [leftRef, rightRef, blueprintRef, teamRef]
  items.forEach((el, i) => {
    gsap.to(el.value, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: i * 0.12,
      scrollTrigger: { trigger: el.value, start: 'top 84%' }
    })
  })
})
</script>
