<template>
  <div
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <div>
      <!-- 订单进度 -->
      <div class="card flex items-center">
        <div class="text-sm">
          <p class="mr-3">
            订单号：
            <span class="text-gray-500">{{ subOrder._id }}</span>
          </p>
          <div
            class="p-6 flex-col-center text-2xl font-bold"
            :class="`text-${status[subOrder.status].color}`"
          >
            <feather
              class="ml-1 mb-1"
              size="30"
              :type="status[subOrder.status].icon"
            ></feather>
            {{ status[subOrder.status].text }}
          </div>
        </div>
        <div class="flex-1">
          <OrderStep :steps-data="stepsData" />
        </div>
      </div>

      <!-- 所购商品表格 -->
      <div class="card">
        <div class="card-header">购物清单</div>
        <div class="mt-6 flex">
          <OrderGoodsList
            class="w-2/3"
            :goods-list="goodsList"
          />
          <VuePerfectScrollbar
            class="w-1/3"
            style="height: 300px;"
            :settings="{
              maxScrollbarLength: 160,
              wheelSpeed: 0.60,
            }"
          >
            <el-timeline :reverse="true">
              <el-timeline-item
                v-for="(lo, i) in logistics"
                :key="i"
                :timestamp="lo.timestamp"
              >
                {{ lo.content }}
              </el-timeline-item>
            </el-timeline>
          </VuePerfectScrollbar>
        </div>
      </div>

      <!-- 交易信息 -->
      <div class="card">
        <div class="card-header">
          <p>交易信息</p>
        </div>
        <vs-divider />
        <div>
          <!-- 订单信息 -->
          <div class="order-info">
            <div class="order-info__col">
              <div class="info__item">
                <div class="label">收货人</div>
                <div class="value">{{ address.receiver }}</div>
              </div>
              <div class="info__item">
                <div class="label">联系电话</div>
                <div class="value">{{ address.phone }}</div>
              </div>
              <div class="info__item">
                <div class="label">收货地址</div>
                <div class="value">{{ address.address }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="info__item">
                <div class="label">配送方式</div>
                <div
                  v-if="subOrder.goods_list"
                  class="value"
                >{{ delivery[subOrder.goods_list[0].goods.delivery] }}</div>
              </div>
              <div class="info__item">
                <div class="label">运费</div>
                <div class="value">￥{{ Number(subOrder.delivery_charge).toFixed(2) }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="info__item">
                <div class="label">支付方式</div>
                <div class="value">{{ payment[detail.payment] }}</div>
              </div>
              <div class="info__item">
                <div class="label">支付时间</div>
                <div class="value">
                  {{ $dayjs(subOrder.created_at).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>
              <div class="info__item">
                <div class="label">商品总额</div>
                <div class="value">
                  ￥{{ Number(subOrder.total_price).toFixed(2) }}
                </div>
              </div>
              <div class="info__item">
                <div class="label">应付金额</div>
                <div class="value">
                  ￥{{ Number(subOrder.actual_price).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import OrderStep from './components/OrderStep.vue'
import OrderGoodsList from './components/OrderGoodsList.vue'

import { getOrderDetail } from '@/request/api/order'

const delivery = {
  undefined: '未定义',
  1: '包邮',
  2: '自费',
  3: '自提',
}
const status = {
  undefined: {
    text: 'Undefined',
    color: 'danger',
    icon: 'alert-circle',
  },
  1: {
    text: '进行中',
    color: 'primary',
    icon: 'loader',
  },
  2: {
    text: '已完成',
    color: 'success',
    icon: 'check-circle',
  },
  3: {
    text: '派送中',
    color: 'warning',
    icon: 'truck',
  },
  4: {
    text: '已取消',
    color: 'danger',
    icon: 'alert-circle',
  },
}
const payment = {
  huabei: '余额支付',
  weixin: '微信支付',
  zhifubao: '支付宝支付',
  yinlian: '银行卡支付',
}
const logistics = [
  { timestamp: '2018-04-12 14:46', content: '您提交了订单，请等待系统确认' },
  { timestamp: '2018-04-15 20:50', content: '温馨提示：该订单为赠品/换购商品订单，为方便您收货，会随主品订单一起发货，请您耐心等待' },
  { timestamp: '2018-04-16 08:50', content: '您的订单正在配送途中（快递员：李易，电话：18680649330），请您耐心等待。' },
  { timestamp: '2018-04-16 08:50', content: '您的订单已由物业代收。如有疑问您可以联系配送员【李易，18680649330】确认。感谢您在京东购物，欢迎再次光临。' },
]
export default {
  name: 'OrderDetail',
  components: { VuePerfectScrollbar, OrderStep, OrderGoodsList },

  data: () => ({
    delivery,
    status,
    payment,
    logistics,
    detail: {},
    address: {},
    subOrder: {},
    text: '123',
    goodsList: [],
    stepsData: {},
  }),

  mounted() {
    const { orderId, subId } = this.$route.query
    this.getOrderDetail(orderId, subId)
  },

  methods: {
    async getOrderDetail(order_id, sub_id) {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        const { code, data: { order_detail } } = await getOrderDetail({ order_id, sub_id })
        if (code === 2000) {
          if (order_detail) {
            this.detail = order_detail
            this.address = order_detail.address
            this.subOrder = order_detail.sub_order
            this.goodsList = order_detail.sub_order.goods_list
            this.initStepsData()
          } else {
            this.$router.replace('/not-found')
          }
        }
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },

    initStepsData() {
      const active = {
        1: 2,
        2: 4,
        3: 3,
        4: 4,
      }
      const { createdAt, status: state } = this.subOrder
      const time = this.$dayjs(createdAt).format('YYYY-MM-DD HH:ss')
      let extend = []
      if (state === 2) {
        extend = [
          { title: '订单已完成', description: time },
        ]
      }
      if (state === 4) {
        extend = [
          { title: '订单已取消', description: time },
        ]
      }
      const steps = [
        { title: '创建订单', description: time },
        { title: '支付成功', description: time },
        { title: '等待收货', description: '' },
        ...extend,
      ]
      console.log(steps)
      this.stepsData = {
        active: active[state],
        steps,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin-bottom: 1.8rem;
  padding: 1.4rem;
  border-radius: $large-radius;
  background: #fff;
  overflow: hidden;
  .card-header {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
}

.order-info {
  display: flex;
  .order-info__col {
    width: 33.33%;
  }
  .info__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .label {
    width: 28%;
    color: #a0a0a0;
    font-size: 15px;
  }
  .value {
    width: 66%;
    font-size: 15px;
  }
}
</style>
