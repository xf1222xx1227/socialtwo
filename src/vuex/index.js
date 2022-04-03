import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)



const state={
    userid:'',
    usertype:'',
}

const actions={}

const mutations={
    getUserid(state,userid){
        state.userid = userid;
    },
    getUserType(state,usertype){
        state.usertype = usertype;
    }
}

const getters={
    getinfo(state){
        return state.userid;
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{}
})