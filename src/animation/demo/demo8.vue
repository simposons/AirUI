<!--  -->
<template>
    <div class="svg">
        <animate-section class="animate-section" v-if="flag">
            <div class="title">svg-line-600</div>
            <div class="bg">
                <svg class="svg_image" width="600" height="2" xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg">
                    <g>
                        <line class="path1" :class="status" y2="2" x2="600" y1="2" x1="0" stroke-width="4"
                            stroke="#000000" fill="none" :stroke-dasharray="strokeDasharray"
                            :stroke-dashoffset="strokeDashoffset" />
                    </g>
                </svg>
            </div>
        </animate-section>
        <div>
            <h4>stroke-dasharray</h4>
            <van-slider v-model="strokeDasharray" max="700">
                <template #button>
                    <div class="custom-button">{{ strokeDasharray }}</div>
                </template>
            </van-slider>
            <h4>stroke-dashoffset</h4>
            <van-slider v-model="strokeDashoffset" max="700">
                <template #button>
                    <div class="custom-button">{{ strokeDashoffset }}</div>
                </template></van-slider>
        </div>
        <div class="button">
            <button @click="play">{{ button }}</button>
            <button @click="shuaxin">刷新</button>
        </div>

    </div>
</template>
<script>
import { Slider } from 'vant'

export default {
    name: 'animation',
    components: {
        [Slider.name]: Slider
    },
    data() {
        return {
            button: '开始',
            flag: true,
            strokeDasharray: 0,
            strokeDashoffset: 0
        }
    },
    computed: {
        status() {
            return this.button === '开始' ? 'paused' : 'running'
        }
    },
    mounted() {
    },
    methods: {
        play() {
            this.button = this.button === '开始' ? '暂停' : '开始'
        },
        shuaxin() {
            this.flag = false
            this.strokeDasharray = 0
            this.strokeDashoffset = 0
            this.button = '开始'
            this.$nextTick(() => {
                this.flag = true
            })
        }
    }
};
</script>
<style lang='scss' scoped>
.animate-section {
    display: block;
    width: 100%;
    margin: auto;
}

.svg_image {
    background: #fff;
}

.bg {
    padding: 10px;
    background: greenyellow;
}

.title {
    color: #666;
    margin: 10px 0;
}
.custom-button {
    width: 26px;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #fff;
    border-radius: 100px;
    border: 1px solid #999;
  }
.button {
    margin: 10px auto;
    display: flex;
    justify-content: center;
}

.ball {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: greenyellow;
}

.path1 {
    fill: none;
    // stroke-dasharray: 85;
    // //表示虚线描边  该属性把线段变成虚线    数值越大  虚线里每个线段的长度越长  */
    // stroke-dashoffset: 85;
    //虚线的偏移量  
    animation: dash 3s linear forwards;
}

.paused {
    animation-play-state: paused;
}

.running {
    animation-play-state: running;
}

@keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
}</style>