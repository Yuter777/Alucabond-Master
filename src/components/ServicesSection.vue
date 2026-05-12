<template>
  <section id="services" class="relative bg-black py-28 overflow-hidden">
    <div
      class="absolute inset-0 grid-overlay opacity-15 pointer-events-none"
    ></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div
          class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase"
        >
          Xizmatlar
        </div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div
        class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <h2
          ref="titleRef"
          class="font-display text-[clamp(2.2rem,5.5vw,6.5rem)] leading-none text-gold/90 opacity-0"
        >
          NIMA<br /><span class="text-gold/30">QILAMIZ</span>
        </h2>
        <p
          ref="descRef"
          class="max-w-xs font-body text-sm text-gold/32 leading-loose opacity-0"
        >
          Fasad o'rnatishdan tortib yakuniy bezakka qadar — to'liq jarayonni
          boshqaramiz.
        </p>
      </div>

      <!-- Services list — large format -->
      <div ref="listRef" class="space-y-px opacity-0">
        <div
          v-for="(service, i) in services"
          :key="i"
          class="service-row group cursor-pointer"
          style="border-top: 1px solid rgba(201, 168, 76, 0.07)"
          @mouseenter="activeService = i"
          @mouseleave="activeService = null"
        >
          <div class="flex items-start gap-6 md:gap-10 py-8 md:py-10 relative">
            <!-- Number -->
            <span
              class="font-mono text-[9px] text-gold/22 tracking-[0.3em] w-8 flex-shrink-0 pt-2"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>

            <!-- Title + desc -->
            <div class="flex-1 min-w-0">
              <div
                class="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 mb-3"
              >
                <h3
                  class="font-display text-[clamp(1.6rem,3.5vw,3.5rem)] leading-none transition-colors duration-400"
                  :class="activeService === i ? 'text-gold/90' : 'text-gold/55'"
                >
                  {{ service.title }}
                </h3>
                <div class="hidden md:flex items-center gap-3">
                  <span
                    v-for="tag in service.tags"
                    :key="tag"
                    class="font-mono text-[7px] tracking-[0.4em] uppercase px-3 py-1.5 border transition-all duration-400"
                    :class="
                      activeService === i
                        ? 'border-gold/22 text-gold/45'
                        : 'border-gold/9 text-gold/18'
                    "
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <p
                class="font-body text-xs text-gold/28 leading-loose max-w-lg transition-all duration-500 overflow-hidden"
                :class="
                  activeService === i
                    ? 'max-h-20 opacity-100'
                    : 'max-h-0 opacity-0'
                "
              >
                {{ service.desc }}
              </p>
            </div>

            <!-- Arrow -->
            <div
              class="ml-auto flex-shrink-0 w-10 h-10 border flex items-center justify-center transition-all duration-400"
              :class="
                activeService === i
                  ? 'border-gold/32 bg-gold/5'
                  : 'border-gold/10'
              "
            >
              <span
                class="font-mono text-xs text-gold/42 transition-transform duration-400"
                :class="activeService === i ? 'translate-x-0.5' : ''"
              >
                →
              </span>
            </div>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(201, 168, 76, 0.07)"></div>
      </div>

      <!-- Bottom CTA -->
      <div
        ref="ctaRef"
        class="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 opacity-0"
      >
        <div>
          <div class="font-body text-sm text-gold/42 mb-2">
            Loyihangiz uchun narx hisoblash kerakmi?
          </div>
          <div class="font-body text-xs text-gold/22">
            Bepul konsultatsiya — 24 soat ichida javob beramiz
          </div>
        </div>
        <button class="btn-primary flex-shrink-0" @click="openTelegram">
          Narx So'rash
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleRef = ref(null);
const descRef = ref(null);
const listRef = ref(null);
const ctaRef = ref(null);
const activeService = ref(null);

const openTelegram = () => {
  window.open("tg://resolve?phone=998934370990", "_blank");
};

const services = [
  {
    title: "Alucobond Fasad O'rnatish",
    tags: ["PREMIUM", "KAFOLAT"],
    desc: "Xalqaro sifat standartlariga javob beruvchi Alucobond panellarni professional o'rnatish. Subkonstruktsiya tizimidan tortib yakuniy bezakka qadar to'liq xizmat. 10 yillik kafolat.",
  },
  {
    title: "ACP Panel Qoplama",
    tags: ["IQTISODIY", "TEZ"],
    desc: "Aluminum Composite Panel — tijorat va turar-joy binolari uchun eng ko'p qo'llaniladigan fasad yechimi. Tez montaj, rang va tekstura tanlash imkoniyati.",
  },
  {
    title: "Tashqi Qoplama Ishlari",
    tags: ["KENG TANLASH", "DIZAYN"],
    desc: "Har xil tashqi qoplama materiallari bilan ishlash: metallokomposit, HPL, terracotta, fiber cement. Dizayndan to'liq o'rnatishga qadar.",
  },
  {
    title: "Fasad Rekonstruktsiyasi",
    tags: ["QAYTA TIKLASH"],
    desc: "Eskirgan yoki shikastlangan fasadlarni yangilash va tiklash. Eski qoplamani olib tashlash, yangi tizim o'rnatish, energiya samaradorligini oshirish.",
  },
  {
    title: "Texnik Loyihalash",
    tags: ["BIM", "CAD"],
    desc: "Har bir loyiha uchun batafsil texnik chizma va hujjatlar tayyorlash. BIM va AutoCAD asosida sahna uchun aniq o'lchov va rejalar.",
  },
];

onMounted(() => {
  const items = [titleRef, descRef, listRef, ctaRef];
  items.forEach((el, i) => {
    gsap.to(el.value, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: i * 0.1,
      scrollTrigger: { trigger: el.value, start: "top 85%" },
    });
  });
});
</script>

<style scoped>
.service-row {
  transition: background 0.4s ease;
}
.service-row:hover {
  background: rgba(201, 168, 76, 0.018);
}
</style>
