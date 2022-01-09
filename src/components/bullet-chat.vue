<!--
 * @Author: 贺永胜
 * @Date: 2022-01-07 12:21:38
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-10 00:17:00
 * @Descripttion: 弹幕组件
-->
<template>
  <div class="bullet-chat-wrap" ref="bulletChat"></div>
</template>

<script>

export default {
  name: 'bullet-chat',
  data () {
    return {
      blessingData: require('../assets/data/blessing.json'),
      ballistic: 0, // 弹道数量
      bulletSpeed: 2, // 弹幕速度
      bulletInterval: [300, 500], // 弹幕间隔
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      screenHeight: document.documentElement.clientHeight, // 屏幕高度
    }
  },
  mounted () {
    this.showBullet()
  },
  methods: {
    /**
     * @description: 展示弹幕
     * @param {*}
     * @return {*}
     */
    showBullet () {
      // 根据屏幕高度和弹幕高度计算弹道数量
      // let clientHeight = this.screenHeight
      // let ballisticCount = Math.floor(clientHeight / this.bulletHeight)
      // let ballisticArr = Array(ballisticCount).fill(1).map((item, index) => {
      //   return index
      // })
      let ballisticArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      // 按随机顺序在所有的弹道添加弹幕
      let ballisticLaunch = () => {
        let randomIndex = Math.floor(Math.random() * ballisticArr.length)
        let ballisticIndex = ballisticArr.splice(randomIndex, 1)[0]
        this.createBullet(ballisticIndex)
        if (ballisticArr.length > 0) {
          setTimeout(ballisticLaunch, Math.random() * 1000)
        }
      }
      ballisticLaunch()
      // this.createBullet(2)
    },
    /**
     * @description: 添加弹幕
     * @param {*} index 弹道索引
     * @return {*}
     */
    createBullet (index) {
      let bullet = document.createElement('div')
      let bulletHeight = document.documentElement.clientHeight / 10
      bullet.className = 'bullet-chat'
      bullet.style.left = this.screenWidth + 'px'
      bullet.style.top = index * bulletHeight + 'px'
      bullet.createNext = false // 是否已创建下一个弹幕
      bullet.nextSpace = Math.random() * (this.bulletInterval[1] - this.bulletInterval[0]) + this.bulletInterval[0] // 下一个弹幕间隔
      // 从弹幕库随机取弹幕
      let dataLength = this.blessingData.length
      let randomIndex = Math.floor(Math.random() * dataLength)
      let blessing = this.blessingData[randomIndex]
      bullet.innerText = blessing.name + "：" + blessing.value
      this.$refs.bulletChat.appendChild(bullet)

      // 弹幕移动
      let bulletMove = () => {
        bullet.style.left = bullet.offsetLeft - this.bulletSpeed + 'px'
        if (!bullet.createNext) {
          // 如果弹幕距离屏幕右侧距离超出弹幕间隔，则加载下一条弹幕
          if (bullet.offsetLeft < (this.screenWidth - bullet.offsetWidth - bullet.nextSpace)) {
            this.createBullet(index)
            bullet.createNext = true
          }
        }

        // 如果弹幕距离右侧距离大于等于屏幕宽度，则移除弹幕
        if (bullet.offsetLeft < (-bullet.offsetWidth)) {
          this.$refs.bulletChat.removeChild(bullet)
        } else {
          requestAnimationFrame(bulletMove)
        }
      }
      bulletMove()
    }
  }
}
</script>
<style>
.bullet-chat-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.bullet-chat {
  position: absolute;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, .3);
  font-size: 32px;
  /* font-weight: bold; */
}
</style>