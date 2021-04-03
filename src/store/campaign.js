import { api } from 'boot/axios.js'
const state = {
  pagination: {
    first: null,
    last: null,
    next: null,
    prev: null
  },
  campaigns: [],
  newcampaign: {
    photos: [],
    message: '',
    starting_date:
      new Date().getFullYear() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getDate()
  },
  history: {
    day: null,
    starting_date: null,
    number_of_day: null,
    days: [],
    posts: []
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
    // state.campaigns = []
    // payload.forEach((campaign) => {
    //   campaign.image_path = JSON.parse(campaign.image_path)
    //   Object.assign(campaign, { editing: false })
    //   state.campaigns.push(campaign)
    // })

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
    state.push(campaign)
  },
  day(state, payload) {
    state.history.day = payload
  },
  fetchcampaignhistory(state, payload) {
    state.history.days = []
    state.history.starting_date = new Date(
      payload.starting_date
    ).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    state.history.days.push(state.history.starting_date)
    state.history.number_of_day = payload.number_of_day
    state.history.posts = payload.posts

    for (var i = 1; i < payload.number_of_day; i++) {
      console.log('looooooooooooooooo')
      var a = new Date(state.history.days[0])
      a = a.setDate(a.getDate() + i)
      state.history.days.push(
        new Date(a).toLocaleDateString('fr-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      )
      console.log(a)
    }
    state.history.day = state.history.days[0]
  }
}

const actions = {
  fetchCampaigns(context) {
    return new Promise(() => {
      api.get('/campaigns/list_of_user_campaign').then((res) => {
        console.log('campaigns', res)
        // const urls = {
        //   first_page_url: res.data.first_page_url,
        //   last_page_url: res.data.last_page_url,
        //   next_page_url: res.data.next_page_url,
        //   prev_page_url: res.data.prev_page_url
        // }
        // context.commit('pagination', urls)
        context.commit('fetchCampaigns', res.data)
      })
    })
  },
  addcampaign(context, payload) {
    return new Promise(() => {
      api.post('/promotions/add_promotion', payload).then((res) => {
        console.log(res)
      })
    })
  },
  fetchcampaignhistory(context, payload) {
    var url = '/promotions/list_of_advert_post/' + payload.campaignId
    if (payload.date) url = url + '?date=' + payload.date
    return new Promise(() => {
      api.get(url).then((res) => {
        console.log('historty', res.data.data)
        context.commit('fetchcampaignhistory', res.data.data)
      })
    })
  }
}

const getters = {
  campaigns(state) {
    return state.campaigns
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
