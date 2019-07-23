<template>
  <div id="dashboard-analytics">
    <div class="flex flex-wrap w-full">
      <div class="lg:w-6/12 lg:pr-3 sm:w-full min-h-full">
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
            <div class="circle flex justify-center items-center">
              <i class="iconfont icon-safety"></i>
            </div>
            <p class="my-4 text-2xl font-medium">欢迎你，令狐聪</p>
            <p>上次登录时间为：2019-05-07 19：21</p>
          </div>
        </div>
      </div>
      <div class="lg:w-3/12 lg:pl-3 lg:pr-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <chart
            :chartData="chartData.subscribersGained"
            type='area'
          ></chart>
        </div>
      </div>
      <div class="lg:w-3/12 lg:pl-3">
        <div class="bg-white rounded-lg shadow-xl h-full">
          <chart
            :chartData="chartData.subscribersGained"
            type='area'
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chart from './components/chart.vue';
import data from './components/data';
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  name: 'Analytics',
  components: {
    chart,
  },
  data() {
    return {
      chartData: data,
      show: true,
    };
  },

  mounted() {
    // this.drawChart();
  },

  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            smooth: true,
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.vx-card__body {
  color: #f4f4f4;
}

.bg-purple {
  background: linear-gradient(to right, $primary, rgba($primary, 0.7));
}

.circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(120, 108, 240, 0.8);

  .iconfont {
    font-size: 30px;
  }
}
</style>
