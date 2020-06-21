<!-- 检验检查申请单 -->
<template>
  <!-- inspectionInspection -->

  <div class="checklBox">
    <div class="applyBtnBox">
      <a-button class="editable-add-btn" @click="applyAdd">申请单</a-button>
    </div>
    <div class="tableBox">
      <div class="topBox">

        <!-- <a-button class="editable-add-btn" @click="noticeAdd">通知单</a-button> -->
        <page-table class="pageTable" :dataSourceQu="dataSource" :hisData="column" @handleAdd="handleAdd" :pageKey="pagekey"></page-table>
        <!--<page-table class="pageTable" :dataSource="dataSource" :hisData="column" :customRow="customRow"></page-table>-->
      </div>
      <div class="lineBox" @mousedown="lineDrag"></div>
      <div class="bottomBox">
        <a-table bordered :dataSource="dataSource1" :columns="columns1" :pagination="false">
          <!-- <template slot="name" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
          </template> -->
          <!-- <template slot="operation" slot-scope="text, record">
            <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)"><a href="javascript:;">Delete</a></a-popconfirm>
          </template> -->
          <!-- <template slot="checkbox" slot-scope="text, record">
            <a-checkbox @change="onChange1"></a-checkbox>
          </template> -->
        </a-table>
      </div>
      <!--<IframTable style="width: 623px;position: absolute;left: 0;top: 93px;background: rgb(215, 223, 232);border-radius: 2px;padding: 1px 2px;"></IframTable>-->
      <IframTable></IframTable>
      <div class="department">
        <div class="zxks_alert">
          <DAlert :headerText="headerText">
            <template slot="ksTopBox">
              <alert-table-top ></alert-table-top>
            </template>
            <template slot="ksBottomBox">
              <alert-table></alert-table>
            </template>
            <template slot="ksFooterBox">
              <alert-footer></alert-footer>
            </template>
          </DAlert>
        </div>
      </div>
      <div class="specimen">
        <div class="jt_alert">
          <DAlert :headerText="headerText">
            <template slot="ksTopBox" v-slot:ksTopBox>
              <alert-table-top></alert-table-top>
            </template>
            <template slot="ksBottomBox">
              <alert-table></alert-table>
            </template>
            <template slot="ksFooterBox">
              <alert-footer></alert-footer>
            </template>
          </DAlert>
        </div>
      </div>
      <div class="application">
        <div class="scd_alert">
          <DAlert :headerText="headerText">
            <template slot="ksTopBox" v-slot:ksTopBox>
              <alert-table-top></alert-table-top>
            </template>
            <template slot="ksBottomBox">
              <alert-table></alert-table>
            </template>
            <template slot="ksFooterBox">
              <alert-footer></alert-footer>
            </template>
          </DAlert>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
  // import { Table } from 'antd';
  // import { Checkbox } from 'antd';
// import reqwest from 'reqwest';

import IframTable from '@/com/command/checkl_inframTable/inframTable.vue'
import DAlert from '@/com/command/department_alert/departmentAlert.vue'

import AlertTableTop from '@/com/command/alert_content_top/alertContTop.vue'
import AlertTable from '@/com/command/alert_table/alertTable.vue'
import AlertFooter from '@/com/command/alert-footer/alertFooter.vue'
import PageTable from '@/com/command/page_table/pageTable.vue';


