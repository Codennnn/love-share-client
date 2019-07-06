<template>
  <el-menu
    :default-active="this.$route.path"
    :class="{ 'side-bar-menu': !isCollapse }"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index @click="isCollapse = !isCollapse">
      <img src="@/assets/images/logo/logo.png" class="el-icon-menu" />
      <!-- <span slot="title">意想社团</span> -->
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="sidebar-icon iconfont icon-home"></i>
        <span slot="title">仪表板</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/analytics">数据展示</el-menu-item>
        <el-menu-item index="/about">数据分析</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="sidebar-icon iconfont icon-group"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user-list">用户列表</el-menu-item>
        <el-menu-item index="/about">角色管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="sidebar-icon iconfont icon-medal"></i>
        <span slot="title">社团管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/club-list">社团列表</el-menu-item>
        <el-menu-item index="/application-list">申请列表</el-menu-item>
        <el-menu-item index="/about">社团审核</el-menu-item>
        <el-menu-item index="/create-club">创建社团</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="sidebar-icon iconfont icon-dynamic"></i>
        <span slot="title">动态管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/dynamic">动态列表</el-menu-item>
        <el-menu-item index="/123">动态编辑</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="sidebar-icon iconfont icon-activity"></i>
        <span slot="title">活动管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/activity-list">活动列表</el-menu-item>
        <el-menu-item index="/about">活动审核</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/todo-list">
      <i class="sidebar-icon iconfont icon-todo"></i>
      <span slot="title">待办事项</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import SidearItem from "./SidebarItem";

export default {
  data() {
    return {
      isCollapse: false
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
