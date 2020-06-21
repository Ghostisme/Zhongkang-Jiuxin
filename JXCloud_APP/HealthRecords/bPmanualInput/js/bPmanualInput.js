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
	// pageGo(".gobackBtn", "../bloodPressure/bloodPressure.html");
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
	//保存数据
	var eleId = sessionStorage.getItem("id");
	var diagnosisId = sessionStorage.getItem("disid");
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var diagnosisId = sessionStorage.getItem("diagnosisId");
	$(".click").click(function(){
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoBloodPressure/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": diagnosisId,
				"maxPressure": $(".diastolic").val(),
				"minPressure": $(".shrink").val(),
				"heartRate": $(".heartrate").val(),
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
