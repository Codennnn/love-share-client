<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="initial">
      <sidebar class="sidebar-container" />
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header height="85px">
        <navbar />
      </el-header>

      <!-- 主区域 -->
      <el-main>
        <transition
          enter-active-class="animated fadeIn faster"
          leave-active-class="animated fadeOut faster"
          mode="out-in"
        >
          <router-view />
        </transition>
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

.el-footer {
  display: flex;
  align-items: center;
}
</style>
