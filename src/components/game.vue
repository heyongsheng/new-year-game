<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:39:58
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-05 14:56:22
 * @Descripttion: 游戏组件
-->
<template>
  <div class="game-wrap" ref="gemeWrap" @mouseup="removeMove">
    <!-- 年兽 -->
    <div class="nianshou" :style="'marginLeft:' + nianshouLeft + 'px'">
      <p>HP: {{ nianshouHP }}</p>
      <img src="../assets/nianshou.png" class="nianshou-img" />
    </div>
    <!-- 鞭炮 -->
    <div
      class="paozhu"
      ref="paozhu"
      @mousedown="addMove"
      :style="'marginLeft:' + paozhuLeft + 'px'"
    >
      <img src="../assets/paozhu.png" alt="" />
    </div>
    <!-- 游戏面板 -->
    <div class="game-panel">
      <p class="game-title">年兽大作战</p>
      <div class="game-data-wrap">
        <div class="game-data-item">
          <p class="game-data-title">时间：</p>
          <p class="game-data-value">{{ formatTime(gameDuration) }}</p>
        </div>
        <div class="game-data-item">
          <p class="game-data-title">攻速：</p>
          <p class="game-data-value">{{ frequency }}</p>
        </div>
        <div class="game-data-item">
          <p class="game-data-title">伤害：</p>
          <p class="game-data-value">{{ damage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const nianshowMove = new Worker('./nianshowMove.js')
export default {
  name: 'game',
  data () {
    return {
      gameBeginTime: 0,
      gameDuration: 0,
      clientX: 0, // 鼠标上次的位置
      paozhuLeft: document.documentElement.clientWidth / 2, // 炮竹距离左边的距离
      nianshouLeft: 0, // 年兽距离左边的距离
      nianshouInterval: null, // 年兽移动的定时器
      nianshouHP: 10000, // 年兽的血量
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      nianshouMoveDir: 2, // 年兽移动的方向
      createBulletInterval: null, // 创建子弹的定时器
      frequency: 50,// 发射子弹频率
      damage: 50,// 子弹攻击力
      lastBulletTime: 0// 上次发射子弹时间
    }
  },
  mounted () {
    this.gameBegin()
  },
  methods: {
    // 开始游戏
    gameBegin () {
      // 开始时间
      this.gameBeginTime = new Date().getTime()
      // 重置年兽及炮车位置
      this.paozhuLeft = document.documentElement.clientWidth / 2
      this.nianshouLeft = 0
      this.clientX = 0
      // 年兽开始移动
      // nianshowMove
      this.nianshouMove()
      // 生成子弹
      this.createBullet()
    },
    // 游戏结束
    gameOver () {
      // 清除年兽移动定时器
      cancelAnimationFrame(this.nianshouInterval)
      // 清除子弹定时器
      cancelAnimationFrame(this.createBulletInterval)
    },
    // 鼠标按下，添加移动事件
    addMove (e) {
      e = e || window.event
      this.clientX = e.clientX
      this.clientY = e.clientY
      this.$refs.gemeWrap.onmousemove = this.moveFunc
    },
    // 鼠标拖动，移动炮竹
    moveFunc (e) {
      e = e || window.event
      e.preventDefault()
      let movementX = e.clientX - this.clientX
      this.paozhuLeft += movementX
      this.clientX = e.clientX
    },
    // 鼠标抬起，移除移动事件
    removeMove () {
      this.$refs.gemeWrap.onmousemove = null
    },
    // 年兽移动
    nianshouMove () {
      // 更新游戏时间
      this.gameDuration = new Date().getTime() - this.gameBeginTime
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
      // 子弹
      let now = new Date().getTime()
      if (now - this.lastBulletTime > (1000 / this.frequency)) {
        let bullet = document.createElement('div')
        bullet.className = 'bullet'
        bullet.style.left = this.paozhuLeft + 25 + 'px'
        bullet.style.top = this.screenHeight - 123 + 'px'
        this.$refs.gemeWrap.appendChild(bullet)
        // 子弹移动
        let bulletMove = () => {
          bullet.style.top = bullet.offsetTop - 20 + 'px'
          // 如果子弹距离顶部的距离为年兽的高度时，判断子弹和年兽的水平位置是否重合
          if (bullet.offsetTop <= 250 && bullet.offsetLeft >= this.nianshouLeft && bullet.offsetLeft <= this.nianshouLeft + 200) {
            // 年兽掉血
            this.nianshouHP -= this.damage
            if (this.nianshouHP <= 0) {
              this.nianshouHP = 0
              this.gameOver()
            }
            // 子弹消失
            this.$refs.gemeWrap.removeChild(bullet)
            // cancelAnimationFrame(bulletMove)
          } else if (bullet.offsetTop <= 0) {
            this.$refs.gemeWrap.removeChild(bullet)
            // cancelAnimationFrame(bulletMove)
          } else {
            requestAnimationFrame(bulletMove)
          }
        }
        bulletMove()
        this.lastBulletTime = now
      }
      this.createBulletInterval = requestAnimationFrame(this.createBullet)
    },
    // 时间格式化为x分y秒z
    formatTime (time) {
      let minute = Math.floor(time / 60000)
      let second = Math.floor(time % 60000 / 1000)
      let millisecond = time % 1000
      return `${minute}分${second}秒${millisecond}`
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
/* 炮竹 */
.paozhu {
  position: absolute;
  bottom: 0;
  width: 50px;
}
.paozhu img {
  width: 100%;
}
/* 年兽 */
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
/* 子弹 */
.bullet {
  position: absolute;
  width: 5px;
  height: 30px;
  background-image: linear-gradient(to bottom, #ffee00, #ffe395);
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
}
/* 游戏面板 */
.game-panel {
  position: absolute;
  width: 200px;
  left: 20px;
  top: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateY(-50%);
  padding: 10px;
}
.game-panel .game-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.game-data-item {
  display: flex;
  align-items: center;
}
.game-data-title {
  width: 50px;
  text-align: right;
  margin-right: 10px;
}
</style>