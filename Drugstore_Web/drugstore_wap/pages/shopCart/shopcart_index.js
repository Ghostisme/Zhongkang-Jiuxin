mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui.init({

	pullRefresh: {

		container: '#scroll1',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
//下拉刷新
function pulldownRefresh() {
	mui('#scroll1').pullRefresh();
	setTimeout(function() {
		$('#ul_pro').html('');
		getshopCartList();
		mui('#scroll1').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500)
}
var productOrderJumpId = localStorage.getItem("prodcutIds");
//上拉加载
var count = 1;
var orderpage_price = false; //订单跳转
function pullupRefresh() {
	setTimeout(function() {
		mui('#scroll1').pullRefresh().endPullupToRefresh((++count > pageCount)); //参数为true代表没有更多数据了。
		if(++count <= pageCount) {
			currentPage++;
			offset += 10;
			getshopCartList();
		}
	}, 800)
}
if(!window.webUser) {
	window.location.href = "../login/login.html";
}

function getParam(paramName) { //获取url参数
	paramValue = "", isFound = !1;
	if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
/*列表滑动*/
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
var userid;
userid = getCookie('userId');
var buyerid;
if(userid == null || userid == "") {
	buyerid = 0;
} else {
	buyerid = userid;
}
/*结算的数量*/
var productNumber = 0;
/*总计*/
var totalPrice = 0;
//var shopCUT = 0;
var addShopPri = 0;
var singleTotalPri = 0;
var shoppcount;
var buyNum = 1;
var httpURL = 'http://192.168.18.126:8080/gcafu_commerce/rest';
var userId = window.webUser.id; //用户id
var currentPage = 1;
var offset = 0;
var pageCount;
/*判断如果是火狐浏览器，使用下面样式*/
if(navigator.userAgent.indexOf('Firefox') >= 0) {
	$('#all_check_btn').css({
		"margin-top": "10px"
	});
}
var isCheckedArrMain = '';
/*获取购物车列表*/
getshopCartList();

function getshopCartList() {

	$.ajax({
		type: "GET",
		url: config + "/drug/cart/list",
		contentType: "json; charset=utf-8",
		async: false,
		data: {
			userId: userId,
			offset: currentPage, //当前页
			limit: 10
		},
		dataType: 'JSON',
		//	JSONP: "callback",
		success: function(data) {

			//		alert(data.code);
			//		var listArr = new Array();
			if(data.status == 1) {
				$(".bottomWarn").show()
				$(".loading").hide()
				var html = '';
				var ulNode = $('#ul_pro');
				//				$('#ul_pro').html('');
				pageCount = Math.ceil(data.resultMap.count / 10);
				if(pageCount <= 1) {
					$('#ul_pro').html('');
				}
				if(data.resultMap.drugInfoList.length > 0) {
					$('#ul_pro').css("background", "#fff");
				} else {
					$('#ul_pro').css("background", "transparent");
				}
				for(var i = 0; i < data.resultMap.drugInfoList.length; i++) {
					var cHtml = '';
					//					var drugInfo = JSON.parse(data.resultMap.drugInfoList[i].drugInfo);
					var drugInfo = data.resultMap.drugInfoList[i].info;
					if(drugInfo) {
						var mealList = drugInfo.mealList;
						if(data.resultMap.drugInfoList[i].type == 0) {
							cHtml += '<li class="mui-table-view-cell mui-media set-meal" style="margin-bottom: 18px; filter: grayscale(100%);">';
							cHtml += '<div class="timeoutMeal" >失效套餐';
							cHtml += '</div>';
						} else {
							cHtml += '<li class="mui-table-view-cell mui-media simpleOrder set-meal li" style="margin-bottom: 18px;">';
						}
						cHtml += '<div class="packageTitle">';
						if(data.resultMap.drugInfoList[i].type != 0) {
							cHtml += '<div class="right_box mui-slider-handle">';
							cHtml += '<div class="check_box mui-input-row property mui-checkbox mui-left">';
							cHtml += '<input class="check_single_btn" data-val="1" name="checkbox1" value="1" type="checkbox">';
							cHtml += '</div>';
							cHtml += '</div>';
						} else {
							cHtml += '<div class="right_box mui-slider-handle">';
							cHtml += '<div class="check_box mui-input-row property mui-checkbox mui-left">';
							//						cHtml += '<input class="check_single_btn" data-val="1" name="checkbox1" value="1" type="checkbox" style="pointer-events: all" >';
							cHtml += '</div>';
							cHtml += '</div>';
						}

						cHtml += '<div class="packageTitleInfo">' + drugInfo.mealName
						cHtml += '<div class="hiddenPackageCid" style="display:none;">' + drugInfo.id + '</div>';
						cHtml += '<div class="mealId currentDrugId" style="display:none;">' + data.resultMap.drugInfoList[i].mealId + '</div>';
						cHtml += '<div class="cid" style="display:none;">' + data.resultMap.drugInfoList[i].cid + '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
						for(var k = 0; k < mealList.length; k++) {
							//						cHtml += '<div class="currentDrugId" style="display:none;">' + mealList[k].drugId + '</div>';
							cHtml += '<div class="currentStoreNum" style="display:none;">' + mealList[k].qty + '</div>';
							cHtml += '<div class="mui-slider-right mui-disabled">';
							cHtml += '<a class="mui-btn mui-btn-red">删除</a>';
							cHtml += '</div>';
							cHtml += '<div class="rightBox mui-slider-handle">';
							//						cHtml += '<div class="check_box mui-input-row property mui-checkbox mui-left">';
							//						cHtml += '<input class="check_single_btn" name="checkbox1" value="1" type="checkbox">';
							//						cHtml += '</div>';
							cHtml += '<div class="border-bottom">';
							if(data.resultMap.drugInfoList[i].type == 0) {
								cHtml += '<div class="productImgs" style="pointer-events: none">';
							} else {
								cHtml += '<div class="productImgs">';
							}
							if(mealList[k].fileUrl != null && mealList[k].fileUrl != "") {
								cHtml += '<img src="' + mealList[k].fileUrl + '" alt="" />';
							} else {
								cHtml += '<img src="../../styles/img/shop_img/productImg1.png" alt="" />';
							}
							cHtml += '</div>';
							if(data.resultMap.drugInfoList[i].type == 0) {
								cHtml += '<div class="product_info product_setmeal" style="pointer-events: none">';
							} else {
								cHtml += '<div class="product_info product_setmeal">';
							}
							cHtml += '<div>';
							cHtml += '<span class="pro_font shopofname">' + mealList[k].fullName + '</span>';
							cHtml += '</div>';
							cHtml += '<div>';
							cHtml += '<span class="pro_font">规格为：</span>';
							cHtml += '<span class="pro_font">' + mealList[k].specs + '</span>';
							cHtml += '</div>';
							cHtml += '<div class="RMB_single">';
							cHtml += '<span class="RMB">￥</span>';
							cHtml += '<span class="RMBmoney_count">' + mealList[k].presentPrice + '</span>';
							cHtml += '<span class="RMBmoney_unit">/' + mealList[k].unit + '</span>';
							cHtml += '<span class="RMBmoney_nums">×' + mealList[k].drugNum + '</span>';
							cHtml += '</div>';
							cHtml += '<div class="RMB_single RMB_original">';
							cHtml += '<span class="RMB">￥</span>';
							cHtml += '<span class="RMBmoney_count">' + mealList[k].drugPrice.toFixed(2) + '</span>';
							cHtml += '<span class="RMBmoney_unit">/' + mealList[k].unit + '</span>';
							cHtml += '</div>';
							cHtml += '</div>';
							cHtml += '<div class="productid" style="display: none;"></div>';
							cHtml += '<div class="storeid" style="display: none;"></div>';
							cHtml += '<div class="companyid" style="display: none;"></div>';
							cHtml += '</div>';
							cHtml += '</div>';
						}
						cHtml += '<div class="numBottom">';

						cHtml += '<div class="setMeal_price">';
						cHtml += '<span class="setMeal_title">套餐价</span>';
						cHtml += '￥<span class="setMeal_numo">' + drugInfo.countPrice + '</span>';
						if(data.resultMap.drugInfoList[i].type == 0) {
							cHtml += '<span class="setMeal_num num_all" style="display: none;">' + 0 + '</span>';
						} else {
							cHtml += '<span class="setMeal_num num_all all_price" style="display: none;">' + drugInfo.totalPrice + '</span>';
						}
						cHtml += '</div>';

						cHtml += '<div class="num">';
						cHtml += '<div class="numEdit">';
						if(data.resultMap.drugInfoList[i].type == 0) {
							cHtml += '<div class="num_calculate" style="pointer-events: none">';
						} else {
							cHtml += '<div class="num_calculate">';
						}
						cHtml += '<div class="sup_num mui-text-center" data-val="1">';
						cHtml += '<span>-</span>';
						cHtml += '</div>';
						cHtml += '<div class="mid_num">';
						if(data.resultMap.drugInfoList[i].type == 0) {
							cHtml += '<input class="mui-text-center past_pro" data-val="1" type="text" value="' + data.resultMap.drugInfoList[i].drugNum + '" />';
						} else {
							cHtml += '<input class="num_pro mui-text-center" data-val="1" type="text" value="' + data.resultMap.drugInfoList[i].drugNum + '" />';
						}
						cHtml += '</div>';
						cHtml += '<div class="add_num mui-text-center" data-val="1">';
						cHtml += '<span>+</span>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';

						cHtml += '</div>';
						cHtml += '</li>';
					} else {
						cHtml += '<li class="mui-table-view-cell mui-media simpleOrder li">';
						if(data.resultMap.drugInfoList[i].sign != "" && data.resultMap.drugInfoList[i].sign != null) {
							cHtml += '<div class="sign" style="display:none;">' + data.resultMap.drugInfoList[i].sign + '</div>';
						}
						cHtml += '<div class="currentDrugId" style="display:none;">' + data.resultMap.drugInfoList[i].drugId + '</div>';
						cHtml += '<div class="cid" style="display:none;">' + data.resultMap.drugInfoList[i].cid + '</div>';
						cHtml += '<div class="currentStoreNum" style="display:none;">' + data.resultMap.drugInfoList[i].qty + '</div>';
						cHtml += '<div class="mui-slider-right mui-disabled">';
						cHtml += '<a class="mui-btn mui-btn-red">删除</a>';
						cHtml += '</div>';
						cHtml += '<div class="right_box mui-slider-handle">';
						cHtml += '<div class="check_box mui-input-row property mui-checkbox mui-left">';
						cHtml += '<input class="check_single_btn" name="checkbox1" value="1" type="checkbox">';
						cHtml += '</div>';
						cHtml += '<div class="border-bottom">';
						cHtml += '<div class="productImgs">';
						if(data.resultMap.drugInfoList[i].imgUrl != null && data.resultMap.drugInfoList[i].imgUrl != "") {
							cHtml += '<img src="' + data.resultMap.drugInfoList[i].imgUrl + '" alt="" />';
						} else {
							cHtml += '<img src="../../styles/img/shop_img/productImg1.png" alt="" />';
						}
						cHtml += '</div>';
						cHtml += '<div class="product_info">';
						cHtml += '<div>';
						cHtml += '<span class="pro_font shopofname">' + data.resultMap.drugInfoList[i].fullName + '</span>';
						cHtml += '</div>';
						cHtml += '<div>';
						cHtml += '<span class="pro_font">规格为：</span>';
						cHtml += '<span class="pro_font">' + data.resultMap.drugInfoList[i].specs + '</span>';
						cHtml += '</div>';
						cHtml += '<div class="RMB_single">';
						cHtml += '<span class="RMB">￥</span>';
						cHtml += '<span class="RMBmoney_count num_all simpleProductPrice all_price">' + data.resultMap.drugInfoList[i].retailPrice + '</span>';
						cHtml += '<span class="RMBmoney_unit">/' + data.resultMap.drugInfoList[i].unit1 + '</span>';
						cHtml += '</div>';
						cHtml += '<div class="num">';
						cHtml += '<div class="numEdit">';
						cHtml += '<div class="num_calculate">';
						cHtml += '<div class="sup_num mui-text-center">';
						cHtml += '<span>-</span>';
						cHtml += '</div>';
						cHtml += '<div class="mid_num">';
						cHtml += '<input class="num_pro mui-text-center" type="text" value="' + data.resultMap.drugInfoList[i].drugNum + '" />';
						cHtml += '</div>';
						cHtml += '<div class="add_num mui-text-center ">';
						cHtml += '<span>+</span>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '<div class="productid" style="display: none;"></div>';
						cHtml += '<div class="storeid" style="display: none;"></div>';
						cHtml += '<div class="companyid" style="display: none;"></div>';
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '</li>';
					}
					ulNode.append(cHtml);
				}
				//				如果是从再来一单跳转过来的,默认选上再来一单物品
				if(getParam("page") == "orderpage") { //从订单跳转过来的

					console.log("从订单跳转过来的")
					if(productOrderJumpId != '' && productOrderJumpId != null) {
						var simpleOrderLen = $(".simpleOrder");
						var checkedPrice = 0; //选择的总价
						if(productOrderJumpId.indexOf(",") == -1) {
							var productChosedIds = productOrderJumpId;
							var checkedNode = 0; //选择的checkbox数量
							for(var j = 0; j < simpleOrderLen.length; j++) {
								if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds || $(simpleOrderLen[j]).find(".mealId").text() == productChosedIds) {
									//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
									$(simpleOrderLen[j]).find(".check_single_btn").prop("checked", "checked");
									checkedNode++;
									if(orderpage_price == false) {
										if($(simpleOrderLen[j]).find(".mealId").text()) {
											checkedPrice += parseFloat($(simpleOrderLen[j]).find(".setMeal_num ").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".num_pro").val().trim());
										} else {
											checkedPrice += parseFloat($(simpleOrderLen[j]).find(".RMBmoney_count").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".num_pro").val().trim());
										}
										totalPrice = checkedPrice;
										priceCount();
									}
									productNumber = checkedNode;
									shopCount();
								}
							}

							if(checkedNode == simpleOrderLen.length && checkedNode > 0) {
								$("#all_check_btn").prop("checked", true);
							} else {
								$("#all_check_btn").prop("checked", false);
							}
						} else {
							var productChosedIds = productOrderJumpId.split(",");
							console.log("订单详情传到购物车")
							var checkedNode = 0; //选择的checkbox数量
							for(var k = 0; k < productChosedIds.length; k++) {
								for(var j = 0; j < simpleOrderLen.length; j++) {
									if($(simpleOrderLen[j]).find(".currentDrugId").text() == productChosedIds[k] || $(simpleOrderLen[j]).find(".mealId").text() == productChosedIds[k]) {
										//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
										$(simpleOrderLen[j]).find(".check_single_btn").prop("checked", "checked");
										checkedNode++;
										if(orderpage_price == false) {
											if($(simpleOrderLen[j]).find(".mealId").text()) {
												checkedPrice += parseFloat($(simpleOrderLen[j]).find(".setMeal_num").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".num_pro").val().trim());
											} else {
												checkedPrice += parseFloat($(simpleOrderLen[j]).find(".RMBmoney_count").text().trim()) * parseFloat($(simpleOrderLen[j]).find(".num_pro").val().trim());
											}
											totalPrice = checkedPrice;
											priceCount();
										}
										productNumber = checkedNode;
										shopCount();
									}
								}
							}

							if(checkedNode == simpleOrderLen.length && checkedNode > 0) {
								$("#all_check_btn").prop("checked", true);
							} else {
								$("#all_check_btn").prop("checked", false);
							}
						}
						if(isCheckedArrMain.length > 0) {

							var checkedsPrice = 0; //选择的总价
							var checkedNode = 0; //选择的checkbox数量
							for(var k = 0; k < isCheckedArrMain.length; k++) {
								for(var s = 0; s < simpleOrderLen.length; s++) {
									if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
										//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
										$(simpleOrderLen[s]).find(".check_single_btn").prop("checked", "checked");
										checkedNode++
										checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".all_price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".num_pro").val().trim());
										totalPrice = checkedsPrice;
										priceCount();
										//										productNumber = isCheckedArrMain.length;
										//										shopCount();
									}
								}
							}
							if(checkedNode == simpleOrderLen.length && checkedNode > 0) {
								$("#all_check_btn").prop("checked", true);
							} else {
								$("#all_check_btn").prop("checked", false);
							}
						}

					}

				} else {
					var simpleOrderLen = $(".simpleOrder");
					var checkedsPrice = 0; //选择的总价
					var checkedNode = 0; //选择的checkbox数量
					console.log(isCheckedArrMain)
					for(var k = 0; k < isCheckedArrMain.length; k++) {
						for(var s = 0; s < simpleOrderLen.length; s++) {
							if($(simpleOrderLen[s]).find(".currentDrugId").text() == isCheckedArrMain[k]) {
								//									$(simpleOrderLen[j]).find(".cbox").trigger("click");
								$(simpleOrderLen[s]).find(".check_single_btn").prop("checked", "checked");
								checkedNode++;
								checkedsPrice += parseFloat($(simpleOrderLen[s]).find(".all_price").text().trim()) * parseFloat($(simpleOrderLen[s]).find(".num_pro").val().trim());
								totalPrice = checkedsPrice;
								priceCount();
								//								productNumber = isCheckedArrMain.length;
								//								shopCount();
							}
						}
					}
					if(checkedNode == simpleOrderLen.length && checkedNode > 0) {
												$("#all_check_btn").prop("checked", true);
					} else {
												$("#all_check_btn").prop("checked", false);
					}
				}

			}
		},
		error: function(data) {
			console.log(data);
		}
	});
	$(document).on("tap", ".productImgs", function(event) {
		if($(this).parents(".simpleOrder").find(".packageTitleInfo").text() == "") {
			var rec = $(this).parents(".simpleOrder").find(".currentDrugId").text();
			window.location.href = "../shop/goods_detail.html?rec=" + rec;
		} else {
			var packageRec = $(this).parents(".simpleOrder").find(".mealId").text();
			window.location.href = "../shop/packageDetails.html?packageRec=" + packageRec;
		}
	});
	$(document).on("tap", ".product_setmeal", function(event) {
		var packageRec = $(this).parents(".simpleOrder").find(".mealId").text();
		window.location.href = "../shop/packageDetails.html?packageRec=" + packageRec;
	});
	$(document).on("tap", ".shopofname", function(event) {
		if($(this).parents(".simpleOrder").find(".packageTitleInfo").text() == "") {
			var rec = $(this).parents(".simpleOrder").find(".currentDrugId").text();
			window.location.href = "../shop/goods_detail.html?rec=" + rec;
		}
	});
	$(document).on("tap", ".RMB_single", function(event) {
		if($(this).find(".packageTitleInfo").text() == "") {
			var rec = $(this).find(".currentDrugId").text();
			window.location.href = "../shop/goods_detail.html?rec=" + rec;
		} else {
			var packageRec = $(this).find(".mealId").text();
			window.location.href = "../shop/packageDetails.html?packageRec=" + packageRec;
		}
	});
}
/*全选与取消全选*/
function allCheck(e) {
	var check_box = document.getElementsByTagName('input');
	var checkedNum = 0; //选择商品的总数
	if(e.checked == true) {
		for(var i = 0; i < check_box.length; i++) {
			check_box[i].checked = true;
		}
		var qx_price_node = document.getElementsByClassName('num_all');
		var qx_num_node = document.getElementsByClassName('num_pro');
		var all_totalPrice = 0;
		for(var i = 0; i < qx_price_node.length; i++) {
			var price = qx_price_node[i].innerHTML;
			if(qx_num_node[i] == undefined) {
				var num_val = 0;
			} else {
				var num_val = qx_num_node[i].value;
			}
			if(price == "价格面议") {
				price = 0;
				all_totalPrice += price * num_val;
			} else {

				all_totalPrice += price * num_val;
			}
			checkedNum += Number(num_val);
		}
		
		productNumber = checkedNum;
		shopCount();
		totalPrice = all_totalPrice;
		priceCount();
	} else {
		for(var i = 0; i < check_box.length; i++) {
			check_box[i].checked = false;
			productNumber = 0;
			shopCount();
			totalPrice = 0;
			priceCount();
		}
	}
	var isCheckedArr = [];
		var cartProductList = $(".simpleOrder");
		for(var i = 0; i < cartProductList.length; i++) {
			if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
				isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
			}
		}
		isCheckedArrMain = isCheckedArr;
}

