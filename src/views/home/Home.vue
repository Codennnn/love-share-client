<template>
  <div>
    <div class="flex w-full">
      <!-- 商品分类 -->
      <div class="pt-6 px-8 bg-white rounded-lg text-gray-600">
        <ul>
          <li
            class="li-item mb-4 flex items-center cursor-pointer"
            v-for="(item, i) in categoryList"
            :key="i"
            @click="$router.push({path: 'goods-category', query: {category: item._id}})"
          >
            <i
              class="mr-3 text-xl"
              :class="categoryIcons[item.name] || 'el-icon-bangzhu'"
            ></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>

      <!-- 幻灯片 -->
      <el-carousel
        class="mx-6 flex-1"
        :autoplay="false"
      >
        <el-carousel-item
          class="h-full radius"
          v-for="(item, i) in billboardList"
          :key="i"
        >
          <el-image
            class="w-full h-full"
            fit="cover"
            :src="item.url"
          ></el-image>
        </el-carousel-item>
      </el-carousel>

      <!-- 功能区 -->
      <div class="py-6 px-4 bg-white radius text-gray-600 light-shadow">
        <div class="grid-block">
          <router-link
            class="grid-item px-3 text-center cursor-pointer"
            v-for="(it, i) in grids"
            :key="i"
            :to="it.to"
          >
            <svg class="w-12 h-12">
              <use :xlink:href="`#icon-${it.icon}`" />
            </svg>
            <p class="mt-1 text-sm">{{ it.label }}</p>
          </router-link>
        </div>
      </div>
    </div>

    <p class="title-divider cursor-default">为你推荐</p>
    <GoodsList :goodsList="goodsList" />
  </div>
</template>

<script>
import GoodsList from '@/views/goods/GoodsList.vue'

import { getBillboardList } from '@/request/api/common'
import { getRecommendGoodsList } from '@/request/api/goods'

const categoryIcons = {
  电子数码: 'el-icon-headset',
  宿舍电器: 'el-icon-table-lamp',
  日常用品: 'el-icon-toilet-paper',
  图书书籍: 'el-icon-reading',
  服饰鞋包: 'el-icon-brush',
}
const grids = [
  { icon: 'xianlu', label: '逛同校', to: '/goods-school-list' },
  { icon: 'qizhi', label: '签到领币', to: '/check-in' },
  { icon: 'guolvqi', label: '旧物回收', to: '/' },
  { icon: 'yingbi', label: '物品租借', to: '/' },
  { icon: 'gouwu', label: '求购物品', to: '/begging-list' },
  { icon: 'lubiao', label: '帮助中心', to: '/help-center' },
]
export default {
  name: 'Home',
  components: { GoodsList },

  data: () => ({
    categoryIcons,
    grids,
    billboardList: [],
    goodsList: [],
    pagination: {},
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  created() {
    this.getBillboardList()
    this.getRecommendGoodsList()
  },

  methods: {
    async getBillboardList() {
      const { code, data: { billboard_list } } = await getBillboardList()
      if (code === 2000) {
        this.billboardList = billboard_list
      }
    },

    async getRecommendGoodsList() {
      const { code, data } = await getRecommendGoodsList({ page: 1, page_size: 10 })
      if (code === 2000) {
        this.goodsList = data.goods_list
        this.pagination = data.pagination
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.li-item {
  font-size: 0.95rem;
  transition: 0.3s;
  &:hover {
    transform: translateX(0.25rem);
  }
}

.grid-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  .grid-item {
    transition: 0.3s;
    &:hover {
      transform: translateY(-0.25rem);
    }
  }
}

// 为你推荐
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
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 25px;
    height: 20px;
    margin-top: -10px;
    background-image: url(~@/assets/images/sprite.png);
  }
  &::before {
    left: 0;
    background-position: 0 0;
  }
  &::after {
    right: 0;
    background-position: -25px 0;
  }
}
</style>
