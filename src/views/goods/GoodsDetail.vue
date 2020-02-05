<template>
  <div class="flex flex-wrap">
    <!-- 左侧 -->
    <div class="left">
      <!-- 商品信息 -->
      <DetailInfo
        :goods="goods"
        :goodsId="goodsId"
        :seller-id="seller._id"
        @setAmount="(e) => amount = e"
        @settle="isSidebarActive = true"
      />
    </div>

    <!-- 右侧 -->
    <div class="right">
      <!-- 卖家信息 -->
      <DetailUser :seller="seller" />

      <!-- 商品评论 -->
      <DetailComment
        class="mt-6"
        :comments="comments"
        :goodsId="goodsId"
        :owner="seller._id"
        :total="pagination.total"
        @refreshComments="getGoodsComments()"
        @switchPage="(page) => { getGoodsComments(page) }"
      />
    </div>

    <vs-sidebar
      spacer
      click-not-close
      position-right
      hidden-background
      parent="body"
      default-index="1"
      color="primary"
      class="sidebar-main"
      v-model="isSidebarActive"
    >
      <div
        id="sidebar-container"
        class="h-full vs-con-loading__container"
      >
        <div
          class="flex items-center justify-between px-6"
          style="height: 3.5rem;"
        >
          <span class="text-lg">购买信息</span>
          <i
            class="el-icon-close text-2xl font-bold cursor-pointer"
            @click.stop="isSidebarActive = false"
          ></i>
        </div>
        <vs-divider class="my-0"></vs-divider>

        <VuePerfectScrollbar
          class="scroll-area overflow-hidden"
          :settings="{
            maxScrollbarLength: 180,
            wheelSpeed: 0.60,
          }"
        >
          <div class="p-8">
            <!-- 信息 -->
            <div class="mb-8">
              <p class="text-sm text-gray-600">商品名称</p>
              <p class="mb-4 text-lg font-bold">{{ goods.name }}</p>
              <p class="text-sm text-gray-600">商品价格</p>
              <p class="mb-4 text-lg font-bold">￥{{ Number(goods.price).toFixed(2) }}</p>
              <p class="text-sm text-gray-600">购买数量</p>
              <p class="mb-4 text-lg font-bold">{{ amount }}件</p>
              <p class="text-sm text-gray-600">
                收货信息
                <span
                  v-if="addressList.length > 0"
                  class="ml-2 cursor-pointer"
                  style="color: rgba(var(--vs-primary), 1);"
                  @click="showPopup = true"
                >选择地址</span>
                <span
                  v-else
                  class="ml-2 cursor-pointer"
                  style="color: rgba(var(--vs-primary), 1);"
                  @click="$router.push('/user-center')"
                >添加地址</span>
              </p>
              <div class="mb-4 p-2 text-sm text-gray-600 bg-gray-100 rounded-lg">
                <p>
                  <i class="el-icon-user"></i>
                  {{ currAddr.receiver }}
                </p>
                <p>
                  <i class="el-icon-phone-outline"></i>
                  {{ currAddr.phone }}
                </p>
                <p>
                  <i class="el-icon-location-information"></i>
                  {{ currAddr.address }}
                </p>
              </div>
            </div>
            <!-- 支付方式 -->
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
              <vs-divider border-style="dashed" />
              <li
                class="mb-2"
                v-for="(item, index) in icons"
                :key="index"
              >
                <vs-radio
                  class="text-left"
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
              <vs-divider border-style="dashed" />
              <li class="text-gray-600">
                <span class="cursor-pointer">
                  <i class="el-icon-plus"></i>
                  <span class="ml-1 text-sm">添加银行卡</span>
                </span>
              </li>
            </ul>
          </div>
        </VuePerfectScrollbar>

        <div
          slot="footer"
          class="footer flex items-center text-sm"
          style="height: 4rem;"
        >
          <vs-button
            class="ml-4"
            type="flat"
            color="danger"
            @click="isSidebarActive = false"
          >关闭</vs-button>
          <vs-button
            class="w-1/3 ml-auto mr-6"
            :disabled="payBtndisabled"
            @click="onPay()"
          >确认并付款</vs-button>
        </div>
      </div>
    </vs-sidebar>

    <!-- 选择地址弹出框 -->
    <vs-popup
      title="选择收货地址"
      :active.sync="showPopup"
    >
      <ul>
        <li
          class="mb-3 px-10"
          v-for="(it, i) in addressList"
          :key="i"
        >
          <div class="px-2 flex justify-between items-start">
            <vs-chip>{{ it.type }}</vs-chip>
            <div class="flex-1 ml-2">
              <span class="mr-3 text-lg">{{ it.receiver }}</span>
              <span>{{ it.phone }}</span>
              <p class="text-gray-600">{{ it.address }}</p>
            </div>
            <vs-radio
              v-model="addressCheck"
              :vs-value="it"
            ></vs-radio>
          </div>
          <vs-divider
            v-if="addressList.length !== (i + 1)"
            border-style="dashed"
          />
        </li>
      </ul>

      <div class="mt-8 text-center">
        <vs-button @click="currAddr = addressCheck, showPopup = false">选择这个地址</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import DetailInfo from './components/detail/DetailInfo.vue'
