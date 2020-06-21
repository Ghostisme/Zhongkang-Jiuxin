var userId = getCookie('userId');
//var userstatus = getCookie('userstatus');
//var userId = 10350
var usestatus;
var currentPage = 1;
//加载优惠券
$(document).ready(function() {
	//默认添加所有的优惠券
	getCoupon(1);
	getCoupon(2);

})

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
var couponList;
//获取优惠券
function getCoupon(usestatus) {
	var obj = new Object();
	obj.id = userId
	obj.usestatus = usestatus
	obj.currentPage = currentPage
	$.ajax({
		type: "GET",
		url: config + "wallet/couponList",
		//		contentType:"application/json; charset=utf-8",
		async: true,
		data: obj,
		dataType: 'JSON',
		success: function(data) {
			console.log(data);
			if(data.code == 1) {
				couponList = data.date.resultcoupon;

				addCoupon(usestatus, couponList)
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
}

//添加不同的优惠券
function addCoupon(usestatus, couponList) {
	var CouponType; //优惠券类型

	if(usestatus == 1) {
		CouponType = 'notUsed' //未使用
	} else {
		CouponType = 'overdue' //已过期
	}

	var couponBox = '.' + CouponType + 'Box'

	$(couponBox).html("");

	for(var i = 0; i < couponList.length; i++) {
		var html = '';
		html += ' <li class="mui-table-view-cell list-item ' + CouponType + '">';
		html += '<div class="left">';
		html += '<p>￥<span class="pirce">' + couponList[i].couponmoney + '</span></p>';
		html += '<p>' + couponList[i].couponname + '</p>'
		html += '</div>'
		html += '<div class="right">'

		//判断所限商品范围
		if(couponList[i].producttype == 1) {
			html += '<h5>限商品: 除促销商品外</h5>'
		} else {
			html += '<h5>限商品: 平台所有商品</h5>'
		}

		html += '<p>券编号: ' + couponList[i].id + '</p>'

		//添加优惠券时间
		var validitystart = new Date(couponList[i].starttime.time);
//		console.log(validitystart);
		startY = validitystart.getFullYear() + '.';
		startM = (validitystart.getMonth() + 1 < 10 ? '0' + (validitystart.getMonth() + 1) : validitystart.getMonth() + 1) + '.';
		startD = validitystart.getDate();
		var validityend = new Date(couponList[i].endtime.time);
		endY = validityend.getFullYear() + '.';
		endM = (validityend.getMonth() + 1 < 10 ? '0' + (validityend.getMonth() + 1) : validityend.getMonth() + 1) + '.';
		endD = validityend.getDate();

		html += '<p>有效期: ' + startY + startM + startD + '-' + endY + endM + endD

		//添加判断插入使用按钮
		if(usestatus == 1) {
			html += '<a class="btn" href="../../shop/shop_index.html">立即使用</a>'
		}

		html += '</p>'
		html += '</div>'
		html += '</li>'

		$(couponBox).append(html);
	}
}
mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//加载数据
		currentPage = 1
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							//循环清空 ul 下的所有子节点
							var ul = self.element.querySelector('.mui-table-view');
							
							while(ul.hasChildNodes()) {
								ul.removeChild(ul.firstChild);
							}

							var obj = new Object();
							obj.id = userId
							obj.usestatus = index+1;
							obj.currentPage = currentPage;
							usestatus = obj.usestatus;
							$.ajax({
								type: "GET",
								url: config + "wallet/couponList",
								async: false,
								data: obj,
								contentType: "application/json; charset=utf-8",
								dataType:"jsonp",
								JSONP:"callback",
								success: function(data) {
									var data = eval("(" + data + ")")
//									console.log(data);
//									console.log(data.code);
									if(data.code == 1) {
										couponList = data.date.resultcoupon;
										console.log(usestatus)
										var CouponType; //优惠券类型
										if(usestatus == 1) {
											CouponType = 'notUsed' //未使用
										} else {
											CouponType = 'overdue' //已过期
										}
									
										var couponBox = '.' + CouponType + 'Box'
									
//										$(couponBox).html("");
									
										for(var i = 0; i < couponList.length; i++) {
											var html = '';
//											html += ' <li class="mui-table-view-cell list-item ' + CouponType + '">';
											html += '<div class="left">';
											html += '<p>￥<span class="pirce">' + couponList[i].couponmoney + '</span></p>';
											html += '<p>' + couponList[i].couponname + '</p>'
											html += '</div>'
											html += '<div class="right">'
									
											//判断所限商品范围
											if(couponList[i].producttype == 1) {
												html += '<h5>限商品: 平台所有商品</h5>'
											} else {
												html += '<h5>限商品: 平台部分商品</h5>'
											}
									
											html += '<p>券编号: ' + couponList[i].id + '</p>'
									
											//添加优惠券时间
											var validitystart = new Date(couponList[i].starttime.time);
//											console.log(validitystart);
											startY = validitystart.getFullYear() + '.';
											startM = (validitystart.getMonth() + 1 < 10 ? '0' + (validitystart.getMonth() + 1) : validitystart.getMonth() + 1) + '.';
											startD = validitystart.getDate();
											var validityend = new Date(couponList[i].endtime.time);
											endY = validityend.getFullYear() + '.';
											endM = (validityend.getMonth() + 1 < 10 ? '0' + (validityend.getMonth() + 1) : validityend.getMonth() + 1) + '.';
											endD = validityend.getDate();
									
											html += '<p>有效期: ' + startY + startM + startD + '-' + endY + endM + endD
									
											//添加判断插入使用按钮
											if(usestatus == 1) {
												html += '<a class="btn" href="../../shop/shop_index.html">立即使用</a>'
											}
									
											html += '</p>'
											html += '</div>'
//											html += '</li>'

											var fragment = document.createDocumentFragment();	
											var li = document.createElement("li");
											li.className = "mui-table-view-cell list-item "+CouponType;
											li.innerHTML = html
											fragment.appendChild(li)
											
											ul.appendChild(fragment)
											
										}
										
									}
								},
								error: function(data) {
									console.log(data);
								}
							});
							//结束刷新
							self.endPullDownToRefresh();
							//重置刷新
							self.refresh(true);
						}, 0);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							var obj = new Object();
							obj.id = userId
							obj.usestatus = index+1
							obj.currentPage = parseInt(currentPage) +1;
							usestatus = obj.usestatus
							$.ajax({
								type: "GET",
								url: config + "wallet/couponList",
								contentType:"application/json; charset=utf-8",
								async: true,
								data: obj,
								dataType: "jsonp",
								JSONP: "callback",
								success: function(data) {
									var data = eval("(" + data + ")")
									console.log(data);
									if(data.code == 1) {
										pageCount = Math.ceil(data.date.count / 10);
										couponList = data.date.resultcoupon;
										var CouponType; //优惠券类型
										if(usestatus == 1) {
											CouponType = 'notUsed' //未使用
										} else {
											CouponType = 'overdue' //已过期
										}
									
										var couponBox = '.' + CouponType + 'Box'
									
										for(var i = 0; i < couponList.length; i++) {
											var html = '';
//											html += ' <li class="mui-table-view-cell list-item ' + CouponType + '">';
											html += '<div class="left">';
											html += '<p>￥<span class="pirce">' + couponList[i].couponmoney + '</span></p>';
											html += '<p>' + couponList[i].couponname + '</p>'
											html += '</div>'
											html += '<div class="right">'
									
											//判断所限商品范围
											if(couponList[i].producttype == 1) {
												html += '<h5>限商品: 平台所有商品</h5>'
											} else {
												html += '<h5>限商品: 平台部分商品</h5>'
											}
									
											html += '<p>券编号: ' + couponList[i].id + '</p>'
									
											//添加优惠券时间
											var validitystart = new Date(couponList[i].starttime.time);
//											console.log(validitystart);
											startY = validitystart.getFullYear() + '.';
											startM = (validitystart.getMonth() + 1 < 10 ? '0' + (validitystart.getMonth() + 1) : validitystart.getMonth() + 1) + '.';
											startD = validitystart.getDate();
											var validityend = new Date(couponList[i].endtime.time);
											endY = validityend.getFullYear() + '.';
											endM = (validityend.getMonth() + 1 < 10 ? '0' + (validityend.getMonth() + 1) : validityend.getMonth() + 1) + '.';
											endD = validityend.getDate();
									
											html += '<p>有效期: ' + startY + startM + startD + '-' + endY + endM + endD
									
											//添加判断插入使用按钮
											if(usestatus == 1) {
												html += '<a class="btn" href="../../shop/shop_index.html">立即使用</a>'
											}
									
											html += '</p>'
											html += '</div>'
//											html += '</li>'

											var fragment = document.createDocumentFragment();	
											var li = document.createElement("li");
											li.className = "mui-table-view-cell list-item "+CouponType;
											li.innerHTML = html
											console.log(li.className)
											fragment.appendChild(li)
											
											ul.appendChild(fragment)
											
										}
//										console.log(currentPage+"---"+pageCount)
										self.endPullUpToRefresh(currentPage >= pageCount);
										if(currentPage > pageCount){
											currentPage = 1
										}
										
									}
								},
								error: function(data) {
									console.log(data);
								}
							});

						}, 1000);
					}
				}
			});
		});
	});
})(mui);