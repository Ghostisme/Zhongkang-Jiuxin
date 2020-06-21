<template>
	<div class="addLog" id="addLog">
		<!--<div class="top_box"></div>-->
		<!--<x-header style="background-color: #06a6ff;color: #FFF !important;" :left-options="{backText: ''}">添加日志</x-header>-->
		<div class="textarea_box">
			<x-textarea :max="200" name="log_textarea" placeholder="请输入日志内容" v-model="textareaContent" @on-blur="handleTextarea()"></x-textarea>
			<div class="underline"></div>
		</div>
		<div class="list_box">
			<ul class="list">
				<li v-for="(key, value) in listObj" @click.stop="liClick($event, key.id, key)" :data-id="key.id" :key="key.id">
					<div class="listBox">
						<template v-if="key.id == 0">
							<div class="listItem">
								<img :src="key.url" :alt="key.name"/>
								{{ key.name }}
								<div class="imgList">
									<template v-if="key.id == 0">
										<div v-for="(item, index) in imgList" :key="index" :class="imgList[index] ? 'showImg imgActive' : 'showImg' " ref="showImgBox">
											<img :src="item" alt="这是图片"/>
											<i class="imgClose" @click.stop="delClose(index)"></i>
										</div>
									</template>
								</div>
							</div>
						</template>
						<template v-else-if="key.id == 1 || key.id == 2">
							<div class="listItem">
								<img :src="key.url" :alt="key.name"/>
								{{ key.name }}
								<span :class="key.flag ? 'showText spanActive' : 'showText' ">{{ key.spanContent }}</span>
							</div>
						</template>
						<template v-else>
							<div class="listItem" v-show="isShow">
								<img :src="key.url" :alt="key.name"/>
								{{ key.name }}
								<span :class="key.flag ? 'showText spanActive' : 'showText' ">{{ key.spanContent }}</span>
							</div>
						</template>
						<div class="iconBox" v-if="key.id==1" @click.stop="iconClick($event, iconId, value)" :dataId="iconId">
							<img :src="iconImg"/>
							{{ iconText }}
						</div>
					</div>
				</li>
			</ul>
		</div>
		<input type="hidden" name="userIdVal" id="userIdVal" :value="userId" />
		<input type="hidden" name="createByVal" id="createByVal" :value="createBy" />
		<input type="hidden" name="pageId" id="pageId" :value="pageId" />
		<!--<div class="button_box">
			<img :src="btnimg" @click="sumbitClick"/>
			<x-button class="btn">
				<img :src="btnimg"/>
			</x-button>
		</div>-->
		<div class="button_box">
			<div class="button_Box">
				<button type="button" class="btn" @click="sumbitClick">提交</button>
			</div>
		</div>
		<!--alert-->
		<div class="mask" @click="closeAlert" v-show="changeAlert">
			<div class="alert_box" ref="alertContent">
				<div class="tab_Box">
					<div
						class="tab"
						v-for="(item, index) in tabList"
						@click="clickTab($event, index)"
						:selected="selectDom"
						:class="showTab == index ? 'active' : '' "
						:key="index"
						:dataid="index"
					>
						{{ item }}
					</div>
				</div>
				<div class="alert_content" v-if="showContent">
					<div class="chooseBox">
						<div class="chooseReward" ref="chooseIcon" v-for="(item, index) in chooseList" :class="showChoose == index ? 'chooseActive' : '' " :key="index" @click="handleChoose($event, index)">
							 <!--:class="showChoose == index ? 'chooseActive' : '' "-->
							<img :src="item.chooseIcon"/>
							{{ item.chooseText }}
						</div>
					</div>
					<div class="alert_mid">
						<img :src="alertImg"/>
						<x-input :max="maxLength" v-model="rewardVal" :placeholder="inputPlaceholder"></x-input>
						{{ alertMsg }}
					</div>
					<div class="alert_btn">
						<x-button class="alertBtn" @click.native="alertBtnClick($event, 4)">打赏</x-button>
					</div>
				</div>
				<div class="alert_content" v-else>
					<div class="chooseBox">
						<div class="chooseReward" ref="chooseIcon" v-for="(item, index) in chooseList" :class="showChoose == index ? 'chooseActive' : '' " :key="index" @click="handleChoose($event, index)">
							<img :src="item.chooseIcon"/>
							{{ item.chooseText }}
						</div>
					</div>
					<div class="alert_mid">
						<img :src="alertImg"/>
						<x-input :max="maxLength" v-model="redEnvelopesVal" :placeholder="inputPlaceholder"></x-input>
						{{ alertMsg }}
					</div>
					<div class="alert_btn">
						<x-button class="alertBtn" @click.native="alertBtnClick1($event, 3)">打赏</x-button>
					</div>
				</div>
			</div>
		</div>
		<!--pictureAlert-->
		<div class="picMask" v-show="picShow" @click="picMaskClick">
			<div class="pic_box" ref="picBox">
				<div class="listitem">
					拍照
					<input
				      id="upload_file"
				      type="file"
				      style="display: block;"
				      accept="image/*"
				      name="file"
				      capture="camera"
				      @change="handleCamera($event)"
				    />
				</div>
				<div class="listitem">
					从手机相册选择
					<input
				      id="upload_file1"
				      type="file"
				      style="display: block;"
				      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
				      name="files"
				      @change="handlePic($event)"
				    />
				    <!--multiple="multiple"-->
				    <!--maxlength="2"-->
				</div>
				<div class="listitem" @click="cancelClick">取消</div>
			</div>
		</div>
		<!--pictureAlert-->
		<!--<div class="pictureAlert">
			<actionsheet  v-model="pictureMenu" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>
		</div>-->
		<div id="map-container" v-show="showMap"></div>
		<div id="result" style="width: 50px;display:flex;"></div>
	</div>
