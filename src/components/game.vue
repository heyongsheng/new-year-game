<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:39:58
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-04 23:39:59
 * @Descripttion: 游戏组件
-->
<template>
  <div class='game-wrap' ref="gemeWrap" @mouseup="removeMove">
    <!-- 年兽 -->
    <div class="nianshou" :style="'marginLeft:' + nianshouLeft + 'px'">
      <img src="../assets/nianshou.png" class="nianshou-img">
    </div>
    <!-- 鞭炮 -->
    <div class="paozhu" ref="paozhu" @mousedown="addMove" :style="'marginLeft:' + paozhuLeft + 'px'">
      <img src="../assets/paozhu.png" alt="">
    </div>
  </div>
</template>

<script>
// const nianshowMove = new Worker('./nianshowMove.js')
export default {
  name: 'game',
  data() {
    return {
      clientX: 0, // 鼠标上次的位置
      paozhuLeft: 0, // 炮竹距离左边的距离
      nianshouLeft: 0, // 年兽距离左边的距离
      nianshouInterval: null, // 年兽移动的定时器
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      nianshouMoveDir: 2, // 年兽移动的方向
    }
  },
  mounted() {
    this.gameBegin()
  },
  methods: {
    // 开始游戏
    gameBegin() {
      // 重置年兽及炮车位置
      this.paozhuLeft = 0
      this.nianshouLeft = 0
      this.clientX = 0
      // 年兽开始移动
      // nianshowMove
      this.nianshouMove()
    },
    // 鼠标按下，添加移动事件
    addMove(e) {
      e = e || window.event
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.$refs.gemeWrap.onmousemove = this.moveFunc
    },
    // 鼠标拖动，移动炮竹
    moveFunc(e) {
      e = e || window.event
      e.preventDefault()
      let movementX = e.clientX - this.clientX
      this.paozhuLeft += movementX
      this.clientX = e.clientX
    },
    // 鼠标抬起，移除移动事件
    removeMove() {
      this.$refs.gemeWrap.onmousemove = null
    },
    // 年兽移动
    nianshouMove() {
      if (this.nianshouLeft + 200 >= this.screenWidth) {
        this.nianshouMoveDir = -2
      } else if (this.nianshouLeft < 0) {
        this.nianshouMoveDir = 2
      }
        
      this.nianshouLeft += this.nianshouMoveDir
      this.nianshouInterval = requestAnimationFrame(this.nianshouMove)
    }
  },
}
</script>
<style scoped>
.game-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.paozhu {
  position: absolute;
  bottom: 0;
  width: 50px;
}
.paozhu img {
  width: 100%;
}
.nianshou {
  width: 200px;
  height: 250px;
  background-image: linear-gradient(to bottom, #b10b00, #68009d);
  display: flex;
  align-items: center;
  justify-content: center;
}
.nianshou img {
  width: 60%;
  filter: hue-rotate(303deg);
}
</style>