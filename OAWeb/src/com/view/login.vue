/*
 * 登录页
 * @Author: mikey.liuhai 
 * @Date: 2018-08-14 15:31:57 
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-02-26 10:05:17
 */
<template>
  <!-- <div> -->
  <div style="background-color:#ffffff;">
    <!-- <x-header title="登录" :left-options="{showBack: false}"> -->
    <div>
    </div>
    <!-- </x-header> -->
    <toast v-model="showPositionValue" type="text" width="10.6em" :time="800" is-show-mask :text="errorinfo"></toast>
    <group style="width:80%;margin:0 0 0 10%;border: 1px solid #ffffff !important;">
      <!-- <x-input title="必须输入2333" :is-type="be2333" v-model="from.user" placeholder="请输入用户名"> -->
      <x-input title="姓名" v-model="from.user" placeholder="请输入用户名" style="border-bottom:1px solid #e2e2e2;border-top:1px solid #ffffff;">
        <img slot="label" style="width:80%;padding-right:20" src="../../assets/icon1.png">
      </x-input>
      <x-input title="密码" v-model="from.password" type="password" placeholder="请输入密码" style="border-top:1px solid #ffffff;">
        <img slot="label" style="width:80%;padding-right:20" src="../../assets/icon2.png">
      </x-input>
    </group>
    <x-button type="primary" text="登录" @click.native="login" style="width:80%;background-color:#2c8def;margin:10% 20% 20% 10%;box-shadow: 3px 3px 3px #b3d7fa,-3px 3px 3px #b3d7fa;font-family:Microsoft YaHei;font-size:18px;"></x-button>
    <!-- <Button type="primary" long size="large" @click.native="login">登录</Button> -->
    <div>
      
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import util from '@/libs/util';
import cAPI from "@/libs/cordovaAPI";

import {
  XImg
} from 'vux'
export default {
  computed: {},
  components: {
    XImg
  },
  data() {
    return {
      errorinfo: '',
      showPositionValue: false,
      from: {
        user: undefined,
        password: undefined
      }
    }
  },
  methods: {
    login() {
    cAPI.capture();
      let userName = this.from.user
      let password = this.from.password
      util
        .post("login", {
          userName,
          password,
          type: 2
        })
        .then(response => {
          if(!response.data.success){
              this.showPositionValue = !response.data.success;
              this.errorinfo = response.data.msg;
          }
          localStorage.setItem('user', response.data.map.employee.employeeName);
          localStorage.setItem('tel', response.data.map.employee.tel);
          localStorage.setItem('employeeId', response.data.map.employee.employeeId);
          localStorage.setItem('employeeName', response.data.map.employee.employeeName);
          localStorage.setItem('deptName', response.data.map.employeePost.deptName);
          localStorage.setItem('employeeNO', response.data.map.employeePost.employeeNO);
          localStorage.setItem('postName', response.data.map.employeePost.postName);
          localStorage.setItem('login', 1);
          localStorage.setItem('powerList', JSON.stringify(response.data.map.initMenuData));
          localStorage.setItem('fileServerPath', response.data.map.fileServerPath);
          localStorage.setItem('firstLogin', response.data.map.employee.firstLogin);
          this.$store.dispatch('setPower', JSON.stringify(response.data.map.initMenuData));
          this.$router.push({
            name: 'index'
          });
        })
        .catch(error => {});
    }
  }
}

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
.weui-cells:after {
  border: 1px solid #e2e2e2 !important;
}
.weui-cell:before {
  border: 1px solid #ffffff !important;
}
</style>
