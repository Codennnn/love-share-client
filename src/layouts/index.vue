<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <sidebar class="sidebar-container" />
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header>
        <navbar />
      </el-header>

      <!-- 主区域 -->
      <el-main></el-main>

      <!-- 页脚 -->
      <el-footer>COPYRIGHT @ 2019 Jack</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar/Sidebar.vue';
import Navbar from './components/Navbar/Navbar.vue';

export default {
  data() {
    return {};
  },

  components: {
    Sidebar,
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>
