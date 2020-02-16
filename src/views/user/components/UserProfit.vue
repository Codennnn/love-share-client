<template>
  <div class="p-6 bg-white radius">
    <div class="text-xl font-bold text-gray-600">财富收益</div>
    <vs-divider />
    <div class="w-2/3 py-6 flex justify-around">
      <div class="box">
        <div>
          <i class="el-icon-money text-4xl text-gray-600"></i>
        </div>
        <div class="ml-5">
          <div class="text-2xl font-bold">{{ balance || '0.00' }}</div>
          <div class="text-gray-600 text-sm">余额</div>
        </div>
      </div>
      <div class="box">
        <div>
          <i class="el-icon-cherry text-4xl text-gray-600"></i>
        </div>
        <div class="ml-5">
          <div class="text-2xl font-bold">{{ beans }}</div>
          <div class="text-gray-600 text-sm">乐豆</div>
        </div>
      </div>
      <div class="box">
        <div>
          <i class="el-icon-postcard text-4xl text-gray-600"></i>
        </div>
        <div class="ml-5">
          <div class="text-2xl font-bold">
            {{ '0' }}
            <span class="text-base font-medium">张</span>
          </div>
          <div class="text-gray-600 text-sm">优惠券</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfit',
  data: () => ({}),

  computed: {
    balance() {
      return this.$store.state.user.info.balance?.toFixed(2)
    },

    beans() {
      return this.$store.state.user.info.beans
    },
  },
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
}

.box {
  margin-right: 1.5rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: $large-radius;
  box-shadow: $base-shadow;
  cursor: pointer;
}
</style>
