<template>
  <el-menu
    :default-active="this.$route.path"
    :class="{ 'side-bar-menu': !isCollapse }"
    :collapse="isCollapse"
    router
  >
    <template v-for="(menuItem,index) in sidebarList">
      <el-submenu v-if="menuItem.subMenu" :key="index" :index="index.toString()">
        <template slot="title">
          <i class="sidebar-icon iconfont" :class="menuItem.icon"></i>
          <span slot="title">{{ menuItem.title }}</span>
        </template>
        <el-menu-item-group v-for="(subItem, index, key) in menuItem.subMenu" :key="key">
          <el-menu-item index="/analytics">{{ subItem.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else index="/todo-list" :key="index">
        <i class="sidebar-icon iconfont" :class="menuItem.icon"></i>
        <span slot="title">{{ menuItem.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import SidearItem from "./SidebarItem";

export default {
  data() {
    return {
      isCollapse: false,
      sidebarList: [
        {
          title: "仪表版",
          icon: "icon-home",
          subMenu: [{ title: "数据展示" }, { title: "数据分析" }]
        },
        {
          title: "用户管理",
          icon: "icon-group",
          subMenu: [{ title: "用户列表" }, { title: "角色管理" }]
        },
        {
          title: "社团管理",
          icon: "icon-medal",
          subMenu: [
            { title: "社团列表" },
            { title: "申请列表" },
            { title: "社团审核" },
            { title: "创建社团" }
          ]
        },
        {
          title: "动态管理",
          icon: "icon-dynamic",
          subMenu: [{ title: "动态列表" }, { title: "动态编辑" }]
        },
        {
          title: "活动管理",
          icon: "icon-activity",
          subMenu: [{ title: "活动列表" }, { title: "活动审核" }]
        },
        { title: "待办事项", icon: "icon-todo" }
      ]
    };
  },

  components: { SidearItem }
};
</script>

<style lang="scss">
.el-menu.side-bar-menu {
  padding: 0 18px;
}

.el-submenu {
  margin-bottom: 10px;
  .el-submenu__title {
    &:hover {
      border-radius: 5px;
      background-color: #f0f0f0;
    }
  }
  .el-submenu__title .sidebar-icon {
    margin-right: 10px;
    font-size: 22px;
    font-weight: normal;
    color: #545454;
  }
  .el-menu-item-group {
    ul .el-menu-item {
      line-height: 40px;
      height: 40px;
      &:hover {
        border-radius: 5px;
        background-color: #f0f0f0;
      }
    }
  }
}

li.el-menu-item {
  line-height: 40px;
  height: 40px;
  &:hover {
    border-radius: 5px;
    background-color: #f0f0f0;
  }
  .sidebar-icon {
    margin-right: 15px;
    font-size: 22px;
    font-weight: normal;
    color: #545454;
  }
}

li.el-menu-item.is-active {
  line-height: 40px;
  height: 40px;
  border-radius: 5px;
  background: linear-gradient(to right, #786cf0, #968ef2);
  box-shadow: 0 0 10px #786cf0;
  color: #ffffff;
  span {
    color: #ffffff;
  }
}
</style>
