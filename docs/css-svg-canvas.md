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
<demo-code transform>../src/css-animation/demo/demo1.vue</demo-code>

>应用
逐帧动画
<demo-code transform>../src/frame-by-frame/demo/index.vue</demo-code>
[贝塞尔曲线](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function#using_the_cubic-bezier_function)

<demo-code transform>../src/css-animation/demo/demo2.vue</demo-code>
<demo-code transform>../src/css-animation/demo/demo3.vue</demo-code>
<demo-code transform>../src/css-animation/demo/demo4.vue</demo-code>

#### transform

```css
transform: matrix translate scale rotate skew
```

<demo-code transform>../src/css-animation/demo/demo5.vue</demo-code>

#### transition 
<demo-code transform>../src/css-animation/demo/demo6.vue</demo-code>


### 扩展
1. [前端动画库](http://guowc.github.io/animastore/)
2. [animate.css](https://animate.style/)
3. [字体动画](http://192.168.255.10:8080/#/font-animate)
## svg动画
### SVG
`SVG`又称`可缩放矢量图形`
><a href="http://192.168.255.10:8080/#/svg-png-jpg">SVG和PNG/JPG的不同</a>

<demo-code transform>../src/css-animation/demo/demo7.vue</demo-code>

### 扩展 
1. [北大官网](https://www.pku.edu.cn/campus.html)
2. [vivus](https://maxwellito.github.io/vivus/)
## canvas
## 拓展


