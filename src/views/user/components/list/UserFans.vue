<template>
  <div class="p-6 bg-white radius">
    <div class="mb-4 flex">
      <vs-button
        color="#999"
        type="flat"
        size="large"
        icon="arrow_back"
        @click="$router.go(-1)"
      >返回</vs-button>
    </div>
    <div class="w-1/3">
      <vs-list>
        <vs-list-header
          title="我的粉丝"
          color="primary"
        ></vs-list-header>
        <template v-if="fans.length > 0">
          <vs-list-item
            v-for="it in fans"
            :key="it._id"
            :title="it.user.nickname"
            :subtitle="it.user.introduction"
          >
            <template slot="avatar">
              <vs-avatar :src="`${it.user.avatar_url}?imageView2/2/w/50`" />
            </template>
          </vs-list-item>
        </template>
        <div v-else>
          <div class="p-3 text-gray-600 text-center">暂无关注任何人</div>
        </div>
      </vs-list>
    </div>
  </div>
</template>

<script>
import { getUserFans } from '@/request/api/user'

export default {
  name: 'UserFans',
  data: () => ({
    fans: [],
  }),

  created() {
    this.getUserFans()
  },

  methods: {
    async getUserFans() {
      const { code, data } = await getUserFans()
      if (code === 2000) {
        this.fans = data.fans
      }
    },
  },
}
</script>
