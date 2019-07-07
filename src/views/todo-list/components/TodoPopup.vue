<template>
  <vs-popup
    classContent="popup-example"
    :title="task.id ? '编辑任务' : '添加任务'"
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
        <el-popover
          placement="bottom"
          width="150"
          trigger="click"
        >
          <template v-if="task.tags.length">
            <div
              v-for="(tag, index) in task.tags"
              :key="index"
              class="choose-tag"
            >
              <vs-checkbox v-model="tag.active">{{tag.name}}</vs-checkbox>
            </div>
          </template>
          <i
            slot="reference"
            class="iconfont icon-tag"
          ></i>
        </el-popover>
      </div>
      <div class="task-tag-group">
        <template v-for="(tag,index) in task.tags">
          <span
            v-if="tag.active"
            :key="index"
            class="task-tag"
          >
            <div
              class="dot"
              :style="{'background-color':todoTagColors[tag.type].color}"
            ></div>
            <span>{{tag.name}}</span>
          </span>
        </template>
      </div>
    </div>
    <div style="margin-top:15px;">
      <el-input
        placeholder="标题"
        v-model.trim="task.title"
        clearable
      ></el-input>
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
      <el-button
        type="primary"
        @click="addTask"
      >{{task.id ? '完成修改' : '添加任务'}}</el-button>
    </div>
  </vs-popup>
</template>

<script>
import Bus from '@/utils/eventBus';

export default {
  data() {
    return {
      popupActive: true,
    };
  },

  created() {
    Bus.$on('getTarget', (target) => {
      this.popupActive = target;
    });
  },
  methods: {
    get() {},
  },
};
</script>

<style lang="scss" scoped>
</style>
