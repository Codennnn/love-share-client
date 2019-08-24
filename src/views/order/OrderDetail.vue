<template>
  <div class="main">
    <div class="card">
      <div class="card-header">
        <p class="mr-3">订单号： 123456789987654321</p>
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
        <div class="flex order-info">
          <div class="w-1/3 order-info__col">
            <div class="order-info__item">
              <div class="label">收货地址</div>
              <div class="value">广州市海珠区飞天小区</div>
            </div>
            <div class="order-info__item">
              <div class="label">创建时间</div>
              <div class="value">2019-08-17 14:25</div>
            </div>
          </div>
          <div class="w-1/3 order-info__col">
            <div class="order-info__item">
              <div class="label">订单状态</div>
              <div class="value">清洗中</div>
            </div>
          </div>
          <div class="w-1/3 order-info__col">1</div>
        </div>
        <div class="py-6">
          <vs-table :data="users">
            <template slot="header">
              <h3 class="p-2">
                衣物信息
              </h3>
            </template>
            <template slot="thead">
              <vs-th>品种</vs-th>
              <vs-th> 价格</vs-th>
              <vs-th>件数</vs-th>
              <vs-th>状态</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td :data="data[i].email">
                  {{data[i].email}}
                </vs-td>

                <vs-td :data="data[i].price">
                  {{data[i].price}}
                </vs-td>

                <vs-td :data="data[i].id">
                  {{data[i].id}}
                </vs-td>

                <vs-td :data="data[i].id">
                  {{data[i].website}}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div class="flex flex-col items-end">
          <div>已付款</div>
          <div class="price">￥29.50</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <p>操作流水线</p>
      </div>
      <vs-divider />
      <el-steps
        :active="1"
        align-center
      >
        <el-step title="创建订单">
          <div slot="description">这是一段很长很长很长的描述性文字3</div>
        </el-step>
        <el-step
          title="已送至工厂"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
        <el-step
          title="清洗中"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
        <el-step title="正在派送">
          <div slot="description">这是一段很长很长很长的描述性文字3</div>
        </el-step>
        <el-step
          title="已送达"
          description="这是一段很长很长很长的描述性文字"
        ></el-step>
      </el-steps>
    </div>

    <div class="card">
      <div class="card-header">
        <p>用户信息</p>
      </div>
      <vs-divider />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '123',
      users: [
        {
          id: 1,
          price: '￥35.50',
          name: '毛衣',
          username: 'Bret',
          email: 'Sincere@april.biz',
          website: 'hildegard.org',
        },
        {
          id: 2,
          price: '￥35.50',
          name: 'Ervin Howell',
          username: 'Antonette',
          email: 'Shanna@melissa.tv',
          website: 'anastasia.net',
        },
        {
          id: 3,
          price: '￥35.50',
          name: 'Clementine Bauch',
          username: 'Samantha',
          email: 'Nathan@yesenia.net',
          website: 'ramiro.info',
        },
      ],
    };
  },

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

.order-info__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 28%;
  color: #a0a0a0;
}

.price {
  color: rgba(var(--vs-success), 1);
  font-size: 30px;
  font-weight: bold;
}
</style>
