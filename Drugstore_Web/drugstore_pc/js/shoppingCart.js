$(".loadTop").load("../headerTop.html", function() {
	loadImg();
});
//$(".loadHeader").load("pages/mainTop.html");

$(".loadSideBar").load("../fix_right_menu.html", function() {
	loadImg();
});
$("footer").load("../footerCommon.html", function() {
	loadImg();
});
sessionStorage.removeItem("haveNotBack");
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
function topCount(){
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
//			console.log(data.resultMap.total);
			$(".topTotal").text(data.resultMap.total);
		},
		error: function(data) {
			
		}
	});
}
var isCheckedArrMain='';
if(!window.user) {
	window.location.href = window.src + "pages/login/login.html";
}
var userId = window.user.id;
var productOrderJumpId = localStorage.getItem("prodcutIds");
function getParam(paramName) { //获取url参数
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
var packageCheckedNode = 0; //套餐选择的checkbox数量
var packageCheckedNum = 0; //套餐选择商品的总数
var packageCheckedPrice = 0; //套餐选择的总价
function packageTotalPrice(){//计算所有套餐的价格
	var packageCartProductList = $(".packageSimpleOrder");
	packageCheckedNode = 0; //套餐选择的checkbox数量
	packageCheckedNum = 0; //套餐选择商品的总数
	packageCheckedPrice = 0; //套餐选择的总价
	for(var i = 0; i < packageCartProductList.length; i++) {
//		alert(checkedTrue)
		if($(packageCartProductList[i]).find(".cbox").hasClass("checked")) {
			//				console.log($(cartProductList[i]).find(".numItxt").val().trim());
			var checkedsimpleOrderList=$(packageCartProductList[i]).find('.simpleOrder');
			for(var k=0;k<checkedsimpleOrderList.length;k++){
					packageCheckedPrice += parseFloat($(checkedsimpleOrderList[k]).find(".price").text().trim()) * parseFloat($(checkedsimpleOrderList[k]).find(".packageSimpleProductNum").text().trim());
					packageCheckedNum += parseFloat($(checkedsimpleOrderList[k]).find(".packageSimpleProductNum").text().trim());
			}
			packageCheckedNode++;
		}
	}
}
function checkedAllPackage(){
	var packageCartProductList = $(".packageSimpleOrder");
	for(var i = 0; i < packageCartProductList.length; i++) {
		$(packageCartProductList[i]).find(".cbox").addClass("checked");
	}
}
function checkedNoPackage(){
	var packageCartProductList = $(".packageSimpleOrder");
	for(var i = 0; i < packageCartProductList.length; i++) {
		$(packageCartProductList[i]).find(".cbox").removeClass("checked");
	}
}
$(document).on("click", ".cbox", function() { //点击单个checkbox时
	var cartProductList = $(".normalProduct .simpleOrder");
	var totalSimpleLen=$(".packageSimpleOrder").length+$(".normalProduct").length;
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	this.className = /checked/ig.test(this.className) ? this.className.replace('checked', '') : (this.className + ' checked');
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			//				console.log($(cartProductList[i]).find(".numItxt").val().trim());
			checkedPrice += parseFloat($(cartProductList[i]).find(".price").text().trim()) * parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNum += parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNode++;
		}
	}
	packageTotalPrice();
	console.log(checkedNode);
	console.log(packageCheckedNode);
	console.log(totalSimpleLen);
	if(checkedNode+packageCheckedNode == totalSimpleLen) {
		$("#checkAllTop").addClass("checked");
		$(".checkBoxFooterAll").addClass("checked");
		checkedTrue = false;
		checkedBottomTrue = false;
	} else {
		$("#checkAllTop").removeClass("checked");
		$(".checkBoxFooterAll").removeClass("checked");
		checkedTrue = true;
		checkedBottomTrue = true;
	}
	
	console.log(checkedPrice+packageCheckedPrice);
	$(".TotalPrice").text((checkedPrice+packageCheckedPrice).toFixed(2));
});
//点击上面的全选
var checkedTrue = true;
$(".cTbox").click(function() {
	var cartProductList = $(".normalProduct .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	for(var i = 0; i < cartProductList.length; i++) {
		//		console.log($(cartProductList[i]).find(".cbox"));
		if(checkedTrue == true) {
			$(cartProductList[i]).find(".cbox").addClass("checked");
			checkedPrice += parseFloat($(cartProductList[i]).find(".price").text().trim()) * parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNum += parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNode++;
		} else {
			$(cartProductList[i]).find(".cbox").removeClass("checked");
			checkedPrice = 0.00;
			checkedNum = 0;
			checkedPrice = 0;
		}
	}	
	
	if(checkedTrue == true) {
		checkedTrue = false;
		checkedBottomTrue=false;
		$(".checkBoxFooterAll").addClass("checked");
		checkedAllPackage();
	} else {
		checkedTrue = true;
		checkedBottomTrue = true;
		$(".checkBoxFooterAll").removeClass("checked");
		checkedNoPackage();
	}
	packageTotalPrice();
	console.log(checkedPrice+packageCheckedPrice);
	$(".TotalPrice").text((checkedPrice+packageCheckedPrice).toFixed(2));
});
//底下全选
var checkedBottomTrue = true;
$(".checkBoxFooterAll").click(function() {
	var cartProductList = $(".normalProduct .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	for(var i = 0; i < cartProductList.length; i++) {
		console.log($(cartProductList[i]).find(".cbox"));
		if(checkedBottomTrue == true) {
			$(cartProductList[i]).find(".cbox").addClass("checked");
			checkedPrice += parseFloat($(cartProductList[i]).find(".price").text().trim()) * parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNum += parseFloat($(cartProductList[i]).find(".numItxt").val().trim());
			checkedNode++;
		} else {
			$(cartProductList[i]).find(".cbox").removeClass("checked");
			$(cartProductList[i]).find(".cbox").removeClass("checked");
			checkedPrice = 0.00;
			checkedNum = 0;
			checkedPrice = 0;
		}
	}
	
	if(checkedBottomTrue == true) {
		checkedBottomTrue = false;
		checkedTrue = false;
		$("#checkAllTop").addClass("checked");
		checkedAllPackage();
	} else {
		checkedBottomTrue = true;
		checkedTrue = true;
		$("#checkAllTop").removeClass("checked");
		checkedNoPackage();
	}
	packageTotalPrice();
	console.log(checkedPrice+packageCheckedPrice);
	$(".TotalPrice").text((checkedPrice+packageCheckedPrice).toFixed(2));
});

