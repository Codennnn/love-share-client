<template>
  <div :id="chartData.id">
    <vue-apex-charts
      ref="apexChart"
      height=100
      width='100%'
      :type="type"
      :options="chartData.chartOptions"
      :series="chartData.series"
    ></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'line',
    },
  },

  components: {
    VueApexCharts,
  },
};
</script>

<style lang="scss" scoped>
</style>
