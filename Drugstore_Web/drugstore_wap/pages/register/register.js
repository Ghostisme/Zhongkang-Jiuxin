/*复选框改单选框*/
var myCode;
$('#personal').click(function(e) {
	$('#personal')[0].checked = true;
	$('#company')[0].checked = false;
	$("#companyName").css('display', "none");
//	$('#mailMargin').css("margin-bottom", "0");
	$("#isIdentity").css('display', "none");
});
$('#company').click(function(e) {
	$('#personal')[0].checked = false;
	$('#company')[0].checked = true;
	$("#companyName").css('display', "block");
	$('#mailMargin').css("margin-bottom", "20px");
	$("#isIdentity").css('display', "block");
});
/*点击用户协议跳转*/
$('.readed label a').click(function() {
	window.location.href = "http://aq123.net/fspt/pc_res/html/xieyi.html";
});
/*判断如果是火狐浏览器，使用下面样式*/
 if (navigator.userAgent.indexOf('Firefox') >= 0){
  	$('.mui-content form .mui-left input').css({"position":"absolute","margin-left": "-10px","margin-top": "9px"});
  	$('#readed').css({"margin-left": "10px","height":"20px","width":"20px"});
  	$('.mui-content div.readed a').css({"margin-left":"10px"});
  }
/*密码的显示和隐藏设置*/
var ele_pass = $('#txtPassword')[0];
var ele_eye = $('.show');
ele_eye.click(function() {
	var state = this.getAttribute('state');
	console.log(state);
	if(state === 'off') {
		ele_pass.setAttribute("type", "text");
		this.setAttribute("state", "on");
		$(this).css("opacity", "0.2");
	} else {
		ele_pass.setAttribute("type", "password");
		this.setAttribute("state", "off");
		$(this)[0].style.opacity = 1;
	}
});
/*确认密码的显示隐藏设置*/
var ele_repass = $('#txtrePassword')[0];
var ele_reye = $('.reshow');
ele_reye.click(function() {
	var restate = this.getAttribute('state');
	console.log(restate);
	if(restate === 'off') {
		ele_repass.setAttribute("type", "text");
		this.setAttribute("state", "on");
		$(this).css("opacity", "0.2");
	} else {
		ele_repass.setAttribute("type", "password");
		this.setAttribute("state", "off");
		$(this)[0].style.opacity = 1;
	}
});
/*个人与企业点击后页面的切换*/

/*获取后台数据*/
$("#userSub").click(function() {
	var loginname = $("#loginname").val().trim();
	var sendcodeTophone = $("#code").val().trim();
	var printPwd = $("#txtPassword").val().trim();
	var printrePwd = $("#txtrePassword").val().trim();
	var mail = $("#email").val().trim();
	console.log('进来了吗||');
	if($('#personal')[0].checked == false && $('#company')[0].checked == false) {
		mui.toast('请选择个人或者企业注册');
	} else if(loginname == "" || loginname == null) {
		mui.toast("请输入手机号！");
	} else if(!(/^1[345789]\d{9}$/.test(loginname))) {
		mui.toast("请输入有效的手机号！");
	} else if($("#code").val() == '') {
		mui.toast("请输入验证码！");
	} else if(printPwd == "" || printPwd == null) {
		mui.toast("密码不能为空或空格！");
	} else if($("#txtPassword").val().length < 6 || $("#txtPassword").val().length > 18) {
		mui.toast("密码必须大于6位小于18位！");
	} else if(!(/^[a-zA-Z0-9]+$/.test(printPwd))) {
		mui.toast("密码必须为数字或字母！");
	} else if(printrePwd == null || printrePwd == "") {
		mui.toast("确认密码不能为空！");
	} else if(printrePwd != printPwd) {
		mui.toast("两次所输入密码不同！");
	} else if(mail == "" || mail == null) {
		mui.toast("邮箱不能为空！");
	} else if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(mail))) {
		mui.toast("请输入有效的邮箱地址！");
	} else {
		if($('#personal')[0].checked == true) {
			personAj();
		} else if($('#company')[0].checked == true) {
			console.log('0909090909');
			if($("#cName").val().trim() == null || $("#cName").val().trim() == "") {
				mui.toast("企业名不能为空！");
			} else {
				companyAj();
			}
		}
	}
});
/*获取后台数据*/
var inputVal = 0;
$('#proper').on('click', '.property input', function() {
	inputVal = $(this).val();
});

