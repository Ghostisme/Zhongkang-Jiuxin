/*
 * @Author: Yifei.Feng
 * @Date: 2019-12-18 13:53:11
 * @Last Modified by: Yifei.Feng
 * @Last Modified time: 2019-12-18 13:53:11
 */
<template>
  <div>
    <div v-if="chose">
      <!-- <div class="header">
        <x-header
          style="background-color:#16A6FF;position:fixed;z-index:199;left:0px;top:0px;width:100%;"
          v-show="showHeader"
          :left-options="setLeft"
          @on-click-back="leftBack"
        >{{systemName}}</x-header>
      </div>-->

      <div id="leave-page" class="page">
        <div class="main">
          <div class="main-card">
            <div class="card-font" style="padding-top: 15px;">加班时长剩余：{{overtime}}小时</div>
            <div class="card-font" style="padding-top: 10px;">年假剩余：{{remainingDays}}天</div>
            <div class="card-fonttint" style="padding: 10px 12px;">请假优先扣除已有加班时长，加班时长为0时,按事假计算</div>
          </div>
        </div>
        <group id="leave-type" label-width="5em" class="groupMargin">
          <div>
            <span class="key-star">*</span>
            <popup-picker
              :title="('请假类型')"
              :confirm-text="('确认')"
              :data="list1"
              v-model="value1"
              @on-change="holidayType"
              :placeholder="('请选择')"
            ></popup-picker>
          </div>
          <div>
            <span class="key-star">*</span>
            <datetime
              v-model="value2"
              :confirm-text="('确认')"
              :placeholder="('请选择')"
              format="YYYY-MM-DD HH:mm"
              :minute-list="['00', '15', '30', '45']"
              :title="('开始时间')"
              year-row="{value}年"
              month-row="{value}月"
              day-row="{value}日"
              hour-row="{value}点"
              minute-row="{value}分"
              @on-change="startTime"
            ></datetime>
          </div>
          <div>
            <span class="key-star">*</span>
            <datetime
              v-model="value3"
              :confirm-text="('确认')"
              :placeholder="('请选择')"
              format="YYYY-MM-DD HH:mm"
              :minute-list="['00', '15', '30', '45']"
              year-row="{value}年"
              month-row="{value}月"
              day-row="{value}日"
              hour-row="{value}点"
              minute-row="{value}分"
              :title="('结束时间')"
              @on-change="endTime"
            ></datetime>
          </div>
          <div>
            <span class="key-star" style="visibility:hidden;">*</span>
            <cell :title="('共计')" :value="sumday+('时')" class="gongji"></cell>
            <span></span>
          </div>
          <div id="urgency">
            <span class="key-star" style="visibility:hidden;">*</span>
            <popup-picker
              :title="('紧急程度')"
              :data="list2"
              :confirm-text="('确认')"
              v-model="value4"
              :placeholder="('请选择')"
              @on-change="urgency"
            ></popup-picker>
          </div>
        </group>
        <group label-width="5em" style="margin-top:10px;">
          <div>
            <div style="margin-top:10px">
              <span
                style="font-size: 20px; vertical-align: middle;color: #ff4747;padding: 0.8rem 0 0 0.8rem;"
              >*</span>
              <span>请假说明</span>
            </div>
            <div id="txtArea">
              <x-textarea
                style="font-size:14px;height:7em !important"
                name="description"
                :placeholder="('请输入请假原因')"
                class="textarea-border"
                @on-change="textArea"
                v-model="areaTxt"
                :max="200"
              ></x-textarea>
            </div>
          </div>
        </group>
        <group label-width="5em" style="margin-top:10px;">
          <div>
            <div style="margin-top:10px">
              <span
                style="font-size: 20px; vertical-align: middle;color: #ff4747;padding: 0.8rem 0 0 0.8rem;visibility:hidden;"
              >*</span>
              <span>说明附件</span>
            </div>
            <!-- 图片上传 -->
            <div class="upload-main">
              <van-uploader
                v-if="android_or_ios"
                class="uploadImg"
                v-model="fileList"
                :max-count="6"
                :preview-size="60"
                 @delete="delImg"
                 :before-read="beforeRead"
                :after-read="afterRead"               
              ></van-uploader>
              <van-uploader
                v-else
                class="uploadImg"
                v-model="fileList"
                :max-count="6"
                :preview-size="60"
                @click.native="androidUp"
                :after-read="afterRead"
                @delete="delImg"
              >
                <!-- <img  @click="androidUp" style="width: 60px;height: 60px;" src="@/assets/uploadImg.png" > -->
              </van-uploader>
            </div>
          </div>
        </group>
        <group id="process" label-width="5em" style="margin-top:10px;">
          <div>
            <span class="key-star">*</span>
            <popup-picker
              :title="('流程类型')"
              :data="list3"
              :confirm-text="('确认')"
              v-model="value5"
              :placeholder="('请选择')"
              @on-change="process"
            ></popup-picker>
          </div>
        </group>
        <group label-width="5em" style="margin-top:10px;">
          <div>
            <div style="margin-top:10px">
              <span
                style="font-size: 20px; vertical-align: middle;color: #ff4747;padding: 0.8rem 0 0 0.8rem;"
              >*</span>
              <span>审批人</span>
            </div>
            <!-- 串行 -->
            <div v-if="processType==true" class="approver">
              <ul class="approver-content">
                <li
                  v-for="(item, index) in personList"
                  :key="index"
                  style="display: flex; margin: 10px 30px 10px 0;"
                  @touchstart="showDelete(index)"
                >
                  <div>
                    <img v-if="item.url" class="addImg" :src="item.url" />
                    <div v-else class="nameImg">{{item.title.substr(1,2)}}</div>
                    <div class="nameFont">{{item.title}}</div>
                  </div>
                </li>
                <!-- +号点击 -->
                <li style="display: flex; margin: 10px 30px 10px 0;" @click="cAdd">
                  <div style="height: 45px;display: flex; align-items: center;">
                    <img class="addImg" src="@/assets/add-approve.png" />
                  </div>
                </li>
              </ul>
            </div>
            <!-- 并行 -->
            <div v-else class="approver">
              <div>
                <v-button
                  style="margin:0 6px 6px 6px"
                  type="primary"
                  icon="user-add"
                  @click="addTopNode"
                  title="增加一个顶级节点"
                >主审批人</v-button>
                <v-button
                  style="margin:0 6px 6px 6px"
                  type="warning"
                  icon="usergroup-add"
                  @click="addPerson"
                  :disabled="!selectNode"
                  title="选人"
                >选择下级审批人</v-button>
                <v-button
                  style="margin:0 6px 6px 6px"
                  type="primary"
                  icon="plus"
                  :disabled="!implementUserList"
                  @click="addNode"
                  title="插入一个子节点"
                >添加下级审批人</v-button>
                <v-button
                  style="margin:0 6px 6px 6px"
                  type="error"
                  icon="close"
                  :disabled="!selectNode"
                  @click="delNode"
                  title="删除节点"
                >删除人员</v-button>
              </div>
              <v-tree
                id="v-tree"
                style="font-size: 1.25em!important;"
                :data="editData"
                @select="select"
                ref="tree"
                showLine
              ></v-tree>
            </div>
          </div>
        </group>
        <group label-width="5em" style="margin-top:10px;">
          <div>
            <div style="margin-top:10px">
              <span
                style="font-size: 20px; vertical-align: middle;color: #ff4747;padding: 0.8rem 0 0 0.8rem;visibility:hidden;"
              >*</span>
              <span>抄送</span>
            </div>
            <div class="approver">
              <ul class="approver-content">
                <li
                  v-for="(item, index) in sendPerson"
                  :key="index"
                  style="display: flex; margin: 10px 30px 10px 0;"
                  @touchstart="showSendDelete(index)"
                >
                  <div>
                    <img v-if="item.url" class="addImg" :src="item.url" />
                    <div v-else class="nameImg">{{item.title.substr(1,2)}}</div>
                    <div class="nameFont">{{item.title}}</div>
                  </div>
                </li>
                <!-- +号点击 -->
                <li style="display: flex; margin: 10px 30px 10px 0;" @click="sendAdd">
                  <div style="height: 45px;display: flex; align-items: center;">
                    <img class="addImg" src="@/assets/add-approve.png" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </group>
        <div>
          <button class="button_box" @click="confirm">确定</button>
        </div>
      </div>
    </div>
    <chosePerson v-else :chose="chose" @choseListen="choseListen"></chosePerson>
  </div>
