$(document).ready(function(){
	
	//按钮点击交互
	$(".btnBox").find("a").click(function(){
		$(this).addClass("Active").siblings().removeClass("Active");		
	});
	$(".btnInput").click(function(){
//		console.log($(".Active").text());
		switch ($(".Active").text()){
			case "血压":
				$(this).attr("data-target", "#pressureModal");
				break;
			case "血糖":
				$(this).attr("data-target", "#sugarModal");
				break;
			case "BMI":
				$(this).attr("data-target", "#BMIModal");
				break;
			default:
				break;
		}
	})
	var eleId = localStorage.getItem("id");
//	var diagnosisId = localStorage.getItem("diagnosisid");
	var disId = localStorage.getItem("disid");
	var sessionId = sessionStorage.getItem("sessionId");
	$("#pressureBtn").click(function(){	
		var pressureIfram = document.getElementById('pressure').contentWindow;
		var diastolicVal = pressureIfram.$(".diastolic");
		var shrinkVal = pressureIfram.$(".shrink");
		var heartrateVal = pressureIfram.$(".heartrate");
		var memoVal = pressureIfram.$(".remarksBox");
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoBloodPressure/save",
			url: config + "/oa/patinfoBloodPressure/save",
			async:true,
			data: {
				"sessionId": sessionId,
				"fkPatinfoId": eleId,
				"fkDisId": disId,
				"maxPressure": diastolicVal.val(),
				"minPressure": shrinkVal.val(),
				"heartRate": heartrateVal.val(),
				"memo": memoVal.find("textarea").val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);	
					$(location).prop('href', "../healthData/healthData.html");
					$('#pressureModal').modal('hide');
					// $(".tabBtn1").addClass("Active").siblings().removeClass("Active");
					// $("#tab-1").addClass("active").siblings().removeClass("active");
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
	$("#sugarBtn").click(function(){
		var sugarIfram = document.getElementById('sugar').contentWindow;
		var sugarVal = sugarIfram.$(".sugarValue");
		var triggerVal = sugarIfram.$(".trigger1");
		var memoVal = sugarIfram.$(".remarksBox");
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoBloodSugar/save",
			url: config + "/oa/patinfoBloodSugar/save",
			async:true,
			data: {
				"sessionId": sessionId,
				"fkPatinfoId": eleId,
				"fkDisId": disId,
				"sugarValue": sugarVal.val(),
				"type": triggerVal.find("select").val(),
				"memo": memoVal.find("textarea").val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
					$(location).prop('href', "../healthData/healthData.html");
					$('#sugarModal').modal('hide');
					// $(".tabBtn2").addClass("Active").siblings().removeClass("Active");
					// $("#tab-2").addClass("active").siblings().removeClass("active");
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
	$("#BMIbtn").click(function(){
		var BMIIfram = document.getElementById('BMI').contentWindow;
		var heightVal = BMIIfram.$(".height");
		var weightVal = BMIIfram.$(".weight");
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoBmi/save",
			url: config + "/oa/patinfoBmi/save",
			async:true,
			data: {
				"sessionId": sessionId,
				"fkPatinfoId": eleId,
				"fkDisId": disId,
				"stature": heightVal.val(),
				"weight": weightVal.val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);	
					$(location).prop('href', "../healthData/healthData.html");
					$('#BMIModal').modal('hide');
					// $(".tabBtn3").addClass("Active").siblings().removeClass("Active");
					// $("#tab-3").addClass("active").siblings().removeClass("active");
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
