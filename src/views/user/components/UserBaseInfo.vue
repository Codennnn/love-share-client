<template>
  <div class="flex">
    <div class="w-8/12">
      <!-- 我发布的 -->
      <div class="p-6 bg-white radius">
        <div class="text-lg font-bold mb-4">我发布的</div>
        <div>
          <vs-table
            pagination
            noDataText="暂无数据"
            :max-items="3"
            :data="publishedGoods"
          >
            <template slot="thead">
              <vs-th>图片</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>价格</vs-th>
              <vs-th>发布于</vs-th>
              <vs-th>最后更新</vs-th>
              <vs-th>状态</vs-th>
              <vs-th>操作</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="tr in data"
                :key="tr._id"
              >
                <vs-td>
                  <el-image
                    class="w-24 h-24 base-shadow radius cursor-pointer"
                    fit="contain"
                    :src="`${tr.img_list[0]}?imageView2/2/w/100`"
                    @click="$router.push({
                      path: '/goods-detail',
                      query: {goodsId: tr._id}
                    })"
                  ></el-image>
                </vs-td>
                <vs-td>
                  <p>{{ tr.name }}</p>
                </vs-td>
                <vs-td class="font-semibold">￥{{ $numFixed(tr.price) }}</vs-td>
                <vs-td>
                  <div class="whitespace-no-wrap">{{ $timeDiff(tr.created_at) }}</div>
                </vs-td>
                <vs-td>
                  <div class="whitespace-no-wrap">{{ $timeDiff(tr.updated_at) }}</div>
                </vs-td>
                <vs-td>
                  <div
                    class="w-16 py-1 px-2 text-center whitespace-no-wrap"
                    style="border-radius: 0.4rem;"
                    :class="[`text-${state[tr.status].color}`]"
                    :style="`background: rgba(var(--vs-${state[tr.status].color}), 0.2);`"
                  >{{ state[tr.status].text }}</div>
                </vs-td>
                <vs-td>
                  <el-dropdown>
                    <i class="el-icon-more text-lg text-gray-600 cursor-pointer"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="viewGoodsDetail(tr._id)">
                        查看主页
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status !== 1 && tr.status !== 3"
                        @click.native="viewOrderDetail(tr._id, tr.buyer)"
                      >
                        订单详情
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status === 1"
                        @click.native="editGoodsInfo(tr._id)"
                      >
                        编辑信息
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status === 1"
                        @click.native="updateGoodsStatus(tr._id, 3)"
                      >
                        下架商品
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status === 3"
                        @click.native="updateGoodsStatus(tr._id, 1)"
                      >
                        重新上架
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status === 3"
                        class="text-danger"
                        @click.native="deleteGoods(tr._id)"
                      >
                        删除发布
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <!-- 我购买的 -->
      <div class="mt-6 p-6 bg-white radius">
        <div class="mb-4 flex items-center justify-between">
          <div class="text-lg font-bold">我购买的</div>
          <div
            class="text-sm text-gray-500 hover:text-gray-600 flex items-center
             transition cursor-pointer"
            @click="$router.push('/order-list')"
          >
            查看历史订单
            <feather
              class="ml-1"
              size="18"
              type="arrow-right"
            ></feather>
          </div>
        </div>
        <div>
          <vs-table
            pagination
            noDataText="暂无数据"
            :max-items="3"
            :data="boughtGoods"
          >
            <template slot="thead">
              <vs-th>图片</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>成交价</vs-th>
              <vs-th>原主人</vs-th>
              <vs-th>购买日期</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td>
                  <el-image
                    class="w-24 h-24 base-shadow radius cursor-pointer"
                    fit="contain"
                    :src="`${tr.img_list[0]}?imageView2/2/w/100`"
                    @click="$router.push({
                      path: '/goods-detail',
                      query: {goodsId: tr._id}
                    })"
                  ></el-image>
                </vs-td>
                <vs-td>{{ tr.name }}</vs-td>
                <vs-td class="font-semibold">￥{{ $numFixed(tr.price) }}</vs-td>
                <vs-td>
                  <el-tooltip content="进入TA的主页">
                    <span
                      class="text-primary cursor-pointer"
                      @click="viewUserDetail(tr.seller._id)"
                    >@{{ tr.seller.nickname }}</span>
                  </el-tooltip>
                </vs-td>
                <vs-td>
                  {{ $dayjs(tr.sell_time).format('YYYY年M月D日') }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>

    <!-- 最近联系人 -->
    <div class="w-4/12 pl-5">
      <div class="p-5 bg-white radius">
        <div class="mb-4">最近联系</div>
        <ul v-if="recentContacts.length > 0">
          <li
            class="mb-3 flex items-center justify-between"
            v-for="(it, i) in recentContacts"
            :key="i"
          >
            <div class="flex items-center">
              <vs-avatar
                class="mr-3"
                size="40px"
                :src="`${it.avatar_url}?imageView2/2/w/50`"
              />
              <div>
                <div class="text-sm">{{ it.nickname }}</div>
                <div
                  class="text-gray-500"
                  style="font-size: 0.7rem;"
                >{{ chatLastMessaged(it._id) }}</div>
              </div>
            </div>
            <vs-button
              radius
              color="primary"
              type="border"
              icon-pack="el-icon"
              icon="el-icon-user"
              @click="viewUserDetail(it._id)"
            ></vs-button>
          </li>
          <li
            v-if="recentContacts.length >= 10"
            class="text-center"
          >
            <vs-button class="text-sm w-2/3">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </vs-button>
          </li>
        </ul>
        <div
          class="text-gray-600 text-center text-sm"
          v-else
        >暂无最近联系人</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPublishedGoods, getBoughtGoods } from '@/request/api/user'
