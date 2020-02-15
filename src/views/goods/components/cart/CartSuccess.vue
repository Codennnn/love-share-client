<template>
  <div class="p-4">
    <div class="p-10 flex flex-col items-center justify-center base-shadow bg-white radius">
      <i
        class="el-icon-success text-success"
        style="font-size: 80px;"
      ></i>
      <p class="mt-2 text-2xl">付款成功</p>
      <p class="mb-6 text-gray-600">感谢您对乐享校园的支持</p>
      <div>
        <vs-button
          class="mr-4"
          size="small"
          color="#a0aec0"
          type="border"
          @click="$router.replace('/')"
        >返回首页</vs-button>
        <vs-button
          size="small"
          color="#a0aec0"
          @click="$router.replace('/order-list')"
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
