// import something here
import DisplayLoading from './loading'
import Vue from 'vue'
import axios from 'axios'
const api = axios.create({
  baseURL: 'https://api.daguads.com/api',
  withCredentials: true
})
api.defaults.headers.common.Accept = 'application/json'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue, store }) => {
  const token = store.getters['user/token']
  console.log('hi', token)
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  api.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (store.getters['common/axioscatcher']) DisplayLoading(1)
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      store.commit('common/update', false)
      DisplayLoading(0)
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      store.commit('common/update', false)
      DisplayLoading(0)

      const statuscode = error.response.status
      console.log('status_code', statuscode)
      if (statuscode === 500) router.push({ name: '500' })
      if (statuscode === 403) router.push({ name: '403' })
      if (statuscode === 401) {
        store.commit('user/signout')
        router.push({ name: 'signin' })
      }

      return Promise.reject(error)
    }
  )
}

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`

// Add a request interceptor

// Add a response interceptor

api.get('csrf-cookie').then((response) => {
  console.log('boot axios', response.headers)
})

// for use inside Vue files through this.$axios and this.$api
Vue.prototype.$api = api

// Here we define a named export
// that we can later use inside .js files:
export { api }
