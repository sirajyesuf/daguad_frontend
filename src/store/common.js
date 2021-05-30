const state = {
  axioscatcher: true
}

const mutations = {
  update(state, payload) {
    console.log('hghghhh', payload)
    state.axioscatcher = payload
  }
}
const getters = {
  axioscatcher(state) {
    return state.axioscatcher
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters
}
