<!--
 * @Author: BlueStar
 * @Date: 2021-11-05 15:52:38
 * @LastEditTime: 2022-04-07 11:35:20
 * @Description: 组件的css样
-->
<template>
    <div class="css-container"> 
            <div class="set-con">
                <div class="set-row">
                    <span class="mr5">组件ID</span>
                    {{config.id}}
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">内边距</span>
                    <div>
                        <el-input v-model="cache.css.padding"></el-input>
                    </div>
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">外边距</span>
                    <div>
                        <el-input v-model="cache.css.margin"></el-input>
                    </div>
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">定位方法</span>
                    <div>
                        <el-select v-model="cache.css.position">
                            <el-option value="relative" label="相对布局"></el-option>
                            <el-option value="absolute" label="绝对布局"></el-option>
                            <el-option value="sticky" label="粘性布局"></el-option>
                            <el-option value="static" label="静态布局"></el-option>
                        </el-select>
                    </div>
                </div>
                <div v-show="cache.css.position&&cache.css.position!=''&&cache.css.position!='static'" class="set-row-between nos">
                    <span class="nos color1">左偏移</span>
                    <div>
                        <el-input v-model="cache.css.left"></el-input>
                    </div>
                </div>
                <div v-show="cache.css.position&&cache.css.position!=''&&cache.css.position!='static'"  class="set-row-between nos">
                    <span class="nos color1">右偏移</span>
                    <div>
                        <el-input v-model="cache.css.right"></el-input>
                    </div>
                </div>
                <div v-show="cache.css.position&&cache.css.position!=''&&cache.css.position!='static'"  class="set-row-between nos">
                    <span class="nos color1">上偏移</span>
                    <div>
                        <el-input v-model="cache.css.top"></el-input>
                    </div>
                </div>
                <div v-show="cache.css.position&&cache.css.position!=''&&cache.css.position!='static'" class="set-row-between nos">
                    <span class="nos color1">下偏移</span>
                    <div>
                        <el-input v-model="cache.css.bottom"></el-input>
                    </div>
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">边框设置</span>
                    <div>
                        <el-input v-model="cache.css.border"></el-input>
                    </div>
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">边框圆角</span>
                    <div><el-input-number v-model="cache.css.borderRadius" controls-position="right"  :min="0"></el-input-number>
                    </div>
                </div>
                <div class="set-row-between nos">
                    <span class="nos color1">背景颜色</span>
                    <div>
                        <el-input v-model="cache.css.background"></el-input>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props: ['config'],
    model: {
        prop: 'config',
        event: 'change'
    },
    data(){
        return {
            cache: {
                css: {
                    padding: '',
                    margin: '',
                    position: '',
                    left: '',
                    right: '',
                    top: '',
                    bottom: '',
                    border: '',
                    'border-radius': '',
                    background: ''
                }
            }
        }
    },
    watch: {
        cache: {
            handler(){
                //更新config设置
                let data = this.config
                data.css=this.cache.css;
                this.$emit('change',data)
            },
            deep: true
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
</style>