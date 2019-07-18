import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store/store';

// 引入路由跳转加载进度条插件
import 'nprogress/nprogress.css';
import { getToken } from '@/permission/token';

import Layout from '@/layouts/index.vue'; // 主框架
import Login from '@/views/login/Login.vue';
import Analytics from '@/views/analytics/Analytics.vue'; // 数据分析

Vue.use(Router);
NProgress.configure({ showSpinner: false }); // NProgress 配置

const whiteList = ['/login'];

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

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 进度条开始
  console.log(to.path);

  // 设置网页标题
  const { title } = to.meta;
  document.title = title ? `${title} - 意想社团` : '意想社团后台管理系统';

  const hasToken = !!getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经有了token再访问登录页的话，将会被重定向到首页
      next({ path: '/' });
    } else {
      const { roles } = store.state.user;
      const hasRoles = roles && roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        store.dispatch('user/getUserInfo');
        const accessedRoutes = store.dispatch('permission/generateRoutes', store.state.user.roles);
        // 动态添加路由
        router.addRoutes(accessedRoutes);
        next({ ...to, replace: true });
      }
    }
  } else if (whiteList.includes(to.path)) {
    // 如果路由在白名单里面，直接next
    next();
  } else {
    // 最后，如果没有权限，则重定向回登录页
    next('/login');
  }
});

router.afterEach(() => {
  NProgress.done();
});

export function resetRouter() {
  const newRouter = router;
  router.matcher = newRouter.matcher; // 重置路由
}

export default router;
