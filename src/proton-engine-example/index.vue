<template>
  <div class="proton-engine-example">
    <canvas id="mycanvas"></canvas>
  </div>
</template>

<script>
import Proton from 'proton-engine/src/index.js'
import Stats from "stats.js";
import RAFManager from "raf-manager";
// const Proton =require('proton-engine/src/index.js')

export default {
  name: 'proton-engine-example',
  props: {

  },
  data() {
    return {
      canvas: null,
      context: null,
      proton: null,
      emitter: null,
      renderer: null,
      stats: null,

    }
  },
  watch: {

  },
  async mounted() {
    await this.initCanvas()
    await this.initStats()
    await this.createProton()
    await this.render()
  },
  methods: {
    initCanvas() {
      const { emitter } = this
      this.canvas = document.getElementById('mycanvas');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerWidth;
      this.context = this.canvas.getContext("2d");
      window.onresize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth;
        emitter.p.x = this.canvas.width / 2;
        emitter.p.y = this.canvas.height / 2;
      };
    },
    initStats() {
      
     this.stats = new Stats();
     this.stats.setMode(2);
     this.stats.domElement.style.position = "absolute";
     this.stats.domElement.style.left = "0px";
     this.stats.domElement.style.top = "0px";
      this.$el.appendChild(this.stats.domElement);
    },
    createProton() {
      const { canvas, context } = this
      this.proton = new Proton();
      this.emitter = new Proton.Emitter();
      this.emitter.rate = new Proton.Rate(
        new Proton.Span(10, 20),
        new Proton.Span(0.1, 0.25)
      );
      this.emitter.addInitialize(new Proton.Mass(1));
      this.emitter.addInitialize(new Proton.Radius(1, 12));
      this.emitter.addInitialize(new Proton.Life(2, 4));
      this.emitter.addInitialize(
        new Proton.Velocity(
          new Proton.Span(2, 4),
          new Proton.Span(-30, 30),
          "polar"
        )
      );
      this.emitter.addBehaviour(new Proton.RandomDrift(30, 30, 0.05));
      this.emitter.addBehaviour(
        new Proton.Color("ff0000", "random", Infinity, Proton.easeOutQuart)
      );
      this.emitter.addBehaviour(new Proton.Scale(1, 0.7));
      this.emitter.p.x = canvas.width / 2;
      this.emitter.p.y = canvas.height / 2;
      this.emitter.emit();
      this.proton.addEmitter(this.emitter);
      this.renderer = new Proton.CanvasRenderer(canvas);
      this.renderer.onProtonUpdate = () => {
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
      };
      this.proton.addRenderer(this.renderer);
    },
    render() {
      RAFManager.add(() => {
        this.stats.begin();
        this.emitter.rotation += 1.5;
        this.proton.update();
        this.stats.end();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.proton-engine-example {
  position: relative;
}
</style>
