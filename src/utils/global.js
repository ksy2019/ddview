/*
 * @Author: BlueStar
 * @Date: 2022-01-07 17:09:10
 * @LastEditTime: 2022-04-08 18:08:31
 * @Description: 全局js函数
 */
import Sortable from 'sortablejs';
export default {
    color: {
        'warning': '橙色',
        'primary': '蓝色',
        'danger': '红色',
        '': '- - -'
    },
    initSortable({className,data,key,tableRef}){            //初始化排序功能
        this.$nextTick(() => {
            this.sortable = Sortable.create( this.$refs[tableRef].$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                handle: '.' + className,
                onEnd: ({
                    newIndex,
                    oldIndex
                }) => {
                    let columns = this.$base.deepCopy(data[key]);
                    let currRow = columns.splice(oldIndex, 1)[0]
                    columns.splice(newIndex, 0, currRow)
                    Object.assign(data[key],columns)
                    this.$set(this.config,'lastUpdateTime',new Date().getTime())
                }
            })
        })
    }
}