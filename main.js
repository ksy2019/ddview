import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import svgIcon from '@/components/SvgIcon' 
import '@/assets/css/global.less'
import '@/assets/css/myElement.css'
import '@/assets/theme/index.css'
import store from '@/store'
Vue.use(ELEMENT,{size: 'small'})
Vue.component('svg-icon', svgIcon)
Vue.config.productionTip = false
Vue.use(superView)
Vue.prototype.$axios = axios
import '@/http/axiosDefault'

//注册全局组件
Vue.component('select-icon',()=>import('./src/components/globalComponents/selectIcon'));

//引入全局设置
import globjs from '@/utils/global'
Vue.prototype.$globjs = globjs
//自定义指令 
import dirctives from '@/utils/directives'
VXETable.use(VXETablePluginExportXLSX)
Vue.use(VXETable)
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$moment = moment
Vue.prototype.$base=Vue.prototype.$mybase;
Vue.use(dirctives)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


