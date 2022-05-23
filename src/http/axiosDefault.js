import axios from 'axios'

// axios.defaults.timeout=50*1000                  //设置默认超时时间为50s
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        //todo: 测试代码
        if(config.url.indexOf('/fc/getk')!==-1){
            config.data.append('currentPage',config.data.get('pageindex'))
            config.data.append('pageSize',config.data.get('pagesize'))
        }

        // //带有http头的不进行url转换
        // if(location.href.indexOf('menueditor')==-1&&window.mode!=='dev'&&config.url.indexOf('http')===-1){
        //     config.url=window.httpHeader+config.url
        // }
        //添加token
        try{
            config.data.append('token',localStorage.getItem('token'))
        }catch(e){
            if(config.data==''){
                config.data+='?token='+localStorage.getItem("token")
            }else{
                config.data+='&token='+localStorage.getItem("token")
            }
        }
        return config;
  }, function (error) {
        console.log('发生了错误，请求未发出：'+error)
        return {Result: '0', Message: '发生了错误，请求未发出'}
});

// 添加响应拦截器
axios.interceptors.response.use(async function (response) {
        if(Number(response.data.Code)<=2009&&Number(response.data.Code)>=2000){
                  location.href="#/login"
                  throw SyntaxError();
        }
        return response.data;
}, function (error) {
      console.log('发生了错误，请求未发出：'+error)
      return {Result: '0', Message: '网络错误'}
});