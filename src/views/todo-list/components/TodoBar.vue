<template>
  <div class="todo-bar--wrapper">
    <!-- 添加任务按钮 -->
    <vs-button
      style="width: 100%;"
      color="primary"
      type="filled"
      @click="popupActive = true">添加任务</vs-button>

    <div class="label-item" :class="{ active: active === 5 }" @click="toggle(5)">
      <i class="iconfont icon-task-all label-icon"></i>
      <span class="label-text">所有任务</span>
    </div>

    <div class="label-title">筛 选</div>
    <div
      class="label-item"
      :class="{ active: active === index }"
      v-for="(item, index) in labelItems"
      :key="index"
      @click="toggle(index)"
    >
      <i class="iconfont label-icon" :class="item.icon"></i>
      <span class="label-text">{{ item.text }}</span>
    </div>

    <div class="label-title">标 签</div>
    <div
      class="label-item"
      :class="{vactive: active === index + 10 }"
      v-for="(item, index) in labelTypes"
      :key="index+10"
      @click="toggle(index + 10)"
    >
      <div class="label-dot" :style="{ 'background-color': item.bg }"></div>
      <span class="label-text">{{ item.text }}</span>
    </div>
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
      todoTagColors: {
        0: { color: '#7367f0' },
        1: { color: '#ff9f39' },
        2: { color: '#67c23a' },
        3: { color: '#f56c6c' },
      },
      todoItems: [],
      popupActive: false,
      defaultTask: {
        title: '',
        content: '',
        tags: [
          { type: 0, name: '前端', active: false },
          { type: 1, name: '后端', active: false },
          { type: 2, name: '其它', active: false },
          { type: 3, name: 'BUG', active: false },
        ],
        important: false,
        starred: false,
        done: false,
        trashed: false,
      },
      task: {
        title: '',
        content: '',
        tags: [
          { type: 0, name: '前端', active: false },
          { type: 1, name: '后端', active: false },
          { type: 2, name: '其它', active: false },
          { type: 3, name: 'BUG', active: false },
        ],
        important: false,
        starred: false,
        done: false,
        trashed: false,
      },
      active: 5,
    };
  },

  methods: {
    // 添加任务
    addTask() {
      if (!this.task.title || !this.task.content) return;

      this.task.id = this.todoItems.length + 1;
      this.todoItems.push(JSON.parse(JSON.stringify(this.task)));
      localStorage.setItem('todoList', JSON.stringify(this.todoItems));
      this.task = this.defaultTask;
      this.popupActive = false;
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
  background-color: #FFF;
}

.label-title {
  margin-top: 25px;
  padding-top: 25px;
  font-size: 18px;
  color: #848484;
  border-top: 1px solid #DDD;
}

.label-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  transition: all .2s;

  &:hover {
    cursor: pointer;
    transform: translateX(5px);
  }

  .label-icon {
    font-size: 22px;
    font-weight: 500;
    color: #5F5F5F;
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
  .vs-popup {
    width: 450px !important;
  }
  .task-icon-group {
    i {
      margin-left: 8px;
      font-size: 18px;
      color: #848484;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .add-btn-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
  }
}

.task-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .task-tag-group {
    display: flex;
    align-items: center;
    .task-tag {
      display: flex;
      align-items: center;
      margin: 0 5px;
      padding: 3px 10px;
      border-radius: 10px;
      font-size: 14px;
      background-color: #e6e6e6;
      .dot {
        width: 7px;
        height: 7px;
        margin-right: 5px;
        border-radius: 3px;
        background-color: #858585;
      }
    }
  }
}

.choose-tag {
  margin: 6px;
  .vs-checkbox {
    margin-right: 18px;
  }
  .vs-checkbox--icon {
    width: 16px;
    height: 16px;
  }
}

.con-vs-popup {
  z-index: 999;
}

.active {
  color: $primaryColor;
  i {
    color: $primaryColor !important;
  }
}
</style>
