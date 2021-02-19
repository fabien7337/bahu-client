import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    socket: null,
    user: null,
  },
  mutations: {
    ASSIGN_SOCKET(state, payload) {
      state.socket = payload
    },
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`

      this.getters.getSocket.emit('identify', userData.token)
    },
  },
  actions: {
    assignSocket(context, payload) {
      context.commit('ASSIGN_SOCKET', payload)
    },
    async login({ commit }, credentials) {
      const response = await axios.post('https://dev.bahu.com/api/users/login', credentials)
      return commit('SET_USER_DATA', response.data)
    },
  },
  modules: {
  },
  getters: {
    getCurrentUser(state) {
      return state.user
    },
    getSocket(state) {
      return state.socket
    },
    loggedIn(state) {
      return !!state.user
    },
  },
})
