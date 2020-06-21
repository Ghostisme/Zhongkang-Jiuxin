mui('.mui-scroll-wrapper').scroll({
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
/*获取商品详情*/
var shopNameNode = $('#shop_name_lable');
var priceNode = $('#pro_price');
var discountNode = $('#discount');
var typeNode = $('#pro_product_type');
var guigeNode = $('#pro_guige');
var priDwNode = $('#pri_dw');
var companyNode = $('#company_name_span');
var leibieNode = $('#type_span');
var proComNode = $('#pro_product_name');
var standardNode = $('#standard');
var startPayNode = $('#start_pay_name');
var stockNode = $('#stock');
var cangkuNode = $('#cangku_location');
var storeid;
var productid;
var companyid;
var userid;
if(window.location.search){  
    var aaa = window.location.search.split("=")[1];  
    //接下来就可以针对得到的参数值进行判断和下一步的操作了  
    	storeid=localStorage.getItem('keyStoreid');
		productid=localStorage.getItem('keyProductid');
		companyid=localStorage.getItem('keyCompanyid');
		userid=sessionStorage.getItem("userId");	
}else{
    //如果没有参数可以做一些其它事件  
       	storeid=getCookie  ('key_storeid');
		productid=getCookie('key_productid');
		companyid=getCookie('key_companyid');
		userid=getCookie('userId');
} 
if(storeid==""||storeid==null){
storeid=localStorage.getItem('key_storeid');
productid=localStorage.getItem('key_productid');
companyid=localStorage.getItem('key_companyid');	
}

storeid=parseInt(storeid);
productid=parseInt(productid);
companyid=parseInt(companyid);
userid=getCookie('userId');
//alert(storeid+" "+productid+" "+companyid);
var shoppingCount;//购买数量为起订量

 $.ajax({
		type:"GET",
		url:config+"seller/productDeliInfo",
//		contentType:"application/json; charset=utf-8",
		async:false,
		data:{productid:productid,storeid:storeid},
//		data:{productid:470,storeid:4280},
		dataType:'JSON',
		success:function(data){
			console.log(data);
			if(data.code==1){
				shopNameNode.text('商品名称：'+data.productinfo.productname);
				priceNode.text("￥"+data.reducedPrice);
				discountNode.text(data.productinfo.rules);
				typeNode.text(data.productinfo.varietyname);
				guigeNode.text(data.productinfo.specifications);
				priDwNode.text(data.productinfo.ppu);
				companyNode.text(data.productinfo.companyname);
				leibieNode.text(data.productinfo.classificationname);
				proComNode.text(data.productinfo.manufactor);
				standardNode.text(data.productinfo.standardname);
				startPayNode.text(data.productinfo.moq);
				stockNode.text(data.productinfo.stock);
				cangkuNode.text(data.productinfo.cname);
				shoppingCount=data.productinfo.moq;
//				console.log(shoppingCount);
			}
		},
		error:function(data){
			console.log(data);
		}
	});

	


//加入购物车
$(".addtoShopCart").click(function(){
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		select_shop(storeid,userid, productid, companyid,shoppingCount);
		addProduct(event);
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		select_shop(storeid,userid, productid, companyid,shoppingCount);
		addProduct(event);
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
//						addProduct(event);
//					} else {
//						showDialog();
//					}
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 2) {
//						select_shop(storeid, productid, companyid,shoppingCount);
//						addProduct(event);
//					} else {
//						showDialog();
//					}
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
//加入购物车飞入效果
function addProduct(event) {
	var offset = $('#CartImg').offset(), flyer = $('<img class="u-flyer" src="../../styles/img/shop_img/paint5.png"/>');
	var startOffset=$('#cartBtn').offset();
	console.log(offset);
	flyer.fly({
		start: {
			left: startOffset.left,
			top: startOffset.top
		},
		end: {
			left: 2*startOffset.left+60,
			top: offset.top,
			width: 0,
			height: 0
		}
	});
}

//加入购物车
function select_shop(storeid,userid, productid, companyid,shoppingCount) {
//	alert(productid+" "+storeid+" "+companyid+" "+shoppingCount);
	shoppingCount=parseInt($("#start_pay_name").text());
	$.ajax({
		type: "GET",
		url: config + "cart/AddCart",
		contentType: "json; charset=utf-8",
		async: true,
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
			//			console.log(storeid+'   '+productid+'   '+companyid);
			if(data.code == 1) {
				mui.toast('添加购物车成功！');
			} else {
				mui.toast('添加购物车失败！');
			}
		},
		error: function(data) {}
	});
}

/*判断是否登录的dialog*/
function showDialog() {
	var btnArray = ['否', '是'];
	mui.confirm('您还没有登录，是否去登录？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			window.location.href = '../login/login.html?a=1';
//			localStorage.setItem("detailjumptoLogin","商品详情");
//			document.cookie = "detailjumptoLogin=商品详情;path=/";
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
//点击购物车图标去购物车查看
$(document).on("tap","#CartImg",function(){
	console.log("aaaa");
	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
		window.location.href="../shopCart/shopcart_index.html";
	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
		window.location.href="../shopCart/shopcart_index.html";
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
//						window.location.href="../shopCart/shopcart_index.html";
//					} else {
//						showDialog();
//					}
//
//				} else if(data.logintype == 2) {
//					if(getCookie('userId') != '' && getCookie('logintype') == 2) {
//						window.location.href="../shopCart/shopcart_index.html";
//					} else {
//						showDialog();
//					}
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