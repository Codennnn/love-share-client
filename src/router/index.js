import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';

// 引入路由跳转加载进度条插件
import 'nprogress/nprogress.css';

import Layout from '@/layouts/index.vue'; // 主框架
// import Login from '@/views/login/Login.vue';
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    redirect: '/analytics',
    name: 'index',
    component: Layout,
    children: [{
      path: 'analytics',
      name: 'analytics',
      component: Analytics,
      meta: { title: '数据分析' },
    },
    {
      path: '/todo-list',
      component: () => import('@/views/todo-list/TodoList.vue'),
      meta: { title: '待办事项' },
    }],
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue'),
    meta: { title: '404 not found', meta: { role: ['admin', 'super_editor'] } },
  },
];

NProgress.configure({ showSpinner: false }); // NProgress 配置

router.beforeEach((to, from, next) => {
  NProgress.start(); // 进度条开始

  if (store.getters.token) {
    if (to.path === '/login') {
      next({ path: '/' });
    }
  }

  const { title } = to.meta;

  document.title = title ? `${title} - 意想社团` : '意想社团后台管理系统'; // 设置网页标题

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
