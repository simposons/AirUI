<template>
  <div class="doll_grabbing">
    <div class="grab">
      <div class="grab_rod_horizontal"></div>
      <div class="grab_rod_vertical" :class="toGrab&&'grab_rod_vertical_move'"></div>
      <div class="grab_cricle">
        <span class="grab_cricle_before"></span>
        <span class="grab_cricle_after"></span>
        <span></span>
      </div>
    </div>
    <div class="gifts">
      <div class="gifts_warp">
        <ul class="gifts_list">
          <li class="gifts_item" v-for="(item,index) in giftsList" :key="index">
          <div>
            {{item.name}}
          </div>
        </li>
        <li class="gifts_item" v-for="(item,index) in giftsList" :key="index">
          <div>
            {{item.name}}
          </div>
        </li>
        </ul>
        
      </div>
      <div class="gifts_bottom"></div>
    </div>
    <div class="button_content">
      <button @click="grabClick">抽奖</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'doll-grabbing-machine-css',

  props: {
  },
  data() {
    return {
      giftsList:[
        {
          src:'',
          name:'11',
        },
        {
          src:'',
          name:'22',
        },
        {
          src:'',
          name:'33',
        },
        {
          src:'',
          name:'44',
        },
        {
          src:'',
          name:'55',
        },
        {
          src:'',
          name:'66',
        },
        {
          src:'',
          name:'77',
        },
        {
          src:'',
          name:'88',
        },
      ],
      toGrab:false,
      time:null,
    }
  },
  mounted(){

  },
  methods:{
    grabClick(){
      clearTimeout(this.time)
      this.toGrab=true
      this.time=setTimeout(() => {
        this.$nextTick(()=>{
        this.toGrab=false
      })
      }, 2000);
      
    }
  }
};
</script>

<style lang="scss" scoped>
$item-space: 80px;
$item-width: 50px;
$item-num: 8;
$start-position: 0;
$end-position: 0 - $item-num*$item-width - $item-num*$item-space;
$run-time:10s;
*{
  box-sizing: border-box;
}
.doll_grabbing{
  margin: 10px;
  border: 1px solid #999;
  overflow: hidden;
}
.grab{
  height: 250px;
  &_rod{
    &_horizontal{
      margin:auto;
      width: 100%;
      height: 10px;
      border: 1px solid #999;
    }
    &_vertical{
      margin:auto;
      width: 10px;
      height: 80px;
      border: 1px solid #999;
    }
    &_vertical_move{
      animation: rod_move 2s ease-in-out forwards;
    }
  }
  &_cricle{
    margin:auto;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #999;
    position: relative;
    &_before{
      position: absolute;
      top: 50%;
      left: 0;
      width: 10px;
      height: 30px;
      border: 1px solid #999;
      transform: translateX(-50%) rotate(45deg);
    }
    &_after{
      position: absolute;
      top: 50%;
      left: 100%;
      width: 10px;
      height: 30px;
      border: 1px solid #999;
      transform: translateX(-50%) rotate(-45deg);
    }
  }
}
.gifts{
  // &_warp{
  // }
  &_list{
    list-style-type: none;
    white-space: nowrap;
    animation: $run-time gifts_move infinite linear;
  }
  &_item{
    width: $item-width;
    height: $item-width;
    display: inline-block;
    overflow: hidden;
    margin-right: $item-space;
    border: 1px solid #999;
  }
  &_bottom{
    margin:auto;
    width: 100%;
    height: 10px;
    border: 1px solid #999;
  }
}
@keyframes rod_move {
  0% {
    height: 80px;
  }
  50% {
    height: 200px;
  }
  100% {
    height: 80px;
  }

}
@keyframes gifts_move {
  0% {
    transform: translateX($start-position);
  }
  100% {
    transform: translateX($end-position);
  }
}
</style>
