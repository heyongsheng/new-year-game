<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:13:00
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-09 00:24:54
 * @Descripttion: 
-->
<template>
  <div id="app">
    <!-- 年兽背景 -->
    <img src="./assets/issue-skin.png"  class="issue-skin">
    <!-- 弹幕 -->
    <bullet-chat v-if="$store.state.setting.showBulletChat"></bullet-chat>
    <menu-module v-show="!gameIng" @gameBegin="gameBegin"></menu-module>
    <game v-show="gameIng" ref="game" @backToHome="gameIng = false"></game>
  </div>
</template>

<script>
import menuModule from '@/components/menu.vue'
import game from '@/components/game.vue'
import bulletChat from '@/components/bullet-chat.vue'
export default {
  name: 'App',
  data() {
    return {
      gameIng: false
    }
  },
  components: {
    game,
    menuModule,
    bulletChat
  },
  methods: {
    /**
     * @description: 开始游戏
     * @param {*}
     * @return {*}
     */    
    gameBegin() {
      window.backMusic.currentTime = 1
      this.gameIng = true
      this.$refs.game.gameBegin()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: none;
  font-family: PingFangSC-Regular, Microsoft Yahei, sans-serif;
  background-image: linear-gradient(to bottom, #ce141a, #ab6400);
}
.issue-skin {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -320px;
  margin-left: -260px;
  opacity: .1;
}
</style>
