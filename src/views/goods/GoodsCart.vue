<template>
  <div>
    <!-- 步骤条 -->
    <el-steps
      class="mb-8"
      simple
      :active="currentStep"
    >
      <el-step
        :class="activeStep.includes('CartList') ? 'cursor-pointer' : 'cursor-not-allowed'"
        title="购物车"
        icon="el-icon-shopping-cart-1"
        @click.native="changeComponent({
                         currentStep: 1,
                         currentComponent: 'CartList',
                       })"
      ></el-step>
      <el-step
        :class="activeStep.includes('CartAddress') ? 'cursor-pointer' : 'cursor-not-allowed'"
        title="收货地址"
        icon="el-icon-map-location"
        @click.native="changeComponent({
                         currentStep: 2,
                         currentComponent: 'CartAddress',
                       })"
      ></el-step>
      <el-step
        :class="activeStep.includes('CartSettle') ? 'cursor-pointer' : 'cursor-not-allowed'"
        title="结算付款"
        icon="el-icon-wallet"
        disabled
        @click.native="changeComponent({
                         currentStep: 3,
                         currentComponent: 'CartSettle',
                       })"
      ></el-step>
    </el-steps>

    <transition
      enter-active-class="animated fadeIn quickly"
      leave-active-class="animated fadeOut quickly"
      mode="out-in"
    >
      <keep-alive>
        <component
          class="p-6"
          :is="currentComponent"
          @switchComponent="changeComponent"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import CartList from './components/cart/CartList.vue'

const CartAddress = Vue.component(
  'CartAddress',
  () => import('./components/cart/CartAddress.vue'),
)
const CartSettle = Vue.component(
  'CartSettle',
  () => import('./components/cart/CartSettle.vue'),
)
const CartSuccess = Vue.component(
  'CartSuccess',
  () => import('./components/cart/CartSuccess.vue'),
)
const CartFail = Vue.component(
  'CartFail',
  () => import('./components/cart/CartFail.vue'),
)

export default {
  name: 'GoodsCart',
  components: {
    CartList, CartAddress, CartSettle, CartSuccess, CartFail,
  },

  data: () => ({
    currentStep: 1,
    activeStep: ['CartList'], // 已被激活的步骤
    currentComponent: 'CartList',
  }),

  activated() {
    this.currentComponent = 'CartList'
  },

  methods: {
    changeComponent({ currentStep, currentComponent, isActive = false }) {
      if (isActive || this.activeStep.includes(currentComponent)) {
        this.currentStep = currentStep
        this.currentComponent = currentComponent
        if (!this.activeStep.includes(currentComponent)) {
          this.activeStep.push(currentComponent)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-steps::v-deep {
  .el-step__icon-inner {
    font-size: 1.6rem !important;
  }
}
</style>
