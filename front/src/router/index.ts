import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Top from '../views/Top.vue'
import Home from '../views/Home.vue'
import Finished from '../views/Finished.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/finished',
    name: 'Finished',
    component: Finished
  },
  {
    path: '/Ingredients/:id',
    component: () => import('../views/ViewIngredients.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
