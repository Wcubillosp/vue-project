<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPenToSquare,
  faCheck,
  faXmark,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import PhotoUser from '@/components/user/PhotoUser.vue'
import ProfileService from '@/services/ProfileService'
import { ref, computed, onBeforeMount } from 'vue'
import router from '@/router'
import { defUser, type IUser } from '@/models/user/user'

library.add(faPenToSquare, faCheck, faXmark, faRightFromBracket)

const errors = ref<string[]>([])
let user = ref<IUser>(defUser)
let disable = ref(true)

const isValidName = computed(() => {
  return user?.value?.name !== ''
})
const isValidEmail = computed(() => {
  if (user?.value?.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(user?.value?.email)
  }
  return false
})

const toggleDisable = () => {
  disable.value = !disable.value
}

const validForm = () => {
  errors.value = []

  if (!isValidName.value) errors.value.push('El nombre no es valido')
  if (!isValidEmail.value) errors.value.push('Ingresa una dirección de correo electrónico válida')

  if (errors.value.length === 0) {
    return false
  }
  return true
}

const editProfile = async () => {
  if (validForm()) {
    return
  }
  if (user.value) {
    ProfileService.putProfile(user.value)
  }
  toggleDisable()
}

const logout = () => {
  $cookies.remove('auth')
  setTimeout(() => {
    router.push({ name: 'signIn' })
  }, 100)
}

onBeforeMount(() => {
  ProfileService.getProfile().then((res) => {
    user.value = { ...res }
  })
})
</script>

<template>
  <div class="profile">
    <form class="form">
      <div class="head">
        <div>
          <PhotoUser :user="user" />
        </div>
        <div class="nameEdit">
          <input
            :class="{ error: errors.length > 0 && !isValidName }"
            :disabled="disable"
            type="text"
            id="name"
            v-model="user.name"
            placeholder="Nombre"
          />
          <button v-if="disable" @click="toggleDisable" type="button">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </button>
          <button v-if="!disable" @click.prevent="editProfile" type="submit">
            <font-awesome-icon :icon="['fas', 'check']" />
          </button>
          <button v-if="!disable" @click="toggleDisable" type="button">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
      </div>
      <hr />
      <div class="body">
        <div>
          <label for="email">Correo</label>
          <input
            :class="{ error: errors.length > 0 && !isValidEmail }"
            :disabled="disable"
            type="text"
            id="email"
            v-model="user.email"
            placeholder="Correo"
          />
        </div>
        <div>
          <label for="email">Description</label>
          <input
            :disabled="disable"
            type="text"
            id="description"
            v-model="user.description"
            placeholder="Descripcion"
          />
        </div>
      </div>
    </form>
    <div class="logout" @click="logout">
      <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Cerrar sesion
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  background: var(--color-bg2);
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.form {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 2rem;
}

.head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nameEdit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nameEdit svg {
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: var(--color-primary);
}

.nameEdit input:disabled {
  border: none;
  width: 100px;
  padding: 0;
  background: transparent;
}

.body {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.body > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  gap: 0.25rem;
}

.body > div input:disabled {
  font-size: 12px;
  border: none;
  height: fit-content;
  padding: 0;
  font-weight: 600;
  background: transparent;
}

.logout {
  font-size: 12px;
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  cursor: pointer;
}
</style>
