<template>
  <div>
    <div class="gashapon_machine" ref="gashaponMachine">
      <canvas class="gashapon_machine_canvas" id="gashapon_machine_canvas"
        :style="`width:${width * 3};height:${height * 3};`" :width="width * 3" :height="height * 3"></canvas>
      <div class="gashapon_machine_bottom"></div>
      <div class="gashapon_machine_result">
        <img :class="prizeUrl?'img_show':''"
          :src="prizeUrl?prizeUrl:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'"
          alt="" />
      </div>

    </div>
  </div>
</template>

<script>
import Stats from "stats.js";

export default {
  name: 'gashapon-machine-setinterval',
  props: {
    width: {
      type: Number,
      default: 160,
    },
    height: {
      type: Number,
      default: 160,
    },
    // 小球半径
    ballRadius: {
      type: Number,
      default: 15,
    },
    // 小球速度
    ballSpeed: {
      type: Number,
      default: 13,
    },
    // 小球种类合集
    ballList: {
      type: Array,
      default: () => [
        { url: 'http://39.107.231.241:84/ndj/yh_ball_red.png' },
        { url: 'http://39.107.231.241:84/ndj/yh_ball_grey.png' }
      ]
    },
    // 小球总数量
    ballTotalCount: {
      type: Number,
      default: 10,
    },
    // 是否开启帧数检测stats
    ifStats: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      awardList: [],// 小球池
      timer: null,// 定时器
      radius: this.ballRadius * 3,// 半径
      speed: this.ballSpeed * 3,
      acceleration: 1,// 停止时的负加速度
      prizeUrl: null,
      stats: null,
    };
  },
  computed: {

  },
  async mounted() {
    await this.initCanvas();
    await this.initBall();
    await this.initStats();
    await this.run()
    setTimeout(() => {
      this.stop()
    }, 2000);
  },
  methods: {
    initCanvas() {
      this.canvas = document.getElementById('gashapon_machine_canvas');
      this.ctx = this.canvas.getContext('2d');
      this.ballList.forEach(item => {
        const img = document.createElement("img");
        img.src = item.url
        item.element = img
      });
    },
    initBall() {
      this.awardList = []
      this.prizeUrl = null
      for (let i = 0; i < this.ballTotalCount; i++) {// 随机生成小球序列
        let speedX
        let speedY
        do {
          speedX = Math.random() * (this.speed) - 10
        } while (speedX < 10);// 小球横坐标改变速度
        do {
          speedY = Math.random() * (this.speed) - 10
        } while (speedY < 10);// 小球纵坐标改变速度
        const obj = {
          x: Math.random() * (this.canvas.width - this.radius * 2),
          y: Math.random() * (this.canvas.height - this.radius * 2),
          img: this.ballList[i % this.ballList.length].element,
          speedX,
          speedY,
          radius: this.radius
        }
        this.awardList.push(obj)
      }

    },
    run() {
      this.initBall()
      if (this.awardList.length === 0) {// 奖池中没有小球
        return
      }
      window.clearInterval(this.timer);// 清除计时器
      this.timer = setInterval(() => {
        this.stats.begin();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// 清空画布
        this.awardList.forEach(item => {
          this.runBall(item);
        });
        this.stats.end();
        // 使小球运动
      }, 15);
    },
    stop(index) {
      if (this.awardList.length === 0) {// 奖池中没有小球
        return
      }
      window.clearInterval(this.timer);// 清除计时器
      // this.awardList.pop()
      this.timer = setInterval(() => {
        this.stats.begin();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// 清空画布
        this.awardList.forEach(item => {
          this.stopBall(item);
        });
        this.stats.end();
        // 使小球停止
      }, 15);
      this.prizeUrl = index !== undefined || null ? this.ballList[index].url : null

    },

    stopBall(item) {
      item.x += item.speedX;
      item.y += item.speedY;
      console.log(item.speedX, item.speedY)
      if (item.x > this.canvas.width - item.radius * 2) {// 小球碰到右边界，横坐标速度变为负
          item.speedX = -(item.speedX);
        }
        if (item.x < 0) {// 小球碰到左边界，横坐标速度变为正
          item.speedX = Math.abs(item.speedX);
        }
        if (item.y > this.canvas.height - item.radius * 2) {// 小球碰到下边界，纵坐标速度变为负
          // item.speedY = -item.speedY;
          if (item.speedY !== 0) {
            item.speedY = Math.floor(item.speedY - this.acceleration);
          }
          if (item.speedX !== 0) {
            item.speedX = Math.floor(item.speedX - this.acceleration);
          }
        }
        if (item.y < 0) {// 小球碰到上边界，纵坐标速度变为正
          item.speedY = Math.abs(item.speedY);
        }
      this.ctx.drawImage(item.img, item.x, item.y, item.radius * 2, item.radius * 2);// 绘制小球
    },
    runBall(item) {
      // const canvasRadius = this.canvas.width / 2 - item.radius
      item.x += item.speedX;
      item.y += item.speedY;
      // if (Math.abs(canvasRadius - item.x) * Math.abs(canvasRadius - item.y) >= canvasRadius * canvasRadius) {
      //   // 根据圆形边界直角反弹原理 用向量计算转向速度
      //   const Sx = item.speedX
      //   const Sy = item.speedY
      //   // item.speedX = -item.speedX;
      //   // item.speedY = -item.speedY;
      //   const value = Math.sqrt(Sx * Sx + Sy * Sy)
      //   const cos1 = Sx / value
      //   const sin1 = Sy / value
      //   const cos2 = Math.cos(Math.PI / 2);
      //   const sin2 = Math.sin(Math.PI / 2);

      //   const cos3 = cos1 * cos2 - sin1 * sin2;
      //   const sin3 = sin1 * cos2 + cos1 * sin2;
      //   item.speedX = (value * cos3).toFixed(2);
      //   item.speedY = (value * sin3).toFixed(2);
      //   console.log(Sx, Sy, item.speedX, item.speedY)
      // }
      if (item.x > this.canvas.width - item.radius * 2) {// 小球碰到右边界，横坐标速度变为负
        item.speedX = -item.speedX;
      }
      if (item.x < 0) {// 小球碰到左边界，横坐标速度变为正
        item.speedX = Math.abs(item.speedX);
      }
      if (item.y > this.canvas.height - item.radius * 2) {// 小球碰到下边界，纵坐标速度变为负
        item.speedY = -item.speedY;
      }
      if (item.y < 0) {// 小球碰到上边界，纵坐标速度变为正
        item.speedY = Math.abs(item.speedY);
      }
      this.ctx.drawImage(item.img, item.x, item.y, item.radius * 2, item.radius * 2);// 绘制小球
    },
    initStats() {
      if (!this.ifStats) return
      this.stats = new Stats();
      this.stats.setMode(2);
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.top = "0px";
      this.$refs.gashaponMachine.appendChild(this.stats.domElement);
    },
  },
};
</script>

<style lang="scss" scoped>
.gashapon_machine {
  width: 240px;
  height: 311px;
  margin: auto;
  display: flex;
  background: url('http://39.107.231.241:84/ndj/yh_bg.png') center center no-repeat;
  background-size: 88%;
  position: relative;
  user-select: none;

  &_canvas {
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 37px;
    transform-origin: left top;
    transform: scale(0.333333);
  }

  &_bottom {
    background: url(http://39.107.231.241:84/ndj/yh_bottom.png) center center no-repeat;
    background-size: 100%;
    width: 144px;
    height: 57px;
    position: absolute;
    bottom: 142px;
    left: 45px;
    z-index: 10;
  }

  &_result {
    position: absolute;
    bottom: 36px;
    left: 106px;

    img {
      width: 31px;
      height: 31px;
      opacity: 0;
      transition: opacity 0.3s 1s;

    }

    .img_show {
      opacity: 1;
    }
  }
}
</style>
