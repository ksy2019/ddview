// axios.defaults.timeout=50*1000                  //设置默认超时时间为50s
// 添加请求拦截器
axios.interceptors.request.use(function (config) { 
        let ly = location.hash.replace(location.hash.match('#.*/'),'');
        //带有http头的不进行url转换
        console.log(config.url)
        if(config.url.indexOf('127.0.0.1')!=-1){
            return config;
        }
        if(config.url.indexOf('http')===-1&&config.url!=='/getk'){
            config.url=window.httpHeader+config.url
        }
      //   try{
      //       if(config.data.get('pageindex')){
      //             config.data.append('pageIndex',config.data.get('pageindex'))
      //       }
      //       if(config.data.get('pagesize')){
      //             config.data.append('pageSize',config.data.get('pagesize'))
      //       }
      //       config.data.delete('pageindex')
      //       config.data.delete('pagesize')
      //   }catch(e){
      //         console.log("替换页码错误")
      //   }
        //添加token
        try{
              if(location.href.indexOf('xfzjf')==-1 && config.url.indexOf('CKSB')==-1){
                  config.data.append('token',localStorage.getItem('token'))
              }
        }catch(e){
              config.data+='&token='+localStorage.getItem("token");
        }
        config.data+='&ymly='+ ly
        return config;
}, function (error) {
        console.log('发生了错误，请求未发出：'+error)
        return {Result: '0', Message: '发生了错误，请求未发出'}
});

// 添加响应拦截器
axios.interceptors.response.use(async function (response) {
        if(location.href.indexOf('xfzjf')==-1){
          if(Number(response.data.Code)<=2009&&Number(response.data.Code)>=2000){
                    location.href="#/login"
                    throw SyntaxError();
          }
        }
        response.data.result = response.data.Result;
        response.data.total = Number(response.data.total);
        return response.data;
}, function (error) {
      console.log('发生了错误，请求未发出：'+error)
      return {Result: '0', Message: '网络错误',code: 500}
});
