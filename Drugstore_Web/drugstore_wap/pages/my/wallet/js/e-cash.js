//提现弹窗
$(".mui-content").on("tap",".drawMoney",function(){
	mui('.mui-popover').popover('toggle');//show hide toggle
})

//var userId = 1
var userId = getCookie('userId');
var loginName = getCookie('loginname');
console.log(userId);
$('.loginName').text(loginName);

//电子现金
eCash();
function eCash(){
	$.ajax({
		type:"GET",
		url:config+"wallet/rebateInfo",
//		contentType:"application/json; charset=utf-8",
		async:true,
		data:{userid:userId},
//		data:{userid:1},
		dataType:'JSON',
		success:function(data){
			console.log(data);
//			if(data.code==1){
//				$(".coupons").html("");
//				$(".totalMoney").text(data.data[0].approveamount);
//				$("#Codes").val(data.data[0].invite);
				if(data.data.length==1&&data.data[0].amount==null){
					$("#money").text("0.00");
					$("#Codes").val(data.data[0].invite);
					approveamount=0;
				}else{
					$("#money").text(data.data[0].approveamount);
					$("#Codes").val(data.data[0].invite);
					approveamount=data.data[0].approveamount;
					for(var i=0;i<data.data.length;i++){
						var html='';
						html+='<li class="mui-table-view-cell">'
						html+='<div class="rebateBox">'
						html+='￥<span class="rebate">'+data.data[i].amount+'</span>'
						html+='</div>'
						html+='<div class="source">'
						html+=data.data[i].note
						html+='</div>'
						html+='</li>'
						$(".list").append(html);
					}
				}
				
//			}
		},
		error:function(data){
			console.log(data);
		}
	});
}

//现金提取
$(".submit").click(function(){
	var bank=$("#bank option:selected").text();
	var openAmountBankName=$(".openAmountBankName").val();
	var payfrombankaccount=$(".creditCarNumber").val();
	var cashWithdrawalAmount=$(".cashWithdrawalAmount").val();
	var codes=$(".codes").val();
	console.log(bank+" "+openAmountBankName+" "+payfrombankaccount+" "+cashWithdrawalAmount);
	 //Description:  银行卡号Luhm校验

    	//Luhm校验规则：16位银行卡号（19位通用）:
    
    	// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
    	// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
    	// 3.将加法和加上校验位能被 10 整除。
		var num = /^\d*$/;  //全数字
		var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		var lastNum=payfrombankaccount.substr(payfrombankaccount.length-1,1);//取出最后一位（与luhm进行比较）
        var first15Num=payfrombankaccount.substr(0,payfrombankaccount.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9
        
        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                arrJiShu.push(parseInt(newArr[j])*2);
                else
                arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
            arrOuShu.push(newArr[j]);
        }
        
        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }           
        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }
        
        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }
        
        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }      
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
        
        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
        var luhm= 10-k;
        
        //提交信息检验
        	if(bank==""||bank=="请选择"){
				alert("请选择银行！");
			}else if(openAmountBankName==""||openAmountBankName==null){
				alert("填写开户人姓名！");
			}else if(payfrombankaccount==""||payfrombankaccount==null){
				alert("请填写银行卡号！");
			}else if(payfrombankaccount.length < 16 || payfrombankaccount.length > 20){
				alert("银行卡号长度必须在16到20之间");
				return false;
			}else if(!num.exec(payfrombankaccount)){
				alert("银行卡号必须全为数字");
			}else if(strBin.indexOf(payfrombankaccount.substring(0, 2))== -1){	
				alert("银行卡号开头6位不符合规范");
			}else if(cashWithdrawalAmount==""||cashWithdrawalAmount==null){
				alert("请输入提现金额");
			}else if(!(/(^[1-9]\d*$)/.test(cashWithdrawalAmount))){
				alert("提现金额必须为正整数");
			}
			else if(codes==""||codes==null){
				alert("请输入手机验证码");
			}else if(sessionStorage.getItem('myCode') !== $(".codes").val()){
				if(sessionStorage.getItem('myCode') == '' || sessionStorage.getItem('myCode') == null){
					mui.toast("验证码已失效，请重新获取验证码");
				}else{
					mui.toast("验证码输入有误，请重新输入！");
				}
			}else{
				var extractInfo=new Object();
				extractInfo.bankname=bank;
				extractInfo.bankuser=openAmountBankName;
				extractInfo.banknumber=payfrombankaccount;
				extractInfo.amount=parseFloat(cashWithdrawalAmount);
				extractInfo.accountphone=loginName;
				var extractInfosend=JSON.stringify(extractInfo);
				$.ajax({
					type:"get",
			    	url:config + 'wallet/extract',
	//				url:"http://192.168.18.189:8080/gcafu_commerce/rest/extract",
					async:false,
					data:{extractInfo:extractInfosend,userid:userId,approveamount:approveamount},
					dataType:'JSON',
			//    	jsonp: 'jsoncallback',     
					success:function(data){
						console.log(data);
						if(data.code==1){
	//						console.log("数据已录入外部客户系统");
		//					window.location.href="login.html";
							mui.toast("您的提现申请已提交成功!");
							window.location.reload();
						}else if(data.code == 3){
							alert("提现失败");
//							console.log(data.msg)
						}
						
					},
				});
			}
