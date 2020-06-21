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
$(document).on("click", ".cbox", function() { //点击单个checkbox时
	var cartProductList = $(".cartProductList .simpleOrder");
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
	if(checkedNode == cartProductList.length) {
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
	console.log(checkedPrice);
	$(".TotalPrice").text(checkedPrice.toFixed(2));
});
//点击上面的全选
var checkedTrue = true;
$(".cTbox").click(function() {
	var cartProductList = $(".cartProductList .simpleOrder");
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
		$(".checkBoxFooterAll").addClass("checked");
	} else {
		checkedTrue = true;
		$(".checkBoxFooterAll").removeClass("checked");
	}
	console.log(checkedPrice);
	$(".TotalPrice").text(checkedPrice.toFixed(2));
});
//底下全选
var checkedBottomTrue = true;
$(".checkBoxFooterAll").click(function() {
	var cartProductList = $(".cartProductList .simpleOrder");
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
		$("#checkAllTop").addClass("checked");
	} else {
		checkedBottomTrue = true;
		$("#checkAllTop").removeClass("checked");
	}
	console.log(checkedPrice);
	$(".TotalPrice").text(checkedPrice.toFixed(2));
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
					var drugInfo = JSON.parse(data.resultMap.drugInfoList[i].drugInfo);
					console.log(drugInfo);
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
					ulNode.append(cHtml);
				}
				//				如果是从再来一单跳转过来的,默认选上再来一单物品
				console.log(productOrderJumpId);
				if(getParam("page") == "orderpage") { //从订单跳转过来的
					if(productOrderJumpId != '' && productOrderJumpId != null) {
						var simpleOrderLen = $(".simpleOrder");
						var checkedPrice = 0; //选择的总价
						if(productOrderJumpId.indexOf(",") == -1) {
							var productChosedIds = productOrderJumpId;
							for(var j = 0; j < simpleOrderLen.length; j++) {
								if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds) {
									$(simpleOrderLen[j]).find(".cbox").addClass("checked");
									checkedPrice += parseFloat($(simpleOrderLen[j]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".numItxt").val().trim());
									console.log(checkedPrice);
									$(".TotalPrice").text(checkedPrice.toFixed(2));
								}
							}
						} else {
							var productChosedIds = productOrderJumpId.split(",");
							for(var k = 0; k < productChosedIds.length; k++) {
								for(var j = 0; j < simpleOrderLen.length; j++) {
									console.log($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds[k]);
									if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds[k]) {
										//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
										$(simpleOrderLen[j]).find(".cbox").addClass("checked");
										checkedPrice += parseFloat($(simpleOrderLen[j]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".numItxt").val().trim());
										console.log(checkedPrice);
										$(".TotalPrice").text(checkedPrice.toFixed(2));
									}
								}
							}
						}
						console.log(isCheckedArrMain)
						if(isCheckedArrMain.length>0){
							var checkedsPrice = 0; //选择的总价
							for(var k = 0; k < isCheckedArrMain.length; k++) {
								for(var s = 0; s < simpleOrderLen.length; s++) {
									console.log($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]);
									if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
										//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
										$(simpleOrderLen[s]).find(".cbox").addClass("checked");
										console.log(checkedsPrice);
										checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".numItxt").val().trim());
										$(".TotalPrice").text(checkedsPrice.toFixed(2));
									}
								}
							}
						}
						
					}
				} else {
					var simpleOrderLen = $(".simpleOrder");
					var checkedsPrice = 0; //选择的总价
					console.log("checkedsPrice",isCheckedArrMain);
					for(var k = 0; k < isCheckedArrMain.length; k++) {
						for(var s = 0; s < simpleOrderLen.length; s++) {
							console.log($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]);
							if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
								//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
								$(simpleOrderLen[s]).find(".cbox").addClass("checked");
								console.log(checkedsPrice);
								checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".numItxt").val().trim());
								$(".TotalPrice").text(checkedsPrice.toFixed(2));
							}
						}
					}
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
$(document).on("click", ".decrement", function() { //减
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var isCheckedArr = [];
	if($(this).parent().find(".numItxt").val() > 1) {
		var parSubNum = parseInt($(this).parent().find(".numItxt").val());
		parSubNum--;
		$(this).parent().find(".numItxt").val(parSubNum);
		var currentPronum = $(this).parent().find(".numItxt").val();
		var cartProductList = $(".cartProductList .simpleOrder");
		for(var i = 0; i < cartProductList.length; i++) {
			if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
				isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
			}
		}
		$(".mask").css("display","block");
		isCheckedArrMain=isCheckedArr;
		upDateCart(currnetCID, currentPronum);
	}
});
$(document).on("click", ".increment", function() { //加
	var parNum = parseInt($(this).parent().find(".numItxt").val());
	var isCheckedArr = [];
	var storeNum=Number($(this).parent().parent().find('.currentqty').text().trim());
	if(parNum<storeNum){
		parNum++;
	}else{
		parNum =storeNum;
	}
	$(this).parent().find(".numItxt").val(parNum);
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var currentPronum = $(this).parent().find(".numItxt").val();
	console.log(currentPronum,"currentPronum")	
	var cartProductList = $(".cartProductList .simpleOrder");
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			console.log(isCheckedArr)
			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
		}
	}
	isCheckedArrMain=isCheckedArr;
	$(".mask").css("display","block");
	upDateCart(currnetCID, currentPronum);
});
//输入数量时变化
$(document).on("change", ".numItxt", function() { 
	var parNum = parseInt($(this).val());
	var isCheckedArr = [];
	var storeNum=Number($(this).parent().parent().find('.currentqty').text().trim());
	if(parNum<=storeNum){
		parNum =parseInt($(this).val());
	}else{
		parNum =storeNum;
	}
	$(this).val(parNum);
	var currnetCID = $(this).parent().parent().find(".cid").text();
	var currentPronum = $(this).val();
	var cartProductList = $(".cartProductList .simpleOrder");
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			console.log(isCheckedArr)
			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
		}
	}
	isCheckedArrMain=isCheckedArr;
	
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

