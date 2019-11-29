<template>
  <div class="mt-4 flex items-start">
    <!-- 菜单 -->
    <div class="w-1/5 bg-white rounded-lg">
      <vs-collapse>
        <vs-collapse-item
          open
          v-for="(menu, i) in menus"
          :key="i"
        >
          <div slot="header">
            {{ menu.title }}
          </div>
          <ul class="ml-2 text-gray-600">
            <li
              class="mb-2"
              v-for="(submenu, i) in menu.submenus"
              :key="i"
              @click="getArticle()"
            >
              {{ submenu.title }}
            </li>
          </ul>
        </vs-collapse-item>
      </vs-collapse>
    </div>

    <!-- 内容 -->
    <div
      id="artical-loading"
      class="vs-con-loading__container w-4/5 pl-6"
    >
      <div class="p-4 bg-white rounded-lg">
        <div class="flex items-center justify-between">
          <div class="text-xl font-bold">{{ article.title }}</div>
        </div>
        <vs-divider />
        <div v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/request/api/service'

const menus = [
  {
    title: '购物指南',
    submenus: [
      { title: '用户协议' },
      { title: '交易条款' },
      { title: '购物流程' },
    ],
  },
  {
    title: '支付问题',
    submenus: [
      { title: '支付流程' },
      { title: '在线支付' },
      { title: '货到付款' },
    ],
  },
  {
    title: '售后服务',
    submenus: [
      { title: '售后政策（三方）' },
      { title: '退换货申请' },
      { title: '售后常见问题' },
    ],
  },
  {
    title: '账户及会员',
    submenus: [
      { title: '账户安全与账户信息' },
      { title: '账户资产' },
      { title: '会员介绍' },
    ],
  },
]

export default {
  name: 'HelpCenter',
  data: () => ({
    menus,
    article: {},
  }),

  mounted() {
    this.getArticle()
  },

  methods: {
    async getArticle() {
      this.$vs.loading({
        container: '#artical-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getArticle()
        if (code === 2000) {
          this.article = data.article
        }
      } finally {
        this.$vs.loading.close('#artical-loading > .con-vs-loading')
      }
    },
  },
}
</script>
