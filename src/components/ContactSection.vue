<template>
  <section id="contact" class="relative bg-black py-32 overflow-hidden">
    <div class="absolute inset-0 grid-overlay opacity-15"></div>

    <!-- Ambient gold glow -->
    <div
      class="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-4 pointer-events-none"
      style="
        background: radial-gradient(
          circle,
          rgba(201, 168, 76, 0.3) 0%,
          transparent 70%
        );
        filter: blur(60px);
      "
    ></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-6">
        <div
          class="font-mono text-[9px] text-gold/22 tracking-[0.5em] uppercase"
        >
          06 — Aloqa
        </div>
        <div class="flex-1 h-px bg-gold/10"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Left: Form -->
        <div>
          <h2
            ref="titleRef"
            class="font-display text-[clamp(2.5rem,5vw,6rem)] text-gold/90 leading-none mb-10 opacity-0"
          >
            LOYIHANI<br /><span class="text-steel">BOSHLANG</span>
          </h2>

          <form
            ref="formRef"
            class="space-y-0 opacity-0"
            @submit.prevent="submitForm"
          >
            <div class="form-field">
              <label class="form-label">Ism va Familiya</label>
              <input
                v-model="form.name"
                type="text"
                class="form-input"
                placeholder="Sizning ismingiz"
                required
              />
            </div>

            <div class="form-field">
              <label class="form-label">Telefon Raqam</label>
              <input
                required
                v-model="form.phone"
                type="tel"
                class="form-input"
                placeholder="+998 __ ___ __ __"
                @input="formatPhone"
              />
            </div>

            <div class="form-field">
              <label class="form-label">Joylashgan joyi</label>
              <input
                v-model="form.company"
                type="text"
                class="form-input"
                placeholder="Hudud nomi"
              />
            </div>

            <div class="form-field">
              <label class="form-label">Taxminiy maydon (m²)</label>
              <input
                v-model="form.area"
                type="number"
                class="form-input"
                placeholder="Taxminiy maydon"
              />
            </div>

            <div class="form-field">
              <label class="form-label">Xabar</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="form-input resize-none"
                placeholder="Loyiha haqida qo'shimcha ma'lumot..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-primary w-full mt-6 py-5 text-xs"
              :class="{ 'opacity-50 cursor-not-allowed': sending }"
              :disabled="sending"
            >
              <span v-if="!sent && !sending">So'rov Yuborish →</span>
              <span v-else-if="sending">Yuborilmoqda...</span>
              <span v-else>So'rov Yuborildi ✓</span>
            </button>
          </form>
        </div>

        <!-- Right: Info + Map -->
        <div ref="infoRef" class="opacity-0 pt-4">
          <!-- Contact cards -->
          <div class="space-y-px mb-12">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="p-6 flex items-center gap-6 transition-all duration-500 group cursor-pointer"
              style="border: 1px solid rgba(201, 168, 76, 0.06)"
              :style="{ '--hover-border': 'rgba(201,168,76,0.18)' }"
              @click="info.action && info.action()"
            >
              <div
                class="font-display text-3xl text-gold/22 group-hover:text-gold/45 transition-colors duration-500 w-8 text-center flex-shrink-0"
              >
                <i :class="info.icon"></i>
              </div>
              <div>
                <div
                  class="font-mono text-[8px] text-gold/22 tracking-[0.4em] uppercase mb-1"
                >
                  {{ info.label }}
                </div>
                <div
                  class="font-mono text-sm text-gold/62 group-hover:text-gold/82 transition-colors duration-300"
                >
                  {{ info.value }}
                </div>
              </div>
              <div
                class="ml-auto text-gold/12 group-hover:text-gold/32 transition-colors duration-500 font-mono text-xs"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleRef = ref(null);
const formRef = ref(null);
const infoRef = ref(null);

const sending = ref(false);
const sent = ref(false);

const form = reactive({
  name: "",
  phone: "+998 ",
  company: "",
  type: "",
  area: "",
  message: "",
});

const formatPhone = () => {
  let numbers = form.phone.replace(/\D/g, "");

  if (numbers.startsWith("998")) {
    numbers = numbers.slice(3);
  }

  const parts = [];

  if (numbers.length > 0) parts.push(numbers.slice(0, 2));
  if (numbers.length > 2) parts.push(numbers.slice(2, 5));
  if (numbers.length > 5) parts.push(numbers.slice(5, 7));
  if (numbers.length > 7) parts.push(numbers.slice(7, 9));

  form.phone = "+998 " + parts.join(" ");
};

const submitForm = () => {
  const text = `
📌 Yangi So'rov

👤 Ism: ${form.name}

📞 Telefon: ${form.phone}

🏢 Joylashuv: ${form.company}

📐 Taxminiy maydon: ${form.area}

✉️ Xabar:
${form.message}
  `;

  const encodedText = encodeURIComponent(text);

  window.open(`https://t.me/alucabond_construct?text=${encodedText}`, "_blank");
};

const contactInfo = [
  {
    label: "Telefon",
    value: "+998 93 437 0990",
    icon: "fa-solid fa-phone",
    action: () => window.open("tel:+998934370990"),
  },
  {
    label: "Telegram",
    value: "+998 93 437 0990",
    icon: "fa-brands fa-telegram",
    action: () => window.open("tg://resolve?phone=998934370990"),
  },
  {
    label: "Instagram",
    value: "Alucabond construct",
    icon: "fa-brands fa-instagram",
    action: () => window.open("https://instagram.com/alucabond_construct"),
  },
  {
    label: "Manzil",
    value: "Toshkent shahri, Yunusobod tumani",
    icon: "fa-solid fa-location-dot",
    action: null,
  },
];
// async function submitForm() {
//   sending.value = true;
//   await new Promise((r) => setTimeout(r, 1500));
//   sending.value = false;
//   sent.value = true;
//   setTimeout(() => {
//     sent.value = false;
//     Object.assign(form, {
//       name: "",
//       phone: "",
//       company: "",
//       type: "",
//       area: "",
//       message: "",
//     });
//   }, 4000);
// }

onMounted(() => {
  gsap.to(titleRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: titleRef.value, start: "top 80%" },
  });
  gsap.to(formRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
    scrollTrigger: { trigger: formRef.value, start: "top 85%" },
  });
  gsap.to(infoRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.3,
    scrollTrigger: { trigger: infoRef.value, start: "top 85%" },
  });
});
</script>

<style scoped>
.form-field {
  border-bottom: 1px solid rgba(201, 168, 76, 0.08);
}

.form-label {
  display: block;
  font-family: "Space Mono", monospace;
  font-size: 16px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 168, 76);
  padding: 16px 0 8px;
}

.form-input {
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(201, 168, 76);
  font-family: "Space Mono", monospace;
  font-size: 14px;
  padding-bottom: 16px;
  transition: color 0.3s ease;
}

.form-input::placeholder {
  color: rgba(201, 168, 76, 0.5);
  font-size: 14px;
}

.form-input:focus {
  color: rgba(201, 168, 76, 0.95);
}

.form-select {
  cursor: pointer;
  appearance: none;
}

.form-select option {
  background: #080808;
  color: rgba(201, 168, 76, 0.75);
}
</style>