import { cancelOrder, getOrderId } from '@/request/api/order'
import { updateManyGoods, deleteGoods } from '@/request/api/goods'

const state = {
  undefined: { color: 'dark', text: '未定义' },
  1: { color: 'warning', text: '待出售' },
  2: { color: 'primary', text: '进行中' },
  3: { color: 'danger', text: '已下架' },
  4: { color: 'success', text: '已出兽' },
  5: { color: 'primary', text: '派送中' },
}
export default {
  name: 'UserBaseInfo',
  data: () => ({
    state,
    publishedGoods: [], // 已发布商品
    boughtGoods: [], // 已购买商品
  }),

  computed: {
    recentContacts() {
      const contactList = this.$store.getters['chat/getContactList']
      return contactList.slice(0, 10)
    },
  },

  activated() {
    this.getPublishedGoods()
    this.getBoughtGoods()
    this.$store.dispatch('chat/getContactList')
  },

  methods: {
    // 获取发布的商品
    async getPublishedGoods() {
      const { code, data } = await getPublishedGoods()
      if (code === 2000) {
        this.publishedGoods = data.published_goods
      }
    },

    // 获取购买的商品
    async getBoughtGoods() {
      const { code, data } = await getBoughtGoods()
      if (code === 2000) {
        this.boughtGoods = data.bought_goods
      }
    },

    // 最后的联系时间
    chatLastMessaged(id) {
      const time = this.$dayjs(this.$store.getters['chat/chatLastMessaged'](id)?.time)
      const year = this.$dayjs().year()
      if (year === time.year()) {
        return time.format('M月DD日')
      }
      return time.format('YYYY年M月DD日 HH:mm')
    },

    viewGoodsDetail(goodsId) {
      this.$router.push({
        path: '/goods-detail',
        query: { goodsId },
      })
    },

    viewUserDetail(userId) {
      this.$router.push({
        path: '/user-detail',
        query: { userId },
      })
    },

    // 查看订单详情
    async viewOrderDetail(goods_id, buyer) {
      const { code, data: { order_id, sub_id } } = await getOrderId({ goods_id, buyer })
      if (code === 2000) {
        this.$router.push({
          path: '/order-detail',
          query: { orderId: order_id, subId: sub_id },
        })
      }
    },

    editGoodsInfo(goodsId) {
      this.$router.push({
        path: '/goods-edit',
        query: { goodsId },
      })
    },

    // 更新商品的状态
    async updateGoodsStatus(id, status) {
      const { code } = await updateManyGoods({
        goods_id_list: [id],
        status,
      })
      if (code === 2000) {
        this.getPublishedGoods()
      }
    },

    // 更新商品的状态
    async deleteGoods(goods_id) {
      const { code } = await deleteGoods({ goods_id })
      if (code === 2000) {
        this.getPublishedGoods()
      }
    },

    async cancelOrder(id) {
      const { code } = await cancelOrder({ goods_id: id })
      if (code === 2000) {
        this.getBoughtGoods()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-con-table::v-deep {
  .vs-table--thead {
    color: rgb(150, 150, 150);
  }
}
</style>
