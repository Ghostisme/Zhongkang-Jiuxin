mui.init({

	pullRefresh: {

		container: '#shop_item_show',
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
mui('#pinzhong').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

});
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
var httpURL = 'http://192.168.18.253:8080/gcafu_commerce/rest/';
var bgNode = document.getElementById('menu_bg');
var searchBgNode = document.getElementById('search_bg');
var typeItem = document.getElementById('pinzhong');
var typeIsShow = true;
var isShow = true;
var pzState = true;
var isBgShow = true;
var html;
var newHtml;
var shopSearchType = 1;
/*输入框文本*/
var inputKey;
/*类别*/
var shopType;
/*品种*/
var varietyname;
var provincename;
var cityname;
var townname;
/*标准*/
var standardname;
var companyname;
//侧滑容器父节点
var offCanvasWrapper = mui('#offCanvasWrapper');
//主界面容器
var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
//菜单容器
var offCanvasSide = document.getElementById("offCanvasSide");
//			
//移动效果是否为整体移动
var moveTogether = false;
//侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
var classList = offCanvasWrapper[0].classList;
var currentPage = 1;
var pageCount;
/*类别*/
//	$(".nav_ul_li h1").click(function() {
//		console.log($(this));
//		if($(this).parent().find(".nav_child").is(":hidden")) {
//			$('.nav_child').slideToggle("slow");
//			$(".nav_ul_li h1").css("color", "#A5A5A5");
//			$(".nav_ul_li h1 .mui-icon").removeClass("mui-icon-arrowup");
//			$(".nav_ul_li h1 .mui-icon").addClass("mui-icon-arrowdown");
//			$(this).find(".mui-icon").removeClass("mui-icon-arrowdown");
//			$(this).find(".mui-icon").addClass("mui-icon-arrowup");
//			$(".nav_child").hide();
//			$(this).parent().find(".nav_child").show();
//			$("#gj_ul_classify").css("display","none");
//			$("main_nav #search_bg").css('display', 'block');
//			console.log($("#search_bg").css('display'))
//		} else {
//			//					var show = document.getElementById('showOrhide');
//			//					show.style.display='block';
//			$(this).css("color", "#A5A5A5");
//
//			$(this).find(".mui-icon").removeClass("mui-icon-arrowup");
//			$(this).find(".mui-icon").addClass("mui-icon-arrowdown");
//
//			$(".nav_child").hide();
//			$(this).parent().find(".nav_child").hide();
//
//			$(".bg").hide();
//			bgNode.style.display = 'none';
//		}
//	})
/*
 * 
 */
mui.ready(function() {
	
	//从主页栏目跳过来
	//localStorage.setItem("shopType","防水卷材")
	if(localStorage.getItem("shop_type")!=null){
		shopType = localStorage.getItem("shop_type");
		console.log(shopType)
		$("#gongjiang").find("span").text(shopType);
	}
	
	if(localStorage.getItem('key') == 'value') {
		console.log(localStorage.getItem('search_input'));
		$('#shuru').val(localStorage.getItem('search_input'));
		inputKey = localStorage.getItem('search_input');
		mui('#shop_item_show').pullRefresh().pullupLoading();
		console.log('搜索过来的 页面' + inputKey);
	} else if(localStorage.getItem('res_key') == 'value') {
		//		console.log('资源单过来的 页面');
		$('#shuru').val(localStorage.getItem('res_to_shop'));
		inputKey = localStorage.getItem('res_to_shop');
		mui('#shop_item_show').pullRefresh().pullupLoading();
	} else {
		//		console.log('嗯嗯嗯嗯');
		mui('#shop_item_show').pullRefresh().pullupLoading();
	}

});

$(".nav_child a").click(function() {
		$(".nav_child a").find(".mui-icon").hide();
		$(this).find(".mui-icon").show();
	})
	/*搜索栏点击下拉菜单中的item*/
$('.mune-item').click(function() {

	var productValue = $(this).text();
	$('#product span').text(productValue);
	if($('#product span').text().trim() == '商品') {
		shopSearchType = 1;
	} else if($('#product span').text().trim() == '资源单') {
		shopSearchType = 0;
	} else if($('#product span').text().trim() == '供应商') {
		shopSearchType = 2;
	}

	var menuNode = document.getElementById('shop_menu');
	menuNode.style.display = 'none';
	searchBgNode.style.display = 'none';
	isShow = true;

});
/*品种*/

$(".nav_ul_li").on("tap", "#near", function() {
	console.log($('#type_list').children().length);
	if($('#type_list').children().length == 0) {
		$('#pinzhong').css('height', '33px');
	} else if($('#type_list').children().length == 2) {
		$('#pinzhong').css('height', '100px');
	} else if($('#type_list').children().length == 1) {
		$('#pinzhong').css('height', '60px');
	} else {
		$('#pinzhong').css('height', '180px');
	}
	if(pzState == true) {
		$('#pinzhong').slideDown();
		$("#menu_bg").css("display", "block");
		$("#gj_ul_classify").slideUp();
		pzState = false;
		isBgShow = true;
	} else {
		$('#pinzhong').slideUp();
		$("#menu_bg").css("display", "none");
		pzState = true;
	}

});

/*类别：点击item*/
$(".nav_ul_li").on("tap", "#gongjiang", function() {
	if(isBgShow == true) {
		$("#gj_ul_classify").slideDown();
		$('#pinzhong').css('display', 'none');
		$("#menu_bg").css("display", "block");
		isBgShow = false;
		pzState = true;
	} else {
		$("#gj_ul_classify").css("display", "none");
		$("#menu_bg").css("display", "none");
		isBgShow = true;

	}
	//	$("#gj_ul_classify").slideToggle();
	//	$("#gj_ul_classify").css("display","block");	
	//	$("#menu_bg").toggle();
	//		$("#pinzhong").css("display","none");
	//		$("#shop_menu").css("display","none");
});
/*仓库*/
$(".nav_ul_li").on("tap", "#select_store", function() {
	//$(".mui-poppicker");
	$('#pinzhong').slideUp();
	$("#gj_ul_classify").slideUp();
	$("#menu_bg").css("display", "none");
});
/*三级联动*/
(function($, doc) {
	$.init();
	$.ready(function() {
		var cityPicker3 = new $.PopPicker({
			layer: 3
		});
		cityPicker3.setData(cityData3);
		var showCityPickerButton = doc.getElementById('select_store');
		var ckNode = showCityPickerButton.getElementsByTagName('span')[0];
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				jQuery('#no_search').css('display', 'none');
				jQuery("#shop_table li").remove();
				if((items[0] || {}).value == '') {
					ckNode.innerText = '全部';
					provincename = '';
					cityname = '';
					townname = '';
					currentPage = 1;
				} else if((items[1] || {}).value == '') {
					ckNode.innerText = (items[0] || {}).text;
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					cityname = '';
					townname = '';
					currentPage = 1;
				} else if((items[2] || {}).value == '') {
					ckNode.innerText = (items[1] || {}).text;
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					var city = (items[1] || {}).text;
					cityname = city.substring(0,city.length-1);
					townname = '';
					currentPage = 1;
				} else {
					ckNode.innerText = (items[1] || {}).text;
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					var city = (items[1] || {}).text;
					cityname = city.substring(0,city.length-1);
					townname = (items[2] || {}).text;
					currentPage = 1;
					
				}
				//返回 false 可以阻止选择框的关闭
				//return false;
				mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
				mui('#shop_item_show').pullRefresh().pullupLoading();
			});
		}, false);
	});
})(mui, document);
/*筛选部分地区选择*/
(function($, doc) {
	$.init();
	$.ready(function() {
		var cityPicker2 = new $.PopPicker({
			layer: 3
		});
		cityPicker2.setData(cityData3);
		var showCityPickerButton = doc.getElementById('select_city');
		var cityResult2 = doc.getElementById('show_city');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker2.show(function(items) {

				//返回 false 可以阻止选择框的关闭
				//return false;
				if((items[0] || {}).value == '') {
					cityResult2.innerText = (items[0] || {}).text;
					provincename = '';
					cityname = '';
					townname = '';
					currentPage = 1;
				} else if((items[1] || {}).value == '') {
					cityResult2.innerText = (items[0] || {}).text;
					
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					cityname = '';
					townname = '';
					currentPage = 1;
				} else if((items[2] || {}).value == '') {
					cityResult2.innerText = (items[0] || {}).text + "-" + (items[1] || {}).text;
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					var city = (items[1] || {}).text;
					cityname = city.substring(0,city.length-1);
					townname = '';
					currentPage = 1;
				} else {
					var pro = (items[0] || {}).text;
					provincename = pro.substring(0,pro.length-1);
					var city = (items[1] || {}).text;
					cityname = city.substring(0,city.length-1);
					townname = (items[2] || {}).text;
					currentPage = 1;
					cityResult2.innerText = (items[0] || {}).text + "-" + (items[1] || {}).text + "-" + (items[2] || {}).text;
				}
				mui('#shop_item_show').pullRefresh().pullupLoading();
			});
		}, false);
	});
})(mui, document);
var typeNode = document.getElementById('gongjiang');
var spanNdoe = typeNode.getElementsByTagName('span')[0];
mui('#gj_ul_classify').on('tap', 'li a', function() {
	console.log('类别被点击了' + this.innerHTML.length);
	/*类别品种联动*/
	$("#type_list").children().remove();
	var typeId = $(this).parent().attr("id");
	var varieties_list = "[{'id':'1','name':'聚合物改性沥青卷材','vid':'11'},{'id':'1','name':'沥青卷材','vid':'12'},{'id':'1','name':'金属卷材','vid':'13'},{'id':'2','name':'合成高分子涂料','vid':'21'},{'id':'1','name':'合成高分子卷材','vid':'14'},{'id':'2','name':'聚合物改性沥青涂料','vid':'22'},{'id':'2','name':'沥青基涂料','vid':'23'},{'id':'3','name':'防水混凝土','vid':'31'},{'id':'3','name':'防水砂浆','vid':'32'},{'id':'3','name':'刚性混凝土涂层防水','vid':'33'},{'id':'3','name':'混凝土渗透结晶型防水','vid':'34'},{'id':'3','name':'混凝土表面憎水剂防水','vid':'35'},{'id':'4','name':'粘土瓦','vid':'41'},{'id':'4','name':'有机瓦','vid':'42'},{'id':'4','name':'波形瓦','vid':'43'},{'id':'4','name':'金属瓦','vid':'44'},{'id':'4','name':'水泥瓦','vid':'45'},{'id':'5','name':'合成高分子密封材料','vid':'51'},{'id':'5','name':'高聚物改性沥青密封材料','vid':'52'},{'id':'6','name':'堵漏材料','vid':'61'},{'id':'2','name':'水泥基涂料','vid':'24'},{'id':'2','name':'聚氨酯涂料','vid':'25'},{'id':'2','name':'丙烯酸涂料','vid':'26'},{'id':'1','name':'抗根卷材','vid':'15'}]"
	var jsonarray_varieties = eval('(' + varieties_list + ')')
	var varieties_html = '';
	for(var i = 0; i < jsonarray_varieties.length; i++) {
		if(jsonarray_varieties[i].id == typeId) {
			console.log(jsonarray_varieties[i].id + 'aaaa' + typeId);
			varieties_html += '<li id="' + jsonarray_varieties[i].vid + '"><a href="#">' + jsonarray_varieties[i].name + '</a></li>';
		}
	}
	$("#type_list").append(varieties_html);
	
	$('#no_search').css('display', 'none');
	isBgShow = true;
	shopType = this.innerHTML;
	if(this.innerHTML.length > 4) {
		spanNdoe.innerHTML = this.innerHTML.substring(0, 4);
	} else {
		spanNdoe.innerHTML = this.innerHTML;
	}
	$('#near span').text($('#type_ul li').first().text());
	varietyname = '';
	bgNode.style.display = 'none';
	$(".nav_child").hide();
	$(".bg").hide();
	$(".nav_ul_li h1 .mui-icon").removeClass("mui-icon-arrowup");
	$(".nav_ul_li h1 .mui-icon").addClass("mui-icon-arrowdown");
	$(".nav_ul_li h1").css("color", "#A5A5A5");
	$('#shop_table li').remove();
	if(this.innerHTML == '全部') {
		shopType = '';
		currentPage = 1;
		mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
		mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
		mui('#shop_item_show').pullRefresh().pullupLoading();
	} else if(this.innerHTML == '其他'){
		shopType = '';
		currentPage = 1;
		mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
		mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
		mui('#shop_item_show').pullRefresh().pullupLoading();
	}else {
		currentPage = 1;
		mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
		mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
		mui('#shop_item_show').pullRefresh().pullupLoading();
	}

});
/*品种：点击item*/
var pzNode = document.getElementById('near');
var spanPzNdoe = pzNode.getElementsByTagName('span')[0];
mui('#type_ul').on('tap', 'li a', function() {
	$('#no_search').css('display', 'none');
	pzState = true;
	varietyname = this.innerHTML;
	console.log(varietyname);
	if(this.innerHTML.length > 4) {
		spanPzNdoe.innerHTML = this.innerHTML.substring(0, 4);
	} else {
		spanPzNdoe.innerHTML = this.innerHTML;
	}
	//	spanPzNdoe.innerHTML = this.innerHTML;
	typeItem.style.display = 'none';
	bgNode.style.display = 'none';
	$(".nav_child").hide();
	$(".bg").hide();
	$(".nav_ul_li h1 .mui-icon").removeClass("mui-icon-arrowup");
	$(".nav_ul_li h1 .mui-icon").addClass("mui-icon-arrowdown");
	$(".nav_ul_li h1").css("color", "#A5A5A5");
	typeIsShow = true;
	$('#shop_table li').remove();
	if(this.innerHTML == '全部') {
		varietyname = '';
		currentPage = 1;
		mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
		mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
		mui('#shop_item_show').pullRefresh().pullupLoading();
	} else {
		currentPage = 1;
		mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
		mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
		mui('#shop_item_show').pullRefresh().pullupLoading();
	}
});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	//清空shopType
	shopType="";
	localStorage.clear("shop_type");
	$("#gongjiang").find("span").text("全部");
 	mui('#shop_item_show').pullRefresh();
 	
	setTimeout(function() {
		var table = document.body.querySelector('#shop_item_show .mui-table-view');
		var cells = document.body.querySelectorAll('#shop_item_show .mui-table-view-cell');
		currentPage = 1;
		$('#shop_table li').remove();
		$.ajax({
			type: "GET",
			//			url: "http://192.168.18.189:8080/gcafu_commerce/rest/bd/products",
			url: config + "bd/findProducts",
			contentType: "json; charset=utf-8",
			async: true,
			data: {
				//				productid: '',
				//				storeid: ''
				mobile: 1,
				key: inputKey,
				classificationname: shopType,
				varietyname: varietyname,
				provincename: provincename,
				cityname: cityname,
				townname: townname,
				standardname: standardname,
				currentPage: currentPage
			},
			dataType: 'JSONP',
			JSONP: "callback",
			success: function(data) {

				//		for(var i = 0; i < data.length; i++) {
				//			html = '';
				//			html += '<li class="mui-table-view-cell mui-media">';
				if(data.data == null || data.data.length == 0) {
					$('#no_search').css('display', 'block');
				} else {
					$('#no_search').css('display', 'none');
					var li;
					for(var i = 0; i < data.data.length; i++) {
						li = document.createElement('li');
						li.className = 'mui-table-view-cell mui-media';
						html = '';
						html += '<a class="to_detail" href="shop_detail.html">';
						html += '<div class="mid_div">';
						html += '<p class="title_p">' + data.data[i].productname + '</p>';
						html += '<span>规格:</span>';
						html += '<span>' + data.data[i].specifications + '</span>';
						html += '<span>厂家:</span>';
						html += '<span>' + data.data[i].manufactor + '</span>';
						
						if(data.data[i].cityname == '' || data.data[i].cityname == null){
							html += '<p class="cangku">' + '仓库：' +''+ '</p>';
						}else{
							html += '<p class="cangku">' + '仓库：' + data.data[i].cityname + '</p>';
						}
						html += '<span class="money">' + '¥' + data.data[i].pp + '</span>';
						html += '</div>';
						html += '</a>';
						html += '<div class="shop_div_img mui-text-center">';
						html += '<div class="mui-pull-right mui-text-center shop-cart">';
						html += '<img src="../../styles/img/shop_img/shop_cart.png" />';
						html += '</div>';
						html += '<div class="rules" style="display: none;">' + data.data[i].rules + '</div>';
						html += '<div class="varietyname" style="display: none;">' + data.data[i].varietyname + '</div>';
						html += '<div class="ppu" style="display: none;">' + data.data[i].ppu + '</div>';
						html += '<div class="companyname" style="display: none;">' + data.data[i].companyname + '</div>';
						html += '<div class="classificationname" style="display: none;">' + data.data[i].classificationname + '</div>';
						html += '<div class="moq" style="display: none;">' + data.data[i].moq + '</div>';
						html += '<div class="stock" style="display: none;">' + data.data[i].stock + '</div>';
						html += '<div class="standardname" style="display: none;">' + data.data[i].standardname + '</div>';
						html += '<div class="cityname" style="display: none;">' + data.data[i].cityname + '</div>';
						html += '<div class="storeid" style="display: none;">' + data.data[i].storeid + '</div>';
						html += '<div class="productid" style="display: none;">' + data.data[i].productid + '</div>';
						html += '<div class="companyid" style="display: none;">' + data.data[i].companyid + '</div>';
						html += '</div>';
						li.innerHTML = html;
						//						table.insertBefore(li, table.firstChild);
						var ulNode = $('#shop_table');
						ulNode.append(li);
						currentPage = 2;

					}
				}
			},
			error: function(data) {

			}
		});
		//下拉刷新，新纪录插到最前面；

		//		}
		mui('#shop_item_show').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	
	setTimeout(function() {
		mui('#shop_item_show').pullRefresh().endPullupToRefresh((++count > pageCount)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('#shop_item_show .mui-table-view');
		var cells = document.body.querySelectorAll('#shop_item_show .mui-table-view-cell');
		if($('.mui-visibility .mui-pull-caption').text() == '没有更多数据了') {
			$('.mui-pull-caption').text('');
		}
		$('#no_search').css('display', 'none');
		//		console.log(inputKey);
		//		for(var i = cells.length, len = i + 5; i < len; i++) {
		//			var li = document.createElement('li');
		//			li.className = 'mui-table-view-cell';
		//			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
		//			table.appendChild(li);
		//		 var obj = new Object();
		//	    	obj.standardname = standardname;
		//	    	obj.varietyname = varietyname;
		//	    	obj.classificationname = classificationname;
		//	    	obj.key = inputKey;
		//	    	obj.currentPage = parseInt(currentPage++);
		$.ajax({
			type: "GET",
			//			url: config + "products/Products",
			url: config + "bd/findProducts",
			contentType: "json; charset=utf-8",
			async: true,
			data: {
				//				productid: '',
				//				storeid: ''
				mobile: 1,
				key: inputKey,
				classificationname: shopType,
				varietyname: varietyname,
				provincename: provincename,
				cityname: cityname,
				townname: townname,
				standardname: standardname,
				currentPage: currentPage++
			},
			dataType: 'JSONP',
			JSONP: "callback",
			success: function(data) {
				console.log(provincename+'   '+cityname+'   '+townname+'   hahaha '+currentPage);
				//				console.log(inputKey+'   '+shopType+'  '+provincename+'  '+cityname+'   '+townname+'   '+currentPage);
				localStorage.removeItem('res_key');
				localStorage.removeItem('key');
				if(data.data == null || data.data.length == 0) {
					$('#no_search').css('display', 'block');
				} else {

					var itemMax = data.count;
					pageCount = Math.ceil(itemMax / 10);
					for(var i = 0; i < data.data.length; i++) {
						$('#no_search').css('display', 'none');

						//         alert(data[i].companyid); 
						//						html = '';
						//						html += '<li class="mui-table-view-cell mui-media">';
						//						li = document.createElement('li');
						//						li.className = 'mui-table-view-cell mui-media';
						html = '';
						html += '<li class="mui-table-view-cell mui-media">';
						html += '<a class="to_detail" href="shop_detail.html">';
						html += '<div class="mid_div">';
						html += '<p class="title_p">' + data.data[i].productname + '</p>';
						html += '<span>规格:</span>';
						html += '<span>' + data.data[i].specifications + '</span>';
						html += '<span>厂家:</span>';
						html += '<span>' + data.data[i].manufactor + '</span>';
						if(data.data[i].cityname == '' || data.data[i].cityname == null){
							html += '<p class="cangku">' + '仓库：' +''+ '</p>';
						}else{
							html += '<p class="cangku">' + '仓库：' + data.data[i].cityname + '</p>';
						};
						if(data.data[i].pp == 0){
							html += '<span class="money">' + '面议' + '</span>';
						}else{
							html += '<span class="money">' + '¥' + data.data[i].pp + '</span>';
						}
						html += '</div>';
						html += '</a>';
						html += '<div class="shop_div_img mui-text-center">';
						html += '<div class="mui-pull-right mui-text-center shop-cart">';
						html += '<img src="../../styles/img/shop_img/shop_cart.png" />';
						html += '</div>';
						html += '<div class="rules" style="display: none;">' + data.data[i].rules + '</div>';
						html += '<div class="varietyname" style="display: none;">' + data.data[i].varietyname + '</div>';
						html += '<div class="ppu" style="display: none;">' + data.data[i].ppu + '</div>';
						html += '<div class="companyname" style="display: none;">' + data.data[i].companyname + '</div>';
						html += '<div class="classificationname" style="display: none;">' + data.data[i].classificationname + '</div>';
						html += '<div class="moq" style="display: none;">' + data.data[i].moq + '</div>';
						html += '<div class="stock" style="display: none;">' + data.data[i].stock + '</div>';
						html += '<div class="standardname" style="display: none;">' + data.data[i].standardname + '</div>';
						html += '<div class="cityname" style="display: none;">' + data.data[i].cityname + '</div>';
						html += '<div class="storeid" style="display: none;">' + data.data[i].storeid + '</div>';
						html += '<div class="productid" style="display: none;">' + data.data[i].productid+ '</div>';
						html += '<div class="companyid" style="display: none;">' + data.data[i].companyid + '</div>';
						//						console.log(data.data[i].storeid+'  '+data.data[i].id+'  '+data.data[i].companyid);
						//7689  181  1102
						html += '</div>';
						html += '</li>';
						var ulNode = $('#shop_table');
						ulNode.append(html);
						//						li.innerHTML = html;
						//						table.appendChild(li);
					}
				}
			},
			error: function(data) {

			}
		});

		//		}
	}, 1500);
}

/*点击搜索栏中商品选择下拉菜单选项*/

function searchType(e) {
	$('#shop_menu').slideToggle("slow");
	var menuNode = document.getElementById('shop_menu');
	if(isShow == true) {
		menuNode.style.display = 'block';
		searchBgNode.style.display = 'block';
		$("#menu_bg").css("display", "none");
		isShow = false;
		isBgShow = true;
		pzState = true;
	} else {
		menuNode.style.display = 'none';
		searchBgNode.style.display = 'none';
		isShow = true;
	}
	if($("#gj_ul_classify").css("display") == "block") {
		$("#gj_ul_classify").css("display", "none");
	}
	if($("#pinzhong").css("display") == "block") {
		$("#pinzhong").css("display", "none");
	}
}

/*点击隐藏模态框*/
$("#offCanvasWrapper").on("tap", "#menu_bg", function() {
	$('#gj_ul_classify').css("display", "none");
	$('#pinzhong').css("display", "none");
	$('#menu_bg').css("display", "none");
	isBgShow = true;
	pzState = true;
});
$("#offCanvasWrapper").on("tap", "#search_bg", function() {
	$('#shop_menu').css("display", "none");
	$('#search_bg').css("display", "none");
	isShow = true;
});
/*点击输入框，隐藏shop_menu下拉菜单*/
$('#search_box').on("tap","#shuru",function(){
	$('#shop_menu').css('display','none');
	$('#search_bg').css("display", "none");
	isShow = true;
	var menuNode = document.getElementById('shop_menu');
	if(isShow == true) {
		$("#menu_bg").css("display", "none");
		isShow = false;
		isBgShow = true;
		pzState = true;
	} else {
		menuNode.style.display = 'none';
		searchBgNode.style.display = 'none';
		isShow = true;
	}
	if($("#gj_ul_classify").css("display") == "block") {
		$("#gj_ul_classify").css("display", "none");
	}
	if($("#pinzhong").css("display") == "block") {
		$("#pinzhong").css("display", "none");
	}
});
/*添加购物车*/
var storeid;
var productid;
var companyid;
var userid;
mui('#shop_table').on('tap', '.shop-cart', function() {
	var storeIDNode = this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	storeid = storeIDNode.innerHTML;
	var productIDNode = this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	productid = productIDNode.innerHTML;
	var companyIDNode = this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	companyid = companyIDNode.innerHTML;
	/*判断是否登录*/
	var shoppingCount = this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	userid=getCookie('userId');
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		select_shop(storeid, productid, companyid,shoppingCount);
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		select_shop(storeid, productid, companyid,shoppingCount);
	}else{
		showDialog();
	}
//	$.ajax({
//		type: "GET",
//		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
//		url: config + "base/usersession",
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(data) {
//			var id;
//			if(data.id != null) {
//				if(data.logintype == 1) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 1) {
//						//						console.log(localStorage.getItem('userId') != '' && localStorage.getItem('logintype') == 1);
//						select_shop(storeid, productid, companyid,shoppingCount);
//					} else {
//						showDialog();
//					}
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 2) {
//						select_shop(storeid, productid, companyid,shoppingCount);
//
//					} else {
//						showDialog();
//					}
//				}
//			} else {
//				showDialog(this);
//			}
//		},
//		error: function(data) {
//
//		}
//	});
});

function select_shop(storeid, productid, companyid,shoppingCount) {
//	alert(productid+" "+storeid+" "+companyid+" "+shoppingCount);
	$.ajax({
		type: "GET",
		url: config + "cart/AddCart",
		contentType: "json; charset=utf-8",
		async: true,
		crossDomain: true,
		xhrFields: {withCredentials: true},
		data: {
			productid: productid,
			buyerid:userid,
			storeid: storeid,
			companyid: companyid,
			shoppingcount: shoppingCount
		},
		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
						console.log(storeid+'   '+productid+'   '+companyid);
			console.log(data);
			if(data.code == 1) {
				mui.toast('添加购物车成功！');
			} else {
				mui.toast('添加购物车失败！');
			}
		},
		error: function(data) {}
	});
}

/*跳转到详情*/
$('#shop_table').on('tap', '.to_detail', function() {
	var key_productname = this.firstElementChild.firstElementChild.innerHTML;
	var key_specifications = this.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
	var key_manufactor = this.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_pp = this.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_rules = this.nextElementSibling.firstElementChild.nextElementSibling.innerHTML;
	var key_varietyname = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
	var key_ppu = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_companyname = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_classificationname = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_moq = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_stock = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_standardname = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var key_cityname = this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
	var storeid = $(this).parent().find(".storeid").text();
	var productid = $(this).parent().find(".productid").text();
	var companyid = $(this).parent().find(".companyid").text();
	var moq = $(this).parent().find(".moq").text();
	localStorage.setItem('key_productname', key_productname);
	localStorage.setItem('key_specifications', key_specifications);
	localStorage.setItem('key_manufactor', key_manufactor);
	localStorage.setItem('key_pp', key_pp);
	localStorage.setItem('key_rules', key_rules);
	localStorage.setItem('key_varietyname', key_varietyname);
	localStorage.setItem('key_ppu', key_ppu);
	localStorage.setItem('key_companyname', key_companyname);
	localStorage.setItem('key_classificationname', key_classificationname);
	localStorage.setItem('key_moq', key_moq);
	localStorage.setItem('key_stock', key_stock);
	localStorage.setItem('key_standardname', key_standardname);
	localStorage.setItem('key_cityname', key_cityname);
	localStorage.setItem('key_storeid', storeid);
	localStorage.setItem('key_productid', productid);
	localStorage.setItem('key_companyid', companyid);
	localStorage.setItem('key_moq', moq);
	var date=new Date(); 
	date.setTime(date.getTime()+10*60*1000);
	document.cookie = "key_storeid ="+storeid+";expires="+date.toGMTString();
	document.cookie = "key_productid ="+productid+";expires="+date.toGMTString();
	document.cookie = "key_companyid ="+companyid+";expires="+date.toGMTString();
	document.cookie = "key_companyname ="+companyname+";expires="+date.toGMTString();
	window.location.href = 'shop_detail.html';
});
/*搜索*/
$('#search_box').on('tap', '#sousuo_div', function() {
	inputKey = $('#shuru').val().trim();
	if(shopSearchType == 0) {
			localStorage.setItem('go_resPage', '资源单');
			localStorage.setItem('shop_key', 'value');
			localStorage.setItem('shop_to_res', $("#shuru").val());
			window.location.href = '../resourceList/resource_list.html';
	} else if(shopSearchType == 1) {
	console.log('===============');
	$('#shop_table li').remove();
	mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
	mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
	$('#no_search').css('display', 'none');
	currentPage = 1;
	mui('#shop_item_show').pullRefresh().pullupLoading();
		}
//	else if(shopSearchType == 2) {
	//
	//	}
});

/*以下是侧滑页筛选*/
//主界面‘显示侧滑菜单’按钮的点击事件
document.getElementById('offCanvasShow').addEventListener('tap', function() {
	offCanvasWrapper.offCanvas('show');
	var flowNode = document.getElementsByClassName('mui-bar-tab')[0];
});

/*类别条件筛选*/
mui('#offCanvasSide .mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
$('#offCanvasSide').on("tap", "#all", function() {
	$('#offCanvasSide #gj_ul').slideToggle();
	$('#offCanvasSide #varietyDetail').hide();
	$('#offCanvasSide #standardDetail').hide();
	$('#offCanvasSide #bg').css("display", "block");
});
/*品种*/
$('#offCanvasSide').on("tap", "#varietyAll", function() {
	if($('#sx_type_list').children().length == 0) {
		$('#varietyDetail').css('height', '33px');
	} else if($('#sx_type_list').children().length == 2) {
		$('#varietyDetail').css('height', '100px');
	} else if($('#sx_type_list').children().length == 1) {
		$('#varietyDetail').css('height', '60px');
	} else {
		$('#varietyDetail').css('height', '180px');
	}
	$('#offCanvasSide #varietyDetail').slideToggle();
	$('#offCanvasSide #standardDetail').hide();
	$('#offCanvasSide #gj_ul').hide();
	$('#offCanvasSide #bg').css("display", "block");
});
/*筛选类别列表*/
$("#gj_ul").on("tap", "li a", function() {
	$("#all span")[0].innerHTML = $(this)[0].innerHTML;
	shopType = $(this)[0].innerHTML;
	console.log($(this)[0].innerHTML);
	$("#gj_ul").css("display", "none");
	$('#offCanvasSide #bg').css("display", "none");

	/*类别品种联动*/
	$("#sx_type_list").children().remove();
	var typeId = $(this).parent().attr("id");
	var varieties_list = "[{'id':'1','name':'聚合物改性沥青卷材','vid':'11'},{'id':'1','name':'沥青卷材','vid':'12'},{'id':'1','name':'金属卷材','vid':'13'},{'id':'2','name':'合成高分子涂料','vid':'21'},{'id':'1','name':'合成高分子卷材','vid':'14'},{'id':'2','name':'聚合物改性沥青涂料','vid':'22'},{'id':'2','name':'沥青基涂料','vid':'23'},{'id':'3','name':'防水混凝土','vid':'31'},{'id':'3','name':'防水砂浆','vid':'32'},{'id':'3','name':'刚性混凝土涂层防水','vid':'33'},{'id':'3','name':'混凝土渗透结晶型防水','vid':'34'},{'id':'3','name':'混凝土表面憎水剂防水','vid':'35'},{'id':'4','name':'粘土瓦','vid':'41'},{'id':'4','name':'有机瓦','vid':'42'},{'id':'4','name':'波形瓦','vid':'43'},{'id':'4','name':'金属瓦','vid':'44'},{'id':'4','name':'水泥瓦','vid':'45'},{'id':'5','name':'合成高分子密封材料','vid':'51'},{'id':'5','name':'高聚物改性沥青密封材料','vid':'52'},{'id':'6','name':'堵漏材料','vid':'61'},{'id':'2','name':'水泥基涂料','vid':'24'},{'id':'2','name':'聚氨酯涂料','vid':'25'},{'id':'2','name':'丙烯酸涂料','vid':'26'},{'id':'1','name':'抗根卷材','vid':'15'}]"
	var jsonarray_varieties = eval('(' + varieties_list + ')')
	var varieties_html = '';
	for(var i = 0; i < jsonarray_varieties.length; i++) {
		if(jsonarray_varieties[i].id == typeId) {
			console.log(jsonarray_varieties[i].id + 'aaaa' + typeId);
			varieties_html += '<li class="mui-table-view-cell" id="' + jsonarray_varieties[i].vid + '"><a href="#">' + jsonarray_varieties[i].name + '</a></li>';
		}
	}
	$("#sx_type_list").append(varieties_html);
});
/*品种列表*/
$('#offCanvasSide #varietyDetail').on('tap', 'ul li a', function() {
	$("#offCanvasSide #varietyAll span")[0].innerHTML = $(this)[0].innerHTML;
	console.log($(this)[0].innerHTML.trim());
	varietyname = $(this)[0].innerHTML.trim();
	$("#offCanvasSide #varietyAll span").css('color', '#000');
	$('#offCanvasSide #varietyDetail').hide();
	$('#offCanvasSide #bg').css("display", "none");

});
/*标准*/
$('#offCanvasSide #standardDetail').on('tap', 'li', function() {
	standardname = $("#shop_index_standom").text().trim();
	console.log(standardname);
	$("#offCanvasSide #standard span")[0].innerHTML = $(this).find('a').text();
	$('#offCanvasSide #standardDetail').hide();
	$('#offCanvasSide #bg').css("display", "none");
});
$('#offCanvasSide').on("tap", "#standard", function() {
	$('#offCanvasSide #standardDetail').slideToggle();
	$('#offCanvasSide #varietyDetail').hide();
	$('#offCanvasSide #gj_ul').hide();
	$('#offCanvasSide #bg').css("display", "block");
});

/*重置与完成功能*/
/*重置*/
$("#offCanvasSide").on("tap", "#bottom-div", function() {
	var ulNode = document.getElementById('gj_ul'); //类别
	$('#all span').text('全部');
	var varietyTxt = $("#offCanvasSide #varietyAll span")[0]; //品种
	varietyTxt.innerHTML = "全部";
	var standardTxt = $("#offCanvasSide #standard span")[0]; //标准
	standardTxt.innerHTML = "国际标准";
	var cityResult = $('#offCanvasSide #select_city span'); //仓库位置
	cityResult[0].innerText = "省-市-区";
	var inputs = $('input'); //公司
	inputs[0].value = '';
	/*将筛选外的条件也进行重置*/
	$('#gongjiang span').text('类别');
	$('#near span').text('品种');
	$('#select_store span').text('仓库');
});
/*完成*/

$("#offCanvasSide").on("tap", "#bottom-finish", function() {
	$('#no_search').css('display', 'none');
	$('#shop_table li').remove();
	mui('#shop_item_show').pullRefresh().refresh(true);     //恢复滚动
	mui('#shop_item_show').pullRefresh().scrollTo(0,0,100); //滚动置顶
	var shopfortype = $('#all span').text().trim();
	if(shopfortype.length > 4) {
		shopfortype = shopfortype.substring(0, 4);
	}
	$('#gongjiang span').text(shopfortype);
	var shopforver = $('#varietyAll span').text().trim();
	if(shopforver.length > 4) {
		shopforver = shopforver.substring(0, 4);
	}
	$('#near span').text(shopforver);
	var stroeforshop = $('#select_city span').text().trim();
	stroeforshop = stroeforshop.split('-', 1);
	console.log(stroeforshop);
	if(stroeforshop.length > 4) {
		stroeforshop = stroeforshop.substring(0, 4);
	}
	if(stroeforshop != '省'){
		$('#select_store span').text(stroeforshop);
	}else{
		$('#select_store span').text('仓库');
	}
	
	currentPage = 1;
	mui('#shop_item_show').pullRefresh().pullupLoading();
	offCanvasWrapper.offCanvas('close');

});
/*点击隐藏模态框*/
$("#offCanvasSide").on("tap", "#bg", function() {
	$('#offCanvasSide #standardDetail').hide();
	$('#offCanvasSide #varietyDetail').hide();
	$('#offCanvasSide #gj_ul').hide();
	$('#offCanvasSide #bg').css("display", "none");
});

/*点击购物车*/
$('.mui-bar').on('tap', '#go_shopcart', function() {
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = '../shopCart/shopcart_index.html';
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href = '../shopCart/shopcart_index.html';
	}else{
		showDialog();
	}
//	$.ajax({
//		type: "GET",
//		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
//		url: config + "base/usersession",
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(data) {
//			var id;
//			if(data.id != null) {
//				if(data.logintype == 1) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 1) {
//						window.location.href = '../shopCart/shopcart_index.html';
//					} else {
//						showDialog();
//					}
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 2) {
//						window.location.href = '../shopCart/shopcart_index.html';
//					} else {
//						showDialog();
//					}
//
//				}
//			} else {
//				if(pla=='0'){//如果是苹果手机
//					iphoneToSet();
//				}else if(pla=='1'){
//					showDialog();
//				}
//			}
//		},
//		error: function(data) {
//
//		}
//	});
});
/*点击个人中心*/
$('.mui-bar').on('tap', '#go_person_center', function() {
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href = '../my/my_index.html';
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		if(getCookie('applicantstatus') == 10){
//			window.location.href = '../my/seller/noSettled_company.html';
			window.location.href='../my/my_index.html';
		}else if(getCookie('applicantstatus') == 11){
			window.location.href = '../my/seller/myAccount.html';
		}
	}else{
		showDialog();
	}
//	$.ajax({
//		type: "GET",
//		//	url:"http://192.168.18.189:8080/gcafu_commerce/rest/base/usersession",
//		url: config + "base/usersession",
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {},
//		dataType: 'jsonp',
//		jsonp: 'jsoncallback',
//		success: function(data) {
//			var id;
//			if(data.id != null) {
//				if(data.logintype == 1) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 1) {
//						window.location.href = '../my/my_index.html';
//					} else {
//						showDialog();
//					}
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 2) {
//						if(data.applicantstatus == 10){
////							window.location.href = '../my/seller/noSettled_company.html';
//							window.location.href='../my/my_index.html';
//						}else if(data.applicantstatus == 11){
//							window.location.href = '../my/seller/myAccount.html';
//						}
//					} else {
//						showDialog();
//					}
//
//				}
//			} else {
//				if(pla=='0'){//如果是苹果手机
//					iphoneToSet();
//				}else if(pla=='1'){
//					showDialog();
//				}
//
//			}
//		},
//		error: function(data) {
//
//		}
//	});
});
/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../login/login.html';
		} else {}
	})
}
function iphoneToSet(){
	var btnArray = ['否', '是'];
	mui.confirm('为了您更好使用，请打开本机浏览器cookie功能，详情请见~！', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../setting/iphoneSetting.html';
		} else {}
	})
}
//判断浏览器是什么内核
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
     if(window.location.href.indexOf("?mobile")<0){
      try{
       if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
        return '0';
       }else{
        return '1';
       }
      }catch(e){}
     }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
};
var pla=ismobile(1);//0表示iPhone，1表示Android；
//console.log(pla);

