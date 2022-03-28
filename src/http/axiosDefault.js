// axios.defaults.timeout=50*1000                  //设置默认超时时间为50s
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        //带有http头的不进行url转换
        if(config.url.indexOf('http')===-1&&config.url!=='/getk'){
            config.url=window.httpHeader+config.url
        }
        //添加token
        try{
            config.data.append('token',localStorage.getItem('token'))
        }catch(e){
            config.data+='&token='+localStorage.getItem("token")
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