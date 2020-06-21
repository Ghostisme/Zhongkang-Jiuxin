$(document).ready(function(){
	// 获取患者ID
	var eleId = sessionStorage.getItem("id");
	// 获取就诊ID
	var diagnosisId = sessionStorage.getItem("disid");
	// 获取药品列表当前项的数据ID
	var dataId = sessionStorage.getItem("dataId");
	// 定义删除变量
	var isDel;
	// 数据请求
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoPrescribe/get",
		async: false,
		data: {
			"id": dataId
		},
		success: function(data){
			console.log(data);
			// list赋给变量
			var dataList = data.resultMap.patinfoPrescribe;
			// 赋值
			$(".drugName").text(dataList.drugName);
			$(".chemistryName").text(dataList.chemistryName);
			$(".firmName").text(dataList.firmName);
			$(".dosage").text(dataList.dosage);
			// 判断空值
			if (dataList.memo == "") {
				$(".remarksBox").find("textarea").val("暂无");
			}else{
				$(".remarksBox").find("textarea").val(dataList.memo);
			}
			// 删除状态
			isDel = dataList.isDeleted;
		},
		error: function(data){
			console.log(data);
		}
	});
	
	// console.log(isDel);
	// return isDel;
	//页面跳转
	
	//数据保存
	// var eleId = sessionStorage.getItem("id");
	// var eleDisid = sessionStorage.getItem("disid");
	// console.log(eleId);
	// console.log(eleDisid);
	// $(".click").click(function(){
	// 	$.ajax({
	// 		type:"get",
	// 		url:"http://192.31.10.62:8001/oa/patinfoPrescribe/save",
	// 		async:true,
	// 		data: {
	// 			"fkPatinfoId": eleId,
	// 			"fkDisId": eleDisid,
	// 			"drugName": $(".drugName").val(),
	// 			"chemistryName": $(".chemistryName").val(),
	// 			"firmName": $(".firmName").val(),
	// 			"dosage": $(".dosage").val(),
	// 			"memo": $(".memo").val()
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
	// 			console.log("11" + data);
	// 			if(data.status == 2){
	// 				alert(data.message);
	// 			}
	// 		}
	// 	});
	// })
})
