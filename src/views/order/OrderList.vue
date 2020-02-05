<template>
  <div>
    <table class="order-list">
      <thead>123456</thead>
      <tbody>
        <div
          class="mb-6 radius light-shadow bg-white overflow-hidden"
          v-for="order in orderList"
          :key="order._id"
        >
          <div class="px-4 py-3 text-sm text-gray-600 bg-gray-150">
            <div class="mb-2">
              <span class="mr-4">
                {{ $dayjs(order.created_at).format('YYYY-MM-DD HH:ss') }}
              </span>
              <span>订单号：</span>
              <span class="text-gray-500 cursor-pointer hover:text-blue-500 transition">
                {{ order._id }}
              </span>
            </div>
            <div v-if="order.sub_order.length > 1">
              <span>收货人：</span>
              <span class="mr-6">{{ order.address.receiver }}</span>
              <span>订单总额：</span>
              <span class="mr-6">￥{{ Number(order.total_price).toFixed(2) }}</span>
              <span>支付方式：</span>
              <span>{{ payment[order.payment] }}</span>
            </div>
          </div>

          <template v-for="sub in order.sub_order">
            <div
              v-if="order.sub_order.length > 1"
              class="px-4 py-2 text-sm text-gray-500 bg-gray-100"
              :key="sub._id"
            >
              <span>{{ $dayjs(sub.created_at).format('YYYY-MM-DD HH:ss') }}</span>
              <span class="ml-8">订单号：</span>
              <span :title="sub._id">{{ (sub._id).substr(0, 8) }}...</span>
            </div>
            <tr
              class="text-gray-500 text-sm"
              v-for="(tr, i) in sub.goods_list"
              :key="tr._id"
            >
              <td class="px-4">
                <div class="flex py-3">
                  <el-image
                    class="mr-2 rounded-lg base-shadow"
                    style="width: 80px; height: 80px"
                    fit="cover"
                    :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
                  ></el-image>
                  <div class="w-56 mr-6 p-2 break-words text-sm">{{ tr.goods.name }}</div>
                </div>
              </td>

              <!-- 数量 -->
              <td>
                <div class="p-1">x{{ tr.amount }}</div>
              </td>

              <!-- 卖家 -->
              <td class="px-4 text-gray-600">
                <el-tooltip content="查看卖家">
                  <div
                    class="cursor-pointer"
                    @click="$router.push({
                      path: '/user-detail',
                      query: {userId: tr.goods.seller._id},
                    })"
                  >
                    @{{ tr.goods.seller.nickname }}
                  </div>
                </el-tooltip>
              </td>

              <!-- 收货人 -->
              <td class="px-4">
                <el-popover
                  trigger="hover"
                  placement="right"
                >
                  <div
                    slot="reference"
                    class="flex-row-center"
                  >
                    <feather
                      class="mr-1"
                      size="18"
                      type="user"
                    ></feather>
                    {{ order.address.receiver }}
                  </div>
                  <div>{{ order.address.receiver }}</div>
                  <div class="my-1">{{ order.address.address }}</div>
                  <div>{{ order.address.phone }}</div>
                </el-popover>
              </td>

              <!-- 支付信息 -->
              <td class="px-4">
                <template v-if="order.sub_order.length > 1">
                  <div>
                    ￥{{ Number(tr.goods.price).toFixed(2) }}
                  </div>
                </template>
                <template v-else>
                  <div>
                    ￥{{ Number(order.total_price).toFixed(2) }}
                  </div>
                  <div>{{ payment[order.payment] }}</div>
                </template>
              </td>

              <!-- 订单状态 -->
              <td class="px-4 py-2 text-right">
                <div
                  class="flex-row-center"
                  :class="`text-${status[sub.status].color}`"
                >
                  <feather
                    class="mr-1"
                    size="18"
                    :type="status[sub.status].icon"
                  ></feather>
                  <div>
                    {{ status[sub.status].text }}
                  </div>
                </div>
                <div
                  v-if="sub.status === 2"
                  class="cursor-pointer"
                >卖了换钱</div>
                <div
                  v-if="sub.status === 2"
                  class="cursor-pointer"
                >评价</div>
              </td>

              <!-- 更多操作 -->
              <!-- <template v-if="sub.goods_list.length > 1"> -->
              <td
                v-if="isMultiItems(sub.goods_list.length, i)"
                class="px-6"
                :rowspan="sub.goods_list.length"
              >
                <el-dropdown>
                  <feather
                    size="20"
                    type="more-horizontal"
                  ></feather>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="$router.push({
                          path: '/order-detail',
                          query: {orderId: order._id, subId: sub._id}
                        })">
                      订单详情
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="sub.status === 1"
                      @click.native="completedOrder(order._id, sub._id, sub.goods_list)"
                    >
                      确认收货
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="sub.status === 1"
                      class="text-danger"
                      @click.native="cancelOrder(order._id, sub._id, sub.goods_list)"
                    >
                      取消订单
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
              <!-- </template> -->
              <!-- <template v-else> -->
              <!-- <td class="px-6">
                <el-dropdown>
                  <feather
                    size="20"
                    type="more-horizontal"
                  ></feather>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="$router.push({
                          path: '/order-detail',
                          query: {orderId: order._id}
                        })">
                      订单详情
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="sub.status === 1"
                      @click.native="cancelOrder(sub._id)"
                    >
                      确认收货
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="sub.status === 1"
                      class="text-danger"
                      @click.native="cancelOrder(order._id, sub._id)"
                    >
                      取消订单
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td> -->
              <!-- </template> -->
            </tr>
          </template>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getOrdersByUser, completedOrder, cancelOrder } from '@/request/api/order'

const status = {
  1: {
    text: '进行中',
    color: 'primary',
    icon: 'chevrons-right',
  },
  2: {
    text: '已完成',
    color: 'success',
    icon: 'check-circle',
  },
  3: {
    text: '派送中',
    color: 'primary',
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
export default {
  name: 'OrderList',
  data: () => ({
    status,
    payment,
    orderList: [],
    pagination: {},
  }),

  created() {
    this.getOrdersByUser()
  },

  methods: {
    async getOrdersByUser() {
      const { code, data } = await getOrdersByUser()
      if (code === 2000) {
        this.orderList = data.order_list
        this.pagination = data.pagination
      }
    },

    isMultiItems(length, index) {
      if (length > 1 && index === 0) {
        return true
      }
      if (length === 1) {
        return true
      }
      return false
    },

    // 完成订单
    async completedOrder(order_id, sub_id, goodsList) {
      const goods_id_list = goodsList.map(el => el.goods._id)
      const { code } = await completedOrder({ order_id, sub_id, goods_id_list })
      if (code === 2000) {
        this.getOrdersByUser()
      }
    },

    // 取消订单
    async cancelOrder(order_id, sub_id, goodsList) {
      const goods_id_list = goodsList.map(el => el.goods._id)
      const { code } = await cancelOrder({ order_id, sub_id, goods_id_list })
      if (code === 2000) {
        this.getOrdersByUser()
      }
    },
  },
}
</script>

<style lang="scss">
.order-list {
  td {
    vertical-align: middle;
  }
}

@mixin setBackground($color) {
  padding: 0.4rem 1rem;
  color: #fff;
  border-radius: 0.5rem;
  background: rgba(var(--vs-#{$color}), 0.8);
  box-shadow: 0 0 10px rgba(var(--vs-#{$color}), 1);
}
.bg-primary-alpha {
  @include setBackground($color: primary);
}
</style>
