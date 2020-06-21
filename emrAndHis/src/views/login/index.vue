<template>
  <div class="login-container">
    <div class="backBox">
      <div class="doctorImg"></div>
      <div class="leftSpriteImg"></div>
      <div class="rightSpriteImg"></div>
      <div class="bottomSpriteImg"></div>
    </div>
    <!-- <h3 class="title">
      {{ $t('login.title') }}
    </h3>-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
        <!-- <h3 class="title">{{ $t('login.title') }}</h3> -->
        <!-- <lang-select class="set-language" /> -->
      </div>

      <div class="formBox">
        <el-form-item>
          <label for="username">用户</label>
          <el-input class="username" type="text" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item>
          <label for="password">密码</label>
          <el-input class="password" type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
          <label for="region">区域</label>
          <el-input class="region" type="text" />
        </el-form-item>
        <el-form-item>
          <label for="department">科室</label>
          <el-input class="department" type="text" />
          <!-- <el-select v-model="value" placeholder="请选择">
          </el-select> -->
          <i class="downIcon"></i>
        </el-form-item>
        <el-button type="primary" style="width:35.556%;margin-left: 58px;margin-right: 50px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        <el-button type="primary" style="width:35.556%;">重置</el-button>
        <!-- <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item> -->

        <!-- <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip> -->
<!-- width:50%; -->
        <!-- <el-button
          :loading="loading"
          type="primary"
          style="width:35.556%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >{{ $t('login.logIn') }}</el-button> -->

        <!-- <div style="position:relative">
          <div class="tips">
            <span>{{ $t('login.username') }} : admin</span>
            <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
          </div>
          <div class="tips">
            <span style="margin-right:18px;">{{ $t('login.username') }} : editor</span>
            <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
          </div>

          <el-button
            class="thirdparty-button"
            type="primary"
            @click="showDialog=true"
          >{{ $t('login.thirdparty') }}</el-button>
        </div> -->
      </div>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
    <iframe
      name="frame"
      v-bind:src="hideSrc"
      style="width:0;height:0;display: none;"
      class="loginDownMq"
    ></iframe>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      hideSrc: null,
      title: "九信医院信息系统云平台"
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$downIcon: "~@/assets/login/back-icon4.png";

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  label{
    margin-right: 20px;
    font-size: 17px;
    font-weight: bold;
    text-shadow: 0px 3px 6px rgba(25,82,147,0.80);
    color: $light_gray;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #000;
      height: 40px;
      // caret-color: $cursor;
      caret-color: #000;
      background-color: $light_gray;
      border-radius: 4px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-button{
    padding: 12px 20px;
    background-image: linear-gradient(to bottom, #6FA6E3, #195293);
  }
  .downIcon{
    width: 15px;
    height: 13px;
    background: url($downIcon) no-repeat;
    background-position: center;
    background-size: cover;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 14px;
  }
  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
// $light_gray: #eee;
$light_gray: #FFF;
// $bgUrl: "~@/assets/login/backColor.png";
$doctorBgUrl: "~@/assets/login/back-icon3-min.png";
$leftSpriteImg: "~@/assets/login/back-icon1.1.png";
$bottomSpriteImg: "~@/assets/login/back-icon2.1.png";
$formBack: "~@/assets/login/backColor.png";

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: radial-gradient(circle, #92c5fd, #1e5ea5);
  overflow: hidden;
  position: relative;
  .backBox {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    .doctorImg {
      width: 100%;
      height: 100%;
      background: url($doctorBgUrl) no-repeat;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      // background-position: center;
      // background-size: cover;
    }
    .leftSpriteImg {
      width: 100%;
      height: 100%;
      background: url($leftSpriteImg) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: -64%;
      top: 0;
      z-index: 20;
      opacity: 0.4;
      // background-position:top left;
    }
    .rightSpriteImg {
      width: 100%;
      height: 100%;
      background: url($leftSpriteImg) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 20;
      opacity: 0.4;
    }
    .bottomSpriteImg {
      width: 100%;
      height: 100%;
      background: url($bottomSpriteImg) no-repeat;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 20;
      background-position: bottom;
      opacity: 0.4;
    }
  }
  .login-form {
    position: relative;
    width: 580px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    z-index: 30;
    top: 160px;
    .formBox{
      background: url($formBack) no-repeat;
      background-position: center;
      background-size: 100% 100%;
      padding: 65px 65px;
      text-align: center;
      // padding: 121px 65px;
      // width: 580px;
      // height: 514px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      // font-size: 26px;
      font-size: 40px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: 800;
      text-shadow: 0px 3px 6px rgba(45,80,137,0.77);
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  @media screen and (max-width: 515px) {
    .downIcon{
      right: 34px;
      top: 50px;
    }
  }
}
</style>
