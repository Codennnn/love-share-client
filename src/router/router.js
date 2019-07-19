import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layouts/index.vue'; // 主框架
import Login from '@/views/login/Login.vue';
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/analytics',
    name: 'index',
    component: Layout,
    children: [
      {
        path: 'analytics',
        name: 'analytics',
        component: Analytics,
        meta: { title: '数据分析' },
      },
      {
        path: '/todo-list',
        component: () => import('@/views/todo-list/TodoList.vue'),
        meta: { title: '待办事项' },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue'),
    meta: { title: '404 not found' },
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matcher; // 重置路由
}

export default router;
