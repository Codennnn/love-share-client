<template>
  <div class="flex">
    {{text}}
    <el-tooltip
      content="复制订单号"
      effect="light"
    >
      <i
        class="iconfont icon-copy cursor-pointer"
        v-clipboard:copy="text"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      ></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '123',
    };
  },

  methods: {
    onCopy(e) {
      console.log(e);
    },
    onError(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
