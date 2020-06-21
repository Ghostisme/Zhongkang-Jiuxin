<template>
  <div>
    <!--<a-button class="editable-add-btn" @click="handleAdd">Add</a-button>-->
    <a-table bordered :dataSource="dataSource" :columns="columns"class="textTable" >
      <a slot="name" slot-scope="text" href="javascript:;">{{recordrowMain}}</a>
      <template slot="checkBox" slot-scope="text, record">
        <a-checkbox @change="checkboxOnChange"></a-checkbox>
      </template>
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"@handleAdd="handleAdd"@nextDiv="jumpNextDom(record.key, 'name', $event)"ref="childTd"/>
      </template>

      <template slot="memo" slot-scope="text, record">
        <unEditableCell :text="text" @change="onNoEditCellChange(record.key, 'memo', $event)"/>
      </template>
    </a-table>
    <IframTable style="width: 623px;position: absolute;left:6.5%;background: rgb(215, 223, 232);border-radius: 2px;padding: 1px 2px;z-index: 2;"></IframTable>

  </div>
</template>
<script>
  import EditableCell from './EditableCell'
  import unEditableCell from './unEditableCell'
  import IframTable from '@/com/command/checkl_inframTable/inframTable.vue'
  import $ from 'jquery'
  /*
  * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
  */
  const currentLine = -1;
  const currentCol = -1;
  export default {
    currentLine,
    currentCol,
    components: {
      EditableCell,
      unEditableCell,
      IframTable
    },
    props: {
      tableHead: Array,
      defalutTable: Object,
      tbodyData: Array,
//      contactsPromise: Promise // or any other constructor
    },
    data () {
      console.log(this.defalutTable.doctor);
      return {
        dataSource: this.tbodyData,
        count: 2,
        clickDomIndex:0,
        columns:this.tableHead,
      }
    },
    methods: {
      onCellChange (key, dataIndex, value) {
        const dataSource = [...this.dataSource]

        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
      },

      onNoEditCellChange (key, dataIndex, value) {
        const dataSource = [...this.dataSource]

        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
      },
      onDelete (key) {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
      },
      handleAdd () {

       // if(this.dataSource.length>0&&this.dataSource.length!=undefined){
          const { count, dataSource } = this
          const newData = {
            key: count,
            checkBox:'',
            diag: this.defalutTable.diag,
            memo: this.defalutTable.memo,
            doctor: this.defalutTable.doctor,
            startTime:this.defalutTable.startTime
          }
          this.dataSource = [...dataSource, newData]
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
      selectTD(){
        if(window.event.srcElement.parentElement.tagName=="TR"){
          this.currentLine=window.event.srcElement.parentElement.rowIndex;
          this.currentCol=window.event.srcElement.cellIndex;
        }else if(window.event.srcElement.className=="ant-checkbox"||window.event.srcElement.className=="editable-cell-text-wrapper"){
          this.currentLine=window.event.srcElement.parentElement.parentElement.parentElement.rowIndex;
          this.currentCol=window.event.srcElement.parentElement.parentElement.cellIndex;
        }else if(window.event.srcElement.className=="ant-checkbox-input"||window.event.srcElement.className=="ant-checkbox-inner"){
          this.currentLine=window.event.srcElement.parentElement.parentElement.parentElement.parentElement.rowIndex;
          this.currentCol=window.event.srcElement.parentElement.parentElement.parentElement.cellIndex;
        }
        this.changeItem();
      },//选择的td
      changeItem(){
        if(document.all)
          var it = document.getElementsByTagName("table")[0].children[0];
        else
          var it = document.getElementsByTagName("table")[0];
        for(let i=0;i<it.rows.length;i++)
        {
          let cells = it.rows.item(i).cells;
          it.rows.item(i).className = "";
          for(let k=0;k<cells.length;k++){
            cells[k].className = "";
//		console.log(it.rows.item(i).cells[k]);
          }
//  it.rows[i].className = "";
        }
        let cellCols=it.rows.item(0).cells;
        if(this.currentLine < 0)
          this.currentLine = it.rows.length - 1;
        if(this.currentLine == it.rows.length)
          this.currentLine = 0;
        if(this.currentCol < 0)
          this.currentCol = cellCols.length - 1;
        if(this.currentCol == cellCols.length)
          this.currentCol = 0;
        console.log(this.currentLine);
        it.rows.item(this.currentLine).className = "chosedHightLight";
        it.rows.item(this.currentLine).cells[this.currentCol].className = "highlight";
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
        $(document).on("click",".textTable td",function(e){
          _this.selectTD();
        })
      $(document).on("click",".ant-checkbox-wrapper",function(e){
        _this.selectTD();
      })
//      $(document).unbind("keydown");
      document.addEventListener("keydown",function(e){
        if($(".inframTable").css("display")=="none"&&window.event.srcElement.className!="ant-tabs-bar ant-tabs-top-bar ant-tabs-card-bar"&&window.event.srcElement.className!="ant-input"&&window.event.srcElement.className!="ant-table-row ant-table-row-level-0"){
          var key = window.event.keyCode;
          console.log(window.event.srcElement.className);
          switch(e.keyCode)
          {
            case 38:
              e.preventDefault();
              e.stopPropagation();
              _this.currentLine--;
              _this.changeItem();
              break;
            case 40:
              e.preventDefault();
              e.stopPropagation();
              _this.currentLine++;
              _this.changeItem();
              break;
            case 37: //左
              e.preventDefault();
              e.stopPropagation();
              _this.currentCol--;
              _this.changeItem();
              break;
            case 39: //右
              e.preventDefault();
              e.stopPropagation();
              _this.currentCol++;
              _this.changeItem();
              break;
          }
        }

      })
    },
  }
</script>
<style>
  .ant-table-bordered .ant-table-tbody tr td.highlight {
    border:1px dotted #08246B!important;
  }
  .IframeBox{
    position: absolute;
    top:0px;
    left:10px;
    z-index: 2;
  }
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
  .ant-table-bordered .ant-table-tbody > tr.chosedHightLight{
    background:#99B6E6 !important;
  }
  .ant-table-bordered .ant-table-tbody > tr> td{
       background:transparent !important;
       font-size:14px;
       color: #000 !important;
  }
  .ant-table-bordered .ant-table-tbody > tr > td:first-child{
    text-align: center;
  }
  .ant-table-pagination.ant-pagination{
    display: none;
  }
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td{
    background: #fff;
    color: #000;
  }
</style>

