/*
 * @Author: hai.L
 * @Date: 2019-04-22 11:10:08
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-05-05 16:45:28
 */
<template>
  <div class="deptBox">
    <!--<search position="absolute"></search>-->
    <addressBook v-bind:departmentList="departments"></addressBook>
  </div>
</template>
<script>
import addressBook from "@/com/command/addressBook/addressBook";
import util from "@/libs/util";
export default {
  components: {
    addressBook
  },
  data() {
    return {
        departments:null
    };
  },
  methods: {
    init() {
      //部门用户数据
      util.get("sys/user/txlList").then(response => {
          this.departments = response.data.resultMap;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>
  /*.deptBox{*/
    /*padding-top: 41px;*/
  /*}*/
  .deptBox .vux-search-fixed{
    position: static!important;
    background: #16A6FF!important;
  }

</style>