</template>

<script>
	import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux';
	import  { LoadingPlugin } from 'vux'
	import $ from "jquery";
	import storejs from 'storejs'
	import util from '@/libs/util';
	import cAPI from "@/libs/cordovaAPI";
	import axios from 'axios';
	import { location } from "@/com/modules/task/addLog/LocationUtil.js";
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

	export default {
		components: {
			Actionsheet,
			Toast,
			axios
		},
		computed: {
			...mapState(['cookieData'])
		},
		data() {
			return {
				listObj: [
					{
						name: "添加照片",
						url: require("@/assets/icon-1@2x.png"),
						id: 0,
						flag: false,
						spanContent: ""
					},
					{
						name: "所在位置",
						url: require("@/assets/icon-2@2x.png"),
						id: 1,
						flag: false,
						spanContent: ""
					},
					{
						name: "提醒谁看",
						url: require("@/assets/icon-3@2x.png"),
						id: 2,
						flag: false,
						spanContent: ""
					},
					{
						name: "红包打赏",
						url: require("@/assets/icon-4@2x.png"),
						id: 3,
						flag: false,
						spanContent: ""
					},
					{
						name: "积分打赏",
						url: require("@/assets/icon-5@2x.png"),
						id: 4,
						flag: false,
						spanContent: ""
					},
				],
//				btnimg: require("@/assets/提交@2x.png"),
				btnimg: require("@/assets/Button-More.png"),
				tabList: ['积分', '红包'],
    			demo3: '积分',
    			showContent: true,
    			alertImg: require("@/assets/icon-5@2x.png"),
    			inputPlaceholder: "1-99",
    			alertMsg: "分",
    			rewardVal: "",
    			redEnvelopesVal: "",
    			showTab: 0,
    			maxLength: 2,
    			changeAlert: false,
    			selectDom: "",
    			pictureMenu: false,
    			menus: {
			        menu1: "拍照",
			        menu2: "从手机相册选择"
			    },
			    show: false,
			    iconText: "不显示位置",
			    iconImg: require("@/assets/chooseIcon.png"),
			    iconId: 1,
			    spanText: "测试",
			    imgList: [],
			    textareaContent: null,
			    userId: null,
			    createBy: null,
			    picShow: false,
			    showMap: false,
			    chooseList: [
			    	{
			    		chooseIcon: require("@/assets/chooseIcon.png"),
			    		chooseText: "奖励"
			    	},
			    	{
			    		chooseIcon: require("@/assets/nochoose.png"),
			    		chooseText: "惩罚"
			    	}
			    ],
			    showChoose: 0,
			    pageId: null,
			    dataList: {},
				isShow: false,
				// userid: null
			};
		},
		watch: {
			'$route': 'getParams'
		},
		beforeCreate () {
			const pageIdParams = this.$store.state.logData.cookieData.pageId;
			if (pageIdParams == "clear") {
				localStorage.removeItem("listObj");
				localStorage.removeItem("imgList");
				// this.clearList();
				this.$store.commit('clearList');
				localStorage.removeItem("commentChoosePeople");
				localStorage.removeItem("logChoosePeople");
			}
		},
		created () {
			this.getParams();
			this.showBonusPenalty();
			const listObj = localStorage.getItem("listObj");
			const imglist = localStorage.getItem("imgList");
			if (listObj) this.listObj = JSON.parse(listObj);
			if (imglist) this.imgList = JSON.parse(imglist);
		},
		mounted() {
			window['imgCallBack'] = url => this.imgCallBack(url);
			console.log(this.$store.state);
			if (storejs.get("logChoosePeople") == undefined) return;
			const pageId = localStorage.getItem("pageId");
			const rewardVal = localStorage.getItem("rewardVal");
			const redEnvelopesVal = localStorage.getItem("redEnvelopesVal");
			let aiteUserList;
			let excitationUserList;
			let excitationUserList1;
			this.listObj.map((item, index) => {
				if (item.flag) return item.flag == true;
			})
			if(this.listObj[1].flag == true) this.iconImg = require("@/assets/nochoose.png");
			else this.iconImg = require("@/assets/chooseIcon.png");
			if (this.$store.state.logData.logContent != null) this.textareaContent = this.$store.state.logData.logContent;
			switch (pageId){
				case "2":
					this.echoData (pageId, null, " ", aiteUserList);
					break;
				case "3":
					this.echoData (pageId, redEnvelopesVal, "元 ", excitationUserList);
					break;
				case "4":
					this.echoData (pageId, rewardVal, "分 ", excitationUserList1);
					break;
				default:
					break;
			}
		},
		methods: {
			...mapMutations(['changeList', 'clearList', 'changeCookieData']),
			//li-click
		    liClick(e, id, obj) {
				let tempObj = {};
		    	switch (id){
		    		case 0:
						let u = navigator.userAgent;
						let isAndroid = u.indexOf("android") > -1 || u.indexOf("Linux") > -1;
						let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
						// if(isAndroid) android.HeadImage();
						if (this.imgList.length > 2) {
							this.$vux.toast.text("图片最多三张!", 'middle');
							this.picShow = false;
							return;
						}else{
							if(isIOS) {
								this.picShow = true;
							}
							if(isAndroid) android.HeadImage();
						}
						tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		case 1:
		    			if (obj.flag) {
		    				this.$vux.loading.show({
								text: 'Loading'
							})
			    			setTimeout(() => {
			    				this.$vux.loading.hide();
			    			}, 2000);
						}
						tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		case 2:
						if(storejs.get("logChoosePeople") != undefined){
							storejs.set("logChoosePeople", storejs.get("logChoosePeople"));
						}
						this.$router.push({ path:'/logAddressList/logSelectAddressList' });
//						this.$router.push({ path:'/addressList/selectAddressList' });
						localStorage.setItem("pageId", 2);
						localStorage.setItem("howpageId", 2);
						storejs.set("jumpFrom","warnList");
						tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		case 3:
		    			this.changeAlert = true;
		    			this.showTab = 1;
						this.showContent = false;
						this.alertImg = require("@/assets/icon-4@2x.png");
						this.maxLength = 4;
						this.inputPlaceholder = "1-9999";
						this.alertMsg = "元";
						localStorage.setItem("pageId", 2);
						tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		case 4:
		    			this.changeAlert = true;
		    			this.showTab = 0;
		    			this.showContent = true;
						this.alertImg = require("@/assets/icon-5@2x.png");
						this.maxLength = 2;
						this.inputPlaceholder = "1-99";
						this.alertMsg = "分";
						localStorage.setItem("pageId", 2);
						tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		default:
		    			break;
		    	}
		    },
		    //alert close
		    closeAlert(e) {
		    	if (!this.$refs.alertContent.contains(e.target)) this.changeAlert = !this.changeAlert;
		    },
		    //alert tab
		    clickTab(e, id) {
				this.showTab = id;
				if (id == 1) {
					this.showContent = false;
					this.alertImg = require("@/assets/icon-4@2x.png");
					this.maxLength = 4;
					this.inputPlaceholder = "1-9999";
					this.alertMsg = "元";
				}else{
					this.showContent = true;
					this.alertImg = require("@/assets/icon-5@2x.png");
					this.maxLength = 2;
					this.inputPlaceholder = "1-99";
					this.alertMsg = "分";
				}
		    },
		    //location click
		    iconClick (e, id, val) {
				console.log(val);
		    	if (id == 1) {
		    		this.iconImg = require("@/assets/nochoose.png");
		    		this.iconId = 2;
		    		this.$options.methods.getLocation(this.listObj);
//		    		this.getLocation(this.listObj);
		    		this.listObj[val].flag = true;
		    	} else{
		    		this.iconImg = require("@/assets/chooseIcon.png");
		    		this.iconId = 1;
		    		this.listObj[val].flag = false;
		    	}
		    },
		    //alert btn click
		    alertBtnClick (e, id) {
		    	//4 积分
				this.changeAlert = !this.changeAlert;
				//分奖惩
				let chooseIconList = this.$refs.chooseIcon;
				let chooseIndex = 0;
				if (chooseIconList[0].className == "chooseReward chooseActive") {
					chooseIndex = 0;
				}
				if (chooseIconList[1].className == "chooseReward chooseActive") {
					chooseIndex = 1;
				}
				// 验证
				if(this.rewardVal == "" || this.rewardVal == null || this.rewardVal == undefined){
					this.$vux.toast.text("积分不可为空!", 'middle');
					return;
				}
				// const reg = /[^\w]/g;
				// if(this.rewardVal == this.rewardVal.replace(reg,'')){
				// 	this.$vux.toast.text("只可输入数字!", 'middle');
				// 	return;
				// }
				// const reg = /^[0-9]*$/;
				const reg = /^[1-9]\d*$/;
				if(!reg.test(this.rewardVal)){
					this.$vux.toast.text("输错喽~亲", 'middle');
					return;
				}
				// choosePeople
				this.$router.push({ path:'/log/rewardsPunishments' })
				// this.$router.push({
				// 	path:'/logAddressList/logSelectAddressList',
				// })
//				this.$router.push({
//					path:'/addressList/selectAddressList',
//				})
        		storejs.set("jumpFrom","warnList");
				//res
				if (chooseIndex == 0) {
					localStorage.setItem("rewardVal", this.rewardVal);
				}else{
					localStorage.setItem("rewardVal", this.rewardVal);
				}
				localStorage.setItem("pageId", 4);
				localStorage.setItem("howpageId", 2);
				localStorage.setItem("integral", chooseIndex);
		    },
		    alertBtnClick1 (e, id) {
		    	//3红包
		    	this.changeAlert = !this.changeAlert;
				//分奖惩
				let chooseIconList = this.$refs.chooseIcon;
				let chooseIndex = null;
				if (chooseIconList[0].className == "chooseReward chooseActive") {
					chooseIndex = 0;
				}
				if (chooseIconList[1].className == "chooseReward chooseActive") {
					chooseIndex = 1;
				}
				// 验证
				if(this.redEnvelopesVal == "" || this.redEnvelopesVal == null || this.redEnvelopesVal == undefined){
					this.$vux.toast.text("红包不可为空!", 'middle');
					return;
				}
				// const reg = /[^\w]/g;
				// if(this.redEnvelopesVal == this.redEnvelopesVal.replace(reg,'')){
				// 	this.$vux.toast.text("只可输入数字!", 'middle');
				// 	return;
				// }
				// const reg = /^[0-9]*$/;
				const reg = /^[1-9]\d*$/;
				if(!reg.test(this.redEnvelopesVal)){
					this.$vux.toast.text("输错喽~亲", 'middle');
					return;
				}
				//choosePeople
				this.$router.push({ path:'/log/rewardsPunishments' })
				// this.$router.push({
				// 	path:'/logAddressList/logSelectAddressList',
				// })
//				this.$router.push({
//					path:'/addressList/selectAddressList',
//				})
    			storejs.set("jumpFrom","warnList");
				//res
				if (chooseIndex == 0) {
					localStorage.setItem("redEnvelopesVal", this.redEnvelopesVal);
				}else {
					localStorage.setItem("redEnvelopesVal", this.redEnvelopesVal);
				}
				localStorage.setItem("pageId", 3);
				localStorage.setItem("howpageId", 2);
				localStorage.setItem("redEnvelopes", chooseIndex);
		    },
		    // img close btn icon
		    delClose (index) {
		    	console.log("关闭");
				this.imgList.splice(index, 1);
		    },
		    // 提交点击
		    sumbitClick (e) {
		    	console.log("点击确定");
		    	const pageId = localStorage.getItem("pageId");
		    	const integral = localStorage.getItem("integral");//积分
		    	const redEnvelopes = localStorage.getItem("redEnvelopes");//红包
				const rewardVal = localStorage.getItem("rewardVal");
				const redEnvelopesVal = localStorage.getItem("redEnvelopesVal");
				const aiteUserList = JSON.stringify(this.$store.state.logData.aiteUserList);
				const excitationUserList = this.$store.state.logData.excitationUserList;
				const excitationUserList1 = this.$store.state.logData.excitationUserList1;
		    	let sendData = {};
		    	sendData.file = JSON.stringify(this.imgList);
		    	sendData.description = this.textareaContent;
//		    	sendData.latitude = 39.11712;
//		    	sendData.longitude = 117.2147;
				//地址
				sendData.plance = this.listObj[1].spanContent;
				// sendData.userId = this.userId;
				sendData.userId = this.userid;
				//人
		    	// sendData.userId = 7188;
		    	sendData.createBy = this.userId;
				// sendData.createBy = 7188;
				//@人员
				if (aiteUserList == null || aiteUserList == "[]" || aiteUserList == "null") sendData.aiteUserList = "";
				else sendData.aiteUserList = aiteUserList;
				// sendData.aiteUserList = [{"0":"1","0":"张三"},{"0":"2","0":"李四"}];
				//奖罚积分
				let excitationUnit = "";
				let excitationCategory = "";
				let excitationAmount = "";
				let resExcitationUserList = [];
				//根据pageid 是红包还是积分 3->红包  4->积分
				if (redEnvelopes == 0) excitationCategory = "1";
				else excitationCategory = "2";
				if (excitationUserList != null) {
					excitationUserList.map((item, index) => {
						item.excitationUnit = 1;
						item.excitationCategory = excitationCategory;
						item.excitationAmount = redEnvelopesVal;
					})
				}
				if (integral == 0) excitationCategory = "1";
				else excitationCategory = "2";
				if (excitationUserList1 != null) {
					excitationUserList1.map((item, index) => {
						item.excitationUnit = 2;
						item.excitationCategory = excitationCategory;
						item.excitationAmount = rewardVal;
					})
				}
				if (excitationUserList != null) {
					excitationUserList.map((item, index) => {
						resExcitationUserList.push(item);
					});
				}
				if (excitationUserList1 != null) {
					excitationUserList1.map((item, index) => {
						resExcitationUserList.push(item);
					});
				}
				//奖罚数据整合
				if(resExcitationUserList.length == 0) sendData.excitationUserList = "";
				else sendData.excitationUserList = JSON.stringify(resExcitationUserList);
		    	console.log(sendData);
		    	//接口请求
				let api = "taskLog/saveTaskLog";
				let taskInfo = JSON.parse(storejs.get("params"));
				let taskId = taskInfo.taskId;
				// let taskId = "775b010eaf184b1797b746d25bb92568";
				sendData.taskId = taskId;
				// let result = document.getElementById("result");
				// result.innerText = JSON.stringify(sendData);
				// sendData.taskId = "6928b7880aa842be8a9430c7bf8742d8";
				// sendData.taskId = "775b010eaf184b1797b746d25bb92568";
				//表单非空验证
	    		if (sendData.description == null || sendData.description == "" || sendData.description == undefined) {
	    			this.$vux.toast.text("日志内容不可为空!", 'middle');
	    			return;
	    		}
				util.getList(api, sendData).then(res => {
					console.log(res);
					if(res.data.result.code == 1) {
						this.$vux.toast.text(res.data.result.message, 'middle');
						this.$router.replace({
							path: "/taskProgress"
						})
					}
					//保存完数据跳转日志列表
				}).catch(error => {
					console.log('Error', error.message);
				});
		    },
		    //获取传的参数
		    getParams () {
				// 取到路由带过来的参数
				const userList = JSON.parse(storejs.get("loginUserInfo"));
				const userIdParams = userList.userId;
			    const createByParams = this.$store.state.logData.cookieData.createBy;
				const pageIdParams = this.$store.state.logData.cookieData.pageId;
			    // const userIdParams = this.$route.query.userId;
			    // const createByParams = this.$route.query.createBy;
			    // const pageIdParams = this.$route.query.pageId;
			    // console.log(userIdParams, createByParams, pageIdParams);
			    this.pageId = pageIdParams;
			    this.userId = userIdParams;
				this.createBy = createByParams;
				// this.userId = userList.userId;
				// const userList = JSON.parse(storejs.get("userList"));
				// this.userid = userList.userId;
		    },
		    //pic alert
		    picMaskClick(e) {
//		    	console.log(this);
		    	if (!this.$refs.picBox.contains(e.target)) this.picShow = !this.picShow;
		    },
		    cancelClick (e) {
//		    	console.log(e.target)
		    	this.picShow = false;
		    },
		    //location
		    getLocation(obj) {
//		      console.log(obj);
		      let _that = this;
		      let geolocation = location.initMap("map-container"); //定位
		      AMap.event.addListener(geolocation, "complete", showPosition);
		      function showPosition(data){
		      	let result = document.getElementById("result");
//		      	var str = '<p>定位成功</p>';
//				    str += '<p>经度：' + data.position.lng + '</p>';
//				    str += '<p>纬度：' + data.position.lat + '</p>';
//				    str += '<p>精度：' + data.accuracy + ' 米</p>';
//				    str += '<p>城市：' + JSON.stringify(data) + ' </p>';
//				    str += '<p>是否经过偏移：' + (data.isConverted ? '是' : '否') + '</p>';
//				    let a = data.position.lat;
//				    result.innerHTML = str;
//					let api = "https://restapi.amap.com/v3/geocode/regeo";
					let lng = data.position.lng;//经度
					let lat = data.position.lat;//纬度
					let location = lng + "," + lat;
					let api = "https://restapi.amap.com/v3/geocode/regeo?key=cac44785c9d47d0ce2fd9c6989ec1809&location=" + location + "&radius=1000&extensions=all&batch=false&roadlevel=0"
					let sendData = {};
					sendData.key = "cac44785c9d47d0ce2fd9c6989ec1809";
					sendData.location = lng + "," + lat;
					sendData.radius = 1000;
					sendData.extensions = "all";
					sendData.batch = false;
					sendData.roadlevel = 0;
					axios.get(api, sendData).then(res => {
						console.log(res);
//						result.innerText = JSON.stringify(res);
						if(res.data.status == "1"){
							obj[1].spanContent = res.data.regeocode.formatted_address;
							localStorage.setItem("listObj", JSON.stringify(obj))
						}
					}).catch(error => {
						console.log('Error', error.message);
					})
				}
		    },
		    //handleCamera
		    handleCamera (e) {
		    	//拍照
//		    	console.log(e);
		    	let file = e.target.files;
		    	// console.log(file[0]);
		    	let formData = new FormData();
		    	formData.append('fileName', file[0]);
		    	// console.log(formData);
		    	//接口请求
		    	let api = "common/uploadImages";
		    	util.postFile(api, formData).then(res => {
					console.log(res);
		    		if(res.data.status = "1"){
		    			this.$vux.toast.text(res.data.message, 'middle');
//		    			this.pictureMenu = true;
		    			this.picShow = false;
		    			let imageUrlList = res.data.resultMap.imageUrl;
		    			for(let i = 0; i < imageUrlList.length; i++){
		    				this.imgList.push(imageUrlList[i]);
		    			}
//		    			console.log(this.imgList);
		    			this.listObj[0].flag = true;
		    			localStorage.setItem("listObj", JSON.stringify(this.listObj))
		    			localStorage.setItem("imgList", JSON.stringify(this.imgList))
		    		}else{
		    			this.$vux.toast.text(res.data.message, 'middle');
		    		}
				}).catch(error => {
					console.log('Error', error.message);
				});
		    },
		    //handle pic
		    handlePic (e) {
		    	//多选图片
//		    	console.log(e);
		    	let file = e.target.files;
//		    	console.log(file[0]);
		    	let formData = new FormData();
		    	formData.append('fileName', file[0]);
//		    	console.log(formData);
		    	//接口请求
		    	let api = "common/uploadImages";
		    	util.postFile(api, formData).then(res => {
					console.log(res);
		    		if(res.data.status = "1"){
		    			this.$vux.toast.text(res.data.message, 'middle');
//		    			this.pictureMenu = true;
		    			this.picShow = false;
		    			let imageUrlList = res.data.resultMap.imageUrl;
		    			for(let i = 0; i < imageUrlList.length; i++){
		    				this.imgList.push(imageUrlList[i]);
		    			}
//		    			console.log(this.imgList);
		    			this.listObj[0].flag = true;
		    			localStorage.setItem("listObj", JSON.stringify(this.listObj))
		    			localStorage.setItem("imgList", JSON.stringify(this.imgList))
		    		}else{
		    			this.$vux.toast.text(res.data.message, 'middle');
		    		}
				}).catch(error => {
					console.log('Error', error.message);
				});
		    },
		    //奖惩choose
		    handleChoose (e, index) {
		    	if (index == 0) {
		    		this.chooseList[index].chooseIcon = require("@/assets/chooseIcon.png");
		    		this.chooseList[index + 1].chooseIcon = require("@/assets/nochoose.png");
		    		this.showChoose = index;
		    	}else{
		    		this.chooseList[index].chooseIcon = require("@/assets/chooseIcon.png");
		    		this.chooseList[index - 1].chooseIcon = require("@/assets/nochoose.png");
		    		this.showChoose = index;
		    	}
		    },
		    //红包打赏权限显示
		    showBonusPenalty () {
		    	let api = "sys/user/get";
				// let userId = this.userId;
//				this.$vux.toast.text(userId, 'middle');
		    	// let userId = 7188;
		    	let userId = 7272;
		    	util.getList(api, {
		    		userId
		    	}).then(res => {
					console.log(res);
		    		if(res.data.status == "1"){
						if(res.data.resultMap.user.positionLevel == "2"){
							this.isShow = true;
						}else{
							this.isShow = false;
						}
		    		}else{
		    			this.$vux.toast.text(res.data.message, 'middle');
		    		}
				}).catch(error => {
					console.log('Error', error.message);
				});
			},
			// 处理通讯录选人回显
			echoData (pageId, firstVal, secondVal, dataArr) {
				const mailListPeople = JSON.parse(storejs.get("logChoosePeople"));
				let str = "";
				dataArr = [];
				for (let i = 0; i < mailListPeople.length; i++) {
					if (pageId == "2") {
						str += "@" + mailListPeople[i].title + secondVal;
					}else if (pageId == "3") {
						const redEnvelopes = localStorage.getItem("redEnvelopes");//红包
						if (redEnvelopes == 0) str += mailListPeople[i].title + "+" + firstVal + secondVal;
						else str += mailListPeople[i].title + "-" + firstVal + secondVal;
					}else{
						const integral = localStorage.getItem("integral");//积分
						if (integral == 0) str += mailListPeople[i].title + "+" + firstVal + secondVal;
						else str += mailListPeople[i].title + "-" + firstVal + secondVal;
					}
				}
				this.listObj[pageId].spanContent = str;
				this.dataList.dataArr = mailListPeople;
				if (this.pageId == 1) {
					for (let i = 0; i < this.listObj.length; i++) {
						this.listObj[i].flag = false;
					}
				}else{
					this.listObj[pageId].flag = true;
					localStorage.setItem("listObj", JSON.stringify(this.listObj));
					this.dataList.dataArr.map((item, index) => {
						let obj = {};
						obj.userId = item.userId;
						obj.userName = item.title;
						console.log(obj, "单个@");
						dataArr.push(obj);
					})
					this.changeList({list: dataArr, excessiveFlg: pageId});
					// localStorage.setItem("" + dataArr + "", JSON.stringify(dataArr))
				}
			},
			// 安卓图片回调
			imgCallBack(url){
				let imageUrlList = url;
				// this.$vux.toast.text(imageUrlList, 'middle');
				this.imgList.push(imageUrlList);
				this.listObj[0].flag = true;
				localStorage.setItem("listObj", JSON.stringify(this.listObj))
				localStorage.setItem("imgList", JSON.stringify(this.imgList))
			},
			// 存富文本框值
			handleTextarea(){
				console.log(this.textareaContent);
				this.$store.state.logData.logContent = this.textareaContent;
				console.log(this.$store.state);
			}
		}
	}
