/*
 * @Author: 贺永胜
 * @Date: 2022-01-07 22:37:16
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-07 23:54:03
 * @Descripttion: 
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    setting: {
      isPlay: false,
      showBulletChat: false,
      backMusic: null
    }
  },
  mutations: {
    toggleBulletChat (state) {
      state.setting.showBulletChat = !state.setting.showBulletChat
    },
    tooglePlay (state, status) {
      if (status) {
        if (state.setting.backMusic) {
          state.setting.backMusic.play()
        } else {
          state.setting.backMusic = new Audio('./static/music/back.mp3')
          state.setting.backMusic.loop = true
          state.setting.backMusic.play()
        }
        
      }
      state.setting.isPlay = status
    },
    playAudio (state, src) {
      if (state.setting.isPlay) {
        const audio = new Audio()
        audio.src = src
        audio.load()
        audio.play()
      }
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
})