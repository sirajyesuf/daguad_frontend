import { Promise } from 'core-js'
import { instance } from '../api.js'
const state = {
  loading: false,
  key: null || localStorage.getItem('daguad_key'),
  user: null
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
    localStorage.setItem('daguad_key', 'hello_world')
    console.log('final state', state.user, state.key)
  }
}

const actions = {
  signup(context, user) {
    return new Promise((resolve, reject) => {
      instance.get('/sanctum/csrf-cookie').then((response) => {
        instance
          .post('/api/auth/register', user)
          .then((res) => {
            console.log('signup action', res)
            context.commit('signup', res.data)
            resolve(res)
          })
          .catch((err) => {
            if (err.response) {
              reject(err)
            }
          })
      })
    })
  },
  signin(context, creadentials) {
    return new Promise((resolve, reject) => {
      instance.get('/sanctum/csrf-cookie').then((response) => {
        instance
          .post('api/auth/login', creadentials)
          .then((res) => {
            console.log('signin res.data', res.data)
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
    // console.log(email)
    return new Promise((resolve, reject) => {
      instance.get('/sanctum/csrf-cookie').then((response) => {
        instance
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
    console.log('reset payload', payload)

    return new Promise((resolve, reject) => {
      instance.get('/sanctum/csrf-cookie').then((response) => {
        instance
          .post('api/auth/reset_password', payload)
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    })
  }
}

const getters = {
  loading(state) {
    return state.loading
  },
  user(state) {
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
