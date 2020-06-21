<!-- 表格第一项输入弹出的表格 -->
<template>
  <div class="inframTable" style="display: none;height: 233px;top: 104px;">
    <div class="topNav">
      <a-radio-group v-model="value">
        <a-radio :style="radioStyle" :value="1" disabled>全部</a-radio>
        <a-radio :style="radioStyle" :value="2">检验检查</a-radio>
        <a-radio :style="radioStyle" :value="3" disabled>治疗项目</a-radio>
        <a-radio :style="radioStyle" :value="4" disabled>西成药</a-radio>
        <a-radio :style="radioStyle" :value="5" disabled>中草药</a-radio>
        <a-radio :style="radioStyle" :value="6" disabled>管制药品</a-radio>
        <a-radio :style="radioStyle" :value="7" disabled>物资耗材</a-radio>
      </a-radio-group>
    </div>
    <!-- :rowKey="record => record.login.uuid" -->
    <a-table
    	bordered
    	class="innerTable"
    	:columns="columns"
    	:dataSource="data"
    	:scroll="obj"
    	:pagination="false"
    	@change="handleTableChange"
    	:customRow="customRow"
    	>
    	<!--@click="test"-->
    	<!--@mousedowm="changeKeyDown"-->
    	<!--:customRow="customRow"-->
      <!-- slot-scope="name" -->
      <template slot="name" slot-scope="text, record">
        {{ name.first }} {{ name.last }}
      </template>
    </a-table>
    <div class="ifram_bottomBox">
      <div class="bottom_left_text">{{ leftText }}</div>
      <div class="bottom_center_btn"><a-button type="primary" html-type="submit">{{ btnText }}</a-button></div>
      <div class="bottom_right_text">{{ rightText }}</div>
    </div>
  </div>
</template>

