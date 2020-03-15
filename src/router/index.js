import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/article',
    name: 'Статья',
    component: () => import('../views/Article.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
