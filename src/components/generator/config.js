
/*
    配置说明
        name            组件的中文名称
        tag             组件标签名称
        type            组件类型，容器container 
        items           子元素属性
        padding         元素内边距
        margin          元素外边距
*/ 
//功能单元
function guid(){
        function S4() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+""+S4()+""+S4()+""+S4()+""+S4()+S4()+S4());
}
export const myComponents=[
           //按钮组     btn-group
          {
            name: "按钮组",
            tag: "btn-group",
            css: "",                          //元素的css内联，优先级最高
            items: [
                    {
                            "label": "批量打印",
                            "onClick": "",
                            "color": "primary",
                            "icon": "el-icon-medal",
                            "id": guid(),
                            "xh": "100",
                            "children": [
                            {
                                    "label": "批量打印清单",
                                    "fName": "pldyqd",
                                    "color": "primary",
                                    "id": guid(),
                                    "xh": "101",
                            },
                            {
                                    "label": "打印快递",
                                    "fName": "dykd",
                                    "color": "primary",
                                    "id": guid(),
                                    "xh": "102",
                            }
                            ]
                    },
                    {
                            "label": "发票作废",
                            "onClick": "",
                            "color": "primary",
                            "icon": "el-icon-medal",
                            "id": guid(),
                            "xh": "200",
                            "children": []
                    },
                    {
                            "label": "发票复制",
                            "onClick": "",
                            "color": "primary",
                            "icon": "el-icon-medal",
                            "id": guid(),
                            "xh": "300",
                            "children": [
                            {
                                    "label": "生成红字发票",
                                    "onClick": "",
                                    "color": "primary",
                                    "id": guid(),
                                    "xh": "301",
                            },
                            {
                                    "label": "生成红字信息表",
                                    "onClick": "",
                                    "color": "primary",
                                    "id": guid(),
                                    "xh": "302",
                            }
                            ]
                    },
            ],
            props: [                          //方法                             
                {
                        name: 'attr',
                        info: '获取当前组件属性'
                },
            ],
            apis: [                            //事件
                       
            ]
          },
          //搜索组件    search-group
          {
            name: '搜索组',
            tag: 'search-group',
            table: '',                          //关联的table组件
            css: "",                            //元素的css内联，优先级最高
            searchText: '',                     //搜索按钮的文字
            serachIcon: '',                     //搜索按钮的icon
            url: '/getk',                       //接口地址
            method: 'post',                     //请求方式
            formType: 'form',                   //参数格式     form =form-urlencode  或 json 
            showLabel: false,                   //是否显示头部
            id: guid(),
            other: [                            //其他字段，字段占位，会加入到表单中，传入json，会根据参数格式自动转换
                        {
                            key: 'name',
                            type: 'static',      //static=普通模式 js=执行
                            value: '',            //值
                        }
            ],
            linkTabel: 'dataList',              //关联tabel的ID，暂时未定
            items: [                            //子模块
                {
                        type: 'select',                    //种类-下拉框
                        placeholder: '请选择发票种类',      //提示文字
                        value: 'fpzl',                     //对应关键字
                        width: '100px',                    //宽度， 这个节点可以没有,单位px
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '发票种类',                  //头部文字
                        defaultValue: '026',
                        id: guid(),
                        children: [
                                {label: '电子发票',value: '026'},
                                {label: '专用发票',value: '004'}
                        ]
                },
                {
                        type: 'input',                    //种类-输入框
                        placeholder: '请输入关键字',       //提示文字
                        value: 'gjz',                     //对应关键字
                        width: '',                        //宽度， 这个节点可以没有,单位px
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '关键字段',                  //头部文字
                        id: guid(),
                },
                // {
                //         type: 'date',                    //种类-时间选择器
                //         placeholder: '请选择开票时间',    //提示文字
                //         value: 'KPRQ',                   //对应关键字
                //         defaultValue: 'YYYYMM01',        //时间格式，YYYY-MM-01代表当月一号
                //         width: '100px',                  //宽度， 这个节点可以没有,单位px
                //         showLabel: false,                //是否显示头部提示，优先级大于外层
                //         label: '开票时间',                //头部文字
                // },
                {
                        type: 'twoDate',                    //种类-双排时间选择器   
                        placeholder: '收货日期',            //提示文字
                        value: ['qsrq','jzrq'],            //对应关键字
                        defaultValue: ['YYYYMM01','YYYYMMDD'], //时间格式，YYYYMM01代表当月一号
                        width: '',                         //双排时间无效 
                        id: guid(),
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '收货日期',                  //头部文字
                },
                {
                        type: 'checkbox',                  //种类-复选框
                        placeholder: '异常数据',           //提示文字
                        value: 'YCSJ',                     //对应关键字
                        width: '',                         //复选框width无效，自适应，不换行
                        id: guid(),
                        showLabel: false,                  //复选框width无效，自适应，不换行
                        label: '',                        //头部文字，checkbox无效
                        defaultValue: '0'
                }
            ],                
            more: {          //其他搜索条件，更多中不推荐修改width，给空即可，避免css失效
                    labelWidth: '',                 //标签的宽度，默认80px
                    spans: '1',                      //弹窗表单中1行显示几列，最多2，！只在dialog时生效
                    items:[                         //子模块
                            {
                                    type: 'select',                    //种类-下拉框
                                    placeholder: '请选择发票种类',      //提示文字
                                    value: 'fpzl',                     //对应关键字
                                    width: '',                    //宽度， 这个节点可以没有,单位px
                                    id: guid(),
                                    showLabel: false,                  //是否显示头部提示，优先级大于外层
                                    label: '发票种类',                  //头部文字
                                    defaultValue: '026',
                                    children: [
                                            {label: '电子发票',value: '026'},
                                            {label: '专用发票',value: '004'}
                                    ]
                            },
                            {
                                    type: 'input',                    //种类-输入框
                                    placeholder: '请输入关键字',       //提示文字
                                    value: 'gjz',                     //对应关键字
                                    width: '',                        //宽度， 这个节点可以没有,单位px
                                    id: guid(),
                                    showLabel: false,                  //是否显示头部提示，优先级大于外层
                                    label: '关键字段'                  //头部文字
                            },
                            // {
                            //         type: 'date',                    //种类-时间选择器
                            //         placeholder: '请选择开票时间',    //提示文字
                            //         value: 'KPRQ',                   //对应关键字
                            //         defaultValue: 'YYYYMM01',        //时间格式，YYYY-MM-01代表当月一号
                            //         width: '100px',                  //宽度， 这个节点可以没有,单位px
                            //         showLabel: false,                //是否显示头部提示，优先级大于外层
                            //         label: '开票时间',                //头部文字
                            // },
                            {
                                    type: 'twoDate',                    //种类-双排时间选择器   
                                    placeholder: '收货日期',            //提示文字
                                    value: ['qsrq','jzrq'],            //对应关键字
                                    defaultValue: ['YYYYMM01','YYYYMMDD'], //时间格式，YYYYMM01代表当月一号
                                    width: '',                         //双排时间无效 
                                    id: guid(),
                                    showLabel: false,                  //是否显示头部提示，优先级大于外层
                                    label: '收货日期',                  //头部文字
                            },
                            {
                                    type: 'checkbox',                  //种类-复选框
                                    placeholder: '异常数据',           //提示文字
                                    value: 'YCSJ',                     //对应关键字
                                    width: '',                         //复选框width无效，自适应，不换行
                                    id: guid(),
                                    showLabel: false,                  //复选框width无效，自适应，不换行
                                    label: '关键字段',                  //头部文字，无效
                                    defaultValue: '0'
                            }
                    ]
            },
            props: [
                    {
                        name: 'attr',
                        info: '获取当前组件属性'
                    }
            ],
            apis: [
                {
                        name: 'search',
                        info: '搜索事件'
                }
            ]
          },
          // table组件  tablej-group
          {
            name: "table组件",
            tag: "table-group",
            key: "FPZL,XTLSH",
            css: {
                    padding: '0 12px',
                    margin: '',
                    boxSizing: 'border-box'
            },                               //css样式设置
            id: guid(),
            showPage: "1",
            showFooter: true,                      //是否显示页脚,统计和页脚
            columns: [
                {
                        "label": "",
                        "field": "",
                        "type": "seq",
                        "width": "35",
                        "align": "center",
                        "headalign": "center",
                        "color": "",
                        "id": guid(),
                        "xh": "00",
                        "fixed": "left"
                },
                {
                        "label": "",
                        "field": "",
                        "type": "checkbox",
                        "width": "55",
                        "align": "center",
                        "headalign": "center",
                        "color": "",
                        "id": guid(),
                        "xh": "00",
                        "fixed": "left"
                }, 
                {
                        "label": "名称",
                        "field": "name",
                        "width": "100",
                        "type": "",
                        "align": "left",
                        "headalign": "center",
                        "color": "",
                        "id": guid(),
                        "xh": "5",
                        "sumcol": "",
                        "fixed": "left"
                },
                {
                        "fixed": "right",
                        "label": "操作",
                        "width": "60",
                        "type": "",
                        "color": "",
                        id: guid(),
                        "children": [
                            {
                                "label": "查看",
                                "field": "",
                                "align": "center",
                                "headalign": "center",
                                "color": "primary",
                                "id": guid(),
                                "xh": "4100",
                                "onClick": ""
                            }
                        ]
                }
            ],
            props: [
            ],
            apis: [
                {
                    name: 'getSelection',
                    info: '获取当前选中数据（返回数组）'
                },
                {
                    name: 'clearSeletion',
                    info: '清除表单的选中状态',
                    params: ''
                }
            ]
          },
          // text组件   text组件
          {
            name: "text组件",
            tag: "s-text",
            text: '这是一段普通文本',
            css: {                              //css样式设置 
                    'margin': '0',
                    'line-height': '22px',
                    'padding': '10px',
                    'font-size': '1.2rem'
            },
            id: guid(),
            props: [
                {
                    name: 'text',
                    info: '文本内容，可重新赋值（=运算符）'
                }
            ]
          },
          //集成表单组件
          {
            name: "集成表单",
            tag: "form-group",
            span: 2,
            css: {
                    padding: '',
                    margin: '12px 0',
            },
            url: '/update',                       //接口地址
            method: 'post',                     //请求方式
            formType: 'form',                   //参数格式     form =form-urlencode  或 json 
            showLabel: true,                           //是否显示文本标签
            id: guid(),
            labelWidth: '65px', 
            gutterX: '12px',                            //列间距
            gutterY: '20px',                            //行间距
            showSubmit: true,                           //是否显示提交按钮
            items: [
                {
                        type: 'select',                    //种类-下拉框
                        placeholder: '请选择发票种类',      //提示文字
                        value: 'fpzl',                     //对应关键字
                        width: '',                    //宽度， 这个节点可以没有,单位px
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '发票种类',                  //头部文字
                        getDataType: '',
                        url: '',
                        defaultValue: '026',
                        children: [
                                {label: '电子发票',value: '026'},
                                {label: '专用发票',value: '004'}
                        ]
                },
                {
                        type: 'input',                    //种类-输入框
                        placeholder: '请输入关键字',       //提示文字
                        value: 'gjz',                     //对应关键字
                        width: '',                        //宽度， 这个节点可以没有,单位px
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '关键字段'                  //头部文字
                },
                {
                        type: 'twoDate',                    //种类-双排时间选择器   
                        placeholder: '收货日期',            //提示文字
                        value: ['qsrq','jzrq'],            //对应关键字
                        defaultValue: ['YYYYMM01','YYYYMMDD'], //时间格式，YYYYMM01代表当月一号
                        width: '',                         //双排时间无效 
                        showLabel: false,                  //是否显示头部提示，优先级大于外层
                        label: '收货日期',                  //头部文字
                },
            ],
            afterSubmit: '',                     //提交完成之后执行todo:未编写规则
            other: [
                {
                        key: 'name',
                        type: 'static',      //static=普通模式 js=执行
                        value: '',            //值
                }
            ]               
          }
]

