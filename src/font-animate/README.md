# font-animate

### 介绍

qrcode是基于`qrcode`依赖进行二次封装的组件

### 示例
手机扫码下面二维码可以实机演示
<demo-code compact transform inline>../qrcode/demo/showQrcode.vue</demo-code>

### 引入

```js
import Vue from 'vue';
import { qrcode } from 'AirUI';

Vue.use(qrcode);
```

## 代码演示

### 基础用法

```html
<qrcode class="qrcode" text="https://www.baidu.com"></qrcode>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    | 是否必传   |
| ------------- | -------- | -------- | --------- |--------- |
| text          | 二维码隐含url或text | _string_ | -         |_是_|
| version  | 二维码version | _string_ | `2`        |_否_|
>注：宽高可使用样式调整

version 

官网解释：

Capacity depends on symbol version and error correction level. Also encoding modes may influence the amount of storable data.
The QR Code versions range from version 1 to version 40.
Each version has a different number of modules (black and white dots), which define the symbol's size. For version 1 they are 21x21, for version 2 25x25 e so on. Higher is the version, more are the storable data, and of course bigger will be the QR Code symbol.

翻译：

容量取决于符号版本和纠错级别。此外，编码模式可能会影响可存储数据的数量。
QR码的版本范围从版本1到版本40。
每个版本都有不同数量的模块（黑点和白点），用于定义符号的大小。版本1是21x21，版本2是25x25，以此类推。版本越高，可存储的数据越多，当然QR码符号越大。

### Events

暂无

### Slots

暂无

### 附录

[qrcode git地址](https://github.com/soldair/node-qrcode)
>`qrcode`引入命令: `npm install --save qrcode`
