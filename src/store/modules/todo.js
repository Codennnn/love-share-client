export default {
  state: {
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
      id: 2,
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

  mutations: {
  },

  getters: {
  },
};
