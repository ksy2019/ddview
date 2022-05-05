export default (Vue)=>{
        Vue.directive('clickAgain', {
            inserted(el, binding) {
              el.addEventListener('click', e => {
                if (!el.disabled) {
                  el.disabled = true
                  el.style.cursor = 'not-allowed'
                  setTimeout(() => {
                    el.style.cursor = 'pointer'
                    el.disabled = false
                  }, 320)
                }
              })
            }
          })  
          Vue.directive('clickout', {
            bind: function(el, binding, vode) {
             function documentHandler (e) {
              if (el.contains(e.target)) {
               return false
              }
              if (binding.expression) {
               binding.value(e)
              }
             }
             el.__vueClickOutSide__ = documentHandler
             document.addEventListener('click', documentHandler)
            },
            unbind: function(el, binding) {
             document.removeEventListener('click', el.__vueClickOutSide__)
             delete el.__vueClickOutSide__
            }
           }),
          // v-dialogDrag: 弹窗拖拽,主要用于el-dialog
           Vue.directive('dialogDrag', {
              bind(el, binding, vnode, oldVnode) {
                  const headerElement = el.querySelector('.el-dialog__header')
                  const dragDialog = el.querySelector('.el-dialog') 
                  headerElement.style.cursor = 'move'
                  // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
                  const sty = dragDialog.currentStyle || window.getComputedStyle(dragDialog, null)

                  headerElement.onmousedown = (e) => {
                      // 鼠标按下，计算当前元素距离可视区的距离
                      const disX = e.clientX - headerElement.offsetLeft
                      const disY = e.clientY - headerElement.offsetTop
                      // 获取到的值带px 正则匹配替换
                      let styL, styT
                      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                      if (sty.left.includes('%')) {
                          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
                          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
                      } else {
                          styL = +sty.left.replace(/\px/g, '')  // 写成/px/g 也行
                          styT = +sty.top.replace(/\px/g, '')
                      }

                      document.onmousemove = function (e) {
                          // 通过事件委托，计算移动的距离
                          const l = e.clientX - disX
                          const t = e.clientY - disY
                          // 移动当前元素
                          dragDialog.style.left = `${l + styL}px`
                          dragDialog.style.top = `${t + styT}px`
                          // 将此时的位置传出去
                          // binding.value({x:e.pageX,y:e.pageY})
                      }

                      document.onmouseup = function (e) {
                          document.onmousemove = null
                          document.onmouseup = null
                      }
                  }
              }
           }),
           Vue.directive('drag', function(el) {
            let handle=el.querySelector('.drag-handle')
            handle.style.cursor = 'move'
            el.style.position = 'absolute'
            handle.onmousedown = function(ev) {
              // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
              var sX = ev.clientX - el.offsetLeft
              var sY = ev.clientY - el.offsetTop
              document.onmousemove = function(ev) {
                var eX = ev.clientX - sX
                var eY = ev.clientY - sY
                // 不断地更新元素的left、top值
                el.style.left = eX + 'px'
                el.style.top = eY + 'px'
              }
              document.onmouseup = function() {
                // 清除mousemove事件
                document.onmousemove = null
              }
            }
          })
}
