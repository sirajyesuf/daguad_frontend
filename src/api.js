import axios from 'axios'

axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: 'https://api.daguads.com/api.',
  withCredentials: true
})

export { instance }
