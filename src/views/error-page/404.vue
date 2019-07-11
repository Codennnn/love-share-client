<template>
  <div class="bg">
    <div class="btn-group">
      <el-button
        type="primary"
        class="back-btn"
        @click="backHome"
      >带我回家</el-button>
      <el-button
        plain
        @click="refresh"
      >刷新页面</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      this.$router.replace('analytics');
    },
    refresh() {
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/pages/404/not_found.png") no-repeat
    center center;
  background-size: cover;
}

.btn-group {
  position: absolute;
  bottom: 100px;
  right: 150px;
}
</style>
