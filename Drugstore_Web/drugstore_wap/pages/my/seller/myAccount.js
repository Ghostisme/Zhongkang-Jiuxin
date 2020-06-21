//mui.init({
//	swipeBack: true //启用右滑关闭功能
//});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
/*切换我的订单和卖家订单添加下划线*/
//$("#myAndseller").on("tap", "div", function() {
//	$(this).children("span").addClass("borderBottom").parent().siblings().children().removeClass("borderBottom");
//});

var gettype = 1;
//var userId = sessionStorage.getItem('userId');
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
var userId = parseInt(getCookie('userId'));
console.log(userId);
/*页面头像，企业名称，已上架，审核中，已上传后台数据*/
$.ajax({
	type: "GET",
	//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/sellerWorkbench",
	url: config + "seller/sellerWorkbench",
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		id: userId,
//		id:1171,
		mobile: 1
	},
	//data: {id:""},
	dataType: 'JSONP',
	JSONP: "callback",
	success: function(data) {
		//			console.log(data);
		//			console.log(data.fsptCompany.companyname);
//		var html = "";
//		var companyName = "";
		var upcount = "(" + data.productcount + ")";
		var examiningcount = "(" + data.productshcount + ")";
		var uploadcount = "(" + data.resourcecount + ")";
		if(data.image==""){
			$("#companyImg img").attr("src","../../../styles/img/my_img/seller_img/companyImg.jpg");
		}else if(data.image!=""||data.image!=null){
			$("#companyImg img").attr("src",src+ data.image);
		}else{
			$('#companyImg img').error(function(){
			    $(this).attr('src',"../../../styles/img/my_img/seller_img/companyImg.jpg");
			});
		}
		$("#CompanyName span").text(data.fsptCompany.companyname);
		$(".upcount").append(upcount);
		$(".examiningcount").append(examiningcount);
		$(".uploadcount").append(uploadcount);
		if(data.statustype.indexOf("运营中心")==-1){
					$("#operatingCenter").attr("src","../../../styles/img/my_img/seller_img/opratingCenterG.png");
				}else{
					$("#operatingCenter").attr("src","../../../styles/img/my_img/seller_img/operatingCenter1.png");	
				}
				if(data.statustype.indexOf("共享工厂")==-1){
					$("#sharedFactory").attr("src","../../../styles/img/my_img/seller_img/sharedFactoryG.png");
				}else{
					$("#sharedFactory").attr("src","../../../styles/img/my_img/seller_img/sharedFactory1.png");
				}
				if(data.statustype.indexOf("供应商")==-1){
					$("#supplier").attr("src","../../../styles/img/my_img/seller_img/supplierG.png");
				}else{
					$("#supplier").attr("src","../../../styles/img/my_img/seller_img/supplier1.png");
				}
	},
	error: function(data) {

	}
});

/*卖家订单ajax*/
var flag = true;
var myflag = true;

