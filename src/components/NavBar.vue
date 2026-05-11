<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-600"
    :class="{ 'nav-scrolled': scrolled }"
  >
    <div class="px-8 md:px-16 py-5 flex items-center justify-between">
      <!-- Logo -->
      <a href="#hero" @click.prevent="scrollTo('#hero')" class="flex items-center gap-3 group">
        <div class="logo-mark group-hover:opacity-80 transition-opacity duration-300">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9">
            <defs>
              <linearGradient id="navRing" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F5D78A"/>
                <stop offset="50%" stop-color="#8B6914"/>
                <stop offset="100%" stop-color="#F0D070"/>
              </linearGradient>
              <linearGradient id="navA" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#F0D070"/>
                <stop offset="40%" stop-color="#C9A84C"/>
                <stop offset="75%" stop-color="#8B6914"/>
                <stop offset="100%" stop-color="#E8C860"/>
              </linearGradient>
            </defs>
            <circle cx="18" cy="18" r="16.5" stroke="url(#navRing)" stroke-width="1.5"/>
            <polygon points="5.5,28.5 10.5,28.5 18,9 25.5,28.5 30.5,28.5 18,5" fill="url(#navA)"/>
            <polygon points="10.5,28.5 25.5,28.5 18,19" fill="#080808"/>
          </svg>
        </div>
        <div>
          <div class="font-display text-xl tracking-[0.22em] text-gold leading-none">ALUCABOND</div>
          <div class="font-mono text-[7px] tracking-[0.55em] text-gold/30 uppercase mt-0.5">CONSTRUCT</div>
        </div>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-link font-mono text-[9px] tracking-[0.3em] uppercase text-gold/35 hover:text-gold/75 transition-colors duration-300 relative py-1"
          @click.prevent="scrollTo(item.href)"
        >
          {{ item.label }}
          <span class="nav-underline"></span>
        </a>
      </div>

      <!-- Right side -->
      <div class="hidden md:flex items-center gap-5">
        <a href="https://instagram.com/alucabond_construct" target="_blank"
           class="font-mono text-[8px] text-gold/25 hover:text-gold/55 tracking-[0.3em] uppercase transition-colors duration-300">
          Instagram
        </a>
        <button class="btn-primary text-[9px] py-2.5 px-5" @click="scrollTo('#contact')">
          Murojaat
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 ml-2"
        :aria-label="mobileOpen ? 'Yopish' : 'Menyu'"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="block w-5 h-px bg-gold/60 transition-all duration-300 origin-center"
              :class="mobileOpen ? 'rotate-45 translate-y-[5px]' : ''"></span>
        <span class="block w-3.5 h-px bg-gold/35 transition-all duration-300"
              :class="mobileOpen ? 'opacity-0 -translate-x-2' : ''"></span>
        <span class="block w-5 h-px bg-gold/60 transition-all duration-300 origin-center"
              :class="mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''"></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div
      class="md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/97 border-t border-gold/6"
      :style="{ maxHeight: mobileOpen ? '400px' : '0', opacity: mobileOpen ? 1 : 0 }"
    >
      <div class="px-8 py-8 flex flex-col gap-5">
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="font-mono text-xs tracking-[0.3em] uppercase text-gold/40 hover:text-gold/70 transition-colors duration-300 py-1"
          @click.prevent="scrollTo(item.href); mobileOpen = false"
        >
          {{ item.label }}
        </a>
        <div class="pt-3 border-t border-gold/6">
          <button class="btn-primary w-full text-xs py-4" @click="scrollTo('#contact'); mobileOpen = false">
            Murojaat qilish
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const navItems = [
  { label: 'Xizmatlar', href: '#services' },
  { label: 'Loyihalar', href: '#portfolio' },
  { label: 'Jarayon', href: '#process' },
  { label: 'Biz haqimizda', href: '#about' },
  { label: 'Aloqa', href: '#contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  scrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-scrolled {
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(201, 168, 76, 0.06);
}

.nav-underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 100%;
  height: 1px;
  background: rgba(201, 168, 76, 0.5);
  transition: right 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-link:hover .nav-underline {
  right: 0;
}
</style>
