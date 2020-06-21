$(document).ready(function(){
	var eleId = sessionStorage.getItem("id");
	var diagnosisId = sessionStorage.getItem("disid");
	var dataId = sessionStorage.getItem("dataId");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoBloodSugar/get",
		async: true,
		data: {
			"id": dataId,
			"fkDisId": diagnosisId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfoBloodSugar;
			$(".sugarValue").text(dataList.sugarValue);
			$(".choose").text(dataList.type);
			if (dataList.memo == "") {
				$(".remarksBox").find("textarea").val("无");
			}else{
				$(".remarksBox").find("textarea").val(dataList.memo);
			}
		},
		error: function(data){
			console.log(data);
		}
	});
	//页面跳转
	// pageGo(".gobackBtn", "../bloodSugar/bloodSugar.html");
	// var eleId = sessionStorage.getItem("id");
	// var diagnosisId = sessionStorage.getItem("disid");
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var diagnosisId = sessionStorage.getItem("diagnosisId");
	// 交互
	// var diseaseType = ['餐前','餐后'];
	// var mobileSelect1 = new MobileSelect({
	//     trigger: '.trigger1', 
	//     title: '请选择',  
	//     wheels: [
	//                 {data: diseaseType}
	//             ],
	//     position:[1] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	// });
	// var diseaseArr = ['餐前','餐后'];
	// var mobileSelect2 = new MobileSelect({
	//     trigger: '.trigger2', 
	//     title: '请选择',  
	//     wheels: [
	//                 {data: diseaseArr}
	//             ],
	//     position:[1] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	// });
//	//数据渲染
//	$.ajax({
//		type:"get",
//		url:"http://192.31.10.62:8001/oa/patinfoBloodSugar/toSave",
//		async:true,
//		data:{
//			"pid": eleId
//		},
//		success: function(data){
//			console.log(data);
//		},
//		error: function(data){
//			console.log(data);
//		}
//	});
	//保存数据
	// $(".click").click(function(){
	// 	$.ajax({
	// 		type:"get",
	// 		url: config + "/oa/patinfoBloodSugar/save",
	// 		async:true,
	// 		data: {
	// 			"fkPatinfoId": eleId,
	// 			"fkDisId": diagnosisId,
	// 			"sugarValue": $(".sugarValue").val(),
	// 			"type": $(".trigger1").text(),
	// 			"memo": $(".remarksBox").find("textarea").val()
	// 		},
	// 		success: function(data){
	// 			console.log(data);
	// 			if(data.status == 1){
	// 				alert(data.message);				
	// 			}else{
	// 				alert(data.message);
	// 			}					
	// 		},
	// 		error: function(data){
	// 			console.log(data);
	// 			if(data.status == 2){
	// 				alert(data.message);
	// 			}
	// 		}
	// 	});
	// })
})
