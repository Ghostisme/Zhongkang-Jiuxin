$(document).ready(function(){
	var sessionId = sessionStorage.getItem("sessionId");
	$('#kinerDatePickerInput1').kinerDatePicker({
		clickMaskHide: true,
		showHandler: function (ctx) {
			console.log("显示时间选择器:",ctx);
		},
		hideHandler: function (ctx) {
			console.log("隐藏时间选择器:",ctx);
		},
		changeHandler: function (vals,ctx) {
			console.log("时间改变:",vals,ctx);
		},
		okHandler: function (vals, ctx) {
			console.log("确定选择:",vals,ctx);
			// startTime = new Date(startTime);
			// return startTime;
			// dataRendering(startTime, "");
			chooseDate(sessionId);
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
			$("#kinerDatePickerInput1").text("请选择日期");		
			chooseDate(sessionId);
		}		
	})
	function chooseDate(sesId){
		var startTime = $("#kinerDatePickerInput1").text().trim();
		var endTime = $("#kinerDatePickerInput2").text().trim();
		if (startTime == "请选择日期") {
			startTime = "";
		}
		if (endTime == "请选择日期") {
			endTime = "";
		}	
		dataRendering(startTime, endTime, sesId);
		console.log(startTime, endTime, sesId);
	}
	$('#kinerDatePickerInput2').kinerDatePicker({
		clickMaskHide: true,
		showHandler: function (ctx) {
			console.log("显示时间选择器:",ctx);
		},
		hideHandler: function (ctx) {
			console.log("隐藏时间选择器:",ctx);
		},
		changeHandler: function (vals,ctx) {
			console.log("时间改变:",vals,ctx);
		},
		okHandler: function (vals, ctx) {
			console.log("确定选择:",vals,ctx);	
			chooseDate(sessionId);
			// endTime = new Date(endTime);
			// dataRendering("", endTime);
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
			$("#kinerDatePickerInput2").text("请选择日期");
			chooseDate(sessionId);
		}
	})
	function dataRendering(val1, val2, sesId) {	
		//获取dom插入盒子
		var oWrapper = $(".oWrapper");
		//初始化表格
		oWrapper.html('<tr class="tpl"><td><img src="../../img/user.png" class="headicon"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		//数据渲染
		$.ajax({
			type: "get",
			url:  config + "/oa/patinfo/list",
			async: true,
			data: {
				"sessionId": sesId,
				"diagnosisBeginTime": val1,
				"diagnosisEndTime": val2
			},
			success: function(data) {
				console.log(data);
				//获取总计dom元素并插入总数据
				$(".allnum").text("共计：" + data.resultMap.total + "人");
				//找到数组数据
				var dataList = data.resultMap.patinfoList;
				
				//补零操作
				function addZero(num) {
					if(parseInt(num) < 10) {
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
					if(ele.headImage == null) {
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
						diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' + addZero(diagnosisMin);
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
					//				console.log(this);				
					$(location).prop('href', "../healthrecord/healthrecord.html");
				})
			},
			error: function(data) {
				console.log(data);
			}
		});
	}
})