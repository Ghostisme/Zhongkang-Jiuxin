/*记住密码*/
window.onload = function onLoginLoaded() {
	if(isPostBack == "False") {
		GetLastUser();
	}
}
window.onload = function GetLastUser() {
		var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67"; //GUID标识符
		var usr = GetCookie(id);
		var pwd = GetCookie(usr);
		if(usr != null && pwd != null&&/^1[2345789]\d{9}$/.test(usr)) {
			document.getElementById('userName').value = usr;
		} else {
			document.getElementById('userPwd').value = "";
		}
		GetPwdAndChk();
	}
	//点击登录时触发客户端事件

function SetPwdAndChk() {
	//取用户名
	var usr = document.getElementById('userName').value;
	//alert(usr);
	//将最后一个用户信息写入到Cookie
	SetLastUser(usr);
	//如果记住密码选项被选中
	if(document.getElementById('rememberTxt').checked == true) {
		//取密码值
		var pwd = document.getElementById('userPwd').value;
		//alert(pwd);
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
		//将用户名和密码写入到Cookie
		SetCookie(usr, pwd, expdate);
	} else {
		//如果没有选中记住密码,则立即过期
		ResetCookie();
	}
}
//失去焦点时记住用户名
function SetUserNames(){
	//取用户名
	var usr = document.getElementById('userName').value;
	//alert(usr);
	//将最后一个用户信息写入到Cookie
	SetLastUser(usr);
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
		//将用户名和密码写入到Cookie
	SetCookie(usr, "", expdate);
}
function SetLastUser(usr) {
	var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
	var expdate = new Date();
	//当前时间加上两周的时间
	expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
	SetCookie(id, usr, expdate);
}
//用户名失去焦点时调用该方法

function GetPwdAndChk() {
	var usr = document.getElementById('userName').value;
	var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
	var pwd = GetCookie(usr);
	var tel = GetCookie(id);
	//console.log(tel);
	if(pwd != null&&pwd !="" && id != null) {
		document.getElementById('rememberTxt').checked = true;
		document.getElementById("userName").value = tel;
		document.getElementById('userPwd').value = pwd;
	} else {
		document.getElementById('rememberTxt').checked = false;
		document.getElementById('userPwd').value = "";
	}
}
//取Cookie的值

function GetCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while(i < clen) {
		var j = i + alen;
		//alert(j);
		if(document.cookie.substring(i, j) == arg) return getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0) break;
	}
	return null;
}
var isPostBack = "<%= IsPostBack %>";

function getCookieVal(offset) {
	var endstr = document.cookie.indexOf(";", offset);
	if(endstr == -1) endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
//写入到Cookie

function SetCookie(name, value, expires) {
	var argv = SetCookie.arguments;
	//本例中length = 3
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}

function ResetCookie() {
	var usr = document.getElementById('userName').value;
	var expdate = new Date();
	SetCookie(usr, null, expdate);
}

//点击记住密码
$(document).on("click","#rememberTxt",function(){
	SetPwdAndChk();
});
$(document).on("click","#rememberLabel",function(){
	SetPwdAndChk();
});
//点击登录
var userCode;
var pwd;
$(document).on("click","#loginBtn",function(){
	SetPwdAndChk();
	
	userCode=$("#userName").val();
	pwd=$("#userPwd").val();
	if(userCode==""||userCode==null){
		alert("用户名不能为空！");
	}else if(pwd==""||pwd==null){
		alert("用户名不能为空！");
	}else{
		console.log(userCode+" "+pwd);
		$.ajax({
			method: 'get',
			url: config+'/sys/account/checkLoginIn',
			contentType: "application/json; charset=utf-8",//传到后台的数据格式
			async: true, 
			data: {'userCode':userCode,'pwd':pwd},
			dataType:'jsonp',//接收值的格式
			jsonp: 'jsoncallback', 
			success: function(data) {
				console.log(data.status);
				if(data.status==1){
					console.log(data);
					//alert(data.message);
                    sessionStorage.setItem('sessionId',data.resultMap.sessionId);
//                  sessionStorage.setItem('user',JSON.stringify(data.resultMap.userDO));
                    sessionStorage.setItem('user',JSON.stringify(data.resultMap.account));
                    sessionStorage.setItem('userId',data.resultMap.account.id);
//                  sessionStorage.setItem('userId',data.resultMap.userDO.id);
                    window.location.href="../commonNavs/common.html";
				}else{
					alert(data.message);
					window.location.reload();
				}
			},
			error: function(result) {
				console.log(result);
			}
		});
	}
	
});
//密码框回车登录
$('#userPwd').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
		SetPwdAndChk();
	
	userCode=$("#userName").val();
	pwd=$("#userPwd").val();
	if(userCode==""||userCode==null){
		alert("用户名不能为空！");
	}else if(pwd==""||pwd==null){
		alert("用户名不能为空！");
	}else{
		console.log(userCode+" "+pwd);
		$.ajax({
			method: 'get',
			url: config+'/sys/user/checkLoginIn',
			contentType: "application/json; charset=utf-8",//传到后台的数据格式
			async: true, 
			data: {'userCode':userCode,'pwd':pwd},
			dataType:'jsonp',//接收值的格式
			jsonp: 'jsoncallback', 
			success: function(data) {
				console.log(data.status);
				if(data.status==1){
					console.log(data);
					//alert(data.message);
                    sessionStorage.setItem('sessionId',data.resultMap.sessionId);
                    sessionStorage.setItem('user',JSON.stringify(data.resultMap.userDO));
                    sessionStorage.setItem('userId',data.resultMap.userDO.id);
                    window.location.href="../commonNavs/common.html";
				}else{
					alert(data.message);
					window.location.reload();
				}
			},
			error: function(result) {
				console.log(result);
			}
		});
	}
	}
});
//用户名框回车登录
$('#userName').bind('keyup', function(event) {
　　if (event.keyCode == "13") {
		SetPwdAndChk();
	
	userCode=$("#userName").val();
	pwd=$("#userPwd").val();
	if(userCode==""||userCode==null){
		alert("用户名不能为空！");
	}else if(pwd==""||pwd==null){
		alert("用户名不能为空！");
	}else{
		console.log(userCode+" "+pwd);
		$.ajax({
			method: 'get',
			url: config+'/sys/user/checkLoginIn',
			contentType: "application/json; charset=utf-8",//传到后台的数据格式
			async: true, 
			data: {'userCode':userCode,'pwd':pwd},
			dataType:'jsonp',//接收值的格式
			jsonp: 'jsoncallback', 
			success: function(data) {
				console.log(data.status);
				if(data.status==1){
					console.log(data);
					//alert(data.message);
                    sessionStorage.setItem('sessionId',data.resultMap.sessionId);
                    sessionStorage.setItem('user',JSON.stringify(data.resultMap.userDO));
                    sessionStorage.setItem('userId',data.resultMap.userDO.id);
                    window.location.href="../commonNavs/common.html";
				}else{
					alert(data.message);
					window.location.reload();
				}
			},
			error: function(result) {
				console.log(result);
			}
		});
	}
	}
});
//用户名失去焦点的时候记住
$(document).on("blur","#userName",function(){
	//检查电话号码的函数
	var phone = document.getElementById('userName').value;
	if(/^1[2345789]\d{9}$/.test(phone)){ 
    	SetUserNames();
    }
});

