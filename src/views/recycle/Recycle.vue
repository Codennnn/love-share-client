<template>
  <div class="">
    <div class="mb-6 flex">
      <ul
        class="p-4 bg-white radius"
        style="width: 215px; margin-right: 25px;"
      >
        <li
          class="px-2 py-3 cursor-pointer"
          v-for="(it,i) in menus"
          :key="i"
        >
          <span class="font-bold">{{ it.text }}</span>
        </li>
      </ul>
      <div>
        <img src="@/assets/images/recycle-category.png">
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
export default {
  name: 'Recycle',
  data: () => ({
    menus,
  }),
}
</script>
