<template>
  <div class="todo-items">
    <vs-input
      class="w-full search-input"
      icon="search"
      size="large"
      icon-no-border
      placeholder="搜索..."
      v-model="search"
    />
    <transition-group
      tag="ul"
      name="flip-list"
      enter-active-class="animated fadeInUp faster"
      leave-active-class="animated fadeOutDown faster"
    >
      <li
        class="todo-item w-full cursor-pointer"
        v-for="todo in filterTodoItems"
        :key="String(todo.id)"
        @click="activePopup(todo)"
      >
        <vs-row>
          <!-- todo项头部左侧 -->
          <vs-col vs-w="10">
            <div class="todo-item__header flex justify-between items-center">
              <div class="flex justify-between items-center">
                <vs-checkbox
                  v-model="todo.isDone"
                  @click.stop
                ></vs-checkbox>
                <div class="todo-item__title mr-2">{{ todo.title }}</div>
                <template v-if="todo.tags.length !== 0">
                  <template v-for="(tag, index) in todo.tags">
                    <div
                      class="todo-item__tag
                      flex justify-between items-center
                      rounded-full py-1 px-3 bg-gray-300 mr-1"
                      :key="index"
                    >
                      <!-- 标签胶囊前面的颜色点 -->
                      <span
                        class="dot rounded-full w-2 h-2 mr-2"
                        :style="{'background-color': tagColor[tag]}"
                      ></span>
                      <span class="text-gray-700 text-xs">{{ tag }}</span>
                    </div>
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
            vs-w="2"
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
import _last from 'lodash/last';
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
      search: '',
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
      newTodo.id = _last(this.todoItems).id + 1;
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
.search-input {
  // 重设输入框样式
  &::v-deep {
    .vs-inputx {
      border: none !important;
      box-shadow: none;
      border-radius: 0;
    }
    .vs-icon {
      top: 0.7rem;
      font-size: 25px;
    }
  }
}

.todo-item__title {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.flip-list-move {
  transition: transform 1s;
}

.todo-item {
  padding: 14px 28px;
  &:hover {
    box-shadow: 0 3px 10px 0 #ccc;
    transform: translateY(-4px);
    transition: all 0.2s;
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
}
</style>
