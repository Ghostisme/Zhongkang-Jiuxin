/*
* @Author: hai.L
* @Date: 2019-04-22 11:10:22
* @Last Modified by: hai.L
* @Last Modified time: 2019-05-15 16:29:08
*/

<template>
  <div class="container"id="createTaskBox">
    <div class="tp25">
      <group>
        <x-input title="任务名称" disabled ref="titleTask"  v-model="title" is-type="''"placeholder="任务名称"></x-input>
        <x-input title="姓名" ref="titleTask" disabled v-model="userName" is-type="''"placeholder="姓名"></x-input>
        <x-input title="" ref="" disabled  is-type="''"style="padding:0px;height: 0px;"></x-input>
      </group>
      <div class="lastCell">
        <span style="margin-left: 15px;">属于我的任务已完成，请确认！</span>
        <span style="float: right;margin-right: 15px;" @click="jumpDetail">查看详情>></span>
      </div>
      <div class="btnBox">
        <x-button mini  @click.native="taskStatePush(0)">同意</x-button>
        <x-button mini class="quitBtn" @click.native="showpj">驳回</x-button>
      </div>
    </div>
    <!--遮罩层-->
    <div class='popContainer' :class="{noTaskUserDisplay:!noTaskUser}">
      <div class="popContainerText">
        {{noTaskAndStateWarn}}
      </div>
    </div>

    <div  v-transfer-dom>
      <confirm v-model="show5"
               :close-on-confirm="false"
               ref="confirm5"
               title="评价"
               @on-cancel="onCancel"
               @on-confirm="onConfirm5"
               @on-show="onShow5"
               @on-hide="onHide">
        <p>
          <group>
            <x-textarea  :max="200" placeholder="请输入评价" :show-counter="false" :height="100" :rows="5" :cols="30" v-model="assess"></x-textarea>
          </group>
        </p>
      </confirm>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import storejs from 'storejs'
  import UploaderItem from "@/com/command/upload/uploader-item.vue";
  import UploaderList from "@/com/command/upload/uploader2.vue";
  import util from "@/libs/util";

  export default {
    components: {
      UploaderList,
      UploaderItem
    },
    data() {
      return {
        title: "",
        description: "",
        format: 'YYYY-MM-DD HH:mm',
//        params: { userId: storejs.get("userId") },
        startDate: ["2019-05-15", "03", "05"],
        endDate: ["2019-06-15", "03", "05"],
        taskTypeList: [["一般","机密","绝密"]],
        selectId: 0,
        errorMsg:'',
        isDisabled: true,
        isAlert: false,
        userName:'',
        typeName:'',
        createDate:'',
        planFinishTime:'',
        stateName:'',
        description:'',
        leaderCode:0,//领导身份下控制退出
        recieverTaskState:0,//接收任务者当前状态
        implementUserCount:'',//任务接收人
        assistUserCount:'',//任务围观人
        remindUserCount:'',//消息提醒
        remindCycle:[],//提醒周期
        jumpFormList:'',//从我发布的还是我接收的跳转过来的
        taskState:false,//我发布的任务的状态
        title2:'任务提醒周期',
        confirmText:'确认',
        warnValueText:'',
        list2: [['日提醒', '周提醒', '半月提醒', '月提醒', '季提醒', '半年提醒', '年提醒']],//任务提醒周期
        warnPassVal:'0',//任务提醒传递value
        warnKey:'0',
        show5: false,
        assess:'',
        starLen:0,//好评星指数
        remind1:'',
        noTaskUser:false,
        aniuState:'',
        noTaskAndStateWarn:'',
        userType:1,
        taskId:'',
        userId:'',
        detailTaskId:'',
      };
    },
    methods: {
      showpj(){
        this.show5 = true;
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      jumpDetail(){
//        let taskInfo=JSON.parse(storejs.get("params"));
//        let taskId=taskInfo.taskId;
        storejs.set("params",JSON.stringify({taskId: this.detailTaskId,jumpFrom:'multiTaskingParams'}));
        this.$router.push({ path: '/taskDetails'})//待接收
      },
      onShow5 () {
        this.$refs.confirm5.setInputValue('default')
      },
      onConfirm5 (value) {
        this.$refs.confirm5.setInputValue('')

        if(this.assess==''){
          this.$vux.toast.text('请输入本次任务评价')
        }else{
//          this.starLen;
          let stars=document.getElementsByClassName("vux-x-icon-ios-star");
          this.starLen=0;
          for(var k=0;k< stars.length;k++){
            if(!$(stars[k]).attr('hidden')){
              this.starLen++;
            }
          }
//          alert(this.starLen);
          let taskInfo=JSON.parse(storejs.get("params"));
          let taskId=taskInfo.taskId;
//          接收任务人员完成任务
          util.getList("taskUser/appealTaskState",{
            id:taskId,
            appealState:1,
            rejectReason:this.assess,
          }).then(response => {
            this.$router.push({path:"/multitasking"});
            this.$vux.loading.hide()
            this.show5 = false
          });
        }
      },
      taskStatePush(state){//同意
        let taskInfo=JSON.parse(storejs.get("multiTaskingParams"));
        let taskId=taskInfo.id;
        util.getList("taskUser/appealTaskState",{
          id:taskId,
          appealState:state,
          rejectReason:'',
        }).then(response => {
          this.$vux.loading.hide();
          this.$router.push({path:"/multitasking"});
        });
      },

      getUserInfo(){
        let that=this;
        util.getList('sys/user/get',{
          userId:this.userId
        }).then(function (res) {
          console.log("按钮状态返回数据：");
          console.log(res.data);
          that.leaderCode=res.data.resultMap.user.positionLevel
        });
      },

      jumpChosedDetail(jumpFrom){
        storejs.set("detailToChosed",jumpFrom);
        this.$router.push({path:"/taskRecive/detailChosed"});
      },
      jumpChosedWarnDetail(jumpFrom){
        storejs.set("detailToChosed",jumpFrom);
        this.$router.push({path:"/taskRecive/detailWarnChosed"});
      },

      choseStar:function($event){//选择主要负责人
//        console.log($event.currentTarget);
        if ($event.currentTarget.className == "clickFalse") {
          $event.currentTarget.className = "clickTrue";
          $event.currentTarget.firstElementChild.setAttribute("hidden", "hidden");
          $event.currentTarget.lastElementChild.removeAttribute("hidden");
          $($event.currentTarget).prevAll().find('.vux-x-icon-ios-star').removeAttr("hidden");
          $($event.currentTarget).prevAll().find('.vux-x-icon-ios-star-outline').attr("hidden", "hidden");
          $($event.currentTarget).prevAll().attr("class","clickTrue")
          $($event.currentTarget).nextAll().find('.vux-x-icon-ios-star-outline').removeAttr("hidden");
          $($event.currentTarget).nextAll().find('.vux-x-icon-ios-star').attr("hidden", "hidden");
          $($event.currentTarget).nextAll().attr("class","clickFalse")
        } else {
          $event.currentTarget.className = "clickFalse";
          $event.currentTarget.firstElementChild.removeAttribute("hidden");
          $event.currentTarget.lastElementChild.setAttribute("hidden", "hidden");
          $($event.currentTarget).nextAll().find('.vux-x-icon-ios-star-outline').removeAttr("hidden");
          $($event.currentTarget).nextAll().find('.vux-x-icon-ios-star').attr("hidden", "hidden");
          $($event.currentTarget).nextAll().attr("class","clickFalse")
        }
      },
      getTaskDetail(taskId){
        let that=this;
        util.getList("taskUser/getTaskUser",{
          id:taskId
        }).then( response=> {
          console.log(response.data);

          this.taskTypeList = response.data.taskInfo;
          this.title=this.taskTypeList.taskName;
          this.userName=response.data.taskUser.name;
          this.detailTaskId=response.data.taskUser.taskId;

        });
      },
    },
    watch: {
      isAlert (val) {
        if (val) {
          setTimeout(() => {
            this.isAlert = false
          }, 1000)
        }
      }
    },
    computed: {
      serviceUrl() {
        return util.ajax.defaults.baseURL;
      },
      addImageMethod() {
        // let file = "";
        // util.post("app/project/saveFile").then(response => {
        // });
      },
      toTaskSend() {
        console.log(this.isAlert)
        if(this.title == ''){
          this.isAlert = true;
          this.errorMsg = "请输入任务标题";
          return;
        }
        if(!this.peoples || this.peoples.length == 0){
          this.isAlert = true;
          this.errorMsg = "请选择执行人员";
          return;
        }
        let taskName = this.title;
        let description = this.description;
        let type = this.selectId;
        let createDate = this.startDate[0]+" "+this.startDate[1]+":"+this.startDate[2];
        let planFinishTim = this.endDate[0]+" "+this.endDate[1]+":"+this.endDate[2];
//        let createBy = this.params.userId;
//        let updateBy = this.params.userId;
        let createBy = this.userId;
        let updateBy = this.userId;
        let remindCycle = this.warnKey;

        util
          .post("taskInfo/saveTaskInfo", {
            taskName,
            type,
            description,
            createDate,
            planFinishTim,
            createBy,
            updateBy,
            remindCycle
          })
          .then(response => {
            //清除缓存
            //暂存任务
            storejs.remove("crconsoleeateTask");
            //选择人员
            storejs.remove("task_selectPeople");
          });
      }
    },
    mounted () {
      this.timer = setInterval(() => {
//        console.log(this.$vux.confirm.isVisible())
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    destroyed() {
      let taskName = this.title;
      let description = this.description;
      let type = this.selectId;
      let createDate = this.startDate;
      let planFinishTim = this.endData;
      let createBy = this.createBy;
      let updateBy = this.updateBy;
      let remindCycle = this.warnKey;
      let data = {
        taskName: taskName,
        type: type,
        createDate: createDate,
        planFinishTim: planFinishTim,
        createBy: createBy,
        updateBy: updateBy,
        remindCycle: remindCycle
      };
      storejs.set("crconsoleeateTask", JSON.stringify(data));
    },
    created() {
      let _this=this;
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.userId = userList.userId;
      let taskInfo=JSON.parse(storejs.get("multiTaskingParams"));
      let taskId=taskInfo.id;
      let taskJumpFrom=taskInfo.jumpFrom;
      this.taskId=taskInfo.id;
      this.jumpFormList=taskInfo.jumpFrom;
      console.log(taskInfo);
      //获得任务详情
      this.getTaskDetail(taskId);
      if(taskJumpFrom==1){
        this.getaniustate();
      }
      this.getUserInfo();//获取用户信息
      //获得任务提醒
//      util.get("dict/list/remindCycle").then(response => {
//        _this.taskWarn = response.data.result;
//        _this.list2=_this.taskWarn.reverse();
//        _this.warnValueText=_this.list2[0].name;
//        this.remindCycle=['日提醒']
//        console.log(_this.list2);
//      });
    }
  };
</script>

<style lang="less">
  /*遮罩层*/

  div.popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  #createTaskBox{
    padding-bottom: 10px;
  }
  .position-vertical-demo {
    background-color: red;
    color: #fff;
    text-align: center;
    padding: 15px;
  }
  .tp25,.weui-cells{
    font-size: 14px !important;
    font-family: "PingFang SC";
    margin-top:0px !important;
  }
  .weui-cell{
    padding:12px 15px!important;
  }
  .vux-label{
    color: #111;
    font-weight:400;
  }
  .weui-input{
    text-align: right;
  }
  .noArrow .weui-cell_access .weui-cell__ft:after{
    display: none;
  }
  .noArrow .weui-cell{
    padding-right: 0px!important;
    text-align: right;
  }
  .noArrow{
    padding:0px 15px !important;
  }
  /*时间img*/
  .dateImgStart{
    width: 18px;
    position: absolute;
    bottom:100px;
    right:142px;
  }
  .dateImgEnd{
    width: 18px;
    position: absolute;
    bottom:15px;
    right:142px;
  }
  .vux-cell-box{
    right:-10px !important;
  }
  .weui-textarea{
    height:133px;
  }
  .container{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    overflow-y:auto;
    background-color:#fff
  }
  .btnBox{
    text-align: center;
    margin-top:30px;
  }
  .weui-cells:after{
    border-bottom: 0px !important;
  }

  .btnBox .weui-btn_default{
    width:100% !important;
    height:40px;
    background:#16A6FF !important;
    color: #fff!important;
    /*border-radius:20px !important;*/
  }
  .btnBox .quitBtn.weui-btn_default{
    background:#F56C6C !important;
  }
  .weui-cell_access .weui-cell__ft{
    padding-right:0px !important;
  }
  .taskTypeBox .vux-cell-primary,.taskWarnTypeBox  .vux-cell-primary,.memberBox .vux-cell-primary,.memberCircleBox  .vux-cell-primary,.mrr{
    margin-right:15px !important;
  }
  .taskWarnTypeBox{
    padding-top:0px !important;
    padding-bottom:0px !important;
  }
  .vux-flexbox .vux-flexbox-item{
    min-width:100% !important;
  }
  .descriptionTask textarea:disabled{
    background: #fff;
  }
  .descriptionTask .weui-textarea{
    height:110px;
  }
  .descriptionTask.weui-cell:before{
    border-top:0px !important;
  }
  .overTask{
    display: none !important;
  }
  .finishTask,.finishedTask{
    display: none !important;
  }
  .taskTypeBox .vux-cell-primary,.taskWarnTypeBox  .vux-cell-primary,.memberBox .vux-cell-primary,.memberCircleBox  .vux-cell-primary,.mrr{
    margin-right:15px !important;
  }
  .taskWarnTypeBox{
    padding-top:0px !important;
    padding-bottom:0px !important;
  }
  #iosStar .vux-x-icon {
    fill: #666;
    position: relative !important;
    width: 30px;
    height: 30px;
    bottom: 0px !important;
  }
  .recieverFinishTask{
    display: none !important;
  }
  .noTaskUserDisplay{
    display: none;
  }
  .userTypeDisplay{
    display: none;
  }
  .popContainerText{
    color: #323232;
    width: 150px;
    height:50px;
    line-height: 50px;
    border-radius: 5px;
    margin:0 auto;
    margin-top: 80%;
    background: #fff;
    text-align: center;
  }
  .lastCell{
    height:43px;
    line-height:43px;
    border-bottom: 1px solid #eee;
  }
</style>
