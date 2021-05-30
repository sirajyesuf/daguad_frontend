import { Promise } from 'core-js'
import { api } from 'boot/axios.js'
import { LocalStorage, uid } from 'quasar'

const state = {
  key: LocalStorage.getItem('daguad_key') || null,
  user: null
}

const mutations = {
  signup(state, user) {
    state.user = user
    state.key = uid()
    LocalStorage.set('daguad_key', state.key)
  },
  signin(state, user) {
    state.user = user
    state.key = uid()
    LocalStorage.set('daguad_key', state.key)
  },
  signout(state) {
    state.key = null
    LocalStorage.remove('daguad_key')
    state.user = null
  },
  dashboardinfo(state, payload) {
    state.dashboard_info = payload
  }
}

const actions = {
  async signup(context, user) {
    const response = await api.post('/auth/register', user)
    context.commit('signup', response.data.data)
    return response
  },
  async signin(context, creadentials) {
    // await api.get('/csrf-cookie')
    const response = await api.post('/auth/login', creadentials)
    context.commit('signin', response.data)
    return response
  },
  async forgotpassword(email) {
    return await api.post('api/auth/forgot_password', { email })
  },
  async resetpassword(payload) {
    return await api.post('api/auth/reset_password', payload)
  },
  signout(context) {
    return new Promise((resolve, reject) => {
      api
        .post('/logout')
        .then((res) => {
          context.commit('signout')
          resolve(res)
        })

        .catch((err) => {
          reject(err)
        })
    })
  },
  dashboardinfo(context) {
    const payload = [
      { title: 'channels', number: 100 },
      { title: 'compaign', numbe: 30 },
      { title: 'active_channel', number: 488 },
      { title: 'total_earning', number: 399 }
    ]
    setTimeout(() => {
      context.commit('dashbordinfo', payload)
    }, 5000)
    return payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
