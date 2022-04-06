<template>
  <div  class="container">
    <!-- 最顶端头部 --> 
    <div class="header">
        <div class="logo nous">
            ⚡SuperCode
        </div>
        <div class="tool-bar">
            <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
              清空
            </el-button>
           <el-button icon="el-icon-circle-check" type="text" @click="saveToService">
              保存页面
            </el-button>
        </div>
    </div>
    <div class="main-body">
        <!-- //顶部左侧组件列表 -->
        <div :style="{width: showCollapse? '0px':'210px'}" class="left-board">
          <!-- //左侧组件列表 -->
          <el-scrollbar class="left-scrollbar">
            <div class="scrollbar components-list">
              <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
                <div class="components-title">
                  <svg-icon icon-class="component" />
                  {{ item.title}}
                </div>
                <draggable
                  class="components-draggable"
                  :list="item.list"
                  :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                  :clone="cloneComponent"
                  draggable=".components-item"
                  :sort="false"
                  @end="onEnd"
                >
                  <div
                    v-for="(element,index) in item.list"
                    :key="index"
                    class="components-item"
                    @click="addComponent(element)"
                  >
                    <div class="components-body">
                      <i :class="element.icon" />
                      {{ element.name }}
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
            <!-- //左侧隐藏展开栏 -->
            <div class="collapse-show" @click="showCollapse=!showCollapse" v-show="showCollapse">
                <transition enter-active-class="filpin" leave-active-class="filpout">
                    <div  v-show="showCollapse" class="showColl nos">
                            <i  class="el-icon-caret-right"></i>
                    </div>
                </transition>
            </div>
            <div @click="showCollapse=!showCollapse" v-show="!showCollapse" class="clickColl nos">
                <span>收起</span> <i :style="{'transform': showCollapse?'rotate(180deg)':'rotate(0)'}"  class="el-icon-caret-left"></i>
            </div>
          </el-scrollbar>
        </div>
        <!-- //中央菜单栏 -->
        <div :style="{'margin-left': showCollapse? '0px':'210px'}" class="center-board">
          <div class="action-bar">
              <el-button icon="el-icon-document-add" type="text" @click="insertJson">
                  <!-- //插入代码 -->
              </el-button> 
              <el-button icon="el-icon-view" type="text" @click="showJson">
              </el-button>
              <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="saveToService">
              </el-button>
              <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
              </el-button>
          </div>
          <!-- //中间的工作台 -->
          <el-scrollbar class="center-scrollbar ">
              <my-draggable
                  :list="drawingList.children"
                  @activeItem="activeFormItem"
              />
              <div v-show="!drawingList.children||!drawingList.children.length" class="empty-info">
                  从左侧拖入或点选组件进行页面设计
              </div>
          </el-scrollbar>
        </div>
        <!-- //右侧操作面板 -->
        <right-panel
          :active-data="activeData"
          :drawingList="drawingList"
        />
    </div>
    <!-- //JSON显示接口 -->
    <json-drawer
      :save="editJsonType=='insert'? saveJson: null"
      size="60%"
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
      @refresh="refreshJson"
    />
    <input id="copyNode" type="hidden">
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import ClipboardJS from 'clipboard'
import render from '@/components/render/render'
import FormDrawer from './FormDrawer'
import JsonDrawer from './JsonDrawer'
import RightPanel from './RightPanel'
import {layoutComponents,myComponents } from '@/components/generator/config'
import {  deepClone, isObjectObject} from '@/utils/index' 
import drawingDefalut from '@/components/generator/drawingDefalut'
import CodeTypeDialog from './CodeTypeDialog'
import myDraggable from './myDraggable'
import {getDrawingList, saveDrawingList} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'
import { Base64 } from 'js-base64'
const drawingListInDB = getDrawingList()
export default {
  name: 'home',
  components: {                     //可使用组件
    draggable,
    render,
    FormDrawer,
    JsonDrawer,
    RightPanel,
    CodeTypeDialog,
    myDraggable,
  },
  data() {
    return {
      showCollapse: false,            //是否显示展开框
      drawingList: drawingDefalut,  //当前页面的全部JSON合集
      activeId: drawingDefalut,     //当前编辑的组件ID
      formData: {},                 //当前编辑的表单数据
      dialogVisible: false,         //是否显示预览当前组件
      jsonDrawerVisible: false,     //是否显示json编辑器
      activeData: drawingDefalut[0],//当前编辑的组件
      saveDrawingListDebounce: debounce(1200, saveDrawingList),
      leftComponents: [
        {
          title: '功能单元',
          list: myComponents
        },
        {
          title: '容器型组件',
          list: layoutComponents
        }
      ],
      editJsonType: ''
    }
  },
  computed: {
  },
  watch: { 
    drawingList: {
      handler(val) {
        this.saveDrawingListDebounce(val)
      },
      deep: true
    },
  },
  created(){
    this.pageid = this.$route.query.pageid;
    this.initPage();
  },
  mounted() {
    Vue.prototype.$activeFormItem = this.activeFormItem;
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      this.drawingList = drawingListInDB
    } else {
      this.drawingList = drawingDefalut;
    }
    this.activeFormItem(this.drawingList)
    //初始化编辑器
    loadBeautifier(btf => {
      beautifier = btf;
    })
    //复制代码
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败');
    })
  },
  methods: {
    async initPage(){                 //获取页面数据 
      setTimeout(()=>{
          this.mloading = this.$loading.service({
              lock: true,
              text: '正在处理数据',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          })
      },320)
      let res = await axios.post(this.$config.urlh + '/NEWKP/DEV/GetPage','id='+this.pageid);
      setTimeout(()=>{
        this.mloading.close();
      },320)
      if(res.PAGEJSON){
        this.drawingList = JSON.parse(Base64.decode(res.PAGEJSON.replace(/ /g,'+')))
      }
      console.log(res);
    },
    saveJson(item){                //保存json
        this.drawingList = item ;
    },
    setObjectValueReduce(obj, strKeys, data) {
      const arr = strKeys.split('.')
      arr.reduce((pre, item, i) => {
        if (arr.length === i + 1) {
          pre[item] = data
        } else if (!isObjectObject(pre[item])) {
          pre[item] = {}
        }
        return pre[item]
      }, obj)
    },
    setRespData(component, resp) {
      const { dataPath, renderKey, dataConsumer } = component
      if (!dataPath || !dataConsumer) return
      const respData = dataPath.split('.').reduce((pre, item) => pre[item], resp)

      // 将请求回来的数据，赋值到指定属性。
      // 以el-tabel为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
      // 此时赋值代码可写成 component[dataConsumer] = respData；
      // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
      this.setObjectValueReduce(component, dataConsumer, respData)
      const i = this.drawingList.findIndex(item => item.renderKey === renderKey)
      if (i > -1) this.$set(this.drawingList, i, component)
    },
    fetchData(component) {
      // const { dataType, method, url } = component
      // if (dataType === 'dynamic' && method && url) {
      //   this.setLoading(component, true)
      //   this.$axios({
      //     method,
      //     url
      //   }).then(resp => {
      //     this.setLoading(component, false)
      //     this.setRespData(component, resp.data)
      //   })
      // }
    },
    insertJson(){                           //向编辑器插入json
        this.jsonDrawerVisible = true;
        this.editJsonType ='insert'
    },
    setLoading(component, val) {            //设置loading
      const { directives } = component
      if (Array.isArray(directives)) {
        const t = directives.find(d => d.name === 'loading')
        if (t) t.value = val
      }
    },
    activeFormItem(currentItem) {
      console.log("调用了切换当前元素");
      this.activeData = currentItem
      this.activeId = currentItem.id
    },
    ///左侧拖入中央
    onEnd(obj) {
      if (obj.from !== obj.to) {
      }
    },
    setItemId(item){                    //给组件增加ID,并将引用挂载到vue的定成
          item.id=item.tag.replace('-','') + new Date().getTime();
    },
    addComponent(item) {                //添加组件
      console.log('触发添加组件')
      let temp = this.cloneComponent(item)
      this.setItemId(item)
      this.drawingList.children.push(temp)
    },
    cloneComponent(origin) {        //插入元素执行的事件
      const clone = deepClone(origin)
      this.createIdAndKey(clone)
      this.activeData=clone
      return clone
    },
    createIdAndKey(item) {
      item.id= item.tag.replace('-','') + new Date().getTime();
      return item;
    },
    AssembleFormData() {              //生成json展示对象
      this.formData = {
         ...deepClone(this.drawingList),
      }
    },
    empty() {               //清空表单事件
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList.children = [];
          //删除组件
        }
      )
    },
    showJson() {      //展示JSON
      this.editJsonType = '';
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    run() {         //预览工作
      this.dialogVisible = true
      this.operationType = 'run'
    },
    async saveToService(){    //将JSON保存到服务器
        let res = await axios.post(this.$config.urlh + '/NEWKP/DEV/SavePage','id='+this.pageid+'&pagejson=['+Base64.encode(JSON.stringify(this.drawingList))+']');
        if(res.Result=='1'){
          this.$message.success(res.Message)
        }else{
          this.$message.warning(res.Message)
        }
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      const config = newTag
      newTag.__vModel__ = this.activeData.__vModel__
      config.formId = this.activeId
      config.span = this.activeData
      this.activeData.tag = config.tag
      this.activeData.document = config.document
      if (typeof this.activeData.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.defaultValue
      }
      Object.keys(newTag).forEach(key => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
        const index = list.findIndex(item => item.id === this.activeId)
        if (index > -1) {
          list.splice(index, 1, newTag)
        } else {
          list.forEach(item => {
            if (Array.isArray(item.children)) this.updateDrawingList(newTag, item.children)
          })
        }
    },
    refreshJson(data) {
        this.drawingList = deepClone(data)
        delete data.fields
    }
  }
}
</script>

<style lang='scss'>
@import '@/styles/home.scss';
</style>