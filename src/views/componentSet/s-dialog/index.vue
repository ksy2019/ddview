<template>
    <!-- //table-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件引用</span>
            <span  @click="$base.copyT('this.$'+config.id)" class="mr10 primary nos">${{config.id}}</span>
        </div> 
        <div class="set-row-between nos">
            <span class="nos color1">弹窗标题</span>
            <div>
                <el-input v-model="config.title"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">窗体宽度</span>
            <div>
                <el-input v-model="config.width"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">顶部距离</span>
            <div>
                <el-input v-model="config.top"></el-input>
            </div>
        </div>
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
            indexOb: {},                   //保存当前编辑的按钮的指针
            cacheOb: {},                   //copy的对象，用于编辑上
            showJavaScriptEdit: false,      //是否显示javaScript编辑器
            colType: {                      //列类型
                'seq': '序号列',
                'checkbox': '选择列',
                '': '---',
            }
        }
    },
    methods: {
        openItemSet(){                      //点击全部节点设置
            this.showItemSet=true;
        },
        openColSet(btn){                    //打开按钮设置
            this.indexOb = this.$base.deepCopy(btn);
            this.cacheOb=btn
            this.showBtnSet = true;
        },
        saveBtn(){                          //保存按钮设置
            for(let item in this.cacheOb){
                this.cacheOb[item]=this.indexOb[item]
            }
            this.showBtnSet=false;
        },
        addEnv(row){                        //点击添加事件
            console.log(row)
        },
        editJs(ob,key){                     //点击编辑js代码
                this.javascript.ob=ob;
                this.javascript.key=key;
                this.showJavaScriptEdit=true;
        }, 
        addItem(){                          //增加节点；上传发票数据，
            let a = this.config.items;
            a.push({
                "label": "测试按钮",
                "color": "primary",
                "id": this.$mybase.guid(),
                "children": []
            })
            this.$emit("changeConfig",a);
        },
        delItem(){                          //删除节点
        }
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