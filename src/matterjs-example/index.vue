<template>
  <div class="matterDiv" ref="matterDiv"></div>
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

// const { Body } = Matter;
const { Common } = Matter;
// const { Composites } = Matter;

let engine = null;
let render = null;
let runner = null;

export default {
  name: 'matterjs-example',
  props: {

  },
  data() {
    return {
      BoxList: [],
      borders: [],
      width: window.innerWidth,
      height: window.innerWidth,
    }
  },
  async mounted() {
    await this.initEngineAndRender();
    // await this.initBorders();
    await this.initCircle();
    await this.initBall();
    await this.initWorld();
    await this.initMouse();
    window.addEventListener('deviceorientation', this.GetGravity)
  },
  beforeDestroy() {
    window.removeEventListener('deviceorientation', this.GetGravity)
  },
  methods: {
    initEngineAndRender() {
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
          showStats: true,
          showPerformance: true
        }
      });
    },
    initBorders() {
      // // 创建圆形
      // this.BoxList[0] = Bodies.circle(100, 100, 20, {
      //   density: .68, // 设置密度
      //   restitution: 0.8, // 设置物体的弹跳力
      //   render: {
      //     sprite: {
      //       // 设置贴图
      //       // texture: '月饼.png'
      //     }
      //   }
      // })
      // // 创建矩形
      // this.BoxList[1] = Bodies.rectangle(100, 150, 50, 50, {
      //   density: 1,
      //   restitution: 0.5,
      //   render: {
      //     sprite: {
      //     }
      //   }
      // })
      // 边界
      const opts = {
        isStatic: true,
        render: {
          opacity: 1
        }
      }
      this.borders = [
        Bodies.rectangle(this.width / 2, 0, this.width + 2, 50, opts),
        Bodies.rectangle(this.width + 4, this.height / 2, 50, this.height + 2, opts),
        Bodies.rectangle(this.width / 2, this.height + 4, this.width + 2, 50, opts),
        Bodies.rectangle(-4, this.height / 2, 50, this.height + 2, opts)
      ]

      // this.bg = Bodies.rectangle(this.Ew / 2, this.Eh - bgy, bgw, bgh, { 
      //   isStatic: true,
      //   render: {
      //     fillStyle:'none',
      //     sprite: sprite
      //   },
      //   isStatic: true,
      //   isSensor: true,
      // })
    },
    // 角度转弧度
    convertToRandians(degree) {
      return degree * (Math.PI / 180);
    },
    initCircle() {
      const center = { x: this.width / 2, y: this.height / 2 }
      // 圆的参数方程：以点O（a，b）为圆心，以r为半径的圆的参数方程是 x=a+r*cosθ, y=b+r*sinθ, （其中θ为参数）
      const R = (this.width) / 2 + 50
      for (let angle = 0; angle <= 360; angle += 6) {
        const randian = this.convertToRandians(angle)
        const x = center.x + R * Math.cos(randian)
        const y = center.y + R * Math.sin(randian)
        // FYD 1 以正方形围成圆圈,
        // let body = Bodies.rectangle(x,y,10,10,{
        // 	isStatic: true,
        // 	angle: randian,
        // 	render: {
        // 			fillStyle: "#000",
        // 			strokeStyle: "#fff",
        // 			lineWidth: 1
        // 		}
        // })
        // FYD2 以圆形围成圆圈
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
    },
    // 初始化小球
    initBall() {
      const ballopts = (size, texture) => ({
        density: 0.6, // 密度
        restitution: 0.6, // 弹性
        render: {
          fillStyle: '',
          sprite: {
            texture,
            // xScale: (size / 20).toFixed(2),
            // yScale: (size / 20).toFixed(2)
          },
        },
        friction: 1,
      })
      this.BoxList = Composites.stack(50, 50, 4, 3, 0, 0, function (x, y) {
        switch (Math.round(Common.random(0, 1))) {
          case 0:
            return Bodies.circle(x, y, 20, ballopts(20, 'http://39.107.231.241:84/ndj/yh_ball_red.png'));
          case 1:
            return Bodies.circle(x, y, 20, ballopts(20, 'http://39.107.231.241:84/ndj/yh_ball_grey.png'));
        }
      });
    },
    initWorld() {
      World.add(engine.world, [...this.BoxList, ...this.borders]);// 将所有物体添加到世界中
      runner = Runner.create({
        isFixed: true
      });
      Runner.run(runner, engine);// 运行引擎
      Render.run(render);// 运行渲染器
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
    }
  }
};
</script>

<style lang="scss">
.matterDiv {
  margin: 0;
  border: 0;
  width: 100vw;
  height: 100vw;

  canvas {
    //border-radius: 50%;
  }
}
</style>
