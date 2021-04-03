import { Promise } from 'core-js'
import { api } from 'boot/axios.js'
const state = {
  key: localStorage.getItem('daguad_key') || null,
  user: null,
  dashboard_info: null
}

const mutations = {
  updateloading(state, payload) {
    state.loading = payload
  },
  signup(state, user) {
    state.user = user
    localStorage.setItem('daguad_key', user.email)
  },
  signin(state, user) {
    state.user = user
    localStorage.setItem('daguad_key', user.email)
    state.key = localStorage.getItem('daguad_key') || null
  },
  signout(state) {
    state.key = null
    localStorage.removeItem('daguad_key')
    state.user = null
  },
  dashboardinfo(state, payload) {
    state.dashboard_info = payload
  }
}

const actions = {
  signup(context, user) {
    return new Promise((resolve, reject) => {
      api
        .post('/auth/register', user)
        .then((res) => {
          context.commit('signup', res.data)
          resolve(res)
        })
        .catch((err) => {
          if (err.response) {
            reject(err)
          }
        })
    })
  },
  signin(context, creadentials) {
    return new Promise((resolve, reject) => {
      api.get('/csrf-cookie').then((res) => {
        api
          .post('/auth/login', creadentials)
          .then((res) => {
            context.commit('signin', res.data)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  },
  forgotpassword(context, email) {
    return new Promise((resolve, reject) => {
      api.get('/sanctum/csrf-cookie').then((res) => {
        api
          .post('api/auth/forgot_password', { email })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  },
  resetpassword(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .post('api/auth/reset_password', payload)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
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

const getters = {
  dashboardinfo() {
    return state.dashboardinfo
  },
  user(state) {
    return state.user
  },
  isauth(state) {
    if (state.key) {
      return 1
    }
    return 0
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
