<template>
  <div class="flex">
    <div class="w-2/3 pr-3">
      <div class="p-5 bg-white shadow rounded-lg"></div>
    </div>
    <div class="w-1/3 pl-3">
      <div class="p-5 bg-white shadow rounded-lg">
        <div class="text-2xl">{{ '陈梓聪' }}</div>
        <div class="my-3 flex items-center">
          <vs-chip>学校</vs-chip>
          <span
            class="ml-2"
            style="color: #666;"
          >{{ '广州大学华软软件学院' }}</span>
        </div>
        <div style="color: #999;">{{ '13724540846' }}</div>
        <vs-divider />
        <vs-button
          class="w-full mt-4"
          @click="onSettle()"
        >使用这个地址</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart-address',
  data: () => ({
  }),

  mounted() {
  },

  methods: {
    onSettle() {
      this.$emit('switchComponent', {
        currentStep: 3,
        currentComponent: 'CartSettle',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
</style>
