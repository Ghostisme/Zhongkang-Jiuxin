$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn", "../bloodPressure/bloodPressure.html");
	//保存数据
	var eleId = sessionStorage.getItem("id");//删除用
	var diagnosisId = sessionStorage.getItem("disid");
	var dataId = sessionStorage.getItem("dataId");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoBloodPressure/get",
		async: true,
		data: {
			"id": dataId,
			"fkDisId": diagnosisId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfoBloodPressure;
			$(".diastolic").text(dataList.maxPressure);
			$(".shrink").text(dataList.minPressure);
			$(".heartrate").text(dataList.heartRate);
			if (dataList.memo == "") {
				$(".remarksBox").find("textarea").val("暂无");
			}else{
				$(".remarksBox").find("textarea").val(dataList.memo);
			}
		},
		error: function(data){
			console.log(data);
		}
	});
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var diagnosisId = sessionStorage.getItem("diagnosisId");
	// $(".click").click(function(){
	// 	$.ajax({
	// 		type:"get",
	// 		url: config + "/oa/patinfoBloodPressure/save",
	// 		async:true,
	// 		data: {
	// 			"fkPatinfoId": eleId,
	// 			"fkDisId": diagnosisId,
	// 			"maxPressure": $(".diastolic").val(),
	// 			"minPressure": $(".shrink").val(),
	// 			"heartRate": $(".heartrate").val(),
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
