<template>
  <div>
    <ul>
      <li style="float:left;list-style: none;width:20%;">
        <ul class="tabItemContainer">
          <li @click="toggle(index,tab.periodId)" v-for="(tab,index) in periods" :key="index" :class="{tabItemCurrent: active == index}">{{ tab.periodName }}</li>
        </ul>
      </li>
      <li style="float:left;list-style: none;width:80%;">
        <div>

        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import util from "@/libs/util";

export default {
  name: "commonTab",
  props: {
    periods: Array,
    value: Object,
    taskslist: Object
  },
  data() {
    return {
      active: 0,
      thisTableData:{}
    };
  },
  computed: {
    func(){
      return util.updataFunction(this);
    },
    util() {
      return util;
    }
  },
  methods: {
    toggle(i, v) {
      this.active = i;
      this.currentView = v;
    }
  },
  created() {
    // 获取数据
    this.active = 0;
    console.log(this.taskslist);
  }
};
</script>
<style>
#TabMain {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.tabItemContainer {
  width: 100%;
  height: 100%;
}
.tabBodyContainer {
  width: 100%;
  height: 100%;
  float: left;
  background-color: #fff;
}
.tabItemContainer > li {
  list-style: none;
  text-align: center;
}
.tabItemContainer > li {
  float: left;
  width: 100%;
  padding: 2vh 0 2vh 0;
  font: 16px "微软雅黑", Arial, Helvetica, sans-serif;
  color: #808080;
  cursor: pointer;
  list-style: none;
  text-decoration: none;
}
.tabItemCurrent {
  background-color: #fff;
  color: #2d8cf0 !important;
  position: relative;
  border-left: 0.5vh solid #2d8cf0;
}
.tabBodyItem {
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
}
.tabBodyItem > p {
  font: 13px "微软雅黑", Arial, Helvetica, sans-serif;
  text-align: center;
  margin-top: 30px;
}
.tabBodyItem > p > a {
  text-decoration: none;
  color: #0f3;
}
.tabBodyCurrent {
  display: block;
}
</style>