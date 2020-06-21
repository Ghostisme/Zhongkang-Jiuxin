/*
 * 菜单列表页
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:31:22
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-10-10 11:43:36
 */
<style lang="less">
@import "./main.less";
</style>
<template>
  <a-layout>
    <a-layout-header class="header">
      <a-tabs @change="toLink" type="card">
        <a-tab-pane tab="主诉诊断（F1）" key="1" ref="F1"></a-tab-pane>
        <a-tab-pane tab="检验检查申请（F2）" key="2" ref="F2"></a-tab-pane>
        <a-tab-pane tab="治疗项目（F3）" key="3" ref="F3"></a-tab-pane>
        <a-tab-pane tab="西药中成药（F4）" key="4" ref="F4"></a-tab-pane>
        <a-tab-pane tab="中药饮片（F5）" key="5" ref="F5"></a-tab-pane>
        <a-tab-pane tab="管制药品（F6）" key="6" ref="F6"></a-tab-pane>
        <a-tab-pane tab="过敏、既往（F7）" key="7" ref="F7"></a-tab-pane>
      </a-tabs>
    </a-layout-header>
    <a-layout style="float:left">
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import util from "@/libs/util";
import colorArr from "@/com/model/color";
import diagnosisF1 from "@/com/modules/diagnosis/diagnosisF1.vue";
import $ from 'jquery'
export default {
  computed: {
    colorArr() {
      return colorArr;
    }
  },
  components: {
    diagnosisF1: diagnosisF1 //将别名demo 变成 组件 Demo
  },
  data() {
    return {
      left: { paddingLeft: "200px !important" }
    };
  },
  methods: {
    toLink(activeKey) {
      if (activeKey == 1) {
        this.$router.push("/diagnosisF1");
      } else if (activeKey == 2) {
        this.$router.push("/inspection");
      } else if (activeKey == 3) {
        this.$router.push("/treatment");
      } else if (activeKey == 4) {
        this.$router.push("/westem");
      } else if (activeKey == 5) {
        this.$router.push("/cMedicnee");
      } else if (activeKey == 6) {
        this.$router.push("/controlledDrugs");
      } else if (activeKey == 7) {
        this.$router.push("/past");
      }
    }
  },
  created() {
    //this.initMenu();
    this.$router.push("/diagnosisF1");
  },
  mounted() {
    let _this = this;
    document.addEventListener("keydown", function(e) {
//  	this.$emit('myKeyDown');
      console.log(document.querySelector(".ant-tabs-tab"));
      if (e.keyCode == 112) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector(".ant-tabs-tab").click();
      } else if (e.keyCode == 113) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector(".ant-tabs-tab").nextSibling.click();
      } else if (e.keyCode == 114) {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector(".ant-tabs-tab").nextSibling.nextSibling.click();
      } else if (e.keyCode == 115) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelector(".ant-tabs-tab")
          .nextSibling.nextSibling.nextSibling.click();
      } else if (e.keyCode == 116) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelector(".ant-tabs-tab")
          .nextSibling.nextSibling.nextSibling.nextSibling.click();
      } else if (e.keyCode == 117) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelector(".ant-tabs-tab")
          .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.click();
      } else if (e.keyCode == 118) {
        e.preventDefault();
        e.stopPropagation();
        document
          .querySelector(".ant-tabs-tab")
          .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.click();
      }
    });
    $(document).click(function () {
      $(".inframTable").css("display","none");
    });
//      $(".inframTable").click(function (e) {
//        e.stopPropagation();
//      });
    $(".inframTable").on("click","tr",function (e) {
      console.log($($(this).find("td")[0]).text());
    });
  }
};
</script>

<style lang="less">
#vux_view_box_body {
  overflow: hidden !important;
}
  .ant-layout-content{
    padding:0px 20px;
  }
</style>
<style>
.model {
  background-color: rgba(235, 239, 243, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*display: none;*/
}
.icon-red {
  /* color: #e53939;
  background: #e53939; */
  filter: drop-shadow(rgb(0, 204, 153) 10px 0px);
}

.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
}
#vux_view_box_body {
  overflow: hidden;
}
.ant-layout-header {
  background: transparent !important;
}
.ant-layout-header {
  padding: 0px 20px!important;
}
.ant-layout-header {
  height: 31px !important;
  line-height: 31px !important;
  margin-top: 10px;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  /*background:#FEE9BC ;*/
  background: linear-gradient(to bottom, #e68b2c, #ffc73c, #f6f6f4) !important;
  color: #000;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  line-height: 30px!important;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
  height: 30px!important;
}
.ant-form-item-children input {
  height: 20px!important;
}
.ant-tabs {
  overflow: visible !important;
}
.ant-layout {
  padding-left: 0px !important;
  background: #fff;
  height: 100%;
}
.ant-table-tbody > tr > td {
  text-align: left !important;
}
.topBtns {
  height: 40px;
  background: #809eb7;
  padding: 5px 20px;
}
.editable-add-btn {
  background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
  border: 1px solid #1f516e;
  color: #fff;
}
.editable-add-btn:hover {
  background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
  border: 1px solid #1f516e;
  color: #fff;
}
.ant-table-tbody>tr>td, .ant-table-thead>tr>th{
  padding:0px !important;
}
.ant-layout{
  background: #fff !important;
}
</style>
