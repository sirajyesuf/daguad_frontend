const state = {
  loading: false
}

const mutations = {
  updateLoading(state) {
    state.loading = true
  }
}
const actions = {}
const getters = {
  loading(state) {
    return state.loading
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
