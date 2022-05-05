<!--
 * @Author: BlueStar
 * @Date: 2022-03-23 15:34:45
 * @LastEditTime: 2022-04-09 10:29:16
 * @Description: 消费者缴费界面
-->
<template>
    <div   class="xfzjf-container">
            <div class="ttop">
                    <div @click="clickExit" class="exit-con">
                            
                    </div>
                    <img class="bg" src="@/assets/img/logo3.png" alt="">
            </div>
            <div class="dkxx" :style="step=='2'?'background: url(/img/skbg.4bbdcdc4.jpg);background-size: cover;':''">
                    <div class="top">
                        <div class="conbg">
                            <img class="bg" src="@/assets/img/skbg.jpg" alt="">
                        </div>
                        <div v-if="step==1" class="step-0">
                                <div class="wdlogo">
                                    <img src="@/assets/img/logo3.png" alt="">
                                </div>
                                <div class="main-body-con">
                                    <div @click="readCard" class="main-body">
                                        <div class="dk-btn-con">
                                            <div class="dk-btn">读卡 </div>
                                            <i class="el-icon-bank-card"></i>
                                        </div>
                                    </div>
                                    <div class="title">请在机器右下方放置水卡后点击读卡</div>
                                    <div class="title ywsm" style="color: #777777;">如有疑问，请点击 <span @click="clickQq" style=" color: #69b8ff;border-radius: 6px;" class="main-color ml10">请求</span></div>
                                </div>
                        </div>
                        <div v-if="step!=1" :class="step == 2? 'step2':''" class="step-1">
                                <div class="step-body" >
                                    <div v-if="step==2" class="qdcc">
                                            <div class="header-tool"> 
                                                    <div>
                                                       <i class="el-icon-user-solid"></i> {{userName}}
                                                       <span class="ml20">表号码</span>
                                                       <span class="main-color">{{bhm}}</span>
                                                    </div>
                                                    <div @click="clickwycd" class="btn">
                                                            {{showCd?'取消拆单':'我要拆单'}}
                                                    </div>
                                            </div>
                                            <div class="tool-bar">
                                                    <div @click="step2cancal" class="qdcc-btn">上一步</div>
                                                    <div @click="clickQdcc" style="background: #0087ff;" class="qdcc-btn">充卡</div>
                                            </div>
                                            <div class="list-con">
                                                    <div v-for="(item,index) in dczmx" :key="index" class="list-item">
                                                            <div class="left">
                                                                    <div class="one">
                                                                        <div class="title"><span class="title-span">铺位号：</span> {{item.BUNKDESC}}</div>
                                                                        <!-- <div class="text"><span class="title-span">账单编号</span> {{item.BILLID}}</div> -->
                                                                        <div class="info"><span class="title-span">账单日期：</span> {{item.DOCUMENTDATE}}</div>
                                                                    </div>
                                                                    <div v-if="showCd" class="two">
                                                                        <el-checkbox  v-model="item.check">有效</el-checkbox>
                                                                        <div style="margin-top:10px;">
                                                                                <span @click="clickEdit(item)" class="xgbcje-btn">修改金额</span>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                            <div class="right">
                                                                    <div class="title">
                                                                            {{item.BUY}} {{item.DW}}
                                                                    </div>
                                                                    <div v-if="item.YCZJE!=''&&item.YCZJE!='0'" class="other-info">
                                                                            可充<span class="color-text">{{item.RECEIPTAMT}}</span>  已充<span class="color-text">{{item.YCZJE}}</span>
                                                                    </div> 
                                                                    <div class="other-info">
                                                                            {{item.PRICE}}元/{{item.DW}} <span class="ml10">本次充值</span> <span class="main-color">{{item.YE}} </span>元
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                                    <div v-if="step==3" class="czwc">
                                            <div class="wc-con">
                                                    <i class="el-icon-success"></i>
                                                    <div style="color: gray;font-size: 1.1rem;">充值完成</div>
                                                    <div @click="clickWc" class="wc-btn">返回首页 <span style="margin-left: 10px;">{{timeout}}</span> </div>
                                            </div>
                                    </div>
                                </div>
                                <div class="footer-tool"> 
                                        <el-steps :active="step" finish-status="success">
                                          <el-step title="读卡"  ></el-step>
                                          <!-- <el-step title="信息"  ></el-step> -->
                                          <el-step title="充卡"  ></el-step>
                                          <el-step title="完成"  ></el-step>
                                        </el-steps>
                                </div>
                        </div>
                    </div>
                    <div class="bottom">
                            <!-- <div v-if="step==2" class="grxx">
                                    <div class="title"><i class="el-icon-info"></i> 用户信息</div>
                                    <div class="left">
                                        <div class="row">
                                                <div class="left">
                                                       <i class="el-icon-star-on blue"></i>用户名称：
                                                </div>
                                                <div class="right">{{userName}}</div>
                                        </div>  
                                    </div> 
                            </div> -->
                            <img src="@/assets/img/adv2.jpg" alt="">
                            <span class="bbh">版本号:1.4.6</span>
                    </div>
            </div>
            <el-dialog title="退出系统" custom-class="brdialog" append-to-body :close-on-click-modal="false" :visible.sync="showExit">
                    <div class="input-con">
                            <span v-for="(item,index) in mm" :key="index">*</span>
                    </div>
                    <div class="ajp-con">
                            <div @click="clickMM(item)" class="item-btn" v-for="(item,index) in 9" :key="index">{{item}}</div>
                    </div>
                    <div class="tool-bar">
                            <el-button @click="resetMM" size="medium" style="width:100%;height: 60px;" type="primary">重置</el-button>
                    </div>
            </el-dialog>
            <el-dialog :show-close="false"  append-to-body :close-on-click-modal="false" custom-class="alert-dialog" :visible.sync="showAlert">
                    <div slot="title"></div>
                    <div class="alert-con">
                        <div class="title">提示</div>
                        <div class="body">
                                <div class="left">
                                        <i class="el-icon-warning-outline danger"></i>
                                </div>
                                <div class="right">{{alertMsg}}</div>
                        </div>
                        <div class="footer">
                                <div @click="showAlert=false;" class="btn">确定</div>
                        </div>
                    </div>
            </el-dialog>
            <!-- 拆分功能输入框 -->
            <el-dialog title="修改金额" append-to-body custom-class="update-dialog brdialog"  :close-on-click-modal="false" :visible.sync="showEdit">
                    <div class="top-info">
                            总计 {{cache.RECEIPTAMT}} <span class="ml10">已充值 {{cache.YCZJE}}</span> <span class="ml10">可充值 </span><span class="main-color">{{cache.realYe}}</span>
                    </div>
                    <div class="input-con">
                            <span  >{{editJe}}</span>
                    </div>
                    <div class="ajp-con">
                            <div @click="clickEditNum(item)" class="item-btn" v-for="(item) in 9" :key="item">{{item}}</div>
                            <div @click="deleteNum" class="item-btn" ><i class="el-icon-close"></i></div>
                            <div @click="clickEditNum('.')" class="item-btn" >.</div>
                            <div @click="clickEditNum('0')" class="item-btn">0</div>
                    </div>
                    <div class="tool-bar">
                            <el-button @click="submitEdit" size="medium" icon="el-icon-check" style="width:100%;height: 60px;font-size: 1.45rem;" type="primary">提交修改</el-button>
                    </div>
            </el-dialog>
            <!-- //更多功能 -->
            <el-dialog title="其他功能" custom-class="brdialog" width="520px" append-to-body :close-on-click-modal="false" :visible.sync="showQq">
                    <div class="qtgn-title">
                           <i class="el-icon-info"></i> 选择你要使用的功能
                    </div>
                    <div class="qtgn-row">
                            <el-button @click="resetMM" class="qtgn-btn" size="medium" type="primary">撤销交易</el-button>
                            <el-button @click="resetMM" class="qtgn-btn"  size="medium" type="primary">申请开户</el-button>
                    </div>
                    <div class="qtgn-row">
                            <el-button @click="resetMM" class="qtgn-btn" size="medium" type="primary">回收卡片</el-button>
                            <el-button @click="resetMM" class="qtgn-btn" size="medium" type="primary">补卡</el-button>
                    </div>
            </el-dialog>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import axios from 'axios';
