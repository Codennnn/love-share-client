import NProgress from 'nprogress'
import router from './router'

// 引入路由跳转加载进度条插件
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/token'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/sign', '/home']

router.beforeEach(async (to, from, next) => {
  NProgress.start() // 进度条开始

  // 设置网页标题
  const title = to.meta ?.title
  document.title = title ? `${title} - 乐享校园` : '校园闲置物品交易平台'

  if (getToken()) {
    if (to.path === '/sign') {
      next({ path: from.path })
    } else {
      next()
    }
  } else if (whiteList.includes(to.path)) {
    // 如果路由在白名单里面，直接next
    next()
  } else {
    // 最后，如果没有权限，则重定向回登录页
    next('/sign')
  }
})

router.afterEach(() => {
  NProgress.done()
})
