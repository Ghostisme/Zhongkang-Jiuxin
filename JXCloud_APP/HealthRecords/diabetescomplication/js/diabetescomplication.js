$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn","../diseaseManagement/diseaseManagement.html");//返回按钮->病症管理页

	//数据渲染
	var eleId = sessionStorage.getItem("id");
	//	http://192.31.10.62:8001/oa/patinfoChronicDiseases/toDiseases
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoChronicDiseases/toDiseases",
		async:true,
		data:{
			"id": eleId,
			"type": $(".Title").text(),
			"diseasesType": $(".subType").val()
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.pcdList;
			var domArr = $(".listBox").find("li");
			dataList.forEach(function(ele, index){
				console.log(ele.situation)
				for (var i = 0; i < domArr.length; i++) {
					if ($(domArr[i]).find("span").text() == ele.situation) {
						value[i] = ele.situation; // 将value在这进行数据回显
						$(domArr[i])
							.find("i")
								.html("&#xe67d;")
									.css({"color":"rgb(26, 172, 25)"})
										.attr('data-checked', 1); // 这里你忘了把i的选中状态变为1
					}
					// console.log($(domArr[i]).find("span").text())
					// if ($(domArr[i]).find("span").text() == ele.situation) {
					// 	$(domArr[i]).find("i").html("&#xe67d;").css({"color":"rgb(26, 172, 25)"});
					// }
				}	
			})
		},
		error: function(data){
			console.log(data);
		}
	});
	//保存数据
	//http://192.31.10.62:8001/oa/patinfoChronicDiseases/save
//	var a = $("li").find("i").attr("data-checked");
	// var dataarr = [];
	//多选择交互
	// $(".listBox")
	// 	.find("ul")
	// 		.find("li")
	// 			.click(function(){
	// 				var status = $(this).find("i").attr("data-checked");
	// 				if(status == 1){
	// 					$(this).find("i").html("&#xe684;");
	// 					$(this).find("i").css({"color":"#cbcbcb"});
	// 					$(this).find("i").attr("data-checked", "0");
	// 				}else{
	// 					$(this).find("i").html("&#xe67d;");
	// 					$(this).find("i").css({"color":"#1aac19"});
	// 					$(this).find("i").attr("data-checked", "1");
	// 					dataarr.push($(this).find("span").text());
	// 				}
	// 			})
	var value = {};
	// var arr;
	$(".listBox")
			.find("ul")
				.find("li")
					.click(function(){
						var $This = $(this),
						$I = $This.find('i'),
						$Span = $This.find('span'),
						isChecked = $I.attr('data-checked'),
						index = $This.index(),
						checkedValue = $Span.text();
						if (checkedValue == "无并发症") {
							if (isChecked == 0) { // 要放入数组
								$I.attr('data-checked', 1);
								$I.html("&#xe67d;");
								$I.css({"color":"#1aac19"});
								value[index] = checkedValue;
							} else { // 删除
								$I.attr('data-checked', 0);
								$I.html("&#xe684;");
								$I.css({"color":"#cbcbcb"});
								delete value[index];
							}
							for(var i = 0; i < 5; i++){
								delete value[i];
							}
							$I.parent().siblings().find('i').attr('data-checked', 0).html("&#xe684;").css({"color":"#cbcbcb"});
							console.log(value);
							
						} else{
							if (isChecked == 0) { // 要放入数组
								$I.attr('data-checked', 1);
								$I.html("&#xe67d;");
								$I.css({"color":"#1aac19"});
								value[index] = checkedValue;
							} else { // 删除
								$I.attr('data-checked', 0);
								$I.html("&#xe684;");
								$I.css({"color":"#cbcbcb"});
								delete value[index];
							}
							$(".listBox").find("ul").find("li").eq(5).find("i").attr('data-checked', 0).html("&#xe684;").css({"color":"#cbcbcb"});
							delete value[5];
							console.log(value);
							
						}
					})
//	$(".listBox")
//		.find("ul")
//			.find("li")
//				.click(function(){
//					var $This = $(this),
//					$I = $This.find('i'),
//					$Span = $This.find('span'),
//					isChecked = $I.attr('data-checked'),
//					index = $This.index(),
//					checkedValue = $Span.text();
//					if (isChecked == 0) { // 要放入数组
//						$I.attr('data-checked', "1");
//						$I.html("&#xe67d;");
//						$I.css({"color":"#1aac19"});
//						value[index] = checkedValue;
//					} else { // 删除
//						$I.attr('data-checked', "0");
//						$I.html("&#xe684;");
//						$I.css({"color":"#cbcbcb"});
//						delete value[index];
//					}
//					// arr = Object.values(value);
//					console.log(Object.values(value));
//					console.log(Object);
//					console.log(value);
//					if(checkedValue == "无并发症"){
//						// $I.parent().siblings()
//						$I.attr('data-checked', "1");
//						$I.html("&#xe67d;");
//						$I.css({"color":"#1aac19"});
//						obj[index] = checkedValue;
//						$I.parent().siblings().find('i').attr('data-checked', "0").html("&#xe684;").css({"color":"#cbcbcb"});
//						delete obj[index];
//					}
//				})
	$(".click").click(function(){
		console.log(dataarr);
//		str = JSON.stringify(arr);
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoChronicDiseases/save",
			async: true,
//			dataType: "JSON",
			data: {
				"fkPatinfoId": eleId,
				"type": $(".Title").text(),
				"subType": $(".subType").val(),
				"situationArray": dataarr
			},
			traditional: true, 
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);				
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
})