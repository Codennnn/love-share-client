const state = {
  searchText: '',
  searchHistory: JSON.parse(localStorage.getItem('search_history')) || [],
  categoryList: [],
}

export default state
