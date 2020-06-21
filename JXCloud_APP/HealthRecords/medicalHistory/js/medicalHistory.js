$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	// 限制字体输入交互	
	// function limitNum(showNum, ele){
	// 	var maxstrlen = 140;
	// 	$("#" + showNum).text(maxstrlen);
	// 	$(ele).on("keyup",function(){
	// 		len = maxstrlen;
	// 		var str = this.value;
	// 		var myLen = 0;
	// 		var i = 0;
	// 		for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
	// 			if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
	// 				myLen++;
	// 			else
	// 				myLen += 2;
	// 		}
	// 		var overNum = Math.floor((len * 2 - myLen) / 2);
	// 		var wck = document.getElementById(showNum);
	// 		// var wck = $(showNum);
	// 		if (myLen > len * 2) {
	// 			c.value = str.substring(0, i + 1);
	// 		} else {
	// 			wck.innerHTML = overNum;
	// 			if (overNum == 0) {
	// 				$("#" + 
	// 				showNum).css({"color": "red"});
	// 				$(this).blur();
	// 			}else{
	// 				$("#" + showNum).css({"color": "#666"});
	// 			}
	// 		}		
	// 	})
	// }
	// limitNum("memoNum1", "memo1");// 现病史
	// limitNum("memoNum2", "memo2");// 既往史
	// limitNum("memoNum3", "memo3");// 药物过敏
	// limitNum("memoNum4", "memo4");// 家族史
	
	//数据渲染
//	$(".remarks").find("textarea").attr("disabled", "");
	var eleId = sessionStorage.getItem("id");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfo/getByParm",
		async:true,
		data:{
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var data = data.resultMap.patinfo;
			function dataContent(ele, val){
				if (val == null || val == "") {
					val = "无";
				}
				$(ele)
					.find("textarea")
						.val(val);
			}
			dataContent(".pI-remarks", data.medicalHistory);
			dataContent(".pH-remarks", data.pastHistory);
			dataContent(".dA-remarks", data.allergyHistory);
			dataContent(".fH-remarks", data.familyHistory);
			var maxstrlen1 = 140 - $('.pI-remarks').find("textarea").val().length;
			if (maxstrlen1 <= 0) {
				maxstrlen1 = 0;
				$("#memoNum1").css({"color": "red"});
			}
			$("#memoNum1").text(maxstrlen1);
			var maxstrlen2 = 140 - $('.pH-remarks').find("textarea").val().length;
			if (maxstrlen2 <= 0) {
				maxstrlen2 = 0;
				$("#memoNum2").css({"color": "red"});
			}
			$("#memoNum2").text(maxstrlen2);
			var maxstrlen3 = 140 - $('.dA-remarks').find("textarea").val().length;
			if (maxstrlen3 <= 0) {
				maxstrlen3 = 0;
				$("#memoNum3").css({"color": "red"});
			}
			$("#memoNum3").text(maxstrlen3);
			var maxstrlen4 = 140 - $('.fH-remarks').find("textarea").val().length;
			if (maxstrlen4 <= 0) {
				maxstrlen4 = 0;
				$("#memoNum4").css({"color": "red"});
			}
			$("#memoNum4").text(maxstrlen4);
			
		},
		error: function(data){
			console.log(data);
		}
	});
	// layui.use('layer', function(){
		// var layer = layui.layer;
		// layer.msg('的确很重要');
		// $(".click").click(function(){
		// 	var status = $("textarea[disabled]").attr("disabled");
		// 	if (status == true) {
		// 		$("textarea[disabled]").attr("disabled", false);
		// 		$.ajax({
		// 			type:"get",
		// 			url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
		// 			async:true,
		// 			data:{
		// 				"id": eleId,
		// 				"medicalHistory": $('.pI-remarks').find("textarea").val(),
		// 				"pastHistory": $(".pH-remarks").find("textarea").val(),
		// 				"allergyHistory": $(".dA-remarks").find("textarea").val(),
		// 				"familyHistory": $(".fH-remarks").find("textarea").val()
		// 			},
		// 			success: function(data){
		// 				console.log(data);
		// 				if(data.status == 1){
		// 					layer.msg(data.message);
		// 					$(location).prop('href', "../healthrecord/healthrecord.html");
		// 				}else{
		// 					layer.msg(data.message);
		// 				}
		// 					
		// 			},
		// 			error: function(data){
		// 				console.log(data);
		// 				if(data.status == 2){
		// 					layer.msg(data.message);
		// 				}
		// 			}
		// 		});
		// 	} else{
		// 		$("textarea[disabled]").attr("disabled", true);
		// 	}
		// 			$.ajax({
		// 				type:"get",
		// 				url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
		// 				async:true,
		// 				data:{
		// 					"id": eleId,
		// 					"medicalHistory": $('.pI-remarks').find("textarea").val(),
		// 					"pastHistory": $(".pH-remarks").find("textarea").val(),
		// 					"allergyHistory": $(".dA-remarks").find("textarea").val(),
		// 					"familyHistory": $(".fH-remarks").find("textarea").val()
		// 				},
		// 				success: function(data){
		// 					console.log(data);
		// 					if(data.status == 1){
		// 						layer.msg(data.message);
		// 						// $(location).prop('href', "../healthrecord/healthrecord.html");
		// 					}else{
		// 						layer.msg(data.message);
		// 					}
		// 						
		// 				},
		// 				error: function(data){
		// 					console.log(data);
		// 					if(data.status == 2){
		// 						layer.msg(data.message);
		// 					}
		// 				}
		// 			});
		// })
	// })	
})
