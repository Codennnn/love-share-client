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
        path: '/goods-search',
        name: 'GoodsSearch',
        component: () => import('@/views/goods/GoodsSearch.vue'),
        meta: { title: '商品搜索' },
      },
      {
        path: '/goods-addition',
        name: 'GoodsAddition',
        component: () => import('@/views/goods/GoodsAddition.vue'),
        meta: { title: '发布闲置' },
      },
      {
        path: '/begging-list',
        name: 'BeggingList',
        component: () => import('@/views/begging/BeggingList.vue'),
        meta: { title: '求购物品' },
      },
      {
        path: '/goods-detail',
        name: 'GoodsDetail',
        component: () => import('@/views/goods/GoodsDetail.vue'),
        meta: { title: '商品详情' },
      },
      {
        path: '/goods-school-list',
        name: 'GoodsSchoolList',
        component: () => import('@/views/goods/GoodsSchoolList.vue'),
        meta: { title: '逛同校' },
      },
      {
        path: '/goods-category',
        name: 'GoodsCategory',
        component: () => import('@/views/goods/GoodsCategory.vue'),
        meta: { title: '分类' },
      },
      {
        path: '/check-in',
        name: 'CheckIn',
        component: () => import('@/views/check-in/CheckIn.vue'),
        meta: { title: '每日签到' },
      },
      {
        path: '/recycle',
        name: 'Recycle',
        component: () => import('@/views/recycle/Recycle.vue'),
        meta: { title: '旧物回收' },
      },
      {
        path: '/rental',
        name: 'Rental',
        component: () => import('@/views/rental/Rental.vue'),
        meta: { title: '物品租借' },
      },
      {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList.vue'),
        meta: { title: '我的订单' },
      },
      {
        path: '/order-detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/OrderDetail.vue'),
        meta: { title: '订单详情' },
      },
      {
        path: '/order-review',
        name: 'OrderReview',
        component: () => import('@/views/order/components/OrderReview.vue'),
        meta: { title: '订单评价' },
      },
      {
        path: '/help-center',
        name: 'HelpCenter',
        component: () => import('@/views/service/HelpCenter.vue'),
        meta: { title: '帮助中心' },
      },
      {
        path: '/user-center',
        name: 'UserCenter',
        component: () => import('@/views/user/UserCenter.vue'),
        meta: { title: '个人中心' },
      },
      {
        path: '/user-detail',
        name: 'UserDetail',
        component: () => import('@/views/user/UserDetail.vue'),
        meta: { title: '用户详情' },
      },
      {
        path: '/user-follows',
        name: 'UserFollows',
        component: () => import('@/views/user/components/list/UserFollows.vue'),
        meta: { title: '关注的人' },
      },
      {
        path: '/user-fans',
        name: 'UserFans',
        component: () => import('@/views/user/components/list/UserFans.vue'),
        meta: { title: '我的粉丝' },
      },
      {
        path: '/user-collections',
        name: 'UserCollections',
        component: () => import('@/views/user/components/list/UserCollections.vue'),
        meta: { title: '我的收藏' },
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/Message.vue'),
        meta: { title: '消息中心' },
      },
      {
        path: '/goods-edit',
        name: 'GoodesEdit',
        component: () => import('@/views/goods/GoodsEdit.vue'),
        meta: { title: '编辑商品' },
      },
      {
        path: '/plus-member',
        name: 'PlusMember',
        component: () => import('@/views/plus-member/PlusMember.vue'),
        meta: { title: '乐享PLUS会员' },
      },
      {
        path: '/recharge',
        name: 'Recharge',
        component: () => import('@/views/recharge/Recharge.vue'),
        meta: { title: '充值' },
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/Test.vue'),
        meta: { title: '测试' },
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
