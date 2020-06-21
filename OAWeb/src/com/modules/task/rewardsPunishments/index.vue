/*
* @Author: hai.L
* @Date: 2019-03-01 13:53:11
* @Last Modified by: hai.L
* @Last Modified time: 2019-05-15 16:28:51
*/

<template>
  <div ref="content" id="rewardsPunishments">
    <!--<div>-->
      <!--<search position="absolute"></search>-->
    <!--</div>-->
    <!-- <div class="addMember" style="text-align: right;padding:0px 10px;border-bottom:1px solid #eee;" @click="toAddStaff()" :class="{jumpControlNone:jumpFormList==1}">
      <x-icon type="ios-plus-empty" size="40" style="color: #b3b8bd"></x-icon>
    </div> -->
    <group v-for="(item, index) in memberList" :key="index" :title="item.name" :id="item.idCard">
      <cell-box :is-link="isLink" v-for="(itemList, indexs) in item.taskUserList" :key="indexs" :class="{cellIsDisabled:itemList.isDisabled}">
      	<check-icon :value.sync="itemList.checked"></check-icon>
        <x-icon type="ios-circle-filled" size="23" :class="{isDisabledIcon:!itemList.isDisabled}"></x-icon>
        <img
          v-if="itemList.pic"
          :src="itemList.pic?itemList.pic:require('@/assets/default.png')"
          alt
          width="50"
          height="50"
          style="border-radius: 50%;"
        >
        <avatarColorTitle v-if="!itemList.pic" :title="itemList.name" :width="38" :height="38"/>
        <span style="margin-left: 10px">{{itemList.name}}</span>
        <!--<span style="margin-left: 10px;position: absolute;right:60px;font-size:14px;" :class="{taskNone:taskNone}">{{itemList.taskStateName}}</span>-->
        <!--<span id="choseHeart" style="position: absolute;right:110px;bottom:15px;" :class="[itemList.isMain==1?'clickTrue':'clickFalse',{heartactive:itemList.isDisabled},{taskNone:taskNone}]" v-model="mainPeople" @click="choseHeart($event,itemList.id,itemList.isMain)">
          <x-icon type="ios-heart" size="20" id="iosheart"style="bottom: auto;"></x-icon>
          <x-icon type="ios-heart-outline" size="20" id="iosheartOutline"></x-icon>
        </span>-->
        <!--<span id="deletemember"style="position: absolute;right:10px;bottom:10px;" @click="deletemember($event,itemList.id)" :class="{jumpControlNone:jumpFormList==1}">
          <box gap="10px 10px">
            <icon type="clear"></icon>
          </box>
        </span>-->
      </cell-box>
    </group>
    <!-- <div class="button_box">
			<img :src="btnimg" @click="handleClick"/>
		</div> -->
    <div class="button_box">
			<div class="button_Box">
				<button type="button" class="btn" @click="handleClick">提交</button>
			</div>
		</div>
  </div>
</template>
<script>
  import storejs from 'storejs'
  import util from "@/libs/util";
  import pinyin from "@/libs/pyfist.js";
  import pinyinUtil from "@/libs/pinyin.js";
  import { CheckIcon } from 'vux';
