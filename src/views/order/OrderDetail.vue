<template>
  <div class="main">
    <div class="card">
      <div class="card-header">
        <p class="mr-3">订单号：{{ `123456789987654321` }}</p>
        <el-tooltip
          content="复制订单号"
          effect="light"
        >
          <i
            class="iconfont icon-copy cursor-pointer"
            style="font-size: 20px;"
            v-clipboard:copy="text"
            v-clipboard:success="onCopy"
          ></i>
        </el-tooltip>
      </div>
      <vs-divider />
      <div>
        <!-- 订单信息 -->
        <div class="order-info">
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">收货地址</div>
              <div class="value">广州市海珠区飞天小区</div>
            </div>
            <div class="order-info__item">
              <div class="label">订单状态</div>
              <div class="value">清洗中</div>
            </div>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">创建时间</div>
              <div class="value">2019-08-17 14:25</div>
            </div>
            <div class="order-info__item">
              <div class="label">付款时间</div>
              <div class="value">2019-08-17 14:50</div>
            </div>
            <div class="order-info__item">
              <div class="label">支付方式</div>
              <div class="value">微信支付</div>
            </div>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">备注信息</div>
              <div class="value">务必清洗干净！!</div>
            </div>
          </div>
        </div>
        <!-- 衣物表格 -->
        <div class="py-6">
          <vs-table :data="infos">
            <template slot="header">
              <h3 class="p-2">
                衣物信息
              </h3>
            </template>
            <template slot="thead">
              <vs-th>品种</vs-th>
              <vs-th>状态</vs-th>
              <vs-th>价格</vs-th>
              <vs-th>件数</vs-th>
              <vs-th>金额</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.status">{{ tr.status }}</vs-td>
                <vs-td :data="tr.price">￥{{ tr.price }}</vs-td>
                <vs-td :data="tr.num">{{ tr.num }}</vs-td>
                <vs-td :data="tr.num">￥{{ (tr.price * tr.num).toFixed(2) }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div class="flex flex-col items-end">
          <div>已付款</div>
          <div class="price">￥{{ `107.60` }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <p>操作流水线</p>
      </div>
      <vs-divider />
      <OrderStep />
    </div>

    <div class="card">
      <div class="card-header">
        <p>用户信息</p>
      </div>
      <vs-divider />
      <div class="user-info">
        <div class="user-info__col">
          <div class="user-info__item">
            <div class="label">用户姓名</div>
            <div class="value">广州市海珠区飞天小区</div>
          </div>
          <div class="user-info__item">
            <div class="label">住址</div>
            <div class="value">广东省广州市从化区山顶洞438号</div>
          </div>
        </div>
        <div class="user-info__col">
          <div class="user-info__item">
            <div class="label">会员卡号</div>
            <div class="value">123456654321</div>
          </div>
        </div>
        <div class="user-info__col">
          <div class="user-info__item">
            <div class="label">联系方式</div>
            <div class="value">13724540846</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStep from './components/OrderStep.vue';

const infos = [
  {
    num: 1,
    price: '35.80',
    name: '毛衣',
    status: '清洗中',
  },
  {
    num: 2,
    price: '35.90',
    name: '短T恤衫',
    status: '清洗完毕',
  },
];

export default {
  name: 'OrderDetail',
  data() {
    return {
      text: '123',
      infos,
    };
  },

  components: { OrderStep },

  methods: {
    onCopy(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  .card-header {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }
}

.order-info,
.user-info {
  display: flex;
  .order-info__col,
  .user-info__col {
    width: 33.33%;
  }
  .order-info__item,
  .user-info__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .label {
    width: 28%;
    color: #a0a0a0;
    font-size: 15px;
  }
  .value {
    width: 66%;
  }
}

.price {
  color: rgba(var(--vs-success), 1);
  font-size: 30px;
  font-weight: bold;
}
</style>
