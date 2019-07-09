<template>
  <div class="todo-bar--wrapper">
    <!-- 添加任务按钮 -->
    <vs-button
      style="width: 100%;"
      color="primary"
      type="filled"
      @click="activePopup"
    >添加任务</vs-button>

    <div
      class="label-item"
      :class="{ 'label-active': currentActive === 5 }"
      @click="setActive('all', 5)"
    >
      <i class="iconfont icon-task-all label-icon"></i>
      <span class="label-text">所有任务</span>
    </div>

    <!-- 筛选项 -->
    <div class="label-title">筛 选</div>
    <div
      class="label-item"
      :class="{ 'label-active': currentActive === index }"
      v-for="(item, index) in labelItems"
      :key="index"
      @click="setActive(item.type, index)"
    >
      <i
        class="iconfont label-icon"
        :class="item.icon"
      ></i>
      <span class="label-text">{{ item.text }}</span>
    </div>
    <!-- end -->

    <!-- 标签项 -->
    <div class="label-title">标 签</div>
    <div
      class="label-item"
      v-for="(item, index) in labelMarks"
      :key="index + 10"
      :class="{ 'label-active': currentActive === index + 10 }"
      @click="setActive(item.type, index + 10)"
    >
      <div
        class="label-dot"
        :style="{ 'background-color': item.bg }"
      ></div>
      <span class="label-text">{{ item.text }}</span>
    </div>
    <!-- end -->

  </div>
</template>

<script>
import Bus from '@/utils/eventBus';

export default {
  data() {
    const labelItems = [
      {
        icon: 'icon-task-importance',
        text: '重要事项',
        type: 'important',
      },
      {
        icon: 'icon-task-star',
        text: '星号标记',
        type: 'star',
      },
      {
        icon: 'icon-task-done',
        text: '已完成',
        type: 'done',
      },
      {
        icon: 'icon-task-trashed',
        text: '丢弃的',
        type: 'trashed',
      },
    ];
    const labelMarks = [
      { bg: '#7367f0', text: '前端', type: 0 },
      { bg: '#ff9f39', text: '后端', type: 1 },
      { bg: '#67c23a', text: '其它', type: 2 },
      { bg: '#F56c6c', text: 'BUG', type: 3 },
    ];
    return {
      labelItems, // 筛选项
      labelMarks, // 标记项
      currentActive: 5, // 当前激活的项
    };
  },

  methods: {
    // 显示弹出框
    activePopup() {
      this.$store.commit({
        type: 'controlPopup',
        status: true,
      });
    },

    // 设置当前激活的项
    setActive(type, index) {
      if (this.currentActive !== index) {
        Bus.$emit('getActive', type); // 将事件传递到 TodoItem.vue 组件中
        this.currentActive = index;
      }
    },
  },
};
</script>

<style lang="scss">
.todo-bar--wrapper {
  padding: 20px 25px;
  background-color: #fff;
}

.label-title {
  margin-top: 25px;
  padding-top: 25px;
  font-size: 18px;
  color: #848484;
  border-top: 1px solid #ddd;
}

.label-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  transition: all 0.2s;
  color: #5f5f5f;

  &:hover {
    cursor: pointer;
    transform: translateX(5px);
  }

  &.label-active {
    color: $primaryColor;
  }

  .label-icon {
    font-size: 22px;
    font-weight: 500;
    color: inherit;
  }

  .label-text {
    margin-left: 15px;
    font-size: 15px;
  }

  .label-dot {
    width: 14px;
    height: 14px;
    border-radius: 7px;
  }
}
</style>
