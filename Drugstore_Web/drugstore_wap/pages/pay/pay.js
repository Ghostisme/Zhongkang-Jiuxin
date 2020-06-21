//localStorage.payResults = 1; 
//var orderId = localStorage.getItem("orderID");
//var gettype = localStorage.getItem("gettype")
//var price = localStorage.getItem("price");
//var goods = localStorage.getItem("goods");
//console.log(orderId+"  "+price+"  "+goods);
//$(function(){
//	if(typeof FileReader == 'undefined') {
//		document.getElementById("xmTanDiv").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
//		//使选择控件不可操作
//		document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
//	}
//	//填充价格
//	$(".money").text("￥"+price)
//})
//
////点击支付
//$(document).on("tap",".payBtn",function(){
//	if($(".mui-selected span").hasClass("AlipayImg")){
//		//支付宝
//		alipay();
//	}else if($(".mui-selected span").hasClass("WeChatImg")){
//		//微信		
//	}
//})
//
//
////支付宝支付
//function alipay(){
//	$.ajax({
//		type:"get",
//		url:config+"Pay/alipayForWeb",
//		async:true,
//		dataType:'json',
//		data:{
//			"WIDout_trade_no":orderId,
//			"WIDtotal_amount":price,
//			"WIDsubject":goods,
//			"WIDbody":""
//		},
//		success:function(data){
//			console.log(data)
//			sessionStorage.setItem("formData",data.data);
//			location.href="form.html";
////			if(data.code==1){
////				sessionStorage.setItem("payResults",true);
////				location.href="payResults.html"
////			}else{
////				sessionStorage.setItem("payResults",false);
////				location.href="payResults.html"
////			}
//		},
//		error:function(result){
//			alert("异常");
//			console.log(result);
//		}
//	});
//}
//
//
//var setTime;
//var flag;
//
//$("#pz").click(function(){
//	$("#voucher").attr("action", config + "/order/ImgUpload");
//	$("#voucher").submit();
//	flag = true;
//	setTime = setInterval(function(){
//		if(flag == true){
//			getPic();
//			flag = false;
//		}else if(flag == false){
//			clearInterval(setTime);
//		}
//	},3000);
//});
//
////	getPic();
//function getPic(){
//	$.ajax({
//		type:"get",
//		url:config+"/order/ImgUploadflag",
//		async:false,
//		data:{buyerid:buyerId,orderid:orderid},
//		dataType:'jsonp',
//		JSONP:'callback',
//		success:function(data){
//			if(data.code == 1){
////					console.log(data.evidence);
//				alert("提交成功" + data.evidence);
//				resourceyOrn = true;
//				picUrl = data.evidence;
////					console.log(window.src+picUrl);
//				$("#pic").attr("src",window.src+picUrl);
//
//			}else if( data.code == 2){
//				resourceyOrn = false
//				alert("上传失败，请重新上传");
//			}
//		},
//	});
//}
//
///*图片上传预览*/
//if (typeof FileReader == 'undefined') {
//  document.getElementById("xmTanDiv").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
//  //使选择控件不可操作
//  document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
//}
////选择图片，马上预览
//function xmTanUploadImg(obj) {
//  var file = obj.files[0];
////              console.log(obj);console.log(file);
////              console.log("file.size = " + file.size);  //file.size 单位为byte
//	var img = document.getElementById('picFile');
//	blob = URL.createObjectURL(img.files[0]);
//	console.log(blob)
// 	
// 	
// 	var reader = new FileReader();
//
////读取文件过程方法
//  reader.onloadstart = function (e) {
//      console.log("开始读取....");
//  }
//  reader.onprogress = function (e) {
//      console.log("正在读取中....");
//  }
//  reader.onabort = function (e) {
//      console.log("中断读取....");
//  }
//  reader.onerror = function (e) {
//      console.log("读取异常....");
//  }
//  reader.onload = function (e) {
//      console.log("成功读取....");
//
//      var img = document.getElementById("pic");
//      img.src = e.target.result;
//      //或者 img.src = this.result;  //e.target == this
//  }
//  reader.readAsDataURL(file)
//}
//点击返回箭头
$("header").on("tap", "a", function(e) {
	e.preventDefault();
	window.location.href = "../my/order_administration.html";
	//	清除发票信息
	localStorage.removeItem("titleType");
	localStorage.removeItem("titleContent");
	localStorage.removeItem("titleCompanyName");
	localStorage.removeItem("titleTaxNum");
	sessionStorage.removeItem("addressObj");
	localStorage.removeItem("leaveMsg");
	//	清除地址信息
})

