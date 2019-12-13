<template>
  <div class="p-4">
    <div class="p-10 flex flex-col items-center justify-center base-shadow bg-white rounded-lg">
      <i
        class="el-icon-success text-success"
        style="font-size: 80px;"
      ></i>
      <p class="mt-2 mb-6 text-2xl">付款成功</p>
      <div>
        <vs-button
          class="mr-4"
          size="small"
          color="#999"
          type="border"
        >返回首页</vs-button>
        <vs-button
          color="#999"
          size="small"
        >查看订单</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartSuccess',
}
</script>
