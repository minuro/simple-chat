import Vue from 'vue'
import Vuex from 'vuex'
import db from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomNo: '',
    chats: []
  },
  mutations: {
    setRoomNo(state, roomNo){
      state.roomNo = roomNo
    },
    addChat(state, {chat}){
      state.chats.push(chat)
    },
    clearChats(state){
      state.chats = []
    }
  },
  actions: {
    setRoomNo({commit}, roomNo){
      commit('setRoomNo', roomNo)
    },
    addChat({commit}, chat){
      commit('addChat', chat)
    },
    addDBChat({getters, commit}, chat){
      db.firestore().collection(`rooms/${getters.roomNo}/chats`).add(chat).then(() =>{
        commit('addChat', chat)
      })
    },
    clearChats({commit}){
      commit('clearChats')
    }
  },
  getters: {
    roomNo: state => state.roomNo,
    dbChats: state => state.chats
  },
  modules: {
  }
})
