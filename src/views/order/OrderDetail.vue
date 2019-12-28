<template>
  <div
    id="div-with-loading"
    class="main vs-con-loading__container"
  >
    <div v-if="detail">
      <div class="card">
        <div class="card-header">
          <p class="mr-3">
            订单号：
            <span class="text-base text-gray-500">{{ detail._id }}</span>
          </p>
          <el-tooltip
            content="复制订单号"
            effect="light"
          >
            <i
              class="el-icon-copy-document text-gray-500 cursor-pointer"
              style="font-size: 20px;"
              v-clipboard:copy="detail._id"
              v-clipboard:success="onCopy"
            ></i>
          </el-tooltip>
        </div>
        <vs-divider />
        <div>
          <!-- 订单信息 -->
          <div class="order-info">
            <div class="order-info__col">
              <div class="order-info__item">
                <div class="label">订单状态</div>
                <div class="value">
                  <vs-chip :color="status[detail.status].color">
                    <i :class="[status[detail.status].icon, 'mr-2 text-lg']"></i>
                    {{ status[detail.status].text }}
                  </vs-chip>
                </div>
              </div>
              <div class="order-info__item">
                <div class="label">收货人</div>
                <div class="value">{{ detail.address.receiver }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">联系电话</div>
                <div class="value">{{ detail.address.phone }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">收货地址</div>
                <div class="value">{{ detail.address.address }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="order-info__item">
                <div class="label">创建时间</div>
                <div class="value">
                  {{ $dayjs(detail.created_at).format('YYYY-MM-DD hh:mm:ss') }}
                </div>
              </div>
              <div class="order-info__item">
                <div class="label">发货时间</div>
                <div class="value">
                  {{ $dayjs(detail.created_at).format('YYYY-MM-DD hh:mm:ss') }}
                </div>
              </div>
              <div class="order-info__item">
                <div class="label">支付方式</div>
                <div class="value">{{ payment[detail.payment] }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="order-info__item">
                <div class="label">买家留言</div>
                <div class="value">{{ detail.note || '无备注' }}</div>
              </div>
            </div>
          </div>

          <!-- 所购商品表格 -->
          <div class="py-6">
            <vs-table
              noDataText="暂无数据"
              :data="goodsList"
            >
              <template slot="header">
                <div class="p-4">购物清单</div>
              </template>
              <template slot="thead">
                <vs-th>#</vs-th>
                <vs-th>商品名称</vs-th>
                <vs-th>数量</vs-th>
                <vs-th>价格</vs-th>
                <vs-th>物流</vs-th>
                <!-- <vs-th>商品详情</vs-th> -->
              </template>

              <template slot-scope="{data}">
                <vs-tr
                  v-for="(tr, i) in data"
                  :key="i"
                >
                  <vs-td>
                    <el-image
                      class="rounded-lg border-gray-500 cursor-pointer"
                      style="width: 80px; height: 80px"
                      fit="cover"
                      :src="`${tr.goods.img_list[0]}?imageView2/2/w/130`"
                      @click="showViewer = true, urlList = tr.goods.img_list"
                    >
                    </el-image>
                  </vs-td>
                  <vs-td>{{ tr.goods.name }}</vs-td>
                  <vs-td>1</vs-td>
                  <vs-td>￥{{ tr.goods.price }}</vs-td>
                  <vs-td :data="tr.goods">
                    <vs-button
                      size="small"
                      type="border"
                    >物流信息</vs-button>
                    <template slot="edit">
                      <div class="w-full p-2 overflow-auto">
                        <el-steps align-center>
                          <el-step title="下单成功">
                            <div slot="description">
                              <p>等待发货</p>
                              {{ $dayjs(tr.goods.sell_time).format('YY/MM/DD hh:mm') }}
                            </div>
                          </el-step>
                          <el-step title="已发货">
                            <div slot="description">
                              <p>等待快递揽件</p>
                              {{ $dayjs(tr.goods.sell_time).format('YYYY/MM/DD hh:mm') }}
                            </div>
                          </el-step>
                        </el-steps>
                      </div>
                    </template>
                  </vs-td>
                  <!-- <vs-td>
                    <i
                      title="查看详情"
                      class="el-icon-goods ml-3 p-2 text-xl cursor-pointer"
                      @click.stop="$router.push({
                                    path: '/goods-detail',
                                    query: { goodsId: tr.goods._id }
                                  })"
                    ></i>
                  </vs-td> -->
                </vs-tr>
              </template>
            </vs-table>
            <el-image-viewer
              v-show="showViewer"
              :on-close="() => showViewer = false"
              :url-list="urlList"
            />
          </div>
          <div class="flex flex-col items-end">
            <div class="mr-1">已付款</div>
            <div class="price">￥{{ Number(detail.total_price).toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <p>交易流程</p>
        </div>
        <vs-divider />
        <OrderStep :step="detail.step" />
      </div>

      <div
        v-if="detail.buyer"
        class="card"
      >
        <div class="card-header">
          <p>买家信息</p>
        </div>
        <vs-divider />
        <div class="user-info">
          <div class="user-info__col">
            <div class="user-info__item">
              <div class="label">用户昵称</div>
              <div class="value">{{ detail.buyer.nickname }}</div>
            </div>
          </div>
          <div class="user-info__col">
            <div class="user-info__item">
              <div class="label">用户姓名</div>
              <div class="value">{{ detail.buyer.real_name }}</div>
            </div>
          </div>
          <div class="user-info__col">
            <div class="user-info__item">
              <div class="label">联系方式</div>
              <div class="value">{{ detail.buyer.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
import OrderStep from './components/OrderStep.vue'

import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderDetail',
  components: { ElImageViewer, OrderStep },

  data() {
    return {
      showViewer: false,
      urlList: [],
      detail: null,
      text: '123',
      orderID: '',
      goodsList: [],
      status: {
        1: {
          text: '进行中',
          color: 'primary',
          icon: 'el-icon-loading',
        },
        2: {
          text: '已完成',
          color: 'success',
          icon: 'el-icon-check',
        },
        3: {
          text: '已取消',
          color: 'danger',
          icon: 'el-icon-close',
        },
      },
      payment: {
        huabei: '余额支付',
        weixin: '微信支付',
        zhifubao: '支付宝支付',
        yinlian: '银行卡支付',
      },
    }
  },

  mounted() {
    this.orderId = this.$route.query.orderId
    this.getOrderDetail(this.orderId)
  },

  methods: {
    async getOrderDetail(order_id) {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        const { code, data: { order_detail } } = await getOrderDetail({ order_id })
        if (code === 2000) {
          if (order_detail) {
            this.detail = order_detail
            this.goodsList = order_detail.goods_list
          } else {
            this.$router.replace('/not-found')
          }
        }
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },

    onCopy(e) {
      this.$message(`已复制订单编号：${e.text}  🎉`)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  .card-header {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }
}

.order-info,
.user-info {
  display: flex;
  .order-info__col,
  .user-info__col {
    width: 33.33%;
  }
  .order-info__item,
  .user-info__item {
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

.price {
  color: rgba(var(--vs-success), 1);
  font-size: 30px;
  font-weight: bold;
}
</style>
