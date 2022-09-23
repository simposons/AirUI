<template>
  <div>
    <canvas id="mycanvas"></canvas>
  </div>
</template>

<script>
import Proton from 'proton-engine/src/index.js'

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
    }
  },
  watch: {

  },
  mounted() {
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      const { emitter } = this
      let {canvas} =this
      canvas = document.getElementById('mycanvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.context = canvas.getContext("2d");
      window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
      };
    },
    createProton() {
      let { proton, emitter, renderer } = this
      const {canvas,context} =this
      proton = new Proton();
      emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(
        new Proton.Span(10, 20),
        new Proton.Span(0.1, 0.25)
      );
      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(1, 12));
      emitter.addInitialize(new Proton.Life(2, 4));
      emitter.addInitialize(
        new Proton.Velocity(
          new Proton.Span(2, 4),
          new Proton.Span(-30, 30),
          "polar"
        )
      );
      emitter.addBehaviour(new Proton.RandomDrift(30, 30, 0.05));
      emitter.addBehaviour(
        new Proton.Color("ff0000", "random", Infinity, Proton.easeOutQuart)
      );
      emitter.addBehaviour(new Proton.Scale(1, 0.7));
      emitter.p.x = canvas.width / 2;
      emitter.p.y = canvas.height / 2;
      emitter.emit();

      proton.addEmitter(emitter);
      renderer = new Proton.CanvasRenderer(canvas);
      renderer.onProtonUpdate = () => {
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
      };
      proton.addRenderer(renderer);
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {}
</style>
