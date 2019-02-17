import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    alerts:'',
    alertTitle:'',
  },

  mutations: {
    MUT_ALERTS: (state, data) => {
      state.alerts = data.alerts;
      state.alertTitle = data.alertTitle
    }
  },

  actions: {
    ACT_ALERTS: ({ commit }, data) => {
      commit('MUT_ALERTS', data)
    }
  }
})
