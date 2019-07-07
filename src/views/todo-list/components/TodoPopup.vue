<template>
  <vs-popup
    class="todo-popup"
    :title="task.id ? '编辑任务' : '添加任务'"
    :active.sync="isPopupActive"
  >
    <vs-row>
      <vs-col vs-w="9">
        <div class="todo-tag__group">
          <template v-for="(tag,index) in task.tags">
            <span
              v-if="tag.active"
              :key="index"
              class="task-tag"
            >
              <div
                class="dot"
                :style="{ 'background-color': todoTagColors[tag.type].color }"
              ></div>
              <span>{{ tag.name }}</span>
            </span>
          </template>
        </div>
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="flex-end"
        vs-w="3"
      >
        <div class="todo-icon__group">
          <i
            class="iconfont icon-task-importance"
            :class="{ important: task.important }"
            @click="task.important = !task.important"
          ></i>
          <i
            class="iconfont icon-task-star"
            :class="{starred: task.starred}"
            @click="task.starred = !task.starred"
          ></i>
          <!-- 选择任务的标签 -->
          <vs-dropdown>
            <i class="iconfont icon-tag"></i>
            <vs-dropdown-menu>
              <vs-dropdown-item
                v-for="(tag, index) in task.tags"
                :key="index"
              >
                <vs-checkbox
                  v-model="tag.active"
                  @click.stop
                >{{ tag.name }}</vs-checkbox>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <!-- 标题框 -->
        <vs-input
          v-model.trim="task.title"
          class="inputx"
          style="margin-top: 15px;;width: 100%;"
          placeholder="标题"
          size="large"
        />
        <!-- 任务描述框 -->
        <vs-textarea
          v-model="task.content"
          style="margin-top: 15px"
          label="任务描述"
          height="300px"
        />
      </vs-col>
    </vs-row>

    <div class="todo-button">
      <vs-button
        color="#848484"
        type="flat"
        @click="isPopupActive = false"
      >取消</vs-button>
      <vs-button
        style="margin-left: .5rem"
        color="primary"
        type="filled"
        @click="addTask"
        :disabled="task.title.length === 0"
      >{{ task.id ? '完成修改' : '添加任务' }}</vs-button>
    </div>
  </vs-popup>
</template>

<script>
export default {
  data() {
    return {
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

      // 标签前面的圆点的颜色
      todoTagColors: {
        0: { color: '#7367f0' },
        1: { color: '#ff9f39' },
        2: { color: '#67c23a' },
        3: { color: '#f56c6c' },
      },
    };
  },

  computed: {
    isPopupActive: {
      get() {
        return this.$store.state.todo.isPopupActive;
      },
      set(status) {
        // 控制关闭弹出框
        this.$store.commit({
          type: 'controlPopup',
          status,
        });
      },
    },
  },

  methods: {
    // 添加任务
    addTask() {
      if (!this.task.title || !this.task.content) { return; }

      this.task.id = this.todoItems.length + 1;
      this.todoItems.push(JSON.parse(JSON.stringify(this.task)));
      localStorage.setItem('todoList', JSON.stringify(this.todoItems));
      this.task = this.defaultTask;
      this.isPopupActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-popup {
  // 重设弹出框的宽度
  &::v-deep .vs-popup {
    width: 450px;
  }
}

// 弹出框的标签
.todo-tag__group {
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

// 弹出框的图标
.todo-icon__group {
  .iconfont {
    margin-left: 8px;
    font-size: 18px;
    color: #848484;
    &:hover {
      cursor: pointer;
    }
  }
}

// 弹出框底部的按钮
.todo-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}
</style>
