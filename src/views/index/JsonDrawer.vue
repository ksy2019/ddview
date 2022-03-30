<!--
 * @Author: BlueStar
 * @Date: 2021-10-27 09:01:53
 * @LastEditTime: 2022-03-30 18:47:53
 * @Description: JSON代码编辑器
-->
<template>
  <div>
    <el-drawer v-bind="$attrs" v-on="$listeners" @opened="onOpen" @close="onClose">
      <div class="json-drawer-action-bar">
          <div class="left">
              <span class="bar-btn nos" v-if="save!==null" @click="submitSave">
                <i class="el-icon-document-checked" />
                保存
              </span>
              <span class="bar-btn copy-json-btn nos">
                <i class="el-icon-document-copy" />
                复制JSON
              </span>
              <span class="bar-btn nos" @click="exportJsonFile">
                <i class="el-icon-download" />
                导出JSON文件
              </span>
          </div>
          <div class="right">
              <span class="bar-btn delete-btn nos" @click="$emit('update:visible', false)">
                <i style="font-size: 1.2rem;" class="el-icon-circle-close"/>
              </span>
          </div>
      </div>
      <div id="editorJson" class="json-editor" />
    </el-drawer>
  </div>
</template>

<script>
import { beautifierConf } from '@/utils/index'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'

let beautifier
let monaco

export default {
  name: 'jsonDrawer',
  components: {},
  props: {
    jsonStr: {
      type: String,
      required: true
    },
    save: null
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('keydown', this.preventDefaultSave)
    const clipboard = new ClipboardJS('copy-json-btn', {
      text: trigger => {
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return this.beautifierJson
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.preventDefaultSave)
  },
  methods: {
    submitSave(){                 //提交保存
        try{
            console.log("获取到的代码",this.jsonEditor.getValue())
            this.save(JSON.parse(this.jsonEditor.getValue()))
        }catch (error) {
            this.$notify({
              title: '错误',
              message: 'JSON格式错误，请检查',
              type: 'error'
            })
        }
    },
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    },
    onOpen() {
      loadBeautifier(btf => {
        beautifier = btf
        this.beautifierJson = beautifier.js(this.jsonStr, beautifierConf.js)

        loadMonaco(val => {
          monaco = val
          this.setEditorValue('editorJson', this.beautifierJson)
        })
      })
    },
    onClose() {},
    setEditorValue(id, codeStr) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr)
      } else {
        //实例化moncao编辑器
        this.jsonEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: 'json',
          automaticLayout: true
        })
        // ctrl + s 刷新
        this.jsonEditor.onKeyDown(e => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.submitSave()
          }
        })
      }
    },
    exportJsonFile() {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.json`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.json`
        const codeStr = this.jsonEditor.getValue()
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, value)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
::v-deep .el-drawer__header {
  display: none;
}
.json-drawer-action-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  background: #4c4c53;
  color: #409EFF;
  padding: 0 12px; 
  div{
    display: flex;
    align-items: center;
    justify-content: center;
    span{

    }
  }
}
.json-editor{
  height: calc(100vh - 32px);
  overflow: hidden;
}
</style>
