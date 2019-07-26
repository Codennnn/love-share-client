<template>
  <div class="menu-main">
    <el-menu
      class="wrapper"
      :default-active="this.$route.path"
      :class="{ 'side-bar-menu': !isCollapse }"
      :collapse="isCollapse"
      router
    >
      <el-menu-item
        class="flex items-center h-12"
        v-if="isCollapse"
        @click="switchCollapse"
      >
        <img
          class="w-6 h-6 -ml-0"
          src="@/assets/images/logo/logo.png"
        />
      </el-menu-item>
      <div
        class="flex items-center px-5 h-12 cursor-pointer"
        v-if="!isCollapse"
        @click="switchCollapse"
      >
        <img
          class="w-6 h-6 -ml-1"
          src="@/assets/images/logo/logo.png"
        />
        <span class="ml-3 text-lg font-semibold text-purple-600">意想社团</span>
      </div>
      <template v-for="(menuItem,index) in sidebarList">
        <!-- 嵌套子菜单 -->
        <el-submenu
          v-if="menuItem.subMenu"
          :key="index"
          :index="index.toString()"
        >
          <template slot="title">
            <i
              class="menu-icon iconfont"
              :class="menuItem.icon"
            ></i>
            <span slot="title">{{ menuItem.title }}</span>
          </template>
          <el-menu-item-group
            v-for="(subItem, index, key) in menuItem.subMenu"
            :key="key"
          >
            <el-menu-item :index="subItem.path">{{ subItem.title }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 单个菜单项 -->
        <el-menu-item
          v-else
          :index="menuItem.path"
          :key="index"
        >
          <i
            class="menu-icon iconfont"
            :class="menuItem.icon"
          ></i>
          <span slot="title">{{ menuItem.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus';

export default {
  data() {
    return {
      isCollapse: false,
      sidebarList: [
        {
          title: '仪表版',
          icon: 'icon-home',
          subMenu: [{ title: '数据展示', path: '/analytics' }, { title: '数据分析', path: '' }],
        },
        {
          title: '用户管理',
          icon: 'icon-group',
          subMenu: [{ title: '用户列表', path: '/user-list' }, { title: '角色管理', path: '' }],
        },
        {
          title: '社团管理',
          icon: 'icon-medal',
          subMenu: [
            { title: '社团列表', path: '' },
            { title: '申请列表', path: '' },
            { title: '社团审核', path: '' },
            { title: '创建社团', path: '' },
          ],
        },
        {
          title: '动态管理',
          icon: 'icon-dynamic',
          subMenu: [{ title: '动态列表', path: '' }, { title: '动态编辑', path: '' }],
        },
        {
          title: '活动管理',
          icon: 'icon-activity',
          subMenu: [{ title: '活动列表', path: '' }, { title: '活动审核', path: '' }],
        },
        { title: '待办事项', icon: 'icon-todo', path: '/todo-list' },
      ],
    };
  },

  methods: {
    switchCollapse() {
      this.isCollapse = !this.isCollapse;
      Bus.$emit('sideBarStatus', this.isCollapse);
    },
  },
};
</script>

<style lang="scss">
$hoverColor: #f0f0f0; // 导航菜单 hover 时的背景色

.menu-main {
  .el-menu {
    max-width: $side-bar-width;
    min-height: 100%;
  }
}

.el-menu.wrapper {
  &:not(.el-menu--collapse) {
    // 必须设置，否则会出现动画卡顿问题
    width: $side-bar-width;
  }
}

.el-menu.side-bar-menu {
  padding: 0 18px;
}

.el-submenu {
  margin-bottom: 10px;
  .el-submenu__title {
    &:hover {
      border-radius: 5px;
      background-color: $hoverColor;
    }
  }
  .el-submenu__title .menu-icon {
    margin-right: 10px;
    font-size: 22px;
    font-weight: normal;
    color: $menuIcon;
  }
  .el-menu-item-group {
    ul .el-menu-item {
      line-height: 40px;
      height: 40px;
      &:hover {
        border-radius: 5px;
        background-color: $hoverColor;
      }
    }
  }
}

li.el-menu-item {
  line-height: 40px;
  height: 40px;

  &:hover {
    border-radius: 5px;
    background-color: $hoverColor;
  }
  .menu-icon {
    margin-right: 15px;
    font-size: 22px;
    font-weight: normal;
    color: $menuIcon;
  }
}

li.el-menu-item.is-active {
  border-radius: 5px;
  background: linear-gradient(to right, $primary, rgba($primary, 0.7));
  box-shadow: 0 0 10px $primary;
  color: #fff;
  span {
    color: #fff;
  }
}
</style>
