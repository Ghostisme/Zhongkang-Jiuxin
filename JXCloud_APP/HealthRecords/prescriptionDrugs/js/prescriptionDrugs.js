$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	//数据渲染
	var eleId = sessionStorage.getItem("id");
	console.log(eleId);
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoPrescribe/list",
		async:true,
		data: {
			"fkPatinfoId":  eleId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfoDiagnosisList;
			//获取dom插入盒子
			var wrapper = $(".wrapper");
			
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
//				console.log(oCloneDom);
//				console.log(ele);
				//获取当前时间
				var oDate = new Date().getFullYear();
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
			    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin);
				//数据克隆
					//时间
				oCloneDom
					.find(".title")						
						.find("span")
							.eq(1)
								.text(diagnosisTime);						
				
				//判断药品列表和图片列表
				var oWrapper = $(".oWrapper");
				var dataDrugList = ele.drugList;				
				if (dataDrugList.length == 0) {
					$(".tableContent").append("<thead></thead>").css({"display":"none"});					
				} else{
					dataDrugList.forEach(function(ele, index){
						var cloneDom = $(".tpl1").clone().removeClass("tpl1");
//						$(".tpl1").css({"display": "none"});
						cloneDom
							.find("td")
								.eq(0)
									.text(ele.drugName)
										.next()
											.text(ele.chemistryName)
												.next()
													.text(ele.firmName)
														.next()
															.text(ele.dosage)
																.next()
																	.text(ele.memo)
																		.next()
																			.text(ele.id);
						
						//药品文字数据插入	
						$(".tableContent").append(oWrapper.append(cloneDom));
					})
				}
				var dataDrugImgList = ele.drugImgList;
				if (dataDrugImgList.length == 0) {
					$(".imglist").append('<img class="imgtpl" src="../img/user.png" alt="这是一个图片" title="这是一个图片">');
					// $(".imglist").append("")
				} else{
					dataDrugImgList.forEach(function(ele, index){
//						console.log(ele);
						var imgCloneDom = $(".imgtpl").clone().removeClass("imgtpl");
//						var imgCloneDom = $("<img src='" + ele.imgUrl + "' alt='这是一个图片' title='这是一个图片' />");
//						$(".imgtpl").css({"display": "none"});						
						imgCloneDom.attr("src", ele.imgUrl);
						//药品图片数据插入
						$(".imglist").append(imgCloneDom);
					})
					
				}
				if (dataDrugList.length == 0 && dataDrugImgList.length == 0) {
					oCloneDom
						.find(".title")						
							.find("span")
								.eq(0)
									.text("")
										.next()
											.text("暂无数据");
				}
				
				oCloneDom.find(".tplcontent").append($(".tableContent"));
//				oCloneDom.find(".tplcontent").append($(".imglist"));
				//数据插入											
				wrapper.append(oCloneDom);	
			})
			// 点击当前行
			var dataContent = $(".oWrapper").find("tr");
			$(dataContent).click(function(){
				var dataId = $(this).find("td").eq(5).text();
				sessionStorage.setItem("dataId", dataId);
				$(location).prop('href', "../addrecipel-del/addrecipel-del.html");
			})
		},
		error: function(data){
			console.log(data);
		}
	});
})
