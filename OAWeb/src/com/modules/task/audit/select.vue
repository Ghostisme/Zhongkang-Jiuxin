/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<template>
  <div id="taskHeader">
    <v-filter v-if="showFilter" @filterClick="filterClick"></v-filter>
    <div v-else>
      <tab :line-width="2" active-color="#fff" v-model="index">
        <tab-item
          class="vux-center"
          v-for="(item, index) in list2"
          @on-item-click="handler"
          :key="index"
        >{{item}}</tab-item>
      </tab>
      <div class="searchBox">
        <search
          id="selectSearch"
          @on-change="getResult"
          v-model="value"
          auto-scroll-to-top
          placeholder="搜索表单名、申请人、日期"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search"
        ></search>
        <div class="search-filter" @click="filterShow">
          <img style="width:30px;height:30px;" src="@/assets/filter.png" />
          <div class="search-txt">筛选</div>
        </div>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div id="swiper1">
          <div
            class="tab-swiper vux-center"
            v-for="(item,index) in sendme"
            :key="index"
            @click="auditJump(item)"
          >
            <div class="receivedTaskList">
              <!-- 任务列表 -->
              <div class="TaskList">
                <div class="header_box bgcolor_white pt20 pl20 pm10 itemBoxShadow">
                  <div class="card-padding">
                    <div class="card-time">{{item.createTime}}</div>
                    <div class="card-ctx">[{{item.applyType}}]{{item.leaveNote}}</div>
                    <div
                      class="statusTop titleGray aptl"
                      :style="{'color': (item.urgencyName=='特急' ? '#F56C6B':(item.urgencyName=='紧急'?'#FE8822':'#16A6FF')),'border-color': (item.urgencyName=='特急' ? '#F56C6B':(item.urgencyName=='紧急'?'#FE8822':'#16A6FF'))} "
                    >{{item.urgencyName}}</div>
                    <div class="card-author">申请者：{{item.applyUser}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import filter from "./filter";
import util from "@/libs/util";
import storejs from "storejs";
const choseDate = "2019-05-04";
const list = () => [];
export default {
  components: {
    "v-filter": filter
  },
  data() {
    return {
      approvalUserId: "", //id
      isLoading: false,
      loading: false,
      finished: false,
      list2: list(),
      sendme: [], //接口数组
      showFilter: false, //筛选
      tagName: "", //筛选的标签名
      index: 0,
      demo3: 0,
      results: "",
      value: "",
      showHeader: true,
      leftMenu: "",
      rightMenu: "",
      systemName: "查询",
      limit: "", //条数
      offset: 0, //页数
      total: "" //所有条数
    };
  },
  methods: {
    // 不可编辑列表跳转
    auditJump(e) {
      console.log(e);
      console.log(this.index);
      // console.log("---------------")
      if (this.index != 0 && this.index != undefined) {
        var confirmShowBtn = false;
      } else {
        //待我审批
        console.log("-------------");
        var confirmShowBtn = true;
      }
      this.$router.push({
        name: "detail",
        params: {
          id: e.approvalId,
          confirmShowBtn: confirmShowBtn,
          processType: e.processType,
          node: e.node
        }
      });
    },
    // 筛选返回查询页面
    filterClick(e) {
      console.log("------------------");
      console.log(e);
      this.showFilter = e.showFilter;
      this.tagName = e.id;
      console.log(e.tagName);
      console.log(this.index);
      if (this.index == 0 || this.index == undefined) {
        this.sendMeApi("1", e.id);
      } else if (this.index == 2) {
        this.sendMeApi("3", e.id);
      } else if (this.index == 3) {
        this.sendMeApi("4", e.id);
      } else if (this.index == 1) {
        this.sendMeApi("2", e.id);
      }
    },
    //查询接口
    sendMeApi(e, o = "", limit = "", offset = 0) {
      util
        .post("/approval/Info/oaList", {
          approvalUserId: this.approvalUserId,
          fromType: e,
          vague: o,
          limit: limit,
          offset: offset
        })
        .then(res => {
          if (res.status == 200) {
            this.sendme = res.data.resultMap.list;
            this.total = res.data.resultMap.total;
            // 数据全部加载完成

            if (this.sendme.length >= this.total) {
              // this.finished = true;
            }
          }
        });
    },
    //点击tab栏调用接口
    handler(e) {
      this.index = e;
      if (e == 0) {
        this.sendMeApi("1");
      } else if (e == 2) {
        this.sendMeApi("3");
      } else if (e == 3) {
        this.sendMeApi("4");
      } else {
        this.sendMeApi("2");
      }
    },
    onRefresh() {
      //下拉刷新
      if (this.index == 2) {
        this.sendMeApi("3", this.results);
      } else if (this.index == 3) {
        this.sendMeApi("4", this.results);
      } else if (this.index == 1) {
        this.sendMeApi("2", this.results);
      } else {
        this.sendMeApi("1", this.results);
      }
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    swiperChange(e) {
      this.index = e;
      if (e == 0) {
        this.sendMeApi("1", this.tagName);
      } else if (e == 2) {
        this.sendMeApi("3", this.tagName);
      } else if (e == 3) {
        this.sendMeApi("4", this.tagName);
      } else {
        this.sendMeApi("2", this.tagName);
      }
      this.tagName = "";
    },
    // 筛选
    filterShow() {
      this.showFilter = true;
    },
    updataHeight(e) {
      let topHeight = document.getElementsByClassName("vux-slider")[0]
        .offsetTop;
      var diffheight = window.screen.height - topHeight;
      this.$nextTick(function() {
        this.$refs.cateSwiper.xheight = diffheight + "px";
      });
    },
    consoleIndex() {
      console.log("click demo01", this.demo3);
    },
    //      搜索
    setFocus() {
      this.$refs.search.setFocus();
    },
    getResult(val) {
      this.results = val;
      console.log(this.results);
    },
    onSubmit() {
      console.log(this.index);
      if (this.index == 2) {
        this.sendMeApi("3", this.results);
      } else if (this.index == 3) {
        this.sendMeApi("4", this.results);
      } else if (this.index == 1) {
        this.sendMeApi("2", this.results);
      } else {
        this.sendMeApi("1", this.results);
      }

      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "搜索完成"
      });
    },
    onFocus() {
      console.log("on focus");
    },
    onCancel() {
      console.log("on cancel");
    },
    formatDate: function(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : padLeftZero(str)
          );
        }
      }
      return fmt;
    }
  },
  created() {
    if (storejs.get("loginUserInfo")) {
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.approvalUserId = userList.userId;
    } else {
      this.approvalUserId = "7258";
    }
    this.list2.push("待我审批的");
    this.list2.push("我已审批的");
    this.list2.push("我发起的");
    this.list2.push("抄送我的");
    // this.setLeft.showBack = true;
    this.index = this.$route.params.index; //页面传值

    if (this.index == 1) {
      this.sendMeApi("2");
    } else if (this.index == 2) {
      this.sendMeApi("3");
    } else if (this.index == 3) {
      this.sendMeApi("4");
    } else {
      this.sendMeApi("1");
    }
  }
};
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
</script>

