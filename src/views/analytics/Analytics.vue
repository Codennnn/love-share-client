<template>
  <div>
    <div class="flex flex-wrap w-full">
      <!-- 卡片 1：欢迎卡片 -->
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
      <!-- 卡片 2：关注者统计卡片 -->
      <div class="lg:w-3/12 lg:pl-3 lg:pr-3  my-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <area-chart
            icon="icon-group"
            color="primary"
            type="area"
            :chartData="subscribersGained"
          ></area-chart>
        </div>
      </div>
      <!-- 卡片 3：用户统计卡片 -->
      <div class="lg:w-3/12 lg:pl-3 my-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <area-chart
            icon="icon-invite"
            color="warning"
            type="area"
            :chartData="ordersRecevied"
          ></area-chart>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full">
      <!-- 卡片 4 -->
      <div class="lg:w-6/12 lg:pr-3 my-3">
        <div class="p-6 bg-white rounded-lg shadow-xl h-full">
          <div class="flex">
            <div class="w-full lg:w-1/2 xl:w-1/2 flex flex-col justify-between pr-4">
              <div>
                <div class="mb-1 text-2xl font-bold">2.7K</div>
                <span class="font-medium text-gray-500">交易额</span>
                <p class="mt-2 text-xl font-medium">
                  <span class='text-success'>+5.2%</span> vs last 7 days
                </p>
              </div>
              <vs-button
                icon="chevron_right"
                icon-after
                class="shadow-md w-full lg:mt-0 mt-4"
              >查看详细</vs-button>
            </div>
            <div class="w-full lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 mb-base px-2">
              <vue-apex-charts
                type="bar"
                height=200
                :options="salesBar.chartOptions"
                :series="salesBar.series"
              />
            </div>
          </div>
          <vs-divider class="my-6"></vs-divider>
          <div>
            <div class="flex">
              <div class="w-1/2 mb-3 pr-4">
                <p class="text-gray-600">Goal: $100000</p>
                <vs-progress
                  class="block mt-1"
                  :percent="50"
                  color="primary"
                ></vs-progress>
              </div>
              <div class="w-1/2 mb-3 pl-4">
                <p class="text-gray-600">Users: 100K</p>
                <vs-progress
                  class="block mt-1"
                  :percent="60"
                  color="warning"
                ></vs-progress>
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mb-3 pr-4">
                <p class="text-gray-600">Retention: 90%</p>
                <vs-progress
                  class="block mt-1"
                  :percent="70"
                  color="danger"
                ></vs-progress>
              </div>
              <div class="w-1/2 mb-3 pl-4">
                <p class="text-gray-600">Duration: 1yr</p>
                <vs-progress
                  class="block mt-1"
                  color="success"
                  :percent="90"
                ></vs-progress>
              </div>
            </div>
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
