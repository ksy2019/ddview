// import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import axios from 'axios'
import svgIcon from '@/components/SvgIcon' 
import '@/assets/css/global.less'
import '@/assets/css/myElement.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table/lib/style.css'
import '@/assets/theme/index.css'
import { Loading } from 'element-ui';
import moment from 'moment'
import ELEMENT from 'element-ui'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX  from 'vxe-table-plugin-export-xlsx'
import store from '@/store'
Vue.use(ELEMENT,{size: 'small'})
Vue.component('svg-icon', svgIcon)
Vue.config.productionTip = false
Vue.use(superView)
Vue.prototype.$axios = axios
import '@/http/axiosDefault'


//注册全局组件
Vue.component('select-icon',()=>import('./src/components/globalComponents/selectIcon'));
Vue.component('http-other-set',()=>import('./src/components/globalComponents/httpOtherSet'));


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
Vue.prototype.$loading = Loading;
window.axios = axios;
//设置接口地址
Vue.prototype.$config = {
  urlh: 'https://51dzfp.cn',
}
Vue.use(dirctives)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


