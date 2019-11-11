<template>
  <div class="flex">
    <div class="w-2/3 pr-3">
      <div class="p-5 rounded-lg shadow">
        <p class="text-lg font-bold">选择您的付款方式</p>
        <p class="text-sm text-gray-500">请务必选择正确的付款方式</p>
      </div>
    </div>
    <div class="w-1/3 pl-2">
      <div class="p-5 rounded-lg shadow">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSettle',
  data: () => ({
  }),

  mounted() {
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
</style>
