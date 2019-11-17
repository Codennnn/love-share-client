import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts/Main.vue' // 主框架

Vue.use(Router)

export const routes = [
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/sign/Sign.vue'),
    meta: { title: '登录注册' },
  },
  {
    path: '',
    component: Layout,
    children: [
    ],
    meta: { title: '首页' },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/error-page/NotFound.vue'),
    meta: { title: '404 not found' },
  },
]

const createRouter = () => new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

const router = createRouter()

export default router
