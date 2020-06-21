$(document).ready(function() {
	//页面跳转
	// pageGo(".gobackBtn", "../patient/patient.html"); //返回按钮->患者管理页
	// pageGo(".listBox", "../pleaseVisit/pleaseVisit.html"); //内容列表选项跳转页面
	
	var sessionId = sessionStorage.getItem("sessionId");
//	console.log(sessionId)
	dataRendering("", sessionId);
	// 滑屏交互
	var scrollY = window.scrollY; // 初始值
	console.log(scrollY);
	$(window).on('scroll', function() {
		
		var currentY = window.scrollY;
		if (currentY <= scrollY) { // 向下滑动
			// $(".locationBox").removeClass("locationScroll");
		} else { // 向上
			$(".locationBox").addClass("locationScroll");
		}
		(currentY === 0) && $(".locationBox").removeClass("locationScroll");
		scroll = currentY;
	})
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
	// 	console.log(username);
	// 	dataRendering(username, searchNum);		
	// });
	// $(".searchNum").focus(function() {
	// 	this.placeholder = "";
	// });
	// $(".searchNum").blur(function() {
	// 	this.placeholder = "身份证号、手机号";
	// 	searchNum = $(".searchNum").val();
	// 	username = $(".username").val();
	// 	dataRendering(username, searchNum);
	// });
	var time = new Date();
	var nowYear = time.getFullYear();
	var nowMonth = time.getMonth() + 1;
	var nowDay = time.getDate();
	var nowTime = nowYear + "-" + nowMonth + "-" + nowDay;
	console.log(nowTime);
	$("#kinerDatePickerInput1").attr("default-val", nowTime);
	$("#kinerDatePickerInput2").attr("default-val", nowTime);
	var searchinputVal;
	$(".searchinput").focus(function() {
		this.placeholder = "";
	});
	$(".searchinput").blur(function() {
		this.placeholder = "输入姓名、身份证号、手机号";
		searchinputVal = $(".searchinput").val();
		dataRendering(searchinputVal, sessionId);
	});
	//数据请求
	function dataRendering(val, sesId) {
		//获取dom插入盒子
		var oWrapper = $(".content");
		//初始化页面
		var str = "";
		str += '<div class="listBox tpl">'+
					'<div class="imgBox">'+
						'<img src="../img/user.png" alt="这是一个头像图片" title="这是一个头像图片">'+
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
							'<span>姓名：</span>'+
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
						'<input type="hidden" value="" class="fkPatinfoId">'+
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
				// "patinfoName": val1,
				"sessionId": sesId,
				"mobIdcLike": val
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
						ele.headImage = "../img/user.png";
					};
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
					//患者就诊ID
					oCloneDom
						.find(".centerContent")
							.find(".diagnosisid").val(ele.id);
//					console.log(ele.id)		
					//患者ID
					oCloneDom
						.find(".centerContent")
							.find(".fkPatinfoId").val(ele.fkPatinfoId);
//							console.log(ele.fkPatinfoId)	
					//数据插入											
					oWrapper.append(oCloneDom);
					// $("#diagnosisid").val(ele.id);
					// $("#fkPatinfoId").val(ele.fkPatinfoId);
				})
				// var diagnosisId = $("#diagnosisid").val();
				// var fkPatinfoId = $("#fkPatinfoId").val();
				// sessionStorage.setItem("diagnosisId", diagnosisId);
				// sessionStorage.setItem("fkPatinfoId", fkPatinfoId);
				var medicalContent = $(".content").find(".listBox");
				$(medicalContent).click(function() {
					//就诊ID
					//console.log($(".diagnosisid").val());
					var diagnosisId = $(this).find(".centerContent").find(".diagnosisid").val();
					var fkPatinfoId = $(this).find(".centerContent").find(".fkPatinfoId").val();
					//	var diagnosisId = $(".diagnosisid").val();
					console.log(diagnosisId);
					console.log(fkPatinfoId);
					sessionStorage.setItem("diagnosisId", diagnosisId);
					sessionStorage.setItem("fkPatinfoId", fkPatinfoId);
					$(location).prop('href', "../pleaseVisit/pleaseVisit.html");
				})
			},
			error: function(data) {
				console.log(data);
			}
		});
	}
})