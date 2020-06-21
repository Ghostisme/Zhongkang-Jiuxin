var sessionId = sessionStorage.getItem('sessionId');
//预约视频 关闭标签 用来退房的识别码
var YYSP_CODE = "YYGL_YYSP";
/**
 * 分页
 * 
 * @param int
 *            current 当前页码
 * @param int
 *            num_pages 总页数
 * @return string 分页的 HTML 字符串
 */
function page(current, num_pages) {

	var current = parseInt(current);
	var num_pages = parseInt(num_pages);

	html = '<nav id="pageGro" class="cb" aria-label="Page navigation">';
	html += '<ul class="pagination pageUp pagination-lg">'
	html += '	<li id="prev">';
	html += '    	<a aria-label="Previous">';
	html += '    		<span aria-hidden="true">&laquo;上一页</span>';
	html += '    	</a>';
	html += '	</li>';
	if(current != 1 && current >= 4 && num_pages != 4) {
		html += '<li pageId="1"  class="flipOver"><a>1</a></li>';
	}
	if(current - 2 > 2 && current <= num_pages && num_pages > 5) {
		html += '<li pageId="' + (current - 3) + '"  class="flipOver"><a>...</a></li>';
	}
	var start = current - 2;
	var end = current + 2;
	if((start > 1 && current < 4) || current == 1) {
		end++;
	}
	if(current > num_pages - 4 && current >= num_pages) {
		start--;
	}
	for(; start <= end; start++) {
		if(start <= num_pages && start >= 1) {
			if(start != current) {
				html += '<li pageId="' + start + '" class="flipOver"><a>' + start + '</a></li>';
			} else {
				html += '<li pageId="' + start + '" class="flipOver active"><a>' + start + '</a></li>';
			}
		}
	}
	if(current + 2 < num_pages - 1 && current >= 1 && num_pages > 5) {
		html += '<li pageId="' + (current + 3) + '" class="flipOver"><a>...</a></li>';
	}
	if(current != num_pages && current < num_pages - 2 && num_pages != 4) {
		html += '<li pageId ="' + num_pages + '" class="flipOver"><a>' + num_pages + '</a></li>';
	}
	html += '    <li id="Next">';
	html += '  <a aria-label="Next">';
	html += '  <span class="pageDown" aria-hidden="true">下一页&raquo;</span>';
	html += '  </a>';
	html += '	</li>';
	html += '<div id="totalPage">共<span class="totalPageNum">'+num_pages+'</span>页	，<span class="jumpStyle">到第<input class="toPageNum"value="'+current+'">页<span class="srueToJumpPageBtn">确定</span></span></div>';
	html += '</ul>';
	html += '</nav>';
	return html;
}
//点击导航上的小三角控制底下面板
$(document).on("click", ".userImgDownArrow", function() {
	$("#quitBtnStyle").toggle();
});
//点击切换账户按钮
$(document).on("click", "#changeIdentifyBtn", function() {
	window.location.href = "login.html";
});
//点击退出按钮
$(document).on("click", "#quitBtn", function() {
	$.ajax({
		method: 'get',
		url: config + '/sys/user/loginOut',
		contentType: "application/json; charset=utf-8", //传到后台的数据格式
		async: true,
		data: {
			'sessionId': sessionId
		},
		dataType: 'jsonp', //接收值的格式
		jsonp: 'jsoncallback',
		success: function(data) {
			console.log(data);
			if(data.status == 1) {
				console.log(data);
				localStorage.clear();
				sessionStorage.clear(); //点击退出登录的时候清楚缓存
				alert(data.message);
				window.location.href = "login.html";
			} else {
				alert(data.message);
				window.location.reload();
			}
		},
		error: function(result) {
			console.log(result);
		}
	});
});




$(document).ready(function(e) {
			var counter = 0;
			if(window.history && window.history.pushState) {
				$(window).on('popstate', function() {
							window.history.pushState('forward', null, '#');
							window.history.forward(1); // alert("不可回退");  //如果需在弹框就有它  
							localStorage.clear();
							sessionStorage.clear();
							top.location.href="../../login.html"; //如查需要跳转页面就用它            
							}); 
}         
			window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
			window.history.forward(1);    
});

function closeNavTabAndRefreshIframe(dataid,parentnavid) {//navid为data-id
	var thisTabs=parent.$(window.parent.document).find(".page-tabs .J_menuTab");
	var thisIframe=parent.$(window.parent.document).find("#content-main iframe");
	for(var k=0;k<thisTabs.length;k++){
		if($(thisTabs[k]).attr("data-id")==dataid){
			$(thisTabs[k]).find('.fa-times-circle').click();
		}
		if($(thisTabs[k]).attr("data-id")==parentnavid){
			$(thisTabs[k]).addClass("active");
			parent.$(window.parent.document).find(thisTabs[k]).dblclick();
			$(thisTabs[k]).siblings(".J_menuTab").removeClass("active");
		}
	}
	for(var k=0;k<thisIframe.length;k++){
		if($(thisIframe[k]).attr("data-id")==parentnavid){
			$(thisIframe[k]).css("display","inline");
			$(thisIframe[k]).siblings("iframe").css("display","none");
		}
	}
}
function closeIframe(dataid){//需要关闭的data-id
	var thisTabs=parent.$(window.parent.document).find(".page-tabs .J_menuTab");
	for(var k=0;k<thisTabs.length;k++){
		if($(thisTabs[k]).attr("data-id")==dataid){
			$(thisTabs[k]).find('.fa-times-circle').click();
		}
	}
}
function RefreshIframe(currentTabIds,leftHiddenTabId){
	var thisTabs=parent.$(window.parent.document).find(".page-tabs .J_menuTab");
	for(var k=0;k<thisTabs.length;k++){
		if($(thisTabs[k]).attr("data-id")==currentTabIds){
			$(thisTabs[k]).addClass("active");
			parent.$(window.parent.document).find(thisTabs[k]).dblclick();
		}else{
			parent.$(window.parent.document).find("#"+leftHiddenTabId).click();
		}
	}
	
}

function clearText(str){
    $(str).find('textarea').each(function () {
        $(this).val('');
    });
    $(str).find('input').each(function () {
        $(this).val('');
    });
}
function getQueryString(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    var a = window.location.search.substr(1).match(t);
    if (a != null) return a[2];
    return ""
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


