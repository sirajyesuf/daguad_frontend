import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import user from './user.js'
import channel from './channel.js'
import packages from './package.js'
import catagory from './catagory.js'
import campaign from './campaign.js'
import common from './common.js'
import payment from './payment.js'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      channel,
      campaign,
      catagory,
      packages,
      payment,
      common
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
