<template>
    <!-- //btn-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件名称</span>
            {{config.id}}
        </div>
        <div  @click="openItemSet" class="set-row-between nos">
            <span class="nos color1">节点设置</span>
            <span class="primary">所有节点</span>
        </div>
        <div class="items-show-con">
            <div class="item-row" v-for="item in config.items" :key="item.id">
                <div class="item-name">{{item.label}}</div>
                <div>
                    <span @click="editJs(item,'onClick')" class="item-event nos primary mr10">点击事件</span>
                    <span @click="openBtnSet(item)" class="item-event nos primary">按钮设置</span>
                </div>
            </div>
        </div>
        <!-- //节点设置窗口 -->
        <el-drawer
        :visible.sync="showItemSet"
        :show-close="false"
        :withHeader="false"
        size="62%"
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
            <vxe-table 
                border
                :data="config.items"
                ref="table"
                style="width: 100%"
                :checkbox-config="{highlight: true,range: true}"
                stripe
                >
                <vxe-table-column align="center" title="位置" width="60">
		        	<template v-slot>
		        		<div class="drag-btn">
		        			<i class="vxe-icon--menu"></i>
		        		</div>
		        	</template> 
		        </vxe-table-column>
                <vxe-table-column
                type="checkbox"
                align="center"
                width="55">
                </vxe-table-column>
                <vxe-table-column
                title="序号"
                type="seq"
                align="center"
                width="55">
                </vxe-table-column>
                <vxe-table-column
                field="label"
                header-align="center"
                align="left"
                title="按钮名称"
                min-width="120">
                </vxe-table-column>
                <vxe-table-column
                field="icon"
                header-align="center"
                align="center"
                title="按钮图标"
                width="85">
                    <div  slot-scope="slot" :class="slot.row.icon">{{slot.row.icon?'':'- - -'}}</div>
                </vxe-table-column>
                <vxe-table-column
                field="color"
                title="颜色"
                header-align="center"
                align="center"
                min-width="120">
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                title="子按钮">
                    <div  class="primary nos" @click="openchild(slot.row)" slot-scope="slot">{{slot.row.children.length}}个</div>
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                min-width="120px"
                title="事件">
                <div slot-scope="slot" class="flex" style="justify-content: center;">
                    <div @click="clickEdit(slot.row)" class="main-color mr10 nos">修改</div>
                    <div @click="editJs(slot.row,'onClick')" class="main-color nos">点击事件</div>
                </div>
                </vxe-table-column>
            </vxe-table>
        </el-drawer>
        <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
        <!-- //单个按钮的属性编辑器 -->
        <el-dialog v-dialogDrag title="按钮设置"  :close-on-click-modal="false" width="320px" top="16vh"  custom-class="item-set-dialog" :visible.sync="showBtnSet">
                <div class="form-con"  style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="indexBtn" label-width="86px">
                                <el-form-item  label="按钮名称">
                                        <el-input v-model="indexBtn.label"></el-input>
                                </el-form-item>
                                <el-form-item  label="按钮图标">
                                        <select-icon v-model="indexBtn.icon"></select-icon>
                                </el-form-item>
                                <el-form-item  label="按钮颜色">
                                        <el-select v-model="indexBtn.color">
                                            <el-option label="蓝色" value="primary"></el-option>
                                            <el-option label="橙色" value="warning"></el-option>
                                            <el-option label="红色" value="danger"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item  label="点击事件">
                                        <div @click="editJs(indexBtn,'onClick')"  class="main-color nos">修改事件</div>
                                </el-form-item> 
                                <el-form-item  label="子按钮设置">
                                        <div @click="openchild(indexBtn)" class="main-color nos">打开设置</div>
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
        <!-- //子节点设置 -->
        <el-drawer
        :visible.sync="showSelectBtn"
        :show-close="false"
        :withHeader="false"
        size="62%"
        >
            <div class="drawer-header">
                <div>
                    <span class="nos" @click="openItemSet">子按钮设置</span>
                </div>
                <div>
                    <span @click="addItem" class="nos mr10">新增</span>
                    <span @click="delItem" class="nos">删除</span>
                </div>
            </div>
            <vxe-table 
                border
                :data="indexChild"
                ref="table2"
                style="width: 100%"
                :checkbox-config="{highlight: true,range: true}"
                stripe
                >
                <vxe-table-column align="center" title="位置" width="60">
		        	<template v-slot>
		        		<div class="drag-btn2">
		        			<i class="vxe-icon--menu"></i>
		        		</div>
		        	</template> 
		        </vxe-table-column>
                <vxe-table-column
                type="checkbox"
                align="center"
                width="55">
                </vxe-table-column>
                <vxe-table-column
                title="序号"
                type="seq"
                align="center"
                width="55">
                </vxe-table-column>
                <vxe-table-column
                field="label"
                header-align="center"
                align="left"
                title="按钮名称"
                min-width="120">
                </vxe-table-column>
                <vxe-table-column
                field="icon"
                header-align="center"
                align="center"
                title="按钮图标"
                width="85">
                    <div slot-scope="slot" :class="slot.row.icon">{{slot.row.icon?'':'- - -'}}</div>
                </vxe-table-column>
                <vxe-table-column
                field="color"
                title="颜色"
                header-align="center"
                align="center"
                min-width="120">
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                min-width="120px"
                title="事件">
                <div slot-scope="slot" class="flex" style="justify-content: center;">
                    <div @click="clickEdit(slot.row)" class="main-color mr10 nos">修改</div>
                    <div @click="editJs(slot.row,'onClick')" class="main-color nos">点击事件</div>
                </div>
                </vxe-table-column>
            </vxe-table>
        </el-drawer>
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
            indexChild: [],                 //当前元素的子节点
            showSelectBtn: false,           //是否显示更多按钮 
            showItemSet: false,             //是否显示子节点
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            showBtnSet: false,              //是否显示按钮设置
            indexBtn: {},                   //保存当前编辑的按钮的指针
            cacheBtn: {},                   //copy的对象，用于编辑上
            sourceBtn: {                    //初始控件的值
                "label": "发票作废",
                "onClick": "",
                "color": "primary",
                "icon": "el-icon-medal",
                "id": this.$base.guid(),
                "children": [],
            },
            addType: '',
            showJavaScriptEdit: false,      //是否显示javaScript编辑器
        }
    },
    methods: {
        openchild(row){                //打开子节点设置
            this.indexChild = row.children;
            this.showSelectBtn = true;
            this.$globjs.initSortable.call(this,{className: 'drag-btn2',data: row,key:'children',tableRef: 'table2'});
        },
        clickEdit(row){                //点击按钮的修改事件
            this.indexBtn = row;           
            this.showBtnSet = true;
        },
        openItemSet(){              //点击全部节点设置
            this.showItemSet=true;
            this.$globjs.initSortable.call(this,{className: 'drag-btn',data: this.config,key:'items',tableRef: 'table'});
        },
        openBtnSet(btn){            //打开按钮设置
            this.addType = '';
            this.indexBtn = this.$base.deepCopy(btn);
            this.cacheBtn=btn
            this.showBtnSet = true;
        },
        saveBtn(){                  //保存按钮设置
            if(this.addType == 'add'){
                this.config.items.push(this.cacheBtn)
            }else{
                for(let item in this.cacheBtn){
                    this.cacheBtn[item]=this.indexBtn[item]
                }
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
            this.addType = 'add';
            this.indexBtn = this.$base.deepCopy(this.sourceBtn);
            this.indexBtn.id = this.$base.guid();
            this.cacheBtn = this.indexBtn;
            this.showBtnSet = true;
        },
        delItem(){                  //删除节点
            let checks=[],list = []
            for(let item of this.$refs.table.selection){
              checks.push(item._XID)
            }
            for(let item of this.config.items){
                if(!checks.includes(item._XID)){
                    list.push(item)
                }
            }
            this.config.items=list;
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