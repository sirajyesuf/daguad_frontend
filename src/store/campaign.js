import { api } from 'boot/axios.js'
import { Date } from 'core-js'
const state = {
  days: [],
  campaigns: [],
  newcampaign: {
    photos: [],
    message: '',
    starting_date: new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
}

const mutations = {
  pagination(state, payload) {
    state.pagination.first = payload.first_page_url
    state.pagination.last = payload.last_page_url
    state.pagination.next = payload.next_page_url
    state.pagination.prev = payload.prev_page_url
  },
  fetchCampaigns(state, payload) {
    state.campaigns = payload
  },
  updateNewCampaign(state, payload) {
    if (payload.key === 'message') state.newcampaign.message = payload.value
    if (payload.key === 'photos') {
      if (!state.newcampaign.photos.includes(payload.value)) {
        state.newcampaign.photos.push(payload.value)
      } else {
        const index = state.newcampaign.photos.indexOf(payload.value)
        state.newcampaign.photos.splice(index, 1)
      }
    }
    if (payload.key === 'all') {
      state.newcampaign.photos.splice(0)
    }
    if (payload.key === 'starting_date') {
      state.newcampaign.starting_date = payload.value
    }
  },
  addcampaign(state, campaign) {
    state.campaigns(campaign)
  },
  showCampaign(state, campaign) {
    console.log('cam', campaign)
    const x = state.campaigns.find((element) => element.id === campaign.id)
    console.log('x', x)
    if (!x) state.campaigns.push(campaign)
    var firstDate = new Date(campaign.starting_date)
    state.days.push(firstDate.toLocaleDateString())
    for (let i = 1; i < campaign.package.number_of_days; i++) {
      const v = new Date(state.days[0])
      const x = v.setDate(v.getDate() + i)
      state.days.push(new Date(x).toLocaleDateString())
    }
  }
}

const actions = {
  fetchCampaigns(context) {
    return new Promise(() => {
      api.get('/campaigns/list_of_user_campaign').then((res) => {
        console.log('campaigns', res)
        context.commit('fetchCampaigns', res.data)
      })
    })
  },
  addcampaign(context, payload) {
    return new Promise((resolve, reject) => {
      api
        .post('/campaigns/add_campaign', payload)
        .then((res) => {
          context.commit('addcampaign', res.data)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  showCampaign(context, campaignId) {
    return new Promise((resolve) => {
      api.get('campaigns/' + campaignId).then((res) => {
        console.log(res.data)
        context.commit('showCampaign', res.data)
        resolve(res)
      })
    })
  }
}

const getters = {
  campaigns(state) {
    return state.campaigns
  },
  campaign(state) {
    return (campaignId) => {
      return state.campaigns.forEach((element) => {
        if (element.id === campaignId) {
          return element
        }
      })
    }
  },
  days(state) {
    return state.days
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

// 066343
