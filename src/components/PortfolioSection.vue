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
        <div ref="filterRef" class="flex gap-0 flex-wrap opacity-0 border border-gold/12">
          <button
            v-for="cat in categories"
            :key="cat"
            class="font-mono text-[8px] tracking-[0.3em] uppercase px-5 py-3 transition-all duration-300"
            :class="activeCategory === cat
              ? 'bg-gold text-black'
              : 'text-gold/28 hover:text-gold/55'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Featured large project -->
      <div
        ref="featuredRef"
        class="relative mb-px overflow-hidden cursor-pointer group opacity-0"
        style="height: clamp(300px, 55vh, 500px); border: 1px solid rgba(201,168,76,0.1)"
        @click="openProject(featured)"
      >
        <!-- Facade pattern visual -->
        <div class="absolute inset-0 overflow-hidden">
          <svg class="w-full h-full" viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="feat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0a0b0c"/>
                <stop offset="100%" stop-color="#141618"/>
              </linearGradient>
              <linearGradient id="feat-panel" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="#1c1e22"/>
                <stop offset="100%" stop-color="#141618"/>
              </linearGradient>
            </defs>
            <rect width="1400" height="500" fill="url(#feat-bg)"/>
            <rect x="200" y="0" width="1000" height="500" fill="url(#feat-panel)"/>
            <g opacity="0.5">
              <line x1="200" y1="0" x2="200" y2="500" stroke="#0a0a0b" stroke-width="3"/>
              <line x1="400" y1="0" x2="400" y2="500" stroke="#080809" stroke-width="2"/>
              <line x1="600" y1="0" x2="600" y2="500" stroke="#090909" stroke-width="2"/>
              <line x1="800" y1="0" x2="800" y2="500" stroke="#080809" stroke-width="2"/>
              <line x1="1000" y1="0" x2="1000" y2="500" stroke="#090909" stroke-width="2"/>
              <line x1="1200" y1="0" x2="1200" y2="500" stroke="#0a0a0b" stroke-width="3"/>
              <line x1="200" y1="80" x2="1200" y2="80" stroke="#090909" stroke-width="1.5"/>
              <line x1="200" y1="160" x2="1200" y2="160" stroke="#090909" stroke-width="1.5"/>
              <line x1="200" y1="240" x2="1200" y2="240" stroke="#090909" stroke-width="1.5"/>
              <line x1="200" y1="320" x2="1200" y2="320" stroke="#090909" stroke-width="1.5"/>
              <line x1="200" y1="400" x2="1200" y2="400" stroke="#090909" stroke-width="1.5"/>
            </g>
            <rect x="202" y="2" width="196" height="76" fill="rgba(201,168,76,0.02)"/>
            <rect x="402" y="82" width="196" height="76" fill="rgba(201,168,76,0.03)"/>
            <rect x="602" y="2" width="196" height="76" fill="rgba(201,168,76,0.018)"/>
            <rect x="802" y="162" width="196" height="76" fill="rgba(201,168,76,0.025)"/>
            <!-- Gold chrome columns -->
            <rect x="197" y="0" width="5" height="500" fill="rgba(201,168,76,0.15)"/>
            <rect x="397" y="0" width="4" height="500" fill="rgba(201,168,76,0.1)"/>
            <rect x="597" y="0" width="4" height="500" fill="rgba(201,168,76,0.1)"/>
            <rect x="797" y="0" width="4" height="500" fill="rgba(201,168,76,0.1)"/>
            <rect x="997" y="0" width="4" height="500" fill="rgba(201,168,76,0.1)"/>
            <rect x="1197" y="0" width="5" height="500" fill="rgba(201,168,76,0.15)"/>
            <rect width="1400" height="500" fill="url(#feat-overlay)"/>
            <defs>
              <linearGradient id="feat-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(0,0,0,0.4)"/>
                <stop offset="50%" stop-color="rgba(0,0,0,0)"/>
                <stop offset="100%" stop-color="rgba(0,0,0,0.7)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-700"></div>

        <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
          <div class="flex items-end justify-between">
            <div>
              <div class="flex items-center gap-4 mb-4">
                <span class="font-mono text-[8px] text-gold/32 tracking-[0.5em] uppercase">Asosiy loyiha</span>
                <span class="font-mono text-[8px] text-gold/22 tracking-wider">— 2024</span>
              </div>
              <h3 class="font-display text-[clamp(1.8rem,4vw,4rem)] text-gold/90 leading-none mb-3 group-hover:text-gold transition-colors duration-400">
                TASHKENT CITY<br/>BUSINESS TOWER
              </h3>
              <div class="flex flex-wrap gap-4 items-center">
                <span class="font-mono text-[9px] text-gold/32 tracking-wider">Toshkent</span>
                <div class="w-px h-3 bg-gold/16"></div>
                <span class="font-mono text-[9px] text-gold/26">18,400 m²</span>
                <div class="w-px h-3 bg-gold/16"></div>
                <span class="font-mono text-[9px] text-gold/26">Alucobond Plus</span>
              </div>
            </div>
            <div class="w-11 h-11 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 flex-shrink-0"
                 style="border: 1px solid rgba(201,168,76,0.4)">
              <span class="text-gold/65 text-sm">→</span>
            </div>
          </div>
        </div>

        <!-- Progress reveal bar -->
        <div class="absolute bottom-0 left-0 h-[2px] w-full" style="background: rgba(201,168,76,0.08)">
          <div class="h-full transition-all duration-700 w-0 group-hover:w-full"
               style="background: rgba(201,168,76,0.4)"></div>
        </div>
      </div>

      <!-- Projects grid -->
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px opacity-0">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          class="relative overflow-hidden cursor-pointer group"
          style="height: 320px; border: 1px solid rgba(201,168,76,0.06)"
          @click="openProject(project)"
        >
          <div class="absolute inset-0 overflow-hidden" :style="{ background: project.bg }">
            <svg class="w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="320" :fill="project.bg"/>
              <g opacity="0.5">
                <line v-for="x in [80,160,240,320]" :key="'v'+x" :x1="x" y1="0" :x2="x" y2="320" stroke="#0a0a0a" stroke-width="2"/>
                <line v-for="y in [65,130,195,260]" :key="'h'+y" x1="0" :y1="y" x2="400" :y2="y" stroke="#090909" stroke-width="1.5"/>
              </g>
              <rect width="400" height="320" fill="url(#card-overlay)"/>
              <defs>
                <linearGradient id="card-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="rgba(0,0,0,0.3)"/>
                  <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
                  <stop offset="100%" stop-color="rgba(0,0,0,0.7)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500"></div>

          <div class="absolute top-4 left-4 z-10">
            <span class="font-mono text-[7px] tracking-[0.4em] uppercase text-gold/32 bg-black/50 px-2.5 py-1.5 backdrop-blur-sm"
                  style="border: 1px solid rgba(201,168,76,0.07)">
              {{ project.category }}
            </span>
          </div>

          <div class="absolute top-4 right-4 z-10 font-display text-5xl text-gold/5 group-hover:text-gold/10 transition-colors duration-500">
            {{ String(i + 2).padStart(2, '0') }}
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
            <h4 class="font-display text-[clamp(1.1rem,2vw,1.6rem)] text-gold/72 group-hover:text-gold/92 transition-colors duration-400 leading-tight mb-2">
              {{ project.title }}
            </h4>
            <div class="flex items-center gap-3 overflow-hidden" style="max-height: 20px; opacity: 0.6">
              <span class="font-mono text-[7px] text-gold/38 tracking-wider">{{ project.location }}</span>
              <span class="text-gold/16 text-xs">·</span>
              <span class="font-mono text-[7px] text-gold/28">{{ project.area }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- View all row -->
      <div ref="viewAllRef" class="mt-12 flex items-center justify-between opacity-0">
        <div class="font-mono text-[8px] text-gold/16 tracking-[0.4em] uppercase">
          {{ filteredProjects.length + 1 }} loyiha ko'rsatilmoqda
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
          <div class="h-40 relative overflow-hidden" :style="{ background: selectedProject.bg }">
            <svg class="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="xMidYMid slice">
              <rect width="600" height="160" :fill="selectedProject.bg"/>
              <g opacity="0.4">
                <line v-for="x in [100,200,300,400,500]" :key="x" :x1="x" y1="0" :x2="x" y2="160" stroke="#090909" stroke-width="2"/>
                <line v-for="y in [40,80,120]" :key="y" x1="0" :y1="y" x2="600" :y2="y" stroke="#080808" stroke-width="1"/>
              </g>
            </svg>
            <button
              class="absolute top-4 right-4 font-mono text-[9px] text-gold/42 hover:text-gold px-3 py-1.5 transition-all duration-300"
              style="border: 1px solid rgba(201,168,76,0.18)"
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
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const filterRef = ref(null)
const featuredRef = ref(null)
const gridRef = ref(null)
const viewAllRef = ref(null)

const activeCategory = ref('BARCHASI')
const selectedProject = ref(null)

const categories = ['BARCHASI', 'TIJORAT', 'TURAR-JOY', 'INDUSTRIAL', 'SPORT']

const featured = {
  title: 'Tashkent City Business Tower',
  bg: '#0e0f11',
  details: {
    Joylashuv: 'Toshkent shahri',
    Maydon: '18,400 m²',
    Material: 'Alucobond Plus Silver',
    Yil: '2024',
    Muddat: '4 oy',
    Xizmat: 'To\'liq fasad o\'rnatish',
  }
}

const projects = [
  {
    id: 1, title: 'Samarkand Plaza', category: 'TIJORAT',
    location: 'Samarqand', area: '12,800 m²',
    bg: 'linear-gradient(135deg, #0c0d0e 0%, #111315 100%)',
    details: { Joylashuv: 'Samarqand', Maydon: '12,800 m²', Yil: '2023', Material: 'ACP Silver Metallic', Muddat: '3 oy', Xizmat: 'ACP fasad qoplama' }
  },
  {
    id: 2, title: 'Navoi Industrial Hub', category: 'INDUSTRIAL',
    location: 'Navoiy', area: '45,200 m²',
    bg: 'linear-gradient(135deg, #0a0a0b 0%, #101012 100%)',
    details: { Joylashuv: 'Navoiy', Maydon: '45,200 m²', Yil: '2023', Material: 'ACP Charcoal Matt', Muddat: '7 oy', Xizmat: 'Industrial fasad' }
  },
  {
    id: 3, title: 'Mirzo Ulugbek Residence', category: 'TURAR-JOY',
    location: 'Toshkent', area: '8,400 m²',
    bg: 'linear-gradient(135deg, #0f1011 0%, #131416 100%)',
    details: { Joylashuv: 'Toshkent', Maydon: '8,400 m²', Yil: '2024', Material: 'Alucobond White Pearl', Muddat: '2.5 oy', Xizmat: 'Turar-joy fasad' }
  },
  {
    id: 4, title: 'Andijan Sports Complex', category: 'SPORT',
    location: 'Andijon', area: '22,000 m²',
    bg: 'linear-gradient(135deg, #0b0c0e 0%, #10121a 100%)',
    details: { Joylashuv: 'Andijon', Maydon: '22,000 m²', Yil: '2024', Material: 'ACP Brushed Titanium', Muddat: '5 oy', Xizmat: 'Sport majmuasi fasad' }
  },
  {
    id: 5, title: "Fergana Gate Mall", category: 'TIJORAT',
    location: "Farg'ona", area: '18,600 m²',
    bg: 'linear-gradient(135deg, #0d0e10 0%, #121416 100%)',
    details: { Joylashuv: "Farg'ona", Maydon: '18,600 m²', Yil: '2023', Material: 'Alucobond Gold Anodized', Muddat: '4 oy', Xizmat: 'Savdo markazi fasad' }
  },
]

const filteredProjects = computed(() =>
  activeCategory.value === 'BARCHASI'
    ? projects
    : projects.filter(p => p.category === activeCategory.value)
)

function openProject(project) {
  selectedProject.value = project
}

onMounted(() => {
  const items = [
    { el: titleRef.value, delay: 0 },
    { el: filterRef.value, delay: 0.1 },
    { el: featuredRef.value, delay: 0.05 },
    { el: gridRef.value, delay: 0.15 },
    { el: viewAllRef.value, delay: 0.2 },
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
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
