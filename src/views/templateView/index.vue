<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 14:20:06
 * @LastEditTime: 2022-03-29 14:38:32
 * @Description: 模板视图
-->
<!--
 * @Author: BlueStar
 *
-->
<template>
        <div class="kpdd-container">
                kpdd-container
                <super-view :config="superView"/>
        </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
        name: 'test',
        computed:{
                ...mapState([])
        },
        data(){
                return{
                        superView: {},
                }
        },
        methods: {
            async initPage(){           //初始化界面信息
                let res  = await axios.post('')
            }
        },
        created(){
                this.initPage()
        },
        mounted(){
                Vue.prototype.$sjsh = this;
        }
}
</script>

<style lang="less" scoped>
</style>