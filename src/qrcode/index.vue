<template>
  <div>
    <img :src="url" class='qrcode_img' />
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'qrcode',
  props: {
    text: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      default: '2',
    },
  },
  data() {
    return {
      url: '',
    }
  },
  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          this.getQrcodeUrl();
        });
      }
    }
  },
  mounted() {
    this.getQrcodeUrl();
  },
  methods: {
    getQrcodeUrl() {
      console.log('text',this.text,this.version)
      QRCode.toDataURL(this.text, { version: this.version },
        (err, url) => {
          this.url = url
          console.log('2',err,url,this.text)
        })
    },
  }
};
</script>

<style lang="scss">
.qrcode_img {
  width: 150px;
  height: 150px;
}
</style>
