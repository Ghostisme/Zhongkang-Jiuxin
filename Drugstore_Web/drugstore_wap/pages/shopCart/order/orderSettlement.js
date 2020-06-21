//mui.init({
//	swipeBack: true //启用右滑关闭功能
//});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
if(!window.webUser) {
	window.location.href = "../../login/login.html";
}
var totalprice = 0; //商品总价
var thiscouponVal;
var thiscouponMoney;
var full;
var minus;
var couponMinus;
var userId;
var userid;
//userid = getCookie('userId');
//userId = getCookie('userId');
userId = window.webUser.id;
var logintype = getCookie('logintype');
var httpURL = 'http://192.168.18.126:8080/gcafu_commerce/rest';
//var cartlist = JSON.parse(localStorage.getItem('cartlist'));
var cartlist;
if(getParam('detailToOrder')) {
	//	var carArr=[];
	//	carArr.push(getParam('cid'));
	cartlist = getParam('cid');
	console.log(cartlist);
} else {
	cartlist = localStorage.getItem('cartlist');
	console.log(cartlist);
}
var arr = new Array();
var addrArray = new Array(); //地址组合
var productsNum = 0;
var buyNum = 1;
//获取地址列表选择的地址
var addrObj = JSON.parse(sessionStorage.getItem("addressObj"));
//console.log(addrObj);
var addrId; //地址id
//测试使用,正式测试需要在ajax内赋值
var productNumber = 0;
/*总计*/
var totalPrice = 0;
//测试结束
var shopCUT = 0;
var addShopPri = 0;
var singleTotalPri = 0;
var shoppcount;

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function getParam(paramName) { //获取url参数
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}

//读取发票信息
var titleType; //发票抬头类型 个人或公司
var InvoiceType; //发票类型
var personTitleContent; //发票个人抬头内容
var titleCompanyName; //发票公司名称
var titleTaxNum; //发票公司纳税人识别号
var businessAddress = ''; //企业地址    
var businessPhone = ''; //企业电话    
var openBank = ''; //开户行  
var bankAccount = ''; //银行账户
var vatType = 0; //增值税类型为1是专票 为0 是普票或者个人和不开
if(localStorage.getItem("titleType") == "个人") { //个人发票
	$("#jumpEditInvoice .issueInvoiceTxt").text("商品明细、个人");
	personTitleContent = localStorage.getItem("titleContent"); //抬头内容
	titleType = 1;
	titleCompanyName = "";
	titleTaxNum = "";
	InvoiceType = 1;
	businessAddress = ''; //企业地址    
	businessPhone = ''; //企业电话    
	openBank = ''; //开户行  
	bankAccount = ''; //银行账户
	vatType = 0;
} else if(localStorage.getItem("titleType") == "公司") { //公司发票
	$("#jumpEditInvoice .issueInvoiceTxt").text("商品明细、公司");
	titleCompanyName = localStorage.getItem("titleCompanyName");
	titleTaxNum = localStorage.getItem("titleTaxNum");
	titleType = 2;
	personTitleContent = "";
	InvoiceType = 1;
	vatType = 0;
	businessAddress = ''; //企业地址    
	businessPhone = ''; //企业电话    
	openBank = ''; //开户行  
	bankAccount = ''; //银行账户
} else if(localStorage.getItem("titleType") == "专票") { //专票
	$("#jumpEditInvoice .issueInvoiceTxt").text("商品明细、公司");
	titleCompanyName = localStorage.getItem("titleCompanyName");
	titleTaxNum = localStorage.getItem("titleTaxNum");
	titleType = 2;
	personTitleContent = "";
	InvoiceType = 1;
	vatType = 1;
	businessAddress = localStorage.getItem("writeBillAddr"); //企业地址    
	businessPhone = localStorage.getItem("writetaxtTel"); //企业电话    
	openBank = localStorage.getItem("writeBillOpenBank"); //开户行  
	bankAccount = localStorage.getItem("writetaxBankNum"); //银行账户
} else { //不开发票
	$("#jumpEditInvoice .issueInvoiceTxt").text("不开发票");
	personTitleContent = "";
	titleCompanyName = "";
	titleTaxNum = "";
	titleType = "";
	InvoiceType = 2;
	vatType = 0;
	businessAddress = ''; //企业地址    
	businessPhone = ''; //企业电话    
	openBank = ''; //开户行  
	bankAccount = ''; //银行账户
}
$(".leaveMsg").val(localStorage.getItem("leaveMsg"));
var subNum = $(".shop_count_all").text();
$(".shop_count_all").text(getParam('num'));
//isFromPage()
//加载页面数据
var buyQuickNum;
if(getParam('detailToOrder')) {
	buyQuickNum = getParam('num');
} else if(getParam('packagedDetailToOrder')) {
	buyQuickNum = getParam('number');
}

