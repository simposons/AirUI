<!--  -->
<template>
    <div>
        <animate-section class="animate-section" v-if="flag">
            <div class="title">transform</div>
            <div class="ball animate1" :class="status"></div>
            <div class="ball animate2" :class="status"></div>
            <div class="ball animate3" :class="status"></div>
            <div class="ball animate4" :class="status"></div>
            <div class="ball animate5" :class="status"></div>
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
    margin: 50px auto;
}


.animate1 {
    animation: matrix linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'matrix';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate2 {
    animation: translate linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'translate';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate3 {
    animation: scale linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'scale';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate4 {
    animation: rotate linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'rotate';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}
.animate5 {
    animation: skew linear 5s 1 forwards;
    position: relative;
    &::before{
        position: absolute;
        content: 'skew';
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
@keyframes matrix {
    0% {
    }

    100% {
        transform:matrix(1, 2, -1, 1, 80, 80);

    }
}
@keyframes translate {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(100px, 0);

    }
}
@keyframes scale {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(2);

    }
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);

    }
}
@keyframes skew {
    0% {
        transform: skew(0,0);;
    }

    100% {
        transform: skew(30deg, 20deg);;

    }
}
</style>