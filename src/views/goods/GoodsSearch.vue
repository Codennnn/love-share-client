<template>
  <div
    id="loading"
    class="loading vs-con-loading__container"
  >
    <div
      v-if="goodsList.length <= 0"
      class="text-warning text-center font-bold"
    >
      抱歉，没有找到与 "
      <span class="text-gray-600">{{ this.searchText }}</span>
      " 相关的商品
    </div>

    <GoodsList
      class="p-8"
      :goodsList="goodsList"
      :columns="5"
    >
    </GoodsList>

    <vs-pagination
      v-if="goodsList.length > 0"
      class="mt-12 mb-5"
      v-model="page"
      :goto="goodsList.length > 10"
      :total="Math.ceil(pagination.total / this.pageSize)"
    ></vs-pagination>
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

import { getGoodsListBySearch } from '@/request/api/goods'

export default {
  name: 'GoodsSearch',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    page: 1,
    pageSize: 10,
    pagination: {},
  }),

  computed: {
    searchText() {
      return this.$store.state.searchText
    },
  },

  watch: {
    searchText() {
      this.init()
    },
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.$store.commit('CLEAR_SEARCH_TEXT')
  },

  methods: {
    init() {
      this.getGoodsListBySearch()
      this.setTitle()
    },

    async getGoodsListBySearch() {
      if (this.searchText.trim().length <= 0) return

      this.$vs.loading({
        type: 'sound',
        container: '.loading',
        scale: 1,
      })
      try {
        const { code, data } = await getGoodsListBySearch({
          page: this.page,
          page_size: this.pageSize,
          search: this.searchText,
        })
        if (code === 2000) {
          this.goodsList = data.goods_list
          this.pagination = data.pagination
        }
      } finally {
        this.$vs.loading.close('.loading > .con-vs-loading')
      }
    },

    setTitle() {
      document.title = `${this.searchText} - 商品搜索`
    },
  },
}
</script>