function isFromPage() {
	if(getParam('detailToOrder')) { //从商品详情立即下单
		console.log(productNumber)
		var buyquick = {
			"rec": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": 0,
			"carriage": 0
		}
		orderList('/drug/cart/buyImmediately', buyquick);
	} else if(getParam('packagedDetailToOrder')) {
		//		var subNum = $(".num").text();
		cartlist = getParam('mealId');
		console.log(productNumber)
		var buyquick = {
			"userId": userId,
			"mealId": getParam('mealId'),
			"number": productNumber,
			"price": 0,
			"carriage": 0
		}

		orderList('/drug/cart/buyImmediately', buyquick);
	} else {
		var cartDatas = {
			"cid": cartlist,
			"userId": userId,
			"price": 0,
			"carriage": 0
		};
		orderList('/drug/cart/orderList', cartDatas);
	}
}
if(getParam('detailToOrder')) { //从商品详情立即下单
	productNumber = getParam('num');
	var buyquick = {
		"rec": cartlist,
		"userId": userId,
		"number": getParam('num'),
		"price": 0,
		"carriage": 0
	}
	addrList('/drug/cart/buyImmediately', buyquick);
} else if(getParam('packagedDetailToOrder')) {
	productNumber = getParam('num');
	cartlist = getParam('mealId');
	var buyquick = {
		"userId": userId,
		"mealId": getParam('mealId'),
		"number": getParam('num'),
		"price": 0,
		"carriage": 0
	}

	addrList('/drug/cart/buyImmediately', buyquick);
} else {
	var cartDatas = {
		"cid": cartlist,
		"userId": userId,
		"price": 0,
		"carriage": 0
	};
	addrList('/drug/cart/orderList', cartDatas);
}

function addrList(url, data) {
	$.ajax({
		type: "GET",
		url: config + url,
		contentType: "json; charset=utf-8",
		async: true,
		data: data,
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			if(addrObj == "" || addrObj == null) { //重新选择的缓存地址
				if(data.resultMap.address.length > 0) { //有地址
					$(".receiverName").text(data.resultMap.address[0].userName); //收货人
					$(".receiverTel").text(data.resultMap.address[0].userPhone); //电话
					addrId = data.resultMap.address[0].id; //收货地址id
					if(data.resultMap.address[0].isDefault == 1) { //有默认地址
						$(".nomal").css("display", "inline-block");
						getFare(data.resultMap.address[0].province);
					} else {
						$(".nomal").css("display", "none");
						isFromPage();
					}
					if(data.resultMap.address[0].label == "" || data.resultMap.address[0].label == null) {
						$(".targs").css("display", "none");
					} else {
						$(".targs").text(data.resultMap.address[0].label);
						$(".targs").css("display", "inline-block");
					}
					$(".receiverAddr").text(data.resultMap.address[0].province + data.resultMap.address[0].city + data.resultMap.address[0].town + data.resultMap.address[0].detailAddr); //地址
					$("#editor_goods_info").css("display", "none");
					$("#editor_goods_hasinfo").css("display", "block");
				} else {
					isFromPage();
				}
			} else {
				$(".receiverName").text(addrObj.userName); //收货人
				$(".receiverTel").text(addrObj.userPhone); //电话
				addrId = addrObj.id; //收货地址id
				if(addrObj.isDefault == 1) {
					$(".nomal").css("display", "inline-block");
					getFare(addrObj.province);
				} else {
					$(".nomal").css("display", "none");
					getFare(addrObj.province);
				}
				if(addrObj.label == "" || addrObj.label == null) {
					$(".targs").css("display", "none");
				} else {
					$(".targs").text(addrObj.label);
					$(".targs").css("display", "inline-block");
				}
				$(".receiverAddr").text(addrObj.province + addrObj.city + addrObj.town + addrObj.detailAddr); //地址
				$("#editor_goods_info").css("display", "none");
				$("#editor_goods_hasinfo").css("display", "block");
			}
		}
	})
}
//获取运费
function getFare(city) {
	$.ajax({
		type: "GET",
		url: config + "/drug/postage/getByCity",
		contentType: "json; charset=utf-8",
		async: false,
		data: {
			city: city
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data);
			if(data.status == '1') {
				buyQuickPrice = data.resultMap.drugPostage.price;
				buyQuickCarriage = data.resultMap.drugPostage.carriage;
				if(getParam('detailToOrder')) { //从商品详情立即下单
					cartlist = getParam('cid');
					$(".num").text(buyQuickNum)
					var subNum = $(".num").text();
					console.log(productNumber)
					var buyquick = {
						"rec": cartlist,
						"userId": userId,
						"number": productNumber,
						"price": data.resultMap.drugPostage.price,
						"carriage": data.resultMap.drugPostage.carriage
					};
					orderList('/drug/cart/buyImmediately', buyquick);
				} else if(getParam('packagedDetailToOrder')) {
					cartlist = getParam('mealId');
					$(".num").text(buyQuickNum)
					var subNum = $(".num").text();
					console.log(productNumber)
					var buyquick = {
						"mealId": cartlist,
						"userId": userId,
						"number": productNumber,
						"price": data.resultMap.drugPostage.price,
						"carriage": data.resultMap.drugPostage.carriage
					};
					orderList('/drug/cart/buyImmediately', buyquick);
				} else {
					var cartDatas = {
						"cid": cartlist,
						"userId": userId,
						"price": data.resultMap.drugPostage.price,
						"carriage": data.resultMap.drugPostage.carriage
					};
					console.log(cartDatas)
					orderList('/drug/cart/orderList', cartDatas);
				}
			}
		},
		error: function(data) {
			console.log("服务器错误，请稍后再试");
		}
	});
}

