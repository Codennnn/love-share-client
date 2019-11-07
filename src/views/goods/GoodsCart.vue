<template>
  <div>
    <el-steps
      class="mb-8"
      simple
      :active="currentStep"
    >
      <el-step
        class="cursor-pointer"
        title="购物车"
        icon="el-icon-shopping-cart-1"
        @click="currentStep = 1, currentComponent = 'CartList'"
      ></el-step>
      <el-step
        class="cursor-pointer"
        title="收货地址"
        icon="el-icon-map-location"
        @click.native="currentStep = 2, currentComponent = 'CartAddress'"
      ></el-step>
      <el-step
        class="cursor-pointer"
        title="结算付款"
        icon="el-icon-wallet"
        @click="currentStep = 3, currentComponent = 'CartSettle'"
      ></el-step>
    </el-steps>

    <transition
      enter-active-class="animated fadeIn quickly"
      leave-active-class="animated fadeOut quickly"
      mode="out-in"
    >
      <keep-alive>
        <component
          :is="currentComponent"
          @switchComponent="changeComponent"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import CartList from './components/CartList.vue'

const CartAddress = Vue.component(
  'CartAddress',
  () => import('./components/CartAddress.vue'),
)
const CartSettle = Vue.component(
  'CartSettle',
  () => import('./components/CartSettle.vue'),
)

export default {
  name: 'goods-cart',
  data: () => ({
    currentStep: 1,
    currentComponent: 'CartList',
  }),

  components: { CartList, CartAddress, CartSettle },

  methods: {
    changeComponent(val) {
      this.currentStep = val.currentStep
      this.currentComponent = val.currentComponent
    },
  },
}
</script>

<style lang="scss" scoped>
.quickly {
  animation-duration: 0.2s;
}

.el-steps {
  &::v-deep {
    .el-step__icon-inner {
      font-size: 1.6rem !important;
    }
  }
}
</style>
