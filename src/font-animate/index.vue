<template>
<demo-section>
   <demo-block title="text-shadow">
    <div class="tips tip1">陈小希</div>
    <div class="tips tip2">陈小希</div>
    <div class="tips tip3">陈小希</div>
    <div class="tips tip4">陈小希</div>
  </demo-block>
  <demo-block title="background-clip: text;">
    <div class="tips tip5">陈小希</div>
    <div class="tips tip6">陈小希</div>
    <div class="tips tip7">陈小希</div>
    <div class="tips tip8">陈小希</div>
  </demo-block>
  <demo-block title="mask">
    <div class="tips tip9">陈小希</div>
    <div class="tips tip10">陈小希</div>
    </demo-block>
  <demo-block title="text-stroke">
    <div class="tips tip11">陈小希</div>
    <div class="tips tip12">陈小希</div>
  </demo-block>
  <demo-block title="text-dazi">
    <div class="tips tip13">陈小希</div>
  </demo-block>
</demo-section>
</template>

<script>

export default {
  name: 'font-animate',
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  
  }
};
</script>

<style lang="scss">
@function makeLongShadow($color) {
  $val: 0 0 $color;

  @for $i from 1 through 20 {
      $color: fade-out(desaturate($color, 1%), .02);
      $val: #{$val}, #{$i}px #{$i}px #{$color};
  }

  @return $val;
}

.tips{
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 30px 0;
  font-size: 60px;
  font-weight: bold;
  height: 80px;
  line-height: 80px;
  width: 100%;
}
.tip1{
  font-weight: normal;
  color: #992400;
  text-shadow: makelongshadow(hsl(14, 100%, 30%));
}
.tip2{
  text-shadow: 0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212;
}
.tip3{
  color: #202020;
  background-color: #2d2d2d;
  letter-spacing: .1em;
  text-shadow: -1px -1px 1px #111, 2px 2px 1px #363636;
}
.tip4{
  background-color: #2d2d2d;
  color: #fff;
    text-shadow: 
        0 0 10px #0ebeff,
        0 0 20px #0ebeff,
        0 0 50px #0ebeff,
        0 0 100px #0ebeff,
        0 0 200px #0ebeff
}
.tip5{
  color: transparent;
  background: url('http://39.107.231.241:84/future.webp') no-repeat center center;
  background-size: cover;
  background-clip: text;
}
.tip6{
  color: transparent;
  background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
  background-clip: text;
}
.tip7{
  color: transparent;
  background: linear-gradient(45deg, #009688, yellowgreen, pink, #03a9f4, #9c27b0, #8bc34a);
  background-clip: text;
  animation: huerotate 3s infinite;
}
@keyframes huerotate {
  100% {
      filter: hue-rotate(360deg);
  }
}
.tip8{
  color: transparent;
  background-clip: text;
  background-color: black;
  position: relative;
  &::after{
    content: '陈小希';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
    background-clip: text;
    background-size: 150% 100%;
    background-repeat: no-repeat;
    animation: shine 3s infinite linear;
  }
}
@keyframes shine {
	0% {
		background-position: 50% 0;
	}
	100% {
		background-position: -190% 0;
	}
}
.tip9{
  mask: radial-gradient(circle at 50% 0%, #000, transparent 30%);
  animation: scale 2s infinite;
}
@keyframes scale {
  0% {
      mask-size: 100% 100%;
  }
  60%,
  100% {
      mask-size: 100% 800%;
  }
}
.tip10{
  mask: radial-gradient(circle at 50% 0%, #000, transparent 30%);
  animation: scale1 5s infinite;
}
@keyframes scale1 {
  0% {
      mask-size: 100% 100%;
  }
  60%,
  100% {
      mask-size: 800% 150%;
  }
}
.tip11{
  -webkit-text-stroke: 3px #000;
  color: #fff;
}
.tip12{
  color: #fff;
  text-shadow: 0 0 5px #000;
}
.tip13{
  font: bold 300% Consolas, Monaco, monospace;
  border-right: .1em solid black;
  width: 3em;
  margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 1.5s steps(3, end),
  blink-caret .5s step-end infinite alternate;
}
@keyframes typing { from { width: 0; } }
@keyframes blink-caret { 50% { border-color: transparent; } }
</style>
