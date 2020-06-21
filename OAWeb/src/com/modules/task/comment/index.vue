<template>
	<div class="comment" id="comment">
		<!--<div class="top_box"></div>-->
		<!-- <x-header style="background-color: #06a6ff;color: #FFF !important;" :left-options="{backText: ''}">评论</x-header> -->
		<div class="textarea_box">
			<x-textarea :max="200" name="log_textarea" placeholder="请输入评论内容" v-model="textareaContent" @on-blur="handleTextarea()"></x-textarea>
			<div class="underline"></div>
		</div>
		<div class="list_box">
			<ul class="list">
				<li v-for="(key, value) in listObj" @click="liClick($event, key.id, key)" :data-id="key.id" :key="key.id">
					<!--<span v-if="showChoose" :dataId="key.id">{{ chooseText }}</span>-->
					<!--<span v-if="show" :dataId="key.id">{{ chooseText }}</span>-->
					<div class="listBox">
						<template v-if="key.id == 0">
							<div class="listItem">
								<img :src="key.url" :alt="key.name"/>
								{{ key.name }}
								<div class="imgList">
									<div v-for="(item, index) in imgList" :key="index" :class="imgList[index] ? 'showImg imgActive' : 'showImg' " ref="showImgBox">
										<img :src="item" alt="这是图片"/>
										<i class="imgClose" @click.stop="delClose(index)"></i>
									</div>
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
		<input type="hidden" name="createByVal" id="createByVal" :value="createBy" />
		<input type="hidden" name="pageId" id="pageId" :value="pageId" />
	    <input type="hidden" name="logUserIdVal" id="logUserIdVal" :value="logUserIdVal" />
		<input type="hidden" name="commentType" id="commentType" :value="commentType" />
		<input type="hidden" name="parentid" id="parentid" :value="parentid" />
		<!--<div class="button_box">
			<img :src="btnimg" @click="sumbitClick"/>
			<x-button class="btn">
				<img :src="btnimg"/>
			</x-button>
		</div>-->
		<div class="button_box">
			<div class="button_Box" @click="sumbitClick">
				<button type="button" class="btn">提交</button>
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
				      multiple="multiple"
				      name="files"
				      maxlength="2"
				      @change="handlePic($event)"
				    />
				</div>
				<div class="listitem" @click="cancelClick">取消</div>
			</div>
		</div>
		<!--pictureAlert-->
		<!--<div class="pictureAlert">
			<actionsheet  v-model="pictureMenu" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>
		</div>-->
		<div id="map-container" v-show="showMap"></div>
		<div id="result"></div>
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
			    textareaContent: null,
			    logUserIdVal: null,
			    createBy: null,
			    commentType: null,
			    parentid: null,
				isShow: null
			};
		},
		watch: {
			'$route': 'getParams'
		},
		beforeCreate () {
			// console.log(271, this.$store.state.logData.cookieData.pageId)
			// console.log(272, this.$store)
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
			if (listObj) {
				this.listObj = JSON.parse(listObj);
			}
			if (imglist) {
				this.imgList = JSON.parse(imglist);
			}
		},
		mounted() {
			if (storejs.get("commentChoosePeople") == undefined) {
				return
			}
			const pageId = localStorage.getItem("commentpageId");
			const rewardVal = localStorage.getItem("rewardVal");
			const redEnvelopesVal = localStorage.getItem("redEnvelopesVal");
			let aiteUserList;
			let excitationUserList;
			let excitationUserList1;
			this.listObj.map((item, index) => {
				if (item.flag) return item.flag == true;
			})
			if (this.$store.state.logData.commentContent != null) this.textareaContent = this.$store.state.logData.commentContent;
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
				tempObj.jumpPageId = this.$store.state.logData.cookieData.jumpPageId;
				tempObj.logUserId = this.logUserIdVal;
				tempObj.createBy = this.createBy;
				tempObj.flag = this.commentType;
				tempObj.parentId = this.parentid;
				tempObj.pageId = "";
		    	switch (id){
		    		case 0:
		    			if (this.imgList.length > 2) {
		    				this.$vux.toast.text("图片最多三张!", 'middle');
		    				this.picShow = false;
		    				return;
		    			}else{
		    				this.picShow = true;
						}
						// tempObj.pageId = "";
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
						// tempObj.pageId = "";
						this.changeCookieData(tempObj);
		    			break;
		    		case 2:
						if(storejs.get("commentChoosePeople") != undefined){
							storejs.set("commentChoosePeople", storejs.get("commentChoosePeople"));
						}
						// const commentChoosePeople = storejs.get("commentChoosePeople");
						// storejs.set("commentChoosePeople", commentChoosePeople);
						this.$router.push({ path:'/logAddressList/logSelectAddressList' });
//						this.$router.push({ path:'/addressList/selectAddressList' });
            			storejs.set("jumpFrom","warnList");
						localStorage.setItem("commentpageId", "2");
						localStorage.setItem("howpageId", 1);
						// tempObj.pageId = "";
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
						localStorage.setItem("commentpageId", "3");
						// tempObj.pageId = "";
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
						localStorage.setItem("commentpageId", "4");
						// tempObj.pageId = "";
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
					localStorage.setItem("rewardVal", this.rewardVal);
				}else{
					localStorage.setItem("rewardVal", this.rewardVal);
				}
				localStorage.setItem("commentpageId", 4);
				localStorage.setItem("howpageId", 1);
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
				}else{
					localStorage.setItem("redEnvelopesVal", this.redEnvelopesVal);
				}
				localStorage.setItem("commentpageId", 3);
				localStorage.setItem("howpageId", 1);
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
		    	const pageId = localStorage.getItem("commentpageId");
		    	const integral = localStorage.getItem("integral");//积分
		    	const redEnvelopes = localStorage.getItem("redEnvelopes");//红包
				const rewardVal = localStorage.getItem("rewardVal");
				const redEnvelopesVal = localStorage.getItem("redEnvelopesVal");
				const aiteUserList = JSON.stringify(this.$store.state.logData.aiteUserList);
				const excitationUserList = this.$store.state.logData.excitationUserList;
				const excitationUserList1 = this.$store.state.logData.excitationUserList1;
		    	let sendData = {};
