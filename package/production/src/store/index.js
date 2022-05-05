import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)

const store = new vuex.Store({
    state: {
            goodsList: [],                  //商品信息列表
            khList: [],                     //客户信息列表
            userInfo: {},                   //用户信息
            zdList: [],                   //终端列表
            indexZD: {},                //当前终端信息
            fplxList: [],                   //当前公司的发票种类
            showTabs: false,                //顶部的tabs状态
            config: {},                   //总配置文件
            UserInfo: {},                 //用户配置信息
            TYPE: "",                 //进入方式
            dsDpList: [],                 //电商店铺列表  
            allConfig: [],              //全部参数
            allMenu: [],              //全部参数
            allTree: [],              //全部树参数
            JSID: '0',              //管理员权限
    },
    mutations: {
            goodsList(state,data){            
                  state.goodsList=data;
            },
            khList(state,data){           
                  state.khList=data
            },
            zdList(state,data){           //设置终端列表
                  state.zdList=data
            },
            userInfo(state,data){
                  state.userInfo=data;
            },
            indexZD(state,data){
                  if(data.cpslws==undefined||data.cpslws==''){
                        data.cpslws=8
                  }else{
                        data.cpslws=Number(data.cpslws)
                  }
                  if(data.hsdjws==undefined||data.hsdjws==''){
                        data.hsdjws=2
                  }else{
                        data.hsdjws=Number(data.hsdjws)
                  }
                  if(data.bhsdjws==undefined||data.bhsdjws==''){
                        data.bhsdjws=8;
                  }else{
                        data.bhsdjws=Number(data.bhsdjws);
                  }
                  state.indexZD=data
            },
            fplxList(state,data){
                  state.fplxList=data
            },
            config(state,data){
                  state.config=data
            },
            UserInfo(state,data){
                  state.UserInfo=data
            },
            TYPE(state,data){
                  state.TYPE=data
            },
            dsDpList(state,data){
                  state.dsDpList=data
            }, 
            allConfig(state,data){
                  state.allConfig=data
            },
            allMenu(state,data){
                  state.allMenu=data
            },
            allTree(state,data){
                  state.allTree=data
            },
            JSID(state,data){
                  state.JSID=data
            }
    }
})

export default store