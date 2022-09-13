<template>
  <div>
   {{num}}
  </div>
</template>

<script>
export default {
  name:'shake-tree',
  data() {
      return {
          num: 0,
          SHAKE_THRESHOLD: 8000, // 动摇阀值，越高需要摇摆的幅度越大
          loading: false, // 防止摇摆过程中造成的误操作
          text: '',
          last_update: 0,
          x: 0,
          y: 0,
          z: 0,
          last_x: 0,
          last_y: 0,
          last_z: 0
      }
  },
  mounted() {
      this.getPermission()
      // 判断设否授权了 设备运动权限
      if (window.DeviceMotionEvent) {
      // 监听设备运动
          window.addEventListener('devicemotion', this.devicemotion, false)
      }
  },
  // 页面销毁时
  beforeDestroy() {
      window.removeEventListener('devicemotion', this.devicemotion, false)
  },
  methods: {
      // 设备运动 方法
      devicemotion(event) {
      // 获取加速度信息
      // 通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
          const acceleration = event.accelerationIncludingGravity
          const curTime = new Date().getTime()
          if (curTime - this.last_update > 10) {
              const diffTime = curTime - this.last_update
              this.last_update = curTime
              this.x = acceleration.x
              this.y = acceleration.y
              this.z = acceleration.z
              const speed =
          (Math.abs(
              this.x + this.y + this.z - this.last_x - this.last_y - this.last_z
          ) /
            diffTime) *
          10000
              // 而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
              if (speed > this.SHAKE_THRESHOLD) {
                  if (!this.loading) {
                      this.loading = true
                      this.num ++
                      if("vibrate" in navigator){
                          navigator.vibrate(500)
                      }
                      setTimeout(() => {
                          this.loading = false
                      }, 700);
                  }
              }
          }
          this.last_x = this.x
          this.last_y = this.y
          this.last_z = this.z
      },
      // 获取权限
      getPermission() {
          if (
              typeof window.DeviceMotionEvent !== 'undefined' &&
          typeof window.DeviceMotionEvent.requestPermission === 'function'
          ) {
              window.DeviceMotionEvent.requestPermission()
                  .then(function (state) {
                      if (state === 'granted') {
                      // 用户同意授权
                      } else {
                      // 用户拒绝授权
                          alert('摇一摇需要授权设备运动权限,请重启应用后,再次进行授权!')
                      }
                  })
                  .catch(function (err) {
                      alert('error: ' + err)
                  })
          }
      },
  }
}
</script>

<style lang="scss" scoped>
.img {
  height: 8rem;
  text-align: center;
  margin-bottom: 2rem;
  img {
    display: inline-block;
    height: 100%;
  }
}
.play {
  animation: play 0.5s ease both 2;
}
@keyframes play {
  30% {
    transform: rotate(-30deg);
  }
  60% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>