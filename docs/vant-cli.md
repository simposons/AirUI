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