//滚动出现固定导航
(function() {
	console.log($(window).height());
	//	console.log($(document).height()-762);
	if($(window).height() < $(document).height()) {
		$('.cart-toolbar').addClass("fixed-bottom");
	} else {
		$('.cart-toolbar').removeClass("fixed-bottom");
	}
	$(window).scroll(function() {
		var scTop = $(window).scrollTop(),
			wHeight = $(document).height(),
			$scS = $('.cart-toolbar'),
			$frS = $('#shopcartSection').height(),
			rW;
		rW = ($(window).width() - 1190) / 2;
		// 窗口可视范围的高度
		var height = getClientHeight(),
			// 窗口滚动条高度
			theight = getScrollTop(),
			// 窗口可视范围的高度
			rheight = getScrollHeight(),
			// 滚动条距离底部的高度
			bheight = rheight - theight - height;
		//		console.log(bheight);
		if($frS >= scTop - 240 && bheight > 522) {
			$scS.addClass("fixed-bottom")
		} else {
			$scS.removeClass("fixed-bottom")
		}
	});

	//  监听窗口变化
	$(window).resize(function() {
		if($(window).height() < $(document).height()) {
			$('.cart-toolbar').addClass("fixed-bottom");
		} else {
			$('.cart-toolbar').removeClass("fixed-bottom");
		}

		var scTop = $(window).scrollTop(),
			wHeight = $(document).height(),
			$scS = $('.cart-toolbar'),
			$frS = $('#shopcartSection').height(),
			rW;
		rW = ($(window).width() - 1190) / 2;
		// 窗口可视范围的高度
		var height = getClientHeight(),
			// 窗口滚动条高度
			theight = getScrollTop(),
			// 窗口可视范围的高度
			rheight = getScrollHeight(),
			// 滚动条距离底部的高度
			bheight = rheight - theight - height;
		//		console.log(bheight);
		if($frS >= scTop - 240 && bheight > 522) {
			$scS.addClass("fixed-bottom")
		} else {
			$scS.removeClass("fixed-bottom")
		}
	})
})(jQuery);

function getScrollHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

