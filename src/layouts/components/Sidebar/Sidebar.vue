<template>
  <div class="menu-main">
    <el-menu
      router
      class="wrapper"
      :default-active="this.$route.path"
      :class="{ 'side-bar-menu': !sidebarCollapse }"
      :collapse="sidebarCollapse"
    >
      <el-menu-item
        class="absolute top-0 z-50 flex items-center h-12"
        v-if="sidebarCollapse"
        @click="switchCollapse"
      >
        <img
          class="w-6 h-6 -ml-0"
          src="@/assets/images/logo/logo.png"
        />
      </el-menu-item>
      <div
        class="sticky top-0 left-0 z-50 flex items-center px-5 h-12 cursor-pointer logo"
        v-if="!sidebarCollapse"
        @click="switchCollapse"
      >
        <img
          class="w-6 h-6 -ml-1"
          src="@/assets/images/logo/logo.png"
        />
        <span class="ml-3 text-lg font-semibold text-purple-600">意想社团</span>
      </div>

      <!-- 菜单主内容 -->
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
import _debounce from 'lodash/debounce'; // 引入防抖函数

export default {
  data() {
    return {
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

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1300) {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', true);
      } else {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false);
      }
    }, 400);
  },

  computed: {
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse;
    },
  },

  methods: {
    switchCollapse() {
      this.$store.commit(
        'SWITCH_SIDEBAR_COLLAPSE',
        !this.sidebarCollapse,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
$hoverColor: #f0f0f0; // 导航菜单 hover 时的背景色

.menu-main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}

.logo {
  background: #fff;
  box-shadow: 0 15px 20px #fff;
}

.el-menu.wrapper {
  max-width: $side-bar-width;
  padding: 50px 0;
  &:not(.el-menu--collapse) {
    // 必须设置，否则会出现动画卡顿问题
    width: $side-bar-width;
  }
  &.side-bar-menu {
    padding: 0 18px;
  }
}

.el-submenu {
  margin-bottom: 10px;
  .el-submenu__title {
    &:hover {
      border-radius: 5px;
      background-color: $hoverColor;
    }
    .menu-icon {
      margin-right: 10px;
      font-size: 22px;
      font-weight: normal;
      color: $menuIcon;
    }
  }
  .el-menu-item-group {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      &:hover {
        border-radius: 5px;
        background-color: $hoverColor;
      }
    }
  }
}

.el-menu-item {
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

.el-menu-item.is-active {
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(var(--vs-primary), 1);
  background: linear-gradient(
    to right,
    rgba(var(--vs-primary), 1),
    rgba(var(--vs-primary), 0.7)
  );
  .menu-icon {
    color: inherit;
  }
}
</style>
