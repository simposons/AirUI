<template>
<div>
    <qrcode class="qrcode" :text="url" version="8"></qrcode>
    <div class="url">{{url}}</div>
</div>
</template>
<script>
export default {
  name: 'show-qrcode',
  data() {
    return {
      url: '',
    }
  },
  mounted() {
    this.setUrl();
  },
  methods: {
    setUrl() {
     const {href} = window.location
     const url= href.split('#')
     url.splice(1,0,"mobile.html#");
     this.url=url.join('')
    //  console.log(this.url)
    },
  }
};
</script>
<style lang="scss">
.qrcode{
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
}
.url{
  margin-top: 30px;
  cursor: pointer;
  color: #1989fa;
}
</style>