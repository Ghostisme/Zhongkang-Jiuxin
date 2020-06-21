//忘记密码交互
$(document).ready(function(){
	//提示文字切换
	var cPhone = /^1[3456789]\d{9}$/;
	var cPassword = /^(\w){6,20}$/;
//	var cNum = /^\d{5}$/;
	var cNum = "";
	function tipsChange(eleDom, repVar, tipEmpty, tipError){
		var tip = $(eleDom).attr("placeholder");
//		$(eleDom).focus(function(){
//			$(this).attr("placeholder", "");
//		})
		$(eleDom).blur(function(){
			if ($(this).val() == "" || $(this).val() == null) {
				$(eleDom).attr("placeholder", tip);
				mui.toast(tipEmpty,{ duration:'long', type:'div' });
//				$(this).focus();
			} else{
				if (repVar != "") {
					if (!(repVar.test($(this).val()))) {
						mui.toast(tipError,{ duration:'long', type:'div' });
					}
				}
			}			
		})
	};
	tipsChange(".phone", cPhone, '手机号不可为空!', '手机号码有误，请重填!');
	tipsChange(".password", cPassword, '密码不可为空!', '密码有误，请重填!');
	tipsChange(".verification", cNum, '验证码不可为空!', '');
	//验证码
	var isClick = true;
	$(".sendMsg").click(function(){
		//验证码接口
		if ($(".phone").val() == "") {
			mui.toast("手机号不可为空!",{ duration:'long', type:'div' });
			return;
		}else{
			//文字变换交互		
			clearInterval(timer);
			var msgNum = 60;
			var timer;
			$.ajax({
				type:"get",
				url: config + "/sys/account/smsSend",
				async:true,
				data: {
					userCode: $(".phone").val()
				},
				success: function(data){
					console.log(data);
					if (data.status == "1") {
						mui.toast(data.message,{ duration:'long', type:'div' });
						// if (isClick) {
							isClick = false;
							timer = setInterval(function(){
								if (msgNum == 0) {
									clearInterval(timer);
									msgNum = 60;
									$(".sendMsg").text("发送验证码");
									$(".verification").css({"width":"77%"});
									isClick = true;
								} else{			
									$(".sendMsg").text("重新发送(" + msgNum + ")");
									$(".verification").css({"width":"73%"});
									msgNum--;
									isClick = false;
								};
							}, 1000);
						// };
					}else{
						mui.toast(data.message,{ duration:'long', type:'div' });
						isClick = true;
					};
				},
				error: function(data){
					console.log(data);
				}
			});
		};		
		
		
	})
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
	//手机号长度判定
//	$(".phone").focus(function(){
//		if($(this).val().length > 11){
//			mui.toast("手机号输入过长,请重新输入!",{ duration:'long', type:'div' });
//			return;
//		};
//		if($(this).val().length < 11){
//			mui.toast("手机号输入过短,请重新输入!",{ duration:'long', type:'div' });
//			return;
//		};
//	});
	//验证码长度判定
//	$(".verification").focus(function(){
//		if($(this).val() > 6){
//			mui.toast("验证码输入错误,请重新输入!",{ duration:'long', type:'div' });
//			return;
//		};
//		if($(this).val() < 6){
//			mui.toast("验证码输入错误,请重新输入!",{ duration:'long', type:'div' });
//			return;
//		};
//	});
	//注册按钮点击
	$(".signin").click(function(){
		if($(".verification").val().length > 6){
			mui.toast("验证码输入错误,请重新输入!",{ duration:'long', type:'div' });
			return;
		};
		if($(".verification").val().length < 6){
			mui.toast("验证码输入错误,请重新输入!",{ duration:'long', type:'div' });
			return;
		};
		if ($(".verification").val() == "") {
			mui.toast("验证码不可为空!",{ duration:'long', type:'div' });
			return;
		}
		if ($(".phone").val() == "") {
			mui.toast("手机号不可为空!",{ duration:'long', type:'div' });
			return;
		}
		$.ajax({
			type:"get",
			url: config + "/sys/account/verifySmscode",
			async:true,
			data: {
				userCode: $(".phone").val(),
				smsCode: $(".verification").val()
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					mui.toast(data.message,{ duration:'long', type:'div' });
					setTimeout(function(){
						window.location.href = "forget_next.html?phone=" + $(".phone").val();
					},2000);
				}else{
					mui.toast(data.message,{ duration:'long', type:'div' });
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	});
	
})