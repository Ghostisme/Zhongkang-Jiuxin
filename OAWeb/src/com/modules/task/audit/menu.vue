/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<template>
  <div>
    <div class="page">
      <!-- 菜单栏 -->
      <div class="menu-main">
        <div class="menu-list" @click="wait">
          <img style="width:35px;height:35px;" src="@/assets/wait.png" />
          <p class="menu-txt">待我审批</p>
        </div>
        <div class="menu-list" @click="audit">
          <img style="height:35px;" src="@/assets/audit.png" />
          <p class="menu-txt">我已审批</p>
        </div>
        <div class="menu-list" @click="meSend">
          <img style="width:35px;height:35px;" src="@/assets/path.png" />
          <p class="menu-txt">我发起的</p>
        </div>
        <div class="menu-list" @click="sendMe">
          <img style="height:35px;" src="@/assets/Shape.png" />
          <p class="menu-txt">抄送我的</p>
        </div>
      </div>
      <!-- 出勤休假 -->
      <div class="main">
        <div class="main-menu">
          <div class="main-title">出勤休假</div>
          <div class="main-box">
            <div class="main-list" @click="leave">
              <img style="width:50px;height:50px;" src="@/assets/area-icon-1.png" />
              <p class="menu-txt" >请假</p>
            </div>
            <div class="main-list" @click="notCard">
              <img style="height:50px;" src="@/assets/area-icon-2.png" />
              <p class="menu-txt">未打卡说明</p>
            </div>
            <div class="main-list" @click="overtime">
              <img style="width:50px;height:50px;" src="@/assets/area-icon-3.png" />
              <p class="menu-txt">加班</p>
            </div>
            <div class="main-list" @click="goOut">
              <img style="width:50px;height:50px;" src="@/assets/area-icon-4.png" />
              <p class="menu-txt">外出</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  mounted(){
    // localStorage.setItem("test","测试")
  },
  methods: {
    //   待我审批
    wait() {
        console.log("待我审批")
        this.$router.push({
        name: 'select',
        params: {
          index: 0,
          duration:80 //跳转页面取消下一个页面滑动动画
        }
      })
    },
    // 我已审批
    audit() {
        console.log("我已审批")
        this.$router.push({
        name: 'select',
        params: {
          index: 1,
          duration:80
        }
      })
    },
    //   我发起的
    meSend() {
        console.log("我发起的")
        this.$router.push({
        name: 'select',
        params: {
          index: 2,
          duration:80
        }
      })
    },
    //   抄送我的
    sendMe() {
        console.log("抄送我的")
        this.$router.push({
        name: 'select',
        params: {
          index: 3,
          duration:80
        }
      })
    },
    // 请假
    leave(){
         this.$router.push({ path:'/leaveMain'})
         console.log("请假")
         this.clearStorage()
    },
    // 未打卡
    notCard(){
         console.log("未打卡")
    },
    // 加班
    overtime(){
         console.log("加班")
    },
    // 外出
    goOut(){
         console.log("外出")
    },
     //清除存储
    clearStorage() {
      localStorage.removeItem("holidayTxt");
      localStorage.removeItem("startTime");
      localStorage.removeItem("endTime");
      localStorage.removeItem("urgency");
      localStorage.removeItem("value4");
      localStorage.removeItem("value5");
      localStorage.removeItem("areaTxt");
      localStorage.removeItem("processTxt");
      localStorage.removeItem("fileList2");
      localStorage.removeItem("editData");
      localStorage.removeItem("personList");
      localStorage.removeItem("fileList");
      localStorage.removeItem("sendJson");
    }
  }
};
</script>
<style  scoped>
.vux-header {
  padding: 0px !important;
}
.menu-main {
  display: flex;
  justify-content: space-between;
  padding: 30px;
}
.menu-list {
  width: 50px;
  height: 60px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.menu-txt {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #666666;
  white-space:nowrap;
}
.main {
  padding: 0 16px;
}
.main-menu {
  width: 100%;
  height: 157px;
  background: #fff;
  box-shadow: 0px 3px 15px 0px rgba(229, 231, 232, 1);
  border-radius: 10px;
}
.main-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
}
.main-title {
  padding: 20px 0 0 15px;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333;
}
.main-list {
  width: 65px;
  height: 76px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

</style>