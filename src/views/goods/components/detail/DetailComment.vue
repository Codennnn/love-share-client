<template>
  <div
    ref="comment"
    class="relative p-3 bg-white radius overflow-hidden"
    :style="`max-height: ${maxHeight}px;`"
  >
    <div class="mb-1 flex justify-between items-center">
      <span class="mb-2 text-gray-600">留言板</span>
      <vs-button
        size="small"
        @click="postComment()"
      >发 送</vs-button>
    </div>
    <div>
      <vs-textarea
        label="问问更多细节~"
        counter="50"
        maxlength="50"
        v-model.trim="textContent"
        :counter-danger.sync="counterDanger"
      />
    </div>

    <VuePerfectScrollbar
      v-if="comments.length > 0"
      style="max-height: 550px;"
      :settings="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <ul class="mt-6 pt-2 pb-10 overflow-hidden">
        <li
          class="msg relative mb-2 transition"
          v-for="(cm, i) in comments"
          :key="i"
          :class="{'px-1 py-2 bg-gray-100 radius': currMsg === cm._id}"
        >
          <div class="flex items-center">
            <vs-avatar
              :src="`${cm.sender.avatar_url}?imageView2/2/w/50`"
              @click="viewUserDetail(cm.sender._id)"
            ></vs-avatar>
            <p class="name ml-1">
              {{ cm.sender.nickname }}
            </p>
            <p
              v-if="cm.sender._id === owner"
              class="owner ml-1"
            >主人</p>
            <p class="ml-2 text-xs text-gray-500">
              {{ $timeDiff(cm.created_at) }}
            </p>
          </div>
          <p class="ml-8 text-sm text-gray-600">{{ cm.content }}</p>
          <p
            class="reply absolute cursor-pointer"
            @click="showReplyInput(cm._id, cm.sender, 1)"
          >回复</p>

          <!-- 回复区 -->
          <ul
            v-if="cm.replies.length > 0"
            class="ml-6 p-2 bg-gray-100 radius"
          >
            <li
              class="reply-item"
              v-for="(it, index) in cm.replies"
              :key="index"
            >
              <p class="text-sm">
                <span>
                  <span
                    class="name cursor-pointer"
                    @click="viewUserDetail(it.sender._id)"
                  >{{ it.sender.nickname }}</span>
                  <span
                    v-if="it.sender._id === owner"
                    class="owner cursor-default"
                  >主人</span>
                </span>
                <span class="mx-1 text-gray-500">回复</span>
                <span>
                  <span
                    class="name cursor-pointer"
                    @click="viewUserDetail(it.at._id)"
                  >{{ it.at.nickname }}</span>
                  <span
                    v-if="it.at._id === owner"
                    class="owner cursor-default"
                  >主人</span>
                  :
                </span>
                <span class="text-gray-500">
                  {{ it.content }}
                </span>
                <i
                  title="回复"
                  class="reply-icon el-icon-chat-dot-square ml-2
                 cursor-pointer text-base text-gray-600"
                  @click="showReplyInput(it._id, it.sender, 2)"
                ></i>
              </p>
              <div
                v-if="currRep === it._id"
                class="mt-1 flex items-end"
              >
                <vs-input
                  class="flex-1 mr-1"
                  v-model="repContent"
                  :label-placeholder="placeholder"
                  @keyup.enter="replyComment(cm._id, it.sender._id)"
                />
                <vs-button
                  size="small"
                  @click="replyComment(cm._id, it.sender._id)"
                >回复</vs-button>
              </div>
            </li>
          </ul>
          <div
            v-if="currMsg === cm._id"
            class="mt-1 flex items-end"
          >
            <vs-input
              class="flex-1 mr-1"
              v-model="repContent"
              :label-placeholder="placeholder"
              @keyup.enter="replyComment(cm._id, cm.sender._id)"
            />
            <vs-button
              size="small"
              @click="replyComment(cm._id, cm.sender._id)"
            >回复</vs-button>
          </div>
        </li>
      </ul>
    </VuePerfectScrollbar>
    <p
      v-else
      class="mt-6 p-2 text-center text-sm text-gray-500 bg-gray-100 radius"
    >
      还没有留言，快来抢沙发吧！
    </p>
    <div v-if="showComments && !hideComment">
      <vs-pagination
        v-model="currPage"
        :total="Math.ceil(total / 5)"
      ></vs-pagination>
    </div>

    <div
      v-if="hideComment"
      class="hide-comment absolute left-0 bottom-0 w-full text-sm text-center text-gray-600"
      @click="showMoreComments()"
    >
      查看更多留言
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { postComment, replyComment } from '@/request/api/goods'

