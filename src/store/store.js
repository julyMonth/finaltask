import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: '',
    timers: ''
  },
  mutations: {
    set_token(state, token) {
      state.token = token;
      sessionStorage.token = token;
    },
    del_token(state) {
      state.token = '';
      sessionStorage.removeItem('token');
    },
    add_time(state,timers){
      state.timers = timers;
    }
  }
})