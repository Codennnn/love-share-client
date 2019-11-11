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
      {
        path: '/text',
        name: 'Text',
        component: () => import('@/views/analytics/Text.vue'),
        meta: { title: '测试' },
      },
    ],
    meta: { title: '数据分析', icon: 'el-icon-data-analysis' },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/goods-list',
        name: 'GoodsList',
        component: () => import('@/views/goods/GoodsList.vue'),
        meta: { title: '商品列表' },
      },
      {
        path: '/goods-category',
        name: 'GoodsCategory',
        component: () => import('@/views/goods/GoodsCategory.vue'),
        meta: { title: '商品分类', roles: ['super_admin'] },
      },
      {
        path: '/goods-addition',
        name: 'GoodsAddition',
        component: () => import('@/views/goods/GoodsAddition.vue'),
        meta: { title: '添加商品', roles: ['super_admin'] },
      },
    ],
    meta: { title: '商品管理', icon: 'el-icon-box', roles: ['super_admin'] },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList.vue'),
        meta: { title: '订单列表' },
      },
    ],
    meta: { title: '订单管理', icon: 'el-icon-files' },
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
      {
        path: '/manager-list',
        name: 'ManagerList',
        component: () => import('@/views/user/ManagerList.vue'),
        meta: { title: '管理员列表' },
      },
    ],
    meta: { title: '用户管理', icon: 'el-icon-user' },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/buying-list',
        name: 'BuyingList',
        component: () => import('@/views/buying/BuyingList.vue'),
        meta: { title: '求购列表' },
      },
    ],
    meta: { title: '求购管理', icon: 'el-icon-sell' },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/',
        name: '',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户列表' },
      },
    ],
    meta: { title: '评价管理', icon: 'el-icon-chat-line-square' },
  },
  {
    path: '/service',
    component: Layout,
    children: [
      {
        path: '/help-center',
        name: 'HelpCenter',
        component: () => import('@/views/service/HelpCenter.vue'),
        meta: { title: '帮助中心' },
      },
      {
        path: '/',
        name: '',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '常见问题' },
      },
    ],
    meta: { title: '资讯管理', icon: 'el-icon-thumb' },
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
        meta: { title: '待办事项', icon: 'el-icon-collection' },
      },
    ],
  },
  {
    path: '',
    single: true,
    component: Layout,
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/chat/Chat.vue'),
        meta: { title: '在线沟通', icon: 'el-icon-chat-round' },
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
            { title: '首页', url: '/' },
            { title: '商品列表', url: '/goods-list' },
            { title: '商品详情', active: true },
          ],
        },
      },
      {
        path: '/goods-vivid-list',
        name: 'GoodsVividList',
        component: () => import('@/views/goods/GoodsVividList.vue'),
        meta: {
          title: '商品图片列表',
          breadcrumb: [
            { title: '首页', url: '/' },
            { title: '商品列表', url: '/goods-list' },
            { title: '商品图片列表', active: true },
          ],
        },
      },
      {
        path: '/goods-cart',
        name: 'GoodsCart',
        component: () => import('@/views/goods/GoodsCart.vue'),
        meta: {
          title: '购物车',
          breadcrumb: [
            { title: '首页', url: '/' },
            { title: '购物车', active: true },
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
            { title: '首页', url: '/' },
            { title: '查询订单', url: '/order-list' },
            { title: '订单详情', active: true },
          ],
        },
      },
      {
        path: '/user-detail',
        name: 'UserDetail',
        component: () => import('@/views/user/UserDetail.vue'),
        meta: {
          title: '用户详情',
          breadcrumb: [
            { title: '首页', url: '/' },
            { title: '用户列表', url: '/user-list' },
            { title: '用户详情', active: true },
          ],
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/user/UserDetail.vue'),
        meta: {
          title: '个人中心',
          breadcrumb: [
            { title: '首页', url: '/' },
            { title: '用户列表', url: '/user-list' },
            { title: '个人中心', active: true },
          ],
        },
      },
    ],
  },

  { path: '*', redirect: '/not-found', hidden: true },
]

const createRouter = () => new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
