<template>
  <demo-section>
    <demo-block title="基础用法">
      <div style="text-align: center;">
        <button @click="buttonClick" >开始</button>
        <div>红包数{{count}}</div>
      </div>
      <red-packet-svg ref="redPacketSvg" @stopCallBack="stopCallBack" @countChange="countChange"/>
    </demo-block>
  </demo-section>
</template>
<script>
export default {
  data() {
    return {
      count:0,
    };
  },
  mounted() {

  },
  methods: {
    buttonClick() {
      this.$refs.redPacketSvg.start()
    },
    stopCallBack(e){
      console.log('总数：',e)
    },
    countChange(e){
      this.count=e
    }
  },
}
</script>
<style lang="scss">
</style>