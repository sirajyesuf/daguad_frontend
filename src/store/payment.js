const { api } = require('src/boot/axios')

const state = {
  paymentmethods: []
}

const mutations = {
  campaign(state, payload) {
    state.campaign = payload
  },
  selectedpaymet(state, paymetId) {
    state.paymentmethods.forEach((paymet) => {
      if (paymet.id === paymetId) paymet.selected = true
      else paymet.selected = false
    })
  },
  paymentmethod(state, payload) {
    state.paymentmethods = []
    payload.forEach((paymet) => {
      state.paymentmethods.push(Object.assign(paymet, { selected: false }))
    })
  }
}
const actions = {
  async paymentmethod(context) {
    const response = await api.get('campaigns/list_of_payment_method')
    console.log(response)
    context.commit('paymentmethod', response.data)
  },
  async paymentverification(context, payload) {
    return await api.post('campaigns/verify_payment', payload)
  }
}
const getters = {
  paymentmethods(state) {
    return state.paymentmethods
  },
  selected_payment_method(state) {
    return state.paymentmethods.filter((paymet) => paymet.selected === true)[0]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
