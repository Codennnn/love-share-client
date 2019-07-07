import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoPopupActive: false,
    todos: [{
      id: 1,
      title: '...',
      content: '123',
      done: true,
      important: true,
      star: false,
      trashed: false,
      tags: [
        { type: 0, name: '前端', active: true },
        { type: 1, name: '后端', active: false },
        { type: 2, name: '其它', active: true },
        { type: 3, name: 'BUG', active: false },
      ],
    }, {
      id: 1,
      title: '...',
      content: '123',
      done: true,
      important: true,
      star: false,
      trashed: false,
      tags: [
        { type: 0, name: '前端', active: true },
        { type: 1, name: '后端', active: false },
        { type: 2, name: '其它', active: true },
        { type: 3, name: 'BUG', active: false },
      ],
      marks: [
        { type: 'important', marked: true },
        { type: 'star', marked: false },
        { type: 'trashed', marked: false },
      ],
    }],
  },

  getters: {
    getTodos: state => (type) => {
      if (type === 'all') {
        return state.todos;
      }

      if (typeof type === 'number') {
        return state.todos.filter(todo => todo.tags[type].active === true);
      }

      return state.todos.filter(todo => todo[type] === true);
    },
  },

  mutations: {
    active(state, payload) {
      state.todoPopupActive = payload.popupActive;
    },
  },

  actions: {

  },
});
