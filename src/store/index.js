/*
 * @Author: 贺永胜
 * @Date: 2022-01-07 22:37:16
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-07 22:51:31
 * @Descripttion: 
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    setting: {
      isPlay: true,
      showBulletChat: false
    }
  },
  mutations: {
    toggleBulletChat (state) {
      console.log(state);
      state.setting.showBulletChat = !state.setting.showBulletChat
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
})