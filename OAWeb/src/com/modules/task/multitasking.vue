/*
* @Author: hai.L
* @Date: 2019-03-01 13:53:11
* @Last Modified by: hai.L
* @Last Modified time: 2019-05-07 18:11:28
*/
<style lang="less">
  @import "./task.less";
</style>
<template>
  <div id="multitaskHeader" style="height:100vh;overflow: hidden !important;">
    <!--<x-header-->
      <!--:left-options="setLeft"-->

      <!--style="background-color:#fff;position:fixed;z-index:199;left:0px;top:0px;width:100%;"-->
      <!--v-show="showHeader"-->
      <!--@on-click-more="showMenu"-->
    <!--&gt;-->
      <!--<component :is="leftMenu" slot="left" @click.native="goLeftNow"></component>-->
      <!--{{systemName}}-->
      <!--&lt;!&ndash;<component slot="right" :is="rightMenu" @click.native="goNow"></component>&ndash;&gt;-->
    <!--</x-header>-->
    <div id="sendTaskList"  :class="{nohasContent:nohasContent}">
      <!--内容为空-->
      <div :class="{nohasContentText: nohasContent, nohasContentTextNone: nohasContentTextNone}">
        内容空空如也
      </div>
      <!-- 任务列表 taskState=0为待接收 2为待确认-->
      <div class="TaskList"v-for="(item, index) in taskList" :key="index" @click="jumpDetail(item.id,'0',item.taskState,item.taskId)">
        <div class="header_box bgcolor_white pt20 pl20 pm10 itemBoxShadow">
          <!--<div class="header_avatar">-->
          <!---->
          <!--</div>-->
          <div class="card-padding">
            <div class="Id"style="display:none;">{{item.id}}</div>
            <div class="titleFont14 fontBold">{{item.taskInfo.taskName}}</div>

            <div class="statusTop titleGray aptl">
              <!--<span v-if="item.state=='待接收'" class='stateBtn' style='background-color: #ff5a70;'>待接收</span>-->
              <span v-if="item.taskState=='0'" class='stateBtn' style='background-color: #FF7510;'>待接收</span>
              <!--<span v-if="item.state=='待确认'" class='stateBtn' style='background-color: #09c063;'>待确认</span>-->
              <span v-if="item.taskState=='2'" class='stateBtn' style='background-color: #22AC38;'>待确认</span>
            </div>
            <div class="titleBlue titleFont13 margin8">{{item.createName}}</div>
            <!--<div class="titleFont12 titleGray titleRadius titleBorder taskLevel">-->
            <!--<img src="@/assets/state-icon.png"class="titleImgs">-->
            <!--<span></span><span class="DateParse">{{item.lastCommentDate==null?"发布于："+item.createDate:"回复于："+item.lastCommentDate}}</span>-->
            <!--</div>-->
            <div class="titleFont12 titleGray margin8">
              <img src="@/assets/card-icon-mail.png"class="titleImgs">
              <span>发布人：</span><span>{{item.taskInfo.createName}}</span>
            </div>
            <div class="titleFont12 titleGray margin8">
              <img src="@/assets/card-icon-time.png"class="titleImgs">
              <span>截止时间：</span><span>{{item.taskInfo.createDate}}至{{item.taskInfo.planFinishTime}}</span>
            </div>
            <!--<div class="BtnBottom titleGray aptl">-->
              <!--<span v-if="item.isCollect==0"><img src="@/assets/store.png" alt="" @click.stop="sendChangeStore(item.id,item.isCollect)" style="width: 18px;height:17px;margin-right: 20px;"></span>-->
              <!--<span v-else><img src="@/assets/chosedStore.png" alt="" @click.stop="sendChangeStore(item.id,item.isCollect)" style="width: 18px;height:17px;margin-right: 20px;"></span>-->
              <!--<span v-if="item.isTop==0"><img src="@/assets/toTop.png" alt="" @click.stop="sendToTop(item.id,item.isTop)" style="width: 18px;height:17px;"></span>-->
              <!--<span v-else><img src="@/assets/chosedToTop.png" alt="" @click.stop="sendToTop(item.id,item.isTop)" style="width: 18px;height:17px;"></span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import storejs from 'storejs'
  import util from '@/libs/util'
  const choseDate="2019-05-04";
  const list = () => []
  export default {
    name: 'multitasking',
    data(){
      return{
        list2:list(),
        index:0,
        demo2:"已打卡",
        demo3:0,
        demoTab:0,
        results: [],
        value: '',
        showHeader:true,
        setLeft: { showBack: true },
        setRight: {
          menu:
            '<a class="title_h18" v-show="isNotice">通知<badge class="sup" text="1"></badge></a><a class="title_h18" v-show="isMenu">菜单</a>',
          createtask: { template: '<a class="title_h18">发送</a>' },
          ok: { template: '<a class="title_h18">确定</a>' },
          notify: '<a class="title_h18">全部设为已读</a>',
          add: { template: '<a class="title_h18">添加</a>' }
        },
        leftMenu: "",
        setLeftMenu: {
          menu:
            '<a class="title_h18" v-show="isNotice">通知<badge class="sup" text="1"></badge></a><a class="title_h18" v-show="isMenu">菜单</a>',
          createtask: {
            template:
              '<div><div class="left-arrow"></div><a class="vux-header-back title_h18">新建任务</a></div>'
          },
          close: {
            template: '<a slot="left" class="title_h18">关闭</a></div>'
          },
          cancel: {
            template: '<a class="title_h18">取消</a></div>'
          },
          notify: '<a class="title_h18">全部设为已读</a>'
        },
        rightMenu: "",
        setRightMenu: { showMore: true },
        systemName: "任务",

        backgroundImg1:{//没有内容的背景图片
          backgroundImage:"url("+require("@/assets/noHasContent.png")+")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          marginTop: "50px",
          height:"205px"
        },
        taskList:[],
        recievetaskList:[],
        nohasContent:false,
        nohasContentTextNone:true,
        norecievehasContent:false,
        norecievehasContentTextNone:true,
        noContentTxt:'内容空空如也',
        noRecieveWlan:false,//没有网络
        timeOutEvent:0,
        showMenus:false,
        userId:'',
      }
    },
    inject: ['reload'],
    methods:{
      //开始按
      gtouchstart(item){
        var self = this;
        this.timeOutEvent = setTimeout(function(){
          self.longPress(item)
        },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        return false;
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gtouchend(item,taskId,jumpFrom){
        clearTimeout(this.timeOutEvent);//清除定时器
        if(this.timeOutEvent!=0){
          //这里写要执行的内容（尤如onclick事件）
          this.goChat(item,taskId,jumpFrom);
        }
        return false;
      },
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gtouchmove(){
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;

      },
      //真正长按后应该执行的内容
      longPress(id){
        this.timeOutEvent = 0;
        //执行长按要执行的内容，如弹出菜单
        console.log("执行的内容");

      },
      goChat(id,taskId,jumpFrom){
        console.log("点击");

      },
      updataHeight(e){
        let topHeight=document.getElementById('sendTaskList')[0].offsetTop;
//        var diffheight=window.screen.height-topHeight-100;
        var diffheight=window.screen.height-topHeight
        this.$nextTick(function(){
          this.$refs.cateSwiper.xheight=diffheight+'px'
        })
      },
      jumpDetail(id,jumpFrom,state,taskId){//跳转任务详情页面
        if(state==0){
          storejs.set("params",JSON.stringify({taskId: taskId,jumpFrom:jumpFrom}));
          this.$router.push({ path: '/taskDetails'})//待接收
        }else if(state==2){
          storejs.set("multiTaskingParams",JSON.stringify({id: id,jumpFrom:jumpFrom}) );
          this.$router.push({ path: '/toBeDetermined'})//待确认
        }

      },
      passTabItem(index){
//        alert(index);
      },
      consoleIndex () {
        console.log('click demo01', this.demo3)
      },
//      搜索
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
//        this.results = val ? getResult(this.value) : []
        console.log(document.getElementsByClassName("vux-tab-ink-bar-transition-forward").length);//为0是我发布的，为1是我接收的
        if(document.getElementsByClassName("vux-tab-ink-bar-transition-forward").length==0){
          this.recieveTast();
        }else{
          this.sendTask();
        }
      },
//      我发布的收藏
      sendChangeStore(id,isCollect){

        util.getList("taskInfo/fromMeSetCollect",{
          id:id,
          isCollect:isCollect
        }).then(response => {

          this.sendTask();

        });
      },
//      我接收的收藏
      reciveChangeStore(id,isCollect){

        util.getList("taskInfo/setCollect",{
          id:id,
          userId:this.userId,
          isCollect:isCollect
        }).then(response => {
          this.recieveTast();

        });
      },
//      我发布的置顶
      sendToTop(id,isTop){

        util.getList("taskInfo/fromMeSetTop",{
          id:id,
          isTop:isTop
        }).then(response => {

          this.sendTask();

        });
      },
//      我收藏的置顶
      reciveToTop(id,isTop){

        util.getList("taskInfo/setTop",{
          id:id,
          userId:this.userId,
          isTop:isTop
        }).then(response => {
          this.recieveTast();

        });
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
        this.showMenus=false
      },
      onCancel () {
        console.log('on cancel')
      },
//      创建任务
      btCreateTask() {
        console.log("lll");
        this.$router.push({path:"/createTask"});
      },
      //换算反馈倒计时
      checkDate: function (startTime, endTime) {
        //转成毫秒数，两个日期相减
        var days = endTime - startTime.getTime();
        //转换成天数(1000 * 60 * 60 * 24));
        var day = (days / 86400000).toFixed();
        //do something
        // console.log("day = ", days);
        return days < 0 ? 0 : day;
      },
      recieveTast(){
        let taskName = this.value;//搜索框条件
        util.getList("taskInfo/getToMeList",{//我接收的
          'userId':this.userId,
          'taskName':taskName
        }).then(response => {//我发布的任务
          console.log(response.data.result);
          this.recievetaskList = response.data.result;
          if(this.recievetaskList.length>0){
            this.norecievehasContent=false;
            this.norecievehasContentTextNone=true;
            this.noRecieveWlan=false;
          }else{
            this.norecievehasContent=true;
            this.norecievehasContentTextNone=false;
          }
          for(let k in this.recievetaskList){
            this.recievetaskList[k].lastCommentDate=util.formatDate(new Date(this.recievetaskList[k].lastCommentDate.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm:ss");
            this.recievetaskList[k].createDate=util.formatDate(new Date(this.recievetaskList[k].createDate.replace(/\-/g, "/")),"yyyy-MM-dd");//创建时间
            this.recievetaskList[k].planFinishTime=util.formatDate(new Date(this.recievetaskList[k].planFinishTime.replace(/\-/g, "/")),"yyyy-MM-dd");//结束时间
            this.recievetaskList[k].lastReportDate=this.checkDate(new Date(), new Date(this.recievetaskList[k].lastReportDate.replace(/\-/g, "/")));//反馈时间
          }
        })
          .catch(error => {
            //Message.error('删除信息失败！');
            return error;
          });
      },
      sendTask(){
        let taskName = this.value;//搜索框条件
        util.getList("taskUser/getMyTaskList",{//我发布的
          'userId':this.userId,
//          'taskName':taskName
        }).then(response => {//我发布的任务
          console.log(response.data.result);
          this.taskList = response.data.result;
          if(this.taskList.length>0){
            this.nohasContent=false;
            this.nohasContentTextNone=true;
          }else{
            this.nohasContent=true;
            this.nohasContentTextNone=false;
          }
          for(let k in this.taskList){
            this.taskList[k].lastCommentDate=util.formatDate(new Date(this.taskList[k].taskInfo.lastCommentDate.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm:ss");
            this.taskList[k].createDate=util.formatDate(new Date(this.taskList[k].taskInfo.createDate.replace(/\-/g, "/")),"yyyy-MM-dd");//创建时间
            this.taskList[k].planFinishTime=util.formatDate(new Date(this.taskList[k].taskInfo.planFinishTime.replace(/\-/g, "/")),"yyyy-MM-dd");//结束时间
            this.taskList[k].lastReportDate=this.checkDate(new Date(), this.taskList[k].taskInfo.lastReportDate.replace(/\-/g, "/"));//反馈时间
          }
        });
      },
      showMenu(){
        this.showMenus=!this.showMenus
      },
//      右側菜單設置
      goNow() {
        if (this.$route.meta.right == "createtask") {
          this.$refs.myVueChild.toTaskSend;
        } else if (this.$route.meta.right == "ok") {
          this.$refs.myVueChild.choseLeadBtnOK;
        }
      },
      initMenu() {
        this.isNotice = false;
        this.isMenu = false;
        this.menuTabbars = [];
        this.leftMenu = "";
        this.rightMenu = "";

        //根据路由传值确定标题
        //优先级路由标题>页面设置标题

        if (
          this.$route.params.pageTitleText != undefined &&
          this.$route.params.pageTitleText != ""
        ) {
          this.systemName = this.$route.params.pageTitleText;
        } else {
          //标题文字
          this.systemName = this.$route.meta.title;
        }
        //导航菜单自定义
        let menuCode = this.$route.meta.menu;
        let name = this.$route.name;
        //左侧返回显示
        let left = this.$route.meta.left;
        this.setLeft.showBack =true;
        this.setLeft.backText= '';
        //右侧自定义菜单
        if (this.$route.meta.right == "setIndexRightMenu") {
          this.setRightMenu.showMore = true;
          this.rightMenu = this.setRight[this.$route.meta.right];
        } else if (this.$route.meta.right == "createtask") {
          this.rightMenu = this.setRight[this.$route.meta.right];
          this.setRightMenu.showMore = true;
        } else if (this.$route.meta.right == "ok") {
          this.rightMenu = this.setRight[this.$route.meta.right];
          this.setRightMenu.showMore = true;
        } else if (this.$route.meta.right == "add") {
          this.rightMenu = this.setRight[this.$route.meta.right];
          this.setRightMenu.showMore = true;
        } else {
          this.setRightMenu.showMore = true;
        }

        //左侧菜单自定义
        if (this.$route.meta.leftMenu == "createtask") {
          this.leftMenu = this.setLeftMenu[this.$route.meta.leftMenu];
        } else if (
          this.$route.params.closePage &&
          this.$route.meta.leftMenu == "close"
        ) {
          this.leftMenu = this.setLeftMenu[this.$route.meta.leftMenu];
        } else if (
          this.$route.meta.letGoPage &&
          this.$route.meta.leftMenu == "cancel"
        ) {
          this.leftMenu = this.setLeftMenu[this.$route.meta.leftMenu];
        }
        //导航菜单自定义选择
        if (menuCode == "index") {
          this.menuTabbars = this.main;
        } else if (menuCode == "attendance") {
          for (var key in this.attendancemenu) {
            this.attendancemenu[key].selected = false;
            if (this.attendancemenu[key].name == name) {
              this.attendancemenu[key].selected = true;
            }
          }
          this.menuTabbars = this.attendancemenu;
        } else if (menuCode == "stastics") {
          this.menuTabbars = this.stasticsmenu;
        } else if (menuCode == "task") {
          this.isNotice = true;
          this.isMenu = true;
        } else {
          this.menuTabbars = [];
          return;
        }

        let powerList = JSON.parse(storejs.get("powerList"));
        for (const i of powerList) {
          if (i.code == "APP_XTBG") {
            this.menuList.home = 1;
          } else if (i.code == "APP_TXL") {
            this.menuList.task = 1;
          } else if (i.code == "APP_RLZY") {
            this.menuList.attendance = 1;
          } else if (i.code == "APP_RWGL") {
            this.menuList.info = 1;
          } else if (i.code == "APP_WD") {
            this.menuList.my = 1;
          }
        }

        //权限
        // this.$store.commit("updateMenulist", this);
        // let menuList = this.$store.state.app.menuList;
      },
      //跳转我收藏的
      jumpStoreList(){
        console.log("跳转我的收藏夹");
        this.$router.push({path:"/myStoreTask"});
      },
      jumpFinisedList(){
        console.log("跳转已完成的任务");
        this.$router.push({path:"/finishedTask"});
      },
      myreload(){
        let that=this;

        if (storejs.get("mymultasskingload") ==undefined) {

          storejs.set("mymultasskingload",1);
//          this.$vux.toast.text(storejs.get("myload"), 'middle');
          setTimeout(function(){
            that.reload();
          }, 0);
        }else{
          storejs.remove("mymultasskingload");
        }
      },
    },
    created(){
//      this.list2.push("我发布待完成的（"+2+"）")
//      this.list2.push("我接收待完成的（"+3+"）");
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.userId = userList.userId;
      this.myreload();
//      this.userId='7190';
      this.list2.push("我发布待完成的")
      this.list2.push("我接收待完成的");
      this.setLeft.showBack = true;
      this.setLeft.backText= '';
      this.sendTask();
//      this.recieveTast();
      this.initMenu();
    },
    mounted(){
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
    }
  };
  function getResult (val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>
<style lang="less">
  /*#multitaskHeader{*/
    /*padding-top:50px;*/
  /*}*/
  .BtnBottom{
    text-align: right;
  }
  .ruleText{
    color:#78777C;
  }
  .statusTop{
    position: absolute;
    right: 16px;
    top: 19px;
    color:#fff;
    border-radius:20px;
    padding: 0px 5px;
  }
  .statusTopOrange{
    background:#FF7500;
  }
  .statusTopGreen{
    background:#22AC38;
  }
  .statusTopRed{
    background:#FF4A4A;
  }
  .taskLevel{
    width:auto;
    display: inline-block;
    margin-top:8px;
  }
  //我发布的任务和我接收
  /deep/.vux-tab-wrap{
    margin-bottom:-1px !important;
    padding-top:52px !important;
    height:52px !important;
    background: #16A6FF !important;
  }
  .vux-tab{
    background-color: #16A6FF!important;
    height:37px!important;
  }
  #multitaskHeader .vux-tab-container{
    height: 52px !important;
    background-color: #16A6FF!important;
    position: inherit;
    /*top:2px;*/
  }
  .vux-tab .vux-tab-item{
    color: #fff!important;
    height: 52px !important;
  }
  #swiper1,#swiper2{
    padding:0px 10px;
    overflow: scroll;

  }
  #swiper1 .vux-button-group > a.vux-button-group-current{
    color:#2292FE!important;
    background:#DCE7FB!important;
    border:0px!important;
  }
  #swiper1 .vux-button-group > a{
    margin:10px;
    height:45px!important;
    line-height:45px!important;
  }
  #swiper1 .vux-button-group > a.vux-button-tab-item-middle:after,.vux-button-group > a.vux-button-tab-item-last:after{
    border:0px!important;
  }
  #swiper1 .vux-button-group > a.vux-button-tab-item-first,.vux-button-group > a.vux-button-tab-item-middle,.vux-button-group > a.vux-button-tab-item-last{
    border-radius:4px!important;
  }
  #swiper1 .vux-button-group > a.vux-button-tab-item-first:after{
    color: #fafafa!important;
    border:0px!important;
  }

  // 全部 缺卡
  #swiper2 .vux-button-group > a.vux-button-group-current{
    color:#2292FE!important;
    background:#DCE7FB!important;
    border:0px!important;
  }
  #swiper2 .vux-button-group > a{
    margin:10px;
    height:45px!important;
    line-height:45px!important;
  }
  #swiper2 .vux-button-group > a.vux-button-tab-item-middle:after,.vux-button-group > a.vux-button-tab-item-last:after{
    border:0px!important;
  }
  #swiper2 .vux-button-group > a.vux-button-tab-item-first,.vux-button-group > a.vux-button-tab-item-middle,.vux-button-group > a.vux-button-tab-item-last{
    border-radius:4px!important;
  }
  #swiper2 .vux-button-group > a.vux-button-tab-item-first:after{
    color: #fafafa!important;
    border:0px!important;
  }

  /* 增加任务图标 */
  #multitaskHeader .vux-x-icon {
    fill:#007EFF !important;
    position: fixed !important;
    bottom:0px !important;
    right:20px !important;
    width:60px !important;
    height:60px !important;
  }
  .addTaskBtnBox{
    position: fixed !important;
    width:45px !important;
    /*height:60px !important;*/
    bottom:65px !important;
    right:25px;

  }
  .addTaskBtnBox img{
    width:100%;
  }
  .cell-x-icon {
    display: block;
    fill: green;
  }
  #multitaskHeader .vux-tab-ink-bar.vux-tab-ink-bar-transition-backward,.vux-tab-ink-bar.vux-tab-ink-bar-transition-forward{
    width:12% !important;
    margin-left:19% !important;
  }
  /*搜索*/
  .weui-search-bar {
    &:before, &:after {
      display: none;
    }
  }
  .weui-search-bar__form{
    height: 35px !important;
    border-radius: 10px;
  }
  .weui-search-bar__label{
    top:5px !important;
  }
  .searchBox{
    height:91px;
    background: #16A6FF;
    margin-top:-8px;
  }
  .vux-slider{
    top:-30px;
  }
  /*任务列表*/
  .TaskList{
    background: #fff;
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom:5px;
    position: relative;
  }
  .header_avatar{
    padding:5px;
  }
  .titleImgs{
    width:14px;
    vertical-align: middle;
    margin-right:3px;
  }
  /*.vux-x-icon{*/
  /*fill: #00a4ff;*/
  /*}*/
  .weui-search-bar__box .weui-search-bar__input {
    /*height: 1.828571em !important;*/
  }
  #multitaskHeader .vux-header{
    background: #fff!important;
    color: #fff;
  }
  #multitaskHeader .vux-header .vux-header-left .left-arrow:before{
    border-color: #323232!important;
  }
  #multitaskHeader .vux-header .vux-header-title{
    color: #323232!important;
  }
  .weui-search-bar{
    top:5px;
  }
  .vux-tab-wrap{
    background: #16A6FF!important;
  }
  .vux-search-fixed{
    background: #16A6FF!important;
    top:90px!important;
  }
  .nohasContent,.nohasRecieveContent{
    background-image: url("~@/assets/noHasContent.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 50px;
    height:205px;
  }
  #multitaskHeader .nohasContentText,#multitaskHeader .norecievehasContentText{
    position: fixed;
    top: 300px !important;
    left: 40%;
    font-size: 16px;
    color: #999;
    display: block;
  }
  .nohasContentTextNone,.norecievehasContentTextNone{
    display: none;
  }
  #multitaskHeader .weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{
    display: none !important;
  }
  #multitaskHeader .weui-search-bar__box .weui-search-bar__input{
    height:2em;
  }
  #multitaskHeader .weui-search-bar__box .weui-icon-search, #multitaskHeader .weui-search-bar__box .weui-icon-clear{
    line-height:39px;
  }
  #multitaskHeader .vux-x-icon{
    bottom:65px;
  }
  .stateBtn{
    border-radius: 20px;
    font-size: 9px;
    color: white;
    /* width: 45px; */
    line-height: 12px;
    height: 17px;
    text-align: center;
    padding: 2px 10px;
    display: inline-block;
  }
  .overLay{
    position: absolute;
    top:40px;
    right:10px;
    z-index: 888;
    background: #4C4C4C;
    color: #fff;
    font-size: 14px;
    padding:10px 20px;
    border-radius: 5px;
  }
  .triangle {
    width: 0px;
    border: 7px solid transparent;
    border-bottom: 7px solid #4C4C4C;
    position: absolute;
    top: -12px;
    right: 6px;
  }
  .showMenus{
    display: none;
  }
  .borderStyle{
    height:40px;
    line-height:40px;
    border-bottom: 1px solid #545454;
  }
  .borderStyle img{
    width:14px;
    margin-right:6px;
    vertical-align: text-bottom;
    margin-bottom: 3px;
  }
  .vux-header .vux-header-right .vux-header-more:after{
    font-size: 12px !important;
    color: #323232;
  }
</style>

