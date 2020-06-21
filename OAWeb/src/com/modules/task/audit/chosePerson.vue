/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<style lang="less">
@import "../choseStaff/view/address.less";
</style>
<template>
  <div ref="content" id="content">
    <div class="content-list">
      <div>
        <!-- <search position="absolute"></search> -->
      </div>
      <group  v-show="isAllShow">
        <cell>
          <check-icon
            slot="title"
            :value.sync="isAll"
            @click.native="selectAllItem()"
            class="icon_color mrr"
          >全选</check-icon>
        </cell>
      </group>
      <group
        v-for="(item, index) in memberList"
        :key="index"
        :title="item.letter"
        :id="item.letter"
      >
        <cell-box
          :is-link="isLink"
          v-for="(itemList, indexs) in item.data"
          :key="indexs"
          :class="{cellIsDisabled:itemList.isDisabled}"
        >
          <check-icon
            :value.sync="itemList.isSelect"
            @click.native="selectItem(itemList.Student_ID,itemList.isSelect)"
            class="icon_color mrr"
            :class="{isDisabled:itemList.isDisabled}"
          ></check-icon>
          <x-icon type="ios-circle-filled" size="23" :class="{isDisabledIcon:!itemList.isDisabled}"></x-icon>
          <img
            v-if="itemList.Image"
            :src="itemList.Image?itemList.Image:require('@/assets/default.png')"
            alt
            width="50"
            height="50"
            style="border-radius: 50%;"
          />
          <avatarColorTitle v-if="!itemList.Image" :title="itemList.Name" :width="38" :height="38" />
          <span style="margin-left: 10px">{{itemList.Name}}</span>
        </cell-box>
      </group>
      <div style="padding-bottom:60px">
        <div v-if="showLetter" class="centerLetter">
          <span>{{letter}}</span>
        </div>
        <div class="letterList" v-if="showLetterList">
          <a
            v-for="(leter, index) in Letters"
            :key="index"
            style="display: block;font-size: 12px;margin-top: 1px"
             @click="jumper(leter,index)"
            :id="leter"
            ref="leter"
          >
            <span>{{leter}}</span>
          </a>
          <a style="display: block" @click="jumper('#')">#</a>
        </div>
      </div>
    </div>
    <div  class="bt_main bgcolor_white btline aptl8 header">
      <div class="fl ls15 font_color">已选择({{peopleNum}})</div>
      <div>
        <x-button
          type="primary"
          @click.native="btnOk"
          class="bt105 header_avatar fr title_h15"
        >确定({{peopleNum}})</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from "storejs";
