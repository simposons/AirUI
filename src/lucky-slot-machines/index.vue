<template>
    <div>
        <slot-machine
        style="margin:auto"
        ref="myLucky" 
        width="200px" 
        height="200px" 
        :prizes="prizes"
        :slots="slots" 
        :blocks="blocks" 
        :buttons="buttons"
        :default-style="defaultStyle"
        :default-config="defaultConfig"
        @end="endCallback" 
        />
        <button @click="startCallback">开始</button>
    </div>
</template>

<script>
// 完整加载
// import Vue from 'vue';
// import VueLuckyCanvas from '@lucky-canvas/vue'
// Vue.use(VueLuckyCanvas)
import { SlotMachine } from '@lucky-canvas/vue';

export default {
    name: 'lucky-slot-machines',
    components: {
        SlotMachine,
    },
    props: {

    },
    data() {
        return {
            blocks: [
                { padding: '10px', background: '#869cfa' },
                { padding: '10px', background: '#e9e8fe' },
            ],
            slots: [
                { order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], direction: 1 },
                { order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], direction: -1 },
                { order: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1], direction: 1 },
            ],
            prizes: [
                { fonts: [{ text: '0', top: '15%' }] },
                { fonts: [{ text: '1', top: '15%' }] },
                { fonts: [{ text: '2', top: '15%' }] },
                { fonts: [{ text: '3', top: '15%' }] },
                { fonts: [{ text: '4', top: '15%' }] },
                { fonts: [{ text: '5', top: '15%' }] },
                { fonts: [{ text: '6', top: '15%' }] },
                { fonts: [{ text: '7', top: '15%' }] },
                { fonts: [{ text: '8', top: '15%' }] },
                { fonts: [{ text: '9', top: '15%' }] },
            ],
            buttons: [
                {
                    x: 1, y: 1,
                    background: '#7f95d1',
                    fonts: [{ text: '开始', top: '25%' }]
                }
            ],
            defaultStyle: {
                borderRadius: Infinity,
                background: '#bac5ee',
                fontSize: '32px',
                fontColor: '#333'
            },
            defaultConfig: {
                rowSpacing: '20px',
                colSpacing: '10px'
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
                const index = [9,9,6]
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
