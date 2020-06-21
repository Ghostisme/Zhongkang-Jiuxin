$(document).ready(function(){
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
//			var excessive = startTime.split("-");
//			console.log(excessive);
//			startTime = excessive.join("/");
//			console.log(startTime);
//			startTime = new Date(startTime);
			// dataRendering(startTime, "");
			chooseDate();
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
			$("#kinerDatePickerInput1").text("请选择日期");			
			chooseDate(sessionId);
		}
	})
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
			chooseDate();
//			endTime = new Date(endTime);
			// dataRendering("", endTime);
		},
		cancelHandler: function (ctx) {
			console.log("取消选择:",ctx);
			$("#kinerDatePickerInput2").text("请选择日期");
			chooseDate(sessionId);
		}
	})
	function chooseDate(){
		var startTime = $("#kinerDatePickerInput1").text().trim();
		var endTime = $("#kinerDatePickerInput2").text().trim();
		if (startTime == "请选择日期") {
			startTime = "";
		}
		if (endTime == "请选择日期") {
			endTime = "";
		}	
		dataRendering(startTime, endTime);
		console.log(startTime, endTime);
	}
	function dataRendering(val1, val2) {
		//获取dom插入盒子
		var oWrapper = $(".content");
		//初始化页面
		var str = "";
		str += '<div class="listBox tpl">'+
					'<div class="imgBox">'+
						'<img src="../../img/user.png" alt="这是一个头像图片" title="这是一个头像图片">'+
					'</div>'+
					'<div class="centerContent">'+
						'<p>'+
							'<span>2019-05-13 16:20</span>'+
						'</p>'+
						'<p>'+
							'<span>机构：</span>'+
							'<span>宜宾里社区</span>'+
						'</p>'+
						'<p>'+
							'<span>患者：</span>'+
							'<span>大海</span>'+
						'</p>'+
						'<p>'+
							'<span>性别：</span>'+
							'<span>女</span>'+
						'</p>'+
						'<p>'+
							'<span>服务概要：</span>'+
							'<span>常规测量、处方录入</span>'+
						'</p>'+
						'<input type="hidden" value="" class="diagnosisid">'+
					'</div>'+
					'<div class="rightIcon">'+
						'<i class="iconfont"></i>'+
					'</div>'+
				'</div>';
		oWrapper.html(str);
		$.ajax({
			type: "get",
			url: config + "/oa/patinfoDiagnosis/list",
			async: true,
			data: {
				"diagnosisTimeBegin": val1,
				"diagnosisTimeEnd": val2
			},
			success: function(data) {
				console.log(data);
				var dataArr = data.resultMap.patinfoDiagnosisList;
				
				//获取当前时间
				var oDate = new Date().getFullYear();

				//补零操作
				function addZero(num) {
					if(parseInt(num) < 10) {
						num = '0' + num;
					}
					return num;
				}
				dataArr.forEach(function(ele, index) {
					//获取克隆dom
					var oCloneDom = $(".tpl").clone().removeClass("tpl");
					console.log(oCloneDom);
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
						//			diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin) + ':' +addZero(diagnosisSen);
						diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' + addZero(diagnosisMin);
					//数据渲染
					//头像赋值
					if(ele.headImage == null) {
						ele.headImage = "../../img/user.png";
						
					};
					console.log(oCloneDom.find(".imgBox").find("img").attr("src"));
					console.log(ele.headImage);
					oCloneDom
						.find(".imgBox")
							.find("img")
								.attr("src", ele.headImage);
					//最近一次就诊时间赋值
					oCloneDom
						.find(".centerContent")
							.find("p")
								.eq(0)
									.find("span")
										.text(diagnosisTime);
					//机构赋值
					if(ele.fkDeptName == null) {
						ele.fkDeptName = "暂无";
					};
					oCloneDom
						.find(".centerContent")
							.find("p")
								.eq(1)
									.find("span")
										.eq(1)
											.text(ele.fkDeptName);
					//患者姓名赋值
					if(ele.patinfoName == null) {
						ele.patinfoName = "暂无";
					};
					oCloneDom
						.find(".centerContent")
							.find("p")
								.eq(2)
									.find("span")
										.eq(1)
											.text(ele.patinfoName);
					//性别赋值
					oCloneDom
						.find(".centerContent")
							.find("p")
								.eq(3)
									.find("span")
										.eq(1)
											.text(ele.sex);
					//服务概要赋值
					if(ele.memo == null) {
						ele.memo = "暂无";
					};
					oCloneDom
						.find(".centerContent")
							.find("p")
								.eq(4)
									.find("span")
										.eq(1)
											.text(ele.memo);
					//患者ID
					oCloneDom
						.find(".centerContent")
							.find("input").val(ele.id);
					//数据插入											
					oWrapper.append(oCloneDom);
					oCloneDom = "";
				})
				var medicalContent = $(".content").find(".listBox");
				$(medicalContent).click(function() {
					//就诊ID
					//				console.log($(".diagnosisid").val());
					var diagnosisId = $(this).find(".centerContent").find(".diagnosisid").val();
					//				var diagnosisId = $(".diagnosisid").val();
					//				console.log(diagnosisId);
					localStorage.setItem("diagnosisid", diagnosisId);
					$(location).prop('href', "../pleaseVisit/pleaseVisit.html");
				})
			},
			error: function(data) {
				console.log(data);
			}
		});
	}
})