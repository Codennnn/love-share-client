<template>
  <div>
    <div class="mb-6 flex">
      <ul
        class="px-4 py-6 bg-white radius"
        style="width: 215px; margin-right: 25px;"
      >
        <li
          class="px-2 py-3"
          v-for="(it,i) in menus"
          :key="i"
        >
          <span
            class="font-bold cursor-pointer"
            @click="routeTo()"
          >{{ it.text }}</span>
        </li>
      </ul>
      <div>
        <el-carousel :autoplay="false">
          <el-carousel-item
            v-for="(it, i) in carousels"
            :key="i"
          >
            <el-image
              class="w-full h-full cursor-pointer"
              fit="cover"
              :src="it.url"
              @click="routeTo()"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
        <img
          class="cursor-pointer"
          src="@/assets/images/recycle-category.png"
          @click="routeTo()"
        >
      </div>
    </div>
    <img src="@/assets/images/banner.jpg">
  </div>
</template>

<script>
const menus = [
  { text: '手机回收' },
  { text: '电脑办公回收' },
  { text: '摄影摄像回收' },
  { text: '智能数码回收' },
  { text: '电脑配件回收' },
  { text: '奢侈品回收' },
]
const carousels = [
  { url: 'https://img10.360buyimg.com/babel/s960x320_jfs/t1/93732/14/11760/62033/5e3d6056Ef5143fdc/67c9420401726aeb.jpg!cc_960x320' },
  { url: 'https://img11.360buyimg.com/babel/s960x320_jfs/t1/87759/16/12246/103334/5e44d0f2E080e0be7/87966e5a3e9f54e3.jpg!cc_960x320' },
  { url: 'https://img12.360buyimg.com/babel/s960x320_jfs/t1/100222/25/12116/107668/5e44d14dE77852da7/c09f07beebe92192.jpg!cc_960x320' },
  { url: 'https://img14.360buyimg.com/babel/s960x320_jfs/t1/93035/18/12253/38785/5e45032eE0de6af80/32239a9b8b7eb398.jpg!cc_960x320' },
]
export default {
  name: 'Recycle',
  data: () => ({
    menus,
    carousels,
  }),

  methods: {
    routeTo() {
      this.$router.push('/goods-addition')
    },
  },
}
</script>
