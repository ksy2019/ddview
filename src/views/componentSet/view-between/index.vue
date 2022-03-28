<template>
    <!-- //btn-group组件设置 -->
    <div>
        <div class="set-row">
            <span>组件名称</span>
            {{config.name}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        config: Object,
    },
    model: {                                //自定义Model
        prop: 'config',
        event: 'changeConfig'
    },
    data(){
        return {

        }
    },
    methods: {

    },
    created(){

    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/global.scss";
</style>