function getScrollTop() {
	var scrollTop = 0;
	if(document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if(document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	} else {
		var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
	}
	return clientHeight;
}
//获取购物车列表
$(function() {
	getshopCartList();
})

function getshopCartList() {
	$.ajax({
		type: "GET",
		url: config + "/drug/cart/list",
		contentType: "json; charset=utf-8",
		async: false,
		data: {
			userId: userId
		},
		dataType: 'JSON',
		//	JSONP: "callback",
		success: function(data) {
			topCount();
			sideCartNum();
			console.log(data);
			//		alert(data.code);
			//		var listArr = new Array();
			if(data.status == 1) {
				var html = '';
				var ulNode = $('.cartProductList');
				//				$('#ul_pro').html('');
				pageCount = Math.ceil(data.resultMap.count / 10);
				$('.cartProductList').html('');
				if(data.resultMap.drugInfoList.length == 0) {
					$('.settleAccountsBar').css("display", "none");
					$('.cartProductNoList').css("display", "block");
				} else {
					$('.settleAccountsBar').css("display", "block");
					$('.cartProductNoList').css("display", "none");
				}
				for(var i = 0; i < data.resultMap.drugInfoList.length; i++) {
					var cHtml = '';
					var drugInfo = data.resultMap.drugInfoList[i].info;
					console.log(drugInfo);
					if(drugInfo){
						var mealList=drugInfo.mealList;
						if(data.resultMap.drugInfoList[i].type==0){
							cHtml +='<div class="packageSimpleOrder grayColors">'
						}else{
							cHtml +='<div class="packageSimpleOrder">'
						}
						cHtml +='<div class="packageTitle">';
						cHtml += '<div class="simpleCheckbox lf detailStyle packageSimpleCheckbox" style="height:50px;linne-height:50px;">';
						cHtml += '<span class="spanCheckBox">';
						if(data.resultMap.drugInfoList[i].type==0){//套餐失效
							cHtml += '<span class="cboxno noClick">';
						}else{
							cHtml += '<span class="cbox">';
						}
						cHtml += '</span>';
						cHtml += '</span>';
						cHtml += '</div>';
						if(data.resultMap.drugInfoList[i].type==0){
							cHtml +='<span class="lf"><span style="font-weight:bold;">【失效套装】</span>'+drugInfo.mealName+'</span>';
						}else{
							cHtml +='<span class="lf"><span style="font-weight:bold;">【套装】</span>'+drugInfo.mealName+'</span>';
						}
						cHtml += '<div class="packageCurrentDrugId" style="display:none;">' + drugInfo.id + '</div>';
						cHtml += '<div class="cid" style="display:none;">' + data.resultMap.drugInfoList[i].cid + '</div>';
						if(data.resultMap.drugInfoList[i].sign != "" && data.resultMap.drugInfoList[i].sign != null) {
							cHtml += '<div class="sign" style="display:none;">' + data.resultMap.drugInfoList[i].sign + '</div>';
						}
//						cHtml += '<div class="packageTotalAndNumBox">';
						cHtml += '<div class="detailStyle rt delBox"style="float:right;height:50px;line-height:50px;margin-right:74px;">';
						//					cHtml += '<!--<div class="look">查看</div>-->';			
						cHtml += '<span class="deleteImg">';
						cHtml += '<span>删除</span>';
						cHtml += '</span>';
						cHtml += '</div>';
						cHtml += '<div class="detailStyle rt changeQuantityBox packageRed">套餐价:<span>¥<span class="packageTopPrice">'+drugInfo.countPrice+'</span></span></div>';
						cHtml += '<div class="detailStyle rt changeQuantityBox" style="margin-right:6px;margin-top:10px;">';
						cHtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_down" class="decrement disabled lf packageDec">-</a>';
						cHtml += '<input autocomplete="off" type="text" class="numItxt packageNumItxt" value="' + data.resultMap.drugInfoList[i].drugNum + '" class="changeQuantity packageChangeQuantity" minnum="1">';
						cHtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_up" class="increment rt packageInc">+</a>';
//						cHtml += '</div>';
						cHtml += '</div>';
						
						cHtml +='</div>'
						
						for(var k = 0; k < mealList.length; k++){
							cHtml += '<div class="simpleOrder"style="border-top:0px;padding-left:61px;">';
//							if(mealList[k].sign != "" && mealList[k].sign != null) {
//								cHtml += '<div class="sign" style="display:none;">' + mealList[k].sign + '</div>';
//							}
							cHtml += '<div class="currentqty" style="display:none;">' + mealList[k].qty + '</div>';
							cHtml += '<div class="currentDrugId" style="display:none;">' + mealList[k].drugId + '</div>';
							cHtml += '<div class="cid" style="display:none;">' + mealList[k].cid + '</div>';
//							cHtml += '<div class="simpleCheckbox lf detailStyle">';
//							//					cHtml += '<!--<input type="checkbox" name="test" />-->';			
//							cHtml += '<span class="spanCheckBox">';
//							cHtml += '<span class="cbox">';
//							cHtml += '</span>';
//							cHtml += '</span>';
//							cHtml += '</div>';
							cHtml += '<div class="productImg lf detailStyle">';
							if(mealList[k].fileUrl!=null&&mealList[k].fileUrl!=""){
								cHtml += '<img src="'+mealList[k].fileUrl+'" alt="" />';
							}else{
								cHtml += '<img src="../../images/shopCart/productImg1.png" alt="" />';
							}
							cHtml += '</div>';
							cHtml += '<div class="nameParent lf detailStyle">';
							cHtml += '<div style="line-height:1.3;" class="productName">' + mealList[k].fullName + '</div>';
							cHtml += '<div style="line-height:1.3;" class="specs">' + mealList[k].specs + '</div>';
							cHtml += '</div>';
							cHtml += '<div class="detailStyle lf priceBox">';
							cHtml += '<span>¥</span>';
							cHtml += '<span class="price">' + mealList[k].presentPrice + '</span>';
							if(mealList[k].drugNum!=1){
								cHtml += '<span class="RMBmoney_unit">/' +mealList[k].drugNum+ mealList[k].unit + '</span>';
							}else{
								cHtml += '<span class="RMBmoney_unit">/'  +mealList[k].unit + '</span>';
							}
							
//							cHtml += '<div class="fullMinus">满<span class="full">600</span>减<span class="minus">200</span></div>';			
							cHtml += '<div class="fullMinus">';
							cHtml += '<span class="drugprice">¥' + mealList[k].drugPrice +'/'+ mealList[k].unit  + '</span>';
							cHtml += '</div>';
							cHtml += '</div>';
							cHtml += '<div class="detailStyle lf changeQuantityBox" style="text-align:center;">';
							cHtml += '<a href="javascript:void(0);"class="packageSimpleProductNum" style="display:none;">'+data.resultMap.drugInfoList[i].drugNum+'</a>';
							cHtml += '</div>';
							cHtml += '<div class="detailStyle lf subtotalBox">￥';
							cHtml += '<span class="subtotal">' + mealList[k].commodityCountPirce.toFixed(2) + '</span>';
							cHtml += '</div>';
//							cHtml += '<div class="detailStyle lf delBox">';
//							//					cHtml += '<!--<div class="look">查看</div>-->';			
//							cHtml += '<span class="deleteImg">';
//							cHtml += '<span>删除</span>';
//							cHtml += '</span>';
//							cHtml += '</div>';
							cHtml += '</div>';
						}
						
						cHtml += '</div>';
					}else{
						cHtml +='<div class="normalProduct">';
						cHtml += '<div class="simpleOrder">';
						if(data.resultMap.drugInfoList[i].sign != "" && data.resultMap.drugInfoList[i].sign != null) {
							cHtml += '<div class="sign" style="display:none;">' + data.resultMap.drugInfoList[i].sign + '</div>';
						}
						cHtml += '<div class="currentqty" style="display:none;">' + data.resultMap.drugInfoList[i].qty + '</div>';
						cHtml += '<div class="currentDrugId" style="display:none;">' + data.resultMap.drugInfoList[i].drugId + '</div>';
						cHtml += '<div class="cid" style="display:none;">' + data.resultMap.drugInfoList[i].cid + '</div>';
						cHtml += '<div class="simpleCheckbox lf detailStyle">';
						//					cHtml += '<!--<input type="checkbox" name="test" />-->';			
						cHtml += '<span class="spanCheckBox">';
						cHtml += '<span class="cbox">';
						cHtml += '</span>';
						cHtml += '</span>';
						cHtml += '</div>';
						cHtml += '<div class="productImg lf detailStyle">';
						if(data.resultMap.drugInfoList[i].imgUrl!=null&&data.resultMap.drugInfoList[i].imgUrl!=""){
							cHtml += '<img src="'+data.resultMap.drugInfoList[i].imgUrl+'" alt="" />';
						}else{
							cHtml += '<img src="../../images/shopCart/productImg1.png" alt="" />';
						}
						cHtml += '</div>';
						cHtml += '<div class="nameParent lf detailStyle">';
						cHtml += '<div style="line-height:1.3;" class="productName">' + data.resultMap.drugInfoList[i].fullName + '</div>';
						cHtml += '<div style="line-height:1.3;" class="specs">' + data.resultMap.drugInfoList[i].specs + '</div>';
						cHtml += '</div>';
						cHtml += '<div class="detailStyle lf priceBox">';
						cHtml += '<span>¥</span>';
						cHtml += '<span class="price">' + data.resultMap.drugInfoList[i].retailPrice + '</span>';
						cHtml += '<span class="RMBmoney_unit">/' + data.resultMap.drugInfoList[i].unit1 + '</span>';
						//					cHtml += '<!--<div class="fullMinus">满<span class="full">600</span>减<span class="minus">200</span></div>-->';			
						cHtml += '</div>';
						cHtml += '<div class="detailStyle lf changeQuantityBox">';
						cHtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_down" class="decrement disabled lf">-</a>';
						cHtml += '<input autocomplete="off" type="text" class="numItxt" value="' + data.resultMap.drugInfoList[i].drugNum + '" class="changeQuantity" minnum="1">';
						cHtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_up" class="increment rt">+</a>';
						cHtml += '</div>';
						cHtml += '<div class="detailStyle lf subtotalBox">￥';
						cHtml += '<span class="subtotal">' + data.resultMap.drugInfoList[i].countPrice.toFixed(2) + '</span>';
						cHtml += '</div>';
						cHtml += '<div class="detailStyle lf delBox">';
						//					cHtml += '<!--<div class="look">查看</div>-->';			
						cHtml += '<span class="deleteImg">';
						cHtml += '<span>删除</span>';
						cHtml += '</span>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
					}
					ulNode.append(cHtml);
				}
				//				如果是从再来一单跳转过来的,默认选上再来一单物品
				console.log(productOrderJumpId);
				if(getParam("page") == "orderpage") { //从订单跳转过来的
					if(productOrderJumpId != '' && productOrderJumpId != null) {
						var simpleOrderLen = $(".normalProduct .simpleOrder");
						var packageSimpleOrder=$(".packageSimpleOrder");
						var checkedPrice = 0; //选择的总价
						if(productOrderJumpId.indexOf(",") == -1) {
							var productChosedIds = productOrderJumpId;
							for(var j = 0; j < simpleOrderLen.length; j++) {
								if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds) {
									$(simpleOrderLen[j]).find(".cbox").addClass("checked");
									checkedPrice += parseFloat($(simpleOrderLen[j]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".numItxt").val().trim());
									console.log(checkedPrice);
									
								}
							}
//							遍历套餐商品,将再次购买商品选中
							for(var t = 0; t < packageSimpleOrder.length; t++) {
									if($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == productChosedIds) {
										//									$(packageSimpleOrder[j]).find(".cbox").trigger("click");
										$(packageSimpleOrder[t]).find(".cbox").addClass("checked");
										console.log(checkedsPrice);
										checkedPrice += parseFloat($(packageSimpleOrder[t]).find(".packageTopPrice").text().trim());
										
									}
								}
							$(".TotalPrice").text(checkedPrice.toFixed(2));
						} else {
							var productChosedIds = productOrderJumpId.split(",");
							for(var k = 0; k < productChosedIds.length; k++) {
								for(var j = 0; j < simpleOrderLen.length; j++) {
									console.log($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds[k]);
									if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds[k]) {
										$(simpleOrderLen[j]).find(".cbox").addClass("checked");
										checkedPrice += parseFloat($(simpleOrderLen[j]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".numItxt").val().trim());
										console.log(checkedPrice);
										
									}
								}
								//							遍历套餐商品,将再次购买商品选中
							for(var t = 0; t < packageSimpleOrder.length; t++) {
									console.log($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == productChosedIds[k]);
									if($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == productChosedIds[k]) {
										//									$(packageSimpleOrder[j]).find(".cbox").trigger("click");
										$(packageSimpleOrder[t]).find(".cbox").addClass("checked");
										console.log(checkedsPrice);
										checkedPrice += parseFloat($(packageSimpleOrder[t]).find(".packageTopPrice").text().trim());
									}
								}
							}
							$(".TotalPrice").text(checkedPrice.toFixed(2));
						}
						console.log(isCheckedArrMain)
						if(isCheckedArrMain.length>0){
							var checkedsPrice = 0; //选择的总价
							for(var k = 0; k < isCheckedArrMain.length; k++) {
		//						遍历普通商品，更新购物车的时候将以前选中的普通商品继续勾选上并重新计算总价
								for(var s = 0; s < simpleOrderLen.length; s++) {
									console.log($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]);
									if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
										//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
										$(simpleOrderLen[s]).find(".cbox").addClass("checked");
										console.log(checkedsPrice);
										checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".numItxt").val().trim());
		//								$(".TotalPrice").text(checkedsPrice.toFixed(2));
									}
								}
		//						遍历套餐商品，更新购物车的时候将以前选中的套餐商品继续勾选上并重新计算总价
								for(var t = 0; t < packageSimpleOrder.length; t++) {
									console.log($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == isCheckedArrMain[k]);
									if($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == isCheckedArrMain[k]) {
										//									$(packageSimpleOrder[j]).find(".cbox").trigger("click");
										$(packageSimpleOrder[t]).find(".cbox").addClass("checked");
										console.log(checkedsPrice);
										checkedsPrice += parseFloat($(packageSimpleOrder[t]).find(".packageTopPrice").text().trim());
										
									}
								}
							}
							$(".TotalPrice").text(checkedsPrice.toFixed(2));
						}
						
					}
				} else {
					var simpleOrderLen = $(".normalProduct .simpleOrder");
					var packageSimpleOrder=$(".packageSimpleOrder");
					var checkedsPrice = 0; //选择的总价
					console.log("checkedsPrice",isCheckedArrMain);
					for(var k = 0; k < isCheckedArrMain.length; k++) {
//						遍历普通商品，更新购物车的时候将以前选中的普通商品继续勾选上并重新计算总价
						for(var s = 0; s < simpleOrderLen.length; s++) {
							console.log($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]);
							if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
								//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
								$(simpleOrderLen[s]).find(".cbox").addClass("checked");
								console.log(checkedsPrice);
								checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".numItxt").val().trim());
