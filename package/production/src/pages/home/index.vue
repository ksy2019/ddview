<template>
  <div class="selectgs-container all-in-one-container">
<!-- ///顶部用户信息 -->
      <div class="home-top pd12 ">
            <div class="home-top-left">
                    <div class="logo nos" ><img :src="config.LOGOSRC" alt=""></div>
                    <!-- <span class="span-sqc"></span> -->
                    <div style="margin-right: 30px;" class="nos" @click="goHome">
                            <span class="logo-title">{{config.TITLE}}</span><span  class="title2">{{config.TITLE2}}</span>
                    </div>
            </div>
            <div class="home-top-right">
                    <img height="26px" class="user-icon nos" src="@/assets/img/user.png" alt="">
                    <span  class="user-name mr5">{{userInfo.userName}}</span>
                    <img @click="updateYH({CZYID:''})" src="@/assets/img/changepw.png" height="20px" style="margin-left: 8px;" class="nos top-btn" alt="">
                    <img  @click="exit" src="@/assets/img/exit.png" class="exit-icon nos top-btn" height="20px" alt="">
            </div>
      </div>
<!-- //主要内容载体 -->
      <div class="body-main">
              <keep-alive exclude="login" v-if="showBody">
                        <transition name="el-fade-in">
                              <router-view></router-view>
                        </transition>
              </keep-alive>
      </div>
