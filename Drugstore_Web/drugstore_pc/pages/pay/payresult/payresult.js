//hai.L 禁止跳转结算
if(sessionStorage.getItem("isOk") == "Pay"){
	window.location.href = "../shop/orderList.html";
}
$(document).ready(function(){
	//顶部底部通用引入
	//logo点击
	$(".logo_box").click(function() {
		window.location.href = window.src+'index.html';
	});
	//顶部底部通用引入
	$(".loadTop").load("../../headerTop.html", function() {
		loadImg();
	});
	//$(".loadHeader").load("pages/mainTop.html");
	$("footer").load("../../footerCommon.html", function() {
		loadImg();
	});
	$(".loadMenu").load("../../fix_right_menu.html", function() {
		loadImg();
	});
	if(!window.user){
		window.location.href = "../../login/login.html";
	}
	function loadImg() {
		sliderHover();
		if(window.user) {
		$(".mainTopLoginName").css("display", "inline-block");
		$(".mainTopLoginName .userLoginName").text(window.user.userName);
		$(".quitOnSafeBTN").css("display", "inline-block");
		sideCartNum();
		$(".sideShopCartNum").show();
	} else {
		$(".mainTopLoginName").css("display", "none");
		$(".mainTopLoginName .userLoginName").text('');
		$(".quitOnSafeBTN").css("display", "none");
		$(".mainToptoLoginBtn").css("display", "inline-block");
	}
	$(".quitOnSafeBTN").click(function() {
		sessionStorage.removeItem("user");
		sessionStorage.clear();
		window.location.href = window.src + "pages/login/login.html";
	});
	$(".mainToptoLoginBtn").click(function() {
		window.location.href = window.src + "pages/login/login.html";
	});
	//点击顶部购物车
	$("#arrow3").click(function() {
		if(window.user) {
			window.location.href = window.src + "pages/shoppingCart/shoppingCart.html";
		} else {
			window.location.href = window.src + "pages/login/login.html";
		}

	});
	//点击顶部我的订单
	$("#arrow4").click(function() {
		if(window.user) {
			window.location.href = window.src + "pages/shop/orderList.html";
		} else {
			window.location.href = window.src + "pages/login/login.html";
		}

	});
	//点击logo
	$(".topMainLogo").click(function() {
		window.location.href = window.src + "index.html";
	});
//	点击侧边栏跳转购物车
	$(".sideCartJumpShopCart").click(function() {
		if(window.user) {
			window.location.href = window.src + "pages/shoppingCart/shoppingCart.html";
		} else {
			window.location.href = window.src + "pages/login/login.html";
		}
	});
	$(".sideCart").attr("src", window.src + "images/shop/gwc.png");
	$(".appCode").attr("src", window.src + "images/shop/shouji.png");
	$(".sideTotop").attr("src", window.src + "images/shop/xia.png");
	$(".ERCode").attr("src", window.src + "images/footer/ERCode.jpg");
	$("#arrow3 i img").attr("src", window.src + "images/header/shopCar.png");
	$(".mainTopTelImg").attr("src", window.src + "images/header/tel.png");
	$(".footerImg").attr("src", window.src + "images/header/tel.png");
	$(".footerImgStar").attr("src", window.src + "images/footer/star.png");
	$(".footerImgGood").attr("src", window.src + "images/footer/good.png");
	$(".footerImgHart").attr("src", window.src + "images/footer/hart.png");
	$(".footerImgSafe").attr("src", window.src + "images/footer/safe.png");
	$(".footerMiddle .erCodeImg").attr("src", window.src + "images/footer/ERCode.jpg");
	$(".scroll-logo").attr("src", window.src + "images/header/logo.png");
	$(".topMainLogoImg").attr("src", window.src + "images/header/logo.png");
	$(".mainTopMyOrderImg").attr("src", window.src + "images/header/order.png");
	}
	//跳首页相关链接
	$(".leftBox_bottom").click(function(){
		window.location.href = "../../../index.html";
	});
	$(".leftBox_middle_right").find("ul").find("li").eq(1).click(function(){
		window.location.href = "../../../index.html";
	});
	//数据回显
	var payText = localStorage.getItem("payText");
	var orderId = localStorage.getItem("orderId");
	var price = localStorage.getItem("price");
//	var payText = sessionStorage.getItem("payText");
//	var orderId = sessionStorage.getItem("orderId");
//	var price = sessionStorage.getItem("price");
	$(".leftBox_middle_right").find("ul").find("li").eq(0).text(payText);
	$(".leftBox_middle_right").find("ul").find("li").eq(1).find("span").eq(0).text(orderId);
	$(".leftBox_middle_right").find("ul").find("li").eq(2).text("￥" + price);
})
