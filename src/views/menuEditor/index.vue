<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 09:15:18
 * @LastEditTime: 2022-03-31 17:09:41
 * @Description: 菜单编辑页面
-->
<template>
  <div class="home-container"> 
        <!-- //主页的主要内容 -->
        <div class="top-tool">
                <div class="left">
                      页面框架设置
                </div>
                <div class="right">
                        <div>
                              <span class="nos">选择板式</span>
                        </div>
                        <div class="user-avatar">
                            凯    
                        </div>
                        <div class="run-btn">
                                <i class="el-icon-caret-right"></i>
                        </div>
                </div>
        </div>
        <div class="tool-bar">
                <div class="left-tool">

                </div>
                <div class="right-tool">

                </div>
        </div>
        <div class="editor-body">
                <div  class="home-body">
                              <!-- //左边菜单 -->
                              <div class="home-left-container">
                                        <div class="home-body-left scrollbar">
                                                <div class="edith-bar bbr1">
                                                          <div class="title">
                                                                  菜单栏
                                                          </div>
                                                          <div class="btn-bar">
                                                                  <div @click="clickAdditem" class="item-btn">
                                                                        <i class="el-icon-document-add"></i>
                                                                  </div>
                                                                  <div @click="clickAddfold" class="item-btn">
                                                                        <i class="el-icon-folder-add"></i>
                                                                  </div>
                                                          </div>
                                                </div>
                                                <el-menu
                                                class="br1"
                                                unique-opened
                                                :default-active="tabsData.indexTab"
                                                router
                                                >
                                                          <el-menu-item  index="home"><i style="color:#000000e6;" class="el-icon-house"></i> 首页</el-menu-item>
                                                          <el-submenu v-for="(i,index) in menuData" :key="index" :index="i.router">
                                                                  <div slot="title" class="menu-item">
                                                                          <i :class="i.icon" style="color: #000000e6;"></i>
                                                                          <span>{{i.label}}</span>
                                                                          <span @click.stop="clickAdditem(i)" class="add-btn-menu">
                                                                                  <i class="el-icon-circle-plus-outline"></i>
                                                                          </span>
                                                                  </div>
                                                                  <el-menu-item v-for="(item,index1) in i.children" :key="index1" :index="item.router">{{item.label}}</el-menu-item>
                                                          </el-submenu>
                                                </el-menu>
                                        </div>
                              </div>
                              <!-- //右边主体内容 -->
                              <div v-loading="!loadingOk" class="home-body-right">
                                      <div  class="sh-tabs-container bbr1">
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
                                      <div  v-if="loadingOk" class="router-con"  >
                                                <keep-alive> 
                                                        <router-view  :key="$route.path.replace('/menueditor/','')"></router-view> 
                                                </keep-alive>
                                      </div>
                              </div>
                </div>
                <div class="right-con">
                        <div class="row-btn">全局axios设置</div>
                        <div class="row-btn">全局页面配置</div>
                        <div class="row-btn">生命周期-页面载入</div>
                        <div class="row-btn">生命周期-加载完成</div>
                        <div class="row-btn">生命周期-销毁页面</div>
                </div>
        </div>
        <!-- 增加节点的窗口 -->
        <el-dialog title="节点信息" width="460px" append-to-body top="26vh" custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="additem.visible">
                <div class="form-con">
                <el-form :model="additem"  label-width="68px" label-position="left">
                        <el-form-item label="节点名称" >
                                <el-input v-model="additem.label" placeholder="请输入节点名称"></el-input>
                        </el-form-item>
                        <el-form-item label="组图标" >
                                <select-icon v-model="additem.icon"></select-icon>
                        </el-form-item>
                        <el-form-item label="路由名称" >
                                <el-input v-model="additem.router" placeholder="请输入路由名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                                <div style="text-align:right;">
                                <el-button @click="additem.visible = false">取消</el-button>
                                <el-button type="primary" @click="submitAdditem">提交</el-button>
                                </div>
                        </el-form-item>
                </el-form>
                </div>
        </el-dialog>
        <!-- 增加文件夹的窗口 -->
        <el-dialog title="组名称" width="460px" append-to-body top="26vh" custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="addfold.visible">
                <div>
                <el-form :model="addfold"  label-width="68px" label-position="left">
                        <el-form-item label="节点名称" >
                                <el-input v-model="addfold.label" placeholder="请输入节点名称"></el-input>
                        </el-form-item>
                        <el-form-item label="组图标" >
                                <select-icon v-model="addfold.icon"></select-icon>
                        </el-form-item>
                        <el-form-item label="路由名称" >
                                <el-input v-model="addfold.router" placeholder="请输入路由名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                                <div style="text-align:right;">
                                <el-button @click="addfold.visible = false;">取消</el-button>
                                <el-button type="primary" @click="submitAddfold">提交</el-button>
                                </div>
                        </el-form-item> 
                </el-form>
                </div>
        </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
                data(){
                        return{
                                additem: {
                                        visible: false,
                                        label: '',
                                        router: '',
                                        icon: 'el-icon-connection',
                                },
                                addfold: {
                                        visible: false,     
                                        label: '',
                                        router: '',
                                        icon: 'el-icon-connection',
                                },
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
                                loadingOk: true,            //是否加载完成;加载完成之后再载入界面     
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
                        tabsData: {
                                handler(){
                                        localStorage.setItem("wdsk-mytabs",JSON.stringify(this.tabsData))
                                },
                                deep: true
                        },
                        $route:{
                                handler(data){
                                        //监听当前路由绑定id
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
                        submitAdditem(){           //提交增加节点

                        },
                        submitAddfold(){           //提交增加文件

                        },
                        clickAdditem(){            //增加节点
                                this.additem.visible = true;
                        },
                        clickAddfold(){            //增加菜单
                                this.addfold.visible = true;
                        },
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
<style lang="scss" scoped>
@import './style/index.scss'
</style>