<template>
  <div class="alertDiagTitle">
    <!--体内有无金属植物-->
    <div class="alertDiagTop">
      <a-form-item label="调用类别">
        <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1">医生</a-radio>
          <a-radio :value="2">科室</a-radio>
          <a-radio :value="3">全院</a-radio>
        </a-radio-group>
      </a-form-item>
    </div>

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
.alertDiagTop{
  width:100%;
  height: 50px;
}
</style>
