<template>
  <div class="flex flex-col justify-between h-full">
    <div class="p-6 pb-0">
      <div class="flex items-center justify-center w-12 h-12 bg-purple-300 rounded-full">
        <i class="iconfont icon-group icon"></i>
      </div>
      <div>
        <h2 class="my-2 font-bold">82.5K</h2>
        <span class="text-gray-500">xxxewf</span>
      </div>
    </div>
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
.icon {
  font-size: 1.5rem;
}
</style>
