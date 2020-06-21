mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
/*商品加载刷新*/
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
var page = 1;
var pageCount;
var userId = sessionStorage.getItem('userId');
console.log(userId);
mui.ready(function() {
	mui('#pullrefresh').pullRefresh().pullupLoading();
});
/*判断审核状态改变颜色，删除是否禁用设置*/
coloradd();

function coloradd() {
	//console.log($(".stateTxt"));
	var states = $(".stateTxt"); //所有列表状态
	for(var i = 0; i < states.length; i++) {
		//	console.log(states[i].innerHTML);
		var statei = states[i].innerHTML;
		if(statei === "审核中") {
			states[i].style.color = "#3699DC";
			$(states[i]).parent().siblings("div").removeClass("delList");
			$(states[i]).parent().siblings("div").children("span").css("color", "#aaa");
		} else if(statei === "审核通过") {
			states[i].style.color = "#2AC845";
		} else if(statei === "审核未通过") {
			states[i].style.color = "#e4393c";
		}
	}
}
/*删除功能实现*/
$("#manageList").on("tap", ".delList", function(e) {
	//		$(this).parent().prev("li").remove();
	//		$(this).parent().remove();

	var applicantid = $(this).parent().prev("li").children(".goodsId").text();
	var townid = $(this).parent().prev("li").children(".townId").text();
	console.log(applicantid);
//	console.log(townid);
	var btnArray = ['否', '是'];
	mui.confirm('是否删除该商品？', '', btnArray, function(e) {
		if(e.index == 1) {
			$.ajax({
				type: "GET",
				//			url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/deleteProduct",
				url: config + "seller/deleteProduct",
				contentType: "json; charset=utf-8",
				async: true,
				data: {
					applicantid: applicantid,
					companyid: userId,
//					townid: townid,
					mobile: 1
				},
				//data: {id:""},
				dataType: 'JSONP',
				JSONP: "callback",
				success: function(data) {
					console.log(data);
					if(data.code==1){
						mui.toast("删除啦");
						window.location.reload();
					}
				},
				error: function(data) {
					console.log("删除失败");
				}
			});
			//window.location.reload();
		}
	})

});
/*点击商品列表跳转至商品详情页*/
$("ul").on("tap", ".listBg", function() {
	console.log($(this).next().children('.State').children('.stateTxt').text());
	var choseStateTxt=$(this).next().children('.State').children('.stateTxt').text();
	var goodsMngId = $(this).children(".goodsId").text();
	sessionStorage.setItem("goodsMngId", goodsMngId);
	if(choseStateTxt!="审核中"){
		window.location.href = "goodsDetail.html";
	}
	
});

/**
 * 下拉刷新具体业务实现
 */

