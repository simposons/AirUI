<template>
  <demo-section>
    <demo-block title="基础用法">
      <smash-golden-eggs-more ref="smashEggs" @start="getData" @end="animateEnd" />
    </demo-block>
    <div>
      <div>选择奖品名称</div>
      <select v-model="prizeName" name="奖品名称" id="a">
        <option v-for="(item,index) in prizeList" :key="index" :value="item">{{item}}</option>
      </select>
    </div> 
  </demo-section>
</template>
<script>

export default {
  name: 'smash-golden-eggs-more-demo',
  data() {
    return {
      prizeList: [
        '再接再厉',
        '现金红包0.8元',
        '现金红包1.8元',
        '科沃斯扫地机器人N8',
        '美的MG38CB-AA烤箱',
        '投顾锦囊8.5折折扣券',
        '投顾锦囊7.5折折扣券',
        '投顾锦囊6.5折折扣券',
        '50金币',
        '30金币',
      ],
      prizeName:'再接再厉',
    }
  },
  mounted() {
  },
  activated() {
  },
  methods: {
    // 获取抽奖结果
    getData() {
      this.$refs.smashEggs.start(this.prizeName)
    },
    // 转盘结束回调
    animateEnd() {
      console.log('animateEnd')
    },
  }
}
</script>
<style lang="scss" scoped></style>