<template>
    <div v-if="loadingOK">
            <!-- <keep-alive exclude="home"> -->
                  <router-view></router-view>
            <!-- </keep-alive> -->
    </div>
</template>

<script>  
import axios from 'axios'; 
import { mapState } from 'vuex';
export default {
  name: 'App',
  watch: {
  },
  data(){
        return{ 
              loadingOK: false,     //是否加载完成
        }
  },
  computed: {
        ...mapState(['menuData','config'])
  },
  methods: {
        routerMapper(row){         //映射服务器字段
                for(let item of row){
                        item.id = item.ID;
                        item.label = item.CATPTION;
                        item.router = item.ROUTER;
                        item.icon = item.ICON
                        item.iscontainer = item.ISCONTAINER
                        item.children = item.CHILD
                        item.parentid = item.SJID;
                        if(item.CHILD&&item.CHILD.length!=0){
                                this.routerMapper(item.CHILD);
                        }
                }
        },
        async initRoutes(){        //初始化路由
            let res = await axios.post(this.$config.urlh+ '/NEWKP/DEV/GetMenu')
            if(res.Result=='1'){
                    //映射服务器字段
                    console.log(res.Rows)
                    this.routerMapper(res.Rows)
                    this.$store.commit('menuData',res.Rows)
            }else{
                    this.$alert('获取路由信息失败'+ res.Message);
            }
            //注册路由
            for(let item of this.menuData){
                    if(item.ISCONTAINER=='1'){
                            for(let itemc of item.children){
                                    const routeObj = {
                                        path: '/home/dashboard/'+itemc.router,
                                        name: itemc.router,
                                        meta: {  },
                                        component: () =>  import('./pages/home/children/dashboard/children/template/index.vue')
                                    }
                                    this.$router.addRoute('dashboard',routeObj)
                            }
                    }else{
                            const routeObj = {
                                path: '/home/dashboard/'+item.router,
                                name: item.router,
                                meta: {  },
                                component: () =>  import('./pages/home/children/dashboard/children/template/index.vue')
                            }
                            this.$router.addRoute('dashboard',routeObj)
                    }
            }
            this.loadingOK = true
        }
  },
  async created(){
            await this.initRoutes();
            this.$store.commit("config",mainConfig)
  },
  mounted(){ 
            window.$router=this.$router
  }
}
</script>

<style scoped>

</style>
