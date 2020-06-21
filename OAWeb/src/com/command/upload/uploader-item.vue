<template>
<li style="display:inline-block">
  <!-- <li data-v-4acb4ad2="" class="weui-uploader__file" :style="style"> -->
    <img v-if="type=='img'" :src="backgroundImage" style="width:100px;height:100px;">
    <audio v-if="type=='audio'" :src="backgroundImage" controls style="height:50px;">您的浏览器不支持播放音频</audio>
    <video v-if="type=='video'" :src="backgroundImage" controls style="height:200px;">您的浏览器不支持播放视频</video>
  <!-- </li> -->
  </li>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: ''
    },
    type:{
      type: String,
      default: 'img'
    }
  },
  computed: {
    // style () {
    //   return {
    //     backgroundImage: `url(${this.backgroundImage})`
    //   }
    // }
  }
}
</script>
