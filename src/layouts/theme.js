import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' // Vuesax 样式
import 'material-icons/iconfont/material-icons.css'

import '@/assets/scss/reset.scss' // 覆盖默认样式
import '@/assets/scss/common.scss' // 公共样式
import '@/assets/scss/variables.scss' // scss 变量
import '@/assets/scss/tailwind.scss' // tailwind 样式
import '@/assets/iconfont/iconfont.css' // 阿里云字体图标

import {
  Badge, Container, Dropdown, Carousel, CarouselItem,
  DropdownMenu, DropdownItem, DatePicker, Image,
  Menu, MenuItem, MenuItemGroup, Message, Option,
  Popover, Submenu, Steps, Step, Select,
  Tooltip, Table, TableColumn,
} from 'element-ui' // 按需引入组件
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/element-override.scss'

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#7367F0',
      success: '#28C76F',
      danger: '#EA5455',
      warning: '#FF9F43',
      dark: '#1E1E1E',
    },
  },
})

// 布局容器
Vue.use(Container)
Vue.use(Carousel)
Vue.use(CarouselItem)

// 下拉菜单
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)

// 菜单栏
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

// 表格
Vue.use(Table)
Vue.use(TableColumn)

// 弹出小组件
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Image)

Vue.prototype.$message = Message
