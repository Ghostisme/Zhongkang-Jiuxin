function chkAllTxt() {
	var txtUserName = $("#txtUserName").val();
	var txtUserCode = $("#txtUserCode").val();
	//	console.log(txtUserName);
	if(txtUserName == null || txtUserName == "") {
		mui.toast("请输入手机号码");
	} else if(txtUserCode == null || txtUserCode == "") {
		mui.toast("请输入验证码");
	}
}
/*点击提交验证*/
$(".submitBtn").click(function() {
	var txtUserName = $("#txtUserName").val();
	var txtUserCode = $("#txtUserCode").val();
	console.log(txtUserName);
	if(txtUserName == null || txtUserName == "") {
		mui.toast("请输入手机号码");
	} else if(!(/^1[34578]\d{9}$/.test(txtUserName))) {
			mui.toast("请输入有效的手机号！");
	} else if(txtUserCode == null || txtUserCode == "") {
		mui.toast("请输入验证码");
	} else if(sessionStorage.getItem('myCode') !== txtUserCode) {
	if(sessionStorage.getItem('myCode') == '' || sessionStorage.getItem('myCode') == null){
			mui.toast("验证码已失效，请重新获取验证码");
		}else{
			mui.toast("验证码输入有误，请重新输入！");
		}
	} else {
		console.log(txtUserName);
		sessionStorage.setItem('forgetUName',txtUserName);
		window.location.href = "newPwd.html";
//		$.ajax({
//			type: "GET",
//			url:"http://192.168.18.251:8080/gcafu_commerce/rest/pc/companyRegister/{id:1,loginname:'111111',password:'222222',companytypeid:1}",
////			url: "http://192.168.18.189:8080/gcafu_commerce/rest/pc/userRegister",
////			url: config + "pc/userRegister",
//			async: false,
//			data: {
//				"phoneNumber": txtUserName,
//				mobile:1
//			},
//			//data: obj,
//			dataType: 'jsonp',
//			jsonp: 'jsoncallback',
//			success: function(text) {
//				//alert("测试");
//				if(text.result == 1) {
////					mui.toast("密码找回成功");
//					window.location.href = "newPwd.html";
//				};
//			},
//			error: function(result) {
//				//alert("找回密码失败");
//				//alert(result);
//			}
//		});
	}
})
/*判断该手机号是否注册*/
function isCallNum(){
	var loginname = $("#txtUserName").val().trim();
	if(loginname==""||loginname==null){
		mui.toast("请输入手机号");	
	}else if(!(/^1[3456789]\d{9}$/.test(loginname))){
		mui.toast("请输入有效的手机号！");
	}else{
		$.ajax({
			type: "GET",
			url: config + "pc/login",
			contentType: "application/json; charset=utf-8",
			async: true,
			data: {
				"logintype": 0,
				"loginname": loginname,
				"password": '',
				"mobile": 1
			},
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			success: function(text) {
				if(text.result == 0) {
					sendMessage();
				} else if(text.result == 2) {
					mui.toast(text.msg);
				};
			},
			error: function(result) {
	
			}
		});
	}
	
}
/*发送验证码*/
var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount; //当前剩余秒数
function sendMessage() {
	var loginname = $("#txtUserName").val();
	console.log(loginname);
	if(loginname == '' || loginname == null ) {
		mui.toast("请输入手机号！");
	} else if(!(/^1[34578]\d{9}$/.test(loginname))){
		mui.toast("请输入正确的手机号！");
	}else {
		// 向后台发送处理数据
		var loginname = $("#txtUserName").val();
		//console.log(loginname);
		$.ajax({
			type: "POST", // 用POST方式传输
			async: false,
			dataType: 'jsonp', // 数据格式:JSON
			jsonp: 'jsoncallback',
//			url:'http://192.168.18.251:8080/gcafu_commerce/rest/pc/phoneVerify/',
			url: config+"pc/phoneVerify/", // 目标地址
			data: {
				"phoneNumber": loginname,
				mobile:1
			},
			success: function(data) {
				if(data.result == 1) {
					mui.toast("√ 短信验证码已发到您的手机,请查收");
					curCount = count;
					// 设置button效果，开始计时
					document.getElementById("sendIcode").setAttribute("disabled", "true"); //设置按钮为禁用状态
					document.getElementById("sendIcode").value = curCount + "(s)"; //更改按钮文字
					InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
					myCode = data.code;
					sessionStorage.setItem('myCode',myCode);
//					console.log(myCode);
				} else if(data.result == 2) {
					mui.toast("× 短信验证码发送失败，请重新发送");
				}
			}
		});
	}
}

//timer处理函数

function SetRemainTime() {
	if(curCount == 0) {
		sessionStorage.removeItem('myCode');
		window.clearInterval(InterValObj); // 停止计时器
		document.getElementById("sendIcode").removeAttribute("disabled"); //移除禁用状态改为可用
		document.getElementById("sendIcode").value = "重新发送";
		$("#sendIcode").css("background","#3699DC");
	} else {
		$("#sendIcode").css("background","#e3e4e5");
		curCount--;
		document.getElementById("sendIcode").value = +curCount + "(s)";
	}
}