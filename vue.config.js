const path = require('path')
const CP=require('compression-webpack-plugin')

const minify = process.env.NODE_ENV === 'development' ? false : {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
}

function resolve(dir) {
  return path.join(__dirname, dir)
} 
module.exports = { 
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/form-generator/'
    : '/',
  pages: {
    index: {
      entry: 'main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      minify
    },
    preview: {
      entry: 'src/views/preview/main.js',
      template: 'public/preview.html',
      filename: 'preview.html',
      chunks: ['chunk-vendors', 'chunk-common', 'preview'],
      minify
    }
  },
  devServer: {
    overlay: false,
    proxy: {
      '/getk':{
          target: 'https://www.ksy2019.top/'
      }
    }
  },  
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT'
    },
    plugins: [ new CP({
      test: /\.js$|\.css$|\.html/,
      threshold:  5*1024,
      minRatio: 0.8,//只有压缩率比这个值小的资源才会被处理
      deleteOriginalAssets: false
    })]
  }, 
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg') 
      .exclude.add(resolve('src/icons'))
      .end()  
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
