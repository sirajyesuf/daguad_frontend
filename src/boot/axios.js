// import something here
import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'quasar'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true
})
// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    console.log('loading show')
    Loading.show()
    // Do something before request is sent

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('loading hide')
    Loading.hide()
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Loading.hide()

    return Promise.reject(error)
  }
)
api.get('csrf-cookie')

// for use inside Vue files through this.$axios and this.$api
Vue.prototype.$api = api

// Here we define a named export
// that we can later use inside .js files:
export { api }
