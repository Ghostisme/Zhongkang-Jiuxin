<template>
	<div class="acceptTask" id="acceptTask">
		<!--<div class="top_box"></div>-->
		<x-header style="background-color: #06a6ff;" :left-options="{backText: ''}">添加日志</x-header>
		<div class="textarea_box">
			<x-textarea :max="200" name="log_textarea" placeholder="请输入日志内容" v-model="textareaContent"></x-textarea>
			<div class="underline"></div>
		</div>
		<div class="list_box">
			<ul class="list">
				<li v-for="(key, value) in listObj" @click="liClick($event, key.id, key)" :data-id="key.id" :key="key.id">					
					<!--<span v-if="showChoose" :dataId="key.id">{{ chooseText }}</span>-->
					<!--<span v-if="show" :dataId="key.id">{{ chooseText }}</span>-->
					<div class="listBox">
						<div class="listItem">
							<img :src="key.url" :alt="key.name"/>
							{{ key.name }}							
							<!--<span :dataid="key.id" v-if="key.id!=0" class="showText" :class="showText(key.id)">{{ spanText }}</span>-->
							<span :dataid="key.flag" v-if="key.id!=0" :class="key.flag ? 'showText spanActive' : 'showText' ">{{ key.spanContent }}</span>
							<div v-if="key.id==0" :dataid="key.flag" :class="key.flag ? 'showImg imgActive' : 'showImg' " ref="showImgBox">
								<img :src="photograph" :alt="key.spanContent"/>
								<i class="imgClose" @click="delClose"></i>
							</div>
						</div>
						<div class="iconBox" v-if="key.id==1" @click="iconClick($event, iconId)" :dataId="iconId">
							<img :src="iconImg"/>
							{{ iconText }}
						</div>
					</div>
				</li>				
			</ul>
		</div>
		<input type="hidden" name="userIdVal" id="userIdVal" :value="userId" />
		<input type="hidden" name="createByVal" id="createByVal" :value="createBy" />
		<div class="button_box">
			<img :src="btnimg" @click="sumbitClick"/>
			<!--<x-button class="btn">
				<img :src="btnimg"/>
			</x-button>-->
		</div>
		<!--pictureAlert-->
		<div class="pictureAlert">
			<actionsheet  v-model="pictureMenu" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>
		</div>
	</div>
</template>

