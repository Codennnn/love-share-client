import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layouts/Main.vue'; // 主框架
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

const Login = () => import('@/views/login/Login.vue');
const TodoList = () => import('@/views/todo-list/TodoList.vue');

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login,
    meta: { title: '登录' },
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/error-page/404.vue'),
    meta: { title: '404 not found' },
  },
];

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
    meta: {
      title: '数据分析', icon: 'icon-home',
    },
  },
  {
    path: '',
    children: [
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/OrderDetail.vue'),
        meta: { title: '订单详情' },
      },
    ],
    meta: {
      title: '订单管理',
      icon: 'icon-dynamic',
    },
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/apparel',
        name: 'Apparel',
        component: () => import('@/views/apparel/Apparel.vue'),
        meta: { title: '服饰' },
      },
    ],
    meta: {
      title: '服饰管理', icon: 'icon-apparel',
    },
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
    ],
  },

  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () => new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由
}

export default router;
