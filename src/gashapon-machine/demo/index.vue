<template>
  <demo-section>
    <demo-block title="基础用法">
      <gashapon-machine ref="gashaponMachine"/>

      <div style="text-align: center;">
      <button @click="start">开始</button>
      <button @click="stop">停止</button>
      </div>
    </demo-block>
  </demo-section>
</template>
<script>

export default {

  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
   start(){
    this.$refs.gashaponMachine.run()
   },
   stop(){
    this.$refs.gashaponMachine.stop(0)
   }
  },
}
</script>
<style lang="scss">
</style>