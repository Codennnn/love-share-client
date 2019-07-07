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
      :class="{ active: active === 5 }"
      @click="toggle(5)"
    >
      <i class="iconfont icon-task-all label-icon"></i>
      <span class="label-text">所有任务</span>
    </div>

    <!-- 筛选 -->
    <div class="label-title">筛 选</div>
    <div
      class="label-item"
      :class="{ active: active === index }"
      v-for="(item, index) in labelItems"
      :key="index"
      @click="toggle(index)"
    >
      <i
        class="iconfont label-icon"
        :class="item.icon"
      ></i>
      <span class="label-text">{{ item.text }}</span>
    </div>
    <!-- end -->

    <!-- 标签 -->
    <div class="label-title">标 签</div>
    <div
      class="label-item"
      :class="{ vactive: active === index + 10 }"
      v-for="(item, index) in labelTypes"
      :key="index+10"
      @click="toggle(index + 10)"
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
export default {
  data() {
    return {
      // 筛选
      labelItems: [
        { icon: 'icon-task-importance', text: '重要事项' },
        { icon: 'icon-task-star', text: '星号标记' },
        { icon: 'icon-task-done', text: '已完成' },
        { icon: 'icon-task-trashed', text: '丢弃的' },
      ],
      // 标签
      labelTypes: [
        { bg: '#7367f0', text: '前端' },
        { bg: '#ff9f39', text: '后端' },
        { bg: '#67c23a', text: '其它' },
        { bg: '#F56c6c', text: 'BUG' },
      ],
      todoTags: [
        { type: 0, name: '前端', active: true },
        { type: 1, name: '后端', active: true },
        { type: 2, name: '其它', active: true },
        { type: 3, name: 'BUG', active: true },
      ],
      active: 5,
    };
  },

  methods: {
    activePopup() {
      this.$store.commit({ type: 'active', popupActive: true });
    },

    // 切换侧边栏菜单的样式
    toggle(index) {
      this.active = index;
    },

    // 根据标记获得todo-list
    getItemByMark(status) {
      const list = [];
      this.todoItems.forEach((ele) => {
        if (ele[status] === true) {
          list.push(ele);
        }
      });
      return list;
    },

    // 根据标签获得todo-list
    getItemByTag(tagType) {
      const list = [];
      this.todoItems.forEach((ele) => {
        if (ele.tags[tagType].active === true) {
          list.push(ele);
        }
      });
      return list;
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

  &:hover {
    cursor: pointer;
    transform: translateX(5px);
  }

  .label-icon {
    font-size: 22px;
    font-weight: 500;
    color: #5f5f5f;
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

.add-task-popup {

}
</style>
