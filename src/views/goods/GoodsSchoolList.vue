<template>
  <div>
    <div class="py-2 flex items-center justify-end text-gray-700">
      <el-select
        v-model="selectedSchool"
        @change="switchSchool"
      >
        <el-option
          v-for="it in schoolList"
          :key="it._id"
          :label="it.name"
          :value="it._id"
          @click.native="switchSchool(it._id, it.name)"
        >
        </el-option>
      </el-select>
    </div>
    <div class="container flex">
      <!-- 左侧 -->
      <div class="left pr-4">
        <h6 class="my-3 text-sm text-gray-700">筛选搜索</h6>
        <div class="p-4 light-shadow bg-white radius">
          <div class="">
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
      <div class="right pl-3">
        <h6 class="my-3 text-sm text-gray-700">
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
          class="mt-4"
          :goodsList="goodsList"
          :columns="4"
        >
        </GoodsList>

        <vs-pagination
          v-if="goodsList.length > 0"
          class="mt-12 mb-5"
          v-model="currentPage"
          :goto="goodsList.length > 10"
          :total="Math.ceil(pagination.total / this.pageSize)"
        ></vs-pagination>
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
    searchText: '',

    currentPage: 1,
    pageSize: 10,
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
    this.getGoodsListOfSameSchool(this.selectedSchool)
  },

  methods: {
    async getGoodsListOfSameSchool(school_id, category) {
      const { code, data } = await getGoodsListOfSameSchool({
        page: 1,
        page_size: this.pageSize,
        school_id,
        category,
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
      if (v === 'all') {
        this.getGoodsListOfSameSchool(this.selectedSchool)
      } else {
        this.getGoodsListOfSameSchool(this.selectedSchool, [v])
      }
    },

    // 切换学校
    switchSchool(id) {
      this.selectedCategory = 'all'
      this.getGoodsListOfSameSchool(id)
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

.search-input::v-deep {
  // 重设输入框样式
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

.el-radio-group {
  margin-left: 0.8rem;
  display: flex;
  flex-direction: column;
  .el-radio {
    margin: 0.4rem 0;
  }
}
</style>
