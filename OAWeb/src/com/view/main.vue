/*
 * 菜单列表页
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:31:22
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-26 09:30:55
 */
<style lang="less">
@import "./main.less";
</style>
<template>
  <div style="height:100vh;">
    <x-header
      :left-options="setLeft"
      :right-options="setRightMenu"
      style="background-color:#16A6FF;position:fixed;z-index:199;left:0px;top:0px;width:100%;"
      v-show="showHeader"
    >
      <component :is="leftMenu" slot="left" @click.native="goLeftNow"></component>
      {{systemName}}
      <component slot="right" :is="rightMenu" @click.native="goNow"></component>
    </x-header>
    <view-box>
      <router-view></router-view>
      <tabbar>
        <tabbar-item link="#" v-if="menuList.customer == 1" @click.native="tabbarChange('#')">
          <img slot="icon" src="../../assets/icon01.png" />
          <img slot="icon-active" src="../../assets/icon01_on.png" />
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item
          link="/tasktask/task"
          v-if="menuList.task == 1"
          @click.native="tabbarChange('#')"
        >
          <img slot="icon" src="../../assets/icon02.png" />
          <img slot="icon-active" src="../../assets/icon02_on.png" />
          <span slot="label">任务</span>
        </tabbar-item>
        <tabbar-item
          link="/attendancestask/attendances"
          v-if="menuList.attendance == 1"
          @click.native="tabbarChange('#')"
        >
          <img slot="icon" src="@/assets/icon03.png" />
          <img slot="icon-active" src="@/assets/icon03_on.png" />
          <span slot="label">考勤</span>
        </tabbar-item>
        <tabbar-item
          link="/medicinestask/medicines"
          v-if="menuList.info == 1"
          @click.native="tabbarChange('#')"
        >
          <img slot="icon" src="@/assets/icon04.png" />
          <img slot="icon-active" src="@/assets/icon04_on.png" />
          <span slot="label">公告</span>
        </tabbar-item>
        <!--<tabbar-item link="/self" @click.native="tabbarChange('self')">-->
        <!--<img slot="icon" src="@/assets/icon06.png">-->
        <!--<img slot="icon-active" src="@/assets/icon06_on.png">-->
        <!--<span slot="label">个人中心</span>-->
        <!--</tabbar-item>-->
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import util from "@/libs/util";
import colorArr from "@/com/model/color";
import storejs from "storejs";
import { Toast } from "vux";

export default {
  computed: {
    colorArr() {
      return colorArr;
    }
  },
  data() {
    return {
      menuList: {
        home: 0,
        task: 0,
        attendance: 0,
        info: 0,
        my: 0
      },
      showHeader: true,
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
      setRightMenu: { showMore: false },
      systemName: "任务"
    };
  },
  methods: {
    initMenu() {
      //      let powerList = JSON.parse(localStorage.getItem("powerList"));
      //      let second = powerList.second;
      //      for (const i of second) {
      //        if (i.name == "home") {
      //          this.menuList.home = 1;
      //        } else if (i.name == "task") {
      //          this.menuList.task = 1;
      //        } else if (i.name == "attendance") {
      //          this.menuList.attendance = 1;
      //        } else if (i.name == "info") {
      //          this.menuList.info = 1;
      //        } else if (i.name == "my") {
      //          this.menuList.my = 1;
      //        }
      //      }
      if (
        this.$route.params.pageTitleText != undefined &&
        this.$route.params.pageTitleText != ""
      ) {
        this.systemName = this.$route.params.pageTitleText;
      } else {
        //标题文字
        this.systemName = this.$route.meta.title;
        if (
          this.systemName == "任务" ||
          this.systemName == "请假" ||
          this.systemName == "筛选"
        ) {
          //header
          this.showHeader = false;
        } else {
          this.showHeader = false;
        }
      }
      //左侧返回显示
      let left = this.$route.meta.left;
      this.setLeft.showBack = left == 1 ? true : false;
      this.setLeft = { backText: "" };
      //权限
      //      this.$store.commit("updateMenulist", this);
      //      let menuList = this.$store.state.app.menuList;
    },
    tabbarChange(name) {
      let powerList = JSON.parse(localStorage.getItem("powerList"));
      let second = powerList.second;
      for (const i in second) {
        if (second[i].name == name) {
          localStorage.setItem("moduleId", second[i].children[0].id);
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      this.initMenu();
    }
  },
  created() {
    this.initMenu();
  }
};
</script>

<style lang="less">
/*#vux_view_box_body {*/
/*overflow: hidden !important;*/
/*}*/
/*.weui-tab{*/
/*padding-top:40px;*/
/*}*/

.vux-header .vux-header-left .left-arrow:before {
  border-color: #fff !important;
}
.vux-header .vux-header-title {
  color: #fff !important;
}
/*#tp25 {*/
/*padding-top: 45px;*/
/*}*/
.textarea-border .weui-textarea {
  padding-left: 10px;
}
.weui-cells {
  margin-top: 0px !important;
  font-size: 16px !important;
}
.page label {
  font-size: 16px;
}
#txtArea .weui-cell:before {
  border: none !important;
}
.uploadImg .van-uploader__wrapper {
  width: 300px;
}
.uploadImg .van-uploader__preview {
  margin: 0rem 1.3rem 1.2rem 1.2rem !important;
}
.uploadImg .van-uploader__upload {
  margin: 0px 20px 18px 18px !important;
}
.uploadImg .van-image {
  box-shadow: 0px 1px 5px 0px rgba(153, 153, 153, 0.3);
}
.multiple
  .ant-tree.ant-tree-show-line
  li
  span.ant-tree-switcher.ant-tree-switcher-noop:after {
  content: "\E678";
}
.tab-main .vux-tab {
  background: #16a6ff !important;
}
.vux-tab-item {
  background: #16a6ff !important;
}
#taskHeader .vux-swiper {
  overflow-y: scroll;
}
.weui-tab__panel {
  padding-bottom: 0px !important;
}
.center {
  font-size: 14px !important;
}
#content [class^="weui-icon-"]:before,
[class*=" weui-icon-"]:before {
  margin-bottom: 5px;
}
#leave-page .vux-cell-placeholder {
  font-size: 0.8em;
}
#leave-page .weui-cells:before {
  border: 0px !important;
}
#leave-page .weui-cells:after {
  border-bottom: 0px !important;
}
#leave-page .vux-cell-value {
  font-size: 0.8em;
}
#leave-page .weui-cell {
  height: 50px;
}
#process .vux-cell-box:not(:first-child):before {
  border: 0px !important;
}
.content-list {
  position: fixed;
  top: 10px;
  width: 100%;
  overflow-y: auto;
  left: 0;
  bottom: 0;
  right: 0;
}
.weui-btn_mini {
  font-size: 16px !important;
}
.choseRecieveBtn .weui-cell {
  font-size: 14px !important;
}
.weui-tab__panel {
  overflow-x: hidden !important;
}
.vux-tab-wrap {
  padding-top: 10px !important;
}
@media screen and (max-device-width: 400px) {
  .uploadImg .van-uploader__preview {
    margin: 0rem 0.8rem 1.2rem 0.8rem !important;
  }
}
.bt_main{
  position: absolute !important;
  bottom:10px !important;
}
</style>
