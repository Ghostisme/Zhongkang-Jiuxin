$(document).ready(function() {
	// var sessionId = sessionStorage.getItem("sessionId");
	// dataRendering("", "", sessionId);
	//条件查询
	// var username;
	// var searchNum;
	//搜索框聚焦失焦提示文字切换
	// $(".username").focus(function() {
	// 	this.placeholder = "";
	// });
	// $(".username").blur(function() {
	// 	this.placeholder = "输入患者姓名";
	// 	username = $(".username").val();
	// 	searchNum = $(".searchNum").val();
	// 	console.log(searchNum);
	// 	dataRendering(username, searchNum, sessionId);
	// });
	// $(".searchNum").focus(function() {
	// 	this.placeholder = "";
	// });
	// $(".searchNum").blur(function() {
	// 	this.placeholder = "身份证号、手机号";
	// 	searchNum = $(".searchNum").val();
	// 	username = $(".username").val();
	// 	dataRendering(username, searchNum, sessionId);
	// });
	var time = new Date();
	var nowYear = time.getFullYear();
	var nowMonth = time.getMonth() + 1;
	var nowDay = time.getDate();
	var nowTime = nowYear + "-" + nowMonth + "-" + nowDay;
	console.log(nowTime);
	$("#kinerDatePickerInput1").attr("default-val", nowTime);
	$("#kinerDatePickerInput2").attr("default-val", nowTime);
	// $("#kinerDatePickerInput1").attr("title").click(function(){
	// 	$("#kinerDatePickerInput1").text("请选择日期");
	// });
	// $("div[class=kdp-title]").click(function(){
	// 	console.log("222");
	// })
	console.log($("div[class=kdp-title]"));
	// 条件查询
	// var searchinputVal;
	// $(".searchinput").focus(function() {
	// 	this.placeholder = "";
	// });
	// $(".searchinput").blur(function() {
	// 	this.placeholder = "输入患者、身份证号、手机号";
	// 	searchinputVal = $(".searchinput").val();
	// 	dataRendering(searchinputVal, sessionId);
	// });
	// 滑屏交互
	// var scrollY = window.scrollY; // 初始值
	// console.log(scrollY);
	// $(window).on('scroll', function() {
	// 	
	// 	var currentY = window.scrollY;
	// 	if (currentY <= scrollY) { // 向下滑动
	// 		// $(".locationBox").removeClass("locationScroll");
	// 		// alert("11");
	// 	} else { // 向上
	// 		
	// 		$(".locationBox").addClass("locationScroll");
	// 		// alert("22");
	// 	}
	// 	(currentY === 0) && $(".locationBox").removeClass("locationScroll");
	// 	scroll = currentY;
	// })
	//渲染数据函数
	function dataRendering(val, sesid) {
		var sessionId = sesid;
		//获取dom插入盒子
		var oWrapper = $(".oWrapper");
		//初始化表格
		oWrapper.html(
			'<tr class="tpl"><td><img src="../img/user.png" class="headicon"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		);
		//数据渲染
		$.ajax({
			type: "get",
			url: config + "/oa/patinfo/list",
			async: true,
			data: {
				"sessionId": sessionId,
				"mobIdcLike": val
				// "nameLike": val1,
				// "mobIdcLike": val2
				//"diagnosisBeginTime": val3,
				//"diagnosisEndTime": val4
			},
			success: function(data) {
				console.log(data);
				//				oCloneDom = "";
				//				oWrapper.append(oCloneDom);
				//获取总计dom元素并插入总数据
				$(".allnum").text("共计：" + data.resultMap.total + "人");
				//找到数组数据
				var dataList = data.resultMap.patinfoList;

				//补零操作
				function addZero(num) {
					if (parseInt(num) < 10) {
						num = '0' + num;
					}
					return num;
				}
				//获取当前时间
				var oDate = new Date().getFullYear();
				//循环数组
				dataList.forEach(function(ele, index) {
					//获取克隆dom
					var oCloneDom = $(".tpl").clone().removeClass("tpl");
					//获取生日时间
					//				var birthdayDate = new Date(ele.birthday),
					//计算生日年份
					//				birthdayYear = birthdayDate.getFullYear(),
					//计算年龄
					//				birthdayTime = oDate - birthdayYear;
					//判断头像有无
					if (ele.headImage == null) {
						ele.headImage = '../img/user.png';
					}
					//获取就诊时间
					var diagnosisDate = new Date(ele.diagnosisTime),
						//就诊年
						diagnosisYear = diagnosisDate.getFullYear(),
						//就诊月
						diagnosisMonth = diagnosisDate.getMonth() + 1,
						//就诊日
						diagnosisDay = diagnosisDate.getDate(),
						//就诊小时
						diagnosisHour = diagnosisDate.getHours(),
						//就诊分钟
						diagnosisMin = diagnosisDate.getMinutes(),
						//就诊秒
						diagnosisSen = diagnosisDate.getSeconds(),
						//最终就诊时间 年-月-日 时：分：秒
						//			    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin) + ':' +addZero(diagnosisSen);
						diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' +
						addZero(diagnosisHour) + ':' + addZero(diagnosisMin);
					//数据渲染
					//头像克隆
					oCloneDom
						.find("td")
							.eq(0)
								.find("img")
									.attr("src", ele.headImage);
					//数据克隆
					oCloneDom
						.find("td")
							.eq(0)
								.next()
									.text(ele.name)
										.next()
											.text(ele.sex)
												.next()
													.text(ele.age)
														.next()
															.text(diagnosisTime)
																.next()
																	.text(ele.id)
																		.next()
																			.text(ele.diagnosisId);
					//数据插入											
					oWrapper.append(oCloneDom);
					oCloneDom = "";
				})
				var healthContent = $(".tableclick").find("tbody").find("tr");
				//			pageGo(healthContent, "../healthrecord/healthrecord.html");//表格列表跳转健康记录页
				$(healthContent).click(function() {
					var eleId = $(this).find("td").eq(5).text();
					var eleDisid = $(this).find("td").eq(6).text();
					sessionStorage.setItem("id", eleId);
					sessionStorage.setItem("disid", eleDisid);
					//console.log(this);				
					$(location).prop('href', "../basicInformation/basicInformation.html");
				})
			},
			error: function(data) {
				console.log(data);
			}
		});
	}

	//页面跳转	
	// pageGo(".gobackBtn", "首页菜单"); //返回按钮页面跳转
	//	var more = $(".moreBtn")
	// $(".moreBtn").click(function() {
	//		$(".moreContent").css({"right":"0.1rem"});
	//		$(".moreContent").css({"display":"block"});
	// $(".moreContent").toggle();
	// pageGo(".registerBtn", "../registrationVisits/registrationVisits.html"); //登记按钮页面跳转
	// pageGo(".medicalBtn", "../visitingRecord/visitingRecord.html"); //就诊记录按钮页面跳转		
	//})
})
