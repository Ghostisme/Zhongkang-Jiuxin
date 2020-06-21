$(document).ready(function(){
	//页面跳转
	pageGo(".gobackBtn", "../patient/patient.html");//返回按钮->患者管理页
	pageGo(".essentialBox", "../basicInformation/basicInformation.html");//内容基本部分->基本信息页
	pageGo(".medicalHistoryBox", "../medicalHistory/medicalHistory.html");//内容病史部分->病史选择页
	pageGo(".habitsCustomsBox", "../habitscustoms/habitscustoms.html");//内容生活习惯部分->生活习惯页
	pageGo(".diseaseManagementBox", "../diseaseManagement/diseaseManagement.html");//内容病症管理部分->病症管理页
	pageGo(".bloodpressure", "../bloodPressure/bloodPressure.html");//内容健康数据之血压->血压详情页
	pageGo(".bloodsugar", "../bloodSugar/bloodSugar.html");//内容健康数据之血糖->血糖详情页
	pageGo(".bmiContent", "../BMI/BMI.html");//内容健康数据之BMI->BMI详情页
	pageGo(".prescriptionDrugs", "../prescriptionDrugs/prescriptionDrugs.html");//内容诊疗信息之药品处方->药品处方页
	//跟原生交互
//	var test = window.location.href;
//	console.log(test);
//	window.location.href = window.location.href + "#" + test;
//	console.log(window.location.href)
	
	//数据请求级渲染
	var eleId = sessionStorage.getItem("id");
	sessionStorage.setItem("id",eleId);
	console.log(eleId);
	$.ajax({
		type: "get",
		url: config + "/oa/patinfo/get",
		async:true,
		dataType:'json',//接收值的格式
		data:{
			"id": eleId
		},
		success: function(data){
			console.log(data);
			
			var dataList = data.resultMap.patinfo;			
			//获取当前时间
//			var oDate = new Date().getFullYear();
//			var birthdayDate = new Date(dataList.birthday),
//				//计算生日年份
//				birthdayYear = birthdayDate.getFullYear(),
//				//计算年龄
//				birthdayTime = oDate - birthdayYear;
			function dataContent(ele, divNum, pNum, con){
				if(con == null || con == 0){
					con = "无";
				}else if(con == 1){
					con = "有";
				}else{
					con = con;
				}
				$(ele)
					.find("div")
						.eq(divNum)
							.find("p")
								.eq(pNum)
									.find("span")
										.eq(1)
											.text(con);
			}
//			function healthData(ele, spanNum, iNum, conNum1, conNum2){
//				if(conNum1 == null){
//					conNum1 = "";
//				}else{
//					conNum1 = conNum1 + '/';
//				}
//				if(conNum2 == null){
//					conNum2 = "";
//				}
//				$(ele)
//					.find("span")
//						.eq(spanNum)
//							.find("i")
//								.eq(iNum)
//									.text(conNum1)
//										.next()
//											.text(conNum2);
//									
//			}
			dataContent(".essential", 0, 0, dataList.name);
			dataContent(".essential", 0, 1, dataList.sex);
			dataContent(".essential", 0, 2, dataList.age);
			dataContent(".medicalHistory", 0, 0, dataList.medicalHistory);
			dataContent(".medicalHistory", 1, 0, dataList.pastHistory);
			dataContent(".medicalHistory", 2, 0, dataList.allergyHistory);
			dataContent(".medicalHistory", 3, 0, dataList.familyHistory);
			dataContent(".habitsCustoms", 0, 0, dataList.isSmoke);
			dataContent(".habitsCustoms", 0, 1, dataList.isDrink);
			dataContent(".habitsCustoms", 0, 2, dataList.isInsomnia);
			dataContent(".dM", 0, 0, dataList.isPressure);
			dataContent(".dM", 0, 1, dataList.isDiabetes);
//			healthData(".bloodpressure", 1, 0, dataList.maxPressure, dataList.minPressure);
//			console.log(dataList.sugarValue);
			//血压
			if (dataList.maxPressure == null) {
				dataList.maxPressure = "";
//				dataList.minPressure = '<i class="iconfont rightBtn">&#xe606;</i>';
				
			}else{
				// dataList.maxPressure = '<i class="iconfont degree1">&#xe79d;</i>' + dataList.maxPressure + "/";
				if (dataList.pressureLevel == "正常") {
					dataList.maxPressure = dataList.maxPressure + " /";
				} else{
					dataList.maxPressure = '<i class="iconfont degree1">&#xe79d;</i>' + dataList.maxPressure + " /";
				}
			}
			if (dataList.minPressure == null) {
				dataList.minPressure = '<i class="iconfont rightBtn">&#xe606;</i>';
			}else{
				dataList.minPressure = dataList.minPressure + '<i class="iconfont rightBtn">&#xe606;</i>';
			}
			if (dataList.pressureLevel == "高") {
				$(".bloodpressure")
					.find("span")
						.eq(1)
							.css({"color": "red"})
								.find("span")
									.eq(0)
										.html(dataList.maxPressure)
											.next()
												.css({"color": "red"})
													.html(dataList.minPressure);
			} else if(dataList.pressureLevel == "低"){
				$(".bloodpressure")
					.find("span")
						.eq(1)
							.css({"color": "green"})
								.find("span")
									.eq(0)
										.html(dataList.maxPressure)
											.next()
												.css({"color": "green"})
													.html(dataList.minPressure);
			}else{
				$(".bloodpressure")
					.find("span")
						.eq(1)
							.css({"color": "#727377"})
								.find("span")
									.eq(0)
										.html(dataList.maxPressure)
											.next()
												.css({"color": "#727377"})
													.html(dataList.minPressure);
			}			
			//血糖
			//				dataList.sugarValue = dataList.sugarValue;
			console.log(dataList.sugarValue);
			console.log(typeof dataList.sugarValue);
			if (dataList.sugarValue == null || dataList.sugarValue == 0) {
				dataList.sugarValue = '<i class="iconfont rightBtn">&#xe606;</i>';
				$(".bloodsugar")
					.find("span")
						.eq(1)
							.html(dataList.sugarValue);
			} else if(dataList.sugarValue == -1){
				dataList.sugarValue = '<i class="iconfont rightBtn">&#xe606;</i>';
				$(".bloodsugar")
					.find("span")
						.eq(1)
							.html(dataList.sugarValue);
			}else{
				if (dataList.sugarLevel == "高") {
					dataList.sugarValue = dataList.sugarValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bloodsugar")
						.find("span")
							.eq(1)
								.css({"color": "red"})
									.find(".degree")
										.html("&#xe79d;")
											.next()
												.html(dataList.sugarValue);
				} else{
					dataList.sugarValue = dataList.sugarValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bloodsugar")
						.find("span")
							.eq(1)
								.css({"color": "green"})
									.find(".degree")
										.html("&#xe79e;")
											.next()
												.html(dataList.sugarValue);
				}
			}
			//BMI
			if (dataList.bmiValue == null || dataList.bmiValue == 0) {
				dataList.bmiValue = '<i class="iconfont rightBtn">&#xe606;</i>';
				$(".bmiContent")
					.find("span")
						.eq(1)
							.html(dataList.bmiValue);
			} else if(dataList.bmiValue == -1){
				dataList.bmiValue = '<i class="iconfont rightBtn">&#xe606;</i>';
				$(".bmiContent")
					.find("span")
						.eq(1)
							.html(dataList.bmiValue);
			}else{
				if (dataList.bmiLevel == "偏瘦") {
					dataList.bmiValue = dataList.bmiValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bmiContent")
						.find("span")
							.eq(1)
								.css({"color": "rgb(207, 207, 207)"})
									.find(".BMIdegree")
										// .html("&#xe79e;")
										.html(dataList.bmiLevel)
											.next()
												.html(dataList.bmiValue);
				} else if(dataList.bmiLevel == "正常"){
					dataList.bmiValue = dataList.bmiValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bmiContent")
						.find("span")
							.eq(1)
								.css({"color": "rgb(98, 207, 0)"})
									.find(".BMIdegree")
										// .html("")
										.html(dataList.bmiLevel)
											.next()
												.html(dataList.bmiValue);
				} else if (dataList.bmiLevel == "过重") {
					dataList.bmiValue = dataList.bmiValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bmiContent")
						.find("span")
							.eq(1)
								.css({"color": "rgb(201, 202, 73)"})
									.find(".BMIdegree")
										// .html("&#xe79d;")
										.html(dataList.bmiLevel)
											.next()
												.html(dataList.bmiValue);
				}else{
					dataList.bmiValue = dataList.bmiValue + '<i class="iconfont rightBtn">&#xe606;</i>';
					$(".bmiContent")
						.find("span")
							.eq(1)
								.css({"color": "rgb(254, 153, 0)"})
									.find(".BMIdegree")
										// .html("&#xe79d;")
										.html(dataList.bmiLevel)
											.next()
												.html(dataList.bmiValue);
				}
			}
			$(".prescriptionDrugs")
				.find("span")
					.eq(1)
						.html(data.resultMap.prescribeCount + '<i class="iconfont rightBtn">&#xe606;</i>');
		},		
		error: function(data){
			console.log(data);
		}
	});
})
