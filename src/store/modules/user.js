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
    const res = await login(userInfo);
    const { token } = res.data;
    commit('SET_TOKEN', token);
    setToken(token); // 将token缓存到本地
  },

  async getUserInfo({ commit, state }) {
    const res = await getUserInfo(state.token);
    const { roles } = res.data;
    commit('SET_TOKEN', '');
    commit('SET_ROLES', roles);
    return res.data;
  },

  async logout({ commit, state }) {
    await logout(state.token);
    commit('SET_TOKEN', '');
    commit('SET_ROLES', []);
    removeToken(); // 移除本地token缓存
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
