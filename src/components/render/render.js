import { deepClone } from '@/utils/index'

const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
**/
 
const slotsFiles = require.context('./slots', false, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach(key => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  componentChild[tag] = value
})

///双向绑定事件
function vModel(dataObject, defaultValue) {
  dataObject.props.value = defaultValue

  dataObject.on.input = val => {
    this.$emit('input', val)
  }
}

function mountSlotFiles(h, confClone, children) {
  const childObjs = componentChild[confClone.__config__.tag]
  if (childObjs) {
    Object.keys(childObjs).forEach(key => {
      const childFunc = childObjs[key]
      if (confClone.__slot__ && confClone.__slot__[key]) {
        children.push(childFunc(h, confClone, key))
      }
    })
  }
}

///提交事件
function emitEvents(confClone) {
  ['on', 'nativeOn'].forEach(attr => {
    const eventKeyList = Object.keys(confClone[attr] || {})
    eventKeyList.forEach(key => {
      const val = confClone[attr][key]
      if (typeof val === 'string') {
        confClone[attr][key] = event => this.$emit(val, event)
      }
    })
  })
}
//渲染组件
function buildDataObject(confClone, dataObject) {
  let that=this
  //老写法 遍历配置文件  
  Object.keys(confClone).forEach(key => {
        let  val = confClone[key]
        //绑定vue事件emit
        if(key=='__event__'){
              for(let x in confClone.__event__){
                    dataObject.nativeOn[x]=()=>{  
                          eval(confClone.__event__[x])
                    }
              } 
        }
        //双向绑定
        if (key === '__vModel__') {
              vModel.call(this, dataObject, confClone.__config__.defaultValue)
        } else if (dataObject[key] !== undefined) {
        //当属性没有存在的时候
              if (dataObject[key] === null
              || dataObject[key] instanceof RegExp
              || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])) {
                    dataObject[key] = val       
              } else if (Array.isArray(dataObject[key])) {
                    //值为数组的时候展开对象
                    dataObject[key] = [...dataObject[key], ...val]
              } else {
                    dataObject[key] = { ...dataObject[key], ...val }
              }
        } else {
        //当属性已经存在的时候
              dataObject.attrs[key] = val
        }
  })

  // 清理属性
  clearAttrs(dataObject)
}

function clearAttrs(dataObject) {
  delete dataObject.attrs.__config__
  delete dataObject.attrs.__slot__
  delete dataObject.attrs.__methods__
}

function makeDataObject() {
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: false
  }
}
export default {
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  //渲染设计器组件
  render(h){
        const dataObject = makeDataObject() 
        const confClone = deepClone(this.conf)
        const children = this.$slots.default || []
        // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
        mountSlotFiles.call(this, h, confClone, children)
        // 将字符串类型的事件，发送为消息
        emitEvents.call(this, confClone)
        // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
        buildDataObject.call(this, confClone, dataObject)
        return this.$root.$createElement(this.conf.__config__.tag, dataObject,children)
  } 
}
