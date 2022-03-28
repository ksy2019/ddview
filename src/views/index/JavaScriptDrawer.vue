<template>
  <!-- //JavaScript代码编辑器 -->
  <div>
    <el-drawer :withHeader="false" v-bind="$attrs" v-on="$listeners" @opened="onOpen">
      <div class="javascript-tool-bar" :style="{'text-align': 'left'}">
        <div class="tool-left nos">
            JavaScript编辑器
        </div>
        <div class="right">
            <span class="bar-btn copy-js-btn">
                <i class="el-icon-document-copy"/>
                复制代码
            </span>
            <span @click="save" class="bar-btn">
                <i class="el-icon-folder-checked" />
                保存代码
            </span>
            <span class="bar-btn delete-btn" @click="$emit('update:visible', false)">
                <i class="el-icon-circle-close" />
                关闭
            </span>
        </div>
      </div>
      <!-- //左侧功能区域 -->
      <div class="left-menu"> 
          <div class="top">
            <el-scrollbar>
              <el-tree
                ref="tree"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :data="[drawingList]"
                :props="treeProp"
                highlight-current
                @node-click="treeNodeClick"
              >
              </el-tree>
            </el-scrollbar>
          </div>
          <!-- //组件引用说明 -->
          <div class="bottom" v-if="indexEl.name">
            <el-scrollbar>
              <div class="info-bar-header mb15">
                  <div>
                      <span class="mr10">组件名称</span>
                      <span>{{indexEl.name}}</span>
                  </div>
                  <div>
                      <span class="mr10">组件引用：</span>
                      <span @click="copyText('this.$'+indexEl.id)" class="mr10 color1 nos">{{'this.$'+indexEl.id}}</span>
                  </div>
              </div>
              <div v-if="indexEl.apis.length!==0" class="mb10">组件方法</div>
              <el-table 
                  v-if="indexEl.apis.length!==0"
                  :data="indexEl.apis"
                  style="width: 100%"
                  stripe
                  border
                  >
                  <el-table-column
                  prop="label"
                  label="序号"
                  type="index"
                  align="center"
                  width="55">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  header-align="center"
                  align="name"
                  label="方法"
                  width="100">
                      <div slot-scope="slot" @click="copyText('this.$'+indexEl.id+'.'+slot.row.name+'();')" class="primary nos">{{slot.row.name}}</div>
                  </el-table-column> 
                  <el-table-column
                  prop="info"
                  header-align="center"
                  align="left"
                  label="说明"
                  min-width="120">
                  </el-table-column> 
                  <el-table-column
                  prop="params"
                  header-align="center"
                  align="left"
                  label="参数"
                  min-width="120">
                  </el-table-column> 
              </el-table>
              <div v-if="indexEl.props.length!==0" class="mb10 mt10">组件变量</div>
              <el-table 
                  :data="indexEl.props"
                  v-if="indexEl.props.length!==0"
                  style="width: 100%"
                  border
                  stripe
                  >
                  <el-table-column
                  prop="label"
                  label="序号"
                  type="index"
                  align="center"
                  width="55">
                  </el-table-column>
                  <el-table-column
                  prop="name"
                  header-align="center"
                  align="left"
                  label="变量"
                  width="100">
                      <div slot-scope="slot" @click="copyText('this.$'+indexEl.id+'.'+slot.row.name)" class="primary nos">{{slot.row.name}}</div>
                  </el-table-column>
                  <el-table-column
                  prop="info"
                  header-align="center"
                  align="left"
                  label="说明"
                  min-width="120">
                  </el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
      </div>
      <div id="editorJson" class="json-editor" />
    </el-drawer>
  </div>
</template>

