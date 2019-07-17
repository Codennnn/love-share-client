import { setToken, getToken, removeToken } from '@/permission/token';
import { login, logout, getUserInfo } from '@/request/api/login';

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
    const res = await login(username, password);
    commit('SET_TOKEN', res.token);
    setToken(res.token);
  },

  async getUserInfo() {
    await getUserInfo();
  },

  async logout({ commit, state }) {
    await logout(state.token);
    commit('SET_TOKEN', '');
    commit('SET_ROLES', []);
    removeToken();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
