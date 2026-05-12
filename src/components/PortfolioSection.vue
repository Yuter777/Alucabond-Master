<template>
  <section id="portfolio" class="relative bg-black py-28 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase">Loyihalar</div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <h2 ref="titleRef" class="font-display text-[clamp(2.2rem,5.5vw,6.5rem)] leading-none text-gold/90 opacity-0">
          TUGALLANGAN<br/><span class="text-gold/30">LOYIHALAR</span>
        </h2>
      </div>

      <!-- Projects grid -->
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px opacity-0">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="relative overflow-hidden cursor-pointer group"
          :class="i === 0 ? 'md:col-span-2' : ''"
          style="height: 360px; border: 1px solid rgba(201,168,76,0.06)"
          @click="openProject(project)"
        >
          <!-- Real image -->
          <img
            :src="project.img"
            :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <!-- Dark overlay -->
          <div class="absolute inset-0 transition-all duration-500"
               style="background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%)"></div>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

          <!-- Category badge -->
          <div class="absolute top-4 left-4 z-10">
            <span class="font-mono text-[7px] tracking-[0.4em] uppercase text-gold/60 bg-black/60 px-2.5 py-1.5 backdrop-blur-sm"
                  style="border: 1px solid rgba(201,168,76,0.15)">
              {{ project.category }}
            </span>
          </div>

          <!-- Number -->
          <div class="absolute top-4 right-4 z-10 font-display text-5xl text-white/8 group-hover:text-white/14 transition-colors duration-500">
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h4 class="font-display text-[clamp(1.2rem,2.2vw,1.8rem)] text-gold/82 group-hover:text-gold transition-colors duration-400 leading-tight mb-2">
              {{ project.title }}
            </h4>
            <div class="flex items-center gap-3">
              <span class="font-mono text-[8px] text-gold/42 tracking-wider">{{ project.location }}</span>
              <span class="text-gold/20 text-xs">·</span>
              <span class="font-mono text-[8px] text-gold/32">{{ project.area }}</span>
              <span class="text-gold/20 text-xs">·</span>
              <span class="font-mono text-[8px] text-gold/28">{{ project.year }}</span>
            </div>
          </div>

          <!-- Bottom reveal bar -->
          <div class="absolute bottom-0 left-0 h-[2px] w-full" style="background: rgba(201,168,76,0.06)">
            <div class="h-full transition-all duration-700 w-0 group-hover:w-full"
                 style="background: rgba(201,168,76,0.38)"></div>
          </div>
        </div>
      </div>

      <!-- View all -->
      <div ref="viewAllRef" class="mt-12 flex items-center justify-between opacity-0">
        <div class="font-mono text-[8px] text-gold/18 tracking-[0.4em] uppercase">
          {{ projects.length }} loyiha ko'rsatilmoqda
        </div>
        <button class="btn-secondary text-[9px]">
          Barcha loyihalar →
        </button>
      </div>
    </div>

    <!-- Project detail modal -->
    <Transition name="modal-fade">
      <div v-if="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
        <div class="absolute inset-0 bg-black/92 backdrop-blur-sm" @click="selectedProject = null"></div>
        <div class="relative w-full max-w-xl bg-black overflow-hidden"
             style="border: 1px solid rgba(201,168,76,0.12)">
          <div class="h-48 relative overflow-hidden">
            <img :src="selectedProject.img" :alt="selectedProject.title"
                 class="w-full h-full object-cover"/>
            <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(0,0,0,0.6), transparent)"></div>
            <button
              class="absolute top-4 right-4 font-mono text-[9px] text-gold/50 hover:text-gold px-3 py-1.5 transition-all duration-300 bg-black/50"
              style="border: 1px solid rgba(201,168,76,0.2)"
              @click="selectedProject = null"
            >
              ESC ✕
            </button>
          </div>

          <div class="p-8">
            <div class="font-mono text-[7px] text-gold/22 tracking-[0.6em] uppercase mb-3">Loyiha haqida</div>
            <h3 class="font-display text-3xl text-gold/90 mb-6 leading-tight">{{ selectedProject.title }}</h3>

            <div class="grid grid-cols-2 gap-px mb-8">
              <div v-for="(val, key) in selectedProject.details" :key="key"
                   class="p-4" style="border: 1px solid rgba(201,168,76,0.06)">
                <div class="font-mono text-[7px] text-gold/22 tracking-[0.4em] uppercase mb-1.5">{{ key }}</div>
                <div class="font-body text-xs text-gold/55">{{ val }}</div>
              </div>
            </div>

            <div class="flex gap-3">
              <button class="btn-primary flex-1 text-[9px] py-4">O'xshash loyiha so'rash</button>
              <button class="btn-secondary text-[9px] py-4 px-5" @click="selectedProject = null">Yopish</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import sergeliImg from '@/assets/sergeli.jpg'