<script>
import { beautifierConf } from '@/utils/index'
import ClipboardJS from 'clipboard'
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'
import { mapState } from 'vuex'
let beautifier
let monaco
import tree from 'vue-giant-tree'
import { Base64 } from 'js-base64'
export default {
  components: {
    tree,
  },
  props: {
      javascript: String,
  },
  computed: {
      ...mapState(['drawingList','drawingListDeeps'])
  },
  data() {
    return {
      treeProp: {               //页面的树形结构
          label: 'name',
          children: 'children'
      },
      indexEl: {},              //当前选中的元素对象
    }
  },
  model:{
      prop: 'javascript',
      event: 'save'
  },
  mounted() {           //组件初始化
      window.addEventListener('keydown', this.preventDefaultSave)
      //挂载一键复制的对象
      const clipboard = new ClipboardJS('.copy-js-btn', {
        text: trigger => {
          this.$notify({
            title: '成功',
            message: '代码已复制到剪切板，可粘贴✔',
            type: 'success'
          })
          return this.beautifierJs
        }
      })
      clipboard.on('error', e => {
          this.$message.error('代码复制失败')
      })
  },
  beforeDestroy() {     //销毁时取消监听保存代码
    window.removeEventListener('keydown', this.preventDefaultSave)
  },
  methods: {
    copyText(text){                  //复制选中的应用引用
        this.$base.copyT(text)
    },
    treeNodeClick(el,node){                //树节点点击之后的事件
        this.$refs.tree.setCurrentKey(null)
        this.$nextTick(()=>{
          this.$refs.tree.setCurrentNode(el)
        })
        this.indexEl=el
    },
    preventDefaultSave(e) {         //阻止默认事件
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    },
    onOpen() {                      //初始化函数
      loadBeautifier(btf => {
        beautifier = btf
        this.beautifierJs = beautifier.js(Base64.decode(this.javascript), beautifierConf.js)
        loadMonaco(val => {
            monaco = val
            this.setEditorValue('editorJson', this.beautifierJs)
        })
      })
    },
    setEditorValue(id, codeStr) {     //设置编辑器的值
      if (this.javaScriptEditor) {
        this.javaScriptEditor.setValue(codeStr)
      } else {
        codeStr=
`/**
*
*       当前在函数内，直接编写流程代码即可
*       this指向当前组件实例
*
*/
`+codeStr
        //实例化moncao编辑器
        this.javaScriptEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: 'javascript',
          automaticLayout: true
        })
        // ctrl + s 刷新
        this.javaScriptEditor.onKeyDown(e => {
            if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
                this.save()
            }
        })
      }
    },
    treeClick(item){
        console.log(item)
    },
    save() {                       //刷新数据
      try {
          this.$emit('save', Base64.encode(this.javaScriptEditor.getValue()))
          this.$notify({
              title: '提示'
              ,message: '代码保存成功'
              ,type: 'success'
          })
      } catch (error) {
          this.$notify({
              title: '错误',
              message: 'JavaScript格式错误，请检查',
              type: 'error'
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/allVar.scss';
::v-deep .el-drawer__header {
  display: none;
}
.javascript-tool-bar{
    height: $activeHeight;
    line-height: $activeHeight;
    background: $dark;
    color: $activeColor;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    .bar-btn{
        margin-left: 15px;
        cursor: pointer;
    }
}
.json-editor{
    height: calc(100vh - #{$activeHeight});
    overflow: hidden;
}
.left-menu{
    width: 40vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    color: #fff;
    box-sizing: border-box;
    z-index: 3099;
    .top{
        height: 40%;
        background: #29eff81f; 
        backdrop-filter: blur(7px);
        padding: 16px 20px; 
        overflow: auto;
        ::v-deep .node_name {
            color: #fff;
        }
        ::v-deep .ztree .button{
            color: #fff;
            &::before{
              border-color: transparent transparent transparent #fff !important;
            }
        }
    }
    .top span{
      color: #fff;
    }
    .bottom{
        height: 60%;
        padding: 16px 20px;
        background: #5fbaf620; 
        backdrop-filter: blur(7px);
        overflow: auto;
    }
}
::v-deep .el-tree{
    color: #ffffff;
    background: #ffffff00;
    .el-tree-node__label{
      font-size: 9pt;
    }
    .el-tree-node__expand-icon{
        color: #ffffff;
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
.info-bar-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
::v-deep .is-current > .el-tree-node__content{
    .el-tree-node__label{
        display: inline-block;
        padding: 5px 10px;
        background: blue !important;
        border-radius: 6px;
    }
}
::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: #ededed00 !important;
}
.copy-color{
    color: #ffb100;
}
</style>
