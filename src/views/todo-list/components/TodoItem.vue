<template>
  <div class="todo">
    <div class="todo-item" v-for="(item, index) in todoItems" :key="index" @click="showPopup(item)">
      <vs-popup
        classContent="popup-example"
        title="编辑任务"
        :active.sync="popupActive"
        class="add-task-popup"
      >
        <div class="task-option">
          <div class="task-icon-group">
            <i
              class="iconfont icon-task-importance"
              :class="{important: task.important}"
              @click="task.important = !task.important"
            ></i>
            <i
              class="iconfont icon-task-star"
              :class="{starred: task.starred}"
              @click="task.starred = !task.starred"
            ></i>
            <!-- 选择任务的标签 -->
            <el-popover placement="bottom" width="150" trigger="click">
              <template v-if="task.tags.length">
                <div v-for="(tag,index) in task.tags" :key="index" class="choose-tag">
                  <vs-checkbox v-model="tag.active">{{tag.name}}</vs-checkbox>
                </div>
              </template>
              <i slot="reference" class="iconfont icon-tag"></i>
            </el-popover>
          </div>
          <div class="task-tag-group">
            <template v-for="(tag,index) in task.tags">
              <span v-if="tag.active" :key="index" class="task-tag">
                <div class="dot" :style="{'background-color':tagColor[tag.type].color}"></div>
                <span>{{tag.name}}</span>
              </span>
            </template>
          </div>
        </div>
        <div style="margin-top:15px;">
          <el-input placeholder="标题" v-model.trim="task.title" clearable></el-input>
        </div>
        <div style="margin-top:15px;">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="任务描述"
            v-model.trim="task.content"
          ></el-input>
        </div>
        <div class="add-btn-group">
          <el-button @click="popupActive=false">取消</el-button>
          <el-button type="primary" @click="editTask">完成修改</el-button>
        </div>
      </vs-popup>
      <div class="todo-item__header">
        <div class="todo-item--title">
          <vs-checkbox v-model="item.done" @click.stop>{{item.title}}</vs-checkbox>
          <template v-if="item.tags.length">
            <template v-for="(tag,index) in item.tags">
              <span v-if="tag.active" class="todo-item-chip" :key="index">
                <div class="dot" :style="{'background-color':tagColor[tag.type].color}"></div>
                <span>{{tag.name}}</span>
              </span>
            </template>
          </template>
        </div>
        <div>
          <el-tooltip content="设为重要" effect="light">
            <i
              class="todo-operate-icon iconfont icon-task-importance"
              :class="{important: item.important}"
              @click.stop="setImportant(item.id)"
            ></i>
          </el-tooltip>
          <el-tooltip content="设为星标" effect="light">
            <i
              class="todo-operate-icon iconfont icon-task-star"
              :class="{starred: item.starred}"
              @click.stop="setStar(item.id)"
            ></i>
          </el-tooltip>
          <el-tooltip content="丢弃" effect="light">
            <i class="todo-operate-icon iconfont icon-task-trashed"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="todo-item__content">
        <p>{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoItems: Array,
  },
  data() {
    return {
      tagColor: {
        0: { color: '#7367f0' },
        1: { color: '#ff9f39' },
        2: { color: '#67c23a' },
        3: { color: '#f56c6c' },
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
      popupActive: false,
    };
  },
  computed: {},
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
        for (let i = 0, len = this.todoItems.length; i < len; i++) {
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

<style lang="scss">
.todo {
  background-color: #f8f8f8;
}

.todo-item {
  padding: 14px 28px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 3px 10px 0 #ccc;
    transition: all 0.2s;
    cursor: pointer;
  }

  .todo-item__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .todo-item--title {
      display: flex;
      align-items: center;
      .todo-item-chip {
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

    .todo-operate-icon {
      margin-left: 10px;
      font-size: 18px;
      cursor: pointer;
      color: #858585;
    }
  }
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

.important {
  color: #67c23a !important;
}

.starred {
  color: #ff9f39 !important;
}
</style>
