$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	// pageGo(".closebtn", "../bPmanualInput/bPmanualInput.html");//手动输入按钮->血压手输页
	//顶部按钮交互
	$(".tablist")
		.find("button")
			.click(function(){
				$(this).addClass("active").siblings().removeClass("active");
				return $("#tablist-val").val($(this).attr("data-str"));
			})
	//数据渲染
	var eleId = sessionStorage.getItem("id");	
	//获取dom插入盒子
	var oWrapper = $(".oWrapper");
	//初始化页面获取克隆dom
	var oCloneDom = $(".tpl").clone();
	oWrapper.html(oCloneDom);	
	$.ajax({
		type: "get",
		url: config + "/oa/patinfoBloodPressure/list",
		async: true,
		data: {
			"fkPatinfoId": eleId,
			"inputTimeType": $("#tablist-val").val()
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.pbpList;			
			//补零操作
			function addZero(num){
			    if(parseInt(num) < 10){
			        num = '0' + num;
			    }
			    return num;
			}
			
			//循环数组
			dataList.forEach(function(ele, index){
				//获取克隆dom
				var oCloneDom = $(".tpl").clone().removeClass("tpl");
				//获取当前时间
				var oDate = new Date().getFullYear();
				//获取录入时间
				var inputDate = new Date(ele.inputTime),
				//录入年
				inputYear = inputDate.getFullYear(),
				//录入月
				inputMonth = inputDate.getMonth() + 1,
				//录入日
				inputDay = inputDate.getDate(),
				//录入小时
				inputHour = inputDate.getHours(),
				//录入分钟
			    inputMin = inputDate.getMinutes(),
			    //录入秒
			    inputSen = inputDate.getSeconds(),
			    //最终录入时间 年-月-日 时：分：秒
//			    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin) + ':' +addZero(diagnosisSen);
			    inputdate = inputYear + '-' + addZero(inputMonth) + '-' + addZero(inputDay),
			    inputtime = addZero(inputHour) + ':' +addZero(inputMin);
				//数据克隆
					//时间
				oCloneDom
					.find("td")
						.eq(0)
							.find("p")
								.eq(0)
									.text(inputtime)
										.next()
											.text(inputdate);
					//血压值并判断血压程度
				if(ele.level == "高"){
					oCloneDom
						.find("td")
							.eq(1)
								.css({"color": "red"})
									.find("span")
										.eq(0)
											.text(ele.maxPressure)
												.next()
													.text(ele.minPressure)
														.next()
															.html("&#xe79d;");
				}else if(ele.level == "低"){
					oCloneDom
						.find("td")
							.eq(1)
								.css({"color": "green"})
									.find("span")
										.eq(0)
											.text(ele.maxPressure)
												.next()
													.text(ele.minPressure)
														.next()
															.html("&#xe79e;");
				}else{
					oCloneDom
						.find("td")
							.eq(1)
								.css({"color": "#000"})
									.find("span")
										.eq(0)
											.text(ele.maxPressure)
												.next()
													.text(ele.minPressure)
														.next()
															.html("");
				}
					//心率
				oCloneDom
					.find("td")
						.eq(2)
							.text(ele.heartRate);
				// 数据Id
				oCloneDom
					.find("td")
						.eq(4)
							.text(ele.id);
				//数据插入											
				oWrapper.append(oCloneDom);	
				oCloneDom = "";
			})
			// 点击当前行
			var dataContent = $(".tableclick").find("tbody").find("tr");
			$(dataContent).click(function(){
				var dataId = $(this).find("td").eq(4).text();
				sessionStorage.setItem("dataId", dataId);
				$(location).prop('href', "../bPmanualdel/bPmanualdel.html");
			})
		},
		error: function(data){
			console.log(data);
		}
	});
})
