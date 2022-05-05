<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 09:15:18
 * @LastEditTime: 2022-05-05 14:39:42
 * @Description: 菜单编辑页面
-->
<template>
  <div class="home-container"> 
        <!-- //主页的主要内容 -->
        <div class="top-tool">
                <div class="left">
                      项目框架
                      <span class="text-con">设置</span>
                </div>
                <div class="right">
                        <div @click="clickPriview" class="preview-btn">
                              <img src="./img/preview.svg" alt="">
                              预览
                        </div>
                        <div class="user-avatar">
                            凯
                        </div>
                        <div class="run-btn">
                                <i class="el-icon-caret-right"></i>
                        </div>
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
                                        class="br1 my-elmenu"
                                        unique-opened
                                        :default-active="tabsData.indexTab"
                                        >
                                        <template v-for="(i) in menuData">
                                                <el-menu-item @click="clickTab(i)" v-if="i.iscontainer=='0'" :key="i.router" :index="i.router">
                                                        <div class="menu-item">
                                                                <i style="color:#000000e6;" :class="i.icon"></i> {{i.label}}
                                                                <span @click.stop="updateMenuItem(i,'item')" class="add-btn-menu">
                                                                        <i class="el-icon-edit"></i>
                                                                </span>
                                                        </div>
                                                </el-menu-item>
                                                <el-submenu v-if="i.iscontainer=='1'"  :key="i.router" :index="i.router">
                                                        <div slot="title" class="menu-item">
                                                                <i :class="i.icon" style="color: #000000e6;"></i>
                                                                <span>{{i.label}}</span>
                                                                <span @click.stop="clickAddfold(i)" class="add-btn-menu">
                                                                        <i class="el-icon-circle-plus-outline"></i>
                                                                </span>
                                                                <span @click.stop="updateMenuItem(i,'fold')" class="add-btn-menu">
                                                                        <i class="el-icon-edit"></i>
                                                                </span>
                                                        </div>
                                                        <!-- //第二层子节点 -->
                                                        <el-menu-item @click="clickTab(item)" class="br1"  v-for="(item,index1) in i.children" :key="index1" :index="item.router">
                                                                <div slot="title" class="menu-item ">
                                                                        <i :class="item.icon" style="color: #000000e6;"></i>
                                                                        <span>{{item.label}}</span> 
                                                                        <span @click.stop="updateMenuItem(item,'item')" class="add-btn-menu">
                                                                                <i class="el-icon-edit"></i>
                                                                        </span>
                                                                </div>
                                                        </el-menu-item>
                                                </el-submenu>
                                        </template>
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
                        <transition enter-active-class="animateflipInX" >
                                <div @click="editIndexPage" v-show="indexTab.id" class="editpage-btn">
                                        <div class="left">
                                                <img src="./img/edit.png" alt="">
                                        </div>
                                        <div class="right">
                                                <div class="top">
                                                        编辑当前界面
                                                </div>
                                                <div class="bottom">
                                                        在页面编辑器中编辑
                                                </div>
                                        </div>
                                </div>
                        </transition>
                        <div class="row-btn">全局axios设置</div>
                        <div class="row-btn">全局页面配置</div>
                        <div class="row-btn">生命周期-页面载入</div>
                        <div class="row-btn">生命周期-加载完成</div>
                        <div class="row-btn">生命周期-销毁页面</div>
                </div>
        </div>
        <!-- 增加节点的窗口 -->
        <el-dialog title="节点信息" width="460px" append-to-body top="26vh" custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="additem.visibleitem">
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
                                <el-button @click="additem.visibleitem = false">取消</el-button>
                                <el-button type="primary" @click="submitAdditem({type: '0',id: '',parentid: ''})">提交</el-button>
                                </div>
                        </el-form-item>
                </el-form>
                </div>
        </el-dialog>
        <!-- 增加文件夹的窗口 -->
        <el-dialog title="组名称" width="460px" append-to-body top="26vh" custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="additem.visiblefold">
                <div>
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
                                <el-button @click="additem.visiblefold = false;">取消</el-button>
                                <el-button type="primary" @click="submitAdditem({type: '1',id: '',parentid: ''})">提交</el-button>
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
                                        visiblefold: false,
                                        visibleitem: false,
                                        label: '',
                                        router: '',
                                        icon: 'el-icon-connection',
                                        parentid: '',
                                        id: ''
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
                                indexTab: {},
                                scrollIcon: false,           //tabs滚动条按钮是否显示
                        }
                },
                watch: {
                },
                computed: {
                        ...mapState([])
                },
                methods: {
                        clickPriview(){                         //点击预览
                                window.open('./productor/')
                        },
                        editIndexPage(){
                                window.open(location.origin+location.pathname+'#/pageeditor?pageid='+this.indexTab.id)
                                // this.$router.push('/pageeditor?pageid='+this.indexTab.id)
                        },
                        initMenuForm(){
                                this.additem.id='';
                                this.additem.parentid =''      
                                this.additem.router =''      
                                this.additem.label =''     
                                this.additem.icon ='el-icon-connection'     
                        },
                        async submitAdditem({type}){           //提交增加节点
                                let res = await axios.post(this.$config.urlh+'/NEWKP/DEV/SaveMenu',
                                        `id=${this.additem.id}&router=${this.additem.router}&iscontainer=${type}&label=${this.additem.label}&icon=${this.additem.icon}&parentid=${this.additem.parentid}`)
                                console.log(res);
                                await this.initRoutes();
                                if(type=='0'){
                                        this.additem.visibleitem = false
                                }else{
                                        this.additem.visiblefold = false;
                                }
                        },
                        clickAdditem(){                              //增加节点
                                this.initMenuForm();
                                this.additem.visibleitem = true;
                        },
                        updateMenuItem(item,type){                   //增加节点
                                for(let i in this.additem){
                                        if(i!='visiblefold'&&i!='visibleitem'){
                                                this.additem[i]=this.$base.formatUndefined(item[i]);
                                        }
                                }
                                item.id = item.id
                                if(type=='item'){
                                        this.additem.visibleitem = true;
                                }else{
                                        this.additem.visibleitem = true;
                                }
                        },
                        clickAddfold(item){            //增加菜单
                                this.initMenuForm();
                                this.additem.parentid = item.id;
                                this.additem.visiblefold = true;
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
                                this.indexTab = tab;
                                // return
                                this.$router.push(tab.router+'?id='+tab.id)
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
                        changeZd(row){                         //接口取数完成进行字段的转换
                                for(let item of row){
                                        item.id = item.ID;
                                        item.label = item.CATPTION;
                                        item.router = item.ROUTER;
                                        item.icon = item.ICON
                                        item.iscontainer = item.ISCONTAINER
                                        item.children = item.CHILD
                                        item.parentid = item.SJID;
                                        if(item.CHILD&&item.CHILD.length!=0){
                                                this.changeZd(item.CHILD);
                                        }
                                }
                        },
                        async initRoutes(){           //初始化路由参数
                                let res = await axios.post(this.$config.urlh+ '/NEWKP/DEV/GetMenu')
                                if(res.Result=='1'){
                                        this.changeZd(res.Rows);
                                        this.menuData = res.Rows;
                                }else{
                                        this.$alert('获取路由信息失败'+ res.Message);
                                }
                                for(let item of this.menuData){
                                        if(item.ISCONTAINER=='1'){
                                                for(let itemc of item.children){
                                                        const routeObj = {
                                                            path: '/menueditor/'+itemc.router, // 这里要把父路由的路径也带上
                                                            name: itemc.router,
                                                            meta: {  },
                                                            component: () =>  import('../templateView/index.vue')
                                                        }
                                                        this.$router.addRoute('menueditor',routeObj)
                                                }
                                        }else{
                                                const routeObj = {
                                                    path: '/menueditor/'+item.router, // 这里要把父路由的路径也带上
                                                    name: item.router,
                                                    meta: {  },
                                                    component: () =>  import('../templateView/index.vue')
                                                }
                                                this.$router.addRoute('menueditor',routeObj)
                                        }
                                }
                        },
                },
                async created(){
                        window.mode= 'production'
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