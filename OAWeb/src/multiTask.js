import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import iView from 'iview'
import "@/com/modules/task/task.less";
// import 'iview/dist/styles/iview.css' // 使用 CSS
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
// import store from './com/store'
import { Button,Uploader,Step, Steps,Dialog,List } from 'vant';
import {tree} from 'vue-beauty'
import addressBookDownItem from "@/com/command/addressBook/addressBookDownItem";
import avatarImg from "@/com/command/avatar/avatarImg";
import avatarColor from "@/com/command/avatar/avatarColor";
import avatarColorTitle from "@/com/command/avatar/avatarColorTitle";
import avatarList from "@/com/command/avatar/avatarList";
import avatarLead from "@/com/command/avatar/avatarLead";
import avatarEnforcer from "@/com/command/avatar/avatarEnforcer";
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)
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
Vue.use(LoadingPlugin)
Vue.use(VueCordova)
Vue.use(tree)

Vue.use(Button).use(Uploader).use(Step).use(Steps).use(Dialog).use(List);
Vue.use(DatetimePlugin)
Vue.use(VueRouter)
Vue.use(iView)

import multitasking from './com/modules/task/multitasking.vue'
// import multitasking from './multitasking'


const router = new VueRouter({
  routes
})
new Vue({
  router,
  // el: '#multitask',
  render: h => h(multitasking)
}).$mount('#multitask')
