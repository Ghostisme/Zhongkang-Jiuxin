<template >

    <div style="height: 100%;border: 1px solid #91a7b4;margin: 2px;" >
      <!--上-->
      <div style="background-color: #809eb7;height: 32px;display: flex;padding-top: 1px;">
        <div class="tpbtn tpbtn_d1" @click="fangfajia">
          <div>新处方</div>
        </div>
        <div class="tpbtn tpbtn_d1" @click="fangfajian">
          <div>删处方</div>
        </div>
        <div class="tpbtn ">
          <div>输液执行单</div>
        </div>
        <div class="tpbtn ">
          <div>打印处方签</div>
        </div>
      </div>
      <!--中-->
      <div>
        <div class="erdc">
          <div style="margin-right: 5px;">发药药房</div>
          <div>
            <select class="erselect">
              <option >药房</option>
            </select>
          </div>
        </div>
      </div>
      <!--下-->
      <div class="sanxd">
        <!--左-->
        <div class="xzd1 ">
          <div class="xzd1d1 gundong">
            <div>
              <div class="df xzd1d1_d">
                <div><img src="@/assets/yi.jpg"/></div>
                <div class="zidov" v-on:click="shtitleClick">管制药品处方签(双击可修改)</div>
              </div>


              <div v-for="(i,index) in cf_num" :key="index" class="df ml22 xzd1d1_d" v-show="l_t_issh"  v-on:dblclick="cfq_l_click"
                   :class="{cf_sed:index == tabIndex}" @click="djcfClick(index)">
                <div><img src="@/assets/yr.jpg"/></div>
                <div class="zidov">{{cf_num[index].cfname}}</div>
              </div>
            </div>


          </div>
        </div>
        <!--右-->
        <div class="xzd1d2 gundong" >
            <div >
              <!--表头-->
              <div class="tabledtop">
                <div class="w30">连</div>
                <div class="w30">组</div>
                <div class="w300">医嘱</div>
                <div class="w30">非</div>
                <div class="w30">试</div>
                <div class="w30">阳</div>
                <div class="w100">用量</div>
                <div class="w100">单位</div>
                <div class="w100">频次</div>
                <div class="w50">日份</div>
                <div class="w100">用法</div>
                <div class="w100">总量</div>
                <div class="w30">备</div>
                <div class="w30">盒</div>
                <div class="w100">发药单位</div>
                <div class="w100">执行科室</div>
                <div class="w100">单价</div>
                <div class="w100">总价</div>
                <div class="w100">医嘱备注</div>
                <div class="w100">护士备注</div>
                <div class="w30">急</div>
                <div class="w100">给付类别</div>

                <div class="w150">开立医生</div>
                <div class="w150">开立时间</div>
                <div class="w150">收费时间</div>
                <div class="w150">配药时间</div>

              </div>
              <!--列-->
              <div v-for="(j,index2) in cf_tab"  :key="index2" :class="{tbsed:index2 == cftabIndex}" @click="cftabClick(index2)" class="tabledd">
                <div class="w30"> <input type="checkbox"/> </div>
                <div class="w30"> </div>
                <div class="w300"  @click="inputShow($event)"  ><input v-on:change="t_yz_click()" type="text" style="width: 99%;height: 99%;color: gray;display: none;" placeholder="在此输入信息..."/></div>
                <div class="w30"> </div>
                <div class="w30"> </div>
                <div class="w30"> </div>
                <div class="w100">0.000</div>
                <div class="w100"> </div>
                <div class="w100"> </div>
                <div class="w50">0</div>
                <div class="w100"> </div>
                <div class="w100">0.00</div>
                <div class="w30"><input type="checkbox"/></div>
                <div class="w30"><input type="checkbox"/></div>
                <div class="w100"> </div>
                <div class="w100"> </div>
                <div class="w100">0.0000</div>
                <div class="w100">0.00</div>
                <div class="w100"> </div>
                <div class="w100"> </div>
                <div class="w30"><input type="checkbox"/></div>
                <div class="w100"> </div>

                <div class="w150">管理员</div>
                <div class="w150">2019/09/25 15:49:49</div>
                <div class="w150"> </div>
                <div class="w150"> </div>
              </div>

            </div>
        </div>
      </div>

      <!--医嘱下拉-->
      <div v-show="t_yz_issh" class="yz_xla ">
          <div class="yz_xla_d1">
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>全部</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>检验检查</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>治疗项目</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>西成药</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>中草药</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio" checked="checked"/><label>管制药品</label> </div>
            <div class="yzxla_rdio"><input name="type" type="radio"/><label>物质耗材</label> </div>
          </div>
          <div class="gundong" style="height: 260px;background-color: white">
            <div>
              <div class="tabledtop ">
                <div class="w100">医嘱代码</div>
                <div class="w200">医嘱名称</div>
                <div class="w100">价格</div>
                <div class="w150">剂型</div>
                <div class="w150">规格</div>
                <div class="w150">规格</div>
              </div>
              <div class="tabledd " v-for="(k,index3) in cf_tab_modal"  :key="index3" :class="{tbsed:index3 == cftabmodalIndex}" @click="cftabmodalClick(index3)">
                <div class="w100">医嘱代码</div>
                <div class="w200">医嘱名称</div>
                <div class="w100">价格</div>
                <div class="w150">剂型</div>
                <div class="w150">规格</div>
                <div class="w150">规格</div>
              </div>

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
  import $ from 'jquery';

    export default {
        name: "index",
      data() {
        return {
          l_t_issh: true,
          t_yz_issh:false,
          cfq_l_issh:false,
          cf_num:[{
            cfname:"处方1(0.0元)"
          }],
          dj_cfq_issh:true,
          tabIndex:0,
          cf_tab:[{name:233},{name:244},{name:255},{name:266}],//处方右表格list
          cftabIndex:0,

          cf_tab_modal:[{name:233},{name:244},{name:255},{name:266}],//处方右表格医嘱模态框list
          cftabmodalIndex:0,
        }
      },
      methods:{
        shtitleClick() {
          this.l_t_issh=!this.l_t_issh;
        },
        t_yz_click(){
          this.t_yz_issh=!this.t_yz_issh;
        },
        cfq_l_click(){
          this.cfq_l_issh=true;
        },
        cfq_l_click_h(){
          this.cfq_l_issh=false;
        },
        cfq_click_qd(){
          this.cfq_l_issh=false;
          var xx = this.$refs.cf_name_input.value;
          this.cf_num[this.tabIndex].cfname=xx+"(0.0元)";
        },
        fangfajia(){
          var aaa={
            cfname:"处方1(0.0元)"
          }
          this.cf_num.push(aaa);
        },
        fangfajian(index){
          if(this.cf_num.length-1>0){
            var msg = "您真的确定要删除吗？\n\n请确认！";
            if(confirm(msg)==true){
              this.cf_num.splice(this.tabIndex,1);
            }else{
              return;
            }
          }
        },
        djcfClick: function(index){
          this.tabIndex = index;
        },
        cftabClick:function (index) {
          this.cftabIndex = index;
        },
        cftabmodalClick:function (index) {
          this.cftabmodalIndex = index;
        },
        inputShow:function (e) {
          console.log();
          $(e.target).find('input').show();
        }
      }
    }



