//window.src = "/Drugstore_HZWeb/drugstore_pc/";
//window.src = "/共享线上代码/JX_Cloud/Drugstore_HZWeb/drugstore_pc/";
//window.src = "/drugstore_huazhong_pc/";
window.src = "/";
//下拉框
(function() {
	var num = 0;

	$('[data-toggle=arrowdown]').hover(function() {
		var _id = $(this).attr('id');
		num = _id.substring(5, _id.length);
		$(this).find('span')
			.removeClass('run-down')
			.addClass('run-up');
		$('#nav-box' + num).slideDown(100);
	}, function() {
		$(this).find('span')
			.removeClass('run-up')
			.addClass('run-down');
		$('#nav-box' + num).hide();
	});
	$('[data-toggle=hidden-box]').hover(function() {
		var _id = $(this).attr('id');
		num = _id.substring(7, _id.length);
		$('#arrow' + num).addClass('nav-hover')
			.find('span').removeClass('run-down')
			.addClass('run-up');
		$(this).show();
	}, function() {
		$('#arrow' + num).removeClass('nav-hover')
			.find('span').removeClass('run-up')
			.addClass('run-down');
		setTimeout(function() {
			$('#arrow' + num).find('span').removeClass('run-down');
		}, 500);
		$(this).slideUp(100);
	});
})(jQuery);

//滚动出现固定导航
//(function(){
//  $(window).scroll(function(){
//      var scTop = $(window).scrollTop(),
//          $scS = $('.scroll-search'),
//          $frS = $('.fix-right-sub'),
//          rW;
//      rW = ($(window).width() - 1190)/2;
//
//      scTop >= 200 ? $scS.slideDown(200) : $scS.slideUp(200);
//      if(scTop >= 2700 && scTop < 4400){
//          $frS.css({position: 'fixed', top: '-541px', right: rW, marginTop: ''});
//      }
//      else if(scTop >= 4400){
//          $frS.css({position: '', marginTop: 1728});
//      }
//      else{
//          $frS.css({position: ''});
//      }
//  });
//})(jQuery);
//搜索框
(function() {
	$(document).on("input", ".search-in", function() {
		if($(this).val() != "" && $(this).val() != null) {
			$(this).css("background", "transparent")
		} else {
			$(this).css("background", "url(../images/header/search.png) no-repeat 1% center");
		}
	});
	$(document).on("input", ".search-in-scroll", function() {
		if($(this).val() != "" && $(this).val() != null) {
			$(this).css("background", "transparent")
		} else {
			$(this).css("background", "url(../images/header/search.png) no-repeat 1% center");
		}
	});
})(jQuery);


//右下角固定侧边菜单交互
var slither = true;
//function sliderHover() {
//	$(".fix_right_menu ul li").find(".menuItem_text").hide();
//	$(".fix_right_menu ul li").hover(function() {
//		$(this).addClass("active").siblings().removeClass("active");
//		liIndex = $(this).index();
//		if(liIndex == 0) {
//			$(this).find(".menuItem_text").show();
//			$(this).find("img").hide();
//			$(this).siblings().find(".menuItem_text").hide();
//			if(window.user){
//				$(".sideShopCartNum").hide();
//			}
//		} else if(liIndex == 1) {
//			$(".shopCard").show();
//			$(this).find("img").hide();
//			$(this).siblings().find("img").show();
//			$(".shopCard").css({
//				"opacity": "1"
//			});
//			$(this).find(".menuItem_text").show();
//			$(this).siblings().find(".menuItem_text").hide();
//		} else {
//			$(this).find(".menuItem_text").show();
//			$(this).find("img").hide();
//			$(this).siblings().find("img").show();
//			$(this).siblings().find(".menuItem_text").hide();
//			$(this).click(function() {
//				if(slither) {
//					$('html,body').animate({
//						scrollTop: 0
//					}, 'slow');
//					slither = false;
//				} else {
//					if($(window).scrollTop() <= 0) {
//						slither = false;
//					} else {
//						slither = true;
//					}
//				}
//			})
//		}
//	}, function() {
//		$(".fix_right_menu ul li").find("img").show();
//		if(window.user){
//			$(".sideShopCartNum").show();
//		}
//		$(".shopCard").hide();
//		$(".shopCard").css({
//			"opacity": "0"
//		});
//		$(".fix_right_menu ul li").removeClass("active");
//		$(".fix_right_menu ul li").find(".menuItem_text").hide();
//	});
//}
function sliderHover() {
	$(".fix_right_menu ul li").find(".menuItem_text").hide();
	$(".fix_right_menu ul li").hover(function() {
		$(this).addClass("active").siblings().removeClass("active");
		liIndex = $(this).index();
		if(liIndex == 0) {
			$(this).find(".menuItem_text").show();
			$(this).find("img").hide();
			$(this).siblings().find(".menuItem_text").hide();
			if(window.user){
				$(".sideShopCartNum").hide();
			}
		}else {
			$(this).find(".menuItem_text").show();
			$(this).find("img").hide();
			$(this).siblings().find("img").show();
			$(this).siblings().find(".menuItem_text").hide();
			$(this).click(function() {
				if(slither) {
//					$('html,body').animate({
//						scrollTop: 0
//					}, 'slow');
					window.scrollTo(0, 0);
					slither = false;
				} else {
					if($(window).scrollTop() <= 0) {
						slither = false;
					} else {
						slither = true;
					}
				}
			})
		}
	}, function() {
		$(".fix_right_menu ul li").find("img").show();
		if(window.user){
			$(".sideShopCartNum").show();
		}
		$(".shopCard").hide();
		$(".shopCard").css({
			"opacity": "0"
		});
		$(".fix_right_menu ul li").removeClass("active");
		$(".fix_right_menu ul li").find(".menuItem_text").hide();
	});
}
//判断数组类型
function isArrayFn(value) {
	if(typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

function formatSeconds(value) {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if(secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if(minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "";
	if(hourTime > 0) {
		result = parseInt(hourTime);
	} else {
		result = "00";
	}
	if(minuteTime > 10) {
		result += ":" + parseInt(minuteTime);
	} else {
		result += ":0" + parseInt(minuteTime);
	}

	if(secondTime > 9) {
		result += ":" + parseInt(secondTime);
	} else {
		result += ":0" + parseInt(secondTime);
	}

	return result;
}



function ttzList() {
	window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2+"&fullName="+fullName;

}
function sideCartNum(){
	$.ajax({
		type: "GET",
		url: config + "/drug/cart/count",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			userId: window.user.id
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data.resultMap.total);
			if(data.resultMap.total > 99) $(".sideShopCartNum").text("99+");
			else $(".sideShopCartNum").text(data.resultMap.total);			
		},
		error: function(data) {
			
		}
	});
}
//加载右侧固定栏图标
window.user = JSON.parse(sessionStorage.getItem("user"));
console.log(window.user);
window.onload = function() {
	sliderHover();
	//登录判断
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
function ordertz() {
    if(window.user) {
        top.location.href = window.src + "pages/shop/orderList.html";
    } else {
        window.location.href = window.src + "pages/login/login.html";
    }
}