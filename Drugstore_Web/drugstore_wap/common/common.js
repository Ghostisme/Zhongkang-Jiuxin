//window.config = "http://192.31.10.197:8003";
window.config = "https://www.jhydls.cn/drugapi";
//window.config = "http://192.168.18.253:8080/gcafu_commerce/rest/";
//window.config = "http://192.168.18.3:8080/gcafu_commerce/rest/";
//window.config = "http://192.168.18.189:8080/gcafu_commerce/rest/";
//window.config = "http://192.168.18.8:8080/gcafu_commerce/rest/";
window.secondConfig="http://120.27.109.183/gcafu-crm/addcusAsPc.shtml";
window.src = "http://60.205.92.79:8090/image-web/upload/";

var ext = new Object();
//mediator
ext.mediator = new Object();
//proxy
ext.proxy = new Object();
//model
ext.model = new Object();
$.prototype.cpost = function(url,data={}/*传递数据*/){
    $.ajax({
		type: "POST",
		url: config + url,
		contentType: "application/json; charset=utf-8",
		async: true,
		data: data,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data) {
            for(var p in packJson){
                var key = p.key;
                var value = p.value;
                $("#"+key).val(value);
            }
        }
	});
}
$.prototype.cget = function(url,data={}){
    $.ajax({
		type: "GET",
		url: config + url,
		contentType: "application/json; charset=utf-8",
		async: true,
		data: data,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function(data) {
            
        }
	});
}
//判断数组类型
function isArrayFn(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
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
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return decodeURI(pair[1]);}
    }
    return(false);
}

window.webUser = JSON.parse(sessionStorage.getItem("webUser"));
console.log(window.webUser);


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

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function sideCartNum(){
	$.ajax({
		type: "GET",
		url: config + "/drug/cart/count",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			userId: window.webUser.id
		},
		dataType: 'JSON',
		traditional: true,
		success: function(data) {
			console.log(data.resultMap.total);
			if(data.resultMap.total > 99) $(".sideShopCartNum").text("99+");
			else $(".sideShopCartNum").text(data.resultMap.total);		
		},
		error: function(data) {
			
		}
	});
}
//window.onload = function() {
//	if(window.user) {
//		sideCartNum();
//		$(".sideShopCartNum").show();
//	}
//}
if(window.webUser) {
	sideCartNum();
	$(".sideShopCartNum").css("display","block");
}
//$(document).ready(function(){
//	if(window.user) {
//		sideCartNum();
//		$(".sideShopCartNum").show();
//	}
//})
