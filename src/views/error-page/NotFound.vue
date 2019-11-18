<template>
  <div class="h-screen flex justify-center items-center bg-white">
    <div class="flex items-center">
      <div style="width: 15rem; margin:0 3rem; ">
        <p class="text-2xl font-bold">Life Was Like A Box Of Chocolates. </p>
        <p class="my-6 text-primary text-sm">You Never Know What You're Gonna Get...</p>
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
