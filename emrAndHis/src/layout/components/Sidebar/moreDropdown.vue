<template>
    <div class="moreDrop"   >
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
        text-color="rgb(191, 203, 217)"
       mode="horizontal"
      @close="handleClose">
      
      <el-submenu index="1">
      <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
        <template slot="title">
          <span>设置</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
           <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
           <el-menu-item index="1-4-2">选项2</el-menu-item>
        </el-submenu>
      </el-submenu>
        <el-submenu index="2">
           <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
        <template slot="title">
          <span>账号</span>
        </template>
          <el-menu-item index="2-1" @click.native="logout">注销</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
       <el-submenu index="3">
          <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
        <template slot="title">
          <span>更多</span>
        </template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="3-4">
           <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
           <el-menu-item index="3-4-2">选项2</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    props:{
        moreShow:Boolean
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
    }
  }
</script>
<style>
   .moreDrop .el-menu{
         width: auto !important;
   }
   .moreDrop .el-submenu__title i {
     color: #BFCBD9!important;
   }
</style>