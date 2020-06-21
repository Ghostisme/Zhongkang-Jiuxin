mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var httpURL = 'http://192.168.18.126:8080/gcafu_commerce/rest';
var currentstatus;
var salesid;
var order_num;
var changestype;
var gettype;
var paytype = 1;
var picUrl;
var payWay;
var buyermemo = '';
var sellermemo = '';
var sellerPayType;
var resourceyOrN = false;
var orderId;
var price;
var goods;
/*点击叉号蒙版遮罩，隐藏*/
$(".pInfo").on("tap", "#classInfo", function () {
	$(".mui-backdrop").css("display", "none");
	$("#payerInfo").css("display", "none");
});
/*查看支付账户信息*/
$("#payInfo").on("tap", ".watchInfo", function () {
	$(".mui-backdrop").css("display", "block");
	$("#payerInfo").css("display", "block");
});
/*交易员点击叉号蒙版遮罩，隐藏*/
$(".dInfo").on("tap", "#dealcloseInfo", function () {
	$(".mui-backdrop").css("display", "none");
	$("#dealerInfo").css("display", "none");
});
/*查看交易员信息*/
$(".invoiceInfo").on("tap", ".lookTel", function () {
	$(".mui-backdrop").css("display", "block");
	$("#dealerInfo").css("display", "block");
});
var orderID = localStorage.getItem('orderID');
var get_type = localStorage.getItem('gettype');
var userid = getCookie('userId');
var logintype = getCookie('logintype');
//console.log('详情gettype'+get_type);


