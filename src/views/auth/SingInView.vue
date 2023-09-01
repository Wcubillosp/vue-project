<script setup lang="ts">
import LoginAuth from '@/components/auth/LoginAuth.vue'
</script>

<template>
  <div class="content">
    <LoginAuth />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
