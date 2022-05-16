<template>
  <div class="my-tab-container">
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
</template>

<script>
export default {
    props: ['tabsData'],
    data(){
        return{
            scrollIcon: false,           //tabs滚动条按钮是否显示
        }
    },
    model: {
            event: 'change',
            prop: 'tabsData'
    },
    methods: {
            closeTab(tab){             //关闭单个tab
                    this.tabsData.list=this.tabsData.list.filter(item=>item.router!=tab.router)
                    if(this.tabsData.list[this.tabsData.list.length-1].router!==this.$route.path.replace('/','')){
                            this.$router.push(this.tabsData.list[this.tabsData.list.length-1].router)
                    }
                    this.$nextTick(()=>{
                            this.eventTabContainer()
                    })
            },
            scrollTo(type){            //点击滚动条
                    if(type=='left'){
                            this.$emit('leftEvent')
                            this.$nextTick(()=>{
                                    document.getElementById('scroll-con').scrollTo({
                                            left: document.getElementById('scroll-con').scrollLeft-500,
                                            behavior: 'smooth'
                                    })
                            })
                    }else{
                            this.$emit('rightEvent')
                            this.$nextTick(()=>{
                                    document.getElementById('scroll-con').scrollTo({
                                            left: document.getElementById('scroll-con').scrollLeft+500,
                                            behavior: 'smooth'
                                    })
                            })
                    }
            },
            clickTab(tab){          //点击tab，进行跳转操作
                    if(this.$route.path.replace('/home/dashboard/home','')==tab.router){
                            return
                    }
                    this.tabsData.indexTab = tab.router;
                    this.tabsData.indexId = tab.id;
                    localStorage.setItem(locName + 'tabData',JSON.stringify(this.tabsData));
                    this.$router.push(tab.router+'?id='+tab.id)
            },
            eventTabContainer(){    //监听就tabsContainer的溢出事件来控制是否显示i滚动按钮,todo: 未进行优化
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
                                          this.eventTabContainer();
                                    }, 200);
                            }
                    },220)
            },
    },
    mounted(){
            this.$nextTick(()=>{
                    this.eventTabContainer();
            })
    }
}
</script>

<style lang="less" scoped>

.my-tab-container{     
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
        .index-tab{
            background: #1e78ff !important;
            color: #FFE !important;
            box-shadow: 0 0 5px -2px #293551 !important;
        }
}

</style>