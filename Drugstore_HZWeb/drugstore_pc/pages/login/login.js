//192.31.10.47:8003
$(document).ready(function(){
	//logo点击
	$(".logoBox").click(function(){
		window.location.href = '../../index.html';
	});
	//提示文字交互
	function inputPlaceholder(eledom){
		let thisPlaceholder = $(eledom).attr("placeholder");
		$(eledom).focus(function(){
			$(this).attr("placeholder", "");
		});
		$(eledom).blur(function(){
			if ($(this).val() == "") {
//				alert("不可为空");
				$(this).attr("placeholder", thisPlaceholder);
			}
		});
	};
	inputPlaceholder("#username");
	inputPlaceholder("#password");
	//登录按钮点击提交
	$("#submitBtn").click(function(){
		if ($("#username").val() == "" || $("#username").val() == null) {
			alert("用户名不可为空!");
			return;
		}
		if ($("#password").val() == "" || $("#password").val() == null) {
			alert("密码不可为空!");
			return;
		}
		$.ajax({
			type:"get",
			url:window.config+"/sys/account/webLogin",
			async:true,			
			data:{
				"account": $("#username").val(),
				"password": $("#password").val()
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {					
					if(data.message == "登陆成功！"){
						data.message = "登录成功!";						
					}	
					alert(data.message);
					var user = data.resultMap.account;
//					var user1 = data.resultMap.user;
					sessionStorage.setItem("user", JSON.stringify(user));
//					window.location.href = '../../index.html';
					if(document.referrer.indexOf("forget.html")==-1){
						location.href=document.referrer;						
					}else{
						window.location.href = '../../index.html';
					}

				} else{
					alert(data.message);
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	});
	//立即注册按钮点击
	$(".register_btn").click(function(){
		window.location.href = '../register/register.html';
	});
	//忘记密码点击
	$(".forget").click(function(){
		window.location.href = '../forget/forget.html';
	})
})
