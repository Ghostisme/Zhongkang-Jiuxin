mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
if(!window.webUser){
	window.location.href = "../../login/login.html";
}
/*结算的数量*/
var productNumber = 0;
/*总计*/
var totalPrice = 0;
var shopCUT = 0;
var addShopPri = 0;
var singleTotalPri = 0;
var shoppcount;
var buyNum=1;
//读取发票信息
var personTitleContent;//发票个人抬头内容
var titleCompanyName;//发票公司名称
var titleTaxNum;//发票公司纳税人识别号

var invoice=JSON.parse(localStorage.getItem("invoice"));
console.log(invoice);
//if(localStorage.getItem("titleType")=="无"){
//	invoice='';
//}else{
//	invoice=localStorage.getItem("titleType");
//}
	
if(getUrlParam("page")){
//	 $.ajax({
//		type: "GET",
//		url: config + '/drug/orderInvoice/getList',
//		contentType: "application/json; charset=utf-8",
//		async: true,
//		data: {orderId:getUrlParam("orderId"),invoicePayable:invoice},
//		dataType: 'json',
//		success: function(data) {
//          alert("p");
//      }
//	})
	$("#productMoneyBox input").attr("disabled","disabled");
	if(localStorage.getItem("titleType")=="个人"){//个人发票
		$(".paperInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
		$(".productMoney").css("display","block");
		$(".personType").addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
		$("#taxpayerIdentificationNumber").css("display","none");
		$("#companyName").css("display","none");
		$("#personTitle").css("display","block");
		$("#personTitle .issueInvoiceTxt").val(invoice.content);//抬头内容
	}else if(localStorage.getItem("titleType")=="公司"){//公司发票
			$(".paperInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
			$(".productMoney").css("display","block");
			$(".companyType").addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
			$("#companyName .issueInvoiceTxt").val(invoice.invoiceName);
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#companyName").css("display","block");
			$("#personTitle").css("display","none");
			$("#taxpayerIdentificationNumber .issueInvoiceTxt").val(invoice.dutySign);
	}else if(localStorage.getItem("titleType")=="专票"){
			$(".valueAddtaxInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
			$("#companyName .issueInvoiceTxt").val(invoice.invoiceName);
			$("#companyName").css("display","block");
			$("#taxpayerIdentificationNumber .issueInvoiceTxt").val(invoice.dutySign);
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#personTitle").css("display","none");
			$(".productMoney").css("display","block");
			$("#billTitleRow").css("display","none");
			$("#writeBillAddr .issueInvoiceTxt").val(invoice.businessAddress);
			$("#writeBillAddr").css("display","block");
			$("#writetaxtTel .issueInvoiceTxt").val(invoice.businessPhone);
			$("#writetaxtTel").css("display","block");
			$("#writeBillOpenBank .issueInvoiceTxt").val(invoice.openBank);
			$("#writeBillOpenBank").css("display","block");
			$("#writetaxBankNum .issueInvoiceTxt").val(invoice.bankAccount);
			$("#writetaxBankNum").css("display","block");
	}else{//不开发票
		$(".noInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
		$(".productMoney").css("display","none");
		$("#personTitle .issueInvoiceTxt").val("");//抬头内容
		$("#companyName .issueInvoiceTxt").val("");
		$("#taxpayerIdentificationNumber .issueInvoiceTxt").val("");
	}
	$("#submit_btn").css("display","none");
}else{
	if(localStorage.getItem("titleType")=="个人"){//个人发票
			$(".paperInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
			$(".productMoney").css("display","block");
			$(".personType").addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
			$("#taxpayerIdentificationNumber").css("display","none");
			$("#companyName").css("display","none");
			$("#personTitle").css("display","block");
			$("#personTitle .issueInvoiceTxt").val(localStorage.getItem("titleContent"));//抬头内容
	}else if(localStorage.getItem("titleType")=="公司"){//公司发票
			$(".paperInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
			$(".productMoney").css("display","block");
			$(".companyType").addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
			$("#companyName .issueInvoiceTxt").val(localStorage.getItem("titleCompanyName"));
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#companyName").css("display","block");
			$("#personTitle").css("display","none");
			$("#taxpayerIdentificationNumber .issueInvoiceTxt").val(localStorage.getItem("titleTaxNum"));
	}else if(localStorage.getItem("titleType")=="专票"){
			$(".valueAddtaxInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
			$("#companyName .issueInvoiceTxt").val(localStorage.getItem("titleCompanyName"));
			$("#companyName").css("display","block");
			$("#taxpayerIdentificationNumber .issueInvoiceTxt").val(localStorage.getItem("titleTaxNum"));
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#personTitle").css("display","none");
			$(".productMoney").css("display","block");
			$("#billTitleRow").css("display","none");
			$("#writeBillAddr .issueInvoiceTxt").val(localStorage.getItem("writeBillAddr"));
			$("#writeBillAddr").css("display","block");
			$("#writetaxtTel .issueInvoiceTxt").val(localStorage.getItem("writetaxtTel"));
			$("#writetaxtTel").css("display","block");
			$("#writeBillOpenBank .issueInvoiceTxt").val(localStorage.getItem("writeBillOpenBank"));
			$("#writeBillOpenBank").css("display","block");
			$("#writetaxBankNum .issueInvoiceTxt").val(localStorage.getItem("writetaxBankNum"));
			$("#writetaxBankNum").css("display","block");
	}else{//不开发票
		$(".noInvoice").addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
		$(".productMoney").css("display","none");
		$("#personTitle .issueInvoiceTxt").val("");//抬头内容
		$("#companyName .issueInvoiceTxt").val("");
		$("#taxpayerIdentificationNumber .issueInvoiceTxt").val("");
	}	
}



//选择发票类型
$(document).on("tap",".issueInvoiceType",function(){
	$(this).addClass("choseIssueInvoiceType").siblings().removeClass("choseIssueInvoiceType");
	switch ($(this).text()){
		case "不开发票":
			$(".productMoney").css("display","none");
			break;
		case "专票":
			$(".productMoney").css("display","block");
			$("#billTitleRow").css("display","none");
			$("#writeBillAddr").css("display","block");
			$("#writetaxtTel").css("display","block");
			$("#writeBillOpenBank").css("display","block");
			$("#writetaxBankNum").css("display","block");
			$("#companyName").css("display","block");
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#personTitle").css("display","none");
			break;
		default:
			$(".productMoney").css("display","block");
			$("#billTitleRow").css("display","block");
			$("#writeBillAddr").css("display","none");
			$("#writetaxtTel").css("display","none");
			$("#writeBillOpenBank").css("display","none");
			$("#writetaxBankNum").css("display","none");
			
			$('.personType').addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
			$("#taxpayerIdentificationNumber").css("display","none");
			$("#companyName").css("display","none");
			$("#personTitle").css("display","block");
			break;
	}
});
//选择发票抬头类型
$(document).on("tap",".invoiceTitle",function(){
	$(this).addClass("chosedInvoiceTitle").siblings().removeClass("chosedInvoiceTitle");
	switch ($(this).text()){
		case "个人":
			$("#taxpayerIdentificationNumber").css("display","none");
			$("#companyName").css("display","none");
			$("#personTitle").css("display","block");
			break;
		default:
			$("#taxpayerIdentificationNumber").css("display","block");
			$("#companyName").css("display","block");
			$("#personTitle").css("display","none");
			break;
	}
});
// 点击确定
$(document).on("tap","#submit_btn",function(){
	if($(".choseIssueInvoiceType").text()=="不开发票"){
		localStorage.removeItem("titleType");
		localStorage.removeItem("titleContent");
		localStorage.removeItem("titleCompanyName");
		localStorage.removeItem("titleTaxNum");   
		localStorage.removeItem("writeBillAddr");
		localStorage.removeItem("writetaxtTel");
		localStorage.removeItem("writeBillOpenBank");
		localStorage.removeItem("writetaxBankNum");
		if(getUrlParam("cid")){
			window.location.href="orderSettlement.html?cid="+getUrlParam("cid");
		}else{
			window.location.href="orderSettlement.html";
		}
	}else if($(".choseIssueInvoiceType").text()=="普票"){
		localStorage.removeItem("writeBillAddr");
		localStorage.removeItem("writetaxtTel");
		localStorage.removeItem("writeBillOpenBank");
		localStorage.removeItem("writetaxBankNum");
		if($(".chosedInvoiceTitle").text()=="个人"){
			if($("#personTitle .issueInvoiceTxt").val()==""||$("#personTitle .issueInvoiceTxt").val()==null){
				mui.toast("请输入抬头内容！");
			}else{
				localStorage.setItem("titleType","个人");
				localStorage.setItem("titleContent",$("#personTitle .issueInvoiceTxt").val());
				if(getUrlParam("cid")){
					window.location.href="orderSettlement.html?cid="+getUrlParam("cid");
				}else{
					window.location.href="orderSettlement.html";
				}
			}
		}else{
			console.log("kkk");
			if($("#companyName .issueInvoiceTxt").val()==""||$("#companyName .issueInvoiceTxt").val()==null){
				mui.toast("请输入公司名称！");
			}else if($("#taxpayerIdentificationNumber .issueInvoiceTxt").val()==""||$("#taxpayerIdentificationNumber .issueInvoiceTxt").val()==null){
				mui.toast("请输入纳税人识别号！");
			}else if(!checkTaxpayerId($("#taxpayerIdentificationNumber .issueInvoiceTxt").val())){
				mui.toast("请输入正确的纳税人识别号！");
			}else{
				localStorage.setItem("titleType","公司");
				localStorage.setItem("titleCompanyName",$("#companyName .issueInvoiceTxt").val());
				localStorage.setItem("titleTaxNum",$("#taxpayerIdentificationNumber .issueInvoiceTxt").val());
				if(getUrlParam("cid")){
					window.location.href="orderSettlement.html?cid="+getUrlParam("cid");
				}else{
					window.location.href="orderSettlement.html";
				}
			}
		}
	}else{
		if($("#companyName .issueInvoiceTxt").val()==""||$("#companyName .issueInvoiceTxt").val()==null){
			mui.toast("请输入公司名称！");
		}else if($("#taxpayerIdentificationNumber .issueInvoiceTxt").val()==""||$("#taxpayerIdentificationNumber .issueInvoiceTxt").val()==null){
			mui.toast("请输入纳税人识别号！");
		}else if(!checkTaxpayerId($("#taxpayerIdentificationNumber .issueInvoiceTxt").val())){
			mui.toast("请输入正确的纳税人识别号！");
		}else if($("#writeBillAddr .issueInvoiceTxt").val()==""||$("#writeBillAddr .issueInvoiceTxt").val()==null){
			mui.toast("请输入注册地址！");
		}else if($("#writetaxtTel .issueInvoiceTxt").val()==""||$("#writetaxtTel .issueInvoiceTxt").val()==null){
			mui.toast("请输入注册电话！");
		}
//		else if(!(/^1[3456789]\d{9}$/.test($("#writetaxtTel .issueInvoiceTxt").val()))){
//			mui.toast("请输入正确的注册电话！");
//		}
		else if(!(($("#writetaxtTel .issueInvoiceTxt").val().trim().length == 11||$("#writetaxtTel .issueInvoiceTxt").val().trim().length == 7||$("#writetaxtTel .issueInvoiceTxt").val().trim().length == 8||$("#writetaxtTel .issueInvoiceTxt").val().trim().length == 13||$("#writetaxtTel .issueInvoiceTxt").val().trim().length == 12) && /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test($("#writetaxtTel .issueInvoiceTxt").val()))){
			mui.toast("请输入正确的注册电话！");
		}
		else if($("#writeBillOpenBank .issueInvoiceTxt").val()==""||$("#writeBillOpenBank .issueInvoiceTxt").val()==null){
			mui.toast("请输入开户银行！");
		}else if($("#writetaxBankNum .issueInvoiceTxt").val()==""||$("#writetaxBankNum .issueInvoiceTxt").val()==null){
			mui.toast("请输入银行账户！");
		}else if(!luhmCheck($("#writetaxBankNum .issueInvoiceTxt").val())){
			mui.toast("请输入正确的银行账户！");
		}else{
			localStorage.setItem("titleType","专票");
			localStorage.setItem("titleCompanyName",$("#companyName .issueInvoiceTxt").val());
			localStorage.setItem("titleTaxNum",$("#taxpayerIdentificationNumber .issueInvoiceTxt").val());
			localStorage.setItem("writeBillAddr",$("#writeBillAddr .issueInvoiceTxt").val());
			localStorage.setItem("writetaxtTel",$("#writetaxtTel .issueInvoiceTxt").val());
			localStorage.setItem("writeBillOpenBank",$("#writeBillOpenBank .issueInvoiceTxt").val());
			localStorage.setItem("writetaxBankNum",$("#writetaxBankNum .issueInvoiceTxt").val());
			if(getUrlParam("cid")){
				window.location.href="orderSettlement.html?cid="+getUrlParam("cid");
			}else{
				window.location.href="orderSettlement.html";
			}
		}
	}
});

function checkTaxpayerId(taxpayerId){
    var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
        i, j = regArr.length;
    for (var i = 0; i < j; i++) {
        if (regArr[i].test(taxpayerId)) {
            return true;
        }
    }
    //纳税人识别号格式错误
    return false;
}

function luhmCheck(cardNum){
    cardNum = (cardNum+'').replace(/\s+/g,'');
    if(!(/^\d{16,19}$/).test(cardNum)){
       console.log('is not a bank card number');
      return false;
　　}

　　var numbers = cardNum.split('').reverse();
　　var sum = 0;
　　for(var i=0;i<numbers.length;i++){
　　　　if(i%2==0){
　　　　　　sum+=numbers[i]*1;
　　　　}else{
   　　　　sum+=numbers[i]*2>9?numbers[i]*2-9:numbers[i]*2;
　　　　}
　　}

　　return sum%10==0;
}