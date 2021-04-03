import { api } from 'boot/axios.js'

const state = {
  channels: []
}

const mutations = {
  setChannels(state, payload) {
    state.channels = payload
  },
  addChannel(state, channel) {
    state.channels.push(channel)
  },
  deleteChannel(state, channelId) {
    const channel = state.channels.forEach((channel) => {
      if (channel.id === channelId) return channel
    })
    state.channels.splice(state.channels.indexOf(channel), 1)
  }
}

const actions = {
  fetchChannels(context) {
    return new Promise((resolve, reject) => {
      api
        .get('/channels/user_channels')
        .then((response) => {
          context.commit('setChannels', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addChannel(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .post('/channels/register_channel', { username: payload })
        .then((res) => {
          context.commit('addChannel', res.data)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteChannel(context, channelId) {
    return new Promise((resolve) => {
      context.commit('deleteChannel', channelId)
      resolve()
    })
  }
}
const getters = {
  channels(state) {
    return state.channels
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
