<template>
  <div class="flex">
    <div class="w-2/3 pr-3">
      <div class="p-5 rounded-lg shadow">
        <p class="text-lg font-bold">选择您的付款方式</p>
        <p class="mb-6 text-sm text-gray-500">请务必选择正确的付款方式</p>
        <div>
          <ul>
            <li>
              <vs-radio
                v-model="payment"
                vs-value="huabei"
              >
                <div class="flex items-center">
                  <span class="mx-2 text-sm">余额支付</span>
                  <img
                    class="w-6"
                    src="@/assets/images/pages/cart/huabei.svg"
                  >
                </div>
              </vs-radio>
            </li>
            <vs-divider />
            <li
              class="mb-2"
              v-for="(item, index) in icons"
              :key="index"
            >
              <vs-radio
                v-model="payment"
                :vs-value="item.value"
              >
                <div class="flex items-center">
                  <span class="mx-2 text-sm">{{ item.label }}</span>
                  <img
                    class="w-6"
                    :src="item.icon"
                  >
                </div>
              </vs-radio>
            </li>
            <vs-divider />
            <li class="text-gray-600 cursor-pointer">
              <i class="el-icon-plus"></i>
              <span class="ml-1 text-sm">添加银行卡</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-2">
      <div class="p-5 rounded-lg shadow">
        <p class="mb-4 text-lg font-bold">价格明细</p>
        <div class="mb-1 flex justify-between items-center text-sm">
          <span class="text-gray-500">{{ cartAmount }} 件商品</span>
          <span class="font-bold">￥{{ amountPayable.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">运费</span>
          <span class="text-success">{{ deliveryCharges }}</span>
        </div>
        <vs-divider />
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">应付金额</span>
          <span class="font-bold">￥{{ amountPayable.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from '@/assets/images/pages/cart/weixin.svg'
import icon2 from '@/assets/images/pages/cart/zhifubao.svg'
import icon3 from '@/assets/images/pages/cart/yinlian.svg'

export default {
  name: 'CartSettle',
  data: () => ({
    icons: [
      { icon: icon1, label: '微信支付', value: 'weixin' },
      { icon: icon2, label: '支付宝支付', value: 'zhifubao' },
      { icon: icon3, label: '银行卡支付', value: 'yinlian' },
    ],
    payment: 'huabei',
  }),

  mounted() {
  },

  computed: {
    cartAmount() {
      return this.$store.getters['cart/cartAmount']
    },
    deliveryCharges() {
      return this.$store.getters['cart/deliveryCharges']
    },
    amountPayable() {
      return this.$store.getters['cart/amountPayable']
    },
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.con-vs-radio {
  justify-content: start;
}
</style>
