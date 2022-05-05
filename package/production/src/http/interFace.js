import axios from 'axios';
import {Message} from 'element-ui'
import { Base64 } from 'js-base64';
function formD(obj){
    const formData = new URLSearchParams();
    Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Array) {
        obj[key].forEach((item) => {
          formData.append(key, item);
        });
        return;
      }
      formData.append(key, obj[key]);
    });
    return formData;
}
const CancelToken = axios.CancelToken;
window.allHttp=[]
export default {
        temp(){                     //模板接口
            return new Promise((resolve,reject)=>{
                axios.post('/XZFF').then(data=>{
                        resolve(data)
                        if(data.Result=='0'){
                                Message.error(data.Message);
                        }
                }).catch(err=>{
                        reject(err);
                })
            })
        },

        REGISTRY(para,msg){                     //新增企业
            return new Promise((resolve,reject)=>{
                axios.post('/TERM/REGISTRY',para).then(data=>{
                        resolve(data)
                        if(data.Result=='0'&&msg){
                                Message.error(data.Message);
                        }
                }).catch(err=>{
                        reject(err);
                })
            })
        },
        getList(para,msg){                     //获取机箱内税控终端列表
          return new Promise((resolve,reject)=>{
              axios.post('/TERM/LIST',para).then(data=>{
                        if(data.Result=='0'&&msg){
                                Message.error(data.Message);
                        }
                        resolve(data)
              }).catch(err=>{
                        reject(err);
              })
          })
        },
        destory(para){                   //从公司列表中删除（注销）
            return new Promise((resolve,reject)=>{
                axios.post('/TERM/DELETE',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getTermInfo(para){                     //获取终端信息
                return new Promise((resolve,reject)=>{
                    axios.post('/TERM/INFO',para,{
                        cancelToken: new CancelToken(c => {
                                window.allHttp=window.allHttp.splice(0,200)
                                window.allHttp.push(c)
                        })
                    }).then(data=>{
                                resolve(data) 
                    }).catch(err=>{
                                reject(err);
                    })
                })
        },
        
        getMONITOR(data){                     //监控数据查询
                return new Promise((resolve,reject)=>{
                    axios.post('/TERM/MONITOR',data).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                    }).catch(err=>{
                                reject(err);
                    })
                })
        },
        getSPINFO(data){                     //获取税盘ID
            return new Promise((resolve,reject)=>{
                axios.post('/TERM/SPINFO',data).then(data=>{
                        resolve(data)
                        if(data.Result=='0'){
                                Message.error(data.Message);
                        }
                }).catch(err=>{
                        reject(err);
                })
            })
        },
        setFPXF(data){                     //发票修复
            return new Promise((resolve,reject)=>{
                axios.post('/KPGL/FPXF',data).then(data=>{
                        resolve(data)
                        if(data.Result=='0'){
                                Message.error(data.Message);
                        }
                }).catch(err=>{
                        reject(err);
                })
            })
        },

        ///////////////开票接口
        setFPKJ(para,msg){                     //开具发票接口
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPKJ',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&!msg){
                                        console.log(msg)
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getFPINFO(para){                  //获取发票信息
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPINFO',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getNEXTINFO(para,msg){                  //获取下一张发票信息
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/NEXTINFO',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        setFPZF(para,msg){                  //发票作废接口
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPZF',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getFPLIST(para,msg){                  //按照时间获取发票列表
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPLIST',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },


        //5.1发票申请
        getFPZF(para){                  //申领状态查询
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/ZTCX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setFPFZ(para,msg){                  //发票复制
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPFZ',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getPREPARE(para,msg){                  //获取申领表发票信息
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/PREPARE',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setFPSQ(para,msg){                  //发票申领
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/FPSQ',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setSQQX(para){                  //撤销发票申领          //纸质发票申领确定春    接口一致;传参不同
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/SQQX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },


        // 六: 发票库存管理
        getKCCX(para){                  //发票库存查询
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/KCCX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        getGPCX(para){                  //网络购票查询
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/GPCX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        setGPQR(para,msg){                  //网络购票
                return new Promise((resolve,reject)=>{
                        axios.post('/FPKC/GPQR',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        async setSQQR(para,msg){                 //确定申领发票
                let res= await axios.post("/FPKC/SQQR",para)
                if(res.Result==='0'&&msg!=true){
                        Message.error(res.Message);
                }
                return res
        },

        ////七: 红字信息表查询业务
        getHZFPFPCX(para){                  //红字信息表查询
                return new Promise((resolve,reject)=>{
                        axios.post('/HZFP/FPCX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getHZFPFPSQ(para){                  //红字信息课表申请
                return new Promise((resolve,reject)=>{
                        axios.post('/HZFP/FPSQ',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setHZFPFPCX(para){                  //红字信息课表撤销
                return new Promise((resolve,reject)=>{
                        axios.post('/HZFP/FPCX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setSHKP(para){                  //审核开票
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/SHKP',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setFPSC(para){                  //发票删除
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/FPSC',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setFPQX(para){                  //红字发票撤销
                return new Promise((resolve,reject)=>{
                        axios.post('/HZFP/FPQX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        //八: 登陆发票综合平台


        ZHPTLOGIN(para){                  //发票综合平台登陆
                return new Promise((resolve,reject)=>{
                        axios.post('/ZHPT/LOGIN',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },


        ///九: 发票打印
        local(para,msg){                  //发票打印
                return new Promise((resolve,reject)=>{
                        //判断是否为打印程序
                        if(para.indexOf("PRINTNAME")!==-1||para.indexOf("PRINTINFO")!==-1){
                                para=JSON.parse(para)
                                if(para.PRINTNAME!==''){
                                        para.PRINTNAME=Base64.encode(para.PRINTNAME)
                                }
                                para=JSON.stringify(para)
                        }
                        axios.post('http://127.0.0.1:829',para).then(data=>{
                                if(para.indexOf("PRINTINFO")!==-1){
                                        data.DEFAULT=Base64.decode(data.DEFAULT)
                                        for(let x=0;x<data.PrintName.length;x++){
                                                data.PrintName[x]=Base64.decode(data.PrintName[x])
                                        }
                                }
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        //十、按名称查税号
        MCTOQYSH(para){                  //使用名称查询企业税号
                return new Promise((resolve,reject)=>{
                        axios.post('/QT/QYSH',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        //系统管理接口
        getKHZL(para){                  //获取客户信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ListKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setKHZL(para){                  //新增客户信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/AddKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        delKHZL(para){                  //删除客户信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/DelKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        excelKHZL(para){                  //excel导入客户资料
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ExcelKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getCPZL(para){                  //获取商品信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ListCPZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getZNBM(para){
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ZNBM',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error('搜索分类编码错误：'+data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setPLBM(para){
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/PLBM',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getTBCPZL(para){
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/TBCPZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getTBKHZL(para){
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/TBKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        setCPZL(para,msg){                  //新增商品信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/AddCPZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        delCPZL(para){                  //删除商品信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/DelCPZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getTJXX(para){                  //获取统计信息
                return new Promise((resolve,reject)=>{
                        axios.post('/KPGL/TJXX',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        excelCPZL(para,msg){                  //excel导入商品信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ExcelCPZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        /////////////////////获取分类编码
        getFLBM(para,msg){                  //获取分类编码
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/FLBM',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        /////////////////////清卡接口
        setQK(para,msg){                  //清卡接口
                return new Promise((resolve,reject)=>{
                        axios.post('/TERM/QK',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        /////////////////////清卡接口
        getQYXXTB(para,msg){                  //清卡接口
                return new Promise((resolve,reject)=>{
                        axios.post('/TERM/QYXXTB',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },

        ///工具类接口
        getZNKH(para,msg){                  //名称搜索公司
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/ZNKHZL',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        getKHXQ(para,msg){                  //code换取用户信息
                return new Promise((resolve,reject)=>{
                        axios.post('/JCZL/KHXQ',para).then(data=>{
                                resolve(data)
                                if(data.Result=='0'&&msg!=true){
                                        Message.error(data.Message);
                                }
                        }).catch(err=>{
                                reject(err);
                        })
                })
        },
        //电商开票
        //检查订单是否可以开票
        async getOrder(para){
               let data = await axios.post('/dskp/OrderGet' , para)
               return data ;
        },
        //过去开票订单的明细等数据
        async getFpInfo(para){
               let data = await axios.post('/KPGL/fpinfo' , para)
               return data ;
        },
        async tbdpsp(para){
               let data = await axios.post('/dskp/XZCPZL', para)
               return data;
        },
        async DSSCDP(para){
               let data =await axios.post("/dskp/SCDP",para)
               return data;
        },
        async SCORDER(para){                 //批量开票删除
               let data =await axios.post("/DSKP/SCORDER",para)
               return data;
        },
        async DSSHKP(para){                 //电商审核开票
               let data =await axios.post("/DSKP/SHKP",para)
               return data;
        },
        async DSZJDP(para){                 //电商增加修改店铺
               let data =await  axios.post("/DSKP/ZJDP",para)
               return data;
        },
        async DPLIST(para){                 //获取订单列表
               let data = await axios.post("/DSKP/DPLIST",para) 
               if(data.rows!==undefined&&data.rows.length!==0){
                       for(let item of data.rows){
                               item.DPMC='【'+item.DPLXMC+'】' +item.DPMC
                       }
               }
               return data;
        },
        async HXDSPT(para){                 //电商平台重传
               let data = await axios.post("/DSKP/HXDSPT",para)  
               return data;
        },

        //报关单接口
        //报关单接口
        //报关单接口

        async BGDCX(para){                 //报关单查询
               let data = await axios.post("/CKFP/BGDCX",para)  
               return data;
        },
        //获取配置文件
        async getConfig(){
                let data = await axios.post("/YHQX/QXXX")
                return data
        },
        //获取消息列表数据
        async getMessage(para){
              
        },
        //获取消息列表数据
        async getRefundList(para){
                let data = await axios.post("/DSKP/RefundList",para)
                return data
        },
        //录入快递单号
        async setKTRR(para){
                let data = await axios.post("/KTGL/KTRR",para)
                return data
        },
        //获取快递状态
        async getKTZT(para){
                let data = await axios.post("/KTGL/KTZT",para)
                return data
        },
        //设置电子发票存入卡包的回调网址
        async setRedirectUrl(para){
                let data = await axios.post("/WX/CREATECARD",para)
                return data
        },
        //ocr发票
        async otherOcr(para){
                let data = await axios.post("/OTHER/OCR",para)
                return data
        },
        //设置快递信息
        async setKtsz(para){
                let data = await axios.post("/KTGL/KTSZ",para)
                return data;
        },
        //获取快递信息
        async getKtxx(para){
                let data = await axios.post("/KTGL/KTXX",para);
                return data;
        },
        //批量修改发票抬头
        async setPLXGORDER(para){
                let data = await axios.post("/DSKP/PLXGORDER",para);
                return data;
        }
}
