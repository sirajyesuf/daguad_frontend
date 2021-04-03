const { api } = require('src/boot/axios')

const state = {
  campaign: {
    id: 2,
    user_id: 1,
    image_path: {
      image_1: 'advert_image/6061d3d0d484d.png',
      image_2: 'advert_image/6061d3d0d4854.png'
    },
    message:
      'dadagzhcgzhgshgasdijoahdoJAHDUNJXHAMDAINOMUOMQIPOQDQIMXQRHINOHMXDAJ',
    approve_status: 1,
    number_of_day: 5,
    active_status: 1,
    initial_per_day_view: 78,
    final_per_day_view: 18000,
    total_amount: 300,
    paid_status: 0,
    starting_date: '2021-03-30T00:00:00.000000Z',
    pay_method_code: null,
    created_at: '2021-03-29T13:19:13.000000Z',
    updated_at: '2021-03-29T13:19:13.000000Z',
    editing: false
  },
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
  async campaign(context, campaignId) {
    console.log(campaignId)
    const response = await api.get('promotions/find_campaign/' + campaignId)
    context.commit('campaign', response.data)
  },
  async paymentmethod(context) {
    const response = await api.get('promotions/list_of_payment_method')
    console.log(response)
    context.commit('paymentmethod', response.data)
  },
  async paymentverification(context, payload) {
    return await api.post('promotions/verify_payment', payload)
  }
}
const getters = {
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
