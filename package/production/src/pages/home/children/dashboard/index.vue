<template>
  <div class="home-container">
        <!-- //主页的主要内容 -->
        <div  class="home-body">
                      <!-- //过渡菜单 -->
                      <transition enter-active-class="filpin" leave-active-class="filpout">
                              <div @click="isCollpse=!isCollpse" v-show="!isCollpse" class="showColl nos">
                                      <i  class="el-icon-caret-right"></i>
                              </div>
                      </transition>
                      <!-- //左菜单 -->
                      <div class="home-left-container" :style="isCollpse?'margin-right:10px;width:190px;':'margin-right:0;width:0px;'">
                              <div class="home-body-left scrollbar">
                                        <el-menu
                                        class="br1 my-elmenu"
                                        unique-opened
                                        :default-active="tabsData.indexTab"
                                        >
                                        <template v-for="(i) in menuData">
                                                <el-menu-item @click="clickTab(i)" v-if="i.iscontainer=='0'" :key="i.router" :index="i.router">
                                                        <div class="menu-item">
                                                                <i style="color:#000000e6;" :class="i.icon"></i> {{i.label}}
                                                        </div>
                                                </el-menu-item>
                                                <el-submenu v-if="i.iscontainer=='1'"  :key="i.router" :index="i.router">
                                                        <div slot="title" class="menu-item">
                                                                <i :class="i.icon" style="color: #000000e6;"></i>
                                                                <span>{{i.label}}</span>
                                                        </div>
                                                        <!-- //第二层子节点 -->
                                                        <el-menu-item @click="clickTab(item)" class="br1"  v-for="(item,index1) in i.children" :key="index1" :index="item.router">
                                                                <div slot="title" class="menu-item ">
                                                                        <i :class="item.icon" style="color: #000000e6;"></i>
                                                                        <span>{{item.label}}</span> 
                                                                </div>
                                                        </el-menu-item>
                                                </el-submenu>
                                        </template>
                                        </el-menu>
                                      
                                        <div  @click="isCollpse=!isCollpse" v-show="isCollpse" class="sq-btn nos">
                                                <span type="primary"><i class="el-icon-caret-left"></i> 收起</span>
                                        </div>
                              </div>
                      </div>
                      <!-- //右边的内容 -->
                      <div v-loading="!loadingOk" class="home-body-right">
                              <div v-show="showTabs" class="sh-tabs-container">
                                      <my-tab :tabsData="tabsData"  />
                              </div>
                              <!-- <div :style="{'transform': showTabs?'rotateX(0deg) translateY(-36px)':'rotate(180deg) translateY(18px)'}" @click="showTabs=!showTabs" class="hide-btn">
                                        <i class="el-icon-arrow-down"></i>
                                </div> -->
                              <div  v-if="loadingOk" class="router-con" :style="{'height': showTabs? 'calc(100% - 36px )':'100%'}">
                                        <keep-alive> 
                                                <router-view  :key="$route.path.replace('/home/dashboard/','')"></router-view> 
                                        </keep-alive>
                              </div>
                      </div>
        </div> 
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import interFace from '@/http/interFace';
import {Base64} from 'js-base64'
import myTab from '@/components/my-tab'
export default {
                data(){
                        return{
                                loadingRef: false,
                                showHelp: false,             //是否显示帮助文档
                                menuData: [],
                                editMenuData:[],             //编辑菜单的菜单
                                showEditMenu: false,         //是否显示编辑菜单
                                DQZD: "",   
                                menuListEP:[], 
                                isCollpse: true,             //是否折叠左侧
                                loadingOk: false,            //是否加载完成;加载完成之后再载入界面     
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
                                defaultUserInfo: {           //默认用户信息,用于写入localstorage
                                        hideScreenDialog: false,
                                },
                        }
                },
                components: {
                        myTab
                },
                watch: {
                        isCollpse(){
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
                                        //监听当前路由
                                        if(!this.showTabs)return;
                                        if(this.tabsData.list.filter(tab=>{
                                                if(tab.router==data.path.replace('/home/dashboard/','')){
                                                        return  tab
                                                }
                                        }).length===0){
                                                for(let x of this.menuListEP){
                                                        if(x.rou22ter===this.$route.path.replace('/home/dashboard/','')){
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
                async sortUrl(url){
                        let res  = await axios.post('https://51dzfp.cn/WD/COMMON/SortURL',"URL=" +encodeURIComponent(url))
                        return res
                },
                computed: {
                        ...mapState(['zdList','indexZD','config','UserInfo','TYPE','allConfig','allMenu'])
                },
                methods: {
                        nodeDrop(Bnode,Node,type){ //拖动事件
                                if(Node.childNodes.length==0&&Node.level=='1'&&type=='inner'){
                                        return true
                                }
                                if(type==='inner'){
                                        return false
                                } 
                                if(Bnode.level!=Node.level){
                                        return false
                                } 
                                return type    
                        },  
                        changeClick(node,data){    //树形框的选择框的选中事件，主要用全选功能
                                if(node.level==1){
                                        data.children.forEach(item=>{
                                                item['show']=data.show 
                                        }) 
                                } 
                        },
                        getMenuConfig(){           //获取菜单config
                                interFace.local("LX=GETCONFIGTGKP").then(res=>{
                                        if (res.Result=='1'){
                                                this.$store.commit("config",JSON.parse(Base64.decode(res.Data.replace(/ /g,'+'))))
                                                this.setMenu()
                                        }
                                })
                        },
                        setMenu(){                 //设置菜单信息              
                                // this.config.navMenu=JSON.parse(JSON.stringify(this.oldMenu))
                                this.config.navMenu.forEach(item=>{
                                //先添加父级菜单
                                        let index=0
                                        if(item.mode=='createParentNode'){
                                                for(let row of this.menuData){
                                                        if(row.router==item.appendNode){
                                                                if(item.appendType=='append'){
                                                                        this.menuData.splice(index,0,JSON.parse(JSON.stringify(item.body)))
                                                                }else
                                                                if(item.appendType=='preappend'){
                                                                        this.menuData.splice(index+1,0,JSON.parse(JSON.stringify(item.body)))
                                                                }
                                                                break;
                                                        }
                                                        index++
                                                }
                                        }else{
                                //之后添加子菜单
                                                for(let row of this.menuData){
                                                        if(row.router==item.parent){
                                                                if(item.appendNode==''){
                                                                        row.children.push(item.body)
                                                                }else{
                                                                        let x=0;
                                                                        for(let c of row.children){
                                                                                if(c.router===item.appendNode){
                                                                                        if(item.appendType=='append'){
                                                                                                row.children.splice(x,0,JSON.parse(JSON.stringify(item.body)) )
                                                                                        }else
                                                                                        if(item.appendType=='preappend'){
                                                                                                row.children.splice(x+1,0,JSON.parse(JSON.stringify(item.body)) )
                                                                                        }
                                                                                        break
                                                                                }
                                                                                x++
                                                                        }
                                                                }
                                                        }
                                                }
                                        }
                                })
                        },
                        createMenuEP(){
                                this.menuData.forEach(item=>{
                                        if(item.children){
                                                this.menuListEP.push(item)
                                                item.children.forEach(chi=>{
                                                        this.menuListEP.push(chi)
                                                })
                                        }else{
                                                this.menuListEP.push(item)
                                        }
                                })
                        },
                        clickTab(tab){          //点击tab
                                this.indexTab = tab;
                                // return
                                this.$router.push(tab.router+'?id='+tab.id)
                        },
                        routerMapper(row){                         //映射服务器字段
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
                                        this.routerMapper(res.Rows)
                                        this.menuData = res.Rows;
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
                                                            component: () =>  import('./children/template/index.vue')
                                                        }
                                                        this.$router.addRoute('dashboard',routeObj)
                                                }
                                        }else{
                                                const routeObj = {
                                                    path: '/home/dashboard/'+item.router,
                                                    name: item.router,
                                                    meta: {  },
                                                    component: () =>  import('./children/template/index.vue')
                                                }
                                                this.$router.addRoute('dashboard',routeObj)
                                        }
                                }
                        },
                },
                async created(){
                        this.initRoutes()
                        if(localStorage.getItem("wdsk-mytabs")!==null){
                                this.tabsData=JSON.parse(localStorage.getItem("wdsk-mytabs"));
                                this.tabsData.indexTab = this.$route.path.replace('/home/dashboard/','')
                        }
                        //获取菜单配置
                        // this.getMenuConfig();
                },
                mounted(){
                        console.log("dashborder载入成功")
                        //获取本地配置信息提交之store
                        this.loadingOk=true
                        let myUserInfo
                        try{
                                myUserInfo=JSON.parse(localStorage.getItem("wdsk-UserInfo"))
                        }catch(err){
                                localStorage.setItem("wdsk-UserInfo",JSON.stringify(this.defaultUserInfo));
                                myUserInfo=this.defaultUserInfo;
                        }
                        if(!myUserInfo)localStorage.setItem("wdsk-UserInfo",JSON.stringify(this.defaultUserInfo));
                        this.$store.commit("UserInfo",myUserInfo===null?this.defaultUserInfo : myUserInfo);
                        this.$nextTick(()=>{
                                if(location.href.match(/#\/.*/).toString().substr(2)==''){
                                        this.$router.push('index');
                                }
                        })
                }, 
}
</script>

<style lang="less" scoped>
.router-leaver{
        // animation: fadeOutDown .32s;
}
.router-enter{
        animation: fadeInRight .32s;
}  
.index-tab{
    background: #1e78ff !important;
    color: #FFE !important;
    box-shadow: 0 0 5px -2px #293551 !important;
}
.hide-btn{
        display: inline-block;
        position: absolute;
        background: blue;
        height: 18px;
        right: 32px;
        line-height: 18px;
        padding: 0 12px;
        color: #fff;
        cursor: pointer;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        transition: all .32s;
}
*{
        font-size: 9pt;
}
.blue{
        color: blue;
}
.dqzdmc{
        font-size: .86rem;
        font-weight: 600; 
        padding: 0 25px 0 15px;
        border-radius: 4px;
        color: #FF8400;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ededed;
}
.dqzd-container{
        .kpjh-con{
                position: relative;
                left: -22px;
                background: #e4ffe4;
                border-radius: 50%;
                color: #43e141; 
                height: 15px;
                width: 15px;
                text-align: center; 
                font-weight: 600;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
        } 
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
                                        &>.help-con{
                                                cursor: pointer;
                                                display: flex;
                                                align-items: center;
                                                margin-right: 12px;
                                                .help-img{
                                                        height: 15px;
                                                        margin-right: 2px;
                                                }
                                        }
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
                        height: calc(100vh - 62px);
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
                                                bottom: 12px;
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

.showColl{
         & > i{
                color:#fff;
                font-size: 1.2rem;
                transition: transform .68s;
        }
        position: fixed;
        z-index: 999;
        top: 50%;
        margin-top: -70px;
        left: -8px;
        background: rgb(30, 120, 255);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        height: 36px;
        width: 30px;
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
/deep/.help{
        border-radius: 8px;
        .search-con{
                display: flex;
                margin: 15px 0;
                border-radius: 8px;
                border: 1px solid #ededed;
                padding: 0 20px;
                input{
                        line-height: 36px;
                        height: 36px;
                        outline: none;
                        border: none;
                        flex: 1;
                }
                span{
                        line-height: 36px;
                        height: 36px;
                }
        }
        .el-button{
                border-radius: 6px;
        }
        .el-dialog__close{
                position: relative;
                top: 15px;
        }
        .el-dialog__header{
                padding-top: 7px !important;
        }
        .el-dialog__body{
                height: 420px;
                padding: 0 65px;
        }
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