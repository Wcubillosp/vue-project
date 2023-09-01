<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import type { ICripto } from '@/models/cripto/cripto'

library.add(faMagnifyingGlass)

defineProps<{
  cripto: ICripto
}>()

const emit = defineEmits(['toogleModal'])

const toogleModal = () => {
  emit('toogleModal')
}
</script>

<template>
  <div className="layout">
    <div className="background"></div>
    <div className="card">
      <div className="close" @click="toogleModal">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
      <div>
        {{ cripto.name }} <sup>{{ cripto.symbol }}</sup>
      </div>
      <div>
        <span v-if="cripto.infinite_supply"> Sin limite </span>
        <span v-else> {{ cripto.circulating_supply.toFixed(0) }} / {{ cripto.max_supply }} </span>
      </div>
      <div className="tagContent">
        <div v-for="(tag, index) in cripto.tags.slice(0, 7)" :key="index" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  position: fixed;
  width: calc(100vw);
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #e4e4f2;
  opacity: 0.6;
  z-index: -1;
}

.card {
  position: relative;
  width: 500px;
  background: var(--color-bg2);
  padding: 4rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}

.tagContent {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  font-size: 14px;
}

.tag {
  padding: 0.25rem;
  border-radius: 8px;
  width: fit-content;
  background: var(--color-bg3);
}
</style>
