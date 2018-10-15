import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

import * as getters from './getters'
import state from './state'
import mutations from './mutation'

Vue.use(Vuex)

/* develope open */
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug
    ? [createLogger()]
    : [
        createPersistedState({
          storage: {
            getItem: key => wx.getStorageSync(key),
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) => wx.setStoragetSync(key),
            removeItem: key => wx.clearStorage()
          }
        })
      ]
})
