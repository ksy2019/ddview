(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2955a99e"],{"37e7":function(e,s,t){"use strict";var a=t("b312"),r=t.n(a);r.a},b312:function(e,s,t){},efcf:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login-container"},[t("div",{staticClass:"login-bg"}),t("div",{staticClass:"login-form-con"},[e._m(0),t("div",{staticClass:"login-form-row"},[t("el-input",{attrs:{placeholder:"请输入您的帐号",size:"primary"},model:{value:e.UserName,callback:function(s){e.UserName=s},expression:"UserName"}},[t("i",{staticClass:"el-icon-user-solid",attrs:{slot:"prepend"},slot:"prepend"})])],1),t("div",{staticClass:"login-form-row"},[t("el-input",{attrs:{type:"password","show-password":"",placeholder:"请输入您的密码",size:"primary"},on:{input:e.focusGs,change:e.focusGs},model:{value:e.PassWord,callback:function(s){e.PassWord=s},expression:"PassWord"}},[t("i",{staticClass:"el-icon-lock",attrs:{slot:"prepend"},slot:"prepend"})])],1),t("div",{staticClass:"login-form-row"},[t("div",{staticClass:"dl-btn nos",on:{click:e.login}},[t("span",[e._v("登陆")])])]),t("div",{staticClass:"zcyh"})]),t("div",{directives:[{name:"show",rawName:"v-show",value:e.showCreateUser,expression:"showCreateUser"}],attrs:{id:"xgmm-con"}},[t("transition",{attrs:{name:"el-fade-in"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.showCreateUser,expression:"showCreateUser"}],attrs:{id:"xgmm-main"}},[t("div",{attrs:{id:"xgmm-main-left"}},[t("img",{attrs:{src:"",alt:""}})]),t("div",{attrs:{id:"xgmm-main-right"}},[t("p",{attrs:{id:"xgmm-one"}},[e._v("注册用户")]),t("div",{staticClass:"xg-close  nos",on:{click:function(s){e.showCreateUser=!1}}},[t("i",{staticClass:"el-icon-close"})]),t("el-input",{staticClass:"zcyh-input",attrs:{size:"primary",placeholder:"字母或数字组成"},model:{value:e.createUser.CZYDM,callback:function(s){e.$set(e.createUser,"CZYDM",s)},expression:"createUser.CZYDM"}},[t("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._v(" 登陆用户 ")])]),t("el-input",{staticClass:"zcyh-input",attrs:{size:"primary",placeholder:"将显示在系统右上角(昵称)"},model:{value:e.createUser.CZYMC,callback:function(s){e.$set(e.createUser,"CZYMC",s)},expression:"createUser.CZYMC"}},[t("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._v(" 企业名称 ")])]),t("el-input",{staticClass:"zcyh-input",attrs:{size:"primary",placeholder:"手机号码"},model:{value:e.createUser.SJ,callback:function(s){e.$set(e.createUser,"SJ",s)},expression:"createUser.SJ"}},[t("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._v(" 手机号码 ")])]),t("el-input",{staticClass:"zcyh-input",attrs:{size:"primary",type:"password",placeholder:"登陆密码"},model:{value:e.createUser.DLMM,callback:function(s){e.$set(e.createUser,"DLMM",s)},expression:"createUser.DLMM"}},[t("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._v(" 登陆密码 ")])]),t("el-input",{staticClass:"zcyh-input",attrs:{size:"primary",type:"password",placeholder:"重输入密码"},model:{value:e.createUser.DLMM0,callback:function(s){e.$set(e.createUser,"DLMM0",s)},expression:"createUser.DLMM0"}},[t("div",{attrs:{slot:"prepend"},slot:"prepend"},[e._v(" 确定密码 ")])]),t("div",{staticClass:"xgmm-submit"},[t("div",{staticClass:"xgmm-btn",attrs:{id:"xgmm-qd"},on:{click:e.newUser}},[e._v("确定")])])],1)])])],1)])},r=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login-title"},[t("span",{staticStyle:{"font-size":"2.0rem"}},[e._v("用户登陆")])])}],n=(t("4160"),t("b64b"),t("d3b7"),t("ac1f"),t("3ca3"),t("466d"),t("159b"),t("ddb0"),t("2b3d"),t("b85c")),i=(t("96cf"),t("1da1")),o=t("cebe"),c=t.n(o),l=t("e762"),d={data:function(){return{createUser:{CZYDM:"",CZYMC:"",DLMM:"",DLMM0:"",SJ:""},indexSSGS:"",UserName:"",PassWord:"",rsaInfo:{Exponent:"",Modulus:"",JMID:""},showCreateUser:!1,gsList:[],allCheck:!1}},methods:{formD:function(e){var s=new URLSearchParams;return Object.keys(e).forEach((function(t){e[t]instanceof Array?e[t].forEach((function(e){s.append(t,e)})):s.append(t,e[t])})),s},focusGs:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},getRsa:function(){var e=this;return new Promise((function(s,t){c.a.get("/SHKJ/Login/RsaInfo").then((function(t){s(t),"1"==t.Result&&(e.rsaInfo.Exponent=t.Exponent,e.rsaInfo.Modulus=t.Modulus,e.rsaInfo.JMID=t.JMID)}))}))},login:function(){var e=this;localStorage.setItem("LOGINQYSH",this.indexSSGS);var s,t=Object(n["a"])(this.gsList);try{for(t.s();!(s=t.n()).done;){var a=s.value;a.QYSH==this.indexSSGS&&localStorage.setItem("LOGINQYMC",a.QYMC)}}catch(r){t.e(r)}finally{t.f()}localStorage.getItem("LOGINQYMC")||localStorage.setItem("LOGINQYMC","全部公司"),this.getRsa().then((function(){var s={UserName:e.UserName,Password1:hex_md5(e.PassWord).toUpperCase()};setMaxDigits(129);var t=new RSAKeyPair(e.rsaInfo.Exponent,"",e.rsaInfo.Modulus),a=encryptedString(t,JSON.stringify(s)),r=[];r.push(a),c()({url:"/SHKJ/Login/WebLogin",method:"POST",data:"MM="+r+"&JMID="+e.rsaInfo.JMID+"&SSGS=All&ENY=1"}).then((function(s){"1"==s.Result?(e.$message.success("登陆成功，正在跳转中。。。"),localStorage.setItem("token",s.ID),localStorage.setItem("CZYDM",s.CZYID),setTimeout((function(){e.$router.push("/home/dashboard/home")}),900)):e.$message.error(s.Message),s.Result}))}))},newUser:function(){var e=this;if(null!=this.createUser.CZYDM.match(/^[-_a-zA-Z0-9]{4,21}$/)){for(var s in this.createUser)if(""==this.createUser[s])return void this.$message.warning("请完善信息");this.createUser.DLMM===this.createUser.DLMM0?this.getRsa().then((function(){var s={CZYDM:e.createUser.CZYDM,CZYMC:e.createUser.CZYMC,DLMM:e.createUser.DLMM,DLMM0:e.createUser.DLMM0,SJ:e.createUser.SJ};c.a.post("https://mycst.cn/NEWKP/Login/Registry","DATA="+l["a"].encode(JSON.stringify(s))+"&JMID="+e.rsaInfo.JMID).then((function(s){"1"==s.Result&&(e.$message.success("创建用户成功"),e.showCreateUser=!1),e.getRsa()}))})):this.$message.error("输入两次密码不一样")}else this.$message.warning("登陆用户名只能为 字母 和 数字,且长度在4为到21位")},init:function(){this.$store.commit("type",""),this.$store.commit("indexDjh","")}},activated:function(){this.init()},mounted:function(){this.init(),this.getRsa()}},u=d,p=(t("37e7"),t("2877")),m=Object(p["a"])(u,a,r,!1,null,"1eccbd76",null);s["default"]=m.exports}}]);