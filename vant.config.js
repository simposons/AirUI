module.exports = {
  name: 'AirUI',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: './',
    },
  },
  site: {
    // 标题
    title: 'AirUI',
    // 图标
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    // 左侧导航栏配置
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'qrcode',
            title: '二维码生成',
          },
        ],
      },
      {
        title: '技术记录',
        items: [
          {
            path: 'vant-cli',
            title: 'vant-cli 搭建',
          },
          {
            path: 'jenkins',
            title: 'jenkins 安装及配置',
          },
          {
            path: 'applet',
            title: '目前流行的小程序开发框架对比',
          },
          {
            path: 'axios',
            title: 'axios解决竞态问题',
          },
        ],
      },
    ],
    // 顶部右侧版本切换
    versions: [
      // {
      //   label: 'v1',
      //   link: 'https://youzan.github.io/vant/v1/',
      // },
    ],
    // 顶部左侧搜索
    // searchConfig:{

    // },
    // 是否隐藏移动端模拟器
    // hideSimulator:false,
    // 自定义手机模拟器的 iframe URL 地址。
    // simulator:{
    //   url:'index.html/'
    // },
    // 是否在 dev 时开启 vConsole 调试，用于移动端 debug。
    // enableVConsole:true,

  },
};
