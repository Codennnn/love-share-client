<template>
  <el-steps
    align-center
    :active="stepsData.active"
  >
    <el-step
      v-for="(step, i) in stepsData.steps"
      :key="i"
      :title="step.title"
    >
      <div slot="description">{{ step.description }}</div>
    </el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'OrderStep',
  props: {
    stepsData: {
      type: Object,
      required: true,
    },
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