import { Base64 } from 'js-base64';

function sleep(t){
    console.warn("休息中",t/1000,'s')
    return new Promise(res=>setTimeout(() => res(), t))
}
export default {
    data(){
        return{
                showQq: false,
                showEdit: false,
                cache: {},
                editJe: '',             //编辑金额
                showAlert: false,
                alertMsg: '',
                loading: false,
                dataList: [],
                formData: {
                    gjz: ''
                },
                pager: {
                  total: 0,
                  pageindex: 1,
                  pagesize: 30
                },
                step: 1, 
                showczDialog: false,
                dczmx:[],
                // dczmx:  [{"BILLID":"26770825",check: true,"PLAZANAME":"贵阳经开龙湾万达广场","USERNAME":"贵阳新派餐饮管理有限公司黄河路分公司 2","BUNKDESC":"2F-次主3","DOCUMENTDATE":"2022-03-24","RECEIPTAMT":"5000","YCZJE":"0","USERID":"71","PRICE":"4.04","YE":5000,"BUY":1237.6,"DW":"吨"}] ,
                userName: '- - -',
                showExit: false,
                mm: '',
                showCd: false,
                timeout: 60,
                czlx: 0,
                bhm: ' - - - '
        }
    },
    methods: {
        clickQq(){                      //点击请求
                this.showQq = true;
        },
        deleteNum(){
                this.editJe=this.editJe.substr(0,this.editJe.length-1)
        },
        clickEditNum(num){
                this.editJe+=num.toString();
        },
        clickEdit(item){                      //点击编辑
                if(!item.realYe){
                        item.realYe = item.YE;
                }
                this.cache = item;
                this.editJe = ''
                this.showEdit = true;
        },
        submitEdit(){                         //提交修改
                if(isNaN(Number(this.editJe))){
                        this.malert("请输入数字")
                        this.editJe = ''
                        return
                }
                if(Number(this.editJe)>Number(this.cache.realYe)){
                        this.malert("充值金额不能大于可充值余额")
                        return
                }
                try{
                        this.cache.YE = Number(Number(this.editJe).toFixed(2));
                        this.cache.BUY = Number( Number(Number(this.cache.YE)/ Number(this.cache.PRICE)).toFixed(2))
                }catch(e){
                        console.log(e)
                        this.malert("计算金额时发生了错误")
                }
                this.showEdit = false;
        },
        clickwycd(){
                this.showCd= !this.showCd;
        },
        async getYcz(id,gc,s){                 //获取预充值
                let res = await axios.post("/SHKJ/ZNKAPI/DQYCZCX",this.$base.formD({
                        userid: id,
                        gc: gc,
                        czlx: this.czlx,
                        s: s
                }),{
                        timeout: 20 * 1000
                })
                return res
        },
        malert(msg){
                this.alertMsg = msg;
                this.showAlert = true;
        },
        async readCard(){                 //读卡操作
                this.showCd = false;
                this.loadingInstance = Loading.service({
                        body: true,
                        lock: true,
                        text: '正在读卡中',
                });
                let res = await axios.post('http://127.0.0.1:829',JSON.stringify({
                        "LX":"GETCARINFO",
                }),{
                        timeout: 20 * 1000
                })
                //todo: 测试代码 
                // res ={"Result":"1","Message":"成功","DATA":"eyJidXlfdGltZXMiOjAsImlkIjoxOCwiZ2MiOiI5RERGMzM0QUE1Nzg0MTZGQkNDOEM5N0FDRjJBMTUwOSIsInMiOiI4RUIwQ0Y4NTlCN0Q4NTJEQTMzRDNCOEY3QTlFMzJCRiJ9"}
                //todo: 测试代码 
                if(res.Result=='1'){
                        let data ;
                        try{
                                this.loadingInstance.text='正在获取账单信息';
                                data = JSON.parse(Base64.decode(res.DATA));
                                this.indexUser = data;
                                let yczRes = await this.getYcz(data.id,data.gc,data.s);
                                if(yczRes.Result=='1'){
                                        if(yczRes.DATA.length==0){
                                                this.loadingInstance.close();
                                                this.malert('没有收款记录');
                                                return
                                        }
                                        for(let item of yczRes.DATA){
                                                item.check = true;
                                        }
                                        this.dczmx = yczRes.DATA;
                                        this.userName = yczRes.DATA[0].USERNAME;
                                        this.bhm = yczRes.DATA[0].BHM;
                                        this.step=2;
                                        this.loadingInstance.close();
                                }else{
                                        this.malert(yczRes.Message);
                                        this.loadingInstance.close();
                                }
                        }catch(e){
                                console.log(e);
                                this.malert('系统错误，解码失败')
                                this.loadingInstance.close();
                        }
                        
                }else{
                        this.malert(res.Message);
                        this.loadingInstance.close();
                }
        }, 
        step2cancal(){
                this.step = 1;
        },
        go3(){          //进入第3步
                this.step =3;
                this.startTimeout();
                this.loadingInstance.close();
        },
        async cksb(res){
                let sbRes =  await axios.post('/SHKJ/ZNKAPI/CKSB',this.$base.formD({
                        userid: this.indexUser.id,
                        gc: this.indexUser.gc,
                        s: this.indexUser.s,
                        czlx: this.czlx,
                        id: res.id
                }),{
                        timeout: 20 * 1000
                })
                //判断是否网路错误
                if(sbRes.code  && sbRes.code == 500){ 
                        for(;;){
                                let czjgRes = await axios.post('/SHKJ/ZNKAPI/JCCZJG',this.$base.formD({
                                        pc: this.pc,
                                        mklx: '1',
                                        userid: this.indexUser.id,
                                        czlx:  this.czlx,
                                        s: this.indexUser.s,
                                        gc: this.indexUser.gc,
                                }));
                                if(czjgRes.code&&czjgRes.code == 500){
                                    await sleep(1000)
                                    continue
                                }
                                //成功退回
                                if(czjgRes.Result == '1'){
                                        this.malert('充值失败，请重试')
                                        this.loadingInstance.close();
                                }else{
                                       await this.cksb()
                                }
                                break;
                        }
                }else{
                        this.malert('充值失败，请重试')
                        this.loadingInstance.close();
                }
        },
        async writeCard(res){
                        this.loadingInstance.text= '正在写入卡片';
                        //写入本地
                        let resLoc = await axios.post('http://127.0.0.1:829',JSON.stringify({
                                "LX":"WRITECARINFO",
                                "CZLX": res.czlx,
                                "SHID": this.indexUser.id,
                                "CZSL": res.SL,
                                "CZCS": res.CS
                        }),{
                                timeout: 20 * 1000
                        })
                        if(resLoc.Result=='1'){
                                this.go3();
                        }else{
                                this.cksb(res);
                        }
        },
        async clickQdcc(){
                let checklist = this.dczmx.filter(item=>item.check);
                if(checklist.length==0){
                        this.malert("请先选中数据再操作")
                        return;
                }
                this.pc = new Date().getTime();
                this.loadingInstance = Loading.service({
                        body: true,
                        lock: true,
                        text: '正在充卡中',
                });
                let  BILLID=[];
                for(let item of  checklist){
                        BILLID.push({id: item.BILLID, je: item.YE,sl: item.BUY.toString()});
                }
                console.log(BILLID)
                //写入服务器
                let res = await axios.post('/SHKJ/ZNKAPI/ADDBUYNFO',this.$base.formD({
                        gc: this.indexUser.gc,
                        userid: this.indexUser.id,
                        s: this.indexUser.s,
                        data:  '['+Base64.encode(JSON.stringify(BILLID))+']',
                        czlx: this.czlx,
                        pc: this.pc
                }),{
                        timeout: 20 * 1000
                })
                if(res.Result == '1'){
                        await this.writeCard(res);
                }else{
                        if(res.code&&res.code == 500){
                            for(;;){
                                let czjgRes = await axios.post('/SHKJ/ZNKAPI/JCCZJG',this.$base.formD({
                                        pc: this.pc,
                                        mklx: '0',
                                        userid: this.indexUser.id,
                                        czlx:  this.czlx,
                                        s: this.indexUser.s,
                                        gc: this.indexUser.gc,
                                }));
                                if(czjgRes.code&&czjgRes.code == 500){
                                    await sleep(1000)
                                    continue
                                }
                                //上次成功，继续写卡
                                if(czjgRes.Result == '1'){
                                        await this.writeCard(czjgRes)
                                }else{
                                        this.malert('网络不通，请重试');
                                        this.loadingInstance.close();
                                }
                                break;
                            }
                        }else{
                                this.malert(res.Message)
                                this.loadingInstance.close();
                        }
                }

        },
        clickExit(){
                this.exitcount++
                if(this.exitcount>=3){
                        this.showExit = true;
                }
        },
        clickWc(){
                this.step = 1;
        },
        exitSystem(){
                this.showExit =false;
                window.closeapp(1);
        },
        resetMM(){
                this.mm = ''
        },
        clickMM(item){
                this.mm+= item
                if(this.mm=='66668888'){
                        this.exitSystem()
                }
        },
        startTimeout(){                 //启动倒计时
                this.timeout = 60;
                let interval = setInterval(()=>{
                        this.timeout--;
                        if(this.timeout <=0){
                                clearInterval(interval)
                                this.clickWc();
                        }
                },1000)
        }
    },
    mounted(){
                this.exitcount = 0
                document.oncontextmenu = function(){
			if(event.button == 2){
				return false;
			}
		}
                document.onclick=(e)=>{
                        if(e.target.className!='exit-con'){
                                this.exitcount = 0
                        }
                }
    }
}
</script>