function changeDate(singlePri, singleNum) {
	var liNode = $("#ul_pro");
	var childsNode = liNode.find(".li");
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	for(var i = 0; i < childsNode.length; i++) {
		if($(childsNode[i]).find(".check_single_btn").prop("checked")) {
			if($(childsNode[i]).find('.check_single_btn').attr("data-val") == 1) {
				checkedPrice += parseFloat($(childsNode[i]).find(".setMeal_num").text().trim()) * parseFloat($(childsNode[i]).find(".num_pro").val().trim());
				checkedNum += parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			} else {
				checkedPrice += parseFloat($(childsNode[i]).find(".simpleProductPrice").text().trim()) * parseFloat($(childsNode[i]).find(".num_pro").val().trim());
				checkedNum += parseFloat($(childsNode[i]).find(".num_pro").val().trim());
			}
			checkedNode++;
		}
	}
	var single_totalPrice = singlePri * singleNum;
	productNumber = checkedNum;
	shopCount();
	totalPrice = checkedPrice;
	if(checkedNode == childsNode.length) {
		$("#all_check_btn").prop("checked", true);
	} else {
		$("#all_check_btn").prop("checked", false);
	}
	priceCount();
}
/*点击单个按钮:厂家按钮未选中，全选按钮未选中*/
$("#ul_pro").delegate('.check_single_btn', 'click', function(e) {

	var isAllChecked = true;
	//价格相关节点及价格
	if($(this).attr("data-val") == 1) {
		var singlePri = $(this).parent().parent().parent().parent().find(".setMeal_num").text();
		var singleNum = $(this).parent().parent().parent().parent().find(".num_pro").val();
	} else {
		var singlePri = $(this).parent().parent().find(".simpleProductPrice").text();
		var singleNum = $(this).parent().parent().find(".num_pro").val();
	}
	changeDate(singlePri, singleNum)
	var isCheckedArr = [];
  var cartProductList = $(".simpleOrder");
  for(var i = 0; i < cartProductList.length; i++) {
   if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
    isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
   }
  }
  isCheckedArrMain = isCheckedArr;
});
/*点击厂家名称按钮，勾选该成家下的全部商品按钮*/
$("#ul_pro").delegate('.title_pro_input', 'click', function(e) {
	var liNode = this.parentElement.parentElement.parentElement;
	var childsNode = liNode.children;
	var ulNode = liNode.parentElement;
	var ulChildNodes = ulNode.children;
	//title选中

	if(this.checked == true) {
		for(var i = 1; i < childsNode.length; i++) {

			var inputNode = childsNode[i].firstElementChild.firstElementChild;
			if(inputNode.checked == false) {
				productNumber++;
				shopCount();
				inputNode.checked = true;
				//单价和数量
				var divNode = childsNode[i];
				var cj_pri_node = divNode.getElementsByClassName('money_count')[0].innerHTML;
				var cj_num_node = divNode.getElementsByClassName('num_pro')[0];
				if(cj_pri_node == '价格面议') {
					cj_pri_node = 0;
					totalPrice += cj_pri_node * cj_num_node.value;
				} else {
					totalPrice += cj_pri_node * cj_num_node.value;
				}
				priceCount();
			}

		}

	} else {
		//title未选中
		for(var i = 1; i < childsNode.length; i++) {
			var inputNode = childsNode[i].firstElementChild.firstElementChild;
			inputNode.checked = false;
			//计算价格
			var divNode = childsNode[i];
			var cj_pri_node = divNode.getElementsByClassName('money_count')[0].innerHTML;
			var cj_num_node = divNode.getElementsByClassName('num_pro')[0];
			totalPrice -= cj_pri_node * cj_num_node.value;
			priceCount();
		}
		//计算商品数量
		productNumber -= childsNode.length - 1;
		shopCount();
	}
	var isAllCheck = true;
	for(var i = 0; i < ulChildNodes.length; i++) {
		var allInputNode = ulChildNodes[i].firstElementChild.firstElementChild.lastElementChild;
		if(allInputNode.checked == false) {
			isAllCheck = false;
			break;
		}
	}
	if(isAllCheck) {
		var allCheckbtn = document.getElementById('all_check').lastElementChild;
		allCheckbtn.checked = true;
	} else {
		var allCheckbtn = document.getElementById('all_check').lastElementChild;
		allCheckbtn.checked = false;
	}
});