//$(document).ready(function(e) {
//	var counter = 0;
//	if(window.history && window.history.pushState) {
//		$(window).on('popstate', function() {
//			window.history.pushState('forward', null, '#');
//			window.history.forward(1); // alert("不可回退");  //如果需在弹框就有它  
//			localStorage.removeItem("titleType");
//			localStorage.removeItem("titleContent");
//			localStorage.removeItem("titleCompanyName");
//			localStorage.removeItem("titleTaxNum");
//			sessionStorage.removeItem("addressObj");
//			localStorage.removeItem("leaveMsg");
//			top.location.href = "../my/order_administration.html"; //如查需要跳转页面就用它            
//		});
//	}
//	window.history.pushState('forward', null, '#'); 
//	window.history.forward(1);
//});
function physicsBack(){
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
			top.location.href = "../my/order_administration.html"; //如查需要跳转页面就用它            
		});
	}
	window.history.pushState('forward', null, '#'); 
	window.history.forward(1);
}
var price;
//var timeGo = 0;
$(document).ready(function() {
	var orderId = localStorage.getItem("orderId");
	$.ajax({
		type: "get",
		url: config + "/drug/orderInfo/get",
		async: true,
		data: {
			"orderId": orderId
		},
		success: function(data) {
			console.log(data);
			$(".money").text("￥"+data.resultMap.jsPrice);
			price = data.resultMap.jsPrice;
			if(data.resultMap.yfPrice == null) {
				data.resultMap.yfPrice = 0;
			}
			$(".freight").text(data.resultMap.yfPrice);
		},
		error: function(data) {
			console.log(data);
		}
	});
	$(".mui-table-view-cell").click(function() {
		var clickText = $(this).find(".payBox").find(".payTextBox").find(".payTitle").text().trim();
		if(clickText == "支付宝支付") {
			price = 0.01;
			$.ajax({
				type: "post",
				url: config + "/alipay/mobilePay",
				async: true,
				data: {
					"subject": "金诃药品",
					"totalFee": price,
					'outTradeNo': orderId,
					"payType": 1
				},
				success: function(data) {
					console.log(data);
					window.open('', '_self').document.write(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		} else {
			price = 0.01;
			
//			window.location.href = "transit.html?orderId=" + orderId + "&price=" + price;
			//			$(".mask").show();
			$.ajax({
				type: "post",
				url: config + "/weixinpay/h5pay",
				async: true,
				data:{
					"outTradeNo": orderId,
					"totalFee": price*100,
					"spbillCreateIp": returnCitySN["cip"]
				},
				success: function(data){
					console.log(data);
					window.location.href = data;//获取后跳转
//					timeGo = 1;
				},
				error: function(data){
					console.log(data);
				}
			});
		}
	})
//		if (timeGo == 1) {
			var timer = setInterval(function(){
				$.ajax({
					type:"post",
					url: config + "/weixinpay/queryOrder",
					async:true,
					data:{
						"outTradeNo": orderId
					},
					success: function(data){
						console.log(data);
//						console.log($(".mui-table-view-cell"))
						if (data.trade_state_desc == "支付成功") {
							mui.toast(data.trade_state_desc,{ duration:'long', type:'div' });
							window.location.href = "payResults.html";//获取后跳转
							top.location.href = "payResults.html";
							clearInterval(timer);
						}else{
							window.location.href = "pay.html";//获取后跳转
							top.location.href = "pay.html";
							physicsBack();
							clearInterval(timer);
						}
					},
					error: function(data){
						console.log(data);
					}
				});
			}, 2000);
//		};

})