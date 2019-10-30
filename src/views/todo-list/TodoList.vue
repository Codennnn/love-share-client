<template>
  <div class="pt-3">
    <div class="flex">
      <!-- 待办事项操作栏 -->
      <div class="todo-bar">
        <TodoBar />
      </div>

      <!-- 待办事项列表 -->
      <div class="todo-item">
        <TodoItem />
      </div>
      <TodoPopup />
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus' // 事件总线

import TodoBar from './components/TodoBar.vue'
import TodoItem from './components/TodoItem.vue'
import TodoPopup from './components/TodoPopup.vue'

export default {
  name: 'TodoList',

  destroyed() {
    // 移除 Bus 中监听的事件，防止事件多次触发
    Bus.$off('openPopup')
    Bus.$off('closePopup')
    Bus.$off('getTodo')
    Bus.$off('getActive')
    Bus.$off('getEditedTodo')
  },

  components: {
    TodoBar,
    TodoItem,
    TodoPopup,
  },
}
</script>

<style lang="scss" scoped>
.todo-bar {
  width: 25%;
}

.todo-item {
  width: 75%;
}
</style>
