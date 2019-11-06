<template>
  <div>
    <el-steps
      simple
      :active="currentStep"
    >
      <el-step
        title="购物车"
        icon="el-icon-shopping-cart-1"
      ></el-step>
      <el-step
        title="收货地址"
        icon="el-icon-map-location"
      ></el-step>
      <el-step
        title="结算付款"
        icon="el-icon-wallet"
      ></el-step>
    </el-steps>

    <transition
      enter-active-class="animated fadeIn quickly"
      leave-active-class="animated fadeOut quickly"
      mode="out-in"
    >
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'

const CartList = Vue.component(
  'CartList',
  () => import('./components/CartList.vue'),
)

export default {
  name: 'goods-cart',
  data: () => ({
    currentStep: 1,
    currentComponent: 'CartList',
  }),

  components: { CartList },
}
</script>

<style lang="scss" scoped>
.quickly {
  transition: 0.2s;
}
</style>
