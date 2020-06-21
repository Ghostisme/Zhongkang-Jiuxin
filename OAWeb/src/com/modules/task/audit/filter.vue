/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<template>
  <div class="homeBox">
    <!-- <x-header
        style="background:#16A6FF;position:fixed;z-index:199;left:0px;top:0px;width:100%;"
        v-show="showHeader"
        :left-options="setLeft"
        @on-click-back="showBack"
      >{{systemName}}</x-header> -->
    <div class="page">
      <div class="main">
        <div class="title">紧急程度</div>
        <div>
          <ul class="main-box">
            <li class="tag" @click="process('')">
              全部
            </li>
            <li class="tag" v-for="(item, index) in tagList" :key="index" @click="process(item)">    
              <div>{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="title">类别</div>
        <div>
          <ul class="main-box">
             <li class="tag" @click="process('')">
              全部
            </li>
            <li class="tag" v-for="(item, index) in typeList" :key="index" @click="process(item)">
              <div>{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from "@/libs/util";
export default {
   name: 'filter',
  data() {
    return {
      showHeader:true,
      systemName:"筛选",
      tagList: [],
      typeList: [],
    };
  },
  created(){
    this.urgencyApi()//紧急程度
    this.typeApi() //请假类型
  },
  methods:{
    urgencyApi() {
      //紧急程度
      util.get("/apply/leave/urgentList").then(res => {
        if (res.status == 200) {
          this.tagList = res.data.resultMap.result;
        }
      });
    },
    typeApi() {
      //请假类型
      util.get("/apply/leave/leaveCategoryList").then(res => {
        if (res.status == 200) {
          this.typeList = res.data.resultMap.result;
        }
      });
    },
    //   紧急程度
      process(e){
          console.log(e)
          var obj={
             id:e.id,
             tagName:e.name,
             showFilter:false
          }
          this.$emit("filterClick",obj)
      },
      //左侧返回
      leftBack(){
        console.log("左侧返回")
        var obj={
             showFilter:false
          }
          console.log(obj)
        this.$emit("filterClick",obj)

      }
  }
};
</script>
<style  scoped>
/* .homeBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-color: #ffffff;
} */
.vux-header {
  padding: 0px !important;
}
.main {
  padding: 20px 16px;
}
.title {
  font-size: 17px;
  color: #333;
}
.main-box {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.tag {
  width: 70px;
  height: 35px;
  box-shadow: 0px 1px 4px 1px rgba(225, 228, 229, 1);
  border-radius: 2px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.tag:active {
  width: 70px;
  height: 35px;
  border-radius: 2px;
  border: 1px solid rgba(132, 208, 255, 1);
  color: #16a6ff;
}
</style>