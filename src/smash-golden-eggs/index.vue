<template>
  <div class="page">
    <div :class="eggsFlag ? 'hammer hammer_move' : 'hammer'">锤子</div>
    <div :class="eggsFlag ? 'eggs eggs_shake' : 'eggs'" @click.once="eggsClick">
      <div :class="eggsFlag ? 'eggs_top eggs_move' : 'eggs_top'"></div>
      <div class="eggs_bottom"></div>
    </div>
    <!-- <button @click="hammerFlag = false">重置</button> -->
    <dialog :open="dialogFlag" class="dialog" @click="dialogFlag = false">
      中奖
    </dialog>
    <colour-ribbon 
      ref="colourRibbon"
      width="10px"
      height="15px"
    />
  </div>
</template>

<script>
import  ColourRibbon  from "../colour-ribbon/index.vue";

export default {
  name: 'smash-golden-eggs',
  components:{
    ColourRibbon
  },
  props: {
    // text: {
    //   type: String,
    //   required: true,
    // },
    // version: {
    //   type: String,
    //   default: '2',
    // },
  },
  data() {
    return {
      eggsFlag: false,
      dialogFlag: false,
    }
  },

  mounted() {
    
  },
  methods: {
    eggsClick() {
      this.eggsFlag = true
      setTimeout(() => {
        this.$refs.colourRibbon.start()
        // this.dialogFlag = true
      }, 1500);
    },
   
  }
};
</script>

<style lang="scss" scoped>
*{
 // outline: 1px solid #999;
}
$animation1: 1.5s;
.page {
  position: relative;
  padding: 40px 0;
  width: 250px;
  margin: auto;
}