/*数量加*/
$(document).on('tap', '.add_num', function(e) {
	if($(this).attr("data-val") == 1) { //套餐商品
		var currnetCID = $(this).parent().parent().parent().parent().parent().find(".cid").text();
		var single_pri = $(this).parent().parent().parent().parent().find(".setMeal_num").text().trim();
		var singleNum = $(this).parent().find(".num_pro").val();
	} else {
		var currnetCID = $(this).parent().parent().parent().parent().parent().parent().parent().find(".cid").text();
		var single_pri = $(this).parent().parent().parent().parent().parent().parent().parent().find(".RMBmoney_count").text().trim();
		var single_num = $(this).parent().parent().parent().parent().parent().parent().parent().find(".num_pro").val().trim();
	}

	var currentStoreNum = Number($(this).parent().parent().parent().parent().parent().parent().parent().find(".currentStoreNum").text());
	var proNum = this.parentElement.firstElementChild.nextElementSibling.firstElementChild;
	var inputState = $(this).parent().parent().parent().parent().parent().parent().parent().find(".check_single_btn");
	if(proNum.value >= 1 && proNum.value < currentStoreNum) {
		proNum.value++;
	}
	if(proNum.value == "") {
		proNum.value = 1;
	}
	var disNum = proNum.value;
	//		接口
	var currentPronum = $(this).parent().find(".num_pro").val();
	console.log(currentPronum, currentStoreNum)
	if(currentPronum == currentStoreNum + 1) {
		if(inputState.prop("checked")) {
			productNumber++;
			shopCount();
			totalPrice += parseFloat(single_pri);
			priceCount();
		}
		return false
	}
	if(currentPronum == currentStoreNum) {
		mui.toast("库存已满");
	} else {
		upDateCart(currnetCID, currentPronum);
	}
	var isCheckedArr = [];
	var cartProductList = $(".simpleOrder");
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
		}
	}
	isCheckedArrMain = isCheckedArr;
	changeDate(single_pri, currentPronum)
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
			//					var data = JSON.parse(data);
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
			if(data.status == 1) {
				mui.toast(data.message);
				//				currentPage-=1;
				if(getParam("page") == "orderpage") {
					orderpage_price = true;
				}
				getshopCartList();
			} else {
				mui.toast(data.message);
				//				currentPage-=1;
				if(getParam("page") == "orderpage") {
					orderpage_price = true;
				}
				getshopCartList();
			}
		},
		error: function(data) {
			mui.toast("服务器错误，请稍后重试！");
			$('#wait_dialog').css('display', 'none');
			$('#bg').css('display', 'none');
		}
	});
}
/*数量减*/
$(document).on('tap', '.sup_num', function(e) {
	//	e.stopPropagation();
	if($(this).attr("data-val") == 1) { //套餐商品
		var currnetCID = $(this).parent().parent().parent().parent().parent().find(".cid").text();
		var single_pri = $(this).parent().parent().parent().parent().find(".setMeal_num").text().trim();
		var singleNum = $(this).parent().find(".num_pro").val();

	} else {
		var currnetCID = $(this).parent().parent().parent().parent().parent().parent().parent().find(".cid").text();
		var single_pri = $(this).parent().parent().parent().parent().parent().parent().parent().find(".RMBmoney_count").text().trim();
		var single_num = $(this).parent().parent().parent().parent().parent().parent().parent().find(".num_pro").val().trim();
	}
	var proNum = this.parentElement.firstElementChild.nextElementSibling.firstElementChild;
	var inputState = $(this).parent().parent().parent().parent().parent().parent().parent().find(".check_single_btn");

	//	shopCUT = single_num;
	//	var shoppCount = this.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	if(proNum.value > buyNum) {
		proNum.value--;
		if(inputState.prop("checked")) {
			productNumber--;
			shopCount();
			totalPrice -= parseFloat(single_pri);
			priceCount();
		}
	} else {
		mui.toast('不能少于起订量' + buyNum);
	}
	//	var disNum = shopCUT - proNum.value;

	var currentPronum = $(this).parent().find(".num_pro").val(); //套餐商品
	//	接口
	var isCheckedArr = [];
	var cartProductList = $(".simpleOrder");
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
		}
	}
	isCheckedArrMain = isCheckedArr;
	changeDate(single_pri, currentPronum)
	upDateCart(currnetCID, currentPronum);
});
/*dialog数量减*/
$("#dialog").delegate('.change_sup_num', 'click', function() {
	var changeNum = this.nextElementSibling.firstElementChild;
	if(changeNum.value > buyNum) {
		changeNum.value--;
	} else {
		mui.toast('不能少于起订量');
	}
});
var dialogNode = document.getElementById('dialog');
var bgNode = document.getElementsByClassName('mui-popup-backdrop');
var singleP;
var singN;
/*改变数量*/
//$("#ul_pro").delegate('.num_pro', 'click', function() {
////	buyNum = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
//	buyNum=$(this).parent().parent().parent().parent().parent().find(".moq").text();
////	console.log(buyNum);
//	shoppcount = this.value;
//	$('#changeNum').val(shoppcount);
//	console.log('多少'+shoppcount);
//	dialogNode.style.display = 'block';
//	bgNode[0].style.display = 'block';
//	singleP = this.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
//	singN = this;
//	
//});
/*点击确定按钮*/
$("#dialog").delegate('#dialog_sure', 'click', function() {
	dialogNode.style.display = 'none';
	bgNode[0].style.display = 'none';
	var changeNum = this.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;
	var titleInput = singN.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
	var re = /^\+?[1-9][0-9]*$/;
	if(titleInput.checked == true) {
		if(changeNum.value > 0 && re.test(changeNum.value)) {
			if(changeNum.value > buyNum) {
				if(singleP == '价格面议') {
					singleP = 0;
					totalPrice += singleP * changeNum.value - singleP * singN.value;
				} else {
					totalPrice += singleP * changeNum.value - singleP * singN.value;
				}
				priceCount();
				singN.value = changeNum.value;
			} else {

				mui.toast('不能小于起订量');
			}

		} else {
			mui.toast('只能输入大于1的数字');
		}

	} else {
		if(parseInt(changeNum.value) < parseInt(buyNum)) {
			mui.toast('不能小于起订量');
		} else {
			singN.value = changeNum.value;
		}
	}
});

