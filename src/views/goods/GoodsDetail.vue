<template>
  <div class="bg-white p-6 rounded-lg">
    <div class="flex">
      <div class="w-5/12">
        <el-carousel
          ref="carousel"
          :autoplay="false"
        >
          <el-carousel-item
            v-for="(image, i) in detail.imgs"
            :key="i"
          >
            <img
              class="w-full"
              :src="image"
            >
          </el-carousel-item>
        </el-carousel>
        <vs-images hover="zoom">
          <vs-image
            v-for="(image, i) in detail.imgs"
            :key="i"
            :src="image"
            @click.native="setActiveItem(i)"
          />
        </vs-images>
      </div>
      <div class="w-7/12 px-5">
        <div class="text-xl font-semibold">{{ detail.name }}</div>
        <div
          class="text-sm  my-3"
          v-html="detail.desc"
        ></div>
        <div class="text-xl text-primary font-semibold">￥{{ detail.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail } from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  data: () => ({
    detail: {},
  }),

  mounted() {
    this.getGoodsDetail()
  },

  methods: {
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail()
      if (code === 2000) {
        console.log(data.detail.imgs)
        this.detail = data.detail
      }
    },

    setActiveItem(i) {
      this.$refs.carousel.setActiveItem(i)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
