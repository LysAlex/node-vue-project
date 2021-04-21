import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/test',
    name: 'home',
    component: Home,
    meta: { auth: true, admin: true }
  }
]

export default routes
