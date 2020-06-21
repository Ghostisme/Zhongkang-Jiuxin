/*
 * @Author: hai.L
 * @Date: 2019-09-29 11:10:46
 * @Last Modified by: hai.L
 * @Last Modified time: 2019-10-10 11:51:52
 */
<!-- 检验检查申请单 -->
<template style="height:100vh">
  <div style="height: 100%;border: 1px solid #91a7b4;margin: 2px;">
    <!--上-->
    <div style="background-color: #809eb7;height: 32px;display: flex;padding-top: 1px;">
      <div class="tpbtn tpbtn_d1" @click="fangfajia">
        <div>新处方</div>
      </div>
      <div class="tpbtn tpbtn_d1" @click="fangfajian">
        <div>删处方</div>
      </div>
      <div class="tpbtn">
        <div>输液执行单</div>
      </div>
      <div class="tpbtn">
        <div>打印处方签</div>
      </div>
    </div>
    <div>
      <div class="erdc">
        <div style="margin-right: 5px;">发药药房</div>
        <div>
          <select class="erselect">
            <option>药房</option>
          </select>
        </div>
      </div>
    </div>
    <div class="sanxd">
      <!--左-->
      <div class="xzd1">
        <div class="xzd1d1 gundong">
          <div>
            <div class="df xzd1d1_d">
              <div>
                <img src="@/assets/yi.jpg" />
              </div>
              <div class="zidov" v-on:click="shtitleClick">管制药品处方签(双击可修改)</div>
            </div>

            <div
              v-for="(i,index) in cf_num"
              :key="index"
              class="df ml22 xzd1d1_d"
              v-show="l_t_issh"
              v-on:dblclick="cfq_l_click"
              :class="{cf_sed:index == tabIndex}"
              @click="djcfClick(index)"
            >
              <div>
                <img src="@/assets/yr.jpg" />
              </div>
              <div class="zidov">{{cf_num[index].cfname}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--右-->
      <div class="xzd1d2 gundong">
        <div class="checklBox">
          <div class="topBox">
            <page-table 
            	:dataSourceQu="dataSource" 
            	:hisData="column" 
            	@handleAdd="handleAdd" 
            	@showPrice="cfq_change_qd" 
            	@addMenu="fangfajia"
            	:pageKey="pagekey"
            	:alertKey="alertkey"
            ></page-table>
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
          <IframTable
            style="width: 623px;position: absolute;left: 0;top: 93px;background: rgb(215, 223, 232);border-radius: 2px;padding: 1px 2px;"
          ></IframTable>
        </div>
      </div>
    </div>
    
    <!--双击处方签模态框-->
      <div class="cfmodal" v-show="cfq_l_issh">
        <!--上-->
        <div class="cfm_top">
          <div style="color: white">修改处方签信息</div>
          <div v-on:click="cfq_l_click_h">X</div>
        </div>
        <!--中-->
        <div class="cfm_cend">

          <div class="df cfm_clin">
            <div class="cfm_clab">处方签号</div>
            <div class="cfm_cinputd"><input  type="text" value="231316564684863132"/></div>
          </div>

          <div class="df cfm_clin">
            <div class="cfm_clab"><span style="color: red">*</span>处方名称</div>
            <div class="cfm_cinputd"><input ref="cf_name_input" type="text" value="处方2"/></div>
          </div>

          <div class="df cfm_clin">
            <div class="cfm_clab"><span style="color: red">*</span>处方类型</div>
            <div class="cfm_cinputd">
              <select>
                <option>毒嘛</option>
              </select>
            </div>
          </div>

          <div class="df cfm_clin">
            <div class="cfm_clab">处方备注</div>
            <div class="cfm_cinputd">
              <textarea style="height: 110px;resize: none"></textarea>
            </div>
          </div>
        </div>
        <!--下-->
        <div class="cfm_btnd">
          <div v-on:click="cfq_click_qd">确定</div>
          <div v-on:click="cfq_l_click_h">关闭</div>
        </div>
      </div>
  </div>
</template>

<script>
//  import { Table } from 'antd';
// import { Checkbox } from 'antd';
// import reqwest from 'reqwest';

import IframTable from "@/com/command/checkl_inframTable/inframTable.vue";
import DAlert from "@/com/command/department_alert/departmentAlert.vue";

import AlertTableTop from "@/com/command/alert_content_top/alertContTop.vue";
import AlertTable from "@/com/command/alert_table/alertTable.vue";
import AlertFooter from "@/com/command/alert-footer/alertFooter.vue";
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
  inject: ["reload"],
  computed: {},
  components: {
    IframTable,
    DAlert,
    AlertTableTop,
    AlertTable,
    AlertFooter,
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
          key: "0",
          name: "在此输入信息...",
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
      pagekey: "2",
      alertkey: "2",
      count: 1,
    };
  },
  methods: {
    applyAdd() {
      let oApplication = document.querySelector(".application");
      oApplication.style.display = "block";
    },
    onChange1(e) {
      console.log(`checked = ${e.target.checked}`);
    },
    lineDrag(e) {
      let topDiv = document.querySelector(".topBox");
      let bottomDiv = document.querySelector(".bottomBox");
      let top_topDiv = topDiv.offsetTop;
      let top_bottomDiv = bottomDiv.offsetTop;
      let oDiv = this.$el;
      let oHeight = window.innerHeight - 65;
      //起点
      // let originX = e.clientX;
      let originY = e.clientY;
      this.$el.onmousemove = e => {
        // let endX = e.clientX;
        let endY = e.clientY;
        let oldEndY = endY;
        //X轴、Y轴移动距离
        // let distanceX = endX - originX;
        let distanceY = endY - originY;
        if (endY < oldEndY) {
          // 下
          // topDiv.style.height = (100% - e.clientY) + "px";
          topDiv.style.height = oHeight - e.clientY + "px";
          bottomDiv.style.height = e.clientY + "px";
        } else {
          // 上
          topDiv.style.height = e.clientY + "px";
          bottomDiv.style.height = oHeight - e.clientY + "px";
          // bottomDiv.style.height = (100% - e.clientY) + "px";
        }
      };
      this.$el.onmouseup = e => {
        this.$el.onmousemove = null;
      };
    },
    shtitleClick() {
      this.l_t_issh = !this.l_t_issh;
    },
    t_yz_click() {
      this.t_yz_issh = !this.t_yz_issh;
    },
    cfq_l_click() {
      this.cfq_l_issh = true;
    },
    cfq_l_click_h() {
      this.cfq_l_issh = false;
    },
    cfq_click_qd() {
      this.cfq_l_issh = false;
      var xx = this.$refs.cf_name_input.value;
      this.cf_num[this.tabIndex].cfname = xx + "(0.0元)";
    },
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
    djcfClick: function(index) {
      this.tabIndex = index;
      console.log("差点击按钮局部刷新加载数据", this.tabIndex)
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
};
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
  background: linear-gradient(
    to bottom,
    rgba(124, 164, 204, 1),
    rgba(53, 99, 146, 1)
  );
  color: #fff;
}
.topBox {
  height: 250px;
  width: 100%;
  overflow-x: scroll;
}
.bottomBox {
  height: 307px;
  width: 100%;
  overflow-x: scroll;
}
.checklBox {
  position: relative;
    margin:0px !important;
}
.ant-select-dropdown-menu-item {
  width: 130px;
}
.department,
.specimen,
.application {
  background-color: rgba(235, 239, 243, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
}
.lineBox {
  width: 100%;
  height: 4px;
  background-color: #bfbfbf;
  cursor: pointer;
}
.zxks_alert,
.jt_alert {
  width: 300px;
  height: 334px;
}
.scd_alert {
  width: 700px;
  height: 334px;
}

.cf_sed {
  background-color: #316ac5;
  color: white;
}
.cfm_btnd {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #809eb7;
}
.cfm_btnd > div {
  width: 90px;
  border: 1px solid #000;
  text-align: center;
  margin: 5px;
  border-radius: 3px;
  background-color: #3d8dba;
  color: white;
  letter-spacing: 6px;
  cursor: pointer;
}
.cfm_cinputd > input,
select,
textarea {
  width: 360px;
  border-radius: 3px;
}
.cfm_clab {
  color: white;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.cfm_clin {
  margin: 5px;
}
.cfm_cend {
  border-radius: 2px;
  border: 2px solid white;
  height: 219px;
  background-color: #3084bc;
  padding: 5px;
}
.cfm_top {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
}
.cfmodal {
  border: 3px solid #95cfff;
  border-radius: 5px;
  position: absolute;
  top: 30%;
  left: 40%;
  width: 500px;
  height: 300px;
  background: #7199c9;
}
.yzxla_rdio {
  margin: 3px 15px;
}
.yz_xla_d1 {
  border: 1px solid #adadad;
  height: 30px;
  border-radius: 3px;
  margin: 3px;
  display: flex;
}
.yz_xla {
  border: 1px solid #9fabb4;
  width: 690px;
  height: 300px;
  position: absolute;
  top: 163px;
  left: 270px;
  background-color: #d7dfe8;

  border-radius: 2px;
  z-index: 999;
}
.w30 {
  width: 30px;
}
.w50 {
  width: 50px;
}
.w100 {
  width: 100px;
}
.w150 {
  width: 150px;
}
.w200 {
  width: 200px;
}
.w300 {
  width: 300px;
}
.tabledtop {
  background: linear-gradient(
    to bottom,
    rgba(124, 164, 204, 1),
    rgba(53, 99, 146, 1)
  );
  height: 25px;
  display: flex;
  color: white;
  font-size: 16px;
}
.tabledtop > div {
  border-left: 1px solid #90abc7;
  border-right: 1px solid #2e5c8a;
  text-align: center;
}
.df {
  display: flex;
}
.tpbtn {
  background-color: #3d8bb7;
  color: white;
  border: 1px solid #91caec;
  width: 90px;
  height: 27px;
  line-height: 25px;
  font-size: 16px;
  border-radius: 2px;
  margin-right: 2px;
  cursor: pointer;
}
.tpbtn > div {
  border: 1px solid #105276;
}
.tpbtn:hover {
  background-color: #e49724;
}
.tpbtn_d1 {
  text-align: center;
  letter-spacing: 5px;
}
.erdc {
  display: flex;
  padding-left: 15px;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  color: #000;
}
.erselect {
  width: 150px;
  height: 28px;
  border-radius: 5px;
  border: 1px solid gray;
}
.sanxd {
  display: flex;
  height: 93%;
  border: 3px solid #4d4d4d;
  margin: 2px;
}
.xzd1 {
  width: 200px;
  height: 100%;
  border-right: 3px solid #4d4d4d;
  padding: 2px;
  color: #000;
  font-size: 15px;
}
.xzd1d1 {
  border: 1px solid #7f9db9;
  height: 100%;
  width: 100%;
}
.xzd1d1_d {
  cursor: pointer;
}
.xzd1d1_d:hover {
  color: red;
}
.zidov {
  white-space: nowrap;
  overflow: hidden;
}
.ml22 {
  margin-left: 22px;
}
.xzd1d2 {
  border: 1px solid #7f9db9;
  height: 100%;
  margin: 1px;
}
.gundong {
  display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.tabledd {
  background-color: #99b6e6;
  color: white;

  /*color: #000;*/
  height: 25px;
  display: flex;
  font-size: 16px;
}
.tabledd > div {
  border: 1px solid #c0c0c0;
  text-align: center;
}
.cfmodal{
    border: 3px solid #95cfff;
    border-radius: 5px;
    position: absolute;
    top: 30%;
    left: 40%;
    width: 500px;
    height: 300px;
    background: #7199c9;
  }
</style>
