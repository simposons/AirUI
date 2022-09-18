<template>
  <div>
    <img
      src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/6/16b2a8cee3d0230f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image"
      alt="此图片是500*72，主要是为了显示作用"
    />
    <div class="hi"></div>
  </div>
</template>

<script>
export default {
  name: 'frame-by-frame',
  props: {},
  data() {
    return {
      url: '',
    };
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.hi {
  width: 50px;
  height: 72px;
  background-image: url('https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/6/16b2a8cee3d0230f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image');
  /*深度理解
            *整个动画1s完成。
            *这里1s要移动500的像素，这1s要有十步走完，每步是平均下来是0.1s，
            *每步比上一步多走了72px的位置，这个走是瞬间走到的。
            *end表示每一步在接近0.1s再去走
            */
  animation: play 1s steps(10) infinite;
}
/*定义动画*/
@keyframes play {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: -500px 0px;
  }
}
</style>
