// import something here
import { instance } from '../api.js'
import { Notify } from 'quasar'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, store, Vue }) => {
  // something to do
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
      if (!user()) {
        next({
          name: 'signin'
        })
      } else {
        next()
      }
    } else if (to.matched.some((record) => record.meta.guest)) {
      if (user()) {
        next({ name: from.name })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  instance.interceptors.request.use(
    function (config) {
      // store.commit('user/updateloading', true)
      return config
    },
    function (error) {
      // Do something with request error
      // store.commit('user/updateloading', false)
      if (error.request.status === 419) {
        console.log('request error with 419')
      }
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    function (response) {
      // store.commit('user/updateloading', false)
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // console.log('err', error.response.status)
      // const status = error.response.status
      // if (status === 422) {
      //   console.log('validation errrr')
      //   store.commit('user/updateloading', false)
      // }
      if (status === 500) {
        store.commit('user/updateloading', false)
        Notify.create({
          type: 'negative',
          message: 'some thing went wrong!',
          color: 'purple'
        })
      }
      return Promise.reject(error)
    }
  )
}

function user() {
  return localStorage.getItem('daguad_key')
}