import util from "@/libs/util";
import pinyin from "@/libs/pyfist.js";
import pinyinUtil from "@/libs/pinyin.js";
import CheckIcon from "../../../../../node_modules/vux/src/components/check-icon/index.vue";
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
  name: "chosePerson",
  components: { CheckIcon },
  props: ["chose"],
  data() {
    return {
      approvalUserId:"", //用户当前id
      list2: list(),
      index: 0,
      demo2: "已打卡",
      demo3: 0,
      isLink: false,
      groupTitle: "W",
      fullHeight: document.documentElement.clientHeight,
      showLetter: false,
      showLetterList: true,
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
      personList: [],
      peopleNum: 0,
      isAll: false,
      isAllShow: false,
      mainPeople: "0", //主要负责人默认不点亮
      isShow: -1,
      disabledValue: "", //排除要选择的数据
      canChoseValue: "", //可选择数据
      leaveTitle: "" //区别串行并行抄送
      
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
    //字母索引锚点定位
    jumper(key, index) {
      if (key == "#") {
        this.$el.querySelector(".content-list").scrollTop = 0;
        this.$el.querySelector(".content-list").animate(
          {
            scrollTop: 0
          },
          100
        );
        return;
      } else {
        this.letter = key;
        var _this = this;
        //点击侧边字母后屏幕中间的字母也显示,500毫秒隐藏
        if (this.showLetter == false) {
          this.showLetter = true;
          setTimeout(function() {
            _this.showLetter = false;
          }, 500);
        } else {
          this.showLetter = false;
        }
        //          var el = document.getElementById(key);
        let el = this.$refs.leter[index];
        //          this.$vux.toast.text(this.$refs.leter[index].offsetTop,'top');
        if (el) {
          var scrollPosition = el.offsetTop;
          console.log("scrollPosition", scrollPosition);

          this.$nextTick(function() {
            //              document.documentElement.scrollTop = scrollPosition;
            this.$el.querySelector(".content-list").scrollTop = scrollPosition;
            //              this.$vux.alert.text(document.getElementsByClassName("content-list")[0].fastClickLastscrollTop,'top');
            this.$vux.alert.text(
              this.$el.querySelector(".content-list"),
              "top"
            );
          });

          document.getElementById("content").animate(
            {
              scrollTop: scrollPosition
            },
            100
          );
        }
      }
    },
    pySort(arr) {
      var $this = this;
      var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      var result = [];
      var curr;

      for (var i = 0; i < letters.length; i++) {
        curr = { letter: letters[i], data: [] };
        for (var j = 0; j < arr.length; j++) {
          var firstLetter = pinyinUtil.getFirstLetter(arr[j].userName);
          //var firstLetter = pinyinUtil.getFirstLetter(arr[j])
          var initial = firstLetter.charAt(0); //截取第一个字符
          if (initial == letters[i] || initial == letters[i].toLowerCase()) {
            curr.data.push({
              Name: arr[j].userName,
              Image: arr[j].headImage,
              MonitorFlag: arr[j].userCode,
              Student_ID: arr[j].userId,
              isSelect: arr[j].canisSelect,
              userName: arr[j].userName,
              isMainPeople: arr[j].isMainPeople,
              isDisabled: arr[j].isDisabled,
              choseHeart: arr[j].choseHeart
            });
          }
        }
        if (curr.data.length) {
          result.push(curr);
        }
      }
      return result;
    },
    btnOk() {
      for (var i = 0; i < this.memberList.length; i++) {
        let members = this.memberList[i].data;
        for (var j = 0; j < members.length; j++) {
          if (members[j].isSelect) {
            console.log(members[j]);
            this.implementUserList.push({
              userId: members[j].Student_ID,
              isMain: members[j].isMainPeople,
              url: members[j].Image,
              title: members[j].userName
            });
          }
        }
      }
      
     
      //并行子节点选人
      if (this.chose == false) {
        if (this.peopleNum > 1) {
          this.$vux.toast.text("仅能选取一人", "top");
          return false;
        }
        
        let obj = {
          chose: true,
          implementUserList: this.implementUserList[0]
        };
        this.$emit("choseListen", obj);
        this.$vux.toast.show({
          text: "您已选择人员，请点击人员添加下级审批人",
          time: 5000,
          width: "11em"
        });
      }
      // 串行栏目
      if (this.leaveTitle == "chuan") {
        if (this.peopleNum > 1) {
          this.$vux.toast.text("仅能选取一人", "top");
          return false;
        }
        if(this.implementUserList[0].userId==this.approvalUserId){
          this.$vux.toast.text("您不能选择自己", "top");
          this.$router.go(-1);
          return false;
        }
        let personJson = JSON.stringify(this.implementUserList[0]);
        localStorage.setItem("personJson", personJson);
        if (localStorage.getItem("personJson")) {
          if (localStorage.getItem("personList")) {
            this.personList = JSON.parse(localStorage.getItem("personList"));
          } else {
            this.personList = [];
          }
          this.personList.push(JSON.parse(localStorage.getItem("personJson")));
        }
        localStorage.setItem("personList", JSON.stringify(this.personList));
         this.$router.go(-1);
        // 并行栏目
      } else if (this.leaveTitle == "bing") {
        if (this.implementUserList[0] == undefined) {
          this.$vux.toast.text("您没有选择人员", "top");
        } else {
          //选择主人员
          let editData = [];
          editData.push(this.implementUserList[0]);
          localStorage.setItem("editData", JSON.stringify(editData));

          localStorage.setItem("processTxt", "并行"); //流程类型
          if (this.peopleNum > 1) {
            this.$vux.toast.text("仅能选取一人", "top");
            return false;
          }
        }
        this.$router.go(-1);
      }
      // 抄送栏目
      else if (this.leaveTitle == "send") {
        let sendJson = JSON.stringify(this.implementUserList);
        localStorage.setItem("sendJson", sendJson);
         this.$router.go(-1);
      }
    }
  },
  created() {
     if (storejs.get("loginUserInfo")) {
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.approvalUserId = userList.userId;
    } else {
      this.approvalUserId = "7188";
    }
    this.leaveTitle = this.$route.params.title;
    let fkDeptId = this.$route.params.id;
    console.log(this.leaveTitle);
    if (fkDeptId) {
      //获得用户数据
      util.get("sys/user/list?fkDeptId=" + fkDeptId).then(response => {
        var list = response.data.resultMap.userList;
        console.log(list);
        for (var k in list) {
          list[k].isMainPeople = "0";
          list[k].isDisabled = false;
          list[k].choseHeart = false;
        }
        if (storejs.get("jumpFrom") == "0") {
          if (storejs.get("onlook_selectPeople")) {
            this.disabledValue = JSON.parse(storejs.get("onlook_selectPeople")); //获取围观人员进行互斥选择
          }
          if (storejs.get("task_selectPeople")) {
            this.canChoseValue = JSON.parse(storejs.get("task_selectPeople")); //获取可选择执行人员
          }
        } else if (storejs.get("jumpFrom") == "1") {
          if (storejs.get("task_selectPeople")) {
            this.disabledValue = JSON.parse(storejs.get("task_selectPeople")); //获取执行人员互斥选择
          }
          if (storejs.get("onlook_selectPeople")) {
            this.canChoseValue = JSON.parse(storejs.get("onlook_selectPeople")); //获取可选择围观人员
          }
        }
        console.log(storejs.get("task_selectPeople"));
        //        不可选人员添加置灰属性
        for (var p in this.disabledValue) {
          console.log(this.disabledValue[p]);
          for (var h in list) {
            if (list[h].userId == this.disabledValue[p].userId) {
              list[h].isDisabled = true;
              list[h].canisSelect = false;
              list[h].choseHeart = false;
            }
          }
        }
        console.log("canChoseValue", this.canChoseValue);
        //        可选人员添加默认选上属性
        for (var s in this.canChoseValue) {
          console.log(this.canChoseValue[s]);
          for (var g in list) {
            if (list[g].userId == this.canChoseValue[s].userId) {
              list[g].isMainPeople = this.canChoseValue[s].isMain;

              list[g].canisSelect = true;
              if (list[g].isMainPeople == "0") {
                list[g].choseHeart = false;
              } else {
                list[g].choseHeart = true;
              }
              this.peopleNum++;
            }
          }
        }
        console.log("list", list);
        //返回的姓名数组按A-Z排序
        this.memberList = this.pySort(list);
        console.log(this.memberList);
        if (this.memberList.length > 0) {
          this.isAllShow = true;
        }
      });

      return;
    }
    //选择的部门id报错情况下获得用户数据
    util.get("sys/user/list").then(response => {
      var list = response.data.resultMap.userList;
      console.log(list);
      for (var k in list) {
        list[k].isMainPeople = "0";
        list[k].isDisabled = false;
        list[k].choseHeart = false;
      }
      if (storejs.get("jumpFrom") == "0") {
        if (storejs.get("onlook_selectPeople")) {
          this.disabledValue = JSON.parse(storejs.get("onlook_selectPeople")); //获取围观人员进行互斥选择
        }
        if (storejs.get("task_selectPeople")) {
          this.canChoseValue = JSON.parse(storejs.get("task_selectPeople")); //获取可选择执行人员
        }
      } else if (storejs.get("jumpFrom") == "1") {
        if (storejs.get("task_selectPeople")) {
          this.disabledValue = JSON.parse(storejs.get("task_selectPeople")); //获取执行人员互斥选择
        }
        if (storejs.get("onlook_selectPeople")) {
          this.canChoseValue = JSON.parse(storejs.get("onlook_selectPeople")); //获取可选择围观人员
        }
      }
      //        不可选人员添加置灰属性
      for (var p in this.disabledValue) {
        console.log(this.disabledValue[p]);
        for (var h in list) {
          if (list[h].userId == this.disabledValue[p].userId) {
            list[h].isDisabled = true;
            list[h].canisSelect = false;
            list[h].choseHeart = false;
          }
        }
      }
      console.log("canChoseValue", this.canChoseValue);
      //        可选人员添加默认选上属性
      for (var s in this.canChoseValue) {
        for (var g in list) {
          console.log(list);
          if (list[g].userId == this.canChoseValue[s].userId) {
            list[g].canisSelect = true;
            list[g].isMainPeople = this.canChoseValue[s].isMain;
            if (list[g].isMainPeople == "0") {
              list[g].choseHeart = false;
            } else {
              list[g].choseHeart = true;
            }
            this.peopleNum++;
          }
        }
      }
      //返回的姓名数组按A-Z排序
      this.memberList = this.pySort(list);
      this.isAllShow = true;
    });
  }
};
</script>
<style lang="less">
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

.bt_main {
  background: #fff;
  height: 60px !important;
}
.vux-x-icon {
  fill: #666;
}
.cell-x-icon {
  display: block;
  fill: #666;
}
#choseHeart {
  position: absolute;
  right: 50px;
}
.clickFalse #iosheart,
.clickTrue #iosheartOutline {
  display: none;
}
.heartactive {
  display: none !important;
}
.isDisabled {
  display: none !important;
}
.isDisabledIcon {
  display: none !important;
}
.vux-x-icon-ios-circle-filled {
  display: inline-block;
  margin-left: 0.2em;
  margin-right: 0.2em;
  fill: #b3b8bd;
  margin-right: 20px;
}
/*不可选整行置灰*/
.cellIsDisabled {
  color: #b3b8bd;
}
.cellIsDisabled .center {
  background: #b3b8bd;
}
</style>

