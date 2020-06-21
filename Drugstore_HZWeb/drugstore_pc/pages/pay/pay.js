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
	if(!window.user){
		window.location.href = "../login/login.html";
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
	$(document).ready(function(e) {
		var counter = 0;
		if (window.history && window.history.pushState) {
			$(window).on('popstate', function () {
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
			window.location.href = window.src +'pages/shop/orderList.html';//跳转到个人中心
			});
		}
		window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
		window.history.forward(1);
	});
	//支付方式选择交互
	var payText;
	$(".pay").click(function() {
		var src = $(this).find(".choose_box").find("img").attr("src");
		$(".pay").find(".choose_box").find("img").attr("src", "../../images/pay/no_choose.png");
		if(src == "../../images/pay/no_choose.png") {
			$(this).find(".choose_box").find("img").attr("src", "../../images/pay/choose.png");
			payText = $(this).find(".payMsg_box").text().trim();
		}
		return payText;
	});
	var orderId = sessionStorage.getItem("orderId");
	$(".pay_left_title").find("span").text(orderId);
	var price;
	$.ajax({
		type: "get",
		//		url: "http://192.31.10.197:8003/drug/orderInfo/get",
		url: config + "/drug/orderInfo/get",
		async: true,
		data: {
			"orderId": orderId
		},
		success: function(data) {
			console.log(data);
			$(".pay_price").find("span").eq(1).text("￥" + data.resultMap.jsPrice);
			price = data.resultMap.jsPrice;
			price = 0.01;
			//			$(".money").text("￥" + data.resultMap.jsPrice);
			if(data.resultMap.yfPrice == null) {
				data.resultMap.yfPrice = 0;
			};
			$(".freight").text(data.resultMap.yfPrice);
		},
		error: function(data) {
			console.log(data);
		}
	});
	//立即支付点击

	$(".sumbit").click(function() {
		if(payText == undefined) {
			payText = "微信支付";
		}
		//初始状态未定义
		if(payText == "支付宝支付") {
			price = 0.01;
			$.ajax({
				type: "post",
				url: config + "/alipay/pcPay",
				async: true,
				data: {
					"subject": "金诃药品",
					"totalFee": price,
					'outTradeNo': orderId
				},
				success: function(data) {
					console.log(data);
					window.open('', '_self').document.write(data);
					//					var newWin = window.open('', '_self');
					//					newWin.document.write(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		} else {
			window.location.href = "../sweepCode/sweepCode.html"
			//			console.log(payText);
		}
//		sessionStorage.setItem("payText", payText);
//		sessionStorage.setItem("orderId", orderId);
//		sessionStorage.setItem("price", price);
		localStorage.setItem("payText", payText);
		localStorage.setItem("orderId", orderId);
		localStorage.setItem("price", price);
	})
})