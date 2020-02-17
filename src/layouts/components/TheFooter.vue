<template>
  <div>
    <div class="grid text-gray-600">
      <div>
        <h3 class="title">物品分类</h3>
        <ul>
          <li
            class="item"
            v-for="it in categoryList"
            :key="it._id"
          >
            <span>{{ it.name }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">配送方式</h3>
        <ul>
          <li
            class="item"
            v-for="it in peisong"
            :key="it"
          >
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">支付方式</h3>
        <ul>
          <li
            class="item"
            v-for="it in payment"
            :key="it"
          >
            <span>{{ it }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="title">联系方式</h3>
        <ul>
          <li
            class="item"
            v-for="it in contacts"
            :key="it"
          >
            <span>{{ it }}</span>
          </li>
          <li class="item">
            项目地址：
            <a
              href="https://gitee.com/chinesee/love-share-client"
              target="_blank"
            >点击查看</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer text-gray-600 text-sm">
      <span class="mr-6">
        © LoveShare 2020. 版权所有
      </span>
      <span>
        ICP证：
      </span>
    </div>
  </div>
</template>

<script>
const peisong = [
  '上门自提',
  '211限时达',
  '配送服务查询',
  '配送费收取标准',
  '海外配送',
]
const payment = [
  '货到付款',
  '在线支付',
  '分期付款',
  '邮局汇款',
  '公司转账',
]
const contacts = [
  'Phone：13724540846',
  'Wechat：czc12580520',
  'Email：czc12580520@gmail.com',
]
export default {
  name: 'TheFooter',
  data: () => ({
    peisong,
    payment,
    contacts,
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  padding: 3rem 8rem 1rem 8rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .title {
    margin-bottom: 1rem;
    color: $text-main-color;
  }
  .item {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    span {
      cursor: pointer;
    }
  }
}

.footer {
  padding: 1rem 8rem;
}
</style>