<script>
	import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux';
	import util from '@/libs/util';
	import cAPI from "@/libs/cordovaAPI";
	export default {
		components: {
			Actionsheet,
			Toast
		},
		computed: {
			
		},
		data() {
			return {
				listObj: [
					{
						name: "添加照片",
						url: require("@/assets/icon-1@2x.png"),
						id: 0,
						flag: false,
						spanContent: "测试"
					},
					{
						name: "所在位置",
						url: require("@/assets/icon-2@2x.png"),
						id: 1,
						flag: false,
						spanContent: "测试"
					},
					{
						name: "提醒谁看",
						url: require("@/assets/icon-3@2x.png"),
						id: 2,
						flag: false,
						spanContent: "测试"
					}
				],
//				btnimg: require("@/assets/提交@2x.png"),
				btnimg: require("@/assets/Button-More.png"),
    			pictureMenu: false,
    			menus: {
			        menu1: "拍照",
			        menu2: "从手机相册选择"
			    },
			    showChoose: true,
			    show: false,
			    iconText: "不显示位置",
			    iconImg: require("@/assets/nochoose.png"),
			    iconId: 1,
			    spanText: "测试",
			    photograph: "",
			    textareaContent: null,
			    userId: null,
			    createBy: null
			};
		},
		watch: {
			'$route': 'getParams'
		},
		created () {
			this.getParams();
//			cAPI.geolocation();
//			console.log(cAPI.geolocation());
		},
		methods: {
			//li-click
		    liClick(e, id, obj) {
//		    	console.log(e);
//		    	console.log(e.target,"target");
				//差每一个结果控制显示隐藏
		    	switch (id){
		    		case 0:
		    			if (!this.$refs.showImgBox[0].contains(e.target)) {
			　　　　 			this.pictureMenu = !this.pictureMenu;
			　　 			}
//		    			this.pictureMenu = true;
		    			this.photograph = require("@/assets/zhanwei.png");		    			
		    			obj.flag = true;
		    			break;
		    		case 1:
						obj.flag = true;
						obj.spanContent = "天津市和平区金谷大厦";
		    			break;
		    		case 2:
						obj.flag = true;
						obj.spanContent = "@王总@王总";
		    			break;
		    		default:
		    			break;
		    	}
		    },		    
		    click (key) {
		    	console.log(key)
		    	
		    },
		    //location click
		    iconClick (e, id) {
		    	if (id == 1) {
		    		this.iconImg = require("@/assets/chooseIcon.png");
		    		this.iconId = 2;
		    	} else{
		    		this.iconImg = require("@/assets/nochoose.png");
		    		this.iconId = 1;
		    	}
		    },		    
		    // img close btn icon
		    delClose () {
		    	console.log("关闭");
		    	//删除按钮小问题
		    	this.pictureMenu = !this.pictureMenu;
		    },
		    // 提交点击
		    sumbitClick (e) {
		    	console.log("点击确定");
		    	let sendData = {};
		    	sendData.description = this.textareaContent;
		    	sendData.latitude = 39.11712;
		    	sendData.longitude = 117.2147;
		    	sendData.plance = "天津市和平区曲阜道83号和平区人民政府内,和平区安监局附近0米";
		    	sendData.userId = this.userId;
//		    	sendData.createBy = this.createBy;
				sendData.createBy = 7188;
		    	sendData.aiteUserList = JSON.stringify([{"userId":"1","userName":"张三"}, {"userId":"2","userName":"李四"}]);
		    	console.log(sendData);
		    	//接口请求
		    	let api = "taskLog/saveTaskLog";
				sendData.taskId = "f4643f1e2c6840cabeb0d6b5cd34cd22";
				//表单非空验证
				for(let item in sendData){
		    		if (sendData.description == null || sendData.description == "") {
		    			this.$vux.toast.text("表单不可为空!", 'middle');
		    		}
		    	}
				util.getList(api, sendData).then(res => {
					console.log(res);
					if(res.data.result.code === 1){
						this.$vux.toast.text(res.data.result.message, 'middle');
						this.$router.push({ path:'/login' });
					}					
				}).catch(error => {
					console.log('Error', error.message);
				});
		    },
		    //获取传的参数
		    getParams () {
				// 取到路由带过来的参数
			    const userIdParams = this.$route.query.userId;
			    const createByParams = this.$route.query.createBy;
			    console.log(userIdParams, createByParams);
			    this.userId = userIdParams;
			    this.createBy = createByParams;
		    }
		},
	};
</script>

