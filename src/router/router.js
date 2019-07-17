import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store/store';

// 引入路由跳转加载进度条插件
import 'nprogress/nprogress.css';
import { getToken } from '@/permission/token';

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

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 进度条开始
  console.log(to.path);
  // 设置网页标题
  const { title } = to.meta;
  document.title = title ? `${title} - 意想社团` : '意想社团后台管理系统';

  const hasToken = getToken();

  if (hasToken) {
    // 如果已经有了token再访问登录页的话，将会被重定向到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      }
    }
  } else if (whiteList.indexOf(to.path) !== 1) {
    next();
  } else {
    next('/login');
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
