import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
var ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      key:'vuex',
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})

export default store;