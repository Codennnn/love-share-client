const mutations = {
  CHANGE_SEARCH_TEXT(state, text) {
    state.searchText = text
  },

  SET_CATEGORY_LIST(state, list) {
    state.categoryList = list
  },
}

export default mutations
