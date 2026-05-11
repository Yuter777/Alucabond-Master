<template>
  <section class="relative bg-black py-28 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">Transformatsiya</div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div class="flex flex-col md:flex-row md:items-end gap-8 justify-between mb-16">
        <h2 ref="titleRef" class="font-display text-[clamp(2.2rem,5.5vw,6rem)] leading-none text-gold/90 opacity-0">
          OLDIN<br/><span class="text-gold/30">VA KEYIN</span>
        </h2>
        <p ref="descRef" class="max-w-xs font-body text-sm text-gold/32 leading-loose opacity-0">
          Fasad o'rnatishimiz binoning ko'rinishini va
          qiymatini tubdan o'zgartiradi. Suring va ko'ring.
        </p>
      </div>

      <!-- Before/After slider -->
      <div
        ref="sliderRef"
        class="relative overflow-hidden cursor-col-resize select-none opacity-0"
        style="height: clamp(300px, 65vh, 520px); border: 1px solid rgba(201,168,76,0.12)"
        @mousedown="startDrag"
        @touchstart.prevent="startDragTouch"
      >
        <!-- AFTER (right side — new facade) -->
        <div class="absolute inset-0">
          <svg class="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="afterSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0a0b0c"/>
                <stop offset="100%" stop-color="#141618"/>
              </linearGradient>
              <linearGradient id="afterPanel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1a1c1e"/>
                <stop offset="50%" stop-color="#22242a"/>
                <stop offset="100%" stop-color="#151618"/>
              </linearGradient>
              <linearGradient id="afterPanelLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#252830"/>
                <stop offset="30%" stop-color="#2e3240"/>
                <stop offset="100%" stop-color="#1c1e24"/>
              </linearGradient>
              <linearGradient id="goldLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#C9A84C" stop-opacity="0"/>
                <stop offset="30%" stop-color="#D4AF37"/>
                <stop offset="70%" stop-color="#B8860B"/>
                <stop offset="100%" stop-color="#C9A84C" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="700" fill="url(#afterSky)"/>
            <rect x="0" y="600" width="1200" height="100" fill="rgba(0,0,0,0.9)"/>
            <rect x="150" y="50" width="900" height="570" fill="url(#afterPanel)"/>
            <g opacity="0.6">
              <rect x="150" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="330" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="510" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="690" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="870" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="1047" y="50" width="3" height="570" fill="#0a0a0b"/>
              <rect x="150" y="50" width="900" height="2" fill="#0a0a0b"/>
              <rect x="150" y="120" width="900" height="2" fill="#090909"/>
              <rect x="150" y="190" width="900" height="2" fill="#090909"/>
              <rect x="150" y="260" width="900" height="2" fill="#090909"/>
              <rect x="150" y="330" width="900" height="2" fill="#090909"/>
              <rect x="150" y="400" width="900" height="2" fill="#090909"/>
              <rect x="150" y="470" width="900" height="2" fill="#090909"/>
              <rect x="150" y="540" width="900" height="2" fill="#090909"/>
              <rect x="150" y="618" width="900" height="2" fill="#0a0a0b"/>
            </g>
            <rect x="330" y="52" width="177" height="66" fill="url(#afterPanelLight)" opacity="0.4"/>
            <rect x="510" y="120" width="177" height="66" fill="url(#afterPanelLight)" opacity="0.25"/>
            <rect x="690" y="52" width="177" height="66" fill="url(#afterPanelLight)" opacity="0.35"/>
            <!-- Gold chrome columns -->
            <rect x="147" y="40" width="6" height="585" fill="url(#goldLine)" opacity="0.6"/>
            <rect x="327" y="40" width="5" height="585" fill="url(#goldLine)" opacity="0.35"/>
            <rect x="507" y="40" width="5" height="585" fill="url(#goldLine)" opacity="0.3"/>
            <rect x="687" y="40" width="5" height="585" fill="url(#goldLine)" opacity="0.45"/>
            <rect x="867" y="40" width="5" height="585" fill="url(#goldLine)" opacity="0.35"/>
            <rect x="1044" y="40" width="6" height="585" fill="url(#goldLine)" opacity="0.6"/>
            <rect x="140" y="35" width="920" height="18" fill="#0f1012"/>
            <rect x="140" y="33" width="920" height="4" fill="#1e1a0a"/>
            <rect x="150" y="570" width="900" height="48" fill="#090909"/>
            <g opacity="0.15">
              <rect x="156" y="126" width="168" height="60" fill="#2a3040" rx="0"/>
              <rect x="336" y="126" width="168" height="60" fill="#2a3040" rx="0"/>
              <rect x="516" y="196" width="168" height="60" fill="#283040" rx="0"/>
              <rect x="696" y="196" width="168" height="60" fill="#283040" rx="0"/>
            </g>
            <rect x="170" y="65" width="100" height="24" fill="rgba(0,0,0,0.6)" rx="0"/>
            <text x="220" y="82" font-family="Space Mono" font-size="10" fill="rgba(201,168,76,0.7)" text-anchor="middle" letter-spacing="3">KEYIN</text>
            <line x1="0" y1="620" x2="1200" y2="620" stroke="rgba(201,168,76,0.04)" stroke-width="1"/>
          </svg>
        </div>

        <!-- BEFORE (left side — old building) -->
        <div
          class="absolute inset-0 overflow-hidden"
          :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
        >
          <svg class="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="beforeSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0d0c0b"/>
                <stop offset="100%" stop-color="#181614"/>
              </linearGradient>
            </defs>
            <rect width="1200" height="700" fill="url(#beforeSky)"/>
            <rect x="0" y="600" width="1200" height="100" fill="rgba(0,0,0,0.8)"/>
            <rect x="150" y="50" width="900" height="570" fill="#1c1a17"/>
            <rect x="150" y="50" width="900" height="570" fill="none" stroke="#0f0e0c" stroke-width="1"/>
            <g fill="#13120f" stroke="#0c0b09" stroke-width="1">
              <rect x="200" y="100" width="100" height="70"/>
              <rect x="340" y="100" width="100" height="70"/>
              <rect x="480" y="100" width="100" height="70"/>
              <rect x="620" y="100" width="100" height="70"/>
              <rect x="760" y="100" width="100" height="70"/>
              <rect x="900" y="100" width="100" height="70"/>
              <rect x="200" y="210" width="100" height="70"/>
              <rect x="340" y="210" width="100" height="70"/>
              <rect x="480" y="210" width="100" height="70"/>
              <rect x="620" y="210" width="100" height="70"/>
              <rect x="760" y="210" width="100" height="70"/>
              <rect x="900" y="210" width="100" height="70"/>
              <rect x="200" y="320" width="100" height="70"/>
              <rect x="340" y="320" width="100" height="70"/>
              <rect x="480" y="320" width="100" height="70"/>
              <rect x="620" y="320" width="100" height="70"/>
              <rect x="760" y="320" width="100" height="70"/>
              <rect x="900" y="320" width="100" height="70"/>
              <rect x="200" y="430" width="100" height="70"/>
              <rect x="340" y="430" width="100" height="70"/>
              <rect x="480" y="430" width="100" height="70"/>
              <rect x="620" y="430" width="100" height="70"/>
              <rect x="760" y="430" width="100" height="70"/>
              <rect x="900" y="430" width="100" height="70"/>
            </g>
            <g stroke="rgba(0,0,0,0.5)" stroke-width="0.5" opacity="0.4">
              <line x1="250" y1="50" x2="255" y2="200"/>
              <line x1="500" y1="100" x2="502" y2="300"/>
              <line x1="700" y1="50" x2="698" y2="180"/>
              <line x1="900" y1="150" x2="905" y2="400"/>
            </g>
            <rect x="150" y="50" width="900" height="570" fill="rgba(20,15,8,0.3)"/>
            <rect x="170" y="65" width="100" height="24" fill="rgba(0,0,0,0.5)" rx="0"/>
            <text x="220" y="82" font-family="Space Mono" font-size="10" fill="rgba(201,168,76,0.4)" text-anchor="middle" letter-spacing="3">OLDIN</text>
            <line x1="0" y1="620" x2="1200" y2="620" stroke="rgba(201,168,76,0.04)" stroke-width="1"/>
          </svg>
        </div>

        <!-- Drag handle -->
        <div
          class="absolute top-0 bottom-0 w-px z-20 pointer-events-none transition-none"
          style="background: rgba(201,168,76,0.7)"
          :style="{ left: sliderPos + '%' }"
        >
          <!-- Handle pill -->
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-black flex items-center justify-center shadow-lg"
               style="border: 1px solid rgba(201,168,76,0.5)">
            <div class="flex gap-1">
              <div class="w-px h-4 bg-gold/55"></div>
              <div class="w-px h-4 bg-gold/55"></div>
            </div>
          </div>
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-12 font-mono text-[8px] text-gold/35 tracking-wider">←</div>
          <div class="absolute top-1/2 -translate-y-1/2 translate-x-6 font-mono text-[8px] text-gold/35 tracking-wider">→</div>
        </div>

        <!-- Instruction overlay -->
        <div
          class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 font-mono text-[8px] text-gold/32 tracking-[0.4em] uppercase transition-opacity duration-500"
          :class="{ 'opacity-0': hasDragged }"
        >
          Solishtirish uchun suring
        </div>
      </div>

      <!-- Below slider: case switcher -->
      <div ref="casesRef" class="mt-4 grid grid-cols-3 gap-px opacity-0">
        <div
          v-for="(c, i) in cases"
          :key="i"
          class="p-5 cursor-pointer transition-all duration-400 group"
          :class="{ 'bg-gold/2': activeCase === i }"
          :style="{
            border: '1px solid ' + (activeCase === i ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.06)')
          }"
          @click="activeCase = i"
        >
          <div class="font-mono text-[8px] text-gold/22 tracking-[0.4em] uppercase mb-2">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="font-body text-xs text-gold/48 group-hover:text-gold/68 transition-colors duration-400">{{ c.title }}</div>
          <div class="font-mono text-[8px] text-gold/18 mt-1">{{ c.location }}</div>
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
const sliderRef = ref(null)
const casesRef = ref(null)

