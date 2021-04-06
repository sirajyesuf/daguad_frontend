import { api } from 'src/boot/axios'

const state = {
  selectedcatagories: [],
  catagories: []
}

const mutations = {
  selectCatagory(state, catagoryId) {
    state.catagories.forEach((catagory) => {
      if (catagory.id === catagoryId) {
        catagory.selected = !catagory.selected
        if (state.selectedcatagories.includes(catagoryId)) {
          state.selectedcatagories.splice(
            state.selectedcatagories.indexOf(catagoryId),
            1
          )
        } else {
          state.selectedcatagories.push(catagoryId)
        }
      }
    })
  },
  getCatagories(state, payload) {
    state.catagories = []
    payload.forEach((catagory) => {
      state.catagories.push(Object.assign(catagory, { selected: false }))
    })
  }
}
const actions = {
  getCatagories(context) {
    return new Promise(() => {
      api.get('channels/channel_catagory').then((res) => {
        context.commit('getCatagories', res.data)
      })
    })
  }
}

const getters = {
  catagories(state) {
    return state.catagories
  },

  ischannelcatagoryselected(state) {
    var x = state.catagories.filter((catagory) => {
      return catagory.selected === true
    })
    if (x.length) return true
    else return false
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
