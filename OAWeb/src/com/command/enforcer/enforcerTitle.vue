/*
 * @Author: hai.L 
 * @Date: 2019-05-07 15:59:45 
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-05-07 17:56:34
 */
 
<template>
    <cell class="bgcolor_white">
      <check-icon class="fl pt10 icon_color" :value.sync="enforcer.isSelect" slot="icon"></check-icon>
      <avatarImg class="fl" slot="icon" v-if="url" :url="'@/assets/652_03.png'" :width="45" :height="45"/>
      <avatarEnforcer class="fl" slot="icon" v-if="!url" :title="tabName" :width="45" :height="45"/>
      <span slot="title" class="title_h18" style="margin-left: 8px;">{{tabName}}</span>
      <span slot="inline-desc" class="title_h15" style="margin-left: 8px;color:#A4A3A3;">{{info[enforcer.info]}}</span>
      <div>
        <span class="title_h18" style="margin-top:-5px;">{{isRead[enforcer.isRead]}}</span>
        <span>···</span>
      </div>
    </cell>
</template>
<script>
export default {
  props: ["enforcer", "width", "height"],
  watch: {},
  methods: {},
  data() {
    return {
      tabName: "",
      url: "",
      isRead: ["未读", "已读"],
      info: ["已发送任务提醒", "未发送任务提醒"]
    };
  },
  created() {
    this.url = this.enforcer.url;
    this.tabName = this.enforcer.title;
  }
};
</script>
<style>
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: #2d8cf0 !important;
}
</style>