function personAj() {
	if($('#readed')[0].checked) {
		console.log($("#code").val());
		if(sessionStorage.getItem('myCode') !== $("#code").val()) {
			if(sessionStorage.getItem('myCode') == '' || sessionStorage.getItem('myCode') == null){
				mui.toast("验证码已失效，请重新获取验证码");
			}else{
				mui.toast("验证码输入有误，请重新输入！");
			}
		} else {
			var logintype = inputVal;
			var loginname = $("#loginname").val().trim();
			var password = $("#txtPassword").val().trim();
			var email = $("#email").val().trim();
			console.log(logintype + ' ' + loginname + ' ' + password + ' ' + email);
			
			var objOther=new Object();
	 		objOther.phone1=loginname;
//	        objOther.password=password;
	        objOther.email=email;
	        objOther.source=2;
		    $.ajax({
				type:"get",
	//	    	url:config+"/pc/userRegister",
				url:window.secondConfig,
				async:false,
				data:objOther,
				dataType:'JSONP',
		    	jsonp: 'jsoncallback',
		    	success:function(text){
						if(text.code==1){
	//						console.log("数据已录入外部客户系统");
		//					window.location.href="login.html";
						}else if(text.code == 3){
	//						console.log(text.msg)
						}
				},
			});
			
			var obj = new Object();
//			obj.logintype = logintype;
			obj.loginname = loginname;
			obj.password = password;
			obj.email = email;
			obj.mobile = 1;
//			获取邀请码
			var inviteCode=$("#inviteCode input").val();
			var codes;
			if(inviteCode==""||inviteCode==null){
				codes=0;
			}else{
				codes=parseInt(inviteCode);
			}
			obj.invited=codes;
//			console.log(obj);
			$.ajax({
				type: "GET",
				//   url:"http://localhost:8080/gcafu_commerce/rest/pc/companyRegister/{id:1,loginname:'111111',password:'222222',companytypeid:1}",
				//				url: "http://192.168.18.142:8080/gcafu_commerce/rest/pc/userRegister",
				url: config + "pc/userRegister",
				//   url:config.getLogin,     JSON.stringify(
				//    contentType:"application/json; charset=utf-8",
				async: false,
				//  data:{"loginname":"111111","password":"222222"},
				data: obj,
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				success: function(text) {
					if(text.result == 1) {
						mui.toast("注册成功！");
//						if($("#isIdentityYesOrNo").prop("checked")==false){
//							$("#modal").css("display","block");
//							$(".discountCoupon").css("display","block");
//						}else{
//								var sIval=setInterval(function(){
//								location.href = "../login/login.html";
//							},1500);
//						}
						$("#modal").css("display","block");
						$(".discountCoupon").css("display","block");
					} else if(text.result == 2) {
						mui.toast(text.msg);
					}else if(text.result == 3) {
						mui.toast("注册失败！");
					}
				},
				error: function(result) {
					mui.toast("注册失败！");
				}
			});
		}
	} else {
		mui.toast('请阅读并勾选用户协议');
	}
}

function companyAj() {
	var logintype = inputVal;
	var loginname = $("#loginname").val().trim();
	var password = $("#txtPassword").val().trim();
	var email = $("#email").val().trim();
	var cname = $("#cName").val().trim();
	if($('#readed')[0].checked) {
		console.log($("#code").val());
		if(sessionStorage.getItem('myCode') !== $("#code").val()) {
			if(sessionStorage.getItem('myCode') == '' || sessionStorage.getItem('myCode') == null){
				mui.toast("验证码已失效，请重新获取验证码");
			}else{
				mui.toast("验证码输入有误，请重新输入！");
			}
		} else {
			var loginname = $("#loginname").val().trim();
			var password = $("#txtPassword").val().trim();
			var email = $("#email").val().trim();
			var companyname = $("#cName").val().trim();
			console.log(logintype + ' ' + loginname + ' ' + password + ' ' + email + ' ' + companyname);
			
			var companyObj=new Object();
			companyObj.company=companyname;
			companyObj.email=email;
			companyObj.phone1=loginname;
			companyObj.source=2;
			$.ajax({
				type:"post",
		    	url:window.secondConfig,
//				url:"http://192.168.18.189:8080/gcafu-crm/addcusAsPc.shtml",
				async:false,
				data:companyObj,
				dataType:'JSONP',
		    	jsonp: 'jsoncallback',     
				success:function(text){
					if(text.code==1){
//						console.log("数据已录入外部客户系统");
	//					window.location.href="login.html";
					}else if(text.code == 3){
//						console.log(text.msg)
					}
					
				},
			}); 
			var obj = new Object();
			obj.loginname = loginname;
			obj.password = password;
			obj.email = email;
			obj.companyname = companyname;
			obj.legalperson = '';
			obj.companytypeid = 0;
			obj.province = 0;
			obj.city = 0;
			obj.town = 0;
			obj.address = '';
			obj.tel = '';
			obj.contacts = '';
			obj.cellphone = '';
			obj.mobile = 1;
//			console.log($("#isIdentityYesOrNo").prop("checked"));
//			获取身份
			var inputsRadio=$(".choseIdentity input[type='radio']");
			var identity;
			if($("#isIdentityYesOrNo").prop("checked")==true){
				for(var i=0;i<inputsRadio.length;i++){
					if($(inputsRadio[i]).prop("checked")==true){
//						console.log($(inputsRadio[i]).prop("class"));
						identity=$(inputsRadio[i]).siblings("label").text();	
//						console.log(identity);
					}
				}
			}else{
				identity="";
			}
			obj.statustype=identity;
//			获取邀请码
			var inviteCode=$("#cCode").val();
			var codes;
			if(inviteCode==""||inviteCode==null){
				codes=0;
			}else{
				codes=parseInt(inviteCode);
			}
			obj.invited=codes;
//			console.log(identity);
//			console.log(obj);
			$.ajax({
				type: "GET",
				//   url:"http://localhost:8080/gcafu_commerce/rest/pc/companyRegister/{id:1,loginname:'111111',password:'222222',companytypeid:1}",
				//			url: "http://192.168.18.142:8080/gcafu_commerce/rest/pc/companyRegister",
				url: config + 'pc/companyRegister',
				async: false,
				//  data:{"loginname":"111111","password":"222222"},
				data: obj,
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				success: function(text) {
					console.log(text);
					if(text.result == 1) {
						mui.toast("注册成功！");
						if($("#isIdentityYesOrNo").prop("checked")==false){
							$("#modal").css("display","block");
							$(".discountCoupon").css("display","block");
						}else{
								var sIval=setInterval(function(){
								location.href = "../login/login.html";
							},1500);
						}
//						$("#modal").css("display","block");
//						$(".discountCoupon").css("display","block");
					} else if(text.result == 2) {
						mui.toast(text.msg);
					} else if(text.result == 3) {
						mui.toast("注册失败！");
					}
				},
				error: function(result) {	
				}
			});
		}
	} else {
		mui.toast('请阅读并勾选用户协议');
	}

}

