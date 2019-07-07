<template>
  <div class="todo-items">
    <div
      class="todo-item"
      v-for="(todo, index) in filterTodoItems"
      :key="index"
      @click="showPopup(todo)"
    >
      <vs-row>
        <!-- todo项头部左侧 -->
        <vs-col vs-w="9">
          <div class="todo-item__header">
            <div class="todo-item__title">
              <vs-checkbox
                v-model="todo.done"
                @click.stop
              >{{ todo.title }}</vs-checkbox>
              <template v-if="todo.tags.length">
                <template v-for="(tag, index) in todo.tags">
                  <span
                    v-if="tag.active"
                    class="todo-item__tag"
                    :key="index"
                  >
                    <div
                      class="dot"
                      :style="{ 'background-color': tagColor[tag.type].color }"
                    ></div>
                    <span>{{ tag.name }}</span>
                  </span>
                </template>
              </template>
            </div>
          </div>
        </vs-col>
        <!-- end -->
        <!-- todo项头部右侧 -->
        <vs-col
          vs-type="flex"
          vs-justify="flex-end"
          vs-w="3"
        >
          <div>
            <i
              class="todo-mark__icon iconfont icon-task-importance"
              :class="{ important: todo.important }"
              @click.stop="setImportant(todo.id)"
            ></i>
            <i
              class="todo-mark__icon iconfont icon-task-star"
              :class="{ star: todo.star }"
              @click.stop="setStar(todo.id)"
            ></i>
            <i class="todo-mark__icon iconfont icon-task-trashed"></i>
          </div>
        </vs-col>
        <!-- end -->
      </vs-row>
      <!-- todo项内容区域 -->
      <div class="todo-item__content">
        <p>{{ todo.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus';

export default {
  data() {
    const tagColor = {
      0: { color: '#7367f0' },
      1: { color: '#ff9f39' },
      2: { color: '#67c23a' },
      3: { color: '#f56c6c' },
    };
    return {
      currentAcive: '',
      todoItems: [],
      tagColor,
    };
  },

  mounted() {
    // 1.获取全部的 todo 项
    this.todoItems = this.$store.state.todo.todos;

    // 2.接收 TodoBar 中的事件，获知当前激活的菜单项
    Bus.$on('getActive', (data) => {
      this.currentAcive = data;
    });
  },

  destroyed() {
    // 4.移除 Bus 中监听的事件，防止事件多次触发
    Bus.$off('getActive');
  },

  computed: {
    // 3.返回过滤后的 todo 项
    filterTodoItems() {
      const current = this.currentAcive || 'all';
      console.log(current);
      if (current === 'all') {
        return this.todoItems;
      }

      if (typeof current === 'number') {
        return this.todoItems.filter(todo => todo.tags[current].active === true);
      }

      return this.todoItems.filter(todo => todo[current] === true);
    },
  },

  methods: {
    // 设为重要事项
    setImportant(id) {
      this.todoItems.forEach((el) => {
        if (el.id === id) {
          el.important = !el.important;
        }
      });
    },

    // 设为星号标记
    setStar(id) {
      this.todoItems.forEach((el) => {
        if (el.id === id) {
          el.starred = !el.starred;
        }
      });
    },

    showPopup(data) {
      this.popupActive = true;
      this.task = data;
    },

    // 修改任务信息
    editTask() {
      // 修改任务信息，通过任务有没有id来判断是新建任务还是修改任务
      if (this.task.id) {
        for (let i = 0, len = this.todoItems.length; i < len; i += 1) {
          if (this.todoItems[i].id === this.task.id) {
            this.todoItems.splice(i, 1, this.task);
            this.popupActive = false;
            return;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-items {
  background-color: #f8f8f8;
}

.todo-item {
  padding: 14px 28px;

  &:hover {
    box-shadow: 0 3px 10px 0 #ccc;
    transform: translateY(-4px);
    transition: all 0.2s;
    cursor: pointer;
  }

  .todo-item__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .todo-item__title {
      display: flex;
      align-items: center;
    }

    .todo-item__tag {
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

  // 标记的图标样式
  .todo-mark__icon {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
    color: #858585;

    &.important {
      color: #67c23a !important;
    }

    &.star {
      color: #ff9f39 !important;
    }
  }

  // 主内容区域
  .todo-item__content {
    margin: 10px 0 0 5px;
    color: #7c7c7c;
  }

  .vs-checkbox {
    margin-right: 18px;
  }

  .vs-checkbox--icon {
    width: 16px;
    height: 16px;
  }
}
</style>
