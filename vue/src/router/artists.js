import Index from '@/views/artists/Index.vue'
import Show from '@/views/artists/Show.vue'
import Edit from '@/views/artists/Edit.vue'
import Create from '@/views/artists/Create.vue'

const routes = [
  {
    path: '/artists',
    name: 'artists.index',
    component: Index,
  },
  {
    path: '/artists/create',
    name: 'artists.create',
    component: Create,
    meta: { auth: true, admin: true }
  },
  {
    path: '/artists/:id',
    name: 'artists.show',
    component: Show,
  },
  {
    path: '/artists/:id/edit',
    name: 'artists.edit',
    component: Edit,
    meta: { auth: true, admin: true }
  },
]

export default routes
