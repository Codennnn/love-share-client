import { setToken, getToken, removeToken } from '@/permission/token';
import { loginValidate } from '@/request/api/login';

const state = {
  token: getToken(),
  roles: [],
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    const res = await loginValidate(username, password);
    commit('SET_TOKEN', res.token);
    setToken(res.token);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
