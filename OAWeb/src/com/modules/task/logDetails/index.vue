<template>
	<div class="logDetails" id="logDetails">
		<!--<x-header style="background-color: #06a6ff;color: #FFF !important;" :left-options="{backText: ''}">日志详情</x-header>-->
		<!--<div class="taskName">{{ taskName }}</div>-->
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
				<div class="data-img" v-for="item in key.sysFilesList" :key="item.id" @click="handleViewImg">
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
		<!-- <div class="dataList">
			<div class="comment_box">
				<img :src="userhead"/>
				<div class="user_box">
					<div class="user">
						<span>{{ datalist.userName }}</span>
					</div>
					<div class="user_time">
						<span class="usertime">{{ datalist.createDate | handleCreatedTime }}</span>
						<span class="aftertime">{{ datalist.createDate | handleAfterTime }}</span>
					</div>
				</div>
			</div>
			<div class="introduce_box">
				<span class="introducetext">{{ datalist.description }}</span>
				<span class="introduceicon" v-for="item in datalist.taskRemindList" :key="item.id">{{ "@" + item.beRemindUserName + " " }}</span>
				<span v-for="item in datalist.taskExcitationList" :key="item.id" class="taskExcitation" >
					<span v-if="item.excitationCategory == 1">
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
			<div class="local_box" v-if="datalist.plance == ''"></div>
			<div class="local_box" v-else>
				<i class="localIcon"></i>
				<span class="location">{{ datalist.plance }}</span>
			</div>
			<div class="data_img_box">
				<div class="data-img" v-for="item in datalist.sysFilesList" :key="item.id" @click="handleViewImg">
					<img :src="item.url" :alt="item.fileName"/>
				</div>
			</div>
			<div class="commentBox">
				<input type="hidden" name="logUservalue" id="logUservalue" :value="logUservalue" />
				<input type="hidden" name="createByVal" id="createByVal" :value="createByVal" />
				<span class="iconBox">
					<i class="commentIcon" @click.stop="commentBtnClick(key.id, datalist.createBy, 0)"></i>
				</span>
				<div class="children_box" v-show="datalist.taskCommentList.length == 0 ? false : true">
					<div
						class="childrenbox"
						:data-id="item.id"
						:key="item.id"
						:data-value="item.value"
						v-for="(item,  index) in datalist.taskCommentList"
						ref="children"
						@touchstart="showWithdrawAlt($event, item.id, index)"
						@touchend="emptyWithdraw"
						@click="commentClick(datalist.id, datalist.createBy, 1, item.commentUserId, item.beCommentUserId, item.id)"
					>
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
							<span class="introduceicon" v-for="item in item.taskRemindList" :key="item.id">{{ "@" + item.beRemindUserName + " " }}</span>
							<span v-for="item in item.taskExcitationList" :key="item.id" class="taskExcitation" >
								<span v-if="item.excitationCategory == 1">
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
						<div v-if="differTime(item.createDate)" ref="showWithdraw" :data-id="item.id" :class="showWithdraw == item.id ? 'withdraw_box active' : 'withdraw_box' " @click.stop="showWithdrawClick($event, item.id, item.parentId, datalist.id)" >
							{{ withdrawText }}
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import storejs from 'storejs';
	import util from '@/libs/util';
	import pinyin from "@/libs/pyfist.js";
	import pinyinUtil from "@/libs/pinyin.js";
	import { Toast } from 'vux';
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

	export default {
		components: {
			Toast
		},
		data() {
			return {
				taskName: "任务名称",
				taskHuman: "张消消",
				teskMemo: "任务说明任务说明任务说明任务说明任务说...",
				datalist: {
					userhead: require("@/assets/user.png"),
					userName: "杨洋",
					createDate: "2019.10.30",
//					aftertime: "39分钟前",
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
				fixicon: require("@/assets/BUTTEN-Add.png"),
				fixtitle: "添加日志",
				withdrawText: "撤销",
				showWithdraw: "",
				countDownTime: 1800,
				dataList: [],
				userhead: require("@/assets/user.png"),
				logUservalue: null,
				createByVal: null,
				state: 0,
				imglist: null
			}
		},
		methods: {
			...mapMutations(['changeCookieData']),
			//moreBtn
			seeMoreClick (e) {
				console.log("跳转任务详情页");
				console.log(this.createdTime);
				this.$router.push({ path: '/taskDetails'});
			},
			//commentBtn
			commentBtnClick (logUservalue, createByVal, flag, parentid) {
//				console.log(logUservalue);
				console.log(this);
				if(this.state == 1){
					this.$vux.toast.text("此任务已结束!", 'middle');
					return;
				}
				let tempObj = {};
				tempObj.jumpPageId = "2";
				tempObj.logUserId = logUservalue;
				tempObj.createBy = createByVal;
				tempObj.flag = flag;
				tempObj.parentId = parentid;
				tempObj.pageId = "clear";
				this.changeCookieData(tempObj);
				this.$router.push({ path:'/log/comment' });
				// localStorage.setItem("jumpPageId", "2");
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
			//showWithdrawAlt
			showWithdrawAlt (e, id, val) {
				if(this.state == 1){
					this.$vux.toast.text("此任务已结束!", 'middle');
					return;
				}
				clearTimeout(this.timer);
				console.log(this.$refs);
				const touchClientX = e.touches[0].clientX;
				const touchoffsetWidth = e.target.offsetWidth;
				const domList = this.$refs.showWithdraw;
				const childrenList = this.$refs.children;
				let offsetX = 100;
				console.log(domList);
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
				// console.log(id);
				// console.log(parentid);
				// console.log(logid);
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
						this.$vux.toast.text(res.data.result.message, 'middle');
						e.target.className = "withdraw_box";
						this.timer = setTimeout( () => {
							this.$vux.toast.hide();
						}, 1000);
						this.getData();
					}else{
//						console.log(res.data.result.message)
						this.$vux.toast.text(res.data.result.message, 'middle');
					}
				}).catch(error => {
					console.log('Error', error.message);
				});
			},
			//init data
			getData () {
				let api = "taskLog/getTaskLog";
//				let taskId = "fa1e466c28ec49dea65593936f0b56bd";
//				let logId = "d7be1de098964ecfb3ea3b538315ab9c";
				// let logId = "c654de8ac1cc430b80d54ada5375a9d7";
				// let logId = "5411f50f0b284d8a95e2d0c882358468";
				// let userId = 7188;
				util.getList(api, {
//					taskId,
					logId,
					userId
				}).then(res => {
//					console.log(res);
					this.datalist = res.data.result;
//					console.log(this.datalist);
					if (res.data.taskInfo == null) {
						this.taskName = "";
						this.taskHuman = "";
						this.teskMemo = "";
						this.state = "";
					}else{
						this.taskName = res.data.taskInfo.taskName;
						this.taskHuman = res.data.taskInfo.createName;
						this.teskMemo = res.data.taskInfo.description;
						this.state = res.data.taskInfo.state;
					}

				}).catch(error => {
					console.log('Error', error.message);
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
				if(this.state == 1){
					this.$vux.toast.text("此任务已结束!", 'middle');
					return;
				}else{
					if(commentUserId == beCommentUserId){
						this.$vux.toast.text("不可给自己评论", 'middle');
						this.timer = setTimeout( () => {
							this.$vux.toast.hide();
						}, 1000);
						return false;
					}else{
						let tempObj = {};
						tempObj.jumpPageId = "2";
						tempObj.logUserId = logUservalue;
						tempObj.createBy = createByVal;
						tempObj.flag = flag;
						tempObj.parentId = id;
						tempObj.pageId = "clear";
						this.changeCookieData(tempObj);
						this.$router.push({ path:'/log/comment' });
						// localStorage.setItem("jumpPageId", "2");
						// localStorage.setItem("logUserId", logUservalue);
						// localStorage.setItem("createBy", createByVal);
						// localStorage.setItem("flag", flag);
						// localStorage.setItem("parentId", id);
						// this.$router.push({
						// 	path:'comment',
						// 	query: {
						// 		logUserId: logUservalue,
						// 		createBy: createByVal,
						// 		flag: flag,
						// 		parentId: id,
						// 		pageId: "clear"
						// 	}
						// })
					}
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
			handleViewImg(){
				const imglist = localStorage.getItem("imgList");
				if (imglist) this.imgList = JSON.parse(imglist);
				ImagePreview(this.imgList);
			}
		},
		mounted () {
			clearInterval(this.loop);
		},
		watch: {
			'$route': 'getParams'
		},
		created () {

		},
		filters: {
			handleCreatedTime (value) {
				if (typeof(value) == "number") {
					return util.formatDate(new Date(value), 'yyyy.MM.dd');
				}else{
					return value;
				}
			},
			handleAfterTime (value) {
				value = value.replace(/-/g, '/');
				value = new Date(value);
				value = value.getTime();
				let date = new Date(value),
					Y = date.getFullYear(),
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
		},
		computed : {
		},
		created () {
			clearInterval(this.loop);
			this.getData();
		},
	}
</script>

<style>
	.weui-tab__panel{
		background: #FFF;
	}
	#logDetails.logDetails{
		/*background: #f0f5fa;*/
		background: #FFFFFF;
		height:100%;
	}

	/*topcard*/
	#logDetails .topCard{
		width: 343px;
		/*height: 155px;*/
		height: 115px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 4px 1px rgba(153, 153, 153, 0.1);
		border-radius: 10px;
		margin: 15px auto 0px auto;
		position: relative;
		overflow: hidden;
	}
	#logDetails .topList{
		display: flex;
		justify-content: flex-start;
	}
	#logDetails .topLeft{
		font-size: 15px;
		color: #999;
		padding-top: 10px;
		padding-left: 20px;
		white-space: nowrap;
		font-weight: bold;
		font-family: PingFangSC-Regular, sans-serif;
	}
	#logDetails .topLeft>div:not(:nth-of-type(3)){
		margin-bottom: 14px;
	}
	#logDetails .topRight{
		font-size: 15px;
		font-family: PingFangSC-Regular, sans-serif;
		color: #666;
		padding-top: 10px;
		padding-left: 20px;
		font-weight: bold;
	}
	#logDetails .topRight>div:nth-of-type(1){
		width: 228px;
		max-width: 228px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#logDetails .topRight>div:nth-of-type(2){
		width: 228px;
		max-width: 228px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#logDetails .topRight>div:nth-of-type(3){
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
	#logDetails .topRight>div:not(:nth-of-type(3)){
		margin-bottom: 14px;
	}
	#logDetails .topMore{
		color: #16A6FF;
		font-size: 14px;
		font-family: PingFangSC-Regular, sans-serif;
		font-weight: bold;
		text-align: right;
		margin-right: 20px;
		margin-bottom: 10px;
	}
	#logDetails .moreIcon{
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
	#logDetails .dataList{
		margin: 36px auto 30px 16px;
	}
	#logDetails .comment_box{
		display: flex;
		justify-content: flex-start;
	}
	#logDetails .comment_box>img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 11px;
		margin-top: 2px;
	}
	#logDetails .user_box{
		font-family: PingFangSC-Light, sans-serif;
		color: #999999;
	}
	#logDetails .user{
		/*font-size: 16px;*/
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 3px;
	}
	#logDetails .user_time{
		/*font-size: 11px;*/
		font-size: 11px;
		font-weight: bold;
	}
	#logDetails .usertime{
		margin-right: 5px;
	}
	/*user_time*/
	#logDetails .introduce_box{
		margin-left: 50px;
		margin-top: 7px;
		margin-bottom: 7px;
		margin-right: 16px;
		font-family: PingFangSC-Regular, sans-serif;
	}
	#logDetails .introducetext{
		font-size: 14px;
		color: #666;
		font-weight: bold;
		margin-right: 11px;
	}
	#logDetails .introduceicon{
		color: #16A6FF;
		font-size: 13px;
		font-weight: 400;
	}
	/*local_box*/
	#logDetails .local_box{
		margin-left: 50px;
		font-family: PingFangSC-Regular, sans-serif;
		overflow-x: hidden;
		position: relative;
		margin-bottom: 9px;
		display: flex;
	}
	#logDetails .localIcon{
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
	#logDetails .location{
		font-size: 11px;
		font-weight: bold;
		color: #999999;
		display: inline-block;
		width: 76%;
	}
	#logDetails .commentIcon{
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
	#logDetails .commentBox{
		position: relative;
		padding: 0 16px 0 48px;
	}
	#logDetails .children_box{
		/*width: 295px;*/
		/*height: 58px;*/
		/*background: url(../../../../assets/comment.png) no-repeat;
		background-position: center;
		background-size: cover;*/
		border: 2px solid #FFF;
		/*background: #FFF;*/
		background: #F0F5FA;
		/*margin-left: 50px;*/
		/*padding: 16px 0 9px 11px;*/
		/*padding: 11px 0 9px 11px;*/
		padding: 7px 11px 9px 11px;
		overflow: hidden;
		/*position: relative;*/
	}
	#logDetails .children_box:before{
		content: '';
		width: 0;
		height: 0;
		border: 5px solid;
		position: absolute;
		/*top: -12px;*/
		top: -7px;
		left: 61px;
		/*border-color:  transparent  transparent #FFF;*/
		border-color:  transparent  transparent #f0f5fa;
	}
	#logDetails .childrenbox{
		position: relative;
		-webkit-user-select:none;
	    -khtml-user-select:none;
	    -moz-user-select:none;
	    -ms-user-select:none;
	    user-select:none;
	}
	#logDetails .childrenbox>div{
		/*display: flex;*/
		/*justify-content: flex-start;*/
		font-family: PingFangSC-Regular, sans-serif;
		/*position: relative;*/
		/*font-size: 12px;
		font-weight: bold;
		color: #999999;*/
	}
	#logDetails .childrenbox:not(:last-of-type){
		margin-bottom: 15px;
	}
	#logDetails .children_name{
		font-size: 11px;
		font-weight: bold;
		color: #666666;
		margin-right: 3px;
	}
	#logDetails .children_status{
		font-size: 12px;
		font-weight: bold;
		color: #999999;
		line-height: 20px;
	}
	/*fixIcon*/
	#logDetails .fixIcon{
		position: fixed;
		bottom: 69px;
		right: 16px;
		line-height: 1px;
	}
	#logDetails .fixIcon img{
		width: 50px;
		height: 50px;
	}
	/*withdraw_box*/
	#logDetails .withdraw_box{
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
	#logDetails .active{
		display: block;
	}
	#logDetails .vux-header .vux-header-title{
		font-size: 17px !important;
	}

	#logDetails .replyComment{
		width: 39px;
		max-width: 39px;
		white-space: nowrap;
		margin-right: 3px;
	}
	#logDetails .replyCommentActive{
		width: 24px;
		max-width: 24px;
		white-space: nowrap;
	}

	#logDetails .comment-replyname{
		float: left;
		/*margin-top: 4px;*/
    	margin-right: 4px;
	}

	#logDetails .taskExcitation{
		display: inline-flex;
		margin-right: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
		/*background-color: #fcc51e;*/
		border-radius: 8px;
		color: #FFF;
		/*width: 100px;*/
		height: 17px;
		line-height: 17px;
		font-size: 11px !important;
		font-weight: normal !important;
		text-align: center;
		justify-content: center;
	}
	#logDetails span{
		display: inline-flex;
		border-radius: 8px;
		padding: 0px 6px;
		font-size: 11px;
	}
	#logDetails .fontColor{
		/*color: #FCC51E;*/
		background: #FCC51E;
	}
	#logDetails .fontColor1{
		/*color: #fe4240;*/
		background: #fe4240;
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
	#logDetails .iconBox{
		display: block;
		width: 100px;
		height: 20px;
		position: absolute;
		right: 10px;
		top: -16px;
	}
</style>