<style lang="less">
.ruleText {
  color: #78777c;
}
.statusTop {
  position: absolute;
  right: 14px;
  top: 14px;
  color: #16a6ff;
  width: 40px;
  height: 20px;
  text-align: center;
  line-height: 19px;
  font-size: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(22, 166, 255, 1);
}
.taskLevel {
  width: auto;
  display: inline-block;
  margin-top: 8px;
}
//我发布的任务和我接收
/deep/.vux-tab-wrap {
  margin-bottom: -1px !important;
  padding-top: 0px !important;
  height: 52px !important;
  background: #16a6ff !important;
}
.vux-tab {
  background-color: #16a6ff !important;
  height: 37px !important;
}
#taskHeader .vux-tab-container {
  height: 52px !important;
  background-color: #16a6ff !important;
  position: inherit;
  /*top:2px;*/
}
.vux-tab .vux-tab-item {
  color: #fff !important;
  height: 52px !important;
}
#swiper1,
#swiper2,
#swiper3,
#swiper4 {
  padding: 20px 16px;
}
#swiper1 .vux-button-group > a.vux-button-group-current {
  color: #2292fe !important;
  background: #dce7fb !important;
  border: 0px !important;
}
#swiper1 .vux-button-group > a {
  margin: 10px;
  height: 45px !important;
  line-height: 45px !important;
}
#swiper1 .vux-button-group > a.vux-button-tab-item-middle:after,
.vux-button-group > a.vux-button-tab-item-last:after {
  border: 0px !important;
}
#swiper1 .vux-button-group > a.vux-button-tab-item-first,
.vux-button-group > a.vux-button-tab-item-middle,
.vux-button-group > a.vux-button-tab-item-last {
  border-radius: 4px !important;
}
#swiper1 .vux-button-group > a.vux-button-tab-item-first:after {
  color: #fafafa !important;
  border: 0px !important;
}

