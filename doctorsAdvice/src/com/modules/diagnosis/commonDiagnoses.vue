<template>
  <div class="ks_alert">

  </div>
</template>

<script>
  //  import reqwest from 'reqwest';
  // import ATable from '@/com/command/alert_table/alertTable.vue'
  // import AlertTableTop from '@/com/command/alert_content_top/alertContTop.vue'

  export default {
    
  }
</script>

<style>
  .ks_alert{
    width: 300px;
    height: 334px;
    position: absolute;
    top: calc(50% - 167px);
    left: calc(50% - 150px);
    background-color: #7fb3f0;
    border-radius: 6px;
    padding: 3px;
  }
  .ks_header{
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #6d96c6;
  }
  .closeBtn{
    line-height: 30px;
  }
  .ks_content{
    background-color: #FFF;
    height: 266px;
  }
  .ks_topBox{
    padding: 3px;
  }
  .ks_footer{
    display: flex;
    color: #fff;
    justify-content: space-between;
    padding: 3px;
    line-height: 32px;
  }
  .btn{
    width: 89px;
    height: 21px;
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    border-radius: 3px;
    margin-right: 3px;
  }
</style>
