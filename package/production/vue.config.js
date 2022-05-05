const CP=require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  publicPath: './',
  outputDir: '../../public/productor',
  lintOnSave: false,
  devServer: {
    proxy: {
      // "/NEWKP/KPGL/SHKP": {
      //   target: 'http://localhost:829'
      // },
      // "/NEWKP/KPGL/FPKJ": {
      //   target: 'http://localhost:829/fpkj'
      // }, 
      '/getk':{
        target: 'https://www.ksy2019.top/'
      },
      "/WD/" : {
        target: 'http://51dzfp.cn'
      },
      "/SHKJ/" : {
        target: 'http://118.31.113.84'
      }, 
    },
    disableHostCheck: true,
    // https: true,
  },
  productionSourceMap: false, 
  configureWebpack: config=>{
    ///如果生产环境的时候时候进行gzip打包
    if(process.env.NODE_ENV === 'production'){
       return {
          plugins: [ 
            new CP({
              test: /\.js$|\.css$|\.html/,
              threshold:  10*1024,
              deleteOriginalAssets: false
            }),
            // new BundleAnalyzerPlugin()
          ],
          externals: {
            'element-ui': 'ELEMENT',
            'vue': 'Vue',
            'echarts': 'echarts',
            'xe-utils': 'XEUtils',
            'vxe-table': 'VXETable',
            'vxe-table-plugin-export-xlsx': 'VXETablePluginExportXLSX',
            'axios': 'axios',
          }
       }
    }else{
        return {
            //引入依赖图分析工具
            plugins:[
                // new BundleAnalyzerPlugin()
            ],
            externals: {
              'element-ui': 'ELEMENT',
              'vue': 'Vue',
              'echarts': 'echarts',
              'xe-utils': 'XEUtils',
              'vxe-table': 'VXETable',
              'vxe-table-plugin-export-xlsx': 'VXETablePluginExportXLSX',
              'axios': 'axios',
            }
        }
    }
  },
  chainWebpack: config => {
      config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 120*1024 }))
  },
}