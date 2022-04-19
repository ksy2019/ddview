<!--
 * @Author: bluestar
 * @Date: 2021-10-27 09:01:53
 * @LastEditTime: 2022-04-19 17:39:14
 * @子组件的渲染方法
-->

<script>
/** 
 * 渲染容器组件
 */
function renderContent(h,currentItem){
    return  h(currentItem.tag, {
            class: "drawing-item",
            props: {
                config: currentItem,
                ref: currentItem.id,
            },
            scopedSlots: {
                default: props => {
                      return h('my-draggable',{
                          class: 'drawing-content '+props.conClass,
                          props: {
                                list: currentItem.children
                          }
                      })
                }
            }
    })
}
//渲染主体
function renderBody (h,currentItem){
    //渲染容器的方法
    if(currentItem.type==='container'){
        return  <div key={currentItem.id} onClick={event=>{
                      this.$activeFormItem(currentItem);
                      event.stopPropagation();
                }} class="drawing-item-con">
                    {renderContent.apply(this,arguments)}
                    {tools.itemBtns.apply(this,arguments)}
                </div>
    }
    let body =
        <div key={currentItem.id} onClick={event=>{
              this.$activeFormItem(currentItem);
              event.stopPropagation();
        }} class="drawing-item-con">
              <currentItem.tag class="drawing-item" ref={currentItem.id} config={currentItem}></currentItem.tag>
              {tools.itemBtns.apply(this,arguments)}
        </div>
    return (body)
}
function clickActive(currentItem){                    //激活单元=点击事件之后触发一次
  this.$emit('clickActive',currentItem)
}
function deleteItem(item,parent) {      //删除组件
    let index=0
    for(let x of parent){
        if(x.id==item.id){
            parent.splice(index,1)
            delete Vue.prototype['$'+item.id]
            return null
        } 
        if(x.children!==undefined&&x.children.length!=0){
            deleteItem(item,x.children)
        }
        index++
    }
}
// 功能操作按钮组件
const tools = {
  itemBtns(h, currentItem) {
    return [
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem.call(this,currentItem,this.list); event.stopPropagation()
      }}>
        <i class="el-icon-delete" />
      </span>
    ]
  }
}
function renderAll(h,list){
    let body= list.map((item)=>{
        return renderBody.call(this,h,item)
    })
    return  <draggable list={list}  group={ {name: 'componentsGroup'} } class="my-draggable-con" animation={340}  onClick={e => {
                clickActive.call(this,currentItem);
                e.stopPropagation();
            }}>
                {body}
            </draggable>
}
import {mapState} from 'vuex'
import draggable from 'vuedraggable'
import render from '@/components/render/render'
import Vue from 'vue'
export default {
  name: 'myDraggable',
  components: {
    render,
    draggable
  },
  computed: {
      ...mapState(['mode'])
  },
  props: [
    'list'
  ],
  //渲染事件
  render(h) {
        return renderAll.call(this,h,this.list);
  },
  created(){
  }
}
</script>
<style lang="less">
.drawing-item{
    min-height: 36px;
    padding: 10px;
    box-sizing: border-box;
}
.my-draggable-con{
    min-height: calc(100vh - 72px);
}
.drawing-content{
    width: 100%;
}
</style>
