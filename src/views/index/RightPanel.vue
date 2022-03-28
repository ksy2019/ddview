<template>
  <div class="right-board">
    <div class="tabs-con">
        <el-tabs v-model="currentTab" class="center-tabs">
            <el-tab-pane label="组件属性" name="config" />
            <el-tab-pane label="组件样式" name="style" />
            <el-tab-pane label="组件事件" name="event" />
            <el-tab-pane label="页面结构" name="tree" />
        </el-tabs>
    </div>
    <div v-if="!(activeData&&activeData.tag!=='super-view')"  class="nodata-empty">
        <el-empty style="padding-top: 15vh" description="请先选中组件"></el-empty>
    </div>
    <div v-if="activeData&&activeData.tag!=='super-view'" class="field-box">
        <el-scrollbar class="right-scrollbar">
            <div class="right-set-body" v-show="currentTab=='config'">
                  <div :is="activeData.tag" v-model="activeData"></div>
            </div>
            <div class="right-set-body" v-show="currentTab=='style'">
                  <div :is="activeData.tag+'-css'" v-model="activeData"></div>
            </div>
            <div class="right-set-body" v-show="currentTab=='event'">
                  <div :is="activeData.tag+'-event'" v-model="activeData"></div>
            </div>
            <div class="right-set-body" v-show="currentTab=='tree'">
                <tree-node v-model="drawingList"></tree-node>
            </div>
        </el-scrollbar>
    </div>
  </div>
</template>

<script>
import componentSet from '@/views/componentSet/componentsList.js'
export default {
  components: {
    'tree-node': ()=>import('./treeNode.vue'),
    ...componentSet,
  },
  props: ['activeData', 'drawingList'],
  data() {
      return {
          currentTab: 'config',
          formData: {},
          currentNode: null,
      }
  },
  computed: {
  },
  watch: {  
  },
  methods: { 
  }
}
</script>