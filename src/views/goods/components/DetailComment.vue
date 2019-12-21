<template>
  <div class="mt-6 p-3 bg-white rounded-lg">
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
        v-model="textContent"
        :counter-danger.sync="counterDanger"
      />
    </div>
    <ul
      v-if="comments.length > 0"
      class="mt-6 pt-2"
    >
      <li
        class="msg relative mb-2 overflow-hidden"
        v-for="(comment, i) in comments"
        :key="i"
        :class="{'px-1 py-2 bg-gray-100 rounded-lg': currMsg === comment._id}"
      >
        <div class="flex items-center">
          <vs-avatar :src="`${comment.sender.avatar_url}?imageView2/2/w/50`"></vs-avatar>
          <p class="name ml-1">
            {{ comment.sender.nickname }}
          </p>
          <p class="ml-2 text-sm text-gray-500">
            {{ timeDiff(comment.created_at) }}
          </p>
        </div>
        <p class="ml-8 text-sm text-gray-600">{{ comment.content }}</p>
        <p
          class="reply absolute cursor-pointer"
          @click="reply(comment._id, comment.sender.nickname)"
        >回复</p>
        <ul
          v-if="comment.replies.length > 0"
          class="ml-6 p-2 bg-gray-100 rounded-lg"
        >
          <li
            v-for="(it, index) in comment.replies"
            :key="index"
            class="reply-item"
          >
            <p class="text-sm">
              <span class="name cursor-pointer">{{ it.sender.nickname }}</span>
              <span class="mx-1 text-gray-500">回复</span>
              <span class="name cursor-pointer">{{ it.at.nickname }}:</span>
              <span class="text-gray-500">
                {{ it.content }}
              </span>
              <i
                title="回复"
                class="reply-icon el-icon-chat-dot-square ml-2
                 cursor-pointer text-base text-gray-600"
                @click="rep(it._id, it.at.nickname)"
              ></i>
            </p>
            <div
              v-if="currRep === it._id"
              class="mt-1 flex"
            >
              <vs-input
                class="flex-1 mr-1"
                v-model="repContent"
                :placeholder="placeholder"
                @keyup.enter="replyComment(comment._id, it.sender._id)"
              />
              <vs-button
                size="small"
                @click="replyComment(comment._id, it.sender._id)"
              >回复</vs-button>
            </div>
          </li>
        </ul>
        <div
          v-if="currMsg === comment._id"
          class="mt-1 flex"
        >
          <vs-input
            class="flex-1 mr-1"
            v-model="repContent"
            :placeholder-label="placeholder"
            @keyup.enter="replyComment(comment._id, comment.sender._id)"
          />
          <vs-button
            size="small"
            @click="replyComment(comment._id, comment.sender._id)"
          >回复</vs-button>
        </div>
      </li>
    </ul>
    <p
      v-else
      class="mt-6 p-2 text-center text-sm text-gray-500 bg-gray-100 rounded-lg"
    >
      还没有留言，快来抢沙发吧！
    </p>
  </div>
</template>

<script>
import { timeDiff } from '@/utils/util'

import { getGoodsComments, postComment, replyComment } from '@/request/api/goods'

export default {
  name: 'DetailComment',
  props: {
    goodsId: String,
  },

  data: () => ({
    timeDiff,
    comments: [],
    counterDanger: true,
    placeholder: '',

    textContent: '',
    repContent: '',
    currMsg: null,
    currRep: null,
  }),

  watch: {
    goodsId: {
      handler(v) {
        if (v.length > 0) {
          this.getGoodsComments()
        }
      },
      immediate: true,
    },
  },

  methods: {
    async getGoodsComments() {
      const { code, data } = await getGoodsComments({ goods_id: this.goodsId })
      if (code === 2000) {
        this.comments = data.comments
      }
    },

    async postComment() {
      if (this.textContent.length > 0) {
        const { code } = await postComment({
          goods_id: this.goodsId,
          content: this.textContent,
        })
        if (code === 2000) {
          this.getGoodsComments()
          this.textContent = ''
        }
      }
    },

    async replyComment(comment_id, at) {
      const { code } = await replyComment({
        goods_id: this.goodsId,
        comment_id,
        at,
        content: this.repContent,
      })
      if (code === 2000) {
        this.getGoodsComments()
        this.repContent = ''
        this.currMsg = null
        this.currRep = null
      }
    },

    reply(id, nickname) {
      this.currRep = null
      this.placeholder = `回复 ${nickname}：`
      if (this.currMsg === id) {
        this.currMsg = null
        return
      }
      this.currMsg = id
    },

    rep(id, nickname) {
      this.currMsg = null
      this.placeholder = `回复 ${nickname}：`
      if (this.currRep === id) {
        this.currRep = null
        return
      }
      this.currRep = id
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
</style>