//		    	sendData.description = this.textareaContent;
//		    	sendData.latitude = 39.11712;
//		    	sendData.longitude = 117.2147;
				if (this.parentid == null || this.parentid == undefined || this.parentid == "undefined") {
					this.parentid = this.logUserIdVal;
				}
//				console.log(this.createBy)
				sendData.content = this.textareaContent;
				sendData.commentUserId = this.createBy;
	    		sendData.beCommentUserId = this.createBy;
				sendData.logUserId = this.createBy;
				sendData.parentId = this.parentid;
		    	sendData.logId = this.logUserIdVal;
		    	sendData.commentType = this.commentType;
				//地址
				sendData.plance = this.listObj[1].spanContent;
//		    	sendData.userId = this.logUserIdVal;
				//人
//		    	sendData.userId = 7188;
//		    	sendData.createBy = this.createBy;
//				sendData.createBy = 7188;
				//@人员
				if (aiteUserList == null || aiteUserList.length == 0 || aiteUserList == "null" || aiteUserList == "[]") sendData.aiteUserList = "";
				else sendData.aiteUserList = aiteUserList;
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
				if(resExcitationUserList.length == 0 || resExcitationUserList == null) sendData.excitationUserList = "";
				else sendData.excitationUserList = JSON.stringify(resExcitationUserList);
		    	console.log(sendData);
		    	//接口请求
				let api = "taskComment/saveTaskComment";
				let taskInfo = JSON.parse(storejs.get("params"));
				let taskId = taskInfo.taskId;
				sendData.taskId = taskId;
				// sendData.taskId = "fa1e466c28ec49dea65593936f0b56bd";
				//表单非空验证
	    		if (sendData.content == null || sendData.content == "" || sendData.content == undefined) {
	    			this.$vux.toast.text("评论内容不可为空!", 'middle');
	    			return;
				}
   				util.getList(api, sendData).then(res => {
   //					console.log(res);
   					if(res.data.result.code === 1) {
   						this.$vux.toast.text(res.data.result.message, 'middle');
   //						const pageIdParams = this.$route.query.pageId;
   						const pageJumpId = this.$store.state.logData.cookieData.jumpPageId;
   						// const pageJumpId = localStorage.getItem("jumpPageId");
   						if (pageJumpId == "1") {
   							this.$router.replace({
   								path: "/taskProgress",
   								query: {
   									commentType: this.commentType
   								}
   							})
   						} else {
   							this.$router.replace({
   								path: "/logDetails"
   							})
   						}
   					}
   					//保存完数据跳转日志列表
   				}).catch(error => {
   					console.log('Error', error.message);
   				});
		    },
		    //获取传的参数
		    getParams () {
				// 取到路由带过来的参数				
				// let routeObj = this.$route.query;
				// routeObj = Object.keys(routeObj);
				const logUserIdParams = this.$store.state.logData.cookieData.logUserId;
				const createByParams = this.$store.state.logData.cookieData.createBy;
				const commentTypeParams = this.$store.state.logData.cookieData.flag;
				const parentIdParams = this.$store.state.logData.cookieData.parentId;
				const pageIdParams = this.$store.state.logData.cookieData.pageId;
			    this.logUserIdVal = logUserIdParams;
			    this.createBy = createByParams;
			    this.commentType = commentTypeParams;
			    this.parentid = parentIdParams;
				this.pageId = pageIdParams;				
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
					let api = "https://restapi.amap.com/v3/geocode/regeo?key=3b8064eefb1c62b869f754e9ae51254e&location=" + location + "&radius=1000&extensions=all&batch=false&roadlevel=0"
					let sendData = {};
					sendData.key = "3b8064eefb1c62b869f754e9ae51254e";
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
							let jumpPageId = localStorage.getItem("jumpPageId");
							if(jumpPageId == "1"){
								this.$router.push({ path:"/log/login" });
							}else{
								this.$router.push({ path:"/logDetails" });
							}
						}
					}).catch(error => {
						console.log('Error', error.message);
					})
				}
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
				const userList = JSON.parse(storejs.get("loginUserInfo"));
		    	let api = "sys/user/get";
				let userId = userList.userId;
				// this.$vux.toast.text(userId, 'middle');
				// let userId = 7188;
