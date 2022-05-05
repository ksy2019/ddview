<!--
 * @Author: BlueStar
 * @Date: 2021-12-29 23:06:40
 * @LastEditTime: 2021-12-30 09:25:00
 * @Description:  创建表单界面
-->
<template>
  <div class="create-form">
        <div class="phone-view">
            <div class="phone-model">
            </div>
            <div class="main-container">
                <!-- <div v-for="(item,index) in list" :key="index">
                    <div class="item-label">{{item.mc}}</div>
                    <el-input v-if="item.lx==='input'"></el-input>
                    <el-select v-if="item.lx==='select'"></el-select>
                    <el-input v-if="item.lx==='textarea'"></el-input>
                    <el-datepicker v-if="item.lx==='date'"></el-datepicker>
                    <el-upload v-if="item.lx==='upload'"></el-upload>
                </div> -->
                
                <template v-for="(item,index) in yList" >
                    <div class="item-span" @click="pushItem(item,$event)" :key="index">{{item.mc}}</div>
                </template>
            </div>
        </div>
        <div class="create-container">
             <el-form style="margin:24px 0 20px 0;" label-position="top" label-width="80px" :model="indexEdit">
                   <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="控件种类">
                                <el-select style="width: 100%;" v-model="indexEdit.lx">
                                    <el-option v-for="(item,key) in zd.inputlx" :key="key" :label="item" :value="key"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="标签名称">
                                <el-input v-model="indexEdit.mc"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="24">
                            <el-form-item label="提示文字">
                                <el-input v-model="indexEdit.ts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="默认值">
                                <el-input v-model="indexEdit.mrz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="indexEdit.type==='select'" :span="24">
                            <el-form-item label="下拉列表">
                                <el-input v-model="indexEdit.list"></el-input>
                            </el-form-item>
                        </el-col>
                   </el-row>
            </el-form>
            <div class="footer">
                <el-button @click="showCreate=false">取消</el-button>
                <el-button @click="submitCreateFrom" type="primary">添加</el-button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list: [],
            indexEdit: {                    //当前编辑的控件
                lx: 'input',           //控件种类  select = 下拉框     text=文本       textarea = 文本域  datepicker 时间选择器  daterang 2个时间
                mrz: '',   //控件的默认值
                mc: '',          //控件的标签名称
                ts: '',    //控件的提示文字
                list: []    //列表数据
            },
            zd: {
                inputlx: {
                    'input': '文本输入框',
                    'select': '下拉选择框',
                    'textarea': '多行文本',
                    'date': '时间选择器',
                    'twodate': '日期起至选择器',
                    'upload': '文件上传'
                }
            },
            indexEditSrc: {},
            yList: [
                {
                    lx: 'input',
                    mrz: '',
                    mc: '姓名',
                    ts: '',
                    list: []
                },
                {
                    lx: 'input',
                    mrz: '',
                    mc: '手机',
                    ts: '',
                    list: []
                },
                {
                    lx: 'input',
                    mrz: '',
                    mc: '邮箱',
                    ts: '',
                    list: []
                },
                {
                    lx: 'input',
                    mrz: '',
                    mc: '地址',
                    ts: '',
                    list: []
                },
                {
                    lx: 'input',
                    mrz: '',
                    mc: '身份证',
                    ts: '',
                    list: []
                },
                {
                    lx: 'input',
                    mrz: '',
                    mc: '公司',
                    ts: '',
                    list: []
                },
                {
                    lx: 'upload',
                    mrz: '',
                    mc: '小票',
                    ts: '',
                    list: []
                },
                {
                    lx: 'upload',
                    mrz: '',
                    mc: '其他影像',
                    ts: '',
                    list: []
                }
            ]
        }
    },
    methods: {
        initIndexEdit(){            //初始化当前新增表单
                this.indexEdit = JSON.parse(JSON.stringify(this.indexEditSrc))
        },
        submitCreateFrom(){
                this.list.push(JSON.parse(JSON.stringify(this.indexEdit)));
                this.showCreate = false;
                this.initIndexEdit();
        },
        pushItem(item,e){                 //添加控件
            e.target.style.background = '#4a96ff'
            e.target.style.color = '#fff'
            e.target.style.border = '1px solid #578bff'
        }
    },
    created(){
        this.indexEditSrc = JSON.parse(JSON.stringify(this.indexEdit))
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
.create-form{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 30px;
    box-sizing: border-box;
    .phone-view{
        position: relative;
        .phone-model{
                background: url("../../assets/img/ip6.svg");
                height: 667px;
                width: 330px;
                background-repeat: no-repeat;
                background-size: contain;
        }
        .main-container{
                height: 517px;
                width: 300px;
                background: #fff;
                position: absolute;
                top: 64px;
                left: 14px;
                padding: 12px;
                box-sizing: border-box;
                .item-label{
                    margin: 12px 0;
                    font-size: 1rem;
                    font-weight: 600;
                }
                .item-span{
                    cursor: pointer;
                    display: inline-block;
                    padding: 6px 16px;
                    border: 1px dotted #67affe;
                    margin: 5px;
                    border-radius: 2.5rem;
                    color: #6d6d6d;
                }
        }
    }
    .create-container{
        margin-left: 20px;
        // border: 1px dotted blue;
        padding: 12px;
    }
}
</style>