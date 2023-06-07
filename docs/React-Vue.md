### 参考文档
1. [react中constructor( )和super( )的具体含义以及如何使用](https://www.cnblogs.com/williamjie/p/9475022.html) 
2. [React还是Vue：你该如何选择？](https://zhuanlan.zhihu.com/p/137046152)
3. [vue与react的个人体会](https://juejin.cn/post/7012797091135094814)
4. [Vue.js与React的全面对比](https://blog.csdn.net/CystalVon/article/details/78428036)
5. [浅谈vue与react的数据流与数据绑定](https://www.jianshu.com/p/0e1f1b3afa10)
6. [聊聊我对现代前端框架的认知](https://juejin.cn/post/6844903674116833287)
7. [React与Vue模板使用比较(一、vue模板与React JSX比较)](http://React与Vue模板使用比较(一、vue模板与React JSX比较))
8. [【React深入】深入分析虚拟DOM的渲染原理和特性](https://juejin.cn/post/6844903824683958286#heading-9)

### js框架出现的根本原因

保持UI与状态同步
命令式：jQuery  状态+操作dom
声明式：vue等   状态 
操作dom 可以交由VirtualDOM实现，但并不一定必须是VirtualDOM
vue1 细粒度  Angular 脏检测  react  VirtualDOM
vue2  中等粒度+VirtualDOM
react vue 共同点	
 利用虚拟DOM实现快速渲染
 轻量级
 响应式和组件化
 服务器端渲染
 易于集成路由工具，打包工具以及状态管理工具
 优秀的支持和社区
全家桶reactvue路由管理react-router、react-router-domvue-router状态管理redux、mobxvuex初始化配置Create React APPvue-cli、vite服务器端渲染next.jsnuxtapp原生开发react-native、tarouni-app、weexpc组件库antdelementUI、iviewapp组件库antd-mobilemint-ui、vux、Vonic、cube-ui
注：为什么需要Virtual DOM
首先,我们都知道在前端性能优化的一个秘诀就是尽可能少地操作DOM,不仅仅是DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重回,这些都是性能的杀手,因此我们需要这一层抽象,在patch过程中尽可能地一次性将差异更新到DOM中,这样保证了DOM不会出现性能很差的情况.
其次,现代前端框架的一个基本要求就是无须手动操作DOM,一方面是因为手动操作DOM无法保证程序性能,多人协作的项目中如果review不严格,可能会有开发者写出性能较低的代码,另一方面更重要的是省略手动DOM操作可以大大提高开发效率.
最后,也是Virtual DOM最初的目的,就是更好的跨平台,比如Node.js就没有DOM,如果想实现SSR(服务端渲染),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象.

### react vue 不同点
Vue的优势：
- 模板和渲染函数的弹性选择
- 简单的语法及项目创建
- 更快的渲染速度和更小的体积
 React的优势：
- 更适用于大型应用和更好的可测试性
- 同时适用于Web端和原生App
- 更大的生态圈带来的更多支持和工具


reactvue1all in js模板引擎2数据不可变（immutable）数据可变（mutated）3手动性能优化自动性能优化4生命周期生命周期5单向数据流 双向数据绑定(自定义)单向数据流 双向数据绑定v-moudle6指令 v-for  等无指令 map()原生7事件处理跟js事件名称一致8原生渲染native(Weex)原生渲染native(react native)9ssr服务端渲染（Next.js）ssr服务端渲染（Nuxt.js）10函数式编程 react hooks函数式编程 vue3 组合式api
1.技术思想 架构
react整体上是函数式的思想，组件使用jsx语法，all in js，将html与css全都融入javaScript，jsx语法相对来说更加灵活。
React  jsx

JSX只是为 React.createElement(component, props, ...children)方法提供的语法糖。也就是说所有的JSX代码最后都会转换成React.createElement(...)，Babel帮助我们完成了这个转换的过程。
```js
class App extends React.Component { 
 constructor(props) { 
 super(props); 
 this.state = { 
 message: 'Hello React.js!' 
 }; 
 } 
componentWillMount () {}
componentDidMount () {}
 reverseMessage() { 
 this.setState({  
 message: this.state.message.split('').reverse().join('')  
 }); 
 } 
 render() { 
 return ( 
 <div> 
 <p>{this.state.message}</p> 
 <button onClick={() => this.reverseMessage()}> 
 //<button onClick={this.reverseMessage}> 
 //<button onClick={this.reverseMessage.bind(this))}> 
 //<div onClick={this.reverseMessage()}>  错误写法
 Reverse Message 
 </button> 
 </div> 
 )} 
} 
export default App
```

>注：箭头函数问题
vue的整体思想仍然是拥抱经典的html(结构)+css(表现)+js(行为)的形式，vue鼓励开发者使用template模板，并提供指令供开发者使用如v-if、v-show、v-for等指令，因此在开发vue应用的时候会有一种在写经典web应用（结构、表现、行为分离）的感觉。
数据绑定表达式采用的是和Angular相似的mustache语法
模板的作用是描述状态与DOM之间的映射关系，通过模板可以编译出一个渲染函数，执行这个渲染函数可以得到VirtualDOM中所提供的VNode
```html
<div id="app"> 
 <p>{{ message }}</p> 
 <button @click="reverseMessage">Reverse Message</button> 
</div> 
<script>
export default {
 el: '#app', 
 data: { 
     return(
     message: 'Hello Vue.js!'     
     )
 }, 
 methods: { 
 reverseMessage() { 
 this.message = this.message.split('').reverse().join(''); 
 }
 } 
}
</script>
<style></style>
```
1. 数据可变性
Vue中的数据是可变（mutated）的，操作简洁
this.message = this.message.split('').reverse().join(''); 
优点
vue2的响应式是Object.defineProperty实现的，并且重写getter setter等一系列操作实现观察者模式，一旦数据发生变化，不会像react一样去比较整颗组件树，而是去更新数据状态变化了的组件实例。
缺点
它不能检测属性的添加和删除和某些数组更改。这时候就要用到Vue API中的类似于React的set方法来解决。

React中的state是不可变（immutable）的，不能直接改变，使用API：setState进行state修改
this.setState({  
 message: this.state.message.split('').reverse().join('')  
 }); 
React中是通过比较当前state和前一个state来决定何时在DOM中进行重渲染以及渲染的内容，因此需要不可变（immutable）的state。
缺点
在react中如果某个组件的状态发生改变，react会把此组件以及此组件的所有后代组件重新渲染，不过重新渲染并不代表会全部丢弃上一次的渲染结果，react还是会通过diff去比较两次的虚拟dom最后patch到真实的dom上。虽然如此，如果组件树过大，diff其实还是会有一部分的开销。react内部通过 fiber优化 diff算法，外部建议开发者使用 shouldComponentUpdate pureComponent 来规避问题。
3.性能优化
react的性能优化需要手动去做，而vue的性能优化是自动的
vue 
vue中的每个组件内部自动实现了shouldComponentUpdate的优化，在vue里面由于依赖追踪系统的存在，当任意数据变动的时，Vue的每一个组件都精确地知道自己是否需要重绘，所以并不需要手动优化，但是vue的响应式机制也有问题，就是当状态特别多的时候，Watcher也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用react，更加可控。
react
当props或state发生改变的时候会触发
shouldComponentUpdate生命周期函数，它是用来控制组件是否被重新渲染的，如果它返回true，则执行render函数，更新组件；如果它返回false，则不会触发重新渲染的过程。
有的时候我们希望它在更新之前，和之前的状态进行一个对比，这个时候我们就需要重写
shouldComponentUpdate来避免不必要的dom操作，对比当前的props或state和更新之后的nextProps或nextState，返回true时 ，组件更新；返回false，则不会更新，节省性能。
shouldComponentUpdate(nextProps, nextState) {
    if (this.props.a !== nextProps.a) {
        return true;
    }
    if (this.state.b !== nextState.b) {
        return true;
    }
    return false;
}
4. 生命周期
react
触发阶段react核心生命周期挂载阶段constructor、componentWillMount、render、componentDidMount、更新过程componentWillReceiveProps、shouldComponentUpdate、render、componentDidUpdate卸载阶段componentWillUnMount


vue
vue生命周期beforeCreatecreatedbeforeMountmountedbeforeUpdateupdatedbeforeUnmount(vue2 beforeDestory)unmounted(vue2 destoryed)errorCapturedrenderTracked（vue3状态跟踪）renderTriggered（vue3状态触发）activateddeactivated


5.数据流与数据绑定
数据流
所谓数据流，就是指的是组件之间的数据流动。
数据绑定
所谓数据绑定，就是Model层与View层的映射关系。

单向数据绑定：Model的更新会触发View的更新，而View的更新不会触发Model的更新，它们的作用是单向的。
单向数据绑定的优缺点：
优点：所有状态变化都可以被记录、跟踪，状态变化通过手动调用触发，源头易追溯。
缺点：会有很多类似的样板代码，代码量会相应的上升。

双向数据绑定：Model的更新会触发View的更新，View的更新也会触发Model的更新，它们的作用是相互的。
双向数据绑定的优缺点：
优点：在操作表单时使用v-model方便简单，可以省略繁琐或重复的onChange事件去处理每个表单数据的变化（减少代码量）。
缺点：属于暗箱操作，无法很好的追踪双向绑定的数据的变化。

总结：vue与react都是属于单项数据流的，并且都可以实现单项数据绑定与双向数据绑定
react 
import React from "react"
import ReactDOM from "react-dom"

export default class DataBind extends Comonent{
    constructor(){
        super()
        this.state = {
            value: "wzy"
        }
    }
    handleChange(e){
        this.setState({
            value : e.target.value
        )
    }
    render(){
        return(
            <div>
                <input value={this.state.value} onChange={this.handleChange.bind(this)}><input/>
                <p>{this.state.value}<p/>
            <div/>
        )
    }
}
vue
双向绑定v-model只不过是v-bind:value 和 v-on:input的语法糖
<input  v-model="userName" />
<input v-bind:value="userName" v-on:input="userName = $event.target.value" />

6.指令
指令 (Directives) 是带有
v- 前缀的特殊特性，指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

<div v-show="data.length" v-for="(item, index) in data":key="index">{{item}}</div>
react
因为react中没有v-for指令，所以循环渲染的时候需要用到map()方法来渲染视图，并且将符合条件的元素放入一个新数组返回。
...
render() {
    return(
        <>
       {this.state.data.length? this.state.data.map(item => (
                            <div>{item}</div>
        )) : null}
        </>
    )
babel插件
...
render(){
    const visible = true
    return(
        <div>
            {
                visible ? <div>content<div>: ''
            }
        </div>
    )
}
...
render(){
    const visible = true
    return(
        <div>
            <div r-if = {visible}>content</div>
        </div>
    )
}
...
render(){
    const list = [1, 2, 3, 4, 5]
    return(
        <div>
            {
                list.map((item,index)=>(
                	<div key={index}>{item}</div>
                ))
            }
        </div>
    )
}
...
render(){
    const list = [1, 2, 3, 4, 5]
    return(
        <div>
            <div r-for = {item in list}>{item}</div>
        </div>
    )
}

vue
vue中提供很多内部指令供我们使用，它可以让我们进行一些模板的操作，例如有时候，我们的data中的存放的数据不是个简单的数字或者字符串，而是数组Array类型，这个时候，我们要把数组的元素展示在视图上，就需要用到vue提供的 v-for 指令，来实现列表的渲染。
7.事件处理（actions/events）
react
跟js事件名称一致
vue

8.原生渲染native
react
react native是Facebook在2015年3月在F8开发者大会上开源的跨平台UI框架，需针对iOS、Android不同编写2份代码，使用react native需要按照文档安装配置很多依赖的工具，相对比较麻烦。
vue
weex允许你使用 vue 语法开发不仅仅可以运行在浏览器端，还能被用于开发 iOS 和 Android 上的原生应用的组件。即只需要编写一份代码，即可运行在Web、iOS、Android上。
9.ssr服务端渲染
优点 
首屏加载速度快
seo更好
服务端渲染核心在于方便seo优化，后端先调用数据库，获得数据之后，将数据和页面元素进行拼装，组合成完整的html页面，再直接返回给浏览器，以便用户浏览。
nuxt.js
基于 Vue.js
自动代码分层
服务端渲染
强大的路由功能，支持异步数据
静态文件服务
ES2015+ 语法支持
打包和压缩 JS 和 CSS
HTML 头部标签管理
本地开发支持热加载
集成 ESLint
支持各种样式预处理器： SASS、LESS、 Stylus 等等
支持 HTTP/2 推送
next.js
服务器渲染，获取数据非常简单
无需学习新框架，支持静态导出。
支持CSS-in-JS库
自动代码拆分，加快页面加载速度，不加载不必要的代码
基于Webpack的开发环境，支持模块热更新（HMR）
支持Babel和Webpack自定义配置服务器、路由和next插件。
能够部署在任何能运行node的平台
内置页面搜索引擎优化（SEO）处理
在生产环境下，打包文件体积更小，运行速度更快
10.函数式编程
文章https://juejin.cn/post/7066951709678895141(浅谈：为啥vue和react都选择了Hooks🏂？)
原先繁琐的 compomentDidUpdate生命周期 => useEffect，虽然不完全相同，但在大多数场景中，从开发者层面看待，我们更多是关心props或者state中的数据变化之后，会产生了什么后果（副作用），省去了开发者自己比较前后值的过程。
react
import { useState, useEffect } from 'React'

export default () => {
  // 通过 useState 可以创建一个 状态属性 和一个赋值方法
  const [ name, setName ] = useState('')

  // 通过 useEffect 可以对副作用进行处理   等同于watch
  useEffect(() => {
    console.log(name)
  }, [ name ])

  // 通过 useMemo 能生成一个依赖 name 的变量 message
  const message = useMemo(() => {
    return `hello, my name is ${name}`
  }, [name])

  return <div>{ message }</div>
}

vue3 组合式api

<template>
  <div>
    {{ message }}
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
// 定义了一个 ref 对象
const name = ref('')
// 定义了一个依赖 name.value 的计算属性
const message = computed(() => {
  return `hello, my name is ${name.value}`
})
</script>

代码示例 
react 组件
import React, { Component } from 'react'
import Star from '../img/star.png'
import UnStar from '../img/unstar.png'

class star extends Component {
     static defaultProps = {
        starNum:0, 
     }
     static propTypes = {
       starNum:PropTypes.number.isRequired
     }
  constructor(props) {
    super(props)
    this.state = {
      starNum: this.props.starNum,
      starArray: [
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' },
        { type: '0' }
      ],
    }
  }
  async componentWillMount () {
    this.changeStar(this.state.starNum)
  }
    //   修改strar数量
    changeStar=  num => {
      let { starArray } = this.state
      if (num > 0) {
        for (let i = 0; i < num; i += 1) {
          starArray[i].type = '1'
        }
        this.setState({
          starArray
        })
      }
    }
    render() {
      return (
        <div className='xdsPage'>
          <div className='dskpjg_star_line'>
            {this.state.starArray.map((item, i) => {
              return (
                <>
                  <img src={item.type === '1' ? Star : UnStar} alt='星星' />
                </>
              )
            })}
          </div>
          <div className='dskpjg_star_num'>
            <span>{this.state.starNum}</span>
            <span>星</span>
          </div>
        </div>
      )
    }
}
export default star

//调用
<Star starNum={this.state.starNum}/>


vue 组件
<template>
<div class='xdsPage'>
          <div class='dskpjg_star_line'>
              <img 
              v-for="(item,i) in starArray"
              :key="i"
              :src="item.type === '1' ? '../img/star.png': '../img/unstar.png'" 
              alt='星星' 
              />
          </div>
          <div class='dskpjg_star_num'>
            <span>{{starNum}}</span>
            <span>星</span>
          </div>
</div>
</template>
<script>
export default {
    name: 'star',
    props: {
        starNum: {
            required: true,
            default: 0,
            type:Number,
        }, 
    },
    data() {
        return {
        }
    },
    mounted() {
    },

    computed: {
        starArray(){
            let arr=[]
            for(let i=0; i<10;i++){
                let obj={
                    type: i+1<this.starNum?'1':'0'
                }
               arr.push(obj) 
            }
            return arr
        }
    },
}
</script>
<style lang="scss" scoped>
</style>

//调用
<Star :starNum="starNum"/>

vue3 组合式api
<template>
<div class='xdsPage'>
          <div class='dskpjg_star_line'>
              <img 
              v-for="(item,i) in starArray"
              :key="i"
              :src="item.type === '1' ? '../img/star.png': '../img/unstar.png'" 
              alt='星星' 
              />
          </div>
          <div class='dskpjg_star_num'>
            <span>{{starNum}}</span>
            <span>星</span>
          </div>
</div>
</template>
<script>
import { computed, ref } from 'vue'
  props: {
    starNum: Number
  },
   setup(props) {
        // 定义了一个 ref 对象
        // 定义了一个依赖 name.value 的计算属性
        const starArray= computed(() => {
            let arr=[]
                    for(let i=0; i<10;i++){
                        let obj={
                            type: i+1<props.starNum?'1':'0'
                        }
                       arr.push(obj) 
                    }
          return arr
        })
       return {
          starArray 
       }
    }
</script>
