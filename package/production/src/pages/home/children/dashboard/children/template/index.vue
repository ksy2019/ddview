<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 14:20:06
 * @LastEditTime: 2022-05-14 11:44:49
 * @Description: 模板视图
-->
<template>
        <div v-loading="loading" class="kpdd-container">
                <super-view :config="superView"/>
        </div>
</template>

<script>
import { Base64 } from 'js-base64'
import {mapState} from 'vuex'
export default {
        name: 'test',
        computed:{
                ...mapState([])
        },
        data(){
                return{
                        superView: {},
                        loading: true,
                }
        },
        methods: {
            async initPage(){           //初始化界面信息
                console.log('载入页面',this.id)
                let res  = await axios.post(this.$config.urlh+ '/NEWKP/DEV/GetPage','id='+this.id)
                if(res.PAGEJSON){
                    this.superView = JSON.parse(Base64.decode(res.PAGEJSON.replace(/ /g,'+')))
                }
                setTimeout(() => {
                    this.loading = false;
                }, 220);
            }
        },
        created(){
                this.id = this.$route.query.id;
                this.initPage();
        },
        mounted(){
        }
}
</script>

<style lang="less" scoped>
.kpdd-container{
        height: 100%;
}
</style>