//mine();
/*调取我的订单后台数据ajax*/
function mine() {
	//	if(myflag){
	//		var unsure="("+1+")";
	//		var unpay="("+1+")";
	//		var unsend="("+1+")";
	//		var unrecieve="("+1+")";
	//		$(".unsure").append(unsure);
	//		$(".unpay").append(unpay);
	//		$(".unsend").append(unsend);
	//		$(".unrecieve").append(unrecieve);
	//		myflag=false;
	//	}
	$.ajax({
		type: "GET",
		//url:'http://192.168.18.134:8080/gcafu_commerce/rest/buyer/buyerWorkbench',
		//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/sellerWorkbench",
		url: config + "buyer/buyerWorkbench",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			id: userId,
//			id:1171,
			gettype: gettype,
			mobile: 1
		},
		//data: {id:""},
		dataType: 'JSONP',
		jsonp: "callback",
		success: function(data) {
			console.log(data);
			var unsure = "(" + data.order14 + ")";
			var unpay = "(" + data.order21 + ")";
			var unsend = "(" + data.order32 + ")";
			var unrecieve = "(" + data.order51 + ")";
			$(".unsure").text(unsure);
			$(".unpay").text(unpay);
			$(".unsend").text(unsend);
			$(".unrecieve").text(unrecieve);
		},
		error: function(data) {

		}
	});
}
/*调取卖家订单后台数据ajax*/
sell();
$(".mine").css("display", "none");
$(".sell").css("display", "block");
function sell() {
	console.log(gettype);
	$.ajax({
		type: "GET",
		
		//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/sellerWorkbench",
		url: config + "seller/sellerWorkbench",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			id: userId,
//			id:1171,
			gettype: gettype,
			mobile: 1
		},
		//data: {id:""},
		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
			var sellunsure = "(" + data.order14 + ")";
			var sellunpay = "(" + data.order21 + ")";
			var sellunsend = "(" + data.order32 + ")";
			var sellunrecieve = "(" + data.order51 + ")";
			$(".sellunsure").text(sellunsure);
			$(".sellunpay").text(sellunpay);
			$(".sellunsend").text(sellunsend);
			$(".sellunrecieve").text(sellunrecieve);
		},
		error: function(data) {

		}
	});
}
/*点击买家订单，调取后台数据*/
$("#myAndseller").on("tap", ".myOrder", function() {
//	$(".mine").css("display", "block");
	$(".sell").css("display", "block");
//	if(myflag) {
//		gettype = 1;
//		mine();
//		myflag = false;
//	} else if(!myflag) {
//		gettype = 1;
//		mine();
//		myflag = true;
//	}
	gettype = 1;
	localStorage.setItem('seller_order_status', 0);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*点击卖家订单，调取后台数据*/
$("#myAndseller").on("tap", ".sellerOrder", function() {
	$(".mine").css("display", "none");
	$(".sell").css("display", "block");
	//	flag = true;
	if(flag) {
		gettype = 2;
		sell();
		flag = false;
	} else if(!flag) {
		gettype = 2;
		sell();
		flag = true;
	}
});

/*点击头像跳转到企业管理中心页*/
$("#companyDetail").on("tap", "div", function() {
	var url = "businessManage.html";
	loginYesOrNo(url);
});
/*点击商品管理中的已上架及审核中跳转至商品管理页面*/
$(".goodsManage").on("tap", "div", function() {
	var url = "goodsManage.html";
	loginYesOrNo(url);
});
/*点击我的优惠券跳转至优惠券页面*/
$(".purseManage").on("tap", ".pursecoupon", function() {
	var url = "../wallet/Coupon.html";
	loginYesOrNo(url);
	//	window.location.href="../resource_administration.html";
});
/*点击我的电子现金跳转至电子现金页面*/
$(".purseManage").on("tap", ".ecash", function() {
	var url = "../wallet/e-cash.html";
	loginYesOrNo(url);
	//	window.location.href="../resource_administration.html";
});
/*点击我的资源单下的已上传跳转至资源单管理页面*/
$(".resourceManage").on("tap", ".alredyUpload", function() {
	var url = "../resource_administration.html";
	loginYesOrNo(url);
	//	window.location.href="../resource_administration.html";
});
/*点击上传资源单，跳转*/
$(".resourceManage").on("tap", ".goupload", function() {
	var url = "../../resourceList/resourcelist_upload.html";
	loginYesOrNo(url);
	//	window.location.href="../../resourceList/resourcelist_upload.html"
});
/*买家未确认*/
var toUrl = "orderAdmin.html";
$(".mine").on("tap", "#order_no_confirm", function() {
	localStorage.setItem('seller_order_status', 1);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*买家未付款*/
$(".mine").on("tap", "#order_no_pay", function() {
	localStorage.setItem('seller_order_status', 2);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*买家未发货*/
$(".mine").on("tap", "#order_on_send", function() {

	localStorage.setItem('seller_order_status', 4);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*买家待收货*/
$(".mine").on("tap", "#order_wait", function() {
	localStorage.setItem('seller_order_status', 3);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*买家全部*/
$(".mine").on("tap", "#all_order_li", function() {
	localStorage.setItem('seller_order_status', 0);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});

/*卖家未确认*/
$(".sell").on("tap", "#seller_order_no_confirm", function() {
	console.log('是什么' + gettype);
	gettype = 2;
	localStorage.setItem('seller_order_status', 1);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*卖家未付款*/
$(".sell").on("tap", "#seller_wait_no_pay", function() {
	gettype = 2;
	localStorage.setItem('seller_order_status', 2);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*卖家未发货*/
$(".sell").on("tap", "#seller_wait_no_send", function() {
	gettype = 2;
	localStorage.setItem('seller_order_status', 4);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*卖家待收货*/
$(".sell").on("tap", "#seller_wait_no_access", function() {
	gettype = 2;
	localStorage.setItem('seller_order_status', 3);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});
/*卖家全部*/
$(".sell").on("tap", "#seller_wait_all_order", function() {
	gettype = 2;
	localStorage.setItem('seller_order_status', 0);
	localStorage.setItem('seller_goods_status', gettype);
	loginYesOrNo(toUrl);
});

/*判断是否登录*/
function loginYesOrNo(toUrl) {
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = toUrl;
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href = toUrl;
	}{
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
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
//						window.location.href = toUrl;
//					}else{
//						showDialog();
//					}
//				}
//			}else if(data.result == 2){
//				showDialog();
//			}
//		},
//		error: function(data) {
//
//		}
//	});
}

/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../../login/login.html';
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
/*点击购物车*/
$('.mui-bar').on('tap','#go_shopcart',function(){
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = '../../shopCart/shopcart_index.html';
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href = '../../shopCart/shopcart_index.html';
	}else{
		showDialog();
	}
//	$.ajax({
//	type: "GET",
////	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
//	url: config+"base/usersession",
//	contentType: "application/json; charset=utf-8",
//	async: true,
//	data: {},
//	dataType: 'jsonp',
//	jsonp: 'jsoncallback',
//	success: function(data) {
//		var id;
//		if(data.id!=null){
//			if(data.logintype == 1){
//				window.location.href = '../../shopCart/shopcart_index.html';
//			}else if(data.logintype == 2){
//				window.location.href = '../../shopCart/shopcart_index.html';
//			}
//		}else{
//			if(pla=='0'){//如果是苹果手机
//					iphoneToSet();
//				}else if(pla=='1'){
//					showDialog();
//					mui.toast('您还没有登录，请登录！');
//				}
//		}
//	},
//	error: function(data) {
//		
//	}
//});
});
/*安全退出*/
$(".mui-scroll").on("tap",".quitBtn",function(){
	localStorage.clear();
	sessionStorage.clear();
	delAllCookie();
	$('#companyImg img').css('src','../../../styles/img/my_img/seller_img/companyImg.jpg');
	$('#CompanyName span').text('企业名称');
	$(".unsure").text('0');
	$(".unpay").text('0');
	$(".unsend").text('0');
	$(".unrecieve").text('0');
	$(".sellunsure").text('0');
	$(".sellunpay").text('0');
	$(".sellunsend").text('0');
	$(".sellunrecieve").text('0');
	$('.upcount').text('0');
	$('.examiningcount').text('0');
	$('.uploadcount').text('0');
	window.location.href="../../login/login.html";
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
				if(data.data[0].invite==null){
					$("#oof").text("");
				}else{
					$("#oof").text(data.data[0].invite);
				}
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
//		Url2.select(); // 选择对象
//		if($("#inviteCodeNum").val()!=""&&$("#inviteCodeNum").val()!=null){
//			document.execCommand("Copy"); // 执行浏览器复制命令
//			mui.toast("已复制好，可贴粘。");
//		}else{
//			mui.toast("暂无邀请码，无法复制");
//		}
//		
//});
//init
//		var clipboard = new Clipboard('.btn');
var clipboard = new Clipboard('.btn', {
	text: function() {
		return $("#oof").html();
	}
});
//优雅降级:safari 版本号>=10,提示复制成功;否则提示需在文字选中后，手动选择“拷贝”进行复制
clipboard.on('success', function(e) {
	if($("#oof").text()!=""&&$("#oof").text()!=null){
		mui.toast('复制成功!')
		e.clearSelection();
	}
});
clipboard.on('error', function(e) {
	mui.toast('请选择“拷贝”进行复制!')
});
//设置
$(document).on("tap","#setBtn",function(){
	window.location.href="../sets/set.html";
});
