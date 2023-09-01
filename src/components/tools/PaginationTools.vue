<script setup lang="ts">
import type { ICripto } from '@/models/cripto/cripto'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ref, watch } from 'vue'

library.add(faArrowLeft, faArrowRight)

let { data, maxItems } = defineProps<{
  data: ICripto[]
  maxItems: number
}>()

const emit = defineEmits(['setCurrent', 'setPageCripto'])
const count = ref(1)
const slicedData = ref<ICripto[]>(data)

watch(
  [count, data],
  () => {
    const index = count.value - 1
    slicedData.value = data.slice(index * maxItems, index * maxItems + maxItems)
    emit('setPageCripto', slicedData.value)
  },
  { immediate: true }
)

const handleBack = () => {
  if (count.value !== 1) {
    count.value -= 1
    emit('setCurrent', count.value)
  }
}

const handleNext = () => {
  if (count.value !== Math.round(data.length / maxItems)) {
    count.value += 1
    emit('setCurrent', count.value)
  }
}

const selectPage = (i: number) => {
  count.value = i
  emit('setCurrent', i)
}
</script>

<template>
  <div v-if="data.length >= maxItems" className="pag">
    <div className="img" @click="handleBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </div>
    <div v-for="i in Math.ceil(data.length / maxItems)" :key="i">
      <div :class="i === count ? `select` : `number`" @click="selectPage(i)">
        {{ i }}
      </div>
    </div>
    <div className="img" @click="handleNext">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </div>
  </div>
</template>

<style scoped>
.pag {
  display: flex;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.select {
  color: #fdd01c;
  border-bottom: 4px solid #fdd01c;
  padding: 0 0.25rem;
  cursor: pointer;
}

.number {
  color: var(--primary-color);
  padding: 0 0.25rem;
  cursor: pointer;
}

.img {
  width: 28px;
  height: 28px;
  cursor: pointer;
}
</style>
