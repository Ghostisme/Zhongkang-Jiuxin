<!-- 检验检查项目的弹窗底部 -->
<template>
  <div class="footerBox">
    <span class="footerText">{{ footerText }}</span>
    <a-button-group>
      <a-button class="btn" type="primary" @click="sumbitEvent">确定</a-button>
      <a-button class="btn" type="primary" @click="closeEvent">关闭</a-button>
    </a-button-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        footerText: "双击可快速带回"
      }
    },
    methods: {
      closeEvent() {
        console.log(this);
        // let oDepartment = document.querySelector(".department");
        // oDepartment.style.display = "none";
        // let oSpecimen = document.querySelector(".specimen");
        // oSpecimen.style.display = "none";
        // let oApplication = document.querySelector(".application");
        // oApplication.style.display = "none";
      },
      sumbitEvent() {
        console.log("确定按钮点击事件",this);
      },
    }
  }
</script>

<style>
  .btn{
    width: 89px;
    height: 21px;
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    border-radius: 3px;
    margin-right: 3px;
  }
</style>
