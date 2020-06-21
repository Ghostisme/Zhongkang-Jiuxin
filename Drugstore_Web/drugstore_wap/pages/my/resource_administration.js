/*资源单加载刷新*/
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
var resourceid;
console.log(userId+' '+resourceid);
mui.ready(function() {
	mui('#pullrefresh').pullRefresh().pullupLoading();
});

/**
 * 下拉刷新具体业务实现
 */

function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		$("#res_list li").remove();
		mui('#pullrefresh').pullRefresh().refresh(true);
		page=1;
		$.ajax({
			type: 'GET',
			//		        url:'https://192.168.18.127:8443/gcafu_commerce/rest/resource/searchResources',
//			url:'http://192.168.18.189:8080/gcafu_commerce/rest/resource/searchResources',
			url: config + 'resource/searchResources',
			dataType: 'JSONP',
			data: {currentPage: page, id : userId, mobile: 1 },
			//				data:{page:page,id:3,mobile:1},
			contentType: 'application/json;charset=utf-8',
			JSONP: 'callback',
			success: function(result) {
				console.log(result);
				if(result.data == null || result.data.length == 0) {
					$('#no_search').css('display', 'block');
				}  else {
					$('#no_search').css('display', 'none');
					$('#res_list li').remove();
					mui('#pullrefresh').pullRefresh().refresh(true);
					for(var i = 0; i < result.data.length; i++) {
						//		console.log(data[i].createTime);
						var dataTime = result.data[i].createTime.substring(0, 10);
						var html = "";
						html += '<li class="mui-table-view-cell mui-media list_height">';
						html += '<div class="delete_up">';
						html += '<a href="../resourceList/resourcelist_detail.html">';
						html += '<div class="resource_info">';
						html += '<div class="mid_div">';
						html += '<span>上传者:</span>';
						html += '<span>' + result.data[i].publishername + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span>类型:</span>';
						html += '<span>' + result.data[i].type + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span>上传时间:</span>';
						html += '<span>' + dataTime + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span class="introduce_span">说明:</span>';
						html += '<p class="product_introduce">' + result.data[i].description + '</p>';
						html += '</div>';
						html += '</div>';
						html += '<span class="listId">' + result.data[i].id + '</span>';
						html += '</a>';
						html += '<div class="right_shopcart">';
						html += '<div class="resource_img_div mui-text-center">';
						html += '<div class=" mui-text-center shop-cart">';
						html += '<img src="../../styles/img/resource_img/resource_down.png" />';
						html += '</div>';
						html += '<div class="right_font">';
						html += '<span>已下载</span><span>' + result.data[i].downloadcount + '</span><span>次</span>';
						html += '</div>';
						html += '</div>';
						html += '</div>';
						html += '</div>';
						html += '<div class="delete_div">';
						html += '<div class="delete_border">';
						html += '</div>';
						html += '<div class="delete_font mui-text-center">';
						html += '<span class="mui-icon mui-icon-trash">';
						html += '</span>';
						html += '<span class="delete_font_span">删除</span>';
						html += '</div>';
						html += '</div>';
						html += '</li>';
						$("#res_list").append(html);
						page=2;
					}
				}
			},

			error: function() {
			}
		});
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}

var count = 1;
/**
 * 上拉加载具体业务实现
 */


function pullupRefresh() {
	console.log(count);
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count >pageCount)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('#pullrefresh .mui-table-view');
		var cells = document.body.querySelectorAll('#pullrefresh .mui-table-view-cell');
		if($('.mui-visibility .mui-pull-caption').text() == '没有更多数据了') {
			$('.mui-pull-caption').text('');
		}
		$.ajax({
			type: 'GET',
			//		        url:'https://192.168.18.127:8443/gcafu_commerce/rest/resource/searchResources',
//			url:'http://192.168.18.189:8080/gcafu_commerce/rest/resource/searchResources',
			url: config + 'resource/searchResources',
			dataType: 'JSONP',
			data: {currentPage: page++, id : userId, mobile: 1 },
			//				data:{page:page++,id:3,mobile:1},
			contentType: 'application/json;charset=utf-8',
			JSONP: 'callback',
			success: function(result) {
				console.log(result);
				pageCount = Math.ceil(result.resourcecount/10);
				console.log(pageCount);
				if($('.mui-visibility .mui-pull-caption').text() == '没有更多数据了') {
					$('.mui-pull-caption').text('');
				} else {
					for(var i = 0; i < result.data.length; i++) {
						//		console.log(data[i].createTime);
						var dataTime = result.data[i].createTime.substring(0, 10);
						var html = "";
						html += '<li class="mui-table-view-cell mui-media list_height">';
						html += '<div class="delete_up">';
						html += '<a href="../resourceList/resourcelist_detail.html">';
						html += '<div class="resource_info">';
						html += '<div class="mid_div">';
						html += '<span>上传者:</span>';
						html += '<span>' + result.data[i].publishername + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span>类型:</span>';
						html += '<span>' + result.data[i].type + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span>上传时间:</span>';
						html += '<span>' + dataTime + '</span>';
						html += '</div>';
						html += '<div>';
						html += '<span class="introduce_span">说明:</span>';
						html += '<p class="product_introduce">' + result.data[i].description + '</p>';
						html += '</div>';
						html += '</div>';
						html += '<span class="listId">' + result.data[i].id + '</span>';
						html += '</a>';
						html += '<div class="right_shopcart">';
						html += '<div class="resource_img_div mui-text-center">';
						html += '<div class=" mui-text-center shop-cart">';
						html += '<img src="../../styles/img/resource_img/resource_down.png" />';
						html += '</div>';
						html += '<div class="right_font">';
						html += '<span>已下载</span><span>' + result.data[i].downloadcount + '</span><span>次</span>';
						html += '</div>';
						html += '</div>';
						html += '</div>';
						html += '</div>';
						html += '<div class="delete_div">';
						html += '<div class="delete_border">';
						html += '</div>';
						html += '<div class="delete_font mui-text-center">';
						html += '<span class="mui-icon mui-icon-trash">';
						html += '</span>';
						html += '<span class="delete_font_span">删除</span>';
						html += '</div>';
						html += '</div>';
						html += '</li>';
						$("#res_list").append(html);
					}
				}
			},

			error: function() {
			}
		});
		
	}, 1500);
}

window.onload = function() {
	$("#res_list").on("tap", ".delete_font", function() {
		console.log("是否删除");
		resourceid = $(this).parent().parent().find(".listId").text();
		console.log(resourceid);
		var delLi=$(this).parent().parent();
		var btnArray = ['否', '是'];
		mui.confirm('是否删除该资源单？', '', btnArray, function(e) {
		if(e.index == 1) {
			del();
			delLi.remove();
//			window.location.reload();
		}
		})	
	})
};

function del() {
	$.ajax({
		type: 'GET',
		//     url: 'https://192.168.18.127:8443/gcafu_commerce/rest/resource/deleteResource',
//		url:'http://192.168.18.189:8080/gcafu_commerce/rest/resource/deleteResource',
		url: config + 'resource/deleteResource',
		dataType: 'JSONP',
		contentType: 'application/json;charset=utf-8',
		JSONP: 'callback',
		data: { publicsherid : userId, id: resourceid, mobile: 1 },
		//		data:{id:3,resourceid:resourceid,mobile:1},
		success: function(data) {
			if(data.code==1){
				console.log("删除了");
				window.location.reload();
			}else{
				console.log("出错啦");
				console.log(data);
			}
		},
		error: function() {
		}
	});
}