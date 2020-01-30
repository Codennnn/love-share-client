<template>
  <div class="flex">
    <div class="w-8/12">
      <!-- 我发布的 -->
      <div class="p-6 bg-white rounded-lg">
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
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td>
                  <vs-image
                    class="w-24 h-24 base-shadow"
                    :src="`${tr.img_list[0]}?imageView2/2/w/100`"
                  ></vs-image>
                </vs-td>
                <vs-td>
                  <p>{{ tr.name }}</p>
                </vs-td>
                <vs-td class="font-semibold">￥{{ Number(tr.price).toFixed(2) }}</vs-td>
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
                    :class="[`text-${status[tr.status].color}`]"
                    :style="`background: rgba(var(--vs-${status[tr.status].color}), 0.2);`"
                  >{{ status[tr.status].text }}</div>
                </vs-td>
                <vs-td>
                  <el-dropdown>
                    <i class="el-icon-more text-lg text-gray-600 cursor-pointer"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="viewGoodsDetail(tr._id)">
                        查看主页
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status !== 2"
                        @click.native="editGoodsInfo(tr._id)"
                      >
                        编辑信息
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="tr.status === 1"
                        @click.native="updateManyGoods(tr._id, 3)"
                      >
                        下架商品
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-else
                        @click.native="updateManyGoods(tr._id, 1)"
                      >
                        重新上架
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
      <div class="mt-6 p-6 bg-white rounded-lg">
        <div class="text-lg font-bold mb-4">我购买的</div>
        <div>
          <vs-table
            pagination
            noDataText="暂无数据"
            :max-items="3"
            :data="purchasedGoods"
          >
            <template slot="thead">
              <vs-th>图片</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>成交价</vs-th>
              <vs-th>数量</vs-th>
              <vs-th>原主人</vs-th>
              <vs-th>购买日期</vs-th>
              <vs-th>操作</vs-th>
            </template>

            <template slot-scope="{data}">
              <template v-for="order in data">
                <vs-tr
                  v-for="(tr, i) in order.goods_list"
                  :key="i"
                >
                  <vs-td>
                    <vs-image
                      class="w-24 h-24 base-shadow"
                      :src="`${tr.goods.img_list[0]}?imageView2/2/w/100`"
                    ></vs-image>
                  </vs-td>
                  <vs-td>{{ tr.goods.name }}</vs-td>
                  <vs-td class="font-semibold">￥{{ Number(tr.goods.price).toFixed(2) }}</vs-td>
                  <vs-td>{{ tr.amount }}</vs-td>
                  <vs-td
                    title="查看用户"
                    class="text-primary cursor-pointer"
                    @click.native="viewUserDetail(tr.goods.seller._id)"
                  >
                    @{{ tr.goods.seller.nickname }}
                  </vs-td>
                  <vs-td>
                    {{ $dayjs(tr.goods.sell_time).format('YYYY-MM-DD') }}
                  </vs-td>
                  <vs-td>
                    <el-dropdown>
                      <i class="el-icon-more text-lg text-gray-600 cursor-pointer"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native.stop="viewOrderDetail(order._id)">
                          查看订单
                        </el-dropdown-item>
                        <el-dropdown-item>下架商品</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </vs-td>
                </vs-tr>
              </template>
            </template>
          </vs-table>
        </div>
      </div>
    </div>

    <!-- 最近联系人 -->
    <div class="w-4/12 pl-5">
      <div class="p-5 bg-white rounded-lg">
        <div class="mb-4 text-gray-700">最近联系</div>
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
import { getPublishedGoods } from '@/request/api/user'
import { getOrdersByUser } from '@/request/api/order'
import { updateManyGoods } from '@/request/api/goods'

export default {
  name: 'UserBaseInfo',
  data: () => ({
    publishedGoods: [], // 已发布商品
    purchasedGoods: [], // 已购买商品
    status: {
      1: {
        color: 'warning',
        text: '待出售',
      },
      2: {
        color: 'primary',
        text: '已出售',
      },
      3: {
        color: 'danger',
        text: '已下架',
      },
    },
  }),

  computed: {
    recentContacts() {
      const { contactList } = this.$store.state.chat
      return JSON.parse(JSON.stringify(contactList)).reverse().slice(0, 10)
    },
  },

  activated() {
    this.getPublishedGoods()
    this.getOrdersByUser()
  },

  methods: {
    async getPublishedGoods() {
      const { code, data } = await getPublishedGoods()
      if (code === 2000) {
        this.publishedGoods = data.published_goods
      }
    },

    async getOrdersByUser() {
      const { code, data } = await getOrdersByUser()
      if (code === 2000) {
        this.purchasedGoods = data.list
      }
    },

    chatLastMessaged(id) {
      return this.$dayjs(this.$store.getters['chat/chatLastMessaged'](id)?.time).format('YY/MM/DD HH:mm')
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

    viewOrderDetail(orderId) {
      this.$router.push({
        path: '/order-detail',
        query: { orderId },
      })
    },

    editGoodsInfo(goodsId) {
      this.$router.push({
        path: '/goods-edit',
        query: { goodsId },
      })
    },

    async updateManyGoods(id, status) {
      const { code } = await updateManyGoods({
        goods_id_list: [id],
        status,
      })
      if (code === 2000) {
        this.getPublishedGoods()
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
