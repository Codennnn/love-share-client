<template>
  <div class="main">
    <div class="card">
      <div class="card-header">
        <p class="mr-3">订单号：{{ detail.order_id }}</p>
        <el-tooltip
          content="复制订单号"
          effect="light"
        >
          <i
            class="iconfont icon-copy cursor-pointer"
            style="font-size: 20px;"
            v-clipboard:copy="detail.order_id"
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
              <div class="value">{{ detail.address }}</div>
            </div>
            <div class="order-info__item">
              <div class="label">订单状态</div>
              <div class="value">{{ detail.status }}</div>
            </div>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">创建时间</div>
              <div class="value">{{ detail.create_time }}</div>
            </div>
            <div class="order-info__item">
              <div class="label">付款时间</div>
              <div class="value">{{ detail.create_time }}</div>
            </div>
            <div class="order-info__item">
              <div class="label">支付方式</div>
              <div class="value">{{ detail.payment }}</div>
            </div>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">备注信息</div>
              <div class="value text-sm">{{ detail.note || '无备注' }}</div>
            </div>
          </div>
        </div>

        <!-- 衣物表格 -->
        <div class="py-6">
          <vs-table
            noDataText="暂无数据"
            :data="infos"
          >
            <template slot="header">
              <div class="p-4">衣物信息</div>
            </template>
            <template slot="thead">
              <vs-th>#</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>数量</vs-th>
              <vs-th>价格</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td :data="tr.img_urls[0]">
                  <el-image
                    class="rounded-lg border-gray-500"
                    style="width: 80px; height: 80px"
                    fit="cover"
                    :src="tr.img_urls[0]"
                  >
                  </el-image>
                </vs-td>
                <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                <vs-td :data="tr.price">1</vs-td>
                <vs-td :data="tr.price">￥{{ tr.price }}</vs-td>
                <vs-td>
                  <i
                    class="el-icon-more p-2 text-gray-600 cursor-pointer"
                    @click="$router.push({path: '/goods-detail'})"
                  ></i>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div class="flex flex-col items-end">
          <div>已付款</div>
          <div class="price">￥{{ detail.total }}</div>
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
            <div class="value">{{ detail.buyer_name }}</div>
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
            <div class="value">{{ detail.phone }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStep from './components/OrderStep.vue'

import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      detail: {},
      text: '123',
      orderID: '',
      infos: [],
    }
  },

  components: { OrderStep },

  mounted() {
    this.orderID = this.$route.query.orderID
    this.getOrderDetail(this.$route.query.orderID)
  },

  methods: {
    async getOrderDetail() {
      try {
        const { code, data } = await getOrderDetail()
        if (code === 2000) {
          this.detail = data.detail
          this.infos = data.detail.goods
        }
      } catch {
        //
      }
    },

    onCopy(e) {
      this.$message(`已复制订单编号：${e.text}  🎉`)
    },
  },
}
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
