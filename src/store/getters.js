const getters = {
  token(state) {
    return state.token
  },

  roles(state) {
    return state.user.roles
  },
}

export default getters
