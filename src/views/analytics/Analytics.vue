<template>
  <div id="dashboard-analytics">
    <vs-row :gutter="20">
      <vs-col
        class="lg:pr-3"
        vs-lg="6"
        vs-sm="12"
      >
        <div class="vx-card bg-purple">
          <div class="vx-card__body">
            <img
              src="@/assets/images/pages/dashboard/decore_left.png"
              width="200"
              class="decore-left"
              alt="装饰1"
            >
            <img
              src="@/assets/images/pages/dashboard/decore_right.png"
              width="175"
              class="decore-right"
              alt="装饰2"
            >
            <div class="circle">
              <i class="iconfont icon-safety"></i>
            </div>
            <p>欢迎你，令狐聪</p>
            <p>上次登录时间为：2019-05-07 19：21</p>
          </div>
        </div>
      </vs-col>
      <vs-col
        class="lg:pl-3"
        vs-lg="6"
        vs-sm="12"
      >
        <div class="vx-card bg-purple">
          <div class="vx-card__body">
            <img
              src="@/assets/images/pages/dashboard/decore_left.png"
              width="200"
              class="decore-left"
            >
            <img
              src="@/assets/images/pages/dashboard/decore_right.png"
              width="175"
              class="decore-right"
            >
            <div class="circle">
              <i class="iconfont icon-safety"></i>
            </div>
            <p>欢迎你，令狐聪</p>
            <p>上次登录时间为：2019-05-07 19：21</p>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'Analytics',
  components: {},
  data() {
    return { show: true };
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
            type: 'bar',
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
.vx-card {
  text-align: center;
  border-radius: 5px;
  box-shadow: $baseShadow;
}

.vx-card__body {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  color: #f4f4f4;
}

.decore-left {
  position: absolute;
  left: 0;
  top: 0;
}

.decore-right {
  position: absolute;
  right: 0;
  top: 0;
}

.bg-purple {
  background: linear-gradient(to right, $primary, rgba($primary, 0.7));
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(120, 108, 240, 0.8);

  .iconfont {
    font-size: 30px;
  }
}
</style>
