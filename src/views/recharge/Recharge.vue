<template>
  <div>
    <vs-tabs alignment="right">
      <vs-tab
        label="充值"
        class="py-8"
      >
        <vs-tabs
          class="charge-tab"
          position="left"
        >
          <vs-tab label="支付宝">
            <div class="w-full p-6 flex-col-center">
              <div class="mb-6 flex items-center">
                <div
                  class="w-20 h-16 mr-6 flex-row-center transition radius bg-white cursor-pointer"
                  v-for="(v, i) in values"
                  :key="i"
                  :class="{'bg-primary text-white': select === i + 1}"
                  :style="select === i + 1 ? 'box-shadow: 0 0 15px rgba(var(--vs-primary), 1)' : ''"
                  @click="select = i + 1"
                >{{ v }}</div>
              </div>
              <div
                v-if="select === values.length + 1"
                class="mb-6"
              >
                <vs-input
                  placeholder="请输入金额"
                  v-model.number="value"
                />
              </div>
              <div
                class="py-3 primary flex-row-center radius font-bold cursor-pointer"
                style="width: 22rem; background: rgba(var(--vs-primary),0.2);"
                @click="onShow()"
              >使用支付宝支付</div>
            </div>
          </vs-tab>
          <vs-tab label="微信支付">
            <div class="p-6">很抱歉，暂未开通此支付方式</div>
          </vs-tab>
          <vs-tab label="信用卡 / 银行卡">
            <div class="p-6">很抱歉，暂未开通此支付方式</div>
          </vs-tab>
        </vs-tabs>
      </vs-tab>
      <vs-tab label="历史账单"></vs-tab>
      <vs-popup
        title="扫描付款"
        :active.sync="showPopup"
      >
        <div class="flex">
          <img
            src="https://gitee.com/chinesee/images/raw/master/img/img_026.png"
            alt="二维码"
          >
          <div class="p-4">
            <p class="mb-6">
              您的二维码已生成，感谢您对乐享校园的支持。
              <br>
              如果二维码未能成功生成，请点击
            </p>
            <vs-button
              class="mr-4"
              color="#ccc"
            >再次生成二维码</vs-button>
            <vs-button>模拟扫描支付</vs-button>
          </div>
        </div>
      </vs-popup>

    </vs-tabs>
  </div>
</template>

<script>
const values = ['￥10', '￥25', '￥50', '￥100', '￥250', '其它金额']
export default {
  name: 'Recharge',

  data: () => ({
    values,
    value: null,
    select: null,
    showPopup: false,
  }),

  methods: {
    onShow() {
      if (this.select) {
        this.showPopup = true
      }
    },

    onPay() {},
  },
}
</script>

<style lang="scss" scoped>
.vs-tabs::v-deep {
  .con-slot-tabs {
    flex: 1;
  }
  &.charge-tab .vs-tabs--ul {
    box-shadow: none;
  }
  .vs-tabs--btn {
    padding-right: 30px;
  }
  .vs-icon-primary {
    color: inherit;
  }
}
</style>
