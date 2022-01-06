<!--
 * @Author: 贺永胜
 * @Date: 2022-01-04 21:39:58
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-06 13:29:13
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
    <!-- 面板区 -->
    <div class="panel-wrap">
      <!-- 游戏面板 -->
      <div class="game-panel panel-item">
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
            <p class="game-data-title">射速：</p>
            <p class="game-data-value">{{ bulletSpeed }}</p>
          </div>
          <div class="game-data-item">
            <p class="game-data-title">伤害：</p>
            <p class="game-data-value">{{ damage }}</p>
          </div>
        </div>
      </div>
      <!-- 问题面板 -->
      <div
        class="question-panel panel-item"
        v-for="(question, index) in questionList"
        :key="index"
      >
        <p class="show-count-down" v-if="question.showTime > 0">{{question.showTime}}</p>
        <div class="question-wrap" v-else>
          <div class="count-down" v-if="question.answerTime > 0">
            <p>请在{{question.answerTime}}秒内点击正确答案</p>
          </div>
          <div class="question-panel-title">问题 {{index+1}}</div>
          <div class="question-container">
            <div class="question-title">{{ question.question.title }}</div>
            <div class="answer-wrap show" v-if="!question.result">
              <div
                class="answer-item"
                v-for="item in question.question.option"
                :key="item.key"
                @click="answerQuestion(item.key, question)"
              >
                {{item.key}}：{{item.value}}
              </div>
            </div>
            <div class="answer-wrap result" v-else>
              <div
                class="answer-item"
                v-for="item in question.question.option"
                :key="item.key"
                :class="{
                  result: question.question.answer === item.key
                }"
              >
                {{item.key}}：{{item.value}}
                <span class="check" v-if="question.result === item.key">◇</span>
              </div>
            </div>
            <div class="buff" v-if="question.result === question.question.answer">
              攻速+1 射速+2 伤害+10
            </div>
            <div class="desc" v-if="question.result && question.result !== question.question.answer">
              {{question.question.desc}}
            </div>
          </div>
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
      questionData: require('./question.json'),// 问题源数据
      questionList: [],// 问题列表
      gameBeginTime: 0, // 游戏开始时间
      gameDuration: 0, // 游戏持续时间
      clientX: 0, // 鼠标上次的位置
      paozhuLeft: document.documentElement.clientWidth / 2, // 炮竹距离左边的距离
      nianshouLeft: 0, // 年兽距离左边的距离
      nianshouInterval: null, // 年兽移动的定时器
      nianshouHP: 10000, // 年兽的血量
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
      nianshouMoveDir: 4, // 年兽移动的方向
      createBulletInterval: null, // 创建子弹的定时器
      frequency: 5, // 发射子弹频率
      bulletSpeed: 10, // 子弹飞行速度
      damage: 20,// 子弹攻击力
      lastBulletTime: 0 // 上次发射子弹时间
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
      // 添加第一道问题
      setTimeout(() => {
        this.addQuestion()
      }, 5000)
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
        this.nianshouMoveDir = -4
      } else if (this.nianshouLeft < 0) {
        this.nianshouMoveDir = 4
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
          bullet.style.top = bullet.offsetTop - this.bulletSpeed + 'px'
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
    },
    /**
     * @description: 添加问题
     * @param {*}
     * @return {*}
     */
    addQuestion () {
      let dataLength = this.questionData.length
      let randomIndex = Math.floor(Math.random() * dataLength)
      let question = this.questionData.splice(randomIndex, 1)[0]
      // eslint-disable-next-line no-debugger
      let data = {
        question: question,
        answerTime: 11,
        showTime: 6
      }
      // 添加展示倒计时
      let showCountDown = () => {
        data.showTime--
        if (data.showTime > 0) {
          setTimeout(showCountDown, 1000)
        } else {
          // 倒计时结束，展示问题并开始答题倒计时
          answerCountDown()
        }
      }
      // 添加回答倒计时
      let answerCountDown = () => {
        data.answerTime--
        if (data.answerTime > 0) {
          setTimeout(() => {
            showCountDown()
          }, 1000)
        } else {
          // 倒计时结束，如果没有选择正确答案，则添加一道错误答案
          if (!data.result) {
            data.result = '2021'
          }
          // 如果问题不足5道，则添加一道问题
          if (this.questionList.length < 5) {
            setTimeout(() => {
              this.addQuestion()
            }, 5000)
          }
        }
      }
      // 执行展示倒计时
      showCountDown()
      this.questionList.push(data)
    }, 
    /**
     * @description: 回答问题
     * @param {*} answer 选择的答案
     * @param {*} question 回答的问题
     * @return {*}
     */    
    answerQuestion(answer, question) {
      question.result = answer
      // 如果回答正确，则增加buff
      if (answer === question.question.answer) {
        this.frequency++ // 攻速+1
        this.bulletSpeed += 2 // 射速+2
        this.damage += 10 // 伤害+10
      }
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
/* 面板区域 */
.panel-wrap {
  position: absolute;
  /* width: 200px; */
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #fff;
  display: flex;
  line-height: 1.5;
  flex-wrap: wrap;
}
.panel-item {
  width: 200px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 100px;
  margin-right: 20px;
}
/* 游戏面板 */
.game-panel {
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
/* 问题面板 */
.question-panel {
  /* margin-top: 20px; */
  position: relative;
}
/* 展示倒计时 */
.show-count-down {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 68px;
  opacity: .8;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 回答倒计时 */
.count-down {
  position: absolute;
  line-height: 20px;
  top: -40px;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
}

.question-panel-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.question-title {
  word-break: break-all;
}
.answer-item {
  user-select: none;
}
.answer-wrap.show .answer-item:hover {
  background: rgba(255, 255, 255, 0.2);
}
.answer-wrap.result .answer-item.result {
  background: #95b777;
}
.answer-wrap.result .answer-item .check {
  float: right;
  margin-right: 10px;
  font-size: 16px;
}
.buff {
  position: absolute;
  line-height: 20px;
  bottom: -40px;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
}
.desc {
  position: absolute;
  line-height: 20px;
  bottom: -10px;
  width: 100%;
  left: 0;
  transform: translateY(100%);
  box-sizing: border-box;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.2);
}
</style>