<template>
  <div>
    <!--<a-button class="editable-add-btn" @click="handleAdd">Add</a-button>-->
    <a-table bordered :alertdataSource="alertdataSource" :columns="columns" :rowSelection="rowSelection">

    </a-table>
  </div>
</template>
<script>
  import EditableCell from './EditableCell'
  import unEditableCell from './unEditableCell'
  /*
  * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
  */
  export default {
    components: {
      EditableCell,
      unEditableCell
    },
    props: {
      DiagTableHead: Array,
      DiagDefalutTable: Object,
      DiagTbodyData: Array,
//      contactsPromise: Promise // or any other constructor
    },
    data () {
      console.log(this.DiagDefalutTable);
      return {
        alertdataSource: this.DiagTbodyData,
        count: 2,
        clickDomIndex:0,
        columns:this.DiagTableHead,
      }
    },
    methods: {
      onCellChange (key, dataIndex, value) {
        const alertdataSource = [...this.alertdataSource]

        const target = alertdataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.alertdataSource = alertdataSource
        }
      },

      onNoEditCellChange (key, dataIndex, value) {
        const alertdataSource = [...this.alertdataSource]

        const target = alertdataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.alertdataSource = alertdataSource
        }
      },
      onDelete (key) {
        const alertdataSource = [...this.alertdataSource]
        this.alertdataSource = alertdataSource.filter(item => item.key !== key)
      },
      handleAdd () {

        // if(this.alertdataSource.length>0&&this.alertdataSource.length!=undefined){
        const { count, alertdataSource } = this
        const newData = {
          key: count,
          checkBox:'',
          customcode:'20190927',
          diag: this.DiagDefalutTable.diag,
          memo: this.DiagDefalutTable.memo,
        }
        this.alertdataSource = [...alertdataSource, newData]
        this.count = count + 1
        //}
      },
      checkboxOnChange(e){
        console.log(`checked = ${e.target.checked}`)
      },
      tabIndex(target,nodeList){
        for(let i=0;i<nodeList.length;i++){
          if(target===nodeList[i].querySelector(".editable-cell-text-wrapper")){
            return i;
          }
        }
      },
      jumpNextDom(){

      }
    },
    computed: {
      rowSelection() {
        const { selectedRowKeys } = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.rowMain === 'Disabled User', // Column configuration not to be checked
              name: record.rowMain,
            }
          }),
        }
      }
    },
    created:function () {
      this.handleAdd ();
    },
    mounted(){
      let _this=this;
      //事件委托
      console.log(document.querySelectorAll(".editable-cell-text-wrapper"));
      document.querySelector(".editable-cell-text-wrapper").addEventListener("click",function(e){
        let target=e.target;//事件发生的元素

        let nodeList=e.target.parentNode.parentNode.parentNode.children;//同级元素集合
        console.log(nodeList.length);
        let targetIndex=_this.tabIndex(target,nodeList);//调用tabIndex方法，返回值便是元素下标
        if(targetIndex+1<=nodeList.length){
          _this.clickDomIndex=targetIndex+1;
        }
        //console.log(_this.clickDomIndex)//打印当前点击元素的下标
      })

      document.querySelector(".editable-cell-text-wrapper").addEventListener("keydown",function(e){
        var key = window.event.keyCode;
        if (key == 13) {
          let target=e.target;//事件发生的元素

          let nodeList=e.target.parentNode.parentNode.parentNode.children;//同级元素集合
          console.log(nodeList.length);
          let targetIndex=_this.tabIndex(target,nodeList);//调用tabIndex方法，返回值便是元素下标
          if(targetIndex+1<=nodeList.length){
            _this.clickDomIndex=targetIndex+1;
          }
          console.log(_this.clickDomIndex)//打印当前点击元素的下标
          e.target.parentNode.parentNode.parentNode.nextSibling.querySelector(".editable-cell-text-wrapper").click();
        }
      })
    },
  }
</script>
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
  /*自定义表格样式*/
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
    padding:0px;
    height:26px;
  }
  .editable-cell-text-wrapper{
    padding:0px;
    height:26px;
  }
  .ant-table-bordered .ant-table-thead > tr > th{
    background: linear-gradient(to bottom, rgba(124, 164, 204, 1), rgba(53, 99, 146, 1));
    text-align: center;
    color: #fff;
    font-size:14px;
  }
  .ant-table-bordered .ant-table-tbody > tr > td{
    background:#99B6E6;
    font-size:14px;
    color: #fff;
  }
  .ant-table-bordered .ant-table-tbody > tr > td:first-child{
    text-align: center;
  }
  .ant-table-pagination.ant-pagination{
    display: none;
  }
</style>

