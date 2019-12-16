<template>
  <div class="flex">
    <div class="w-1/4 pr-5">
      <div class="p-2 bg-white rounded-lg">
        <div class="p-1">
          <div
            class="py-3 text-primary text-lg font-bold cursor-default"
            style="box-shadow: 0 7px 7px -5px rgba(0, 0, 0, 0.08)"
          >消息中心</div>
          <ul class="pt-4">
            <li
              class="item px-3 py-1 cursor-pointer hover:text-blue-500"
              v-for="(item, i) in list"
              :key="i"
              :class="{'text-primary': currentActive === item.title}"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-3/4">
      <div class="bg-white rounded-lg">
        <div class="py-4 flex justify-center">
          <img src="@/assets/images/no-data.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data: () => ({
    list: [
      {
        title: '系统通知',
      },
      {
        title: '我的消息',
      },
    ],
    currentActive: '系统通知',
  }),
}
</script>

<style lang="scss" scoped>
.item {
  transition: color 0.3s;
}
</style>
