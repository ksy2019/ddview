import vuex from 'vuex'
import vue from 'vue'
vue.use(vuex)
const store = new vuex.Store({
    state: { 
            drawingList: [],             ///当前使用的元素列表
    },
    mutations: {
        drawingList(state,data){
                state.drawingList=data;
        },
    }
})

export default store