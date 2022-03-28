/*
 * @Author: BlueStar
 * @初始化右侧组件设置组件
 */
let ob = {};
let components = [
    'table-group',
    'btn-group',
    'search-group',
    'view-between',
    's-dialog',
    's-text',
    'form-group',
    'view-m'
]
for(let item of components){
    ob[item] = ()=>import(`./${item}/index.vue`)
    ob[item+'-css'] = ()=>import(`./${item}/css.vue`)
    ob[item+"-event"] = ()=>import(`./${item}/event.vue`)
}
module.exports=ob;