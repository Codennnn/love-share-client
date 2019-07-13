<template>
  <div class="todo-items">
    <transition-group
      name="flip-list"
      enter-active-class="animated fadeInUp faster"
      leave-active-class="animated fadeOutDown faster"
      tag="ul"
    >
      <li
        class="todo-item"
        v-for="todo in filterTodoItems"
        :key="String(todo.id)"
        @click="activePopup(todo)"
      >
        <vs-row>
          <!-- todo项头部左侧 -->
          <vs-col vs-w="9">
            <div class="todo-item__header">
              <div class="todo-item__title">
                <vs-checkbox
                  v-model="todo.isDone"
                  @click.stop
                >{{ todo.title }}</vs-checkbox>
                <template v-if="todo.tags.length !== 0">
                  <template v-for="(tag, index) in todo.tags">
                    <span
                      v-if="tag"
                      class="todo-item__tag"
                      :key="index"
                    >
                      <div
                        class="dot"
                        :style="{'background-color': tagColor[tag]}"
                      ></div>
                      <span style="color: #555555;">{{ tag }}</span>
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
                :class="{important: todo.isImportant}"
                @click.stop="toggleIsImportant(todo.id)"
              ></i>
              <i
                class="todo-mark__icon iconfont icon-task-star"
                :class="{star: todo.isStarred}"
                @click.stop="toggleIsStarred(todo.id)"
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
      </li>
    </transition-group>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus';

export default {
  data() {
    const tagColor = {
      前端: '#7367f0',
      后端: '#ff9f39',
      其它: '#67c23a',
      BUG: '#f56c6c',
    };
    return {
      currentAcive: 'all',
      todoItems: [],
      tagColor,
    };
  },

  mounted() {
    // 获取全部的 todo 项
    this.todoItems = this.$store.state.todo.todos;

    // 接收 TodoBar 中的事件，获知当前激活的菜单项
    Bus.$on('getActive', (current) => {
      this.currentAcive = current;
    });

    Bus.$on('getAddedTodo', (newTodo) => {
      const lastItem = this._.last(this.todoItems);
      newTodo.id = lastItem.id + 1;
      this.todoItems.push(newTodo);
      Bus.$emit('closePopup');
    });

    Bus.$on('getEditedTodo', (newTodo) => {
      this.todoItems.some((item) => {
        if (item.id === newTodo.id) {
          const indexOfItem = this.todoItems.indexOf(item);
          this.$set(this.todoItems, indexOfItem, newTodo);
          Bus.$emit('closePopup');
          return true;
        }
        return false;
      });
    });
  },

  computed: {
    // 返回过滤后的 todo 项
    filterTodoItems() {
      const current = this.currentAcive || 'all';
      console.log(current);
      if (current === 'all') {
        return this.todoItems;
      }

      if (['前端', '后端', '其它', 'BUG'].includes(current)) {
        return this.todoItems.filter(todo => todo.tags.includes(current));
      }

      return this.todoItems.filter(todo => todo[current] === true);
    },
  },

  methods: {
    // 显示弹出框
    activePopup(todo) {
      Bus.$emit('openPopup');
      Bus.$emit('getTodo', todo);
    },

    // 设为重要事项
    toggleIsImportant(id) {
      this.todoItems.some((el) => {
        if (el.id === id) {
          el.isImportant = !el.isImportant;
          return true;
        }
        return false;
      });
    },

    // 设为星号标记
    toggleIsStarred(id) {
      this.todoItems.some((el) => {
        if (el.id === id) {
          el.isStarred = !el.isStarred;
          return true;
        }
        return false;
      });
    },

    moveToTrash() {
      this.isTrashed = !this.isTrashed;
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}

.todo-item {
  padding: 14px 28px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 10px 0 #ccc;
    transform: translateY(-4px);
    transition: all 0.2s;
  }

  .todo-item__header {
    @include flex($justify: space-between, $align: center);

    .todo-item__title {
      @include flex($justify: space-between, $align: center);
    }
    // 标签胶囊
    .todo-item__tag {
      @include flex($justify: space-between, $align: center);
      margin: 0 5px;
      padding: 3px 10px;
      border-radius: 10px;
      font-size: 14px;
      background-color: #e6e6e6;
      // 标签胶囊前面的颜色点
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
    cursor: pointer;
    padding: 6px;
    font-size: 18px;
    color: #858585;
    transition: all 0.2s;

    &.important {
      color: #67c23a;
    }
    &.star {
      color: #ff9f39;
    }
  }

  // 主内容区域
  .todo-item__content {
    margin: 10px 0 0 5px;
    color: #7c7c7c;
  }

  .todo-item__title::v-deep .material-icons {
    font-size: inherit;
  }
}
</style>
