import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid:'',
    usertype:'',
  },
  getters: {
    getinfo(state){
      return state.userid;
    }
  },
  mutations: {
    getUserid(state,id){
      state.userid = id;
    },
    getUserType(state,type){
        state.usertype = type;
    }
  },
  actions: {
  },
  modules: {
  }
})
