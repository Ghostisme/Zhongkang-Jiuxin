/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<template>
  <div>
    <div class="page">
      <!-- 信息详情 -->
      <div class="info-detail">
        <div style="display: flex;justify-content: space-between;">
          <div class="ctx">
            <div class="left-title">申请人：</div>
            <div class="right-content">{{detail.applyUser}}</div>
          </div>
          <div class="approve-btn">{{auditState}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">所在部门：</div>
          <div class="right-content">{{detail.applyUserDept}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">申请时间：</div>
          <div class="right-content">{{createTime}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">请假类型：</div>
          <div class="right-content">{{detail.leaveType}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">开始时间：</div>
          <div class="right-content">{{detail.startTime}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">结束时间：</div>
          <div class="right-content">{{detail.endTime}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">请假时长：</div>
          <div class="right-content">{{detail.countDay}}时</div>
        </div>

        <div class="ctx">
          <div class="left-title">紧急程度：</div>
          <div class="right-content">{{detail.urgencyName}}</div>
        </div>

        <div class="ctx">
          <div class="left-title">请假原因：</div>
          <div class="right-content">{{detail.leaveNote}}</div>
        </div>

        <div class="upload-main">
          <!-- <div class="uploadImg" v-for="(item, index) in detail.applyFile" :key="index"> -->
           <van-uploader
                class="uploadImg"
                v-model="detail.applyFile"
                :max-count="6"
                :preview-size="60"
                :after-read="afterRead"
                :deletable="false"
              >
              <div></div></van-uploader>
          
        </div>
      </div>
      <!-- 审批流程 -->
      <div class="progress">
        <div class="left-title">审批流程</div>
        <!-- 串联审批 -->
        <div v-if="processType" style="margin-top:13px;">
          <!--:active="{'color': (item.urgency=='特急' ? '#F56C6B':(item.urgency=='紧急'?'#FE8822':'#16A6FF'))}" -->
          <van-steps direction="vertical" :active="active" :active-color="('#16A6FF')">
            <van-step v-for="(item, index) in series" :key="index">
              <div class="series-txt" @click="step(item)">
                <div class="series-name">
                  {{item.userName}}·{{item.isAdopt==0?'待审核':(item.isAdopt==1?'已同意':'未同意')}}
                  <span
                    style="font-size: 0.8em;color: #8f8f8f;display: flex;"
                  >查看意见</span>
                </div>
                <div class="series-time">{{item.adoptTime}}</div>
              </div>
            </van-step>
          </van-steps>
        </div>
        <!-- 并联审批 -->
        <div v-else class="multiple">
          <v-tree :data="treeData" @select="selectFn" show-line style="font-size: 1.25em!important;"></v-tree>
        </div>
      </div>
      <!-- 抄送我的 -->
      <div class="progress">
        <div class="left-title">抄送人</div>
        <div style="margin-top:13px;">
          <div class="approver">
            <ul class="approver-content">
              <li
                v-for="(item, index) in ccList"
                :key="index"
                style="display: flex; margin: 10px 30px 10px 0;"
              >
                <div class="name-box">
                  <img v-if="item.url" class="addImg" :src="item.url" />
                  <div v-else class="nameImg">{{item.userName.substr(1,2)}}</div>
                  <div class="nameFont">{{item.userName}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 审批结果 -->
      <div class="progress" v-show="confirmShowBtn">
        <div class="left-title">审批结果</div>
        <div class="progress-btn">
          <div
            class="tag"
            @click="agree"
            :style="{'color': (isAgree==1 ? '#16a6ff':'#999'),'border-color':   (isAgree==1 ? '#16a6ff':'#999')} "
          >同意</div>
          <div
            class="tag"
            @click="disagree"
            style="margin-left:54px"
            :style="{'color': (isAgree==2 ? '#16a6ff':'#999'),'border-color':   (isAgree==2 ? '#16a6ff':'#999')} "
          >不同意</div>
        </div>
        <div>
          <x-textarea
            :max="200"
            name="description"
            :placeholder="('请输入审批意见')"
            @on-change="textArea"
          ></x-textarea>
        </div>
      </div>
      <!-- 确定 -->
      <div>
        <button class="button_box" @click="confirm" v-show="confirmShowBtn">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import util from "@/libs/util";
import { parse } from "url";
 import storejs from 'storejs';
import { Dialog } from "vant";
export default {
  data() {
    return {
      approvalUserId: "", //当前登录人ID
      approvalId: null, //表单id
      node: "", //当前审批人节点
      active: 0, //串联步骤条
      processType: false, //ture是串联，false并联
      createTime: "", //申请时间
      auditState: "", //审核状态 0审核中 1审核完成
      confirmShowBtn: true, //显示按钮
      detail: {},
      isAgree: null, //1同意或者2不同意
      txtVal: "", //文本域
      fileList: [
        //上传图片
      ],
      ccList: [], //抄送人
      series: [], //串联
      treeData: [], //并联
      treeNode: [],
      expandedKeys: []
    };
  },
  created() {
    if (storejs.get("loginUserInfo")) {
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.approvalUserId = userList.userId;
    } else {
      this.approvalUserId = "7258";
    }
    this.approvalId = this.$route.params.id;
    this.node = this.$route.params.node;
    let processType = this.$route.params.processType;
    this.confirmShowBtn = this.$route.params.confirmShowBtn;
    console.log(this.$route.params);
    this.init(this.approvalId, processType); //加载数据
  },
  methods: {
    //加载数据
    init(oid, otype) {
      util
        .post("/apply/leave/get", {
          id: oid,
          approvalUserId: this.approvalUserId,
          processType: otype
        })
        .then(res => {
          if (res.status == 200) {
            this.detail = res.data.resultMap.applyLeave;
            if (this.detail.processType == "串行") {
              //判断是串行还是并行
              this.processType = true;
            } else {
              this.processType = false;
            }
            this.series = this.detail.approvalNodeList;
            this.active = parseInt(this.detail.node) - Number("1");
            console.log(this.active);
            this.ccList = this.detail.ccList;

            this.treeData.push(this.detail.treeNode);
            this.createTime = util.formatDate(
              new Date(this.detail.createTime.replace(/\-/g, "/")),
              "yyyy-MM-dd hh:mm:ss"
            );
            if (this.detail.state == 0) {
              this.auditState = "审核中";
            } else {
              this.auditState = "审核完成";
            }
          }
        });
    },
    setName(datas) {
      //遍历树  获取id数组
      for (var i in datas) {
        console.log(datas[i].userName);
        this.expandedKeys.push(datas[i].userName);
        if (datas[i].approvalNodeList) {
          console.log("------------");
          this.setName(datas[i].approvalNodeList);
        }
      }
    },
    //串联步骤
    step(e) {
      console.log(e.content);
      if (e.content) {
        Dialog({ message: e.content });
      } else {
        Dialog({ message: "无意见" });
      }
    },
    //并联步骤
    selectFn(e) {
      console.log(e[0].content);
      console.log(this.treeData);
      if (e[0].content) {
        Dialog({ message: e[0].content });
      } else {
        Dialog({ message: "无意见" });
      }
    },
    // 图片上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file.content);
    },
    // 文本域
    textArea(val) {
      this.txtVal = val;
    },
    //审批 同意
    agree() {
      console.log("审批 同意");
      this.isAgree = 1;
    },
    //审批 同意
    disagree() {
      console.log("审批 不同意");
      this.isAgree = 2;
    },
    // 提交
    confirm() {
      console.log(this.approvalId);
      if (!this.txtVal) {
        this.$vux.toast.text("请输入审批意见", "top");
        return false;
      }
      util
        .post("/approval/log/approval", {
          approvalId: this.approvalId, //表单id
          approvalNode: this.node, //节点
          content: this.txtVal, //审批意见
          approvalUserId: this.approvalUserId,
          isAdopt: this.isAgree, //1同意2不同意
          ccList: JSON.stringify(this.sendPerson),
          nodeList: JSON.stringify(this.data), //data personList
          urls: JSON.stringify(this.fileList1)
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.$vux.toast.show({
              type: "success",
              text: "提交成功"
            });
            setTimeout(() => {
              this.$router.replace({
                name: "select",
                params: {
                  index: 1
                }
              });
            }, 2000);
          }
        });
    }
  },
  mounted() {},
  watch: {
    expandedKeys(e) {
      console.log(e);
    }
  }
};
</script>
<style  scoped>
.vux-header {
  padding: 0px !important;
}
.info-detail {
  padding: 10px 16px 42px 16px;
  background: #fff;
}
.ctx {
  margin-top: 10px;
  display: flex;
}
.approve-btn {
  margin-top: 10px;
  height: 19px;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #16a6ff;
  line-height: 15px;
  border-radius: 2px;
  border: 1px solid #16a6ff;
  text-align: center;
  padding: 2px;
}
.left-title {
  width: 80px;
  height: 23px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
   color: rgba(51, 51, 51, 1);
  line-height: 23px;
  white-space: nowrap;
}
.right-content {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
   color: rgba(102, 102, 102, 1);

  line-height: 23px;
}
.upload-main {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.uploadImg {
  padding: 0 18px 15px 18px;
}
/* 审批流程 */
.progress {
  margin-top: 10px;
  padding: 10px 16px;
  background: #fff;
}
.series-txt {
  display: flex;
  justify-content: space-between;
}
.series-name {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  /* color: rgba(51, 51, 51, 1); */
}
.series-time {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  /* color: #999999; */
}
.progress-btn {
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
}
.approver {
  margin: 10px 0 10px 40px;
}
.approver-content {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.name-box {
  display: flex;
  flex-wrap: wrap;
  width: 50px;
  justify-content: center;
}
.nameImg {
  width: 45px;
  height: 45px;
  background: rgba(22, 166, 255, 1);
  font-size: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: flex;
  color: #fff;
}
.nameFont{
      white-space: nowrap;
}
/*btn*/
.button_box {
  width: 333px;
  height: 44px;
  background: rgba(22, 166, 255, 1);
  border-radius: 5px 6px 6px 6px;
  font-size: 1.25em;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 50px auto;
  display: block;
  border: none;
}
.button_box:active {
  background: rgba(22, 166, 255, 1);
  opacity: 0.8;
}
.mul-ctx {
  width: 265px;
  display: flex;
  justify-content: space-between;
}
/* 同意 未同意按钮 */
.tag {
  width: 99px;
  height: 35px;
  border: 1px solid;
  border-radius: 2px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.tag:active {
  width: 99px;
  height: 35px;
  border-radius: 2px;
  border: 1px solid rgba(132, 208, 255, 1);
  color: #16a6ff;
}

</style>
