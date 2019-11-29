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
                  <svg class="w-8 h-8">
                    <use xlink:href="#icon-paypal"></use>
                  </svg>
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
                  <svg class="w-8 h-8">
                    <use :xlink:href="`#icon-${item.icon}`"></use>
                  </svg>
                </div>
              </vs-radio>
            </li>
            <vs-divider />
            <li class="text-gray-600">
              <span class="cursor-pointer">
                <i class="el-icon-plus"></i>
                <span class="ml-1 text-sm">添加银行卡</span>
              </span>
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
          <span class="font-bold">￥{{ Number(amountPayable).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">运费</span>
          <span class="text-success">{{ deliveryCharges }}</span>
        </div>
        <vs-divider />
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">应付金额</span>
          <span class="font-bold">￥{{ Number(amountPayable).toFixed(2) }}</span>
        </div>
      </div>
      <vs-button class="w-full mt-5">确认付款</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSettle',
  data: () => ({
    icons: [
      { icon: 'weixinzhifu', label: '微信支付', value: 'weixin' },
      { icon: 'zhifubao', label: '支付宝支付', value: 'zhifubao' },
      { icon: 'yinlian', label: '银行卡支付', value: 'yinlian' },
    ],
    payment: 'huabei', // 支付方式
  }),

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
