import { createRouter, createWebHistory } from 'vue-router'
import SingInView from '@/views/auth/SingInView.vue'
import SingUpView from '@/views/auth/SingUpView.vue'
import DashboardView from '@/views/user/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/sign_in'
    },
    {
      path: '/auth/sign_in',
      name: 'signIn',
      component: SingInView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/auth/sign_up',
      name: 'signUp',
      component: SingUpView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/user/dashboard',
      name: 'userDashboard',
      component: DashboardView,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { fullPath } = to
  const auth = $cookies.get('auth')

  if (fullPath.startsWith('/auth') && auth) {
    next('/user/dashboard')
  }

  const needAuth = to.meta.requireAuth
  if (needAuth && !auth) {
    next('/auth/sign_in')
  } else {
    next()
  }
})

export default router
