<template>
	<div class="taskProgress" id="taskProgress">
		<!-- <x-header style="background-color: #06a6ff;" :left-options="{backText: ''}">任务进度</x-header> -->
		<div class="topCard">
			<div class="topList">
				<div class="topLeft">
					<div>任务名称:</div>
					<div>发布人: </div>
					<div>任务描述： </div>
				</div>
				<div class="topRight">
					<div>{{ taskName }}</div>
					<div>{{ taskHuman }}</div>
					<div>{{ teskMemo }}</div>
				</div>
			</div>
			<div class="topMore" @click="seeMoreClick">
				查看任务详情
				<i class="moreIcon"></i>
			</div>
		</div>
		<div class="dataList" @click="hideTip" v-for="(key, value) in datalist" :key="value">
			<div class="comment_box">
				<img :src="userhead"/>
				<div class="user_box">
					<div class="user">
						<span>{{ key.userName }}</span>
					</div>
					<div class="user_time">
						<span class="usertime">{{ key.createDate | handleCreatedTime }}</span>
						<span class="aftertime">{{ key.createDate | handleAfterTime }}</span>
					</div>
				</div>
			</div>
			<div class="introduce_box">
				<span class="introducetext">{{ key.description }}</span>
				<span class="introduceicon" v-for="item in key.taskRemindList"  :key="item.id">{{ "@" + item.beRemindUserName + " " }}</span>
				<span v-for="item in key.taskExcitationList" :key="item.id" class="taskExcitation">
					<span v-if="item.excitationCategory == 1"><!--积分-->
						<span v-if="item.excitationUnit == 1" class="fontColor">
							{{ item.beExcitationUserName + "+" + item.excitationAmount + "积分 " }}
						</span>
						<span v-else class="fontColor1">
							{{ item.beExcitationUserName + "-" + item.excitationAmount + "积分 " }}
						</span>
					</span>
					<span v-else>
						<span v-if="item.excitationUnit == 1" class="fontColor">
							{{ item.beExcitationUserName + "+" + item.excitationAmount + "¥ " }}
						</span>
						<span v-else class="fontColor1">
							{{ item.beExcitationUserName + "-" + item.excitationAmount + "¥ " }}
						</span>
					</span>
				</span>
			</div>
			<div class="local_box" v-if="key.plance == ''"></div>
			<div class="local_box" v-else>
				<i class="localIcon"></i>
				<span class="location">{{ key.plance }}</span>
			</div>
			<div class="data_img_box">
				<div class="data-img" v-for="item in key.sysFilesList" :key="item.id" @click="handleViewImg(key.sysFilesList)">
					<img :src="item.url" :alt="item.fileName"/>
				</div>
			</div>
			<div class="commentBox">
				<input type="hidden" name="logUservalue" id="logUservalue" :value="logUservalue" />
				<input type="hidden" name="createByVal" id="createByVal" :value="createByVal" />
				<span class="iconBox">
					<i class="commentIcon" @click.stop="commentBtnClick(key.id, key.createBy, 0)"></i>
				</span>
				<div class="children_box" v-show="key.taskCommentList.length == 0 ? false : true">
					<div
						class="childrenbox"
						:data-id="item.id"
						:key="item.id"
						:data-value="item.value"
						v-for="(item,  index) in key.taskCommentList"
						ref="children"
						@touchstart.stop="showWithdrawAlt($event, item.id, index)"
						@touchend.stop="emptyWithdraw"
						@click="commentClick(key.id, key.createBy, 1, item.commentUserId, item.beCommentUserId, item.id)"
					>
						<!--<div
							@touchstart="showWithdrawAlt($event, key.id, value)"
							@touchend="emptyWithdraw"
						>
							<div v-if="item.commentType == 0">
								<div class="introduceicon comment-replyname">{{ item.commentUserName }}:</div>
							</div>
							<div v-else>
								<div class="introduceicon comment-replyname">{{ item.commentUserName }}</div>
								<span class="children_name comment-replyname">回复</span>
								<div class="introduceicon comment-replyname">{{ item.beCommentUserName }}</div>
							</div>
							<div class="children_status">
								{{ item.content }}
							</div>
							<div v-if="differTime(item.createDate)" ref="showWithdraw" :data-id="key.id" :class="showWithdraw == key.id ? 'withdraw_box active' : 'withdraw_box' " @click="showWithdrawClick($event, key.id)" >
								{{ withdrawText }}
							</div>
						</div>-->
						<div v-if="item.commentType == 0" onselectstart="return false;">
							<div class="introduceicon comment-replyname">{{ item.commentUserName }}:</div>
						</div>
						<div v-else onselectstart="return false;">
							<div class="introduceicon comment-replyname">{{ item.commentUserName }}</div>
							<span class="children_name comment-replyname">回复</span>
							<div class="introduceicon comment-replyname">{{ item.beCommentUserName }}</div>
						</div>
						<div class="children_status">
							{{ item.content }}
							<span class="introduceicon" v-for="item in item.taskRemindList"  :key="item.id">{{ "@" + item.beRemindUserName + " " }}</span>
							<span v-for="item in item.taskExcitationList" :key="item.id" class="taskExcitation">
								<span v-if="item.excitationCategory == 1"><!--积分-->
									<span v-if="item.excitationUnit == 1" class="fontColor">
										{{ item.beExcitationUserName + "+" + item.excitationAmount + "积分 " }}
									</span>
									<span v-else class="fontColor1">
										{{ item.beExcitationUserName + "-" + item.excitationAmount + "积分 " }}
									</span>
								</span>
								<span v-else>
									<span v-if="item.excitationUnit == 1" class="fontColor">
										{{ item.beExcitationUserName + "+" + item.excitationAmount + "¥ " }}
									</span>
									<span v-else class="fontColor1">
										{{ item.beExcitationUserName + "-" + item.excitationAmount + "¥ " }}
									</span>
								</span>
							</span>
						</div>
						<div v-if="differTime(item.createDate)" ref="showWithdraw" :data-id="item.id" :class="showWithdraw == item.id ? 'withdraw_box active' : 'withdraw_box' " @click.stop="showWithdrawClick($event, item.id, item.parentId, key.id)" >
							{{ withdrawText }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--over data-->
		<div class="overbox" v-show="overShow">
			<div class="overline"></div>
			<div class="overdata">已经到底了</div>
		</div>
		<!--fixed icon-->
		<div class="fixIcon" @click="fixIconClick">
			<img :src="fixicon" :alt="fixtitle"/>
		</div>
    <div id="result"></div>
	</div>
</template>

<script>
	import storejs from 'storejs';
	import util from '@/libs/util';
//	import pinyin from "@/libs/pyfist.js";
//	import pinyinUtil from "@/libs/pinyin.js";
	import { Toast } from 'vux';
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import { ImagePreview } from 'vant';

	export default {
		components: {
			Toast
		},
		data() {
			return {
				taskName: "任务名称",
				taskHuman: "张消消",
				teskMemo: "任务说明任务说明任务说明任务说明任务说...",
				datalist: [
					{
						userhead: require("@/assets/user.png"),
						userName: "杨洋",
						createDate: "2019.10.30",
//						aftertime: "39分钟前",
						aftertime: "19:20:20",
						description: "已经完成第一版",
						introduceicon: "@王总",
						plance: "天津和平区金谷大厦",
						taskCommentList: [
							{
								commentUserName: "张新新:",
								beCommentUserName: "",
								content: "收到",
								id: "0_0",
								timestatus: true
							},
							{
								commentUserName: "李小",
								beCommentUserName: "张新新",
								content: "收到",
								id: "0_1",
								timestatus: false
							}
						],
						id: "0"
					},
					{
						userhead: require("@/assets/user.png"),
						userName: "杨洋",
						createDate: "2019.10.30",
						aftertime: "19:20:20",
						introducetext: "已经完成第一版",
						introduceicon: "@王总",
						plance: "天津和平区金谷大厦",
						taskCommentList: [
							{
								commentUserName: "张新新:",
								beCommentUserName: "",
								content: "收到",
								id: "1_0",
								timestatus: false
							},
							{
								commentUserName: "李小",
								beCommentUserName: "张新新",
								content: "收到",
								id: "1_1",
								timestatus: true
							},
							{
								commentUserName: "李小新",
								beCommentUserName: "张新新",
								content: "收到",
								id: "1_2",
								timestatus: false
							}
						],
						id: "1"
					}
				],
				fixicon: require("@/assets/BUTTEN-Add.png"),
				fixtitle: "添加日志",
				withdrawText: "撤销",
				showWithdraw: "",
				countDownTime: 1800,
				dataList: [],
				userhead: require("@/assets/user.png"),
				logUservalue: null,
				createByVal: null,
				offset: 0,
				limit: 5,
				//设置一个开关来避免重负请求数据
				is_extending: true,
				direction: "",
				state: 0,
				overShow: false,
				userId: null,
				userid: null,
				imglist: null
			}
		},
		methods: {
			...mapMutations(['changeCookieData']),
			//moreBtn
			seeMoreClick (e) {
				console.log("跳转任务详情页");
				console.log(this.createdTime);
        		this.$router.push({ path: '/taskDetails'})
			},
			//commentBtn
			commentBtnClick (logUservalue, createByVal, flag, parentid) {
//				console.log(logUservalue);
				if(this.state == 1){
					this.$vux.toast.text("此任务已结束!", 'middle');
					return;
				}
				console.log(this);
				let tempObj = {};
				tempObj.jumpPageId = "1";
				tempObj.logUserId = logUservalue;
				tempObj.createBy = createByVal;
				tempObj.flag = flag;
				tempObj.parentId = parentid;
				tempObj.pageId = "clear";
				this.changeCookieData(tempObj);
				this.$router.push({ path:'/log/comment' });
				// localStorage.setItem("jumpPageId", "1");
				// localStorage.setItem("logUserId", logUservalue);
				// localStorage.setItem("createBy", createByVal);
				// localStorage.setItem("flag", flag);
				// localStorage.setItem("parentId", parentid);
				// this.$router.push({
				// 	path:'/log/comment',
				// 	query: {
				// 		logUserId: logUservalue,
				// 		createBy: createByVal,
				// 		flag: flag,
				// 		parentId: parentid,
				// 		pageId: "clear"
				// 	}
				// })
			},
			//fixIconClick
			fixIconClick () {
				//登录的值
				const id = 1;
				let tempObj = {};
				tempObj.logUserId = this.userid;
				tempObj.createBy = this.userid;
				tempObj.parentId = id;
				tempObj.pageId = "clear";
				this.changeCookieData(tempObj);
				this.$router.push({ path:'/log/addLog' });
				// this.$router.push({
				// 	path:'/log/addLog',
				// 	query: {
				// 		userId: uservalue,
				// 		createBy: createByVal,
				// 		pageId: id
				// 	}
				// })
			},
			//showWithdrawAlt
			showWithdrawAlt (e, id, val) {
				if(this.state == 1){
					this.$vux.toast.text("此任务已结束!", 'middle');
					return;
				}
				clearTimeout(this.timer);
//				console.log(this.$refs);
				const touchClientX = e.touches[0].clientX;
				const touchoffsetWidth = e.target.offsetWidth;
				const domList = this.$refs.showWithdraw;
				const childrenList = this.$refs.children;
				let offsetX = 100;
//				console.log(domList);
				if (domList.length != 0) {
					this.timer = setTimeout(function(){
						this.showWithdraw = id;
						for (let i = 0; i < childrenList.length; i++) {
							for(let j = 0; j < domList.length; j++){
								if (childrenList[i].getAttribute("data-id") == id && domList[j].getAttribute("data-id") == id) {
									domList[j].style.left = touchClientX - offsetX + "px";
								}
							}
						}
					}.bind(this), 1000);
				}else{
					return;
				}
			},
			emptyWithdraw (e) {
				clearTimeout(this.timer);
			},
			//showWithdraw
			showWithdrawClick (e, id, parentid, logid) {
				console.log("撤销");
				let parentId = null;
				if (parentid == logid) {
					parentId = logid;
				} else{
					parentId = parentid;
				}
				//删数据
				let api = "taskComment/remove";
				util.getList(api, {
					id,
					parentId
				}).then(res => {
					console.log(res);
					if(res.data.result.code === 1){
//						if(res.data.result.message == null){
//							res.data.result.message = "成功";
//						}
						this.$vux.toast.text(res.data.result.message, 'middle');
						e.target.className = "withdraw_box";
						this.showWithdraw = "";
						this.timer = setTimeout( () => {
							this.$vux.toast.hide();
						}, 1000);
						this.getData();
					}else{
						this.$vux.toast.text(res.data.result.message, 'middle');
					}
				}).catch(error => {
					console.log('Error', error.message);
				});
			},
			//init data
			getData () {
				let api = "taskLog/getTaskLogList";
//				let taskId = "fa1e466c28ec49dea65593936f0b56bd";
//				let taskId = "775b010eaf184b1797b746d25bb92568";
//				let offset = 0;
				let taskInfo = JSON.parse(storejs.get("params"));
				let taskId = taskInfo.taskId;
				let limit = 5;
				util.getList(api, {
					taskId,
					offset: this.offset,
					limit
				}).then(res => {
					console.log(res);
					this.datalist = res.data.result;
					console.log(res.data.result.length, "1");
//					console.log(this.datalist);
					this.taskName = res.data.taskInfo.taskName;
					this.taskHuman = res.data.taskInfo.createName;
					this.teskMemo = res.data.taskInfo.description;
					this.state = res.data.taskInfo.state;
					this.offset = 0;
					const userList = JSON.parse(storejs.get("loginUserInfo"));
					this.userid = userList.userId;
				}).catch(error => {
					console.log('Error', error.message);
					this.is_extending = false;
				});
			},
			//处理撤回事件
			differTime (value) {
//				console.log(value);
				let nowDate = new Date(),
					nowTime = nowDate.getTime() / 1000,
					diffValue = nowTime - value / 1000,
					diff_minutes = parseInt(diffValue / 60);
				if (diff_minutes > 30) {
					return false;
				} else{
					return true;
				}
			},
			//评论回复
			commentClick (logUservalue, createByVal, flag, commentUserId, beCommentUserId, id) {
//				console.log(logUservalue);
				if(commentUserId == beCommentUserId){
					this.$vux.toast.text("不可给自己评论", 'middle');
					this.timer = setTimeout( () => {
						this.$vux.toast.hide();
					}, 1000);
					return false;
				}else{
					let tempObj = {};
					tempObj.jumpPageId = "1";
					tempObj.logUserId = logUservalue;
					tempObj.createBy = createByVal;
					tempObj.flag = flag;
					tempObj.parentId = id;
					tempObj.pageId = "clear";
					this.changeCookieData(tempObj);
					this.$router.push({ path:'/log/comment' });
				}
			},
			//关闭撤销
			hideTip (e) {
//				console.log(this.$refs);
//				console.log(this.$refs.showWithdraw)
				if (this.$refs.showWithdraw.length != 0) {
					this.$refs.showWithdraw[0].className = "withdraw_box";
					this.showWithdraw = "";
				}
			},
			//第二页及以后的数据
			extendGetData () {
				this.offset += 5;
				console.log(this.offset)
				let api = "taskLog/getTaskLogList";
//				let taskId = "fa1e466c28ec49dea65593936f0b56bd";
				let taskInfo=JSON.parse(storejs.get("params"));
				let taskId=taskInfo.taskId;
				let limit = 5;
				util.getList(api, {
					taskId,
					offset: this.offset,
					limit
				}).then(res => {
					console.log(res);
					if(this.datalist.length >= res.data.taskLogCount) {
//						this.$vux.toast.text('数据已加载完全', 'middle');
						return;
					} else {
						this.datalist = this.datalist.concat(res.data.result);
//						this.overShow = false;
					}
					this.is_extending = true;
					this.taskName = res.data.taskInfo.taskName;
					this.taskHuman = res.data.taskInfo.createName;
					this.teskMemo = res.data.taskInfo.description;
				}).catch(error => {
					console.log('Error', error.message);
					this.is_extending = false;
				});
			},
			menu() {
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
				if (this.direction == "下") {
					if (this.is_extending) {
                        this.is_extending = false;
                        this.extendGetData();
                    }
				}
			},
			handleViewImg(imglist){
				// const imglist = localStorage.getItem("imgList");
				// if (imglist) this.imgList = JSON.parse(imglist);
//        this.$vux.toast.text(imglist);
//        let res = document.getElementById("result");
//        res.innerText = JSON.stringify(imglist);
        let imgList = [];
        imglist.map(item => {
          imgList.push(item.url);
        })
				ImagePreview(imgList);
			}
		},
		watch: {
			'$route': 'getParams'
		},
		created(){
			this.getParams();
		},
		filters: {
			handleCreatedTime (value) {
				if (typeof(value) == "number") {
					return util.formatDate(new Date(value), 'yyyy.MM.dd');
				}else{
					return value;
				}
//				return util.formatDate(new Date(value), 'yyyy.MM.dd');
			},
			handleAfterTime (value) {
//				console.log(value,"asdasd")
//				console.log(typeof value);
				if (value != undefined) {
					value = value.replace(/-/g, '/');
					value = new Date(value);
					value = value.getTime();
					let date = new Date(value);
					let Y = date.getFullYear(),
				        M = date.getMonth() + 1,
				        D = date.getDate(),
				        H = date.getHours(),
				        m = date.getMinutes(),
				        s = date.getSeconds();
			        let nowDate = new Date();
			        let nowMonth = nowDate.getMonth() + 1;
					let nowTime = nowDate.getTime() / 1000,
					diffValue = nowTime - value / 1000,
			        diff_days = parseInt(diffValue / 86400),
			        diff_hours = parseInt(diffValue / 3600),
			        diff_minutes = parseInt(diffValue / 60),
			        diff_secodes = parseInt(diffValue);
			        if (diff_days > 0 && diff_days < 3) {
			            return diff_days + "天前";
			        } else if (diff_days <= 0 && diff_hours > 0) {
			            return diff_hours + "小时前";
			        } else if (diff_hours <= 0 && diff_minutes > 0) {
			            return diff_minutes + "分钟前";
			        } else if (diff_secodes < 60) {
			            if (diff_secodes <= 0) {
			                return "刚刚";
			            } else {
			                return diff_secodes + "秒前";
			            }
			        } else if (diff_days >= 3 && diff_days < 30) {
			            return M + "月内";
			        } else if (diff_days >= 30){
			        	if (M == 1) {
			        		return M + "月前";
			        	}else{
			        		let difference = nowMonth - M;
			        		if (difference > 12) {
			        			return "几年前"
			        		}else{
			        			return difference + "月前";
			        		}
			        	}
			        }
			    }
			}
		},
		computed : {

		},
		created () {
			clearInterval(this.loop);
			this.getData();
		},
		mounted () {
			clearInterval(this.loop);
//			this.getData();
			let oldTop = 0;
//			this.direction = window.onscroll(oldTop, this.direction);
//			console.log(this.direction);
			window.onscroll = () => {
			    let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
			    //旧数据大于当前位置，表示滚动条top向上滚动
			    if (oldTop > top) this.direction = "上";
			    else this.direction = "下";
			    oldTop = top;//更新旧的位置
			    //变量windowHeight是可视区的高度
			    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			    //变量scrollHeight是滚动条的总高度
    			let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    			//滚动条到底部的条件
            	if(top + windowHeight >= scrollHeight){
		            //写后台加载数据的函数
		        	this.overShow = true;
    			}
			};
			window.addEventListener('scroll', this.menu);
		}
	}
</script>

<style>
	.weui-tab__panel{
		background: #FFF;
	}
	#taskProgress.taskProgress{
		/*background: #f0f5fa;*/
		background: #FFFFFF;
    	height:100%;
	}

	/*topcard*/
	#taskProgress .topCard{
		width: 343px;
		height: 155px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 4px 1px rgba(153, 153, 153, 0.1);
		border-radius: 10px;
		margin: 15px auto 0px auto;
		position: relative;
		overflow: hidden;
	}
	#taskProgress .topList{
		display: flex;
		justify-content: flex-start;
	}
	#taskProgress .topLeft{
		font-size: 15px;
		color: #999;
		padding-top: 10px;
		padding-left: 20px;
		white-space: nowrap;
		font-weight: bold;
		font-family: PingFangSC-Regular, sans-serif;
	}
	#taskProgress .topLeft>div:not(:nth-of-type(3)){
		margin-bottom: 14px;
	}
	#taskProgress .topRight{
		font-size: 15px;
		font-family: PingFangSC-Regular, sans-serif;
		color: #666;
		padding-top: 10px;
		padding-left: 20px;
		font-weight: bold;
	}
	#taskProgress .topRight>div:nth-of-type(1){
		width: 228px;
		max-width: 228px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#taskProgress .topRight>div:nth-of-type(2){
		width: 228px;
		max-width: 228px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#taskProgress .topRight>div:nth-of-type(3){
		width: 93%;
		height: 44px;
		max-height: 44px;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	#taskProgress .topRight>div:not(:nth-of-type(3)){
		margin-bottom: 14px;
	}
	#taskProgress .topMore{
		color: #16A6FF;
		font-size: 14px;
		font-family: PingFangSC-Regular, sans-serif;
		font-weight: bold;
		text-align: right;
		margin-right: 20px;
		margin-bottom: 10px;
	}
	#taskProgress .moreIcon{
		display: inline-block;
		background: url(../../../../assets/content-btn-More.png) no-repeat;
		background-position: center;
		background-size: cover;
		margin-left: 4.5px;
		/*width: 11px;
		height: 17px;*/
		width: 9px;
		height: 15px;
		vertical-align: -2.5px;
	}
	/*liat*/
	#taskProgress .dataList{
		margin: 40px auto 40px 16px;
		/*padding-bottom: 10px;*/
	}
	/*.dataList:before{
		content: "";
		display: block;
		height: 0.2px;
		border: 0.2px solid #EEE;
		margin-left: -16px;
	}*/
	.dataList:not(:first-of-type):after{
		content: "";
		display: block;
		height: 0.5px;
		border: 0.5px solid #EEE;
		margin-left: -16px;
		margin-top: 20px;
	}
	#taskProgress .comment_box{
		display: flex;
		justify-content: flex-start;
	}
	#taskProgress .comment_box>img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 11px;
		margin-top: 2px;
	}
	#taskProgress .user_box{
		font-family: PingFangSC-Light, sans-serif;
		color: #999999;
	}
	#taskProgress .user{
		/*font-size: 16px;*/
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 3px;
	}
	#taskProgress .user_time{
		/*font-size: 11px;*/
		font-size: 11px;
		font-weight: bold;
	}
	#taskProgress .usertime{
		margin-right: 5px;
	}
	/*user_time*/
	#taskProgress .introduce_box{
		margin-left: 50px;
		margin-top: 7px;
		margin-bottom: 7px;
		margin-right: 16px;
		font-family: PingFangSC-Regular, sans-serif;
	}
	#taskProgress .introducetext{
		font-size: 14px;
		color: #666;
		font-weight: bold;
		margin-right: 11px;
	}
	#taskProgress .introduceicon{
		color: #16A6FF;
		font-size: 13px;
		font-weight: 400;
	}
	/*local_box*/
	#taskProgress .local_box{
		margin-left: 50px;
		font-family: PingFangSC-Regular, sans-serif;
		overflow-x: hidden;
		position: relative;
		margin-bottom: 9px;
		display: flex;
	}
	#taskProgress .localIcon{
		display: inline-block;
		width: 11px;
		height: 14px;
		background: url(../../../../assets/icon-Location.png) no-repeat;
		background-position: center;
		background-size: cover;
		margin-right: 5px;
		vertical-align: -2px;
		margin-top: 2px;
		/*vertical-align: 15px;*/
	}
	#taskProgress .location{
		font-size: 11px;
		font-weight: bold;
		color: #999999;
		display: inline-block;
		width: 76%;
	}
	#taskProgress .commentIcon{
		display: inline-block;
		width: 16px;
		height: 15px;
		background: url(../../../../assets/icon-comment.png) no-repeat;
		background-position: center;
		background-size: cover;
		float: right;
		/*margin-right: 16px;*/
		margin-right: 3px;
		/*margin-top: 4px;*/
		/*margin-top: 21px;*/
		/* margin-top: -18px; */
	}
	/*children_box*/
	#taskProgress .commentBox{
		position: relative;
		padding: 0 16px 0 48px;
	}
	#taskProgress .children_box{
		/*width: 295px;*/
		/*height: 58px;*/
		/*background: url(../../../../assets/comment.png) no-repeat;
		background-position: center;
		background-size: cover;*/
		/* border: 2px solid #FFF; */
		/*background: #FFF;*/
		background: #F0F5FA;
		/*margin-left: 50px;*/
		/*padding: 16px 0 9px 11px;*/
		/*padding: 11px 0 9px 11px;*/
		padding: 7px 11px 9px 11px;
		overflow: hidden;
		/*position: relative;*/
	}
	#taskProgress .children_box:before{
		content: '';
		width: 0;
		height: 0;
		border: 5px solid;
		position: absolute;
		/*top: -12px;*/
		top: -10px;
		left: 61px;
		/*border-color:  transparent  transparent #FFF;*/
		border-color:  transparent  transparent #f0f5fa;
	}
	#taskProgress .childrenbox{
		position: relative;
		-webkit-user-select:none;
	    -khtml-user-select:none;
	    -moz-user-select:none;
	    -ms-user-select:none;
	    user-select:none;
	}
	#taskProgress .childrenbox>div{
		/*display: flex;*/
		/*justify-content: flex-start;*/
		font-family: PingFangSC-Regular, sans-serif;
		/*position: relative;*/
		/*font-size: 12px;
		font-weight: bold;
		color: #999999;*/
	}
	#taskProgress .childrenbox:not(:last-of-type){
		margin-bottom: 15px;
	}
	#taskProgress .children_name{
		font-size: 11px;
		font-weight: bold;
		color: #666666;
		margin-right: 3px;
	}
	#taskProgress .children_status{
		font-size: 12px;
		font-weight: bold;
		color: #999999;
		line-height: 20px;
	}
	/*fixIcon*/
	#taskProgress .fixIcon{
		position: fixed;
		bottom: 69px;
		right: 16px;
		line-height: 1px;
	}
	#taskProgress .fixIcon img{
		width: 50px;
		height: 50px;
	}
	/*withdraw_box*/
	#taskProgress .withdraw_box{
		/*width: 40px;*/
		/*height: 20px;*/
		width: 100px;
		height: 30px;
		background-color: #fff;
		box-shadow: 0px 2px 6px 1px #bcdeff;
		text-align: center;
		/*line-height: 20px;*/
		line-height: 30px;
		font-size: 11px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #666666;
		position: absolute;
		z-index: 9999;
		left: 0;
		/*top: 0;*/
		top: -5px;
		display: none;
	}
	#taskProgress .active{
		display: block;
	}
	#taskProgress .vux-header .vux-header-title{
		font-size: 17px !important;
	}

	#taskProgress .replyComment{
		width: 39px;
		max-width: 39px;
		white-space: nowrap;
		margin-right: 3px;
	}
	#taskProgress .replyCommentActive{
		width: 24px;
		max-width: 24px;
		white-space: nowrap;
	}

	#taskProgress .comment-replyname{
		float: left;
		/* margin-top: 4px; */
    	margin-right: 4px;
	}

	#taskProgress .taskExcitation{
		display: inline-flex;
		margin-right: 5px;
		/* margin-top: 5px; */
		margin-bottom: 5px;
		/*background-color: #fcc51e;*/
		border-radius: 18px;
		color: #FFF;
		/*width: 100px;*/
		height: 17px;
		line-height: 17px;
		font-size: 11px;
		text-align: center;
		justify-content: center;
	}
	#taskProgress span{
		display: inline-flex;
		border-radius: 8px;
		padding: 0px 6px;
	}
	#taskProgress .fontColor{
		/*color: #FCC51E;*/
		background: #fcc51e ;
	}
	#taskProgress .fontColor1{
		/*color: #fe4240;*/
		background: #fe4240;
	}

	/*over data*/
	#taskProgress .overbox{
		width: 100%;
		height: 50px;
		background: #FFF;
		font-family: PingFang SC;
		font-size: 12px;
		color: #999;
		position: relative;
		margin-top: 20px;
	}
	/*#taskProgress .overbox:after{
		content: "";
		width: 50%;
		height: 2px;
		border-bottom: 1px dashed #999;
		position: absolute;
		bottom: 70%;
		left: calc(50% - 25%);
		margin: 0 auto;
		z-index: 1;
	}*/
	#taskProgress .overdata{
		width: 100px;
		height: 30px;
		background: #fff;
		margin: 0 auto;
		text-align: center;
		line-height: 30px;
		position: relative;
		z-index: 2;
	}


	.data_img_box{
		display: flex;
		margin: 10px 0 10px 50px;
		width: 70%;
	}
	.data-img{
		width: 60px;
		height: 60px;
		border-radius: 10px;
		margin-right: 10px;
		overflow: hidden;
	}
	.data-img img{
		width: 100%;
		height: 100%;
	}
	#taskProgress .iconBox{
		display: block;
		width: 100px;
		height: 20px;
		position: absolute;
		right: 10px;
		top: -16px;
	}
</style>
