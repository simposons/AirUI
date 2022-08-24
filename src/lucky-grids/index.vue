<template>
    <lucky-grid 
    ref="myLucky" 
    width="200px" 
    height="200px" 
    :prizes="prizes" 
    :blocks="blocks" 
    :buttons="buttons"
    :default-style="defaultStyle"
    @start="startCallback" 
    @end="endCallback" 
    />
</template>

<script>
// 完整加载
// import Vue from 'vue';
// import VueLuckyCanvas from '@lucky-canvas/vue'
// Vue.use(VueLuckyCanvas)
import { LuckyGrid } from '@lucky-canvas/vue';

export default {
    name: 'lucky-grids',
    components: {
        LuckyGrid,
    },
    props: {

    },
    data() {
        return {
            blocks: [
                { padding: '10px', background: '#869cfa' },
                { padding: '10px', background: '#e9e8fe' },
            ],
            prizes: [
                { x: 0, y: 0, fonts: [{ text: '0', top: '25%' }] },
                { x: 1, y: 0, fonts: [{ text: '1', top: '25%' }] },
                { x: 2, y: 0, fonts: [{ text: '2', top: '25%' }] },
                { x: 2, y: 1, fonts: [{ text: '3', top: '25%' }] },
                { x: 2, y: 2, fonts: [{ text: '4', top: '25%' }] },
                { x: 1, y: 2, fonts: [{ text: '5', top: '25%' }] },
                { x: 0, y: 2, fonts: [{ text: '6', top: '25%' }] },
                { x: 0, y: 1, fonts: [{ text: '7', top: '25%' }] },
            ],
            buttons: [
                {
                    x: 1, y: 1,
                    background: '#7f95d1',
                    fonts: [{ text: '开始', top: '25%' }]
                }
            ],
            defaultStyle: {
                background: '#b8c5f2'
            },
        }
    },
    methods: {
        // 点击抽奖按钮会触发star回调
        startCallback() {
            // 调用抽奖组件的play方法开始游戏
            this.$refs.myLucky.play()
            // 模拟调用接口异步抽奖
            setTimeout(() => {
                // 假设后端返回的中奖索引是0
                const index = 0
                // 调用stop停止旋转并传递中奖索引
                this.$refs.myLucky.stop(index)
            }, 3000)
        },
        // 抽奖结束会触发end回调
        endCallback(prize) {
            console.log(prize)
        },
    }
};
</script>

<style lang="scss">
</style>