/*
* EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
*/
  const columns = [{
        title: '医嘱',
        dataIndex: 'name',
        width: '250px',
        // scopedSlots: { customRender: 'nameInput' },
        scopedSlots: { customRender: 'name' },
      }, {
        title: '非',
        dataIndex: 'wrong',
        width: '30px'
      }, {
        title: '数量',
        dataIndex: 'numInput',
        width: '80px',
        scopedSlots: { customRender: 'numInput' }
      }, {
        title: '单位',
        dataIndex: 'company',
        width: '100px'
      }, {
        title: '频次',
        dataIndex: 'selectBox',
        width: '130px',
        scopedSlots: { customRender: 'selectBox' },
      }, {
        title: '天数',
        dataIndex: 'day',
        width: '80px'
      }, {
        title: '执行科室',
        dataIndex: 'clickCheck',
        width: '90px',
        scopedSlots: { customRender: 'clickCheck' }
      }, {
        title: '单价',
        dataIndex: 'price',
        width: '80px',
      }, {
        title: '总价',
        dataIndex: 'allprice',
        width: '80px'
      }, {
        title: '检体',
        dataIndex: 'clickCheck1',
        width: '140px',
        scopedSlots: { customRender: 'clickCheck1' }
      }, {
        title: '医师备注',
        dataIndex: 'memoInput',
        width: '200px',
        scopedSlots: { customRender: 'memoInput' }
      }, {
        title: '护士备注',
        dataIndex: 'hmemo',
        width: '100px'
      }, {
        title: '急做',
        dataIndex: 'checkBox',
        width: '50px',
        scopedSlots: { customRender: 'checkBox' }
        // render: (text, record) => this.state.dataSource.length >= 1 ? ('<Checkbox></Checkbox>') : null
      }, {
        title: '给付类型',
        dataIndex: 'paymenttype',
        width: '100px'
      }, {
        title: '开立医生',
        dataIndex: 'openingdoctor',
        width: '120px'
      }, {
        title: '开立时间',
        dataIndex: 'openingtime',
//      dataIndex: 'operation',
        width: '180px',
//      scopedSlots: { customRender: 'operation' }
      }, {
        title: '收费时间',
        dataIndex: 'time',
        width: '180px'
      }, {
        title: '执行时间',
        dataIndex: 'address',        
        width: '180px',        
      }
      // , {
      //   title: '操作',
      //   dataIndex: 'operation',
      //   scopedSlots: { customRender: 'operation' },
      // },
      ];
