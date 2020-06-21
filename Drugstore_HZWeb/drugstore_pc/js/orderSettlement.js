
	//hai.L 禁止跳转结算
	if(sessionStorage.getItem("haveNotBack") == "Pay"){
		window.location.href = "../shop/orderList.html";
	}
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
var cartlist;
//console.log(cartlist);
if(!window.user){
	window.location.href = window.src + "pages/login/login.html";
}
var userId =window.user.id;;
//地址操作
$(document).on("click", ".nameAndProv", function() {
	$(this).parent().parent().addClass("selectTelAndAddrBox");
	$(this).parent().parent().find(".nameAndProv").addClass("chosedNameAndProv");
	$(this).parent().parent().siblings().removeClass("selectTelAndAddrBox");
	$(this).parent().parent().siblings().find(".nameAndProv").removeClass("chosedNameAndProv");
});
//$("#distpicker1").distpicker({
//	autoSelect: false
//});
//$("#distpicker2").distpicker({
//	autoSelect: false
//});
//$(function(){
//
//$("#distpicker3").distpicker('destroy');
//
//	$("#distpicker3").distpicker({
//	
//	    province: '省份名',
//	
//	    city: '城市名',
//	
//	    district: '区名',
//	
//	    autoSelect: false,
//	
//	    placeholder: false
//	
//	});
//
//});
zcityrun('.zcityGroup');
var province3Val = "请选择省";
var city3Val = '请选择市';
var district3Val = '请选择省区';
//新建地址
$(".rtAddTXT").click(function() {
	$(".addAddrPlatModel").css("display", "block");
});
//点击地址列表的编辑
$(".addrListBox").on("click", ".editAddr", function() {
	$(".editAddrPlatModel").css("display", "block");
	var editProv = $(this).parent().parent().find(".recieverProvince").text();
	var editCity = $(this).parent().parent().find(".recieverCity").text();
	var editTown = $(this).parent().parent().find(".recieverTown").text();
	editAddrid = $(this).parent().parent().parent().find(".addrLineId").text();
	var prolen = $("#province3").find("option");
	province3Val = editProv;
	city3Val = editCity;
	district3Val = editTown;
	//		给编辑框赋值
	$("#hasAddrToEdit .recievePerson").val($(this).parent().parent().parent().find(".recieveName").text());
	$($('#hasAddrToEdit').find(".currentValue")[0]).val(province3Val);
	$($('#hasAddrToEdit').find(".currentValue")[1]).val(city3Val);
	$($('#hasAddrToEdit').find(".currentValue")[2]).val(district3Val);
	$('#hasAddrToEdit .detailAddr').val($(this).parent().parent().find(".recieverAddrDetail").text());
	if($(this).parent().parent().parent().find(".lineIsDefault").text()=="1"){
		$('#hasAddrToEdit #editPutDefault').prop("checked","checked");
	}
	if($(this).parent().parent().find(".recieverTel").text().indexOf('-')<0) {
		$('#hasAddrToEdit .tel').val($(this).parent().parent().find(".recieverTel").text());
	} else {
		$('#hasAddrToEdit .landLine').val($(this).parent().parent().find(".recieverTel").text());
	}
})
//点击关闭按钮
$(".writeAddr").on("click", ".closed", function() {
	$(this).parent().parent().parent().parent().css("display", "none");
});
//取消按钮
$(".writeAddr").on("click", ".cancelBtns", function() {
	$(this).parent().parent().parent().parent().parent().css("display", "none");
});
//点击地址和提示框关闭按钮
$(".delAndMessage").on("click", ".closed", function() {
	$(this).parent().parent().parent().css("display", "none");
});
//取消地址和提示框按钮
$(".delAndMessage").on("click", ".cancelBtns", function() {
	$(this).parent().parent().parent().css("display", "none");
});
//新用户收货地址确定
$("#NoAddrToAdd .addAddrBtn").click(function() {
	checkAddrForm("NoAddrToAdd", 1);
});
//已有地址再新建地址确定
$(".addAddrSureBtn").click(function() {
	checkAddrForm("hasAddrToAdd", 2);
});
//编辑地址
$(".editAddrSureBtn").click(function() {
	checkAddrForm("hasAddrToEdit", 3);
});