// 全部 缺卡
#swiper2 .vux-button-group > a.vux-button-group-current {
  color: #2292fe !important;
  background: #dce7fb !important;
  border: 0px !important;
}
#swiper2 .vux-button-group > a {
  margin: 10px;
  height: 45px !important;
  line-height: 45px !important;
}
#swiper2 .vux-button-group > a.vux-button-tab-item-middle:after,
.vux-button-group > a.vux-button-tab-item-last:after {
  border: 0px !important;
}
#swiper2 .vux-button-group > a.vux-button-tab-item-first,
.vux-button-group > a.vux-button-tab-item-middle,
.vux-button-group > a.vux-button-tab-item-last {
  border-radius: 4px !important;
}
#swiper2 .vux-button-group > a.vux-button-tab-item-first:after {
  color: #fafafa !important;
  border: 0px !important;
}

.cell-x-icon {
  display: block;
  fill: green;
}
.vux-tab-ink-bar.vux-tab-ink-bar-transition-backward,
.vux-tab-ink-bar.vux-tab-ink-bar-transition-forward {
  width: 12% !important;
  margin-left: 6% !important;
}
/*搜索*/
.weui-search-bar {
  &:before,
  &:after {
    display: none;
  }
}
.weui-search-bar__form {
  height: 35px !important;
  border-radius: 10px;
}
.weui-search-bar__label {
  top: 5px !important;
}
.searchBox {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background: #16a6ff;
  margin-top: -12px;
}
.search-filter {
  display: flex;
  align-items: center;
  padding-right: 16px;
}
.search-txt {
  width: 30px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  text-align: center;
}
/*任务列表*/
.TaskList {
  margin-top: 10px;
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 15px 20px;
}
.header_avatar {
  padding: 5px;
}
.titleImgs {
  width: 14px;
  vertical-align: middle;
  margin-right: 3px;
}
.vux-x-icon {
  fill: #00a4ff;
}
.weui-search-bar__box .weui-search-bar__input {
  /*height: 1.828571em !important;*/
}
#taskHeader .vux-header {
  background: #16a6ff !important;
  color: #fff;
}
#taskHeader .vux-header .vux-header-left .left-arrow:before {
  border-color: #fff !important;
}
#taskHeader .vux-header .vux-header-title {
  color: #fff !important;
}
.weui-search-bar {
  top: 5px;
}
#taskHeader .vux-tab-wrap {
  background: #16a6ff !important;
  padding-top: 10px !important;
}
.searchBox .vux-search-fixed {
  position: static !important;
  background: transparent !important;
  top: 90px !important;
}
.searchBox .weui-search-bar__cancel-btn {
  color: #fff;
}
.card-time {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  letter-spacing: 1px;
}
.card-ctx {
  height: 20px;
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  letter-spacing: 1px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-author {
  height: 20px;
  font-size: 14px;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  letter-spacing: 1px;
  margin-top: 10px;
}
body {
  background: #fafafa !important;
}

</style>
