$(document).ready(function(){
	var eleId = sessionStorage.getItem("id");
	var eleDisid = sessionStorage.getItem("disid");
//	var eleId = sessionStorage.getItem("fkPatinfoId");
//	var eleDisid = sessionStorage.getItem("diagnosisId");
	console.log(eleId);
	console.log(eleDisid);
	//保存数据
	$(".click").click(function(){
		$.ajax({
			type:"get",
			url: config + "/oa/patinfoBmi/save",
			async:true,
			data: {
				"fkPatinfoId": eleId,
				"fkDisId": eleDisid,
				"stature": $(".height").val(),
				"weight": $(".weight").val()
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
