<template>
  <div class="app">
    <!-- Loading screen -->
    <LoadingScreen />

    <!-- Film grain overlay -->
    <div class="noise-overlay"></div>

    <!-- Scanline effect -->
    <div class="scanline"></div>

    <!-- Custom cursor (desktop only) -->
    <CustomCursor v-if="!isMobile" />

    <!-- Navigation -->
    <NavBar />

    <!-- Main content -->
    <main>
      <HeroSection />
      <MarqueeSection />
      <TrustSection />
      <BeforeAfterSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>

    <!-- Scroll progress line -->
    <div
      class="fixed top-0 left-0 h-[2px] z-40 pointer-events-none transition-none"
      style="background: linear-gradient(to right, rgba(201,168,76,0.7), rgba(201,168,76,0.2))"
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import CustomCursor from './components/CustomCursor.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeSection from './components/MarqueeSection.vue'
import TrustSection from './components/TrustSection.vue'
import BeforeAfterSection from './components/BeforeAfterSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const isMobile = ref(false)
const scrollProgress = ref(0)

function onScroll() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768 || 'ontouchstart' in window
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
.app {
  background: #000;
  min-height: 100vh;
}
</style>
