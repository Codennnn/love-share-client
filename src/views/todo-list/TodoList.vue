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
import TodoBar from './components/TodoBar.vue';
import TodoItem from './components/TodoItem.vue';
import TodoPopup from './components/TodoPopup.vue';

export default {
  data() {
    return {};
  },

  components: { TodoBar, TodoItem, TodoPopup },

  computed: {
    filterTodoItems() {
      switch (this.active) {
        case 0:
          return this.getItemByMark('important');
        case 1:
          return this.getItemByMark('starred');
        case 2:
          return this.getItemByMark('done');
        case 3:
          return this.getItemByMark('trashed');
        case 5:
          return this.todoItems;
        case 10:
          return this.getItemByTag(0);
        case 11:
          return this.getItemByTag(1);
        case 12:
          return this.getItemByTag(2);
        case 13:
          return this.getItemByTag(3);
        default:
          return this.todoItems;
      }
    },
  },
};
</script>

<style lang="scss">
</style>
