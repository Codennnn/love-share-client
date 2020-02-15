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
          title="关注的人"
          color="primary"
        ></vs-list-header>
        <template v-if="follows.length > 0">
          <vs-list-item
            v-for="it in follows"
            :key="it._id"
            :title="it.user.nickname"
            :subtitle="it.user.introduction"
          >
            <template slot="avatar">
              <vs-avatar :src="`${it.user.avatar_url}?imageView2/2/w/50`" />
            </template>
            <vs-button
              v-if="isInFollows(it.user._id)"
              size="small"
              color="#ccc"
              @click="unsubscribe(it.user._id)"
            >已关注</vs-button>
            <vs-button
              v-else
              size="small"
              @click="subscribe(it.user._id)"
            >关注</vs-button>
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
import Vue from 'vue'

import { getUserFollows, subscribe, unsubscribe } from '@/request/api/user'

export default {
  name: 'UserFollows',
  data: () => ({
    follows: [],
    ids: {},
  }),

  computed: {
    isInFollows() {
      return id => Object.prototype.hasOwnProperty.call(this.ids, id)
    },
  },

  created() {
    this.getUserFollows()
  },

  methods: {
    async getUserFollows() {
      const { code, data } = await getUserFollows()
      if (code === 2000) {
        data.follows.forEach((el) => {
          this.ids[el.user._id] = el.user._id
        })
        this.follows = data.follows
      }
    },

    // 关注
    async subscribe(user_id) {
      const { code } = await subscribe({ user_id })
      if (code === 2000) {
        Vue.set(this.ids, user_id)
      }
    },

    // 取消关注
    async unsubscribe(user_id) {
      const { code } = await unsubscribe({ user_id })
      if (code === 2000) {
        Vue.delete(this.ids, user_id)
      }
    },
  },
}
</script>
