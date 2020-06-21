<template>

  <div style="height: 100%;">
    <div style="padding: 10px;height: 98%;display: flex;">

      <div class="panld">
        <div style="height: 3%;color:#000">过敏史</div>
        <div class="panldd">
          <div class="panldd2d">
          	<page-table 
            	:dataSourceQu="dataSource" 
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
            <!--<div>
              表头
              <div class="tabledtop">
                <div class="w100">类别</div>
                <div class="w200">过敏名称</div>
                <div class="w100">科别</div>
                <div class="w100">医师</div>
                <div class="w200">记录时间</div>
              </div>
              列
              <div class="tabledd">
                <div class="w100">类别</div>
                <div class="w200">过敏名称</div>
                <div class="w100">科别</div>
                <div class="w100">医师</div>
                <div class="w200">记录时间</div>
              </div>
            </div>-->
          </div>
        </div>
      </div>


      <div class="panld">
        <div style="height: 3%;color:#000">既往史</div>
        <div class="panldd">
          <div class="panldd2d" style="position: relative;">
          	
            <RightTable></RightTable>
            <!--<div>
              表头
              <div class="tabledtop">
                <div class="w100">就诊日期</div>
                <div class="w100">诊断类别</div>
                <div class="w200">疾病诊断</div>
                <div class="w100">备注</div>
                <div class="w100">就诊科别</div>
                <div class="w100">就诊医师</div>
                <div class="w100">门急住别</div>
                <div class="w200">ID号</div>

              </div>
              列
              <div class="tabledd">
                <div class="w100">就诊日期</div>
                <div class="w100">诊断类别</div>
                <div class="w200">疾病诊断</div>
                <div class="w100">备注</div>
                <div class="w100">就诊科别</div>
                <div class="w100">就诊医师</div>
                <div class="w100">门急住别</div>
                <div class="w200">ID号</div>
              </div>
            </div>-->
          </div>
        </div>
      </div>

    </div>		
  </div>

</template>

<script>
	import IframTable from "@/com/command/checkl_inframTable/inframTable.vue";
	import PageTable from "@/com/command/page_table/pageTable.vue";
	import RightTable from "@/com/modules/pastRightTable/pashRight.vue";
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
			    PageTable,
			    RightTable
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

<style scoped>
  .m20{
    margin-right: 20px;
  }
  .panldd2d{
    border: 1px solid #7f9db9;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    position: relative;
  }
  .panldd2d>div{

  }
  .panldd{
    border: 3px solid #4d4d4d;
    height: 97%;
    padding: 3px;
  }
  .panld{
    width: 50%;
    height: 100%;
    box-shadow: 0 0 5px ;
    margin: 10px;
  }




  .w30{
    width: 30px;
  }
  .w50{
    width: 50px;
  }
  .w100{
    width: 100px;
  }
  .w150{
    width: 150px;
  }
  .w200{
    width: 200px;
  }
  .w300{
    width: 300px;
  }
  .tabledtop{
    background: linear-gradient(to bottom, rgba(124, 164, 204, 1), rgba(53, 99, 146, 1));
    height: 25px;
    display: flex;
    color: white;
    font-size: 16px;
  }
  .tabledtop>div{
    border-left:1px solid #90abc7;
    border-right:1px solid #2e5c8a;
    text-align: center;
  }


  .tabledd{
    background-color: #99b6e6;
    color: white;

    /*color: #000;*/
    height: 25px;
    display: flex;
    font-size: 16px;
  }
  .tabledd>div{
    border:1px solid #c0c0c0;
    text-align: center;
  }
</style>
