/*
 * @Author: hai.L
 * @Date: 2019-03-01 13:53:11
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-05-15 16:28:33
 */
<style lang="less">
@import "./address.less";
</style>
<template>
  <div ref="content"class="choseContent">
    <group>
      <cell title="选择新的接收人" link="/addressList/addressListIndex"></cell>
    </group>
    <group title="已选择的接收人" v-show="isAllShow">
      <cell>
        <check-icon
          slot="title"
          :value.sync="isAll"
          @click.native="selectAllItem()"
          class="icon_color mrr"
        >全选</check-icon>
      </cell>
    </group>
    <group v-for="(item, index) in memberList" :key="index" :title="item.letter" :id="item.letter">
      <cell-box :is-link="isLink" v-for="(itemList, indexs) in item.data" :key="indexs">
        <check-icon
          :value.sync="itemList.isSelect"
          @click.native="selectItem(itemList.Student_ID,itemList.isSelect)"
          class="icon_color mrr"
        ></check-icon>
        <img
          v-if="itemList.Image"
          :src="itemList.Image?itemList.Image:require('@/assets/default.png')"
          alt
          width="50"
          height="50"
          style="border-radius: 50%;"
        >
        <avatarColorTitle v-if="!itemList.Image" :title="itemList.title" :width="38" :height="38"/>
        <span style="margin-left: 10px">{{itemList.title}}</span>
      </cell-box>
    </group>
    <div>
      <div v-if="showLetter" class="centerLetter">
        <span>{{letter}}</span>
      </div>
      <div class="letterList" v-if="showLetterList">
        <a
          v-for="(leter, index) in Letters"
          :key="index"
          style="display: block;font-size: 12px;margin-top: 1px"
          @click="jumper(leter)"
        >
          <span>{{leter}}</span>
        </a>
        <a style="display: block" @click="jumper('#')">#</a>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'storejs'
import util from "@/libs/util";
import pinyin from "@/libs/pyfist.js";
import pinyinUtil from "@/libs/pinyin.js";
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
      isAllShow: false
    };
  },

  computed: {
    scrollHeight() {
      return Number(this.fullHeight) - 94 + "px";
    },
    choseLeadBtnOK() {
      for (var i = 0; i < this.memberList.length; i++) {
        let members = this.memberList[i].data;
        for (var j = 0; j < members.length; j++) {
          if (members[j].isSelect) {
            this.implementUserList.push({
              userId: members[j].Student_ID,
              isManager: 0,
              url: members[j].Image,
              title: members[j].title
            });
          }
        }
      }
      storejs.set(
        "task_selectPeople",
        JSON.stringify(this.implementUserList)
      );
      this.$router.push("/task/createTask");
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
    jumper(key) {
      if (key == "#") {
        document.getElementById("content").scrollTop = 0;
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
        var el = document.getElementById(key);
        if (el) {
          var scrollPosition = el.offsetTop;
          this.$nextTick(function() {
            document.documentElement.scrollTop = scrollPosition;
          });
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
          var firstLetter = pinyinUtil.getFirstLetter(arr[j].title);
          //var firstLetter = pinyinUtil.getFirstLetter(arr[j])
          var initial = firstLetter.charAt(0); //截取第一个字符
          if (initial == letters[i] || initial == letters[i].toLowerCase()) {
            curr.data.push({
              Image: arr[j].url,
              Student_ID: arr[j].userId,
              isSelect: false,
              title: arr[j].title
            });
          }
        }
        if (curr.data.length) {
          result.push(curr);
        }
      }
      return result;
    }
  },
  created() {
//    let list = JSON.parse(storejs.get("task_selectPeople"));
//    this.memberList = this.pySort(list);
//    this.isAllShow = true;
  }
};
</script>
<style lang="less">
.letterList {
  text-align: center;
  position: fixed;
  top: 168px;
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
  /*.choseContent{*/
    /*padding-top:44px;*/
  /*}*/
</style>

