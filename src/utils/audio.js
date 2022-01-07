/*
 * @Author: 贺永胜
 * @Date: 2022-01-07 22:19:30
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-07 23:16:50
 * @Descripttion: 声音播放
 */
// const audio = new Audio()

function playAudio (src) {
  const audio = new Audio()
  // audio.pause()
  audio.src = src
  audio.load()
  audio.play()
}

export default {
  playAudio
}
