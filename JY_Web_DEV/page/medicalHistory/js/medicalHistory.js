$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	//数据渲染
//	$(".remarks").find("textarea").attr("disabled", "");
	console.log("--");
	var eleId = localStorage.getItem("id");
	$.ajax({
		type:"get",
//		url:"http://192.31.10.62:8001/oa/patinfo/getByParm",
		url: config + "/oa/patinfo/getByParm",
		async:true,
		data:{
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var data = data.resultMap.patinfo;
			function dataContent(ele, val){
				if (val == null) {
					val = "暂无";
				}
				$(ele)
					.find("textarea")
						.val(val);
			}
			dataContent(".pI-remarks", data.medicalHistory);
			dataContent(".pH-remarks", data.pastHistory);
			dataContent(".dA-remarks", data.allergyHistory);
			dataContent(".fH-remarks", data.familyHistory);
		},
		error: function(data){
			console.log(data);
		}
	});
//	$(".click").click(function(){
////		function sendVal(ele, val){
//			$.ajax({
//				type:"get",
////				url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
//				url: config + "/oa/patinfo/updateOther",
//				async:true,
//				data:{
//					"id": eleId,
//					"medicalHistory": $('.pI-remarks').find("textarea").val(),
//					"pastHistory": $(".pH-remarks").find("textarea").val(),
//					"allergyHistory": $(".dA-remarks").find("textarea").val(),
//					"familyHistory": $(".fH-remarks").find("textarea").val()
//				},
//				success: function(data){
//					console.log(data);
//					if(data.status == 1){
//						alert(data.message);
//						$(location).prop('href', "../healthrecord/healthrecord.html");
//					}else{
//						alert(data.message);
//					}
//						
//				},
//				error: function(data){
//					console.log(data);
//					if(data.status == 2){
//						alert(data.message);
//					}
//				}
//			});
////		}
////		sendVal()
//	})
	$("#editSave").click(function(){
		$(this).text("保存");
		$(this).removeClass("btn-info");
		$(this).addClass("btn-success");
		$("textarea[disabled]").removeAttr("disabled");		
		
		$(this).click(function(){
			var eleId = localStorage.getItem("id");			
//			console.log(oldMobile);
			$.ajax({
				type:"get",
//				url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
				url: config + "/oa/patinfo/updateOther",
				async:true,
				data:{
					"id": eleId,
					"medicalHistory": $('.pI-remarks').find("textarea").val(),
					"pastHistory": $(".pH-remarks").find("textarea").val(),
					"allergyHistory": $(".dA-remarks").find("textarea").val(),
					"familyHistory": $(".fH-remarks").find("textarea").val()
				},
				success: function(data){
					console.log(data);
					if(data.status == 1){
						alert(data.message);
						$(location).prop('href', "../medicalHistory/medicalHistory.html");
						$("textarea").attr("disabled","disabled");
						$(this).text("编辑");
						$(this).removeClass("btn-success");
						$(this).addClass("btn-info");
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
})
