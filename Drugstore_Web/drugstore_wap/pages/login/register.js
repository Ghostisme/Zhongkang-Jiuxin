//新用户注册交互
$(document).ready(function(){	
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
	// 邀请门店下拉
	getSelect();
	function getSelect() {
		$.ajax({
			method: 'get',
			url: config + '/sys/dict/list',
			contentType: "application/json; charset=utf-8", //传到后台的数据格式
			async: true,
			data: {},
			dataType: 'jsonp', //接收值的格式
			jsonp: 'jsoncallback',
			success: function(res){
				console.log(res);
				if (res.status == "1") {
					var list = res.resultMap.dictList;
					$("#inviteStore").html('');
					var optionDom = '';
					if (list == null || list.length == 0) {
						list = [];
					} else {
						list.map( item => {
							if (item.name == null || item.name == undefined) return;
							else optionDom += `<option value='${item.name}'>${item.name}</option>`;
						});
						$("#inviteStore").append(optionDom);
					};
				}else{
					alert(res.message);
				}
			},
			error: function(res){
				console.log(res);
			}
		});
	}
	//发送验证码交互
	var isClick = true;
	$(".sendMsg").click(function(){		
		//文字变换交互		
		clearInterval(timer);
		var msgNum = 60;
		if (isClick) {
			if ($(".phone").val() == "") {
				mui.toast("请填写手机号!",{ duration:'long', type:'div' });
				isClick = true;
				return;
			};
			var timer;
			//验证码接口
			$.ajax({
				type:"get",
				url:config+"/sys/account/sendVerificationCode",
				async:true,
				data:{
					"userCode": $(".phone").val()
				},
				success:function(data){
					console.log(data);
					if (data.status == "1") {
//						mui.toast(data.message,{ duration:'long', type:'div' });
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
							}
						}, 1000);
					}else{
						mui.toast(data.message,{ duration:'long', type:'div' });
						isClick = true;
					}
				},
				error: function(data){
					console.log(data);
				}
			});
			
		};
	});
	//电话失去焦点验证
	var tip = $(".phone").attr("placeholder");
	var cPhone = /^1[3456789]\d{9}$/;
	var phoneVal = 0;
	$(".phone").focus(function(){
		$(this).attr("placeholder", "");
	})
	$(".phone").blur(function(){
		if ($(this).val() == "" || $(this).val() == null) {
			$(this).attr("placeholder", tip);
			mui.toast("手机号不可为空!",{ duration:'long', type:'div' });
			return false;
		} else{
			if (!(cPhone.test($(this).val()))) {
				mui.toast("手机号码有误，请重填!",{ duration:'long', type:'div' });
				return false;
			}else{
				$.ajax({
					type:"get",
					url:config +"/sys/account/registerCheck",
					async:true,
					data:{
						"userCode": $(".phone").val(),
					},
					success: function(data){
						console.log(data);
						if (data.result.status == "1") {
							mui.toast(data.result.message,{ duration:'long', type:'div' });
							phoneVal = 1;
						}else{
							mui.toast(data.result.message,{ duration:'long', type:'div' });
							phoneVal = 0;
						};
					},
					error: function(data){
						console.log(data);
					}
				});
			};		
		};			
	});
	//验证码验证
	var msgCodeCodeMsg = $(".verification").attr("placeholder");
	var msgCodeVal = 0;
	$(".verification").blur(function(){
		if ($(this).val() == "") {
			$(this).attr("placeholder", msgCodeCodeMsg);
			mui.toast("短信验证码不能为空",{ duration:'long', type:'div' });
		} else{
			$.ajax({
				type:"get",
				url:config+"/sys/account/checkVerificationCode",
				async:true,
				data:{
					"userCode": $(".phone").val(),
					"checkSMSCode": $(this).val()
				},
				success: function(data){
					console.log(data);
					if (data.status == "1") {
						mui.toast(data.message,{ duration:'long', type:'div' });
						msgCodeVal = 1;
					}else{
						mui.toast(data.message,{ duration:'long', type:'div' });
						msgCodeVal = 0;
					};
				},
				error: function(data){
					console.log(data);
				}
			});
		};
	});
	//注册按钮点击
//	var cPassword = /^(\w\W){6,20}$/;
	var cPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?. ]).*$/;
	var passwordVal = 0;
	var df = $.Deferred();
	$(".signin").on("click",function(){
		if ($(".password").val() == "" || $(".password").val() == null) {
			mui.toast("密码不可为空!",{ duration:'long', type:'div' });
			passwordVal = 0;
			return false;
		}else if(cPassword.test($(".password").val())){
			mui.toast("密码有误，请重填!",{ duration:'long', type:'div' });
			passwordVal = 0;
			return false;
		}else {
			passwordVal = 1;
		};
		df.resolve();	
	});
//	return df.promise();
//	df.promise();
	df.promise().then(function(){
		return $.ajax({
			type:"get",
			url:config +"/sys/account/registerCheck",
			async:true,
			data:{
				"userCode": $(".phone").val()
			}		
		});
	}).then(function(data){
		console.log(data);
		if (data.result.status == "1") {
			mui.toast(data.result.message,{ duration:'long', type:'div' });
			phoneVal = 1;
			if (phoneVal == 1 && msgCodeVal == 1 && passwordVal == 1) {
				if ($("#inviteStore").val() == "") {
					mui.toast("邀请门店不能为空",{ duration:'long', type:'div' });
					return;
				} else {
					return $.ajax({
						type:"get",
						url:config+"/sys/account/userRegister",
						async:true,
						data: {
							"userCode": $(".phone").val(),
							"password": $(".password").val(),
							"inviteStore": $("#inviteStore").val()
		//					"password": psVal
						}
					})
				}
			}else{
				if (phoneVal == 0) {
					mui.toast("手机号填写项错误啦!请重新查看!",{ duration:'long', type:'div' });
				};
				if (msgCodeVal == 0) {
					mui.toast("验证码填写项错误啦!请重新查看!",{ duration:'long', type:'div' });
				};
				if (passwordVal == 0) {
					mui.toast("密码填写项错误啦!请重新查看!",{ duration:'long', type:'div' });
				};
			};
		}else{
			mui.toast(data.result.message,{ duration:'long', type:'div' });
			phoneVal = 0;
			return false;
		};
	}).then(function(data){
		console.log(data);
		if (data.status == "1") {
			setTimeout(function(){
				mui.toast(data.message,{ duration:'long', type:'div' });
				setTimeout(function(){
					window.location.href = "login.html";
				},2000);
			},2000);
			$(".phone").val("");
			$(".phone").attr("placeholder","请输入手机号");
			$(".verification").val("");
			$(".password").val("");
//			setTimeout(function(){
//				window.location.href = "login.html";
//			},2000)
		}else{
			setTimeout(function(){
				mui.toast(data.message,{ duration:'long', type:'div' });
			},2000)
		};
	})
})	