</script>

<style scoped>
  .cf_sed{
    background-color: #316ac5;
    color: white;
  }
  .cfm_btnd{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #809eb7;
  }
  .cfm_btnd>div{
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
  .cfm_cinputd>input,select,textarea{
    width: 360px;
    border-radius: 3px;
  }
  .cfm_clab{
    color: white;
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
  .cfm_clin{
    margin: 5px;
  }
  .cfm_cend{
    border-radius: 2px;
    border: 2px solid white;
    height:219px;
    background-color: #3084bc;
    padding: 5px;
  }
  .cfm_top{
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
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
  .yzxla_rdio{
    margin: 3px 15px;
  }
  .yz_xla_d1{
    border: 1px solid #adadad;
    height: 30px;
    border-radius: 3px;
    margin: 3px;
    display: flex;
  }
  .yz_xla{
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
  .df{
    display: flex;
  }
  .tpbtn{
    background-color: #3d8bb7;
    color: white;
    border: 1px solid #91caec;
    width: 90px;
    height: 27px;line-height: 25px;
    font-size: 16px;
    border-radius: 2px;
    margin-right: 2px;
    cursor: pointer;
  }
  .tpbtn>div{
    border: 1px solid #105276;
  }
  .tpbtn:hover{
    background-color: #e49724;
  }
  .tpbtn_d1{
    text-align: center;
    letter-spacing: 5px;
  }
  .erdc{
    display: flex;padding-left: 15px;font-size: 16px;height: 30px;line-height: 30px;
    color: #000;
  }
  .erselect{
    width: 150px;height:28px;border-radius: 5px;border: 1px solid gray
  }
  .sanxd{
    display: flex;height: 93%;
    border: 3px solid #4d4d4d;
    margin: 2px;
  }
  .xzd1{
    width: 200px;
    height: 100%;
    border-right: 3px solid #4d4d4d;
    padding: 2px;
    color: #000;
    font-size: 15px;
  }
  .xzd1d1{
    border: 1px solid #7f9db9;
    height: 100%;
    width: 100%;
  }
  .xzd1d1_d{
    cursor: pointer;
  }
  .xzd1d1_d:hover{
    color: red;
  }
  .zidov{
    white-space:nowrap;overflow: hidden
  }
  .ml22{
    margin-left: 22px;
  }
  .xzd1d2{
    border: 1px solid #7f9db9;
    height: 100%;
    margin: 1px;

  }
  .gundong{
    display: -webkit-box;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .tbsed{
    background-color: #99b6e6!important;
    color: white!important;
  }
  .tabledd{
    height: 25px;
    display: flex;
    font-size: 16px;
    color: #000;
  }
  .tabledd:nth-child(odd){
    background-color: #e9f6fc;
  }
  .tabledd>div{
    border:1px solid #c0c0c0;
    text-align: center;
  }
</style>