//import CheckIcon from "../../../../../node_modules/vux/src/components/check-icon/index.vue";
  import { Icon } from 'vux'
  const choseDate = "2019-05-04";
  const list = () => [];
  const LettersList = () => [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  export default {
    components: {CheckIcon,Icon},
    data() {
      return {
        list2: list(),
        index: 0,
        demo2: "已打卡",
        demo3: 0,
        isLink: false,
        groupTitle: "W",
        fullHeight: document.documentElement.clientHeight,
        showLetter: false,
        showLetterList: true,
        jumpFormList:'',//从我发布的还是我接收的跳转过来的
        letter: "",
        Letters: LettersList(),
        panelShow: false,
        gradeId: "",
        classId: "",
        className: "",
        memberList: [],
        startDate: "",
        isSelect: false,
        implementUserList: [],
        peopleNum: 0,
        isAll: false,
        isAllShow: false,
        mainPeople:'0',//主要负责人默认不点亮
        isShow:-1,
        disabledValue:'',//排除要选择的数据
        canChoseValue:'',//可选择数据
        userType:'',
        taskNone:false,//任务状态
        btnimg: require("@/assets/Button-More.png")
      };
    },

    computed: {
      scrollHeight() {
        return Number(this.fullHeight) - 94 + "px";
      }
    },
    filters: {},
    methods: {
      hidePanel() {
        this.panelShow = false;
      },
      showPanel() {
        this.panelShow = true;
      },
      choseHeart:function($event,Student_ID,isMainPeople){//选择主要负责人
        console.log($event.currentTarget);
        if(this.jumpFormList==0){//为0 是从我发送的跳转过来 为1是从我接收的跳转过来的
          if ($event.currentTarget.className == "clickFalse") {
            $event.currentTarget.className = "clickTrue";

            for (var i = 0; i < this.memberList.length; i++) {
              let members = this.memberList[i].taskUserList;
              for(var k in members){
//              console.log(members[k].Student_ID)
                if(members[k].id==Student_ID){
                  members[k].isMain='1';
                }
              }
            }
            this.updateIsMain(Student_ID);
          } else {
            $event.currentTarget.className = "clickFalse";

            for (var i = 0; i < this.memberList.length; i++) {
              let members = this.memberList[i].taskUserList;
              for(var k in members){
//              console.log(members[k].Student_ID)
                if(members[k].id==Student_ID){
                  members[k].isMain='0';
                }
              }
            }
            this.updateIsMain(Student_ID);
          }
        }

      },
      updateIsMain(id){
        util.getList("taskUser/updateIsMain",{
          id: id
        }).then(response => {
          console.log(response);
          let taskInfo=JSON.parse(storejs.get("params"));
          let taskId=taskInfo.taskId;
          this.getUserList(taskId);
        })
      },
      toAddStaff(){
        storejs.set("jumpFrom","detail")
        this.$router.push({path:"/detailASList/detailSelectAddressList"});
      },
      selectAllItem() {
        this.isAll = this.isAll;
        this.peopleNum = 0;
        for (var i = 0; i < this.memberList.length; i++) {
          let members = this.memberList[i].data;
          for (var j = 0; j < members.length; j++) {
            if (this.isAll) {
              members[j].isSelect = true;
              //增加选择人数
              this.peopleNum++;
            } else {
              members[j].isSelect = false;
            }
          }
        }
      },
      getUserList(taskId){
      	let name = "";
        util.getList("taskUser/getTaskRemindUserList",{
          taskId: taskId,
          name
//        userType:this.userType
        }).then(response => {
//        var list = response.data.result;
          let list;
          list = response.data.result;
          // list = list[0].taskUserList;
          list.map( (item, index) => {
          	item.taskUserList = item.taskUserList.map( (item, index) => {
              console.log(item);
              item.checked = false;
              return item;
            });
            console.log(item.taskUserList);
          })
          // list = list.map( (item, index) => {
          //   item.checked = false;
          //   return item;
          // })
//        for(var k in list){
//          list[k].isMainPeople='0';
//          list[k].isDisabled=false;
//          list[k].choseHeart=false;
//        }
//        if(storejs.get("jumpFrom")=="0"){
//          if(storejs.get("onlook_selectPeople")){
//            this.disabledValue=JSON.parse(storejs.get("onlook_selectPeople"));//获取围观人员进行互斥选择
//          }
//          if(storejs.get("task_selectPeople")){
//            this.canChoseValue=JSON.parse(storejs.get("task_selectPeople"));//获取可选择执行人员
//          }
//        }else if(storejs.get("jumpFrom")=="1"){
//          if(storejs.get("task_selectPeople")){
//            this.disabledValue=JSON.parse(storejs.get("task_selectPeople"));//获取执行人员互斥选择
//          }
//          if(storejs.get("onlook_selectPeople")){
//            this.canChoseValue=JSON.parse(storejs.get("onlook_selectPeople"));//获取可选择围观人员
//          }
//        }
////        不可选人员添加置灰属性
//        for(var p in this.disabledValue){
//          console.log(this.disabledValue[p]);
//          for(var h in list){
//            if(list[h].userId==this.disabledValue[p].userId){
//              list[h].isDisabled=true;
//              list[h].canisSelect=false;
//              list[h].choseHeart=false;
//            }
//          }
//        }
//        console.log("canChoseValue",this.canChoseValue);
////        可选人员添加默认选上属性
//        for(var s in this.canChoseValue){
//          for(var g in list){
//            console.log(list);
//            if(list[g].userId==this.canChoseValue[s].userId){
//              list[g].canisSelect=true;
//              list[g].isMainPeople=this.canChoseValue[s].isMain;
//              if(list[g].isMainPeople=='0'){
//                list[g].choseHeart=false;
//              }else{
//                list[g].choseHeart=true;
//              }
//              this.peopleNum++;
//            }
//          }
//        }
          //返回的姓名数组按A-Z排序
//        this.memberList = this.pySort(list);
//          detailonlook_selectPeople  detailtask_selectPeople
          if(storejs.get("detailToChosed")){//2是执行人员 1围观人员 3提醒人员
            if(storejs.get("detailToChosed")==2){
              this.userType=2
              this.taskNone=false;
            }else{
              this.userType=1
//              this.$router.meta.title='任务围观人'
              this.taskNone=true;
            }
          }
          this.memberList=list;
          console.log(this.memberList);
          this.isAllShow = true;
        });
      },
      selectItem(itemId, isSelect) {
        //取消全选
        this.isAll = false;
        isSelect = !isSelect;
        console.log(isSelect);
        if (!isSelect) {
          this.peopleNum++;
        } else {
          this.peopleNum--;
        }
        if (this.peopleNum < 0) {
          this.peopleNum = 0;
        }
      },
      //submit
      handleClick () {
      	console.log(this);
				console.log(this.memberList);
				let resList = [];
				this.memberList.map((item, index) => {
						item.taskUserList = item.taskUserList.map( (item, index) => {
              let dataObj = {};
              if (item.checked == true) {
                console.log(item, "qwe");
                // dataObj.userId = item.taskUserList[0].userId;
                // dataObj.isMain = item.taskUserList[0].isRemind;
                // dataObj.url = item.taskUserList[0].pic;
                // dataObj.title = item.taskUserList[0].name;
                dataObj.userId = item.userId;
                dataObj.isMain = item.isRemind;
                dataObj.url = item.pic;
                dataObj.title = item.name;
                resList.push(dataObj);
                return item;
              }
            })
            return item;
				});
				console.log(resList, "asdasd")
//				[{"userId":"7434","isMain":"0","url":null,"title":"李嘉增"}]
				let howpageId = localStorage.getItem("howpageId");
				if (howpageId == 2) {
          storejs.set("logChoosePeople", JSON.stringify(resList));
					this.$router.replace({ path:'/log/addLog' })
				}else {
          storejs.set("commentChoosePeople", JSON.stringify(resList));
          this.$router.replace({ path:'/log/comment' })
				}
      }
    },
    created() {
      console.log(storejs.get("detailToChosed"));//2是执行人员 1围观人员 3提醒人员
//    let taskInfo=JSON.parse(storejs.get("params"));
//    let taskId=taskInfo.taskId;
//      let taskJumpFrom=taskInfo.jumpFrom;
//    this.jumpFormList=taskInfo.jumpFrom;
		  this.jumpFormList = 0;
	      if(storejs.get("detailToChosed")){
	        if(storejs.get("detailToChosed")==2||storejs.get("detailToChosed")==3){
	          this.userType=2
	        }else{
	          this.userType=1
	        }
	      }
        //选择的部门id报错情况下获得用户数据
        let taskInfo = JSON.parse(storejs.get("params"));
				let taskId = taskInfo.taskId;
	      // let taskId = "fa1e466c28ec49dea65593936f0b56bd";
	      this.getUserList(taskId);
	    }
    	
  };
</script>
<style scoped>
  #rewardsPunishments{
    padding-top:50px;
  }
  .letterList {
    text-align: center;
    position: fixed;
    top: 98px;
    right: 0;
    padding-left: 4px;
    padding-right: 3px;
  }
  .letterList a {
    color: #2d8cf0;
  }
  .centerLetter {
    width: 100%;
    text-align: center;
  }
  .centerLetter span {
    position: fixed;
    top: 70%;
    left: 50%;
    z-index: 2;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background: #ececec;
  }
  .vux-check-icon > .weui-icon-success:before,
  .vux-check-icon > .weui-icon-success-circle:before {
    color: #2d8cf0 !important;
  }
  .bt_main{
    background: #fff;
    height: auto!important;
  }
  .vux-x-icon {
    fill: #666;
    position: relative;
    width: 20px;
    height: 20px;
    bottom: 0px !important;
  }
  .cell-x-icon {
    display: block;
    fill: #666;
    position: relative;
    width: 20px;
    height: 20px;
  }
  #choseHeart{
    position: absolute;
    right:50px;
  }
  .clickFalse #iosheart,.clickTrue #iosheartOutline{
    display:none;
  }
  .heartactive{
    display: none !important;
  }
  .isDisabled{
    display: none !important;
  }
  .isDisabledIcon{
    display: none !important;
  }
  .vux-x-icon-ios-circle-filled{
    display: inline-block;
    margin-left: .2em;
    fill: #b3b8bd;
    margin-right:20px;
    right:0px !important;
  }
  /*不可选整行置灰*/
  .cellIsDisabled{
    color: #b3b8bd;
  }
  .cellIsDisabled .center{
    background: #b3b8bd;
  }
  .vux-x-icon-ios-plus-empty{
    width:30px;
    height:30px;
  }
  .taskNone{
    display: none;
  }
  .jumpControlNone{
    display: none;
  }
  
  /*.weui-cell{
  	justify-content: space-between;
  }*/
 	/*submitbtn*/
	.button_box{
		padding-bottom: 60px;
		padding-top: 40px;
		text-align: center;
		margin: 0 16px;
		/* position: fixed; */
    /* bottom: 5%; */
    width: 92%;
		/*left: 50%;*/
	}
	.button_box img{
		width: 333px;
		height: 44px;
  }
  
  .button_Box{
		width: 100%;
		margin: 0 auto;
	}
	.btn{
		/*width: 333px;*/
		width: 100%;
		height: 44px;
		background: rgb(22, 166, 255);
		color: #FFF;
		font-size: 18px;
		border-radius: 6px;
		border: 0;
		font-family: PingFang SC;
		letter-spacing: 6px;
	}
</style>

