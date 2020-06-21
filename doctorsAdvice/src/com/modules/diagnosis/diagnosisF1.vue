/*
* 首页
* @Author: mikey.jialuyang
* @Date: 2019-09-19 15:32:12
* @Last Modified by: jialuyang
* @Last Modified time: 2019-09-20 10:03:49
*/
<template>
 <div id="topSearch">
   <div id="leftTitle">
      <div class="firstTitle">
          <div class="firstTitleDiv">
              诊断
          </div>
          <div>
            <a-radio-group name="radioGroup" :defaultValue="1">
              <a-radio :value="1">西医</a-radio><br>
              <a-radio :value="2">中医</a-radio>
            </a-radio-group>
          </div>
        <a-button @click="openModel">常用诊断</a-button>
      </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         主诉
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         现病史
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         体征
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         检查结果
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         家族史
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
     <div class="secondTitle">
       <div class="firstTitleDiv">
         建议
       </div>
       <a-button class="whiteBtn">...</a-button>
     </div>
   </div>
   <div id="rightContent">
     <a-form
       layout="inline"
     >
       <!--身高-->
       <a-form-item label="身高">
         <a-tooltip
           :trigger="['focus']"
           placement="topLeft"
           overlayClassName="numeric-input"
         >
    <span slot="title" v-if="value" class="numeric-input-title">
      {{value !== '-' ? formatNumber(value) : '-'}}
    </span>
           <template slot="title" v-else>
             请输入数字
           </template>
           <a-input
             :value="value"
             @change="onChange"
             @blur="onBlur"
             placeholder="0.00"
             maxLength="25"
             style="width: 120px;border: 1px solid #d9d9d9;"
           />
         </a-tooltip>
         <span>
         cm
       </span>
       </a-form-item>
       <!--体重-->
       <a-form-item label="体重">
         <a-tooltip
           :trigger="['focus']"
           placement="topLeft"
           overlayClassName="numeric-input"
         >
    <span slot="title" v-if="valueWeight" class="numeric-input-title">
      {{valueWeight !== '-' ? formatNumber(valueWeight) : '-'}}
    </span>
           <template slot="title" v-else>
             请输入数字
           </template>
           <a-input
             :value="valueWeight"
             @change="onChangeWeight"
             @blur="onBlur"
             placeholder="0.00"
             maxLength="25"
             style="width: 120px;border: 1px solid #d9d9d9;"
           />
         </a-tooltip>
         <span>
         KG
       </span>
       </a-form-item>

       <!--体内有无金属植物-->
       <a-form-item label="体内有无金属植物">
         <a-radio-group name="radioGroup" :defaultValue="1">
           <a-radio :value="1">无</a-radio>
           <a-radio :value="2">有</a-radio>
         </a-radio-group>
       </a-form-item>
       <a-form-item>
         <a-input placeholder="如有金属植物请简单说明"id="inputMemo"style="border: 1px solid #d9d9d9;"/>
       </a-form-item>
     </a-form>
     <div class="diagnose">
       <div class="diagnoseWidth">
         <DiagnosTable :tableHead="tableHead" :defalutTable="defalutTable" :tbodyData="tbodyData">

         </DiagnosTable>
       </div>

     </div>
     <div class="otherTextarea">
       <a-textarea placeholder="最多400字" autosize style="height: 129px !important;"class="firstText"/>
       <a-textarea placeholder="最多400字" autosize />
       <a-textarea placeholder="最多400字" autosize />
       <a-textarea placeholder="最多400字" autosize />
       <a-textarea placeholder="最多400字" autosize />
       <a-textarea placeholder="最多400字" :autosize="{ minRows: 3, maxRows: 6 }" style="height: 409px;!important;" />
     </div>
   </div>
   <div class="model">
     <div class="ks_alertBox">
       <commonAlert :headerText="headerText"slot="ksFooterBox" >
         <span slot="ksTopBox">
            <div class="alertDiagTitle">
            <!--体内有无金属植物-->
            <div class="alertDiagTop">
              <a-form-item label="调用类别">
                <a-radio-group name="radioGroup" :defaultValue="1">
                  <a-radio :value="1">医生</a-radio>
                  <a-radio :value="2">科室</a-radio>
                  <a-radio :value="3">全院</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </div>
         </span>
         <span slot="ksBottomBox">
            <div class="alertDiagTable">
                <AlertTable :DiagTableHead="DiagTableHead" :DiagDefalutTable="DiagDefalutTable" :DiagTbodyData="DiagTbodyData">

                </AlertTable>
            </div>
         </span>
         <span slot="ksFooterBox">
           <span class="btn"style="height: 30px;">传回</span>
         </span>
       </commonAlert>
     </div>
   </div>

 </div>
  <!--主诉编写内容区-->

