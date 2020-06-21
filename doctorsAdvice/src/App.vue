/*
 * @Author: mikey.liuhai
 * @Date: 2018-08-14 15:30:59
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-09-26 09:42:47
 */
<template>
  <div id="app" style="height: 100%;">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
  provide() {
  	return {
  		reload: this.reload
  	}
  },
  data() {
  	return {
  		isRouterAlive: true
  	}
  },
  methods: {
  	reload(){
  		this.isRouterAlive = false;
  		this.$nextTick(function(){
  			this.isRouterAlive = true;
  		})
  	}
  }
}

// window.addEventListener("resize", function () {
//   if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
//     window.setTimeout(function () {
//       document.activeElement.scrollIntoViewIfNeeded();
//     },0);
//   }
// })
// var originalHeight=document.documentElement.clientHeight || document.body.clientHeight;
// //console.info("原始窗口的高度"+originalHeight);
// window.onresize=function(){
//    //软键盘弹起与隐藏  都会引起窗口的高度发生变化
//     var resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
//     //console.info("软键盘弹起后窗口的高度"+resizeHeight);
//     if(resizeHeight<originalHeight){
//           //证明窗口被挤压了

//      }
// }
//console.log(document.getElementsByTagName("body"))
//document.getElementsByTagName("body").height=667;

</script>