function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
$.ajax({
	type: "GET",
	url: config + "order/OrderselOrderinfo",
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		"buyerid": userid,
		orderid: orderID,
		mobile: 1,
		gettype: get_type
	},
	dataType: 'JSONP',
	JSONP: "callback",
	success: function (data) {
		console.log(data);
		if (data.code == 1) {

			if (data.data.currentstatus == 71 || data.data.currentstatus == 72 || data.data.currentstatus == 81 || data.data.currentstatus == 82 || data.data.currentstatus == 91 || data.data.currentstatus == 92 || data.data.currentstatus == 93) {
				$('#evaluate').css('display', 'none');
				$('#footer_btn').css('display', 'none');
			}
			var cHtml = '';
			var html = '';
			var ulNode = $('#res_list');
			gettype = data.gettype;
			for (var i = 0; i < data.data.length; i++) {
				console.log('currentstatus是：' + data.data[i].currentstatus + '      ' + data.gettype);
				$('#stateTxt').text(data.data[i].statusname);
				currentstatus = data.data[i].currentstatus;
				salesid = data.data[i].salesid;
				order_num = data.data[i].orderid;
				sellerPayType = data.data[i].paytype;
				$('.access_goods_person').text(data.data[i].tostuff);
				$('.tel').text(data.data[i].totel);
				$('.access_goods_company').text(data.data[i].tocompany);
				$('.access_goods_location').text(data.data[i].toaddr);
				$('#all_shop_money').text(data.data[i].totalproductamount);
				$('#all_discount_money').text(data.data[i].totalspamount);
				$('#all_freight').text(data.data[i].totalfreightamount);
				$('#total_momey').text(data.data[i].totalamount);
				$('#totalcoupon').text(data.data[i].usecouponmoney);
				$('#taitou').text(data.data[i].invoicetitle);
				$('#bank_name').text(data.data[i].payfrombank);
				$('#bank_num').text(data.data[i].payfrombankaccount);
				$('#invoice_num').text(data.data[i].payfromcompanytaxno);
				$('#order_num').text(data.data[i].orderid);
				$('#order_date').text(data.data[i].ordertime);
				$('#custome_name').text(data.data[i].buyername);


				if (data.data[i].salesname == null || data.data[i].salesname == '') {
					$('#trader').text('待分配');
				} else {
					$('#trader').text(data.data[i].salesname);
				}
				$('#to_public_account').text(data.data[i].paytocompanyname);
				$('#to_bank_name').text(data.data[i].paytobank);
				$('#to_account_num').text(data.data[i].paytobankaccount);
				$('#to_invoice_num').text(data.data[i].paytocompanytaxno);
				if (data.data[i].salesname == null || data.data[i].salesname == '') {
					$('#trader_name').text('待分配');
				} else {
					$('#trader_name').text(data.data[i].salesname);
				}
				if (data.data[i].salestel == null || data.data[i].salestel == '') {
					$('#trader_tel').text('');
				} else {
					$('#trader_tel').text(data.data[i].salestel);
				}
				if (data.data[i].salesqq == null || data.data[i].salesqq == '') {
					$('#trader_qq').text('');
				} else {
					$('#trader_qq').text(data.data[i].salesqq);
				}
				if (data.data[i].salesemail == null || data.data[i].salesemail == '') {
					$('#trader_email').text('');
				} else {
					$('#trader_email').text(data.data[i].salesemail);
				}
				if (data.data[i].evidence != '') {
					$('#img0').attr('src', src + data.data[i].evidence);
				}
				//				console.log(data.data[i].evidence);
				cHtml += '<li class="mui-table-view-cell mui-media' + ' ' + data.data[i].companyid + '">';
				cHtml += '<div class="order_info_title">';
				cHtml += '<div class="order_info_div">';
				cHtml += '<img src="../../../styles/img/shopCart_img/order/order_pay.png" />';
				cHtml += '</div>';
				cHtml += '<div class="order_info_font">';
				cHtml += '<span class="company_name">' + data.data[i].companyname + '</span>';
				cHtml += '<span class="mui-icon mui-icon-forward"></span>';
				cHtml += '</div>';
				cHtml += '</div>';
				cHtml += '</li>';
			}
			ulNode.append(cHtml);

			for (var i = 0; i < data.data.length; i++) {
				html = '';
				for (var j = 0; j < data.data[i].rest.length; j++) {
					html += '<div class="order_info_content">';
					html += '<div class="order_name_div">';
					html += '<span>' + data.data[i].rest[j].productname + '</span>';
					html += '</div>';
					html += '<div class="order_num_div mui-text-center">';
					html += '<span>x</span>';
					html += '<span>' + data.data[i].rest[j].ordercount + '</span>';
					html += '</div>';
					html += '<div class="order_price_div">';
					html += '<div>';
					html += '<span>¥</span>';
					//					if(data.data[i].rest[j].subunitprice == 0){
					//						html += '<span>' +'价格面议'+ '</span>';
					//					}else{
					html += '<span>' + data.data[i].rest[j].subunitprice + '</span>';
					//					}

					html += '</div>';
					html += '</div>';
					html += '</div>';

				}
				$("." + data.data[i].companyid).append(html);
			}
			//			console.log('这是什么'+gettype+'   '+currentstatus);
			if (currentstatus == 11 || currentstatus == 12 || currentstatus == 15 || currentstatus == 22 || currentstatus == 23 || currentstatus == 31 || currentstatus == 34 || currentstatus == 42 || currentstatus == 51 || currentstatus == 52 || currentstatus == 62 || currentstatus == 63 || currentstatus == 71 || currentstatus == 72 || currentstatus == 81 || currentstatus == 82 || currentstatus == 91 || currentstatus == 92 || currentstatus == 93) {


				if (gettype == 1) {
					if (currentstatus == 31 || currentstatus == 34 || currentstatus == 42 || currentstatus == 51 || currentstatus == 52 || currentstatus == 62 || currentstatus == 63 || currentstatus == 71 || currentstatus == 72 || currentstatus == 81 || currentstatus == 82 || currentstatus == 91 || currentstatus == 92 || currentstatus == 93) {
						$('#up_img').css('display', 'none');
						$('.acc_sc').css('display', 'none');
						$('#down_nav').css('display', 'none');
						$('#evaluate').css('display', 'none');
						$('.mui-scroll-wrapper').css('margin-bottom', '0');
					} else {
						$('#down_nav').css('display', 'none');
						$('.mui-scroll-wrapper').css('margin-bottom', '0');
					}

				} else if (gettype == 2) {
					if (currentstatus == 11 || currentstatus == 12 || currentstatus == 13 || currentstatus == 14 || currentstatus == 15 || currentstatus == 22 || currentstatus == 23 || currentstatus == 31 || currentstatus == 34 || currentstatus == 61 || currentstatus == 62 || currentstatus == 63 || currentstatus == 71 || currentstatus == 72 || currentstatus == 81 || currentstatus == 82 || currentstatus == 91 || currentstatus == 92 || currentstatus == 93) {
						$('#down_nav').css('display', 'none');
						$('#up_img').css('display', 'none');
						$('.acc_sc').css('display', 'none');
						$('#evaluate').css('display', 'none');
						$('.mui-scroll-wrapper').css('margin-bottom', '0');
					} else {
						$('#down_nav').css('display', 'none');
						if (currentstatus == 42) {
							$('#down_nav').css('display', 'block');
							$('#status').text('发货');
							$('#questionForSend').css('display', 'none');
							$('#sure_pay').css('display', 'none');
							$('#payForplatform').css('display', 'none');
							$('#payForseller').css('display', 'none');
							$('#up_img').css('display', 'none');
							$('.acc_sc').css('display', 'none');
							$(".WritelogisticsTel").css("display", "block");
							$(".noInfo").css("display", "none");
						} else if (currentstatus == 51) {
							$('#down_nav').css('display', 'block');
							$('#status').text('货已送到');
							$('#questionForSend').text('运输中问题');
							$('#evaluate').css('display', 'block');
							$('#sure_pay').css('display', 'none');
							$('#payForplatform').css('display', 'none');
							$('#payForseller').css('display', 'none');
							$('#up_img').css('display', 'none');
							$('.acc_sc').css('display', 'none');
						} else if (currentstatus == 52) {
							$('#down_nav').css('display', 'block');
							$('#status').text('问题解决');
							$('#questionForSend').css('display', 'none');
							$('#sure_pay').css('display', 'none');
							$('#payForplatform').css('display', 'none');
							$('#payForseller').css('display', 'none');
							$('#up_img').css('display', 'none');
							$('.acc_sc').css('display', 'none');
						}
					}

				}

			} else if (currentstatus == 13) {
				if (gettype == 1) {
					$('#down_nav').css('display', 'block');
					$('#status').text('重新添加');
					$('#evaluate').css('display', 'none');
					$('#sure_pay').css('display', 'none');
					$('#questionForSend').css('display', 'none');
					$('#payForplatform').css('display', 'none');
					$('#payForseller').css('display', 'none');
				} else {
					$('#down_nav').css('display', 'none');
					$('#evaluate').css('display', 'none');
					$('.mui-scroll-wrapper').css('margin-bottom', '0');
				}

			} else if (currentstatus == 14) {
				if (gettype == 1) {
					$('#down_nav').css('display', 'block');
					$('#status').text('取消订单');
					$('#evaluate').css('display', 'block');
					$('#questionForSend').css('display', 'none');
					$('#sure_pay').css('display', 'none');
					$('#payForplatform').css('display', 'block');
					$('#payForseller').css('display', 'block');
				} else {
					$('#down_nav').css('display', 'none');
					$('#evaluate').css('display', 'none');
					$('.mui-scroll-wrapper').css('margin-bottom', '0');
				}

			} else if (currentstatus == 21) {

				if (gettype == 1) {
					//					console.log(gettype + 'oioioioii' + paytype);
					//					paytype = localStorage.getItem('paytype');
					//					console.log('lallallaa' + paytype);
					if (sellerPayType == 1) {
						//上传凭证
						$('#down_nav').css('display', 'block');
						$('#up_img').css('display', 'block');
						$('#status').text('取消订单');
						$('#sure_pay').css('display', 'block');
						$('#questionForSend').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#evaluate').css('display', 'none');
					} else if (sellerPayType == 2) {
						$('#up_img').css('display', 'none');
						$('#status').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#questionForSend').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'none');
						$('#evaluate').css('display', 'none');
						$('.mui-scroll-wrapper').css('margin-bottom', '0');
					}

				} else if (gettype == 2) {
					if (sellerPayType == 1) {
						$('#up_img').css('display', 'none');
						$('#status').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#questionForSend').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'none');
						$('.mui-scroll-wrapper').css('margin-bottom', '0');
					} else if (sellerPayType == 2) {
						//上传凭证
						$('#down_nav').css('display', 'block');
						$('.mui-scroll-wrapper').css('margin-bottom', '50px');
						$('#up_img').css('display', 'block');
						$('#status').text('取消订单');
						$('#sure_pay').css('display', 'block');
						$('#questionForSend').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
					}
				}

			} else if (currentstatus == 32) {
				console.log('进来了吗' + gettype);
				if (gettype == 1) {
					$('#status').text('提醒发货');
					$('#evaluate').css('display', 'none');
					$('#questionForSend').css('display', 'none');
					$('#sure_pay').css('display', 'none');
					$('#payForplatform').css('display', 'none');
					$('#payForseller').css('display', 'none');
					$('#up_img').css('display', 'none');
					$('.acc_sc').css('display', 'none');
					$('#down_nav').css('display', 'block');
					//					$(".WritelogisticsTel").css("display","block");
				} else if (gettype == 2) {
					$('#evaluate').css('display', 'block');
					$('#status').text('发货');
					$('#sure_pay').css('display', 'none');
					$('#payForplatform').css('display', 'none');
					$('#payForseller').css('display', 'none');
					$('#down_nav').css('display', 'block');
					$(".WritelogisticsTel").css("display", "block");
					$(".noInfo").css("display", "none");
				}

			} else if (currentstatus == 35) {
				$('#img0').attr('src', '');
				if (gettype == 1) {
					//上传凭证
					if (sellerPayType == 1) { //向平台付款
						$('#img0').attr('src', '');
						$('#up_img').css('display', 'block');
						$('#status').text('确认已付款');
						$('#questionForSend').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'block');
					} else { //向卖家付款
						$('#up_img').css('display', 'none');
						$('#questionForSend').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'none');
					}

				} else if (gettype == 2) {
					if (sellerPayType == 2) {
						$('#img0').attr('src', '');
						$('#evaluate').css('display', 'none');
						$('#up_img').css('display', 'block');
						$('#status').text('确认已付款');
						$('#questionForSend').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'block');
					} else {
						$('#up_img').css('display', 'none');
						$('#evaluate').css('display', 'none');
						$('#questionForSend').css('display', 'none');
						$('#sure_pay').css('display', 'none');
						$('#payForplatform').css('display', 'none');
						$('#payForseller').css('display', 'none');
						$('#down_nav').css('display', 'none');
					}

				}
			} else if (currentstatus == 61) {
				if (gettype == 1) {
					$('#status').text('确认收货');
					$('#questionForSend').text('收货有问题');
					$('#evaluate').css('display', 'block');
					$('#sure_pay').css('display', 'none');
					$('#payForplatform').css('display', 'none');
					$('#payForseller').css('display', 'none');
					$('#up_img').css('display', 'none');
					$('.acc_sc').css('display', 'none');
					$('#down_nav').css('display', 'block');
				} else if (gettype == 2) {
					$('#down_nav').css('display', 'none');
					$('#evaluate').css('display', 'none');
					$('.mui-scroll-wrapper').css('margin-bottom', '0');
				}
			}
			//			添加收货地址
			if (data.jsontrans.length != 0) {
				$(".buyerInfoAndAddrInfo").html("");
			}
			for (var d = 0; d < data.jsontrans.length; d++) {
				var dhtml = '';
				dhtml += '<div class="buyerInfo">';
				dhtml += '<div class="InfoIcon">';
				dhtml += '<img src="../../../styles/img/shopCart_img/order/order_location.png">';
				dhtml += '</div>';
				dhtml += '<div class="detailInfo">';
				dhtml += '<div>';
				dhtml += '<div class="receiver">';
				dhtml += '<span>收货人：</span>';
				dhtml += '<span class="access_goods_person">' + data.jsontrans[d].tostuff + '</span>';
				dhtml += '</div>';
				dhtml += '<div class="buyerTel">';
				dhtml += '<span>联系电话：</span>';
				dhtml += '<span class="tel">' + data.jsontrans[d].totel + '</span>';
				dhtml += '</div>';
				dhtml += '</div>';
				dhtml += '<div>';
				dhtml += '<span>收货公司：</span>';
				dhtml += '<span class="access_goods_company">' + data.jsontrans[d].tocompany + '</span>';
				dhtml += '</div>';
				dhtml += '<div>';
				dhtml += '<span>收货地址：</span>';
				dhtml += '<span class="access_goods_location">' + data.jsontrans[d].toaddr + '</span>';
				dhtml += '</div>';
				dhtml += '</div>';
				dhtml += '</div>';
				dhtml += '<div class="logistics">';
				dhtml += '<div class="logisticsAllTitle">物流信息<i class="mui-icon mui-icon-arrowdown"style="float: right;font-size:1.5em"></i></div>';
				dhtml += '<div class="logisticsInfAll" id="logistics' + d + '">';
				dhtml += '<p style="overflow: hidden;"class="noInfo">';
				dhtml += '<span style="float: left;">货已从：</span>';
				dhtml += '<span class="fromaddr" style="float: left; width: 185px;">暂无数据</span><span class="passOut"></span>';
				dhtml += '</p>';
				dhtml += '<div class="inputsLogistics"id="inputsLogistics' + d + '">';
				dhtml += '</div>';
				dhtml += '</div>';
				dhtml += '</div>';
				$(".buyerInfoAndAddrInfo").append(dhtml);
			}
			for (var d = 0; d < data.jsontrans.length; d++) {
				var ghtml = '';
				//				if(gettype == 2){
				if (data.jsontrans[d].cars.length == 0) {
					ghtml += '<div class="saveBefore">';
					ghtml += '<div class="closeAdds"><span class="closeBtn">×</span></div>';
					ghtml += '<span class="addressid"style="display:none;">' + data.jsontrans[d].id + '</span>';//外层地址id
					ghtml += '<span class="carid"style="display:none"></span>';//车id，没有车时为空值
					ghtml += '<input type="text" class="inputPlateNum left"placeholder="车牌号" />';
					ghtml += '<input type="text" class="WritelogisticsTel rt"placeholder="物流司机电话" />';
					for (var k = 0; k < data.jsontrans[d].product.length; k++) {
						ghtml += '<div class="productInfoIds">';
						ghtml += '<span class="thisProductId"style="display:none;">' + data.jsontrans[d].product[k].id + '</span>';//每个商品的排号id，为保存用
						ghtml += '<span class="productId"style="display:none;">' + data.jsontrans[d].product[k].productId + '</span>';//商品id，为查询用
						ghtml += '<span class="storeid"style="display:none;">' + data.jsontrans[d].product[k].storeId + '</span>';
						ghtml += '<span class="trueCount"style="display:none;">' + data.jsontrans[d].product[k].trueCount + '</span>';
						ghtml += '<span class="counts"style="display:none;">' + data.jsontrans[d].product[k].count + '</span>';
						ghtml += '<input type="text" class="productList left"value="' + data.jsontrans[d].product[k].productName + '"disabled="disabled"/>';
						ghtml += '<input type="text" class="realModel left"value="' + data.jsontrans[d].product[k].trueModel + '"placeholder="实发型号"/>';
						ghtml += '<input type="text" class="realpecNum left"value="' + data.jsontrans[d].product[k].trueCount + '"placeholder="实发单位数量"/>';
						ghtml += '</div>';
					}
					ghtml += '<div class="btnforSave clearBoth">保存</div>';
					ghtml += '</div>';
					$("#inputsLogistics" + d).append(ghtml);
					$("#inputsLogistics" + d).css("display", "block");
					//				}
				} else {
					for (var p = 0; p < data.jsontrans[d].cars.length; p++) {
						//						增加完车辆后的物流电话和车牌号
						ghtml += '<div class="saveAfter"style="display:block;">';
						ghtml += '<span class="addressid"style="display:none;">' + data.jsontrans[d].id + '</span>';//外层地址id
						ghtml += '<span class="carid"style="display:none">' + data.jsontrans[d].cars[p].id + '</span>';//车id
						ghtml += '<div class="InfoSaveAfter">';
						ghtml += '<div class="SaveAftercarNumTitle left leftTitleStyle">车牌号</div>';
						ghtml += '<div class="SaveAftercarNumTxt rt">' + data.jsontrans[d].cars[p].carnum + '</div>';
						ghtml += '</div>';
						ghtml += '<div class="InfoSaveAfter">';
						ghtml += '<div class="SaveAftercarNumTitle left leftTitleStyle">物流司机电话</div>';
						ghtml += '<div class="SaveAftercarTel rt">' + data.jsontrans[d].cars[p].cartel + '</div>';
						ghtml += '</div>';
						//						增加完车辆后的商品名称和数量
						for (var f = 0; f < data.jsontrans[d].cars[p].product.length; f++) {
							ghtml += '<div class="InfoSaveAfter productInfothisId">';
							ghtml += '<span class="thisProductId"style="display:none;">' + data.jsontrans[d].cars[p].product[f].id + '</span>';
							ghtml += '<span class="productId"style="display:none;">' + data.jsontrans[d].cars[p].product[f].productId + '</span>';
							ghtml += '<span class="storeId"style="display:none;">' + data.jsontrans[d].cars[p].product[f].storeId + '</span>';
							ghtml += '<span class="counts"style="display:none;">' + data.jsontrans[d].cars[p].product[f].count + '</span>';
							ghtml += '<span class="trueCounts"style="display:none;">' + data.jsontrans[d].cars[p].product[f].trueCount + '</span>';
							ghtml += '<div class="SaveAfterProductName left leftTitleStyle">';
							ghtml += '<div class="proNames">' + data.jsontrans[d].cars[p].product[f].productName + '</div>';
							ghtml += '<div class="modelAndSpec">实发型号:<span class="realModelp">' + data.jsontrans[d].cars[p].product[f].trueModel + '</span></div>';
							ghtml += '</div>';
							ghtml += '<div class="SaveAfterProductNum rt">';
							ghtml += '<div class="SaveAfterNums">';
							ghtml += '<input type="number" value="' + data.jsontrans[d].cars[p].product[f].trueCount + '"class="thischangeNum left ' + data.jsontrans[d].cars[p].product[f].productId + '"disabled="disabled"/>';
							ghtml += '<span class="rt">' + data.jsontrans[d].cars[p].product[f].ppu + '</span>	';
							ghtml += '</div>';
							ghtml += '<div class="SaveAfterChangeNum">';
							ghtml += '<span class="changeThisNum">修改数量</span>';
							ghtml += '<span class="SaveThisNum">保存</span>';
							ghtml += '</div>';
							ghtml += '</div>';
							ghtml += '</div>';
						}
						//							分车后货物发出地址和生成二维码
						ghtml += '<div class="InfoSaveAfter">';
						//							dhtml+='<div class="SaveAftercarNumTitle left leftTitleStyle">货从:<span class="SaveAfterformAddr">'++'发出</span></div>';									
						ghtml += '<div class="SaveAfterToERcode rt">生成二维码</div>';
						ghtml += '</div>';
						ghtml += '<div class="btnforAddCar clearBoth">增加车辆</div>';
						ghtml += '</div>';
						ghtml += '</div>';
						//					发货后物流信息
						ghtml += '<div class="logisticsInformation">';
						ghtml += '<div class="logsInfo">';
						ghtml += '<div class="plateNumbers">' + data.jsontrans[d].cars[p].carnum + '</div>';
						ghtml += '<div class="status1">';
						ghtml += '<div class="left">';
						ghtml += '<img src="../../../styles/img/logistics/circle2.png"alt="" />';
						ghtml += '</div>';
						ghtml += '<div class="logisticsInformation1 left">';
						ghtml += '<div>用户已验收，并确认收货 &nbsp;&nbsp;</div>';
						ghtml += '<div style="height:19px;">收货人：';
						ghtml += '<span class="recivePerson">' + data.jsontrans[d].tostuff + '</span>';
						ghtml += '</div>';
						ghtml += '</div>';
						ghtml += '<div class="receiveTime left">' + data.jsontrans[d].cars[p].endtime + '</div>';//发出时间endtime
						ghtml += '</div>';
						ghtml += '<div class="status2">';
						ghtml += '<div class="left">';
						ghtml += '<img src="../../../styles/img/logistics/circle1.png" alt="" />';
						ghtml += '</div>';
						ghtml += '<div class="logisticsInformation2 left">货已送达目的地，待确认收货 </div>';
						ghtml += '<div class="receiveTime left">' + data.jsontrans[d].cars[p].codetime + '</div>';//发出时间codetime
						ghtml += '</div>';
						ghtml += '<div class="status3">';
						ghtml += '<div class="left">';
						ghtml += '<img src="../../../styles/img/logistics/circle1.png" alt="" />';
						ghtml += '</div>';
						ghtml += '<div class="logisticsInformation3 left">';
						ghtml += '<div>货已从';
						ghtml += '<span id="fromAdress">' + data.jsontrans[d].cars[p].storename + '</span> ';
						ghtml += '发出</div>';
						ghtml += '<div>物流电话：';
						ghtml += '<span id="logisticsTel">' + data.jsontrans[d].cars[p].cartel + '</span>';
						ghtml += '</div>';
						ghtml += '<div class="receiveTime left">' + data.jsontrans[d].cars[p].sendtime + '</div>';//发出时间sendTime
						ghtml += '</div>';
						ghtml += '</div>';
						ghtml += '</div>';
						ghtml += '</div>';
					}
					$("#logistics" + d).append(ghtml);
					$("#inputsLogistics" + d).css("display", "none");
				}

			}


			//		判断是发货前发货后
			if (data.data[0].currentstatus >= 51) {
				$(".logisticsInformation").css("display", "block");
				$(".noInfo").css("display", "none");
				$(".fromaddr").html("暂无数据");
				$(".saveBefore").css("display", "none");
				$(".saveAfter").css("display", "none");
				$(".logisticsInformation").css("display", "block");
				if (data.data[0].currentstatus == 51 || data.data[0].currentstatus == 52) {
					$(".saveAfter").css("display", "none");
					$(".logisticsInformation").css("display", "block");
					$(".status1").css("display", "none");
					$(".status2").css("display", "none");
					$(".status3").css("display", "block");
					$(".status3 img").attr("src", "../../../styles/img/logistics/circle2.png");
					$(".logisticsInformation2").css("vertical-align", "middle");
					$("#logisticsTel").text(data.data[0].cartel);//物流电话
					var formAddr = data.data[0].fromaddr;
					var startNull = formAddr.indexOf("null");
					var endNull = formAddr.indexOf("仓库");
					//  					console.log(formAddr.indexOf("null默认"));
					//  					console.log(formAddr.indexOf("仓库"));
					//  					console.log(formAddr.slice(0,startNull));
					if (formAddr.indexOf("null") == -1) {
						$("#fromAdress").text(data.data[0].fromaddr);//从哪儿发出
					} else {
						$("#fromAdress").text(formAddr.slice(0, startNull) + "仓库");//从哪儿发出
					}
					$(".recivePerson").text(data.data[0].tostuff);//收货人电话
				} else if (data.data[0].currentstatus == 61) {
					$(".saveAfter").css("display", "none");
					$(".logisticsInformation").css("display", "block");
					$(".status1").css("display", "none");
					$(".status2").css("display", "block");
					$(".status3").css("display", "block");
					$(".status2 img").attr("src", "../../../styles/img/logistics/circle2.png");
					$(".logisticsInformation2").css("vertical-align", "top");
					$("#logisticsTel").text(data.data[0].cartel);//物流电话
					var formAddr = data.data[0].fromaddr;
					var startNull = formAddr.indexOf("null");
					var endNull = formAddr.indexOf("仓库");
					//  					console.log(formAddr.indexOf("null默认"));
					//  					console.log(formAddr.indexOf("仓库"));
					//  					console.log(formAddr.slice(0,startNull));
					if (formAddr.indexOf("null") == -1) {
						$("#fromAdress").text(data.data[0].fromaddr);//从哪儿发出
					} else {
						$("#fromAdress").text(formAddr.slice(0, startNull) + "仓库");//从哪儿发出
					}
					//  					$("#fromAdress").text(data.data[0].storename);//从哪儿发出
					$(".recivePerson").text(data.data[0].tostuff);//收货人电话
					$(".status2").css("height", "39px");
					$(".logisticsInformation2").css("line-height", "20px");
				} else if (data.data[0].currentstatus >= 62) {
					$(".saveAfter").css("display", "none");
					$(".logisticsInformation").css("display", "block");
					$(".status1").css("display", "block");
					$(".status2").css("display", "block");
					$(".status3").css("display", "block");
					$(".status1 img").attr("src", "../../../styles/img/logistics/circle2.png");
					$(".logisticsInformation2").css("vertical-align", "middle");
					$("#logisticsTel").text(data.data[0].cartel);//物流电话
					var formAddr = data.data[0].fromaddr;
					var startNull = formAddr.indexOf("null");
					var endNull = formAddr.indexOf("仓库");
					//  					console.log(formAddr.indexOf("null默认"));
					//  					console.log(formAddr.indexOf("仓库"));
					//  					console.log(formAddr.slice(0,startNull));
					if (formAddr.indexOf("null") == -1) {
						$("#fromAdress").text(data.data[0].fromaddr);//从哪儿发出
					} else {
						$("#fromAdress").text(formAddr.slice(0, startNull) + "仓库");//从哪儿发出
					}
					//  					$("#fromAdress").text(data.data[0].storename);//从哪儿发出
					$(".recivePerson").text(data.data[0].tostuff);//收货人电话
				}
				$(".fromaddr").html(data.data[0].fromaddr);
				$(".passOut").css("display", "block");
				//  				console.log("aaaaaz");
			} else {
				console.log($(".fromaddr").html());
				$(".noInfo").css("display", "block");
				$(".fromaddr").html("暂无数据");
				$(".passOut").css("display", "none");
				$("#logisticsInformation").css("display", "none");
			}
		}
	},
	error: function (data) {

	}
});
/*判断各个按钮：重新添加、取消订单、提醒发货、确认已付款、确认收货*/
$('#footer_btn').on('tap', '#status', function () {
	if ($('#status').text() == '重新添加') {
		changestype = 'buyernoorder';
		getStatus(changestype);
	} else if ($('#status').text() == '取消订单') {
		if (gettype == 1) {
			buyermemo = $('#evaluateInput').val();
			changestype = 'buyernoorder1';
			getStatus(changestype);
		} else if (gettype == 2) {
			changestype = 'buyernoorder2';
			getStatus(changestype);
		}

	} else if ($('#status').text() == '提醒发货') {
		changestype = '';
		getStatus(changestype);
	} else if ($('#status').text() == '确认已付款') {
		console.log(resourceyOrN);
		if (resourceyOrN == true) {
			if (gettype == 1) {
				//触发按钮先判断图片是否上传
				changestype = 'buyerpaytosales';
				getStatus(changestype);
			} else if (gettype == 2) {
				changestype = 'buyerpaytosales';
				getStatus(changestype);
			}
		} else {
			mui.toast('您还没有上传图片，请上传凭证');
		}
	} else if ($('#status').text() == '确认收货') {
		changestype = 'companyproarrive';
		getStatus(changestype);
	} else if ($('#status').text() == '发货') {
		var thislogisticsTel = $(".WritelogisticsTel input").val();
		if (thislogisticsTel == "" || thislogisticsTel == null) {
			mui.toast("请输入物流电话");
		} else if (!(/^1[34578]\d{9}$/.test(thislogisticsTel))) {
			mui.toast("请输入有效的物流电话");
		} else {
			changestype = 'toproing';
			$.ajax({
				type: "GET",
				url: config + "order/OrderChanges",
				contentType: "json; charset=utf-8",
				async: true,
				data: {
					cartel: thislogisticsTel,
					orderid: order_num,
					changestype: changestype,
					salesid: salesid,
					currentstatus: currentstatus,
					paytype: paytype,
					buyermemo: buyermemo,
					sellermemo: sellermemo,
					evidence: picUrl
				},

				dataType: 'JSONP',
				JSONP: "callback",
				success: function (data) {
					if (data.code == 1) {
						if ($('#status').text() == '重新添加') {
							window.location.href = '../../shop/shop_index.html';
						} else {
							mui.toast('提交成功');
							window.location.reload();
						}

					}

				},
				error: function (data) {

				}
			});
			//			getStatus(changestype);
		}
	} else if ($('#status').text() == '货已送到') {
		changestype = 'buyerproarrive';
		getStatus(changestype);
	} else if ($('#status').text() == '问题解决') {
		changestype = 'toproing';
		getStatus(changestype);
	}
});

