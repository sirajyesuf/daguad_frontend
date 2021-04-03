const state = {
  loading: false
}

const mutations = {
  updateLoading(state) {
    state.loading = !state.loading
  }
}
const actions = {}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
