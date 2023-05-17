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
1. [proton](http://drawcall.github.io/Proton/)
2. [matterjs](https://brm.io/matter-js/)