</script>

<style>
	.weui-tab__panel{
		background: #FFF;
	}
	#addLog.addLog{
		background: #FFFFFF;
		position: relative;
		height:100%;
	}
	#addLog *{
		font-family: PingFangSC-Regular, sans-serif;
	}

	/*textarea*/
	#addLog .textarea_box{
		margin: 0 16px;
	}
	#addLog .textarea_box textarea{
		width: 100%;
		/*height: 175.45px;*/
		height: 140px;
		margin: 0 auto;
		padding-top: 20px;
		font-size: 14px;
	}
	#addLog .textarea_box textarea::placeholder{
		color: #707072;
		font-size: 14px;
	}
	#addLog .weui-cell{
		padding: 0 !important;
	}
	/* #addLog .weui-textarea-counter{
		padding: 0px 15.15px 0px 15.18px;
	} */
	#addLog .underline{
		width: 100%;
		margin: 0 auto;
		height: 0.5px;
		/* border: 0.5px solid #EAEAEA; */
		border: 0.5px solid #EEE;
		/*padding: 0px 15.15px 0px 15.18px;*/
	}

	/*list*/
	#addLog .list{
		padding-left: 16px;
		list-style-type: none;
		margin: 0;
	}
	#addLog .list li{
		margin-bottom: 35.5px;
		color: #333333;
		font-size: 14px;
	}
	#addLog .list li>div{
		display: flex;
		justify-content: space-between;
	}
	#addLog .list li .listBox>div.listItem{
		position: relative;
	}
	#addLog .list li>div>div:nth-of-type(2){
		margin-right: 16px;
	}
	#addLog .list li:nth-of-type(1){
		margin-top: 23.55px;
	}
	#addLog .list li:nth-of-type(1) img{
		vertical-align: -2px;
		margin-right: 14.5px;
		width: 16px;
		height: 14px;
	}
	#addLog .list li:nth-of-type(2) img{
		vertical-align: -6px;
		margin-right: 13.5px;
		width: 17px;
		height: 20px;
	}
	#addLog .list li:nth-of-type(3) img{
		vertical-align: -4px;
		margin-right: 11px;
		width: 20px;
		height: 19px;
	}
	#addLog .list li:nth-of-type(4) img{
		vertical-align: -4px;
		margin-right: 12.5px;
		width: 18px;
		height: 20px;
	}
	#addLog .list li:nth-of-type(5) img{
		vertical-align: -4px;
		margin-right: 10.5px;
		width: 20px;
		height: 19px;
	}
	#addLog .list li:nth-of-type(2) span{
		float: right;
	}
	#addLog .list li .spanActive{
		display: block !important;
		width: 600px;
	}
	#addLog .list li div .iconBox img{
		width: 17px;
		height: 17px;
		vertical-align: -3px;
		margin-right: 10px;
	}
	#addLog .list li .listBox>div.listItem .showText{
		display: none;
		position: absolute;
		left: 34px;
		top: 27px;
		color: #16A6FF;
		font-size: 12px;
		width: 290px;
		max-width: 290px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	#addLog .list li .listBox>div.listItem .showImg{
		display: none !important;
		width: 60px;
		height: 60px;
		/*background: red;*/
		position: relative;
		/*position: absolute;*/
		border-radius: 5px;
		top: 10px;
		text-align: center;
		margin-top: 10px;
	}
	#addLog .list li .listBox>div.listItem .imgActive{
		display: block !important;
	}
	#addLog .list li .listBox>div.listItem .showImg img{
		width: 60px;
		height: 60px;
	}
	#addLog .list li .listBox>div.listItem .showImg .imgClose{
		position: absolute;
		width: 15px;
		height: 15px;
		right: -7px;
		top: -7px;
		font-style: normal;
		display: block;
		background: url(../../../../assets/icon-photo-delete.png) no-repeat;
		background-position: center;
		background-size: cover;
	}
	/*btn*/
	#addLog .button_box{
		padding-bottom: 60px;
		padding-top: 40px;
		text-align: center;
		margin: 0 16px;
	}
	#addLog .button_box img{
		width: 333px;
		height: 44px;
	}
	/*.btn{
		width: 150px !important;
		height: 40px !important;
		background: #16A6FF !important;
		line-height: 40px !important;
		color: #FFFFFF !important;
		border-radius: 20px !important;
	}*/
	/*.btn img{
		vertical-align: -2px;
	}*/
	/*mask*/
	#addLog .mask{
		background: rgba(0, 0, 0, .2);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#addLog .alert_box{
		/*width: 250px;*/
		/*height: 200px;*/
		width: 300px;
		height: 250px;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		position: relative;
		left: calc(50% - 150px);
		top: calc(50% - 75px);
	}
	#addLog .tab_Box{
		display: flex;
		justify-content: flex-start;
	}
	#addLog .tab{
		width: 50%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size: 14px;
		color: #333333;
		border-radius: 10px;
	}
	#addLog .tab.active{
		background: #EEEEEE;
	}
	#addLog .alert_mid{
		display: flex;
		justify-content: center;
		/*padding: 45px 65px 40px 34px;*/
		/*padding: 45px 45px 40px 34px;*/
		padding: 33px 45px 40px 34px;
		/*padding: 70px 45px 40px 34px;*/
		font-size: 12px;
		color: #333333;
		line-height: 30px;
		/*align-items: center;*/
		/*flex-wrap: wrap;*/
	}
	#addLog .alert_mid img{
		margin-right: 10px;
		width: 20px;
		height: 19px;
		margin-top: 6px;
	}
	#addLog .alert_mid input{
		width: 100px;
		height: 30px;
		background: rgba(238, 238, 238, 1);
		border-radius: 5px;
		/*text-indent: 10px;*/
		margin-right: 11px;
		text-align: center;
	}
	#addLog .alertBtn{
		width: 120px !important;
		height: 40px !important;
		background: rgba(22, 166, 255, 1) !important;
		border-radius: 5px !important;
		font-size: 16px !important;
		color: #FFFFFF !important;
		line-height: 40px !important;
		letter-spacing: 6px;
		text-align: center;
	}
	/*pic mask*/
	#addLog .picMask{
		background: rgba(0, 0, 0, .2);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#addLog .pic_box{
		background-color: #FFF;
		/* position: fixed; */
		position: absolute;
		/* bottom: 0; */
		bottom: 10px;
		left: 0;
		width: 100%;
	}
	#addLog .listitem{
		font-size: 17px;
		color: #333;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-weight: 500;
		letter-spacing: 1px;
		position: relative;
	}
	#addLog .listitem input{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		opacity: 0;
	}
	#addLog .listitem:not(:nth-last-of-type(1)){
		border-bottom: 1px solid #EEE;
	}
	#addLog .listitem:nth-last-of-type(1){
		color: #F56C6C;
	}

	#addLog .weui-cell:before{
		border: 0 !important;
	}
	#addLog .vux-x-input{
		width: 100px;
		height: 30px;
		margin-right: 11px;
	}
	#addLog .vux-header .vux-header-title{
		font-size: 17px !important;
	}


	#addLog #map-container{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		/*top: 120%;*/
		top: 0;
		background-color: rgba(0, 0, 0, .5);
		/*transition: all .5s linear;*/
	}

	#addLog .imgList{
		display: flex;
	}
	#addLog .imgList div{
		margin-right: 28px;
	}

	#addLog .chooseBox{
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	#addLog .chooseBox div:nth-of-type(1){
		margin-right: 35px;
	}
	#addLog .chooseReward{
		font-size: 14px;
		color: #999;
		font-family: PingFang SC;
	}
	/* #addLog .chooseActive{

	} */
	#addLog .chooseReward img,.choosePunishment img{
		width: 17px;
		height: 17px;
		vertical-align: -3px;
		margin-right: 2px;
	}
	#addLog .choosePunishment{
		font-size: 14px;
		color: #999;
		font-family: PingFang SC;
	}

	#addLog .vux-header .vux-header-title{
		color: #FFF !important;
	}
	#addLog .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{
		color: #FFF !important;
	}
	#addLog .vux-header .vux-header-left, .vux-header .vux-header-right{
		color: #FFF !important;
	}
	#addLog .vux-header{
		color: #FFF !important;
	}
	#addLog .button_Box{
		width: 100%;
		margin: 0 auto;
	}
	#addLog .btn{
		/*width: 333px;*/
		width: 100%;
		height: 44px;
		background: rgb(22, 166, 255);
		color: #FFF;
		font-size: 18px;
		border-radius: 6px;
		border: 0;
		font-family: PingFang SC;
		letter-spacing: 6px;
	}
	.weui-icon.weui_icon_clear.weui-icon-clear{
		display: none !important;
	}
</style>
