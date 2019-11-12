<template>
  <div>
    <div class="flex">
      <div
        class="md:w-1/6 lg:w-1/4 pr-4"
        vs-w="2"
      >
        <div>
          <h6 class="my-3 text-sm text-gray-700">筛选搜索</h6>
          <div class="p-4 shadow bg-white rounded-lg">
            <div class="md:w-full lg:w-1/2">
              <vs-radio
                class="my-2"
                v-for="(item, index) in categoryList"
                :key="index"
                :vs-value="item"
                v-model="category"
              >{{ item }}</vs-radio>
            </div>
          </div>
        </div>
      </div>
      <div
        class="md:w-5/6 lg:w-3/4 pl-3"
        vs-w="9"
      >
        <div>
          <h6 class="my-3 text-sm text-gray-700">
            共查询到 {{ total }} 个商品
          </h6>
          <!-- 搜索框 -->
          <vs-input
            class="search-input mb-6 top-0 z-40 w-full shadow rounded-lg overflow-hidden"
            icon="search"
            size="large"
            icon-no-border
            placeholder="输入商品 ID 进行搜索..."
            v-model="searchText"
          />

          <div class="grid">
            <div
              class="goods-item"
              v-for="(goods, i) in goodsList"
              :key="i"
            >
              <div
                class="img-wrapper cursor-pointer"
                @click="viewGoodsDetail(goods.goods_id)"
              >
                <el-image
                  class="w-full h-full"
                  fit="cover"
                  :src="goods.img_list[0]"
                ></el-image>
              </div>
              <div class="p-3">
                <div class="my-2 flex justify-between items-center">
                  <div>
                    <vs-chip color="primary">
                      <span style="margin: 0 0.5rem 0.15rem 0">{{ goods.collect_num }}</span>
                      <i class="el-icon-star-off"></i>
                    </vs-chip>
                  </div>
                  <div class="font-bold">￥{{ goods.price }}</div>
                </div>
                <div class="text-overflow">
                  {{ goods.name }}
                </div>
                <div class="text-overflow text-gray-500 text-sm">
                  {{ '12345678912345678924891' }}
                </div>
              </div>
              <div class="flex md:flex-col lg:flex-col xl:flex-row">
                <div
                  class="xl:w-1/2 p-2 flex justify-center items-center cursor-pointer"
                  style="background: rgb(246, 246, 246);font-size: 14px;"
                  v-if="goods.is_collected"
                  @click="uncollectGoods(goods.goods_id, i)"
                >
                  <i class="el-icon-star-on text-xl mr-1 text-warning"></i>
                  取消收藏
                </div>
                <div
                  class="xl:w-1/2 p-2 flex justify-center items-center cursor-pointer"
                  style="background: rgb(246, 246, 246);font-size: 14px;"
                  v-else
                  @click="collectGoods(goods.goods_id, i)"
                >
                  <i class="el-icon-star-off mr-1"></i>
                  收藏
                </div>
                <div
                  class="xl:w-1/2 p-2 flex justify-center items-center
                  bg-success text-white cursor-pointer"
                  style="font-size: 14px;"
                  v-if="isInCart(goods.goods_id)"
                  @click="$router.push('/goods-cart')"
                >
                  购物车中查看
                </div>
                <div
                  class="xl:w-1/2 p-2 flex justify-center items-center
                  bg-primary text-white cursor-pointer"
                  style="font-size: 14px;"
                  v-else
                  @click="addCartItem(goods)"
                >
                  <i class="el-icon-shopping-cart-2 mr-2 text-lg"></i>
                  加入购物车
                </div>
              </div>
            </div>
          </div>

          <vs-pagination
            class="mt-12 mb-5"
            goto
            v-if="pagination"
            v-model="currentPage"
            :total="Math.ceil(total / 15)"
          ></vs-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGoodsCategory,
  getStoredGoods,
  collectGoods,
  uncollectGoods,
} from '@/request/api/goods'

export default {
  name: 'GoodsVividList',
  data: () => ({
    total: null,
    currentPage: 1,
    pagination: null,
    category: '',
    categoryList: [],
    goodsList: [],
    searchText: '',
  }),

  mounted() {
    this.getStoredGoods()
    this.getGoodsCategory()
  },

  watch: {
    category() {
      console.log(this.category)
    },
  },

  computed: {
    isInCart() {
      return id => this.$store.getters['cart/isInCart'](id)
    },
  },

  methods: {
    async getStoredGoods() {
      try {
        const { code, data } = await getStoredGoods()
        if (code === 2000) {
          this.total = data.total
          this.goodsList = data.goods_list
          this.pagination = data.pagination
        }
      } catch {
        // TODO
      }
    },

    async getGoodsCategory() {
      try {
        const { code, data } = await getGoodsCategory()
        if (code === 2000) {
          this.categoryList = data.category_list
          this.category = this.categoryList[0].value
        }
      } catch {
        // TODO
      }
    },

    // 收藏商品
    async collectGoods(id, i) {
      try {
        const { code } = await collectGoods(id)
        if (code === 2000) {
          console.log(this.goodsList[i])
          this.goodsList[i].is_collected = true
        }
      } catch {
        // TODO
      }
    },

    // 取消收藏商品
    async uncollectGoods(id, i) {
      try {
        const { code } = await uncollectGoods(id)
        if (code === 2000) {
          console.log(this.goodsList[i])
          this.goodsList[i].is_collected = false
        }
      } catch {
        // TODO
      }
    },

    async addCartItem(item) {
      await this.$store.dispatch('cart/addCartItem', item)
    },

    viewGoodsDetail(id) {
      this.$router.push({
        path: '/goods-detail',
        query: { id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
}

.search-input {
  // 重设输入框样式
  &::v-deep {
    .vs-inputx {
      border: none !important;
      box-shadow: none;
      border-radius: 0;
    }
    .vs-input--input,
    .vs-input--placeholder {
      padding-left: 40px;
    }
    .vs-icon {
      top: 0.75rem;
      left: 10px;
      font-size: 25px;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 26px;
  @media (min-width: 1620px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.goods-item {
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  &:hover {
    box-shadow: 0 0 25px 10px rgba(var(--vs-primary), 0.2);
  }
  .img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
