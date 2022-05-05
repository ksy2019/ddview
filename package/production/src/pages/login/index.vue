<template>
    <div class="login-container">
            <div class="login-bg"></div>
            <div class="login-form-con">
                    <div class="login-title"><span style="font-size: 2.0rem;">用户登陆</span></div>
                    <div class="login-form-row">
                            <el-input v-model="UserName" placeholder="请输入您的帐号" size="primary">
                                    <i class="el-icon-user-solid" slot="prepend"></i>
                            </el-input>
                    </div>
                    <div class="login-form-row">
                            <el-input @input="focusGs" @change="focusGs"  type="password" v-model="PassWord" show-password placeholder="请输入您的密码" size="primary">
                                    <i class="el-icon-lock" slot="prepend"></i>
                            </el-input>
                    </div>
                    <!-- //当前所属公司 -->
                    <!-- <div class="login-form-row">
                            <el-select @focus="focusGs" v-model="indexSSGS" style="width: 100%;flex: 1;" placeholder="选择登陆公司" size="primary">
                                    <el-option v-for="item in this.gsList"  :key="item.QYSH" :label="item.QYMC" :value="item.QYSH"></el-option>
                            </el-select>
                    </div> -->
                    <div class="login-form-row"> 
                            <div @click="login" class="dl-btn nos">
                                <span>登陆</span>
                            </div>
                    </div>
                    <div class="zcyh">
                            <!-- <span class="main-color nos" @click="showCreateUser=true">注册用户</span> -->
                    </div>
            </div>
            
            <div v-show="showCreateUser" id="xgmm-con">
                <transition name="el-fade-in">
                        <div v-show="showCreateUser" id="xgmm-main">
                                <div id="xgmm-main-left">
                                        <img src="" alt="">
                                </div>
                                <div id="xgmm-main-right">
                                        <p id="xgmm-one">注册用户</p>
                                        <div @click="showCreateUser=false" class="xg-close  nos">
                                                <i class="el-icon-close"></i>
                                        </div> 
                                        <el-input  size="primary" class="zcyh-input" placeholder="字母或数字组成" v-model="createUser.CZYDM">
                                                <div slot="prepend">
                                                        登陆用户
                                                </div>
                                        </el-input>
                                        <el-input size="primary" class="zcyh-input" placeholder="将显示在系统右上角(昵称)" v-model="createUser.CZYMC">
                                                <div slot="prepend">
                                                        企业名称
                                                </div>
                                        </el-input>
                                        <el-input size="primary" class="zcyh-input" placeholder="手机号码" v-model="createUser.SJ">
                                                <div slot="prepend">
                                                        手机号码
                                                </div>
                                        </el-input>
                                        <el-input size="primary" type="password"  class="zcyh-input" placeholder="登陆密码" v-model="createUser.DLMM">
                                                <div slot="prepend">
                                                        登陆密码
                                                </div>
                                        </el-input>
                                        <el-input size="primary" type="password" class="zcyh-input" placeholder="重输入密码" v-model="createUser.DLMM0">
                                                <div slot="prepend">
                                                        确定密码
                                                </div>
                                        </el-input>
                                        <div class="xgmm-submit">
                                                <!-- <div @click="showCreateUser=false" class="xgmm-btn" id="xgmm-qx">取消</div> -->
                                                <div @click="newUser" class="xgmm-btn" id="xgmm-qd">确定</div>
                                        </div>
                                </div>
                        </div>
                </transition>
            </div>
            <!-- 跟多发票设置功能 -->
            <!-- <el-dialog  :close-on-click-modal="false" title="选择公司" :show-close="false"  top="25vh" width="660px"  :visible.sync="showSelectGs">
                     <div class="more-input one-left form-body">
                            <searchgroup v-model="formData" :plugin="mySearch"></searchgroup>
                     </div>
                     <div class="ar">
                             <el-button @click="showSelectGs=false">取消</el-button>
                             <el-button type="primary">搜索</el-button>
                     </div>
            </el-dialog> -->
    </div>
</template>

