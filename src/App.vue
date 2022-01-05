<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:13:00
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-05 13:03:46
 * @Descripttion: 
-->
<template>
  <div id="app">
    <!-- 年兽背景 -->
    <img src="./assets/issue-skin.png"  class="issue-skin">
    <game></game>
  </div>
</template>

<script>
import game from '@/components/game'
export default {
  name: 'App',
  components: {
    game
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
  font-family: 'Microsoft YaHei';
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
