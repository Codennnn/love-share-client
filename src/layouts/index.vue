<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside style="width: 14vw;">
      <sidebar class="sidebar-container" />
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header>
        <navbar />
      </el-header>

      <!-- 主区域 -->
      <el-main>
        <router-view />
      </el-main>

      <!-- 页脚 -->
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar/Sidebar.vue';
import Navbar from './components/Navbar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  data() {
    return {};
  },

  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #fff;
}

.el-footer {
  display: flex;
  align-items: center;
}
</style>