<!-- 更改密码 -->
      <el-dialog v-dialogDrag  custom-class="xgmm-dialog" top="22vh" width="620px" size="mini" title="修改密码" :visible.sync="showUpdateYH">
                <el-form label-position="left"  :model="updateYhForm">
                        <el-form-item label-position="left" label-width="90px"  label="旧密码 ：">
                        <el-input
                                type="password"
                                v-model="updateYhForm.old"
                                placeholder="请输入旧密码"
                                show-password
                                autocomplete="off"
                        ></el-input>
                        </el-form-item>
                        <el-form-item label-position="left" label-width="90px"  label="新密码 ：">
                        <el-input
                                type="password"
                                v-model="updateYhForm.DLMMM"
                                placeholder="请输入新密码"
                                show-password
                                autocomplete="off"
                        ></el-input>
                        </el-form-item>

                        <el-form-item label-position="left"  label-width="90px"  label="确定密码 ：">
                        <el-input
                                type="password"
                                v-model="updateYhForm.DLMM"
                                show-password
                                placeholder="请再次输入新密码"
                                autocomplete="off"
                        ></el-input>
                        </el-form-item>
                </el-form>

                <p class="ps ps-title">密码规则 ： </p>
                <p class="ps">1、密码中必需包括大写，小写，字符(例如：!@#$%^&*())、数字。</p>
                <p class="ps">2、密码长度不能小于8位</p>
                <p class="ps">3、密码不能是前三次使用过的密码</p>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="showUpdateYH = false">取 消</el-button>
                        <el-button type="primary" @click="updateGXMM">确 定</el-button>
                </div>
      </el-dialog> 
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex' 
export default {
  computed: {
      ...mapState(['config','menuData']),
      gssbSrc(){
            if(this.token==''||window.httpHeader==''){
                return ''
            }
            return encodeURIComponent(window.httpHeader+'/gssb/#/home?token='+this.token+'&ENTER=SHKJ&HIDEXFJLHIDEYHGL=1')
      },
      showSklb(){
              if(this.$route.path.toLowerCase().indexOf("gsmb")!==-1){
                      return true
              }
              return false
      }
  },
  data(){
      return{ 
            showBody: false,             //是否显示路由，用于刷新数据
            activeIndex: '/home/dashboard/',
            token: '', 
            userInfo: {
                    userName: '- - -',         //操作员名称
            },
            showUpdateYH: false,        //是否显示更新用户信息
            updateYhForm:{DLMM:'',DLMMM:'',old:''},
      }
  },
  watch: {
  },
  methods: {
        goHome(){
                this.showBody=false
                this.$router.push('/home/dashboard/home')
                setTimeout(() => {
                        this.showBody=true
                }, 220);
        },  
        updateYH(row){                  //更新用户信息
                this.updateYhForm=JSON.parse(JSON.stringify(row)) 
                this.showUpdateYH=true
        },
        updateGXMM(){                   //升级客户密码
                if(this.updateYhForm.DLMM!==this.updateYhForm.DLMMM){
                        this.$message.warning("两次输入的密码不一致，请检查输入")
                        return
                }
                axios.post('/SHKJ/Login/SetNewPassword',this.$base.formD({
                        DLMM: this.updateYhForm.DLMM,
                        YDLMM: this.updateYhForm.old,
                        czyid: this.updateYhForm.CZYID
                })).then(res=>{
                        if(res.Result=='1'){
                                this.showUpdateYH=false;
                                //如果是修改当前用户，退出重新登陆
                                if(this.updateYhForm.CZYID===''){
                                        setTimeout(() => {
                                              this.$router.push('/login')  
                                        }, 320);
                                }
                                this.$message.success(res.Message)
                        }else{
                                this.$message.error(res.Message)
                        }
                })
        }, 
        exit(){
                this.$confirm("确定注销登陆吗？", '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                })
        },   
  },
  async created(){
        this.showBody=true
        //获取上一次的记录
        if(localStorage.getItem("indexSp")){
                this.$store.commit("indexZD",JSON.parse(localStorage.getItem("indexSp")))
        }
        if(localStorage.getItem('home_indexTab')!==null)this.activeIndex=localStorage.getItem('home_indexTab'); 
        this.token=localStorage.getItem("token");
  },
  async mounted(){
  }
}
</script>   
<style lang="less" scoped>
.yhgl-tab-container{
        height: calc(100vh - 16px);
        padding: 0 15px;
}
.user-icon{
    padding: 5px;
    background: #d4d4d4;
    border-radius: 50%;
    margin-right: 10px;
}
.top-btn{
        padding: 6px;
        border-radius: 6px;
        &:hover{
                background: #eeeeee;
        }
}
.exit-icon{
        margin-left: 8px;
}
/deep/.sele100{
      input{ 
              width: 100% !important; 
      }
}
/deep/.splbxz{
      min-width: 230px;
      input{
              color: #fff;
              background: #fff0 !important;
              border: none;
              padding: 0 !important;
              width: calc(100% - 19px);
              overflow: hidden;
              text-overflow: ellipsis;
      }
      .el-input__suffix{
              right: -20px;
      }
      .el-input__icon{
              color: #fff;
      }
      ::-webkit-input-placeholder {  /* WebKit, Blink, Edge */
      color:    #fff;
      }
      :-moz-placeholder {   /* Mozilla Firefox 4 to 18 */
      color:    #fff;
      }
      ::-moz-placeholder {   /* Mozilla Firefox 19+ */
      color:    #fff;
      }
      :-ms-input-placeholder {  /* Internet Explorer 10-11 */
      color:    #fff;
      }
}
.qymc-dd{
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
} 
#xgmm-con{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;  
    height: 100vh;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.61);
    input{
            outline: none;
    }
}
/deep/.el-menu{
        border: none;
}
#xgmm-main{
    width: 550px;
    height: 429px;
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 8px;
    display: flex;
}
#xgmm-main-left{
    width: 38%;
    background-image: url('../../assets/img/xgmm.jpg');
    background-repeat: round;
    background-size: 103%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
