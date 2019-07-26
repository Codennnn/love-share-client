<template>
  <div class="layout-main">

    <!-- 侧边栏 -->
    <sidebar />

    <div id="content-area">
      <div class="content-wrapper">
        <!-- 头部 -->
        <navbar />
        <div class="router-view p-6">
          <div class="router-content">
            <!-- 主区域 -->
            <transition
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
              mode="out-in"
            >
              <router-view />
            </transition>
          </div>
          <!-- 页脚 -->
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar/Sidebar.vue';
import Navbar from './components/Navbar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.layout-main {
  min-height: 100%;
  display: flex;
  background-color: rgb(245, 245, 245);
}

#content-area {
  min-height: 100vh;
  width: 100%;
  transition: margin-left 0.5s;

  .content-wrapper {
    min-height: 100vh;
    width: 100%;
  }
}

.router-view {
  position: relative;
  .router-content {
    padding-top: 5.5rem;
  }
}
</style>
