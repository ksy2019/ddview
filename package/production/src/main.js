// import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
import './assets/css/global.less'
import './assets/css/myElement.css'
import '@/assets/theme/index.css'
import applicationConfig from '../config/applicationConfig'
Vue.use(ELEMENT,{size: 'small'})

//全局注册自定义组件
import hevueImgPreview from 'hevue-img-preview'           //图片展示组件
Vue.use(hevueImgPreview)

//注册自定义指令
import dirctives from './utils/directives'

//注册vxe的插件
VXETable.use(VXETablePluginExportXLSX)
Vue.use(VXETable)

//挂载富文本
import tinymce from './components/tinymce'
Vue.component('tinymce',tinymce)

//将函数挂载到vue根目录
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$moment = moment
Vue.use(dirctives)
Vue.use(superView)
import '@/http/axiosDefault.js'

import { Loading } from 'element-ui';
Vue.prototype.$loading = Loading;
Vue.prototype.$config = applicationConfig;
//挂载公共函数
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