</template>
<script>

  import util from "@/libs/util";
  import commonAlert from "@/com/command/department_alert/departmentAlert";//引入弹框
  import DiagnosTable from './diagnosisF1Table';
  import AlertTable from './AlertTable'//引入弹框里的table

  function formatNumber (value) {
    value += ''
    const list = value.split('.')
    const prefix = list[0].charAt(0) === '-' ? '-' : ''
    let num = prefix ? list[0].slice(1) : list[0]
    let result = ''
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`
      num = num.slice(0, num.length - 3)
    }
    if (num) {
      result = num + result
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
  }

  export default {
    components: {
      DiagnosTable,
      AlertTable,
      commonAlert//弹框
    },
    data () {
      return {
        value: '',
        valueWeight:'',
        headerText:'常用诊断调用',
        tableHead:[ {
          title: '主',
          dataIndex: 'checkBox',
          scopedSlots: { customRender: 'checkBox' },
          width: '2%',
        },{
          title: '诊断',
          dataIndex: 'diag',
          scopedSlots: { customRender: 'name' },
          width: '30%',
        }, {
          title: '备注',
          dataIndex: 'memo',
          width: '30%',
          scopedSlots: { customRender: 'memo' },
        },  {
          title: '开立医生',
          dataIndex: 'doctor',
        }, {
          title: '开立时间',
          dataIndex: 'startTime',
          scopedSlots: { customRender: 'operation' },
        }],//传给子组件的值
        defalutTable:{
          key: 0,
          checkBox:'',
          diag: ``,
          memo: '32',
          doctor: `London, Park Lane no.`,
          startTime:'2019-05-06'
        },//初始化的值
        tbodyData:[{
          key: 0,
          checkBox:'',
          diag: `王哈哈`,
          memo: '32',
          doctor: `London, Park Lane no.`,
          startTime:'2019-05-06'
        }], //传给子组件表格数据

        DiagTableHead:[{
          title: '诊断代码',
          dataIndex: 'customcode',
        },{
          title: '诊断名称',
          dataIndex: 'diag',
          scopedSlots: { customRender: 'name' },
          width: '30%',
        }, {
          title: '诊断备注',
          dataIndex: 'memo',
          width: '30%',
          scopedSlots: { customRender: 'memo' },
        }],
        DiagDefalutTable:{
          key: 0,
          checkBox:'',
          customcode:'20190927',
          diag: ``,
          memo: '32'
        },//初始化的值
        DiagTbodyData:[{
          key: 0,
          checkBox:'',
          customcode:'20190927',
          diag: ``,
          memo: '32'
        }]
      }
    },
    methods: {
      formatNumber,
      onChange (e) {
        const value  = e.target.value
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          this.value = value
        }
      },
      onChangeWeight (e) {
        const value  = e.target.value
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          this.valueWeight = value
        }
      },
      // '.' at the end or only '-' in the input box.
      onBlur () {
        const { value, onChange } = this
        if (value.charAt(value.length - 1) === '.' || value === '-') {
          onChange({ value: value.slice(0, -1) })
        }
      },
      openModel (){
        document.querySelector('.model').style.display = "block";
      }
    },
    mounted(){
      document.querySelector('.model').style.height=window.innerHeight+"px";
    },
  }
</script>

<style>
  .model{
    background-color: rgba(235, 239, 243, .5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .alertDiagTable{
    width:100%;
    height: 484px;
    border:2px solid #000;
  }
  .alertDiagTop{
    width:100%;
    height: 20%;
  }
  .btn{
    width: 89px;
    height: 100%;
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    border-radius: 3px;
    margin-right: 3px;
    padding:0px 20px;
    cursor: pointer;
    float: right;
    text-align: center;
  }
  .ks_alertBox{
    width: 800px;
    height: 604px;
    position: absolute;
    /*top: calc(50% - 167px);*/
    top:15%;
    left: calc(50% - 400px);
    /*border:1px solid #7fb3f0;*/
    border-radius: 6px;
    padding: 3px;
  }
  #leftTitle{
    float: left;
    width:5%;
    margin-top:40px;
    text-align: right;
  }
  .diagnoseWidth{
    width:58%;
  }
  .firstTitleDiv{
    margin-right:8px;
  }
  .firstTitle{
    height:129px;
    margin-bottom: 5px;
  }
  .secondTitle{
    height:50px;
  }
  .secondTitle .ant-btn{
    padding:0px 10px;
    margin-right:8px;
    height:20px;
    line-height: 20px;
    margin-top: 0px;
    background: linear-gradient(to bottom, #eee, #fff);
    border: 1px solid #1f516e;
    color: #323232;
  }
  .secondTitle .ant-btn:hover{
    background: linear-gradient(to bottom, #eee, #fff);
    border: 1px solid #1f516e;
    color: #323232;
  }
  .secondTitle .ant-btn:hover,.secondTitle  .ant-btn:focus,.secondTitle  .ant-btn:active,.secondTitle  .ant-btn.active{
    background: linear-gradient(to bottom, #eee, #fff);
    border: 1px solid #1f516e;
    color: #323232;
  }
  /*常用诊断按钮样式*/
  .firstTitle .ant-btn{
    padding:0px 5px;
    margin-right:8px;
    height:30px;
    margin-top: 8px;
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    color: #fff;
  }
  .firstTitle .ant-btn:hover{
    background: linear-gradient(to bottom, #f9d38e, #f5c067, #f3b754, #e59516, #e49721);
    border: 1px solid #1f516e;
    color: #fff;
  }
  /*点击按钮样式*/
  .firstTitle .ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active{
    background: linear-gradient(to bottom, #6e97af, #5a91af, #3d8ebc, #3c90bf);
    border: 1px solid #1f516e;
    color: #fff;
  }
  .ant-radio-wrapper{
    margin-top: 8px;
  }
  #leftTitle span.ant-radio + *{
    padding:0px;
  }
  #rightContent{
    float: left;
    width:95%;
  }
  .numeric-input .ant-tooltip-inner {
    min-width: 32px;
    min-height: 37px;
  }

  .numeric-input .numeric-input-title {
    font-size: 14px;
  }
  .icon-red {
    /* color: #e53939;
    background: #e53939; */
    filter: drop-shadow(rgb(0, 204, 153) 10px 0px);
  }

  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
  #vux_view_box_body {
    overflow:hidden;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
    background:#FEE9BC ;
    color: #000;
  }
  /*顶部搜索*/
  .has-error .ant-input, .has-error .ant-input:hover,.has-error .ant-input:not([disabled]):hover{
    border-color:#d9d9d9;
  }
  .has-error .ant-input:focus{
    box-shadow: 0 0 0 1px #d9d9d9!important;

  }
  #inputMemo{
    width:350px;
  }
  textarea.ant-input{
    height:50px!important;
    line-height: 50px;
    border-bottom: 1px solid #d9d9d9;
  }

  textArea.firstText::-webkit-input-placeholder{

      height: 129px;line-height: 129px

    }    /* 使用webkit内核的浏览器 */

  textArea.firstText:-moz-placeholder{

    height: 129px;line-height: 129px

  }                  /* Firefox版本4-18 */

  textArea.firstText::-moz-placeholder{

    height: 129px;line-height: 129px

  }                  /* Firefox版本19+ */

  textArea.firstText:-ms-input-placeholder{

    height: 129px;line-height: 129px

  }
  /*外层box样式*/
  .diagnose{
    height:130px;
    border:2px solid #000;
    margin-bottom:5px;
    overflow-y: scroll;
  }
  .otherTextarea{
    height: auto;
    border:2px solid #000;
    margin-bottom:5px;
  }
  #topSearch{
    padding: 10px;
  }
  .ant-form-item-label{
    float: left;
  }
</style>

