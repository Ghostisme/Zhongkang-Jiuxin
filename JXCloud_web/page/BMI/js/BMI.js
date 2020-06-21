$(document).ready(function(){
	var eleId = localStorage.getItem("id");
	var eleDisid = localStorage.getItem("disid");
	var isDel;
	// 删除交互
	$(document).on("click",".delbtn",function(){
		var dataId = $(this).parent("td").next().text();
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoBmi/remove",
			async: false,
			data: {
				"id": dataId,
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
					$(location).prop('href', "../BMI/BMI.html");
				}else{
					alert(data.message);
				}
			},
			error: function(data){
				console.log(data);
				if(data.status == 2){
					alert(data.message);
				}
			}
		});
	})
	//页面跳转
	
	//数据渲染	
	$.ajax({
		type:"get",
//		url:"http://192.31.10.62:8001/oa/patinfoBmi/list",
		url: config + "/oa/patinfoBmi/list",
		async:true,
		data: {
			"fkPatinfoId": eleId,
			"fkDisId": eleDisid
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.pbList;
			
			//获取dom插入盒子
			var oWrapper = $(".oWrapper");
			//补零操作
			function addZero(num){
			    if(parseInt(num) < 10){
			        num = '0' + num;
			    }
			    return num;
			}
			//循环数组
			dataList.forEach(function(ele, index){
				//顶部BMI值
				$(".BMI")
					.find('span')
						.eq(1)
							.text(ele.bmiValue);
				//顶部身高值
				$(".height")
					.find('span')
						.eq(1)
							.text(ele.stature + "m");
				//顶部体重值			
				$(".weight")
					.find('span')
						.eq(1)
							.text(ele.weight + "kg");			
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
//			    inputdate = inputYear + '-' + addZero(inputMonth) + '-' + addZero(inputDay),
			    inputdate = inputYear + '-' + addZero(inputMonth) + '-' + addZero(inputDay) + " " +addZero(inputHour) + ':' +addZero(inputMin);
//			    inputtime = addZero(inputHour) + ':' +addZero(inputMin);
				//数据克隆
					//时间
				oCloneDom
					.find("td")
						.eq(0)
							.text(inputdate);				
					//体重值		
				oCloneDom
					.find("td")
						.eq(1)
							.text(ele.weight);				
					//BMI值并判断BMI程度
				if(ele.level == "偏瘦"){
					oCloneDom
						.find("td")
							.eq(2)
								.css({"color": "rgb(207, 207, 207)"})
									.find("span")
										.text(ele.bmiValue)
											.next()
												.html("&#xe79d;");
				}else if(ele.level == "正常"){
					oCloneDom
						.find("td")
							.eq(2)
								.css({"color": "rgb(98, 207, 0)"})
									.find("span")
										.text(ele.bmiValue)
											.next()
												.html("&#xe79e;");
				}else if (ele.level == "过重") {
					oCloneDom
						.find("td")
							.eq(2)
								.css({"color": "rgb(201, 202, 73)"})
									.find("span")
										.text(ele.bmiValue)
											.next()
												.html("&#xe79e;");
				}else{
					oCloneDom
						.find("td")
							.eq(2)
								.css({"color": "rgb(254, 153, 0)"})
									.find("span")
										.text(ele.bmiValue)
											.next()
												.html("&#xe79e;");
				}
				// 删除状态赋值
				oCloneDom
					.find("td")
						.eq(4)
							.find("button")
								.attr("data-del", ele.isDeleted);				
				// 填充数据id
				oCloneDom
					.find("td")
						.eq(5)
							.text(ele.id);
				//数据插入											
				oWrapper.append(oCloneDom);	
				//删除状态
				isDel = oCloneDom.find("td").eq(4).find("button").attr("data-del");
				// 删除按钮交互
				if (isDel == 1) {
					$(".tableclick").find("thead").find("tr").find("th").eq(4).show();
					$(".delbtn").parent().show();
					$(".delbtn").show();
				} else{
					$(".tableclick").find("thead").find("tr").find("th").eq(4).hide();
					$(".delbtn").parent().hide();
					$(".delbtn").hide();
				}
			})
		},
		error: function(data){
			console.log(data);
		}
	});
})
