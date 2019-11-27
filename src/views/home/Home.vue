<template>
  <div>
    <div class="flex w-full">
      <!-- 商品分类 -->
      <div class="mr-4 pt-6 px-8 bg-white rounded-lg text-gray-600">
        <ul>
          <li
            class="li-item mb-4 flex items-center cursor-pointer"
            v-for="(item, index) in categoryList"
            :key="index"
          >
            <i
              class="mr-3 text-xl"
              :class="categoryIcons[item.name]"
            ></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 幻灯片 -->
      <el-carousel
        :autoplay="false"
        class="flex-1"
      >
        <el-carousel-item
          class="h-full"
          v-for="(item, i) in ['https://ws1.sinaimg.cn/large/775017f8gy1g9blp5artdj20xn0ea44u.jpg', 'https://ws1.sinaimg.cn/large/775017f8gy1g9blx9s6n9j20xk0ebjwc.jpg']"
          :key="i"
        >
          <div
            slot="placeholder"
            style="width: 156px; heigth: 156px;"
          >123456</div>
          <el-image
            lazy
            class="h-full"
            fit="cover"
            :src="item"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
      <!-- 功能区 -->
      <div class="ml-4 py-6 px-4 bg-white rounded-lg text-gray-600 shadow">
        <div class="grid-block">
          <div
            class="grid-item px-3 text-center cursor-pointer"
            v-for="(item, index) in grids"
            :key="index"
          >
            <img
              class="w-12"
              :src="item.icon"
            >
            <p class="mt-2 text-sm">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="title-divider">为你推荐</h3>

    <div class="grid-list">
      <div
        class="goods-item"
        v-for="(goods, i) in goodsList"
        :key="i"
      >
        <div
          class="img-wrapper p-8 cursor-pointer"
          @click="viewGoodsDetail(goods.goods_id)"
        >
          <el-image
            class="w-full h-full"
            fit="cover"
            :src="goods.img_list[0]"
          ></el-image>
        </div>
        <div class="p-3">
          <p class="mb-3 text-sm text-gray-700 text-overflow-multi">
            {{ goods.name }}
          </p>
          <div class="flex justify-between items-center">
            <div class="text-lg text-primary font-bold">￥{{ goods.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from '@/assets/images/pages/home/grid1.svg'
import icon2 from '@/assets/images/pages/home/grid2.svg'
import icon3 from '@/assets/images/pages/home/grid3.svg'
import icon4 from '@/assets/images/pages/home/grid4.svg'

import {
  getStoredGoods,
} from '@/request/api/goods'

const categoryIcons = {
  电子数码: 'el-icon-headset',
  宿舍电器: 'el-icon-table-lamp',
  日常用品: 'el-icon-toilet-paper',
  图书书籍: 'el-icon-reading',
  服饰鞋包: 'el-icon-brush',
}
const grids = [
  { icon: icon1, label: '逛同校' },
  { icon: icon2, label: '签到领币' },
  { icon: icon3, label: '旧物回收' },
  { icon: icon4, label: '物品租借' },
]

export default {
  name: 'Home',
  data: () => ({
    categoryIcons,
    grids,
    goodsList: [],
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  created() {
    this.getStoredGoods()
  },

  methods: {
    async getStoredGoods() {
      const { code, data } = await getStoredGoods()
      if (code === 2000) {
        this.total = data.total
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },

    viewGoodsDetail(id) {
      const { href } = this.$router.resolve({
        path: '/goods-detail',
        query: { id },
      })
      window.open(href, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.li-item {
  font-size: 0.95rem;
  transition: 0.4s;
  &:hover {
    transform: translateX(0.25rem);
  }
}

.grid-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  .grid-item {
    transition: 0.4s;
    &:hover {
      transform: translateY(-0.25rem);
    }
  }
}

.grid-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 26px;
  @media (max-width: 1125px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
}

.text-overflow-multi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  word-break: break-all;
  word-wrap: break-word;
}

.title-divider {
  position: relative;
  width: 200px;
  height: 45px;
  padding: 0 30px;
  margin: 20px auto;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 45px;
  overflow: hidden;
  color: #333;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 25px;
    height: 20px;
    margin-top: -10px;
    background-image: url(~@/assets/images/sprite.png);
    background-position: 0 0;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 25px;
    height: 20px;
    margin-top: -10px;
    background-image: url(~@/assets/images/sprite.png);
    background-position: -25px 0;
  }
}
</style>
