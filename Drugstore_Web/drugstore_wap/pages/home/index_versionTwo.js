var userId = getCookie('userId');
var logintype = getCookie('logintype');
var isMaskShow = false; //判断遮层是否显示
mui.init();
mui.init({
	swipeBack: true //启用右滑关闭功能
});

//获得slider插件对象
var slider = mui('#slider');
slider.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});
mui('.mui-scroll-wrapper').scroll({
	scrollY: true, //是否竖向滚动
	scrollX: false, //是否横向滚动
	startX: 0, //初始化时滚动至x
	startY: 0, //初始化时滚动至y
	indicators: true, //是否显示滚动条
	deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
	bounce: true //是否启用回弹
});

//点击搜素下拉
$("header").on("tap","#searchType",function(){
//	if(!isMaskShow){
//		$("#shopMenu").slideDown();
//		isMaskShow = true;
//		$(".mask").show();
//	}else{
//		$("#shopMenu").slideUp();
//		isMaskShow = false;
//		$(".mask").hide();
//	}
	$("#shopMenu").slideToggle();
	$(".mask").toggle();
	
})
$("#shopMenu").on("tap",".mune-item",function(){
	var serchType = $(this).children().text();
	$("#product").children().text(serchType);
	$("#shopMenu").slideToggle();
	$(".mask").toggle();
});

//点击搜索
$("header").on("tap","#searchBtn",function(){
	var keyWord = $("#searchInput").val();
	localStorage.setItem("key","value");
	localStorage.setItem("search_input",keyWord);
	location.href="../shop/shop_index_versionTwo.html"
})

//点击栏目快捷导航类别
/*$(".column").on("tap",".shop_type",function(){
	var shop_type = $(this).find("label").text();
	console.log(shop_type);
	localStorage.setItem("classifykey","classyfy");
	localStorage.setItem("classifyChose",shop_type);
	location.href="../shop/shop_index_versionTwo.html?p=1"
})*/

//点击商家入驻
$(".column").on("tap",".ruzhu",function(){
	location.href = '../register/register.html'
})

//点击电话客服
$(".column").on("tap", ".kefu", function() {
	console.log("coming...");
	var btnArray = ['否', '是'];
	mui.confirm('确认电话咨询？', '', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = "tel:18526221410";
		}
	})
});

//点击跳转品牌页
$("#brandSlider").on("tap",".mui-slider-item img",function(){
	var brandname = $(this).attr("id")
	localStorage.setItem("brandname",brandname);
	var urlHTML =  brandname.slice(6,brandname.length);
	console.log(urlHTML)
	location.href = "../brand/"+urlHTML+".html";
})


$(function(){
	startMove($(".informationList li"));
	//添加商品
	// addChoice(2590,983);
	// addChoice(6174,952);
	
	// addSpecialOffer(7905,977);
	// addSpecialOffer(5392,948);
	// addSpecialOffer(5231,961);
	//
	// addHotSale(3771,930,"left");
	// addHotSale(7711,955,"right-top");
	// addHotSale(2002,924,"right-bottom");
	
	//登陆功能
	if(userId!=null){
		if(logintype==1){
			$.ajax({
				type: "GET",
				url: config + 'buyer/buyerWorkbench',
				contentType: "json; charset=utf-8",
				async: true,
				data: {
					"mobile": 1,
					"id": userId
				},
				dataType: 'JSONP',
				jsonp: 'callback',
				success: function(data) {
//					console.log(data);
					$(".loginBox").html('')
					if(data.image==""){
						html='<img src="../../styles/img/my_img/userImg.jpg" />';
					}else if(data.image!=""||data.image!=null){
						html='<img src="'+src+data.image+'" />';
					}
					$(".loginBox").append(html)
				}
			});	
		}else if(logintype==2){
			$.ajax({
				type: "GET",
				url: config + "seller/sellerWorkbench",
				contentType: "json; charset=utf-8",
				async: true,
				data: {
					id: userId,
					mobile: 1
				},
				dataType: 'JSONP',
				JSONP: "callback",
				success: function(data) {
//					console.log(data);
					$(".loginBox").html('')
					if(data.image==""){
						html='<img src="../../styles/img/my_img/seller_img/companyImg.jpg" />';
					}else if(data.image!=""||data.image!=null){
						html='<img src="'+src+data.image+'" />';
					}
					$(".loginBox").append(html)
					
				}
			});
		}
	}
})

//资讯轮播
function startMove(moveDom){
	var index = 0
	//获取li 数量、高
	var len = moveDom.length
	var liH = moveDom.height();
	moveDom.parent().height(liH*len)
	var myMove = setInterval(function(){
		index++;
		moveDom.parent().css({transform:'translateY(-'+(index*liH)+'px)',transitionDuration:'2s'});
		if(index==len-1){
			setTimeout(function(){
				index=1
				moveDom.parent().css({transform:'translateY(-'+(index*liH)+'px)',transitionDuration:'0s'});
			},2000)
		}
	},4000)
}

