import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Favorite from '../views/Favorite.vue'
import History from '../views/History.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
