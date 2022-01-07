<!--
 * @Author: 贺永胜
 * @Date: 2022-01-06 22:35:07
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-07 22:34:42
 * @Descripttion: 菜单
-->
<template>
  <div class="menu-wrap">
    <div class="title">年兽小游戏</div>
    <div class="menu-box">
      <div class="menu-item" @click="gameBegin">开始游戏</div>
      <div class="menu-item" @click="dialog = 'sound'" v-show="!sound">打开声音</div>
      <div class="menu-item" @click="openSound" v-show="sound">关闭声音</div>
      <div class="menu-item" @click="$store.commit('toggleBulletChat')">
        {{ $store.state.setting.showBulletChat ? '关闭弹幕' : '打开弹幕' }}
      </div>
      <div class="menu-item" @click="dialog = 'comment'">关于弹幕</div>
      <div class="menu-item" @click="dialog = 'support'">表扬作者</div>
    </div>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog ==='support'">
        <p>
          感谢您的支持，本游戏正在参加掘金新春征文活动，如果您愿意对作者表示支持，可以点击链接(<a href="https://juejin.cn/user/2911162523723566/posts" target="_blank">https://juejin.cn/user/2911162523723566/posts</a>)前往活动文章，然后点赞评论即可，感谢您的支持，作者在这里提前给您拜年了，祝您身体健康，阖家欢乐！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn close-btn" @click="dialog = false">关闭</div>
        </div>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog ==='comment'">
        <p>
          小游戏简陋，未接入接口，如果您想您的祝福出现在弹幕中，请您点击链接(<a href="https://juejin.cn/user/2911162523723566/posts" target="_blank">https://juejin.cn/user/2911162523723566/posts</a>)前往活动文章，把您的称呼及祝福写在评论区即可！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn close-btn" @click="dialog = false">关闭</div>
        </div>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog ==='sound'">
        <p>
          网站配乐较为喜庆，请确认您的耳机已经插入，音量已经调好，否则容易造成社死！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn" @click="dialog = false">取消</div>
          <div class="footer-btn close-btn" @click="() => {
            dialog = false;
            openSound()
          }">确认</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      dialog: false,
      sound: false,
      backMusic: require('@/assets/mp3/back.mp3')
    }
  },
  methods: {
    gameBegin () {
      this.$emit('gameBegin')
    },
    /**
     * @description: 打开/关闭声音
     * @param {*}
     * @return {*}
     */
    openSound () {
      if (this.sound) {
        this.sound = false
        // this.$refs.game.sound = false
        // this.$refs.game.soundOff()
      } else {
        this.sound = true
        this.$audio.playAudio(this.backMusic)
        // this.$refs.game.sound = true
        // this.$refs.game.soundOn()
      }
    }
  },
}
</script>
<style scoped>
.menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}
.title {
  font-size: 110px;
  font-weight: bold;
  color: #ffdf83;
  text-align: center;
  letter-spacing: 30px;
  margin-top: 10vh;
}
.menu-box {
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.menu-item {
  color: #fff;
  text-align: center;
  background-image: linear-gradient(to right bottom, #14ceb4, #ffe87a);
  box-shadow: 0 5px 5px 1px rgb(255 237 26 / 20%);
  border-radius: 10px;
  font-size: 32px;
  line-height: 60px;
  cursor: pointer;
  opacity: 0.8;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.menu-item:hover {
  opacity: 1;
  transform: scale(1.2);
}
.dialog {
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 32px;
  background: #9c0000;
  color: #ffdf83;
  padding: 20px;
  text-indent: 64px;
  border-radius: 20px;
  word-break: break-all;
}
.dialog a {
  color: #ffdf83;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  margin: 40px auto 20px;
  /* align-items: center; */
}
.footer-btn {
  width: 200px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.close-btn {
  color: #8f1e1e;
  background: #ffe87a;
}
.footer-btn:hover {
  transform: scale(1.2);
}

.fadeUp-enter-active, .fadeUp-leave-active {
  transition: opacity .3s, transform .3s;
}
.fadeUp-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.8);
}
.fadeUp-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.8);
 }
</style>