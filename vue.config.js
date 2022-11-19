
const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}


module.exports = {
  publicPath: './',
  lintOnSave: false,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@components', resolve('./src/components'))
      .set('@assets', resolve('./src/assets'))
      .set('@views', resolve('./src/views'))
      .set('@api', resolve('./src/api'))
      .set('@store', resolve('./src/store'))
    //set第一个参数：设置的别名，第二个参数：设置的路径

  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://132.232.18.227:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      '/pic': {
        target: 'http://132.232.18.227:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/pic': ''
        },
      },
    }
  },
}
