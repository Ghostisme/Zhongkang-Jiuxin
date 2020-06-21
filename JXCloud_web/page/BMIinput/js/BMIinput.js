$(document).ready(function(){
	var eleId = localStorage.getItem("id");
	var eleDisid = localStorage.getItem("disid");
	console.log(eleId);
	console.log(eleDisid);
	//保存数据
	$(".click").click(function(){
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfoBmi/save",
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
