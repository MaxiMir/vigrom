import mockFetch from '../mock/mockFetch'

export default {
  actions: {
    async getComments({ commit }) {
      try {
        return await mockFetch('/api/comments')
      } catch (e) {
        commit('setError', e, { root: true })
      }
    },
    async addComment({ commit }, data) {
      try {
        await mockFetch('/api/comments/add', data)
        commit('setSuccess', 'Comment Added')
      } catch (e) {
        commit('setError', e, { root: true })
      }
    }
  },
}
