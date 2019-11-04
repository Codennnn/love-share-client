<template>
  <div>
    <vs-row>
      <vs-col
        class="pr-3"
        vs-w="9"
      >
        <div class="relative p-6 bg-white rounded-lg overflow-hidden">
          <div class="flex">
            <div class="w-1/2 ">
              <el-carousel :autoplay="false">
                <el-carousel-item
                  v-for="(image, i) in goods.imgs"
                  :key="i"
                >
                  <img
                    class="h-full"
                    style="max-width: inherit;"
                    :src="image"
                  >
                </el-carousel-item>
              </el-carousel>
              <vs-images hover="zoom">
                <vs-image
                  class=""
                  v-for="(image, i) in goods.imgs"
                  :key="i"
                  :src="image"
                  @click.native="showViewer = true"
                />
              </vs-images>
            </div>
            <div class="w-1/2 px-5">
              <div class="flex items-start text-lg font-semibold">
                <p>{{ goods.name }}</p>
                <div>
                  <vs-dropdown>
                    <vs-button
                      class="ml-2"
                      radius
                      size="small"
                      type="flat"
                      icon-pack="el-icon"
                      icon="el-icon-more"
                    ></vs-button>

                    <vs-dropdown-menu>
                      <vs-dropdown-item>
                        啊啊
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="isDismount ?
                       cancelDismountGoods()
                       : dismountGoods()">
                        {{ isDismount ? '重新上架' : '下架该商品' }}
                      </vs-dropdown-item>
                      <vs-dropdown-item
                        class="text-danger"
                        divider
                        @click="isPopupActive = true"
                      >
                        删除该商品
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </div>
              <div class="my-2 flex items-center text-gray-500 text-sm">
                <p>发布于 {{ timeDiff(goods.time) }}</p>
                <vs-button
                  class="ml-6"
                  type="flat"
                  size="small"
                  icon-pack="el-icon"
                  icon="el-icon-star-off"
                  :color="isCollect ? 'warning' : 'success'"
                  @click="isCollect ? uncollectGoods() : collectGoods()"
                >
                  {{ isCollect ? '取消收藏' : '加入收藏' }}
                </vs-button>
              </div>
              <div class="info-item">
                <vs-chip class="mr-2">价 格</vs-chip>
                <div>
                  <span class="text-xl text-primary font-semibold">
                    ￥{{ goods.price || '--' }}
                  </span>
                  <span
                    class="text-gray-500"
                    style="text-decoration: line-through;"
                  >
                    ￥{{ goods.original_price }}
                  </span>
                </div>
              </div>
              <div class="info-item">
                <vs-chip class="mr-2">数 量</vs-chip>
                <span style="margin-bottom: 2px;">{{ goods.num }}</span>
              </div>
              <div class="info-item">
                <vs-chip class="mr-2">配 送</vs-chip>
                <span style="margin-bottom: 4px;">
                  {{ goods.delivery === '1' ? '包邮' : goods.delivery === '2' ? '自费' : '自提' }}
                </span>
              </div>
              <div
                class="info-item"
                v-if="goods.returnable"
              >
                <vs-chip class="mr-2">保 障</vs-chip>
                <span style="margin-bottom: 4px;">
                  7天无理由退换货
                </span>
              </div>
              <div class="flex items-center mt-6">
                <vs-input-number
                  v-model="num"
                  :min="1"
                  :max="goods.num"
                />
                <vs-button
                  class="ml-3 text-sm"
                  @click="addCart()"
                >加入购物车</vs-button>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-gray-600">详情</p>
            <div
              class="mt-1 text-sm"
              v-html="goods.description"
            ></div>
          </div>

          <!-- 下架标志 -->
          <div
            class="absolute z-50 cursor-default"
            style="transform: rotateZ(-45deg);top: 1.5rem; left: -3.5rem;"
            v-if="isDismount"
          >
            <div class="w-48 py-1 text-center text-white text-xl bg-danger">已下架</div>
          </div>
        </div>
      </vs-col>

      <!-- 卖家信息 -->
      <vs-col
        class="pl-3"
        vs-w="3"
      >
        <div class="p-3 text-center bg-white shadow-lg rounded-lg">
          <vs-avatar
            size="90px"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
            @click="viewUserDetail(seller.user_id)"
          />
          <div
            class="flex justify-center items-center text-lg cursor-pointer"
            @click="viewUserDetail(seller.user_id)"
          >
            <span>{{ seller.nickname }}</span>
            <i
              class="el-icon-male ml-1"
              style="color: rgb(31, 116, 255);"
              v-if="seller.gender === 1"
            ></i>
            <i
              class="el-icon-female ml-1 text-red-500"
              v-else-if="seller.gender === 0"
            ></i>
          </div>
          <div class="my-1 text-sm text-gray-500">
            {{ seller.school }}
          </div>
          <div class="flex justify-center overflow-hidden">
            <span
              class="px-5 py-2 flex items-center justify-center text-white
              text-sm bg-primary cursor-pointer"
              style="height: 34px;border-radius: 17px;"
              color="primary"
              @click="isSubscribe ? unsubscribe() : subscribe()"
            >
              <i
                class="el-icon-loading mr-1"
                v-if="isSubscribeLoading"
              ></i>
              {{ isSubscribe ? '取消关注' : '加关注' }}
            </span>
          </div>
          <div class="flex justify-around mt-3">
            <div>
              <div class="font-semibold">{{ seller.published_num || '0' }}</div>
              <div class="text-gray-600 text-sm">已发布</div>
            </div>
            <div>
              <div class="font-semibold">{{ seller.published_num || '0' }}</div>
              <div class="text-gray-600 text-sm">已获赞</div>
            </div>
            <div>
              <div class="font-semibold">{{ seller.follower_num || '0' }}</div>
              <div class="text-gray-600 text-sm">关注者</div>
            </div>
          </div>
        </div>
        <div class="hover-light cursor-pointer">
          <div class="mt-5 p-2 flex justify-center items-center text-center text-white
          bg-primary-gradient rounded">
            联系卖家
          </div>
          <div class="light"></div>
        </div>
      </vs-col>
    </vs-row>

    <vs-popup
      style="color: white;"
      title="是否删除该商品"
      background-color="rgba(255, 255, 255, .6)"
      background-color-popup="rgba(var(--vs-danger), 1)"
      :active.sync="isPopupActive"
    >
      <p>删除后将无法恢复, 请谨慎操作! </p>
      <div class="flex justify-end">
        <vs-button
          class="mr-3 text-sm text-white"
          type="border"
          color="rgb(255, 255, 255)"
        >取消操作</vs-button>
        <vs-button
          class="text-danger text-sm"
          type="relief"
          color="rgb(255, 255, 255)"
          @click="deleteGoods()"
        >确认删除</vs-button>
      </div>
    </vs-popup>
    <vs-popup
      title="已加入购物车"
      :active.sync="popupActive"
    >
      <p>该商品已加入您的购物车, 是否结算付款?</p>
      <div class="mt-4 flex justify-end">
        <vs-button
          class="mr-4"
          color="#a4a4a4"
          type="border"
          @click="popupActive = false"
        >暂不结算</vs-button>
        <vs-button type="relief">立即结算</vs-button>
      </div>
    </vs-popup>

    <el-image-viewer
      v-show="showViewer"
      :on-close="() => showViewer = false"
      :url-list="goods.imgs"
    />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'

