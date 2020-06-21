/*
 * @Author: hai.L 
 * @Date: 2019-05-06 10:10:27 
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-05-06 17:34:44
 */
<template>
  <div>
    <div v-if="index<3" v-for="(avatar, index) in leads" :key="index">
      <blur
        v-if="avatar.isManager == 1 && avatar.url"
        :blur-amount="0"
        :url="''"
        :style="{width: width+'px',height: height + 'px'}"
      >
        <img :src="avatar.url" :style="{width: width+'px',height: height + 'px'}">
      </blur>

      <div
        v-if="(avatar.isManager == 1 && !avatar.url)"
        class="center_Color"
        :style="{width: width+'px',height: height + 'px', marginRight: '6px'}"
      >{{avatar.title.substring(avatar.title.length-2,avatar.title.length)}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["width", "height", "leads", "length"],
  data() {
    return {
      avatar: "@/assets/default.png",
      title_name: ""
    };
  },
  created() {
  }
};
</script>
<style>
.center {
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.center img {
  border-radius: 50%;
}
.center_Color {
  text-align: center;
  color: #fff;
  background-color: #2d8cf0;
  border-radius: 50%;
  font-size: 9px;
  text-align: center;
  line-height: 28px;
  float: right;
}
</style>


