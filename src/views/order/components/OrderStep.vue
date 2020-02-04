<template>
  <el-steps
    align-center
    :active="step"
  >
    <el-step title="创建订单">
      <div slot="description">2019-08-17 14:25</div>
    </el-step>
    <el-step title="支付成功">
    </el-step>

    <el-step title="等待收货">
      <div slot="description">
        <div>2019-08-17 14:25</div>
      </div>
    </el-step>
    <el-step title="已送达">
    </el-step>
    <el-step title="交易完成">
    </el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'OrderStep',
  props: {
    step: Number,
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  .label {
    margin-right: 5px;
    padding: 2px 5px;
    color: gray;
    border-radius: 4px;
    font-size: 12px;
    background: #ebebeb;
  }
}
</style>
