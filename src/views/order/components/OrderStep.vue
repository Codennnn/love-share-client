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
