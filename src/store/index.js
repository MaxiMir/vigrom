import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import article from './article'
import comments from './comments'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    success: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    setSuccess(state, message) {
      state.success = message
    }
  },
  getters: {
    error: state => state.error,
    success: state => state.success
  },
  modules: {
    user,
    article,
    comments
  }
})
