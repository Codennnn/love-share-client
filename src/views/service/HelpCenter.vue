<template>
  <div class="mt-4 flex items-start">
    <!-- 菜单 -->
    <div class="w-1/5 bg-white rounded-lg">
      <vs-collapse>
        <vs-collapse-item
          open
          v-for="(guide, i) in guideList"
          :key="i"
        >
          <div slot="header">
            {{ guide.section }}
          </div>
          <ul class="ml-2 text-gray-600">
            <li
              class="mb-2"
              v-for="(article, i) in guide.articles"
              :key="i"
              @click="getArticle(guide._id, article._id)"
            >
              {{ article.title }}
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
import { getGuideList, getArticle } from '@/request/api/guide'

export default {
  name: 'HelpCenter',
  data: () => ({
    guideList: [],
    article: {},
  }),

  created() {
    this.getGuideList()
  },

  methods: {
    // 获取指引列表
    async getGuideList() {
      const { code, data } = await getGuideList()
      if (code === 2000) {
        this.guideList = data.guide_list
        const { _id, articles } = this.guideList.find(el => el.articles?.length > 0)
        this.getArticle(_id, articles[0]._id)
      }
    },

    // 获取文章
    async getArticle(section_id, article_id) {
      this.showEditor = false
      this.$vs.loading({
        container: '.article-container',
        scale: 1,
      })
      try {
        const { code, data } = await getArticle({
          section_id, article_id,
        })
        if (code === 2000) {
          this.article = data.article
        }
      } finally {
        this.$vs.loading.close('.article-container > .con-vs-loading')
      }
    },
  },
}
</script>
