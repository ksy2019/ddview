<template>
    <!-- //table-group组件设置 -->
    <div class="set-con">
        <div class="set-row">
            <span class="mr5">组件名称</span>
            {{config.id}}
        </div>
        <div class="set-row-between nos">
            <span class="nos color1">文本内容</span>
            <div>
                <el-input v-model="data.text"></el-input>
            </div>
        </div>
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
            data: {}
        }
    },
    watch:{
        data: {
            handler(){
                console.log('改变了数据')
                this.$emit('changeConfig',this.data)
            },
            deep: true
        }
    },
    methods: {
    },
    created(){
        this.data = this.config
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
@import "@/styles/global.scss"
</style>