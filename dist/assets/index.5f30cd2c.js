import{d as O,r as S,c as w,a as I,o as L,b as k,e as j,f as l,g as N,E as v,h as D,i as B,N as p,j as C,k as $}from"./vendor.8b29c9a1.js";const M=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};M();var V=(e,t)=>{const o=e.__vccOpts||e;for(const[n,s]of t)o[n]=s;return o};const q=O({name:"App",setup(){return{isCollapse:S(!1),route:{path:"/about"},handleOpen:(s,r)=>{console.log(s,r)},handleClose:(s,r)=>{console.log(s,r)}}}});function K(e,t,o,n,s,r){const i=I("router-view");return L(),w(i)}var U=V(q,[["render",K]]);const J="modulepreload",R={},W="/",u=function(t,o){return!o||o.length===0?t():Promise.all(o.map(n=>{if(n=`${W}${n}`,n in R)return;R[n]=!0;const s=n.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const i=document.createElement("link");if(i.rel=s?"stylesheet":J,s||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),s)return new Promise((c,x)=>{i.addEventListener("load",c),i.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())};let _=[{component:"layout/index",redirect:{name:"dashboard"},meta:{title:"\u4EEA\u8868\u76D8",icon:"el-icon-data-analysis"},children:[{name:"dashboard",component:"dashboard/index",meta:{title:"\u4EEA\u8868\u76D8",icon:"el-icon-data-analysis"}}]},{name:"goods",component:"layout/index",meta:{title:"\u83DC\u54C1\u7BA1\u7406",icon:"el-icon-data-analysis"},children:[{component:"goods/list",meta:{title:"\u83DC\u54C1\u5217\u8868"}},{component:"goods/add",meta:{title:"\u65B0\u589E\u83DC\u54C1"}},{component:"goods/set",meta:{title:"\u65B0\u589E\u83DC\u54C11"}}]},{name:"image",component:"layout/index",meta:{title:"\u4E91\u76F8\u518C",icon:"el-icon-picture"},children:[{meta:{title:"\u4E91\u76F8\u518C",icon:"el-icon-picture"},component:"image/index"}]},{meta:{title:"\u7BA1\u7406\u5458",icon:"el-icon-data-analysis"},component:"admin/index"},{component:"login/index",meta:{hidden:!0}},{path:"/:pathMatch(.*)*",redirect:{name:"dashboard"},meta:{title:"404",hidden:!0}}];function F(){return P(_),console.log(_),_}const H={"/src/views/admin/index.vue":()=>u(()=>import("./index.f49a8e65.js"),["assets/index.f49a8e65.js","assets/vendor.8b29c9a1.js"]),"/src/views/dashboard/index.vue":()=>u(()=>import("./index.f2397aa6.js"),["assets/index.f2397aa6.js","assets/vendor.8b29c9a1.js"]),"/src/views/goods/add.vue":()=>u(()=>import("./add.17400f18.js"),["assets/add.17400f18.js","assets/add.2907d2ba.css","assets/vendor.8b29c9a1.js","assets/Plus.0eef3cbb.js"]),"/src/views/goods/list.vue":()=>u(()=>import("./list.2ba62559.js"),["assets/list.2ba62559.js","assets/vendor.8b29c9a1.js"]),"/src/views/goods/set.vue":()=>u(()=>import("./set.8a80da86.js"),["assets/set.8a80da86.js","assets/set.ba7442f7.css","assets/vendor.8b29c9a1.js","assets/Plus.0eef3cbb.js"]),"/src/views/image/index.vue":()=>u(()=>import("./index.1766ea70.js"),["assets/index.1766ea70.js","assets/index.1d42364b.css","assets/vendor.8b29c9a1.js"]),"/src/views/layout/index.vue":()=>u(()=>import("./index.a3ad8a54.js"),["assets/index.a3ad8a54.js","assets/index.d5e58783.css","assets/vendor.8b29c9a1.js"]),"/src/views/login/index.vue":()=>u(()=>import("./index.03a042da.js"),["assets/index.03a042da.js","assets/index.fd0fa590.css","assets/vendor.8b29c9a1.js"])};function P(e){for(let t=0;t<e.length;t++){if(!e[t].component)return;let o=X(e[t].component);e[t].name=e[t].name||o.replace(/\//g,"_"),e[t].path=e[t].path||`/${o}`,e[t].component=H[`/src/views/${e[t].component}.vue`],e[t].children&&e[t].children.length>0&&P(e[t].children)}}function X(e){let t=e.lastIndexOf("/");return e.substring(t+1,e.length)==="index"?e.substring(t,-1):e}var Y=F();const d=Y,g=[],a=k({history:j(),routes:d}),A="Admin-Token";function b(){return l.get(A)}function z(e){return l.set(A,e)}const h=N.create({baseURL:"http://127.0.0.1:7001",timeout:5e3});h.interceptors.request.use(e=>(m.getters.token&&(e.headers["X-Token"]=b()),e),e=>(console.log(e),Promise.reject(e)));h.interceptors.response.use(e=>{const t=e.data;return t.code!==0?(v({message:t.message||"Error",type:"error",duration:5*1e3}),(t.code===50008||t.code===50012||t.code===50014)&&D.confirm("You have been logged out, you can cancel to stay on this page, or log in again","Confirm logout",{confirmButtonText:"Re-Login",cancelButtonText:"Cancel",type:"warning"}).then(()=>{m.dispatch("user/resetToken").then(()=>{location.reload()})}),Promise.reject(new Error(t.message||"Error"))):t},e=>(v({message:e.message,type:"error",duration:5*1e3}),Promise.reject(e)));function G(e){return h({url:"/signin",method:"post",data:e})}const Q={token:b(),name:"",avatar:"",introduction:"",roles:[]},Z={getName(e){return e.name}},ee={setName(e,t){e.name=t},SET_TOKEN(e,t){e.token=t}},te={loginByUsername({commit:e},t){const{username:o,password:n}=t;return new Promise((s,r)=>{G({username:o.trim(),password:n}).then(i=>{const{token:c}=i;e("SET_TOKEN",c),z(c),s()}).catch(i=>{r(i)})})}};var oe={namespaced:!0,state:Q,getters:Z,mutations:ee,actions:te};const se={namespaced:!0,state:{sidebar:{opened:l.get("sidebarStatus")?!!l.get("sidebarStatus"):!0,withoutAnimation:!1},device:"desktop"},mutations:{toggle_sidebar:e=>{e.sidebar.opened=!e.sidebar.opened,e.sidebar.withoutAnimation=!1,e.sidebar.opened?l.set("sidebarStatus",1):l.set("sidebarStatus",0)},close_sidebar:(e,t)=>{l.set("sidebarStatus",0),e.sidebar.opened=!1,e.sidebar.withoutAnimation=t},toggle_device:(e,t)=>{e.device=t}},actions:{toggleSideBar({commit:e}){e("toggle_sidebar")},closeSideBar({commit:e},{widthoutAnimation:t}){e("close_sidebar",t)},toggleDevice({commit:e},t){e("toggle_device",t)}},getters:{getSidebarState(e){return e.sidebar.opened},getSidebarAnimation(e){return e.sidebar.withoutAnimation},getDeviceState(e){return e.device}}},E={queryAuthedPermission:"/api/auth/permission/routes",queryPermissions:"/api/auth/permission/permissions"};class y{static postAuthPermission(t){return h({url:E.queryAuthedPermission,method:"POST",json:!0,data:t}).then(o=>o.status===0?Promise.resolve(o):Promise.reject(o))}static postPermissions(t){return h({url:E.queryPermissions,method:"POST",json:!0,data:t}).then(o=>o.status===0?Promise.resolve(o):Promise.reject(o))}}const ne=localStorage.getItem("role")||"",re={namespaced:!0,state:{roles:ne,permissions:[],accessRoutes:d,routes:d,authedRoutes:[]},mutations:{setRoles:(e,{roleName:t})=>{e.roles=t,console.log(e.roles)},setAccessRoutes:(e,t)=>{e.accessRoutes=d.concat(t)},setRoutes:(e,t)=>{e.routes=d.concat(t)},setAuthedRoutes:(e,t=[])=>{e.authedRoutes=t,localStorage.setItem("authedRoutes",JSON.stringify(t))},setPermissions:(e,t=[])=>{e.permissions=t}},actions:{getPermissonRoutes({commit:e},t){const o={roleName:t.roleName};y.postAuthPermission(o).then(n=>{const{authedRoutes:s}=n.data;e("setAuthedRoutes",s);const r=[];for(const i of s)for(const c of g)c.path===i&&r.push(c);a.isReady().then(()=>{r.forEach(i=>{const c=i.name;a.hasRoute(c)||a.addRoute(i)}),a.options.routes=d.concat(g),console.log(a),e("setAccessRoutes",r)})})},getPermissions({commit:e}){y.postPermissions({}).then(t=>{const{permissions:o}=t.data;e("setPermissions",o)})},getRoutes({commit:e}){if(localStorage.getItem("authedRoutes")){const t=JSON.parse(localStorage.getItem("authedRoutes")),o=[];for(const n of t)for(const s of g)s.path===n&&o.push(s);o.forEach(n=>{const s=n.name;a.hasRoute(s)||a.addRoute(n)})}e("setRoutes",g)},getPermissonRoles({commit:e},t){localStorage.setItem("role",t.roleName),e("setRoles",t)}},getters:{getAccessRoutes(e){return e.routes},authedRoutes(e){return e.authedRoutes},getRoles(e){return e.roles},getPermission(e){return e.permissions}}},ie={namespaced:!0,state:{tabsOption:[{route:"/dashboard",title:"\u4EEA\u8868\u76D8",name:"dashboard"}],currentIndex:"dashboard",breadcrumbList:[]},mutations:{ADD_TAB:(e,t)=>{e.tabsOption.push(t)},DELETE_TAB:(e,t)=>{const o=e.tabsOption.findIndex(n=>n.route===t);e.tabsOption.splice(o,1)},SET_TAB:(e,t)=>{e.currentIndex=t}},actions:{},getters:{getCurrentIndex(e){return e.currentIndex},getTabsOption(e){return e.tabsOption}}},ae=B({modules:{user:oe,appModule:se,permissionModule:re,tabModule:ie}});var m=ae;p.configure({showSpinner:!1});const ce=["/login","/auth-redirect"];a.beforeEach(async(e,t,o)=>{!(m.getters["tabModule/getTabsOption"].findIndex(i=>i.route===e.path)>-1)&&!e.meta.hidden&&m.commit("tabModule/ADD_TAB",{route:e.path,title:e.meta.title,name:e.name}),m.commit("tabModule/SET_TAB",e.path),p.start(),b()?e.path==="/login"?(o("/"),p.done()):o():ce.indexOf(e.path)!==-1?(console.log("whiteList"),o()):(o(`/login?redirect=${e.path}`),p.done())});a.afterEach(()=>{p.done()});const T=C(U);var f=window.location.href;f=f.split(window.location.host)[1];console.log("url",f);a.push(f);T.use(a).use(m).use($);a.isReady().then(()=>T.mount("#app"));export{V as _};
