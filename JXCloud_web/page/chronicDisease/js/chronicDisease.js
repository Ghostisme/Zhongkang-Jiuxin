$(document).ready(function(){
	//多选择交互
	var value1 = {};//高血压家族史
	var value2 = {};//高血压并发症
	var value3 = {};//糖尿病家族史
	var value4 = {};//糖尿病并发症
	var value6 = {};//血糖控制
	//页面跳转
	//pageGo(".gobackBtn","../diseaseManagement/diseaseManagement.html");//返回按钮->病症管理页
	//数据渲染
	var eleId = localStorage.getItem("id");
	//	http://192.31.10.62:8001/oa/patinfoChronicDiseases/toDiseases
	//回显数据
	function feedbackData(titleEle, titletype, eleDom, obj){
		var value = obj;
		console.log(value, "123sada");
		$.ajax({
			type:"get",
	//		url:"http://192.31.10.62:8001/oa/patinfoChronicDiseases/toDiseases",
			url: config + "/oa/patinfoChronicDiseases/toDiseases",
			async:true,
			data:{
				"id": eleId,
				// "type": $(".Title1").val()(titleEle),
				"type": $(titleEle).val(),
				// "diseasesType": $(".subType1").val()(titletype)
				"diseasesType": $(titletype).val()
			},
			success: function(data){
				console.log(data);
				var dataList = data.resultMap.pcdList;
				// var domArr = $(".listbox1").find("li");
				var domArr = $(eleDom).find("li");
				console.log(domArr);
				dataList.forEach(function(ele, index){
					console.log(ele.situation);
					for (var i = 0; i < domArr.length; i++) {
						var a = $(domArr[i]).find("span").text();
						var b = ele.situation;
						var c = $(domArr[i]).find("span").text() == ele.situation;
						console.log(a, b, c, "asdadsasd2131231")
//						console.log($(domArr[i]).find("span").text(), ele.situation, $(domArr[i]).find("span").text() == ele.situation, "asdasd213123")
						if ($(domArr[i]).find("span").text() == ele.situation) {
							value[i] = ele.situation;
							$(domArr[i])
								.find("i")
									.html("&#xe67d;")
										.css({"color":"rgb(26, 172, 25)"})
											.attr('data-checked', 1);
						}
					}	
				})
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	feedbackData(".Title1", ".subType1", ".listbox1", value1);
	feedbackData(".Title2", ".subType2", ".listbox2", value2);
	feedbackData(".Title3", ".subType3", ".listbox3", value3);
	feedbackData(".Title4", ".subType4", ".listbox4", value4);
	feedbackData(".Title6", ".subType6", ".listbox6", value6);
	
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoChronicDiseases/toDiabetes",
		async:true,
		data: {
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfo;
			if (dataList.diabetesType == null) {
				$(".trigger1").val("请选择");
			}else{
				$(".trigger1").val(dataList.diabetesType);
			}
			if (dataList.diabetesTime == null) {
				$(".trigger2").val("请选择");
			} else{
				$(".trigger2").val(dataList.diabetesTime);
			}
			if (dataList.diabetesWay == null) {
				$(".trigger3").val("请选择");
			} else{
				$(".trigger3").val(dataList.diabetesWay);
			}			
		},
		error: function(data){
			console.log(data);
		}
	});
	
	
	
	// 多选交互
	function interactiveData(eleDom, obj){
		// var clickDom = $(eleDom).find("ul").find("li");
		$(eleDom)
			.find("ul")
				.find("li")
					.click(function(){
						var $This = $(this),
						$I = $This.find('i'),
						$Span = $This.find('span'),
						isChecked = $I.attr('data-checked'),
						index = $This.index(),
						checkedValue = $Span.text();						
//						if (isChecked == 0) { // 要放入数组
//							$I.attr('data-checked', "1");
//							$I.html("&#xe67d;");
//							$I.css({"color":"#1aac19"});
//							obj[index] = checkedValue;
//						} else { // 删除
//							$I.attr('data-checked', "0");
//							$I.html("&#xe684;");
//							$I.css({"color":"#cbcbcb"});
//							delete obj[index];
//						}
						// arr = Object.values(value);
//						console.log(Object.values(obj));
//						console.log(Object);
//						console.log(obj);
						if (checkedValue == "无家族史" || checkedValue == "无并发症") {
//							obj = {};
//							var obj1 = {};
							if (isChecked == 0) { // 要放入数组
								$I.attr('data-checked', 1);
								$I.html("&#xe67d;");
								$I.css({"color":"#1aac19"});
								obj[index] = checkedValue;
							} else { // 删除
								$I.attr('data-checked', 0);
								$I.html("&#xe684;");
								$I.css({"color":"#cbcbcb"});
								delete obj[index];
							}
							for(var i = 0; i < 5; i++){
								delete obj[i];
							}
//							if (checkedValue == "无家族史") {
//								for(var i = 0; i < 5; i++){
//									delete obj[i];
//								}
//							} else{
//								for(var i = 5; i < 0; i--){
//									delete obj[i];
//								}
//							}
							$I.parent().siblings().find('i').attr('data-checked', 0).html("&#xe684;").css({"color":"#cbcbcb"});
							console.log(obj);
							
						} else{
							if (isChecked == 0) { // 要放入数组
								$I.attr('data-checked', 1);
								$I.html("&#xe67d;");
								$I.css({"color":"#1aac19"});
								obj[index] = checkedValue;
							} else { // 删除
								$I.attr('data-checked', 0);
								$I.html("&#xe684;");
								$I.css({"color":"#cbcbcb"});
								delete obj[index];
							}
							$(eleDom).find("ul").find("li").eq(5).find("i").attr('data-checked', 0).html("&#xe684;").css({"color":"#cbcbcb"});
							delete obj[5];
							console.log(obj);
							
						}
//						console.log(obj);
//						console.log(value1);
					})
					return obj;
		
	}
	// 高血压家族史
	value1 = interactiveData(".listbox1", value1);
	//高血压并发症			
	value2 = interactiveData(".listbox2", value2);
	// 糖尿病家族史
	value3 = interactiveData(".listbox3", value3);
	// 糖尿病并发症
	value4 = interactiveData(".listbox4", value4);
	// 血糖控制状况
	value6 = interactiveData(".listbox6", value6);
	//保存数据
	$("#editSave").click(function(){
		//保存多选交互值
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoChronicDiseases/save",
			url: config + "/oa/patinfoChronicDiseases/savePc",
			async: true,
//			dataType: "JSON",
			data: {
				"fkPatinfoId": eleId,
				"gxyjzsArray": Object.values(value1),
				"gxybfzArray": Object.values(value2),
				"tnbjzsArray": Object.values(value3),
				"tnbbfzArray": Object.values(value4),				
				"tnbkzArray": Object.values(value6) 
			},
			traditional: true, 
			success: function(data){
				console.log(data);
				if(data.status == 1){
//					alert(data.message);	
//					$(location).prop('href', "../chronicDisease/chronicDisease.html");
					// 保存下拉交互值
					$.ajax({
						type:"get",
			//			url:"http://192.31.10.62:8001/oa/patinfoChronicDiseases/save",
						url: config + "/oa/patinfo/updateDiseases",
			//			url: config + "/oa/patinfoChronicDiseases/savePc",
						async: true,
			//			dataType: "JSON",
						data: {
							"id": eleId,
							"diabetesType": $(".trigger1").val(),
							"diabetesTime": $(".trigger2").val(),
							"diabetesWay": $(".trigger3").val()
						},
						traditional: true, 
						success: function(data){
							console.log(data);
							if(data.status == 1){
								alert(data.message);	
								$(location).prop('href', "../chronicDisease/chronicDisease.html");
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
				}else{
//					alert(data.message);
				}					
			},
			error: function(data){
				console.log(data);
				if(data.status == 2){
//					alert(data.message);
				}
			}
		});
		
	})
	
// 	$(".click").click(function(){
// 		console.log(dataarr);
// //		str = JSON.stringify(arr);
// 		$.ajax({
// 			type:"get",
// //			url:"http://192.31.10.62:8001/oa/patinfoChronicDiseases/save",
// 			url: config + "/oa/patinfoChronicDiseases/save",
// 			async: true,
// //			dataType: "JSON",
// 			data: {
// 				"fkPatinfoId": eleId,
// 				"type": $(".Title").text(),
// 				"subType": $(".subType").val(),
// 				"situationArray": dataarr
// 			},
// 			traditional: true, 
// 			success: function(data){
// 				console.log(data);
// 				if(data.status == 1){
// 					alert(data.message);	
// 					$(location).prop('href', "../diseaseManagement/diseaseManagement.html");
// 				}else{
// 					alert(data.message);
// 				}					
// 			},
// 			error: function(data){
// 				console.log(data);
// 				if(data.status == 2){
// 					alert(data.message);
// 				}
// 			}
// 		});
// 	})
})