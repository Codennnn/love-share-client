<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">详细资料</div>
    <vs-divider />
    <div class="flex">
      <div
        class="w-1/3"
        style="font-size: 14px;"
      >
        <InfoItem
          label="昵称"
          :value="detailInfo.nickname"
        />
        <InfoItem
          label="真实姓名"
          :value="detailInfo.real_name"
        />
        <InfoItem
          label="手机号码"
          :value="detailInfo.phone"
        />
        <InfoItem
          label="性别"
          :value="detailInfo.gender === '0' ? '女' : detailInfo.gender === '1' ? '男' : '未填写'"
        />
        <InfoItem
          label="QQ"
          :value="detailInfo.qq"
        />
        <InfoItem
          label="微信"
          :value="detailInfo.wechat"
        />
        <InfoItem
          label="学校"
          :value="detailInfo.school && detailInfo.school.label"
        />
        <vs-button
          v-auth
          class="w-24 mt-6"
          style="margin-left: 6.5rem;"
          type="border"
          size="small"
          @click="showSidebar = true"
        >编辑资料</vs-button>
      </div>
      <div class="mb-6 w-1/3">
        <vs-chip :color="setCreditColor(detailInfo.credit_value)">
          乐享信用值：{{ detailInfo.credit_value }} / 1000
        </vs-chip>
        <vs-progress
          :height="8"
          :percent="(detailInfo.credit_value / 1000) * 100"
          :color="setCreditColor(detailInfo.credit_value)"
        ></vs-progress>
      </div>
    </div>

    <EditUserInfo
      :info="detailInfo"
      :isSidebarActive="showSidebar"
      @closeSidebar="showSidebar = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoItem from './InfoItem.vue'

import { setCreditColor } from '@/utils/util'
import { getUserDetailInfo } from '@/request/api/user'

const EditUserInfo = Vue.component(
  'EditUserInfo',
  () => import('./EditUserInfo.vue'),
)

export default {
  name: 'UserDetailInfo',
  data: () => ({
    setCreditColor,
    showSidebar: false,
    detailInfo: {},
  }),

  components: { InfoItem, EditUserInfo },

  mounted() {
    this.getUserDetailInfo()
  },

  methods: {
    async getUserDetailInfo() {
      try {
        const { code, data } = await getUserDetailInfo()
        if (code === 2000) {
          this.detailInfo = data.detail_info
        }
      } catch {
        // TODO
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
