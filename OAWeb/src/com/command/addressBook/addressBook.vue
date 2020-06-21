<template>
  <div>
    <component :is="currentView" :address="address" :margin_index="margin_index" @addressNodeVal="addressNodeVal"></component>
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
  props: {
    departmentList: Object
  },
  computed: {
    currentView() {
      return this.returnItem;
    }
  },
  methods: {
    addressNodeVal(data) {
    }
  },
  watch: {
    departmentList(newV, oldV) {
      this.returnItem = "addressBookDownItem";
      this.address = newV.deptTree;
    }
  },
  data() {
    return {
      margin_index: 0,
      returnItem: "",
      address: null,
      isDownItem: false,
      isItem: false
    };
  },
  wacth: {},
  created() {}
};
</script>
<style>
</style>
