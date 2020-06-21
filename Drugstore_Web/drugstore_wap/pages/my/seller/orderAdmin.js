mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var gettype = 1;
var viewIndex = 0;
var status = '';
var btnStatus;
var order_id;
var userid=getCookie('userId');
var logintype=getCookie('logintype');
settledYesOrNo();
$(document).ready(function() {
	settledYesOrNo();
//	alert(localStorage.getItem('seller_goods_status'));
	if(localStorage.getItem('seller_goods_status') == 1) {
		$('#buy_img').addClass("show").removeClass("hide");
		$('#sell_img').addClass("hide").removeClass("show");
		$('#buy_goods').addClass("navtextColor");
		$('#sell_goods').removeClass("navtextColor");
		$("#navTxt").text("采购订单");
		gettype = 1;
		if(localStorage.getItem('seller_order_status') == 0) {
			viewIndex = 0;
			status = '';
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').addClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 1) {
			viewIndex = 0;
			status = 1;
			$('#wait_sure').addClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 2) {
			viewIndex = 0;
			status = 2;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').addClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 3) {
			viewIndex = 0;
			status = 3;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').addClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 4) {
			viewIndex = 0;
			status = 5;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').addClass('mui-active');
			getData(status, viewIndex);
		}

	} else if(localStorage.getItem('seller_goods_status') == 2) {
		$("#navTxt").text("销售订单");
		gettype = 2;
		$('#buy_img').addClass("hide").removeClass("show");
		$('#sell_img').addClass("show").removeClass("hide");
		$('#buy_goods').removeClass("navtextColor");
		$('#sell_goods').addClass("navtextColor");
		if(localStorage.getItem('seller_order_status') == 0) {
			viewIndex = 0;
			status = '';
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').addClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 1) {
			viewIndex = 0;
			status = 1;
			$('#wait_sure').addClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 2) {
			viewIndex = 0;
			status = 2;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').addClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 3) {
			viewIndex = 0;
			status = 3;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').addClass('mui-active');
			$('#wait_pj').removeClass('mui-active');
			getData(status, viewIndex);
		} else if(localStorage.getItem('seller_order_status') == 4) {
			viewIndex = 0;
			status = 5;
			$('#wait_sure').removeClass('mui-active');
			$('#wait_all').removeClass('mui-active');
			$('#wait_pay').removeClass('mui-active');
			$('#wait_access').removeClass('mui-active');
			$('#wait_pj').addClass('mui-active');
			getData(status, viewIndex);
		}

	}

});
function settledYesOrNo(){
		$.ajax({
		type: "GET",
		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
		url: config + "base/usersession",
		contentType: "application/json; charset=utf-8",
		async: true,
		data: {},
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data) {
			console.log(data);
			var id;
			if(data.id != null) {
				if(data.applicantstatus == 10) {
					$('#sellAndMineTittle').css('display','none');
					$('.mui-scroll-wrapper').css('top','40px');
				} else if(data.applicantstatus == 11) {
					$('#sellAndMineTittle').css('display','block');
				}
			}
		},
		error: function(data) {

		}
	});
}
/*获取后台数据*/
var httpURL = 'http://192.168.18.126:8080/gcafu_commerce/rest';
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		$('#res_list li').remove();
		mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
		viewIndex = 0;
		getData(status, viewIndex);
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 10)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		viewIndex++;
		getData(status, viewIndex);

	}, 1500);
}
/*获取数据*/
function getData(status, viewIndex) {
	console.log('gettype' + gettype + '     ' + 'status' + status);
	$.ajax({
		type: "GET",
		url: config + "order/OrderselOrdermove",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			"buyerid":userid,
			"logintype":logintype,
			"gettype": gettype,
			"status": status,
			"viewIndex": viewIndex,
			"viewSize": "10",
			'mobile': 1
		},
		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
			console.log(data);
			if(data.code == 1) {

				var cHtml = '';
				var html = '';
				var ulNode = $('#res_list');
				if(data.orderListSize == 0) {
					$('#no_search').css('display', 'block');
				} else {
					$('#no_search').css('display', 'none');
					for(var i = 0; i < data.data.length; i++) {
						cHtml += '<li class="mui-table-view-cell mui-media">';
						cHtml += '<div class="order_info_title">';
						cHtml += '<div class="order_info_div">';
						cHtml += '<img src="../../../styles/img/shopCart_img/order/order_pay.png" />';
						cHtml += '</div>';
						cHtml += '<div class="order_info_font">';
						cHtml += '<span class="company_name">' + data.data[i].companyname + '</span>';
						cHtml += '<span class="mui-icon mui-icon-forward"></span>';
						cHtml += '</div>';
						cHtml += '<div class="wait_sure">';
						if(data.data[i].currentstatus == 11) {
							cHtml += '<span>待分配</span>';
						} else if(data.data[i].currentstatus == 12) {
							cHtml += '<span>待交易员审核</span>';
						} else if(data.data[i].currentstatus == 13) {
							cHtml += '<span>待买家取消订单</span>';
						} else if(data.data[i].currentstatus == 14) {
							cHtml += '<span>待买家确认</span>';
						} else if(data.data[i].currentstatus == 15) {
							cHtml += '<span>买家取消订单</span>';
						} else if(data.data[i].currentstatus == 21) {
							cHtml += '<span>待付款</span>';
						} else if(data.data[i].currentstatus == 22 ){
							cHtml += '<span>订单已取消</span>';
						}else if(data.data[i].currentstatus == 23) {
							cHtml += '<span>买家取消订单</span>';
						} else if(data.data[i].currentstatus == 31) {
							cHtml += '<span>待交易员确认付款</span>';
						} else if(data.data[i].currentstatus == 32 || data.data[i].currentstatus == 42) {
							cHtml += '<span>待卖家发货</span>';
						} else if(data.data[i].currentstatus == 34) {
							cHtml += '<span>交易员取消订单</span>';
						} else if(data.data[i].currentstatus == 35) {
							cHtml += '<span>凭证无效解决中</span>';
						} else if(data.data[i].currentstatus == 51) {
							cHtml += '<span>已发货</span>';
						} else if(data.data[i].currentstatus == 52) {
							cHtml += '<span>运输遇到问题</span>';
						} else if(data.data[i].currentstatus == 61) {
							cHtml += '<span>待买家确认收货</span>';
						} else if(data.data[i].currentstatus == 62 || data.data[i].currentstatus == 71 || data.data[i].currentstatus == 72) {
							cHtml += '<span>订单完结</span>';
						} else if(data.data[i].currentstatus == 63) {
							cHtml += '<span>收货遇到问题</span>';
						} else if(data.data[i].currentstatus == 81 || data.data[i].currentstatus == 82) {
							cHtml += '<span>维保</span>';
						} else if(data.data[i].currentstatus == 91 || data.data[i].currentstatus == 92 || data.data[i].currentstatus == 93) {
							cHtml += '<span>问题订单</span>';
						}
						cHtml += '</div>';
						cHtml += '</div>';
						cHtml += '<div class=" ' + data.data[i].orderid + '">';
						cHtml += '<div style="display: none;">' + data.data[i].orderid + '</div>';
						order_id = data.data[i].orderid;
						cHtml += '</div>';
						cHtml += '<div class="shop_price_div">';
						cHtml += '<div class="item1"></div>';
						cHtml += '<div class="item2 mui-text-center" style="visibility: hidden;">';
						cHtml += '<span>共630件货</span>';
						cHtml += '</div>';
						cHtml += '<div class="item3">';
						cHtml += '<span>合计:¥</span>';
						cHtml += '<span class="price_span">' + data.data[i].totalamount + '</span>';
						cHtml += '</div>';
						cHtml += '<div class="item4 mui-text-center">';
						if(data.data[i].totalproductamount == 0){
							cHtml += '<span class="price_span discount">' +'价格面议'+ '</span>';
						}else{
							cHtml += '<span class="price_span discount">' + '¥' + data.data[i].totalproductamount + '</span>';
						}
						
						cHtml += '</div>';
						cHtml += '</div>';
						//						cHtml += '<div class="sure_order_div ">';
						cHtml +='<div class="btnStatus" style="display: none;">'+data.data[i].currentstatus+'</div>';
						cHtml +='<div class="order_num" style="display: none;">'+data.data[i].orderid+'</div>';
						if(data.data[i].currentstatus == 42) {
							if(gettype == 2) {
								cHtml += '<div class="sure_order_div ">';
								cHtml += '<span>发货</span>';
								cHtml += '</div>';
							}
						} else if(data.data[i].currentstatus == 51) {
							if(gettype == 2) {
								cHtml += '<div class="sure_order_div ">';
								cHtml += '<span>货已送到</span>';
								cHtml += '</div>';
							}
						} else if(data.data[i].currentstatus == 52) {
							if(gettype == 2) {
								cHtml += '<div class="sure_order_div ">';
								cHtml += '<span>问题解决</span>';
								cHtml += '</div>';
							}
						} else if(data.data[i].currentstatus == 61){
							if(gettype == 1) {
								cHtml += '<div class="sure_order_div ">';
								cHtml += '<span>确认收货</span>';
								cHtml += '</div>';
							}
						}
						//						cHtml += '</div>';
						cHtml += '</li>';
					}
					ulNode.append(cHtml);
				}
				for(var i = 0; i < data.data.length; i++) {
					html = '';
					for(var j = 0; j < data.data[i].rest.length; j++) {

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
						if(data.data[i].rest[j].pp == 0){
							html += '<span>' +'价格面议'+ '</span>';
						}else{
							html += '<span>' + data.data[i].rest[j].pp + '</span>';
						}
						
						html += '</div>';
						html += '</div>';
						html += '</div>';
					}
					$("." + data.data[i].orderid).append(html);
				}

			}
		},
		error: function(data) {

		}
	});
}

