
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

var gettype = 1;
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
var userId = getCookie('userId');
//console.log(userId);
var src="http://60.205.92.79:8090/image-web/upload/";
/*页面头像，企业名称，已上架，审核中，已上传后台数据*/
$.ajax({
	type: "GET",
	//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/sellerWorkbench",
	url: config + "seller/sellerWorkbench",
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		id: userId,
		mobile: 1
	},
	dataType: 'JSONP',
	JSONP: "callback",
	success: function(data) {
		console.log(data);
		var upcount = "(" + data.productcount + ")";
		var examiningcount = "(" + data.productshcount + ")";
		var uploadcount = "(" + data.resourcecount + ")";
		if(data.image==""){
			$("#companyImg img").attr("src","../../../styles/img/my_img/seller_img/companyImg.jpg");
		}else if(data.image!=""||data.image!=null){
			$("#companyImg img").attr("src",src+ data.image);
		}
		$("#CompanyName span").text(data.fsptCompany.companyname);
		$(".upcount").append(upcount);
		$(".examiningcount").append(examiningcount);
		$(".uploadcount").append(uploadcount);
	},
	error: function(data) {

	}
});

/*卖家订单ajax*/
var flag = true;
var myflag = true;

mine();
/*调取我的订单后台数据ajax*/
function mine() {
	$.ajax({
		type: "GET",
		//url:'http://192.168.18.134:8080/gcafu_commerce/rest/buyer/buyerWorkbench',
		//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/sellerWorkbench",
		url: config + "buyer/buyerWorkbench",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			id: userId,
			gettype: gettype,
			mobile: 1
		},
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

/*点击买家订单，调取后台数据*/
$("#myAndseller").on("tap", ".myOrder", function() {
	$(".mine").css("display", "block");
	$(".sell").css("display", "none");
		gettype = 1;
		mine();
	
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

/*判断是否登录*/
function loginYesOrNo(toUrl) {
	$.ajax({
		type: "GET",
		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
		url: config + "base/usersession",
		contentType: "application/json; charset=utf-8",
		async: true,
		data: {},
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data) {
			var id;
			if(data.id != null) {
				if(data.logintype == 1) {

				} else if(data.logintype == 2) {
					if(sessionStorage.getItem('userId')!='' && sessionStorage.getItem('logintype') == 2 ){
						window.location.href = toUrl;
					}else{
						showDialog();
					}
				}
			} else {
				showDialog();
			}
		},
		error: function(data) {

		}
	});
}

/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../login/login.html';
		} else {}
	})
}
/*点击购物车*/
$('.mui-bar').on('tap','#go_shopcart',function(){
	$.ajax({
	type: "GET",
//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
	url: config+"base/usersession",
	contentType: "application/json; charset=utf-8",
	async: true,
	data: {},
	dataType: 'jsonp',
	jsonp: 'jsoncallback',
	success: function(data) {
		var id;
		if(data.id!=null){
			if(data.logintype == 1){
				window.location.href = '../../shopCart/shopcart_index.html';
			}else if(data.logintype == 2){
				window.location.href = '../../shopCart/shopcart_index.html';
			}
		}else{
			showDialog();
		}
	},
	error: function(data) {
		
	}
});
});
/*安全退出*/
$(".mui-scroll").on("tap",".quitBtn",function(){
	localStorage.clear();
	sessionStorage.clear();
	$(".unsure").text('0');
	$(".unpay").text('0');
	$(".unsend").text('0');
	$(".unrecieve").text('0');
	$(".unsure").text('0');
	$(".unpay").text('0');
	$(".unsend").text('0');
	$(".unrecieve").text('0');
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
