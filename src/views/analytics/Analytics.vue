<template>
  <div id="dashboard-analytics">
    <div class="flex flex-wrap w-full">
      <!-- 卡片 1 -->
      <div class="lg:w-6/12 lg:pr-3 sm:w-full my-3 min-h-full">
        <div class="h-full text-white bg-purple rounded-lg shadow-xl">
          <div class="h-full relative flex flex-col justify-center items-center">
            <img
              class="decore-left absolute top-0 left-0"
              src="@/assets/images/pages/dashboard/decore_left.png"
              width="200"
              alt="装饰1"
            />
            <img
              class="decore-right absolute top-0 right-0"
              src="@/assets/images/pages/dashboard/decore_right.png"
              width="175"
              alt="装饰2"
            />
            <div class="circle flex justify-center items-center rounded-full">
              <i class="iconfont icon-safety"></i>
            </div>
            <p class="my-4 text-2xl font-medium">欢迎你，令狐聪</p>
            <p>上次登录时间为：2019-05-07 19：21</p>
          </div>
        </div>
      </div>
      <!-- 卡片 2 -->
      <div class="lg:w-3/12 lg:pl-3 lg:pr-3  my-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <area-chart
            icon="icon-group"
            color="primary"
            :chartData="subscribersGained"
            type="area"
          ></area-chart>
        </div>
      </div>
      <!-- 卡片 3 -->
      <div class="lg:w-3/12 lg:pl-3 my-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <area-chart
            icon="icon-invite"
            color="warning"
            :chartData="ordersRecevied"
            type="area"
          ></area-chart>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full">
      <!-- 卡片 4 -->
      <div class="lg:w-6/12 lg:pl-3 lg:pr-3 my-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <div class="w-full lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 mb-base">
            <vue-apex-charts
              type="bar"
              height=200
              :options="salesBar.chartOptions"
              :series="salesBar.series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import AreaChart from './components/AreaChart.vue';
import { subscribersGained, ordersRecevied, salesBar } from './components/chart-data';

export default {
  name: 'Analytics',
  components: {
    VueApexCharts,
    AreaChart,
  },
  data() {
    return {
      subscribersGained,
      ordersRecevied,
      salesBar,
      show: true,
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
.bg-purple {
  background: linear-gradient(
    to right,
    rgba(var(--vs-primary), 1),
    rgba(var(--vs-primary), 0.7)
  );
}

.circle {
  width: 70px;
  height: 70px;
  background: rgba(120, 108, 240, 0.8);

  .iconfont {
    font-size: 30px;
  }
}

@media (max-width: 576px) {
  .decore-left,
  .decore-right {
    width: 140px;
  }
}
</style>
