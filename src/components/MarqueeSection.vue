<template>
  <div class="relative py-5 overflow-hidden border-y bg-black/90" style="border-color: rgba(201,168,76,0.07)">
    <div class="marquee-track flex whitespace-nowrap">
      <div class="marquee-content flex items-center gap-12 pr-12" v-for="n in 4" :key="n">
        <span
          v-for="item in items"
          :key="item.text"
          class="font-display text-2xl md:text-3xl tracking-[0.12em] uppercase flex-shrink-0"
          :class="item.dim ? 'text-gold/10' : 'text-gold/15'"
        >
          {{ item.text }}
          <span class="text-gold/6 mx-5">—</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = [
  { text: 'Alucobond O\'rnatish', dim: false },
  { text: 'ACP Fasad', dim: true },
  { text: 'Tashqi Qoplama', dim: false },
  { text: 'Bino Fasadi', dim: true },
  { text: 'Premium Montaj', dim: false },
  { text: 'Facade Installation', dim: true },
  { text: 'Arxitektura Qoplama', dim: false },
  { text: 'Exterior Cladding', dim: true },
]
</script>

<style scoped>
.marquee-track {
  animation: marquee 35s linear infinite;
  width: max-content;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-25%); }
}
</style>