//								$(".TotalPrice").text(checkedsPrice.toFixed(2));
							}
						}
//						遍历普通商品，更新购物车的时候将以前选中的套餐商品继续勾选上并重新计算总价
						for(var t = 0; t < packageSimpleOrder.length; t++) {
							console.log($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == isCheckedArrMain[k]);
							if($(packageSimpleOrder[t]).find(".packageCurrentDrugId").text() == isCheckedArrMain[k]) {
								//									$(packageSimpleOrder[j]).find(".cbox").trigger("click");
								$(packageSimpleOrder[t]).find(".cbox").addClass("checked");
								console.log(checkedsPrice);
								checkedsPrice += parseFloat($(packageSimpleOrder[t]).find(".packageTopPrice").text().trim());
								
							}
						}
					}
					$(".TotalPrice").text(checkedsPrice.toFixed(2));
				}
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
	
	$(document).on("click",".productName",function(event){
		var rec=$(this).parent().parent().find(".currentDrugId").text();
		console.log(rec)
		window.location.href="../shop/shop_des.html?rec="+rec;			
	});
}
//计算加减按钮的时候的id数组
function IdArr(){
		var isCheckedArr = [];
		var cartProductList = $(".normalProduct .simpleOrder");
		var packageCartProductList=$(".packageSimpleOrder");
		for(var i = 0; i < cartProductList.length; i++) {
			if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
				isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
			}
		}
		for(var i = 0; i < packageCartProductList.length; i++) {
	//		alert(checkedTrue)
			if($(packageCartProductList[i]).find(".cbox").hasClass("checked")) {
				isCheckedArr.push($(packageCartProductList[i]).find(".packageCurrentDrugId").text());
			}
		}
		return isCheckedArr;
}
$(document).on("click", ".decrement", function() { //减
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var isCheckedArr = [];
	if($(this).parent().find(".numItxt").val() > 1) {
		var parSubNum = parseInt($(this).parent().find(".numItxt").val());
		parSubNum--;
		$(this).parent().find(".numItxt").val(parSubNum);
		var currentPronum = $(this).parent().find(".numItxt").val();
		$(".mask").css("display","block");
		isCheckedArrMain=IdArr();
		upDateCart(currnetCID, currentPronum);
	}
});

