<template>
  <div>
    <div ref="dotRef" class="cursor-dot" :class="{ 'scale-0': isHidden }"></div>
    <div ref="ringRef" class="cursor-ring" :class="{ hovering: isHovering, 'scale-0': isHidden }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const dotRef = ref(null)
const ringRef = ref(null)
const isHovering = ref(false)
const isHidden = ref(false)

let mouse = { x: 0, y: 0 }
let ring = { x: 0, y: 0 }
let animId

function animate() {
  animId = requestAnimationFrame(animate)
  ring.x += (mouse.x - ring.x) * 0.12
  ring.y += (mouse.y - ring.y) * 0.12

  if (dotRef.value) {
    dotRef.value.style.left = mouse.x + 'px'
    dotRef.value.style.top = mouse.y + 'px'
  }
  if (ringRef.value) {
    ringRef.value.style.left = ring.x + 'px'
    ringRef.value.style.top = ring.y + 'px'
  }
}

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onEnterLink() { isHovering.value = true }
function onLeaveLink() { isHovering.value = false }

function onLeaveWindow() { isHidden.value = true }
function onEnterWindow() { isHidden.value = false }

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onLeaveWindow)
  document.addEventListener('mouseenter', onEnterWindow)

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', onEnterLink)
    el.addEventListener('mouseleave', onLeaveLink)
  })

  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeaveWindow)
  document.removeEventListener('mouseenter', onEnterWindow)
})
</script>