<script>
import axios from 'axios'
import {Base64} from 'js-base64'
export default {
        data(){
                return {
                    createUser: {
                            CZYDM: ''
                            ,CZYMC: ''
                            ,DLMM: ''
                            ,DLMM0: ''
                            ,SJ: ''
                    },
                    indexSSGS: '',
                    UserName: ''                        //注册用户
                    ,PassWord: "",                      //注册密码
                    rsaInfo: {                          //ras加密配置
                            Exponent: ''
                            ,Modulus: ''
                            ,JMID: ''
                    },
                    showCreateUser: false,
                    gsList: [],                         //公司列表数据
                    allCheck: false,                    //选择全部公司
                }
        },
        methods: {
                formD(obj){
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
                },
                async focusGs(){                        //检点聚集到输入框里面的时候
                },
                getRsa(){                   //从服务端获取密钥
                        return new Promise((ress,rej)=>{
                                axios.get( '/SHKJ/Login/RsaInfo').then(res=>{
                                        ress(res)
                                        if(res.Result=='1'){
                                                this.rsaInfo.Exponent=res.Exponent;
                                                this.rsaInfo.Modulus=res.Modulus;
                                                this.rsaInfo.JMID=res.JMID;
                                        }
                                })
                        })
                },
                login(){ 
                        localStorage.setItem("LOGINQYSH",this.indexSSGS)
                        for(let item of this.gsList){
                                if(item.QYSH==this.indexSSGS){ 
                                        localStorage.setItem("LOGINQYMC",item.QYMC)
                                }
                        }
                        if(!localStorage.getItem("LOGINQYMC")){
                                localStorage.setItem("LOGINQYMC","全部公司")
                        }
                        this.getRsa().then(()=>{
                                let q={"UserName":this.UserName,"Password1":hex_md5(this.PassWord).toUpperCase()};
                                setMaxDigits(129);
                                let key = new RSAKeyPair(this.rsaInfo.Exponent, "", this.rsaInfo.Modulus);
                                let encrypted = encryptedString(key, JSON.stringify(q));
                                let data=[]
                                data.push(encrypted)
                                axios({
                                        url: "/SHKJ/Login/WebLogin",
                                        method: 'POST',
                                        data: "MM="+data+'&JMID='+this.rsaInfo.JMID+"&SSGS=All&ENY=1",
                                }).then(res=>{
                                        if (res.Result=='1'){
                                                this.$message.success('登陆成功，正在跳转中。。。')
                                                localStorage.setItem('token',res.ID)
                                                // localStorage.setItem('userName',res.CZYMC)
                                                localStorage.setItem('CZYDM',res.CZYID)
                                                // localStorage.setItem('JSID',res.JSID)
                                                setTimeout(() => {
                                                        this.$router.push('/home/dashboard/home')
                                                }, 900);
                                        }
                                        else{
                                                this.$message.error(res.Message)
                                        }
                                        if(res.Result=='2'){
                                                //初始密码需要修改
                                        }
                                })
                        })
                }, 
                newUser(){
                        if(this.createUser.CZYDM.match(/^[-_a-zA-Z0-9]{4,21}$/)==null){
                                this.$message.warning('登陆用户名只能为 字母 和 数字,且长度在4为到21位')
                                return
                        }
                        for(let x in this.createUser){
                                if(this.createUser[x]==''){
                                        this.$message.warning('请完善信息')
                                        return
                                }
                        }
                        if(this.createUser.DLMM!==this.createUser.DLMM0){
                                this.$message.error('输入两次密码不一样')
                                return
                        }
                        this.getRsa().then(()=>{
                                let data={
                                        CZYDM: this.createUser.CZYDM,                   //登陆用户名
                                        CZYMC: this.createUser.CZYMC,                   //用户名
                                        DLMM: this.createUser.DLMM,                      //密码
                                        DLMM0: this.createUser.DLMM0,                   //第二次输入的密码
                                        SJ: this.createUser.SJ                          //手机号码
                                }
                                // setMaxDigits(129);
                                // let key = new RSAKeyPair(this.rsaInfo.Exponent, "", this.rsaInfo.Modulus);
                                // let encrypted = encryptedString(key, JSON.stringify(data));
                                // let a=[];
                                // a.push(encrypted);
                                axios.post("https://mycst.cn/NEWKP/Login/Registry","DATA="+Base64.encode(JSON.stringify(data))+"&JMID="+this.rsaInfo.JMID).then(res=>{
                                        if(res.Result=='1'){
                                                this.$message.success("创建用户成功");
                                                this.showCreateUser=false;
                                        }
                                        this.getRsa();
                                })
                        })
                },
                init(){                                 //初始化
                        this.$store.commit('type','')
                        this.$store.commit('indexDjh','')
                }
        },
        activated(){
                this.init()
        },
        mounted(){
                this.init();
                this.getRsa();
        }
}
</script>

