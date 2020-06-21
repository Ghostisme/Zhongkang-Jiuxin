/*
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:30:52
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-09-26 09:29:31
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
import 'ant-design-vue/dist/antd.css';
import { Tabs } from 'ant-design-vue';
import { Layout } from 'ant-design-vue';
import { Menu } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import { Form } from 'ant-design-vue';
import { Select,Tooltip,Radio,Table,Popconfirm,Icon,Checkbox} from 'ant-design-vue';
// import 'vue-element-extends/lib/index.css'
// import { Editable, EditableColumn } from 'vue-element-extends';
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Form);
Vue.use(Select);
Vue.use(Tooltip);
Vue.use(Radio);

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(MuseUI);
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Icon);
Vue.use(Checkbox);
import { Tree } from 'ant-design-vue'
import { Breadcrumb } from 'ant-design-vue'

Vue.use(Layout);
Vue.use(Tree);
Vue.use(Breadcrumb);
Vue.use(Menu);
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