function orderList(url, data) {
	$.ajax({
		type: "GET",
		url: config + url,
		contentType: "json; charset=utf-8",
		async: true,
		data: data,
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data);
			$("#res_list").html('');
			if(data.status == 1) {
				console.log(getParam('packagedDetailToOrder'))
				if(getParam('detailToOrder')) {
					//					for(var i = 0; i < data.resultMap.list.length; i++) {
					var khtml = '';

					var drugInfo = data.resultMap.map;
					khtml += '<li class="mui-table-view-cell mui-media">';
					khtml += '<div class="cid" style="display:none;">' + drugInfo.drugId + '</div>';
					khtml += '<div class="right_box mui-slider-handle">';
					khtml += '<div class="border-bottom">';
					khtml += '<div class="productImgs">';
					if(data.resultMap.imgUrl != null && data.resultMap.imgUrl != "") {
						khtml += '<img src="' + data.resultMap.imgUrl + '" alt="" />';
					} else {
						khtml += '<img src="../../../styles/img/shop_img/productImg1.png" alt="" />';
					}
					khtml += '</div>';
					khtml += '<div class="product_info">';
					khtml += '<div>';
					khtml += '<span class="pro_font shopofname">' + drugInfo.fullName + '</span>';
					khtml += '</div>';
					khtml += '<div>';
					khtml += '<span class="pro_font">规格为：</span>';
					khtml += '<span class="pro_font">' + drugInfo.standard + '</span>';
					khtml += '</div>';
					khtml += '<div class="RMB_single">';
					khtml += '<span class="RMB">￥</span>';
					khtml += '<span class="RMBmoney_count">' + drugInfo.drugPrice + '</span>';
					if(drugInfo.unit1 !== undefined && drugInfo.unit1 !== "" && drugInfo.unit1 !== null) {
						khtml += '<span class="RMBmoney_unit">/' + drugInfo.unit1 + '</span>';
					}
					khtml += '</div>';
					khtml += '<div class="num">';
					khtml += '<div class="realNum">×' + drugInfo.number + '</div>';
					khtml += '<div class="numEdit"style="display:block;">';
					khtml += '<div class="num_calculate">';
					khtml += '<div class="sup_num mui-text-center">';
					khtml += '<span>-</span>';
					khtml += '</div>';
					khtml += '<div class="mid_num">';
					khtml += '<input class="num_pro mui-text-center" type="text" value="' + drugInfo.number + '" />';
					khtml += '</div>';
					khtml += '<div class="add_num mui-text-center">';
					khtml += '<span>+</span>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '<div class="productid" style="display: none;"></div>';
					khtml += '<div class="storeid" style="display: none;"></div>';
					khtml += '<div class="companyid" style="display: none;"></div>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</li>';
					$(".shop_count").text(drugInfo.number); //商品总量	
					$(".RMB_total").text(data.resultMap.totalPrice); //商品小计
					$(".productMoneyTotal").text(data.resultMap.totalPrice); //商品金额
					$(".freeMoney").text(data.resultMap.discount); //优惠金额
					$(".expressDeliveryCell").text(data.resultMap.express); //运费
					$(".shop_count_all").text(drugInfo.number); //结算条总数
					$(".RMB_total_all").text(data.resultMap.amountPayable); //结算条应付金额

					goodsNum = drugInfo.number; //商品数传值
					totalPrice = parseFloat($(".RMB_total").text().trim());

					$("#res_list").append(khtml);
					//					}
				} else if(getParam('packagedDetailToOrder')) { //套餐	
					var drugInfo = data.resultMap.mealInfo;
					var khtml = '';
					khtml += '<li class="mui-table-view-cell mui-media" style="margin-bottom: 18px;">';
					khtml += '<div class="packageTitle">';
					khtml += '<div class="packageTitleInfo">' + drugInfo.mealName
					khtml += '<div class="hiddenPackageCid" style="display:none;">' + drugInfo.id + '</div>';
					//						khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid+ '</div>';
					khtml += '</div>';
					khtml += '</div>';

					//						khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid + '</div>';
					for(var k = 0; k < drugInfo.mealList.length; k++) {
						khtml += '<div class="right_box mui-slider-handle">';
						khtml += '<div class="border-bottom">';
						khtml += '<div class="productImgs">';
						if(drugInfo.mealList[k].fileUrl != null && drugInfo.mealList[k].fileUrl != "") {
							khtml += '<img src="' + drugInfo.mealList[k].fileUrl + '" alt="" />';
						} else {
							khtml += '<img src="../../../styles/img/shop_img/productImg1.png" alt="" />';
						}
						khtml += '</div>';
						khtml += '<div class="product_info">';
						khtml += '<div>';
						khtml += '<span class="pro_font shopofname">' + drugInfo.mealList[k].fullName + '</span>';
						khtml += '</div>';
						khtml += '<div>';
						khtml += '<span class="pro_font">规格为：</span>';
						khtml += '<span class="pro_font">' + drugInfo.mealList[k].specs + '</span>';
						khtml += '</div>';
						khtml += '<div class="RMB_single">';
						khtml += '<span class="RMB">￥</span>';
						khtml += '<span class="RMBmoney_count">' + drugInfo.mealList[k].presentPrice + '</span>';
						khtml += '<span class="RMBmoney_unit">/' + drugInfo.mealList[k].unit + '</span>';
						khtml += '</div>';
						khtml += '<div class="num">';
						khtml += '<div class="realNum"style="display:block;">×' + drugInfo.mealList[k].drugNum + '</div>';
						khtml += '</div>';

						khtml += '<div class="RMB_single RMB_original">';
						khtml += '<span class="RMB">￥</span>';
						khtml += '<span class="RMBmoney_count">' + drugInfo.mealList[k].drugPrice.toFixed(2) + '</span>';
						khtml += '<span class="RMBmoney_unit">/' + drugInfo.mealList[k].unit + '</span>';
						khtml += '</div>';

						khtml += '</div>';
						khtml += '<div class="productid" style="display: none;"></div>';
						khtml += '<div class="storeid" style="display: none;"></div>';
						khtml += '<div class="companyid" style="display: none;"></div>';
						khtml += '</div>';
						khtml += '</div>';
					}
					khtml += '<div class="numBottom">';

					khtml += '<div class="setMeal_price">';
					khtml += '<span class="setMeal_title">套餐价</span>';
					khtml += '￥<span class="setMeal_num">' + data.resultMap.mealPrice + '</span>';
					khtml += '</div>';
					khtml += '<div class="setMeal_number">';

					khtml += '<div class="num">';
					khtml += '<div class="realNum">×' + data.resultMap.goodNum + '</div>';
					khtml += '<div class="numEdit"style="display:block;">';
					khtml += '<div class="num_calculate">';
					khtml += '<div class="sup_num mui-text-center" data-val="1">';
					khtml += '<span>-</span>';
					khtml += '</div>';
					khtml += '<div class="mid_num">';
					khtml += '<input class="num_pro mui-text-center" data-val="1" type="text" value="' + data.resultMap.goodNum + '" />';
					khtml += '</div>';
					khtml += '<div class="add_num mui-text-center" data-val="1">';
					khtml += '<span>+</span>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</div>';
					khtml += '</div>';

					khtml += '</div>';

					khtml += '</div>';
					khtml += '</li>';

					$(".shop_count").text(data.resultMap.goodNum); //商品总量	
					$(".RMB_total").text(drugInfo.totalPrice); //商品小计
					$(".productMoneyTotal").text(drugInfo.totalPrice); //商品金额
					$(".freeMoney").text(drugInfo.discountPrice); //优惠金额
					$(".expressDeliveryCell").text(data.resultMap.express); //运费
					$(".shop_count_all").text(data.resultMap.goodNum); //结算条总数
					$(".RMB_total_all").text(data.resultMap.amountPayable); //结算条应付金额

					goodsNum = data.resultMap.goodNum; //商品数传值
					totalPrice = parseFloat($(".RMB_total").text().trim());
					$("#res_list").append(khtml);
				} else {
					for(var i = 0; i < data.resultMap.list.length; i++) {
						var drugInfo = data.resultMap.list[i].drugInfo.mealList;
						console.log(drugInfo)
						var khtml = '';
						if(drugInfo) { //套餐
							khtml += '<li class="mui-table-view-cell mui-media" style="margin-bottom: 18px;">';

							khtml += '<div class="packageTitle">';
							khtml += '<div class="packageTitleInfo">' + data.resultMap.list[i].drugInfo.mealName
							khtml += '<div class="hiddenPackageCid" style="display:none;">' + data.resultMap.list[i].drugInfo.id + '</div>';
							khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid + '</div>';
							khtml += '</div>';
							khtml += '</div>';

							//						khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid + '</div>';
							for(var k = 0; k < drugInfo.length; k++) {
								khtml += '<div class="right_box mui-slider-handle">';
								khtml += '<div class="border-bottom">';
								khtml += '<div class="productImgs">';
								if(drugInfo[k].fileUrl != null && drugInfo[k].fileUrl != "") {
									khtml += '<img src="' + drugInfo[k].fileUrl + '" alt="" />';
								} else {
									khtml += '<img src="../../../styles/img/shop_img/productImg1.png" alt="" />';
								}
								khtml += '</div>';
								khtml += '<div class="product_info">';
								khtml += '<div>';
								khtml += '<span class="pro_font shopofname">' + drugInfo[k].fullName + '</span>';
								khtml += '</div>';
								khtml += '<div>';
								khtml += '<span class="pro_font">规格为：</span>';
								khtml += '<span class="pro_font">' + drugInfo[k].specs + '</span>';
								khtml += '</div>';
								khtml += '<div class="RMB_single">';
								khtml += '<span class="RMB">￥</span>';
								khtml += '<span class="RMBmoney_count">' + drugInfo[k].presentPrice + '</span>';
								khtml += '<span class="RMBmoney_unit">/' + drugInfo[k].unit + '</span>';
								khtml += '</div>';
								khtml += '<div class="num">';
								khtml += '<div class="realNum"style="display:block;">×' + drugInfo[k].drugNum + '</div>';
								khtml += '</div>';

								khtml += '<div class="RMB_single RMB_original">';
								khtml += '<span class="RMB">￥</span>';
								khtml += '<span class="RMBmoney_count">' + drugInfo[k].drugPrice.toFixed(2) + '</span>';
								khtml += '<span class="RMBmoney_unit">/' + drugInfo[k].unit + '</span>';
								khtml += '</div>';

								khtml += '</div>';
								khtml += '<div class="productid" style="display: none;"></div>';
								khtml += '<div class="storeid" style="display: none;"></div>';
								khtml += '<div class="companyid" style="display: none;"></div>';
								khtml += '</div>';
								khtml += '</div>';
							}
							khtml += '<div class="numBottom shop">';

							khtml += '<div class="setMeal_price ">';
							khtml += '<span class="setMeal_title">套餐价</span>';
							khtml += '￥<span class="setMeal_num">' + data.resultMap.list[i].drugInfo.totalPrice + '</span>';
							khtml += '</div>';
							khtml += '<div class="setMeal_number">';
							khtml += '×<span class="setMeal_num">' + data.resultMap.list[i].drugNum + '</span>';
							khtml += '</div>';

							khtml += '</div>';
							khtml += '</li>';
						} else {
							var drugInfo = data.resultMap.list[i].drugInfo;
							khtml += '<li class="mui-table-view-cell mui-media">';
							khtml += '<div class="cid" style="display:none;">' + data.resultMap.list[i].cid + '</div>';
							khtml += '<div class="right_box mui-slider-handle">';
							khtml += '<div class="border-bottom">';
							khtml += '<div class="productImgs">';
							if(data.resultMap.list[i].imgUrl != null && data.resultMap.list[i].imgUrl != "") {
								khtml += '<img src="' + data.resultMap.list[i].imgUrl + '" alt="" />';
							} else {
								khtml += '<img src="../../../styles/img/shop_img/productImg1.png" alt="" />';
							}
							khtml += '</div>';
							khtml += '<div class="product_info">';
							khtml += '<div>';
							khtml += '<span class="pro_font shopofname">' + drugInfo.fullName + '</span>';
							khtml += '</div>';
							khtml += '<div>';
							khtml += '<span class="pro_font">规格为：</span>';
							khtml += '<span class="pro_font">' + drugInfo.standard + '</span>';
							khtml += '</div>';
							khtml += '<div class="RMB_single">';
							khtml += '<span class="RMB">￥</span>';
							khtml += '<span class="RMBmoney_count">' + drugInfo.retailPrice + '</span>';
							khtml += '<span class="RMBmoney_unit">/' + drugInfo.unit1 + '</span>';
							khtml += '</div>';
							khtml += '<div class="num">';
							khtml += '<div class="realNum"style="display:block;">×' + data.resultMap.list[i].drugNum + '</div>';
							khtml += '</div>';
							khtml += '</div>';
							khtml += '<div class="productid" style="display: none;"></div>';
							khtml += '<div class="storeid" style="display: none;"></div>';
							khtml += '<div class="companyid" style="display: none;"></div>';
							khtml += '</div>';
							khtml += '</div>';
							khtml += '</li>';
						}

						$("#res_list").append(khtml);
					}
					$(".shop_count").text(data.resultMap.goodNum); //商品总量	
					$(".RMB_total").text(data.resultMap.totalPrice); //商品小计
					$(".productMoneyTotal").text(data.resultMap.totalPrice); //商品金额
					$(".freeMoney").text(data.resultMap.discountPrice); //优惠金额
					$(".expressDeliveryCell").text(data.resultMap.express); //运费
					$(".shop_count_all").text(data.resultMap.goodNum); //结算条总数
					$(".RMB_total_all").text(data.resultMap.amountPayable); //结算条应付金额
					goodsNum = data.resultMap.goodNum; //商品数传值
					productNumber = parseFloat($(".shop_count").text().trim());
					/*总计*/
					totalPrice = parseFloat($(".RMB_total").text().trim());
				}

			} else {
				mui.toast("服务器错误，请稍后再试");
			}
		},
		error: function(data) {
			mui.toast("服务器错误，请稍后再试");
		}
	});
}

