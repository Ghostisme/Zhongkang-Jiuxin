$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn", "../bloodPressure/bloodPressure.html");
	//保存数据
	var eleId = localStorage.getItem("id");
	var diagnosisId = localStorage.getItem("diagnosisid");
	$(".click").click(function(){
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoBloodPressure/save",
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
