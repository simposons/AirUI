<!--  -->
<template>
    <div class="svg">
        <animate-section class="animate-section" v-if="flag">
            <div class="title">svg动画</div>
            <svg version="1.1" id="svg5" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 70 60"
                xml:space="preserve">
                <path class="path1"
                    d="M27.2,28H15.8c-2.8,0-5-2.2-5-5V11.8c0-1.4,0-6.4,0-6.4s3.6,1.4,5,1.4h11.4c2.8,0,5,2.2,5,5V23c0,1.2,0,5,0,5S28.7,28,27.2,28z"
                    style="stroke-dasharray: 83, 85; stroke-dashoffset: 85;" :class="status"></path>
                <path class="path1"
                    d="M59.2,5.4c0,0-3.6,1.4-5,1.4H42.8c-2.8,0-5,2.2-5,5V23c0,1.2,0,5,0,5s3.5,0,5,0h11.4c2.8,0,5-2.2,5-5V11.8"
                    style="stroke-dasharray: 77, 79; stroke-dashoffset: 79;" :class="status"></path>
                <path class="path1"
                    d="M10.8,55.6c0,0,3.6-1.4,5-1.4h11.4c2.8,0,5-2.2,5-5V38c0-1.2,0-5,0-5s-3.5,0-5,0H15.8c-2.8,0-5,2.2-5,5v11.2"
                    style="stroke-dasharray: 77, 79; stroke-dashoffset: 79;" :class="status"></path>
                <path class="path1"
                    d="M42.8,33h11.4c2.8,0,5,2.2,5,5v11.2c0,1.4,0,6.4,0,6.4s-3.6-1.4-5-1.4H42.8c-2.8,0-5-2.2-5-5V38c0-1.2,0-5,0-5S41.2,33,42.8,33z"
                    style="stroke-dasharray: 83, 85; stroke-dashoffset: 85;" :class="status"></path>
            </svg>
        </animate-section>
        <div class="button">
            <button @click="play">{{ button }}</button>
            <button @click="shuaxin">刷新</button>
        </div>

    </div>
</template>
<script>
export default {
    name: 'animation',
    data() {
        return {
            button: '开始',
            flag: true
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

.title {
    color: #666;
    margin: 10px 0;
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

#svg5 {
    background-color: gray;
    width: 45px;
    margin: auto;
    margin-top: 50px;
}

.path1 {
    fill: none;
    stroke: #fff;
    stroke-width: 3;
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