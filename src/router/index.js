import Vue from 'vue';
import Router from 'vue-router';

// 引入路由跳转加载进度条插件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Layout from '@/layouts/index.vue'; // 主框架
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/error-page/404.vue'),
      meta: { title: '404 not found' },
    },
  ],
});

// NProgress 配置
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  const { title } = to.meta;
  document.title = title ? `${title} - 意想社团` : '意想社团';
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
