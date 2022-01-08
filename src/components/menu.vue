<!--
 * @Author: 贺永胜
 * @Date: 2022-01-06 22:35:07
 * @email: 1378431028@qq.com
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-01-08 23:40:35
 * @Descripttion: 菜单
-->
<template>
  <div class="menu-wrap">
    <div class="title">
      <img :src="require('@/assets/title.png')" alt="">
    </div>
    <div class="menu-box">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @mouseover="$store.commit('playAudio', hoverMusic)"
        @click="$store.commit('playAudio', clickMusic),item.clickHandle()"
        v-show="item.show()"
      >
        {{item.name}}
      </div>
    </div>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog === 'support'">
        <p>
          感谢您的支持，本游戏正在参加掘金新春征文活动，如果您愿意对作者表示支持，可以点击链接(<a
            href="https://juejin.cn/user/2911162523723566/posts"
            target="_blank"
            >https://juejin.cn/user/2911162523723566/posts</a
          >)前往活动文章，然后点赞评论即可，感谢您的支持，作者在这里提前给您拜年了，祝您身体健康，阖家欢乐！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn close-btn" @click="dialog = false, $store.commit('playAudio', clickMusic)">关闭</div>
        </div>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog === 'comment'">
        <p>
          小游戏简陋，未接入接口，如果您想您的祝福出现在弹幕中，请您点击链接(<a
            href="https://juejin.cn/user/2911162523723566/posts"
            target="_blank"
            >https://juejin.cn/user/2911162523723566/posts</a
          >)前往活动文章，把您的称呼及祝福写在评论区即可！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn close-btn" @click="dialog = false, $store.commit('playAudio', clickMusic)">关闭</div>
        </div>
      </div>
    </transition>
    <transition name="fadeUp">
      <div class="dialog" v-show="dialog === 'sound'">
        <p>
          网站配乐较为喜庆，请确认您的耳机已经插入，音量已经调好，否则容易造成社死！
        </p>
        <div class="dialog-footer">
          <div class="footer-btn" @click="dialog = false">取消</div>
          <div
            class="footer-btn close-btn"
            @click="dialog = false, $store.commit('tooglePlay', true), $store.commit('playAudio', clickMusic)"
          >
            确认
          </div>
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
      menuList: [
        {
          name: '开始游戏',
          clickHandle: () => {
            this.gameBegin()
          },
          show: () => true
        },
        {
          name: '打开声音(强烈建议)',
          clickHandle: () => {
            this.dialog = 'sound'
          },
          show: () => !this.$store.state.setting.isPlay
        },
        {
          name: '关闭声音',
          clickHandle: () => {
            this.$store.commit('tooglePlay', false)
          },
          show: () => this.$store.state.setting.isPlay
        },
        {
          name: '打开弹幕',
          clickHandle: () => {
            this.$store.commit('toggleBulletChat')
          },
          show: () => !this.$store.state.setting.showBulletChat
        },
        {
          name: '关闭弹幕',
          clickHandle: () => {
            this.$store.commit('toggleBulletChat')
          },
          show: () => this.$store.state.setting.showBulletChat
        },
        {
          name: '发送弹幕',
          clickHandle: () => {
            this.dialog = 'comment'
          },
          show: () => true
        },
        {
          name: '支持作者',
          clickHandle: () => {
            this.dialog = 'support'
          },
          show: () => true
        }
      ],
      dialog: false,
      sound: false,
      backMusic: require('@/assets/mp3/back.mp3'),
      hoverMusic: require('@/assets/mp3/hover.wav'),
      clickMusic: require('@/assets/mp3/click.wav')
    }
  },
  methods: {
    gameBegin () {
      this.$emit('gameBegin')
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
  background-image: linear-gradient(to right bottom, #ff8549, #ffe35d);
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
.dialog p {
  user-select: text;
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

.fadeUp-enter-active,
.fadeUp-leave-active {
  transition: opacity 0.3s, transform 0.3s;
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