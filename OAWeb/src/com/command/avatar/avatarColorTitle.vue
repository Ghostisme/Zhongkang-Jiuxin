<template>
  <div class="center" :style="{width: width+'px',height: height + 'px'}">{{title_name}}</div>
</template>
<script>
export default {
  props: ["title", "width", "height"],
  data() {
    return {
      title_name: ""
    };
  },
  created() {
    this.title_name = this.title.substring(
      this.title.length - 2,
      this.title.length
    );
  }
};
</script>
<style>
.center {
  text-align: center;
  color: #fff;
  background-color: #2d8cf0;
  border-radius: 50%;
  font-size: 13px;
  text-align: center;
  line-height: 36px;
}
</style>


