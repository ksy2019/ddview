"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formD(obj) {
  var formData = new URLSearchParams();
  Object.keys(obj).forEach(function (key) {
    if (obj[key] instanceof Array) {
      obj[key].forEach(function (item) {
        formData.append(key, item);
      });
      return;
    }

    formData.append(key, obj[key]);
  });
  return formData;
}

var _default = {
  temp: function temp() {
    //模板接口
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/XZFF').then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  REGISTRY: function REGISTRY(para, msg) {
    //新增企业
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/REGISTRY', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getList: function getList(para) {
    //获取机箱内税控终端列表
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/LIST', para).then(function (data) {
        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }

        resolve(data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  destory: function destory(para) {
    //从公司列表中删除（注销）
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/DELETE', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTermInfo: function getTermInfo(para) {
    //获取终端信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/INFO', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getMONITOR: function getMONITOR(data) {
    //监控数据查询
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/MONITOR', data).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getSPINFO: function getSPINFO(data) {
    //获取税盘ID
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/SPINFO', data).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPXF: function setFPXF(data) {
    //发票修复
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPXF', data).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  ///////////////开票接口
  setFPKJ: function setFPKJ(para, msg) {
    //开具发票接口
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPKJ', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && !msg) {
          console.log(msg);

          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getFPINFO: function getFPINFO(para) {
    //获取发票信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPINFO', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getNEXTINFO: function getNEXTINFO(para, msg) {
    //获取下一张发票信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/NEXTINFO', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPZF: function setFPZF(para, msg) {
    //发票作废接口
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPZF', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getFPLIST: function getFPLIST(para, msg) {
    //按照时间获取发票列表
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPLIST', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  //5.1发票申请
  getFPZF: function getFPZF(para) {
    //申领状态查询
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/ZTCX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPFZ: function setFPFZ(para, msg) {
    //发票复制
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPFZ', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getPREPARE: function getPREPARE(para, msg) {
    //获取申领表发票信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/PREPARE', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPSQ: function setFPSQ(para, msg) {
    //发票申领
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/FPSQ', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setSQQX: function setSQQX(para) {
    //撤销发票申领          //纸质发票申领确定春    接口一致;传参不同
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/SQQX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  // 六: 发票库存管理
  getKCCX: function getKCCX(para) {
    //发票库存查询
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/KCCX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getGPCX: function getGPCX(para) {
    //网络购票查询
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/GPCX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setGPQR: function setGPQR(para, msg) {
    //网络购票
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/FPKC/GPQR', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  ////七: 红字信息表查询业务
  getHZFPFPCX: function getHZFPFPCX(para) {
    //红字信息表查询
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/HZFP/FPCX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getHZFPFPSQ: function getHZFPFPSQ(para) {
    //红字信息课表申请
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/HZFP/FPSQ', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setHZFPFPCX: function setHZFPFPCX(para) {
    //红字信息课表撤销
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/HZFP/FPCX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setSHKP: function setSHKP(para) {
    //审核开票
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/SHKP', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPSC: function setFPSC(para) {
    //发票删除
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/FPSC', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setFPQX: function setFPQX(para) {
    //红字发票撤销
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/HZFP/FPQX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  //八: 登陆发票综合平台
  ZHPTLOGIN: function ZHPTLOGIN(para) {
    //发票综合平台登陆
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/ZHPT/LOGIN', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  ///九: 发票打印
  local: function local(para, msg) {
    //发票打印
    return new Promise(function (resolve, reject) {
      _axios["default"].post('http://127.0.0.1:829', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  //十、按名称查税号
  MCTOQYSH: function MCTOQYSH(para) {
    //使用名称查询企业税号
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/QT/QYSH', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  //系统管理接口
  getKHZL: function getKHZL(para) {
    //获取客户信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ListKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setKHZL: function setKHZL(para) {
    //新增客户信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/AddKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  delKHZL: function delKHZL(para) {
    //删除客户信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/DelKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  excelKHZL: function excelKHZL(para) {
    //excel导入客户资料
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ExcelKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getCPZL: function getCPZL(para) {
    //获取商品信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ListCPZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getZNBM: function getZNBM(para) {
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ZNBM', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setPLBM: function setPLBM(para) {
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/PLBM', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTBCPZL: function getTBCPZL(para) {
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/TBCPZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTBKHZL: function getTBKHZL(para) {
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/TBKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  setCPZL: function setCPZL(para, msg) {
    //新增商品信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/AddCPZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  delCPZL: function delCPZL(para) {
    //删除商品信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/DelCPZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTJXX: function getTJXX(para) {
    //获取统计信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/KPGL/TJXX', para).then(function (data) {
        resolve(data);

        if (data.Result == '0') {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  excelCPZL: function excelCPZL(para, msg) {
    //excel导入商品信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ExcelCPZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  /////////////////////获取分类编码
  getFLBM: function getFLBM(para, msg) {
    //获取分类编码
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/FLBM', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  /////////////////////清卡接口
  setQK: function setQK(para, msg) {
    //清卡接口
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/QK', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  /////////////////////清卡接口
  getQYXXTB: function getQYXXTB(para, msg) {
    //清卡接口
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/TERM/QYXXTB', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  ///工具类接口
  getZNKH: function getZNKH(para, msg) {
    //名称搜索公司
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/ZNKHZL', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getKHXQ: function getKHXQ(para, msg) {
    //code换取用户信息
    return new Promise(function (resolve, reject) {
      _axios["default"].post('/NEWKP/JCZL/KHXQ', para).then(function (data) {
        resolve(data);

        if (data.Result == '0' && msg != true) {
          _elementUi.Message.error(data.Message);
        }
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;