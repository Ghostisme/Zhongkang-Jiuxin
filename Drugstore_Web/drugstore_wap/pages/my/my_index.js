mui.init({
	swipeBack: true //启用右滑关闭功能
});
var httpURL = 'http://192.168.18.189:8080/gcafu_commerce/rest/';
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
var userId = getCookie('userId');
console.log(userId);
$.ajax({
	type: "GET",
	//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/buyer/buyerWorkbench",
	url: config + 'buyer/buyerWorkbench',
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		"mobile": 1,
		"id": userId
	},
	dataType: 'JSONP',
	jsonp: 'callback',
	success: function(data) {
		console.log(data);
		if(data.image==""){
			$('#user_img').attr('src', "../../styles/img/my_img/userImg.jpg");
		}else if(data.image!=""||data.image!=null){
			$('#user_img').attr('src', src+data.image);
			console.log(data.image);
		}else{
			$('#user_img').error(function(){
			    $(this).attr('src',"../../styles/img/my_img/userImg.jpg");
		});
		}
		
		$('#user_name').text(data.username);
		$('#order_wait_sure').text(data.order14);
		$('#order_wait_pay').text(data.order21);
		$('#order_wait_goods').text(data.order32);
		$('#order_wait_access').text(data.order51);
		$('#resource_go_up').text(data.resourcecount);
		$('#discontCoupon').text(data.discontCoupon);//优惠券数量
	},
	error: function(data) {

	}
});
/*跳转到订单管理页面*/
var toUrl = 'order_administration.html';
$('#order').on('tap', '#all_order', function() {
	localStorage.setItem('my_to_orderad_status', '0');
	loginYesOrNo(toUrl);
});
$('#order_state').on('tap', '#order_no_confirm', function() {
	localStorage.setItem('my_to_orderad_status', '1');
	loginYesOrNo(toUrl);
});
$('#order_state').on('tap', '#order_no_pay', function() {
	localStorage.setItem('my_to_orderad_status', '2');
	loginYesOrNo(toUrl);
});

$('#order_state').on('tap', '#order_on_send', function() {
	localStorage.setItem('my_to_orderad_status', '3');
	loginYesOrNo(toUrl);
});

$('#order_state').on('tap', '#order_wait', function() {
	localStorage.setItem('my_to_orderad_status', '4');
	loginYesOrNo(toUrl);
});
/*已上传*/
$('#go_down_resource').on('tap', '#already_up', function() {
	var url = 'resource_administration.html';
	loginYesOrNo(url);
});
/*去上传*/
$('#go_down_resource').on('tap', '#go_up', function() {
	var url = '../resourceList/resourcelist_upload.html';
	loginYesOrNo(url);
});
/*跳转到资料详情*/
$('#title_head').on('tap', '#changePersonData', function() {
	var url = 'change_personal_data.html';
	loginYesOrNo(url);
});

