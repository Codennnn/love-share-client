<template>
  <div>
    <div class="flex items-start">
      <div class="p-6 radius bg-white">
        <div>
          <vs-input
            class="search-input mb-6 radius"
            placeholder="这里搜索..."
            v-model="searchText"
          />
          <h4 class="title">价格区间</h4>
          <ul>
            <li
              class="mb-2"
              v-for="(it, i) in priceRanges"
              :key="i"
            >
              <vs-radio
                v-model="priceRange"
                vs-name="range"
                :vs-value="it.value"
              >{{ it.label }}</vs-radio>
            </li>
          </ul>
          <vs-divider />
          <h4 class="title">商品分类</h4>
          <ul>
            <li
              class="mb-2"
              v-for="it in categoryList"
              :key="it._id"
            >
              <vs-radio
                v-model="category"
                vs-name="category"
                :vs-value="it._id"
              >{{ it.name }}</vs-radio>
            </li>
          </ul>

          <div class="pt-5 flex justify-center">
            <vs-button
              class="w-3/4 radius"
              @click="getGoodsListByFilter()"
            >
              查询商品
            </vs-button>
          </div>
        </div>
      </div>

      <div class="pl-8 flex-1">
        <GoodsList
          :goodsList="goodsList"
          :columns="4"
          :min-width="1100"
          :max-items="maxItems"
          :totalItems="pagination.total"
          @switchPage="page => getGoodsListByCategory(page)"
        >
        </GoodsList>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

import { getGoodsListByCategory, getGoodsListByFilter } from '@/request/api/goods'

const priceRanges = [
  { label: '全部', value: 'all' },
  { label: '少于10元', value: '10' },
  { label: '10元 - 100元', value: '100' },
  { label: '100元 - 500元', value: '500' },
  { label: '多于500元', value: '501' },
]
export default {
  name: 'GoodsCategory',
  components: { GoodsList },

  data: () => ({
    priceRanges,

    priceRange: 'all',
    searchText: '',
    category: '',

    goodsList: [],
    maxItems: 8,
    pagination: {},
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  activated() {
    this.category = this.$route.query.category
    this.getGoodsListByCategory()
  },

  methods: {
    async getGoodsListByCategory(page = 1) {
      const { code, data } = await getGoodsListByCategory({
        page,
        page_size: this.maxItems,
        category: this.category,
      })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },

    async getGoodsListByFilter(page = 1) {
      const body = {
        page,
        page_size: this.maxItems,
        category: this.category,
      }
      if (this.searchText.length > 0) {
        body.search = this.searchText
      }
      if (this.priceRange !== 'all') {
        if (this.priceRange === '10') {
          body.min_price = 0
          body.max_price = 9.99
        }
        if (this.priceRange === '500') {
          body.min_price = 10
          body.max_price = 100
        }
        if (this.priceRange === '100') {
          body.min_price = 100
          body.max_price = 500
        }
        if (this.priceRange === '501') {
          body.min_price = 500.001
          body.max_price = Number.POSITIVE_INFINITY
        }
      }
      const { code, data } = await getGoodsListByFilter(body)
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0.75rem;
  font-weight: bold;
}

.search-input::v-deep {
  .vs-inputx {
    background: $bg-gray-150;
  }
}

.con-vs-radio::v-deep {
  justify-content: flex-start;
  .vs-radio--label {
    margin-left: 0.8rem;
    font-size: 0.875rem;
    color: #718096;
  }
}
</style>
