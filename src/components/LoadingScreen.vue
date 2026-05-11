<template>
  <Transition name="loading">
    <div v-if="visible" class="loading-screen">
      <!-- Logo -->
      <div class="flex flex-col items-center gap-8">
        <div class="relative">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-20 h-20">
            <defs>
              <linearGradient id="lgRing" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F5D78A"/>
                <stop offset="40%" stop-color="#C9A84C"/>
                <stop offset="70%" stop-color="#7A5C10"/>
                <stop offset="100%" stop-color="#F0D070"/>
              </linearGradient>
              <linearGradient id="lgA" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F0D070"/>
                <stop offset="35%" stop-color="#D4AF37"/>
                <stop offset="70%" stop-color="#8B6914"/>
                <stop offset="100%" stop-color="#E8C860"/>
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="38" stroke="url(#lgRing)" stroke-width="2"/>
            <polygon points="12,68 22,68 40,14 58,68 68,68 40,8" fill="url(#lgA)"/>
            <polygon points="22,68 58,68 40,44" fill="#080808"/>
          </svg>
          <!-- Rotating ring -->
          <div class="absolute inset-[-12px] border border-gold/12 rounded-full"
               style="animation: spin 4s linear infinite">
          </div>
          <div class="absolute inset-[-6px] border-t border-gold/25 rounded-full"
               style="animation: spin 2s linear infinite reverse">
          </div>
        </div>

        <div class="text-center">
          <div class="font-display text-2xl text-gold tracking-[0.4em] mb-1">ALUCABOND</div>
          <div class="font-mono text-[9px] text-gold/25 tracking-[0.8em] uppercase">CONSTRUCT</div>
        </div>

        <!-- Progress bar -->
        <div class="w-64 h-px bg-gold/10 relative overflow-hidden">
          <div
            class="absolute inset-0 origin-left transition-transform duration-300"
            style="background: linear-gradient(to right, #C9A84C, #F0D080)"
            :style="{ transform: `scaleX(${progress / 100})` }"
          ></div>
        </div>

        <div class="font-mono text-[8px] text-gold/25 tracking-[0.5em] uppercase">
          {{ status }}
        </div>

        <!-- Progress number -->
        <div class="font-display text-4xl text-gold/15 tabular-nums">
          {{ progress.toString().padStart(3, '0') }}
        </div>
      </div>

      <!-- Corner decorations -->
      <div class="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/15"></div>
      <div class="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/15"></div>
      <div class="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold/15"></div>
      <div class="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/15"></div>

      <!-- System info -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[7px] text-gold/12 tracking-[0.5em] text-center">
        INITIALIZING FACADE SYSTEM v2.4.0
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const visible = ref(true)
const progress = ref(0)
const status = ref('Tizim ishga tushirilmoqda...')

const statuses = [
  'Tizim ishga tushirilmoqda...',
  'WebGL yuklanmoqda...',
  'Shader kompilyatsiyasi...',
  'Sahnalar yaratilmoqda...',
  'Materialar yuklanmoqda...',
  'Tayyor.'
]

onMounted(() => {
  const tl = gsap.timeline()

  tl.to(progress, { value: 20, duration: 0.8, ease: 'power2.out', onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[0] } })
    .to(progress, { value: 45, duration: 0.6, onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[1] } })
    .to(progress, { value: 65, duration: 0.5, onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[2] } })
    .to(progress, { value: 80, duration: 0.7, onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[3] } })
    .to(progress, { value: 95, duration: 0.4, onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[4] } })
    .to(progress, {
      value: 100,
      duration: 0.3,
      onUpdate: () => { progress.value = Math.round(progress.value); status.value = statuses[5] },
      onComplete: () => {
        setTimeout(() => { visible.value = false }, 400)
      }
    })
})
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
