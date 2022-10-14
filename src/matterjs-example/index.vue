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
const { Runner } = Matter;
// MouseConstraint 用于创建鼠标约束的方法。鼠标约束用于允许用户交互，提供通过鼠标或触摸移动身体的能力。
const { MouseConstraint } = Matter;
// Mouse 模块包含用于创建和操作鼠标输入的方法
const { Mouse } = Matter;

// const { Body } = Matter;
// const { Common } = Matter;
// const { Composites } = Matter;


export default {
  name: 'matterjs-example',
  props: {
   
  },
  data() {
    return {
      engine: null,
      render: null,
      BoxList: [],
      borders:[],
      width:window.innerWidth,
      height:window.innerHeight*0.8,
    }
  },
  async mounted() {
    await this.initEngineAndRender();
    await this.initBodies();
    await this.initWorld();
    await this.initMouse();
  },
  methods: {
    initEngineAndRender() {
      this.engine = Engine.create();
      // render(渲染器)将要渲染的物理引擎是上面的engine，而渲染的对象是html网页的body
      this.render = Render.create({
        element: this.$refs.matterDiv,
        engine: this.engine,

        options: {
          pixelRatio: 1, // 设置像素比 这个关系到性能
          background: '#76BAFE', // 设置全局背景颜色
          // 要设置背景颜色需要将线框模式为关
          wireframes: false, // 线框模
          // wireframeBackground: '#222'  线框模式时背景色
          // 要设置线框颜色需要打开线框模式
          // 但是打开之后就不能设置全局背景颜色了
          width: this.width,
          height: this.height,
          showAngleIndicator:true,// 物体半径
          showMousePosition: false, // 鼠标约束线
          showVelocity: true, // 移动刚体时速度
        }
      });
    },
    initBodies() {
      // 创建圆形
      this.BoxList[0] = Bodies.circle(100, 100, 20, {
        density: .68, // 设置密度
        restitution: 0.8, // 设置物体的弹跳力
        render: {
          sprite: {
            // 设置贴图
            // texture: '月饼.png'
          }
        }
      })
      // 创建矩形
      this.BoxList[1] = Bodies.rectangle(100, 150, 50, 50, {
        density: 1,
        restitution: 0.5,
        render: {
          sprite: {
          }
        }
      })
      // 边界
      const opts = {
      isStatic: true,
      render: {
        opacity: 1
      }
    }
      this.borders = [
       Bodies.rectangle(this.width / 2, -4, this.width + 2, 10, opts),
       Bodies.rectangle(this.width + 4,this.height / 2, 10, this.height + 2, opts),
       Bodies.rectangle(this.width / 2, this.height + 4, this.width + 2, 10, opts),
       Bodies.rectangle(-4, this.height / 2, 10, this.height + 2, opts)
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
    initWorld() {
      World.add(this.engine.world, [...this.BoxList,...this.borders]);// 将所有物体添加到世界中
      Runner.run(this.engine);// 运行引擎
      Render.run(this.render);// 运行渲染器
    },
    initMouse() {
      // 添加鼠标控制事件
      this.mouse = Mouse.create(this.render.canvas);
      this.mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: this.mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })
      // 将世界添加进入鼠标事件
      Composite.add(this.engine.world, this.mouseConstraint);
      // 保持鼠标与渲染同步
      this.render.mouse = this.mouse;

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
}
</style>
