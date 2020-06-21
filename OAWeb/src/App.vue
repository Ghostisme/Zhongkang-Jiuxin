/*
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:30:59
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-25 16:37:05
 */
<template>
  <div id="app">
        <router-view v-wechat-title="$route.meta.title" v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
  import addressBookItem from "@/com/command/addressBook/addressBookItem";
  import enforcerTitle from "@/com/command/enforcer/enforcerTitle";
  import addressBookDownItem from "@/com/command/addressBook/addressBookDownItem";
  import avatarImg from "@/com/command/avatar/avatarImg";
  import avatarColor from "@/com/command/avatar/avatarColor";
  import avatarColorTitle from "@/com/command/avatar/avatarColorTitle";
  import avatarList from "@/com/command/avatar/avatarList";
  import avatarLead from "@/com/command/avatar/avatarLead";
  import avatarEnforcer from "@/com/command/avatar/avatarEnforcer";
  import VueWechatTitle from 'vue-wechat-title';
  import storejs from 'storejs';
  Vue.use(VueWechatTitle)
import Vue from 'vue'
import { Flexbox, FlexboxItem } from 'vux'
import { XButton } from 'vux'
import { PopupPicker } from 'vux'
import { Search } from 'vux'
import { Selector } from 'vux'
import { XHeader } from 'vux'
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { CellBox } from 'vux'
import { Panel } from 'vux'
import { Tabbar, TabbarItem } from 'vux'
import { Grid, GridItem } from 'vux'
import { XInput } from 'vux'
import { Group } from 'vux'
import { PopupRadio } from 'vux'
import { Datetime } from 'vux'
import { XAddress } from 'vux'
import { XTextarea } from 'vux'
import { Cell } from 'vux'
import { XTable } from 'vux'
import { LoadMore } from 'vux'
import { XDialog } from 'vux'
import { XSwitch } from 'vux'
import { Checker, CheckerItem } from 'vux'
import { CheckIcon ,Checklist} from 'vux'
import { Tab, TabItem } from 'vux'
import { ViewBox } from 'vux'
import { AlertPlugin } from 'vux'
import { Divider } from 'vux'
import { Previewer } from 'vux'
import { Scroller } from 'vux'
import { Multiselect } from 'vue-multiselect'
import { DatetimePlugin } from 'vux'
import { Toast } from 'vux'
import { ButtonTab, ButtonTabItem } from 'vux'
import  { LoadingPlugin } from 'vux'
import { DatetimeRange } from 'vux'
import { Popup } from 'vux'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { TransferDom } from 'vux'
import { Blur } from 'vux'
import { Box} from 'vux'
import { Icon} from 'vux'
import { Confirm} from 'vux'
//cordova
import VueCordova from 'vue-cordova'
import { Swiper, SwiperItem,XCircle } from 'vux'
Vue.component('addressBookDownItem', addressBookDownItem)
Vue.component("avatarImg", avatarImg)
Vue.component("Confirm", Confirm)
Vue.component("avatarColor", avatarColor)
Vue.component("avatarColorTitle", avatarColorTitle)
Vue.component("avatarList", avatarList)
Vue.component("avatarLead", avatarLead)
Vue.component("avatarEnforcer", avatarEnforcer)
Vue.component("Box", Box)
Vue.component("Icon", Icon)
Vue.component('MescrollVue', MescrollVue)
Vue.component('toast', Toast)
Vue.component('MescrollVue', MescrollVue)
Vue.component('toast', Toast)
  // register globally
Vue.component('multiselect', Multiselect)
Vue.component('scroller', Scroller)
Vue.component('previewer', Previewer)
Vue.component('divider', Divider)
Vue.component('view-box', ViewBox)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('check-icon', CheckIcon)
Vue.component('checklist', Checklist)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('x-switch', XSwitch)
Vue.component('x-dialog', XDialog)
Vue.component('loadMore', LoadMore)
Vue.component('x-table', XTable)
Vue.component('cell', Cell)
Vue.component('x-textarea', XTextarea)
Vue.component('x-address', XAddress)
Vue.component('datetime', Datetime)
Vue.component('popup-radio', PopupRadio)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('panel', Panel)
Vue.component('cell-box', CellBox)
Vue.component('swipeout', Swipeout)
Vue.component('swipeout-item', SwipeoutItem)
Vue.component('swipeout-button', SwipeoutButton)
Vue.component('Swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
Vue.component('x-header', XHeader)
Vue.component('selector', Selector)
Vue.component('flexbox', Flexbox)
Vue.component('search', Search)
Vue.component('x-button', XButton)
Vue.component('button-tab', ButtonTab)
Vue.component('button-tab-item', ButtonTabItem)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('popup-picker', PopupPicker)
Vue.component('datetime-range', DatetimeRange)
Vue.component('popup', Popup)
Vue.component('blur', Blur)
Vue.directive('transfer-dom', TransferDom)
Vue.use(AlertPlugin)
Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(VueCordova)

export default {
  name: 'app',
  data(){
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    getUserId(id, token){//传userId和token

      let obj = {}
      obj.userId = id;
      obj.token = token;
      storejs.set("loginUserInfo", JSON.stringify(obj));
//      this.$vux.toast.text(storejs.get("loginUserInfo"), 'middle');
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    saveOrDoneTask(formType){//任务收藏和历史任务跳转传值
      if(formType==0){//收藏
        this.$router.push({path:"/myStoreTask"});
      }else{
        this.$router.push({path:"/finishedTask"});
      }
    },
  },
  created(){
    window.getUserId = this.getUserId;
    window['getUserId'] = (id,token) => {
      this.getUserId(id,token);
    }

    window.saveOrDoneTask = this.saveOrDoneTask;
    window['saveOrDoneTask'] = (formType) => {
      this.saveOrDoneTask(formType);
    }
  },
//  mounted() {
//    window.getUserId = this.getUserId;
//    window['getUserId'] = (id,token) => {
//      this.getUserId(id,token);
//    }
//  }
}

// window.addEventListener("resize", function () {
//   if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
//     window.setTimeout(function () {
//       document.activeElement.scrollIntoViewIfNeeded();
//     },0);
//   }
// })
// var originalHeight=document.documentElement.clientHeight || document.body.clientHeight;
// //console.info("原始窗口的高度"+originalHeight);
// window.onresize=function(){
//    //软键盘弹起与隐藏  都会引起窗口的高度发生变化
//     var resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
//     //console.info("软键盘弹起后窗口的高度"+resizeHeight);
//     if(resizeHeight<originalHeight){
//           //证明窗口被挤压了

//      }
// }
//console.log(document.getElementsByTagName("body"))
//document.getElementsByTagName("body").height=667;

</script>

