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
    state.selected_package = 0
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
        // pack.selected = !pack.selected
        if (pack.selected) {
          console.log('unselected')
          pack.selected = false
          state.selected_package = 0
        } else {
          console.log('selected')
          pack.selected = true
          state.selected_package = payload
        }

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
  }
}
const actions = {
  fetchpackage(context, selectedCatagories) {
    return new Promise(() => {
      api
        .get('campaigns/packages', {
          params: {
            catagory_id: selectedCatagories
          }
        })
        .then((res) => {
          var payload = res.data
          for (const [key, value] of Object.entries(payload)) {
            console.log('day=>', key)
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
          return pack
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
