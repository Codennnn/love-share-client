<template>
  <div
    class="main vs-con-loading__container"
    id="div-with-loading"
  >
    <div v-if="detail">
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
                <div class="value">
                  <el-tag :type="status[detail.status].color">
                    {{ status[detail.status].text }}
                  </el-tag>
                </div>
              </div>
              <div class="order-info__item">
                <div class="label">运费设置</div>
                <div class="value">{{ detail.delivery_method }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="order-info__item">
                <div class="label">创建时间</div>
                <div class="value">{{ detail.create_time }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">发货时间</div>
                <div class="value">{{ detail.create_time }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">支付方式</div>
                <div class="value">{{ detail.payment }}</div>
              </div>
            </div>
            <div class="order-info__col">
              <div class="order-info__item">
                <div class="label">买家留言</div>
                <div class="value">{{ detail.note || '无备注' }}</div>
              </div>
            </div>
          </div>

          <!-- 所购商品表格 -->
          <div class="py-6">
            <vs-table
              noDataText="暂无数据"
              :data="infos"
            >
              <template slot="header">
                <div class="p-4">商品列表</div>
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
                      class="rounded-lg border-gray-500 cursor-pointer"
                      style="width: 80px; height: 80px"
                      fit="cover"
                      :src="tr.img_urls[0]"
                      @click="showViewer = true, urlList = tr.img_urls"
                    >
                    </el-image>
                  </vs-td>
                  <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                  <vs-td :data="tr.price">1</vs-td>
                  <vs-td :data="tr.price">￥{{ tr.price }}</vs-td>
                  <vs-td>
                    <i
                      title="查看详情"
                      class="el-icon-more p-2 text-gray-600 cursor-pointer"
                      @click="$router.push({path: '/goods-detail'})"
                    ></i>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <el-image-viewer
              v-if="showViewer"
              :on-close="() => showViewer = false"
              :url-list="urlList"
            />
          </div>
          <div class="flex flex-col items-end">
            <div>已付款</div>
            <div class="price">￥{{ detail.total }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <p>交易流程</p>
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
              <div class="value">{{ detail.user.name }}</div>
            </div>
            <div class="user-info__item">
              <div class="label">所在学校</div>
              <div class="value">{{ detail.user.school }}</div>
            </div>
          </div>
          <div class="user-info__col">
            <div class="user-info__item">
              <div class="label">用户 ID</div>
              <div class="value">{{ detail.user.user_id }}</div>
            </div>
          </div>
          <div class="user-info__col">
            <div class="user-info__item">
              <div class="label">联系方式</div>
              <div class="value">{{ detail.user.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
import OrderStep from './components/OrderStep.vue'

import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      showViewer: false,
      urlList: [],
      detail: null,
      text: '123',
      orderID: '',
      infos: [],
      status: {
        0: {
          text: '进行中',
          color: 'primary',
        },
        1: {
          text: '已完成',
          color: 'success',
        },
        2: {
          text: '已取消',
          color: 'danger',
        },
      },
    }
  },

  components: { ElImageViewer, OrderStep },

  mounted() {
    this.orderID = this.$route.query.orderID
    this.getOrderDetail(this.$route.query.orderID)
  },

  methods: {
    async getOrderDetail() {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getOrderDetail()
        if (code === 2000) {
          this.detail = data.detail
          this.infos = data.detail.goods
        }
      } catch {
        //
      }

      this.$vs.loading.close('#div-with-loading > .con-vs-loading')
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
    font-size: 15px;
  }
}

.price {
  color: rgba(var(--vs-success), 1);
  font-size: 30px;
  font-weight: bold;
}

.el-image-viewer__wrapper {
  &::v-deep .el-image-viewer__close {
    color: #ececec;
  }
}
</style>
