import { api } from 'src/boot/axios'

const state = {
  selected_package: 0,
  days: [],
  packages: {}
}
const mutations = {
  emptypackages(state) {
    state.packages = []
    state.days = []
  },
  days(state) {
    state.days = []
    for (const i in state.packages) {
      const x = {
        disablestatus: false,
        name: i
      }
      state.days.push(x)
    }
  },
  fetchpackage(state, payload) {
    console.log('fetch pakage mutaion payload', payload)
    state.packages = payload
  },
  selectedPackage(state, payload) {
    console.log(payload)
    state.packages[payload.dayname].forEach((pack) => {
      if (pack.id === payload.packageid) {
        pack.selected = !pack.selected
        state.days.forEach((day) => {
          if (day.name !== payload.dayname) {
            if (pack.selected === true) {
              day.disablestatus = true
            } else {
              day.disablestatus = false
            }
          }
        })
      } else {
        pack.selected = false
      }
    })
    state.selected_package = payload.packageid
  }
}
const actions = {
  fetchpackage(context, payload) {
    return new Promise(() => {
      api
        .get('promotions/packages', {
          params: {
            catagory_id: payload
          }
        })
        .then((res) => {
          var payload = res.data
          for (const [key, value] of Object.entries(payload)) {
            console.log(key)
            value.forEach((pack) => {
              Object.assign(pack, { selected: false })
            })
          }
          context.commit('fetchpackage', payload)
          context.commit('days')
        })
    })
  }
}
const getters = {
  getselectedpackage(state) {
    for (const [key, value] of Object.entries(state.packages)) {
      console.log(key)
      value.forEach((pack) => {
        if (pack.selected === true) {
          console.log('the selected package was', pack.id)
          return pack.id
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}