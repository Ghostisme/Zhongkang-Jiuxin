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
var imgArr=new Array();//定义一个数组用来存放有图的产品图
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
//获取地址栏里的storeid和productid
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
} 
// 调用方法

storeid=parseInt(GetQueryString('sid'));
//productid=parseInt(GetQueryString('pid'));
productid=parseInt(getQueryVariable("rec"));
companyid=parseInt(GetQueryString('cid'));
userid=getCookie('userId');
console.log(userid);
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
				$("#productName").text(data.productinfo.productname);
				$("#companyName").text(data.productinfo.companyname);
				$("#price").text("￥"+data.productinfo.pp+"/"+data.productinfo.ppu);
				$("#spec span").text(data.productinfo.specifications);
				if(data.productinfo.pname=="北京市"||data.productinfo.pname=="天津市"||data.productinfo.pname=="上海市"||data.productinfo.pname=="重庆市"){
					$("#storeName").text(data.productinfo.cname+"-"+data.productinfo.cname);//仓库
				}else{
					$("#storeName").text(data.productinfo.pname+"-"+data.productinfo.cname);//仓库
				}
				$("#moq").text(data.productinfo.moq);
//				$("#PlatformPreference").text(data.productinfo.moq);
//				以下是商品参数
				$(".ParametersClassify").text(data.productinfo.classificationname);
				$(".ParametersVariety").text(data.productinfo.varietyname);
				$(".ParametersPec").text(data.productinfo.specifications);
				$(".ParametersModel").text(data.productinfo.model);
				$(".ParametersLevel").text(data.productinfo.standardname);
				$(".ParametersPP").text(data.productinfo.ppu);
				$(".Parameterscompany").text(data.productinfo.manufactor);
				$(".Parametersbrand").text(data.productinfo.brandname);
				$(".ParametersmateriaUse").text(data.productinfo.materialusename);
				//详情描述和详情图
				$(".describes").text(data.productinfo.description);
				//上方商品图
				if(data.productinfo.img1!=null&&data.productinfo.img1!=""){
					imgArr.push(data.productinfo.img1);
				}
				if(data.productinfo.img2!=null&&data.productinfo.img2!=""){
					imgArr.push(data.productinfo.img2);
				}
				if(data.productinfo.img3!=null&&data.productinfo.img3!=""){
					imgArr.push(data.productinfo.img3);
				}
				if(data.productinfo.img4!=null&&data.productinfo.img4!=""){
					imgArr.push(data.productinfo.img4);
				}
				console.log(imgArr[imgArr.length-1]);
				if(imgArr.length!=0){
					if(imgArr.length==1){
						$(".detailImg img").attr("src",window.src+imgArr[0]);
					}else{
						$("#productDrawing").html("");
						$("#productDrawing").append('<div class="mui-slider-item mui-slider-item-duplicate lunbo"><a class="detailImg"><img src="'+window.src+imgArr[imgArr.length-1]+'"></a></div>')
						$("#productDrawing").append('<div class="mui-slider-item mui-slider-item-duplicate lunbo"id="lastImg"><a class="detailImglast"><img src="'+window.src+imgArr[0]+'"></a></div>')
						
						for(var k=0;k<imgArr.length;k++){
							var htmls='';
							htmls+='<div class="mui-slider-item mui-slider-item-duplicate lunbo"><a class="detailImg'+k+'"><img src="'+window.src+imgArr[k]+'"></a></div>';
							$("#lastImg").before(htmls);
						}
					}
				}
				
				//商品详情大图
			if(data.productinfo.showpic1!=null&&data.productinfo.showpic1!=""){
				html='';
				html+='<img src="'+window.src+data.productinfo.showpic1+'" alt="" />';
				$(".goodsBigImg").append(html);
			}
			if(data.productinfo.showpic2!=null&&data.productinfo.showpic2!=""){
				html='';
				html+='<img src="'+window.src+data.productinfo.showpic2+'" alt="" />';
				$(".goodsBigImg").append(html);
			}
			if(data.productinfo.showpic3!=null&&data.productinfo.showpic3!=""){
				html='';
				html+='<img src="'+window.src+data.productinfo.showpic3+'" alt="" />';
				$(".goodsBigImg").append(html);
			}
			if(data.productinfo.showpic4!=null&&data.productinfo.showpic4!=""){
				html='';
				html+='<img src="'+window.src+data.productinfo.showpic4+'" alt="" />';
				$(".goodsBigImg").append(html);
			}
			if(data.productinfo.showpic5!=null&&data.productinfo.showpic5!=""){
				html='';
				html+='<img src="'+window.src+data.productinfo.showpic5+'" alt="" />';
				$(".goodsBigImg").append(html);
			}
			}
		},
		error:function(data){
			console.log(data);
		}
	});
