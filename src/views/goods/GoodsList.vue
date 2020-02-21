<template>
  <div>
    <template v-if="goodsList.length > 0">
      <div
        class="grid-list"
        :class="[cols[col - 1]]"
      >
        <div
          class="goods-item"
          v-for="(goods, i) in goodsList"
          :key="i"
        >
          <div
            class="img-wrapper w-full sm:h-56 md:h-56 h-40 py-8 px-4
           flex items-center  cursor-pointer"
            @click="viewGoodsDetail(goods._id)"
          >
            <el-image
              lazy
              class="w-full h-full"
              fit="contain"
              :src="goods.img_list[0]"
            >
            </el-image>
          </div>
          <div class="absolute bottom-0 p-3">
            <p class="mb-1 text-overflow-multi">
              {{ goods.name }}
            </p>
            <div class="flex justify-between items-center">
              <div class="text-lg text-primary font-bold">￥{{ $numFixed(goods.price) }}</div>
            </div>
            <div class="add-cart-btn opacity-0 transition overflow-hidden">
              <div
                class="py-2 px-4 flex-row-center text-sm bg-primary text-white radius cursor-pointer"
                @click="$store.dispatch(
                'cart/addCartItem',
                 { amount: 1, goods_id: goods._id, seller: goods.seller }
              )"
              >
                <feather
                  class="mr-2"
                  size="16"
                  type="shopping-cart"
                ></feather>
                加入购物车
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页器 -->
      <vs-pagination
        v-if="totalItems > 0"
        class="mt-12 mb-5"
        v-model="page"
        :goto="totalItems >= maxItems * 10"
        :total="Math.ceil(totalItems / maxItems)"
      ></vs-pagination>
    </template>

    <!-- 空状态提示 -->
    <div v-else>
      <div
        v-if="!noDataCustomize"
        class="px-8 flex-row-center"
      >
        <el-image
          lazy
          class="sm:w-1/3 lg:w-1/2"
          fit="cover"
          alt="无数据"
          src="https://gitee.com/chinesee/images/raw/master/img/img_016.png"
        >
        </el-image>
      </div>
      <slot
        v-else
        name="no-data"
      ></slot>
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
    noDataCustomize: {
      type: Boolean,
      default: false,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    maxItems: {
      type: Number,
      default: 20,
    },
    minWidth: {
      type: Number,
      default: 1100,
    },
  },

  data: () => ({
    cols,
    col: 5,
    page: 1,
  }),

  watch: {
    page(page) {
      this.$emit('switchPage', page)
    },
  },

  activated() {
    this.col = this.columns
  },

  mounted() {
    this.col = this.columns
    window.addEventListener('resize', this.$debounce(() => {
      if (document.body.clientWidth <= this.minWidth) {
        this.col = this.columns - 1
      } else {
        this.col = this.columns
      }
    }, 400), true)
  },

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
  .goods-item {
    position: relative;
    padding-bottom: 6.5rem;
    border-radius: $large-radius;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.01);
    transition: all 0.4s;
    .add-cart-btn {
      max-height: 0;
    }
    &:hover {
      box-shadow: 0 0 25px 10px rgba(var(--vs-primary), 0.2);
      .add-cart-btn {
        margin-top: 0.5rem;
        max-height: 4rem;
        opacity: 1;
        overflow: auto;
      }
    }
    .img-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  $frames: (
    1: 1fr,
    2: 1fr 1fr,
    3: 1fr 1fr 1fr,
    4: 1fr 1fr 1fr 1fr,
    5: 1fr 1fr 1fr 1fr 1fr
  );
  @each $name, $glyph in $frames {
    &.columns-#{$name} {
      grid-template-columns: $glyph;
    }
  }
}

.text-overflow-multi {
  @include textOverflow($width: 100%, $line: 2);
}
</style>