$(document).on("click", ".increment", function() { //加
	var parNum = parseInt($(this).parent().find(".numItxt").val());
	var isCheckedArr = [];
	var storeNum=Number($(this).parent().parent().find('.currentqty').text().trim());
//	packageDec   packageChangeQuantity
	if($(this).hasClass('packageInc')){
		parNum++;
	}else{
		if(parNum<storeNum){
			parNum++;
		}else{
			parNum =storeNum;
			$(".messageBG").css("display", "block");
			$(".messageBG .messageWarnsText").text("库存不足");
		}
	}
	
	$(this).parent().find(".numItxt").val(parNum);
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var currentPronum = $(this).parent().find(".numItxt").val();
	console.log(currentPronum,"currentPronum")	
	isCheckedArrMain=IdArr();
	$(".mask").css("display","block");
	upDateCart(currnetCID, currentPronum);
});
//输入数量时变化
$(document).on("change", ".numItxt", function() { 
	var parNum = parseInt($(this).val());
	var isCheckedArr = [];
	var storeNum=Number($(this).parent().parent().find('.currentqty').text().trim());
	if($(this).hasClass('packageNumItxt')){
		if($(this).val()<1){
			parNum =1;
		}else{
			parNum =parseInt($(this).val());
		}
	}else{
		if(parNum<=storeNum){
			parNum =parseInt($(this).val());
		}else{
			parNum =storeNum;
		}
	}
	
	$(this).val(parNum);
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var currentPronum = $(this).val();
//	var cartProductList = $(".cartProductList .simpleOrder");
//	for(var i = 0; i < cartProductList.length; i++) {
//		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
//			console.log(isCheckedArr)
//			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
//		}
//	}
	isCheckedArrMain=IdArr();
	
	upDateCart(currnetCID, currentPronum);
});
//	更新购物车
function upDateCart(currnetCID, currentPronum) {
	$.ajax({
		type: "GET",
		url: config + "/drug/cart/update",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			cid: currnetCID,
			drugNum: currentPronum,
			userId: userId
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data);
			//					var data = JSON.parse(data);
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
			if(data.status == 1) {
				getshopCartList();
				$(".mask").css("display","none");
			} else {
				$(".mask").css("display","none");
				getshopCartList();
			}
		},
		error: function(data) {
			alert("服务器错误，请稍后重试！");
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
		}
	});
}

