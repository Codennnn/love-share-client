<template>
  <div>
    <div class="flex w-full">
      <div class="mr-4 pt-6 px-8 bg-white rounded-lg text-gray-600">
        <ul>
          <li
            class="li-item mb-4 flex items-center cursor-pointer"
            v-for="(item, index) in categoryList"
            :key="index"
          >
            <i
              class="mr-3 text-xl"
              :class="categoryIcons[item]"
            ></i>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <el-carousel
        class="flex-1"
        indicator-position="outside"
      >
        <el-carousel-item
          v-for="item in 4"
          :key="item"
        >
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="ml-4 py-6 px-4 bg-white rounded-lg text-gray-600 shadow">
        <div class="grid">
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
    <h3 class="title">为你推荐</h3>
  </div>
</template>

<script>
import { getCategoryList } from '@/request/api/common'
import icon1 from '@/assets/images/pages/home/grid1.svg'
import icon2 from '@/assets/images/pages/home/grid2.svg'
import icon3 from '@/assets/images/pages/home/grid3.svg'
import icon4 from '@/assets/images/pages/home/grid4.svg'

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
    categoryList: [],
  }),

  mounted() {
    this.getCategoryList()
  },

  methods: {
    async getCategoryList() {
      const { code, data } = await getCategoryList()
      if (code === 2000) {
        this.categoryList = data.category_list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.li-item {
  font-size: 0.95rem;
  transition: 0.4s;
  &:hover {
    transform: translateX(0.4rem);
  }
}

.grid {
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

.title {
  position: relative;
  width: 200px;
  height: 45px;
  padding: 0 30px;
  margin: 0 auto 20px;
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