//点击登陆
$(document).on("tap",".loginBox span",function(){
	window.location.href = '../login/login.html';
})

//点击进入个人中心
$(document).on("tap",".loginBox img",function(){
	if(logintype==1){
		window.location.href = '../my/my_index.html';
	}else if(logintype==2){
		window.location.href = '../my/seller/myAccount.html';
	}
})

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}


/*点击购物车*/
//$('.mui-bar').on('tap', '#go_shopcart', function() {
//	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
//		window.location.href = '../shopCart/shopcart_index.html';
//	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
//		window.location.href = '../shopCart/shopcart_index.html';
//	}else{
//		showDialog();
//	}
//});

/*点击个人中心*/
//$('.mui-bar').on('tap', '#go_person_center', function() {
//	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
//		window.location.href = '../my/my_index.html';
//	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
//		if(getCookie('applicantstatus') == 10){
//			window.location.href='../my/my_index.html';
//		}else if(getCookie('applicantstatus') == 11){
//			window.location.href = '../my/seller/myAccount.html';
//		}
//	}else{
//		showDialog();
//	}
//});

/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			top.location.href = 'pages/login/login.html';
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


//获取商品
//var sid = 8836;
//var pid = 905;

function getProduct(sid,pid){
	var obj;
	$.ajax({
		type:"GET",
		url:config+"seller/productDeliInfo",
		contentType:"application/json; charset=utf-8",
		async:false,
		data:{productid:pid,storeid:sid},
		dataType:'JSON',
		success:function(data){
			obj = data.productinfo;
		}
	})
	return obj;
}

//添加精选商品
function addChoice(sid,pid){
	//获取商品信息
	var obj = getProduct(sid,pid);
	console.log(obj);
	var html = '';
	html+='<div class="list-item mui-col-sm-6 mui-col-xs-6">';
	html+='<span class="sid hideSpan">'+obj.storeid+'</span>'
	html+='<span class="pid hideSpan">'+obj.productid+'</span>'
	html+='<span class="cid hideSpan">'+obj.companyid+'</span>';
	html+='<img src="'+src+obj.img1+'"/>';
	html+='</div>';
	$(".choiceProduct").append(html);
}

//添加特价商品
function addSpecialOffer(sid,pid){
	//获取商品信息
	var obj = getProduct(sid,pid);
//	console.log(obj);
	var html='';
	html+='<div class="list-item mui-col-sm-4 mui-col-xs-4">';
	html+='<span class="sid hideSpan">'+obj.storeid+'</span>'
	html+='<span class="pid hideSpan">'+obj.productid+'</span>'
	html+='<span class="cid hideSpan">'+obj.companyid+'</span>';
	html+='<img src="'+src+obj.img1+'"/>'
	html+='<p class="proName">'+obj.productname+'&nbsp;&nbsp;<span class="proModel">'+obj.specifications+'</span></p>';
	html+='<p class="proPrice">￥'+obj.pp+'</p>';
	html+='</div>';
	$(".specialOfferList").append(html);
}


//添加热卖商品
function addHotSale(sid,pid,proPosition){
	//获取商品信息
	var obj = getProduct(sid,pid);
//	console.log(obj);
	var html='';
	if(proPosition=="left"){
		//左
		html+='<span class="sid hideSpan">'+obj.storeid+'</span>';
		html+='<span class="pid hideSpan">'+obj.productid+'</span>';
		html+='<span class="cid hideSpan">'+obj.companyid+'</span>';
		html+='<img src="'+src+obj.img1+'"/>';
		html+='<div>'+obj.productname+'</div>';
	}else if(proPosition=="right-top"){
		//右上
		html+='<span class="sid hideSpan">'+obj.storeid+'</span>';
		html+='<span class="pid hideSpan">'+obj.productid+'</span>';
		html+='<span class="cid hideSpan">'+obj.companyid+'</span>';
		html+='<div class="proName">耐根穿刺卷材</div>';
		html+='<div class="imgBox">';
		html+='<img src="'+src+obj.img1+'"/>';
		html+='</div>';	
	}else if(proPosition=="right-bottom"){
		//右下
		html+='<span class="sid hideSpan">'+obj.storeid+'</span>';
		html+='<span class="pid hideSpan">'+obj.productid+'</span>';
		html+='<span class="cid hideSpan">'+obj.companyid+'</span>';
		html+='<div class="proName">优选防水涂料</div>';
		html+='<div class="imgBox">';
		html+='<img src="'+src+obj.img1+'"/>';
		html+='</div>';	
	}
	$("."+proPosition).append(html);
}

//点击商品跳转详情
$(".specialOfferList,.hotSaleList,.choiceProduct").on("tap",".list-item",function(){
	var sid = $(this).find(".sid").text();
	var pid = $(this).find(".pid").text();
	var cid = $(this).find(".cid").text();
//	alert(sid+"  "+pid+"  "+cid)
	location.href="../shop/shop_detail_versionTwo.html?sid="+sid+"&pid="+pid+"&cid="+cid;;
})
