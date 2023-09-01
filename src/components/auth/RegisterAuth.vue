<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthService from '@/services/AuthService'
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import router from '@/router'

library.add(faEye, faEyeSlash)

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errors = ref<string[]>([])
let success = ref(false)

const isValidName = computed(() => {
  return name.value !== ''
})
const isValidEmail = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email.value)
})
const isValidPassword = computed(() => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordPattern.test(password.value)
})

const validForm = () => {
  errors.value = []

  if (!isValidName.value) errors.value.push('El nombre no es valido')
  if (!isValidEmail.value) errors.value.push('Ingresa una dirección de correo electrónico válida')
  if (!isValidPassword.value) errors.value.push('La contraseña no es valida')

  if (errors.value.length === 0) {
    return false
  }
  return true
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const register = async () => {
  if (validForm()) {
    return
  }

  AuthService.register({
    name: name.value,
    email: email.value,
    password: password.value
  })
    .then(() => {
      success.value = true
      setTimeout(() => {
        router.push({ name: 'signIn' })
      }, 1000)
    })
    .catch((error) => {
      errors.value.push(error)
    })
}
</script>

<template>
  <div class="layout">
    <div>
      <h1>Crear cuenta</h1>
    </div>
    <form class="authForm">
      <div>
        <label for="name">Nombre</label>
        <input
          :class="{ error: errors.length > 0 && !isValidName }"
          type="text"
          id="name"
          v-model="name"
          placeholder="Ingresa tu correo"
        />
      </div>
      <div>
        <label for="email">Correo electrónico</label>
        <input
          :class="{ error: errors.length > 0 && !isValidEmail }"
          type="text"
          id="email"
          v-model="email"
          placeholder="Ingresa tu correo"
        />
      </div>
      <div>
        <div class="layoutPassword">
          <label for="password">Contraseña</label>
          <div class="password">
            <input
              :class="{ error: errors.length > 0 && !isValidPassword }"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Contraseña"
            />
            <div @click="togglePassword">
              <font-awesome-icon v-show="showPassword" :icon="['fas', 'eye']" />
              <font-awesome-icon v-show="!showPassword" :icon="['fas', 'eye-slash']" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-show="!errors.length && !success" class="error_text">&nbsp;</div>
        <div v-show="errors.length" class="error_text">{{ errors[0] }}</div>
        <div v-if="success" class="success_text">Cuenta creada</div>
      </div>
      <button class="buttonSubmit" type="button" @click.prevent="register">
        <div v-if="loading">Espere un momento...</div>
        <div v-else>Crear cuenta</div>
      </button>
      <div>
        <RouterLink :to="{ name: 'signIn' }">
          <button class="signupText" type="button">Iniciar sesion</button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.layout {
  color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout h1 {
  font-size: 32px;
}

.authForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 1rem;
}

.authForm > div,
.layoutPassword {
  color: var(--color-secondary);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  font-size: 17px;
}

.authForm input,
.password input {
  color: var(--color-secondary);
  border-radius: 3px;
  width: 100%;
}

.password {
  position: relative;
  display: flex;
  width: 100%;
}

.password div {
  position: absolute;
  right: 0;
  width: fit-content;
  height: 100%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

.buttonSubmit {
  background: var(--color-bg1);
  border-radius: 3px;
  text-align: center;
  font-size: 19px;
  padding: 1rem 2rem;
}

.loading {
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}

.signupText {
  color: var(--color-primary);
  font-size: 14px;
}

@media screen and (max-width: 768px) {
}
</style>
