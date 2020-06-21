<!-- 检验检查项目弹窗内容区域的顶部 -->
<template>
  <div class="alertTableTop">
    <span class="contentText">{{ contentText }}</span>
    <a-select
        showSearch
        optionFilterProp="children"
        style="width: 200px"
      >
      <!--
      placeholder="Select a person"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :filterOption="filterOption" -->
        <a-select-option value="内科病房">内科病房</a-select-option>
        <a-select-option value="放射科">放射科</a-select-option>
      </a-select>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        contentText: "执行科室"
      }
    }
  }

</script>

<style>
</style>
