<template>
  <div>这是一个页面</div>
</template>
<script>
  export default {
    name: 'jumpmiddlePage',
    mounted () {
      console.log('sss');
      this.$router.push('/index')
//      window.top.document.getElementById('jumpToOcxBtn').click();
    },
    methods: {

    }
  }
//  console.log(parent.document.getElementById("jumpToOcxBtn"));
//  window.top.document.getElementById('jumpToOcxBtn').click();
</script>
