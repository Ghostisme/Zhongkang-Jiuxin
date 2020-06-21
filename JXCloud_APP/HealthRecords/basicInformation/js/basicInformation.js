$(document).ready(function(){
	// 页面跳转
	// pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	// 调用IOS上传头像接口
	// $(".chooseImage").click(function(){
	// 	uploadUserIcon(eleId);
	// })
	// 头像上传
	var eleId = sessionStorage.getItem("id");
	$(".chooseImg").on("change",function(){
//		console.log($(this).val());
		var formData = new FormData();
		var sendLoading = layer.load(1);
//		var fileElementId=$("#files").attr("id");
//		console.log(fileElementId);
		//formData.append('file', $(this).val());
		formData.append('file', document.getElementsByClassName("chooseImg")[0].files[0]);
		formData.append("id",eleId);
		console.log(formData.get('file'));		
		$.ajax({
			type:"post",
			// url:"http://192.31.10.62:8001/oa/patinfo/uploadHeadImage",
			url: config + "/oa/patinfo/uploadHeadImage",
			cache: false, //上传文件不需要缓存
			async: true,
			data: formData,
			dataType:'JSON', //接收值的格式
			enctype:'multipart/form-data',
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success: function(data){
				console.log(data);
				if(data.status == 1){
					layer.msg(data.message);
					layer.close(sendLoading);
					alert(data.resultMap.headImage);
					$(".essential")
						.find("p")
							.eq(0)
								.find("img")
									.attr("src", data.resultMap.headImage);
				}else{
					layer.msg(data.message);
				}
			},
			error: function(data){
				console.log(data);
				if(data.status == 2){
					layer.msg(data.message);
				}
			}
		});
	})
	//性别选择
//	$(".essential")
//		.find("p")
//			.find("span")
//				.find("i")
//					.click(function(){
//						$(this).html("&#xe677;").siblings().html("&#xe678;");
//						$(this).addClass("active").siblings().removeClass("active");
//					})
	$(".essential")
		.find("p")
			.eq(2)
				.find("span")
					.find("i")
						.click(function(){
							var status = $(this).attr("data-num");
							if (status == 1) {
								$(this).html("&#xe677;").css({"color": "#2292FE"});
//								$(this).eq(1).html("&#xe678;").css({"color": "#000"});
								$(".essential")
									.find("p")
										.eq(2)
											.find("span")
												.find("i")
													.eq(1)
														.html("&#xe678;")
															.css({"color": "#000"});
								$(".sex").val("男");	
							} else{
								$(this).html("&#xe677;").css({"color": "#2292FE"});
//								$(this).eq(0).html("&#xe678;").css({"color": "#000"});
//								$(this).eq(0).html("&#xe678;").css({"color": "#000"});
								$(".essential")
									.find("p")
										.eq(2)
											.find("span")
												.find("i")
													.eq(0)
														.html("&#xe678;")
															.css({"color": "#000"});
								$(".sex").val("女");	
							}
						})
	//数据请求极渲染
	// var oldMobile;
	// var sexValue;
//	console.log(eleId);
	$.ajax({
		type:"get",
		url: config + "/oa/patinfo/getByParm",
		async:true,
		data: {
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var data = data.resultMap.patinfo;
			$("#fkUserId").val(data.fkUserId);
			//基本信息头像
			if (data.headImage == null) {
				data.headImage = "../img/user.png";
			}else{
				data.headImage = data.headImage;
			}
			$(".essential")
				.find("p")
					.eq(0)
						.find("img")
							.attr('src', data.headImage);
			//基本信息姓名				
			$(".essential")
				.find("p")
					.eq(1)
						.find("span")
							.eq(1)
								// .text(data.name);
								.find("input")
									.val(data.name);
			//基本信息性别	
			sexValue = data.sex;
			switch (data.sex){
				case "男":
					$(".essential")
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.find("i")
											.eq(0)
												.html("&#xe677;")
													.css({"color": "#2292FE"});
					$(".essential")
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.find("i")
											.eq(1)
												.html("&#xe678;")
													.css({"color": "#000"});
					break;
				case "女":	
					$(".essential")
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.find("i")
											.eq(1)
												.html("&#xe677;")
													.css({"color": "#2292FE"});
					$(".essential")
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.find("i")
											.eq(0)
												.html("&#xe678;")
													.css({"color": "#000"});
					
					break;							
				default:
					break;
			}
			//基本信息年龄
				//获取当前时间
//			var oDate = new Date().getFullYear();
//			var birthdayDate = new Date(data.birthday),
//				//计算生日年份
//				birthdayYear = birthdayDate.getFullYear(),
//				//计算年龄
//				birthdayTime = oDate - birthdayYear;
			$(".essential")
				.find("p")
					.eq(3)
						.find("span")
							.eq(1)
								.find("input")
									.val(data.age);	
			//基础信息身份证号	
			if (data.idCode == null) {
				data.idCode = "无";
			}
			$(".essential")
				.find("p")
					.eq(4)
						.find("span")
							.eq(1)
								.find("input")
									.val(data.idCode);	
			//基础信息手机号
			
			if (data.mobile == null || data.mobile == 0) {
				data.mobile = "0";
				oldMobile = '';
			}else{
				oldMobile = data.mobile;
			}
			if (data.phone == null) {
				data.phone = "0";
			}
			$(".essential")
				.find("p")
					.eq(5)
						.find("span")
							.eq(1)
								.find("input")
									.val(data.mobile);
			
			//基础信息地址
			if (data.address == null) {
				data.address = "无"
			}
			$(".essential")
				.find("p")
					.eq(6)
						.find("span")
							.eq(1)
								.find("input")
									.val(data.address);
		},
		error: function(data){
			console.log(data);
		}
	});
	//保存基本信息
//	console.log(sexValue)
// 	$(".click").click(function(){
// //		if(old)
// 		var sex = $(".sex").val();
// //		console.log($(".sex").val());
// //		console.log(sexValue);
// 		if (sex == null || sex == "") {
// 			sex = sexValue;
// 		}
// //		console.log(sex);
// 		$.ajax({
// 			type:"get",
// 			url:"http://192.31.10.62:8001/oa/patinfo/update",
// 			async:true,
// 			data:{
// 				"id": eleId,
// 				"name": $(".username").val(),
// 				"sex": sex,
// 				"age": $(".age").val(),
// 				"idCode": $(".IDcard").val(),
// 				"oldMobile": oldMobile,
// 				"mobile": $(".mobile").val(),
// 				"address": $(".address").val()
// 			},
// 			success: function(data){
// 				console.log(data);
// 				if(data.status == 1){
// 					alert(data.message);
// 					$(location).prop('href', "../healthrecord/healthrecord.html");
// 				}else{
// 					alert(data.message);
// 				}
// 					
// 			},
// 			error: function(data){
// 				console.log(data);
// 				if(data.status == 2){
// 					alert(data.message);
// 				}
// 			}
// 		});
// 	})
})
