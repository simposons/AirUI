# 关于前端动画的多种实现方式


### 参考文档 
1. [MDN](https://developer.mozilla.org/zh-CN/docs/Web)
2. 

## css3动画
### css
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)
#### animation
```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```
<demo-code transform>../src/animation/demo/demo1.vue</demo-code>

>应用
逐帧动画
<demo-code transform>../src/frame-by-frame/demo/index.vue</demo-code>
[贝塞尔曲线](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function#using_the_cubic-bezier_function)

<demo-code transform>../src/animation/demo/demo2.vue</demo-code>
<demo-code transform>../src/animation/demo/demo3.vue</demo-code>
<demo-code transform>../src/animation/demo/demo4.vue</demo-code>

#### transform

```css
transform: matrix translate scale rotate skew
```

<demo-code transform>../src/animation/demo/demo5.vue</demo-code>

#### transition 
<demo-code transform>../src/animation/demo/demo6.vue</demo-code>


### 扩展
1. [前端动画库](http://guowc.github.io/animastore/)
2. [animate.css](https://animate.style/)
3. [字体动画](/#/font-animate)
## svg动画
### SVG
`SVG`又称`可缩放矢量图形`
><a href="/#/svg-png-jpg">SVG和PNG/JPG的不同</a>

<demo-code transform>../src/animation/demo/demo7.vue</demo-code>
<demo-code transform>../src/animation/demo/demo8.vue</demo-code>

<a href="/#/red-packet-svg">SVG动画</a>

### 扩展 
1. [北大官网](https://www.pku.edu.cn/campus.html)
2. [vivus](https://maxwellito.github.io/vivus/)
3. [MDN svg](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
## canvas
### canvas
`Canvas API` 提供了一个通过`JavaScript` 和 `HTML`的`<canvas>`元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

`canvas`实现动画原理就是不间断的进行绘制、擦除

#### 示例
1. <a href="/#/gashapon-machine-request">扭蛋机1</a>
2. <a href="/#/gashapon-machine-setinterval">扭蛋机2</a>
3. <a href="/#/gashapon-machine-matter">扭蛋机3</a>

## 拓展
### 动画引擎
1. [threejs](https://threejs.org/)
2. [p5.js](https://github.com/processing/p5.js#readme)
3. [proton](http://drawcall.github.io/Proton/)
4. [matterjs](https://brm.io/matter-js/)
5. [cocos2D](https://www.cocos.com/)
### 示例
1. [行业配对](https://activities.jiniutech.com/pair-trade)
2. [知识竞赛](https://activities.jiniutech.com/knowledge)
3. [超能星球大战](https://m.jiniutech.com/hd/ball2/index.html)(cocos2d)
4. [线角斗场](https://m.jiniutech.com/hd/k-game-v2/index.html?id=iarmWMvm)
5. [猜涨跌](https://m.jiniutech.com/hd/guess-market/?id=wuShsDLn)
6. [欢乐K线](https://m.jiniutech.com/hd/hlkx/index.html)
## 优劣比较
### 对比
| 动画          | 优点     | 缺点     |
| ------------- | --------------------- | ------ |
| css          | 1.开发简单、快速  |1.多设备兼容有较小的可能会存在问题|
|           | 2.能实现绝大部分简单动画  |2.在动画控制上不够灵活，运行过程较弱，无法附加绑定回调函数，不能在特定的位置上添加回调函数或是绑定回放事件|
|           | 3.可以利用硬件加速（ _gpu_ 加速）  |3. 当存在大量动画（或者说大量 _DOM_ 节点）会影响性能|
|           | 4.不占用主线程，性能好  ||
|           | 5.适合响应式设计  ||
| svg       | 1. 实现复杂的动画效果，包括路径动画、形状变换、颜色渐变| 1.处理大量元素或复杂动画时，性能可能会受到影响|
|           | 2. 可以控制动画的速度、方向、循环次数| 2.旧版本浏览器可能不支持svg  |
|           | 3. 可以通过js控制| |
| canvas  | 1.可以实现非常复杂的动画，包括粒子效果、3D效果、视频播放 | 1.开发较为复杂 |
|   | 2.几乎不存在兼容性问题 | 2.canvas画布大小固定，不太适合做响应式设计 |
|   | 3.不存在大量 _DOM_ 节点出现从而影响性能的问题 | 3.实现复杂动画，必须借用 _three.js_ 等引擎才能做到，学习成本高 |
