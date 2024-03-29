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
    logo: 'http://39.107.231.241:84/avatar.jpg',
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
        title: '动画示例组件',
        items: [
          {
            path: 'colour-ribbon',
            title: '彩带动画',
          },
          {
            path: 'frame-by-frame',
            title: '逐帧动画',
          },
          {
            path: 'proton-engine-example',
            title: '粒子引擎示例',
          },
          {
            path: 'matterjs-example',
            title: '物理引擎示例',
          },
          {
            path: 'font-animate',
            title: '字体动画',
          },
        ],
      },
      {
        title:'抽奖游戏示例',
        items:[
          {
            path: 'smash-golden-eggs',
            title: '砸金蛋抽奖',
          },
          {
            path: 'smash-golden-eggs-more',
            title: '砸金蛋抽奖(华丽)',
          },
          {
            path: 'red-packet-svg',
            title: '红包雨抽奖-svg',
          },
          {
            path: 'red-packet-css',
            title: '红包雨抽奖-css',
          },
          {
            path: 'scrape-off',
            title: '刮刮乐抽奖',
          },
          {
            path: 'gashapon-machine-setinterval',
            title: '扭蛋机抽奖-setInterval',
          },
          {
            path: 'gashapon-machine-request',
            title: '扭蛋机抽奖-requestAnimationFrame',
          },
          {
            path: 'gashapon-machine-matter',
            title: '扭蛋机抽奖-matterjs',
          },
          {
            path: 'shake-tree',
            title: '摇一摇',
          },
          {
            path: 'lucky-wheels',
            title: '转盘抽奖',
          },
          {
            path: 'lucky-wheels-js',
            title: '转盘抽奖-js',
          },
          {
            path: 'lucky-grids',
            title: '跑马灯抽奖',
          },
          {
            path: 'lucky-slot-machines',
            title: '老虎机抽奖',
          },
        ]
      },
      {
        title: '二次封装组件',
        items: [
          {
            path: 'qrcode',
            title: '二维码生成',
          },
        ],
      },
      {
        title: 'vant二次封装组件测试',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'vant-test',
            title: 'vant组件引用测试',
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
            path: 'React-cropper',
            title: 'React-cropper使用',
          },
          {
            path: 'axios',
            title: 'axios解决竞态问题',
          },
          {
            path: 'guoxin-cli',
            title: 'guoxin-cli脚手架搭建',
          }
        ],
      },
      {
        title:'技术分享',
        items:[
          {
            path: 'css-svg-canvas',
            title: '关于前端动画的多种实现方式',
          },
          {
            path: 'svg-png-jpg',
            title: 'SVG vs PNG vs JPG',
          },
          {
            path: 'React-Vue',
            title: 'React vs Vue',
          },
        ]
      }
    ],
    // 顶部右侧版本切换
    versions: [
      {
        label: 'PC',
        link: 'http://39.107.231.241:81/#/',
      },
    ],
    links:[
      // {
      // text:'1111',
      // logo:'11111',
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

  },
};