import { timeDiff } from '@/utils/util'
import { subscribe, unsubscribe } from '@/request/api/user'
import {
  getGoodsDetail,
  deleteGoods,
  collectGoods,
  uncollectGoods,
  dismountGoods,
  cancelDismountGoods,
} from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  data: () => ({
    timeDiff,
    showViewer: false,
    goods: {},
    seller: {},
    num: 1, // 购买的数量
    popupActive: false,
    isPopupActive: false,
    isCollect: false,
    isDismount: false,
    isSubscribe: false,
    isSubscribeLoading: false,
  }),

  components: { ElImageViewer },

  mounted() {
    console.log('商品 ID', this.$route.query.id)
    this.getGoodsDetail()
  },

  methods: {
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail()
      if (code === 2000) {
        this.goods = data.goods_detail
        this.seller = data.seller_info
      }
    },

    // 查看用户详情
    viewUserDetail(id) {
      this.$router.push({
        path: '/user-detail',
        query: { id },
      })
    },

    // 加入购物车
    addCart() {
      this.popupActive = true
    },

    // 关注
    async subscribe() {
      this.isSubscribeLoading = true
      try {
        const { code } = await subscribe()
        if (code === 2000) {
          this.isSubscribe = true
        }
      } catch {
        // TODO
      }
      this.isSubscribeLoading = false
    },

    // 取消关注
    async unsubscribe() {
      this.isSubscribeLoading = true
      try {
        const { code } = await unsubscribe()
        if (code === 2000) {
          this.isSubscribe = false
        }
      } catch {
        // TODO
      }
      this.isSubscribeLoading = false
    },

    // 删除商品
    async deleteGoods() {
      this.isPopupActive = false
      try {
        const { code } = await deleteGoods()
        if (code === 2000) {
          // TODO
        }
      } catch {
        // TODO
      }
    },

    // 收藏商品
    async collectGoods() {
      try {
        const { code } = await collectGoods()
        if (code === 2000) {
          this.isCollect = true
        }
      } catch {
        // TODO
      }
    },

    // 取消收藏商品
    async uncollectGoods() {
      try {
        const { code } = await uncollectGoods()
        if (code === 2000) {
          this.isCollect = false
        }
      } catch {
        // TODO
      }
    },

    // 下架商品
    async dismountGoods() {
      try {
        const { code } = await dismountGoods()
        if (code === 2000) {
          this.isDismount = true
          this.$message({
            message: '该商品已被下架',
            type: 'warning',
          })
        }
      } catch {
        // TODO
      }
    },

    // 取消下架
    async cancelDismountGoods() {
      try {
        const { code } = await cancelDismountGoods()
        if (code === 2000) {
          this.isDismount = false
          this.$message({
            message: '该商品已重新上架',
            type: 'success',
          })
        }
      } catch {
        // TODO
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.info-item {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  cursor: default;
}

// 按钮闪光闪烁
.hover-light {
  position: relative;
  .light {
    position: absolute;
    display: none;
    top: 0;
    left: -150px;
    width: 150px;
    height: 100%;
    background-image: -moz-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-image: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    transform: skewX(-25deg);
  }
  &:hover .light {
    display: block;
    animation: flash 0.3s;
  }
  @keyframes flash {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
}
</style>
