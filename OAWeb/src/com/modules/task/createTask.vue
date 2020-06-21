/*
 * @Author: hai.L
 * @Date: 2019-04-22 11:10:22
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-05-15 16:29:08
 */

<template>
  <div class="container"id="createTaskBox">
    <div class="tp25"id="tp25">
      <group>
        <x-input title="任务名称" ref="titleTask" required v-model="title" is-type="''"placeholder="请填写任务名称"></x-input>
        <!--</group>-->
        <!--<group>-->
        <x-input title="任务描述"></x-input>
        <x-textarea v-model="description" class="descriptionTask" ref="descriptionTask" required placeholder="请填写任务的详细说明...":max="200"></x-textarea>
        <!--<UploaderList-->
        <!--:max="10"-->
        <!--:uploadUrl="serviceUrl+ 'app/project/saveFile'"-->
        <!--:params="params"-->
        <!--:name="'file'"-->
        <!--&gt;</UploaderList>-->
        <!--</group>-->
        <!--<group>-->
        <cell title="任务类型"class="taskTypeBox">
          <popup-picker :confirm-text="confirmText":title="title1" :data="taskTypeList" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="":columns="1" show-name :inline-desc="typeValueText"></popup-picker>
        </cell>
        <cell title="相关人员" class="memberBox" @click.native="jumpFormStakeholders">
          <div v-show="isPeople" class="fr title_h18 mrr">{{peoples?peoples.length:0}}人</div>
          <avatarList
            style="width:180px;"
            v-show="isPeople"
            :width="27"
            :height="27"
            :avatars="peoples"
          />
        </cell>
        <cell title="围观人员"  class="memberCircleBox" :class="{memberdisplay}" @click.native="jumpFormOnlookers">
          <div v-show="isLead" class="fr title_h18 mrr">{{leads?leads.length:0}}人</div>
          <avatarLead style="width:180px;" v-show="isLead" :width="27" :height="27" :leads="leads"/>
        </cell>
        <!--</group>-->
        <!--<group>-->
        <!--<img src="@/assets/calender.png" alt=""class="dateImgStart">-->
        <cell title="开始时间"class="noArrow">
          <datetime v-model="value2" :format="format" @on-change="changeStartDate" title=""></datetime>
        </cell>
        <!--<img src="@/assets/calender.png" alt=""class="dateImgEnd">-->
        <cell title="结束时间"class="noArrow">
          <datetime v-model="value3" :format="format" @on-change="changeEndDate" title=""></datetime>
        </cell>
        <cell :title="title2"class="taskWarnTypeBox">
          <popup-picker :confirm-text="confirmText" :data="list2" v-model="warnValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange1" placeholder=""class="taskWarnPop":columns="1" :inline-desc="warnValueText"show-name></popup-picker>
        </cell>
      </group>
      <div class="btnBox" @click="toTaskSend">
        <x-button mini >完成</x-button>
      </div>

      <div v-transfer-dom>
        <popup v-model="isAlert" position="top" :show-mask="false">
          <div class="position-vertical-demo">{{errorMsg}}</div>
        </popup>
      </div>
    </div>
  </div>

</template>
<script>
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
//      params: { userId: JSON.parse(storejs.get("loginUserInfo")).userId },
      startDate: ["2019-05-15", "03", "05"],
      endDate: ["2019-06-15", "03", "05"],
      taskTypeList: [["一般","机密","绝密"]],
      selectId: 0,
      toLink: "/addressList/selectRelated",
      toLeadLink: "/addressList/selectRelated",
      isPeople: false,
      peoples: [],
      leads: [],
      confirmText:'确认',
      isLead: false,
      taskWarn: [],
      warnKey: 0,
      isDisabled: true,
      isAlert: false,
      errorMsg: '',
      format: 'YYYY-MM-DD HH:mm',
      title1: '',
      title2: '任务提醒',
      title3: '联动显示值',
      title4: '联动显示文字',
      list2: [['日提醒', '周提醒', '半月提醒', '月提醒', '季提醒', '半年提醒', '年提醒']],//任务提醒周期
