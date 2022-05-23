<!--
 * @Author: BlueStar
 * @Date: 2022-05-20 14:28:16
 * @LastEditTime: 2022-05-23 14:58:16
 * @Description: 附加参数设置
-->
<template>
  <div class="http-other-container">
        <div @click="openDrawer" class="http-other-btn">
              <slot/>
        </div>
        <div v-if="showDrawer" class="dialog-container">
            <el-drawer
            :visible.sync="showDrawer"
            :show-close="false"
            :withHeader="false"
            size="62%"
            >
                <div class="drawer-header">
                    <div>
                        <span class="nos">ajax附加参数</span>
                    </div>
                    <div>
                        <span @click="addOtherItem" class="nos mr10">新增</span>
                        <span @click="delOtherItem" class="nos mr10">删除</span>
                        <span @click="closeDrawer" class="nos">关闭</span>
                    </div>
                </div>
                <vxe-table
                    border
                    ref="tableOther"
                    :data="data"
                    style="width: 100%"
                    :checkbox-config="{highlight: true,range: true}"
                    stripe
                    height="500px"
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
                        <template slot-scope="slot">
                            <el-input class="input-t"  v-if="slot.row.type==='static'" v-model="slot.row.value"></el-input>
                            <div @click="editGetSet(slot.row)"  v-if="slot.row.type!=='static'" class="main-color nos">
                                修改脚本
                            </div>
                        </template>
                    </vxe-table-column>
                </vxe-table>
            </el-drawer>
        </div>
    <!-- 初始化编辑器 -->
        <javascript-drawer :template-code="templateCode"  size="60%" :visible.sync="showJavaScriptEdit" v-model="javascript.ob[javascript.key]"/>
  </div>
</template>

<script>
import javascriptDrawer from '@/views/index/JavaScriptDrawer.vue';
export default {
    props: ['data'],
    components: {
        javascriptDrawer
    },
    model: {
        event: 'changeData',
        prop: 'data'
    },
    data(){
        return {
            showDrawer: false,
            showJavaScriptEdit: false,
            javascript: {                   //当前编辑器编辑的对象
                ob: '',
                key: ''
            },
            templateCode: `
/**
 *       自运行函数返回一个值
 *       下面的函数返回一个 "test" 字符串
 *
 */
(function(){
    return 'test'
})()
            `
        }
    },
    methods: {
        editGetSet(row){                    //编辑获取值的方式 todo:未完善
            this.editJs(row,'value')
        },
        editJs(ob,key){                     //点击编辑代码
            this.javascript.ob=ob;
            this.javascript.key=key;
            this.showJavaScriptEdit=true;
        },
        closeDrawer(){
            this.showDrawer = false;
        },
        openDrawer(){
            this.showDrawer = true;
        },
        addOtherItem(){                         //新增附加节点
            this.data.push({
                key: '',
                type: 'static',
                value: '',
                id: this.$base.guid()
            })
        },
        delOtherItem(){                         //删除附加节点
            let list = JSON.parse(JSON.stringify(this.data));
            let arr= [];
            for(let item of this.$refs.tableOther.selection){
                arr.push(item.id);
            }
            arr = list.filter(item=>!arr.includes(item.id));
            this.$emit('changeData',arr)
        },
    },
    created(){
        
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>

</style>>