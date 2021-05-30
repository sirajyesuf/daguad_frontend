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
  async fetchChannels(context, url = null) {
    var URL = '/channels/user_channels'
    if (url !== null) URL = url
    const response = await api.get(URL)
    context.commit('setChannels', response.data.data)
    return response
  },
  async addChannel(context, payload) {
    const response = await api.post('/channels/register_channel', {
      username: payload
    })
    console.log('add channel', response)
    context.commit('addChannel', response.data)
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
