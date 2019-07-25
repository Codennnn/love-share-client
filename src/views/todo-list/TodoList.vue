<template>
  <div class="flex">
    <!-- 待办事项操作栏 -->
    <div class="todo-bar">
      <todo-bar />
    </div>
    <!-- 待办事项列表 -->
    <div class="todo-item">
      <todo-item />
    </div>
    <todo-popup />
  </div>
</template>

<script>
import Bus from '@/utils/eventBus'; // 事件总线

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

.todo-bar {
  width: 20%;
}

.todo-item {
  width: 80%;
}
</style>
