<template>
    <div>
            <!-- <keep-alive exclude="home"> -->
                  <router-view></router-view>
            <!-- </keep-alive> -->
    </div>
</template>

<script>  
import axios from 'axios'; 
export default {
  name: 'App',
  watch: {
  },
  data(){
        return{ 
              config: {},           //配置文件
        }
  },
  methods: {
        getQueryString(variable) {
                  let query = window.location.href.replace(/.*\?/,'');
                  let vars = query.split("&");
                  for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                        if(pair[0] == variable){return pair[1];}
                  }
                  return(false);
        }, 
        getVersion(){                     //获取版本号进行自动更新数据
            // this.$notify({
            //       type: 'success',
            //       title: '升级啦⚡',
            //       message: '更新了电商功能',
            // });
            try{
                  caches.keys().then(keys=>{
                        keys.forEach(item=>{
                              if(item.indexOf("shkjhome")!==-1){
                                    this.version=localStorage.getItem("shtgVersion")
                                    console.log("当前版本号: "+this.version)
                                    //获取版本号码
                                    axios.get("https://www.mycst.cn/home/version.js").then(res=>{
                                                if(res!==this.version){
                                                      //检测到升级，将升级的信息提示出来
                                                      localStorage.setItem('shtgVersion',res)
                                                      caches.keys().then(keys=>{
                                                            keys.forEach(item=>{
                                                                  if(item.indexOf("shkjhome")!==-1){
                                                                        caches.delete(item).then(()=>{
                                                                              location.reload()
                                                                        })
                                                                  }
                                                            })
                                                      })
                                                }
                                    })
                              }
                        })
                  })
            }catch(err){
                  console.log("当前不支持caches")
            }
        },
  },
  async created(){
            // eslint-disable-next-line no-undef
            this.$store.commit("config",mainConfig)
            // eslint-disable-next-line no-undef
            this.config=mainConfig
            //如果url有参数使用url的参数
            if(location.href.indexOf("TITLE")!==-1){
                    this.config.TITLE=decodeURIComponent(this.getQueryString("TITLE"))
                    localStorage.setItem("shhome_TITLE",this.config.TITLE)
            }else if(localStorage.getItem('shhome_TITLE')!==null){
                    this.config.TITLE2=localStorage.getItem('shhome_TITLE')
            }
            if(location.href.indexOf("TITLE2")!==-1){
                    this.config.TITLE2=decodeURIComponent(this.getQueryString("TITLE2"))
                    localStorage.setItem("shhome_TITLE2",this.config.TITLE2)
            }else if(localStorage.getItem('shhome_TITLE2')!==null){
                    this.config.TITLE2=localStorage.getItem('shhome_TITLE2')
            }
            if(location.href.indexOf("LOGOSRC")!==-1){
                    this.config.LOGOSRC=decodeURIComponent(this.getQueryString("LOGOSRC"))
                    if(this.config.LOGOSRC.indexOf("http")!==-1){
                          this.config.LOGOSRC=decodeURIComponent(this.config.LOGOSRC)
                    }
                    localStorage.setItem("shhome_LOGOSRC",this.config.LOGOSRC)
            }else if(localStorage.getItem('shhome_LOGOSRC')!==null){
                    this.config.LOGOSRC=localStorage.getItem('shhome_LOGOSRC')
            }
            //提交上传
            this.$store.commit("config",this.config)
            // eslint-disable-next-line no-undef
            document.getElementsByTagName("title")[0].innerText=this.config.TITLE+" | "+this.config.TITLE2
  },
  mounted(){ 
            this.getVersion();
            window.$router=this.$router
  }
}
</script>

<style scoped>

</style>
