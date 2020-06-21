$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	//数据渲染
	var eleId = localStorage.getItem("id");
	// var eleId = localStorage.getItem("id");
	var eleDisid = localStorage.getItem("disid");
	// console.log(eleId,"sad23");
	// console.log(eleDisid,"请问23");
	if (eleDisid == "" || eleDisid == null) {
		$("#btnBox").hide();
	} else{
		$("#btnBox").show();
	}
	$.ajax({
		type:"get",
//		url:"http://192.31.10.62:8001/oa/patinfoPrescribe/list",
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
					$(".tableContent").append("<div></div>");
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
																	.text(ele.memo);
						
						//药品文字数据插入	
						$(".tableContent").append(oWrapper.append(cloneDom));
					})
				}
				var dataDrugImgList = ele.drugImgList;
				if (dataDrugImgList.length == 0) {
					$(".imglist").append('<img src="../../img/user.png" alt="这是一个图片" title="这是一个图片">');
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
				oCloneDom.find(".tplcontent").append($(".tableContent"));
				oCloneDom.find(".tplcontent").append($(".imglist"));
				//数据插入											
				wrapper.append(oCloneDom);	
			})
		},
		error: function(data){
			console.log(data);
		}
	});
	
	$("#sumbtn").click(function(){
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoPrescribe/save",
			url: config + "/oa/patinfoPrescribe/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid,
				"drugName": $(".drugName").val(),
				"chemistryName": $(".chemistryName").val(),
				"firmName": $(".firmName").val(),
				"dosage": $(".dosage").val(),
				"memo": $(".memo").val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);	
					$(location).prop('href', "../prescriptionDrugs/prescriptionDrugs.html");
					$('#addrecipelModal').modal('hide');
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
	
	$(".chooseImg").on("change",function(){
//		console.log($(this).val());
		var formData = new FormData();
		
//		var fileElementId=$("#files").attr("id");
//		console.log(fileElementId);
		//formData.append('file', $(this).val());
		formData.append('file', document.getElementsByClassName("chooseImg")[0].files[0]);
		formData.append("fkPatinfoId", eleId);
		formData.append("fkDisId", eleDisid);
		console.log(formData.get('file'));
		$.ajax({
			type:"post",
//			url:"http://192.31.10.62:8001/oa/patinfo/uploadHeadImage",
			url: config + "/oa/patinfoPrescribe/uploadPrescribe",
			cache: false, //上传文件不需要缓存
			async:true,
			data: formData,
			dataType:'JSON', //接收值的格式
			enctype:'multipart/form-data',
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
//					$(".headImg").find("img").attr("src", data.url);
//					$(".essential")
//						.find("p")
//							.eq(0)
//								.find("img")
//									.attr("src", data.url);
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
