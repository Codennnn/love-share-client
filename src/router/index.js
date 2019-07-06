import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layouts/index.vue'; // 主框架
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

Vue.use(Router);

export default new Router({
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
