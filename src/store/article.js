import mockFetch from '../mock/mockFetch'

export default {
  actions: {
    async getArticle({ commit }) {
      try {
        return await mockFetch('/api/article')
      } catch (e) {
        commit('setError', e, { root: true })
      }
    }
  },
}
