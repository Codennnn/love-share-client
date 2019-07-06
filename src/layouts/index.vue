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
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default {
  data() {
    return {};
  },

  components: {
    Sidebar,
    Navbar
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
</style>