/*开票信息*/
$('#invoice_title_input').delegate('#check_box', 'click', function() {
	var inputNode = document.getElementsByClassName('input_editor');
	if($('#check_box')[0].checked == true) {
		$('#invoice_info_content').css('display', 'block');
		for(var i = 0; i < inputNode.length; i++) {
			inputNode[i].removeAttribute('disabled');
		}
	} else {
		for(var i = 0; i < inputNode.length; i++) {
			inputNode[i].setAttribute('disabled', 'true');
		}
		$('#invoice_info_content').css('display', 'none');
		$('#invoice_head').val('');
		$('#bank_name').val('');
		$('#account_num').val('');
		$('#invoice_num').val('');
	}
});
$(".leaveMsg").blur(function() {
	localStorage.setItem("leaveMsg", $(".leaveMsg").val());
});
/*编写收货地址*/
var isShow = true;
var goodsNum; //商品数
//商品详情跳转获取商品列表
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
//点击开发票
$(document).on("tap", "#jumpEditInvoice", function() {
	if(getParam('detailToOrder')) {
		window.location.href = "bill.html";
	} else {
		window.location.href = "bill.html?detailToOrder=1&cid=" + getParam('cid') + "&num=" + getParam('num') + "&storeNum=" + getParam('storeNum');
	}
});
//计算价格
/*数量加*/

