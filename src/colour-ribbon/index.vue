<template>
  <div>
    <ul v-show="ribbenShow" class="spark-section">
      <template v-for="(item, index) in ribbenParams">
        <li class="move" :style="{
          left: item.left, animationDuration:
            item.durTime, webkitAnimationDuration: item.durTime
        }" :data-index="index" :key="index">
          <div class="move-item" :class="`spark-${(index + 1) % 5}`" :style="`width:${width};height:${height}`"></div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'colour-ribbon',
  props: {
    width: {
      type: String,
      default:'20px',
    },
    height: {
      type: String,
      default:'20px',
    },
    duration: {
      type: Number,
      default:1000,
    },
    // 在对应的时长里面,应该下落多少个红包
    totalNum:{
      type: Number,
      default:50,
    },
  },
  data() {
    return {
      ribbenParams: [], // 所有星石集合
      timer: null,
      ribbenShow:false,
    }
  },

  mounted() {
  },
  methods: {
    start() {
      this.ribbenShow=true
      const win = document.documentElement.clientWidth || document.body.clientWidth
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1
      const left = parseInt(Math.random() * (win - 50) + 0,10) + Math.random() * 10 * plusOrMinus
      const rotate = (parseInt(Math.random() * (45 - (-45)) - 45,10)) + 'deg' // 旋转角度
      const durTime = (Math.random() * (2.5 - 1.2 + 1) + 1.2) + 's' // 时间
      // 1.2和1.2这个数值保持一样
      this.ribbenParams.push(
        {
          left: left + 'px',
          transforms: 'rotate(' + rotate + ')',
          durTime,
          isHide: false
        }
      )
      setTimeout(() => { // 多少时间结束
        clearTimeout(this.timer)
        this.timer = null
        setTimeout(() => {
        this.ribbenShow=false
        this.ribbenParams=[]
        }, 2000);
        return false
      }, this.duration)
      this.timer = setTimeout(() => {
        this.start()
      }, Math.round(this.duration / this.totalNum))
    },
  }
};
</script>

<style lang="scss" scoped>
.spark-section {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 120vh;
  width: 100vw;

  li {
    position: absolute;
    animation: all 3s linear;
    top: -100px;
    z-index: 0;

    &.move {
      animation: aim_move 4s linear 1 forwards;
      position: relative;
    }

    .move-item {
      animation: cicle 2s infinite linear;
      position: absolute;
      left: 0;
      top: 0;
    }

    @keyframes cicle {
      0% {
        transform: rotate(0deg);
        left: 10px;
      }

      10% {
        transform: rotate(30deg);
        left: 0;
      }

      20% {
        transform: rotate(60deg);
        left: -10px;
      }

      30% {
        transform: rotate(90deg);
        left: 0;
      }

      40% {
        transform: rotate(120deg);
        left: 10px;
      }

      50% {
        transform: rotate(150deg);
        left: 0;
      }

      60% {
        transform: rotate(180deg);
        left: -10px;
      }

      70% {
        transform: rotate(210deg);
        left: 0;
      }

      80% {
        transform: rotate(240deg);
        left: 10px;
      }

      90% {
        transform: rotate(240deg);
        left: 0;
      }

      100% {
        transform: rotate(270deg);
        left: -10px;
      }
    }
  }

  a {
    display: block;
  }
}

@keyframes aim_move {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(120vh);
  }
}

.spark {
  width: 10px;
  height: 10px;
}

.spark-1 {
  @extend .spark;

  background: #FFE034;
}

.spark-2 {
  @extend .spark;

  background: #2893FF;
}

.spark-3 {
  @extend .spark;

  background: #15E3D1;
}

.spark-4 {
  @extend .spark;

  background: #8A78FD;
}

.spark-0 {
  @extend .spark;

  background: #FFA933;
}
</style>
