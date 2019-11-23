<template>
  <div class="p-6 bg-white rounded-lg">
    <div class="text-xl font-bold text-gray-600">详细资料</div>
    <vs-divider />
    <div class="flex">
      <!-- 乐享信用 -->
      <div class="w-1/3">
        <vs-chip :color="setCreditColor(detail.credit_value)">
          乐享信用值：{{ detail.credit_value }} / 1000
        </vs-chip>
        <vs-progress
          :height="8"
          :percent="(detail.credit_value / 1000) * 100"
          :color="setCreditColor(detail.credit_value)"
        ></vs-progress>
      </div>

      <!-- 用户资料 -->
      <div class="w-1/3 pl-4 text-sm">
        <InfoItem
          label="昵称"
          :value="detail.nickname"
        />
        <InfoItem
          label="真实姓名"
          :value="detail.real_name"
        />
        <InfoItem
          label="手机号码"
          :value="detail.phone"
        />
        <InfoItem
          label="性别"
          :value="detail.gender === '1' ? '男' : detail.gender === '2' ? '女' : '未填写'"
        />
        <InfoItem
          label="QQ"
          :value="detail.qq || '未填写'"
        />
        <InfoItem
          label="微信"
          :value="detail.wechat || '未填写'"
        />
        <InfoItem
          label="学校"
          :value="detail.school"
        />
        <vs-button
          class="w-24 mt-6"
          style="margin-left: 6.5rem;"
          type="border"
          size="small"
          @click="showSidebar = true"
        >编辑资料</vs-button>
      </div>

      <!-- 收货地址 -->
      <div class="w-1/3">
        <Address />
      </div>
    </div>

    <EditUserInfo
      :info="detail"
      :isSidebarActive="showSidebar"
      @closeSidebar="showSidebar = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import InfoItem from './user-detail-info/InfoItem.vue'
import Address from './user-detail-info/Address.vue'
import { setCreditColor } from '@/utils/util'

import { getUserDetail } from '@/request/api/user'

const EditUserInfo = Vue.component(
  'EditUserInfo',
  () => import('./user-detail-info/EditUserInfo.vue'),
)

export default {
  name: 'UserDetailInfo',
  components: { InfoItem, Address, EditUserInfo },

  data: () => ({
    setCreditColor,
    showSidebar: false,
    detail: {},
  }),

  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const { code, data } = await getUserDetail()
      if (code === 2000) {
        this.detail = data.user_detail
      }
    },
  },
}
</script>