function checkAddrForm(parentBoxId, i) {
	var telTest=/^1[3456789]\d{9}$/;
	var phoneReg =/0\d{2}-\d{7,8}/;
    var re = new RegExp(phoneReg);
	if($('#' + parentBoxId).find(".recievePerson").val() == "" || $('#' + parentBoxId).find(".recievePerson").val() == null) {
		$('#' + parentBoxId).find(".recievePerson").parent().next().css("display", "block");
	} else if($($('#' + parentBoxId).find(".currentValue")[0]).val() == "" || $($('#' + parentBoxId).find(".currentValue")[0]).val() == null) {
		$('#' + parentBoxId).find(".recievePerson").parent().next().css("display", "none");
		$($('#' + parentBoxId).find(".currentValue")[0]).parent().parent().parent().parent().next().css("display", "block");
		$($('#' + parentBoxId).find(".currentValue")[0]).parent().parent().parent().parent().next().find(".PCTWarnText").text("请选择省");
	} else if($($('#' + parentBoxId).find(".currentValue")[1]).val() == "" || $($('#' + parentBoxId).find(".currentValue")[1]).val() == null) {
		$($('#' + parentBoxId).find(".currentValue")[1]).parent().parent().parent().parent().next().css("display", "block");
		$($('#' + parentBoxId).find(".currentValue")[1]).parent().parent().parent().parent().next().find(".PCTWarnText").text("请选择市");
	} else if($($('#' + parentBoxId).find(".currentValue")[2]).val() == "" || $($('#' + parentBoxId).find(".currentValue")[2]).val() == null) {
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().css("display", "block");
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().find(".PCTWarnText").text("请选择区");
	} else if($('#' + parentBoxId).find(".detailAddr").val() == "" || $('#' + parentBoxId).find(".detailAddr").val() == null) {
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().css("display", "none");
		$('#' + parentBoxId).find(".detailAddr").parent().next().css("display", "block");
	} else if(($('#' + parentBoxId).find(".tel").val() == "" || $('#' + parentBoxId).find(".tel").val() == null) && ($('#' + parentBoxId).find(".landLine").val() == "" || $('#' + parentBoxId).find(".landLine").val() == null)) {
		$('#' + parentBoxId).find(".recievePerson").parent().next().css("display", "none");
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().css("display", "none");
		$('#' + parentBoxId).find(".detailAddr").parent().next().css("display", "none");
		$('#' + parentBoxId).find(".tel").parent().next().text('手机号码不能为空');
		$('#' + parentBoxId).find(".tel").parent().next().css("display", "block");
	} else if(!(telTest.test($('#' + parentBoxId).find(".tel").val()))){
		$('#' + parentBoxId).find(".recievePerson").parent().next().css("display", "none");
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().css("display", "none");
		$('#' + parentBoxId).find(".detailAddr").parent().next().css("display", "none");
		$('#' + parentBoxId).find(".tel").parent().next().text('请输入11位有效手机号码');
		$('#' + parentBoxId).find(".tel").parent().next().css("display", "block");
	}else {
		$('#' + parentBoxId).find(".recievePerson").parent().next().css("display", "none");
		$($('#' + parentBoxId).find(".currentValue")[2]).parent().parent().parent().parent().next().css("display", "none");
		$('#' + parentBoxId).find(".detailAddr").parent().next().css("display", "none");
		$('#' + parentBoxId).find(".tel").parent().next().css("display", "none");
		if(i == 1) { //新用户加地址
			var recievePerson = $("#NoAddrToAdd .recievePerson").val();
			var province = $($('#NoAddrToAdd').find(".currentValue")[0]).val();
			var city = $($('#NoAddrToAdd').find(".currentValue")[1]).val();
			var district = $($('#NoAddrToAdd').find(".currentValue")[2]).val();
			var detailAddr = $('#NoAddrToAdd .detailAddr').val();
			var tel = $('#NoAddrToAdd .tel').val();
			var landLine = $('#NoAddrToAdd .landLine').val();
			if(tel == "" || tel == "") {
				var currentTel = landLine;
			} else {
				var currentTel = tel;
			}
			if($("#PutDefault").prop("checked")){
				var isDefault = 1; //默认选中
			}else{
				var isDefault = 0; //默认选中
			}
			addAddr(recievePerson, province, city, district, detailAddr, currentTel, isDefault);
		}
		if(i == 2) { //已有地址新建地址
			var recievePerson = $("#hasAddrToAdd .recievePerson").val();
			var province = $($('#hasAddrToAdd').find(".currentValue")[0]).val();
			var city = $($('#hasAddrToAdd').find(".currentValue")[1]).val();
			var district = $($('#hasAddrToAdd').find(".currentValue")[2]).val();
			var detailAddr = $('#hasAddrToAdd .detailAddr').val();
			var tel = $('#hasAddrToAdd .tel').val();
			var landLine = $('#hasAddrToAdd .landLine').val();
			if(tel == "" || tel == "") {
				var currentTel = landLine;
			} else {
				var currentTel = tel;
			}
			if($("#addPutDefault").prop("checked")){
				var isDefault = 1; //默认选中
			}else{
				var isDefault = 0; //默认选中
			}
			addAddr(recievePerson, province, city, district, detailAddr, currentTel, isDefault);
		}
		if(i == 3) { //编辑地址
			var recievePerson = $("#hasAddrToEdit .recievePerson").val();
			var province = $($('#hasAddrToEdit').find(".currentValue")[0]).val();
			var city = $($('#hasAddrToEdit').find(".currentValue")[1]).val();
			var district = $($('#hasAddrToEdit').find(".currentValue")[2]).val();
			var detailAddr = $('#hasAddrToEdit .detailAddr').val();
			var tel = $('#hasAddrToEdit .tel').val();
			var landLine = $('#hasAddrToEdit .landLine').val();
			if(tel == "" || tel == "") {
				var currentTel = landLine;
			} else {
				var currentTel = tel;
			}
			if($("#editPutDefault").prop("checked")){
				var isDefault = 1; //默认选中
			}else{
				var isDefault = 0; //默认选中
			}
			editAddr(recievePerson, province, city, district, detailAddr, currentTel, isDefault);
		}
	}
}
//新加地址
function addAddr(recievePerson, province, city, district, detailAddr, currentTel, isDefault) {
	$.ajax({
		type: "get",
		url: config+"/drug/userAdress/add",
		async: true,
		data: {
			"userId": userId,
			"userName": recievePerson,
			"userPhone": currentTel,
			"city": city,
			"province": province,
			"town": district,
			"detailAddr": detailAddr,
			"label": '',
			"isDefault": isDefault
		},
		success: function(data) {
			console.log(data);
			if(data.status == "1") {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("添加成功！");
				$(".addAddrPlatModel").css("display", "none");
				addrList();
				$(".writeAddr form input").val('');
				//自动返回前一页
			} else {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("添加失败！");
				$(".addAddrPlatModel").css("display", "none");
				addrList();
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
}

function getParam(paramName) { //获取url参数
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}

//加载页面数据
if(getParam('detailToOrder')) { //从商品详情立即下单
	cartlist = getParam('cid');
	$(".num").text(getParam('num'))
	var subNum = $(".num").text();
	var buyquick = {
		"rec": cartlist,
		"userId": userId,
		"number": subNum
	};
	orderList('/drug/cart/buyImmediately', buyquick);
} else {
	cartlist = localStorage.getItem('cartlistPC'); //来自购物车
	var cartDatas = {
		"cid": cartlist,
		"userId": userId
	};
	orderList('/drug/cart/orderList', cartDatas);
}

//购物车和立即下单获取接口
function orderList(url, data) {
	console.log(url);
	$.ajax({
		type: "GET",
		url: config + url,
		contentType: "json; charset=utf-8",
		async: true,
		data: data,
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			$(".cartProductList").html('');
			console.log(data);
			if(data.status == 1) {
				if(getParam('detailToOrder')) { //从商品详情立即下单
					var drugInfo = data.resultMap.map;
					var khtml = '';
					khtml += '<div class="simpleOrder">';
					khtml += '<div class="cid" style="display:none;">' + drugInfo.drugId + '</div>';
					khtml += '<div class="simpleCheckbox lf detailStyle">';
					khtml += '</div>';
					khtml += '<div class="productImg lf detailStyle">';
					if(data.resultMap.imgUrl!=null&&data.resultMap.imgUrl!=""){
						khtml += '<img src="'+data.resultMap.imgUrl+'" alt="" />';
					}else{
						khtml += '<img src="../../images/shopCart/productImg1.png" alt="" />';
					}
					khtml += '</div>';
					khtml += '<div class="nameParent lf detailStyle">';
					khtml += '<div style="line-height:1.6;" class="productName">' + drugInfo.fullName + '</div>';
					khtml += '<div style="line-height:1.3;" class="specs">' + drugInfo.standard + '</div>';
					khtml += '</div>';
					khtml += '<div class="detailStyle lf priceBox">';
					khtml += '<span>¥</span>';
					khtml += '<span class="price">' + drugInfo.drugPrice + '</span>';
					if(drugInfo.unit1 !== undefined && drugInfo.unit1 !== "" && drugInfo.unit1 !== null) {
						khtml += '<span class="RMBmoney_unit">/' + drugInfo.unit1 + '</span>';
					}
					khtml += '</div>';
					khtml += '<div class="detailStyle lf changeQuantityBox">';
					khtml += '<div class="cartNumBox"style="display:block;">';
					khtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_down" class="decrement disabled lf">-</a>';
					khtml += '<input autocomplete="off" type="text" class="numItxt" value="' + getParam('num') + '" class="changeQuantity" minnum="1">';
					khtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_up" class="increment rt">+</a>';
					khtml += '</div>';
					khtml += '<span class="thisNum">' + drugInfo.number + '</span>';
					khtml += '</div>';
					khtml += '<div class="detailStyle lf subtotalBox">￥';
					khtml += '<span class="subtotal">' + data.resultMap.Subtotal.toFixed(2) + '</span>';
					khtml += '</div>';
					khtml += '</div>';
					$(".cartProductList").append(khtml);
					$(".num").text(getParam('num')); //商品总量	
					//				$(".RMB_total").text(data.resultMap.Subtotal); //商品小计
					$(".productPrice").text(data.resultMap.totalPriced.toFixed(2)); //商品金额
					$(".freeMoney").text(data.resultMap.discount); //优惠金额
					$(".freightPrice").text(data.resultMap.express); //运费
					//				$(".shop_count_all").text(data.resultMap.goodNum); //结算条总数
					$(".TotalPrice").text(data.resultMap.amountPayable.toFixed(2)); //结算条应付金额
					goodsNum = drugInfo.number; //商品数传值
				} else {
					$(".thisNum").css("display", "inline-block"); //来自购物车
					for(var i = 0; i < data.resultMap.list.length; i++) {
						var drugInfo = JSON.parse(data.resultMap.list[i].drugInfo);
						//					console.log(drugInfo);
						var khtml = '';
						khtml += '<div class="simpleOrder">';
						khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid + '</div>';
						khtml += '<div class="simpleCheckbox lf detailStyle">';
						khtml += '</div>';
						khtml += '<div class="productImg lf detailStyle">';
						if(data.resultMap.list[i].imgUrl!=null&&data.resultMap.list[i].imgUrl!=""){
							khtml += '<img src="'+data.resultMap.list[i].imgUrl+'" alt="" />';
						}else{
							khtml += '<img src="../../images/shopCart/productImg1.png" alt="" />';
						}
						khtml += '</div>';
						khtml += '<div class="nameParent lf detailStyle">';
						khtml += '<div style="line-height:1.6;" class="productName">' + drugInfo.fullName + '</div>';
						khtml += '<div style="line-height:1.3;" class="specs">' + drugInfo.standard + '</div>';
						khtml += '</div>';
						khtml += '<div class="detailStyle lf priceBox">';
						khtml += '<span>¥</span>';
						khtml += '<span class="price">' + drugInfo.retailPrice + '</span>';
						khtml += '<span class="RMBmoney_unit">/' + drugInfo.unit1 + '</span>';
						khtml += '</div>';
						khtml += '<div class="detailStyle lf changeQuantityBox">';
//						if(getParam('orderId')) {
//							khtml += '<div class="cartNumBox"style="display:block;">';
//							khtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_down" class="decrement disabled lf">-</a>';
//							khtml += '<input autocomplete="off" type="text" class="numItxt" value="' + data.resultMap.list[i].drugNum + '" class="changeQuantity" minnum="1">';
//							khtml += '<a href="javascript:void(0);" clstag="clickcart|keycount|xincart|cart_num_up" class="increment rt">+</a>';
//							khtml += '</div>';
//						} else {
							khtml += '<span class="thisNum"style="display:block;">' + data.resultMap.list[i].drugNum + '</span>';
//						}
						khtml += '</div>';
						khtml += '<div class="detailStyle lf subtotalBox">￥';
						khtml += '<span class="subtotal">' + data.resultMap.list[i].resultPrice.toFixed(2) + '</span>';
						khtml += '</div>';
						khtml += '</div>';
						$(".cartProductList").append(khtml);
					}
					$(".num").text(data.resultMap.goodNum); //商品总量	
					//				$(".RMB_total").text(data.resultMap.Subtotal); //商品小计
					$(".productPrice").text(data.resultMap.totalPriced.toFixed(2)); //商品金额
					$(".freeMoney").text(data.resultMap.discount.toFixed(2)); //优惠金额
					$(".freightPrice").text(data.resultMap.express); //运费
					//				$(".shop_count_all").text(data.resultMap.goodNum); //结算条总数
					$(".TotalPrice").text(data.resultMap.amountPayable.toFixed(2)); //结算条应付金额
					goodsNum = data.resultMap.goodNum; //商品数传值
				}
				$(document).on("click", ".decrement", function() { //减
					//var currnetCID = $(this).parent().parent().find(".cid").text();
					if($(this).parent().find(".numItxt").val() > 1) {
						var parSubNum = parseInt($(this).parent().find(".numItxt").val());
						parSubNum--;
						$(this).parent().find(".numItxt").val(parSubNum);
						var currentPronum = $(this).parent().find(".numItxt").val();
						//upDateCart(currnetCID, currentPronum);
						$(".num").text(parSubNum);
						console.log(parseFloat($(this).parent().parent().parent().find(".price").text()));
						var subTotalTxt = parseFloat($(this).parent().parent().parent().find(".price").text()) * parseFloat(parSubNum);
						$(this).parent().parent().parent().find(".subtotal").text(subTotalTxt);
						//			最下方总金额
						var totalProductPrice = 0;
						for(var p = 0; p < $(".subtotal").length; p++) {
							totalProductPrice += parseFloat($($(".subtotal")[p]).text());
						}
						console.log(totalProductPrice);
						$(".subtotal").text(totalProductPrice.toFixed(2))
						$(".productPrice").text(totalProductPrice.toFixed(2));
						$(".TotalPrice").text((totalProductPrice + parseFloat($(".freightPrice").text())).toFixed(2));
					}
				});
				$(document).on("click", ".increment", function() { //加
					var parNum = parseInt($(this).parent().find(".numItxt").val());
					var storeNum=getParam('storeNum');
					if(parNum<storeNum){
						parNum++;
					}else{
						parNum =storeNum;
					}
					$(this).parent().find(".numItxt").val(parNum);
					var currnetCID = $(this).parent().parent().find(".cid").text();
					var currentPronum = $(this).parent().find(".numItxt").val();
					//upDateCart(currnetCID, currentPronum);
					$(".num").text(parNum);
					console.log(parseFloat($(this).parent().parent().parent().find(".price").text()));
					var subTotalTxt = parseFloat($(this).parent().parent().parent().find(".price").text()) * parseFloat(parNum);
					$(this).parent().parent().parent().find(".subtotal").text(subTotalTxt);
					var totalProductPrice = 0;
					for(var p = 0; p < $(".subtotal").length; p++) {
						totalProductPrice += parseFloat($($(".subtotal")[p]).text());
					}
					console.log(totalProductPrice);
					$(".subtotal").text(totalProductPrice.toFixed(2));
					$(".productPrice").text(totalProductPrice.toFixed(2));
					$(".TotalPrice").text((totalProductPrice + parseFloat($(".freightPrice").text())).toFixed(2));
				});
//				数量change
				$(".numItxt").on("input",function() { //更改数量
					var parNum = parseInt($(this).val());
					var storeNum=getParam('storeNum');
					if(parNum<=storeNum){
						parNum =parseInt($(this).val());
					}else{
						parNum =storeNum;
					}
					$(this).val(parNum);
					var currnetCID = $(this).parent().parent().find(".cid").text();
					var currentPronum = $(this).val();
					//upDateCart(currnetCID, currentPronum);
					$(".num").text(parNum);
					console.log(parseFloat($(this).parent().parent().parent().find(".price").text()));
					var subTotalTxt = parseFloat($(this).parent().parent().parent().find(".price").text()) * parseFloat(parNum);
					$(this).parent().parent().parent().find(".subtotal").text(subTotalTxt);
					var totalProductPrice = 0;
					for(var p = 0; p < $(".subtotal").length; p++) {
						totalProductPrice += parseFloat($($(".subtotal")[p]).text());
						console.log(totalProductPrice)
					}
					console.log(totalProductPrice);
					$(".subtotal").text(totalProductPrice.toFixed(2));
					$(".productPrice").text(totalProductPrice.toFixed(2));
					$(".TotalPrice").text((totalProductPrice + parseFloat($(".freightPrice").text())).toFixed(2));
				});
			} else {
				console.log("服务器错误，请稍后再试");
			}
		},
		error: function(data) {
			console.log("服务器错误，请稍后再试");
		}
	});
}
//订单详情再来一单跳转获取商品列表
function goods_list() {
	$.ajax({
		type: "GET",
		url: config + "order/selbuyerToOrder",
		async: false,
		dataType: "JSONP",
		JSONP: "callback",
		data: {},
		contentType: "json; charset=utf-8",
		success: function(data) {
			console.log(data);
			var z = 0;
			if(data.code == 1) {
				//		userId=data.data[0].rest[0].buyerid;
				if(data.code == 1) {
					var cHtml = '';
					var html = '';
					var ulNode = $('#res_list');
					var full;
					var minus;
					cHtml += '<li class="mui-table-view-cell mui-media' + ' ' + data.data.companyid + '">';
					cHtml += '<div class="order_info_title">';
					cHtml += '<div class="order_info_div">';
					cHtml += '<img src="../../../styles/img/shopCart_img/order/order_pay.png" />';
					cHtml += '</div>';
					cHtml += '<div class="order_info_font">';
					cHtml += '<span class="company_name">' + data.data.companyname + '</span>';
					cHtml += '<span class="mui-icon mui-icon-forward"></span>';
					cHtml += '</div>';
					cHtml += '</div>';
					cHtml += '</li>';

					ulNode.append(cHtml);
					html = '';
					productsNum++;
					html += '<div class="order_info_content">';
					html += '<div class="order_name_div">';
					html += '<span>' + data.data.productname + '</span>';
					html += '</div>';
					html += '<div class="order_num_div mui-text-center">';
					html += '<span>x</span>';
					html += '<span class="num">' + data.data.shoppingcount + '</span>';
					html += '</div>';
					html += '<div class="order_price_div">';
					html += '<div>';
					html += '<span>¥</span>';
					if(data.data.pp == 0) {
						html += '<span>' + '价格面议' + '</span>';
					} else {
						html += '<span>' + data.data.pp + '</span>';
					}
					var fulltoMinus = data.data.rules;
					if(fulltoMinus != "" && fulltoMinus != null) {
						var fullIndex = fulltoMinus.indexOf("满");
						var minusIndex = fulltoMinus.indexOf("减");
					}
					var myPr = parseFloat(data.data.pp);
					var myNum = parseFloat(data.data.shoppingcount);
					var myTotal = myPr * myNum;
					//							console.log(myTotal);
					if(fullIndex != -1) {
						full = fulltoMinus.slice(fullIndex + 1, minusIndex);
						minus = fulltoMinus.slice(minusIndex + 1, fulltoMinus.length);
						if(myTotal >= full) {
							myTotal = myTotal - minus;
						}
					}
					totalprice += myTotal;
					totalprice = parseFloat(totalprice)
					//					console.log(totalprice);
					html += '</div>';
					html += '<div class="discount">';
					//					html += '<span>¥</span>';
					html += '<span>' + data.data.rules + '</span>';
					html += '</div>';
					html += '</div>';
					html += '<div id="companyid" style="display: none;"class="companyid">' + data.data.companyid + '</div>';
					html += '<div id="productid" style="display: none;"class="productid">' + data.data.productid + '</div>';
					html += '<div id="storeid" style="display: none;"class="storeid">' + data.data.storeid + '</div>';
					html += '<div id="maintenanceperiod" style="display: none;"class="maintenanceperiod">' + data.data.maintenanceperiod + '</div>';
					html += '<div id="specifications"class="specifications" style="display: none;">' + data.data.specifications + '</div>'; //规格
					html += '<div id="model" class="model"style="display: none;">' + data.data.model + '</div>'; //型号
					html += '<div id="storename" style="display: none;"class="storename">' + data.data.storename + '</div>';
					html += '<div id="provincename" style="display: none;"class="provincename">' + data.data.provincename + '</div>';
					html += '<div id="cityname" style="display: none;"class="cityname">' + data.data.cityname + '</div>';
					html += '<div id="townname" style="display: none;"class="townname">' + data.data.townname + '</div>';
					html += '</div>';

					$("." + data.data.companyid).append(html);
					console.log(totalprice);
					choseCoupon(totalprice);
					$($(".choseCheckbox")[0]).attr("checked", "true");
				}

			}
		}
	})
}
//返回购物车
$(".JumpShopCart").click(function(){
	window.location.href = window.src + "pages/shoppingCart/shoppingCart.html";
});
//获取地址列表
addrList();

function addrList() {
	$.ajax({
		type: "GET",
		url: config + "/drug/userAdress/list",
		contentType: "json; charset=utf-8",
		async: false,
		data: {
			userId: userId
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data.resultMap.list);
			if(data.resultMap.list.length > 0) {
				$(".addrListBox").html('');
				$("#NoAddrToAdd").css("display", "none");
				$(".addrListBox").css("display", "block");
				$(".rtAddTXT").css("display", "block");
				for(var i = 0; i < data.resultMap.list.length; i++) {
					var addrInfo = data.resultMap.list[i];
					var adhtml = '';
					adhtml += '<div class="addrRow">';
					adhtml += '<div class="addrLineId"style="display:none;">' + addrInfo.id + '</div>';
					adhtml += '<div class="lineIsDefault"style="display:none;">' + addrInfo.isDefault + '</div>';
					adhtml += '<div class="nameAndProvBox lf">';
					if(addrInfo.isDefault == 0) {
						adhtml += '<div class="nameAndProv lf">';
						adhtml += '<span class="recieveName">' + addrInfo.userName + '</span>&nbsp;&nbsp;';
						adhtml += '<span>' + addrInfo.province + '</span>';
						adhtml += '</div>';
					} else {
						adhtml += '<div class="nameAndProv lf chosedNameAndProv">';
						adhtml += '<span class="recieveName">' + addrInfo.userName + '</span>&nbsp;&nbsp;';
						adhtml += '<span>' + addrInfo.province + '</span>';
						adhtml += '</div>';
					}
					adhtml += '</div>';
					adhtml += '<div class="telAndAddrBox lf">';
					adhtml += '<span class="recieverTel">' + addrInfo.userPhone + '</span>';
					adhtml += '<span class="recieverProvince"style="display:none;">' + addrInfo.province + '</span>';
					adhtml += '<span class="recieverCity">' + addrInfo.city + '</span>';
					adhtml += '<span class="recieverTown">' + addrInfo.town + '</span>';
					adhtml += '<span class="recieverAddrDetail">' + addrInfo.detailAddr + '</span>';
					adhtml += '<span class="rt editAndDelBox">';
					adhtml += '<span class="delAddr rt">删除</span>';
					adhtml += '<span class="editAddr rt">编辑</span>';
					adhtml += '</span>';
					adhtml += '</div>';
					adhtml += '</div>';;
					$(".addrListBox").append(adhtml);
				}
			}else{
				$("#NoAddrToAdd").css("display", "block");
				$(".addrListBox").css("display", "none");
				$(".rtAddTXT").css("display", "none");
			}
			$(".addrRow").mouseover(function() {
				$(this).addClass("selectTelAndAddrBox");
				$(this).find(".editAndDelBox").css("display", "block");
			})
			$(".addrRow").mouseout(function() {
				if(!($(this).find(".nameAndProv").hasClass("chosedNameAndProv"))) {
					$(this).removeClass("selectTelAndAddrBox");
				}
				$(this).find(".editAndDelBox").css("display", "none");
			})
		},
		error: function(data) {
			console.log("服务器错误，请稍后再试");
		}
	});
}

//点击开发票和不开发票
var InvoiceType = 2; //默认不开发票，开发票为1
var vatType=0;//默认不开增值税发票0 ，开为1
//发票信息个人与企业切换
var choseBillType = 2;
$(document).on("click", ".choseBill input[type='radio']", function() {
	$(".choseBillTypeWrite input").val('');
	if($(this).attr("id") == "putBill") {
		InvoiceType = 2;
		vatType=0;
		$(".choseBillTypeWrite").css("display", "none");
	} else if($(this).attr("id") == "putnoBill"){//普票
		InvoiceType = 1;
		vatType=0;
		$("#choseBillTypeSelect").css("display", "inline-block");
		$(".choseBillTypeWrite").css("display", "block");
		$(".writeBillAddr").css("display", "none");
		$(".writetaxtTel").css("display", "none");
		$(".writeBillOpenBank").css("display", "none");
		$(".writetaxBankNum").css("display", "none");
		$("#choseBillTypeSelect").val('2');
		$(".writeBillTitle").attr('placeholder','请输入单位名称');
		$(".valueAddedTaxTxt").css("display", "none");
	}else{//增值税
		InvoiceType = 1;
		vatType=1;
		choseBillType=2;
		$("#choseBillTypeSelect").css("display", "none");
		$(".choseBillTypeWrite").css("display", "block");
		$(".writeBillAddr").css("display", "inline-block");
		$(".writetaxtTel").css("display", "inline-block");
		$(".writeBillOpenBank").css("display", "inline-block");
		$(".writetaxBankNum").css("display", "inline-block");
		$(".putnoBillTxt").css("display", "none");
		$("#choseBillTypeSelect").val('2');
		$(".writeBillTitle").attr('placeholder','请输入单位名称');
	}
});

$("#choseBillTypeSelect").change(function() {
	console.log($(this).val());
	switch($(this).val()) {
		case '2': //公司
			$(".writetaxtNum").css("display", "inline-block");
			choseBillType = 2;
			$(".writeBillTitle").attr('placeholder','请输入单位名称');
			break;
		case '1':
			$(".writetaxtNum").css("display", "none");
			$(".writeBillTitle").attr('placeholder','请输入发票抬头');
			choseBillType = 1;
			break;
	}
});
//保存发票
var personTitleContent = '';
var titleCompanyName = '';
var titleTaxNum = '';
var businessAddress='';//企业地址    
var businessPhone='';//企业电话    
var openBank='';//开户行  
var bankAccount='';//银行账户
$(".addBillBtn").click(function() {
	if(choseBillType == '2') { //公司
		if(vatType==0){
			if($(".writeBillTitle").val() == '' || $(".writeBillTitle").val() == null) {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("发票抬头不能为空！");
			} else if($(".writetaxtNum").val() == '' || $(".writetaxtNum").val() == null) {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("公司税号不能为空！");
			} else if(!checkTaxpayerId($(".writetaxtNum").val())){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("请填写正确的纳税人识别号！");
			}else {
				$(".invoiceTitle").text($(".writeBillTitle").val());
				$(".choseBillTypeWrite").css("display", "none");
				$(".putnoBillTxt").css("display", "inline");
				personTitleContent = '';
				titleCompanyName = $(".writeBillTitle").val();
				titleTaxNum = $(".writetaxtNum").val();
			}
		}else{
			if($(".writeBillTitle").val() == '' || $(".writeBillTitle").val() == null) {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("发票抬头不能为空！");
			} else if($(".writetaxtNum").val() == '' || $(".writetaxtNum").val() == null) {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("公司税号不能为空！");
			} else if(!checkTaxpayerId($(".writetaxtNum").val())){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("请填写正确的纳税人识别号！");
			}else if($(".writeBillAddr").val() == '' || $(".writeBillAddr").val() == null){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("注册地址不能为空！");
			}else if($(".writetaxtTel").val() == '' || $(".writetaxtTel").val() == null){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("注册电话不能为空！");
			}else if(!(/^1[3456789]\d{9}$/.test($(".writetaxtTel").val()))){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("请输入正确的注册电话！");
			}else if($(".writeBillOpenBank").val() == '' || $(".writeBillOpenBank").val() == null){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("开户行不能为空！");
			}else if($(".writetaxBankNum").val() == '' || $(".writetaxBankNum").val() == null){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("银行账户不能为空！");
			}else if(!luhmCheck($(".writetaxBankNum").val())){
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("请输入正确的银行账户！");
			}else {
				$(".valueAddedTaxTitle").text($(".writeBillTitle").val());
				$(".choseBillTypeWrite").css("display", "none");
				$(".valueAddedTaxTxt").css("display", "inline");
				personTitleContent = '';
				titleCompanyName = $(".writeBillTitle").val();
				titleTaxNum = $(".writetaxtNum").val();
				businessAddress=$(".writeBillAddr").val();//企业地址    
				businessPhone=$(".writetaxtTel").val();//企业电话    
				openBank=$(".writeBillOpenBank").val();//开户行  
				bankAccount=$(".writetaxBankNum").val();//银行账户
			}
		}
		
	} else {
		if($(".writeBillTitle").val() == '' || $(".writeBillTitle").val() == null) {
			$(".messageBG").css("display", "block");
			$(".messageWarnsText").text("发票抬头不能为空！");
		} else {
			$(".invoiceTitle").text($(".writeBillTitle").val());
			$(".choseBillTypeWrite").css("display", "none");
			$(".putnoBillTxt").css("display", "inline");
			personTitleContent = $(".writeBillTitle").val();
			titleCompanyName = '';
			titleTaxNum = '';
			businessAddress='';//企业地址    
			businessPhone='';//企业电话    
			openBank='';//开户行  
			bankAccount='';//银行账户
		}
	}
});
//点击修改普通发票信息按钮
$(".changeBillInfo").click(function() {
	$(".choseBillTypeWrite").css("display", "block");
	if(choseBillType == 2) { //公司
		$(".writetaxtNum").css("display", "inline-block");
	} else {
		$(".writetaxtNum").css("display", "none");
	}
});
//点击修改专业发票信息按钮
$(".changevalueAddedTaxInfo").click(function() {
	$(".choseBillTypeWrite").css("display", "block");
	if(choseBillType == 2) { //公司
		$(".writetaxtNum").css("display", "inline-block");
	} else {
		$(".writetaxtNum").css("display", "none");
	}
});
//结算
$(".submit-btn").click(function() {
	if($(".chosedNameAndProv").length == 0) {
		$(".messageBG").css("display", "block");
		$(".messageWarnsText").text("请选择收货地址！");
	} else if($('#putnoBill').prop("checked") == true && $(".billTxt").css("display") == "none") {
		$(".messageBG").css("display", "block");
		$(".messageWarnsText").text("请填写发票信息！");
	} else {
		var orderUser = $(".recieveName").text(); //用户姓名 
		var phone = $(".selectTelAndAddrBox .recieverTel").text(); //联系电话  
		var addrId = $(".chosedNameAndProv").parent().parent().find(".addrLineId").text(); //送货地址   
		var payType = "在线支付"; //支付类别   
		var orderRemarks = ''; //备注     
		var goodsNum = $(".num").text(); //数量 
		if(getParam('detailToOrder')) {
			var subData = {
				drugId: cartlist,
				userId: userId,
				drugNum: goodsNum,
				itemCount: goodsNum,
				orderUser: orderUser, //用户姓名 
				phone: phone, //联系电话  
				//address: address, //送货地址   
				payType: payType, //支付类别  
				orderRemarks: orderRemarks, //备注    
				aid: addrId, //地址id
				invoiceType: InvoiceType, //发票类型（1，开发票 2 ，不开发票）
				invoicePayable: choseBillType, //发票抬头（1，个人 2，公司）
				content: personTitleContent, //抬头内容  
				invoiceName: titleCompanyName, //公司名称
				dutySign: titleTaxNum, //纳税人识别号
				fromType: 2,
				businessAddress:businessAddress,//企业地址    
				businessPhone:businessPhone,//企业电话    
				openBank:openBank,//开户行  
				bankAccount:bankAccount,//银行账户
				vatType:vatType//增值税
			}
		} else {
			var subData = {
				cid: cartlist,
				userId: userId,
				itemCount: goodsNum,
				orderUser: orderUser, //用户姓名 
				phone: phone, //联系电话  
				//address: address, //送货地址   
				payType: payType, //支付类别  
				orderRemarks: orderRemarks, //备注    
				aid: addrId, //地址id
				invoiceType: InvoiceType, //发票类型（1，开发票 2 ，不开发票）
				invoicePayable: choseBillType, //发票抬头（1，个人 2，公司）
				content: personTitleContent, //抬头内容  
				invoiceName: titleCompanyName, //公司名称
				dutySign: titleTaxNum, //纳税人识别号
				fromType: 1,
				businessAddress:businessAddress,//企业地址    
				businessPhone:businessPhone,//企业电话    
				openBank:openBank,//开户行  
				bankAccount:bankAccount,//银行账户
				vatType:vatType//增值税
			}
		}
		$.ajax({
			type: "GET",
			url: config + "/drug/orderInfo/save",
			contentType: "json; charset=utf-8",
			async: true,
			data: subData,
			dataType: 'JSON',
			traditional: true,
			success: function(data) {
				console.log(data);
				if(data.status == 1) {
					//					$('#wait_dialog').css('display', 'none');
					//					$('#bg').css('display', 'none');
					//hai.L 加入防回退
					sessionStorage.setItem("haveNotBack", "Pay");
					sessionStorage.setItem("orderId", data.resultMap.orderId);
					window.location.href = "../pay/pay.html";
				} else {
					//					$('#wait_dialog').css('display', 'none');
					//					$('#bg').css('display', 'none');
				}
			},
			error: function(data) {
				console.log("服务器错误，请稍后再试");
				//				$('#wait_dialog').css('display', 'none');
				//				$('#bg').css('display', 'none');
			}
		});
	}

})
var editAddrid; //修改地址id
function editAddr(recievePerson, province, city, district, detailAddr, currentTel, isDefault) {
	$.ajax({
		type: "get",
		url: config+"/drug/userAdress/update",
		async: true,
		data: {
			"id": editAddrid,
			"userId": userId,
			"userName": recievePerson,
			"userPhone": currentTel,
			"city": city,
			"province": province,
			"town": district,
			"detailAddr": detailAddr,
			"label": '',
			"isDefault": isDefault
		},
		success: function(data) {
			console.log(data);
			if(data.status == "1") {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("编辑成功！");
				$(".editAddrPlatModel").css("display", "none");
				addrList();
				//自动返回前一页
			} else {
				$(".messageBG").css("display", "block");
				$(".messageWarnsText").text("编辑失败！");
				$(".editAddrPlatModel").css("display", "none");
				addrList();
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
}


//删除地址
var addrLineId;
$(document).on("click", ".delAddr", function() {
	addrLineId = $(this).parent().parent().parent().find(".addrLineId").text();
	$(".bgDel").css("display","block");
	
});
$(".delDialogSureBtn").click(function(){
	$.ajax({
		type: "get",
		url: config + "/drug/userAdress/batchRemove",
		async: true,
		data: {
			"userId": userId,
			"id": addrLineId
		},
		success: function(data) {
			console.log(data);
			if(data.status == "1") {
				addrList();
				$(".bgDel").css("display","none");
			} else {

			}
		},
		error: function(data) {
			console.log(data);
		}
	});
});
function checkTaxpayerId(taxpayerId){
    var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
        i, j = regArr.length;
    for (var i = 0; i < j; i++) {
        if (regArr[i].test(taxpayerId)) {
            return true;
        }
    }
    //纳税人识别号格式错误
    return false;
}

function luhmCheck(cardNum){
    cardNum = (cardNum+'').replace(/\s+/g,'');
    if(!(/^\d{16,19}$/).test(cardNum)){
       console.log('is not a bank card number');
      return false;
　　}

　　var numbers = cardNum.split('').reverse();
　　var sum = 0;
　　for(var i=0;i<numbers.length;i++){
　　　　if(i%2==0){
　　　　　　sum+=numbers[i]*1;
　　　　}else{
   　　　　sum+=numbers[i]*2>9?numbers[i]*2-9:numbers[i]*2;
　　　　}
　　}

　　return sum%10==0;
}