<script>
import reqwest from 'reqwest';
import $ from 'jquery';
let x;
//let inframTable = document.querySelector(".inframTable");
const columns = [
  {
    title: '医嘱代码',
    dataIndex: 'codeKey',
    // sorter: true,
     width: '10%',
    // scopedSlots: { customRender: 'name' },
  },
  {
    title: '医嘱名称',
    dataIndex: 'name',
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    width: '10%',
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: '10%',
  },
  {
    title: '剂型',
    dataIndex: 'dosageform',
    width: '10%',
  },
  {
    title: '规格',
    dataIndex: 'specifications',
    width: '5%',
  },
  {
    title: '生产厂商',
    dataIndex: 'manufacturer',
    width: '15%',
  },
  {
    title: '收费代码',
    dataIndex: 'chargingCode',
    width: '10%',
  },
  {
    title: '收费项目',
    dataIndex: 'payService',
    width: '10%',
  },
  {
    title: '收费代码',
    dataIndex: 'chargingCode1',
    width: '10%',
  },
  {
    title: '收费项目',
    dataIndex: 'payService1',
    width: '10%',
  }
];
const customRow = (record) => {
  return {
//     props: {
////       rowClassName //属性
//     },
    on: { // 事件
      click: (e) => {
        // console.log("鼠标点击事件", this);
        // console.log("鼠标点击事件1", e);
        console.log(e.target,"e.target")
        let oDom = $(e.target).parent();
        let inframTable = document.querySelector(".inframTable");
        let trArr = $(".inframTable").find("tbody").find("tr");
        console.log(trArr, "trArr");
        if (inframTable.style.display != "none") {
        	x = Number($(oDom).attr("data-row-key"));
	        for(let i = 0; i < trArr.length; i++){
//	          console.log(x);
	          i == x ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
	        };	        
        };
      },       // 点击行
      mouseenter: () => {},  // 鼠标移入行
    },
  }
}
let y;
export default {
	props: {
    biographyKey: Number,
  	dataSourceQu: Array
//  dataIndex1: String
  },
	created() {
    
//  y = 0;
		document.removeEventListener('myEvent', this.myKeyFun, false);
		document.addEventListener('myEvent', this.myKeyFun, false);
    $(document).unbind("keydown");
    $(document).keydown(this.myFun);
//		let inframTable = document.querySelector(".inframTable");
//		document.removeEventListener('keydown', this.myFun, false);
//  document.addEventListener('keydown', this.myFun, false);
//  document.removeEventListener('keydown', this.myFun, false);
 },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      customRow,
      radioStyle: {
        // display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      value: 2,
      obj: {
        x: 623,
        y: 151
        // y: 169
        // y: 233
      },
      leftText: '自费:非医保',
      btnText: "↓",
      rightText: '模式:LDBF'
    };
  },
  methods: {
  	myFun(e) {
  		let inframTable = document.querySelector(".inframTable");
  		let key = window.event.keyCode;
      let trArr = $(".inframTable").find("tbody").find("tr");
      if (inframTable.style.display != "none") {
      	if (key == 40) {
	      	e.preventDefault();
	        e.stopPropagation();
//	        x = x + 1;
	        y = y + 1;
//	        console.log(x);
					console.log(y)
//	        if(x > trArr.length){
//	          x = trArr.length - 1;
//	        }
	        if(y > trArr.length && y != 0){
	          y = trArr.length - 1;
	        }
	        for(let i = 0; i < trArr.length; i++){
	          i == y ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
	        }
//	        if (window.isNaN(x)) {
//	        	for(let i = 0; i < trArr.length; i++){
//		          i == y ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
//		        }
//	        } else{
//	        	for(let i = 0; i < trArr.length; i++){
//		          i == x ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
//		        }
//	        }
	      }
	      if(key == 38){
	      	e.preventDefault();
	        e.stopPropagation();
//	        x = x - 1;
	        y = y - 1;
//	        console.log(x);
					console.log(y)
//	        if(x < 0){
//	          x = 0;
//	        }
	        if (y < 0) {
	        	y = 0;
	        }
	        for(let i = 0; i < trArr.length; i++){
	          i == y ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
	        }
//	        if (window.isNaN(x)) {
//	        	for(let i = 0; i < trArr.length; i++){
//		          i == y ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
//		        }
//	        } else{
//	        	for(let i = 0; i < trArr.length; i++){
//		          i == x ? $(trArr[i]).addClass("active") : $(trArr[i]).removeClass("active");
//		        }
//	        }
	      }
	      if(key == 13){
	        // console.log(123);
	        let inframTable = document.querySelector(".inframTable");
	        inframTable.style.display = "none";
	      }
			}
  	},
  	myKeyFun(e) {
  		console.log(e.detail, "e.detail传的值")
  		y = e.detail;
  	},
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        key: 0,
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log('params:', params);
      this.loading = true;
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 10,
          ...params
        },
        type: 'json'
      }).then(data => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        console.log("数据data",data.results);
        this.data = [
        	{
        		key: 0,
        		codeKey: "555AW",
        		name: "辅酶A",
        		price: 2.60,
        		dosageform: "粉针剂",
        		specifications: "100U",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "555AW",
        		payService: "注射用辅酶A",
        		chargingCode1: "555AW",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 1,
        		codeKey: "10189",
        		name: "甲钴胺片",
        		price: 37.30,
        		dosageform: "片剂",
        		specifications: "0.5mg*20片",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "10189",
        		payService: "注射用辅酶A",
        		chargingCode1: "10189",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 2,
        		codeKey: "12690",
        		name: "螺内酯片",
        		price: 11.14,
        		dosageform: "片剂",
        		specifications: "100s",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "12690",
        		payService: "注射用辅酶A",
        		chargingCode1: "12690",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 3,
        		codeKey: "1907N",
        		name: "aaaa",
        		price: 100.00,
        		dosageform: "丸剂",
        		specifications: "",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "1907N",
        		payService: "注射用辅酶A",
        		chargingCode1: "1907N",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 4,
        		codeKey: "19063",
        		name: "阿卡波糖",
        		price: 53.001,
        		dosageform: "粉针剂",
        		specifications: "100U",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "19063",
        		payService: "注射用辅酶A",
        		chargingCode1: "19063",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 5,
        		codeKey: "555AW",
        		name: "辅酶A",
        		price: 2.60,
        		dosageform: "粉针剂",
        		specifications: "100U",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "555AW",
        		payService: "注射用辅酶A",
        		chargingCode1: "555AW",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 6,
        		codeKey: "555AW",
        		name: "辅酶A",
        		price: 2.60,
        		dosageform: "粉针剂",
        		specifications: "100U",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "555AW",
        		payService: "注射用辅酶A",
        		chargingCode1: "555AW",
        		payService1: "注射用辅酶A"
        	},
        	{
        		key: 7,
        		codeKey: "555AW",
        		name: "辅酶A",
        		price: 2.60,
        		dosageform: "粉针剂",
        		specifications: "100U",
        		manufacturer: "马鞍山丰源制药有限公司",
        		chargingCode: "555AW",
        		payService: "注射用辅酶A",
        		chargingCode1: "555AW",
        		payService1: "注射用辅酶A"
        	}
        ]
        console.log("mock数据data",this.data);
        this.pagination = pagination;
      });
    },
  }
};
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
  }
  ul > li {
    list-style-type: none;
    float: left;
  }
  .inframTable {
    /*width: 100%;*/
    width: 623px;
    /* height: 221px; */
    height: 233px;
    /* max-height: 221px;
      overflow: scroll; */
    background-color: rgb(215, 223, 232);
    /*引用后样式*/
  	position: absolute;
  	left: 3px;
  	top: 104px;
  	border-radius: 2px;
  	padding: 1px 2px; 
  }
  .ifram_bottomBox {
    display: flex;
    justify-content: space-between;
  }
  .trStyle{
    background-color: #99b6e6;
  }
  .bottom_center_btn button{
    height: 20px;
    line-height: 18px;
    width: 50px;
  }
  /* .innerTable tbody tr.active{
     background-color: #99b6e6;
  } */
  .active{
     background-color: #99b6e6;
  }
  table{
    table-layout:fixed;
  }
  table td{
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* for IE */
    -moz-text-overflow: ellipsis; /* for Firefox,mozilla,在chrome中测试也通过了*/
  	text-align: center;
  }
</style>
