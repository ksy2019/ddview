<!--
 * @Author: BlueStar
 * @Date: 2022-03-29 14:20:06
 * @LastEditTime: 2022-03-30 18:21:20
 * @Description: 模板视图
-->
<!--
 * @Author: BlueStar
 *
-->
<template>
        <div class="kpdd-container">
                <super-view :config="superView"/>
        </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
        name: 'test',
        computed:{
                ...mapState([])
        },
        data(){
                return{
                        superView: {
  "tag": "super-view",
  "id": "superView9981",
  "name": "页面",
  "children": [{
    "name": "单行容器",
    "tag": "view-between",
    "css": {
      "padding": "12px",
      "margin": "",
      "box-sizing": "border-box",
      "position": "",
      "left": "",
      "right": "",
      "top": "",
      "bottom": "",
      "border": "",
      "border-radius": "",
      "background": ""
    },
    "id": "viewbetween1648261391736",
    "type": "container",
    "children": [{
      "name": "搜索组",
      "tag": "search-group",
      "table": "$tablegroup1648261394885",
      "css": {
        "padding": "",
        "margin": "",
        "position": "",
        "left": "",
        "right": "",
        "top": "",
        "bottom": "",
        "border": "",
        "border-radius": "",
        "background": ""
      },
      "searchText": "",
      "serachIcon": "",
      "url": "/SHKJ/ZNKAPI/WCZZD",
      "method": "post",
      "formType": "form",
      "showLabel": false,
      "id": "searchgroup1648261392788",
      "other": [{
        "key": "name",
        "type": "static",
        "value": "",
        "_XID": "row_12"
      }],
      "linkTabel": "dataList",
      "items": [{
        "type": "input",
        "placeholder": "请输入关键字",
        "value": "gjz",
        "width": "",
        "showLabel": false,
        "label": "关键字段",
        "id": "630a2b23cb4128eb677895dabe8df632",
        "_XID": "row_20"
      }],
      "more": {
        "labelWidth": "",
        "spans": "1",
        "items": []
      },
      "props": [{
        "name": "attr",
        "info": "获取当前组件属性"
      }],
      "apis": []
    }]
  }, {
    "name": "table组件",
    "tag": "table-group",
    "key": "FPZL,XTLSH",
    "css": {
      "padding": "0 12px",
      "box-sizing": "border-box",
      "margin": "",
      "position": "",
      "left": "",
      "right": "",
      "top": "",
      "bottom": "",
      "border": "",
      "border-radius": "",
      "background": ""
    },
    "id": "tablegroup1648261394885",
    "showPage": "1",
    "showFooter": true,
    "columns": [{
      "label": "",
      "field": "",
      "type": "seq",
      "width": "35",
      "align": "center",
      "headalign": "center",
      "color": "",
      "id": "c6ef915cde03d7eba36f4e15fd2335c5",
      "xh": "00",
      "fixed": "left"
    }, {
      "label": "",
      "field": "",
      "type": "checkbox",
      "width": "55",
      "align": "center",
      "headalign": "center",
      "color": "",
      "id": "dd9869d6325dfb6cddaeacdf37578eba",
      "xh": "00",
      "fixed": "left"
    }, {
      "label": "单据号",
      "field": "BILLID",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20d5b840a04d9f8b7fff678d3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    },{
      "label": "广场名称",
      "field": "PLAZANAME",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20d5b840a04d9qwerwqrweqrweq",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    },{
      "label": "用户名称",
      "field": "TRADERNAME",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20dqwerwerqwer78d3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    }, {
      "label": "铺位号",
      "field": "BUNKDESC",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20d5qwerwqerqwrwqer78d3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    }, {
      "label": "收款日期",
      "field": "DOCUMENTDATE",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20dqwerqwwerqw7fff678d3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    }, {
      "label": "缴费数量",
      "field": "RECEIPTAMT",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20d5bqwer123123678d3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    },   {
      "label": "已充值数量",
      "field": "YCZJE",
      "width": "100",
      "type": "",
      "align": "left",
      "headalign": "center",
      "color": "",
      "id": "011729e20d5b840a123123ewrtd3",
      "xh": "5",
      "sumcol": "",
      "fixed": ""
    }, 
    // {
    //   "fixed": "right",
    //   "label": "操作",
    //   "width": "60",
    //   "type": "",
    //   "color": "",
    //   "id": "bfebd7fb2f7303323708627e34e58dd4",
    //   "children": [{
    //     "label": "查看",
    //     "field": "",
    //     "align": "center",
    //     "headalign": "center",
    //     "color": "primary",
    //     "id": "d98109cca53158b10184a524448e44f6",
    //     "xh": "4100",
    //     "onClick": ""
    //   }]
    // }
    ],
    "props": [],
    "apis": [{
      "name": "getSelection",
      "info": "获取当前选中数据（返回数组）"
    }, {
      "name": "clearSeletion",
      "info": "清除表单的选中状态",
      "params": ""
    }]
  }]
},
                }
        },
        methods: {
            async initPage(){           //初始化界面信息
                let res  = await axios.post('')
            }
        },
        created(){
                this.initPage()
        },
        mounted(){
                Vue.prototype.$sjsh = this;
        }
}
</script>

<style lang="less" scoped>
</style>