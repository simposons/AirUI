<template>
  <div class="scrape-off-card">
    <div v-if="contentType === 'image'" class="scratch-content">
      <img alt="" :src="content" />
    </div>
    <div v-else class="scratch-content" v-html="content"></div>
    <canvas title="" id="coverLayer" :width="clientWidth" :height="height"></canvas>
  </div>
</template>

<script>
export default {
  name: 'scrape-off',
  props: {
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: 150,
    },
    contentType: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'image'].includes(value);
      },
    },
    content: {
      type: String,
      required:true,
    },
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      mousedown: false,
      offsetX: 0,
      offsetY: 0,
    };
  },
  computed:{
    clientWidth(){
      const width=document.body.clientWidth
      return width
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.canvas = document.getElementById('coverLayer');
      this.offsetY=this.canvas.getBoundingClientRect().y;
      this.offsetX=this.canvas.getBoundingClientRect().x;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillStyle = '#555';
      this.ctx.fillRect(0, 0, this.clientWidth, this.height);
      console.log(this.ctx)
      this.canvas.addEventListener('touchstart', () => {
        console.log('touchstart');
        this.mousedown = true;
      });
      this.canvas.addEventListener('touchend', () => {
        console.log('touchend');
        this.mousedown = false;
      });
      this.canvas.addEventListener('touchcancel', () => {
        console.log('touchend');
        this.mousedown = false;
      });
      // this.canvas.addEventListener('mousemove', (e) => {
      //   if (this.mousedown) {
      //     this.clear(e.offsetX, e.offsetY);
      //   }
      // });
      this.canvas.addEventListener('touchmove', (e) => {
        if (this.mousedown) {
          this.clear(e.changedTouches[0].clientX-this.offsetX, e.changedTouches[0].clientY-this.offsetY);
        }
      });
    },
    clear(x, y) {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    },
  },
};
</script>

<style lang="scss" scoped>
.scrape-off-card {
  position: relative;
  #coverLayer {
   // width: 100%;
    z-index: 10;
  }
  .scratch-content {
    z-index: -1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    font-size: 25px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .scratch-content > img {
    width: 100%;
    height: 100%;
  }
}
</style>
