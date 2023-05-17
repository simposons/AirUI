<template>
  <div class="smash_eggs">
      <div class="smash_eggs_prize_card" :class="status === 1 ? 'prize_card_animation' : ''">
          <div class="smash_eggs_prize_content">
              <template v-if="prize === '现金红包0.8元'">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/red_packet_08.png" alt="">
              </template>
              <template v-else-if="prize === '现金红包1.8元'">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/red_packet_18.png" alt="">
              </template>
              <template v-else-if="prize === '科沃斯扫地机器人N8'">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/img_5.png" alt="">
              </template>
              <template v-else-if="prize === '美的MG38CB-AA烤箱'">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/img_26.png" alt="">
              </template>
              <template v-else-if="['投顾锦囊8.5折折扣券', '投顾锦囊7.5折折扣券', '投顾锦囊6.5折折扣券'].includes(prize)">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/coupon.png" alt="">
              </template>
              <template v-else-if="['50金币', '30金币'].includes(prize)">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/gold.png" alt="">
              </template>
              <template v-else-if="prize === '再接再厉'">
                  <P>{{ prize }}</P>
                  <img src="http://39.107.231.241:84/smasheggsActivity/thanks.png" alt="">
              </template>
          </div>
      </div>
      <div class="smash_eggs_content" :class="status === 1 ? 'eggs_animation' : 'eggs_animation_static'">
          <img class="smash_eggs_content_star" :class="status === 1 ? 'eggs_star_animation' : 'eggs_star_animation_static'"
              src="http://39.107.231.241:84/smasheggsActivity/star.png" alt="">
          <div @click="startCallback" class="smash_eggs_content_click"
              :class="status === 1 ? 'click_animation' : 'click_animation_static'"></div>
          <img class="smash_eggs_content_pointer" :class="status === 1 ? 'pointer_animation' : 'pointer_animation_static'"
              src="http://39.107.231.241:84/smasheggsActivity/pointer.png" alt="">
          <div @click="startCallback" class="smash_eggs_content_title" :class="status === 1 ? 'title_animation' : 'title_animation_static'">点击开始
          </div>
          <div @click="kxsxClick" v-if="kxsxShow" class="smash_eggs_content_button" :class="status === 1 ? 'button_animation' : kxsxShow?'button_animation_static':'button_animation_static_alternate'">
              {{ prize === '再接再厉' ? '继续抽奖' : '开心收下' }}
          </div>
      </div>
      <div class="smash_eggs_hammer" :class="status === 1 ? 'hammer_animation' : 'hammer_animation_static'">
      </div>
      <img class="smash_eggs_prize_1" src="http://39.107.231.241:84/smasheggsActivity/prize_1.png" alt="">
      <img class="smash_eggs_prize_2" src="http://39.107.231.241:84/smasheggsActivity/prize_2.png" alt="">
      <img class="smash_eggs_prize_3" src="http://39.107.231.241:84/smasheggsActivity/prize_3.png" alt="">
      <img class="smash_eggs_prize_4" src="http://39.107.231.241:84/smasheggsActivity/prize_4.png" alt="">
      <img class="smash_eggs_prize_5" src="http://39.107.231.241:84/smasheggsActivity/prize_5.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'smash-golden-eggs-more',
  components: {
  },
  props: {

  },
  data() {
      return {
          prizeList: [
              '现金红包0.8元',
              '现金红包1.8元',
              '科沃斯扫地机器人N8',
              '美的MG38CB-AA烤箱',
              '投顾锦囊8.5折折扣券',
              '投顾锦囊7.5折折扣券',
              '投顾锦囊6.5折折扣券',
              '50金币',
              '30金币',
              '再接再厉',
          ],
          status: 0,
          prize: '',
          kxsxShow:false,

      }
  },
  mounted() {
  },
  activated() {
      this.init()
  },
  methods: {
      init() {
          this.status = 0
          this.prize = ''
      },
      // 点击抽奖按钮会触发star回调
      startCallback() {
          this.$emit('start')
      },
      start(text) {
          this.status = 1
          this.prize = text
          setTimeout(() => {
              navigator.vibrate(500)
          }, 1000);
          setTimeout(() => {
              this.stop()
          }, 2000);
          setTimeout(() => {
              this.kxsxShow=true
          }, 3000);
      },
      stop() {
          this.$emit('end')
      },
      kxsxClick(){
          this.init()
          setTimeout(() => {
              this.kxsxShow=false
          }, 500);
      },
  }
};
</script>

<style lang="scss" scoped>
$eggs_width: 86%;
$eggs_width_big: 86%*1.1;
$eggs_height: 89%;
$eggs_height_big: 89%*1.1;

