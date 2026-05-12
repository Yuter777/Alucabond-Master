<template>
  <section class="relative bg-black py-28 overflow-hidden">
    <div
      class="absolute inset-0 grid-overlay opacity-10 pointer-events-none"
    ></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div
          class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase"
        >
          Transformatsiya
        </div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div
        class="flex flex-col md:flex-row md:items-end gap-8 justify-between mb-16"
      >
        <h2
          ref="titleRef"
          class="font-display text-[clamp(2.2rem,5.5vw,6rem)] leading-none text-gold/90 opacity-0"
        >
          OLDIN<br /><span class="text-gold/30">VA KEYIN</span>
        </h2>
        <p
          ref="descRef"
          class="max-w-xs font-body text-sm text-gold/32 leading-loose opacity-0"
        >
          Fasad o'rnatishimiz binoning ko'rinishini va qiymatini tubdan
          o'zgartiradi. Suring va ko'ring.
        </p>
      </div>

      <!-- Before/After slider -->
      <div
        ref="sliderRef"
        class="relative overflow-hidden cursor-col-resize select-none opacity-0 w-full aspect-[16/10]"
        style="border: 1px solid rgba(201, 168, 76, 0.12)"
        @mousedown="startDrag"
        @touchstart.prevent="startDragTouch"
      >
        <!-- AFTER (right side — new facade) -->
        <div class="absolute inset-0">
          <img
            src="@/assets/after.png"
            class="w-full h-full object-cover"
            alt="Keyin"
            draggable="false"
          />
          <div
            class="absolute top-4 left-4 px-3 py-1"
            style="
              background: rgba(0, 0, 0, 0.6);
              border: 1px solid rgba(201, 168, 76, 0.3);
            "
          >
            <span
              class="font-mono text-[10px] tracking-[0.3em] uppercase"
              style="color: rgba(201, 168, 76, 0.8)"
              >KEYIN</span
            >
          </div>
        </div>

        <!-- BEFORE (left side — old building) -->
        <div
          class="absolute inset-0 overflow-hidden"
          :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
        >
          <img
            src="@/assets/before.png"
            class="w-full h-full object-cover"
            alt="Oldin"
            draggable="false"
          />
          <div
            class="absolute top-4 left-4 px-3 py-1"
            style="
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid rgba(201, 168, 76, 0.2);
            "
          >
            <span
              class="font-mono text-[10px] tracking-[0.3em] uppercase"
              style="color: rgba(201, 168, 76, 0.5)"
              >OLDIN</span
            >
          </div>
        </div>

        <!-- Drag handle -->
        <div
          class="absolute top-0 bottom-0 w-px z-20 pointer-events-none transition-none"
          style="background: rgba(201, 168, 76, 0.7)"
          :style="{ left: sliderPos + '%' }"
        >
          <!-- Handle pill -->
          <div
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-black flex items-center justify-center shadow-lg"
            style="border: 1px solid rgba(201, 168, 76, 0.5)"
          >
            <div class="flex gap-1">
              <div class="w-px h-4 bg-gold/55"></div>
              <div class="w-px h-4 bg-gold/55"></div>
            </div>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 -translate-x-12 font-mono text-[8px] text-gold/35 tracking-wider"
          >
            ←
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 translate-x-6 font-mono text-[8px] text-gold/35 tracking-wider"
          >
            →
          </div>
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
            border:
              '1px solid ' +
              (activeCase === i
                ? 'rgba(201,168,76,0.18)'
                : 'rgba(201,168,76,0.06)'),
          }"
          @click="activeCase = i"
        >
          <div
            class="font-mono text-[10px] text-gold/22 tracking-[0.4em] uppercase mb-2"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </div>
          <div
            class="font-body text-[12px] text-gold/48 group-hover:text-gold/68 transition-colors duration-400"
          >
            {{ c.title }}
          </div>
          <div class="font-mono text-[10px] text-gold/18 mt-1">
            {{ c.location }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleRef = ref(null);
const descRef = ref(null);
const sliderRef = ref(null);
const casesRef = ref(null);

const sliderPos = ref(50);
const hasDragged = ref(false);
const activeCase = ref(0);
let isDragging = false;

const cases = [
  { title: "Turar-joy binosi fasad yengilanishi", location: "Toshkent, 2024" },
  { title: "Ofis markazi ACP qoplama", location: "Toshkent, 2023" },
  { title: "Savdo markazi tashqi bezak", location: "Toshkent, 2024" },
];

function getSliderPos(clientX) {
  const rect = sliderRef.value.getBoundingClientRect();
  const pos = ((clientX - rect.left) / rect.width) * 100;
  return Math.max(5, Math.min(95, pos));
}

function startDrag(e) {
  isDragging = true;
  hasDragged.value = true;
  sliderPos.value = getSliderPos(e.clientX);

  const onMove = (e) => {
    if (!isDragging) return;
    sliderPos.value = getSliderPos(e.clientX);
  };
  const onUp = () => {
    isDragging = false;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}

function startDragTouch(e) {
  isDragging = true;
  hasDragged.value = true;
  const touch = e.touches[0];
  sliderPos.value = getSliderPos(touch.clientX);

  const onMove = (e) => {
    if (!isDragging) return;
    sliderPos.value = getSliderPos(e.touches[0].clientX);
  };
  const onUp = () => {
    isDragging = false;
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onUp);
  };
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onUp);
}

function autoDemo() {
  if (hasDragged.value) return;
  gsap.fromTo(
    sliderPos,
    { value: 80 },
    {
      value: 30,
      duration: 2.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(sliderPos, { value: 50, duration: 1, ease: "power2.out" });
      },
    }
  );
}

onMounted(() => {
  gsap.to(titleRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: titleRef.value, start: "top 82%" },
  });
  gsap.to(descRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.1,
    scrollTrigger: { trigger: descRef.value, start: "top 82%" },
  });
  gsap.to(sliderRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: sliderRef.value,
      start: "top 80%",
      onEnter: autoDemo,
    },
  });
  gsap.to(casesRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: { trigger: casesRef.value, start: "top 88%" },
  });
});
</script>
