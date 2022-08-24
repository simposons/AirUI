<template>
    <lucky-wheel 
    ref="myLucky" 
    width="200px" 
    height="200px" 
    :prizes="prizes" 
    :blocks="blocks" 
    :buttons="buttons"
    @start="startCallback" 
    @end="endCallback" 
    />
</template>

<script>
// 完整加载
// import Vue from 'vue';
// import VueLuckyCanvas from '@lucky-canvas/vue'
// Vue.use(VueLuckyCanvas)
import { LuckyWheel } from '@lucky-canvas/vue';

export default {
    name: 'lucky-wheels',
    components: {
        LuckyWheel,
    },
    props: {

    },
    data() {
        return {
            blocks: [
                { padding: '10px', background: '#869cfa' },
                // {
                //     imgs: [{
                //         src: 'img/wzmrtx.png',
                //         width: '100%',
                //         height: '100%'
                //     }]
                // }
            ],
            prizes: [
                { background: '#e9e8fe', fonts: [{ text: '0' }] },
                { background: '#b8c5f2', fonts: [{ text: '1' }] },
                { background: '#e9e8fe', fonts: [{ text: '2' }] },
                { background: '#b8c5f2', fonts: [{ text: '3' }] },
                { background: '#e9e8fe', fonts: [{ text: '4' }] },
                { background: '#b8c5f2', fonts: [{ text: '5' }] },
                { background: '#e9e8fe', fonts: [{ text: '6' }] },
                { background: '#b8c5f2', fonts: [{ text: '7' }] },
            ],
            buttons: [
                { radius: '40%', background: '#617df2' },
                { radius: '35%', background: '#afc8ff' },
                {
                    radius: '30%', background: '#869cfa',
                    pointer: true,
                    fonts: [{ text: '开始', top: '-10px' }]
                }
            ]
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
