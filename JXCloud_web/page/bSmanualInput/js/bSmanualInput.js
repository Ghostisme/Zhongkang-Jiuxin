$(document).ready(function(){
	//页面跳转
	//pageGo(".gobackBtn", "../bloodSugar/bloodSugar.html");
	var eleId = localStorage.getItem("id");
	var diagnosisId = localStorage.getItem("diagnosisid");
	//交互
	var diseaseType = ['餐前','餐后'];
	var mobileSelect1 = new MobileSelect({
	    trigger: '.trigger1', 
	    title: '',  
	    wheels: [
	                {data: diseaseType}
	            ],
	    position:[1] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
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
//			url:"http://192.31.10.62:8001/oa/patinfoBloodSugar/save",
			url: config + "/oa/patinfoBloodSugar/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": diagnosisId,
				"sugarValue": $(".sugarValue").val(),
				"type": "餐前",
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