</template>
<script>
import { Dialog } from "vant";
import util from "@/libs/util";
import chosePerson from "./chosePerson";
import storejs from "storejs";
export default {
  components: {
    chosePerson
  },
  data() {
    return {
      chose: true, //选择人
      applyUserId: "", //请假人ID
      overtime: 66.5, //加班时长
      remainingDays: 10, //剩余天数
      showHeader: true, //不显示导航头
      setLeft: { preventGoBack: true, backText: "" }, //设置返回键
      systemName: "请假", //导航头标题
      list1: [],
      list2: [],
      newList:[],
      list3: [["串行", "并行"]],
      value1: [], //请假类型
      value2: "", //开始时间
      startmsTime: "", //开始毫秒时间
      value3: "", //结束时间
      endmsTime: "", //结束毫秒时间
      value4: ["普通"], //紧急程度
      value5: ["串行"], //流程类型
      processTxt: "串行", //流程类型
      urgencyTxt: 181, //紧急程度 默认普通id
      holidayTxt: null, //请假类型
      areaTxt: "", //文本域
      sumday: 0,
      personList: [], //串行
      personList1: [], //串行
      sendPerson: [], //抄送
      selectNode: null,
      editData: [],
      fileList: [],
      fileList1: [], //发给后台的
      processType: true, //流程类型，串行true，并行false
      implementUserList: null,
      android_or_ios: true //true是ios,false是android
    };
  },
  created() {
    if (storejs.get("loginUserInfo")) {
      const userList = JSON.parse(storejs.get("loginUserInfo"));
      this.applyUserId = userList.userId;
    } else {
      this.applyUserId = "7188";
    }
    // 判断ios或者Android
    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Android终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    if (/(Android)/i.test(navigator.userAgent)) {
      //Android终端
      this.android_or_ios = false;
      if (storejs.get("fileList")) {
        this.fileList = JSON.parse(storejs.get("fileList")); //上传图片数组
      }
    } else {
      //  ios或其它
      this.android_or_ios = true;
    }

    this.typeApi(); //请假类型接口
    this.urgencyApi(); //紧急程度接口
    if (storejs.get("holidayTxt")) {
      if (storejs.get("holidayTxt") != "null") {
        console.log("------------------------------------------------------");
        this.holidayTxt = storejs.get("holidayTxt");
        this.value1.push(this.holidayTxt); //请假类型
        this.value2 = storejs.get("startTime"); //开始时间
        this.value3 = storejs.get("endTime"); //结束时间
        this.sumday = storejs.get("sumday"); //共计天数
        this.areaTxt = storejs.get("areaTxt"); //请假说明
      }
    }

    if (storejs.get("urgency")) {
      if (storejs.get("urgency") != "null") {
        this.value4 = JSON.parse(storejs.get("value4")); //紧急程度
        this.urgencyTxt = storejs.get("urgency");
      }
    }

    if (storejs.get("processTxt")) {
      if (storejs.get("processTxt") != "null") {
        this.processTxt = storejs.get("processTxt"); //流程类型
        this.value5 = JSON.parse(storejs.get("value5"));
      }
    }
    if (storejs.get("fileList2")) {
      this.fileList = JSON.parse(storejs.get("fileList2")); //上传图片数组
    }

    if (localStorage.getItem("personList") != "null") {
      this.personList = JSON.parse(localStorage.getItem("personList")); //串行选人数组
    }

    let sendPerson2 = localStorage.getItem("sendJson"); //抄送选人数组
    this.sendPerson = JSON.parse(sendPerson2);
    let id = this.$route.params.approvalId;
    this.processTxt = storejs.get("processTxt");

    // 并行
    if (localStorage.getItem("editData")) {
      this.editData = JSON.parse(localStorage.getItem("editData"));
    }

    if (this.processTxt == "并行") {
      console.log(this.processType);
      this.processType = false;
    } else {
      this.processType = true;
    }
  },
  mounted() {
    window["and_uploadApi"] = url => this.and_uploadApi(url);
    if (localStorage.getItem("bingJson")) {
      let bingJson = JSON.parse(localStorage.getItem("bingJson"));
    }
  },
  methods: {
    typeApi() {
      //请假类型
      util.get("/apply/leave/leaveTypeList").then(res => {
        if (res.status == 200) {
          let obj = res.data.resultMap.result;
          let newArr = [];
          for (let i of obj) {
            newArr.push(i.name);
          }
          this.list1.push(newArr);
        }
        // this.departments = response.data.resultMap;
      });
    },
    urgencyApi() {
      //紧急程度
      util.get("/apply/leave/urgentList").then(res => {
        if (res.status == 200) {
          let obj = res.data.resultMap.result;
          let newArr = [];
          let arr =[];
          for (let i of obj) {
            console.log(i);
            newArr.push(i);
            arr.push(i.name);
          }
          this.list2.push(newArr);
          this.newList.push(arr);
          console.log(this.list2);
        }
        // this.departments = response.data.resultMap;
      });
    },
    uploadApi(e) {
      // 上传图片
      console.log(e);
      let formData = new FormData();
      formData.append("file", e);
      util.postFile("/common/uploadImage", formData).then(res => {
        if (res.status == 200) {
          let imgObj = {
            url: res.data.resultMap.imageUrl
          };
          this.fileList1.push(imgObj);
          storejs.set("fileList", JSON.stringify(this.fileList1)); //图片
          this.$vux.toast.text("上传成功", "top");
        }
      });
    },
    delImg(e,detail) {
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Android终端
      if (/(Android)/i.test(navigator.userAgent)) {
        //Android终端
        storejs.set("fileList", JSON.stringify(this.fileList));
      }
      else{
        //ios或其它
        let index = detail.index;
         let imgArr= JSON.parse(storejs.get("fileList"));
         imgArr.splice(index,1)
         console.log(imgArr) 
         storejs.set("fileList", JSON.stringify(imgArr));
          storejs.set("fileList2", JSON.stringify(this.fileList))
      }
    },
    // android图片上传
    and_uploadApi(e) {
     this.$vux.toast.text(e, "middle");
      if (e == "" || e == null) {
        this.$vux.toast.text("上传失败", "middle");
      } else {
        this.$vux.toast.show({
          text: "上传成功"
        });
      }
      var obj = {
        url: e
      };
      this.fileList.push(obj);
      storejs.set("fileList", JSON.stringify(this.fileList)); //图片
    },
    // 删除人员节点
    showDelete(item) {
      console.log(item);
      Dialog.confirm({
        message: "确认删除该人员吗？"
      })
        .then(() => {
          this.personList.splice(item, 1);
          var delPerson = JSON.stringify(this.personList);
          console.log(delPerson);
          localStorage.setItem("personList", delPerson);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 删除抄送人节点
    showSendDelete(item) {
      Dialog.confirm({
        message: "确认删除该人员吗？"
      })
        .then(() => {
          this.sendPerson.splice(item, 1);
          var delPerson = JSON.stringify(this.sendPerson);
          console.log(delPerson);
          localStorage.setItem("sendJson", delPerson);
        })
        .catch(() => {
          // on cancel
        });
    },
     // 图片上传前校验
    beforeRead(file) {
      console.log(file)
      if (file.type !== 'image/jpeg'&&file.type !== "image/png") {
        this.$vux.toast.text("请上传正确图片格式", "top");
        return false;
      }
      return true;
    },
    // 请假类型
    holidayType(val) {
      this.holidayTxt = val[0];
      console.log(this.holidayTxt);
    },
    // 开始时间
    startTime(e) {
      this.value2 = e;
      this.startmsTime = new Date(e.replace(/\-/g, "/")); //时间转毫秒
      this.endmsTime = new Date(this.value3.replace(/\-/g, "/")); //时间转毫秒
      if (this.endmsTime != "") {
        console.log(this.startmsTime >= this.endmsTime);
        if (this.startmsTime >= this.endmsTime) {
          this.$vux.toast.text("开始时间不能大于等于结束时间", "middle");

          this.value2 = "请重新选择";
        } else {
          var countms = Number(this.endmsTime) - Number(this.startmsTime);

          this.sumday = countms / (1000 * 60 * 60); //毫秒转为天
          console.log(this.sumday);
        }
      }
    },
    // 结束时间
    endTime(e) {
      this.value3 = e;
      this.endmsTime = new Date(e.replace(/\-/g, "/")); //时间转毫秒
      this.startmsTime = new Date(this.value2.replace(/\-/g, "/")); //时间转毫秒
      if (this.startmsTime != "") {
        if (this.startmsTime >= this.endmsTime) {
          this.$vux.toast.text("开始时间不能大于等于结束时间", "middle");
          this.value3 = "请重新选择";
        } else {
          var countms = Number(this.endmsTime) - Number(this.startmsTime);
          this.sumday = countms / (1000 * 60 * 60); //毫秒转为天
        }
      }
    },
    // 紧急程度
    urgency(val) {
      let arr = [];
       let index = val[0] - 1;
      if(!isNaN(index)){
        let ctx = this.list2[0][index];
      if (ctx) {
        console.log(ctx.name);
        this.urgencyTxt = ctx.id;
        arr.push(ctx.name);
        this.value4 = arr;
      }
      }    
    },
    // 文本域
    textArea(val) {
      this.areaTxt = val;
      console.log(this.areaTxt);
    },
    androidUp() {
      //判断是Android还是ios上传
      console.log("=====================================");
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Android终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
      } else if (/(Android)/i.test(navigator.userAgent)) {
        android.HeadImage();
        storejs.get("fileList"); //图片
        if (storejs.get("fileList")) {
          this.fileList = JSON.parse(storejs.get("fileList"));
        }
      }
    },
    // 图片上传
    afterRead(file) {
      // 大于2MB的图片都缩小像素上传
      if (file.file.size > 2000000) {
        let canvas = document.createElement("canvas"); // 创建Canvas对象(画布)
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = file.content; // 指定图片的DataURL(图片的base64编码数据)
        img.onload = () => {
          canvas.width = 400;
          canvas.height = 300;
          context.drawImage(img, 0, 0, 400, 300);
          file.content = canvas.toDataURL(file.file.type, 0.92); // 0.92为默认压缩质量
          let files = this.dataURLtoFile(file.content, file.file.name);
          this.uploadApi(files); //上传图片接口
          storejs.set("fileList2", JSON.stringify(this.fileList)); //图片
        };
      } else {
        this.uploadApi(file.file); //上传图片接口
        console.log(this.fileList);
        storejs.set("fileList2", JSON.stringify(this.fileList)); //图片
      }
    },
    dataURLtoFile (dataurl, filename) { // 将base64转换为file文件
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {type: mime})
    },
    // 流程类型
    process(val) {
      console.log(val[0]);
      this.processTxt = val[0];
      if (val[0] == "串行") {
        this.processType = true;
        localStorage.setItem("editData", JSON.stringify([]));
        this.editData = [];
      } else {
        this.processType = false;
        localStorage.setItem("personList", JSON.stringify([]));
        this.personList = [];
      }
    },
    //串行审批添加人员
    cAdd() {
      this.$vux.toast.text("一次仅能选取一个人员", "top");
      this.storage();
      this.$router.push({
        name: "chosePerson",
        params: {
          title: "chuan"
        }
      });
      console.log("串行审批添加人员");
    },

    /*并行审批人员*/
    choseListen(e) {
      console.log(e);
      this.chose = e.chose;
      this.implementUserList = e.implementUserList;
    },

    //选中节点
    select(selectedNodes) {
      this.selectNode = selectedNodes[0];
    },
    // 添加顶级节点
    addTopNode() {
      if (this.editData.length == 0) {
        this.storage();
        this.$router.push({
          name: "chosePerson",
          params: {
            title: "bing"
          }
        });
      } else {
        Dialog.confirm({
          message: "您主审批人已存在，再次选择将清除下级审批人，是否选择？"
        })
          .then(() => {
            this.storage();
            this.$router.push({
              name: "chosePerson",
              params: {
                title: "bing"
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    addPerson() {
      this.chose = false;
    },
    //添加子节点
    addNode() {
      this.$refs.tree.addNode(this.selectNode.clue, this.implementUserList);
      localStorage.setItem("editData", JSON.stringify(this.editData));
      this.implementUserList = null;
    },
    //删除节点
    delNode() {
      Dialog.confirm({
        message: "确认删除选中人员？"
      })
        .then(() => {
          this.$refs.tree.delNode(this.selectNode.clue);
          localStorage.setItem("editData", JSON.stringify(this.editData));
        })
        .catch(() => {
          // on cancel
        });
    },
    //抄送
    sendAdd() {
      console.log(this.sendPerson);
      if (this.sendPerson) {
        Dialog.confirm({
          message: "您已选择抄送人是否替换？"
        })
          .then(() => {
            this.$vux.toast.text("一次可选取多个人员", "top");
            this.storage();
            this.$router.push({
              name: "chosePerson",
              params: {
                title: "send"
              }
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$vux.toast.text("一次可选取多个人员", "top");
        this.storage();
        this.$router.push({
          name: "chosePerson",
          params: {
            title: "send"
          }
        });
      }
    },
    // 提交
    confirm() {
      console.log(this.processTxt);
      console.log(this.value4);
      if (!this.holidayTxt) {
        this.$vux.toast.text("请假类型必填", "top");
        return false;
      }
      if (!this.value2) {
        this.$vux.toast.text("开始时间必填", "top");
        return false;
      }
      if (this.value2 == "请重新选择") {
        this.$vux.toast.text("开始时间不能大于等于结束时间", "top");
        return false;
      }
      if (!this.value3) {
        this.$vux.toast.text("结束时间必填", "top");
        return false;
      }
      if (this.value3 == "请重新选择") {
        this.$vux.toast.text("开始时间不能大于等于结束时间", "top");
        return false;
      }
      if (!this.areaTxt) {
        this.$vux.toast.text("请假说明必填", "top");
        return false;
      }
      // if (!this.processTxt) {
      //   this.$vux.toast.text("流程类型必填", "top");
      //   return false;
      // }
      // ||this.personList.length == 0 && this.editData.length == 0
      console.log(this.personList);
      console.log(this.editData);

      if (this.processTxt == "并行") {
        if (this.editData == null) {
          this.$vux.toast.text("并行审批人必填", "top");
          return false;
        }
        if (this.editData != null) {
          if (this.editData.length == 0) {
            this.$vux.toast.text("并行审批人必填", "top");
            return false;
          }
        }
        var nodeList = JSON.stringify(this.editData);
      } else {
        if (this.personList == null) {
          //串行不为空
          this.$vux.toast.text("审批人必填", "top");
          return false;
        }
        if (this.personList != null) {
          if (this.personList.length == 0) {
            this.$vux.toast.text("审批人必填", "top");
            return false;
          }
        }
        var nodeList = JSON.stringify(this.personList);
      }
      util
        .post("/apply/leave/save", {
          leaveType: this.holidayTxt, //请假类型
          startTime: this.value2, //开始时间
          endTime: this.value3, //结束时间
          countDay: parseFloat(this.sumday), //共计天数
          urgency: this.urgencyTxt, //紧急程度
          leaveNote: this.areaTxt, //请假说明
          processType: this.value5[0], //流程类型
          applyUserId: this.applyUserId,
          ccList: JSON.stringify(this.sendPerson),
          nodeList: nodeList, //data JSON.stringify(this.personList)
          urls: storejs.get("fileList")
        })
        .then(res => {
          var that = this;
          if (res.data.status == "1") {
            console.log(res);
            this.$vux.toast.show({
              type: "success",
              text: "提交成功"
            });
            this.clearStorage();
            setTimeout(function() {
              that.$router.replace({ path: "/menu" });
            }, 2000);
          }
        });
    },
    // 存储
    storage() {
      storejs.set("holidayTxt", this.holidayTxt); //请假类型
      storejs.set("startTime", this.value2); //开始时间
      storejs.set("endTime", this.value3); //结束时间
      storejs.set("sumday", this.sumday); //共计天数
      storejs.set("urgency", this.urgencyTxt); //紧急程度
      storejs.set("value4", JSON.stringify(this.value4)); //紧急程度
      storejs.set("areaTxt", this.areaTxt); //请假说明
      storejs.set("processTxt", this.processTxt); //流程类型
      storejs.set("value5", JSON.stringify(this.value5)); //流程类型
    },
    //清除存储
    clearStorage() {
      localStorage.removeItem("holidayTxt");
      localStorage.removeItem("startTime");
      localStorage.removeItem("endTime");
      localStorage.removeItem("urgency");
      localStorage.removeItem("value4");
      localStorage.removeItem("value5");
      localStorage.removeItem("areaTxt");
      localStorage.removeItem("processTxt");
      localStorage.removeItem("fileList2");
      localStorage.removeItem("editData");
      localStorage.removeItem("personList");
      localStorage.removeItem("fileList");
      localStorage.removeItem("sendJson");
    }
  },

  watch: {
    sumday(e) {
      console.log("-------------------------------");
      console.log(typeof e);
      if (e == "NaN天" || isNaN(e)) {
        this.sumday = 0;
      }
    },
    fileList1(e) {
      console.log(e);
    },
    editData(e) {
      //并行数组
      localStorage.setItem("editData", JSON.stringify(e));
    },
    selectNode(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
#leave-page {
  position: fixed;
  top: 0px;
  width: 100%;
  overflow-y: auto;
  left: 0;
  bottom: 0;
  right: 0;
}
.vux-header {
  padding: 0px !important;
}

.main {
  padding: 15px 17px 10px 17px;
}
.main-card {
  height: 125px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px 0px rgba(153, 153, 153, 0.4);
  border-radius: 5px;
}
.card-font {
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.card-fonttint {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}
.key-star {
  font-size: 20px;
  vertical-align: middle;
  color: #ff4747;
  float: left;
  padding: 0.7rem 0 0 0.8rem;
  margin-right: -0.5rem;
}
.approver {
  margin: 10px 0 10px 40px;
}
.approver-content {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
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
/* 添加按钮 */
.addImg {
  width: 45px;
  height: 45px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: flex;
}
.nameFont {
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #666;
  margin-top: 10px;
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
.upload-main {
  display: flex;
  justify-content: center;
}
.uploadImg {
  padding: 10px 30px;
  width: 400px;
}
#leave-type .vux-cell-box:before {
  border-top: 0px !important;
}
#urgency .vux-cell-box:not(:first-child):before {
  border-top: 2px solid #eee !important;
  margin-left: 15px;
}
</style>
