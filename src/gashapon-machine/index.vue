<template>
  <div>
    <div class="gashapon_machine">
      <canvas class="gashapon_machine_canvas" id="gashapon_machine_canvas"></canvas>
    </div>
    <button>开始</button>
  </div>
</template>

<script>
export default {
  name: 'gashapon-machine',
  props: {
    width: {
      type: Number,
      default: null,
    },
    // height: {
    //   type: Number,
    //   default: 150,
    // },
    // contentType: {
    //   type: String,
    //   default: 'text',
    //   validator: (value) => {
    //     return ['text', 'image'].includes(value);
    //   },
    // },
    // content: {
    //   type: String,
    //   default: '测试',
    // },
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      ballList: [
        { url: 'http://39.107.231.241:84/ndj/yh_ball_red.png' },
        { url: 'http://39.107.231.241:84/ndj/yh_ball_grey.png' }
      ],// 小球种类合集
      awardList: [],// 小球池
      ballTotalCount: 10,// 小球总数量
      timer: null,// 定时器
      radius: 30,// 半径
    };
  },
  computed: {

  },
  mounted() {
    this.initCanvas();
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
      for (let i = 0; i < this.ballNum; i++) {// 随机生成小球序列
        const obj = {
          x: Math.random() * (this.canvas.width - this.radius * 2),
          y: Math.random() * (this.canvas.height - this.radius * 2),
          img: this.ballList(Math.floor(this.ballTotalCount * Math.random())),
          speedX: Math.random() * (20) - 10,
          speedY: Math.random() * (20) - 10,
        }
        this.awardList.push(obj)
      }
      window.clearInterval(this.timer);// 清除计时器
      this.timer = setInterval(function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// 清空画布
        for (let i = 0; i < this.awardList.length; i++) {
          this.awardList[i].run();
        }
        // 使小球运动
      }, 15);
    },
    stop() {

    },
    run(item) {
 item.x += item.speedX;
            item.y += item.speedY;
            if (item.x > this.canvas.width - item.r * 2) {// 小球碰到右边界，横坐标速度变为负
                item.speedX = -item.speedX;
            }
            if (item.x < 0) {// 小球碰到左边界，横坐标速度变为正
                item.speedX = Math.abs(item.speedX);
            }
            if (item.y > this.canvas.height - item.r * 2) {// 小球碰到下边界，纵坐标速度变为负
                item.speedY = -item.speedY;
            }
            if (item.y < 0) {// 小球碰到上边界，纵坐标速度变为正
                item.speedY = Math.abs(item.speedY);
            }
            this.ctx.drawImage(item.img, item.x, item.y, item.r*2, item.radius);// 绘制小球
    }

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
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 37px;
  }
}
</style>
