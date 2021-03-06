<template>
  <div class="main flex vs-con-loading__container">
    <div class="w-2/3 pr-3">
      <div class="p-5 radius bg-white">
        <div class="mb-2 overflow-hidden">
          <vs-button
            radius
            class="text-xl"
            type="flat"
            color="#999"
            icon="arrow_back"
            @click="$emit('switchComponent', {
              currentStep: 2,
              currentComponent: 'CartAddress',
              isActive: true,
            })"
          ></vs-button>
        </div>
        <div class="w-full mb-3 p-3 text-lg text-primary bg-gray-150 radius">购物清单</div>
        <vs-table
          noDataText="暂无任何商品"
          :data="validCartList"
        >
          <template slot="thead">
            <vs-th></vs-th>
            <vs-th>商品名称</vs-th>
            <vs-th>数量</vs-th>
            <vs-th>运费</vs-th>
            <vs-th>单价</vs-th>
            <vs-th>备注信息</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr
              v-for="(tr, i) in data"
              :key="i"
            >
              <vs-td>
                <el-image
                  class="w-24 h-24 base-shadow radius"
                  fit="contain"
                  :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
                ></el-image>
              </vs-td>
              <vs-td>{{ tr.goods.name }}</vs-td>
              <vs-td>x{{ tr.amount }}</vs-td>
              <vs-td>{{ $numFixed(tr.goods.delivery_charge) }}</vs-td>
              <vs-td class="text-primary font-bold">
                ￥{{ $numFixed(tr.goods.price) }}
              </vs-td>
              <vs-td>
                <vs-input
                  class="w-24"
                  placeholder="填写备注..."
                  v-model="notes[i]"
                />
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <div class="w-full mt-6 mb-3 p-3 text-lg text-primary bg-gray-150 radius">收货信息</div>
        <div class="p-2 text-sm text-gray-600">
          <p>
            收货人： {{ address.receiver }} <br />
            联系电话： {{ address.phone }} <br />
            收货地址： {{ address.address }} <br />
            地址类型： {{ address.type }}
          </p>
        </div>
      </div>
    </div>

    <div class="w-1/3 pl-3">
      <!-- 付款方式 -->
      <div class="mb-5 p-5 radius bg-white">
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

      <!-- 价格明细 -->
      <div class="p-5 radius bg-white">
        <p class="mb-4 text-lg font-bold">账单明细</p>
        <div class="mb-1 flex justify-between items-center text-sm">
          <span class="text-gray-600">{{ validCartList.length }} 件商品</span>
          <span class="font-bold">￥{{ $numFixed(amountPayable) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">运费</span>
          <span class="text-success">
            {{
              typeof deliveryCharges === 'number'
                ? $numFixed(deliveryCharges)
                : deliveryCharges
            }}
          </span>
        </div>
        <vs-divider />
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">应付金额</span>
          <span class="font-bold">￥{{ $numFixed(amountPayable) }}</span>
        </div>
      </div>
      <vs-button
        class="w-full mt-5"
        :disabled="payBtnDisable"
        @click="onPay()"
      >信息无误，确认付款</vs-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartSettle',
  data: () => ({
    notes: [],
    icons: [
      { icon: 'weixinzhifu', label: '微信支付', value: 'weixin' },
      { icon: 'zhifubao', label: '支付宝支付', value: 'zhifubao' },
      { icon: 'yinlian', label: '银行卡支付', value: 'yinlian' },
    ],
    payment: 'huabei', // 支付方式
  }),

  computed: {
    ...mapState('cart', ['address']),
    ...mapGetters('cart', ['validCartList', 'deliveryCharges', 'amountPayable']),
    payBtnDisable() {
      return !((this.validCartList.length > 0) && this.payment && this.address.receiver)
    },
  },

  watch: {
    validCartList: {
      handler(v) {
        v.forEach(() => this.notes.push(''))
      },
      immediate: true,
    },
  },

  methods: {
    onPay() {
      if (this.validCartList.length <= 0) return

      this.$loading(
        async () => {
          const goodsList = this.validCartList.map((el, i) => ({
            amount: el.amount,
            note: this.notes[i],
            name: el.goods.name,
            goods: el.goods._id,
            seller: el.goods.seller._id,
            price: el.goods.price,
            delivery_charge: el.goods.delivery_charge,
          }))
          const body = {
            goods_list: goodsList,
            payment: this.payment,
            address: this.address,
            total_price: this.amountPayable,
            actual_price: this.amountPayable,
          }

          const { code, data } = await this.$store.dispatch('createOrder', body)

          if (code === 2000) {
            await this.$store.dispatch('cart/clearCartList')
            this.$store.commit('cart/SET_ORDER_ID', data.order_id)
            this.$emit('switchComponent', {
              currentStep: 3,
              currentComponent: 'CartSuccess',
              isActive: true,
            })
          } else {
            throw new Error()
          }
        },
        {
          container: '.main',
          scale: 1,
          text: '正在结算，请稍等...',
        },
        null,
        () => {
          this.$emit('switchComponent', {
            currentStep: 3,
            currentComponent: 'CartFail',
            isActive: true,
          })
        },
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.con-vs-radio {
  justify-content: start;
}
</style>
