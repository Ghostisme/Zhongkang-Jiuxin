/*
 * 首页
 * @Author: mikey.jialuyang
 * @Date: 2019-09-19 15:32:12
 * @Last Modified by: jialuyang
 * @Last Modified time: 2019-09-20 10:03:49
 */
<template>
  
</template>
<script>

  import diagnosisF1 from '@/com/modules/diagnosis/diagnosisF1.vue'
  export default {
    data () {
      return {
      }
    },
    methods: {
      callback (key) {
        console.log(key)
      },
    },
    components: {
      'diagnosisF1': diagnosisF1  //将别名demo 变成 组件 Demo
    }
  }
</script>

<style>
  .model{
    background-color: rgba(235, 239, 243, .5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*display: none;*/
  }
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

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
  /*background:#FEE9BC ;*/
  background: linear-gradient(to bottom, #e68b2c, #ffc73c, #f6f6f4);
  color: #000;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
  line-height:30px;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container{
  height:30px;
}
  .ant-form-item-children input{
    height:20px;
  }
  .ant-tabs{
    overflow: visible;
  }
</style>
