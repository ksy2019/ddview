"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var timer;
var url = '';
var indexUrl = ''; // axios.defaults.timeout=50*1000                  //设置默认超时时间为50s
// import { Loading } from 'element-ui';

function loading() {
  document.getElementById('loading9819').style.display = "flex";
}

function loadingOk() {
  setTimeout(function () {
    document.getElementById('loading9819').style.display = "none";
  }, 720);
} // import { Message } from 'element-ui';
// 添加请求拦截器 


_axios["default"].interceptors.request.use(function (config) {
  indexUrl = config.url;

  if (config.url != 'http://127.0.0.1:828' && config.url != 'http://127.0.0.1:829') {
    config.data += "&token=" + localStorage.getItem('token'); //记录cookie
  } //如果为加载界面则跳出===不需要loading的接口


  if (config.url === "/NEWKP/JCZL/ZNKHZL" || config.url === '/NEWKP/TERM/INFO') return config;
  clearTimeout(timer); //等待更好的解决方案

  timer = setTimeout(function () {
    loading();
  }, 350);
  return config;
}, function (error) {
  clearTimeout(timer);
  loadingOk();
  return Promise.reject(error);
}); // 添加响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  clearTimeout(timer);
  loadingOk();

  if (Number(response.data.Code) <= 2009 && Number(response.data.Code) >= 2000) {
    window.parent.postMessage({
      source: 'shkj',
      event: 'goLogin'
    }, '*');
    setTimeout(function () {
      location.href = "/TGKP/#/login";
    }, 900);
  } //发票数据导出的时候直接返回原始数据用于下载


  if (response.config.url === '/NEWKP/KPGL/KPDC' || response.config.url === '/NEWKP/DZFP/PLXZ') {
    return response;
  }

  return response.data;
}, function (error) {
  clearTimeout(timer);
  loadingOk(); ///本地扫描接口失败提示

  if (indexUrl == 'http://127.0.0.1:829') {
    (0, _elementUi.MessageBox)({
      message: "\n                              <div class=\"mtb15 font15 doubleW\">\u901A\u8BAF\u9519\u8BEF </div>\n                              <div class=\"font11\">\u83B7\u53D6\u4FE1\u606F\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u5B89\u88C5\u5E76\u542F\u52A8\u672C\u5730\u540E\u7AEF\u7A0B\u5E8F </div>\n                              <div class=\"font11\">\u672A\u5B89\u88C5\uFF1A<span onclick=\"download()\" class=\"nos\" style=\"color:blue\">\u4E0B\u8F7D\u672C\u5730\u670D\u52A1\u7AEF</span></div>\n                              <div class=\"font11\">\u5DF2\u5B89\u88C5\uFF1A\u53BB\u684C\u9762\u542F\u52A8 <i class=\"el-icon-s-promotion\" style=\"color:green\"></i></div>\n                        ",
      dangerouslyUseHTMLString: true
    });
  }

  return Promise.reject(error);
});