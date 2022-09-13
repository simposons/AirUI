# scrape-off  刮刮乐

### 介绍
利用`canvas`实现的刮刮乐游戏demo

### 示例
手机扫码下面二维码可以实机演示
<demo-code compact transform inline>../qrcode/demo/showQrcode.vue</demo-code>

### 引入

```js
import Vue from 'vue';
import { scrapeOff } from 'AirUI';

Vue.use(scrapeOff);
```

## 代码演示

### 基础用法

```html
<scrape-off content="恭喜您中奖了"/>
```

## API


### Props


| 参数          | 说明     | 类型     | 默认值    | 是否必传   |
| ------------- | -------- | -------- | --------- |--------- |
| width          | 宽 | _number_ | 屏幕宽度       |_否_|
| height  | 高 | _number_ | 150       |_否_|
| contentType  | 刮刮乐图层下的内容类型 | _string_ | 'text'      |_否_|
| content  | 刮刮乐图层下的内容，可传文字和图片地址等 | _string_ | ''      |_是_|

### Events

暂无

### Slots

暂无

### 附录

暂无
