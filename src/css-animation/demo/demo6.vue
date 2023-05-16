<!--  -->
<template>
    <div>
        <animate-section class="animate-section" v-if="flag">
            <div class="title">transition</div>
            <div class="ball" :class="status"></div>
        </animate-section>
        <div class="button">
            <button @click="play">transition</button>
            <button @click="shuaxin">刷新</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'animation',
    data() {
        return {
            flag:true,
            status:''
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
        play() {
            this.status='transition'
        },
        shuaxin(){
            this.flag=false
            this.status = '' 
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
    margin-left: 0;
}


.transition {
    transition: margin-left 2s;
    margin-left:100px
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
</style>