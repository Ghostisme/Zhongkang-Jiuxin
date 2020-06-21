<template>
	<div class="rightTable" style="position: relative;">
		<page-table 
        	:dataSourceQu="dataSource1" 
        	:hisData="column" 
        	@handleAdd="handleAdd" 
        	@showPrice="cfq_change_qd" 
        	@addMenu="fangfajia"
        	:pageKey="pagekey"
        	:alertKey="alertkey"
        ></page-table>
        <IframTable
		    style="width: 623px;position: absolute;left: 0;top: 93px;background: rgb(215, 223, 232);border-radius: 2px;padding: 1px 2px;"
		></IframTable>
	</div>
</template>

<script>
	import IframTable from "@/com/command/checkl_inframTable/inframTable.vue";
	import PageTable from "@/com/command/page_table/pageTable.vue";
	const columns = [
  {
    title: "医嘱名称",
    dataIndex: "name",
    width: "250px",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "非",
    dataIndex: "wrong",
    width: "30px"
  },
  {
    title: "用量",
    dataIndex: "numInput",
    width: "80px",
    scopedSlots: { customRender: "numInput" }
  },
  {
    title: "单位",
    dataIndex: "company",
    width: "100px"
  },
  {
    title: "频次",
    dataIndex: "selectBox",
    width: "130px",
    scopedSlots: { customRender: "selectBox" }
  },
  {
    title: "煎药方式",
    dataIndex: "day",
    width: "80px"
  },
  {
    title: "执行科室",
    dataIndex: "clickCheck",
    width: "90px",
    scopedSlots: { customRender: "clickCheck" }
  },
  {
    title: "特殊煎法",
    dataIndex: "price",
    width: "80px"
  },
  {
    title: "特殊煎法",
    dataIndex: "allprice",
    width: "80px"
  },
  {
    title: "用法",
    dataIndex: "clickCheck1",
    width: "140px",
    scopedSlots: { customRender: "clickCheck1" }
  },
  {
    title: "日份",
    dataIndex: "memoInput",
    width: "200px",
    scopedSlots: { customRender: "memoInput" }
  },
  {
    title: "执行科室",
    dataIndex: "hmemo",
    width: "100px"
  },
  {
    title: "急做",
    dataIndex: "checkBox",
    width: "50px",
    scopedSlots: { customRender: "checkBox" }
  },
  {
    title: "备注",
    dataIndex: "paymenttype",
    width: "100px"
  },
  {
    title: "总量",
    dataIndex: "openingdoctor",
    width: "120px"
  },
  {
    title: "单位",
    dataIndex: "openingtime",
    width: "180px"
  }
];
    export default {
        name: "index",
        components: {
			    IframTable,
//			    DAlert,
//			    AlertTableTop,
//			    AlertTable,
//			    AlertFooter,
			    PageTable
			  },
			  data() {
			    return {
			      column: columns,
			      headerText: "执行科室选择",
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
			      dataSource1: [
			        {
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
			        }
			      ],
			      columns1: [
			        {
			          title: "删",
			          dataIndex: "checkBox",
			          width: "250px",
			          scopedSlots: { customRender: "checkBox" }
			        },
			        {
			          title: "医嘱",
			          dataIndex: "age",
			          width: "250px"
			        },
			        {
			          title: "数量",
			          dataIndex: "numInput",
			          width: "80px"
			        },
			        {
			          title: "单位",
			          dataIndex: "age2",
			          width: "100px"
			        },
			        {
			          title: "单价",
			          dataIndex: "age6",
			          width: "80px"
			        },
			        {
			          title: "总量",
			          dataIndex: "age7",
			          width: "80px"
			        },
			        {
			          title: "单位",
			          dataIndex: "age8",
			          width: "80px"
			        },
			        {
			          title: "总价",
			          dataIndex: "age10",
			          width: "80px"
			        },
			        {
			          title: "执行科室",
			          dataIndex: "age11",
			          width: "80px"
			        },
			        {
			          title: "检体",
			          dataIndex: "age12",
			          width: "80px"
			        },
			        {
			          title: "医师备注",
			          dataIndex: "age13",
			          width: "80px"
			        },
			        {
			          title: "应付金额",
			          dataIndex: "age14",
			          width: "80px"
			        },
			        {
			          title: "护士备注",
			          dataIndex: "age15",
			          width: "80px"
			        }
			      ],
			      tdValue: "执行科室",
			      tdValue1: "其他",
			      l_t_issh: true,
			      t_yz_issh: false,
			      cfq_l_issh: false,
			      cf_num: [
			        {
			          cfname: "处方1(0.0元)"
			        }
			      ],
			      dj_cfq_issh: true,
			      tabIndex: 0,
			      pagekey: "4",
			      alertkey: "2",
			      count: 1,
			    };
			  },
			  methods: {
			  	cfq_change_qd() {
			    	//左侧处方价格更改函数
			    	this.cfq_l_issh = false;
			    	let xx = 1;
			    	this.cf_num[this.tabIndex].cfname = "处方1(" + xx +  "元)";
			    },
			  	fangfajia() {
			      var aaa = {
			        cfname: "处方1(0.0元)"
			      };
			      this.cf_num.push(aaa);
			    },
			    fangfajian(index) {
			      if (this.cf_num.length - 1 > 0) {
			        var msg = "您真的确定要删除吗？\n\n请确认！";
			        if (confirm(msg) == true) {
			          this.cf_num.splice(this.tabIndex, 1);
			        } else {
			          return;
			        }
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
			  }
    }
</script>

<style>
</style>