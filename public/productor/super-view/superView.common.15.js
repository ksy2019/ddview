((typeof self !== 'undefined' ? self : this)["webpackJsonpsuperView"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpsuperView"] || []).push([[15],{

/***/ "a38c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"8b67fac8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/super-view/components/tinymce/index.vue?vue&type=template&id=c82d9dce&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tinymce-container"},[_c('editor',{attrs:{"id":"tinymce","init":_vm.init},model:{value:(_vm.value),callback:function ($$v) {_vm.value=$$v},expression:"value"}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/super-view/components/tinymce/index.vue?vue&type=template&id=c82d9dce&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/tinymce/tinymce.js
var tinymce = __webpack_require__("e562");
var tinymce_default = /*#__PURE__*/__webpack_require__.n(tinymce);

// EXTERNAL MODULE: ./node_modules/@tinymce/tinymce-vue/lib/es2015/main/ts/index.js + 4 modules
var ts = __webpack_require__("ca72");

// EXTERNAL MODULE: ./node_modules/tinymce/themes/silver/theme.js
var theme = __webpack_require__("030f");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/image/index.js
var plugins_image = __webpack_require__("4ea8");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/link/index.js
var plugins_link = __webpack_require__("4237");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/code/index.js
var code = __webpack_require__("64d8");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/table/index.js
var table = __webpack_require__("07d1");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/lists/index.js
var lists = __webpack_require__("84ec");

// EXTERNAL MODULE: ./node_modules/tinymce/plugins/wordcount/index.js
var wordcount = __webpack_require__("9434");

// EXTERNAL MODULE: ./node_modules/tinymce/icons/default/icons.js
var icons = __webpack_require__("fc39");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("cebe");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: ./node_modules/js-base64/base64.mjs
var base64 = __webpack_require__("e762");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/super-view/components/tinymce/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//











 //下面的插件是自带的,不需要引入
// import "tinymce/plugins/contextmenu";
// import "tinymce/plugins/colorpicker";
// import "tinymce/plugins/textcolor";

/* harmony default export */ var tinymcevue_type_script_lang_js_ = ({
  name: "MyTinymce",
  props: {
    tinymceHtml: '',
    tinymceHeight: {
      type: Number,
      default: 500
    }
  },
  model: {
    prop: 'tinymceHtml',
    event: 'change'
  },
  components: {
    Editor: ts["a" /* default */]
  },
  data: function data() {
    return {
      value: this.tinymceHtml,
      //父组件通过ref拿到该组件的值
      init: {
        selector: "#tinymce",
        language_url: "./tinyLang/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "./skins/ui/oxide",
        //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
        height: this.tinymceHeight,
        plugins: "image link code table lists wordcount",
        //引入插件
        toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen",
        //工具栏
        browser_spellcheck: true,
        // 拼写检查
        branding: false,
        // 去水印
        elementpath: false,
        //禁用编辑器底部的状态栏
        statusbar: false,
        // 隐藏编辑器底部的状态栏
        paste_data_images: true,
        // 允许粘贴图像
        menubar: false,
        // 隐藏最上方menu
        file_picker_types: 'image',
        images_upload_credentials: true,
        fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px",
        //字体大小
        font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times",
        //字体

        /**
         * 下面方法是为tinymce添加自定义插入图片按钮
         * 借助iview的Upload组件,将图片先上传到存储云上，再将图片的存储地址放入编辑器内容
         */
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          console.log(blobInfo);
          var formData = new FormData();
          formData.append("file", blobInfo.blob());
          external_axios_default.a.post('/COMMON/SC', formData).then(function (res) {
            if (res.Result === '1') {
              external_axios_default.a.get('https://51dzfp.cn/WD/COMMON/IMG?pic=' + res.PIC).then(function (img) {
                success(img);
              });
            } else {
              failure('照片载入失败');
            }
          });
        }
      }
    };
  },
  watch: {
    tinymceHtml: function tinymceHtml(newV, oldV) {
      this.value = base64["a" /* Base64 */].decode(newV.replace(/ /g, '+'));
    },
    value: {
      handler: function handler() {
        var _this = this;

        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this.$emit('change', '[' + base64["a" /* Base64 */].encode(_this.value) + ']');
        }, 320);
      },
      deep: true
    }
  },
  computed: {},
  created: function created() {},
  mounted: function mounted() {
    tinymce_default.a.init({});
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/super-view/components/tinymce/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_tinymcevue_type_script_lang_js_ = (tinymcevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/super-view/components/tinymce/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_tinymcevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c82d9dce",
  null
  
)

/* harmony default export */ var components_tinymce = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);