import DetailUser from './components/detail/DetailUser.vue'
import DetailComment from './components/detail/DetailComment.vue'

import {
  getGoodsDetail,
  getGoodsSeller,
  getGoodsComments,
} from '@/request/api/goods'

const icons = [
  { icon: 'weixinzhifu', label: '微信支付', value: 'weixin' },
  { icon: 'zhifubao', label: '支付宝支付', value: 'zhifubao' },
  { icon: 'yinlian', label: '银行卡支付', value: 'yinlian' },
]
export default {
  name: 'GoodsDetail',
  components: {
    VuePerfectScrollbar, DetailInfo, DetailUser, DetailComment,
  },

  data: () => ({
    icons,
    goodsId: '',
    goods: {},
    comments: [],
    pagination: {},
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },

    amount: 1,
    payment: 'huabei',
    currAddr: {},
    showPopup: false,
    addressCheck: {},
    isSidebarActive: false,
  }),

  computed: {
    ...mapState('user', ['addressList', 'defaultAddress']),
    payBtndisabled() {
      return !this.currAddr.receiver
    },
  },

  watch: {
    '$route.query': {
      handler(query) {
        this.goodsId = query.goodsId
      },
      immediate: true,
    },

    defaultAddress: {
      handler(newVal) {
        if (this.addressList.length > 0) {
          if (newVal) {
            this.addressList.forEach((el) => {
              if (el._id === this.defaultAddress) {
                this.currAddr = el
              }
            })
          } else {
            const [currAddr] = this.addressList
            this.currAddr = currAddr
          }
        }
      },
      immediate: true,
    },
  },

  activated() {
    this.getGoodsDetail()
    this.getGoodsSeller()
    this.getGoodsComments()
  },

  deactivated() {
    this.isSidebarActive = false
  },

  methods: {
    // 获取商品信息
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail({ goods_id: this.goodsId })
      if (code === 2000) {
        this.goods = data.goods_detail
      }
    },

    // 获取卖家信息
    async getGoodsSeller() {
      const { code, data } = await getGoodsSeller({ goods_id: this.goodsId })
      if (code === 2000) {
        this.seller = data.seller
      }
    },

    // 获取留言
    async getGoodsComments(page = 1) {
      const { code, data } = await getGoodsComments({
        goods_id: this.goodsId,
        page_size: 5,
        page,
      })
      if (code === 2000) {
        this.comments = data.comments
        this.pagination = data.pagination
      }
    },

    // 确认付款
    async onPay() {
      this.$vs.loading({
        container: '#sidebar-container',
        scale: 1,
        text: '正在结算，请稍等...',
      })

      try {
        const goodsList = [{
          amount: this.amount,
          name: this.goods.name,
          goods: this.goodsId,
          seller: this.goods.seller,
        }]
        const data = {
          goods_list: goodsList,
          payment: this.payment,
          address: this.currAddr,
          total_price: this.goods.price,
          actual_price: this.goods.price,
        }
        const { code } = await this.$store.dispatch('createOrder', data)
        if (code === 2000) {
          this.$router.replace('/user-center')
        } else {
          throw new Error()
        }
      } catch {
        this.$vs.notify({
          title: '订单创建失败',
          text: '服务器发生错误(点击关闭)',
          icon: 'remove_shopping_cart',
          color: 'danger',
          position: 'top-right',
          fixed: true,
        })
      } finally {
        this.$vs.loading.close('#sidebar-container > .con-vs-loading')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.left {
  @media (min-width: 1080px) {
    width: 68%;
    padding-right: 0.75rem;
  }
  @media (max-width: 1080px) {
    width: 100%;
    margin-bottom: 1.5rem;
  }
}
.right {
  @media (min-width: 1080px) {
    width: 32%;
    padding-left: 0.75rem;
  }
  @media (max-width: 1080px) {
    width: 100%;
  }
}

.sidebar-main::v-deep {
  #sidebar-container {
    position: relative;
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .scroll-area {
    max-height: calc(100% - 7.5rem);
  }
  .vs-sidebar--items {
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  .vs-sidebar {
    width: 400px;
    max-width: 90vw;
  }
  .con-vs-radio {
    justify-content: start;
  }
}

.con-vs-popup {
  z-index: 9999999;
}
</style>
