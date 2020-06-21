/*
 * 首页
 * @Author: mikey.liuhai 
 * @Date: 2018-08-14 15:32:12 
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-25 10:03:49
 */
<template>
  <div style="width:100%;background-color: #2c8def;height:100%;">
    <!-- <x-header title="首页" :left-options="{showBack: false}"></x-header> 
    <div>首页</div>  -->
    <div style="width:90%;">
      
    </div>
    <div>
       
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import {
  Group,
  Cell
} from "vux";

export default {
  components: {
    Group,
    Cell
  },
  computed: {
    colorArr() {
      return colorArr;
    }
  },
  data() {
    return {};
  },
  watch: {
    $route(to) {console.log(to.name)
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this);
      localStorage.currentPageName = to.name;
    }
  }
};
</script>

<style>
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
  overflow:hidden;
}
</style>