/*点击取消按钮*/
mui(".mui-popup-buttons").on('click', '#dialog_cancle', function() {
	dialogNode.style.display = 'none';
	bgNode[0].style.display = 'none';
});
/*点击dialog*/
mui("body").on('click', '.mui-popup-backdrop', function() {
	dialogNode.style.display = 'none';
	bgNode[0].style.display = 'none';
});
/*计算数量*/
function shopCount() {
	var numNode = document.getElementById('shop_count');
	numNode.innerHTML = productNumber;

}
/*计算价格*/
function priceCount() {
	var priceNode = document.getElementById('RMB_total');
	priceNode.innerHTML = totalPrice.toFixed(2);
}
/*计算价格*/
//function numAddCount() {
//	var priceNode = document.getElementById('RMB_total');
//	priceNode.innerHTML = singleTotalPri;
//}
/*编辑*/
mui("#headerBG").on('click', '#editor', function() {
	var jieS = document.getElementById('jiesuan_btn');
	var spanNode = jieS.getElementsByTagName('span');
	var deleteNdoe = document.getElementById('delete_btn');
	if(this.innerHTML == '编辑') {
		if($('#ul_pro').children().length != 0) {
			jieS.style.display = 'none';
			deleteNdoe.style.display = 'block';
			var heji = document.getElementById('up_mid');
			heji.style.visibility = 'hidden';
			this.innerHTML = '完成';
		} else {
			mui.toast('购物车没有任何商品，不能编辑...');
		}
	} else if(this.innerHTML == '完成') {
		jieS.style.display = 'block';
		deleteNdoe.style.display = 'none';
		var heji = document.getElementById('up_mid');
		heji.style.visibility = 'visible';
		this.innerHTML = '编辑';
	}

});

