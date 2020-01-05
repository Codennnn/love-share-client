<template>
  <div>
    <div class="py-2 flex items-center">
      <i class="el-icon-map-location text-xl"></i>
      <p class="mx-2">{{ schoolName }}</p>
      <div class="text-sm text-primary cursor-pointer">切换</div>
    </div>
    <div class="container flex">
      <!-- 左侧 -->
      <div class="left pr-4">
        <h6 class="my-3 text-sm text-gray-700">筛选搜索</h6>
        <div class="p-4 shadow bg-white rounded-lg">
          <div class="">
            <vs-radio
              class="my-2 pl-2"
              vs-value="all"
              v-model="category"
            >全部</vs-radio>
            <vs-radio
              class="my-2 pl-2"
              v-for="(it, i) in categoryList"
              :key="i"
              :vs-value="it._id"
              v-model="category"
            >{{ it.name }}</vs-radio>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="right pl-3">
        <h6 class="my-3 text-sm text-gray-700">
          共查询到 {{ pagination.total }} 个商品
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

        <GoodsList
          :goodsList="goodsList"
          :columns="4"
        >
        </GoodsList>

        <vs-pagination
          goto
          class="mt-12 mb-5"
          v-model="currentPage"
          :total="Math.ceil(pagination.total / this.pageSize)"
        ></vs-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

import { getGoodsListOfSameSchool } from '@/request/api/goods'

export default {
  name: 'GoodsSchoolList',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    category: 'all',
    currentPage: 1,
    pageSize: 10,
    pagination: {},
    searchText: '',
  }),

  watch: {
    category: {
      handler(v) {
        if (v === 'all') {
          this.getGoodsListOfSameSchool()
        } else {
          this.getGoodsListOfSameSchool([v])
        }
      },
      immediate: true,
    },
  },

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
    schoolName() {
      return this.$store.state.user.info.school.name
    },
  },

  methods: {
    async getGoodsListOfSameSchool(category) {
      const { code, data } = await getGoodsListOfSameSchool({
        school_id: this.$store.state.user.info.school._id,
        page: 1,
        page_size: this.pageSize,
        category,
      })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },

    viewGoodsDetail(goodsId) {
      this.$router.push({
        path: '/goods-detail',
        query: { goodsId },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .left {
    width: 22%;
  }
  .right {
    width: 78%;
  }
  @media (max-width: 1200px) {
    .left {
      width: 25%;
    }
    .right {
      width: 75%;
    }
  }
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

.con-vs-radio::v-deep {
  justify-content: start;
  .vs-radio--label {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: gray;
  }
}
</style>