//			else if(lastNum!=luhm){
//     		 	alert("银行卡号必须符合Luhm校验");
//			}
});

var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount; //当前剩余秒数
function sendMessage() {
		// 向后台发送处理数据
//		var loginname = $(".loginName").val().trim();
		console.log(loginName);
		$.ajax({
			type: "POST", // 用POST方式传输
			async: true,
			dataType: 'jsonp', // 数据格式:JSON
			jsonp: 'jsoncallback',
			//			url: "http://192.168.18.142:8080/gcafu_commerce/rest/pc/phoneVerify/", // 目标地址
			url: config + 'pc/phoneVerify/',
			data: {
				"phoneNumber": loginName,
				mobile: 1
			},
			success: function(data) {
				console.log(data.result);
				if(data.result == 1) {
					alert("√ 短信验证码已发到您的手机,请查收");
					//设置开始计时
					curCount = count;
					// 设置button效果，开始计时
//					document.getElementById("sendIcode").setAttribute("disabled", "true"); //设置按钮为禁用状态
//					document.getElementById("sendIcode").value = curCount + "(s)"; //更改按钮文字
					backTime=setInterval(codeTimer,1000);  // 启动计时器timer处理函数，1秒执行一次
					myCode = data.code;
					sessionStorage.setItem('myCode',myCode);
//					console.log('验证码'+myCode);
				} else if(data.result == 2) {
					console.log(data.error);
					alert("× 短信验证码发送失败，请重新发送");
				}
			}
		});
}

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
//返现总额千位分隔符
function thousandBitSeparator(num){
    num=num.toString().split(".");  // 分隔小数点
    var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
      if(i%3===0&&i!==0){
         res.push(",");   // 添加分隔符
      }
      res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if(num[1]){  // 如果有小数的话添加小数部分
      res=res.join("").concat("."+num[1]);
    }else{
      res=res.join("");
    }
    return res;
}
$(document).ready(function(){
	var totalMoney=$("#money").text();
	$("#money").text(thousandBitSeparator(totalMoney));
	var teltext=loginName;
//	loginName=$(".loginName").text().trim();
	var telfirst=teltext.slice(0,3);
	var telLast=teltext.slice(teltext.length-4,teltext.length);
	$(".loginName").text(telfirst+"****"+telLast);
//	加载完页面后点击提现
	$(".drawMoney").click(function(){
		var totalMoney=$("#money").text();
		$("#popover").css("display","block");
		$(".popUp").css("display","block");
//			if(totalMoney.indexOf(",")=="-1"){
//				var floatMoney=parseFloat(totalMoney);
//				if(floatMoney<10){
//					alert("当前返利总额不支持提现！");	
//				}else{
//					$("#writeInfoModal").css("display","block");
//					$(".popUp").css("display","block");
//				}
//			}else{
//				$("#writeInfoModal").css("display","block");
//				$(".popUp").css("display","block");
//			}
	});
//	点击发送验证码
	$(".verBtn").click(function(event){
		sendMessage();
//	backTime=setInterval(codeTimer,1000); 
	});
	//点击优惠券立即使用
	$(document).on("click",".toUseBtn",function(){
		console.log("aaaa");
		window.location.href="../new_page.html";
	});
})
//获取验证码
var i=120;
//timer处理函数
function codeTimer(){
		if(i==0){
			$(".verBtn").val("获取验证码");
			window.clearInterval(backTime);
			$('.verBtn')[0].removeAttribute('disabled');
			$('.verBtn').css("background-color","#fff");
			i=120;
		}else{
			$(".verBtn").val(i+"s");
			i--;
//			console.log(i);
			$('.verBtn').attr('disabled',"disabled");
			$('.verBtn').css("background-color","#aaa");
		}
}