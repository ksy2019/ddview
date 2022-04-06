<!--
 * @Author: BlueStar
 * @Date: 2022-03-31 18:12:54
 * @LastEditTime: 2022-04-06 10:34:04
 * @Description: api编辑页面
-->
<template>
    <div class="api-editor">
        <div class="top-tool">
                <div class="left">
                      API
                      <span class="text-con">管理</span>
                </div>
                <div class="right">
                        <div class="user-avatar">
                            凯
                        </div>
                        <div class="run-btn">
                                <i class="el-icon-caret-right"></i>
                        </div>
                </div>
        </div>
        <el-tabs type="card">
          <el-tab-pane label="API管理" name="first"></el-tab-pane>
          <el-tab-pane label="列管理" name="second"></el-tab-pane> 
        </el-tabs>
        <div class="editor-body">
            <div class="left br1">
                    <div class="left-top-container">
                        <div class="bb1 flex-bet tool-bar">
                            <div class="flex mr5 nous">
                                <img src="./images/qjsz.svg" alt="">
                                全局设置SQL设置
                            </div>
                            <div class="right-btn-con flex">
                                <el-tooltip class="item" effect="dark" content="保存" :open-delay="1000" placement="top">
                                <div class="item-btn">
                                    <i class="el-icon-circle-check"></i>
                                </div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="qjsqlsz">
                            <el-input type="textarea" :rows="10"></el-input>
                        </div>
                    </div>
                    <div class="tool-bar bt1 flex-bet ">
                        <div class="flex mr5 nous">
                            <img src="./images/cxtj.svg" alt="">
                            查询条件
                        </div>
                        <div class="right-btn-con flex">
                            <el-tooltip class="item" effect="dark" content="新增" :open-delay="1000" placement="top">
                            <div @click="clickAddCxtj" class="item-btn">
                                <i class="el-icon-circle-plus-outline"></i>
                            </div>
                            </el-tooltip>
                        </div>
                    </div>
            </div>
            <div class="right">
                    <div class="right-top-con">
                        <div class="tool-bar flex-bet bb1">
                            <div class="flex mr5 nous">
                            <img src="./images/api.svg" alt="">
                            API列表
                            </div>
                            <div class="right-btn-con flex">
                            <el-tooltip class="item" effect="dark" content="刷新" :open-delay="1000" placement="top">
                            <div class="item-btn">
                                <i class="el-icon-refresh-right"></i>
                            </div>
                            </el-tooltip>
                            </div>
                        </div>
                        <div class="api-list-con">
                            <div class="api-list-item flex-bet bb1">
                            <div class="api-list-item-left flex">
                                <i class="el-icon-info mr5"></i>
                                <span class="title">查询开票信息</span>
                            </div>
                            <div class="api-list-item-right flex">
                                <i class="el-icon-edit"></i>
                            </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="right-bottom-con">
                        <div class="tool-bar flex-bet bb1">
                            <div class="flex mr5 nous">
                            <img src="./images/list.svg" alt="">
                            返回列数据设置
                            </div>
                            <div class="right-btn-con flex">
                            <el-tooltip class="item" effect="dark" content="刷新" :open-delay="1000" placement="top">
                            <div class="item-btn">
                                <i class="el-icon-refresh-right"></i>
                            </div>
                            </el-tooltip>
                            </div>
                        </div>
                    </div> -->
            </div>
        </div>
        <!-- 增加文件夹的窗口 -->
        <el-dialog title="查询条件" width="460px" append-to-body top="16vh" custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="cxtj.visible">
                <div class="mt20">
                <el-form :model="cxtj"  label-width="68px" label-position="left">
                        <el-form-item label="查询名称" >
                                <el-input v-model="cxtj.name" placeholder="请输入查询名称"></el-input>
                        </el-form-item>
                        <el-form-item label="控件类型" >
                                <el-input v-model="cxtj.type" placeholder="请输入控件类型"></el-input>
                        </el-form-item>
                        <el-form-item label="对应字段" >
                                <el-input v-model="cxtj.key" placeholder="请输入对应字段"></el-input>
                        </el-form-item>
                        <el-form-item label="默认值" >
                                <el-input v-model="cxtj.default" placeholder="请输入默认值"></el-input>
                        </el-form-item>
                        <el-form-item label="sql语句" >
                                <el-input v-model="cxtj.sql" type="textarea" :rows="5" placeholder="请输入sql语句"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div style="text-align:right;">
                                <el-button @click="cxtj.visible = false;">取消</el-button>
                                <el-button type="primary" @click="submitAddCxtj">提交</el-button>
                            </div>
                        </el-form-item> 
                </el-form>
                </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cxtj: {
                visible: false,
                formData: {
                    name: '',
                    type: '',
                    key: '',
                    sql: '',
                    default: ''
                }
            }
        }
    },
    methods: {
        clickAddCxtj(){
            this.cxtj.visible = true;
        },
        submitAddCxtj(){                //提交查询条件
            this.cxtj.visible = false;
        }
    },
    created(){

    },
    mounted(){

    },
}
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>