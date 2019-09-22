<template>
  <div class="grid">
    <div
      v-for="(item, i) in 8"
      :key="i"
      class="item"
    >
      <div class="img-wrapper">
        <img src="@/assets/cloth.png" />
      </div>
      <div class="title">衬衫</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 18px;
}

.item {
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  .img-wrapper {
    padding: 20px;
  }
}

.title {
  padding: 8px 0;
  text-align: center;
  color: #fff;
  background: rgba(var(--vs-primary), 1);
}
</style>
