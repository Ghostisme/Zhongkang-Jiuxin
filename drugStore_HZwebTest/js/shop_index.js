$(".loadTop").load("../headerTop.html");
$(".loadHeader").load("../mainTop.html");
$("footer").load("../footerCommon.html");
$(".loadSideBar").load("../fix_right_menu.html",function(){
	sliderHover();
});

$(document).ready(function() {	
	//logo点击
	$(".logo_box").click(function() {
		window.location.href = '../../index.html';
	});
	//顶部底部通用引入
	$(".loadTop").load("../headerTop.html", function() {
		loadImg();
	});
	//$(".loadHeader").load("pages/mainTop.html");
	$("footer").load("../footerCommon.html", function() {
		loadImg();
	});
	$(".loadMenu").load("../fix_right_menu.html", function() {
		loadImg();
	});
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
		window.location.href = window.src + "index.html";

	});
	//点击顶部我的订单
	$("#arrow4").click(function() {
		window.location.href = window.src + "index.html";

	});
	//点击logo
	$(".topMainLogo").click(function() {
		window.location.href = window.src + "aboutUs.html";
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
})