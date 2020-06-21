$(document).ready(function(){
	//页面跳转
	
	//数据保存
	var eleId = localStorage.getItem("id");
	var eleDisid = localStorage.getItem("disid");
	console.log(eleId);
	console.log(eleDisid);
	
	$(".click").click(function(){
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoPrescribe/save",
			url: config + "/oa/patinfoPrescribe/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid,
				"drugName": $(".drugName").val(),
				"chemistryName": $(".chemistryName").val(),
				"firmName": $(".firmName").val(),
				"dosage": $(".dosage").val(),
				"memo": $(".memo").val()
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
