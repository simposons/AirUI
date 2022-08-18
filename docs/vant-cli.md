# Vant CLI

### [官网](https://github.com/vant-ui/vant/blob/dev/packages/vant-cli/README.zh-CN.md)
执行以下命令可以快速创建一个基于`Vant CLI`的项目：
```shell
yarn create vant-cli-app
```

### 注意事项
#### package.json
```json
 "scripts": {
    "dev": "vant-cli dev", //启动命令
    "test": "vant-cli test", //测试
    "lint": "vant-cli lint", //校验
    "build": "vant-cli build",
    "release": "vant-cli release", //打包到npm发布
    "test:coverage": "open test/coverage/index.html",
    "build-site-admin": "vant-cli build-site", //我自己加的
    "build-site": "vant-cli build-site && npx gh-pages -d site-dist" //打包部署组件库文档
  },
```

#### vant.config.js
```js
    site: {
      publicPath: './',
    },
```
用来定义打包出的组件库文档中 加载`js` `css`的绝对路径

### 可查阅资料

[Vant-cli 有赞出品 Vue 组件库构建工具](https://www.wenjiangs.com/article/vant-cli.html)
<!-- <iframe src="https://www.wenjiangs.com/article/vant-cli.html"/> -->


### 特殊组件

Vant Cli 也支持预览桌面端组件，你可以在组件的 demo 目录下新建一个 .vue 文件，并在组件的 README 中按如下格式声明要预览的组件：

```markdowm
<demo-code>./demo/MyDemo.vue</demo-code>
```
demo-code 标签中间的文本为 README 到 demo 文件的相对路径。

#### demo-code 标签支持以下属性：

|名称|	类型|	描述|
| ----- | ------ | ----- |
|compact|	boolean|	紧凑模式|
|transform|	boolean|	防止预览区内 fixed 定位的元素飞出预览区|
|inline	|boolean|	只显示组件本身，不显示预览区边框和代码|