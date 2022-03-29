<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 09:15:18
 * @LastEditTime: 2022-03-29 16:33:15
 * @Description: 菜单编辑页面
-->
<template>
  <div class="home-container"> 
        <!-- //主页的主要内容 -->
        <div class="top-tool">
                <div class="left">
                      页面编辑工具
                </div>
                <div class="right">
                      修改当前页面
                </div>
        </div>
        <div class="editor-body">
                <div  class="home-body">
                              <!-- //左边菜单 -->
                              <div class="home-left-container" :style="isCollpse?'margin-right:10px;width:190px;':'margin-right:0;width:0px;'">
                                        <div class="home-body-left scrollbar">
                                                <el-menu
                                                unique-opened
                                                :default-active="tabsData.indexTab"
                                                router
                                                >
                                                          <el-menu-item  index="home"><i style="color:#2360ff;" class="el-icon-house"></i> 首页</el-menu-item>
                                                          <el-submenu v-for="(i,index) in menuData" :key="index" :index="i.router">
                                                                  <template slot="title">
                                                                          <i :class="i.icon" style="color: #2360ff;"></i>
                                                                          <span>{{i.label}}</span>
                                                                  </template>
                                                                  <el-menu-item v-for="(item,index1) in i.children" :key="index1" :index="item.router">{{item.label}}</el-menu-item>
                                                          </el-submenu>
                                                </el-menu>
                                                <div  @click="isCollpse=!isCollpse" v-show="isCollpse" class="sq-btn nos">
                                                        <span type="primary"><i class="el-icon-caret-left"></i> 收起</span>
                                                </div>
                                        </div>
                              </div>
                              <!-- //右边主体内容 -->
                              <div v-loading="!loadingOk" class="home-body-right">
                                      <div v-show="showTabs" class="sh-tabs-container">
                                              <transition name="el-zoom-in-center">
                                              <div v-show="scrollIcon" @click="scrollTo('left')" class="scroll-btn scroll-btn-left"><i class="el-icon-arrow-left"></i></div>
                                              </transition>
                                              <div id="scroll-con" class="noscrollbar">
                                                        <transition-group   leave-to-class="router-leaver"   enter-active-class="router-enter">
                                                        <div @click="clickTab(item)" :ref="item.router" :class="item.router==tabsData.indexTab?'index-tab':''" v-for="item in tabsData.list" :key="item.router" class="sh-tabs-item">
                                                                <span><i :class="item.icon"></i> {{item.label}}</span>
                                                                <span @click.stop="closeTab(item)" v-show="item.router!='home'" class="el-icon-circle-close tab-close"></span>
                                                        </div>  
                                                        </transition-group>
                                              </div>
                                              <transition name="el-zoom-in-center">
                                              <div v-show="scrollIcon" @click="scrollTo('right')" class="scroll-btn scroll-btn-right"><i class="el-icon-arrow-right"></i></div>
                                              </transition>
                                      </div>
                                      <!-- //路由容器组件 -->
                                      <div  v-if="loadingOk" class="router-con" :style="{'height': showTabs? 'calc(100% - 36px )':'100%'}">
                                                <keep-alive> 
                                                        <router-view  :key="$route.path.replace('/menueditor/','')"></router-view> 
                                                </keep-alive>
                                      </div>
                              </div>
                </div>
                <div class="right-con">

                </div>
        </div>
        <div class="bottom-tool">
                这是页脚部分数据
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
                data(){
                        return{
                                menuData: [                          //菜单list
                                    {
                                            label: "基础管理"
                                            ,router:  "test2"
                                            ,icon: "el-icon-connection"
                                            ,show: true
                                            ,children:[
                                                    {
                                                            label: "用户中心"
                                                            ,router:  "test"
                                                            ,icon: "el-icon-baseball"
                                                            ,show: true
                                                    },
                                                    {
                                                            label: "商家管理"
                                                            ,router:  "test1"
                                                            ,icon: "el-icon-baseball"
                                                            ,show: true
                                                    }
                                            ]
                                    }
                                ],
                                menuListEP:[], 
                                isCollpse: true,             //是否折叠左侧
                                loadingOk: true,            //是否加载完成;加载完成之后再载入界面     
                                showTabs: true,
                                tabsData: {
                                        indexTab: 'home',
                                        list: [
                                                {
                                                        label: "首页"
                                                        ,router:  "home"
                                                        ,icon: "el-icon-house"
                                                }
                                        ]
                                },
                                scrollIcon: false,           //tabs滚动条按钮是否显示
                        }
                },
                watch: {
                        isCollpse(){            //将收缩状态放入localstorage
                                localStorage.setItem('wdsk-isCollpseGS',this.isCollpse)
                        },
                        tabsData: {
                                handler(){
                                        localStorage.setItem("wdsk-mytabs",JSON.stringify(this.tabsData))
                                },
                                deep: true
                        },
                        $route:{
                                handler(data){
                                        //监听当前路由绑定id
                                        if(!this.showTabs)return;
                                        if(this.tabsData.list.filter(tab=>{
                                                if(tab.router==data.path.replace('/home/dashboard/','')){
                                                        return  tab
                                                }
                                        }).length===0){
                                                for(let x of this.menuListEP){
                                                        if(x.router===this.$route.path.replace('/home/dashboard/','')){
                                                                this.tabsData.indexTab=data.path.replace('/home/dashboard/','')
                                                                this.tabsData.list.push(x)
                                                                this.eventTabContainer()
                                                                this.$nextTick(()=>{
                                                                        this.$refs[this.tabsData.indexTab][0].scrollIntoView({behavior: 'smooth'})
                                                                })
                                                                return
                                                        }
                                                }
                                        }else{
                                                this.tabsData.indexTab=data.path.replace('/home/dashboard/','');
                                                this.$nextTick(()=>{
                                                        try{
                                                                this.$refs[this.tabsData.indexTab][0].scrollIntoView({behavior: 'smooth'});
                                                        }catch(err){
                                                                console.log("调整位置失败...");
                                                        }
                                                })
                                        }
                                },
                                deep: true
                        },
                        menuData: {
                                handler(){
                                        this.menuListEP=[]
                                        //拼装简洁版menu，用户tab和自定义快捷方式
                                        this.createMenuEP()
                                },
                                deep: true
                        }, 
                },
                computed: {
                        ...mapState([])
                },
                methods: {
                        closeTab(tab){             //关闭tab 
                                this.tabsData.list=this.tabsData.list.filter(item=>item.router!=tab.router)
                                if(this.tabsData.list[this.tabsData.list.length-1].router!==this.$route.path.replace('/','')){
                                        this.$router.push(this.tabsData.list[this.tabsData.list.length-1].router) 
                                }
                                this.$nextTick(()=>{
                                        this.eventTabContainer()
                                })
                        },
                        scrollTo(type){
                                if(type=='left'){
                                        this.$nextTick(()=>{
                                                document.getElementById('scroll-con').scrollTo({
                                                        left: document.getElementById('scroll-con').scrollLeft-500,
                                                        behavior: 'smooth'
                                                })
                                        })
                                }else{
                                        this.$nextTick(()=>{
                                                document.getElementById('scroll-con').scrollTo({
                                                        left: document.getElementById('scroll-con').scrollLeft+500,
                                                        behavior: 'smooth'
                                                })
                                        })
                                }
                        },
                        clickTab(tab){          //点击tab 
                                if(this.$route.path.replace('/home/dashboard/home','')==tab.router){
                                        return
                                }
                                this.$router.push(tab.router)
                        },
                        eventTabContainer(){    //监听就tabsContainer的溢出事件来控制是否显示i滚动按钮
                                setTimeout(() => {
                                        let innerWidth=0
                                        if(document.getElementsByClassName("sh-tabs-container").length!=0){
                                                let conWidth=document.getElementsByClassName("sh-tabs-container")[0].clientWidth
                                                for(let item of document.getElementsByClassName("sh-tabs-item")){
                                                        innerWidth+=item.clientWidth+5
                                                        if(innerWidth>conWidth){
                                                                this.scrollIcon=true
                                                                return
                                                        }
                                                }
                                                this.scrollIcon=false
                                        }else{
                                                setTimeout(() => {
                                                      this.eventTabContainer()
                                                }, 200);
                                        }
                                },220)
                        },
                        initRoutes(){           //初始化路由参数
                                for(let item of this.menuData){
                                        if(item.children){
                                                for(let item of item.children){
                                                        const routeObj = {
                                                            path: '/menueditor/'+item.router, // 这里要把父路由的路径也带上
                                                            name: item.router,
                                                            meta: {  },
                                                            component: () =>  import('../templateView/index.vue')
                                                        }
                                                        this.$router.addRoute('menueditor',routeObj)
                                                }
                                        }
                                }
                        },
                },
                async created(){
                        this.initRoutes();
                        ///对menuData进行赋值操作
                        if(localStorage.getItem("wdsk-mytabs")!==null){
                                this.tabsData=JSON.parse(localStorage.getItem("wdsk-mytabs"));
                                this.tabsData.indexTab = this.$route.path.replace('/home/dashboard/','')
                        }
                },
                mounted(){
                }, 
}
</script>

