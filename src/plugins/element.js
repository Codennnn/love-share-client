import Vue from 'vue';
import {
  Container, Aside, Main, Header, Footer,
  Dropdown, DropdownMenu, DropdownItem,
  Button, Tooltip, Popover,
  Menu, MenuItem, Submenu,
  Table, TableColumn, MenuItemGroup,
} from 'element-ui'; // 按需引入组件
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/element-override.scss'; // 自定义主题

// 布局容器
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);

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

// 小组件
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Popover);