/*点击全部*/
$('#sliderSegmentedControl').on('tap', '#wait_all', function() {
	$('#res_list li').remove();
	mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
	status = '';
	viewIndex = 0;
	localStorage.setItem('seller_order_status', 0);
	getData(status, viewIndex);
});
/*点击待确认*/
$('#sliderSegmentedControl').on('tap', '#wait_sure', function() {
	$('#res_list li').remove();
	mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
	status = 1;
	viewIndex = 0;
	localStorage.setItem('seller_order_status', 1);
	getData(status, viewIndex);
});
/*点击待付款*/
$('#sliderSegmentedControl').on('tap', '#wait_pay', function() {
	$('#res_list li').remove();
	mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
	status = 2;
	viewIndex = 0;
	localStorage.setItem('seller_order_status', 2);
	getData(status, viewIndex);
});
/*点击待收货*/
$('#sliderSegmentedControl').on('tap', '#wait_access', function() {
	$('#res_list li').remove();
	mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
	status = 3;
	viewIndex = 0;
	localStorage.setItem('seller_order_status', 3);
	getData(status, viewIndex);
});
/*点击待发货*/
$('#sliderSegmentedControl').on('tap', '#wait_pj', function() {
	$('#res_list li').remove();
	mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
	status = 5;
	viewIndex = 0;
	localStorage.setItem('seller_order_status', 4);
	getData(status, viewIndex);
});
/*跳转到订单详情*/
$('#res_list').on('tap', '.order_info_content', function() {
//	var orderID = $(this).children(":first").next().children(":first").text();
	var orderID = this.parentElement.firstElementChild.innerHTML;
	localStorage.setItem('gettype', gettype);
	localStorage.setItem('orderID', orderID);
	window.location.href = '../../shopCart/order/order_detail.html';

});