//点击结算条的删除
$(".remove-batch").click(function() {
	var cartProductList = $(".cartProductList .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var arrIds = []; //商品id的arr
	for(var i = 0; i < cartProductList.length; i++) {
		//		console.log($(cartProductList[i]).find(".cbox"));
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			//$(cartProductList[i]).find(".cbox").addClass("checked");
			checkedNode++;
			arrIds.push($(cartProductList[i]).find(".cid").text());
			delcart = JSON.stringify(arrIds);
		}
	}
	console.log(checkedNode)
	if(checkedNode > 0) {
		$(".delWarnsText").text("您确定要删除选中商品吗？");
		$(".bgDel").css("display", "block");
	} else {
		$(".messageBG").css("display", "block");
	}
});
//点击清空购物车
$(".J_clr_all").click(function() {
	var cartProductList = $(".cartProductList .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var arrClearIds = []; //商品id的arr
	for(var i = 0; i < cartProductList.length; i++) {
		//		console.log($(cartProductList[i]).find(".cbox"));
		//$(cartProductList[i]).find(".cbox").addClass("checked");
		checkedNode++;
		arrClearIds.push($(cartProductList[i]).find(".cid").text());
		delcart = JSON.stringify(arrClearIds);
		$(".delWarnsText").text("您确定要清空所有商品吗？");
		$(".bgDel").css("display", "block");
	}
});
//点击去添加商品
$(".gotoAddProduct").click(function() {
	window.location.href = "../shop/shop_index.html";
});
//结算

$(".submit-btn").click(function() {
	var cartProductList = $(".cartProductList .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	var arrCartIds = []; //商品id的arr
	var totalCartList; //商品id的string数组
	var orderSignNum = 0; //选中的里面有多少是从再来一单过来的
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".cbox").hasClass("checked")) {
			checkedNode++;
			arrCartIds.push($(cartProductList[i]).find(".cid").text());
			totalCartList = JSON.stringify(arrCartIds);
			if($(cartProductList[i]).find(".sign").length > 0) {
				orderSignNum++;
			}
		}
	}
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
	}
});
//点击logo
$(".topMainLogo").click(function() {
	top.location.href = "../../index.html";
});