<style lang="less" scoped> 
.login-container{
    position: relative;
    z-index: 3;
    height: calc(100vh - 62px);
    width: 100vw;
    .login-bg{
            position: fixed;
            top: 0;
            left: 0;
            z-index:-1;
            width: 100vw;
            height: 100vh;
            background: url("./img/login_bg.jpg");
            background-size: cover;
    }
    .login-form-con{
            position: absolute;
            right: 8vw;
            top: 50%;
            transform: translateY(-60%);
            width: 400px;
            height: 300px;
            border-radius: 8px;
            background-color: #fff;
            padding: 10px;
            backdrop-filter: blur(16px) opacity(0.65);

            &> .login-form-row{
                    margin: 19px 25px;
            }
            & > .login-title{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 22px;
                    margin: 8px 0 0px;
            }
            &> .zcyh{
                    padding-right: 26px;
                    text-align: right;
            }
    }
    .dl-btn{
            margin-top: 24px;
            font-size: 1.1rem;
            color: #fff;
            letter-spacing: 3px;
            font-weight: 600;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            background: #387ee8;
    }
}



#xgmm-con{
    position: fixed;
    width: 100vw;  
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.61);
    input{
            outline: none;
    }
}

#xgmm-main{
    width: 765px;
    height: 429px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 8px;
    display: flex;
}
#xgmm-main-left{
    width: 38%;
    background-image: url(./img/xgmm.jpg);
    background-repeat: round;
    background-size: 103%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
#xgmm-main-right{
    & > .zcyh-input{
            padding: 6px 46px;
            box-sizing: border-box;
    }
    width: 62%;
    padding: 15px;
    padding-top: 8px;
    & > .xg-close{
                position: absolute;
                top: 12px;
                right: 24px;
                font-size: 1.5rem;
    }
}
#xgmm-one{
    font-size: 36px;
    font-weight: 200;
    color: #000000;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 15px;
    margin-top: 10px;
}
#xgmm-two{
    font-size: 23px;
    font-weight: 100;
    text-align: center;
    width: 80%;
    margin: auto;
    padding-top: 3px;
}
#xgmm-text{
    margin: 15px 0;
    padding: 0 60px 0 75px;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 200;    
    line-height: 18px;
    position: relative;
}
#xgmm-main-right>input{
    display: block;
    border-top: none;
    border-left: none;
    border-right: none;
    margin: 12px auto;
    width: 80%;
    padding: 8px 8px;
    font-size: 12px;
//     letter-spacing: 2px;
    font-weight: 500;
    box-sizing: border-box;
//     border: 2px solid #4c4c4c;
    border: 1px solid #cac2c2;
    border-radius: 8px;
}
.xgmm-text-icon{
    position: absolute;
    left: 55px;
    top: 1px;
    font-size: 16px;
    color: #ff652f;
}
.xgmm-btn{
    display: inline-block;
    padding: 7px 19px;
    border-radius: 8px;
    border: 1px solid #dcd5d5;
    color: #fff;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: .9rem;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    transition:  box-shadow .36s;
}
.xgmm-btn:hover{
    box-shadow: 0px 5px 4px -1px #e3dada;
}
.xgmm-submit{
    text-align: left;
    width: 80%;
    margin: 16px auto;
    display: flex;
    line-height: 29px;
}
#xgmm-qx{
    margin-right: 13px;
    background: #b3b0b0;
    color: #fff;
}
#xgmm-qd{
    background: #409eff;
    text-align: center;
    flex: 1;
}
</style>