<style>
	#acceptTask.acceptTask{
		background: #FFFFFF;
	}
	#acceptTask *{
		font-family: PingFangSC-Regular, sans-serif;
	}
	
	/*textarea*/
	#acceptTask .textarea_box{
		margin: 0 16px;
	}
	#acceptTask .textarea_box textarea{
		width: 100%;
		/*height: 175.45px;*/
		height: 140px;
		margin: 0 auto;
		padding-top: 20px;
		font-size: 14px;
	}
	#acceptTask .textarea_box textarea::placeholder{
		color: #707072;
		font-size: 14px;
	}
	#acceptTask .weui-cell{
		padding: 0 !important;
	}
	#acceptTask .weui-textarea-counter{
		/*padding: 0px 15.15px 0px 15.18px;*/
	}
	#acceptTask .underline{
		width: 100%;
		margin: 0 auto;
		height: 1px;
		border: 1px solid #EAEAEA;
		/*padding: 0px 15.15px 0px 15.18px;*/
	}
	
	/*list*/
	#acceptTask .list{
		padding-left: 16px;
		list-style-type: none;
		margin: 0;
	}
	#acceptTask .list li{
		margin-bottom: 35.5px;
		color: #333333;
		font-size: 14px;
	}
	#acceptTask .list li>div{
		display: flex;
		justify-content: space-between;
	}
	#acceptTask .list li .listBox>div.listItem{
		position: relative;
	}
	#acceptTask .list li>div>div:nth-of-type(2){
		margin-right: 16px;
	}
	#acceptTask .list li:nth-of-type(1){
		margin-top: 23.55px;		
	}
	#acceptTask .list li:nth-of-type(1) img{
		vertical-align: -2px;
		margin-right: 14.5px;
		width: 16px;
		height: 14px;
	}
	#acceptTask .list li:nth-of-type(2) img{
		vertical-align: -6px;
		margin-right: 13.5px;
		width: 17px;
		height: 20px;
	}
	#acceptTask .list li:nth-of-type(3) img{
		vertical-align: -4px;
		margin-right: 11px;
		width: 20px;
		height: 19px;
	}
	#acceptTask .list li:nth-of-type(4) img{
		vertical-align: -4px;
		margin-right: 12.5px;
		width: 18px;
		height: 20px;
	}
	#acceptTask .list li:nth-of-type(5) img{
		vertical-align: -4px;
		margin-right: 10.5px;
		width: 20px;
		height: 19px;
	}
	#acceptTask .list li:nth-of-type(2) span{
		float: right;
	}
	#acceptTask .list li .spanActive{		
		display: block !important;
		width: 600px;
	}
	#acceptTask .list li div .iconBox img{
		width: 17px;
		height: 17px;
		vertical-align: -3px;
		margin-right: 10px;
	}
	#acceptTask .list li .listBox>div.listItem .showText{
		display: none;
		position: absolute;
		left: 34px;
		top: 27px;
		color: #16A6FF;
		font-size: 12px;
		width: 290px;
	}
	#acceptTask .list li .listBox>div.listItem .showImg{
		display: none !important;
		width: 60px;
		height: 60px;
		background: red;
		position: relative;
		/*position: absolute;*/
		border-radius: 5px;
		top: 10px;
		text-align: center;
	}
	#acceptTask .list li .listBox>div.listItem .imgActive{
		display: block !important;
	}
	#acceptTask .list li .listBox>div.listItem .showImg img{
		width: 60px;
		height: 60px;
	}
	#acceptTask .list li .listBox>div.listItem .showImg .imgClose{
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
	#acceptTask .button_box{
		padding-bottom: 60px;
		text-align: center;
		margin: 0 16px;
		/*padding-top: 30px;*/
		padding-top: 150px;
	}
	#acceptTask .button_box img{
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
	#acceptTask .mask{
		background: rgba(0, 0, 0, .2);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#acceptTask .alert_box{
		width: 250px;
		height: 200px;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		position: relative;
		left: calc(50% - 125px);
		top: calc(50% - 100px);
	}
	#acceptTask .tab_Box{
		display: flex;
		justify-content: flex-start;
	}
	#acceptTask .tab{
		width: 50%;
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size: 14px;
		color: #333333;		
		border-radius: 10px;
	}
	#acceptTask .tab.active{
		background: #EEEEEE;
	}
	#acceptTask .alert_mid{
		display: flex;
		justify-content: center;
		/*padding: 45px 65px 40px 34px;*/
		padding: 45px 45px 40px 34px;
		font-size: 12px;
		color: #333333;
		line-height: 30px;
	}
	#acceptTask .alert_mid img{
		margin-right: 10px;
		width: 20px;
		height: 19px;
		margin-top: 6px;	
	}
	#acceptTask .alert_mid input{
		width: 100px;
		height: 30px;
		background: rgba(238, 238, 238, 1);
		border-radius: 15px;
		text-indent: 10px;
		margin-right: 11px;	
	}
	#acceptTask .alertBtn{
		width: 100px !important;
		height: 30px !important;
		background: rgba(22, 166, 255, 1) !important;
		border-radius: 15px !important;
		font-size: 12px !important;
		color: #FFFFFF !important;
		line-height: 30px !important;		
	}
	#acceptTask .weui-cell:before{
		border: 0 !important;
	}
	#acceptTask .vux-x-input{
		width: 100px;
		height: 30px;
		margin-right: 11px;
	}
	#acceptTask .vux-header .vux-header-title{
		font-size: 17px !important;
	}
</style>