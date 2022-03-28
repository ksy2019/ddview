<template>
    <!-- //table-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件名称</span>
            {{config.id}}
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">点击搜索</span>
            <span @click="editJs" class="primary">编辑功能</span>
        </div>
        <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
    </div>
</template>

<script>
import javascriptDrawer from '../../index/JavaScriptDrawer.vue';
export default {
    props: {
        config: Object,
    },
    model: {                                //自定义Model
        prop: 'config',
        event: 'changeConfig'
    },
    components: {
        javascriptDrawer
    },
    data(){
        return {
            showItemSet: false,             //是否显示子节点
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            showBtnSet: false,              //是否显示按钮设置
            indexOb: {},                    //保存当前编辑的按钮的指针
            cacheOb: {},                    //copy的对象，用于编辑上
            showJavaScriptEdit: false,      //是否显示javaScript编辑器
            colType: {                      //列类型
                'seq': '序号列',
                'checkbox': '选择列',
                '': '---',
            }
        }
    },
    methods: {
        editJs(ob,key){                   //点击编辑js代码
                this.javascript.ob=ob;
                this.javascript.key=key;
                this.showJavaScriptEdit=true;
        }, 
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/global.scss";
.items-show-con{
    padding: 0 12px;
    .item-row{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid #ededed;
        .item-name{
            color: gray;
        }
    }
}
</style>