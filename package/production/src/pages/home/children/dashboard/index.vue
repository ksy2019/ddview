<template>
  <div class="home-container">
        <!-- //主页的主要内容 -->
        <div  class="home-body">
                      <!-- //展开按钮 -->
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
                                      <my-tab v-model="tabsData"  />
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
import {mapState} from 'vuex';
import interFace from '@/http/interFace';
import {Base64} from 'js-base64'
import myTab from '@/components/my-tab'
export default {
                data(){
                        return{
                                menuListEP: [], 
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
                        }
                },
                components: {
                        myTab
                },
                watch: {
                        isCollpse(){
                                localStorage.setItem('wdsk-isCollpseGS',this.isCollpse)
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
                        ...mapState(['menuData'])
                },
                methods: {
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
                                this.tabsData.indexTab = tab.router;
                                this.tabsData.indexId = tab.id;
                                this.$router.push(tab.router+'?id='+tab.id)
                                localStorage.setItem(locName + 'tabData',JSON.stringify(this.tabsData));
                                for(let item of this.tabsData.list){
                                        if(item.id == tab.id){
                                                return
                                        }
                                }
                                this.tabsData.list.push(tab);
                                this.$nextTick(()=>{
                                        this.$refs[this.tabsData.indexTab][0].scrollIntoView({behavior: 'smooth'});
                                })
                        },
                        checkUrl(){
                                if(this.$route.path=='/home/dashboard/'){
                                        let firstRouter = this.menuData[0]
                                        this.$router.push(firstRouter.router+'?id=' + firstRouter.id);
                                }
                        }
                },
                async created(){
                        this.checkUrl();
                        let locTab = localStorage.getItem(locName+'tabData');
                        if(locTab){
                                this.tabsData = JSON.parse(locTab);
                                this.$router.push(this.tabsData.indexTab+'?id='+this.tabsData.indexId)
                        }
                        this.loadingOk=true;
                },
                mounted(){
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