//$('body').on('touchend', function(el) {
//	if(el.target.tagName != 'INPUT') {
//		$('.num_pro').blur()
//	}
//})
//编辑数量失焦
$(document).on('change', '.num_pro', function() {
	if($(this).val() == "" || $(this).val() == null || $(this).val() == 0) {
		$(this).val(buyNum);
	}
	var liNode = $("#ul_pro");
	var childsNode = liNode.find("li");
	var checkedNode = 0; //选择的checkbox数量
	var checkedNum = 0; //选择商品的总数
	var checkedPrice = 0; //选择的总价
	var isAllChecked = true;
	//价格相关节点及价格
	if($(this).attr("data-val") == 1) { //套餐商品
		var single_pri = $(this).parent().parent().parent().parent().find(".setMeal_num").text().trim();
		var singleNum = $(this).val();
		var currnetCID = $(this).parent().parent().parent().parent().parent().parent().find(".cid").text();
	} else {
		var singlePri = $(this).parent().parent().parent().parent().find(".RMBmoney_count").text();
		var singleNum = $(this).parent().parent().parent().parent().find(".num_pro").val();
		var currnetCID = $(this).parent().parent().parent().parent().parent().parent().parent().parent().find(".cid").text();
	}

	var currentStoreNum = Number($(this).parent().parent().parent().parent().parent().parent().parent().parent().find(".currentStoreNum").text());
	if($(this).val().trim() > currentStoreNum) {
		$(this).val(currentStoreNum);
		changeDate(single_pri, currentStoreNum)
		mui.toast("库存已满");
	} else {
		changeDate(single_pri, singleNum)
	}
	var currentPronum = $(this).val().trim();
	//	接口
	var isCheckedArr = [];
	var cartProductList = $(".simpleOrder");
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
			isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
		}
	}
	isCheckedArrMain = isCheckedArr;
	upDateCart(currnetCID, currentPronum);
});
/*结算*/
$('#jiesuan').delegate('#jiesuan_btn', 'click', function() {
	var proInputNode = $('.check_single_btn');
	var titleInputNode = document.getElementsByClassName('title_pro_input');
	/*全选*/
	var allCheck = document.getElementById('all_check_btn');
	var inputNode = $('.check_single_btn');
	var arr = new Array();
	var isAllChecked = 0;
	var shoppingcount;
	var productid;
	var storeid;
	for(var i = 0; i < inputNode.length; i++) {
		if(inputNode[i].checked == true) {
			isAllChecked++;
			//				productid = inputNode[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			//				storeid = inputNode[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			//				shoppingcount = inputNode[i].parentElement.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.value;
			var cid = $(proInputNode[i]).parent().parent().parent().find(".cid").text();
			var drugNum = $(proInputNode[i]).parent().parent().parent().find(".num_pro").val();
			arr.push(cid);
			//				arr.push({
			//					"productid": productid,
			//					"storeid": storeid,
			//					'buyerid': userid,
			//					"shoppingcount": shoppingcount
			//				});
		}
	}
	var cartlist = JSON.stringify(arr);
	var orderSignNum = 0; //选中的里面有多少是从再来一单过来的
	var cartProductList = $("#ul_pro .simpleOrder");
	var checkedNode = 0; //选择的checkbox数量
	for(var i = 0; i < cartProductList.length; i++) {
		if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
			checkedNode++;
			//			arrCartIds.push($(cartProductList[i]).find(".cid").text());
			//			totalCartList = JSON.stringify(arrCartIds);
			if($(cartProductList[i]).find(".sign").length > 0) {
				orderSignNum++;
			}
		}
	}
	if(checkedNode > 0) {
		//var signLen=$(".sign").length;
		localStorage.setItem('cartlist', cartlist);
		//		if(orderSignNum==checkedNode){
		//			window.location.href = 'order/orderSettlement.html?orderId=1';
		//		}else{
		window.location.href = 'order/orderSettlement.html';
		//		}
	} else {
		mui.toast('您还没有选择购买的商品');
	}
});
//删除url
function removeURLParameter(url, parameter) {
	var urlparts = url.split('?');
	if(urlparts.length >= 2) {
		//参数名前缀
		var prefix = encodeURIComponent(parameter) + '=';
		var pars = urlparts[1].split(/[&;]/g);

		//循环查找匹配参数
		for(var i = pars.length; i-- > 0;) {
			if(pars[i].lastIndexOf(prefix, 0) !== -1) {
				//存在则删除
				pars.splice(i, 1);
			}
		}

		return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
	}
	return url;
}

