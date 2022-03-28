<template>
    <div class="edit-config-container">
        <!-- //编辑propConfig的dialog窗口 -->
        <el-drawer
            :withHeader="false"
            :visible.sync="showDw"
            direction="rtl"
            custom-class="editPropConfig"
            :show-close='false'
            :before-close="closedEditConfig">
            <div  class="editPropConfigTitle">
                <div>
                        <div class="top-item">{{'集成配置 - '+propConfig.__config__.label}}</div> 
                        <div class="top-item" @click="openDialog('add')">新增</div> 
                        <div class="top-item" @click="delRow">删除</div> 
                        <div class="top-item" @click="save">保存</div> 
                </div>
                <div>
                        <div @click="closeDraw" class="top-item">关闭</div> 
                </div>
            </div>
            <div v-if="cacheData.propConfig!=undefined" class="editConfigCentent">
                    <el-table	
                            border
                            ref="table"
                            :cell-style="{'text-align': 'center','padding':'5px 0'}"
                            height="calc(100vh - 32px)"
                            max-height=100%
                            :header-cell-style="{'background-color':'#f0f0f0','padding':'0','text-align':'center','color': '#555555','font-weight': '600'}"  
                            :data="cacheData.propConfig.list"
                            style="width: 100%">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            show-overflow-tooltip
                            :formatter="tableFormatter"
                            v-for="(item,key,index) in keyConfig[propConfig.__config__.tag]"
                            :key="index"  
                            :label="item"
                            :prop="key"
                            >  
                                    <div  slot-scope="slot" :class="getColClass(slot.row,key)">{{getColumn(slot.row,key)}}</div>
                            </el-table-column>    
                            <el-table-column
                            label="操作"
                            fixed="left"
                            width="70"
                            >
                            <div class="main-color nos" slot-scope="slot" @click="openDialog('update',slot)">修改</div>
                            </el-table-column>
                    </el-table>
            </div>
        </el-drawer>
        
        <el-dialog
        :title="dialogStatus.type=='update'?'修改':'新增'"
        :visible.sync="dialogStatus.show"
        :close-on-click-modal="false"
        width="720px">
        <!-- //设置按钮的内容 -->
                <div v-show="propConfig.__config__.tag=='sh-btn-group'" class="updateDialog">
                        <div class="row-item">
                               <span>按钮文字</span> <el-input v-model="dialogStatus.data.label" label="请输入按钮文字"></el-input>
                        </div>
                        <div class="flex-bet">
                                <div class="row-item">
                                <span>按钮icon</span>  <el-input style="width: 220px;" v-model="dialogStatus.data.icon"  label="请选着按钮icon"></el-input>
                                </div>
                                <div class="row-item">
                                <span>背景颜色</span>  
                                <el-select v-model="dialogStatus.data.type"  label="请选择背景颜色">
                                        <el-option label="蓝色" value="primary"></el-option>
                                        <el-option label="红色" value="danger"></el-option>
                                        <el-option label="绿色" value="success"></el-option>
                                        <el-option label="黄色" value="warning"></el-option>
                                        <el-option label="灰色" value="info"></el-option>
                                        <el-option label="白色" value=""></el-option>
                                </el-select>
                                </div>
                        </div> 
                </div>

        <!-- //table组件的设置内容 -->
                <div v-show="propConfig.__config__.tag=='sh-table-group'" class="updateDialog">
                        <div class="row-item">
                               <span>表头文字</span> <el-input v-model="dialogStatus.data.label" placeholder="请输入表头文字"  label="请输入表头文字"></el-input>
                        </div> 
                        <div class="row-item">
                               <span>对应字段</span> <el-input v-model="dialogStatus.data.prop" placeholder="对应数据上的字段"  label="对应数据上的字段"></el-input>
                        </div> 
                        <div class="row-item">
                               <span>文字颜色</span> <el-input v-model="dialogStatus.data.color" placeholder="请输入文字颜色"  label="文字颜色"></el-input>
                        </div> 
                </div>

        <!-- //search组件的设置内容 -->
                <div v-show="propConfig.__config__.tag=='sh-search-group'" class="updateDialog">
                        <div class="row-item">
                               <span>提示文字</span> <el-input v-model="dialogStatus.data.label" label="请输入提示文字"></el-input>
                               <span>对应字段</span> <el-input v-model="dialogStatus.data.gjzd" label="请输入对应的字段"></el-input>
                        </div> 
                        <div class="row-item">
                               <span>对应字段</span> 
                               <el-select v-model="dialogStatus.data.type" placeholder="选着输入框类型">
                                       <el-option v-for="(item,key) in searchType" :key="key" :label="item" :value="key"></el-option> 
                               </el-select>
                        </div> 
                </div>

                <div class="row-item">
                       <span>点击事件</span>
                       <div id="editorJson"></div>
                </div> 
        <!-- //确定按钮 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogStatus.show = false">取 消</el-button>
                    <el-button type="primary" @click="addConfig">确 定</el-button>
                </span>

        </el-dialog>
    </div>
