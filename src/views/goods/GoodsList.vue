<template>
  <div
    class="grid-list"
    :class="[cols[columns - 1]]"
  >
    <div
      class="goods-item"
      v-for="(goods, i) in goodsList"
      :key="i"
    >
      <div
        class="img-wrapper p-8 cursor-pointer"
        @click="viewGoodsDetail(goods._id)"
      >
        <div
          class="flex items-center"
          style="height: 156px; width: 156px;"
        >
          <el-image
            lazy
            class="w-full"
            fit="cover"
            :src="goods.img_list[0]"
          >
          </el-image>
        </div>
      </div>
      <div class="p-3">
        <p
          class="mb-3 text-sm text-gray-700 text-overflow-multi"
          style="height: 2.7rem;"
        >
          {{ goods.name }}
        </p>
        <div class="flex justify-between items-center">
          <div class="text-lg text-primary font-bold">￥{{ Number(goods.price).toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const cols = [
  'columns-1',
  'columns-2',
  'columns-3',
  'columns-4',
  'columns-5',
]

export default {
  name: 'GoodsList',
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Number,
      default: 5,
    },
  },

  data: () => ({
    cols,
  }),

  methods: {
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
.grid-list {
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 26px;
  @media (max-width: 1125px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  &.columns-1 {
    grid-template-columns: 1fr;
  }
  &.columns-2 {
    grid-template-columns: 1fr 1fr;
  }
  &.columns-3 {
    grid-template-columns: 1fr 1fr 1fr;
  }
  &.columns-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  &.columns-5 {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  .goods-item {
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.01);
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
}

.text-overflow-multi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