/*发货遇到问题*/
$('#footer_btn').on('tap', '#questionForSend', function () {
	if (gettype == 2) {
		if ($('#questionForSend').text() == '发货遇到问题') {
			sellermemo = $('#evaluateInput').val();
			changestype = 'companynotopro';
			getStatus(changestype);
		} else if ($('#questionForSend').text() == '运输中问题') {
			sellermemo = $('#evaluateInput').val();
			changestype = 'toproingtomessage';
			getStatus(changestype);
		}
	} else if (gettype == 1) {
		if ($('#questionForSend').text() == '收货有问题') {
			console.log('收货有问题');
			buyermemo = $('#evaluateInput').val();
			changestype = 'buyernogetprotosales';
			getStatus(changestype);
		}
	}

});
/*向平台付款*/
$('#down_nav').on('tap', '#payForplatform', function () {

	//	changestype = 'buyerexapasstopay';
	//	paytype = 1;
	//	localStorage.setItem('paytype', paytype);
	//	getStatus(changestype);
	price = $("#total_momey").text();
	$(".order_name_div span").each(function () {
		goods = $(this).text()
		return true;
	});

	localStorage.setItem("orderID", orderID);
	localStorage.setItem("userid", userid);
	localStorage.setItem("gettype", get_type);

	localStorage.setItem("price", price);
	localStorage.setItem("goods", goods);

	location.href = "../../pay/pay.html"
});
/*确认付款按钮*/
$('#footer_btn').on('tap', '#sure_pay', function () {
	//	if(resourceyOrN == true) {
	//		if(gettype == 1) {
	//			//触发按钮先判断图片是否上传
	//			changestype = 'buyerpaytosales';
	//			getStatus(changestype);
	//		} else if(gettype == 2) {
	//			changestype = 'buyerpaytosales';
	//			getStatus(changestype);
	//		}
	//	} else {
	//		mui.toast('您还没有上传图片，请上传凭证');
	//	}

	price = $("#total_momey").text();
	$(".order_name_div span").each(function () {
		goods = $(this).text()
		return true;
	});
	localStorage.setItem("orderID", orderID);
	localStorage.setItem("userid", userid);
	localStorage.setItem("gettype", get_type);

	localStorage.setItem("price", price);
	localStorage.setItem("goods", goods);
	location.href = "../../pay/pay.html"
});

