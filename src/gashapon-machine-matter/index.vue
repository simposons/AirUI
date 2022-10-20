<template>
  <div>
    <div class="gashapon_machine" ref="gashaponMachine">
      <div class="gashapon_machine_canvas" ref="matterDiv" :style="`width:${width};height:${height};`"></div>
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
import Matter from 'matter-js'

const { Engine } = Matter// 创建引擎
const { Render } = Matter// 创建画布
const { World } = Matter// 创建世界
const { Bodies } = Matter// 用于创建各种的物体
const { Composite } = Matter;
const { Composites } = Matter;
const { Runner } = Matter;
// MouseConstraint 用于创建鼠标约束的方法。鼠标约束用于允许用户交互，提供通过鼠标或触摸移动身体的能力。
const { MouseConstraint } = Matter;
// Mouse 模块包含用于创建和操作鼠标输入的方法
const { Mouse } = Matter;

const { Body } = Matter;
const { Common } = Matter;
// const { Composites } = Matter;

let engine = null;
let render = null;
let runner = null;
export default {
  name: 'gashapon-machine-matter',
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
      default: 12,
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
      default: 12,
      // 4的倍数
    },
    // 是否开启帧数检测stats
    ifStats: {
      type: Boolean,
      default: false,
    },
    ifPerformance: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      prizeUrl: null,
    };
  },
  computed: {

  },
  async mounted() {
    await this.init();
    await this.initMouse();
    window.addEventListener('deviceorientation', this.GetGravity)
  },
  beforeDestroy() {
    window.removeEventListener('deviceorientation', this.GetGravity)
  },
  methods: {
    init() {
      engine = Engine.create({
        positionIterations: 10,
        velocityIterations: 10
      });
      // render(渲染器)将要渲染的物理引擎是上面的engine，而渲染的对象是html网页的body
      render = Render.create({
        element: this.$refs.matterDiv,
        engine,
        options: {
          pixelRatio: 1, // 设置像素比 这个关系到性能
          background: 'rgba(255,255,255,0)', // 设置全局背景颜色
          // 要设置背景颜色需要将线框模式为关
          wireframes: false, // 线框模
          // wireframeBackground: '#222'  线框模式时背景色
          // 要设置线框颜色需要打开线框模式
          // 但是打开之后就不能设置全局背景颜色了
          width: this.width,
          height: this.height,
          showAngleIndicator: false,// 物体半径
          showMousePosition: false, // 鼠标约束线
          showVelocity: false, // 移动刚体时速度
          showStats: this.ifStats,
          showPerformance: this.ifPerformance
        }
      });

      const center = { x: this.width / 2, y: this.height / 2 }
      // 圆的参数方程：以点O（a，b）为圆心，以r为半径的圆的参数方程是 x=a+r*cosθ, y=b+r*sinθ, （其中θ为参数）
      const R = (this.width) / 2 + 50
      for (let angle = 0; angle <= 360; angle += 6) {
        const randian = this.convertToRandians(angle)
        const x = center.x + R * Math.cos(randian)
        const y = center.y + R * Math.sin(randian)
        // 以圆形围成圆圈
        const body = Bodies.circle(x, y, 50, {
          isStatic: true,
          render: {
            sprite: {
              texture: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
            }
          }
        })
        World.add(engine.world, body);
      }

      const ballopts = (size, texture) => ({
        density: 1, // 密度
        restitution: 1, // 弹性
        render: {
          fillStyle: '',
          sprite: {
            texture,
            xScale: (size / 20).toFixed(2),
            yScale: (size / 20).toFixed(2)
          },
        },
        friction: 1,
      })
      const BoxList = Composites.stack(50, 50, 4, this.ballTotalCount / 4, 0, 0, (x, y) => {
        switch (Math.round(Common.random(0, 1))) {
          case 0:
            return Bodies.circle(x, y, this.ballRadius, ballopts(this.ballRadius, this.ballList[0].url));
          case 1:
            return Bodies.circle(x, y, this.ballRadius, ballopts(this.ballRadius, this.ballList[1].url));
        }
      });
      World.add(engine.world, [...BoxList]);
      // 重力设置
      engine.gravity.y = 0.5;
      runner = Runner.create({
        isFixed: true
      });
      Runner.run(runner, engine);// 运行引擎
      Render.run(render);// 运行渲染器
    },
    // 角度转弧度
    convertToRandians(degree) {
      return degree * (Math.PI / 180);
    },
    initMouse() {
      // 添加鼠标控制事件
      this.mouse = Mouse.create(render.canvas);
      this.mouseConstraint = MouseConstraint.create(engine, {
        mouse: this.mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })
      // 将世界添加进入鼠标事件
      Composite.add(engine.world, this.mouseConstraint);
      // 保持鼠标与渲染同步
      render.mouse = this.mouse;
    },
    // 陀螺仪
    GetGravity(event) {
      const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0;
      const { gravity } = engine.world;
      if (orientation === 0) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
        gravity.y = Common.clamp(event.beta, -90, 90) / 90;
      } else if (orientation === 180) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
        gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
      } else if (orientation === 90) {
        gravity.x = Common.clamp(event.beta, -90, 90) / 90;
        gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
      } else if (orientation === -90) {
        gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
        gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
      }
    },
    run() {
      const bodies = Composite.allBodies(engine.world);
      console.log({bodies})
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];

        if (!body.isStatic) {
          const forceMagnitude = 0.06 * body.mass;
          console.log({body})
          // 施加力
          Body.applyForce(body, body.position, {
            x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude
          });
          // 给与速度
          // Body.setVelocity(body, {
          //   x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
          //   y: -forceMagnitude + Common.random() * -forceMagnitude
          // })
        }
      }
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
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 37px;
    transform-origin: left top;
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
