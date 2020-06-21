$(document).ready(function(){
	//页面跳转
	// pageGo(".closebtn", "../patient/patient.html");//关闭按钮->患者管理页
	// pageGo(".sumbitbtn", "../patient/patient.html");//确定按钮->患者管理页
	$(".phone").blur(function(){
		if ($(this).val() != null && $(this).val() != "") {
			$.ajax({
				type: "get",
				url:  config + "/oa/patinfo/getByParm",
				async: true,
				dataType: "JSON",
				contentType: "application/json; charset=utf-8",//传到后台的数据格式
				data: {
					"mobile": $(this).val()
				},
				success: function(data){
					console.log(data);
					var dataList = data.resultMap.patinfo;
					if (dataList.mobile != null) {
						layer.msg("该手机号已存在,请更换手机号后完善信息!");
						$(this).focus();
//						if (dataList.headImage != null) {
//							$(".essential").find("img").attr("src", dataList.headImage);
//						}
//						$('.username').val(dataList.name);

//						if (dataList.sex == "女") {
//							$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(1).html("&#xe677;").css({"color":"#2292FE"});
//							$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(0).html("&#xe678;").css({"color":"#000"});
//						}else{
//							$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(0).html("&#xe677;").css({"color":"#2292FE"});
//							$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(1).html("&#xe678;").css({"color":"#000"});
//						}
//						$('.age').val(dataList.age);
//						$('.IDcard').val(dataList.idCode);
//						console.log($('.username').val(dataList.name));
					} 					
				},
				error: function(data){
					console.log(data);
				}
			})
		}
	})
	$(".IDcard").blur(function(){
		if ($(this).val() != null) {
			var identityCard = $(this).val();
			strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
			var birthDate = new Date(strBirthday);
			var nowDateTime = new Date();
			var age = nowDateTime.getFullYear() - birthDate.getFullYear();
			if (parseInt(identityCard.slice(-2, -1)) % 2 == 1) {
				$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(0).html("&#xe677;").css({"color":"#2292FE"});
				$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(1).html("&#xe678;").css({"color":"#000"});
			}
			else {
				$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(1).html("&#xe677;").css({"color":"#2292FE"});
				$(".essential").find("p").eq(2).find("span").eq(1).find("i").eq(0).html("&#xe678;").css({"color":"#000"});
			}
			if (age < 0) {
				age = 0;
				layer.msg("身份证号输入错误,请重新输入!");
				$(".age").val("");
			}else{
				$(".age").val(age);	
			};
		}
	})
	//性别选择	
	$(".essential")
		.find("p")
			.find("span")
				.find("i")
					.click(function(){
						$(".essential")
							.find("p")
								.find("span")
									.find("i").html("&#xe678;");
//						$(this).html("&#xe677;").siblings().html("&#xe678;");
//						console.log($(this));
						$(this).addClass("active").siblings().removeClass("active");
						if (($(this)[0].classList.length) == 2) {
							$(this).html("&#xe677;")
						}
					})
	//提示文字切换
	function altText(ele, placeHolder){
		$(ele).focus(function(){
			this.placeholder = "";
		});
		$(ele).blur(function(){
			this.placeholder = placeHolder;
		});
	}
	altText(".username", "请输入患者姓名");
	altText(".phone", "请输入手机号");
	altText(".age", "请输入年龄");
	altText(".IDcard", "请输入身份证");
	//数据渲染
// 	$(".submitbtn").click(function(){
// //		console.log($(".active").next("span").text())
// 		console.log(typeof String($(".phone").val()));
// 		
// 		var birthday = new Date("2019/05/19");
// 		$.ajax({
// 			type: "get",
// 			url:  config + "/oa/patinfo/save",
// 			async: true,
// 			dataType: "JSON",
// 			contentType: "application/json; charset=utf-8",//传到后台的数据格式
// 			data:{
// 				'name': $('.username').val(),
// 				'mobile': $('.phone').val().toString(),
// 				'sex': $('.active').next('span').text(),
// 				'age': $('.age').val(),
// 				'idCode': $('.IDcard').val()
// 			},
// 			success: function(data){
// 				console.log(data);
// 				if(data.status == 1){
// 					alert(data.message);
// 				}else{
// 					alert(data.message);
// 				}
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
