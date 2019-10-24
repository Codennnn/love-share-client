<template>
  <div>
    <div class="mb-6 bg-white rounded-lg p-5">
      <div class="flex items-center">
        <div class="w-1/2 flex items-center">
          <vs-avatar
            class="mr-6"
            size="100px"
            :src="userDetail.avatar_url"
          />
          <div>
            <div class="mb-4">
              <span class="font-bold text-2xl">{{ userDetail.nickname }}</span>
              <span>（{{ userDetail.real_name }}）</span>
              <span
                class="my-2 py-1 px-3 text-center text-sm text-white"
                style="border-radius: 0.3rem;background: rgba(var(--vs-primary), 0.9)"
              >{{ userDetail.school }}</span>
            </div>
            <div>
              <vs-chip :color="getCreditColor(userDetail.credit_value)">
                乐享信用值：{{ userDetail.credit_value }} / 1000
              </vs-chip>
              <vs-progress
                :height="8"
                :percent="(userDetail.credit_value / 1000) * 100"
                :color="getCreditColor(userDetail.credit_value)"
              ></vs-progress>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex justify-around">
          <div class="flex flex-col items-center justify-center">
            <div>TA的关注</div>
            <div class="mt-4 text-2xl font-bold">{{ userDetail.follow_num }}</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div>TA的粉丝</div>
            <div class="mt-4 text-2xl font-bold">{{ userDetail.fans_num }}</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <div>TA的关注</div>
            <div class="mt-4 text-2xl font-bold">{{ `12` }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-1/3">
        </div>
        <div class="flex justify-end w-2/3">
          <vs-button
            class="mr-4"
            color="#646464"
            type="flat"
            @click="currentComponent = 'UserBaseInfo'"
          >详细资料</vs-button>
          <vs-button
            class="mr-4"
            color="#646464"
            type="flat"
            @click="currentComponent = 'UserBaseInfo'"
          >我的消息</vs-button>
          <vs-button
            color="#646464"
            type="flat"
            @click="currentComponent = 'UserChangePassword'"
          >修改密码</vs-button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="animated fadeInLeft quickly"
      leave-active-class="animated fadeOutRight quickly"
      mode="out-in"
    >
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import UserBaseInfo from './components/UserBaseInfo.vue'

import { getUserDetail } from '@/request/api/user'

const UserChangePassword = Vue.component(
  'UserChangePassword',
  () => import('./components/UserChangePassword.vue'),
)

export default {
  name: 'UserDetail',
  data: () => ({
    currentComponent: 'UserBaseInfo',
    userDetail: {},
  }),

  components: { UserBaseInfo, UserChangePassword },

  mounted() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const { code, data } = await getUserDetail()
      if (code === 2000) {
        this.userDetail = data.user_detail
      }
    },

    getCreditColor(val) {
      if (val >= 500 && val <= 690) {
        return 'primary'
      }
      if (val > 690) {
        return 'success'
      }
      if (val < 490 && val >= 390) {
        return 'warning'
      }
      if (val < 390) {
        return 'danger'
      }
      return 'primary'
    },
  },
}
</script>

<style lang="scss" scoped>
.quickly {
  animation-duration: 0.3s;
}
</style>
