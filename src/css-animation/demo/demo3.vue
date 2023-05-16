<!--  -->
<template>
    <div>
        <animate-section class="animate-section" v-if="flag">
            <div class="title">iteration-count</div>
            <div class="ball animate1" :class="status"></div>
            <div class="ball animate2" :class="status"></div>
            <div class="ball animate3" :class="status"></div>
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
}


.animate1 {
    animation: toLeft linear 5s 1;
    position: relative;
    &::before{
        position: absolute;
        content: '1';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}

.animate2 {
    animation: toLeft linear 5s 2;
    position: relative;
    &::before{
        position: absolute;
        content: '2';
        top: 2px;
        left: 50px;
        width: 100px;
    }
}
.animate3 {
    animation: toLeft linear 5s  infinite;
    position: relative;
    &::before{
        position: absolute;
        content: 'infinite';
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