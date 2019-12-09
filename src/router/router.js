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
        path: '/goods-addition',
        name: 'GoodsAddition',
        component: () => import('@/views/goods/GoodsAddition.vue'),
        meta: { title: '发布闲置' },
      },
      {
        path: '/buying-list',
        name: 'BuyingList',
        component: () => import('@/views/buying/BuyingList.vue'),
        meta: { title: '求购信息' },
      },
      {
        path: '/goods-detail',
        name: 'GoodsDetail',
        component: () => import('@/views/goods/GoodsDetail.vue'),
        meta: { title: '商品详情' },
      },
      {
        path: '/check-in',
        name: 'CheckIn',
        component: () => import('@/views/check-in/CheckIn.vue'),
        meta: { title: '每日签到' },
      },
      {
        path: '/help-center',
        name: 'HelpCenter',
        component: () => import('@/views/service/HelpCenter.vue'),
        meta: { title: '帮助中心' },
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/Message.vue'),
        meta: { title: '我的消息' },
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
