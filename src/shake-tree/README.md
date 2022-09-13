# qrcode 摇一摇

### 介绍

利用devicemotion调用设备的运动权限

### 示例
手机扫码下面二维码可以实机演示（因为扫码路径为http 所以无法演示）
<demo-code compact transform inline>../qrcode/demo/showQrcode.vue</demo-code>
>Devicemotion的注意事项：
>1. 必须在https环境下才能实现监听，本地运行和http环境不能运行；
>2. IOS手机要想实现监听，必须要用户手动授权，也就是说要用户手动点击发起的授权操作。
### 引入

```js
import Vue from 'vue';
import { shakeTree } from 'AirUI';

Vue.use(shakeTree);
```

## 代码演示

### 基础用法

```html
<shake-tree></shake-tree>
```

## API

### Props

暂无

### Events

暂无

### Slots

暂无

### 附录

#### DeviceMotionEvent

##### DeviceMotionEvent.acceleration
>提供了设备在 X,Y,Z 轴方向上加速度的对象。加速度的单位为 m/s2。

##### DeviceMotionEvent.accelerationIncludingGravity
>提供了设备在 X,Y,Z 轴方向上带重力的加速度的对象。加速度的单位为 m/s2

##### DeviceMotionEvent.rotationRate
>提供了设备在 alpha，beta， gamma 轴方向上旋转的速率的对象。旋转速率的单位为度每秒。

##### DeviceMotionEvent.interval
>表示从设备获取数据的间隔时间，单位是毫秒。
