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
        v-model="content"
        :counter-danger.sync="counterDanger"
      />
    </div>
    <ul
      v-if="comments.length > 0"
      class="mt-6 pt-2"
    >
      <li
        class="msg relative mb-2 overflow-hidden"
        v-for="(item, i) in comments"
        :key="i"
        :class="{'px-1 py-2 bg-gray-100 rounded-lg': currMsg === item._id}"
      >
        <div class="flex items-center">
          <vs-avatar :src="`${item.sender.avatar_url}?imageView2/2/w/50`"></vs-avatar>
          <p class="name ml-1">
            {{ item.sender.nickname }}
          </p>
          <p class="ml-2 text-sm text-gray-500">{{ timeDiff(item.created_at) }}</p>
        </div>
        <p class="ml-8 text-sm text-gray-600">{{ item.content }}</p>
        <p
          class="reply absolute cursor-pointer"
          @click="reply(item._id, item.sender.nickname)"
        >回复</p>
        <ul
          v-if="item.replies.length === 0"
          class="ml-6 p-2 bg-gray-100 rounded-lg"
        >
          <li class="reply-item">
            <p class="text-sm">
              <span class="name cursor-pointer">{{ '令狐少侠' }}</span>
              <span class="mx-1 text-gray-500">回复</span>
              <span class="name cursor-pointer">{{ '令狐少侠' }}:</span>
              <span class="text-gray-500">
                {{ '令狐少侠令狐少侠令狐少侠令狐少侠令狐少侠令狐少侠' }}
              </span>
              <i
                title="回复"
                class="reply-icon el-icon-chat-dot-square ml-2 cursor-pointer text-base
                text-gray-600"
              ></i>
            </p>
          </li>
        </ul>
        <div
          v-if="currMsg === item._id"
          class="mt-1 flex"
        >
          <vs-input
            class="flex-1 mr-1"
            :placeholder="placeholder"
          />
          <vs-button size="small">回复</vs-button>
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

import { postComment, replyComment } from '@/request/api/goods'

export default {
  name: 'DetailComment',
  props: {
    goodsId: String,
    comments: Array,
  },

  data: () => ({
    timeDiff,
    content: '',
    counterDanger: true,
    currMsg: null,
    placeholder: '',
  }),

  methods: {
    async postComment() {
      await postComment({
        goods_id: this.goodsId,
        content: this.content,
      })
    },

    async replyComment() {
      await replyComment({
        comment_id: this.goodsId,
        content: this.content,
      })
    },

    reply(id, nickname) {
      this.placeholder = `回复 ${nickname}：`
      if (this.currMsg === id) {
        this.currMsg = null
        return
      }
      this.currMsg = id
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
