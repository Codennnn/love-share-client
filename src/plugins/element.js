import Vue from 'vue';
import {
  Badge, Container, Dropdown, DropdownMenu, DropdownItem,
  Menu, MenuItem,
  Popover, Submenu,
  Tooltip, Table, TableColumn, MenuItemGroup,
} from 'element-ui'; // 按需引入组件
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/element-override.scss'; // 自定义主题

// 布局容器
Vue.use(Container);

// 下拉菜单
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

// 菜单栏
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);

// 表格
Vue.use(Table);
Vue.use(TableColumn);

// 弹出小组件
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Badge);