$("body").delegate('.add_num', 'tap', function() {
	var proNum = this.parentElement.firstElementChild.nextElementSibling.firstElementChild;
	var currentStoreNum = Number(getParam('storeNum'));
	var RMB_total = $(".RMB_total").text().trim();
	var freeMoney = Number($(".freeMoney").text()); //优惠金额
	var expressDeliveryCell = Number($(".expressDeliveryCell").text()) //运费
	console.log(freeMoney)
	console.log(expressDeliveryCell)

	if($(this).attr("data-val") == 1) { //套餐
		console.log($(this).attr("data-val"))
		var single_pri = $(this).parents(".numBottom").find(".setMeal_num").text();
		var single_num = $(this).parent().find(".num_pro").val();
		proNum.value++;
		productNumber++;
		totalPrice += parseFloat(single_pri);
	} else {
		var single_pri = $(this).parent().parent().parent().parent().parent().parent().parent().find(".RMBmoney_count").text();
		var single_num = $(this).parent().parent().parent().parent().parent().parent().parent().find(".num_pro").val();
		if(proNum.value >= 1 && proNum.value < currentStoreNum) {
			proNum.value++;
			productNumber++;
			totalPrice += parseFloat(single_pri);
		} else {
			totalPrice = parseFloat(RMB_total);
		}
	}
	if(getParam('detailToOrder')) { //从商品详情立即下单
		cartlist = getParam('cid');
		var subNum = $(".num").text();
		var buyquick = {
			"rec": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	} else if(getParam('packagedDetailToOrder')) {
		cartlist = getParam('mealId');
		var subNum = $(".num").text();
		var buyquick = {
			"mealId": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	}
	var disNum = proNum.value;
	shopCount();
	console.log(totalPrice);

	priceCount();
});
/*数量减*/
$("body").delegate('.sup_num', 'tap', function() {
	var proNum = this.parentElement.firstElementChild.nextElementSibling.firstElementChild;
	if($(this).attr("data-val") == 1) { //套餐
		var single_pri = $(this).parents(".numBottom").find(".setMeal_num").text();
		var single_num = $(this).parent().find(".num_pro").val();
	} else {
		var single_pri = $(this).parent().parent().parent().parent().parent().parent().parent().find(".RMBmoney_count").text().trim();
		var single_num = $(this).parent().parent().parent().parent().parent().parent().parent().find(".num_pro").val().trim();
	}
	if(proNum.value > buyNum) {
		proNum.value--;
		productNumber--;
		shopCount();
		totalPrice -= parseFloat(single_pri);
		priceCount();
	} else {
		mui.toast('不能少于起订量' + buyNum);
	}
	if(getParam('detailToOrder')) { //从商品详情立即下单
		cartlist = getParam('cid');
		var subNum = $(".num").text();
		var buyquick = {
			"rec": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	} else if(getParam('packagedDetailToOrder')) {
		cartlist = getParam('mealId');
		var subNum = $(".num").text();
		var buyquick = {
			"mealId": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	}
	//	var disNum = shopCUT - proNum.value;
});
/*计算数量*/
function shopCount() {
	$('.shop_count').text(productNumber);
	$('.shop_count_all').text(productNumber);
}
/*计算价格*/
function priceCount() {
	$('.RMB_total').text(totalPrice.toFixed(2));
	$('.RMB_total_all').text(totalPrice.toFixed(2));
	$(".productMoneyTotal").text(totalPrice.toFixed(2));
}

//编辑数量失焦
$(document).on('blur', '.num_pro', function() {
	var liNode = $("#res_list");
	var childsNode = liNode.find("li");
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	var isAllChecked = true;
	var currentStoreNum = Number(getParam('storeNum'));
	if($(this).val() == "" || $(this).val() == null || $(this).val() == 0) {
		$(this).val(buyNum);
	}
	if($(this).attr("data-val") == 1) { //套餐
		var single_pri = $(this).parents(".numBottom").find(".setMeal_num").text();
		var single_num = $(this).val();
		for(var i = 0; i < childsNode.length; i++) {
			console.log($(childsNode[i]).find(".setMeal_num").text().trim());
			checkedPrice += parseFloat($(childsNode[i]).find(".setMeal_num").text().trim()) * parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			checkedNum += parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			checkedNode++;
		}
	} else {
		//价格相关节点及价格
		var singlePri = $(this).parent().parent().parent().parent().find(".RMBmoney_count").text();
		var singleNum = $(this).parent().parent().parent().parent().find(".num_pro").val();
		if($(this).val().trim() > currentStoreNum) {
			$(this).val(currentStoreNum);
			mui.toast("数量超出库存");
		}
		for(var i = 0; i < childsNode.length; i++) {
			console.log($(childsNode[i]).find(".RMBmoney_count").text().trim());
			checkedPrice += parseFloat($(childsNode[i]).find(".RMBmoney_count").text().trim()) * parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			checkedNum += parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			checkedNode++;
		}
	}

	var single_totalPrice = singlePri * singleNum;
	console.log(checkedPrice);
	productNumber = checkedNum;
	if(getParam('detailToOrder')) { //从商品详情立即下单
		cartlist = getParam('cid');
		var subNum = $(".num").text();
		var buyquick = {
			"rec": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	} else if(getParam('packagedDetailToOrder')) {
		cartlist = getParam('mealId');
		var subNum = $(".num").text();
		var buyquick = {
			"mealId": cartlist,
			"userId": userId,
			"number": productNumber,
			"price": buyQuickPrice,
			"carriage": buyQuickCarriage
		};
		orderList('/drug/cart/buyImmediately', buyquick);
	}
	shopCount();
	//计算价格
	totalPrice = checkedPrice + parseFloat($(".expressDelivery").text().trim());
	priceCount();
});

function editorLocation() {
	$.ajax({
		type: "get",
		url: config + "/drug/userAdress/list",
		async: true,
		data: {
			"userId": window.webUser.id
		},
		success: function(data) {
			console.log(data.resultMap.list);
			if(data.resultMap.list.length == 0) {
				if(getParam('detailToOrder')) {
					var jumpDetailToOrder = getParam('detailToOrder');
					var jumpCid = getParam('cid');
					var jumpNum = getParam('num');
					var jumpStoreNum = getParam('storeNum');
					sessionStorage.setItem("changeIndex", "");
					window.location.href = "../../address/add/add.html?detailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //新增地址
				} else if(getParam('packagedDetailToOrder')) {
					var jumpDetailToOrder = getParam('packagedDetailToOrder');
					var jumpCid = getParam('cid');
					var jumpNum = getParam('num');
					var jumpStoreNum = getParam('storeNum');
					sessionStorage.setItem("changeIndex", "");
					window.location.href = "../../address/add/add.html?packagedDetailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //新增地址
				} else {
					sessionStorage.setItem("changeIndex", "");
					window.location.href = "../../address/add/add.html";
				}
			} else {
				if(getParam('detailToOrder')) {
					var jumpDetailToOrder = getParam('detailToOrder');
					var jumpCid = getParam('cid');
					var jumpNum = getParam('num');
					var jumpStoreNum = getParam('storeNum');
					window.location.href = "../../address/add_address.html?detailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //地址列表
				} else if(getParam('packagedDetailToOrder')) {
					var jumpDetailToOrder = getParam('packagedDetailToOrder');
					var jumpCid = getParam('cid');
					var jumpNum = getParam('num');
					var jumpStoreNum = getParam('storeNum');
					window.location.href = "../../address/add_address.html?packagedDetailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //地址列表
				} else {
					window.location.href = "../../address/add_address.html"; //地址列表
				}
			}
		},
		error: function(data) {
			console.log(data);
		}
	});

}

function editorLocationList() {
	if(getParam('detailToOrder')) {
		var jumpDetailToOrder = getParam('detailToOrder');
		var jumpCid = getParam('cid');
		var jumpNum = getParam('num');
		var jumpStoreNum = getParam('storeNum');
		window.location.href = "../../address/add_address.html?detailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //地址列表
	} else if(getParam('packagedDetailToOrder')) {
		var jumpDetailToOrder = getParam('packagedDetailToOrder');
		var jumpCid = getParam('cid');
		var jumpNum = getParam('num');
		var jumpStoreNum = getParam('storeNum');
		window.location.href = "../../address/add_address.html?packagedDetailToOrder=" + jumpDetailToOrder + "&cid=" + jumpCid + "&num=" + jumpNum + "&storeNum=" + jumpStoreNum; //地址列表
	} else {
		window.location.href = "../../address/add_address.html"; //地址列表
	}
}
//结算
$(".settleAccounts").click(function() {
	if($("#editor_goods_info").css("display") == "block") {
		mui.toast("请填写收货地址");
	} else {
		$('#wait_dialog').css('display', 'block');
		$('#bg').css('display', 'block');
		var orderUser = $(".receiverName").text(); //用户姓名 
		var phone = $(".receiverTel").text(); //联系电话  
		var address = $(".receiverAddr").text(); //送货地址   
		var payType = "在线支付"; //支付类别   
		var orderRemarks = $(".leaveMsg").val(); //备注   
		goodsNum = $(".shop_count_all").text();
		if(getParam('detailToOrder')) {
			var subData = {
				drugId: cartlist,
				userId: userId,
				drugNum: productNumber,
				itemCount: productNumber,
				orderUser: orderUser, //用户姓名 
				phone: phone, //联系电话  
				address: address, //送货地址   
				payType: payType, //支付类别  
				orderRemarks: orderRemarks, //备注    
				aid: addrId, //地址id
				invoiceType: InvoiceType, //发票类型（1，电子发票 2 ，纸质发票）
				invoicePayable: titleType, //发票抬头（1，个人 2，公司）
				content: personTitleContent, //抬头内容
				invoiceName: titleCompanyName, //公司名称
				dutySign: titleTaxNum, //纳税人识别号
				fromType: 2,
				businessAddress: businessAddress, //企业地址    
				businessPhone: businessPhone, //企业电话    
				openBank: openBank, //开户行  
				bankAccount: bankAccount, //银行账户
				vatType: vatType //增值税
			}
		} else if(getParam('packagedDetailToOrder')) {
			var subData = {
				mealId: cartlist,
				userId: userId,
				drugNum: productNumber,
				itemCount: productNumber,
				orderUser: orderUser, //用户姓名 
				phone: phone, //联系电话  
				address: address, //送货地址   
				payType: payType, //支付类别  
				orderRemarks: orderRemarks, //备注    
				aid: addrId, //地址id
				invoiceType: InvoiceType, //发票类型（1，电子发票 2 ，纸质发票）
				invoicePayable: titleType, //发票抬头（1，个人 2，公司）
				content: personTitleContent, //抬头内容
				invoiceName: titleCompanyName, //公司名称
				dutySign: titleTaxNum, //纳税人识别号
				fromType: 2,
				businessAddress: businessAddress, //企业地址    
				businessPhone: businessPhone, //企业电话    
				openBank: openBank, //开户行  
				bankAccount: bankAccount, //银行账户
				vatType: vatType //增值税
			}
		} else {
			var subData = {
				cid: cartlist,
				userId: userId,
				itemCount: goodsNum,
				orderUser: orderUser, //用户姓名 
				phone: phone, //联系电话  
				address: address, //送货地址   
				payType: payType, //支付类别  
				orderRemarks: orderRemarks, //备注    
				aid: addrId, //地址id
				invoiceType: InvoiceType, //发票类型（1，电子发票 2 ，纸质发票）
				invoicePayable: titleType, //发票抬头（1，个人 2，公司）
				content: personTitleContent, //抬头内容
				invoiceName: titleCompanyName, //公司名称
				dutySign: titleTaxNum, //纳税人识别号
				fromType: 1,
				businessAddress: businessAddress, //企业地址    
				businessPhone: businessPhone, //企业电话    
				openBank: openBank, //开户行  
				bankAccount: bankAccount, //银行账户
				vatType: vatType //增值税
			}
			console.log(subData)
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
					$('#wait_dialog').css('display', 'none');
					$('#bg').css('display', 'none');
					localStorage.removeItem("titleType");
					localStorage.removeItem("titleContent");
					localStorage.removeItem("titleCompanyName");
					localStorage.removeItem("titleTaxNum");
					localStorage.setItem("orderId", data.resultMap.orderId);
					window.location.href = "../../pay/pay.html";
				} else {
					$('#wait_dialog').css('display', 'none');
					$('#bg').css('display', 'none');
				}
			},
			error: function(data) {
				mui.toast("服务器错误，请稍后再试");
				$('#wait_dialog').css('display', 'none');
				$('#bg').css('display', 'none');
			}
		});
	}

})
//点击返回箭头
var pageHref = window.location.href;
console.log(pageHref)
console.log(pageHref.indexOf("?") != -1)
$("#headerBG a").click(function() {

	if(getParam('detailToOrder')) {

		console.log("有问号")
		window.location.href = "../../shop/goods_detail.html?rec=" + cartlist;
	} else if(getParam('packagedDetailToOrder')) {
		let mealId = getParam('mealId');
		console.log(mealId)
		window.location.href = "../../shop/packageDetails.html?packageRec=" + cartlist;
	} else {
		console.log("没有问号")
		window.location.href = "../shopcart_index.html";
	}
	//	window.location.href = "../shopcart_index.html";

	//	清除发票信息
	localStorage.removeItem("titleType");
	localStorage.removeItem("titleContent");
	localStorage.removeItem("titleCompanyName");
	localStorage.removeItem("titleTaxNum");
	sessionStorage.removeItem("addressObj");
	localStorage.removeItem("leaveMsg");
	//	清除地址信息
})