import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' // Vuesax 样式
import 'material-icons/iconfont/material-icons.css'

import '@/assets/scss/main.scss'

import {
  Badge, Container, Dropdown, DropdownMenu, DropdownItem,
  Menu, MenuItem,
  Popover, Submenu, Steps, Step,
  Tooltip, Table, TableColumn, MenuItemGroup,
} from 'element-ui' // 按需引入组件
import 'element-ui/lib/theme-chalk/index.css'

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

// 下拉菜单
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

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