//容器组件
export const layoutComponents = [
        //普通容器
        {
          name: '普通容器',
          tag: 'view-m',
          css: {
                padding: '12px',
                margin: '',
                boxSizing: 'border-box'
          },                              //元素的css内联，优先级最高
          id: guid(),
          type: 'container',                    //容器类容器 
          children: [],                         //子集容器
        },
        //单行容器
        {
          name: '单行容器',
          tag: 'view-between',
          css: {
                padding: '12px',
                margin: '',
                boxSizing: 'border-box'
          },                              //元素的css内联，优先级最高
          id: guid(),
          type: 'container',                    //容器类容器 
          children: [],                         //子集容器
        },
        //对话弹窗
        {
          name: '对话弹窗',
          tag: 's-dialog',
          css: {
                  padding: '',
                  margin: '',
          },                                    //元素的css内联，优先级最高
          closeOnClickModal: false,             //点击modal关闭窗口
          width: '720px',
          id: guid(),
          type: 'container',                    //容器类容器 
          modal: true,                          //是否需要遮罩层
          title: '这是一个标题',
          top: '22vh',
          children: [
          ],
          props: [
          ],
          apis: [
                {
                        name: 'open',
                        info: '打开窗体'
                },{
                      name: 'close'  
                      ,info: '关闭窗体'
                }
          ]
        },
]
      
// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    name: 'input',
    __config__: {
      name: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: []
    },
    __event__: {
      input: ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      name: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  }, 
]
