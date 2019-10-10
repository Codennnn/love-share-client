import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layouts/Main.vue' // 主框架
import Analytics from '@/views/analytics/Analytics.vue' // 数据分析

const Login = () => import('@/views/login/Login.vue')
const TodoList = () => import('@/views/todo-list/TodoList.vue')

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login,
    meta: { title: '登录' },
  },
  {
    path: '/not-found',
    name: 'not-found',
    hidden: true,
    component: () => import('@/views/error-page/NotFound.vue'),
    meta: { title: '404 not found' },
  },
]

export const asyncRoutes = [
  {
    path: '/',
    redirect: '/analytics',
    component: Layout,
    children: [
      {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics,
        meta: { title: '数据分析' },
      },
    ],
    meta: { title: '数据分析', icon: 'icon-home' },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/views/goods/GoodsList.vue'),
        meta: { title: '商品列表' },
      },
    ],
    meta: { title: '商品管理', icon: 'icon-activity', roles: ['super_admin'] },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/Order.vue'),
        meta: { title: '查询订单' },
      },
    ],
    meta: { title: '订单管理', icon: 'icon-dynamic' },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/user-list',
        name: 'UserList',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户列表' },
      },
    ],
    meta: { title: '用户管理', icon: 'icon-group' },
  },
  {
    path: '',
    single: true,
    component: Layout,
    children: [
      {
        path: '/todo-list',
        name: 'TodoList',
        component: TodoList,
        meta: { title: '待办事项', icon: 'icon-todo' },
      },
    ],
  },

  // 不显示在侧边栏的路由
  {
    path: '',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/goods-detail',
        name: 'GoodsDetail',
        component: () => import('@/views/goods/GoodsDetail.vue'),
        meta: {
          title: '商品详情',
          breadcrumb: [
            { title: '商品列表', url: '/goods' },
            { title: '商品详情', active: true },
          ],
        },
      },
      {
        path: '/order-detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/OrderDetail.vue'),
        meta: {
          title: '订单详情',
          breadcrumb: [
            { title: '查询订单', url: '/' },
            { title: '订单详情', active: true },
          ],
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '个人中心',
          breadcrumb: [
            { title: '首页', url: '/' },
            { title: '个人中心', active: true },
          ],
        },
      },
    ],
  },

  { path: '*', redirect: '/not-found', hidden: true },
]

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
