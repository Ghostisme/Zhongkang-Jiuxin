//mui.init({
//	swipeBack: true //启用右滑关闭功能
//});
mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var totalprice=0;//商品总价
var thiscouponVal;
var thiscouponMoney;
var full;
var minus;
var couponMinus;
var userId;
var userid;
userid=getCookie('userId');
userId=getCookie('userId');
var logintype=getCookie('logintype');
var httpURL = 'http://192.168.18.126:8080/gcafu_commerce/rest';
var cartlist = localStorage.getItem('cartlist');
var arr = new Array();
var addrArray=new Array();//地址组合
var productsNum=0;
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
if(window.location.search){
	goods_list();
}else{
	$.ajax({
	type: "GET",
	url: config + "cart/selectCart",
	contentType: "json; charset=utf-8",
	async: true,
	data: {
		cartlist: cartlist,
		mobile: 1
	},
	dataType: 'JSONP',
	JSONP: "callback",
	success: function(data) {
		console.log(data);
//		console.log(data.data[0].rest[0].buyerid);
		userId=data.data[0].rest[0].buyerid;
		if(data.code == 1) {
			var cHtml = '';
			var html = '';
			var ulNode = $('#res_list');
			var full;
			var minus;
			for(var i = 0; i < data.data.length; i++) {
				cHtml += '<li class="mui-table-view-cell mui-media' + ' ' + data.data[i].companyid + '">';
				cHtml += '<div class="order_info_title">';
				cHtml += '<div class="order_info_div">';
				cHtml += '<img src="../../../styles/img/shopCart_img/order/order_pay.png" />';
				cHtml += '</div>';
				cHtml += '<div class="order_info_font">';
				cHtml += '<span class="company_name">' + data.data[i].getcompanyname + '</span>';
				cHtml += '<span class="mui-icon mui-icon-forward"></span>';
				cHtml += '</div>';
				cHtml += '</div>';
				cHtml += '</li>';
			}
			ulNode.append(cHtml);
			for(var i = 0; i < data.data.length; i++) {
				html = '';
				for(var j = 0; j < data.data[i].rest.length; j++) {
					productsNum++;
					html += '<div class="order_info_content">';
					html += '<div class="order_name_div">';
					html += '<span>' + data.data[i].rest[j].productname + '</span>';
					html += '</div>';
					html += '<div class="order_num_div mui-text-center">';
					html += '<span>x</span>';
					html += '<span class="num">' + data.data[i].rest[j].shoppingcount + '</span>';
					html += '</div>';
					html += '<div class="order_price_div">';
					html += '<div>';
					html += '<span>¥</span>';
					if(data.data[i].pp == 0){
						html += '<span>' +'价格面议'+ '</span>';
					}else{
						html += '<span>' +data.data[i].rest[j].pp+ '</span>';
					}
							var fulltoMinus=data.data[i].rest[j].rules;
							if(fulltoMinus!=""&&fulltoMinus!=null){
								var fullIndex=fulltoMinus.indexOf("满");
								var minusIndex=fulltoMinus.indexOf("减");
							}
							var myPr=parseFloat(data.data[i].rest[j].pp);
							var myNum=parseFloat(data.data[i].rest[j].shoppingcount);
							var myTotal=myPr*myNum;
//							console.log(myTotal);
							if(fullIndex!=-1){
								full=fulltoMinus.slice(fullIndex+1,minusIndex);
								minus=fulltoMinus.slice(minusIndex+1,fulltoMinus.length);
								if(myTotal>=full){
									myTotal=myTotal-minus;
								}
							}
					totalprice+=myTotal;
					totalprice=parseFloat(totalprice)
//					console.log(totalprice);
					html += '</div>';
					html += '<div class="discount">';
					//					html += '<span>¥</span>';
					html += '<span>' + data.data[i].rest[j].rules + '</span>';
					html += '</div>';
					html += '</div>';
					html += '<div id="companyid" style="display: none;"class="companyid">' + data.data[i].rest[j].companyid + '</div>';
					html += '<div id="productid" style="display: none;"class="productid">' + data.data[i].rest[j].productid + '</div>';
					html += '<div id="storeid" style="display: none;"class="storeid">' + data.data[i].rest[j].storeid + '</div>';
					html += '<div id="maintenanceperiod" style="display: none;"class="maintenanceperiod">' + data.data[i].rest[j].maintenanceperiod + '</div>';
					html += '<div id="specifications"class="specifications" style="display: none;">' + data.data[i].rest[j].specifications + '</div>';//规格
					html += '<div id="model" class="model"style="display: none;">' + data.data[i].rest[j].model + '</div>';//型号
					html += '<div id="storename" style="display: none;"class="storename">' + data.data[i].rest[j].storename + '</div>';
					html += '<div id="provincename" style="display: none;"class="provincename">' + data.data[i].rest[j].provincename + '</div>';
					html += '<div id="cityname" style="display: none;"class="cityname">' + data.data[i].rest[j].cityname + '</div>';
					html += '<div id="townname" style="display: none;"class="townname">' + data.data[i].rest[j].townname + '</div>';
					html += '</div>';

				}
				$("." + data.data[i].companyid).append(html);
				console.log(totalprice);
				choseCoupon(totalprice);
			}
			$($(".choseCheckbox")[0]).attr("checked","true");
		}

	},
	error: function(data) {

	}
});
}

