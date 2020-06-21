<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
      <el-menu
      style="float:left"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />      
      </el-menu>
      <!-- <div class="bar-set">
      <a href="#" class=""><li role="menuitem" tabindex="-1" class="el-menu-item submenu-title-noDropdown" style="padding-left: 20px; color: rgb(191, 203, 217);"><span>设置</span></li></a>
      <a href="#" class=""><li role="menuitem" tabindex="-1" class="el-menu-item submenu-title-noDropdown" style="padding-left: 20px; color: rgb(191, 203, 217);"><span>账号</span></li></a>
      <a href="#" class="" @click="moreShow=!moreShow" ><li role="menuitem"  class="el-menu-item submenu-title-noDropdown" style="padding-left: 20px; color: rgb(191, 203, 217);"><span>更多</span><i class="el-icon-arrow-down" style="color: rgb(191, 203, 217);"></i></li></a>
      </div>
    <moreDropdown :moreShow="moreShow"  ></moreDropdown> -->
    <div class="bar-set">
       <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
       <moreDropdown   ></moreDropdown>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import moreDropdown from './moreDropdown'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo,moreDropdown },
  data(){
    return{
      moreShow:false
    }
  },
  methods:{
    leaveHide(){
      this.moreShow=false
      console.log("离开了")
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style  scoped>
.bar-set{
      float: right;
    margin-right: 5%;
}
  .bar-set a{
    
    width: auto!important;
   
  }
</style>