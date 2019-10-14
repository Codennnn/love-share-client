<template>
  <div class="flex flex-col justify-between h-full">
    <div class="p-6 pb-0">
      <div
        class="flex items-center justify-center w-12 h-12 rounded-full"
        :style="{ background: `rgba(var(--vs-${color}), .15)` }"
      >
        <i
          class="iconfont icon"
          :class="[icon, `text-${color}`]"
        ></i>
      </div>
      <div>
        <div class="mt-3 text-2xl font-bold">{{ statistic }}</div>
        <span class="text-gray-500">{{ label }}</span>
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
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    statistic: String,
    label: String,
    icon: String,
    color: String,
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
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 1.5rem;
}
</style>
