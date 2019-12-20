<template>
  <div class="mt-6 p-3 bg-white rounded-lg overflow-hidden">
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
        class="msg relative mb-2"
        v-for="(item, i) in comments"
        :key="i"
      >
        <div class="flex items-center">
          <vs-avatar :src="`${item.sender.avatar_url}?imageView2/2/w/50`"></vs-avatar>
          <p class="ml-1 text-sm text-gray-600 font-bold">
            {{ item.sender.nickname }}
          </p>
          <p class="ml-2 text-sm text-gray-500">{{ timeDiff(item.created_at) }}</p>
        </div>
        <p class="ml-8 text-sm text-gray-600">{{ item.content }}</p>
        <p class="reply absolute cursor-pointer">回复</p>
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

import { postComment } from '@/request/api/goods'

export default {
  name: 'DetailComment',
  props: {
    goodsId: String,
    comments: { type: Array, default: () => [] },
  },

  data: () => ({
    timeDiff,
    content: '',
    counterDanger: true,
  }),

  methods: {
    async postComment() {
      await postComment({
        goods_id: this.goodsId,
        content: this.content,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.msg {
  .reply {
    top: 6px;
    right: -40px;
    font-size: 0.9rem;
    color: #999;
    transition: all 0.3s;
  }
  &:hover {
    .reply {
      animation: fade 0.3s forwards;
      &:hover {
        color: rgba(var(--vs-primary), 0.9);
      }
    }
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      right: 8px;
    }
  }
}
</style>
