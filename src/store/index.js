/*
 * @Author: 贺永胜
 * @Date: 2022-01-07 22:37:16
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-19 08:57:36
 * @Descripttion: 
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
window.backMusic = new Audio()
// window.backMusic.src = 'https://m10.music.126.net/20220119015517/48d52d8000d38590024e7538d641c3f0/yyaac/obj/wonDkMOGw6XDiTHCmMOi/3064195211/8e9b/95ca/28ac/8d329b9e8180f0ba6234bf1e784995ed.m4a'
window.backMusic.src = require('@/assets/mp3/back.mp3')
window.backMusic.loop = true
window.backMusic.load()
window.backMusic.currentTime = 127.2 // 背景音乐默认定位到舒缓片段
export default new Vuex.Store({
  state: {
    setting: {
      isPlay: false,
      showBulletChat: true
    }
  },
  mutations: {
    toggleBulletChat (state) {
      state.setting.showBulletChat = !state.setting.showBulletChat
    },
    tooglePlay (state, status) {
      if (status) {
        // if (!state.setting.backMusic) {
        //   this.commit('createBackMusic', require('../assets/mp3/back.mp3'))
        //   // this.createBackMusic(require('../assets/mp3/back.mp3'))
        // }
        window.backMusic.play()
      } else {
        window.backMusic.pause()
      }
      state.setting.isPlay = status
    },
    playAudio (state, src) {
      if (state.setting.isPlay) {
        const audio = new Audio()
        audio.src = src
        audio.load()
        audio.volume = .5
        audio.play()
      }
    },
    // createBackMusic (state, src) {
    //   state.setting.backMusic = src
    //   state.setting.backMusic.load()
    // }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
})