/*买到的货卖出的货切换*/
$("#sellAndMineTittle").on("tap", "div", function() {
	console.log($(this).find("img"));
	$(this).find("img").addClass("show").removeClass("hide"); //当前元素加上图标
	$(this).siblings().find("img").addClass("hide").removeClass("show");
	$(this).children("span").addClass("navtextColor"); //当前元素改变字体颜色
	$(this).siblings().children("span").removeClass("navtextColor");
	console.log($(this).find("div").context.className);
	var classNames = $(this).find("div").context.className;
	if(classNames == "buy") {
		$("#res_list").children().remove();
		mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
		gettype = 1;
		localStorage.setItem('gettype', gettype);
		getData(null, 0);
	} else if(classNames == "sell") {
		$("#res_list").children().remove();
		mui('#pullrefresh').pullRefresh().refresh(true);     //恢复滚动
		gettype = 2;
		localStorage.setItem('gettype', gettype);
		console.log(gettype);
		getData(null, 0);
	}
});
/*状态按钮*/
$('#res_list').on('tap', ".sure_order_div", function() {
	var parentbtn = this.parentElement;
	btnStatus = parentbtn.getElementsByClassName('btnStatus')[0].innerHTML;
	var order_num = parentbtn.getElementsByClassName('order_num')[0].innerHTML;
	if(btnStatus == 21) {
		if(gettype == 1) {
			getStatus('buyernoorder2',order_num,btnStatus);
		} else if(gettype == 2) {
			getStatus('buyernoorder2',order_num,btnStatus);
		}
	} else if(btnStatus == 32) {
		if(gettype == 1) {
			mui.toast('已提醒发货');
		} else if(gettype == 2) {
			console.log('dhasjkdhaskhdasjkh');
			getStatus('companynotopro',order_num,btnStatus);
		}
	} else if(btnStatus == 42) {
		if(gettype == 2) {
			getStatus('toproing',order_num,btnStatus);
		}
	} else if(btnStatus == 51) {
		if(gettype == 2) {
			getStatus('buyerproarrive',order_num,btnStatus);
		}
	} else if(btnStatus == 52) {
		if(gettype == 2) {
			getStatus('toproing',order_num,btnStatus);
		}
	} else if(btnStatus == 61) {
		if(gettype == 1) {
			getStatus('companyproarrive',order_num,btnStatus);
		}
	}
});
/*提交状态*/
function getStatus(changestype,order_num,currentstatus) {
	$.ajax({
		type: "GET",
		url: config + "order/OrderChanges",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			orderid: order_num,
			changestype: changestype,
			salesid: "0",
			currentstatus: currentstatus,
			paytype: "0",
			evidence: ''
		},

		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
			if(data.code == 1) {
				mui.toast('提交成功');
				window.location.reload();
			}

		},
		error: function(data) {

		}
	});
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}