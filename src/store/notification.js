const { api } = require('src/boot/axios')

const state = {
  unreadnotifications: [],
  readnotifications: []
}

const mutations = {
  fetchunreadNotifications(state, payload) {
    state.unreadnotifications = payload
  },
  markasreadNotification(state) {
    state.unreadnotifications.forEach((notification) => {
      if (notification.read_at === null) notification.read_at = new Date()
    })
  }
}

const actions = {
  async fetchunreadNotifications({ commit }) {
    // await api.get('/csrf-cookie')
    const notifications = await api.get('notifications/unread_notifications')
    commit('fetchunreadNotifications', notifications.data)
    return notifications.data
  },
  async markasreadnotifications({ commit }) {
    await api.get('notifications/markasread_notifications')
    commit('markasreadNotification')
  }
}

const getters = {
  unreadnotifications(state) {
    return state.unreadnotifications.filter(
      (notification) => notification.read_at === null
    )
  },
  readnotifications(state) {
    return state.unreadnotifications
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
