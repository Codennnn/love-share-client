<template>
  <div>
    <div class="flex">
      <div
        class="w-1/4 pr-4"
        vs-w="2"
      >
        <div>
          <h6 class="my-3 text-sm text-gray-700">筛选搜索</h6>
          <div class="p-4 shadow bg-white rounded-lg">
            <vs-radio
              class="my-2"
              v-for="(item, index) in categoryList"
              :key="index"
              :vs-value="item.value"
              v-model="category"
            >{{ item.label }}</vs-radio>
          </div>
        </div>
      </div>
      <div
        class="w-3/4 pl-3"
        vs-w="9"
      >
        <div>
          <h6 class="my-3 text-sm text-gray-700">共查询到 120 个商品</h6>
          <!-- 搜索框 -->
          <vs-input
            class="search-input mb-6 top-0 z-40 w-full shadow-lg rounded-lg overflow-hidden"
            icon="search"
            size="large"
            icon-no-border
            placeholder="输入商品 ID 进行搜索..."
            v-model="searchText"
          />
          <div class="grid">
            <div
              v-for="(item, i) in 8"
              :key="i"
              class="item shadow"
            >
              <div class="img-wrapper">
                <img src="@/assets/cloth.png" />
              </div>
              <div class="title">衬衫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsCategory } from '@/request/api/goods'

export default {
  name: 'GoodsVividList',
  data: () => ({
    category: '',
    categoryList: [],
    searchText: '',
  }),

  mounted() {
    this.getGoodsCategory()
  },

  watch: {
    category() {
      console.log(this.category)
    },
  },

  methods: {
    async getGoodsCategory() {
      try {
        const { code, data } = await getGoodsCategory()
        if (code === 2000) {
          this.categoryList = data.categoryList
          this.category = this.categoryList[0].value
        }
      } catch {
        //
      }
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
    .vs-icon {
      top: 0.7rem;
      font-size: 25px;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 18px;
}

.item {
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  .img-wrapper {
    padding: 20px;
  }
}

.title {
  padding: 8px 0;
  text-align: center;
  color: #fff;
  background: rgba(var(--vs-primary), 1);
}
</style>
