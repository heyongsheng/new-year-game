/*
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:13:00
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-07 22:48:57
 * @Descripttion: 
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
