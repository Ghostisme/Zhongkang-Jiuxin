/*资源单加载刷新*/
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var userId
if (window.webUser) {
	userId = window.webUser.id; //用户id
}else{
	window.location.href = "../login/login.html";
}
function pullupRefresh() {
	if ((app.count / app.limit) > app.offset) {
		app.getList(0);
	}
	mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(((app.count / app.limit) > app.offset)); //参数为true代表没有更多数据了。
	app.offset++;
}
var app = new Vue({
	el: '#app',
	data: {
		orderList: [],
		productList: [],
		offset: 1,
		limit: 10,
		count: 0
	},
	methods: {
		onView: function (orderId) {
			window.location.href = '../shopCart/order/orderdetail.html?orderId=' + orderId;
		},
		onLogistics: function (order) {
			sessionStorage.setItem("address", order.address);
			sessionStorage.setItem("expNo", order.courierNum);
			sessionStorage.setItem("expCode", order.comCode);
			window.location.href = "../logistics/logistics.html";
		},
		onReceiving: function (orderId) {
			$.ajax({
				type: "get",
				url: config + "/drug/orderInfo/upType",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					orderType: 4,
					orderId: orderId,
					userId: userId
				},
				success: function (data) {
					window.location.reload();
				},
			});
		},
		onBuy: function (order) {
			var that= this;
			$.ajax({
				type: "get",
				url: config + "/drug/cart/add",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					userId: userId,
					fromType: 2,
					orderId: order.orderId
				},
				success: function (data) {
					var idStr = "";
					for (var i = 0; i < order.drugOrderProductList.length; i++) {
						var prodcut = order.drugOrderProductList[i];
						if(prodcut.drugId==null){
									idStr += prodcut.mealId + ",";
							}else{
								idStr += prodcut.drugId + ",";
						}	
					}
					console.log(order.type)
									if(order.type==0){
										mui.alert("套餐过期,无法再次购买",'  ')
										return false;
									}
					localStorage.setItem("prodcutIds", idStr.substr(0, idStr.length - 1));
					window.location.href = "../shopCart/shopcart_index.html?page=orderpage";
				},
			});
		},
		onCancel: function (orderId) {
			$.ajax({
				type: "get",
				url: config + "/drug/orderInfo/upType",
				async: false,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					orderType: 5,
					orderId: orderId,
					userId: userId //用户id
				},
				success: function (data) {
					window.location.reload();
				},
			});
		},
		onOk: function (orderId) {
			sessionStorage.setItem("orderId", orderId);
			window.location.href = '../pay/pay.html?orderId=' + orderId;
		},
		select: function (index) {
			this.offset = 1;
			this.orderList = [];
			this.getList(index);

		},
		listDispaly: function (data) {
			var lists = data.list;
			if (this.orderList.length > 0) {
				this.orderList.push.apply(this.orderList, lists)
				$("#no_search").hide();
			} else {
				this.orderList = lists;
				$("#no_search").show();
			}

			if (this.count != 0) {
				mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
			} else {
				mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
			}
		},
		getList: function (index) {
			var thiso = this;
			var datalist = new Object;
			if (index != 0) {
				datalist.orderType = index;
			}
			//datalist.drugName = this.inputtext;
			datalist.userId = userId //用户id;
			datalist.offset = this.offset;
			datalist.limit = this.limit;
			$.ajax({
				type: "get",
				url: config + "/drug/orderInfo/getList",
				async: false,
				data: datalist,
				success: function (data) {
					if (data.status == 1) {
						$("#app").show();
						thiso.count = data.resultMap.total;
						thiso.listDispaly(data.resultMap);
					} else {
						alert(data.message);
					}
				},
			});
		}
	},
	created() {
		let pageId = getUrlParam('pageid');
		if (pageId) {
			$("#wait_all").removeClass("mui-active");
			$("#wait_pay").removeClass("mui-active");
			$("#wait_access").removeClass("mui-active");
			$("#wait_pj").removeClass("mui-active");
			$("#wait_sure").removeClass("mui-active");

			switch (pageId) {
				case "1":
					$("#wait_pay").addClass("mui-active");
					break;
				case "2":
					$("#wait_access").addClass("mui-active");
					break;
				case "3":
					$("#wait_pj").addClass("mui-active");
					break;
				case "4":
					$("#wait_sure").addClass("mui-active");
					break;
				default:
					$("#wait_all").addClass("mui-active");
					break;
			}
			this.select(pageId);
		} else {
			this.getList(0);
		}

	}
})
//点击返回箭头
$("header").on("tap", "a", function(e) {
	e.preventDefault();
	window.location.href = "user/user.html";
	//	清除发票信息
	localStorage.removeItem("titleType");
	localStorage.removeItem("titleContent");
	localStorage.removeItem("titleCompanyName");
	localStorage.removeItem("titleTaxNum");
	sessionStorage.removeItem("addressObj");
	localStorage.removeItem("leaveMsg");
	//	清除地址信息
})

$(document).ready(function(e) {
	var counter = 0;
	if(window.history && window.history.pushState) {
		$(window).on('popstate', function() {
			window.history.pushState('forward', null, '#');
			window.history.forward(1); // alert("不可回退");  //如果需在弹框就有它  
			localStorage.removeItem("titleType");
			localStorage.removeItem("titleContent");
			localStorage.removeItem("titleCompanyName");
			localStorage.removeItem("titleTaxNum");
			sessionStorage.removeItem("addressObj");
			localStorage.removeItem("leaveMsg");
			window.location.href = "user/user.html"; //如查需要跳转页面就用它            
		});
	}
	window.history.pushState('forward', null, '#'); 
	window.history.forward(1);
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});