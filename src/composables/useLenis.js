import { onMounted, onUnmounted, ref } from 'vue'
import Lenis from 'lenis'

export function useLenis() {
  const lenis = ref(null)
  const scrollY = ref(0)
  const scrollProgress = ref(0)

  onMounted(() => {
    lenis.value = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenis.value.on('scroll', ({ scroll, progress }) => {
      scrollY.value = scroll
      scrollProgress.value = progress
    })

    function raf(time) {
      lenis.value?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    lenis.value?.destroy()
  })

  return { lenis, scrollY, scrollProgress }
}
