<template>
 <van-button :color="color" :type="type"> <slot /></van-button>
</template>

<script>
import {  Button  } from 'vant'

export default {
  name: 'demo-button',
  components: {
        [Button.name]: Button  
    },

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss">

</style>
