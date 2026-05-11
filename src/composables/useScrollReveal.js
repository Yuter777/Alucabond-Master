import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const observers = []

  function revealElement(el, options = {}) {
    const {
      y = 60,
      opacity = 0,
      duration = 1.2,
      delay = 0,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 85%'
    } = options

    if (Array.isArray(el) || el instanceof NodeList) {
      gsap.fromTo(el,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el[0],
            start,
            toggleActions: 'play none none none'
          }
        }
      )
    } else {
      gsap.fromTo(el,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none'
          }
        }
      )
    }
  }

  function revealCharacters(el, options = {}) {
    const { duration = 0.8, stagger = 0.03, delay = 0 } = options
    const text = el.textContent
    el.innerHTML = text.split('').map(char =>
      `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block;transform:translateY(110%)">${char === ' ' ? '&nbsp;' : char}</span></span>`
    ).join('')

    const spans = el.querySelectorAll('span > span')
    gsap.to(spans, {
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  }

  function parallax(el, speed = 0.3) {
    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })

  return { revealElement, revealCharacters, parallax }
}
