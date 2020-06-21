/*
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:30:52
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-26 09:19:49
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './com/store'
import 'mescroll.js/mescroll.min.css'
import 'vant/lib/index.css';
//import css
import 'vue-beauty/package/style/vue-beauty.min.css'
import { Button,Uploader,Step, Steps,Dialog,List,Search, PullRefresh,Swipe, SwipeItem} from 'vant';
import {tree,button} from 'vue-beauty'
Vue.use(tree).use(button)
import AMap from 'vue-amap'




import { DatetimePlugin } from 'vux'
Vue.use(Button).use(Uploader).use(Step).use(Steps).use(Dialog).use(List).use(Search).use(PullRefresh).use(Swipe).use(SwipeItem); //vant
Vue.use(DatetimePlugin)
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(MuseUI)
Vue.use(AMap)

AMap.initAMapApiLoader({
  key: 'cac44785c9d47d0ce2fd9c6989ec1809',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geolocation']
});

const router = new VueRouter({
  routes
})

//验证登录
// router.beforeEach((to, from, next) => {
//   if (to.meta.access === 1) {
//     if (localStorage.getItem('login') != 1) {
//       next({
//         name: 'login'
//       });
//     } else if (localStorage.getItem('login') == 1 && to.name === 'login') {
//       next({
//         name: 'index'
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

FastClick.attach(document.body)

Vue.config.productionTip = false

//请求头全局设置
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.emulateJSON = true;

// add cordova.js only if serving the app through file://
console.log(window.location.protocol)
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  mounted() {
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist');
  },
  render: h => h(App)
}).$mount('#app-box')