/*开票信息*/
$('#invoice_title_input').delegate('#check_box', 'click', function() {
	var inputNode = document.getElementsByClassName('input_editor');
	if($('#check_box')[0].checked == true) {
		$('#invoice_info_content').css('display','block');
		for(var i = 0; i < inputNode.length; i++) {
			inputNode[i].removeAttribute('disabled');
		}
	} else {
		for(var i = 0; i < inputNode.length; i++) {
			inputNode[i].setAttribute('disabled', 'true');
		}
		$('#invoice_info_content').css('display','none');
		$('#invoice_head').val('');
		$('#bank_name').val('');
		$('#account_num').val('');
		$('#invoice_num').val('');
	}
});
/*编写收货地址*/
var isShow = true;
/*收货地址的显示与隐藏*/
function editorLocation() {
	$('#editor_location').toggle();
	$('.editor_location').toggle();
//	if(isShow == true) {
////		$('.editor_location').css('display', 'block');
//		$('#editor_location').css('display', 'block');
//		isShow = false;
//	} else {
////		$('.editor_location').css('display', 'none');
//		$('#editor_location').css('display', 'block');
//		isShow = true;
//	}

}
window.onload=function(){
	var thisallCoupons=$('.choseCheckbox');
	for(var k=0;k<thisallCoupons.length;k++){
			if($(thisallCoupons[k]).prop("checked")==true){
				var submitCouponVal=parseInt($(thisallCoupons[k]).siblings().attr("id"));
				var thiscouponMoney=$(thisallCoupons[k]).siblings().text();
				console.log(thiscouponMoney);
				$(".thisChoseTxt").text(thiscouponMoney);
			}
		}
//	货物拆分
	//页面加载完毕后获取分车列表
	console.log(productsNum);
	for(var p=0;p<productsNum;p++){
		var html="";
		var ordersLen=$(".order_info_content");
		html+='<div class="separationGoodsContents">';
		html+='<select class="separateSelect">';
		for(var q=0;q<ordersLen.length;q++){
			var currentName=$(ordersLen[q]).find(".order_name_div span").text();//名字
			var currentSpe=$(ordersLen[q]).find(".specifications").text();//规格
			var currentModel=$(ordersLen[q]).find(".models").text();//型号
			var currentNum=$(ordersLen[q]).find(".num").text();//数量
			if(currentModel=="暂无型号"){
				currentModel="";
			}
			html+='<option value="'+q+'" class="'+currentNum+'"'+'">'+currentName+" "+currentModel+" "+currentSpe+'</option>';
		}
										
//		html+='<option value="2">50mm聚苯板 氟碳实色 1㎡/块</option>';									
		html+='</select>';									
		html+='<input type="number" placeholder="数量"class="separateNum"/>';								
		html+='</div>';								
		$(".separationGoods").append(html);	
	}
//添加收货地址
	var addrNum=1;
		$(document).on("tap",".AddAddr",function(){
			
			if(addrNum<3){
				addrNum++;
				//append一个新收货地址进去
				var phtml='';
				phtml+='<div class="editor_location recieveAdr"id="addrsInfo'+addrNum+'">';
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span class="recieveAddrsTxt">收货地址:</span>';				
				phtml+='</div>';			
				phtml+='<span class="closeAddAddr">×</span>';			
				phtml+='<span class="AddAddr">';			
				phtml+='<span class="addIcon">+</span>';				
				phtml+='<span class="addAddrTxt">增加地址</span></span>';				
				phtml+='</div>';		
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span>收货人:</span>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_input">';			
				phtml+='<input id="get_goods_person" type="text"class="get_goods_person" placeholder="点击编辑"/>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_arrow mui-pull-right">';			
				phtml+='<span class="mui-icon mui-icon-forward"></span>';				
				phtml+='</div>';			
				phtml+='</div>';		
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span>收货公司:</span>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_input">';			
				phtml+='<input id="get_goods_company" type="text"class="get_goods_company" placeholder="点击编辑"/>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_arrow mui-pull-right">';			
				phtml+='<span class="mui-icon mui-icon-forward"></span>';				
				phtml+='</div>';			
				phtml+='</div>';		
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span>地址:</span>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_input">';			
				phtml+='<input id="get_goods_address" type="text"class="get_goods_address" placeholder="点击编辑"/>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_arrow mui-pull-right">';			
				phtml+='<span class="mui-icon mui-icon-forward"></span>';				
				phtml+='</div>';			
				phtml+='</div>';		
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span>联系电话:</span>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_input">';			
				phtml+='<input id="tel" type="text" placeholder="点击编辑"class="tel"/>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_arrow mui-pull-right">';			
				phtml+='<span class="mui-icon mui-icon-forward"></span>';				
				phtml+='</div>';			
				phtml+='</div>';		
				phtml+='<div class="editor_location_row">';		
				phtml+='<div class="editor_location_person">';			
				phtml+='<span>备注:</span>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_input">';			
				phtml+='<input id="remarks" type="text" placeholder="点击编辑"class="remarks"/>';				
				phtml+='</div>';			
				phtml+='<div class="editor_location_arrow mui-pull-right">';			
				phtml+='<span class="mui-icon mui-icon-forward"></span>';				
				phtml+='</div>';			
				phtml+='</div>';		
				phtml+='<div class="separationGoods">';										
				phtml+='<div class="separationGoodsTitle">货物拆分</div>';					
				phtml+='</div>';				
				phtml+='</div>';	
				$("#shop_info").before(phtml);
				
				//页面加载完毕后获取分车列表
	//	console.log(productsNum);
		for(var p=0;p<productsNum;p++){
			var html="";
			var ordersLen=$(".order_info_content");
				html+='<div class="separationGoodsContents">';
				html+='<select class="separateSelect">';
				for(var q=0;q<ordersLen.length;q++){
					var currentName=$(ordersLen[q]).find(".order_name_div span").text();//名字
					var currentSpe=$(ordersLen[q]).find(".specifications").text();//规格
					var currentModel=$(ordersLen[q]).find(".models").text();//型号
					var currentNum=$(ordersLen[q]).find(".num").text();//数量
					if(currentModel=="暂无型号"){
						currentModel="";
					}
					html+='<option value="'+q+'" class="'+currentNum+'"'+'">'+currentName+" "+currentModel+" "+currentSpe+'</option>';
				}
												
		//		html+='<option value="2">50mm聚苯板 氟碳实色 1㎡/块</option>';									
				html+='</select>';									
				html+='<input type="number" placeholder="数量"class="separateNum"/>';								
				html+='</div>';							
				$("#addrsInfo"+addrNum).find(".separationGoods").append(html);	
			}
				
				
	//			console.log(addrNum);
	//			$(this).parent().parent().after($(this).parent().parent().clone(true));//增加收货地址
				$(this).parent().parent().next().find(".closeAddAddr").css("display","block");//第二个以后的收货地址加上关闭按钮
				$(".separationGoods").css("display","block");//货物拆分显示
	//			增加地址的时候标题变成收货地址一,收货地址二,收货地址三
				var RecieveAddrLen=$(".recieveAdr");
				for(var m=0;m<RecieveAddrLen.length;m++){
					if(RecieveAddrLen.length==2){
						$(RecieveAddrLen[0]).find(".recieveAddrsTxt").text("收货地址一");
						$(RecieveAddrLen[1]).find(".recieveAddrsTxt").text("收货地址二");
						$($(".closeAddAddr")[1]).css("display","block");
						$($(".AddAddr")[1]).css("display","none");
					}else if(RecieveAddrLen.length==3){
						$(RecieveAddrLen[0]).find(".recieveAddrsTxt").text("收货地址一");
						$(RecieveAddrLen[1]).find(".recieveAddrsTxt").text("收货地址二");
						$(RecieveAddrLen[2]).find(".recieveAddrsTxt").text("收货地址三");	
						$($(".closeAddAddr")[1]).css("display","block");
						$($(".AddAddr")[1]).css("display","none");
						$($(".closeAddAddr")[2]).css("display","block");
						$($(".AddAddr")[2]).css("display","none");
					}
				}
			}
	//		console.log($(this).parent().parent().clone(true)[0]);
			
		})
			$(document).on("tap",".closeAddAddr",function(){
				addrNum--;
				$(this).parent().parent().remove();
				if($(".recieveAdr").length==1){
					$($(".recieveAdr")[0]).find(".recieveAddrsTxt").text("收货地址");
					$(".separationGoods").css("display","none");//货物拆分隐藏
				}
			});
		
	//
	$(document).on("change",".separateSelect",function(){
		var TotalNum=0;//初始化所有选择的品种总数
		var ThisNUmVal=$(this).val();//当前选择数目前面选择的品种value值 
//		alert(ThisNUmVal)
		var orderNum=parseFloat($($(".order_info_content")[parseInt(ThisNUmVal)]).find(".num").text());//当前选择的产品订单总数
		console.log($(this).val());
		var selectOptions=$(".separateSelect option:selected");
		for(var n=0;n<selectOptions.length;n++){
			var selectOptionsVal=$(selectOptions[n]).val();
			if(selectOptionsVal==ThisNUmVal){//判断所有select框下与当前修改数目的品种是否相同，相同的话将后面的数目累加到初始化的总数中
	//			console.log($(selectOptions[n]).parent().next().val());
				var SelectinputNum=$(selectOptions[n]).parent().next().val();
				if(SelectinputNum==""||SelectinputNum==null){
					SelectinputNum=0;//数目为空值的时候默认加0
				}else{
					SelectinputNum=parseFloat(SelectinputNum);
				}
	//			console.log(SelectinputNum)
				TotalNum+=SelectinputNum;
			}
		}
		if(TotalNum>orderNum){
			alert("填写的商品总量不能超出订单数量！");
			$(this).next().val("");
		}
		var separateNum=$(".separateNum");
		var InputNullNum=0;//初始化文本框空值的数量
		for(var g=0;g<separateNum.length;g++){
			var separateNumVals=$(separateNum[g]).val();
			var separateNumPre=$(separateNum[g]).prev().val();
			if(separateNumVals==""||separateNumVals==null){//文本框为空，并且文本框前的商品和变化的商品同种时，数量累加
				if(separateNumPre==ThisNUmVal){
					InputNullNum++;
				}
				
			}
		}
		console.log(InputNullNum);
		if(InputNullNum==1&&separateNum.length>1){//文本框是空值的只有一个的时候，自动匹配剩余了多少数量
			for(var g=0;g<separateNum.length;g++){//遍历所有文本框 找到那个剩余的文本框
				var separateNumVals=$(separateNum[g]).val();
				var separateNumPre=$(separateNum[g]).prev().val();
				console.log(separateNumVals==ThisNUmVal);
				if(separateNumVals==""||separateNumVals==null){
					if(separateNumPre==ThisNUmVal){
						var currentLastNum=orderNum-TotalNum;
						if(currentLastNum<0){
							currentLastNum=orderNum-TotalNum+parseFloat($(this).next().val());
						}
						$(separateNum[g]).val(currentLastNum);
					}				
				}
			}
		}
		
	})
	//控制货物拆分数量
	
	$(".separateNum").on("change",function(){
		var TotalNum=0;//初始化所有选择的品种总数
		var ThisNUmVal=$(this).prev().val();//当前选择数目前面选择的品种value值 
	//	console.log(ThisNUmVal);
		var orderNum=parseFloat($($(".order_info_content")[parseInt(ThisNUmVal)]).find(".num").text());//当前选择的产品订单总数
	//	console.log(orderNum);
		var selectOptions=$(".separateSelect option:selected");
	//	console.log(selectOptions.length);
		for(var n=0;n<selectOptions.length;n++){
			var selectOptionsVal=$(selectOptions[n]).val();
			if(selectOptionsVal==ThisNUmVal){//判断所有select框下与当前修改数目的品种是否相同，相同的话将后面的数目累加到初始化的总数中
	//			console.log($(selectOptions[n]).parent().next().val());
				var SelectinputNum=$(selectOptions[n]).parent().next().val();
				if(SelectinputNum==""||SelectinputNum==null){
					SelectinputNum=0;//数目为空值的时候默认加0
				}else{
					SelectinputNum=parseFloat(SelectinputNum);
				}
	//			console.log(SelectinputNum)
				TotalNum+=SelectinputNum;
			}
		}
	//	console.log(TotalNum);
		if(TotalNum>orderNum){
			alert("填写的商品总量不能超出订单数量！");
			$(this).val("");
		}
		var separateNum=$(".separateNum");
		var InputNullNum=0;//初始化文本框空值的数量
		for(var g=0;g<separateNum.length;g++){
			var separateNumVals=$(separateNum[g]).val();
			var separateNumPre=$(separateNum[g]).prev().val();
			if(separateNumVals==""||separateNumVals==null){//文本框为空，并且文本框前的商品和变化的商品同种时，数量累加
				if(separateNumPre==ThisNUmVal){
					InputNullNum++;
				}
				
			}
		}
		console.log(InputNullNum);
		if(InputNullNum==1&&separateNum.length>1){//文本框是空值的只有一个的时候，自动匹配剩余了多少数量
			for(var g=0;g<separateNum.length;g++){//遍历所有文本框 找到那个剩余的文本框
				var separateNumVals=$(separateNum[g]).val();
				var separateNumPre=$(separateNum[g]).prev().val();
				console.log(separateNumVals==ThisNUmVal);
				if(separateNumVals==""||separateNumVals==null){
					if(separateNumPre==ThisNUmVal){
						var currentLastNum=orderNum-TotalNum;
						if(currentLastNum<0){
							currentLastNum=orderNum-TotalNum+parseFloat($(this).val());
						}
						$(separateNum[g]).val(currentLastNum);
					}				
				}
			}
		}
	});
}
$(".closeCouponChose").click(function(){
	$("#couponPop").css("display","none");
});
/*提交订单*/
$('.mui-content').on('tap', '#submit_btn', function() {
	var shoppingcount;
	var pp;
	var rules;
	var companyid;
	var productid;
	var storeid;
	var maintenanceperiod;
	var storename;
	var provincename;
	var cityname;
	var townname;
	var singleP;
//	获取优惠券id及优惠价格
	var allCoupons=$('.choseCheckbox');
	for(var k=0;k<allCoupons.length;k++){
		if($(allCoupons[k]).prop("checked")==true){
			var submitCouponVal=parseInt($(allCoupons[k]).siblings().attr("id"));
//		console.log(submitCouponVal);
			var thiscouponMoney=$(allCoupons[k]).siblings().text();
			var fullIndex=thiscouponMoney.indexOf("满");
			var minusIndex=thiscouponMoney.indexOf("减");
			couponMinus=parseFloat(thiscouponMoney.slice(minusIndex+1,thiscouponMoney.length));
		$(".thisChoseTxt").text(thiscouponMoney);
		}
	}
	var submitTotalprice=totalprice;//总金额（不减优惠）
	var submitMinus=couponMinus;//券上优惠金额
	console.log(submitMinus);
	/*收货人*/
	var tostuff = $('#get_goods_person').val();
	/*收货公司*/
	var tocompany = $('#get_goods_company').val();
	/*收货地址*/
	var toaddr = $('#get_goods_address').val();
	/*联系电话*/
	var totel = $('#tel').val();
	/*备注*/
	var tomemo = $('#remarks').val();
	/*抬头*/
	var invoicetitle = $('#invoice_head').val();
	/*开户行*/
	var payfrombank = $('#bank_name').val();
	/*账号*/
	var payfrombankaccount = $('#account_num').val();
	/*税号*/
	var payfromcompanytaxno = $('#invoice_num').val();
	/*开票或者不开票*/
	var check = $('#check_box');
	var invoice;
	var itemInfo = document.getElementsByClassName('order_info_content');
	if(check[0].checked == true) {
		invoice = 1;
		if($('#invoice_head').val() == '' || $('#bank_name').val() == '' || $('#account_num').val() == '' || $('#invoice_num').val() == '') {
			mui.toast('您已勾选开票信息，请填写完整后再提交');
		} else{
			//提交信息检验
			if($(".recieveAdr").length==1){
				if($($(".get_goods_person")[0]).val()==""||$($(".get_goods_person")[0]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[0]).val()==""||$($(".get_goods_company")[0]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[0]).val()==""||$($(".get_goods_address")[0]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[0]).val()==""||$($(".tel")[0]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[0]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}else if($(".recieveAdr").length==2){
				if($($(".get_goods_person")[1]).val()==""||$($(".get_goods_person")[1]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[1]).val()==""||$($(".get_goods_company")[1]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[1]).val()==""||$($(".get_goods_address")[1]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[1]).val()==""||$($(".tel")[1]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[1]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}else{
				if($($(".get_goods_person")[2]).val()==""||$($(".get_goods_person")[2]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[2]).val()==""||$($(".get_goods_company")[2]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[2]).val()==""||$($(".get_goods_address")[2]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[2]).val()==""||$($(".tel")[2]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[2]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}
		}
//		else {
//			//提交订单
//			$('#wait_dialog').css('display', 'block');
//			$('#bg').css('display', 'block');
//			getInfo(invoice);
//		}
	} else {
		invoice = 0;
		//		invoicetitle = '';
		//		payfrombank = '';
		//		payfrombankaccount = '';
		//		payfromcompanytaxno = '';
		//提交信息检验
			if($(".recieveAdr").length==1){
				if($($(".get_goods_person")[0]).val()==""||$($(".get_goods_person")[0]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[0]).val()==""||$($(".get_goods_company")[0]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[0]).val()==""||$($(".get_goods_address")[0]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[0]).val()==""||$($(".tel")[0]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[0]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}else if($(".recieveAdr").length==2){
				if($($(".get_goods_person")[1]).val()==""||$($(".get_goods_person")[1]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[1]).val()==""||$($(".get_goods_company")[1]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[1]).val()==""||$($(".get_goods_address")[1]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[1]).val()==""||$($(".tel")[1]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[1]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}else{
				if($($(".get_goods_person")[2]).val()==""||$($(".get_goods_person")[2]).val()==null){
					mui.toast("请填写收货人！")
				}else if($($(".get_goods_company")[2]).val()==""||$($(".get_goods_company")[2]).val()==null){
					mui.toast("请填写收货公司！");
				}else if($($(".get_goods_address")[2]).val()==""||$($(".get_goods_address")[2]).val()==null){
					mui.toast("请填写收货地址！");
				}else if($($(".tel")[2]).val()==""||$($(".tel")[2]).val()==null){
					mui.toast("请填写收货电话！");
				}else if(!(/^1[3456789]\d{9}$/.test($($(".tel")[2]).val()))){
					mui.toast("请填写正确的联系电话，否则将无法联系您取货！");
				}else{
					//提交订单
					$('#wait_dialog').css('display', 'block');
					$('#bg').css('display', 'block');
					getInfo(invoice);
				}
			}

	}

	/*获取页面信息*/
	function getInfo(invoice) {
		//push货物拆分
		var allRecieveAddr=$(".recieveAdr");//找到所有的收货地址
		for(var k=0;k<allRecieveAddr.length;k++){
			var tocompany=$(allRecieveAddr[k]).find(".get_goods_company").val();//收货公司名称
			var tostuff=$(allRecieveAddr[k]).find(".get_goods_person").val();//收货人
			var totel=$(allRecieveAddr[k]).find(".tel").val();//收货联系电话
			var tomemo =$(allRecieveAddr[k]).find(".remarks").val(); //备注
//			var prov2=$(allRecieveAddr[k]).find(".province2").val();
//			var city2=$(allRecieveAddr[k]).find(".city2").val();
//			var town2=$(allRecieveAddr[k]).find(".town2").val();
			var detailAddr=$(allRecieveAddr[k]).find(".get_goods_address").val();//详细地址
			var toaddr=detailAddr;
			var selectVal=$(allRecieveAddr[k]).find(".separateSelect");
			var productInfoArr=new Array();//货物拆分数据
			if(allRecieveAddr.length==1){
				var productLen=$(".order_info_content");
				for(var i=0;i<productLen.length;i++){
					var mycompanyid=parseInt($(productLen[i]).find(".companyid").text());
					var myproductid=parseInt($(productLen[i]).find(".productid").text());
					var mystoreid=parseInt($(productLen[i]).find(".storeid").text());
					var myshoppingcount=parseInt($(productLen[i]).find(".num").text());
					productInfoArr.push({
						"companyid":mycompanyid,
						"productid":myproductid,
						"storeid":mystoreid,
						"count":myshoppingcount,
					});
					var productInfoArrStr=JSON.stringify(productInfoArr);
				}
				
			}else{
				for(var s=0;s<selectVal.length;s++){
					var selectVals=parseInt($(selectVal[s]).val());
					var mycompanyid=parseInt($($(".order_info_content")[selectVals]).find(".companyid").text());
					var myproductid=parseInt($($(".order_info_content")[selectVals]).find(".productid").text());
					var mystoreid=parseInt($($(".order_info_content")[selectVals]).find(".storeid").text());
					 console.log(s);
					if($(selectVal[s]).next().val()==""||$(selectVal[s]).next().val()==null){
						var myshoppingcount=0;
					}else{
						var myshoppingcount=parseInt($(selectVal[s]).next().val());
					}
					productInfoArr.push({
						"companyid":mycompanyid,
						"productid":myproductid,
						"storeid":mystoreid,
						"count":myshoppingcount,
					});
					var productInfoArrStr=JSON.stringify(productInfoArr);
				}
				
			}
			addrArray.push({
				"tocompany":tocompany,//公司名字
				"tostuff":tostuff,//收货人
				"toaddr":toaddr,//地址
				"totel":totel,//电话
				"tomemo":tomemo,//备注
//				"products":productInfoArr//货物拆分信息数组
				"products":productInfoArrStr//货物拆分信息数组
			});
		}

		for(var i = 0; i < itemInfo.length; i++) {
			shoppingcount = itemInfo[i].firstElementChild.nextElementSibling.lastElementChild.innerHTML;
			singleP = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.lastElementChild.innerHTML;
			if(singleP == '价格面议'){
				pp=0;
			}else{
				pp = singleP;
			}
			rules = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
			companyid = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			productid = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			storeid = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			maintenanceperiod = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			storename = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			provincename = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			cityname = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
			townname = itemInfo[i].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;

			arr.push({
				"companyid": companyid,
				"productid": productid,
				"storeid": storeid,
				"maintenanceperiod": maintenanceperiod,
				"storename": storename,
				"provincename": provincename,
				"cityname": cityname,
				"townname": townname,
				"rules": rules,
				"pp": pp,
				"shoppingcount": shoppingcount,
//				"tostuff": tostuff,
//				"toaddr": toaddr,
//				"totel": totel,
//				"tomemo": tomemo,
//				"tocompany": tocompany,
				"payfrombankaccount": payfrombankaccount,
				"payfromcompanytaxno": payfromcompanytaxno,
				"payfrombank": payfrombank,
				"invoicetitle": invoicetitle,
				"invoice": invoice,
				"mobile": 1

			});
		}
	}
	/*提交订单*/
	var addressList = JSON.stringify(addrArray);//货物拆分
	var orderlist = JSON.stringify(arr);
	console.log(addrArray);
	$.ajax({
		type: "GET",
		//		url:"http://192.168.18.126:8080/gcafu_commerce/rest/order/buyerCartToOrder",

		url: config + "order/buyerCartToOrder",
		contentType: "json; charset=utf-8",
		async: true,
		data: {
			"orderlist": orderlist,
			"queryType":0,
			"buyerid":userId,
			"logintype":logintype,
			"addressList":addressList,//货物拆分地址
			"couponid":submitCouponVal,//优惠券id
			"totalprice":submitTotalprice,//优惠前总价格
			"couponmoney":submitMinus,//优惠金额
			mobile: 1
		},
		dataType: 'JSONP',
		JSONP: "callback",
		success: function(data) {
			console.log(data);
			if(data.code == 1) {
				$('#wait_dialog').css('display', 'none');
				$('#bg').css('display', 'none');
				mui.toast('订单提交成功');
				localStorage.setItem('my_to_orderad_status','');
				if(getCookie("logintype") == 1){
					window.location.href = "../../my/order_administration.html";
				}else if(getCookie("logintype") == 2){
					window.location.href = "../../my/seller/orderAdmin.html";
				}else{
					window.location.href = "../../shop/shop_index.html";
				}
				
				
				/*收货人*/
				$('#get_goods_person').val('');
				/*收货公司*/
				$('#get_goods_company').val('');
				/*收货地址*/
				$('#get_goods_address').val('');
				/*联系电话*/
				$('#tel').val('');
				/*备注*/
				$('#remarks').val('');
				/*抬头*/
				$('#invoice_head').val('');
				/*开户行*/
				$('#bank_name').val('');
				/*账号*/
				$('#account_num').val('');
				/*税号*/
				$('#invoice_num').val('');
			}else if(data.code == 2){
				$('#wait_dialog').css('display', 'none');
				$('#bg').css('display', 'none');
			}
		},
		error: function(data) {}
	});

});
//优惠券选择
function choseCoupon(totalprice){
	$.ajax({
		type:"GET",
		url:config+"wallet/couponListForOrder",
//		contentType:"application/json; charset=utf-8",
		async:false,
		data:{id:userId,totalprice:totalprice,productids:cartlist},
		dataType:'JSON',
		success:function(data){
			console.log(data);
			if(data.code==1){
				if(data.date.couponList.length==0){
					$('.thisChoseTxt').text('平台无优惠');
					var phtml='';
						phtml+='<option class="fullMinus"value="0">无优惠使用</option>';
						$("#choseCoupon").append(phtml);
				}else{
					var phtml='';
					for(var i=0;i<data.date.couponList.length;i++){
	//					console.log(fulltoMinus.indexOf("满"));
//						$("#couponList").html("");
						var qhtml="";
						qhtml+='<div class="Items">';
						qhtml+='<label class="fulltominus"for="coupon'+i+'"id="'+data.date.couponList[i].id+'">'+data.date.couponList[i].couponname+"减"+data.date.couponList[i].couponmoney+'</label>';
						qhtml+='<input type="radio" name="choseCheckbox"class="choseCheckbox"id="coupon'+i+'"/>';
						qhtml+='</div>';
						$("#couponList").append(qhtml);
					}
					
				}
//				couponMoneys();
			}
		},
		error:function(data){
			console.log(data);
		}
	});
}
/*点击提交订单按钮跳转*/
//$(".mui-content").on("tap", "#submit_btn", function() {
//	//	window.location.href="order_detail.html";
//});
$(document).on("tap", "#coupon_title_div",function(){
	$("#couponPop").slideToggle();
});
$(document).on("tap",".Items",function(){
	$(".thisChoseTxt").text($(this).find(".fulltominus").text());
});
//商品详情跳转获取商品列表
function goods_list(){
	$.ajax({
		type:"GET",
		url:config+"order/selbuyerToOrder",
		async:false,
		dataType:"JSONP",
		JSONP:"callback",
		data: {},
		contentType: "json; charset=utf-8",
		success:function(data){
			console.log(data);
			var z=0;
		if(data.code==1){
//		userId=data.data[0].rest[0].buyerid;
		if(data.code == 1) {
			var cHtml = '';
			var html = '';
			var ulNode = $('#res_list');
			var full;
			var minus;
				cHtml += '<li class="mui-table-view-cell mui-media' + ' ' + data.data.companyid + '">';
				cHtml += '<div class="order_info_title">';
				cHtml += '<div class="order_info_div">';
				cHtml += '<img src="../../../styles/img/shopCart_img/order/order_pay.png" />';
				cHtml += '</div>';
				cHtml += '<div class="order_info_font">';
				cHtml += '<span class="company_name">' + data.data.companyname + '</span>';
				cHtml += '<span class="mui-icon mui-icon-forward"></span>';
				cHtml += '</div>';
				cHtml += '</div>';
				cHtml += '</li>';
			
			ulNode.append(cHtml);
			html = '';
			productsNum++;
					html += '<div class="order_info_content">';
					html += '<div class="order_name_div">';
					html += '<span>' + data.data.productname + '</span>';
					html += '</div>';
					html += '<div class="order_num_div mui-text-center">';
					html += '<span>x</span>';
					html += '<span class="num">' + data.data.shoppingcount + '</span>';
					html += '</div>';
					html += '<div class="order_price_div">';
					html += '<div>';
					html += '<span>¥</span>';
					if(data.data.pp == 0){
						html += '<span>' +'价格面议'+ '</span>';
					}else{
						html += '<span>' +data.data.pp+ '</span>';
					}
							var fulltoMinus=data.data.rules;
							if(fulltoMinus!=""&&fulltoMinus!=null){
								var fullIndex=fulltoMinus.indexOf("满");
								var minusIndex=fulltoMinus.indexOf("减");
							}
							var myPr=parseFloat(data.data.pp);
							var myNum=parseFloat(data.data.shoppingcount);
							var myTotal=myPr*myNum;
//							console.log(myTotal);
							if(fullIndex!=-1){
								full=fulltoMinus.slice(fullIndex+1,minusIndex);
								minus=fulltoMinus.slice(minusIndex+1,fulltoMinus.length);
								if(myTotal>=full){
									myTotal=myTotal-minus;
								}
							}
					totalprice+=myTotal;
					totalprice=parseFloat(totalprice)
//					console.log(totalprice);
					html += '</div>';
					html += '<div class="discount">';
					//					html += '<span>¥</span>';
					html += '<span>' + data.data.rules + '</span>';
					html += '</div>';
					html += '</div>';
					html += '<div id="companyid" style="display: none;"class="companyid">' + data.data.companyid + '</div>';
					html += '<div id="productid" style="display: none;"class="productid">' + data.data.productid + '</div>';
					html += '<div id="storeid" style="display: none;"class="storeid">' + data.data.storeid + '</div>';
					html += '<div id="maintenanceperiod" style="display: none;"class="maintenanceperiod">' + data.data.maintenanceperiod + '</div>';
					html += '<div id="specifications"class="specifications" style="display: none;">' + data.data.specifications + '</div>';//规格
					html += '<div id="model" class="model"style="display: none;">' + data.data.model + '</div>';//型号
					html += '<div id="storename" style="display: none;"class="storename">' + data.data.storename + '</div>';
					html += '<div id="provincename" style="display: none;"class="provincename">' + data.data.provincename + '</div>';
					html += '<div id="cityname" style="display: none;"class="cityname">' + data.data.cityname + '</div>';
					html += '<div id="townname" style="display: none;"class="townname">' + data.data.townname + '</div>';
					html += '</div>';

				$("." + data.data.companyid).append(html);
				console.log(totalprice);
				choseCoupon(totalprice);
			$($(".choseCheckbox")[0]).attr("checked","true");
		}
		
			}
		}		
	})
}