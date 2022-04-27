const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/app/',
  outputDir: 'app',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://haoshengyi.link',
        ws: false,
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})