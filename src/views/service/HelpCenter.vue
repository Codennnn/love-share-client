<template>
  <div>
    <div class="w-1/5 bg-white rounded-lg">
      <vs-collapse>
        <vs-collapse-item
          v-for="(menu, index) in menus"
          :key="index"
        >
          <div slot="header">
            {{ menu.title }}
          </div>
          <ul class="ml-2 text-gray-600">
            <li
              class="mb-2"
              v-for="(submenu, index) in menu.submenus"
              :key="index"
            >
              {{ submenu.title }}
            </li>
          </ul>
        </vs-collapse-item>
      </vs-collapse>
    </div>
  </div>
</template>

<script>

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
    title: '售后服务',
    submenus: [
      { title: '售后政策（三方）' },
      { title: '退换货申请' },
      { title: '售后常见问题' },
    ],
  },
]

export default {
  name: 'HelpCenter',
  data: () => ({
    menus,
  }),

  mounted() {
  },

  methods: {
    async getUserDetail() {
      // try {
      // } catch {
      //   // TODO
      // }
    },
  },
}
</script>
