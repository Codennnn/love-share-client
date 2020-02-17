const mutations = {
  CHANGE_SEARCH_TEXT(state, text) {
    if (text.length <= 0) return

    state.searchText = text

    if (state.searchHistory.includes(text)) return
    if (state.searchHistory.length >= 10) {
      state.searchHistory.pop(state.searchHistory[state.searchHistory.length - 1])
    }
    state.searchHistory.unshift(text)
    localStorage.setItem('search_history', JSON.stringify(state.searchHistory))
  },

  CLEAR_SEARCH_TEXT(state) {
    state.searchText = ''
  },

  CLEAR_SEARCH_HISTORY(state) {
    state.searchHistory = []
    localStorage.removeItem('search_history')
  },

  SET_CATEGORY_LIST(state, list) {
    state.categoryList = list
  },
}

export default mutations
