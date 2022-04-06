<template>
    <!-- //btn-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件名称</span>
            {{config.id}}
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">标签宽度</span>
            <div>
                <el-input v-model="config.labelWidth" label="标签宽度"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">列数</span>
            <div>
                <el-input-number v-model="config.span"  :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">行间距</span>
            <div>
                <el-input v-model="config.gutterY" label="请输入行间距"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">列间距</span>
            <div>
                <el-input v-model="config.gutterX" label="请输入列间距"></el-input>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">显示提交</span>
            <div>
                <el-switch v-model="config.showSubmit"></el-switch>
            </div>
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">接口地址</span>
            <div>
                <el-input v-model="config.url"></el-input>
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
            <span class="nos color1">附加参数</span>
            <span @click="openOtherSet" class="primary">所有节点</span>
        </div>
        <div    class="set-row-between nos">
            <span  class="nos color1">节点设置</span>
            <span @click="openChildrenSet" class="primary">所有节点</span>
        </div>
        <!-- //子节点设置窗口 -->
        <el-drawer
        :visible.sync="showItemSet"
        :show-close="false"
        :withHeader="false"
        size="72%"
        >
            <div class="drawer-header">
                <div>
                    <span class="nos">节点设置</span>
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
            stripe>
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
                title="控件标签"
                width="100">
                </vxe-table-column>
                <vxe-table-column
                header-align="center"
                align="left"
                title="控件类型"
                width="78">
                    <div slot-scope="slot">{{inputKind[slot.row.type]}}</div>
                </vxe-table-column>
                <vxe-table-column
                header-align="center"
                align="left"
                title="提示内容"
                field="placeholder"
                min-width="120">
                </vxe-table-column>
                <vxe-table-column
                header-align="center"
                align="left"
                field="value"
                title="绑定字段"
                min-width="120"> 
                </vxe-table-column>
                <vxe-table-column
                header-align="center"
                align="left"
                field="defaultValue"
                title="默认数值"
                min-width="120"> 
                </vxe-table-column>
                <vxe-table-column
                field="main"
                header-align="center"
                align="center"
                width="78px"
                title="事件">
                    <div class="tool-col" slot-scope="slot">
                        <div @click="update(slot.row)" class="main-color nos mr10">编辑</div>
                    </div>
                </vxe-table-column>
            </vxe-table>
        </el-drawer>
        <!-- 初始化编辑器 -->
        <javascript-drawer  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
        <!-- //单个组件的设置 -->
        <el-dialog v-dialogDrag title="控件设置"  :close-on-click-modal="false" width="320px" top="27vh"  custom-class="item-set-dialog" :visible.sync="showSet">
                <div class="form-con" v-if="Object.keys(cache).length!=0" style="margin-top: 38px;">
                        <el-form ref="form" label-position="left" :model="cache" label-width="86px" >
                                <el-form-item  label="控件类型">
                                        <el-select @change="changeKJlx" v-model="cache.type">
                                            <el-option v-for="(item,key) in inputKind" :key="key"  :label="item" :value="key"></el-option>
                                        </el-select>
                                </el-form-item>
                                <el-form-item  label="标签名称">
                                        <el-input v-model="cache.label"></el-input>
                                </el-form-item>
                                <el-form-item  v-if="typeof(cache.value)=='string'"  label="绑定字段">
                                        <el-input v-model="cache.value"></el-input>
                                </el-form-item> 
                                <div  v-if="typeof(cache.value)=='object'||cache.type === 'twoDate'" >
                                    <div>绑定字段</div>
                                    <el-form-item  label="开始字段">
                                            <el-input v-model="cache.value[0]"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="结束字段">
                                            <el-input v-model="cache.value[1]"></el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item   label="提示文字">
                                        <el-input v-model="cache.placeholder"></el-input>
                                </el-form-item>
                                <el-form-item  v-if="typeof(cache.defaultValue)=='string'"  label="默认数值">
                                        <el-input v-model="cache.defaultValue"></el-input>
                                </el-form-item>
                                <div  v-if="typeof(cache.defaultValue)=='object'||cache.type === 'twoDate'" >
                                    <div>默认数值</div>
                                    <el-form-item  label="开始字段">
                                            <el-input v-model="cache.defaultValue[0]"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="结束字段">
                                            <el-input v-model="cache.defaultValue[1]"></el-input>
                                    </el-form-item>
                                </div>
                        </el-form>
                </div>
                <div class="flex-bet mt20" slot="footer">
                        <div class="left">
                        </div>
                        <div class="right">
                            <el-button style="margin-right: 10px;" @click="showSet=false">取消</el-button>
                            <el-button type="primary" @click="submitAdd">确定</el-button>
                        </div>
                </div>
        </el-dialog>
        <!-- //其他参数设置 -->
        <el-drawer
        :visible.sync="showOtherSet"
        :show-close="false"
        :withHeader="false"
        size="38%"
        >
            <div class="drawer-header">
                <div>
                    <span class="nos">节点设置</span>
                </div>
                <div>
                    <span @click="addOtherItem" class="nos mr10">新增</span>
                    <span @click="delOtherItem" class="nos">删除</span>
                </div>
            </div>
            <vxe-table
                border
                ref="tableOther"
                :data="config.other"
                style="width: 100%"
                :checkbox-config="{highlight: true,range: true}"
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
                field="key"
                header-align="center"
                align="left"
                :formatter="$base.formatter"
                title="键名"
                min-width="100">
                    <el-input class="input-t" slot-scope="slot" v-model="slot.row.key"></el-input>
                </vxe-table-column>
                <vxe-table-column
                field="type"
                title="取值方式"
                header-align="center"
                :formatter="$base.formatter"
                align="left"
                min-width="90">
                    <el-select class="input-t" slot-scope="slot" v-model="slot.row.type">
                        <el-option value="static" label="固定值"> </el-option>
                        <el-option value="js" label="脚本"> </el-option>
                    </el-select>
                </vxe-table-column>
                <vxe-table-column
                header-align="center"
                align="center"
                min-width="120px"
                title="值或脚本">
                    <div slot-scope="slot" @click="editGetSet(slot.row)" class="main-color nos">{{slot.row.type==='static'?'修改值':'修改脚本'}}</div>
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
            showOtherSet: false,           //是否显示其他参数设置
            cache: {
            },
            inputKind: {
                'input': '输入框',
                'select': '下拉框',
                'date': '时间选择器',
                'twoDate': '双列时间',
                'upload': '上传控件',
                'textarea': '多行文本',
            },
            showSet: false,                 //单个节点设置
            showItemSet: false,             //是否显示子节点
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            showJavaScriptEdit: false,      //是否显示javascript编辑器
        }
    },
    methods: {
        openOtherSet(){                     //打开其他设置
            this.showOtherSet = true;
        },
        editGetSet(row){                    //编辑获取其他值的方式
            if(row.type==='js'){
                this.editJs(row,'value')
            }else{
                this.$prompt('请输入key对应的值', '提示', {
                    confirmButtonText: '确定',
                    inputValue: row.value,
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    row.value =value
                })
            }
        },
        addOtherItem(){                     //新增附加字段
            this.config.other.push({
                key: '',
                type: 'static',
                value: '',
                id: this.$base.guid()
            })
        },
        delOtherItem(){                     //删除附件字段
            let list = JSON.parse(JSON.stringify(this.config.other));
            let arr= [];
            for(let item of this.$refs.tableOther.selection){
                arr.push(item.id);
            }
            this.config.other = list.filter(item=>!arr.includes(item.id));
        },
        changeKJlx(type){                   //修改空间类型
                if(type==='twoDate'){
                    this.cache.defaultValue = ['YYYYMM01','YYYYMMDD'];
                    this.cache.value = ['YYYYMM01','YYYYMMDD'];
                }else{
                    this.cache.defaultValue = '';
                    this.cache.value = '';
                }
        },
        openChildrenSet(){                  //点击展开节点
            this.showItemSet=true;
        },
        editJs(ob,key){                     //点击编辑js代码
                this.javascript.ob=ob;
                this.javascript.key=key;
                this.showJavaScriptEdit=true;
        },
        update(item){                       //点击修改
                this.cache=JSON.parse(JSON.stringify(item));
                this.showSet=true;
        },
        addItem(){                          //增加节点；上传发票数据
            this.cache = { 
                        type: 'input',                    //种类-双排时间选择器   
                        placeholder: '请输入关键字',            //提示文字
                        value: 'gjz1',            //对应关键字
                        defaultValue: '123', //时间格式，YYYYMM01代表当月一号
                        width: '',                         //双排时间无效 
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        id: this.$base.guid(),
                        label: '关键字1',                  //头部文字
            }
            this.showSet = true;
        },      
        submitAdd(){                        //提交单个新增
            this.config.items.push(this.cache)
            this.$emit("changeConfig",this.config);
            this.showSet=false;
        },
        delItem(){                          //删除节点
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
.tool-col{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>