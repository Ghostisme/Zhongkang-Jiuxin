//window.config = "http://192.31.10.62:8003";
//window.config = "https://www.jhydls.cn/drugapi";
//window.config = "http://192.31.10.197:8003";
//window.config = "https://cloud.zk9x.cn/drugapi";
//window.config = "http://192.31.10.47:9003";
window.config ="http://www.hzyypf.com:9000/drugapi";
//window.config = "http://192.168.18.161:8080/gcafu_commerce/rest";
//window.config="http://192.168.18.126:8080/gcafu_commerce/rest";
//window.config="http://192.168.18.5:8080/gcafu_commerce/rest";
//window.config = "http://60.205.92.79:8080/gcafu_commerce/rest";
//window.src="http://60.205.92.79:8090/image-web/upload/";
//window.secondConfig="http://192.168.18.189:8080/gcafu-crm/addcusAsPc.shtml";
//window.secondConfig="http://192.168.18.253:8080/gcafu-crm/addcusAsPc.shtml";
//window.secondConfig="http://120.27.109.183/gcafu-crm/addcusAsPc.shtml";
window.resourcesFolder="resources/"


$(document).ready(function(){
	//获取搜索信息	
	$(".inputSearch li").click(function(){
		var tp = $(this).attr("id");
		var tpH = $(this).children().html();
		
		$(this).parent().siblings(".xd").attr("id",tp);
		$(this).parent().prev().html(tpH+' <span class="caret"></span>');
		$(this).parent().prev().attr("id",tp)
		
		
	})
	//全局搜索
	$(".sc").click(function(){
		var val = $(".seach_inp").val();
		sessionStorage.setItem("value",val);
//		var vale = parseInt(sessionStorage.getItem());
		var x =parseInt($(".xd").attr("id"));
		console.log(x)
		if(x == 1){
			document.location.href = "shop.html"
		}
		switch(x){
			case 1:
				document.location.href = "shop.html"
			break;
			case 2:
				document.location.href = "companies_list.html"
			break;
			case 3:
				document.location.href = "resources.html"
			break;
		}
	})
});
/**
 * 分页
 * 
 * @param int
 *            current 当前页码
 * @param int
 *            num_pages 总页数
 * @return string 分页的 HTML 字符串
 */
function page(current, num_pages){

	var current = parseInt(current);
	var num_pages = parseInt(num_pages);
	
	html = '<nav id="pageGro" class="cb" aria-label="Page navigation">';
	html += '<ul class="pagination pageUp pagination-lg">'
	html += '	<li id="prev">';
	html += '    	<a aria-label="Previous">';
	html += '    		<span aria-hidden="true">&laquo;</span>';
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
			if(start != current){
				html += '<li pageId="' + start + '" class="flipOver"><a>'+ start +'</a></li>';
			}else{
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
	html += '  <span class="pageDown" aria-hidden="true">&raquo;</span>';
	html += '  </a>';
	html += '	</li>';
	html += '</ul>';
	html += '</nav>';
	return html;
}