import yunsobodImg from '@/assets/yunsobod.jpg'
import qoqonImg from '@/assets/qoqon.jpg'
import sebzorImg from '@/assets/sebzor.jpg'
import bokaImg from '@/assets/boka.jpg'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const gridRef = ref(null)
const viewAllRef = ref(null)
const selectedProject = ref(null)

const projects = [
  {
    id: 1,
    title: 'Sergeli Turar-joy Majmuasi',
    category: 'TURAR-JOY',
    location: 'Toshkent, Sergeli',
    area: '14,200 m²',
    year: '2024',
    img: sergeliImg,
    details: { Joylashuv: 'Toshkent, Sergeli', Maydon: '14,200 m²', Yil: '2024', Material: 'Alucobond White Pearl', Muddat: '3 oy', Xizmat: 'To\'liq fasad o\'rnatish' }
  },
  {
    id: 2,
    title: 'Yunusobod Business Center',
    category: 'TIJORAT',
    location: 'Toshkent, Yunusobod',
    area: '9,800 m²',
    year: '2024',
    img: yunsobodImg,
    details: { Joylashuv: 'Toshkent, Yunusobod', Maydon: '9,800 m²', Yil: '2024', Material: 'ACP Silver Metallic', Muddat: '2.5 oy', Xizmat: 'Fasad qoplama' }
  },
  {
    id: 3,
    title: "Qo'qon Savdo Markazi",
    category: 'TIJORAT',
    location: "Qo'qon shahri",
    area: '11,500 m²',
    year: '2023',
    img: qoqonImg,
    details: { Joylashuv: "Qo'qon", Maydon: '11,500 m²', Yil: '2023', Material: 'Alucobond Plus Gold', Muddat: '3.5 oy', Xizmat: 'Savdo markazi fasad' }
  },
  {
    id: 4,
    title: 'Sebzor Tibbiyot Markazi',
    category: 'IJTIMOIY',
    location: 'Toshkent, Sebzor',
    area: '6,300 m²',
    year: '2023',
    img: sebzorImg,
    details: { Joylashuv: 'Toshkent, Sebzor', Maydon: '6,300 m²', Yil: '2023', Material: 'ACP Charcoal Matt', Muddat: '2 oy', Xizmat: 'Fasad va ichki bezak' }
  },
  {
    id: 5,
    title: "Bo'ka Industrial Park",
    category: 'INDUSTRIAL',
    location: "Bo'ka tumani",
    area: '38,000 m²',
    year: '2023',
    img: bokaImg,
    details: { Joylashuv: "Bo'ka tumani", Maydon: '38,000 m²', Yil: '2023', Material: 'ACP Brushed Titanium', Muddat: '6 oy', Xizmat: 'Industrial fasad tizimi' }
  },
]

function openProject(project) {
  selectedProject.value = project
}

onMounted(() => {
  gsap.to(titleRef.value, {
    opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: titleRef.value, start: 'top 85%' }
  })
  gsap.to(gridRef.value, {
    opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.05,
    scrollTrigger: { trigger: gridRef.value, start: 'top 85%' }
  })
  gsap.to(viewAllRef.value, {
    opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2,
    scrollTrigger: { trigger: viewAllRef.value, start: 'top 90%' }
  })
})
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