/*验证手机号码*/
//function checkPhone(){ 
//  var phone = document.getElementById('loginname').value;
//  if(!(/^1[34578]\d{9}$/.test(phone))||phone==null||phone==""){ 
//      mui.toast("手机号码有误，请重填");  
//      return false; 
//  } 
//}

/*发送验证码*/
var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount; //当前剩余秒数
function sendMessage() {
	var loginname = $("#loginname").val().trim();
	if(loginname == '' || loginname == null) {
		mui.toast("请输入手机号！");
	} else if(!(/^1[34578]\d{9}$/.test(loginname))) {
		mui.toast("请输入正确的手机号码！");
	} else {
		// 向后台发送处理数据
		var loginname = $("#loginname").val().trim();
		//console.log(loginname);
		$.ajax({
			type: "POST", // 用POST方式传输
			async: true,
			dataType: 'jsonp', // 数据格式:JSON
			jsonp: 'jsoncallback',
			//			url: "http://192.168.18.142:8080/gcafu_commerce/rest/pc/phoneVerify/", // 目标地址
			url: config + 'pc/phoneVerify/',
			data: {
				"phoneNumber": loginname,
				mobile: 1
			},
			success: function(data) {
				if(data.result == 1) {
					mui.toast("√ 短信验证码已发到您的手机,请查收");
					//设置开始计时
					curCount = count;
					// 设置button效果，开始计时
					document.getElementById("sendIcode").setAttribute("disabled", "true"); //设置按钮为禁用状态
					document.getElementById("sendIcode").value = curCount + "(s)"; //更改按钮文字
					InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
					myCode = data.code;
					sessionStorage.setItem('myCode',myCode);
//					console.log('验证码'+myCode);
				} else if(data.result == 2) {
					console.log(data.error);
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
		$("#sendIcode").css("background", "#ffcc00");
	} else {
		curCount--;
		$("#sendIcode").css("background", "#e3e4e5");
		document.getElementById("sendIcode").value = +curCount + "(s)";
	}
}

/*隐藏显示的小眼睛防止软键盘挤压*/

$('.show').height($(window).height() / 30);
$('.reshow').height($(window).height() / 30);

//点击是否申请身份认证
$("#isIdentityYesOrNo").click(function(){
	console.log($(this).prop("checked"));
	if($(this).prop("checked")==true){
		$(".choseIdentity").css("display","block");
	}else{
		$(".choseIdentity").css("display","none");
	}
});



//点击关闭遮罩层
$(".closeModal").click(function(){
	$("#modal").css("display","none");
	$(".discountCoupon").css("display","none");
});

//点击关闭模态框
$(".closeModal").click(function(){
	window.location.href="../login/login.html";
});
//点击登录去查看
$(".gotoSee").click(function(){
	window.location.href="../login/login.html";
});
