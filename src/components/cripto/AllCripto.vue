<script setup lang="ts">
import type { ICripto } from '@/models/cripto/cripto'
import CriptoService from '@/services/CriptoService'
import CardCripto from '@/components/cripto/card/CardCripto.vue'
import PaginationTools from '@/components/tools/PaginationTools.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ref, onBeforeMount, watch } from 'vue'

library.add(faMagnifyingGlass)

let allCriptos: ICripto[] = []
const criptos = ref<ICripto[]>([])
const pageCripto = ref<ICripto[]>([])
const current = ref(1)
const maxItems = 10

const setCurrent = (value: number) => {
  current.value = value
}

const search = (e: Event) => {
  const searchTerm = (e.target as HTMLInputElement).value
  if (searchTerm) {
    const filteredCriptos = allCriptos.filter((allCripto) =>
      allCripto.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    criptos.value = filteredCriptos
  } else {
    criptos.value = allCriptos
  }
  current.value = 1
}

watch(
  [current, criptos],
  () => {
    const index = current.value - 1
    pageCripto.value = criptos.value.slice(index * maxItems, index * maxItems + maxItems)
  },
  { immediate: true }
)

onBeforeMount(() => {
  CriptoService.getCoinMarketcap().then((res) => {
    allCriptos = res
    criptos.value = res
  })
})
</script>

<template>
  <div class="cripto">
    <div class="search">
      <input type="search" placeholder="Buscar criptomoneda por nombre" @change="search" />
      <div class="searchImg">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
    </div>
    <div class="cardCriptos">
      <div class="headerTable">
        <div class="name">Nombre</div>
        <div class="price">Precio</div>
        <div class="volume">24H Cambio</div>
        <div>&nbsp;</div>
      </div>
      <div>
        <CardCripto v-for="(cripto, index) in pageCripto" :key="index" :cripto="cripto" />
      </div>
      <div v-if="criptos.length > 0">
        <PaginationTools :data="criptos" :maxItems="maxItems" @setCurrent="setCurrent" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cripto {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.search {
  position: relative;
  display: flex;
}

.search input {
  width: 260px;
}

.search input::placeholder {
  margin-right: 0.75rem;
}

.searchImg {
  position: absolute;
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  width: 13px;
}

.cardCriptos {
  width: 100%;
}

.headerTable {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 1rem 2rem;
  font-weight: 400;
  font-size: 14px;
}
</style>
