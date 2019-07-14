<template>
  <vs-popup
    class="todo-popup"
    v-if="task"
    :title="task.id ? '编辑任务' : '添加任务'"
    :active.sync="isPopupActive"
  >
    <vs-row class="todo-tag flex items-center justify-center">
      <vs-col vs-w="9">
        <div class="todo-tag__group flex items-center">
          <template v-for="(tag, index) in task.tags">
            <div
              class="task-tag flex items-center"
              v-if="tag"
              :key="index"
            >
              <span
                class="dot"
                :style="{ 'background-color': tagColor[tag] }"
              ></span>
              <span>{{ tag }}</span>
            </div>
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
            class="iconfont icon-task-importance cursor-pointer"
            :class="{ important: task.isImportant }"
            @click="task.isImportant = !task.isImportant"
          ></i>
          <i
            class="iconfont icon-task-star cursor-pointer"
            :class="{ star: task.isStarred }"
            @click="task.isStarred = !task.isStarred"
          ></i>
          <!-- 选择任务的标签 -->
          <vs-dropdown>
            <i class="iconfont icon-tag"></i>
            <vs-dropdown-menu>
              <vs-dropdown-item
                v-for="(tag, index) in tags"
                :key="index"
              >
                <vs-checkbox
                  :vs-value="tag"
                  v-model="task.tags"
                  @click.stop
                >{{ tag }}</vs-checkbox>
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
          class="w-full mt-5"
          placeholder="标题"
          size="large"
        />
        <!-- 任务描述框 -->
        <vs-textarea
          v-model="task.content"
          style="margin-top: 15px"
          label="任务描述"
          :height="String(150)"
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
        :disabled="task.title.length === 0"
        @click="confirm"
      >{{ task.id ? '完成修改' : '添加任务' }}</vs-button>
    </div>
  </vs-popup>
</template>

<script>
import _isEqual from 'lodash/isEqual';
import _cloneDeepWith from 'lodash/cloneDeepWith';
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
      isPopupActive: false, // 是否弹框
      task: null,
      tags: ['前端', '后端', '其它', 'BUG'],
      tagColor,
      tempTodo: '',
    };
  },

  mounted() {
    Bus.$on('openPopup', () => { this.isPopupActive = true; });
    Bus.$on('closePopup', () => { this.isPopupActive = false; });
    Bus.$on('getTodo', (todo) => {
      this.refTodo = todo; // 将原 todo 存起来以便后面使用
      this.task = _cloneDeepWith(todo); // 深拷贝 todo 对象
    });
  },

  methods: {
    confirm() {
      /* eslint-disable */
      this.task && this.task.id ? this.editTodo() : this.addTodo();
    },

    addTodo() {
      Bus.$emit('getAddedTodo', this.task);
    },

    // 编辑修改 todo 项
    editTodo() {
      if (!_isEqual(this.task, this.refTodo)) {
        // 判断是否相等，如果否，说明有修改过，触发下面的 Bus.$emit
        Bus.$emit('getEditedTodo', this.task);
      } else {
        this.isPopupActive = false;
      }
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

// 弹出框的mark标签
.todo-tag__group {
  height: 30px;

  .task-tag {
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
    transition: all 0.2s;
    color: #848484;
  }
  .important {
    color: $success;
  }
  .star {
    color: #ff9f39;
  }
}

.vs-dropdown-menu::v-deep .material-icons {
  font-size: inherit;
}

// 弹出框底部的按钮
.todo-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}
</style>
