import { api } from 'boot/axios.js'
import { LocalStorage } from 'quasar'

const state = {
  token: LocalStorage.getItem('daguad_token') || null,
  user: LocalStorage.getItem('daguad_user') || null
}

const mutations = {
  signup(state, payload) {
    state.token = payload.access_token
    LocalStorage.set('daguad_token', state.token)
    api.defaults.headers.common.Authorization = `Bearer ${state.token}`
  },
  signin(state, payload) {
    state.token = payload.access_token
    LocalStorage.set('daguad_token', state.token)
    api.defaults.headers.common.Authorization = `Bearer ${state.token}`
    LocalStorage.set('daguad_token', state.token)
  },
  signout(state) {
    state.token = null
    state.user = null
    LocalStorage.remove('daguad_token')
    LocalStorage.remove('daguad_user')
  },
  userinfo(state, payload) {
    state.user = payload
    LocalStorage.set('daguad_user', state.user)
  }
}

const actions = {
  async signup(context, user) {
    const response = await api.post('/auth/register', user)
    context.commit('signup', response.data)
    return response
  },
  async signin(context, creadentials) {
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
  async signout(context) {
    await api.post('/logout')
    context.commit('signout')
  },
  async userinfo(context) {
    const response = await api.get('/user')
    console.log('user', response.data.data)
    context.commit('userinfo', response.data.data)
    return response
  }
}
const getters = {
  isauth(state) {
    return state.token !== null
  },
  token(state) {
    return state.token
  },
  userinfo(state) {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
