<template>
  <footer class="relative bg-black pt-20 pb-10 overflow-hidden" style="border-top: 1px solid rgba(201,168,76,0.07)">
    <div class="absolute inset-0 grid-overlay opacity-8 pointer-events-none"></div>

    <div class="max-w-screen-xl mx-auto px-8 md:px-16">
      <!-- Top columns -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

        <!-- Brand column -->
        <div class="md:col-span-4">
          <div class="flex items-center gap-3 mb-6">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 flex-shrink-0">
              <defs>
                <linearGradient id="ftRing" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#F5D78A"/>
                  <stop offset="50%" stop-color="#8B6914"/>
                  <stop offset="100%" stop-color="#F0D070"/>
                </linearGradient>
                <linearGradient id="ftA" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#F0D070"/>
                  <stop offset="40%" stop-color="#C9A84C"/>
                  <stop offset="75%" stop-color="#8B6914"/>
                  <stop offset="100%" stop-color="#E8C860"/>
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="16.5" stroke="url(#ftRing)" stroke-width="1.5"/>
              <polygon points="5.5,28.5 10.5,28.5 18,9 25.5,28.5 30.5,28.5 18,5" fill="url(#ftA)"/>
              <polygon points="10.5,28.5 25.5,28.5 18,19" fill="#080808"/>
            </svg>
            <div>
              <div class="font-display text-xl tracking-[0.22em] text-gold">ALUCABOND</div>
              <div class="font-mono text-[7px] tracking-[0.6em] text-gold/22 uppercase">CONSTRUCT</div>
            </div>
          </div>

          <p class="font-body text-[11px] text-gold/25 leading-loose max-w-xs mb-8">
            O'zbekistonda fasad o'rnatish bo'yicha yetakchi kompaniya.
            Alucobond va ACP panellar montaji, tashqi qoplama ishlari —
            2016-yildan beri 200+ loyiha.
          </p>

          <div class="flex gap-3 flex-wrap">
            <a href="https://instagram.com/alucabond_construct" target="_blank"
               class="footer-social">IG</a>
            <a href="#" class="footer-social">TG</a>
            <a href="#" class="footer-social">YT</a>
            <a href="#" class="footer-social">FB</a>
          </div>
        </div>

        <!-- Nav links -->
        <div class="md:col-span-2">
          <div class="footer-col-title">Xizmatlar</div>
          <ul class="space-y-3.5">
            <li v-for="l in serviceLinks" :key="l">
              <a href="#services" class="footer-link">{{ l }}</a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <div class="footer-col-title">Kompaniya</div>
          <ul class="space-y-3.5">
            <li v-for="l in companyLinks" :key="l">
              <a href="#about" class="footer-link">{{ l }}</a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <div class="footer-col-title">Loyihalar</div>
          <ul class="space-y-3.5">
            <li v-for="l in projectLinks" :key="l">
              <a href="#portfolio" class="footer-link">{{ l }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div class="md:col-span-2">
          <div class="footer-col-title">Aloqa</div>
          <div class="space-y-4">
            <a href="tel:+998712000000" class="footer-link block">+998 71 200 00 00</a>
            <a href="https://wa.me/998900000000" class="footer-link block">WhatsApp</a>
            <a href="mailto:info@alucabond.uz" class="footer-link block">info@alucabond.uz</a>
            <div class="font-body text-[10px] text-gold/16 leading-loose pt-2" style="border-top: 1px solid rgba(201,168,76,0.06)">
              Toshkent, Yunusobod<br/>O'zbekiston
            </div>
          </div>
        </div>
      </div>

      <!-- Giant ambient text -->
      <div class="pt-8 mb-8 overflow-hidden" style="border-top: 1px solid rgba(201,168,76,0.05)">
        <div class="font-display text-[clamp(2.5rem,8vw,9rem)] text-gold/[0.025] leading-none select-none text-center tracking-tight whitespace-nowrap">
          ALUCABOND CONSTRUCT
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-6" style="border-top: 1px solid rgba(201,168,76,0.06)">
        <div class="font-mono text-[7px] text-gold/14 tracking-[0.35em] text-center md:text-left">
          © 2024 ALUCABOND CONSTRUCT — BARCHA HUQUQLAR HIMOYALANGAN
        </div>
        <div class="flex items-center gap-5">
          <a href="#" class="font-mono text-[7px] text-gold/14 hover:text-gold/35 tracking-[0.3em] transition-colors">Maxfiylik</a>
          <span class="text-gold/9">·</span>
          <a href="#" class="font-mono text-[7px] text-gold/14 hover:text-gold/35 tracking-[0.3em] transition-colors">Shartlar</a>
          <span class="text-gold/9">·</span>
          <span class="font-mono text-[7px] text-gold/9 tracking-[0.2em]">Toshkent, O'zbekiston</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const serviceLinks = [
  'Alucobond O\'rnatish',
  'ACP Panel Qoplama',
  'Tashqi Qoplama',
  'Fasad Rekonstruktsiyasi',
  'Texnik Loyihalash',
]
const companyLinks = ['Biz haqimizda', 'Jamoamiz', 'Karyera', 'Yangiliklar', 'Hamkorlar']
const projectLinks = ['Tijorat', 'Turar-joy', 'Industrial', 'Sport', 'Barcha loyihalar']
</script>

<style scoped>
.footer-col-title {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.2);
  margin-bottom: 1.5rem;
}
.footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: rgba(201, 168, 76, 0.3);
  transition: color 0.3s ease;
  display: block;
}
.footer-link:hover {
  color: rgba(201, 168, 76, 0.58);
}
.footer-social {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.3em;
  color: rgba(201, 168, 76, 0.2);
  border: 1px solid rgba(201, 168, 76, 0.1);
  padding: 6px 10px;
  transition: all 0.3s ease;
}
.footer-social:hover {
  color: rgba(201, 168, 76, 0.55);
  border-color: rgba(201, 168, 76, 0.25);
}
</style>
