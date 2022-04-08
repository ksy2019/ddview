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
        size="100%"
        >
            <div class="drawer-header">
                <div>
                    <span class="nos" @click="openItemSet">节点设置</span>
                </div>
                <div>
                    <span @click="clickAdd" class="nos mr10">新增</span>
                    <span @click="delItem" class="nos">删除</span>
                </div>
            </div>
            <vxe-table
                border
                :data="config.columns"
                style="width: 100%"
                :checkbox-config="{highlight: true,range: true}"
                stripe
                ref="table"
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
                align="center"
                title="类型"
                width="70">
                    <div slot-scope="slot">{{colType[slot.row.type]}}</div>
                </vxe-table-column>
                <vxe-table-column
                field="label"
                header-align="center"
                align="left"
                title="列名"
                :formatter="$base.formatter"
                min-width="100">
                </vxe-table-column>
                <vxe-table-column
                field="field"
                title="字段"
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                min-width="90">
                </vxe-table-column>
                <vxe-table-column 
                header-align="center"
                align="center"
                title="表头对齐"
                field="headalign"
                :formatter="$base.formatter"
                min-width="100">
                </vxe-table-column>
                <vxe-table-column 
                header-align="center"
                align="center"
                field="align"
                :formatter="$base.formatter"
                title="内容对齐"
                min-width="100">
                </vxe-table-column>
                <vxe-table-column 
                header-align="center"
                align="center"
                field="fixed"
                :formatter="$base.formatter"
                title="浮动方式"
                min-width="100">
                </vxe-table-column>
                <vxe-table-column 
                header-align="center"
                align="center"
                title="颜色"
                min-width="100">
                            <div slot-scope="slot">{{$base.isBlank(slot.row.color)?'- - -': $globjs.color[slot.row.color]}}</div>
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                min-width="85"
                title="子节点">
                    <div slot-scope="slot" @click="openChildren(slot.row)" :class="slot.row.children&&slot.row.children.length!=0?'main-color':''" class="nos">设置</div>
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                min-width="85"
                title="操作">
                    <div slot-scope="slot" @click="openColSet(slot.row)" class="main-color nos">修改</div>
                </vxe-table-column>
            </vxe-table>
        </el-drawer>
        <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
        <!-- //单个列设置 -->
        <el-dialog v-dialogDrag title="列信息"  :close-on-click-modal="false" width="320px" top="14vh"  custom-class="item-set-dialog" :visible.sync="showBtnSet">
                <div class="form-con" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="indexOb" label-width="86px" >
                                <el-form-item  label="列类型">
                                        <el-select v-model="indexOb.type">
                                            <el-option label="普通列" value=""></el-option>
                                            <el-option label="选择列" value="checkbox"></el-option>
                                            <el-option label="序数列" value="seq"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item  label="列头名称">
                                        <el-input v-model="indexOb.label"></el-input>
                                </el-form-item>
                                <el-form-item  label="对应字段">
                                        <el-input v-model="indexOb.field"></el-input>
                                </el-form-item>
                                <el-form-item  label="表头居中">
                                        <el-select v-model="indexOb.headalign">
                                            <el-option label="居中" value="center"></el-option>
                                            <el-option label="左对齐" value="left"></el-option>
                                            <el-option label="右对齐" value="right"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item  label="表体剧中">
                                        <el-select v-model="indexOb.align">
                                            <el-option label="居中" value="center"></el-option>
                                            <el-option label="左对齐" value="left"></el-option>
                                            <el-option label="右对齐" value="right"></el-option>
                                        </el-select> 
                                </el-form-item>
                                 <el-form-item  label="文字颜色">
                                        <el-select v-model="indexOb.color">
                                            <el-option label="蓝色" value="primary"></el-option>
                                            <el-option label="橙色" value="warning"></el-option>
                                            <el-option label="红色" value="danger"></el-option>
                                        </el-select>
                                </el-form-item> 
                                 <el-form-item  label="列浮动">
                                        <el-select v-model="indexOb.fixed">
                                            <el-option label="left" value="left"></el-option>
                                            <el-option label="right" value="right"></el-option>
                                            <el-option label="无浮动" value=""></el-option>
                                        </el-select>
                                </el-form-item> 
                        </el-form>
                </div>
                <div class="flex-bet mt20" slot="footer">
                        <div class="left">
                        </div>
                        <div class="right">
                                <el-button style="margin-right: 10px;" @click="showBtnSet=false">取消</el-button>
                                <el-button type="primary" @click="saveBtn">提交</el-button>
                        </div>
                </div>
        </el-dialog>
        <!-- //子节点单个设置 -->
        <el-dialog v-dialogDrag title="列信息"  :close-on-click-modal="false" width="320px" top="28vh"  custom-class="item-set-dialog" :visible.sync="showChildrenItem">
                <div class="form-con" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="itemSet" label-width="86px" >
                                <el-form-item  label="按钮名称">
                                        <el-input v-model="itemSet.label"></el-input>
                                </el-form-item>
                                 <el-form-item  label="按钮颜色">
                                        <el-select v-model="itemSet.color">
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
                                <el-button style="margin-right: 10px;" @click="showChildrenItem=false">取消</el-button>
                                <el-button type="primary" @click="saveChildrenItem">提交</el-button>
                        </div>
                </div>
        </el-dialog>
        <!-- //子节点设置 -->
        <el-dialog v-dialogDrag title="子节点设置"  :close-on-click-modal="false" width="980px" top="12vh"  custom-class="children-set-dialog" :visible.sync="showChildrenSet">
                <div class="tool-bar">
                    <el-button @click="clickAddChild" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
                    <el-button @click="clickReduceChild" type="primary" icon="el-icon-delete">删除</el-button>
                </div>
                <div class="table-con">
                    <vxe-table
                        height="450px"
                        border
                        :data="indexChildren"
                        style="width: 100%"
                        :checkbox-config="{highlight: true,range: true}"
                        stripe
                        ref="table1"
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
                        title="列名"
                        :formatter="$base.formatter"
                        min-width="100">
                        </vxe-table-column>
                        <vxe-table-column
                        field="color"
                        header-align="center"
                        align="left"
                        title="文字颜色"
                        :formatter="$base.formatter"
                        min-width="100">
                            <div slot-scope="slot">{{$globjs.color[slot.row.color]}}</div>
                        </vxe-table-column>
                        <vxe-table-column
                        header-align="center" 
                        align="center"
                        :formatter="$base.formatter"
                        title="点击事件"
                        min-width="100">
                            <div @click="editJs(slot.row,'onClick')" slot-scope="slot" class="main-color nos">编辑脚本</div>
                        </vxe-table-column>
                        <vxe-table-column
                        header-align="center"
                        align="center"
                        :formatter="$base.formatter"
                        title="操作"
                        min-width="100">
                            <div slot-scope="slot" @click="openChildrenItem(slot.row)" class="main-color nos">编辑</div>
                        </vxe-table-column>
                    </vxe-table>
                </div> 
        </el-dialog>
    </div>
