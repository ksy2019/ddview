(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09c1915c"],{"4c1a":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home-container"},[a("div",{staticClass:"home-body"},[a("transition",{attrs:{"enter-active-class":"filpin","leave-active-class":"filpout"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.isCollpse,expression:"!isCollpse"}],staticClass:"showColl nos",on:{click:function(t){e.isCollpse=!e.isCollpse}}},[a("i",{staticClass:"el-icon-caret-right"})])]),a("div",{staticClass:"home-left-container",style:e.isCollpse?"margin-right:10px;width:190px;":"margin-right:0;width:0px;"},[a("div",{staticClass:"home-body-left scrollbar"},[a("el-menu",{staticClass:"br1 my-elmenu",attrs:{"unique-opened":"","default-active":e.tabsData.indexTab}},[e._l(e.menuData,(function(t){return["0"==t.iscontainer?a("el-menu-item",{key:t.router,attrs:{index:t.router},on:{click:function(a){return e.clickTab(t)}}},[a("div",{staticClass:"menu-item"},[a("i",{class:t.icon,staticStyle:{color:"#000000e6"}}),e._v(" "+e._s(t.label)+" ")])]):e._e(),"1"==t.iscontainer?a("el-submenu",{key:t.router,attrs:{index:t.router}},[a("div",{staticClass:"menu-item",attrs:{slot:"title"},slot:"title"},[a("i",{class:t.icon,staticStyle:{color:"#000000e6"}}),a("span",[e._v(e._s(t.label))])]),e._l(t.children,(function(t,n){return a("el-menu-item",{key:n,staticClass:"br1",attrs:{index:t.router},on:{click:function(a){return e.clickTab(t)}}},[a("div",{staticClass:"menu-item ",attrs:{slot:"title"},slot:"title"},[a("i",{class:t.icon,staticStyle:{color:"#000000e6"}}),a("span",[e._v(e._s(t.label))])])])}))],2):e._e()]}))],2),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isCollpse,expression:"isCollpse"}],staticClass:"sq-btn nos",on:{click:function(t){e.isCollpse=!e.isCollpse}}},[e._m(0)])],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:!e.loadingOk,expression:"!loadingOk"}],staticClass:"home-body-right"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showTabs,expression:"showTabs"}],staticClass:"sh-tabs-container"},[a("my-tab",{attrs:{tabsData:e.tabsData}})],1),e.loadingOk?a("div",{staticClass:"router-con",style:{height:e.showTabs?"calc(100% - 36px )":"100%"}},[a("keep-alive",[a("router-view",{key:e.$route.path.replace("/home/dashboard/","")})],1)],1):e._e()])],1)])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-caret-left"}),e._v(" 收起")])}],r=(a("4de4"),a("4160"),a("a434"),a("d3b7"),a("ac1f"),a("25f0"),a("466d"),a("5319"),a("159b"),a("5530")),o=(a("96cf"),a("1da1")),i=a("b85c"),l=a("cebe"),c=a.n(l),u=a("2f62"),h=a("f52e"),d=a("e762"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"my-tab-container"},[a("transition",{attrs:{name:"el-zoom-in-center"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.scrollIcon,expression:"scrollIcon"}],staticClass:"scroll-btn scroll-btn-left",on:{click:function(t){return e.scrollTo("left")}}},[a("i",{staticClass:"el-icon-arrow-left"})])]),a("div",{staticClass:"noscrollbar",attrs:{id:"scroll-con"}},[a("transition-group",{attrs:{"leave-to-class":"router-leaver","enter-active-class":"router-enter"}},e._l(e.tabsData.list,(function(t){return a("div",{key:t.router,ref:t.router,refInFor:!0,staticClass:"sh-tabs-item",class:t.router==e.tabsData.indexTab?"index-tab":"",on:{click:function(a){return e.clickTab(t)}}},[a("span",[a("i",{class:t.icon}),e._v(" "+e._s(t.label))]),a("span",{directives:[{name:"show",rawName:"v-show",value:"home"!=t.router,expression:"item.router!='home'"}],staticClass:"el-icon-circle-close tab-close",on:{click:function(a){return a.stopPropagation(),e.closeTab(t)}}})])})),0)],1),a("transition",{attrs:{name:"el-zoom-in-center"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.scrollIcon,expression:"scrollIcon"}],staticClass:"scroll-btn scroll-btn-right",on:{click:function(t){return e.scrollTo("right")}}},[a("i",{staticClass:"el-icon-arrow-right"})])])],1)},p=[],m={props:["tabsData"],data:function(){return{scrollIcon:!1}},methods:{closeTab:function(e){var t=this;this.tabsData.list=this.tabsData.list.filter((function(t){return t.router!=e.router})),this.tabsData.list[this.tabsData.list.length-1].router!==this.$route.path.replace("/","")&&this.$router.push(this.tabsData.list[this.tabsData.list.length-1].router),this.$nextTick((function(){t.eventTabContainer()}))},scrollTo:function(e){"left"==e?(this.$emit("leftEvent"),this.$nextTick((function(){document.getElementById("scroll-con").scrollTo({left:document.getElementById("scroll-con").scrollLeft-500,behavior:"smooth"})}))):(this.$emit("rightEvent"),this.$nextTick((function(){document.getElementById("scroll-con").scrollTo({left:document.getElementById("scroll-con").scrollLeft+500,behavior:"smooth"})})))},clickTab:function(e){this.$route.path.replace("/home/dashboard/home","")!=e.router&&this.$router.push(e.router)},eventTabContainer:function(){var e=this;setTimeout((function(){var t=0;if(0!=document.getElementsByClassName("sh-tabs-container").length){var a,n=document.getElementsByClassName("sh-tabs-container")[0].clientWidth,s=Object(i["a"])(document.getElementsByClassName("sh-tabs-item"));try{for(s.s();!(a=s.n()).done;){var r=a.value;if(t+=r.clientWidth+5,t>n)return void(e.scrollIcon=!0)}}catch(o){s.e(o)}finally{s.f()}e.scrollIcon=!1}else setTimeout((function(){e.eventTabContainer()}),200)}),220)}},mounted:function(){var e=this;this.$nextTick((function(){e.eventTabContainer()}))}},b=m,v=(a("ab83"),a("2877")),g=Object(v["a"])(b,f,p,!1,null,"cf8cc234",null),y=g.exports,w={data:function(){return{loadingRef:!1,showHelp:!1,menuData:[],editMenuData:[],showEditMenu:!1,DQZD:"",menuListEP:[],isCollpse:!0,loadingOk:!1,showTabs:!0,tabsData:{indexTab:"home",list:[{label:"首页",router:"home",icon:"el-icon-house"}]},defaultUserInfo:{hideScreenDialog:!1}}},components:{myTab:y},watch:{isCollpse:function(){localStorage.setItem("wdsk-isCollpseGS",this.isCollpse)},tabsData:{handler:function(){localStorage.setItem("wdsk-mytabs",JSON.stringify(this.tabsData))},deep:!0},$route:{handler:function(e){var t=this;if(this.showTabs)if(0===this.tabsData.list.filter((function(t){if(t.router==e.path.replace("/home/dashboard/",""))return t})).length){var a,n=Object(i["a"])(this.menuListEP);try{for(n.s();!(a=n.n()).done;){var s=a.value;if(s.rou22ter===this.$route.path.replace("/home/dashboard/",""))return this.tabsData.indexTab=e.path.replace("/home/dashboard/",""),this.tabsData.list.push(s),this.eventTabContainer(),void this.$nextTick((function(){t.$refs[t.tabsData.indexTab][0].scrollIntoView({behavior:"smooth"})}))}}catch(r){n.e(r)}finally{n.f()}}else this.tabsData.indexTab=e.path.replace("/home/dashboard/",""),this.$nextTick((function(){try{t.$refs[t.tabsData.indexTab][0].scrollIntoView({behavior:"smooth"})}catch(r){console.log("调整位置失败...")}}))},deep:!0},menuData:{handler:function(){this.menuListEP=[],this.createMenuEP()},deep:!0}},sortUrl:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.post("https://51dzfp.cn/WD/COMMON/SortURL","URL="+encodeURIComponent(e));case 2:return a=t.sent,t.abrupt("return",a);case 4:case"end":return t.stop()}}),t)})))()},computed:Object(r["a"])({},Object(u["b"])(["zdList","indexZD","config","UserInfo","TYPE","allConfig","allMenu"])),methods:{nodeDrop:function(e,t,a){return 0==t.childNodes.length&&"1"==t.level&&"inner"==a||"inner"!==a&&(e.level==t.level&&a)},changeClick:function(e,t){1==e.level&&t.children.forEach((function(e){e["show"]=t.show}))},getMenuConfig:function(){var e=this;h["a"].local("LX=GETCONFIGTGKP").then((function(t){"1"==t.Result&&(e.$store.commit("config",JSON.parse(d["a"].decode(t.Data.replace(/ /g,"+")))),e.setMenu())}))},setMenu:function(){var e=this;this.config.navMenu.forEach((function(t){var a=0;if("createParentNode"==t.mode){var n,s=Object(i["a"])(e.menuData);try{for(s.s();!(n=s.n()).done;){var r=n.value;if(r.router==t.appendNode){"append"==t.appendType?e.menuData.splice(a,0,JSON.parse(JSON.stringify(t.body))):"preappend"==t.appendType&&e.menuData.splice(a+1,0,JSON.parse(JSON.stringify(t.body)));break}a++}}catch(p){s.e(p)}finally{s.f()}}else{var o,l=Object(i["a"])(e.menuData);try{for(l.s();!(o=l.n()).done;){var c=o.value;if(c.router==t.parent)if(""==t.appendNode)c.children.push(t.body);else{var u,h=0,d=Object(i["a"])(c.children);try{for(d.s();!(u=d.n()).done;){var f=u.value;if(f.router===t.appendNode){"append"==t.appendType?c.children.splice(h,0,JSON.parse(JSON.stringify(t.body))):"preappend"==t.appendType&&c.children.splice(h+1,0,JSON.parse(JSON.stringify(t.body)));break}h++}}catch(p){d.e(p)}finally{d.f()}}}}catch(p){l.e(p)}finally{l.f()}}}))},createMenuEP:function(){var e=this;this.menuData.forEach((function(t){t.children?(e.menuListEP.push(t),t.children.forEach((function(t){e.menuListEP.push(t)}))):e.menuListEP.push(t)}))},clickTab:function(e){this.indexTab=e,this.$router.push(e.router+"?id="+e.id)},routerMapper:function(e){var t,a=Object(i["a"])(e);try{for(a.s();!(t=a.n()).done;){var n=t.value;n.id=n.ID,n.label=n.CATPTION,n.router=n.ROUTER,n.icon=n.ICON,n.iscontainer=n.ISCONTAINER,n.children=n.CHILD,n.parentid=n.SJID,n.CHILD&&0!=n.CHILD.length&&this.routerMapper(n.CHILD)}}catch(s){a.e(s)}finally{a.f()}},initRoutes:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,s,r,o,l,u,h,d,f;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.post(e.$config.urlh+"/NEWKP/DEV/GetMenu");case 2:n=t.sent,"1"==n.Result?(e.routerMapper(n.Rows),e.menuData=n.Rows):e.$alert("获取路由信息失败"+n.Message),s=Object(i["a"])(e.menuData);try{for(s.s();!(r=s.n()).done;)if(o=r.value,"1"==o.ISCONTAINER){l=Object(i["a"])(o.children);try{for(l.s();!(u=l.n()).done;)h=u.value,d={path:"/home/dashboard/"+h.router,name:h.router,meta:{},component:function(){return a.e("chunk-2d21d876").then(a.bind(null,"d24f"))}},e.$router.addRoute("dashboard",d)}catch(p){l.e(p)}finally{l.f()}}else f={path:"/home/dashboard/"+o.router,name:o.router,meta:{},component:function(){return a.e("chunk-2d21d876").then(a.bind(null,"d24f"))}},e.$router.addRoute("dashboard",f)}catch(p){s.e(p)}finally{s.f()}case 6:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.initRoutes(),null!==localStorage.getItem("wdsk-mytabs")&&(e.tabsData=JSON.parse(localStorage.getItem("wdsk-mytabs")),e.tabsData.indexTab=e.$route.path.replace("/home/dashboard/",""));case 2:case"end":return t.stop()}}),t)})))()},mounted:function(){var e,t=this;console.log("dashborder载入成功"),this.loadingOk=!0;try{e=JSON.parse(localStorage.getItem("wdsk-UserInfo"))}catch(a){localStorage.setItem("wdsk-UserInfo",JSON.stringify(this.defaultUserInfo)),e=this.defaultUserInfo}e||localStorage.setItem("wdsk-UserInfo",JSON.stringify(this.defaultUserInfo)),this.$store.commit("UserInfo",null===e?this.defaultUserInfo:e),this.$nextTick((function(){""==location.href.match(/#\/.*/).toString().substr(2)&&t.$router.push("index")}))}},C=w,T=(a("c763"),Object(v["a"])(C,n,s,!1,null,"d4c5b264",null));t["default"]=T.exports},"798e":function(e,t,a){},ab83:function(e,t,a){"use strict";var n=a("798e"),s=a.n(n);s.a},c763:function(e,t,a){"use strict";var n=a("d131"),s=a.n(n);s.a},d131:function(e,t,a){}}]);