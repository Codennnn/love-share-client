<template>
  <div>
    <div class="py-2 flex items-center justify-end">
      <el-select
        v-model="selectedSchool"
        @change="switchSchool"
      >
        <el-option
          v-for="it in schoolList"
          :key="it._id"
          :label="it.name"
          :value="it._id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="flex">
      <!-- 左侧 -->
      <div
        class="pr-4"
        style="min-width: 14rem;"
      >
        <h6 class="my-3 text-sm">筛选搜索</h6>
        <div class="p-4 light-shadow bg-white radius">
          <div>
            <el-radio-group
              v-model="selectedCategory"
              @change="changeCategory"
            >
              <el-radio label="all">全部</el-radio>
              <el-radio
                v-for="(it, i) in categoryList"
                :key="i"
                :label="it._id"
              >{{ it.name }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="pl-3 flex-1">
        <h6 class="my-3 text-sm">
          共查询到 {{ pagination.total }} 个商品
        </h6>
        <!-- 搜索框 -->
        <vs-input
          class="search-input mb-6 w-full radius overflow-hidden"
          icon="search"
          size="large"
          icon-no-border
          placeholder="输入商品名称进行搜索..."
          v-model="searchText"
        />

        <GoodsList
          ref="goodsList"
          class="mt-4"
          :goodsList="goodsList"
          :columns="4"
          :min-width="1100"
          :max-items="maxItems"
          :totalItems="pagination.total"
          @switchPage="page => getGoodsListOfSameSchool(page)"
        >
        </GoodsList>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoodsList from '@/views/goods/GoodsList.vue'

import { getGoodsListOfSameSchool } from '@/request/api/goods'
import { getSchoolList } from '@/request/api/common'

export default {
  name: 'GoodsSchoolList',
  components: { GoodsList },

  data: () => ({
    goodsList: [],
    schoolList: [],
    selectedSchool: '',
    selectedCategory: 'all',
    cacheCategory: '', // 缓存所选的类型
    searchText: '',

    maxItems: 12,
    pagination: {},
  }),

  computed: {
    ...mapState(['categoryList']),
  },

  created() {
    this.getSchoolList()
  },

  mounted() {
    this.selectedSchool = this.$store.state.user.info.school._id
    this.getGoodsListOfSameSchool()
  },

  methods: {
    async getGoodsListOfSameSchool(page = 1) {
      const category = this.selectedCategory === 'all' ? null : [this.selectedCategory]
      const { code, data } = await getGoodsListOfSameSchool({
        page,
        category,
        page_size: this.maxItems,
        school_id: this.selectedSchool,
      })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },

    // 获取选择学校列表
    async getSchoolList() {
      const { code, data } = await getSchoolList()
      if (code === 2000) {
        this.schoolList = data.school_list
      }
    },

    viewGoodsDetail(goodsId) {
      this.$router.push({
        path: '/goods-detail',
        query: { goodsId },
      })
    },

    // 切换商品类型
    changeCategory(v) {
      if (this.cacheCategory === v) return
      this.$refs.goodsList.page = 1
      this.selectedCategory = v
      this.cacheCategory = v
      this.getGoodsListOfSameSchool()
    },

    // 切换学校
    switchSchool(id) {
      this.$refs.goodsList.page = 1
      this.selectedCategory = 'all'
      this.selectedSchool = id
      this.getGoodsListOfSameSchool()
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input::v-deep {
  // 重设输入框样式
  .vs-inputx {
    border: none !important;
    box-shadow: none;
    border-radius: 0;
    background: white;
  }
  .vs-input--input,
  .vs-input--placeholder {
    padding-top: 0.84rem;
    padding-left: 40px;
  }
  .vs-icon {
    top: 0.75rem;
    left: 10px;
    font-size: 25px;
  }
}

.el-radio-group {
  margin-left: 0.8rem;
  display: flex;
  flex-direction: column;
  .el-radio {
    margin: 0.4rem 0;
  }
}
</style>
