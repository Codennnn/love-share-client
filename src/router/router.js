import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts/Main.vue' // 主框架

Vue.use(Router)

export const routes = [
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('@/views/sign/Sign.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/goods-cart',
        name: 'GoodsCart',
        component: () => import('@/views/goods/GoodsCart.vue'),
        meta: { title: '购物车' },
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/Message.vue'),
        meta: { title: '购物车' },
      },
      {
        path: '/user-center',
        name: 'UserCenter',
        component: () => import('@/views/user/UserCenter.vue'),
        meta: { title: '个人中心' },
      },
    ],
    meta: { title: '首页' },
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/views/error-page/NotFound.vue'),
    meta: { title: '404 not found' },
  },
  {
    path: '*',
    redirect: '/not-found',
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
