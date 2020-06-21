$(document).ready(function(){	
	//logo点击
	$(".logo_box").click(function(){
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
	//数据回显
	var orderId=sessionStorage.getItem("orderId");
	console.log(orderId);
//	var timerCode = setInterval(function(){
//		(function(){
//			return $.ajax({
//	            type: "get",
//				url: config+"/drug/orderInfo/get",
//				async: true,
//	            data: {
//					"orderId": orderId
//				},
//	        });
//		})().then(function(data){
//			console.log(data);
//	//		$(".money").text(data.resultMap.jsPrice);
//	//		$(".money").text("￥" + data.resultMap.jsPrice);
//			if (data.resultMap.yfPrice == null) {
//				data.resultMap.yfPrice = 0;
//			};
//			$(".price").find("span").eq(1).text("￥" + data.resultMap.jsPrice);
//			var price = data.resultMap.jsPrice;
//			//微信二维码获取
//	//		alert(price)
//			return $.ajax({
//	            type: "post",
//				url: config+"/weixinpay/qcPay2",
//				async: true,
//				data: {
//					"outTradeNo": orderId,
//					"totalFee": price*100
//				},
//	        });
//		}).then(function(data){
//			console.log(data);
//			if (data.status == "1") {
//				$(".ercode_box").find("img").attr("src", data.resultMap.img);
//			} else{
//				alert(data.message);
//			}
//		});
//	},30000);
	var price;
	$.ajax({
		type: "get",
		url: config+"/drug/orderInfo/get",
		async: true,
        data: {
			"orderId": orderId
		},
		success: function(data){
			console.log(data);
			if (data.resultMap.yfPrice == null) {
				data.resultMap.yfPrice = 0;
			};
			$(".price").find("span").eq(1).text("￥" + data.resultMap.jsPrice);
			price = data.resultMap.jsPrice;
			erCode(price);			
		},
		error: function(data){
			console.log(data);
		}
	});
	var timerCode = setInterval(function(){
		erCode(price);
	},70000);
	function erCode(val){
		val = 1;
		$.ajax({
			type: "post",
			url: config+"/weixinpay/qcPay2",
			async: true,
			data: {
				"outTradeNo": orderId,
				"totalFee": val
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					$(".ercode_box").find("img").attr("src", data.resultMap.img);				
				} else{
					alert(data.message);
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	var timer = setInterval(function(){
		$.ajax({
			type:"post",
			url:config+"/weixinpay/queryOrder",
			async:true,
			data:{
				"outTradeNo": orderId
			},
			success: function(data){
				console.log(data);
				if (data.trade_state_desc == "支付成功") {
					alert(data.trade_state_desc);
					clearInterval(timer);
					window.location.href = "../pay/payresult/payresult.html";
				};
			},
			error: function(data){
				console.log(data);
			}
		});
	}, 2000);
})
