<template>
  <section id="hero" class="relative w-full h-screen overflow-hidden bg-black">
    <!-- 3D Building Scene -->
    <HeroScene />

    <!-- Gradient overlays for readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/15 z-10 pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10 pointer-events-none"></div>

    <!-- Main content -->
    <div class="relative inset-0 z-20 flex flex-col justify-center mt-24 px-8 md:px-16 lg:px-24 max-w-4xl">

      <!-- Service tag -->
      <div ref="tagRef" class="mb-8 opacity-0 flex items-center gap-4">
        <div class="w-10 h-px bg-gold/40"></div>
        <span class="font-mono text-[10px] tracking-[0.5em] text-gold/85 uppercase">
          Fasad O'rnatish Xizmatlari · Toshkent
        </span>
      </div>

      <!-- Main headline -->
      <div class="mb-3 overflow-hidden">
        <h1 ref="line1Ref" class="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.92] text-gold uppercase tracking-tight opacity-0">
          BINOLARDA
        </h1>
      </div>
      <div class="mb-3 overflow-hidden">
        <h2 ref="line2Ref" class="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.92] text-chrome uppercase tracking-tight opacity-0">
          PREMIUM
        </h2>
      </div>
      <div class="mb-8 overflow-hidden">
        <h3 ref="line3Ref" class="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.92] text-gold/30 uppercase tracking-tight opacity-0">
          FASAD
        </h3>
      </div>

      <!-- Sub description -->
      <div ref="descRef" class="mb-10 opacity-0">
        <p class="font-body text-sm text-gold/45 leading-loose max-w-md">
          Alucobond va ACP fasad o'rnatish bo'yicha professional xizmat.
          Har bir bino — yangi arxitektura asari.
        </p>
      </div>

      <!-- CTA row -->
      <div ref="ctaRef" class="flex flex-col sm:flex-row gap-4 opacity-0">
        <button class="btn-primary" @click="scrollTo('#contact')">
          Bepul Konsultatsiya
        </button>
        <button class="btn-secondary" @click="scrollTo('#portfolio')">
          Loyihalarimiz
          <span class="ml-2 opacity-50">↓</span>
        </button>
      </div>

      <!-- Quick proof -->
      <div ref="proofRef" class="mt-14 flex items-center gap-8 opacity-0">
        <div v-for="stat in heroStats" :key="stat.label" class="flex flex-col gap-1.5">
          <span class="font-display text-[clamp(1.4rem,2.5vw,2rem)] text-gold/85 tabular-nums">
            {{ stat.value }}
          </span>
          <span class="font-mono text-[8px] tracking-[0.35em] text-gold/28 uppercase leading-relaxed">
            {{ stat.label }}
          </span>
        </div>
        <div class="hidden sm:block w-px h-10 bg-gold/10 mx-2"></div>
        <div class="hidden sm:flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-green-500/60 animate-pulse-slow"></div>
          <span class="font-mono text-[8px] text-gold/22 tracking-[0.4em] uppercase">
            Loyihalar jarayonda
          </span>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div ref="scrollRef" class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-0">
      <div class="scroll-indicator"></div>
      <span class="font-mono text-[7px] text-gold/18 tracking-[0.5em] uppercase">Scroll</span>
    </div>

    <!-- Right side — vertical info bar -->
    <div ref="sidebarRef" class="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 opacity-0">
      <div class="font-mono text-[7px] text-gold/18 tracking-[0.5em] uppercase"
           style="writing-mode: vertical-rl; letter-spacing: 0.3em;">
        ALUCABOND CONSTRUCT
      </div>
      <div class="w-px h-20 bg-gold/12"></div>
      <div class="font-mono text-[7px] text-gold/12 tracking-widest"
           style="writing-mode: vertical-rl">2024</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import HeroScene from './HeroScene.vue'

const tagRef = ref(null)
const line1Ref = ref(null)
const line2Ref = ref(null)
const line3Ref = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const proofRef = ref(null)
const scrollRef = ref(null)
const sidebarRef = ref(null)

const heroStats = [
  { value: '200+', label: 'Tugallangan loyiha' },
  { value: '8 yil', label: 'Tajriba' },
  { value: '15+', label: 'Shahar' },
]

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const tl = gsap.timeline({ delay: 2.6 })

  tl.to(tagRef.value, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
    .to(line1Ref.value, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' }, '-=0.3')
    .to(line2Ref.value, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' }, '-=0.7')
    .to(line3Ref.value, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' }, '-=0.7')
    .to(descRef.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
    .to(ctaRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to(proofRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .to(scrollRef.value, { opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.2')
    .to(sidebarRef.value, { opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.8')
})
</script>

<style scoped>
.scroll-indicator {
  width: 1px;
  height: 55px;
  background: linear-gradient(to bottom, rgba(201, 168, 76, 0.6), transparent);
  animation: scrollDrop 2.5s ease-in-out infinite;
}
@keyframes scrollDrop {
  0%, 100% { opacity: 0.4; transform: scaleY(1) translateY(0); }
  50% { opacity: 0.9; transform: scaleY(1.1) translateY(4px); }
}
</style>