function delProduct(cartlist) {
	$.ajax({
		type: "GET",
		url: config + "/drug/cart/delete",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			cid: cartlist,
			userId: userId
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data);
			//					var data = JSON.parse(data);
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
			if(data.status == 1) {
				alert(data.message);
				getshopCartList();
				sideCartNum();
				$(".bgDel").css("display", "none");
			} else {
				alert(data.message);
				getshopCartList();
				sideCartNum();
				$(".bgDel").css("display", "none");
			}
		},
		error: function(data) {
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
		}
	});
}
var delcart;
$(document).on("click", ".delBox .deleteImg", function() {
	var currentCid = $(this).parent().parent().find(".cid").text();
	var cidArr = [];
	cidArr.push(currentCid);
	delcart = JSON.stringify(cidArr);
	$(".delWarnsText").text("您确定要删除该商品吗？");
	$(".bgDel").css("display", "block");
});
//点击确认删除
$(".delDialogSureBtn").click(function() {
	delProduct(delcart);
	$("#checkAllTop").removeClass("checked");
	$(".checkBoxFooterAll").removeClass("checked");
	$(".TotalPrice").text("0.00");
})
//点击关闭按钮
$(document).on("click", ".closed", function() {
	$(this).parent().parent().parent().css("display", "none");
});
//取消按钮
$(document).on("click", ".cancelBtns", function() {
	$(this).parent().parent().parent().css("display", "none");
});
//计算删除时的cid数组
function cidArr(){
		var arrCartIds = [];
		var cartProductList = $(".normalProduct .simpleOrder");
		var packageCartProductList=$(".packageSimpleOrder");
		var checkedAllNode = 0;
		for(var i = 0; i < cartProductList.length; i++) {
			if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
				checkedAllNode++;
				arrCartIds.push($(cartProductList[i]).find(".cid").text());
			}
		}
		for(var i = 0; i < packageCartProductList.length; i++) {
			if($(packageCartProductList[i]).find(".cbox").hasClass("checked")) {
				checkedAllNode++;
				arrCartIds.push($(packageCartProductList[i]).find(".packageTitle .cid").text());
			}
		}
		return {arrCartIds:arrCartIds,checkedAllNode:checkedAllNode};
}
//点击结算条的删除
$(".remove-batch").click(function() {
//	var cartProductList = $(".cartProductList .simpleOrder");
//	var checkedNode = 0; //选择的checkbox数量
//	var arrIds = []; //商品id的arr
//	for(var i = 0; i < cartProductList.length; i++) {
//		//		console.log($(cartProductList[i]).find(".cbox"));
//		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
//			//$(cartProductList[i]).find(".cbox").addClass("checked");
//			checkedNode++;
//			arrIds.push($(cartProductList[i]).find(".cid").text());
//			delcart = JSON.stringify(arrIds);
//		}
//	}
//	console.log(checkedNode)
//	if(checkedNode > 0) {
//		$(".delWarnsText").text("您确定要删除选中商品吗？");
//		$(".bgDel").css("display", "block");
//	} else {
//		$(".messageBG").css("display", "block");
//	}
	var arrIds=(cidArr()).arrCartIds;
	delcart = JSON.stringify(arrIds);
	if((cidArr()).checkedAllNode > 0) {
		$(".delWarnsText").text("您确定要删除选中商品吗？");
		$(".bgDel").css("display", "block");
	} else {
		$(".messageBG").css("display", "block");
		$(".messageBG .messageWarnsText").text("请选择要删除的商品");
	}
});
//点击清空购物车
$(".J_clr_all").click(function() {
	var cartProductList = $(".normalProduct .simpleOrder");
	var packageCartProductList=$(".packageSimpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var arrClearIds = []; //商品id的arr
	for(var i = 0; i < cartProductList.length; i++) {
		checkedNode++;
		arrClearIds.push($(cartProductList[i]).find(".cid").text());
	}
	for(var i = 0; i < packageCartProductList.length; i++) {
		checkedNode++;
		arrClearIds.push($(packageCartProductList[i]).find(".packageTitle .cid").text());
	}
	delcart = JSON.stringify(arrClearIds);
	$(".delWarnsText").text("您确定要清空所有商品吗？");
	$(".bgDel").css("display", "block");
});
//点击去添加商品
$(".gotoAddProduct").click(function() {
	window.location.href = "../shop/shop_index.html";
});


//结算

$(".submit-btn").click(function() {
	var cartProductList = $(".normalProduct .simpleOrder");
	var packageCartProductList=$(".packageSimpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var arrCartIds = []; //商品id的arr
	var totalCartList; //商品id的string数组
	var orderSignNum = 0; //选中的里面有多少是从再来一单过来的
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			checkedNode++;
			arrCartIds.push($(cartProductList[i]).find(".cid").text());
			if($(cartProductList[i]).find(".sign").length > 0) {
				orderSignNum++;
			}
		}
	}
	for(var i = 0; i < packageCartProductList.length; i++) {
		if($(packageCartProductList[i]).find(".cbox").hasClass("checked")) {
			checkedNode++;
			arrCartIds.push($(packageCartProductList[i]).find(".packageTitle .cid").text());
			if($(packageCartProductList[i]).find(".packageTitle .sign").length > 0) {
				orderSignNum++;
			}
		}
	}
	totalCartList = JSON.stringify(arrCartIds);
	console.log(checkedNode)
	if(checkedNode > 0) {
		//var signLen=$(".sign").length;
		localStorage.setItem('cartlistPC', totalCartList);
		//		if(orderSignNum==checkedNode){
		//			window.location.href = 'orderSettlement.html?orderId=1';
		//		}else{
		window.location.href = 'orderSettlement.html';
		//		}
	} else {
		$(".messageBG").css("display", "block");
		$(".messageBG .messageWarnsText").text("请选择商品");
	}
});
//点击logo
$(".topMainLogo").click(function() {
	top.location.href = "../../index.html";
});