import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)

const store = new vuex.Store({
    state: {
            config: {},             //配置项目
            menuData: [],           //菜单列表
    },
    mutations: {
            config(state,data){
                  state.config=data
            },
            menuData(state,data){
                  state.menuData=data
            },
    }
})

export default store