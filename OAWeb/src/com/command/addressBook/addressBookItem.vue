/*
 * @Author: hai.L
 * @Date: 2019-05-07 15:59:49
 * @Last Modified by:   hai.L
 * @Last Modified time: 2019-05-07 15:59:49
 */
<template>
  <cell-box :style="{ marginLeft: mLeft*55 + 'px' }" @click.native="goLink">
    <avatarImg :url="'@/assets/652_03.png'" :width="44" :height="44"/>
    <span style="margin-left: 10px">{{tabName}}</span>
  </cell-box>
</template>
<script>
  import storejs from 'storejs'
  import util from "@/libs/util";
export default {
  props: ["address", "margin_index"],
  watch: {
    address(newV, oldV) {
      this.data = newV;
      this.tabName = this.data.text;
    }
  },
  methods: {
    addressNodeVal(data) {},
    goLink() {
      console.log(storejs.get("jumpFrom"));
      if(storejs.get("jumpFrom")=="detail"){//从详情页面添加过来的
        this.$router.push({
          name: "detailStaffChose",
          params: {
            id: this.address.id,
            pageTitleText: this.address.text,
            closePage: "/task/createTask"
          }
        });
      }else if(storejs.get("jumpFrom")=="warnList"){
        this.$router.push({
          name: "logStaffChose",
          params: {
            id: this.address.id,
            pageTitleText: this.address.text,
            closePage: "/task/createTask"
          }
        });
      }else{
        this.$router.push({
          name: "staffChose",
          params: {
            id: this.address.id,
            pageTitleText: this.address.text,
            closePage: "/task/createTask"
          }
        });
      }

    }
  },
  data() {
    return {
      data: null,
      tabName: "",
      mLeft: 0
    };
  },
  created() {
    this.mLeft = this.margin_index;
    this.tabName = this.address.text;
    this.children = this.address.children;
  }
};
</script>
<style>
</style>