//		    	let userId = 7272;
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
				const mailListPeople = JSON.parse(storejs.get("commentChoosePeople"));
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
			
			// 存富文本框值
			handleTextarea(){
				console.log(this.textareaContent);
				this.$store.state.logData.commentContent = this.textareaContent;
				console.log(this.$store.state);
			}
		},
	};
</script>

<style>
	.weui-tab__panel{
		background: #FFF;
	}
	#comment .comment{
		background: #FFFFFF;
		position: relative;
		height:100%;
	}
	#comment *{
		font-family: PingFangSC-Regular, sans-serif;
	}

	/*textarea*/
	#comment .textarea_box{
		margin: 0 16px;
	}
	#comment .textarea_box textarea{
		width: 100%;
		/*height: 175.45px;*/
		height: 140px;
		margin: 0 auto;
		padding-top: 20px;
		font-size: 14px;
	}
	#comment .textarea_box textarea::placeholder{
		color: #707072;
		font-size: 14px;
	}
	#comment .weui-cell{
		padding: 0 !important;
	}
	#comment .underline{
		width: 100%;
		margin: 0 auto;
		height: 0.5px;
		border: 0.5px solid #EAEAEA;
		/*padding: 0px 15.15px 0px 15.18px;*/
	}

	/*list*/
	#comment .list{
		padding-left: 16px;
		list-style-type: none;
		margin: 0;
	}
	#comment .list li{
		margin-bottom: 35.5px;
		color: #333333;
		font-size: 14px;
	}
	#comment .list li>div{
		display: flex;
		justify-content: space-between;
	}
	#comment .list li .listBox>div.listItem{
		position: relative;
	}
	#comment .list li>div>div:nth-of-type(2){
		margin-right: 16px;
	}
	#comment .list li:nth-of-type(1),
	#comment .list li:nth-of-type(2){
		margin-top: 23.55px;
		display: none;
	}
	#comment .list li:nth-of-type(1) img{
		vertical-align: -2px;
		margin-right: 14.5px;
		width: 16px;
		height: 14px;
	}
	#comment .list li:nth-of-type(2){
		margin-top: 23.55px;
	}
	#comment .list li:nth-of-type(2) img{
		vertical-align: -6px;
		margin-right: 13.5px;
		width: 17px;
		height: 20px;
	}
	#comment .list li:nth-of-type(3){
		margin-top: 23.55px;
	}
	#comment .list li:nth-of-type(3) img{
		vertical-align: -4px;
		margin-right: 11px;
		width: 20px;
		height: 19px;
	}
	#comment .list li:nth-of-type(4) img{
		vertical-align: -4px;
		margin-right: 12.5px;
		width: 18px;
		height: 20px;
	}
	#comment .list li:nth-of-type(5) img{
		vertical-align: -4px;
		margin-right: 10.5px;
		width: 20px;
		height: 19px;
	}
	#comment .list li:nth-of-type(2) span{
		float: right;
	}
	#comment .list li .spanActive{
		display: block !important;
		width: 600px;
	}
	#comment .list li div .iconBox img{
		width: 17px;
		height: 17px;
		vertical-align: -3px;
		margin-right: 10px;
	}
	#comment .list li .listBox>div.listItem .showText{
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
	#comment .list li .listBox>div.listItem .showImg{
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
	#comment .list li .listBox>div.listItem .imgActive{
		display: block !important;
	}
	#comment .list li .listBox>div.listItem .showImg img{
		width: 60px;
		height: 60px;
	}
	#comment .list li .listBox>div.listItem .showImg .imgClose{
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
	#comment .button_box{
		padding-bottom: 60px;
		padding-top: 40px;
		text-align: center;
		margin: 0 16px;
	}
	#comment .button_box img{
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
	#comment .mask{
		background: rgba(0, 0, 0, .2);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#comment .alert_box{
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
	#comment .tab_Box{
		display: flex;
		justify-content: flex-start;
	}
	#comment .tab{
		width: 50%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size: 14px;
		color: #333333;
		border-radius: 10px;
	}
	#comment .tab.active{
		background: #EEEEEE;
	}
	#comment .alert_mid{
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
	#comment .alert_mid img{
		margin-right: 10px;
		width: 20px;
		height: 19px;
		margin-top: 6px;
	}
	#comment .alert_mid input{
		width: 100px;
		height: 30px;
		background: rgba(238, 238, 238, 1);
		border-radius: 5px;
		text-indent: 10px;
		margin-right: 11px;
		text-align: center;
	}
	#comment .alertBtn{
		width: 100px !important;
		height: 30px !important;
		background: rgba(22, 166, 255, 1) !important;
		border-radius: 5px !important;
		font-size: 12px !important;
		color: #FFFFFF !important;
		line-height: 30px !important;
	}
	/*pic mask*/
	#comment .picMask{
		background: rgba(0, 0, 0, .2);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#comment .pic_box{
		background-color: #FFF;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	#comment .listitem{
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
	#comment .listitem input{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		opacity: 0;
	}
	#comment .listitem:not(:nth-last-of-type(1)){
		border-bottom: 1px solid #EEE;
	}
	#comment .listitem:nth-last-of-type(1){
		color: #F56C6C;
	}

	#comment .weui-cell:before{
		border: 0 !important;
	}
	#comment .vux-x-input{
		width: 100px;
		height: 30px;
		margin-right: 11px;
	}
	#comment .vux-header .vux-header-title{
		font-size: 17px !important;
	}


	#comment #map-container{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		/*top: 120%;*/
		top: 0;
		background-color: rgba(0, 0, 0, .5);
		/*transition: all .5s linear;*/
	}

	#comment .imgList{
		display: flex;
	}
	#comment .imgList div{
		margin-right: 28px;
	}

	#comment .chooseBox{
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	#comment .chooseBox div:nth-of-type(1){
		margin-right: 35px;
	}
	#comment .chooseReward{
		font-size: 14px;
		color: #999;
		font-family: PingFang SC;
	}
	#comment .chooseReward img,.choosePunishment img{
		width: 17px;
		height: 17px;
		vertical-align: -3px;
		margin-right: 2px;
	}
	#comment .choosePunishment{
		font-size: 14px;
		color: #999;
		font-family: PingFang SC;
	}

	#comment .vux-header .vux-header-title{
		color: #FFF !important;
	}
	#comment .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{
		color: #FFF !important;
	}
	#comment .vux-header .vux-header-left, .vux-header .vux-header-right{
		color: #FFF !important;
	}
	#comment .vux-header{
		color: #FFF !important;
	}
	
	
	#comment .button_Box{
		width: 100%;
		margin: 0 auto;
	}
	#comment .btn{
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
