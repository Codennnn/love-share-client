<template>
  <div>
    <div class="mb-6 bg-white rounded-lg p-5">
      <div class="mb-3 flex items-center">
        <div class="w-1/2 flex items-center">
          <vs-avatar
            class="mr-6 avatar"
            size="100px"
            :src="info.avatar_url"
          />
          <div>
            <div class="mb-4">
              <span class="font-bold text-2xl">{{ info.nickname }}</span>
              <span>（{{ info.real_name }}）</span>
            </div>
            <span
              v-if="info.school"
              class="my-2 py-1 px-3 text-center text-sm text-white"
              style="border-radius: 0.3rem; background: rgba(var(--vs-primary), 0.9)"
            >{{ info.school.name }}</span>
          </div>
        </div>
        <div class="w-1/2 flex justify-around">
          <div
            class="flex flex-col items-center justify-center cursor-pointer"
            @click="$router.push('/user-follows')"
          >
            <div>关注的人</div>
            <div class="mt-4 text-2xl font-bold">{{ followsNum }}</div>
          </div>
          <div
            class="flex flex-col items-center justify-center cursor-pointer"
            @click="$router.push('/user-fans')"
          >
            <div>粉丝数</div>
            <div class="mt-4 text-2xl font-bold">{{ fansNum }}</div>
          </div>
          <div class="flex flex-col items-center justify-center cursor-pointer">
            <div>收藏夹</div>
            <div class="mt-4 text-2xl font-bold">{{ infoNum.collect_num }}</div>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-1/3">
          <vs-collapse>
            <vs-collapse-item :not-arrow="true">
              <vs-button
                slot="header"
                class="text-sm"
                color="dark"
                type="line"
              >个人简介</vs-button>
              <p class="text-gray-600 break-words">
                {{ info.introduction || '未填写' }}
              </p>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  data: () => ({
    userId: '',
    info: {},
  }),

  created() {
    this.userId = this.$route.query.userId
  },

}
</script>

<style lang="scss" scoped>
</style>
