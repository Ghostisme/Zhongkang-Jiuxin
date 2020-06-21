$(document).ready(function(){
	var eleId = localStorage.getItem("id");
	// var eleId = localStorage.getItem("id");
	var eleDisid = localStorage.getItem("disid");
	var sessionId = sessionStorage.getItem("sessionId");
	var isDel;
	// 删除交互
	$(document).on("click",".delbtn",function(){
		var dataId = $(this).parent("td").next().text();
//		alert(dataId)
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoPrescribe/remove",
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
					$(location).prop('href', "../prescriptionDrugs/prescriptionDrugs.html");
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
//	pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	//数据渲染	
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
			"fkPatinfoId":  eleId,
			"fkDisId": eleDisid
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
				var delStatus = ele.isDeleted;				
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
						// 删除状态赋值
						cloneDom
							.find("td")
								.eq(5)
									.find("button")
										.attr("data-del", delStatus);
						// 填充数据id
						cloneDom
							.find("td")
								.eq(6)
									.text(ele.id);
						//删除状态
						isDel = cloneDom.find("td").eq(5).find("button").attr("data-del");
						
						//药品文字数据插入
						$(".tableContent").append(oWrapper.append(cloneDom));
						// 删除按钮交互
						if (isDel == "1") {
							$(".tableclick").find("thead").find("tr").find("th").eq(5).show();
//							$(".tableclick").find("tbody").find("tr").find("td").eq(5).show();
							$(".delbtn").parent().show();
							$(".delbtn").parent().css({
								"display":"block"
							})
							$(".delbtn").show();
						} else{
//							console.log($(".delbtn").parent());
							$(".tableclick").find("thead").find("tr").find("th").eq(5).hide();
//							$(".tableclick").find("tbody").find("tr").find("td").eq(5).hide();
//							$(".tableclick").find("thead").find("tr").find("th").eq(5).show();
							$(".delbtn").parent().hide();
							$(".delbtn").parent().css({
								"display":"none"
							})
//							$(".delbtn").parent().show();
							$(".delbtn").hide();
						}
						cloneDom.find("td").eq(4).hover(function(){
							$(this).attr("title",ele.memo);
						});
					})
				}
				var dataDrugImgList = ele.drugImgList;
				if (dataDrugImgList.length == 0) {
					// $(".imglist").append('<img src="../../img/user.png" alt="这是一个图片" title="这是一个图片">');
					$(".imglist").append('暂无数据');
				} else{
					dataDrugImgList.forEach(function(ele, index){
//						console.log(ele);
						var imgCloneDom = $(".imgtpl1").clone().removeClass("imgtpl1");
//						var imgCloneDom = $("<img src='" + ele.imgUrl + "' alt='这是一个图片' title='这是一个图片' />");
//						$(".imgtpl").css({"display": "none"});						
						imgCloneDom.find("img").attr("src", ele.imgUrl);
						imgCloneDom.find("img").attr("data-id", ele.id);
						imgCloneDom.find("img").attr("data-fkDisId",ele.fkDisId);
//						imgCloneDom.attr("data-id", ele.id);
						//药品图片数据插入
						$(".imglist").append(imgCloneDom);
						imgCloneDom.find("img").click(function(){
							$(".mask").show();
							$(".showImg").attr("src", ele.imgUrl);
							
						});
						if (isDel == "1") {
							imgCloneDom.find(".delImgBtn").show();
						}else{
							imgCloneDom.find(".delImgBtn").hide();
						};
						
					});
				}	
				oCloneDom.find(".tplcontent").append($(".tableContent"));
				oCloneDom.find(".tplcontent").append($(".imglist"));
				//数据插入
				wrapper.append(oCloneDom);
			})
			$(".delImgBtn").click(function(){
				if(window.confirm('你确定要删除么？')){
//					console.log("id----",$(this).next().attr("data-id"))
//					console.log("eleId----",eleId)
//					console.log("fkDisId----",$(this).next().attr("data-fkDisId"))
					$.ajax({
						type:"get",
						url:config+"/oa/patinfoPrescribe/remove",
//						url:"http://192.31.10.62:8001/oa/patinfoPrescribe/remove",
						async:true,
						data:{
							id: $(this).next().attr("data-id"),
							fkPatinfoId: eleId,
							fkDisId: $(this).next().attr("data-fkDisId")
						},
						success: function(data){
							console.log(data);
							if (data.status == "1") {
								alert(data.message);
								history.go(0);
							}else{
								alert(data.message);
							}
						},
						error: function(data){
							console.log(data);
						}
					});
				}
//				else{
//					alert("你还没考虑好");
//				}
			});
		},
		error: function(data){
			console.log(data);
		}
	});
	$(".mask").click(function(e){
		var con = $(".contentBox");   // 设置目标区域
        if (!con.is(e.target) && con.has(e.target).length === 0) {
            $(this).hide();
        };
	});
	
	$(".closeBtn").click(function(){
		$(".mask").hide();
	});
	$("#sumbtn").click(function(){
		var drugName = $(".addrecipel").contents().find(".drugName").val();
		var chemistryName = $(".addrecipel").contents().find(".chemistryName").val();
		var firmName = $(".addrecipel").contents().find(".firmName").val();
		var dosage = $(".addrecipel").contents().find(".dosage").val();
		var memo = $(".addrecipel").contents().find(".memo").val();
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoPrescribe/save",
			url: config + "/oa/patinfoPrescribe/save",
			async:true,
			data: {
				"sessionId": sessionId,
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid,
				"drugName": drugName,
				"chemistryName": chemistryName,
				"firmName": firmName,
				"dosage": dosage,
				"memo": memo
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);	
					$(location).prop('href', "../prescriptionDrugs/prescriptionDrugs.html");
					$('#addrecipelModal').modal('hide');
//					history.go(0);
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
		formData.append("sessionId", sessionId);
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
					$(location).prop('href', "../prescriptionDrugs/prescriptionDrugs.html");
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