.smash_eggs {
  position: relative;
  width: 100%;

  &_content {
      z-index: 2;
      margin: auto;
      //width: 57vw;
      width: 63vw;
      height: 76vw;
      background:
          url('http://39.107.231.241:84/smasheggsActivity/eggs_1.png') no-repeat center center /$eggs_width $eggs_height,
          url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /$eggs_width $eggs_height;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      text-align: center;
      &_star {
          width: 80px;
          height: 80px;
          position: absolute;
          left: 30%;
          top: 25%;
          opacity: 0;
      }

      //.eggs_star_animation_static{
      //    animation: eggs_star_static 4s linear infinite;
      //}
      .eggs_star_animation {
          animation: eggs_star 2s linear 1s forwards;
      }

      &_click {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, 0);
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(248, 162, 40, 0.2);
          border-radius: 50%;
      }
      &_click::before{
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 150px;
      }

      .click_animation_static {
          animation: eggs_click_static 2s ease-in-out infinite alternate;
      }

      .click_animation {
          animation: eggs_click 0.8s ease-in-out forwards;
      }

      &_pointer {
          position: absolute;
          left: 50%;
          top: 54%;
          width: 50px;
          height: 50px;
      }

      .pointer_animation_static {
          animation: eggs_pointer_static 1s ease-in-out infinite alternate;
      }

      .pointer_animation {
          animation: eggs_pointer 0.8s ease-in-out forwards;
      }

      &_title {
          position: absolute;
          left: 50%;
          top: 34%;
          transform: translate(-50%, 0);
          width: 104px;
          height: 40px;
          background: url('http://39.107.231.241:84/smasheggsActivity/title.png') no-repeat center center /100% 100%;
          font-size: 14px;
          font-weight: 500;
          color: #82340E;
          line-height: 35px;
          text-align: center;
      }

      .title_animation_static {
          //animation: eggs_title_static 1s ease-in-out  infinite alternate;
      }

      .title_animation {
          animation: eggs_title 0.8s ease-in-out forwards;
      }
      &_button{
          position: absolute;
          left: 50%;
          bottom: 10%;
          transform: translate(-50%, 0) scale(1);
          width: 202px;
          height: 50px;
          background: url('http://39.107.231.241:84/smasheggsActivity/button.png') no-repeat center center /100% 100%;
          font-size: 18px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 45px;
          opacity: 1;
          text-align: center;
          // transition: opacity .6s ease-in-out 3s,transform .6s ease-in-out 3s ;
      }
      .button_animation_static {
          animation: button_static 0.4s ease-in-out forwards;
      }
      .button_animation_static_alternate {
        //  animation: button_static_alternate 0.4s ease-in-out forwards;
      }

      .button_animation {
          animation: eggs_button .5s ease-in-out infinite alternate;
      }
  }

  &_prize_card {
      z-index: 0;
      margin: auto;
      width: 57vw;
      height: 72vw;
      opacity: 0;
  }

  .prize_card_animation {
      animation: prize_card_show 1s ease-in-out 2.5s forwards;
  }

  &_prize_content {
      margin: auto;
      width: 40vw;
      height: 30vw;
      background: #FFF0D4;
      border: #fff solid 1px;
      border-radius: 5px;
      text-align: center;

      &>p {
          font-size: 12px;
          line-height: 20px;
          font-weight: 500;
          color: #460902;
          margin: 8px 0 8px 0;
          text-align: center;
      }

      &>img {
          width: 50px;
          height: 50px;
      }
  }

  .eggs_animation_static {
      animation: eggs_static 1s ease-in-out 1s infinite alternate;
  }

  .eggs_animation {
      animation: eggs 3s ease-in-out forwards;
  }

  &_hammer {
      position: absolute;
      top: 1.5vw;
      right: 11vw;
      width: 50px;
      height: 66px;
      background-image: url('http://39.107.231.241:84/smasheggsActivity/eggs_hammer.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      transition: transform .5s;
      z-index: 3;
  }

  .hammer_animation_static {
      //  animation: hammer_static 2s ease-in-out infinite alternate;
      transform: rotate(-45deg);
      transform-origin: center 150%;
  }

  .hammer_animation {
      animation: hammer 1.3s ease-in-out forwards;
      transform-origin: center 150%;
  }

  &_prize_1 {
      position: absolute;
      top: 12vw;
      right: 7vw;
      width: 50px;
      animation: flow 1s ease-in-out 0s infinite alternate;
  }

  &_prize_2 {
      position: absolute;
      bottom: 10vw;
      left: 14vw;
      width: 50px;
      animation: flow 1s ease-in-out 0.2s infinite alternate;
  }

  &_prize_3 {
      position: absolute;
      top: 15vw;
      left: 9vw;
      width: 65px;
      animation: flow 1s ease-in-out 0.4s infinite alternate;
  }

  &_prize_4 {
      position: absolute;
      bottom: 12vw;
      right: 7vw;
      width: 70px;
      animation: flow 1s ease-in-out 0.6s infinite alternate;
  }

  &_prize_5 {
      position: absolute;
      top: -6vw;
      left: 27vw;
      width: 50px;
      animation: flow 1s ease-in-out 0.8s infinite alternate;
  }

  @keyframes prize_card_show {
      0% {
          transform: translate(0, 130px);
          opacity: 0;
      }

      30% {
          opacity: 0;
      }

      100% {
          transform: translate(0, 55px);
          opacity: 1;
      }
  }

  @keyframes eggs_static {
      0% {
          transform: translate(-50%, 0) scaleX(1);
      }

      75% {
          transform: translate(-50%, 0) scaleX(1);
      }

      100% {
          transform: translate(-50%, 5px) scaleX(1.03);
      }
  }

  @keyframes eggs {
      0% {
          transform: translate(-50%, 0) scaleX(1);
      }

      20% {
          transform: translate(-50%, 5px) scaleX(1.05);
          background:
              url('http://39.107.231.241:84/smasheggsActivity/eggs_1.png') no-repeat center center /$eggs_width $eggs_height,
              url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /0 0;
      }

      40% {
          background:
              url('http://39.107.231.241:84/smasheggsActivity/eggs_2.png') no-repeat center center /$eggs_width $eggs_height,
              url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /$eggs_width $eggs_height;
      }

      60% {
          background:
              url('http://39.107.231.241:84/smasheggsActivity/eggs_3.png') no-repeat center center /$eggs_width $eggs_height,
              url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /$eggs_width $eggs_height;
      }

      80% {
          background:
              url('http://39.107.231.241:84/smasheggsActivity/eggs_3.png') no-repeat center center /$eggs_width_big $eggs_height_big,
              url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /$eggs_width $eggs_height;
      }

      100% {
          background: url('http://39.107.231.241:84/smasheggsActivity/eggs_4.png') no-repeat center center /$eggs_width $eggs_height;
          transform: translate(-50%, 0) scaleX(1);
      }
  }

  @keyframes hammer_static {
      0% {
          transform: rotate(-20deg);
      }

      70% {
          transform: rotate(-20deg);
      }

      100% {
          transform: rotate(-40deg);
      }
  }

  @keyframes hammer {
      0% {
          transform: rotate(-45deg);
      }

      25% {
          transform: rotate(-20deg);
      }

      50% {
          transform: rotate(-70deg);
          opacity: 1;
      }

      100% {
          opacity: 0;
      }
  }

  @keyframes eggs_star_static {
      0% {
          transform: rotate(0deg) scale(1);
      }

      100% {
          transform: rotate(360deg) scale(1);
      }
  }

  @keyframes eggs_star {
      30% {
          transform: rotate(0deg) scale(1.5);
          opacity: 1;
      }

      80% {
          opacity: 1;
      }

      100% {
          transform: rotate(360deg) scale(1.5);
          opacity: 0;
          display: none;
      }
  }

  @keyframes flow {
      0% {
          transform: translate(0, 0) scale(1);
      }

      100% {
          transform: translate(0, 8px) scale(1.03);
      }
  }

  @keyframes eggs_click_static {
      0% {
          transform: translate(-50%, 0) scale(1);
      }

      50% {
          transform: translate(-50%, 0) scale(0.85);
      }

      100% {
          transform: translate(-50%, 0) scale(1);
      }
  }

  @keyframes eggs_click {
      0% {
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
      }

      100% {
          transform: translate(-50%, 0) scale(0.5);
          opacity: 0;
      }
  }

  @keyframes eggs_pointer_static {
      0% {
          transform: translate(0, 0) scale(0.85);
      }

      100% {
          transform: translate(13px, 13px) scale(1.05);
      }
  }

  @keyframes eggs_pointer {
      0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
      }

      100% {
          transform: translate(0, 0) scale(0.5);
          opacity: 0;
      }
  }

  @keyframes eggs_title {
      0% {
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
      }

      100% {
          transform: translate(-50%, 0) scale(0.5);
          opacity: 0;
      }
  }
  @keyframes eggs_button {
      0% {
          transform: translate(-50%, 0) scale(0.94);
      }

      100% {
          transform: translate(-50%, 0) scale(1);
      }
  }
  @keyframes button_static{
      0%{
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
      }
      100%{
          transform: translate(-50%, 0) scale(0.3);
          opacity: 0;
      }
  }
  @keyframes button_static_alternate{
      0%{
          transform: translate(-50%, 0) scale(0.3);
          opacity: 0;
      }
      100%{
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
      }
  }

}
</style>
