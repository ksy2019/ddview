<template>
  <!-- //右侧树形菜单 -->
  <div class="tree-con">
        <el-tree
          :data="[drawingList]"
          :props="treeProp"
        >
        </el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['drawingList'])
    },
    components: {
    },
    data(){
        return{ 
            treeProp: {
                label: 'name',
                children: 'children'
            }
        }
    },
    created(){
    },
    mounted(){ 
    }
}
</script>

<style lang="scss" scoped>
$treeColor: #000;
.tree-con{
  padding: 10px 12px;
}
::v-deep .el-tree{
    color: $treeColor;
    background: #ffffff00;
    .el-tree-node__label{
      font-size: 9pt;
    }
    .el-tree-node__expand-icon{
        color: $treeColor;
    }
    .el-tree-node__expand-icon.is-leaf{
        color: transparent !important;
    }
    .el-tree-node__content:hover{
        background: #ffffff00;
    }
    .el-tree-node:focus>.el-tree-node__content{
        background: #ffffff00;
    }
}
</style>