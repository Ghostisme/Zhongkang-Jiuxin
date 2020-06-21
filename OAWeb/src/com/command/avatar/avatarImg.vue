<template>
  <div>
    <blur :blur-amount="0" :url="''" :style="{width: width+'px',height: height + 'px'}">
      <img :src="avatar" :style="{width: width+'px',height: height + 'px'}">
    </blur>
  </div>
</template>
<script>
export default {
  props: ["url", "width", "height"],
  data() {
    return {
      avatar: "@/assets/default.png"
    }
  },
  created() {
    if(this.url == "@/assets/736_07.png"){
      this.avatar = require("@/assets/736_07.png");
    }else if(this.url == "@/assets/652_03.png"){
      this.avatar = require("@/assets/652_03.png");
    }else{
      this.avatar = require("@/assets/default.png");
    }
  }
};
</script>
<style>
.center {
  text-align: center;
  color: #fff;
  font-size: 18px;
}
.center img {
  border-radius: 50%;
}
</style>


