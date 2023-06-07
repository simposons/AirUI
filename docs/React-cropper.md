# React-Cropper实现图片裁剪

## 在使用时遇到的问题

### this.cropper.getCroppedCanvas is not a _function_

根据[官网](https://www.npmjs.com/package/react-cropper)信息

1.  \~\~Support for `ref` has been removed.\~\~Use the `onInitialized` method to get the `cropper` instance. Added back ref support in 2.1.0.

可知下面这种写法不在支持，会导致this.refs.cropper.getCroppedCanvas().toDataURL()中会出现this.cropper.getCroppedCanvas is not a _function_

```javascript
<Cropper
              src={this.state.cropSrc} 
              // 图片路径，即是base64的值，在Upload上传的时候获取到的
              style={{ height: 400 }}
              preview='.cropper-preview'
              className='company-logo-cropper'
              viewMode={1} // 定义cropper的视图模式
              zoomable// 是否允许放大图像
              aspectRatio={1} // image的纵横比
              guides // 显示在裁剪框上方的虚线
              background // 是否显示背景的马赛克
              rotatable={false}
              ref='cropper'//在官方更新之后ref不在支持
            /> 
```

应按照官网描述写为

```javascript
 <Cropper
          src={this.state.cropSrc} 
          // 图片路径，即是base64的值，在Upload上传的时候获取到的
          style={{ height: 400 }}
          preview='.cropper-preview'
          className='company-logo-cropper'
          viewMode={1} // 定义cropper的视图模式
          zoomable// 是否允许放大图像
          aspectRatio={1} // image的纵横比
          guides // 显示在裁剪框上方的虚线
          background // 是否显示背景的马赛克
          rotatable={false}
          //ref='cropper'//在官方更新之后ref不在支持，应写为以下
          crop={this._crop.bind(this)}
          onInitialized={this.onCropperInit.bind(this)}
        /> 
onCropperInit=cropper => { this.cropper = cropper }
```

### 加载需要裁剪图片问题

```javascript
// 上传前操作
 beforeUpload =  file  => {
  console.log('123',  file ,  file [0].fileObj)
  let { fileObj } =  file [0]
  let reader = new FileReader()
  reader.readAsDataURL(fileObj)
  let _this = this
  reader.onload =  e  => {
   _this.setState({
​    cropSrc:  e .target.result,
​    cropVisible: true,
   })
  }
  return false
 }
```

beforeUpload是antd组件FileUpload的一个属性可以实现在上传图片之前进行操作

利用FileReader将file文件中图片base64格式传递给 Cropper的src中

### 传参问题

一般后台传参要求传一个文件，应写为

```javascript
let imgName = `${new Date().getTime()}.png` //根据日期为裁剪后的文件重命名
//获取裁剪之后的图片
//base64格式
let file1 = this.cropper.getCroppedCanvas().toDataURL()
//BLOB (binary large object)，二进制大对象，是一个可以存储二进制文件的容器。
this.cropper.getCroppedCanvas().toBlob(async blob => {

  // 创造提交表单数据对象
  let formData = new FormData()
  // 添加要上传的文件
  formData.append('file', blob, imgName)
  this.tpsc(formData)//根据自己实际接口进行传参
})
```

***

### 导入依赖和引用

    npm install react-cropper 图片裁剪 

```javascript
import '../../../node_modules/cropperjs/dist/cropper.css'//引入样式（要对应自己的文件格式） 
import Cropper from 'react-cropper' // 引入Cropper
```

***

### 组件常用属性详解

[详解原出处](https://blog.csdn.net/jjyq2009/article/details/87229730)

经过整理(\*代表常用)

|             属性             |           type          | default默认值 | 释义                                 |
| :------------------------: | :---------------------: | :--------: | :------------------------------------------ |
|      \*viewMode - 视图模式     |          _Number_         |      0     | 定义裁剪器的视图模式，0：裁剪框可以在画布外展开，1，2，3将裁剪框限制为画布大小，2或3将画布限制到容器。 |
|      \*dragMode - 拖动模式     |          _String_         |   'crop'   | 定义裁剪器的拖动模式，options'crop': 创建一个新的裁剪框  'move',移动canvas 'none',什么也不做                                                        |
|     \*aspectRatio - 宽高比    |          _Number_         |     NaN    | 设置裁剪框的宽高比                          |
|      \*data - 初始化图片数据      |          _Object_         |    null    | 如果存储了以前的数据，将自动传递给setData方法。        |
|            \*src           |            -            |      -     | 需要裁剪图片资源加载                         |
|       \*preview - 预览       | _String_(jQuery selector) |     ‘’     | 为预览添加额外的元素（容器）。   注意：最大宽度（高度）是预览容器的初始宽度（高度）。   如果设置了aspectRatio选项，请确保以相同的宽高比设置预览容器。    如果预览没有正确显示，请给预览容器设overflow\:hidden|
|     \*responsive(实时响应)     |         _Boolean_         |    true    | 调整窗口大小时，重新渲染裁剪器。                   |
|           restore          |         _Boolean_         |    true    | 调整窗口大小后，恢复裁剪区域。                    |
|      checkCrossOrigin      |         _Boolean_         |    true    | 检查当前图像是否是跨源图像，如果是，当克隆图像时，将crossOrigin属性添加到克隆的图像元素中，并将时间戳添加到src属性以重新加载源图像以避免浏览器缓存错误。通过将crossQrigin属性添加到图像将停止向图像url添加时间戳，并停止重新加载图像。如果图像的crossOrigin属性值为"use-credentials",则在通过XMLHttpRequest读取图像数据时，withCredentials属性将会设置为true。  |
|      checkOrientation      |         _Boolean_         |    true    | 检查当前图像的Exif Orientation information   更准确的说，读取旋转或翻转图像的Orientation值，然后用1（default）覆盖Orientation值，以免在iOS设备上出现一些问题（#120， #509）  需要同时设置ratatable（旋转）和scalable(缩放)为true 注意：不要总是相信这个，因为一些jpg图像有不正确的方向值。需要Typed Arrays support(IE10+) |
|           \*modal          |         _Boolean_         |    true    | 在图像的上方和裁剪框的下方显示黑色模态。               |
|          \*guides          |         _Boolean_         |    true    | 显示裁剪框上的虚线                          |
|          \*center          |         _Boolean_         |    true    | 在裁剪框上显示中心指示器。                      |
|         \*highlight        |         _Boolean_         |    true    | 在裁剪框上显示白色模态（突出显示裁剪框）               |
|        \*background        |         _Boolean_         |    true    | 显示容器的网格背景                          |
|         \*autoCrop         |         _Boolean_         |    true    | 在初始化时启用自动裁剪图像。                     |
|        autoCropArea        |          _Number_         |  0.8（80%）  | 介于0和1之间的数字，定义自动裁剪区域的大小（百分比）        |
|          \*movable         |         _Boolean_         |    true    | 启用移动图像                             |
|      \*ratotable(可旋转)      |         _Boolean_         |    true    | 启用旋转图像                             |
|       \*scalable(可缩放)      |         _Boolean_         |    true    | Enable to scale the image          |
|          zoomable          |         _Boolean_         |    true    | Enable to zoom the image           |
|        \*zoomOnTouch       |         _Boolean_         |    true    | 启用通过拖动触摸缩放图像。                      |
|        \*zoomOnWheel       |         _Boolean_         |    true    | 启用通过鼠标滚轮缩放图像。                      |
|      \*wheelZoomRatio      |          _Number_         |     0.1    | 通过滚动滚轮缩放时的缩放倍率                     |
|      \*cropBoxMovable      |         _Boolean_         |    true    | 启用通过拖动来移动裁剪框。                      |
|     \*cropBoxResizable     |         _Boolean_         |    true    | 启用通过拖动来调整裁剪框的大小。                   |
| \*toggleDragModeOnDblclick |         _Boolean_         |    true    | 双击裁剪器，在 'crop-重新定义裁剪器' 和 'move-移动裁剪器' 模式下切换            |
|      minContainerWidth     |          _Number_         |     200    | 容器的最小宽度。                           |
|     minContainerHeight     |          _Number_         |     100    | 容器的最小高度。                           |
|       minCanvasWidth       |          _Number_         |      0     | 画布的最小宽度（img wrapper-图片外层的div）。     |
|       minCanvasHeight      |          _Number_         |      0     | 画布的最小高度（图像包装器）。                    |
|       minCropBoxWidth      |          _Number_         |      0     | 画布的最小高度（图像包装器）。                    |
|      minCropBoxHeight      |          _Number_         |      0     | 裁剪框的最小高度。     注意：这个大小是相对于页面，而不是图像。|
|            ready           |         _function_        |    null    | A shortcut of the "ready" event.   |
|          cropstart         |         _function_        |    null    | A shortcut of the "cropstart" event。  |
|          cropmove          |         _function_        |    null    | A shortcut of the "cropmove" event.|
|           cropend          |         _function_        |    null    | A shortcut of the "cropend" event. |
|           \*crop           |         _function_        |    null    | A shortcut of the "crop" event.  |
|            zoom            |         _function_        |    null    | A shortcut of the "zoom" event.|

