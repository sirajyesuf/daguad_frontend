import { api } from 'src/boot/axios'

const state = {
  selectedcategories: [],
  categories: []
}

const mutations = {
  selectCategory(state, categoryId) {
    state.categories.forEach((category) => {
      if (category.id === categoryId) {
        category.selected = !category.selected
        if (state.selectedcategories.includes(categoryId)) {
          state.selectedcategories.splice(
            state.selectedcategories.indexOf(categoryId),
            1
          )
        } else {
          state.selectedcategories.push(categoryId)
        }
      }
    })
  },
  getCategories(state, payload) {
    state.categories = []
    payload.forEach((category) => {
      state.categories.push(Object.assign(category, { selected: false }))
    })
  }
}
const actions = {
  getCategories(context) {
    return new Promise(() => {
      api.get('/channel_catagory').then((res) => {
        context.commit('getCategories', res.data)
      })
    })
  }
}

const getters = {
  categories(state) {
    return state.categories
  },

  ischannelcategoryselected(state) {
    var x = state.categories.filter((category) => {
      return category.selected === true
    })
    if (x.length) return true
    else return false
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