<style lang="less" scoped> 
.qtgn-title{
        margin-bottom: 10px;
}
.qtgn-btn+.qtgn-btn{
        margin-left: 20px;
}
.qtgn-btn{
        width:50%;
        height: 78px;
}
.qtgn-row{
        display: flex;
        margin: 42px 25px;
}
.ywsm{
        font-size: 1rem !important;
}
.top-info{
        font-size: 1.1rem;
        padding: 12px;
        box-sizing: border-box;
}
.search-tool{
    margin: 12px 12px 0 ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-left{
    }
}
.exit-con{
        height: 75px;
        width: 120px;
        position: fixed;
        top: 0;
        left: 0;
}
.table-container{
    margin: 12px;
}
.footer-bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 12px;
}

.xfzjf-container{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    .ttop{
            height: 52px;
            text-align: center;
            margin: 10px 0;
            user-select: none;
            box-sizing: border-box;
            img{
                    height: 100%;
            }
    }
    .top{
        min-height: 500px;
        position: relative;
        height: 50vh;
        .conbg{
            width: 100vw;
            height: 100%;
            z-index: -1;
            top: 0; 
            position: absolute;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .step-0{
            .wdlogo{
                margin-top: -19px;
                position: absolute;
                top: 50%;
                left: 6vw;
                transform: translate(0, -50%);
                width: 30vw;
                height: auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .main-body-con{
                position: absolute;
                top: 50%;
                right: 1vw;
                transform: translate(0,-50%);
                padding: 20px;
                text-align: center;
                .dk-btn-con{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        i{
                                margin-left: 30px;
                        }
                }
                .title{
                    color: #51aeffe6;
                    margin-top: 25px;
                    font-size: 1.2rem;
                }
                .main-body{
                        width: 238px;
                        margin: 0 auto;
                        background: #0087ffe6;
                        color: #fff;
                        height: 125px;
                        display: flex;
                        cursor: pointer;
                        align-items: center;
                        justify-content: center;
                        border-radius: 14px;
                        user-select: none;
                        transition: box-shadow  .32s;
                        &:active{
                            transform: translate(3px,3px);
                        } 
                        .dk-btn-con{
                        font-size: 2rem;
                        }
                }
            }
        }
        .step-1{
            padding: 12px 15px;
            box-sizing: border-box;
            height: calc(100% - 60px);
            background: #fff;
            margin: 0 30px;
            position: relative;
            top: 30px;
            .step-body{
                    height: calc(100% - 110px);
                    padding: 0 12px;
                    box-sizing: border-box;
                    .table-con{
                            height: 100%;
                            .table-container{
                                height: calc(100% - 120px);
                            }
                    }
                    .qdcc{
                            height: 100%;
                            .list-con{
                                max-height: calc(100% - 108px);
                                text-align: center;
                                margin: 25px 0;
                                overflow-y: auto;
                                .list-item{
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        width: 91%;
                                        margin: 0 auto;
                                        border: 1px solid #999999;
                                        padding: 10px 12px;
                                        .left{
                                                width: 100px;
                                                flex: 1;
                                                font-size: 1.1rem;
                                                margin: 6px 0;
                                                text-align: left;
                                                display: flex;
                                                align-items: center;
                                                .one{
                                                        width: 60%;
                                                        padding: 5px 0;
                                                }
                                        }
                                        .right{
                                                .title{
                                                        font-size: 1.6rem;
                                                        color: orange;
                                                        text-align: right;
                                                }
                                                .other-info{
                                                        font-size: 1rem;
                                                        color: gray;
                                                        text-align: right;
                                                }
                                        }
                                }
                                .list-item+.list-item{
                                        margin-top: 30px;
                                }
                            }
                            .tool-bar{
                                    display: flex;
                                    align-items: center;
                                    justify-content: flex-end;
                                    position: relative;
                                    top: 10px;
                                    .qdcc-btn{
                                            cursor: pointer;
                                            user-select: none;
                                            width: 120px;
                                            height: 50px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            background: #cccccc;
                                            color: #fff;
                                            border-radius: 10px;
                                    }
                                    .qdcc-btn{
                                            margin-left: 30px;
                                    }
                            }
                    }
                    .czwc{
                            width: 100%;
                            margin: 0 auto;
                            text-align: center;
                            i{
                                    font-size: 13rem;
                                    color: #61CF2B;
                                    margin-top: 8%;
                            }
                            .wc-btn{
                                    width: 182px;
                                    height: 68px;
                                    font-size: 1.5rem;
                                    margin: 0 auto;
                                    background: #0d8cfce6;
                                    color: #fff;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-top: 16px;
                                    border-radius: 10px;
                                    cursor: pointer;
                            }
                    }
            }
            .footer-tool{
                position: absolute;
                width: 100%;
                bottom: 23px;
                padding: 0 35px;
                box-sizing: border-box;
                left: 0;
            }
        }
    }
    .bottom{
            height: calc(50vh - 72px);
            min-height: 500px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
            }
            .grxx{
                    .title{
                        font-size: 1.5rem;
                        margin: 25px 0;
                    }
                    height: calc(100% - 60px);
                    box-sizing: border-box;
                    overflow-y: auto;
                    background: #fff;
                    margin: 0 30px;
                    padding: 0 20px;
                    position: relative;
                    top: 30px;
                    .left{
                        .row{
                                display: flex;
                                align-items: center;
                                font-size: 1.3rem;
                                margin: 22px 0;
                                margin-left: 34px;
                                .left{
                                        margin-right: 15px;
                                        width: 128px;
                                        color: gray;
                                }
                        } 
                    } 
            }
    }
}
.xgbcje-btn{
        color:#277dff;
}
.input-con{
    border: 1px solid #b9b9b9;
    height: 56px;
    line-height: 56px;
    padding: 0 12px;
    font-size: 2.2rem;
    margin: 10px;
    border-radius: 4px;
}
.ajp-con{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .item-btn{
                width: calc(33% - 20px);
                height: 60px;
                margin: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                font-size: 2rem;
                background: #409eff;
                color: #fff;
        }
}
.tool-bar{
        padding: 10px;
        box-sizing: border-box;
}
/deep/.alert-dialog{
        border-radius: 12px;
        .el-dialog__header{
                padding:  0 !important;
        }
        .el-dialog__body{
                padding: 0 !important;
        }
}
/deep/.brdialog{
        border-radius: 15px;
}
/deep/.update-dialog{ 
        .item-btn{
                height: 50px;
        }
}
.alert-con{
        .title{
                height: 55px;
                line-height: 55px;
                text-align: center;
                font-size: 2.2rem;
                padding: 20px 0;
        }
        .body{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.7rem;
                margin: 0 20px ;
                padding: 24px 0;
                .left{
                        color: red;
                        font-size: 2.6rem;
                        margin-right: 20px;
                }
        }
        .footer{
                user-select: none;
                cursor: pointer; 
                padding: 25px;
                box-sizing: border-box;
                .btn{
                        background: #277dff;
                        color: #fff;
                        margin: 0 auto;
                        height: 55px;
                        width: 138px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        border-radius: 26px;
                }
        }
}
.bbh{
        position: absolute;
        top: 11px;
        padding-left: 20px;
        width: 100%;
        text-align: left;
}
.header-tool{
        padding: 0 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btn{
                color:#409EFF;
                cursor: pointer;
                user-select: none;
        }
}
.step2{
        height: calc(100vh - 150px) !important;
        z-index: 10;
}
.title-span{
    min-width: 93px;
    display: inline-block;
}
.color-text{
        color: #3fa6ff;
        padding: 0 6px;
}
</style>