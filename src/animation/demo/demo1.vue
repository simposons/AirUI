<!--  -->
<template>
    <div>
        <animate-section class="animate-section" v-if="flag">
            <div class="title">timing-function</div>
            <div class="ball animate1" :class="status"></div>
            <div class="ball animate2" :class="status"></div>
            <div class="ball animate3" :class="status"></div>
            <div class="ball animate4" :class="status"></div>
            <div class="ball animate5" :class="status"></div>
            <div class="ball animate6" :class="status"></div>
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
            flag:true
        }
    },
    computed: {
        status() {
            return this.button === '开始'?'paused':'running'
        }
    },
    mounted() {
    },
    methods: {
        play() {
            this.button = this.button === '开始' ? '暂停' : '开始'
        },
        shuaxin(){
            this.flag=false
            this.button = '开始' 
            this.$nextTick(()=>{
                this.flag=true
            })
        }
    }
};
</script>
<style lang='scss' scoped>
.animate-section {
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
    margin: 5px;
}


.animate1 {
    animation: toLeft linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'linear';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate2 {
    animation: toLeft ease-in 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'ease-in';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate3 {
    animation: toLeft ease-out 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'ease-out';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate4 {
    animation: toLeft ease-in-out 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'ease-in-out';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}
.animate5 {
    animation: toLeft cubic-bezier(0, 1.1, 0.8, 1) 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'cubic-bezier';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}
.animate6 {
    animation: toLeft steps(10) 5s 1 forwards ;
    position: relative;
    &::before{
        position: absolute;
        content: 'steps';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.paused {
    animation-play-state: paused;
}

.running {
    animation-play-state: running;
}
@keyframes toLeft {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(500px, 0);

    }
}
</style>