</template>

<script>
import {Base64} from 'js-base64'
import { beautifierConf } from '@/utils/index'
import loadBeautifier from '@/utils/loadBeautifier'
import loadMonaco from '@/utils/loadMonaco'

let monaco
export default {
        props:['propConfig','visibled'],
        model: {
            prop: 'propConfig',
            event: 'change'
        },
        computed:{ 
        },
        watch:{ 
            visibled(data){
                    if(data){
                        this.showDw=true;
                        this.cacheData=JSON.parse(JSON.stringify(this.propConfig)) 
                    }
            }
        },
        data(){
                return{ 
                        showDw: false,
                        dialogStatus: {
                                show: false,
                                type: 'add',
                                data: {}
                        },  
                        keyConfig: {
                                "sh-btn-group": {
                                        label: '按钮文字',
                                        icon: "图标",
                                        type: "颜色",
                                        event: '点击事件',
                                },
                                "sh-search-group": {
                                        label: '提示文字',
                                        gjzd: '对应字段',
                                        type: "组件类型", 
                                },
                                "sh-table-group": {
                                        label: '表头文字',
                                        prop: '对应字段',
                                        color: "颜色",
                                        event: '点击事件',
                                }
                        }, 
                        cacheData: {},
                        formData: {},
                        searchType:{
                                "input" :      '单排输入框',
                                "date-picker" :'单排时间选择',
                                "two-date" :   '双排时间选择',
                                "select" :     '单排下拉选择',
                                "two-select" : '双排下拉选择',
                        }
                }
        },
        mounted(){    
        },
        methods: {
                openDialog(type,data){ 
                        this.dialogStatus.type=type
                        this.dialogStatus.show=true
                        this.$nextTick(()=>{
                                if (!this.jsonEditor) {
                                        if(type=="update"){
                                                this.openEditor(Base64.decode(data.row.event==undefined?'':data.row.event))
                                        }else{
                                                this.openEditor("")
                                        }
                                }
                        })
                        this.dialogStatus.data={}
                        if(type=="update"){
                                this .dialogStatus.index=data.$index
                        }
                        Object.keys(this.keyConfig[this.cacheData.__config__.tag]).forEach(key=>{
                                if(type=="update"){
                                        if(key=='event'){
                                                if(this.jsonEditor){
                                                        this.jsonEditor.setValue(Base64.decode(data.row[key]))
                                                }
                                        }else{
                                                this.$set(this.dialogStatus.data,key,data.row[key]) 
                                        }
                                }else{
                                        if(key=='event'){
                                                this.jsonEditor.setValue('')
                                        }else{
                                                this.$set(this.dialogStatus.data,key,'') 
                                        }
                                }
                        })
                },
                decodeB(data){
                        return Base64.decode(data)
                },
                tableFormatter(value,b,c){
                        if(c==undefined||c==''){
                                return '---'
                        }
                        return c
                },
                getColumn(row,key){
                //为事件时进行解码
                        if(key=='event'){
                             return Base64.decode(row[key]) 
                        }
                //税航输入组的时候进行转换
                        if(key=='type'&&this.propConfig.__config__.tag=='sh-search-group'){
                              return this.searchType[row.type]
                        }
                //为空时填充文本
                        if(row[key]==undefined||row[key]==''){
                            return '---'
                        }
                //其他返回原样
                        return row[key]
                },
                getColClass(row,key){
                        return ''
                },
                closeDraw(){
                        this.$confirm('未保存的内容将会丢实，确定退出？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.$emit("update:visibled",false)
                            this.showDw=false
                        }) 
                },
                delRow(){
                        if(this.$refs.table.selection.length==0){
                                this.$message.warning("请先选中数据")
                                return
                        }
                        this.$confirm('删除操作不可逆，确定删除?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                        }).then(() => {
                                this.$refs.table.selection.forEach(item=>{
                                        this.cacheData.propConfig.list=this.cacheData.propConfig.list.filter(f=>item.id!==f.id)
                                })
                        })
                },
                addConfig(){                    //添加配置和更新配置
                     //更新配置
                        if(this.dialogStatus.type=='update'){
                                this.dialogStatus.data.event=Base64.encode(this.jsonEditor.getValue())
                                this.cacheData.propConfig.list[this.dialogStatus.index]=this.dialogStatus.data
                                this.dialogStatus.show=false
                                return
                        }
                     //新增配置
                        this.dialogStatus.data.event=Base64.encode(this.jsonEditor.getValue())
                        this.cacheData.propConfig.list.push(this.dialogStatus.data)  
                        this.dialogStatus.show=false
                },
                save(){                          //保存整体配置
                         this.propConfig.propConfig.list=this.cacheData.propConfig.list.filter(item=>item);
                         this.showDw=false
                         this.$emit('update:visibled',false)
                },
                closedEditConfig(done){           //关闭编辑配置EditConfig
                        this.$confirm('未保存的内容将会丢实，确定退出？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            this.$emit("update:visibled",false)
                            done();
                        }) 
                },
                openEditor(data){                 //打开编辑器窗口
                        loadBeautifier(btf => {
                                beautifier = btf
                                this.beautifierJson = beautifier.js(this.jsonStr, beautifierConf.js)
                                loadMonaco(val => {
                                    monaco = val
                                    this.setEditorValue('editorJson', data)
                                })
                        })
                },
                setEditorValue(id, codeStr) {     //设置编辑器
                        if (this.jsonEditor) {
                            this.jsonEditor.setValue(codeStr)
                        } else {
                            //实例化moncao编辑器 
                            this.jsonEditor = monaco.editor.create(document.getElementById(id), {
                            value: codeStr,
                            theme: 'vs-dark',
                            language: 'javascript',
                            automaticLayout: true
                            })
                            // ctrl + s 刷新
                            this.jsonEditor.onKeyDown(e => {
                            if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
                                this.refresh()
                            }
                            })
                        }
                },
        }
}
</script>

<style lang="less" scoped>
@propConfigBG: #fff;

/deep/.editPropConfig{
   width: 65vw !important;
   background: @propConfigBG;
}

/deep/.el-drawer__header{
    margin-bottom: 0 !important;
    padding: 0 !important;
}
/deep/thead .el-checkbox:last-of-type {
    margin-left: 5px;
}
.edit-config-container{
        .editPropConfigTitle{
                    height: 32px;
                    line-height: 32px;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    .top-item{
                            display: inline-block;
                            background: #fff;
                            line-height: 24px;
                            height: 24px;
                            font-weight: 600;
                            padding: 0 12px;
                            border-radius: 4px;
                            font-size: 10pt;
                            color: #ff641a;
                            cursor: pointer;
                            user-select: none;
                    }
        }
        
        #editorJson{
                height: 160px;
                width: 100%; 
                z-index: 999999; 
        }
        .row-item{
                margin: 12px 0 ;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                span{
                        min-width: 76px;
                }
                /deep/.el-select{
                        flex: 1;
                        width: 220px;
                }
        }
}
</style>