#xgmm-main-right{
    & > .zcyh-input{
            padding: 10px 46px;
            box-sizing: border-box;
    }
    width: 100%;
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
/deep/.tdjg-dialog{
        padding-bottom: 20px !important;
        .el-dialog__body{
                height: 360px !important;
                padding: 10px 20px !important;
        }
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



.fsdx-row{
        margin: 20px 0;
}
/deep/.myswith{
        line-height: 15px !important;
        height: 15px;
        .el-switch__core{
                width: 32px !important;
                height: 16px !important;
                &::after{
                        width: 11px !important;
                        height: 11px !important;
                }
        }
}
// /deep/.el-switch.is-checked .el-switch__core::after{
//                         margin-left: -13px !important;
// }
/deep/.xzkh-dialog{
        height: 490px; 
        .el-dialog__body{
                height: 100%;
                padding: 10px 20px !important;
        }
}
.online-span{
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
}
.link-moblie{
        background: rgb(227, 236, 250);
}
.kpjh{
    border: 1px solid #FF8400;
    color: #FF8400;
    border-radius: 4px;
    height: 14px;
    width: 14px;
    line-height: 14px;
    font-size: 9pt;
    font-weight: 600;
    position: absolute;
    right: -6px;
    text-align: center;
    top: 4px;
}
.selectgs-container{
    /deep/.el-tabs--border-card{
            box-shadow: 0 0 #000;
    }
//     /deep/.el-tabs__content{
//             padding: 0 !important;
//             height: calc(100vh - 88px);
//             background: #fff;
//     }
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #f9f8ff;
    // padding: 30px 0;
    box-sizing: border-box;
    // background-image: url('./img/bg.jpg');
    background-size: cover;
    .home-top{
                 display: flex;
                 align-items: center;
                 justify-content: space-between;
                 background:#fafbff;
                 margin-bottom: 10px; 
                 flex-wrap: nowrap;
                 box-sizing: border-box;
                 white-space: nowrap;
                 .home-top-left{
                                 flex-wrap: nowrap;
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                                 .span-sqc{
                                         display: inline-block;
                                         width: 5px;
                                         height: 32px;
                                         background: #1088ff;
                                         margin-right: 12px;
                                         border-radius: 20px;
                                 } 
                                 .logo-title{
                                         font-size: 12pt;
                                 }
                 }
                 .home-top-right{
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                 flex-wrap: nowrap;
                                //  &>span:first-child{
                                //          margin-right: 12px;
                                //  }
                                 .el-icon-user-solid{
                                         margin-left: 12px;
                                 }
                                 .user-name{
                                         margin-left: 3px;
                                 }
                                 & .exit{
                                         margin-left: 12px;
                                         font-size: 11pt;
                                 }
                 }
    }     
    .select-body{
        border: 1px solid #ededed;
        background: #fff;
        height: calc(100% - 62px);
        width: 100%;
        margin: 0px auto;
        border-radius: 8px; 
        .tool-top{
            box-sizing: border-box;
            padding: 6px 30px;
            border-bottom: 1px solid #e5e5e5;
            .tool-left{
                font-size: 16px;
                font-weight: 600;
                white-space: nowrap;
            }
            .tool-right{
                white-space: nowrap;
                .sh-btn{
                    line-height: 32px;
                    height: 32px;
                    display: inline-block;
                    font-size: .9rem;
                    font-weight: 600;
                    background: #0b65ff;
                    padding: 0 23px;
                    border-radius: 4px;
                    color: #fff;
                    transition: all .32s ;
                    &:hover{
                        box-shadow: 0px 4px 7px -2px #767ae1;
                    }
                }
            }
        }
        .table-con{
            height: calc(100vh - 192px);
            margin: 0 30px;
            overflow-y: auto;
            .gs-item{
                    padding: 15px 25px;
                    border: 1px solid #ededed;
                    box-shadow: 0px 2px 16px #edf0ff;
                    border-radius: 8px;
                    margin-bottom: 20px;
            }
            .gs-item:last-child{
                    margin-bottom: 0px;
            }
            .gs-item{
                @text-color: #8c8c8c;               //行颜色
                @row-margin: 4px 0;                   //行间距
                .item-sec-con{
                    padding: 7px 62px;
                    background: #f8f8fb;
                    border-radius: 6px;
                    margin: 5px 0;
                    border: 1px solid #ededed;
                    position: relative;
                }
                .item-top{
                      .left{
                          display: flex;
                          align-items: flex-end;
                          & img{
                                margin-right: 5px;
                                position: relative;
                          }
                          h3{
                              position: relative;
                              bottom: 3px;
                              left: 3px;
                          }
                      }  
                      .right{
                          .zx-btn{
                                border: 1px solid #ff0800;
                                color: #ff0800 ;
                          }
                          .edit{
                                font-size: 1rem;
                                font-weight: 600;
                                height: 33px;
                                line-height: 33px;
                                border: 1px solid #FF8400;
                                display: inline-block;
                                padding: 0 12px;
                                border-radius: 6px;
                          }
                      }
                }
                .jr-btn{
                        position: absolute;
                        bottom: 24px;
                        right: 37px;
                        border: 1px solid blue;
                        color: blue;
                        border-radius: 8px;
                        height: 36px;
                        line-height: 36px;
                        padding: 0 20px;
                        font-size: 1rem;
                        font-weight: 600;
                }
                .row-one{
                    margin: @row-margin;
                    display: flex;
                    align-items: center;
                    h5{
                        display: inline-block;
                        padding: 0 30px 0 0;
                        color: @text-color;
                    }
                    h5:first-child{
                        min-width: 145px;
                    }
                    h5:nth-child(2){
                        min-width: 145px;
                    }
                }
                .row-two{
                    margin: @row-margin;
                    display: flex;
                    align-items: center;
                    .three-text:first-child{
                        min-width: 145px;
                    }
                    .three-text{
                        display: inline-block;
                        font-size: 10pt;
                        color: @text-color;
                        padding: 0 30px 0 0;
                        font-weight: 600;
                    }
                }
                .row-three{
                    margin: @row-margin;
                    display: flex;
                    align-items: center;
                    .three-text:first-child{
                        min-width: 145px;
                    }
                    .three-text:nth-child(2){
                        min-width: 145px;
                    }
                    .three-text{
                        display: inline-block;
                        font-size: 10pt;
                        color: @text-color;
                        padding: 0 30px 0 0;
                        font-weight: 600;
                    }
                }
            }
        }
    }
}
.home-modules{
        height: calc(100vh - 62px);
}
.table-header-con{
    display: flex;
    align-items: center;
    margin: 6px 20px;
    & .fgx{
            height: 38px;
            width: 5px;
            background: #828282;
    }
}
.overText{
        overflow: hidden;
        text-overflow: ellipsis;
}
//详细信息显示问题        
.fixed-container{
        position: fixed;
        top: 0;
        right: 0;
        // width: 100%;
        height: 100vh;
        justify-content: flex-end;
        z-index: 999;
        .left{
                width: 100px;
                flex: 1;
                height: 100%;
        }
        .fwda-container{
                position: static;
                box-shadow: -3px 3px 8px #80858d45, 0 0 #000;
                background: #fff;
                width: 600px;
                height: 100%;
                font-size: 9pt;
        }
}
.xgspxx{
        width: 500px;
        .xgsp-container{ 
                height: 388px;
                overflow-y: auto;
                & > .form-row{
                        span{
                            font-weight: 600;
                            color: #767689;
                        }
                        margin: 20px 45px;
                        .prepend-title{
                                width: 90px;
                                text-align: center;
                        }  
                        &>span{
                            min-width: 75px; 
                            display: inline-block;
                        }
                }
                .two-row{
                    & span{
                                width: 78.5px;
                                line-height: 30px;
                                height: 30px;
                                display: inline-block;
                                text-align: left;
                                text-align: center;
                    }
                }
        }
}


.xgmm-dialog {

        .el-form-item{
                margin: 20px 115px;
        }
        label{
                color: #ededed;
        }
        p{
                color: #d61d1dbd;
                padding-left: 115px;
                margin: 5px 0;
                letter-spacing: 1px;
        }
} 




@mainColor: rgb(133, 133, 133);
@secColor: #fff;
@activeColor: #58c7e9; 
@topBackgroun:#fbfbff;
@exitColor: #cacfd9;
@SPBG: #54b0cc;
@SPBGCOLOR: #FFF;
.all-in-one-container{
    .myframe{
        height: 100%;
        width: 100%;  
    }
    .tgkpframe{
        height: 100vh;
        position: absolute;
        top: 0px;
    }
    .gssbframe{
        height: calc(100vh - 62px); 
    }
    background: #efefef;
    .home-top{
                 display: flex;
                 align-items: center;
                 justify-content: space-between;
                 background: @topBackgroun;
                 margin-bottom: 10px;
                 padding: 0 12px;
                 height: 50px;
                 color: @mainColor;
                 line-height: 50px;
                 box-sizing: border-box;
                 box-shadow: 0px 5px 17px -4px #83adba26; 
                 .home-top-left{
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                                 .span-sqc{
                                        display: inline-block;
                                        width: 5px;
                                        height: 32px;
                                        background: @mainColor;
                                        margin-right: 12px;
                                        border-radius: 20px;
                                 }
                                 .logo{
                                        height: 32px;
                                        margin-right: 12px;
                                        background: #fff;
                                        min-width: 32px;
                                        padding: 4px;
                                        border-radius: 12.5px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                         & img{
                                                 height: 86%;
                                         }
                                 }
                                 .logo-title{
                                         font-size: 14pt;
                                         font-weight: 500;
                                         color: @mainColor;
                                 }
                                 .title2{
                                        font-size: 300;
                                        font-size: 9px;
                                        letter-spacing: 1px;
                                        color: @secColor;
                                        margin-left: 5px;
                                 }
                 }
                 .home-top-right{
                                //  &>span:first-child{
                                //          margin-right: 12px;
                                //  }
                                 .el-icon-user-solid{
                                         margin-left: 12px;
                                 }
                                 .user-name{
                                         margin-left: 3px;
                                         color: @mainColor;;
                                 }
                                 & .exit{
                                         margin-left: 12px;
                                         font-size: 11pt;
                                         color: @exitColor;
                                 }
                 }
    }     
    .body-main{
            height: calc(100vh - 62px);
            background: #fff;
            width: 100%;
            overflow: hidden;
    }
}
.online-span{
    display: inline-block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    color: #8a8a8a;
}
.xgmm-dialog {
        .el-form-item{
                margin: 20px 115px;
        }
        label{
                color: #ededed;
        }
        p{
                color: #d61d1dbd;
                padding-left: 115px;
                margin: 5px 0;
                letter-spacing: 1px;
        }
} 
.home-top {
        .el-menu--horizontal>.el-menu-item{
        border-bottom: 0px solid !important;
        .blue{
                color: @mainColor; 
        }
        }
        .el-menu.el-menu--horizontal{
                border-bottom: none !important;
                display: flex;
        }
        .el-menu-item.is-active::before{
                display: none !important;
        }
        .el-menu--horizontal>.el-menu-item.is-active{ 
        border-bottom-color: #fff;
        background: @activeColor  !important;
        color: @mainColor !important;
        }
        .el-menu--horizontal{
        background:   #ffffff00;
        }
        .el-menu--horizontal>.el-menu-item{
        height: 50px !important;
        line-height: 50px !important;
        transition: .12s;
        color: @secColor;
        &:hover{
                background: #1a8db0 ;
                color: @mainColor !important;
        }
        }  
}
@keyframes rotate{
        from {
                transform: rotate(0deg);       
        }
        to{
                transform: rotate(360deg);      
        }
}
.roateanm{
        animation: rotate 1300ms infinite;
}

 
.select-container{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        &>div{
                display: inline-block;
        }
        .title-container{
                display: inline-block;
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-right: 26px;
                font-size: 9pt;
        }
        .kpjh-con{
                position: absolute;
                right: 2px;
                .kpjh{
                        position: unset !important;
                        right: 5px;
                        display: inline-block;
                        margin-left: 5px;
                }   
        }
}
.dqzdmc{
        font-size: .86rem;
        font-weight: 600; 
        padding: 0 12px 0 8px;
        border-radius: 4px;
        color: @SPBGCOLOR;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        height: 25px;
        line-height: 25px;
        border: 1px solid @SPBG;
        background: @SPBG;
        display: flex;
        align-items: center;
        justify-content: center;
}
.dqzd-container{
        display: flex;
        align-items: center;
        .kpjh-con{
                position: relative;
                left: -19px;
                background: #e4ffe4;
                border-radius: 4px;
                color: #43e141; 
                font-size: 9px;
                height: 15px;
                width: 15px;
                text-align: center; 
                font-weight: 600;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
        }
        .sxspbtn{
                line-height: 25px;
                height: 25px; 
                color: #fff;
                padding: 0 7px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                border: 1px solid @SPBG;
                background: @SPBG;
                font-weight: 600;
                i{
                        transition: all 1000ms;
                }
        }
}
</style>
 