/*提交状态*/
function getStatus(changestype) {
	$.ajax({
		type: "GET",
		url: config + "order/OrderChanges",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			orderid: order_num,
			changestype: changestype,
			salesid: salesid,
			currentstatus: currentstatus,
			paytype: paytype,
			buyermemo: buyermemo,
			sellermemo: sellermemo,
			evidence: picUrl
		},

		dataType: 'JSONP',
		JSONP: "callback",
		success: function (data) {
			if (data.code == 1) {
				if ($('#status').text() == '重新添加') {
					window.location.href = '../../shop/shop_index.html';
				} else {
					mui.toast('提交成功');
					window.location.reload();
				}

			}

		},
		error: function (data) {

		}
	});
}
/*向卖家支付*/
$('#down_nav').on('tap', '#payForseller', function () {
	paytype = 2;
	localStorage.setItem('paytype', paytype);
	changestype = 'buyerexapasstopay';
	getStatus(changestype);
});
var postFileName;
/*图片*/
$("#file0").change(function () {

	var file = this.files[0];
	var fsize = parseInt((file.size) / 1024); //计算图片大小，默认是B，转换成KB  
	//	console.log('进来了吗？？？？');
	if (!/image\/\w+/.test(file.type)) {

		mui.toast("请确保文件为图像类型");
		return false;
	}
	if (fsize >= 1024) {
		mui.toast("图片过大，请重新选择图片");
		return false;
	}
	if (!/\.(jpg|png|JPG|PNG)$/.test($('#file0').val())) {
		mui.toast("图片类型必须是.jpg,png中的一种");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function (e) {
		document.getElementById('show_img').innerHTML = '<img class="acc_imgin" src="' + this.result + '" id="img0" accept="image/png,image/jpg">';
		//		console.log($('input[name = "file0"]').value);
		var fileElementId = $("#file0").attr("id");
		var formData = new FormData();
		var filename = document.getElementById(fileElementId).files[0];
		formData.append("img", document.getElementById(fileElementId).files[0]);
		//				formData.append("type",1);
		//			console.info(formData.get("myfile"));
		$.ajax({
			url: config + 'order/ImgUpload',
			//				url:"http://192.168.18.189:8080/gcafu_commerce/rest/upload/product",
			type: 'POST',
			data: formData,
			//					data:{"img":filename},
			dataType: 'JSON',
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			success: function (data) {
				//把图片替换  
				console.log(data);
				if (data.code == 1) {
					postFileName = data.filename;
				}
			},
			error: function () {
				alert("上传失败！");
			}
		});
	}

	//	if(this.files && this.files[0]) {
	//		var objUrl = getObjectURL(this.files[0]);
	//		console.log($('#file0').value);
	//		if(objUrl) {
	//			$("#img0").attr("src", objUrl);
	//			$("#file0").click(function(e) {
	//				$("#img0").attr("src", objUrl);
	//			});
	//		} else {
	//			//IE下，使用滤镜
	//			this.select();
	//			var imgSrc = document.selection.createRange().text;
	//			var localImagId = document.getElementById("sss");
	//			//图片异常的捕捉，防止用户修改后缀来伪造图片
	//			try {
	//				preload.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = data;
	//			} catch(e) {
	//				this._error("filter error");
	//				return;
	//			}
	//			this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + data + "\")";
	//			console.log(data);
	//		}
	//	}
});
//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file); //创建一个临时的地址
		console.log(url);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
		console.log(url);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
		console.log(url);
	}
	return url;
}
//$("#voucher").attr("action", config + "order/ImgUpload");
var setTime;
var flag;
/*上传凭证*/
$("#up_pz").click(function () {
	$('#wait_dialog').css('display', 'block');
	$('#bg').css('display', 'block');
	//	$("#voucher").submit();
	getPic();
	flag = true;

	//	setTime = setInterval(function() {
	//		if(flag == true) {
	//			getPic();
	//			flag = false;
	//		} else if(flag = false) {
	//			clearInterval(setTime);
	//		}
	//
	//	}, 3000);
});

