<template>
    <!-- //table-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件ID</span>
            {{config.id}}
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">接口设置</span>
            <div>
                <el-input v-model="config.url"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">显示标题</span>
            <div>
                    <el-switch v-model="config.showLabel"></el-switch>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">通讯方式</span>
            <div>
                    <el-select v-model="config.method">
                        <el-option label="get" value="get"></el-option>
                        <el-option label="post" value="post"></el-option>
                    </el-select>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">传参方式</span>
            <div>
                    <el-select v-model="config.formType">
                        <el-option label="form-urlencoded" value="form"></el-option>
                        <el-option label="json" value="json"></el-option>
                    </el-select>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">搜索文字</span>
            <div>
                    <el-input v-model="config.searchText"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">搜索图标</span>
            <div>
                    <select-icon v-model="config.serachIcon"></select-icon>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">关联table</span>
            <div>
                <el-select @focus="getTableList" v-model="config.table">
                    <el-option v-for="item in tableList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>
        </div>
        <div  @click="openItemSet" class="set-row-between nos">
            <span class="nos color1">节点设置</span>
            <span class="primary">所有节点</span>
        </div>
        <div class="set-row-between nos">
            <http-other-set v-model="config.other">
                <div class="main-color">ajax附加参数</div>
            </http-other-set>
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
            <div class="node-table-con">
                <vxe-table 
                    ref="table"
                    border
                    :checkbox-config="{highlight: true,range: true}"
                    :data="config.items"
                    style="width: 100%"
                    stripe
                    height="100%"
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
                    header-align="center"
                    :formatter="$base.formatter"
                    align="left"
                    title="控件类型"
                    width="78">
                        <div slot-scope="slot">{{inputType[slot.row.type]}}</div>
                    </vxe-table-column>
                    <vxe-table-column
                    field="label"
                    header-align="center"
                    :formatter="$base.formatter"
                    align="left"
                    title="标签名称"
                    width="100">
                    </vxe-table-column>
                    <vxe-table-column
                    field="width"
                    header-align="center"
                    :formatter="$base.formatter"
                    align="left"
                    title="宽度"
                    width="78">
                    </vxe-table-column>
                    <vxe-table-column
                    field="showLabel"
                    header-align="center"
                    :formatter="$base.formatter"
                    align="center"
                    title="显示标签"
                    width="78">
                    </vxe-table-column>
                    <vxe-table-column
                    field="field"
                    title="提示内容"
                    :formatter="$base.formatter"
                    header-align="center"
                    align="left"
                    min-width="90">
                    </vxe-table-column>
                    <vxe-table-column
                    field="value"
                    header-align="center"
                    :formatter="$base.formatter"
                    align="left"
                    title="对应字段"
                    min-width="100">
                    </vxe-table-column>
                    <vxe-table-column 
                    header-align="center"
                    align="left"
                    title="默认值"
                    :formatter="$base.formatter"
                    field="defaultValue"
                    min-width="100">
                    </vxe-table-column>
                    <vxe-table-column
                    field="main"
                    header-align="center"
                    align="center"
                    width="128"
                    title="操作">
                        <div slot-scope="slot" >
                            <span v-if="slot.row.type==='select'" class="main-color nos mr10" @click="openGetList(slot.row)" >数据设置</span>
                            <span  class="main-color nos" @click="openColSet(slot.row)" >修改</span>
                        </div>
                    </vxe-table-column>
                </vxe-table>
            </div>
            <div class="child-title">
                <div class="left">
                    <span>子节点设置</span>
                </div>
                <div class="right">
                    <span class="add-item-btn" @click="addItemMore">新增</span>
                    <span @click="delItemMore">删除</span>
                </div>
            </div>
            <vxe-table 
                ref="moreTable"
                border
                :checkbox-config="{highlight: true,range: true}"
                :data="config.more.items"
                style="width: 100%"
                stripe
                >
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
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                title="控件类型"
                width="78">
                    <div slot-scope="slot">{{inputType[slot.row.type]}}</div>
                </vxe-table-column>
                <vxe-table-column
                field="label"
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                title="标签名称"
                width="100">
                </vxe-table-column>
                <vxe-table-column
                field="width"
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                title="宽度"
                width="78">
                </vxe-table-column>
                <vxe-table-column
                field="showLabel"
                header-align="center"
                :formatter="$base.formatter"
                align="center"
                title="显示标签"
                width="78">
                </vxe-table-column>
                <vxe-table-column
                field="field"
                title="提示内容"
                :formatter="$base.formatter"
                header-align="center"
                align="left"
                min-width="90">
                </vxe-table-column>
                <vxe-table-column
                field="value"
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                title="对应字段"
                min-width="100">
                </vxe-table-column>
                <vxe-table-column 
                header-align="center"
                align="left"
                title="默认值"
                :formatter="$base.formatter"
                field="defaultValue"
                min-width="100">
                </vxe-table-column> 
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                width="78"
                title="操作">
                    <div slot-scope="slot" @click="openColSet(slot.row)" class="main-color nos">修改</div>
                </vxe-table-column>
            </vxe-table>
        </el-drawer>
    <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
    <!-- //单个按钮的属性编辑器 -->
        <el-dialog v-dialogDrag title="按钮设置"  :close-on-click-modal="false" width="320px" top="14vh"  custom-class="item-set-dialog" :visible.sync="showBtnSet">
                <div class="form-con" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="indexOb" label-width="86px" >
                                <el-form-item  label="控件类型">
                                        <el-select v-model="indexOb.type">
                                            <el-option v-for="(item,key) in inputType" :key="key" :label="item" :value="key"></el-option>
                                        </el-select>
                                </el-form-item> 
                                <el-form-item  label="标签名称">
                                        <el-input v-model="indexOb.label"></el-input>
                                </el-form-item>
                                <el-form-item v-if="typeof(indexOb.value)=='string'"  label="对应字段">
                                        <el-input v-model="indexOb.value"></el-input>
                                </el-form-item>
                                <div  v-if="indexOb.type === 'twoDate'" >
                                    <el-form-item  label="开始字段">
                                            <el-input v-model="indexOb.value[0]"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="结束字段">
                                            <el-input v-model="indexOb.value[1]"></el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item  label="提示内容">
                                        <el-input v-model="indexOb.placeholder"></el-input>
                                </el-form-item>
                                <el-form-item  label="控件宽度">
                                        <el-input v-model="indexOb.width"></el-input>
                                </el-form-item>
                                <el-form-item  label="显示标签">
                                        <el-switch v-model="indexOb.showLabel"></el-switch>
                                </el-form-item>
                                <el-form-item v-if="typeof(indexOb.defaultValue)=='string'"  label="默认数值">
                                        <el-input v-model="indexOb.defaultValue"></el-input>
                                </el-form-item>
                                <div  v-if="indexOb.type === 'twoDate'" >
                                    <div>字段设置</div>
                                    <el-form-item  label="开始字段">
                                            <el-input v-model="indexOb.defaultValue[0]"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="结束字段">
                                            <el-input v-model="indexOb.defaultValue[1]"></el-input>
                                    </el-form-item>
                                </div>
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
    <!-- //单个按钮的属性编辑器 -->
        <el-dialog v-dialogDrag title="下拉数据设置"  :close-on-click-modal="false" width="640px" top="14vh"  custom-class="item-set-dialog" :visible.sync="showSelectOption">
                <div v-if="showSelectOption" class="form-con" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="indexOb" label-width="76px" >
                                <el-form-item  label="取数方式">
                                    <el-select v-model="indexOb.getDataType">
                                        <el-option label="固定值" value="static"></el-option>
                                        <el-option label="接口取数" value="url"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- todo:需要增加取数地址设置 -->
                                <template v-if="indexOb.getDataType =='url'">
                                    <el-form-item label="取数地址">
                                        <el-input placeholder="请输入url地址" v-model="indexOb.url"></el-input>
                                    </el-form-item>
                                    <div>
                                        键值转化
                                    </div>
                                    <el-form-item label="label字段">
                                        <el-input placeholder="请输入label对应的字段" v-model="indexOb.url"></el-input>
                                    </el-form-item>
                                    <el-form-item label="value字段">
                                        <el-input placeholder="请输入value对应的字段" v-model="indexOb.url"></el-input>
                                    </el-form-item>
                                </template>
                                <!-- //增加节点设置 -->
                                <template  v-if="indexOb.getDataType !=='url'">
                                    <div class="flex-bet mb10">
                                        <div></div>
                                        <el-button type="primary">增加节点</el-button>
                                    </div>
                                    <vxe-table 
                                        ref="table"
                                        border
                                        :checkbox-config="{highlight: true,range: true}"
                                        :data="config.items"
                                        style="width: 100%"
                                        stripe
                                        height="200px"
                                        >
                                        <vxe-table-column align="center" title="位置" width="60">
		                                	<template v-slot>
		                                		<div class="drag-btn">
		                                			<i class="vxe-icon--menu"></i>
		                                		</div>
		                                	</template> 
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
                                        :formatter="$base.formatter"
                                        align="left"
                                        title="标签名称"
                                        min-width="100">
                                        </vxe-table-column>
                                        <vxe-table-column
                                        field="width"
                                        header-align="center"
                                        :formatter="$base.formatter"
                                        align="left"
                                        title="宽度"
                                        min-width="78">
                                        </vxe-table-column>  
                                    </vxe-table>
                                </template>
                        </el-form>
                </div>
                <div v-if="showSelectOption" class="flex-bet mt20" slot="footer">
                        <div class="left">
                        </div>
                        <div class="right">
                                <el-button style="margin-right: 10px;" @click="showSelectOption=false">取消</el-button>
                                <el-button type="primary" @click="saveSelectOption">确定</el-button>
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
    model: {                                //自定义model
        prop: 'config',
        event: 'changeConfig'
    },
    components: {
        javascriptDrawer
    },
    data(){
        return {
            showOtherSet: false,            //是否显示其他参数设置
            showItemSet: false,             //是否显示子节点
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            showSelectOption: false,        //是否显示下拉框
            souceBtn: {                     //单个按钮的默认配置
                "type": "input",
                "placeholder": "关键字",
                "value": "name",
                "defaultValue": "",
                "width": "",
                "id": "0083c25ec4c1cfbda573ca8492fbcaf3",
                "showLabel": false,
                "label": "关键字",
            },
            showBtnSet: false,              //是否显示按钮设置
            indexOb: {},                    //保存当前编辑的按钮的指针
            addType: '',                    //增加按钮的类型
            cacheOb: {},                    //copy的对象，用于编辑上
            showJavaScriptEdit: false,      //是否显示javaScript编辑器
            inputType: {                    //列类型
                'input': '输入框',
                'select': '下拉框',
                'date': '时间选择器',
                'twoDate': '双排日期',
                'checkbox': '复选框',
            },
            tableList:[],                   //数据表格控件列表
        }
    },
    methods: {
        openGetList(row){                   //点击下拉框
            if(!row.getDataType || row.getDataType == ''){
                row.getDataType = 'static'
            }
            this.indexOb = this.$base.deepCopy(row);
            this.cacheOb = row;
            this.showSelectOption = true;
        },
        addItemMore(){                      //新增子节点
            this.addType = 'more';
            this.indexOb = this.$base.deepCopy(this.souceBtn);
            this.indexOb.id = this.$base.guid();
            this.showBtnSet = true;
        },
        openOtherSet(){                     //打开其他设置
            this.showOtherSet = true;
        },
        openItemSet(){                      //点击全部节点设置
            this.showItemSet=true;
            this.$globjs.initSortable.call(this,{className: 'drag-btn',data: this.config,key:'items',tableRef: 'table'});
        },
        openColSet(btn){                    //打开按钮设置
            this.addType = ''
            this.indexOb = this.$base.deepCopy(btn);
            this.cacheOb= btn;
            this.showBtnSet = true;
        },
        saveBtn(){                          //保存按钮
            if(this.addType === 'more'){
                this.config.more.items.push(this.indexOb)
            }                 //保存按钮设置
            if(this.addType === 'add'){
                this.config.items.push(this.$base.deepCopy(this.indexOb))
            }else{
                for(let item in this.cacheOb){
                    this.cacheOb[item]=this.indexOb[item]
                }
            }
            this.showBtnSet=false;
        },
        saveSelectOption(){                 //保存下拉框设置
            Object.assign(this.cacheOb,this.indexOb);
            this.showSelectOption = false;
        },
        editJs(ob,key){                     //点击编辑js代码
            this.javascript.ob=ob;
            this.javascript.key=key;
            this.showJavaScriptEdit=true;
        },
        addItem(){                          //增加节点
            this.addType = 'add';
            this.indexOb = this.$base.deepCopy(this.souceBtn);
            this.indexOb.id = this.$base.guid();
            this.showBtnSet = true;
        },
        delItem(){                          //删除节点==显示元素
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
        delItemMore(){                      //删除更多元素
            let checks=[],list = [];
            for(let item of this.$refs.moreTable.selection){
                checks.push(item._XID)
            }
            for(let item of this.config.more.items){
                if(!checks.includes(item._XID)){
                    list.push(item)
                }
            }
            this.config.more.items=list;
        },
        getTableList(){                     //获取挂载在vue对象下的table对象;
            let list=[]
            for(let key in Vue.prototype){
                if(key.indexOf('$table')!==-1&&Vue.prototype[key]){
                    list.push(key)
                }
            }
            this.$set(this, 'tableList',list)
            this.$set(this.config, 'table',this.tableList[0])
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
@import  '@/styles/globalCompontSet.scss';
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
.node-table-con{
    height: calc(50vh - 30px);
}
.child-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: gray;
    color: #fff;
    padding: 6px 12px;
    .add-item-btn{
        margin-right: 12px;
    }
    span{
        cursor: pointer;
    }
}
</style>