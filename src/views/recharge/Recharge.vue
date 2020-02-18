<template>
  <div>
    <vs-tabs
      alignment="right"
      v-model="tabActive"
    >
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
                  v-for="(val, i) in values"
                  :key="i"
                  :class="{'bg-primary text-white': select === i}"
                  :style="select === i ? 'box-shadow: 0 0 15px rgba(var(--vs-primary), 1)' : ''"
                  @click="onSelect(val, i)"
                >{{ val }}</div>
              </div>
              <div
                v-if="select === values.length - 1"
                class="mb-6"
              >
                <vs-input
                  placeholder="请输入金额"
                  v-model.number="balance"
                />
              </div>
              <div
                class="py-3 primary flex-row-center radius font-bold cursor-pointer"
                style="width: 22rem; background: rgba(var(--vs-primary),0.2);"
                :class="{'cursor-not-allowed': !canPay}"
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
      <vs-tab
        label="历史账单"
        class="p-6"
      >
        <div>
          <vs-table
            class="p-6 radius bg-white overflow-hidden"
            pagination
            noDataText="暂无数据"
            :max-items="10"
            :data="billList"
          >
            <template slot="thead">
              <vs-th>账单号</vs-th>
              <vs-th>付款方式</vs-th>
              <vs-th>金额</vs-th>
              <vs-th>时间</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td>{{ tr._id }}</vs-td>
                <vs-td>
                  <div class="flex items-center">
                    <svg class="w-8 h-8 mr-2">
                      <use :xlink:href="`#icon-${icons[tr.payment].icon}`"></use>
                    </svg>
                    <span>{{ icons[tr.payment].label }}</span>
                  </div>
                </vs-td>
                <vs-td>￥{{ $numFixed(tr.balance) }}</vs-td>
                <vs-td>{{ $dayjs(tr.created_at).format('YYYY-MM-DD') }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vs-tab>

      <vs-popup
        title="扫描付款"
        :active.sync="showPopup"
      >
        <div class="flex">
          <img
            src="https://gitee.com/chinesee/images/raw/master/img/img_026.png"
            alt="二维码"
          >
          <div class="py-5 pl-8 pr-4">
            <p>
              您的付款二维码已生成，付款金额为：
            </p>
            <p class="my-4 text-xl font-bold">￥{{ balance }}</p>
            <p class="mb-4">感谢您对乐享校园的支持，如果二维码未能成功生成，请点击</p>
            <vs-button
              class="mr-4"
              color="#ccc"
            >再次生成二维码</vs-button>
            <vs-button @click="onPay()">模拟扫描支付</vs-button>
          </div>
        </div>
      </vs-popup>

    </vs-tabs>
  </div>
</template>

<script>
import { rechargeBalance, getBillList } from '@/request/api/user'

const values = [10, 25, 50, 100, 250, '其它金额']
const icons = {
  undefined: { icon: 'paypal', label: '花呗支付' },
  huabei: { icon: 'paypal', label: '花呗支付' },
  weixin: { icon: 'weixinzhifu', label: '微信支付' },
  zhifubao: { icon: 'zhifubao', label: '支付宝支付' },
  yinlian: { icon: 'yinlian', label: '银行卡支付' },
}
export default {
  name: 'Recharge',
  data: () => ({
    values,
    icons,
    tabActive: 0,
    billList: [],
    balance: null, // 其它金额
    select: null, // 所选金额
    showPopup: false,
  }),

  computed: {
    canPay() {
      return this.balance && this.balance > 0
    },
  },

  watch: {
    tabActive(v) {
      if (v === 1) {
        this.getBillList()
      }
    },
    balance(v) {
      if (v > 1000) {
        this.balance = 1000
      }
    },
  },

  methods: {
    onSelect(val, i) {
      this.select = i
      if (this.select === this.values.length - 1) {
        this.balance = null
        return
      }
      this.balance = val
    },

    onShow() {
      if (this.canPay) {
        this.showPopup = true
      }
    },

    async getBillList() {
      const { code, data: { bill_list } } = await getBillList()
      if (code === 2000) {
        this.billList = bill_list
      }
    },

    async onPay() {
      if (this.canPay) {
        const { code, msg } = await rechargeBalance({ balance: this.balance, payment: 'zhifubao' })
        if (code === 2000) {
          this.showPopup = false
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      }
    },
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
