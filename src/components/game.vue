<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:39:58
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-05 00:23:34
 * @Descripttion: 游戏组件
-->
<template>
  <div class='game-wrap' ref="gemeWrap" @mouseup="removeMove">
    <!-- 年兽 -->
    <div class="nianshou" :style="'marginLeft:' + nianshouLeft + 'px'">
      <p>HP: 10000</p>
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
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      nianshouMoveDir: 2, // 年兽移动的方向
      frequency: 2// 发射子弹频率
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
      // 生成子弹
      this.createBullet()
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
    },
    // 生成子弹
    createBullet () {
      this.createBulletInterval = setInterval(() => {
        // 子弹
        let bullet = document.createElement('div')
        bullet.className = 'bullet'
        bullet.style.left = this.paozhuLeft + 25 + 'px'
        bullet.style.top = this.screenHeight - 123 + 'px'
        this.$refs.gemeWrap.appendChild(bullet)
        // 子弹移动
        let bulletMove = () => {
          console.log(bullet.offsetTop);
          bullet.style.top = bullet.offsetTop - 20 + 'px'
          if (bullet.offsetTop <= 0) {
            this.$refs.gemeWrap.removeChild(bullet)
            cancelAnimationFrame(bulletMove)
          } else {
            requestAnimationFrame(bulletMove)
          }
        }
        bulletMove()
        // setTimeout(() => {
        //   this.createBulletInterval = requestAnimationFrame(this.createBullet)
        // }, 1000 / this.frequency)
        // this.createBulletInterval = setInterval(() => {
        //   this.createBullet()
        // }, 1000 / this.frequency)
      }, 1000 / this.frequency)
    }
  },
}
</script>
<style>
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
  /* background-image: linear-gradient(to bottom, #b10b00, #68009d); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.nianshou p {
  color: #fff;
  font-size: 28px;
  margin-top: 10px;
  font-weight: bold;
}
.nianshou img {
  width: 100%;
  /* filter: hue-rotate(303deg); */
}
.bullet {
  position: absolute;
  width: 5px;
  height: 30px;
  background-image: linear-gradient(to bottom, #ffff00, #ffec81);
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
}
</style>