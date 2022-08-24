<template>
    <div></div>
</template>

<script>
// 完整加载
import { LuckyWheel } from 'lucky-canvas'

export default {
    name: 'lucky-wheels-js',
    props: {

    },
    data() {
        return {
            myLucky: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.myLucky = new LuckyWheel(this.$el, {
                width: '200px',
                height: '200px',
                blocks: [
                    { padding: '13px', background: '#617df2' }
                    // {
                    //     imgs: [{
                    //         src: 'img/wzmrtx.png',
                    //         width: '100%',
                    //         height: '100%'
                    //     }]
                    // }
                ],
                prizes: [
                    { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
                    { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
                    { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
                    { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
                    { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
                    { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
                ],
                buttons: [
                    { radius: '40%', background: '#617df2' },
                    { radius: '35%', background: '#afc8ff' },
                    {
                        radius: '30%', background: '#869cfa',
                        pointer: true,
                        fonts: [{ text: '开始', top: '-10px' }]
                    },
                ],
                start: () => {
                    console.log('start')
                    // 开始游戏
                    this.myLucky.play()
                    // 假设接口的请求速度是1s
                    setTimeout(() => {
                        // 停止游戏
                        this.myLucky.stop(0)
                    }, 1000)
                },
                end: (prize) => { // 游戏停止时触发
                    console.log('恭喜中奖: ' + prize.fonts[0].text)
                }
            })
        }

    }
};
</script>

<style lang="scss">
</style>
