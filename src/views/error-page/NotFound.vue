<template>
  <div class="h-screen flex justify-center items-center bg-white">
    <div class="flex items-center">
      <div style="width: 15rem; margin:0 3rem; ">
        <p class="text-2xl font-bold">生活就像一盒巧克力 </p>
        <p class="mt-2 mb-8 text-primary text-sm">你永远不知道下一颗是什么味道...</p>
        <vs-button to="Home">迷路了，请带我回家</vs-button>
      </div>
      <img
        src="@/assets/images/404.png"
        style="user-select: none;"
        draggable="false"
        alt="404"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
