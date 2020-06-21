<!-- 检验检查申请上面通用表格 -->
<template>
  <div class="pageTableBox">
    <a-table bordered :dataSource="dataSourceQu" :columns="hisData" :pagination="false" :scroll="{ x: 1300 }">
		<!--<a-table bordered :dataSource="dataSource" :columns="hisData" :pagination="false">-->
      <template slot="name" slot-scope="text, record">
        <!--<editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" @handleAdd="handleAdd" />-->
        <!--<editable-cell :text="text" @handleAdd="handleAdd" :biographyKey="record.key" :dataArr="dataSourceQu"/>-->
        <editable-cell 
        	:text="text" 
        	@handleAddSon="handleAddSon" 
        	@addMenuSon="addMenuSon" 
        	:biographyKey="record.key" 
        	:dataArr="dataSourceQu" 
        	:pageKeySon="pageKey" 
        	:alertKeySon="alertKey"/>
      </template>
      <!--<template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)"><a href="javascript:;">Delete</a></a-popconfirm>
      	<a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="test"><a href="javascript:;">Delete</a></a-popconfirm>
      </template> -->
      <template slot="checkBox" slot-scope="text, record">
        <a-checkbox @change="onChange"></a-checkbox>
      </template>
      <template slot="numInput" slot-scope="text, record">
        <a-input class="numInput" @pressEnter="checkInput" @change="numInputChange($event, record.key)" />
      </template>
      <template slot="memoInput" slot-scope="text, record">
        <a-input class="memoInput" />
      </template>
      <template slot="selectBox" slot-scope="text, record">
        <a-select
            showSearch
            optionFilterProp="children"
            style="width: 130px"
            defaultValue="1次/日"
          >
          <!--
          placeholder="Select a person"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :filterOption="filterOption" -->
            <a-select-option value="1次/日">1次/日</a-select-option>
            <a-select-option value="2次/日">2次/日</a-select-option>
            <a-select-option value="3次/日">3次/日</a-select-option>
          </a-select>
      </template>
      <template slot="clickCheck" slot-scope="text, record">
        <div @dblclick="departmentDClick">{{ tdValue }}</div>
      </template>
      <template slot="clickCheck1" slot-scope="text, record">
        <div @dblclick="specimenDClick">{{ tdValue1 }}</div>
      </template>
    </a-table>
  </div>
</template>

<script>
//  import { Table } from 'antd';
  import EditableCell from '@/com/modules/checkl/view/EditableCell';
  export default {
    props: {
      hisData: Array,
      dataSourceQu: Array,
      pageKey: String,
      alertKey: String
    },
    components: {
      EditableCell,
    },
    data () {
      return {
        // headerText:"执行科室选择",
        counter: this.hisData,
        count: 1,
        tdValue: "执行科室",
        tdValue1: "其他",
//      dataSource1: [{
//        key: '0',
//        name: '在此输入信息...',
//        age: '32',
//        address: '2019/09/23 15:02:33'
//      }],
        dataSource: this.dataSourceQu
      }
    },
    methods: {
      onCellChange (key, dataIndex, value) {
        //
        this.$emit('enterAddIsData');//调用方法
	      const dataSource = [...this.dataSourceQu]
//	      const target = dataSource.find(item => item.key === key)
				const target = dataSource.find(function(item) {
					return item.key === key;
				});
//				console.log(target, "target");
	      if (target) {
	        target[dataIndex] = value
	        this.dataSourceQu = dataSource
	      };
     	},
      onDelete (key) {
        const dataSource = [...this.dataSourceQu]
        this.dataSource = dataSource.filter(item => item.key !== key)
      },
      checkInput(e, key) {
//      console.log("数量input回车事件",this);
//      console.log(e.target,"数量输入框聚焦并输入改变");
      	const value = e.target.value;
//    	console.log(value, "value");
      	const dataSource = [...this.dataSourceQu]
//    	console.log(dataSource,"dataSource")
//    	const target = dataSource.find(item => item.price === item.price)
      	const target = dataSource.find(function(item) {
					return item.key === key;
				});
//    	dataSource.find(item => item.price === item.price)
//				this.$emit('cfq_click_qd');
				
//    	console.log(target);
      },
      numInputChange (e, key){
      	console.log("数量键盘输入事件", this);
      	this.$emit('showPrice');
      	
      	//获取input值
//    	console.log(e.target,"数量输入框聚焦并输入改变");
      	const value = e.target.value;
//    	console.log(value, "value");
      	
      	//获取数据里面的值      	
      	const dataSource = [...this.dataSourceQu]
//    	console.log(dataSource,"dataSource")
      	const target = dataSource.find(item => item.key === key)      	
//    	console.log(target);
      	
      	//计算总价格
      	target.allprice = value * (target.price - 0);
      	
//    	console.log(target.allprice)
//    	console.log(target, "计算后的target");
      },
      onChange (e) {
        console.log(`checked = ${e.target.checked}`)
      },
      departmentDClick() {
//      console.log("科室双击事件",this);
        let oDepartment = document.querySelector(".department");
        oDepartment.style.display = "block";
      },
      specimenDClick() {
//      console.log("检体双击事件",this);
        let oSpecimen = document.querySelector(".specimen");
        oSpecimen.style.display = "block";
      },
      handleAddSon () {
				this.$emit('handleAdd');
				
      },
      addMenuSon() {
      	this.$emit('addMenu');
      }
    },
    created (){
//  	this.$emit('handleAdd');
//  	this.handleAdd();
//    console.log(this.hisData);
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
</style>
