<template>
  <div>
    <vs-row>
      <vs-col
        class="pr-2"
        vs-w="9"
      >
        <div class="flex p-6 bg-white rounded-lg">
          <div class="w-1/2 ">
            <el-carousel
              ref="carousel"
              :autoplay="false"
            >
              <el-carousel-item
                v-for="(image, i) in detail.imgs"
                :key="i"
              >
                <img
                  class="h-full"
                  style="max-width: inherit;"
                  :src="image"
                >
              </el-carousel-item>
            </el-carousel>
            <vs-images hover="zoom">
              <vs-image
                class=""
                v-for="(image, i) in detail.imgs"
                :key="i"
                :src="image"
                @click.native="setActiveItem(i)"
              />
            </vs-images>
          </div>
          <div class="w-1/2 px-5">
            <div class="text-xl font-semibold">{{ detail.name }}</div>
            <div
              class="text-sm  my-3"
              v-html="detail.desc"
            ></div>
            <div class="text-xl text-primary font-semibold">￥{{ detail.price }}</div>
          </div>
        </div>
      </vs-col>
      <vs-col
        class="pl-3"
        vs-w="3"
      >
        <div class="p-3 text-center bg-white shadow-lg rounded-lg">
          <vs-avatar
            size="90px"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
          <div class="text-xl">123456</div>
          <div class="mb-1 text-gray-500">1234</div>
          <div class="flex justify-center overflow-hidden">
            <span
              class="px-5 py-2 flex items-center justify-center text-white text-sm
              bg-primary cursor-pointer"
              style="height: 34px;border-radius: 17px;"
              color="primary"
            >
              关注此人
            </span>
          </div>
          <div class="flex justify-around mt-3">
            <div>
              <div class="font-semibold">2</div>
              <div class="text-gray-600 text-sm">已发布</div>
            </div>
            <div>
              <div class="font-semibold">4</div>
              <div class="text-gray-600 text-sm">已获赞</div>
            </div>
            <div>
              <div class="font-semibold">15</div>
              <div class="text-gray-600 text-sm">关注者</div>
            </div>
          </div>
        </div>
      </vs-col>
    </vs-row>
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
