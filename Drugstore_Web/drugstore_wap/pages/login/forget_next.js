$(document).ready(function(){
	var phone = getUrlParam('phone');
	$(".changePhone").text(phone);
	//密码明文密文转换
	$(".imgicon").click(function(){
		var imgStatus = $(".imgicon").attr("data-show");
		if (imgStatus == 0) {
			$(this).attr("data-show", "1");
			$(".password").attr("type", "text");
			$(this).attr("src", "img/openIcon.png");
		} else{
			$(this).attr("data-show", "0");
			$(".password").attr("type", "password");
			$(this).attr("src", "img/closeIcon.png");
		}		
	});
	$(".signin").click(function(){
		if ($(".password").val() == "") {
			mui.toast("密码不可为空!",{ duration:'long', type:'div' });
			return;
		}else{
			$.ajax({
				type:"get",
				url: config + "/sys/account/forgetPassword",
				async:true,
				data: {
					userCode: phone,
					newPassword: $(".password").val()
				},
				success: function(data){
					console.log(data);
					if (data.status == "1") {
						mui.toast(data.message,{ duration:'long', type:'div' });
						setTimeout(function(){
							window.location.href = "login.html";
						},2000);
					}else{
						mui.toast(data.message,{ duration:'long', type:'div' });
					}
				},
				error: function(data){
					console.log(data);
				}
			});
		}
	})
})
