<template>
  <div id="app">
    <router-view />
    <!--<object classid="clsid:9BD6DD4F-3784-4C6D-A83A-4B9CA9FF4510" id="preview" width="100%" height="100%"  name="preview" ></object>-->
  </div>

</template>

<script>
export default {
  name: 'App',
//  mounted () {
//    let ocxobj = document.getElementsByTagName('object')
//    ocxobj.attachEvent('GetFileName',this.callBack)
//    console.log(document.getElementsByTagName('object'));
//  },
//  methods: {
//    callBack (){
//      console.log('ocx事件')
//    }
//  },
}
</script>