function pulldownRefresh() {
	setTimeout(function() {
		page=1;
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		$("#manageList").children().remove();
		$.ajax({
			type: "GET",
			//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/productlist",
			url: config + "seller/productlist",
			contentType: "json; charset=utf-8",
			async: true,
			//data: {id:1162,page:3,mobile:1},
			data: {
				id: userId,
				page: page,
				mobile: 1
			},
			//data: {id:""},
			dataType: 'JSONP',
			JSONP: "callback",
			success: function(result) {
				console.log(result);
				console.log(result.productList[0]);
				for(var i = 0; i < result.productList.length; i++) {
					var status = result.productList[i].applicantstatus;
					if(status == '1') {
						status = "审核中";
					} else if(status == '2') {
						status = "审核通过";
					} else if(status == '3') {
						status = "审核未通过";
					}
					var storehouse = result.productList[i].pname + '-' + result.productList[i].cname + '-' + result.productList[i].tname;
					var html = '';
					html += '<li class="mui-table-view-cell mui-media listBg">';
					html += '<div class="goodsMag">';
					html += '<div class="goods_Name">';
					html += '<span>' + result.productList[i].productname + '</span>';
					html += '</div>';
					html += '<div class="price">';
					html += '<span>¥</span>';
					html += '<span class="goodsPrice">' + result.productList[i].pp + '</span>';
					html += '</div>';
					html += '</div>';
					html += '<div class="goodsMagC">';
					html += '<div class="spec">';
					html += '<span class="spectittle">规格：</span>';
					html += '<span class="spanwidth">' + result.productList[i].specifications + result.productList[i].ppu + '</span>';
					html += '</div>';
					html += '<div class="vender">';
					html += '<span>厂家：</span>';
					html += '<span>' + result.productList[i].manufactor + '</span>';
					html += '</div>';
					html += '</div>';
//					html += '<div class="storeHouse">';
//					html += '<span>仓库：</span>';
//					html += '<span>' + storehouse + '</span>';
//					html += '</div>';
					html += '<span class="goodsId">' + result.productList[i].applicantid + '</span>';
					html += '<span class="townId">' + result.productList[i].townid + '</span>';
					html += '<span class="productId">' + result.productList[i].productid + '</span>';
					html += '</li>';
					html += '<div class="examineState">';
					html += '<div class="del delList">';
					html += '<span class="mui-icon mui-icon-trash delIcon"></span>';
					html += '<span class="delTxt">删除</span>';
					html += '</div>';
					html += '<b></b>';
					html += '<div class="State">';
					html += '<span class="stateTxt">' + status + '</span>';
					html += '</div>';
					html += '</div>';
					$("#manageList").append(html);
					coloradd();
				}

			},
			error: function(data) {
				alert("出错啦");
			}
		});
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > pageCount)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		$.ajax({
			type: "GET",
			//		url: "https://192.168.18.134:8443/gcafu_commerce/rest/seller/productlist",
			url: config + "seller/productlist",
			contentType: "json; charset=utf-8",
			async: true,
			//data: {id:1162,page:3,mobile:1},
			data: {
				id: userId,
				page: page++,
				mobile: 1
			},
			//data: {id:""},
			dataType: 'JSONP',
			jsonp: "callback",
			success: function(result) {
				console.log(result);
				//console.log(result.productList[0]);
				var itemMax = result.count;
					pageCount = Math.ceil(itemMax / 10)
				for(var i = 0; i < result.productList.length; i++) {
					var status = result.productList[i].applicantstatus;
					if(status == '1') {
						status = "审核中";
					} else if(status == '2') {
						status = "审核通过";
					} else if(status == '3') {
						status = "审核未通过";
					}
					var storehouse = result.productList[i].pname + '-' + result.productList[i].cname + '-' + result.productList[i].tname;
					var html = '';
					html += '<li class="mui-table-view-cell mui-media listBg">';
					html += '<div class="goodsMag">';
					html += '<div class="goods_Name">';
					html += '<span>' + result.productList[i].productname + '</span>';
					html += '</div>';
					html += '<div class="price">';
					html += '<span>¥</span>';
					html += '<span class="goodsPrice">' + result.productList[i].pp + '</span>';
					html += '</div>';
					html += '</div>';
					html += '<div class="goodsMagC">';
					html += '<div class="spec">';
					html += '<span class="spectittle">规格：</span>';
					html += '<span class="spanwidth">' + result.productList[i].specifications + result.productList[i].ppu + '</span>';
					html += '</div>';
					html += '<div class="vender">';
					html += '<span>厂家：</span>';
					html += '<span>' + result.productList[i].manufactor + '</span>';
					html += '</div>';
					html += '</div>';
//					html += '<div class="storeHouse">';
//					html += '<span>仓库：</span>';
//					html += '<span>' + storehouse + '</span>';
//					html += '</div>';
					html += '<span class="goodsId">' + result.productList[i].applicantid + '</span>';
					html += '<span class="townId">' + result.productList[i].townid + '</span>';
					html += '<span class="productId">' + result.productList[i].productid + '</span>';
					html += '</li>';
					html += '<div class="examineState">';
					html += '<div class="del delList">';
					html += '<span class="mui-icon mui-icon-trash delIcon"></span>';
					html += '<span class="delTxt">删除</span>';
					html += '</div>';
					html += '<b></b>';
					html += '<div class="State">';
					html += '<span class="stateTxt">' + status + '</span>';
					html += '</div>';
					html += '</div>';
					$("#manageList").append(html);
					coloradd();
				}

			},
			error: function(data) {
				alert("出错啦");
			}
		});
	}, 1500);
}