function getPic() {
	$.ajax({
		type: "GET",
		url: config + "order/ImgUploadflag",
		contentType: "json; charset=utf-8",
		async: true,
		data: { "fileName": postFileName },

		dataType: 'JSONP',
		JSONP: "callback",
		success: function (data) {
			if (data.code == 1) {
				console.log('提交成功' + data.evidence);
				resourceyOrN = true;
				$('#wait_dialog').css('display', 'none');
				$('#bg').css('display', 'none');
				picUrl = data.evidence;

				$('#img0').attr('src', src + data.evidence);
				$('.acc_sc').css('display', 'none');
				//				window.location.reload();
				/*确认付款按钮*/
			} else if (data.code == 2) {
				$('#wait_dialog').css('display', 'none');
				$('#bg').css('display', 'none');
				mui.toast('上传失败，请重新上传');
			}

		},
		error: function (data) {

		}
	});
}



window.onload = function () {
	if (gettype == 1) {
		$(".inputsLogistics").css("display", "none");
	}
	//	保存分车信息
	$(document).on("tap", ".btnforSave", function () {
		var productListObj = new Array();//存放拆车后的产品

		var defaltsNum = 0;//定义一个变量，当它为0的时候请求数据，当不为0的时候不请求
		//		$(this).parent().css("display","none");
		//		$(this).parent().next(".saveAfter").css("display","block");
		var inputPlateNum = $(this).parent().find(".inputPlateNum").val();//当前保存的车牌号
		var WritelogisticsTel = $(this).parent().find(".WritelogisticsTel").val();//当前保存的物流电话
		var thischangeNum = $(this).parent().parent().parent().find(".thischangeNum");//找到所有按钮上相同地址的已保存过的数量
		var counts = $(this).parent().parent().parent().find(".counts");//当前地址的该商品总数
		if (inputPlateNum == "" || inputPlateNum == null) {
			mui.toast("请输入车牌号！");
		} else if (WritelogisticsTel == "" || WritelogisticsTel == null) {
			mui.toast("请输入物流电话！");
		} else {
			var thisproductInfoIds = $(this).parent().find(".productInfoIds");

			for (var h = 0; h < thisproductInfoIds.length; h++) {//找到保存按钮下的商品
				var realNum = parseInt($(thisproductInfoIds[h]).find(".realpecNum").val());//实发数量
				var sendproductsIds = $(thisproductInfoIds[h]).find(".thisProductId").text();//商品发出id
				var realproductId = parseInt($(thisproductInfoIds[h]).find(".productId").text());//找出每个商品的id
				var sendstoreid = parseInt($(thisproductInfoIds[h]).find(".storeid").text());//商品发出storeid
				var realCounts = parseInt($(thisproductInfoIds[h]).find(".counts").text());//找出每个商品的商品总数
				var sendrealModel = $($(".realModel")[h]).val();//实发型号
				var seperateAllNums = 0;
				var defaltsisZero = 0;//定义一个判断有两个数值都是空和都是0 的情况不保存
				if ($($(".realpecNum")[h]).val() != "" && $($(".realpecNum")[h]).val() != null) {
					var sendrealpecNum = parseInt($($(".realpecNum")[h]).val());//实发数量
				} else {
					var sendrealpecNum = 0;//实发数量
				}
				console.log(realproductId);
				var allAlreadyNum = $(this).parent().parent().parent().find("." + realproductId);//找到所有和id一样的class的数量
				for (var w = 0; w < allAlreadyNum.length; w++) {
					seperateAllNums += parseInt($(allAlreadyNum[w]).val());
				}
				console.log(realCounts);//商品应有总数
				console.log(realNum);//填入的数
				console.log(seperateAllNums);
				var totalNum = realNum + seperateAllNums;
				console.log(realCounts < totalNum);
				if (realCounts < totalNum) {
					alert("添加的商品" + (h + 1) + "总数已超出总数" + realCounts);
					defaltsNum++;
					break;
				} else {
					var currentsInputNums = $(this).parent().find(".realpecNum");
					for (var z = 0; z < currentsInputNums.length; z++) {
						console.log($(currentsInputNums[z]).val());
						if ($(currentsInputNums[z]).val() == "" || $(currentsInputNums[z]).val() == null || $(currentsInputNums[z]).val() == 0) {
							defaltsisZero++;
						}
					}
					console.log(defaltsisZero + ' ' + currentsInputNums.length);
					if (defaltsisZero != currentsInputNums.length) {
						defaltsNum += 0;
					} else {
						defaltsNum++;
						alert("请核对分车数！");
						break;
					}
				}
				//				console.log(defaltsNum);
				productListObj.push({
					"id": sendproductsIds,
					"productId": realproductId,
					"storeId": sendstoreid,
					"trueModel": sendrealModel,
					"trueCount": sendrealpecNum,
					"count": realCounts,
				});
			}
			productListObj = JSON.stringify(productListObj);
			console.log(productListObj);
			if (defaltsNum == 0) {//defaltsNum为0的时候说明都不超过总数
				//				alert("a")
				//					console.log($(this).parent().parent().parent().find(".saveAfter").length);
				var carId = "";
				var addressId = $($(this).parent().parent().parent().find(".addressid")[0]).text();
				var carNum = inputPlateNum;
				var carTel = WritelogisticsTel;
				if ($(this).parent().parent().parent().find(".saveAfter").length > 0) {
					var carType = 2;
				} else {
					var carType = 1;//首次添加的时候
				}
				console.log(carType + ' ' + carId + ' ' + addressId + ' ' + carNum + ' ' + carTel + ' ' + productListObj);
				SaveSeparatesCar(carType, carId, addressId, carNum, carTel, productListObj);
			}
		}


	});
	//	增加车辆
	$(document).on("tap", ".btnforAddCar", function () {
		//		var thisProductid=
		var chtml = '';
		chtml += '<div class="inputsLogistics">';
		chtml += '<div class="saveBefore">';
		chtml += '<div class="closeAdds"style="display:block;"><span class="closeBtn">×</span></div>';
		chtml += '<input type="text" class="inputPlateNum left"placeholder="车牌号" />';
		chtml += '<input type="text" class="WritelogisticsTel rt"placeholder="物流司机电话" />';
		//		chtml+='<i class="downsIcon mui-icon mui-icon-arrowdown"></i>';	
		var proNames = $(this).parent().find(".proNames");
		var currentthisProductId = $(this).parent().find(".thisProductId");
		var productsIds = $(this).parent().find(".productId");
		var storeIds = $(this).parent().find(".storeId");
		var countscurrent = $(this).parent().find(".counts");
		var currentrueCount = $(this).parent().find(".trueCounts");
		for (var n = 0; n < proNames.length; n++) {
			var thisProductIds = $(currentthisProductId[n]).text();
			var thisproNames = $(proNames[n]).text();
			var thisproductId = $(productsIds[n]).text();
			var thistoreId = $(storeIds[n]).text();
			var thiscounts = $(countscurrent[n]).text();
			var thistrueCount = $(currentrueCount[n]).text();
			chtml += '<div class="productInfoIds">';
			chtml += '<span class="thisProductId"style="display:none;">' + thisProductIds + '</span>';//每个商品的排号id，为保存用
			chtml += '<span class="productId"style="display:none;">' + thisproductId + '</span>';//商品id，为查询用
			chtml += '<span class="storeid"style="display:none;">' + thistoreId + '</span>';
			chtml += '<span class="trueCount"style="display:none;">' + thistrueCount + '</span>';
			chtml += '<span class="counts"style="display:none;">' + thiscounts + '</span>';
			chtml += '<input type="text" class="productList left"value="' + thisproNames + '"disabled="disabled"/>';
			chtml += '<input type="text" class="realModel left"placeholder="实发型号"/>';
			chtml += '<input type="text" class="realpecNum left"value="' + thiscounts + '"placeholder="实发单位数量"/>';
			chtml += '</div>';
		}

		chtml += '<div class="btnforSave clearBoth">';
		chtml += '保存';
		chtml += '</div>';
		chtml += '</div>';
		//		chtml+='<div class="saveAfter">';						
		//		chtml+='<div class="InfoSaveAfter">';							
		//		chtml+='<div class="SaveAftercarNumTitle left leftTitleStyle">车牌号</div>';								
		//		chtml+='<div class="SaveAftercarNumTxt rt">津UB 12345</div>';								
		//		chtml+='</div>';							
		//		chtml+='<div class="InfoSaveAfter">';							
		//		chtml+='<div class="SaveAftercarNumTitle left leftTitleStyle">物流司机电话</div>';								
		//		chtml+='<div class="SaveAftercarTel rt">12345678888</div>';								
		//		chtml+='</div>';
		//		chtml+='<div class="InfoSaveAfter">';							
		//		chtml+='<div class="SaveAfterProductName left leftTitleStyle">';								
		//		chtml+='<div class="proNames">SBS改性沥青防水卷材</div>';																	
		//		chtml+='<div class="modelAndSpec">实发型号:3mm II-10°</div>';																	
		//		chtml+='</div>';								
		//		chtml+='<div class="SaveAfterProductNum rt">';								
		//		chtml+='<div class="SaveAfterNums">';									
		//		chtml+='<input type="number" value="1000"class="thischangeNum left"disabled="disabled"/>';										
		//		chtml+='<span class="rt">m²</span>	';										
		//		chtml+='</div>';									
		//		chtml+='<div class="SaveAfterChangeNum">';
		//		chtml+='<span class="changeThisNum">修改数量</span>';
		//		chtml+='<span class="SaveThisNum">保存</span>';
		//		chtml+='</div>';
		//		chtml+='</div>';										
		//		chtml+='</div>';															
		//		chtml+='<div class="InfoSaveAfter">';							
		////		chtml+='<div class="SaveAftercarNumTitle left leftTitleStyle">货从:<span class="SaveAfterformAddr">聊城仓库发出</span></div>';								
		//		chtml+='<div class="SaveAfterToERcode rt">生成二维码</div>';								
		//		chtml+='</div>';							
		//		chtml+='<div class="btnforAddCar clearBoth">增加车辆</div>';							
		//		chtml+='</div>';								
		//		chtml+='</div>';
		$(this).parent().after(chtml);
	});
	//	修改数量
	$(document).on("tap", ".changeThisNum", function () {
		$(this).parent().siblings(".SaveAfterNums").find(".thischangeNum").removeAttr("disabled");
		$(this).parent().siblings(".SaveAfterNums").find(".thischangeNum").css("border", "1px solid #e0e0e0");
		$(this).css("display", "none");
		$(this).siblings(".SaveThisNum").css("display", "inline");
	});
	//	保存修改后数量
	$(document).on("tap", ".SaveThisNum", function () {
		var productListObj = new Array();//存放拆车后的产品
		var defaltsNum = 0;//定义一个变量，当它为0的时候请求数据，当不为0的时候不请求
		$(this).parent().siblings(".SaveAfterNums").find(".thischangeNum").attr("disabled", "disabled");
		$(this).parent().siblings(".SaveAfterNums").find(".thischangeNum").css("border", "1px solid transparent");
		$(this).css("display", "none");
		$(this).siblings(".changeThisNum").css("display", "inline");
		var carId = $(this).parent().parent().parent().parent().find(".carid").text();
		var addressId = $(this).parent().parent().parent().parent().find(".carid").text();
		var carNum = $(this).parent().parent().parent().parent().find(".SaveAftercarNumTxt").text();//车牌号
		var carTel = $(this).parent().parent().parent().parent().find(".SaveAftercarTel").text();
		var carType = 2;

		var thisAllproductsIds = $(this).parent().parent().parent().parent().find(".productInfothisId");//找到所有保存按钮下的同车的产品
		for (var s = 0; s < thisAllproductsIds.length; s++) {
			var realNum = parseInt($(thisAllproductsIds[s]).find(".thischangeNum").val());//实发数量
			var sendproductsIds = $(thisAllproductsIds[s]).find(".thisProductId").text();//商品发出id
			var realproductId = parseInt($(thisAllproductsIds[s]).find(".productId").text());//找出每个商品的id
			var sendstoreid = parseInt($(thisAllproductsIds[s]).find(".storeId").text());//商品发出storeid
			var realCounts = parseInt($(thisAllproductsIds[s]).find(".counts").text());//找出每个商品的商品总数
			var sendrealModel = $(thisAllproductsIds[s]).find(".realModelp").text();//实发型号
			var seperateAllNums = 0;
			var defaltsisZero = 0;//定义一个判断有两个数值都是空和都是0 的情况不保存
			if (realNum != "" && realNum != null) {
				var sendrealpecNum = parseInt(realNum);//实发数量
			} else {
				var sendrealpecNum = 0;//实发数量
			}
			console.log(realproductId);
			var allAlreadyNum = $(this).parent().parent().parent().find("." + realproductId);//找到所有和id一样的class的数量
			for (var w = 0; w < allAlreadyNum.length; w++) {
				seperateAllNums += parseInt($(allAlreadyNum[w]).val());
			}
			console.log(realCounts);//商品应有总数
			console.log(sendrealpecNum);//填入的数
			console.log(seperateAllNums);
			var totalNum = sendrealpecNum + seperateAllNums;
			console.log(realCounts < totalNum);
			if (realCounts < totalNum) {
				alert("添加的商品" + (s + 1) + "总数已超出总数" + realCounts);
				defaltsNum++;
				break;
			} else {
				var currentsInputNums = $(this).parent().parent().parent().parent().find(".thischangeNum");
				for (var z = 0; z < currentsInputNums.length; z++) {
					console.log($(currentsInputNums[z]).val());
					if ($(currentsInputNums[z]).val() == "" || $(currentsInputNums[z]).val() == null || $(currentsInputNums[z]).val() == 0) {
						defaltsisZero++;
					}
				}
				console.log(defaltsisZero + ' ' + currentsInputNums.length);
				if (defaltsisZero != currentsInputNums.length) {
					defaltsNum += 0;
				} else {
					defaltsNum++;
					alert("请核对分车数！");
					break;
				}
			}
			productListObj.push({
				"id": sendproductsIds,
				"productId": realproductId,
				"storeId": sendstoreid,
				"trueModel": sendrealModel,
				"trueCount": sendrealpecNum,
				"count": realCounts,
			});
		}
		productListObj = JSON.stringify(productListObj);
		console.log(productListObj);
		console.log(carType + ' ' + carId + ' ' + addressId + ' ' + carNum + ' ' + carTel + ' ' + productListObj);
		SaveSeparatesCar(carType, carId, addressId, carNum, carTel, productListObj);
	});
	//	删除增加车辆input框
	$(document).on("tap", ".closeBtn", function () {
		$(this).parent().parent().parent().remove();
	});
	//	物流信息显示和隐藏
	$(document).on("tap", ".logisticsAllTitle", function () {
		$(this).next(".logisticsInfAll").toggle();
	});

	//修改和保存分车
	function SaveSeparatesCar(carType, carId, addressId, carNum, carTel, productListObj) {
		$.ajax({
			url: config + "order/sendMsgForCar",
			async: false,
			dataType: "JSON",
			data: {
				"carType": carType,//传1是第一辆车，其他的传2
				"carId": carId,
				"addressId": addressId,
				"carNum": carNum,//车牌号
				"carTel": carTel,
				"productList": productListObj,
			},
			success: function (data) {
				console.log(data);
				if (data.code == 1) {
					mui.toast("保存成功")
					window.location.reload();
				}

			}
		});
	}
}
$(document).on("tap", ".SaveAfterToERcode", function () {
	var thisCarid = $(this).parent().parent().find(".carid").text();
	console.log(thisCarid);
	window.open('../../erCode/index.html?orderid=' + thisCarid);
});