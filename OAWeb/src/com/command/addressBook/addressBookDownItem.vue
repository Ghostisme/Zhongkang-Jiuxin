<template>
  <div class="bgcolor_white title_h18">  <!--去掉了vux-cell-box weui-cell-->
    <cell-box @click.native="onClick" :style="{ marginLeft: mLeft*55 + 'px', left: '15px', paddingLeft: '0px' }">
      <avatarImg :url="'@/assets/736_07.png'" :width="44" :height="44"/>
      <span style="margin-left: 10px">{{tabName}}</span>
    </cell-box>
    <template v-if="showContent">
      <component
        v-for="(item, index) in children"
        :key="index"
        :is="item.children.length==0?'addressBookItem':'addressBookDownItem'"
        :address="item"
        :margin_index="mLeft+1"
        @addressNodeVal="addressNodeVal"
      ></component>
    </template>
  </div>
</template>
<script>
import addressBookItem from "@/com/command/addressBook/addressBookItem";
import addressBookDownItem from "@/com/command/addressBook/addressBookDownItem";

export default {
  components: {
    addressBookItem,
    addressBookDownItem
  },
  props: ["address","margin_index"],
  watch: {
    address(newV, oldV) {
      this.data = newV;
    }
  },
  methods: {
    onClick(e) {
      this.showContent = !this.showContent;
    },
    addressNodeVal(data){

    }
  },
  data() {
    return {
      data: null,
      tabName: "",
      showContent: false,
      idCell: "",
      children: [],
      mLeft: 0
    };
  },
  created() {
    this.mLeft = this.margin_index;
    this.tabName = this.address.text;
    this.children = this.address.children;
  }
};
</script>
<style>
</style>