const sliderPos = ref(50)
const hasDragged = ref(false)
const activeCase = ref(0)
let isDragging = false

const cases = [
  { title: 'Turar-joy binosi fasad yengilanishi', location: 'Toshkent, 2024' },
  { title: 'Ofis markazi ACP qoplama', location: 'Samarqand, 2023' },
  { title: 'Savdo markazi tashqi bezak', location: "Farg'ona, 2024" },
]

function getSliderPos(clientX) {
  const rect = sliderRef.value.getBoundingClientRect()
  const pos = ((clientX - rect.left) / rect.width) * 100
  return Math.max(5, Math.min(95, pos))
}

function startDrag(e) {
  isDragging = true
  hasDragged.value = true
  sliderPos.value = getSliderPos(e.clientX)

  const onMove = (e) => {
    if (!isDragging) return
    sliderPos.value = getSliderPos(e.clientX)
  }
  const onUp = () => {
    isDragging = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function startDragTouch(e) {
  isDragging = true
  hasDragged.value = true
  const touch = e.touches[0]
  sliderPos.value = getSliderPos(touch.clientX)

  const onMove = (e) => {
    if (!isDragging) return
    sliderPos.value = getSliderPos(e.touches[0].clientX)
  }
  const onUp = () => {
    isDragging = false
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('touchend', onUp)
}

function autoDemo() {
  if (hasDragged.value) return
  gsap.fromTo(sliderPos, { value: 80 }, {
    value: 30,
    duration: 2.5,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      gsap.to(sliderPos, { value: 50, duration: 1, ease: 'power2.out' })
    }
  })
}

onMounted(() => {
  gsap.to(titleRef.value, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: titleRef.value, start: 'top 82%' } })
  gsap.to(descRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: descRef.value, start: 'top 82%' } })
  gsap.to(sliderRef.value, {
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: {
      trigger: sliderRef.value,
      start: 'top 80%',
      onEnter: autoDemo,
    }
  })
  gsap.to(casesRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: casesRef.value, start: 'top 88%' } })
})
</script>
