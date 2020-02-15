<template>
  <div class="pt-4">
    <div class="flex radius bg-white overflow-hidden">
      <img
        class="mr-2 w-1/3"
        src="https://gitee.com/chinesee/images/raw/master/img/img_024.png"
      >
      <div class="py-3 px-6 flex-1 flex-col-center">
        <h3
          class="mb-2 text-xl"
          style="color: #a28362;"
        >Hi, {{ $store.state.user.info.nickname }}</h3>
        <div
          class="relative px-10 flex-col-center overflow-hidden cursor-pointer"
          style="height: 6rem; border-radius: 3rem; background: #333; color: #d7c1a9;"
        >
          <h2 class="text-2xl">立即开通</h2>
          <p class="text-sm">
            您的乐享值为{{ $store.state.user.info.share_value }}，
            专属价
            <span style="color: #ff7200;">￥{{ 148 }}/年</span>
            <span class="ml-1 line-through">￥{{ 299 }}/年</span>
          </p>
          <b
            class="buy-icon"
            style="background:url('http://img30.360buyimg.com/uba/jfs/t25312/11/1970953126/3863/ae324722/5bc05c0bN6b4c37cf.png') no-repeat;
            position:absolute; width:102px; height:102px;top:0px;left:-5px;z-index:10; background-size:106px 59px;"
          ></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlusMember',
}
</script>
