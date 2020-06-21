$(document).ready(function(){
	"use strict";
	//logo点击
	$(".logoBox").click(function(){
		window.location.href = '../../index.html';
	});
	//立即登录按钮点击
	$(".register_btn").click(function(){
		window.location.href = '../login/login.html';
	});
	// 门店下拉
	getSelect();
	function getSelect() {
		var sessionId = sessionStorage.getItem("sessionId");
		$.ajax({
			method: 'get',
			url: config + '/sys/dict/list',
			contentType: "application/json; charset=utf-8", //传到后台的数据格式
			async: true,
			data: {},
			dataType: 'jsonp', //接收值的格式
			jsonp: 'jsoncallback',
			success: function(res){
				console.log(res);
				if (res.status == "1") {
					var list = res.resultMap.dictList;
					$("#store").html('');
					var optionDom = '';
					if (list == null || list.length == 0) {
						list = [];
					} else {
						list.map( item => {
							if (item.name == null || item.name == undefined) return;
							else optionDom += `<option value='${item.name}'>${item.name}</option>`;
						});
						$("#store").append(optionDom);
					}
				}else{
					alert(res.message);
				}
			},
			error: function(res){
				console.log(res);
			}
		});
	}
	//提示文字交互
//	function inputPlaceholder(eledom){
//		let thisPlaceholder = $(eledom).attr("placeholder");
//		$(eledom).focus(function(){
//			$(this).attr("placeholder", "");
//		});
//		$(eledom).blur(function(){
//			if ($(this).val() == "") {
//				$(this).attr("placeholder", thisPlaceholder);
//			}
//		});
//	}
//	inputPlaceholder("#phone");
//	inputPlaceholder("#code");
//	inputPlaceholder("#msgCode");
//	inputPlaceholder("#password");
//	inputPlaceholder("#again_password");
	//表单验证		
	//手机号表单验证
	let phoneMsg = $("#phone").attr("placeholder");
	let phoneRes = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
	let phoneStatus = 0;
	$("#phone").focus(function(){
		$(this).attr("placeholder", "");
		$(this).parent().css({"border":"1px solid #DDDDDD"});
		$(this).next(".tsMsg").remove();
	});
	$("#phone").blur(function(){
		if ($(this).val() == "") {
			$(this).attr("placeholder", phoneMsg);
			let emptyMsg = "手机号码不能为空";
			$(this).parent().css({"border":"1px solid #CC3333"});
			$(this).after("<span class='tsMsg'>" + emptyMsg + "</span>");
			phoneStatus = 0;
		} else{
			$(this).parent().css({"border":"1px solid #DDDDDD"});
			$(this).next(".tsMsg").remove();
			if (!(phoneRes.test($(this).val()))) {				
				let phoneStr = "手机号码输入不规范";
		    	$(this).parent().css({"border":"1px solid #CC3333"});
				$(this).after("<span class='tsMsg'>" + phoneStr + "</span>");
				phoneStatus = 0;
		    }else{
//				let phoneStr = "手机号码规范";
//				$(this).parent().css({"border":"1px solid #228B22"});
//				$(this).after("<span class='tsMsg' style='color:#228B22'>" + phoneStr + "</span>");
				$.ajax({
					type:"get",
					url:config+"/sys/account/registerCheck",
					async:true,
					data: {
						"userCode": $(this).val()
					},
					success: function(data){
						console.log(data);
						if (data.result.status == "1") {
//							alert(data.result.message);
							phoneStatus = 1;
							$("#phone").parent().css({"border":"1px solid #228B22"});
							$("#phone").after("<span class='tsMsg' style='color:#228B22'>" + data.result.message + "</span>");
						}else{
//							alert(data.result.message);
							phoneStatus = 0;
							$("#phone").parent().css({"border":"1px solid #CC3333"});
							$("#phone").after("<span class='tsMsg'>" + data.result.message + "</span>");
						}
					},
					error: function(data){
						console.log(data);
					}
				});
			};
		};
	});
	//验证码生成
	let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'];
    let str = "";   
    let str1 = "";
    let str2 = "";
    drawCode();    
    
    // 绘制验证码
    function drawCode() {
        var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
        var context = canvas.getContext("2d");                 //获取画布2D上下文
        context.fillStyle = "cornflowerblue";                  //画布填充色
        context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
        context.fillStyle = "white";                           //设置字体颜色
        context.font = "25px Arial";                           //设置字体
        var rand = new Array();
        var x = new Array();
        var y = new Array();
        for (var i = 0; i < 5; i++) {
            rand[i] = nums[Math.floor(Math.random() * nums.length)]
            x[i] = i * 16 + 10;
            y[i] = Math.random() * 20 + 20;
            context.fillText(rand[i], x[i], y[i]);
			str += rand[i];
//			str = str.toLowerCase();//小写
			str1 = str.toUpperCase();//大写
			str2 = str.toLowerCase();//小写
//			console.log(str)
        }
		
        //画3条随机线
        for (var i = 0; i < 3; i++) {
            drawline(canvas, context);
        }

        // 画30个随机点
        for (var i = 0; i < 30; i++) {
            drawDot(canvas, context);
        }
        convertCanvasToImage(canvas);
    }

    // 随机线
    function drawline(canvas, context) {
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
        context.lineWidth = 0.5;                                                  //随机线宽
        context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
        context.stroke();                                                         //描边，即起点描到终点
    }
    // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
    function drawDot(canvas, context) {
        var px = Math.floor(Math.random() * canvas.width);
        var py = Math.floor(Math.random() * canvas.height);
        context.moveTo(px, py);
        context.lineTo(px + 1, py + 1);
        context.lineWidth = 0.2;
        context.stroke();

    }
    // 绘制图片
    function convertCanvasToImage(canvas) {
        document.getElementById("verifyCanvas").style.display = "none";
        var image = document.getElementById("code_img");
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    // 点击图片刷新
    $("#changeCode").click(function(){
    	$('#verifyCanvas').remove();
        $('#changeCode').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>');
        str = "";
        str1 = "";
        str2 = "";
        drawCode();
        console.log(str);
    })
//  document.getElementById('changeCode').onclick = function () {
//      $('#verifyCanvas').remove();
//      $('#changeCode').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>');
//      str = "";
//      drawCode();
//  }
    //验证码验证
    let imgCodeStatus = 0;
    $("#code").focus(function(){
		$(this).attr("placeholder", "");
		$(this).css({"border":"1px solid #DDDDDD"});
		$(this).next().next().next(".tsMsg").remove();
		$(this).next().next(".tsMsg").remove();
	});
	$("#code").blur(function(){
		if ($(this).val() == "") {
			$(this).attr("placeholder", phoneMsg);
			let emptyMsg = "请输入图形验证码";
			$(this).css({"border":"1px solid #CC3333"});
			$("#changeCode").after("<span class='tsMsg'>" + emptyMsg + "</span>");
			imgCodeStatus = 0;
		} else{	
			$(this).css({"border":"1px solid #DDDDDD"});
			$(this).next().next(".tsMsg").remove();
			if ($(this).val() == str || $(this).val() == str1 || $(this).val() == str2) {
				let phoneStr = "验证码规范";
				$(this).css({"border":"1px solid #228B22"});
				$("#changeCode").after("<span class='tsMsg' style='color:#228B22'>" + phoneStr + "</span>");
				imgCodeStatus = 1;
			} else{				
				let emptyMsg = "验证码输入不正确,重新输入";
				$(this).css({"border":"1px solid #CC3333"});
				$("#changeCode").after("<span class='tsMsg'>" + emptyMsg + "</span>");
				$("#changeCode").click();
				imgCodeStatus = 0;
			}
		}
	});
	//短信验证码
	let isClick = true;
	let msgCodeMsg = $("#msgCode").attr("placeholder");
	$(".sendMsg").click(function(){		
		$("#msgCode").focus(function(){
			$(this).attr("placeholder", "");
			$(this).css({"border":"1px solid #DDDDDD"});
			$(this).parent().next(".tsMsg").remove();
			$(".msgCodeLabel").next(".tsMsg").remove();
		});
		$("#msgCode").blur(function(){
			$(this).parent().next(".tsMsg").remove();
//			$(this).find(".tsMsg").remove();
			if ($(this).val() == "") {
				$(this).attr("placeholder", msgCodeMsg);
				let emptyMsg = "短信验证码不能为空";
				$(this).css({"border":"1px solid #CC3333"});
				$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
				$(".msgCodeLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
			} else{
				$(this).css({"border":"1px solid #DDDDDD"});
//				$(this).find(".tsMsg").remove();
			};
		});
		clearInterval(timer);
		var msgNum = 60;
		if (isClick) {
			if ($("#phone").val() == "") {
				alert("请填写手机号!");
				isClick = true;
				return;
			};
			if (imgCodeStatus == 0) {
				alert("请填写图形验证码!");
				isClick = true;
				return;
			};
			var timer;
			$.ajax({
				type:"get",
				url:config+"/sys/account/sendVerificationCode",
				async:true,
				data:{
					"userCode": $("#phone").val()
				},
				success:function(data){
					console.log(data);
					if (data.status == "1") {
						// alert(data.message);
						isClick = false;
						timer = setInterval(function(){
							if (msgNum == 0) {
								clearInterval(timer);
								msgNum = 60;
								$(".sendMsg").text("发送验证码");
								isClick = true;
							} else{			
								$(".sendMsg").text("重新发送(" + msgNum + ")");
								msgNum--;
								isClick = false;
							}
						}, 1000);
					}else{
						alert(data.message);
						isClick = true;
					}
				},
				error: function(data){
					console.log(data);
				}
			});
			
		};
	});
	//短信验证码验证
	let msgCodeCodeMsg = $("#msgCode").attr("placeholder");
	let msgCodeStatus = 0;
	$("#msgCode").focus(function(){
		$(this).attr("placeholder", "");
		$(this).parent().css({"border":"1px solid #DDDDDD"});
		$(this).parent().next(".tsMsg").remove();
		$(".msgCodeLabel").next(".tsMsg").remove();
	});
	$("#msgCode").blur(function(){
		if ($(this).val() == "") {
			$(this).attr("placeholder", msgCodeCodeMsg);
			let emptyMsg = "短信验证码不能为空";
			$(this).css({"border":"1px solid #CC3333"});
			$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
			$(".msgCodeLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
		} else{
			$(this).css({"border":"1px solid #DDDDDD"});
			$(this).parent().next(".tsMsg").remove();
//			$.ajax({
//				type:"get",
//				url:config+"/sys/account/checkVerificationCode",
//				async:true,
//				data:{
//					"userCode": $("#phone").val(),
//					"checkSMSCode": $(this).val()
//				},
//				success: function(data){
//					console.log(data);
//					if (data.status == "1") {
//						$("#msgCode").css({"border":"1px solid #228B22"});
//						$("#msgCode").parent().after("<span class='tsMsg' style='color:#228B22;top:-10px'>" + data.message + "</span>");
//						msgCodeStatus = 1;
//					}else{
//						$("#msgCode").css({"border":"1px solid #CC3333"});
//						$("#msgCode").parent().after("<span class='tsMsg' style='top:-10px'>" + data.message + "</span>");
//						msgCodeStatus = 0;
//					}
//				},
//				error: function(data){
//					console.log(data);
//				}
//			});
		};
	})
	//密码验证
	let passWordVal;
	let pasWordCodeMsg = $("#password").attr("placeholder");
	let pasStatus = 0;
	$("#password").focus(function(){
		$(this).attr("placeholder", "");
		$(this).parent().css({"border":"1px solid #DDDDDD"});
		$(this).parent().next(".tsMsg").remove();
		$(".passWordLabel").next(".tsMsg").remove();
	});
	$("#password").blur(function(){
		console.log($(this).val().length)
		if ($(this).val() == "") {
			$(this).attr("placeholder", pasWordCodeMsg);
			let emptyMsg = "密码长度6-16字符（包含大小写特殊字符）";
			$(this).parent().css({"border":"1px solid #CC3333"});
			$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
			$(".passWordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
		}else if($(this).val().length < 6){
			let emptyMsg = "密码长度不够6位,请重新输入!";
			$(this).parent().css({"border":"1px solid #CC3333"});
			$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
			$(".passWordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
			
	}else if($(this).val().length > 16){
			let emptyMsg = "密码长度多余16位,请重新输入!";
			$(this).parent().css({"border":"1px solid #CC3333"});
			$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
			$(".passWordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
		}else{
			let passwordStr = "密码规范";
			$(this).parent().css({"border":"1px solid #228B22"});
			$(this).parent().after("<span class='tsMsg' style='color:#228B22;top:-10px'>" + passwordStr + "</span>");
			$(".passWordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
			passWordVal = $(this).val();
		}
	});
	
	//密码二次验证	
	let passWordCodeMsg1 = $("#again_password").attr("placeholder");
	$("#again_password").focus(function(){
		$(this).attr("placeholder", "");
		$(this).parent().css({"border":"1px solid #DDDDDD"});
		$(this).parent().next(".tsMsg").remove();
		$(".againPasswordLabel").next(".tsMsg").remove();
	});
	$("#again_password").blur(function(){
		if ($(this).val() == "") {
			$(this).attr("placeholder", passWordCodeMsg1);
			let emptyMsg = "密码长度6-16字符（包含大小写特殊字符）";
			$(this).parent().css({"border":"1px solid #CC3333"});
			$(this).parent().after("<span class='tsMsg' style='top:-10px'>" + emptyMsg + "</span>");
			$(".againPasswordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
			pasStatus = 0;
		} else{
//			$(this).parent().css({"border":"1px solid #DDDDDD"});
//			$(this).parent().next(".tsMsg").remove();
//			console.log(passWordVal)
//			console.log($(this).val())
			if ($(this).val() == passWordVal) {
				let passwordStr = "密码规范";
				$(this).parent().css({"border":"1px solid #228B22"});
				$(this).parent().after("<span class='tsMsg' style='color:#228B22;>" + passwordStr + "</span>");
				$(".againPasswordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
				pasStatus = 1;
			} else{
				let passwordStr = "密码长度6-16字符（包含大小写特殊字符）";
		    	$(this).parent().css({"border":"1px solid #CC3333"});
				$(this).parent().after("<span class='tsMsg'>" + passwordStr + "</span>");
				$(".againPasswordLabel").after("<span class='tsMsg' style='top:-10px;width: 20px; height: 12px;display: block;'></span>");
				pasStatus = 0;
			}
		}
	});
	//注册按钮点击
	var df = $.Deferred();
	$("#submitBtn").click(function(){
		if ($("#password").val() == "") {
			alert("密码不能为空!");
			return;
		};
		df.resolve();	
	})
	df.promise().then(function(){
		return $.ajax({
			type:"get",
			url:config+"/sys/account/registerCheck",
			async:true,
			data: {
				"userCode": $("#phone").val()
			}
		});
	}).then(function(data){
		console.log(data);
		if (data.result.status == "1") {
//			alert(data.result.message);
			if ($("#store").val() == "") {
				alert("邀请门店不能为空!");
				return;
			}else{
				return $.ajax({
					type:"get",
					url:config+"/sys/account/checkVerificationCode",
					async:true,
					data: {
						"userCode": $("#phone").val(),
						"checkSMSCode": $("#msgCode").val()
					},
//					success: function(res){
//						console.log(res);
//						$("#msgCode").css({"border":"1px solid #228B22"});
//						$("#msgCode").parent().after("<span class='tsMsg' style='color:#228B22;top:-10px'>" + data.message + "</span>");
//						msgCodeStatus = 1;
//					},
//					error: function(res){
//						console.log(res);
//						$("#msgCode").css({"border":"1px solid #CC3333"});
//						$("#msgCode").parent().after("<span class='tsMsg' style='top:-10px'>" + data.message + "</span>");
//						msgCodeStatus = 0;
//					}
				});
			}
		}else{
			alert(data.result.message);
			phoneVal = 0;
			return false;
		};
	}).then(function(data){
		if (data.status == "1") {
//			alert(data.message);
			$("#msgCode").css({"border":"1px solid #228B22"});
			$("#msgCode").parent().after("<span class='tsMsg' style='color:#228B22;top:-10px'>" + data.message + "</span>");
			msgCodeStatus = 1;
			if (phoneStatus == 1 && msgCodeStatus == 1 && pasStatus == 1) {
				return $.ajax({
					type:"get",
					url:config+"/sys/account/userRegister",
					async:true,
					data: {
						"userCode": $("#phone").val(),
						"password": $("#again_password").val(),
						"inviteStore": $("#store").val()
					}
				})
			}else{
				$("#msgCode").css({"border":"1px solid #CC3333"});
				$("#msgCode").parent().after("<span class='tsMsg' style='top:-10px'>" + data.message + "</span>");
				msgCodeStatus = 0;
				if (phoneStatus == 0) {					
					alert("手机号填写项错误啦!请重新查看!");
				};
				if (msgCodeStatus == 0) {
					alert("验证码填写项错误啦!请重新查看!");
				};
				if (pasStatus == 0) {
					alert("密码填写项错误啦!请重新查看!");
				};
			};
		}
	}).then(function(data){
		console.log(data);
		if (data.status == "1") {	
			alert(data.message);
			window.location.href = "../login/login.html";
		}else{
			alert(data.message);
		};
	})
	
})
