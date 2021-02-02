import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const data = await axios.post('https://dev.bahu.com/api/users/login', credentials);
      return commit('SET_USER_DATA', data);
    },
  },
  modules: {
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
    loggedIn(state) {
      return !!state.user;
    },
  },
});
