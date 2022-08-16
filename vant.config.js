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
    title: 'AirUI',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
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
  },
};
