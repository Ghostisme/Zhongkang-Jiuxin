$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	//单选框交互
	function choose(ele){
		$(ele)
			.find("span")
				.click(function(){
					var status = $(this).attr("data-num");
					if (status == 1) {
						$(this).find("i").html("&#xe677;").css({"color": "#2292FE"});
						$(ele).find("span").eq(1).find("i").html("&#xe678;").css({"color": "#000"});
						$(ele).val(1);
					} else{
						$(this).find("i").html("&#xe677;").css({"color": "#2292FE"});
						$(ele).find("span").eq(0).find("i").html("&#xe678;").css({"color": "#000"});
						$(ele).val(0);
					}		
//					console.log($(ele).val());
				})
	}
	choose(".smookContent");
	choose(".drinkContent");
	choose(".sleepContent");
	//数据渲染
	var eleId = localStorage.getItem("id");
	console.log(eleId);
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
			var dataList = data.resultMap.patinfo;
			dataContent(dataList.isSmoke, ".smookContent");
			dataContent(dataList.isDrink, ".drinkContent");
			dataContent(dataList.isInsomnia, ".sleepContent");
			function dataContent(val, ele){
				//基本信息性别						
				switch (val){
					case 0:
						$(ele)
							.find("span")
								.eq(1)
									.find("i")
										.html("&#xe677;")
											.css({"color": "#2292FE"});
						$(ele)
							.find("span")
								.eq(0)
									.find("i")
										.html("&#xe678;")
											.css({"color": "#000"});
						break;
					case null:	
						$(ele)
							.find("span")
								.eq(1)
									.find("i")
										.html("&#xe677;")
											.css({"color": "#2292FE"});
						$(ele)
							.find("span")
								.eq(0)
									.find("i")
										.html("&#xe678;")
											.css({"color": "#000"});							
						break;	
					case 1:
						$(ele)
							.find("span")
								.eq(0)
									.find("i")
										.html("&#xe677;")
											.css({"color": "#2292FE"});
						$(ele)
							.find("span")
								.eq(1)
									.find("i")
										.html("&#xe678;")
											.css({"color": "#000"});
						break;
					default:
						$(ele)
							.find("span")
								.eq(0)
									.find("i")
										.html("&#xe677;")
											.css({"color": "#2292FE"});
						$(ele)
							.find("span")
								.eq(1)
									.find("i")
										.html("&#xe678;")
											.css({"color": "#000"});
						break;
				}				
			}
			
		},
		error: function(data){
			console.log(data);
		}
	});
	
	//生活习惯保存
//	$(".click").click(function(){
//		$.ajax({
//			type:"get",
////			url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
//			url: config + "/oa/patinfo/updateOther",
//			async:true,
//			data: {
//				"id": eleId,
//				"isSmoke": $(".smookContent").val(),
//				"isDrink": $(".drinkContent").val(),
//				"isInsomnia": $(".sleepContent").val()
//			},
//			success: function(data){
//				console.log(data);
//				if(data.status == 1){
//					alert(data.message);
//					$(location).prop('href', "../healthrecord/healthrecord.html");
//				}else{
//					alert(data.message);
//				}
//					
//			},
//			error: function(data){
//				console.log(data);
//				if(data.status == 2){
//					alert(data.message);
//				}
//			}
//		});
//	})
	$("#editSave").click(function(){
		var eleId = localStorage.getItem("id");			
//			console.log(oldMobile);
		$.ajax({
			type:"get",
//			url:"http://192.31.10.62:8001/oa/patinfo/updateOther",
			url: config + "/oa/patinfo/updateOther",
			async:true,
			data: {
				"id": eleId,
				"isSmoke": $(".smookContent").val(),
				"isDrink": $(".drinkContent").val(),
				"isInsomnia": $(".sleepContent").val()
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
					$(location).prop('href', "../habitscustoms/habitscustoms.html");
					
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
