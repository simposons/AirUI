<template>
  <div>
    <svg v-show="svgShow" class="red-packet-svg" :style="`opacity:${elOpacity}`" version="1.1"
      xmlns="http://www.w3.org/2000/svg">
    <div class="totalCount">{{ totalCount }}</div>
      <template v-for="(item, index) in packetList">
        <image :key="index" :href="item.imageLink" :id="item.key" :width="item.width" :height="item.width"
          @click="imgClick(item, $event)" :style="`z-index${item.imageType ? '10' : '0'}`" :transform="`rotate(${item.rotate})`">
          <!-- 这里也可以分开写animate x y -->
          <animateMotion :path="`M ${item.x} ${item.y} L ${item.x -item.motionValue} ${maxY-item.motionValue }`" begin="0s"
            :dur="`${item.dur}s`" repeatCount="indefinite" />
        </image>
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'red-packet-svg',
  props: {},
  data() {
    return {
      svgShow: false,
      elOpacity: 0,
      totalCount: 0,
      maxY: document.documentElement.clientHeight,
      allElement: [
        {
          num: 15,
          minWidth: 50,
          maxWidth: 75,
          minHeight: 60,
          maxHeight: 85,
          durBase: 10,
          imageLink: 'img/hongbao.svg',
          imageType: 'click',
          rotate:25,
          motionValue:0
        },
        {
          num: 15,
          minWidth: 21,
          maxWidth: 21,
          minHeight: 21,
          maxHeight: 21,
          durBase: 5,
          imageLink: 'img/star.svg',
          rotate:25,
          motionValue:0
        },
        {
          num: 13,
          minWidth: 16,
          maxWidth: 16,
          minHeight: 114,
          maxHeight: 114,
          durBase: 10,
          imageLink: 'img/line.svg',
          rotate:25,
          motionValue:0
        },
      ],
      packetList: [],
    };
  },

  mounted() { },
  methods: {
    async start() {
      this.svgShow = true;
      await this.allElement.forEach((item) => {
        this.getRandomArr(item)
      });
      this.elOpacity = 1;
      this.stop(10000);
    },
    stop(time) {
      setTimeout(() => {
        this.elOpacity = 0
        setTimeout(() => {
          this.$emit('stopCallBack', this.totalCount)
          this.totalCount = 0
          this.svgShow = false
          this.packetList = []

        }, 500);
      }, time);
    },
    getRandomArr(config) {
      const maxX = document.documentElement.clientWidth;
      const {
        num,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        durBase,
        imageLink,
        imageType,
        rotate,
        motionValue
      } = config;
      for (let i = 0; i < num; i++) {
        const height = Math.random() * (maxHeight - minHeight) + minHeight;

        this.packetList.push({
          key: +new Date(),
          width: Math.random() * (maxWidth - minWidth) + minWidth,
          height,
          x: Math.random() * maxX + 1,
          y: `-${height}`,
          dur: Math.random() * durBase + 1,
          imageLink,
          imageType,
          rotate,
          motionValue
        });
      }
    },
    imgClick(item, e) {
      if (item.imageType !== 'click') {
        return
      }
      this.totalCount++
      this.$emit('countChange', this.totalCount)
      e.target.setAttribute('display', 'none');
    }
  },
};
</script>

<style lang="scss" scoped>
.red-packet-svg {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.5s;

  img {
    transform-box: fill-box;
    transform-origin: center;
    cursor: pointer;
  }

  .totalCount {
    width: 100%;
    text-align: center;
    margin: 20px;
    font-size: 20px;
    color: #fff;
    font-weight: 600;
  }
}
</style>
