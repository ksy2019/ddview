(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a7a28c4"],{"4c1a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home-container"},[s("div",{staticClass:"home-body"},[s("transition",{attrs:{"enter-active-class":"filpin","leave-active-class":"filpout"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.isCollpse,expression:"!isCollpse"}],staticClass:"showColl nos",on:{click:function(e){t.isCollpse=!t.isCollpse}}},[s("i",{staticClass:"el-icon-caret-right"})])]),s("div",{staticClass:"home-left-container",style:t.isCollpse?"margin-right:10px;width:190px;":"margin-right:0;width:0px;"},[s("div",{staticClass:"home-body-left scrollbar"},[s("el-menu",{staticClass:"br1 my-elmenu",attrs:{"unique-opened":"","default-active":t.tabsData.indexTab}},[t._l(t.menuData,(function(e){return["0"==e.iscontainer?s("el-menu-item",{key:e.router,attrs:{index:e.router},on:{click:function(s){return t.clickTab(e)}}},[s("div",{staticClass:"menu-item"},[s("i",{class:e.icon,staticStyle:{color:"#000000e6"}}),t._v(" "+t._s(e.label)+" ")])]):t._e(),"1"==e.iscontainer?s("el-submenu",{key:e.router,attrs:{index:e.router}},[s("div",{staticClass:"menu-item",attrs:{slot:"title"},slot:"title"},[s("i",{class:e.icon,staticStyle:{color:"#000000e6"}}),s("span",[t._v(t._s(e.label))])]),t._l(e.children,(function(e,a){return s("el-menu-item",{key:a,staticClass:"br1",attrs:{index:e.router},on:{click:function(s){return t.clickTab(e)}}},[s("div",{staticClass:"menu-item ",attrs:{slot:"title"},slot:"title"},[s("i",{class:e.icon,staticStyle:{color:"#000000e6"}}),s("span",[t._v(t._s(e.label))])])])}))],2):t._e()]}))],2),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isCollpse,expression:"isCollpse"}],staticClass:"sq-btn nos",on:{click:function(e){t.isCollpse=!t.isCollpse}}},[t._m(0)])],1)]),s("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.loadingOk,expression:"!loadingOk"}],staticClass:"home-body-right"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showTabs,expression:"showTabs"}],staticClass:"sh-tabs-container"},[s("my-tab",{attrs:{tabsData:t.tabsData}})],1),t.loadingOk?s("div",{staticClass:"router-con",style:{height:t.showTabs?"calc(100% - 36px )":"100%"}},[s("keep-alive",[s("router-view",{key:t.$route.path.replace("/home/dashboard/","")})],1)],1):t._e()])],1)])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{attrs:{type:"primary"}},[s("i",{staticClass:"el-icon-caret-left"}),t._v(" 收起")])}],n=(s("4de4"),s("4160"),s("ac1f"),s("5319"),s("159b"),s("96cf"),s("1da1")),o=s("5530"),r=s("b85c"),l=s("2f62"),c=(s("c975"),s("a434"),s("b64b"),s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),s("cebe")),u=s.n(c);s("5f72"),s("e762");u.a.CancelToken;window.allHttp=[];var h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-tab-container"},[s("transition",{attrs:{name:"el-zoom-in-center"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.scrollIcon,expression:"scrollIcon"}],staticClass:"scroll-btn scroll-btn-left",on:{click:function(e){return t.scrollTo("left")}}},[s("i",{staticClass:"el-icon-arrow-left"})])]),s("div",{staticClass:"noscrollbar",attrs:{id:"scroll-con"}},[s("transition-group",{attrs:{"leave-to-class":"router-leaver","enter-active-class":"router-enter"}},t._l(t.tabsData.list,(function(e){return s("div",{key:e.router,ref:e.router,refInFor:!0,staticClass:"sh-tabs-item",class:e.router==t.tabsData.indexTab?"index-tab":"",on:{click:function(s){return t.clickTab(e)}}},[s("span",[s("i",{class:e.icon}),t._v(" "+t._s(e.label))]),s("span",{directives:[{name:"show",rawName:"v-show",value:"home"!=e.router,expression:"item.router!='home'"}],staticClass:"el-icon-circle-close tab-close",on:{click:function(s){return s.stopPropagation(),t.closeTab(e)}}})])})),0)],1),s("transition",{attrs:{name:"el-zoom-in-center"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.scrollIcon,expression:"scrollIcon"}],staticClass:"scroll-btn scroll-btn-right",on:{click:function(e){return t.scrollTo("right")}}},[s("i",{staticClass:"el-icon-arrow-right"})])])],1)},d=[],m={props:["tabsData"],data:function(){return{scrollIcon:!1}},methods:{closeTab:function(t){var e=this;this.tabsData.list=this.tabsData.list.filter((function(e){return e.router!=t.router})),this.tabsData.list[this.tabsData.list.length-1].router!==this.$route.path.replace("/","")&&this.$router.push(this.tabsData.list[this.tabsData.list.length-1].router),this.$nextTick((function(){e.eventTabContainer()}))},scrollTo:function(t){"left"==t?(this.$emit("leftEvent"),this.$nextTick((function(){document.getElementById("scroll-con").scrollTo({left:document.getElementById("scroll-con").scrollLeft-500,behavior:"smooth"})}))):(this.$emit("rightEvent"),this.$nextTick((function(){document.getElementById("scroll-con").scrollTo({left:document.getElementById("scroll-con").scrollLeft+500,behavior:"smooth"})})))},clickTab:function(t){this.$route.path.replace("/home/dashboard/home","")!=t.router&&this.$router.push(t.router)},eventTabContainer:function(){var t=this;setTimeout((function(){var e=0;if(0!=document.getElementsByClassName("sh-tabs-container").length){var s,a=document.getElementsByClassName("sh-tabs-container")[0].clientWidth,i=Object(r["a"])(document.getElementsByClassName("sh-tabs-item"));try{for(i.s();!(s=i.n()).done;){var n=s.value;if(e+=n.clientWidth+5,e>a)return void(t.scrollIcon=!0)}}catch(o){i.e(o)}finally{i.f()}t.scrollIcon=!1}else setTimeout((function(){t.eventTabContainer()}),200)}),220)}},mounted:function(){var t=this;this.$nextTick((function(){t.eventTabContainer()}))}},b=m,f=(s("ab83"),s("2877")),v=Object(f["a"])(b,h,d,!1,null,"cf8cc234",null),p=v.exports,C={data:function(){return{menuListEP:[],isCollpse:!0,loadingOk:!1,showTabs:!0,tabsData:{indexTab:"home",list:[{label:"首页",router:"home",icon:"el-icon-house"}]}}},components:{myTab:p},watch:{isCollpse:function(){localStorage.setItem("wdsk-isCollpseGS",this.isCollpse)},tabsData:{handler:function(){localStorage.setItem("wdsk-mytabs",JSON.stringify(this.tabsData))},deep:!0},$route:{handler:function(t){var e=this;if(this.showTabs)if(0===this.tabsData.list.filter((function(e){if(e.router==t.path.replace("/home/dashboard/",""))return e})).length){var s,a=Object(r["a"])(this.menuListEP);try{for(a.s();!(s=a.n()).done;){var i=s.value;if(i.rou22ter===this.$route.path.replace("/home/dashboard/",""))return this.tabsData.indexTab=t.path.replace("/home/dashboard/",""),this.tabsData.list.push(i),this.eventTabContainer(),void this.$nextTick((function(){e.$refs[e.tabsData.indexTab][0].scrollIntoView({behavior:"smooth"})}))}}catch(n){a.e(n)}finally{a.f()}}else this.tabsData.indexTab=t.path.replace("/home/dashboard/",""),this.$nextTick((function(){try{e.$refs[e.tabsData.indexTab][0].scrollIntoView({behavior:"smooth"})}catch(n){console.log("调整位置失败...")}}))},deep:!0},menuData:{handler:function(){this.menuListEP=[],this.createMenuEP()},deep:!0}},computed:Object(o["a"])({},Object(l["b"])(["menuData"])),methods:{createMenuEP:function(){var t=this;this.menuData.forEach((function(e){e.children?(t.menuListEP.push(e),e.children.forEach((function(e){t.menuListEP.push(e)}))):t.menuListEP.push(e)}))},clickTab:function(t){this.indexTab=t,this.$router.push(t.router+"?id="+t.id)},checkUrl:function(){if("/home/dashboard/"==this.$route.path){var t=this.menuData[0];this.$router.push(t.router+"?id="+t.id)}}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.checkUrl(),t.loadingOk=!0;case 2:case"end":return e.stop()}}),e)})))()},mounted:function(){}},w=C,g=(s("9dc9"),Object(f["a"])(w,a,i,!1,null,"a7b93d98",null));e["default"]=g.exports},"798e":function(t,e,s){},"919e":function(t,e,s){},"9dc9":function(t,e,s){"use strict";var a=s("919e"),i=s.n(a);i.a},a434:function(t,e,s){"use strict";var a=s("23e7"),i=s("23cb"),n=s("a691"),o=s("50c4"),r=s("7b0b"),l=s("65f0"),c=s("8418"),u=s("1dde"),h=s("ae40"),d=u("splice"),m=h("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,f=Math.min,v=9007199254740991,p="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d||!m},{splice:function(t,e){var s,a,u,h,d,m,C=r(this),w=o(C.length),g=i(t,w),T=arguments.length;if(0===T?s=a=0:1===T?(s=0,a=w-g):(s=T-2,a=f(b(n(e),0),w-g)),w+s-a>v)throw TypeError(p);for(u=l(C,a),h=0;h<a;h++)d=g+h,d in C&&c(u,h,C[d]);if(u.length=a,s<a){for(h=g;h<w-a;h++)d=h+a,m=h+s,d in C?C[m]=C[d]:delete C[m];for(h=w;h>w-a+s;h--)delete C[h-1]}else if(s>a)for(h=w-a;h>g;h--)d=h+a-1,m=h+s-1,d in C?C[m]=C[d]:delete C[m];for(h=0;h<s;h++)C[h+g]=arguments[h+2];return C.length=w-a+s,u}})},ab83:function(t,e,s){"use strict";var a=s("798e"),i=s.n(a);i.a}}]);