//查询商品是否已关注
if(userid!=""&&userid!=null){
	$.ajax({
		type:"GET",
		url:config+"seller/productForUser",
		async:false,
		data:{productId:productid,storeId:storeid,userId:userid},
		dataType:'JSON',
		success:function(data){
			console.log(data);
			if(data.code==1){
				$("#follow").find("img").attr("src","../../styles/img/shop_img/redstar.png");
				$("#follow").find("div").css("color","#F83359");
				$("#follow").find("div").text("已关注");
			}else{
				$("#follow").find("img").attr("src","../../styles/img/shop_img/greystar.png");
				$("#follow").find("div").css("color","#323232");
				$("#follow").find("div").text("关注");
			}
		},
		error:function(data){
			console.log(data);
		}
	});
}
 
	


//加入购物车
//$("#addShopcar").click(function(){
//	if(getCookie('userId')!='' && getCookie('logintype') == 1 ){
//		select_shop(storeid,userid, productid, companyid,shoppingCount);
////		addProduct(event);
//	}else if(getCookie('userId')!='' && getCookie('logintype') == 2 ){
//		select_shop(storeid,userid, productid, companyid,shoppingCount);
////		addProduct(event);
//	}else{
//		showDialog();
//	}
//});
$("#addShopcar").click(function(){
//	if(getCookie('userId')!=''){
//		select_shop(storeid,userid, productid, companyid,shoppingCount);
////		addProduct(event);
//	}else if(getCookie('userId')!=''){
//		select_shop(storeid,userid, productid, companyid,shoppingCount);
////		addProduct(event);
//	}else{
//		showDialog();
//	}
	select_shop(1, productid, companyid,shoppingCount);
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
function select_shop(userid, productid, drugPrice,shoppingCount) {
//	alert(productid+" "+storeid+" "+companyid+" "+shoppingCount);
	shoppingCount=parseInt($("#moq").text());
	$.ajax({
		type: "GET",
		url: config + "cart/AddCart",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			drugId: productid,//药品id
			buyerid:userid,//用户id
//			storeid: storeid,
			drugPrice: drugPrice,//药品单价
			drugNum: shoppingCount//数量
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
// });

//点击模板关闭参数详情
$(document).on("tap","#modals",function(){
	$("#modals").css("display","none");	
	$("#productParameters").css("display","none");	
});
//点击关闭参数详情按钮
$(document).on("tap","#closeParameters",function(){
	$("#modals").css("display","none");	
	$("#productParameters").css("display","none");	
});
//点击商品参数
$(document).on("tap","#goodsParametersItem",function(){
	$("#modals").css("display","block");	
	$("#productParameters").css("display","block");	
});
//立即购买
var arr=new Array();
$(document).on("tap","#gotoOrder",function(){
	shoppingCount=parseInt($("#moq").text());
	var sessionArr = new Array();
	if(getCookie('userId')!='' && getCookie('userId')!=null &&getCookie('userId')!=undefined){
		arr.push({
			"productid": productid,
			"storeid": storeid,
			'buyerid':userid,
			"shoppingcount": shoppingCount
		});
		var cartlist = JSON.stringify(arr);
		localStorage.setItem('cartlist', cartlist);

		$.ajax({
				type:"GET",
				url:config+"order/buyerToOrder",
	//			url:"http://192.168.18.126:8080/gcafu_commerce/rest/order/buyerToOrder",
				async:false,
				dataType:"JSONP",
				JSONP:"callback",
				data: {'productid':productid,'storeid':storeid,'shoppingcount':shoppingCount},
				contentType: "json; charset=utf-8",
				success:function(data){
					if(data.code==1){
						sessionStorage.setItem("jumpToorderSubmit","2");//商品详情跳转到提交订单页为2
						var myObj = {
							"productid": productid,
							'buyerid':userid,
							"storeid": storeid
						}
						sessionArr.push(myObj);
						var str = JSON.stringify(sessionArr);
						sessionStorage.setItem("ProductIds", str);
						window.location.href="../shopCart/order/order_index.html?a=1";
					}else{
						window.location.href="login.html"
					}
				},
			});
	}else{
		showDialog();
	}
});


//关注商品
$(document).on("tap","#follow",function(){
	if(getCookie('userId')!=''&&getCookie('userId')!=null){
		$(this).find("img").attr("src","../../styles/img/shop_img/redstar.png");
		$(this).find("div").css("color","#F83359");
		$(this).find("div").text("已关注");
		/*向后台发送请求*/
				$.ajax({
					type:"GET",
					dataType:"JSON",
					url:config+"buyer/addUserProduct",
					data:{
						userId:userid,
						productId:productid,/*商品ID*/
						storeId:storeid,/*仓库ID*/
					},
					success:function(data){
						console.log(data);
						if(data.code == 1){
							console.log(data.msg);
						}else if(data.code == 2){
							mui.toast("该商品已关注，请勿重复点击！");
						}
					},
					error:function(msg){
						mui.toast("服务器报错，请刷新重试！");
					}
				});
	}else{
		showDialog();
	}
})
