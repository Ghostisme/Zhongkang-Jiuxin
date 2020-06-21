<template>
  <div class="editable-cell">
    <div
      v-if="editable"
      class="editable-cell-input-wrapper"
    >
      <a-input
        :value="value"
        @change="handleChange"
        @pressEnter="check"
        @blur="checkBlur"
        ref="tagInput"
        v-focus="true"
      />
    </div>
    <div
      v-else
      class="editable-cell-text-wrapper" @click="edit"ref="nullVal"
    >
      {{ value || ' ' }}
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  const nocText = 1;
  const pageDom=0;
  const domArr=[];
  const defaultVal=0;

  export default {
    nocText,
    pageDom,
    domArr,
    event: null,
    props: {
      text: String,
    },
    data() {
      if(this.text==''||this.text==null){
        this.nocText = 0;
      }
      return {
        value: this.text,
        editable: false,
        domArr,
        defaultVal,
      };
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
//          console.log(el,{value})
          if (value) {
            el.focus();
          }
        }
      }
    },
    methods: {
      handleChange(e) {
        const value = e.target.value;
//        if(value!=""&&value!=null){
          this.value = value;
        let inframTable = document.querySelector(".inframTable");
        inframTable.style.display = "block";
//        }else{
//          this.value = this.defaultVal;
//        }
        let trArr = $(".inframTable").find("tbody").find("tr");
        for(let i = 0; i < trArr.length; i++){
          if($(trArr[i]).attr("class").indexOf("active") != -1){
            $(trArr[i]).removeClass("active");
          }else{
            $(trArr[0]).addClass("active");
            document.dispatchEvent(this.event);
          }
        }
        this.currentLine=window.event.srcElement.parentElement.parentElement.parentElement.parentElement.rowIndex;
        console.log($(".diagnoseWidth td").css("height"));
        let tdHeight=parseFloat($(".diagnoseWidth td").css("height"));
        this.currentLine<4?$(".inframTable").css("top",(parseInt(this.currentLine))*tdHeight+120+"px"):$(".inframTable").css("top",4*tdHeight+120+"px");
      },
      check(e) {
        this.editable = false;
        //this.$emit('change', this.value);
        this.nocText = 1;
        if(e.target.value!=""){

          if($(".inframTable").css("display")=="block"){
            e.target.value=$($(".inframTable tbody .active").find("td")[1]).text();
            this.defaultVal = e.target.value;
          }
        }
        let inframTable = document.querySelector(".inframTable");
        inframTable.style.display = "none";
        this.$emit('nextDiv');//调用方法
//        console.log(this.$refs.tagInput);
//        if(this.$refs.tagInput==undefined){
//          this.addDiv();
//        }
        let target=e.target;//事件发生的元素

        let nodeList=e.target.parentNode.parentNode.parentNode.children;//同级元素集合
        console.log(nodeList.length);
        let targetIndex=this.tabIndex(target,nodeList);//调用tabIndex方法，返回值便是元素下标
        if(targetIndex+1<=nodeList.length){
          this.clickDomIndex=targetIndex+1;
        }
        console.log(this.clickDomIndex)//打印当前点击元素的下标
        e.target.parentNode.parentNode.parentNode.nextSibling.querySelector(".editable-cell-text-wrapper").click();

      },
      checkBlur(e){
        this.editable = false;
        const value = e.target.value;
        console.log(e.target);
        this.value = this.defaultVal;
        //this.$emit('change', this.value);
//        let inframTable = document.querySelector(".inframTable");
//        inframTable.style.display = "none";
      },
      tabIndex(target,nodeList){
        for(let i=0;i<nodeList.length;i++){
          if(target===nodeList[i].querySelector(".editable-cell-text-wrapper")){
            return i;
          }
        }
      },
      edit(e) {
        this.editable = true;
        this.defaultVal=e.target.innerText;
        this.$emit('clickDiv');
        let target=e.target;//事件发生的元素
        let nodeList=e.target.parentNode.parentNode.parentNode.children;//同级元素集合
//        console.log(nodeList.length);
        let targetIndex=this.tabIndex(target,nodeList);//调用tabIndex方法，返回值便是元素下标
        if(targetIndex+1<=nodeList.length){
          this.clickDomIndex=targetIndex+1;
        }
//        console.log(this.clickDomIndex)//打印当前点击元素的下标
      },
      addDiv() {
        console.log(this.$refs.nullVal);
        console.log($(".highlight").find(".editable-cell-text-wrapper"))
        if($(".highlight").find(".editable-cell-text-wrapper").length>0){
          $(".highlight").find(".editable-cell-text-wrapper").click();
        }
        if(this.$refs.nullVal==undefined){
          this.$emit('handleAdd');//调用方法
        }else{
          if(this.$refs.nullVal.innerText!=""){
            this.$emit('handleAdd');//调用方法
          }
        }
      },

      traverse(array) {
        array.forEach(item => {
          //console.log(item);
        })
      }
    },
    created:function(){
        var lett = this;
        document.onkeydown = function(e) {
          var key = window.event.keyCode;
            if (key == 13) {
              if(lett.$refs.tagInput==undefined||e.target.value.replace(/\s/g,"")!=""){
                lett.addDiv();
              }
          }
        }
      this.event = new CustomEvent('myEvent', {"detail": 0});

    },
    mounted(){
      var lett = this;
      $(".inframTable tbody").on("click","tr",function(){
        console.log($($(this).find("td")[1]).text());
          lett.$refs.tagInput.value=$($(this).find("td")[1]).text();
      });
    }
  };
</script>
<style>
  .ant-input{
    height: 26px !important;
  }
</style>
