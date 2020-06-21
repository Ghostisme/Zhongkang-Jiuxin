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

        ref="tagInput1"
        v-focus="true"
      />
    </div>
    <div
      v-else
      class="editable-cell-text-wrapper" @click="edit"ref="nullVal1"
    >
      {{ value || ' ' }}
    </div>
  </div>
</template>
<script>
  const nocText = 1;
  const pageDom=0;
  const domArr=[];
  export default {
    nocText,
    pageDom,
    domArr,
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
        this.value = value;
      },
      check() {
        this.editable = false;
        this.$emit('change', this.value);
        this.nocText = 1;
      },
      checkBlur(){
        this.editable = false;
        this.$emit('change', this.value);
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
        this.$emit('clickDiv');
        let target=e.target;//事件发生的元素
        let nodeList=e.target.parentNode.parentNode.parentNode.children;//同级元素集合
        console.log(nodeList.length);
        let targetIndex=this.tabIndex(target,nodeList);//调用tabIndex方法，返回值便是元素下标
        if(targetIndex+1<=nodeList.length){
          this.clickDomIndex=targetIndex+1;
        }
        console.log(this.clickDomIndex)//打印当前点击元素的下标
      },
      addDiv() {
        const xx= document.getElementsByClassName("ant-table-row-indent").length;
        const yy= document.getElementsByClassName("editable-cell-text-wrapper").length;
        //const editText=document.getElementsByClassName("editable-cell-text-wrapper");
        const yyInput= document.getElementsByClassName("ant-input").length;
        if(this.$refs.nullVal1==undefined){
          this.$emit('handleAdd');//调用方法
        }else{
          if(this.$refs.nullVal1.innerText!=""){
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
    mounted:function () {
//      const editText=this.$refs.nullVal.innerText;
//      this.domArr.push(editText);
    }
  };
</script>
