$(document).ready(function(){
	var eleId = sessionStorage.getItem("id");
	var diagnosisId = sessionStorage.getItem("disid");
	// var diagnosisId = sessionStorage.getItem("diagnosisId");
	var dataId = sessionStorage.getItem("dataId");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoBmi/get",
		async: true,
		data: {
			"id": dataId,
			"fkDisId": diagnosisId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfoBmi;
			$(".height").text(dataList.stature);
			$(".weight").text(dataList.weight);			
		},
		error: function(data){
			console.log(data);
		}
	});
	// var eleId = sessionStorage.getItem("id");
	// var eleDisid = sessionStorage.getItem("disid");
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var eleDisid = sessionStorage.getItem("diagnosisId");
	// console.log(eleId);
	// console.log(eleDisid);
	//保存数据
	// $(".click").click(function(){
	// 	$.ajax({
	// 		type:"get",
	// 		url: config + "/oa/patinfoBmi/save",
	// 		async:true,
	// 		data: {
	// 			"fkPatinfoId": eleId,
	// 			"fkDisId": eleDisid,
	// 			"stature": $(".height").val(),
	// 			"weight": $(".weight").val()
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
