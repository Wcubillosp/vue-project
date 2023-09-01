<script setup lang="ts">
import type { IUser } from '@/models/user/user'
import { ref } from 'vue'

defineProps<{
  user: IUser
}>()

const backgroundImage = ref('')

const changeProfile = (e: any) => {
  const file = e.target.files?.[0] as File
  const fileUrl = URL.createObjectURL(file)
  backgroundImage.value = `url(${fileUrl})`
}
</script>

<template>
  <div class="photo" :style="{ 'background-image': backgroundImage }">
    <div class="image">
      <label for="profileImageInput">
        <div class="text-img" v-if="!backgroundImage && !user.image">{{ user.name[0] }}</div>
        <input
          class="input"
          id="profileImageInput"
          type="file"
          accept="image/*"
          @change="changeProfile"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.photo {
  background-size: cover;
  width: 64px;
  height: 64px;
  border-radius: 60px;
}

.input {
  display: none;
}

.text-img {
  font-size: 32px;
  font-weight: 600;
}

.image img {
  width: 64px;
  height: 64px;
  cursor: pointer;
}

.image div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 30px;
  background: var(--color-bg1);
  cursor: pointer;
}
</style>
