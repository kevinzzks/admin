const { defineConfig } = require('@vue/cli-service');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = defineConfig({
  transpileDependencies: ['@vue/cli-service'],
  outputDir: 'dist', // 指定输出目录
  assetsDir: 'static', // 指定静态资源目录

  devServer: {
    host: '0.0.0.0', // 允许所有IP访问
    port: 8080, // 默认端口，可以根据需要修改
    // https: true, // 是否启用https
    open: true, // 启动后自动打开浏览器
    proxy: {
      '/proxyApi': {
        target: 'https://10.96.177.104:8443/',
        pathRewrite: { '^/proxyApi': '' }, // 重写以 /api 开头的路径
        secure: false,
        changeOrigin: true // 必须设置，用于虚拟主机的情况
      }
    }
  },
  chainWebpack: config => {
    config.output.filename('static/js/[name].[contenthash].js');
    config.output.chunkFilename('static/js/[name].[contenthash].js');
    // 修改 CSS 文件名
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css')
        .tap(args => {
          args[0].filename = 'static/css/[name].[contenthash].css';
          args[0].chunkFilename = 'static/css/[name].[contenthash].css';
          return args;
        });
    }
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap(options => {
        // 确保 options 存在并且 plugins 被定义为数组
        options = options || {};
        options.plugins = options.plugins || [];
        // 添加 transform-remove-console 插件，仅在生产环境下添加
        if (process.env.NODE_ENV === 'production') {
          options.plugins.push('transform-remove-console');
        }
        return options;
      });
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import "@/styles/variables.scss";` // 全局引入 SCSS 文件
  //     }
  //   }
  // },
  publicPath: process.env.PUBLIC_PATH || '/'
});