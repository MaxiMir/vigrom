import mockFetch from '../mock/mockFetch'

export default {
  state: {
    user: {
      name: null,
      email: null,
      token: null
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user

      saveUserInStorage(user)
    },
    clearUser(state) {
      state.user = {
        name: null,
        email: null,
        token: null
      }

      clearUserInStorage()
    }
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const user = await mockFetch('/api/user/register', userData)

        commit('setUser', user)
        commit('setSuccess', 'You have successfully register!')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async login({ commit }, userData) {
      try {
        const user = await mockFetch('/api/user/login', userData)

        commit('setUser', user)
        commit('setSuccess', 'You have successfully logged in!')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      commit('clearUser')
      commit('setSuccess', 'You have successfully logout!')
    },
    autoLogin({ commit }) {
      const userInStorage = localStorage.getItem('_user')

      if (userInStorage) {
        try {
          const userData = JSON.parse(userInStorage)

          commit('setUser', userData)
        } catch (e) {
          localStorage.removeItem('_user')
        }
      }
    }
  },
  getters: {
    user: state => state.user,
    userName: state => state.user.name,
    isAuthenticated: state => !!state.user.token
  }
}

const saveUserInStorage = (userData) => {
  const parsed = JSON.stringify(userData)
  localStorage.setItem('_user', parsed)
}

const clearUserInStorage = () => {
  localStorage.removeItem('_user')
}
