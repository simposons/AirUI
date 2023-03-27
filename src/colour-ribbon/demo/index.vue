<template>
  <demo-section>
    <demo-block title="基础用法">
      <div style="text-align: center;">
        <button @click="buttonClick">开始</button>
      </div>
      <colour-ribbon ref="colourRibbon" width="10px" height="15px" />
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
    buttonClick() {
      this.$refs.colourRibbon.start()
    }
  },
}
</script>