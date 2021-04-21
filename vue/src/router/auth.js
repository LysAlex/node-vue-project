import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Profile from '@/views/auth/Profile.vue'

const routes = [
  {
    path: '/login',
    name: 'auth.login',
    component: Login,
  },
  {
    path: '/register',
    name: 'auth.register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'auth.profile',
    component: Profile,
  }
]

export default routes