.eggs {
  width: 100px;
  height: 138px;
  position: relative;
  margin: auto;
  &_top {
    position: absolute;
    width: 100px;
    height: 138px;
    background-color: gold;
    box-shadow: inset 1em 1em 2em rgb(0 0 0 / 30%), inset 0.2em 0.2em 1em #ffff55;
    top: 1px;
    opacity:1;
    transition: top $animation1 $animation1,opacity $animation1 $animation1;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    clip-path: polygon(46% 60%, 64% 36%, 79% 54%, 100% 35%, 100% 0, 52% 0, 0 0, 0 46%, 20% 60%, 30% 38%);
  }

  &_bottom {
    position: absolute;
    width: 100px;
    height: 138px;
    background-color: gold;
    box-shadow: inset 1em 1em 2em rgb(0 0 0 / 30%), inset 0.2em 0.2em 1em #ffff55;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    clip-path: polygon(46% 60%, 64% 36%, 79% 54%, 100% 35%, 100% 100%, 43% 100%, 0 100%, 0 46%, 20% 60%, 30% 38%);

    &:before {
      content: '';
      position: absolute;
      bottom: 30px;
      left: 60px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: rgba($color: #eee, $alpha: 0.5);
    }
  }

  &_move {
    top: -10px;
    opacity: 0;
  }

  &_shake {
    animation: eggs_shake .2s $animation1 4;
  }

  @keyframes eggs_shake {
    2% {
      transform: translate(-.5px, .5px) rotate(-.5deg);
    }

    4% {
      transform: translate(2.5px, .5px) rotate(-.5deg);
    }

    6% {
      transform: translate(-.5px, 1.5px) rotate(1.5deg);
    }

    8% {
      transform: translate(.5px, .5px) rotate(-.5deg);
    }

    10% {
      transform: translate(-.5px, -1.5px) rotate(-.5deg);
    }

    12% {
      transform: translate(.5px, -.5px) rotate(1.5deg);
    }

    14% {
      transform: translate(1.5px, 2.5px) rotate(-.5deg);
    }

    16% {
      transform: translate(-.5px, -.5px) rotate(.5deg);
    }

    18% {
      transform: translate(2.5px, .5px) rotate(.5deg);
    }

    20% {
      transform: translate(.5px, -1.5px) rotate(-.5deg);
    }

    22% {
      transform: translate(2.5px, 2.5px) rotate(-.5deg);
    }

    24% {
      transform: translate(2.5px, 1.5px) rotate(1.5deg);
    }

    26% {
      transform: translate(.5px, 1.5px) rotate(-.5deg);
    }

    28% {
      transform: translate(1.5px, .5px) rotate(.5deg);
    }

    30% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }

    32% {
      transform: translate(.5px, .5px) rotate(.5deg);
    }

    34% {
      transform: translate(.5px, 1.5px) rotate(1.5deg);
    }

    36% {
      transform: translate(2.5px, -.5px) rotate(1.5deg);
    }

    38% {
      transform: translate(.5px, 1.5px) rotate(1.5deg);
    }

    40% {
      transform: translate(2.5px, 1.5px) rotate(1.5deg);
    }

    42% {
      transform: translate(2.5px, -1.5px) rotate(.5deg);
    }

    44% {
      transform: translate(.5px, -.5px) rotate(.5deg);
    }

    46% {
      transform: translate(1.5px, -1.5px) rotate(.5deg);
    }

    48% {
      transform: translate(-1.5px, -.5px) rotate(.5deg);
    }

    50% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }

    52% {
      transform: translate(.5px, 1.5px) rotate(.5deg);
    }

    54% {
      transform: translate(2.5px, -.5px) rotate(.5deg);
    }

    56% {
      transform: translate(2.5px, 2.5px) rotate(.5deg);
    }

    58% {
      transform: translate(2.5px, 1.5px) rotate(-.5deg);
    }

    60% {
      transform: translate(1.5px, 1.5px) rotate(-.5deg);
    }

    62% {
      transform: translate(-.5px, .5px) rotate(-.5deg);
    }

    64% {
      transform: translate(2.5px, 1.5px) rotate(-.5deg);
    }

    66% {
      transform: translate(-1.5px, .5px) rotate(1.5deg);
    }

    68% {
      transform: translate(1.5px, -1.5px) rotate(.5deg);
    }

    70% {
      transform: translate(.5px, .5px) rotate(-.5deg);
    }

    72% {
      transform: translate(-.5px, 1.5px) rotate(1.5deg);
    }

    74% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }

    76% {
      transform: translate(2.5px, -.5px) rotate(.5deg);
    }

    78% {
      transform: translate(2.5px, 2.5px) rotate(.5deg);
    }

    80% {
      transform: translate(-1.5px, 2.5px) rotate(.5deg);
    }

    82% {
      transform: translate(-1.5px, -.5px) rotate(.5deg);
    }

    84% {
      transform: translate(.5px, 1.5px) rotate(-.5deg);
    }

    86% {
      transform: translate(-.5px, 2.5px) rotate(.5deg);
    }

    88% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }

    90% {
      transform: translate(-.5px, -1.5px) rotate(-.5deg);
    }

    92% {
      transform: translate(1.5px, .5px) rotate(.5deg);
    }

    94% {
      transform: translate(-.5px, -.5px) rotate(.5deg);
    }

    96% {
      transform: translate(1.5px, .5px) rotate(1.5deg);
    }

    98% {
      transform: translate(.5px, -.5px) rotate(1.5deg);
    }

    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
}

.hammer {
  width: 50px;
  height: 100px;
  background-color: red;
  position: absolute;
  top: 10px;
  left: -15px;
  transform: rotate(30deg);
  transform-origin: center bottom;
  z-index: 10;
}

.hammer_move {
  animation: hammer_move 1.5s ease 1;
  transform-origin: center bottom;
}

@keyframes hammer_move {

  0%,
  100% {
    transform: rotate(30deg);
  }

  50% {
    transform: rotate(80deg);
  }
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  opacity: 1;
  transition: opacity .2s;
  padding: 20px;
  text-align: center;

}
</style>
