import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    ArrayForWord: [
      { text: 'Мышка'},
      { text: 'Краска'},
      { text: 'Стена'},
      { text: 'Воробей'},
      { text: 'Флаг'},
      { text: 'Заря'},
      { text: 'Свеча'},
      { text: 'Банк'},
      { text: 'Лесник'},
      { text: 'Парус'}
    ],
    ArrayForImg: {},
  },
  getters:{
    getArrayForWord: state => state.ArrayForWord,
    getArrayForImg: state => state.ArrayForImg,
  },
  mutations:{
    getArrayForWord(state, word) {
      state.ArrayForWord = word;
    },
    getArrayForImg(state, img) {
      state.ArrayForImg = img;
    },
  },
  actions:{
    getArrayForWord({commit}, word){
      commit('getArrayForWord', word);
    },
    getArrayForImg({commit}, img){
      commit('getArrayForImg', img);
    },
  }
})