</template>

<script>
import javascriptDrawer from '../../index/JavaScriptDrawer.vue';
import Sortable from 'sortablejs';
export default {
    props: {
        config: Object,
    },
    model: {                                //自定义Model
        prop: 'config',
        event: 'change'
    },
    components: {
        javascriptDrawer
    },
    data(){
        return {
            showChildrenItem: false,
            showChildrenSet: false,         //子节点设置
            itemSet: {                      //单个节点设置
                label: '',
                color: '',
            },                    
            indexChildren: [],
            indexChildrenItem: {},
            showItemSet: false,             //是否显示子节点
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            showBtnSet: false,              //是否显示按钮设置
            indexOb: {                      //保存当前编辑的按钮的指针
                type: '',
                headalign: 'center',
                align: 'center',
            },
            cacheOb: {},                    //copy的对象，用于编辑上
            showJavaScriptEdit: false,      //是否显示javaScript编辑器
            isAdd: false,                   //是否是确定按钮
            colType: {                      //列类型
                'seq': '序号列',
                'checkbox': '选择列',
                '': '普通列',
            }
        }
    },
    methods: {
        clickAddChild(){                    //点击增加子节点
            for(let item in this.itemSet){
                this.itemSet[item] = ''
            }
            this.itemSet.id = ''
            this.addChildren = true;
            this.showChildrenItem = true;
        },
        clickReduceChild(){                 //点击删除子节点

        },
        saveChildrenItem(){                 //保存单个子节点设置
            if(this.addChildren){
                this.indexChildren.push(this.itemSet)
            }else{
                for(let key in this.indexChildrenItem){
                    this.indexChildrenItem[key]   = this.itemSet[key]
                }
            }
            this.showChildrenItem = false;
        },
        openChildrenItem(item){             //打开单个节点设置
            this.addChildren = false;
            item.id = this.$base.guid();
            this.indexChildrenItem = item ;
            this.itemSet = JSON.parse(JSON.stringify(item));
            this.showChildrenItem = true;
        },
        openChildren(row){                  //打开节点设置
            this.indexChildren = row.children;
            this.showChildrenSet = true;
            this.initSortable({className: 'drag-btn2',data: row,key:'children',tableRef: 'table1'});
        },
        openItemSet(){                      //点击全部节点设置
            this.showItemSet=true;
            this.initSortable({className: 'drag-btn',data: this.config,key:'columns',tableRef: 'table'});
        },
        openColSet(btn){                    //打开按钮设置
            this.indexOb = this.$base.deepCopy(btn);
            this.cacheOb=btn
            this.showBtnSet = true;
        },
        saveBtn(){                          //保存按钮设置
            if(this.isAdd){
                this.addItem();
            }
            for(let item in this.cacheOb){
                this.cacheOb[item]=this.indexOb[item];
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
        clickAdd(){
            this.isAdd = true;
            this.showBtnSet = true;
        },
        addItem(){                          //增加节点
            this.isAdd = false;
            let list = this.$base.deepCopy(this.config.columns);
            list.push({
                ...this.indexOb,
                "id": this.$mybase.guid()
            })
            this.config.columns = list;
        },
        delItem(){                          //删除节点
            let list = JSON.parse(JSON.stringify(this.config.columns));
            let arr= [];
            for(let item of this.$refs.table.selection){
                arr.push(item.id);
            }
            this.config.columns = list.filter(item=>!arr.includes(item.id));
        }, 
        initSortable({className,data,key,tableRef}){
            this.$nextTick(() => {
					this.sortable = Sortable.create( this.$refs[tableRef].$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
						handle: '.' + className,
						onEnd: ({
							newIndex,
							oldIndex
						}) => {
                            let columns = this.$base.deepCopy(data[key]);
							let currRow = columns.splice(oldIndex, 1)[0]
						    columns.splice(newIndex, 0, currRow)
                            Object.assign(data[key],columns)
                            this.$set(this.config,'lastUpdateTime',new Date().getTime())
						}
					})
				})
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
.tool-bar{
    text-align: right;
    margin-bottom: 12px;
}
::v-deep .drag-btn , .drag-btn2{
    text-align: center;
    cursor: move;
}
</style>