function iphoneToSet() {
	var btnArray = ['否', '是'];
	mui.confirm('为了您更好使用，请打开本机浏览器cookie功能，详情请见~！', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../setting/iphoneSetting.html';
		} else {}
	})
}
//判断浏览器是什么内核
function ismobile(test) {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
		if(window.location.href.indexOf("?mobile") < 0) {
			try {
				if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
					return '0';
				} else {
					return '1';
				}
			} catch(e) {}
		}
	} else if(u.indexOf('iPad') > -1) {
		return '0';
	} else {
		return '1';
	}
};
var pla = ismobile(1); //0表示iPhone，1表示Android；
//单项删除
var btnArray = ['确认', '取消'];
$(document).on("tap", ".mui-selected .mui-btn", function(e) {
	var currentCid = this.parentNode.parentNode.getElementsByClassName("cid")[0].innerHTML;
	var li = this.parentNode.parentNode;
	mui.confirm('确认删除该条商品吗？', '提示', btnArray, function(e) {
		if(e.index == 0) { //确定
			var cidArr = [];
			cidArr.push(currentCid);
			var cartlist = JSON.stringify(cidArr);
			$('#wait_dialog').css('display', 'block');
			$('#bg').css('display', 'block');
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
					//					var data = JSON.parse(data);
					$('#wait_dialog').css('display', 'none');
					$('#bg').css('display', 'none');
					if(data.status == 1) {
						mui.alert(data.message, function() {
							var isCheckedArr = [];
							var cartProductList = $(".simpleOrder");
							for(var i = 0; i < cartProductList.length; i++) {
								if($(cartProductList[i]).find(".check_single_btn").prop("checked")) {
									isCheckedArr.push($(cartProductList[i]).find(".currentDrugId").text());
								}
							}
							isCheckedArrMain = isCheckedArr;
							getshopCartList();
						})
					} else {
						mui.alert(data.message, function() {
							getshopCartList();
						})
					}
				},
				error: function(data) {
					mui.toast("服务器错误，请稍后重试！");
					$('#wait_dialog').css('display', 'none');
					$('#bg').css('display', 'none');
				}
			});
		} else {
			setTimeout(function() {
				$.swipeoutClose(li);
			}, 0);
		}
	});
});
/*删除*/
mui("#jiesuan").on('click', '#delete_btn', function(event) {

	/*每一行item*/
	var proInputNode = $('.check_single_btn');
	/*单个按钮*/
	var arr = new Array();
	var cid;
	var InputCheckedLen = 0;
	for(var i = 0; i < proInputNode.length; i++) {
		if(proInputNode[i].checked == true) {
			InputCheckedLen++;
			//			$(proInputNode[i]).parent().parent().parent().remove();
			cid = $(proInputNode[i]).parent().parent().parent().find(".cid").text();
			arr.push(cid);
			var totalMoney = document.getElementById('RMB_total');
			totalMoney.innerHTML = '0';
			var shop_count = document.getElementById('shop_count');
			shop_count.innerHTML = '0';
			totalPrice = 0;
			productNumber = 0;
		}
	}
	var cartlist = JSON.stringify(arr);
	if(InputCheckedLen > 0) {
		mui.confirm('确认删除选中的商品吗？', '提示', btnArray, function(e) {
			if(e.index == 0) { //确定
				$('#wait_dialog').css("display", "block");
				$('#bg').css("display", "block");
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
						$('#wait_dialog').css('display', 'none');
						$('#bg').css('display', 'none');
						if(data.status == 1) {
							mui.alert(data.message, function() {
								getshopCartList();
							})
						} else {
							mui.alert(data.message, function() {
								getshopCartList();
							})
						}
					},
					error: function(data) {

					}
				});
			}
		});

	} else {
		mui.toast('您未选择任何需要删除的商品');
	}
});