function loginYesOrNo(toUrl) {
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = toUrl;
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href = toUrl;
	}else{
		showDialog();
	}
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
//			var id;
//			if(data.id != null) {
//				if(data.logintype == 1) {
//					if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
//						window.location.href = toUrl;
//					}else{
//						showDialog();
//					}
//					id = data.id;
//				} else if(data.logintype == 2) {
//					window.location.href = toUrl;
//				}
//			} else {
//				showDialog();
//			}
//		},
//		error: function(data) {
//
//		}
//	});
}
/*点击购物车*/
$('.mui-bar').on('tap', '#go_shopcart', function() {
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = '../shopCart/shopcart_index.html';
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href = '../shopCart/shopcart_index.html';
	}else{
		showDialog();
	}
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
//			var id;
//			if(data.id != null) {
//				if(data.logintype == 1) {
//					if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
//						window.location.href = '../shopCart/shopcart_index.html';
//					}else{
//						showDialog();
//					}
//					
//				} else if(data.logintype == 2) {
//					if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
//						window.location.href = '../shopCart/shopcart_index.html';
//					}else{
//						showDialog();
//					}
//					
//				}
//			} else {
//				if(pla=='0'){//如果是苹果手机
//					iphoneToSet();
//				}else if(pla=='1'){
//					showDialog();
//				}
//			}
//		},
//		error: function(data) {
//
//		}
//	});
});
/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../login/login.html';
		} else {}
	})
}
function iphoneToSet(){
	var btnArray = ['否', '是'];
	mui.confirm('为了您更好使用，请打开本机浏览器cookie功能，详情请见~！', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../setting/iphoneSetting.html';
		} else {}
	})
}
//判断浏览器是什么内核
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
     if(window.location.href.indexOf("?mobile")<0){
      try{
       if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
        return '0';
       }else{
        return '1';
       }
      }catch(e){}
     }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
};
var pla=ismobile(1);//0表示iPhone，1表示Android；
//console.log(pla);
/*安全退出*/
$('.mui-content').on('tap', '#exit', function() {
		sessionStorage.clear();
		delAllCookie();
	//	window.location.href = '../login/login.html';
//	localStorage.clear();
	$('#user_img').css('src','');
	$('#user_name').text('用户名');
    $('#order_wait_sure').text('0');
    $('#order_wait_pay').text('0');
    $('#order_wait_goods').text('0');
    $('#order_wait_access').text('0');
     $('#resource_go_up').text('0');
	window.location.href = "../login/login.html";
	$.ajax({
		type: "GET",
		url: config + "/base/logout",
		contentType: "application/json; charset=utf-8",
		async: true,
		data: {},
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data) {
			if(data.result == 1) {
				window.location.reload();
			}
		},
		error: function(msg) {

		}
	});
});
function delAllCookie(){  
    var date=new Date();  
    date.setTime(date.getTime()-10000);  
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);  
    if (keys) {  
        for (var i =  keys.length; i--;)  
          document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";  
    }  
}   

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

//点击分享 分享邀请码
$(".mui-content").on("tap","#shareBtn",function(){
	
	
	
});

//点击跳转优惠券
$(".mui-content").on("tap","#mydiscountCopon",function(){
	//alert(1)
	window.location.href = "wallet/Coupon.html";
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
	SetCookie(userId,expdate);
})
//点击跳转电子现金
$(".mui-content").on("tap",".eCash",function(){
	window.location.href = "wallet/e-cash.html";
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
	SetCookie(userId,expdate);
})
//电子现金
eCash();
function eCash(){
	$.ajax({
		type:"GET",
		url:config+"wallet/rebateInfo",
//		contentType:"application/json; charset=utf-8",
		async:true,
		data:{userid:userId},
//		data:{userid:1},
		dataType:'JSON',
		success:function(data){
			console.log(data);
//			if(data.code==1){
//				$(".coupons").html("");
//				$(".totalMoney").text(data.data[0].approveamount);
//				$("#Codes").val(data.data[0].invite);
				$("#inviteCodeNum").val(data.data[0].invite);
				$("#oof").val(data.data[0].invite);
				$("#oof").text(data.data[0].invite);
//			}
		},
		error:function(data){
			console.log(data);
		}
	});
}
//复制邀请码
//$('#shareBtn').click(function(){
//	var Url2=document.getElementById("inviteCodeNum");
//	console.log(Url2);
//		Url2.select(); // 选择对象
//		document.execCommand("Copy"); // 执行浏览器复制命令
//		mui.toast("已复制好，可贴粘。");
//});
		//init
//		var clipboard = new Clipboard('.btn');
		var clipboard = new Clipboard('.btn', {
	        text: function () {
	            return $("#oof").html();
	        }
    	});
		//优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
		clipboard.on('success', function(e) {
		    mui.toast('复制成功!')
		    e.clearSelection();
		});
		clipboard.on('error', function(e) {
		    mui.toast('请选择“拷贝”进行复制!')
		});
//设置
$(document).on("tap","#setBtn",function(){
	window.location.href="sets/set.html";
});
