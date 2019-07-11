<template>
  <el-container>
    <el-aside width="250px">
      <!-- 待办事项操作栏 -->
      <todo-bar />
    </el-aside>
    <todo-popup />
    <el-container>
      <el-main>
        <!-- 待办事项列表 -->
        <todo-item />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Bus from '@/utils/eventBus';

import TodoBar from './components/TodoBar.vue';
import TodoItem from './components/TodoItem.vue';
import TodoPopup from './components/TodoPopup.vue';

export default {
  data() {
    return {};
  },

  destroyed() {
    // 移除 Bus 中监听的事件，防止事件多次触发
    Bus.$off('openPopup');
    Bus.$off('closePopup');
    Bus.$off('getTodo');
    Bus.$off('getActive');
    Bus.$off('getEditedTodo');
  },

  components: {
    TodoBar, TodoItem, TodoPopup,
  },
};
</script>

<style lang="scss">
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}
</style>
