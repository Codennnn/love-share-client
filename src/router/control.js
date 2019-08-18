import NProgress from 'nprogress';
import router from './router';
import store from '@/store/store';

// 引入路由跳转加载进度条插件
import 'nprogress/nprogress.css';
import { getToken } from '@/permission/token';

NProgress.configure({ showSpinner: false }); // NProgress 配置

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // 进度条开始

  // 设置网页标题
  const title = to.meta ?.title;
  document.title = title ? `${title} - 意想社团` : '意想社团后台管理系统';

  const hasToken = !!getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经有了token再访问登录页的话，将会被重定向到首页
      next({ path: '/' });
    } else {
      const hasRoles = !!(store.state.user.roles ?.length > 0);
      if (hasRoles) {
        next();
      } else {
        const { roles } = await store.dispatch('user/getUserInfo');
        const accessedRoutes = await store.dispatch('permission/generateRoutes', roles);
        // console.log('<动态路由>', accessedRoutes);
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
