<template>
  <div class="flex pt-4">
    <!-- 左侧 -->
    <div class="pr-8">
      <div class="mb-6 py-4 px-6 radius text-center bg-white">
        <div class="type-select ml-4 relative">
          <div class="relative z-50 flex">
            <div
              class="icon-block flex-row-center cursor-pointer"
              v-for="(it, i) in icons"
              :key="i"
              :title="icons[i].text"
              @click="changeOrderType(i)"
            >
              <feather
                style="transition: all 0.4s;"
                size="20"
                :type="it.type"
                :class="{'text-white': i === current}"
              ></feather>
            </div>
          </div>
          <div
            class="absolute bottom-0 color-block transition"
            :class="`bg-${color}`"
            :style="`transform: translateX(${translateX}rem)`"
          >
            <svg
              v-for="(it, i) in ['round-left', 'round-right']"
              :key="i"
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              viewBox="0 0 160 160"
              class="round"
              :class="[it, `round-${color}`]"
            >
              <path
                id="Trazado_200"
                data-name="Trazado 200"
                d="M0-10,150,0l10,150S137.643,80.734,100.143,43.234,0-10,0-10Z"
                transform="translate(0 10)"
              ></path>
            </svg>
          </div>
        </div>
        <div
          class="content w-48 h-12 radius flex-row-center text-white transition"
          :class="`bg-${color}`"
        >{{ icons[current].text }}</div>
      </div>

      <ul class="p-4 bg-white radius">
        <li
          class="mb-5 text-xl"
          v-for="(menu, i) in menus"
          :key="i"
        >
          <h4 class="mb-1">{{ menu.title }}</h4>
          <ul>
            <li
              class="mb-1 text-sm text-gray-600 cursor-pointer"
              v-for="it in menu.items"
              :key="it.text"
            >
              {{ it.text }}
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 右侧 -->
    <div class="flex-1">
      <table
        v-if="orderFilterList.length > 0"
        class="order-list"
      >
        <tbody>
          <div
            class="mb-6 radius light-shadow bg-white overflow-hidden"
            v-for="order in orderFilterList"
            :key="order._id"
          >
            <div class="px-4 py-3 text-sm text-gray-600 bg-gray-150">
              <div class="mb-2">
                <span class="mr-4">
                  {{ $dayjs(order.created_at).format('YYYY-MM-DD HH:mm') }}
                </span>
                <span>订单号：</span>
                <span class="text-gray-500 cursor-pointer hover:text-blue-500 transition">
                  {{ order._id }}
                </span>
              </div>
              <div
                v-if="order.sub_order.length > 1"
                class="flex"
              >
                <span>收货人：</span>
                <span class="mr-6">{{ order.address.receiver }}</span>
                <span>订单总额：</span>
                <span class="mr-6">￥{{ $numFixed(order.total_price) }}</span>
                <span>支付方式：</span>
                <span class="mr-6">{{ payment[order.payment] }}</span>
                <el-popover
                  v-if="order.split_info"
                  trigger="hover"
                  class="ml-auto cursor-pointer"
                >
                  <span slot="reference">订单已拆分</span>
                  <div class="w-56">
                    <div class="mb-1">
                      <span>拆分时间：</span>
                      <span>
                        {{ $dayjs(order.split_info.created_at).format('YYYY-MM-DD HH:mm') }}
                      </span>
                    </div>
                    <div>
                      <span>拆分原因：</span>
                      <span>{{ order.split_info.reason }}</span>
                    </div>
                  </div>
                </el-popover>
              </div>
            </div>

            <template v-for="sub in order.sub_order">
              <div
                v-if="order.sub_order.length > 1"
                class="px-4 py-2 text-sm text-gray-500 bg-gray-100"
                :key="sub._id"
              >
                <span class="mr-6">
                  {{ $dayjs(sub.created_at).format('YYYY-MM-DD HH:mm') }}
                </span>
                <span>订单号：</span>
                <span
                  class="mr-6"
                  :title="sub._id"
                >{{ (sub._id).substr(0, 8) }}...</span>
                <span>总额：</span>
                <span class="mr-6">{{ $numFixed(sub.total_price) }}</span>
              </div>
              <tr
                class="text-gray-500 text-sm"
                v-for="(tr, i) in sub.goods_list"
                :key="tr._id"
              >
                <td class="px-4">
                  <div class="flex py-3">
                    <el-image
                      class="mr-2 radius base-shadow cursor-pointer"
                      style="width: 80px; height: 80px"
                      fit="contain"
                      :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
                      @click="$router.push({
                      path: '/goods-detail',
                      query: {goodsId: tr.goods._id}
                    })"
                    ></el-image>
                    <div class="w-48 p-2 break-words text-sm">{{ tr.goods.name }}</div>
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
                      ￥{{ $numFixed(tr.goods.price) }}
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      ￥{{ $numFixed(order.total_price) }}
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
                </td>

                <!-- 更多操作 -->
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
                        @click.native="cancelOrder(order._id, sub._id, sub.goods_list,
                       tr.goods.seller._id)"
                      >
                        取消订单
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="sub.status === 2"
                        @click.native="postComment(order._id, sub._id,)"
                      >
                        评价
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </td>
              </tr>
            </template>
          </div>
        </tbody>
      </table>

      <div
        v-else
        class="py-4 flex-col-center text-gray-500"
      >
        <el-image
          fit="cover"
          src="https://gitee.com/chinesee/images/raw/master/img/img_016.png"
        ></el-image>
        <p>什么都没有 (´；ω；`)</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrdersByUser, completedOrder, cancelOrder } from '@/request/api/order'

const icons = [
  { type: 'credit-card', color: 'primary', text: '全部订单' },
  { type: 'dollar-sign', color: 'success', text: '待付款' },
  { type: 'truck', color: 'warning', text: '待收货' },
  { type: 'edit-3', color: 'danger', text: '待评价' },
]
const menus = [
  {
    title: '特色业务',
    items: [
      { text: '我的回收单' },
      { text: '我的拍卖' },
      { text: '定期购' },
      { text: '营业厅' },
    ],
  },
  {
    title: '客户服务',
    items: [
      { text: '价格保护' },
      { text: '意见建议' },
      { text: '交易纠纷' },
      { text: '举报中心' },
    ],
  },
]
const status = {
  undefined: {
    text: 'Undefined',
    color: 'danger',
    icon: 'alert-circle',
  },
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
    icons,
    menus,
    status,
    payment,

    color: 'primary',
    current: 0,
    translateX: 0,

    orderList: [],
    pagination: {},
  }),

  computed: {
    orderFilterList() {
      if (this.current === 0) {
        return this.orderList
      }
      if (this.current === 1) {
        return this.orderList.filter(el => el.sub_order.some(or => or.status === 5))
      }
      if (this.current === 2) {
        return this.orderList.filter(el => el.sub_order.some(or => or.status === 3))
      }
      if (this.current === 3) {
        return this.orderList.filter(el => el.sub_order.some(or => or.status === 2))
      }
      return []
    },
  },

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

    // 切换订单查询类型
    changeOrderType(i) {
      this.current = i
      this.color = this.icons[i].color
      this.translateX = i * 2.5
    },

    // 子订单是否有多个商品
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
    async cancelOrder(order_id, sub_id, goodsList, seller_id) {
      const goods_id_list = goodsList.map(el => el.goods._id)
      const { code } = await cancelOrder({
        order_id, sub_id, goods_id_list, seller_id,
      })
      if (code === 2000) {
        this.getOrdersByUser()
      }
    },

    // 评论订单
    async postComment(orderId, subId) {
      this.$router.push({
        path: '/order-evaluation',
        query: { orderId, subId },
      })
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

$opacity: 0.9;
.type-select {
  $wh: 2.5rem;
  .icon-block {
    width: $wh;
    height: $wh;
  }
  .color-block {
    width: $wh;
    height: $wh;
    border-radius: 10px 10px 0 0;
    opacity: $opacity;
  }
  .round {
    position: absolute;
    bottom: -1px;
    z-index: 50;
    width: 10px;
    height: 10px;
    opacity: $opacity;
    @each $color in primary, success, warning, danger {
      &.round-#{$color} {
        fill: rgba(var(--vs-#{$color}), 1);
      }
    }
    &.round-left {
      left: -8px;
      transform: rotate(90deg);
    }
    &.round-right {
      right: -8px;
      transform: rotate(180deg);
    }
  }
}
.content {
  opacity: $opacity;
}

.table-thead {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    width: 2rem;
    height: 0.25rem;
    border-radius: 1rem;
    background: $primary;
    transition: all 0.3s;
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
