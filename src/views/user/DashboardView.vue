<script setup lang="ts">
import ProfileUser from '@/components/user/ProfileUser.vue'
import AllCripto from '@/components/cripto/AllCripto.vue'
</script>

<template>
  <div class="content">
    <ProfileUser />
    <AllCripto />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 4rem;
}
</style>
