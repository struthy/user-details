import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import UserDetails from '../views/userDetails.vue'

const routes = [
  {
    path: '/',
    component: UserList
  },
  {
    path: '/user/:id',
    component: UserDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
