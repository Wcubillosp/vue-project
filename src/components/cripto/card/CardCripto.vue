<script setup lang="ts">
import type { ICripto } from '@/models/cripto/cripto'
import ModalCripto from '@/components/cripto/modal/ModalCripto.vue'
import { ref } from 'vue'

defineProps<{
  cripto: ICripto
}>()

const showModal = ref(false)

const toogleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="cripto-card" @click="toogleModal">
    <div class="name">
      <p>{{ cripto.symbol }}</p>
      <p>{{ cripto.name }}</p>
    </div>
    <div class="price">
      <p>USD${{ cripto.quote.USD.price.toFixed(2) }}</p>
    </div>
    <div class="volume">
      <p>{{ cripto.quote.USD.volume_change_24h.toFixed(2) }}%</p>
    </div>
    <p class="detail">Detalle</p>
  </div>

  <ModalCripto v-if="showModal" :cripto="cripto" @toogleModal="toogleModal" />
</template>

<style scoped>
.cripto-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem 2rem;
}

.cripto-card:hover {
  background: var(--color-bg1);
}

.name p:first-of-type {
  color: var(--color-secondary);
  font-weight: 600;
  font-size: 16px;
}

.name {
  font-weight: 400;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.price,
.volume {
  font-size: 16px;
}

.detail {
  color: var(--color-primary);
  font-size: 16px;
}
</style>
