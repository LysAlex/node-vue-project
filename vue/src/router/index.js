import Router from 'vue-router'
import Vue from 'vue'
import userApi from '@/api/users'
import baseRoutes from '@/router/base'
import artistsRoutes from '@/router/artists'
import authRoutes from '@/router/auth'
import Main from '@/layouts/Main'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      component: Main,
      path: '',
      children: [
        ...baseRoutes,
        ...artistsRoutes,
        ...authRoutes
      ]
    },
  ]
})

router.beforeEach(async(to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    try {
      const user = await userApi.verifyUser()
      if (to.matched.some(route => route.meta.admin)) {
        if (user.data.data.role === 'admin'){
          return next()
        }
        return next('/')
      }
      return next()
    } catch (e) {
      store.dispatch('auth/reset')
      return next('/login')
    }
  } else {
    return next()
  }
})

export default router