//      list2:[],
      value1: [],
      value2: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+(new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate())+" "+(new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()),
      value3: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+(new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate())+" "+(new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours())+":"+(new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()),
      warnValue:[],
      warnValueText:'',
      typeValueText:'',
      taskPassVal:'0',//任务类型传递value
      warnPassVal:'0',//任务提醒传递value
      memberdisplay:true,
      userId:'',
    };
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
  methods: {
    itemIndex(id) {
      this.selectId = id;
    },
    warnChange(key) {
      this.warnKey = typeof key == "number" ? key : this.warnKey;
    },
    onChange (val) {
      this.taskPassVal=val[0];
      console.log('任务类型', this.taskPassVal);
      this.selectId=this.taskPassVal;
      this.typeValueText='';
      if(this.taskPassVal==2){
        console.log(document.getElementsByClassName("memberCircleBox"));
        this.memberdisplay=false;
      }else{
        this.memberdisplay=true;
        this.leads=[];
      }
    },
    onChange1 (val) {
      this.warnPassVal=val[0];
      console.log('任务提醒', this.warnPassVal)
      this.warnValue=val;
      this.warnKey=this.warnPassVal;
      this.warnValueText='';
    },
    onShow () {
      console.log('on show')
    },
    onHide (type) {
      console.log('on hide', type)
    },
    changeStartDate (value) {
      if(new Date(this.value3.replace(/\-/g, "/"))<new Date(this.value2.replace(/\-/g, "/"))){
        this.isAlert = true;
        this.errorMsg = "开始时间不能大于结束时间";
        return;
      }
    },
    changeEndDate(value){
      if(new Date(this.value3.replace(/\-/g, "/"))<new Date(this.value2.replace(/\-/g, "/"))){
        this.isAlert = true;
        this.errorMsg = "开始时间不能大于结束时间";
        return;
      }
    },
    jumpFormStakeholders(){//相关人员跳转
      storejs.set("jumpFrom","0");
      this.$router.push({path:"/addressList/selectRelated"});
    },
    jumpFormOnlookers(){//围观人员
      storejs.set("jumpFrom","1");
      this.$router.push({path:"/addressList/selectRelated"});
    },
    toTaskSend() {
      if(this.title == ''){
        this.isAlert = true;
        this.errorMsg = "请输入任务名称";
        return;
      }
      if(this.description == ''||this.description ==undefined){
        this.isAlert = true;
        this.errorMsg = "请输入任务描述";
        return;
      }
      if(!this.peoples || this.peoples.length == 0){
        this.isAlert = true;
        this.errorMsg = "选择相关人员";
        return;
      }
      if(new Date(this.value3.replace(/\-/g, "/"))<new Date(this.value2.replace(/\-/g, "/"))){
        this.isAlert = true;
        this.errorMsg = "开始时间不能大于结束时间";
        return;
      }
      let taskName = this.title;
      let description = this.description;
      let type = this.selectId;
//      let createDate = new Date(this.value2);
//      let planFinishTime = new Date(this.value3);
      let createDate = this.value2+':00';
      let planFinishTime = this.value3+':00';
//      let createBy = this.params.userId;
//      let updateBy = this.params.userId;
      let createBy = this.userId;
      let updateBy = this.userId;
      let remindCycle = this.warnKey;
      let implementUserList=this.peoples;
      console.log(createDate);
      console.log(planFinishTime);
      util
        .post("taskInfo/saveTaskInfo", {
          taskName,
          type,
          remindCycle,
          description,
          createDate,
          planFinishTime,
          implementUserList: JSON.stringify(this.peoples),
          assistUserList: JSON.stringify(this.leads),//围观人员list
          createBy,
          updateBy,
        })
        .then(response => {
          //清除缓存
          //暂存任务
          storejs.remove("crconsoleeateTask");
          //选择人员
          storejs.remove("task_selectPeople");
          //选择围观人员
          storejs.remove("onlook_selectPeople");
          this.$router.replace({path:"/"});
//          console.log(response);
        });
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

  },
  destroyed() {
    let taskName = this.title;
    let description = this.description;
    let type = this.selectId;
    let createDate = this.startDate;
    let planFinishTime = this.endData;
    let createBy = this.createBy;
    let updateBy = this.updateBy;
    let remindCycle = this.warnKey;
    let data = {
      taskName: taskName,
      type: type,
      createDate: createDate,
      planFinishTime: planFinishTime,
      createBy: createBy,
      updateBy: updateBy,
      remindCycle: remindCycle,
      description:description,
      typeText:this.value1[0]
    };
    storejs.set("crconsoleeateTask", JSON.stringify(data));
  },
  created() {
    let _this=this;
    const userList = JSON.parse(storejs.get("loginUserInfo"));
    _this.userId = userList.userId;
//    _this.userId ='7190';
    //获得任务类型
    util.get("dict/list/task_type").then(response => {

//      var typeArr=[];
//      for(var key in response.data.result){
//        typeArr.push(response.data.result[key].name);
//      }
//      typeArr=typeArr.reverse();
//      this.taskTypeList = [typeArr];
      this.taskTypeList = response.data.result.reverse();
      if(this.value1[0]){
        this.typeValueText='';
      }else{
        this.typeValueText=this.taskTypeList[0].name;
      }
      console.log(this.taskTypeList);
    });
    //获得任务提醒
    util.get("dict/list/remindCycle").then(response => {
      _this.taskWarn = response.data.result;
//      console.log("_this.taskWarn :",_this.taskWarn);
//      let tastWarnList=[];
//      this.list2=[];
//      for (var i = 0; i < _this.taskWarn.length; i++) {
//        tastWarnList.push(_this.taskWarn[i].name)
////        this.list2.push({ key: _this.taskWarn[i].value, value: _this.taskWarn[i].name });
//      }
//      this.list2.push(tastWarnList);
//      console.log(_this.taskWarn[0].name);
//      this.warnValue = [_this.taskWarn[0].name];
//      this.warnKey = [_this.taskWarn[0].value];
        this.list2=_this.taskWarn.reverse();
        this.warnValueText=this.list2[0].name;
        console.log(this.warnValue);
    });
    //缓存数据 创建任务原始数据
//    if(storejs.get("crconsoleeateTask")!=undefined){
//      let data = JSON.parse(storejs.get("crconsoleeateTask"));
//    }
    let data = JSON.parse(storejs.get("crconsoleeateTask"));
    console.log("crconsoleeateTask",data);
    if (data) {
      this.title = data.taskName;
      this.description = data.description;
      this.selectId = data.type;
      this.startDate = data.createDate;
      this.endData = data.planFinishTime;
      this.createBy = data.createBy;
      this.updateBy = data.updateBy;
      this.warnKey = data.remindCycle;
      this.value1=[data.typeText];
      if(data.typeText==2){
          this.memberdisplay=false;
      }
    }
    //选择人员数据
    if(storejs.get("task_selectPeople")!=undefined){
      this.peoples = JSON.parse(storejs.get("task_selectPeople"));
    }
    console.log(this.peoples);
    if (this.peoples) {
      //激活负责人
      this.isDisabled = false;
      //跳转变更负责人
      this.toLink = "/addressList/selectAddressList";
      if (this.peoples) {
        this.isPeople = true;
      } else {
        this.isPeople = false;
      }
    }
    //选择领导数据
    if(storejs.get("onlook_selectPeople")!=undefined){
      this.leads = JSON.parse(storejs.get("onlook_selectPeople"));
    }
    if (storejs.get("onlook_selectPeople")) {
      for (var i = 0; i < this.leads.length; i++) {
        if (this.leads[i].isManager == 1) {
          this.leads.push(this.leads[i]);
        }
        if (this.leads) {
          this.isLead = true;
        } else {
          this.isLead = false;
        }
      }
    }
  }
};
</script>

<style lang="less">
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
  padding:15.5px 15px!important;
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
.weui-cell_access .weui-cell__ft:after{
  margin-top:-5px !important;
}
.noArrow .weui-cell{
  padding-right: 0px!important;
  text-align: right;
}
.taskTypeBox .weui-cell{
  padding-top:0px !important;
  padding-bottom: 0px!important;
}
.noArrow{
  padding:1.5px 15px !important;
}
  /*时间img*/
.dateImgStart{
  width: 18px;
  position: absolute;
  bottom:103px;
  right:142px;
}
  .dateImgEnd{
    width: 18px;
    position: absolute;
    bottom:58px;
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
    margin-top:66px;
  }
.weui-cells:after{
  border-bottom: 0px !important;
}

.btnBox .weui-btn_default{
  width:94% !important;
  height:48px;
  background:#16A6FF !important;
  color: #fff!important;
  /*border-radius:20px !important;*/
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
.descriptionTask .weui-textarea{
  height:110px;
}
.descriptionTask.weui-cell:before{
  border-top:0px !important;
}
  .memberdisplay{
    display: none !important;
  }
.tp25 .weui-cells:before{
  border-top:0px !important;
}
label{
  font-size:16px !important;
}
</style>




