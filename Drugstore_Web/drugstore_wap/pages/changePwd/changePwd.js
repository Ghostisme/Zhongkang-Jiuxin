$(".submitBtn").click(function() {
	//window.open('../login/login.html');
	//location.href="../login/login.html";
});
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
	var id = sessionStorage.getItem('userId');
	if($("#old_pwd").val() == null || $("#old_pwd").val() == ""){
		mui.toast("旧密码不能为空！");
	}else if($("#txtPassword").val() == null || $("#txtPassword").val() == "") {
		mui.toast("新密码不能为空！");
	}else if($("#txtPassword").val().length < 6||$("#txtPassword").val().length >18) {
		mui.toast("密码必须大于6位小于18位！");
	}else if(!( /^[a-zA-Z0-9]+$/.test($("#txtPassword").val()))){
		mui.toast("密码必须为数字或字母！");
	} else if($("#retxtPassword").val() == null || $("#retxtPassword").val() == "") {
		mui.toast("请确认密码！");
	} else if($("#txtPassword").val() != $("#retxtPassword").val()) {
		mui.toast("两次输入密码不一致");
	} else if($("#old_pwd").val() == $("#txtPassword").val()){
		mui.toast('旧密码不能与新密码相同');
	}else {
		oldPassword =  $("#old_pwd").val().trim();
		newPassword = $("#txtPassword").val().trim();
		reptPassword = $("#retxtPassword").val().trim();
		$.ajax({
			type: "GET",
			url: config+"buyer/editbuyerPassword",
			contentType: "json; charset=utf-8",
			async: true,
			data: {
				"mobile": 1,
				"id": id,
				"oldPassword":oldPassword,
				"newPassword":newPassword,
				"reptPassword":reptPassword
			},
			dataType: 'JSONP',
			jsonp: 'callback',
			success: function(data) {
				if(data.code == 1) {
					mui.toast("修改密码成功！");
					var sIval=setInterval(function(){
						location.href = "../login/login.html";
					},1500);
				}else if(data.code == 2){
					mui.toast("旧密码输入有误！");
				}

			},
			error: function(data) {

			}
		});
		
	}

});
/**/