<style lang="less" scoped>
.top-tool{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        height: 60px;
        line-height: 60px;
        background: #2995ff;
        color: #fff;
        div{
                font-size: 1.5rem;
                font-weight: 500;
        }
}
.editor-body{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: calc(100vh - 110px);
        .home-body{
                width: 500px;
                flex: 1;
                // padding: 12px;
                box-sizing: border-box;
        }
        .right-con{
                background: #f1f1f1;
                height: 100%;
                width: 300px;
        }
}
.bottom-tool{
        font-size: .9rem;
        height: 50px;
        padding: 12px 6px;
        box-sizing: border-box;
        background: #252525;
        color: #fff;
}
.router-leaver{
        // animation: fadeOutDown .32s;
}
.router-enter{
        animation: fadeInRight .32s;
}  
.sh-tabs-container{
        height: 36px;
        line-height: 36px;
        background-color: #fff;
        overflow: auto;
        display: flex;
        align-items: center;
        #scroll-con{
                width: calc(100% - 34px);
                display: inline-block;
                overflow: auto;
                white-space: nowrap;
        }
        .scroll-btn-right{
                margin-left: 5px;
                margin-right: 0px  !important;
        }
        .scroll-btn{
                display: inline-block;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                padding: 0 1px;
                background-color: #f2f0ff9c;
                margin-right: 5px;
                box-shadow: 0 0 1px #7c84ff;
                transition: all .32s;
                &:hover{
                        color: #fff;
                        background: #1e78ff;
                }
        } 
        .sh-tabs-item{
                background-color: #fff;
                display: inline-block;
                padding: 0 12px;
                margin-right: 5px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                user-select: none;
                color: gray; 
                box-shadow: 0 0 5px -2px #858cf3;
                .tab-close{
                        margin-left: 3px;
                        color: #FFF;
                        cursor: pointer; 
                        transition: all .22s;
                        &:hover{
                                color: red;
                        }
                }
                &:first-child{
                        margin-left: 1px;
                }
                &:last-child{
                        margin-right: 1px;
                }
        } 
}
.index-tab{
    background: #1e78ff !important;
    color: #FFE !important;
    box-shadow: 0 0 5px -2px #293551 !important;
} 
*{
        font-size: 9pt;
}
.blue{
        color: blue;
} 
.home-container{
        //     height: 100vh;
            background: #efefef;
           .home-top{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: #fff;
                        margin-bottom: 10px;
                        .home-top-left{
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        .span-sqc{
                                                display: inline-block;
                                                width: 5px;
                                                height: 32px;
                                                background: #1088ff;
                                                margin-right: 12px;
                                                border-radius: 20px;
                                        }
                                        .logo{
                                                height: 30px;
                                                margin-right: 12px;
                                                & img{
                                                        height: inherit;
                                                }
                                        }
                                        .logo-title{
                                                font-weight: 600;
                                                font-size: 12pt;
                                        }
                        }
                        .home-top-right{ 
                                        &>span:first-child{
                                                margin-right: 12px;
                                        }
                                        .el-icon-user-solid{
                                                margin-left: 12px;
                                                position: relative; 
                                        }
                                        .user-name{
                                                margin-left: 3px;
                                                font-size: 0.86rem;
                                                font-weight: 600;
                                        }
                                        & .exit{
                                                margin-left: 12px;
                                                font-weight: 600;
                                                font-size: 11pt;
                                        }
                        }
           }     
           .home-body{
                        height: 100%;
                        display: flex;
                        .home-left-container{
                                        height: 100%;
                                        background: #fff;
                                        margin-right: 10px;
                        .home-body-left{
                                        height: calc(100% - 65px) ;
                                        width: inherit;
                                        background: #fff;
                                        overflow-x: hidden;
                                        overflow-y: auto;
                                        position: relative;
                                        /deep/ .el-submenu .el-menu-item{
                                                        padding-left: 58px !important;
                                        }
                                        .sq-btn{
                                                position: fixed;
                                                bottom: 62px;
                                                left: 34px;
                                                width: 90px;
                                                background: rgb(30, 120, 255);
                                                padding: 8px 5px;
                                                color: #fff;
                                                border-radius: 8px;
                                                text-align: center;
                                        }
                        }
                        }
                        .home-body-right{
                                width: 200px;
                                flex: 1;
                                background: #fff;
                                position: relative;
                                .router-con{
                                        overflow: auto;
                                }
                        }
           }
}
 
@keyframes filpin{
        from{
                    transform: rotateY(90deg);
        }to{
                    transform: rotateY(0deg);
        }
}
.filpin{
        animation: filpin .82s;
}
.filpout{

}
.outline{
        color: #b4b4b4;
} 
.fontse14{
        font-size: 14px;
}
@keyframes rotate{
        from {
                transform: rotate(0deg);       
        }
        to{
                transform: rotate(360deg);      
        }
}
.roateanm{
        animation: rotate 1300ms infinite;
}
</style>      