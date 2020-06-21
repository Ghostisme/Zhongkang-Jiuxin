<template>
  <div class="ks_alert">
    <div class="ks_header" @mousedown="drag">
      <!-- <slot name="headerText"></slot> -->
      <!-- <blog-post post-title="hello!"></blog-post> -->
      <span class="headerText">{{ headerText }}</span>
      <a-icon class="closeBtn" type="close" @click="closeEvent" />
    </div>
    <div class="ks_content">
      <div class="ks_topBox">
        <slot name="ksTopBox"></slot>
      </div>
      <div class="ks_bottomBox">
        <slot name="ksBottomBox"></slot>
      </div>
    </div>
    <div class="ks_footer">
      <div class="ksFooterBoxCancel"@click="closeEvent">关闭</div>
      <slot name="ksFooterBox"></slot>
    </div>
  </div>
</template>

<script>
  import util from "@/libs/util";
  export default {

    props: {
      headerText: String,
    },
    data () {
      return {
        counter: this.headerText
      }
    },
    methods: {
      closeEvent() {
//        console.log(this);
//        let oDepartment = document.querySelector(".department");
//        oDepartment.style.display = "none";
//        let oSpecimen = document.querySelector(".specimen");
//        oSpecimen.style.display = "none";
        util.close(".department");
        util.close(".specimen");        
      },
      drag(e){
        let oDiv = this.$el;
        let top = oDiv.offsetTop;
        let left = oDiv.offsetLeft;
        //起点
        let originX = e.clientX;
        let originY = e.clientY;
        console.log("鼠标按下拖拽事件",this);
         this.$el.onmousemove = (e) => {
            let endX = e.clientX;
            let endY = e.clientY;
            //X轴、Y轴移动距离
            let distanceX = endX - originX;
            let distanceY = endY - originY;
            oDiv.style.left = (left + distanceX) + "px";
            oDiv.style.top = (top + distanceY) + "px";
         }
         this.$el.onmouseup = (e) => {
           this.$el.onmousemove = null;
         }
      },
    }
  }
</script>

<style>
  .ks_alert{
    width: inherit;
    height: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #7fb3f0;
    /*border-radius: 6px;*/
    padding: 3px;
    padding-bottom: 0px;
  }
  .ks_header{
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #6d96c6;
    padding-left: 10px;
  }
  .closeBtn{
    line-height: 30px;
  }
  .ksFooterBoxCancel{
    width: 89px;
    height: 100%;
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    border-radius: 3px;
    margin-right: 3px;
    padding: 0px 20px;
    cursor: pointer;
    float: right;
    text-align: center;
  }
  .ks_content{
    background-color: #FFF;
    /*弹窗内容高?*/
    height: 88.5%;
  }
  .ks_topBox{
    padding: 3px;
  }
  .ks_footer{
    /*display: flex;*/
    color: #fff;
    /*justify-content: space-between;*/
    padding: 3px;
    line-height: 32px;
    /*line-height: 26px;*/
    background: #809EB7;
    overflow: hidden;
    /*弹窗底部高?*/
   	height: 6%;
    /*height: 32px;*/
  }
  .ks_bottomBox{
    padding: 2px;
  }
</style>
