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
        path: '',
        name: '',
        component: Analytics,
        meta: { title: '数据分析' },
      },
    ],
    meta: {
      title: '数据分析',
      icon: 'icon-home',
    },
  },
  {
    path: '/TodoList',
    redirect: '/todolist',
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

  { path: '*', redirect: '/404', hidden: true },
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
