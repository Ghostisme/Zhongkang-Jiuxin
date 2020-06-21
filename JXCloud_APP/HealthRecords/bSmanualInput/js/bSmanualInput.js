$(document).ready(function(){
	var maxstrlen = 140;
	function inputBind(eleid,id){
		var val = $('#' + eleid).val();
		var overNum = maxstrlen - val.length;
		if (overNum == 0) {
			$('#' + id).css({"color":"red"});
			layer.msg("您输入的字体已上限");
		} else{
			$('#' + id).css({"color":"#666"});
		}
		$('#' + id).text(overNum);				
	}
	//页面跳转
	// pageGo(".gobackBtn", "../bloodSugar/bloodSugar.html");
	// var eleId = sessionStorage.getItem("id");
	// var diagnosisId = sessionStorage.getItem("disid");
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var diagnosisId = sessionStorage.getItem("diagnosisId");
	// 交互
	var diseaseType = ['餐前','餐后'];
	var mobileSelect1 = new MobileSelect({
	    trigger: '.trigger1', 
	    title: '请选择',  
	    wheels: [
	                {data: diseaseType}
	            ],
	    position:[1] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
	var diseaseArr = ['餐前','餐后'];
	var mobileSelect2 = new MobileSelect({
	    trigger: '.trigger2', 
	    title: '请选择',  
	    wheels: [
	                {data: diseaseArr}
	            ],
	    position:[1] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
	// var maxstrlen = 140;
	// $("#memoNum").text(maxstrlen);
	// $("#memo").on("keyup",function(){
	// 	len = maxstrlen;
	// 	var str = this.value;
	// 	var myLen = 0;
	// 	var i = 0;
	// 	for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
	// 		if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
	// 			myLen++;
	// 		else
	// 			myLen += 2;
	// 	}
	// 	var overNum = Math.floor((len * 2 - myLen) / 2);
	// 	var wck = document.getElementById("memoNum");
	// 	if (myLen > len * 2) {
	// 		c.value = str.substring(0, i + 1);
	// 	} else {
	// 		wck.innerHTML = overNum;
	// 		if (overNum == 0) {
	// 			$("#memoNum").css({"color": "red"});
	// 			$(this).blur();
	// 			layer.msg("您输入的字体已上限");
	// 		}else{
	// 			$("#memoNum").css({"color": "#666"});
	// 		}
	// 	}		
	// })
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
	$(".click").click(function(){
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoBloodSugar/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": diagnosisId,
				"sugarValue": $(".sugarValue").val(),
				"type": $(".trigger1").text(),
				"memo": $(".remarksBox").find("textarea").val()
			},
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
