/*复选框改单选框*/
//$('#personal').click(function(e) {
//	$('#personal')[0].checked = true;
//	$('#company')[0].checked = false;
//});
//$('#company').click(function(e) {
//	$('#personal')[0].checked = false;
//	$('#company')[0].checked = true;
//});
//function getCookie(name)
//{
//var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//if(arr=document.cookie.match(reg))
//return unescape(arr[2]);
//else
//return null;
//}
//var detailjumptoLogin=getCookie("detailjumptoLogin");
///*判断如果是火狐浏览器，使用下面样式*/
// if (navigator.userAgent.indexOf('Firefox') >= 0){
//	$('.mui-content form .mui-left input').css({"position":"absolute","margin-left": "-10px","margin-top": "9px"});
//}
///*登录注册点击跳转设置*/
//
////$('.registerBtn').click(function(){
////	window.open('../register/register.html');
////});
///*记住密码*/
////window.onload = function onLoginLoaded() {
////	if(isPostBack == "False") {
////		GetLastUser();
////	}
////}
////window.onload = function GetLastUser() {
////		var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67"; //GUID标识符
////		var usr = GetCookie(id);
////		var pwd = GetCookie(usr);
////		if(usr != null && pwd != null) {
////			document.getElementById('txtUserName').value = usr;
////		} else {
////			document.getElementById('txtUserName').value = "";
////		}
////		GetPwdAndChk();
////	}
//	//点击登录时触发客户端事件
//
//function SetPwdAndChk() {
//	//取用户名
//	var usr = document.getElementById('txtUserName').value;
//	//alert(usr);
//	//将最后一个用户信息写入到Cookie
//	SetLastUser(usr);
//	//如果记住密码选项被选中
//	if(document.getElementById('chkRememberPwd').checked == true) {
//		//取密码值
//		var pwd = document.getElementById('txtPassword').value;
//		//alert(pwd);
//		var expdate = new Date();
//		expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
//		//将用户名和密码写入到Cookie
//		SetCookie(usr, pwd, expdate);
//	} else {
//		//如果没有选中记住密码,则立即过期
//		ResetCookie();
//	}
//}
//
//function SetLastUser(usr) {
//	var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
//	var expdate = new Date();
//	//当前时间加上两周的时间
//	expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
//	SetCookie(id, usr, expdate);
//}
////用户名失去焦点时调用该方法
//
//function GetPwdAndChk() {
//	var usr = document.getElementById('txtUserName').value;
//	var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
//	var pwd = GetCookie(usr);
//	var tel = GetCookie(id);
//	//console.log(tel);
//	if(pwd != null && id != null) {
//		document.getElementById('chkRememberPwd').checked = true;
//		document.getElementById("txtUserName").value = tel;
//		document.getElementById('txtPassword').value = pwd;
//	} else {
//		document.getElementById('chkRememberPwd').checked = false;
//		document.getElementById('txtPassword').value = "";
//	}
//}
////取Cookie的值
//
//function GetCookie(name) {
//	var arg = name + "=";
//	var alen = arg.length;
//	var clen = document.cookie.length;
//	var i = 0;
//	while(i < clen) {
//		var j = i + alen;
//		//alert(j);
//		if(document.cookie.substring(i, j) == arg) return getCookieVal(j);
//		i = document.cookie.indexOf(" ", i) + 1;
//		if(i == 0) break;
//	}
//	return null;
//}
//var isPostBack = "<%= IsPostBack %>";
//
//function getCookieVal(offset) {
//	var endstr = document.cookie.indexOf(";", offset);
//	if(endstr == -1) endstr = document.cookie.length;
//	return unescape(document.cookie.substring(offset, endstr));
//}
////写入到Cookie
//
//function SetCookie(name, value, expires) {
//	var argv = SetCookie.arguments;
//	//本例中length = 3
//	var argc = SetCookie.arguments.length;
//	var expires = (argc > 2) ? argv[2] : null;
//	var path = (argc > 3) ? argv[3] : null;
//	var domain = (argc > 4) ? argv[4] : null;
//	var secure = (argc > 5) ? argv[5] : false;
//	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
//}
//
//function ResetCookie() {
//	var usr = document.getElementById('txtUserName').value;
//	var expdate = new Date();
//	SetCookie(usr, null, expdate);
//}
///*获取后台数据*/
//var inputVal = 0;
//$('#proper').on('click', '.property input', function() {
//	inputVal = $(this).val();
//});
///*点击登录按钮*/
//$("#loginBtn").click(function() {
//		var loginname = $("#txtUserName").val().trim();
//		var password = $("#txtPassword").val().trim();
//		if($('#personal')[0].checked == false && $('#company')[0].checked == false) {
//			mui.toast('请选择个人或者企业登录');
//		} else if(loginname == "" || loginname == null) {
//			mui.toast("请输入手机号！");
//		} else if(!(/^1[3456789]\d{9}$/.test(loginname))) {
//			console.log(loginname);
//			mui.toast("请输入有效的手机号！");
//		} else if(password == "" || password == null) {
//			mui.toast("密码不能为空！");
//		} else {
//			if($('#personal')[0].checked == true) {
//				personAj();
//			} else if($('#company')[0].checked == true) {
//				companyAj();
//			}
//		}
//	})
//	/*个人页面*/
//function personAj() {
//	var logintype = inputVal;
//	var loginname = $("#txtUserName").val().trim();
//	var password = $("#txtPassword").val().trim();
//	console.log(logintype + " " + loginname + " " + password);
//	$.ajax({
//		type: "GET",
//		//		url:'http://192.168.18.126:8080/gcafu_commerce/rest/pc/login',
//		//		url:'http://192.168.18.189:8080/gcafu_commerce/rest/pc/login',
//		url: config + "pc/login",
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		crossDomain: true,
//		xhrFields: {withCredentials: true},
//		data: {
//			"logintype": logintype,
//			"loginname": loginname,
//			"password": password,
//			"mobile": 1
//		},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(text) {
//			//		alert("测试");
//			if(text.result == 1) {
//				//alert("登陆成功");
//				//console.log(text);
//				mui.toast("登录成功！");
//				var userId = text.user.id;
//				console.log('个人'+text.user.id);
////				sessionStorage.setItem("userId", userId);
////				sessionStorage.setItem("logintype", logintype);
//				document.cookie = "userId ="+userId+";path=/";
//				document.cookie = "logintype ="+logintype+";path=/";
//				document.cookie = "loginname ="+loginname+";path=/";
//				if(window.location.search){
//      			var aaa = window.location.search.split("=")[1]; 
////      			alert(aaa);
//      			//接下来就可以针对得到的参数值进行判断和下一步的操作了  
//      			if(aaa==1){
//      				window.location.href = "../shopCart/shopcart_index.html?dd=0";	
//      			}else if(aaa==2){
//      				window.location.href = "../activityPromotion/activityPromotion.html?e=0";	
//      			}else{
//      				window.location.href ='../shop/shop_detail_versionTwo.html?sid='+GetQueryString("sid")+'&pid='+GetQueryString("pid")+'&cid='+GetQueryString("cid");
//      			}
////  	
//				}else{
//      			//如果没有参数可以做一些其它事件  
//      			window.location.href = "../home/index.html?aIndex=0";
//  			}  
////				if(detailjumptoLogin=="商品详情"){
////					window.location.href = "../shopCart/shopcart_index.html";
////				}else{
////					window.location.href = "../home/index.html";
////				}
//			} else if(text.result == 2) {
//				mui.toast(text.msg);
//			};
//		},
//		error: function(result) {
//
//		}
//	});
//}
//
///*企业页面*/
//function companyAj() {
//	var logintype = inputVal;
//	var loginname = $("#txtUserName").val().trim();
//	var password = $("#txtPassword").val().trim();
//	$.ajax({
//		type: "GET",
//		//		url:'http://192.168.18.251:8080/gcafu_commerce/rest/pc/login',
//		url: config + "pc/login",
//		//   url:config.getLogin,     JSON.stringify(
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {
//			"logintype": logintype,
//			"loginname": loginname,
//			"password": password,
//			"mobile": 1
//		},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(text) {
//			console.log(text);
//			if(text.result == 1) {
//				mui.toast("登录成功！");
//				var userId = text.user.id;
//				console.log(text.user.id);
////				sessionStorage.setItem("userId", userId);
////				sessionStorage.setItem("logintype", logintype);
//				document.cookie = "userId ="+userId+";path=/";
//				document.cookie = "logintype ="+logintype+";path=/";
//				document.cookie = "loginname ="+loginname+";path=/";
//				document.cookie = "applicantstatus ="+text.user.applicantstatus+";path=/";
////				settledYesOrNo();
//				if(text.user.applicantstatus == 10) {
//				if(window.location.search){  
//      			var aaa = window.location.search.split("=")[1];  
//      			//接下来就可以针对得到的参数值进行判断和下一步的操作了  
//  				if(aaa==1){
//      				window.location.href = "../shopCart/shopcart_index.html?dd=0";	
//      			}else if(aaa==2){
//      				window.location.href = "../activityPromotion/activityPromotion.html?e=0";	
//      			}else{
//      				window.location.href ='../shop/shop_detail_versionTwo.html?sid='+GetQueryString("sid")+'&pid='+GetQueryString("pid")+'&cid='+GetQueryString("cid");
//      			}
//				}else{
//      			//如果没有参数可以做一些其它事件  
////      			window.location.href = "../my/seller/noSettled_company.html?cc=0";
//  				window.location.href='../my/my_index.html';
//				}
//				} else if(text.user.applicantstatus == 11) {
//					if(window.location.search){  
//	        			var aaa = window.location.search.split("=")[1];  
//	        			//接下来就可以针对得到的参数值进行判断和下一步的操作了  
//	    				if(aaa==1){
//	        				window.location.href = "../shopCart/shopcart_index.html?dd=0";	
//	        			}else if(aaa==2){
//	        				window.location.href = "../activityPromotion/activityPromotion.html?e=0";	
//	        			}else{
//	        				window.location.href ='../shop/shop_detail_versionTwo.html?sid='+GetQueryString("sid")+'&pid='+GetQueryString("pid")+'&cid='+GetQueryString("cid");
//	        			}
//					}else{
//	        			//如果没有参数可以做一些其它事件  
//	        			window.location.href = "../my/seller/myAccount.html?cc=0";
//	    			}
//				}
//			} else if(text.result == 2) {
//				mui.toast(text.msg);
//			}
//		},
//		error: function(result) {
//
//		}
//	});
//}
///*判断是否是入驻企业*/
//function settledYesOrNo() {
//	$.ajax({
//		type: "GET",
//		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
//		url: config + "base/usersession",
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(data) {
//			console.log(data.applicantstatus);
//			var id;
//			if(data.id != null) {
//				if(data.applicantstatus == 10) {
////					if(detailjumptoLogin=="商品详情"){
////						window.location.href = "../shopCart/shopcart_index.html";
////					}else{
////						window.location.href = "../my/seller/noSettled_company.html";
////					}
//				if(window.location.search){  
//      			var aaa = window.location.search.split("=")[1];  
//      			//接下来就可以针对得到的参数值进行判断和下一步的操作了  
//  				window.location.href = "../shopCart/shopcart_index.html?dd=0";
//				}else{
//      			//如果没有参数可以做一些其它事件  
////      			window.location.href = "../my/seller/noSettled_company.html?cc=0";
//  				window.location.href='../my/my_index.html';
//				}
//				} else if(data.applicantstatus == 11) {
////					if(detailjumptoLogin=="商品详情"){
////						window.location.href = "../shopCart/shopcart_index.html";
////					}else{
////						window.location.href = "../my/seller/myAccount.html";
////					}
////					
//				if(window.location.search){  
//      			var aaa = window.location.search.split("=")[1];  
//      			//接下来就可以针对得到的参数值进行判断和下一步的操作了  
//  				window.location.href = "../shopCart/shopcart_index.html?dd=0";
//				}else{
//      			//如果没有参数可以做一些其它事件  
//      			window.location.href = "../my/seller/myAccount.html?cc=0";
//  			}
//				}
//			}
//		},
//		error: function(data) {
//
//		}
//	});
//}

//判断浏览器是否支持local或者session

//function isLocalStorageSupported() {
//  var testKey = 'test',
//      storage = window.sessionStorage;
//  try {
//      storage.setItem(testKey, 'testValue');
//      storage.removeItem(testKey);
//      return true;
//  } catch (error) {
//  	mui.toast('请关闭手机浏览器无痕浏览功能，否则将无法使用');
//      return false;
//  }
//}
//if(window.history && window.history.pushState) {
//	$(window).on('popstate', function() {
//		var hashLocation = location.hash;
//		console.log(hashLocation);
//		var hashSplit = hashLocation.split("#!/");
//		console.log(hashSplit);
//		var hashName = hashSplit[1];
//		if(hashName !== '') {
//			var hash = window.location.hash;
//			if(hash === '') {
//				window.location.href = '../home/index.html';
//			}
//		}
//	});
//	window.history.pushState('forward', null, '../home/index.html');
//}

//如果是从详情页跳转过来的获取地址栏里的storeid和productid
//function GetQueryString(name){
//   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//   var r = window.location.search.substr(1).match(reg);
//   if(r!=null)return  unescape(r[2]); return null;
//}



//新的登录注册交互
$(document).ready(function(){
	//提示文字切换
	var cPhone = /^1[3456789]\d{9}$/;
	var cPassword = /^(\w){6,20}$/;
	function tipsChange(eleDom, repVar, tipEmpty, tipError){
		var tip = $(eleDom).attr("placeholder");
		$(eleDom).focus(function(){
			$(this).attr("placeholder", "");
		})
		$(eleDom).blur(function(){
			if ($(this).val() == "" || $(this).val() == null) {
				$(eleDom).attr("placeholder", tip);
				mui.toast(tipEmpty,{ duration:'long', type:'div' });
			} else{
				if (!(repVar.test($(this).val()))) {
//					mui.toast(tipError,{ duration:'long', type:'div' });
				}
			}			
		})
	}
	tipsChange(".phone", cPhone, '手机号不可为空!', '手机号码有误，请重填!');
	tipsChange(".password", cPassword, '密码不可为空!', '');
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
	})
	//登录按钮点击
	$(".signin").click(function(){
		//注册接口
		$.ajax({
			type:"get",
			url: config+"/sys/account/webLogin",
			async:true,
			data: {
				"userCode": $(".phone").val(),
				"password": $(".password").val()
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					var messageSuccess="登录成功";
					console.log(messageSuccess);
					mui.toast(messageSuccess,{ duration:'long', type:'div' });
//					alert(data.message);
//					var user = data.resultMap.user;
					var user = data.resultMap.account;
					sessionStorage.setItem("webUser", JSON.stringify(user));
					setTimeout(function(){
						window.location.href = '../../index.html';
					},900)
				} else{
					mui.toast(data.message,{ duration:'long', type:'div' });
//					alert(data.message);
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	})
	//新用户注册
	$(".newPeople").click(function(){
		window.location.href = "register.html";
	});
	//忘记密码
	$(".forget").click(function(){
		window.location.href = "forget.html";		
	});
})
