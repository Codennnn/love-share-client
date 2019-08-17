<template>
  <div class="layout-main">

    <!-- 侧边栏 -->
    <sidebar />

    <div
      id="content-area"
      :class="{ 'content-area-full': sidebarCollapse }"
    >
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
  name: 'Main',
  components: {
    Sidebar,
    Navbar,
    Footer,
  },

  computed: {
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-main {
  position: relative;
  height: 100%;
  // display: flex;
  background-color: rgb(245, 245, 245);
}

#content-area {
  // position: absolute;
  // top: 0;
  // right: 0;
  min-height: 100%;
  // width: 100%;
  margin-left: $side-bar-width;
  transition: margin-left 0.5s;
  &.content-area-full {
    margin-left: 65px;
  }
  .content-wrapper {
    min-height: 100vh;
  }
}

.router-view {
  position: relative;
  min-height: 100vh;
  .router-content {
    padding-top: 4.5rem;
  }
}
</style>
