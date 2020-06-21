$(".submitBtn").click(function() {
	//window.open('../login/login.html');
	//location.href="../login/login.html";
});
var telNum=sessionStorage.getItem("forgetUName");
console.log(telNum);
/*密码的显示和隐藏设置*/
var ele_pass = $('#txtPassword')[0];
var ele_eye = $('.show');
var queren_eye = $('.reshow');
var old_eye = $('.oldshow');
var oldPassword;
var newPassword;
var reptPassword;
old_eye.click(function() {
	var old_pass = $('#old_pwd')[0];
	var state = this.getAttribute('state');
	if(state === 'off') {
		old_pass.setAttribute("type", "text");
		old_eye[0].setAttribute("state", "on");
		old_eye[0].style.opacity = 0.2;
	} else {
		old_pass.setAttribute("type", "password");
		old_eye[0].setAttribute("state", "off");
		old_eye[0].style.opacity = 1;
	}
});
ele_eye.click(function() {
	var state = this.getAttribute('state');
	if(state === 'off') {
		ele_pass.setAttribute("type", "text");
		ele_eye[0].setAttribute("state", "on");
		ele_eye[0].style.opacity = 0.2;
	} else {
		ele_pass.setAttribute("type", "password");
		ele_eye[0].setAttribute("state", "off");
		ele_eye[0].style.opacity = 1;
	}
});
queren_eye.click(function() {
	var re_pass = $('#retxtPassword')[0];
	console.log(re_pass);
	var restate = this.getAttribute('state');
	if(restate === 'off') {
		re_pass.setAttribute("type", "text");
		queren_eye[0].setAttribute("state", "on");
		queren_eye[0].style.opacity = 0.2;
	} else {
		re_pass.setAttribute("type", "password");
		queren_eye[0].setAttribute("state", "off");
		queren_eye[0].style.opacity = 1;
	}
});
/*检查确认密码与输入密码匹配*/
$(".submitBtn").click(function() {
	if($("#txtPassword").val() == null || $("#txtPassword").val() == "") {
		mui.toast("密码不能为空！");
	} else if($("#txtPassword").val().length<6||$("#txtPassword").val().length>18){
		mui.toast("密码大于6位小于18位！");
	}else if(!( /^[a-zA-Z0-9]+$/.test($("#txtPassword").val()))){
		mui.toast("密码必须为数字或字母！");
	} else if($("#retxtPassword").val() == null || $("#retxtPassword").val() == "") {
		mui.toast("请确认密码！");
	} else if($("#txtPassword").val() != $("#retxtPassword").val()) {
		mui.toast("两次输入密码不一致");
	} else {
		newPassword = $("#txtPassword").val().trim();
		reptPassword = $("#retxtPassword").val().trim();
		console.log(newPassword);
		$.ajax({
			type: "GET",
//			url:'https://192.168.18.127:8443/gcafu_commerce/rest/pc/forgetPassword',
			url: config+"pc/forgetPassword",
			contentType: "json; charset=utf-8",
			async: true,
			data: {
				"mobile": 1,
				telNum:telNum,
				newPassword:newPassword
			},
			dataType: 'JSONP',
			jsonp: 'callback',
			success: function(data) {
				if(data.code == 1) {
					mui.toast("重置密码成功");
					var sIval=setInterval(function(){
						location.href = "../login/login.html";
					},1500);
				}else if(data.code == 2){
					mui.toast("找回密码失败！");
				}

			},
			error: function(data) {

			}
		});	
	}

});
/*隐藏显示的小眼睛防止软键盘挤压*/

$('.show').height($(window).height()/30);
$('.reshow').height($(window).height()/30);