export default {
  computed: {},
  components: {
    // EditableCell,
    IframTable,
    DAlert,
    AlertTableTop,
    AlertTable,
    AlertFooter,
    PageTable
  },
  data () {
    return {
      // column:columns,
      column: columns,
      pagekey: "2",
      headerText:"执行科室选择",
	    dataSource: [{
	      key: 0,
	      name: "在此输入信息...",
	      wrong: "",
	      company: "单位",
	      day: "1天",
	      price: "0.1",
	      allprice: "1",
	      openingdoctor: "张医生",
	      openingtime: "2019/09/23 15:02:33",
	      age: "32",
	      address: "2019/09/23 15:02:33"
	    }],
      dataSource1: [{
        key: "0",
        name: "在此输入信息...",
        age: '32',
        address: '2019/09/23 15:02:33'
      }],
      count: 1,
      columns1: [{
        title: '删',
        dataIndex: 'checkBox',
        width: '250px',
        scopedSlots: { customRender: 'checkBox' }
      },{
        title: '医嘱',
        dataIndex: 'age',
        width: '250px',
        // scopedSlots: { customRender: 'nameInput' },
        // scopedSlots: { customRender: 'name' },
      },{
        title: '数量',
        dataIndex: 'numInput',
        width: '80px',
        // scopedSlots: { customRender: 'numInput' }
      },{
        title: '单位',
        dataIndex: 'age2',
        width: '100px'
      },{
        title: '单价',
        dataIndex: 'age6',
        width: '80px',
      },{
        title: '总量',
        dataIndex: 'age7',
        width: '80px',
      },{
        title: '单位',
        dataIndex: 'age8',
        width: '80px',
      },{
        title: '总价',
        dataIndex: 'age10',
        width: '80px',
      },{
        title: '执行科室',
        dataIndex: 'age11',
        width: '80px',
      },{
        title: '检体',
        dataIndex: 'age12',
        width: '80px',
      },{
        title: '医师备注',
        dataIndex: 'age13',
        width: '80px',
      },{
        title: '应付金额',
        dataIndex: 'age14',
        width: '80px',
      },{
        title: '护士备注',
        dataIndex: 'age15',
        width: '80px',
      }],
      tdValue: "执行科室",
      tdValue1: "其他",
//    customRow
    }
  },
  methods: {
    // onCellChange (key, dataIndex, value) {
    //     const dataSource = [...this.dataSource]
    //     const target = dataSource.find(item => item.key === key)
    //     if (target) {
    //       target[dataIndex] = value
    //       this.dataSource = dataSource
    //     }
    // },
    // onDelete (key) {
    //   const dataSource = [...this.dataSource]
    //   this.dataSource = dataSource.filter(item => item.key !== key)
    // },
    // checkInput() {
    //   console.log("数量input回车事件",this);
    // },
    applyAdd () {
      // const { count, dataSource } = this
      // const newData = {
      //   key: count,
      //   name: `Edward King ${count}`,
      //   age: 32,
      //   address: `2019/09/23 15:02:33${count}`,
      // }
      // this.dataSource = [...dataSource, newData]
      // this.count = count + 1
      let oApplication = document.querySelector(".application");
      oApplication.style.display = "block";
    },
    // noticeAdd() {
    //   console.log("通知单点击事件");
    // },
    // onChange (e) {
    //   console.log(`checked = ${e.target.checked}`)
    // },
    onChange1 (e) {
      console.log(`checked = ${e.target.checked}`)
    },
    // departmentDClick() {
    //   console.log("科室双击事件",this);
    //   let oDepartment = document.querySelector(".department");
    //   oDepartment.style.display = "block";
    // },
    // specimenDClick() {
    //   console.log("检体双击事件",this);
    //   let oSpecimen = document.querySelector(".specimen");
    //   oSpecimen.style.display = "block";
    // },
    lineDrag(e){
      let topDiv = document.querySelector(".topBox");
      let bottomDiv = document.querySelector(".bottomBox");
      let top_topDiv = topDiv.offsetTop;
      let top_bottomDiv = bottomDiv.offsetTop;
      let oDiv = this.$el;
      let oHeight = window.innerHeight - 65;
      //起点
      // let originX = e.clientX;
      let originY = e.clientY;
      console.log("鼠标按下拖拽事件",this);
       this.$el.onmousemove = (e) => {
          // let endX = e.clientX;
          let endY = e.clientY;
          let oldEndY = endY;
          //X轴、Y轴移动距离
          // let distanceX = endX - originX;
          let distanceY = endY - originY;
           if (endY < oldEndY) {
             // 下
             // topDiv.style.height = (100% - e.clientY) + "px";
             topDiv.style.height = (oHeight - e.clientY) + "px";
             bottomDiv.style.height = e.clientY + "px";
           } else{
             // 上
             topDiv.style.height = e.clientY + "px";
             bottomDiv.style.height = (oHeight - e.clientY) + "px";
             // bottomDiv.style.height = (100% - e.clientY) + "px";
           }
       }
       this.$el.onmouseup = (e) => {
         this.$el.onmousemove = null;
       }
    },
    handleAdd () {
//    	let oNumInput = document.querySelector(".numInput");
//    	const target = dataSource.find(item => item.price === item.price)
        const { count, dataSource } = this;
        const newData = {
        	key: count,
          name: `在此输入信息...`,
          wrong: "",
          company: "单位",
          day: "1天",
          price: 0.1,
          allprice: 1,
          openingdoctor: "张医生",
          openingtime: `2019/09/23 15:02:33 ${count}`,
          age: 32,
          address: `2019/09/23 15:02:33 ${count}`
        };
        this.dataSource = [...this.dataSource, newData];
        this.count = count + 1;
      },
  },
  mounted() {
  }
}
</script>

<style>
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 0;
    height: 26px;
    line-height: 26px;
    white-space: nowrap;
    text-align: center;
  }
  .ant-table-thead > tr > th {
    background: linear-gradient(to bottom, rgba(124, 164, 204, 1), rgba(53, 99, 146, 1));
    color: #FFF;
  }
  .topBox{
    height: 250px;
    width: 100%;
    overflow-x: scroll;
  }
  .bottomBox{
    height: 307px;
    width: 100%;
    overflow-x: scroll;
  }
  .checklBox{
    position: relative;
    margin:5px 20px;
  }
  .tableBox{
    border: 2px solid #000
  }
  .ant-select-dropdown-menu-item{
    width: 130px;
  }
  .department,.specimen,.application{
    background-color: rgba(235, 239, 243, .5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .lineBox{
    width: 100%;
    height: 4px;
    background-color: #bfbfbf;
    cursor: pointer;
  }
  .zxks_alert,.jt_alert{
    width: 300px;
    height: 334px;
  }
  .scd_alert{
    width: 700px;
    height: 334px;
  }
  .Active{
  	border: 1px dashed #000;
  }
</style>