export default {
  name: 'DetailComment',
  components: { VuePerfectScrollbar },
  props: {
    goodsId: String,
    comments: Array,
    owner: String,
    total: Number,
  },

  watch: {
    currPage(page) {
      this.$emit('switchPage', page)
    },
  },

  data: () => ({
    counterDanger: true,
    maxHeight: 595,

    placeholder: '', // 留言输入框的占位文字
    textContent: '', // 留言内容
    repContent: '', // 回复内容
    currMsg: null, // 当前留言
    currRep: null, // 当前回复
    currPage: 1, // 当前留言的页数
    hideComment: false, // 显示 "查看更多留言"
    showComments: false, // 是否显示留言
  }),

  mounted() {
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.comment, (el) => {
      if (el.offsetHeight >= this.maxHeight) {
        this.hideComment = true
      } else {
        this.hideComment = false
      }
    })
  },

  deactivated() {
    this.maxHeight = 595
    this.showComments = false
  },

  methods: {
    async postComment() {
      if (this.textContent.length > 0) {
        const { code } = await postComment({
          owner: this.owner,
          goods_id: this.goodsId,
          content: this.textContent,
        })
        if (code === 2000) {
          this.$emit('refreshComments')
          this.textContent = ''
        }
      }
    },

    async replyComment(comment_id, at) {
      if (this.repContent.length > 0) {
        const { code } = await replyComment({
          goods_id: this.goodsId,
          comment_id,
          at,
          content: this.repContent,
        })
        if (code === 2000) {
          this.$emit('refreshComments')
          this.repContent = ''
          this.currMsg = null
          this.currRep = null
        }
      }
    },

    showReplyInput(id, { nickname }, type) {
      // type: 1-回复留言, 2-回复别人的回复
      this.placeholder = `回复 ${nickname}：`
      if (type === 1) {
        this.currRep = null
        if (this.currMsg === id) {
          this.currMsg = null
          return
        }
        this.currMsg = id
      }
      if (type === 2) {
        if (this.currRep) {
          this.currRep = null
          return
        }
        this.currMsg = null
        this.currRep = id
      }
    },

    showMoreComments() {
      this.maxHeight = 10000
      this.showComments = true
    },

    viewUserDetail(userId) {
      if (userId !== this.owner) {
        this.$router.push({
          path: '/user-detail',
          query: { userId },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.msg {
  .name {
    color: #718096;
    font-size: 0.875rem;
    font-weight: bold;
  }
  .owner {
    padding: 0.1rem 0.3rem;
    border-radius: 0.5rem;
    font-size: 0.6rem;
    font-weight: normal;
    color: rgba(var(--vs-primary), 1);
    background: rgba(var(--vs-primary), 0.15);
  }
  .reply {
    top: 6px;
    right: -30px;
    font-size: 0.9rem;
    color: #999;
    transition: all 0.3s;
    opacity: 0;
  }
  &:hover {
    .reply {
      right: 8px;
      opacity: 1;
      &:hover {
        color: rgba(var(--vs-primary), 0.9);
      }
    }
  }
  .reply-item {
    .reply-icon {
      display: none;
    }
    &:hover {
      .reply-icon {
        display: inline-block;
      }
    }
  }
}

.hide-comment {
  height: 60px;
  line-height: 80px;
  background-size: 200%;
  transition: background-position 0.5s linear;
  cursor: pointer;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  &:hover {
    background-position: 100% 0;
    background-image: linear-gradient(
      rgba(231, 238, 255, 0) 0%,
      rgba(231, 238, 255, 1) 100%
    );
  }
}
</style>
