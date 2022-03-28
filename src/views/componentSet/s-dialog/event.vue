<template>
    <!-- //table-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件名称</span>
            {{config.id}}
        </div>
        <div  @click="openItemSet" class="set-row-between nos">
            <span class="nos color1">节点设置</span>
            <span class="primary">所有节点</span>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">是否显示页脚部分</span>
            <div>
                <el-switch v-model="config.showFooter"></el-switch>
            </div>
        </div>
        <div class="items-show-con">
            <div class="item-row" v-for="item in config.items" :key="item.id">
                <div class="item-name">{{item.label}}</div>
                <div >
                    <span @click="editJs(item,'onClick')" class="item-event nos primary mr10">点击事件</span>
                    <span @click="openBtnSet(item)" class="item-event nos primary">按钮设置</span>
                </div>
            </div>
        </div>
        <!-- //子节点设置窗口 -->
        <el-drawer
        :visible.sync="showItemSet"
        :show-close="false"
        :withHeader="false"
        size="75%"
        >
            <div class="drawer-header">
                <div>
                    <span class="nos" @click="openItemSet">节点设置</span>
                </div>
                <div>
                    <span @click="addItem" class="nos mr10">新增</span>
                    <span @click="delItem" class="nos">删除</span>
                </div>
            </div>
            <el-table 
                border
                :data="config.columns"
                style="width: 100%"
                stripe
                >
                <el-table-column
                type="selection"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                prop="label"
                label="序号"
                type="index"
                align="center"
                width="55">
                </el-table-column>
                <el-table-column
                prop="label"
                header-align="center"
                align="left"
                label="列名"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="field"
                label="字段"
                header-align="center"
                align="left"
                min-width="90">
                </el-table-column>
                <el-table-column 
                header-align="center"
                align="left"
                label="类型"
                min-width="100">
                    <div slot-scope="slot">{{colType[slot.row.type]}}</div>
                </el-table-column>
                <el-table-column 
                header-align="center"
                align="left"
                label="头剧中"
                prop="headalign"
                min-width="100">
                </el-table-column>
                <el-table-column 
                header-align="center"
                align="left"
                prop="align"
                label="行居中"
                min-width="100">
                </el-table-column>
                <el-table-column 
                header-align="center"
                prop="color"
                align="left"
                label="颜色"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="main"
                header-align="center"
                align="center"
                min-width="120px"
                label="操作">
                    <div slot-scope="slot" @click="openColSet(slot.row)" class="main-color nos">修改</div>
                </el-table-column>
            </el-table>
        </el-drawer>
        <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
        <!-- //单个按钮的属性编辑器 -->
        <el-dialog v-dialogDrag title="按钮设置"  :close-on-click-modal="false" width="320px" top="27vh"  custom-class="item-set-dialog" :visible.sync="showBtnSet">
                <div class="form-con" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="indexOb" label-width="86px" >
                                <el-form-item  label="列头名称">
                                        <el-input v-model="indexOb.label"></el-input>
                                </el-form-item>
                                <el-form-item  label="对应字段">
                                        <el-input v-model="indexOb.field"></el-input>
                                </el-form-item>
                                <el-form-item  label="表头居中">
                                        <el-input v-model="indexOb.headalign"></el-input>
                                </el-form-item>
                                <el-form-item  label="表体剧中">
                                        <el-input v-model="indexOb.align"></el-input>
                                </el-form-item>
                                 <el-form-item  label="类颜色">
                                        <el-select v-model="indexOb.color">
                                            <el-option label="蓝色" value="primary"></el-option>
                                            <el-option label="橙色" value="warning"></el-option>
                                            <el-option label="红色" value="danger"></el-option>
                                        </el-select>
                                </el-form-item> 
                        </el-form>
                </div>
                <div class="flex-bet mt20" slot="footer">
                        <div class="left">
                        </div>
                        <div class="right">
                                <el-button style="margin-right: 10px;" @click="showBtnSet=false">取消</el-button>
                                <el-button type="primary" @click="saveBtn">确定</el-button>
                        </div>
                </div>
        </el-dialog>
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
        saveBtn(){                  //保存按钮设置
            for(let item in this.cacheOb){
                this.cacheOb[item]=this.indexOb[item]
            }
            this.showBtnSet=false;
        },
        addEnv(row){                //点击添加事件
            console.log(row)
        },
        editJs(ob,key){                   //点击编辑js代码
                this.javascript.ob=ob;
                this.javascript.key=key;
                this.showJavaScriptEdit=true;
        }, 
        addItem(){                  //增加节点；上传发票数据，
            let a = this.config.items;
            a.push({
                "label": "测试按钮",
                "color": "primary",
                "id": this.$mybase.guid(),
                "children": []
            })
            this.$emit("changeConfig",a);
        },
        delItem(){                  //删除节点
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