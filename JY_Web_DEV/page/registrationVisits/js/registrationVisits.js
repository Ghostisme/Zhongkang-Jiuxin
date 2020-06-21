$(document).ready(function(){
	//页面跳转
//	pageGo(".closebtn", "../patient/patient.html");//关闭按钮->患者管理页
//	pageGo(".sumbitbtn", "../patient/patient.html");//确定按钮->患者管理页
	//身份证号填年龄
	var strBirthday = "";
	$("#iDcard").blur(function(){
		var identityCard = $(this).val();
		if (identityCard == "") {
			return false;
		}
//		var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//		if (cP.test(identityCard)) {
//			$(this).after('<label id="identityCode-error" class="error" for="identityCode"><i class="fa fa-times-circle"></i>  请输入正确身份证号</label>');
//			return false;
//		}
		strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
		var birthDate = new Date(strBirthday);
		var nowDateTime = new Date();
		var age = nowDateTime.getFullYear() - birthDate.getFullYear();
//		if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
//			age--;
//		}
		var sexStr = '';
		if (parseInt(identityCard.slice(-2, -1)) % 2 == 1) {
			sexStr = '男';
		}
		else {
			sexStr = '女';
		}
		if (age < 0) {
			age = 0;
			alert("身份证号输入错误,请重新输入!");
			$("#age").val("");
		}else{
			if (Number.isNaN(age)) {
				age = "";
				$("#age").val(age);	
			}else{
				$("#age").val(age);	
			}			
		};		
		$("#sex").val(sexStr);
	});
	var sessionId = sessionStorage.getItem("sessionId");
//	$("#phone").focus(function(){
//		$(this).next().remove();
//	})
//	$("#phone").change(function(){
//		var mPattern = /^1[345789]\d{9}$/;
//		var phoneVal = mPattern.test($(this).val())
//		if (!phoneVal) {
//			$("#phone").after('<label id="userTel-error" class="error" for="userTel"><i class="fa fa-times-circle"></i>  请输入正确手机号</label>');
//			return false;
//		}
//	})
	$("#phone").blur(function(){
		// var mobile = $(this).val();
		$(this).siblings().remove();
		var mPattern = /^1[345789]\d{9}$/;
		var phoneVal = mPattern.test($(this).val())
		if (!phoneVal) {
			$(this).after('<label id="userTel-error" class="error" for="userTel"><i class="fa fa-times-circle"></i>  请输入正确手机号</label>');
			return false;
		}
		if ($(this).val() == "") {
//			$("#phone").after('<label id="userTel-error" class="error" for="userTel"><i class="fa fa-times-circle"></i>  必填</label>');
			$(this).siblings().remove();
			return false;
		} else{
			$.ajax({
				type: "get",
	//			url: "http://192.31.10.62:8001/oa/patinfo/save",
				url: config + "/oa/patinfo/getByParm",
				async: true,
				dataType: "JSON",
				contentType: "application/json; charset=utf-8",//传到后台的数据格式
				data:{
					"sessionId": sessionId,
					'mobile':  $(this).val()
				},
				success: function(data){
					console.log(data);
					var dataList = data.resultMap.patinfo;
					if (dataList.id == null) {
						$("#username").removeAttr("disabled");
						$("#sex").removeAttr("disabled");
						$("#age").removeAttr("disabled");
						$("#iDcard").removeAttr("disabled");
						$("#phone").next().remove();
						return;
					} else{
//						$("#username").val(dataList.name);
//						$("#sex").val(dataList.sex);
//						$("#age").val(dataList.age);
//						$("#iDcard").val(dataList.idCode);
						$("#phone").after('<label id="userTel-error" class="warn" for="userTel"><i class="fas fa-exclamation-triangle fa1"></i>  该手机号已存在,请更换手机号后完善信息</label>');
						$("#username").siblings().remove();
						$("#sex").siblings().remove();
						$("#age").siblings().remove();
						$("#iDcard").siblings().remove();
						$("#username").attr("disabled",true);
						$("#sex").attr("disabled",true);
						$("#age").attr("disabled",true);
						$("#iDcard").attr("disabled",true);
					};				
				},
				error: function(data){
					console.log(data);
					// <i class="fas fa-exclamation-triangle"></i>
				}
			})
		}
		
	});
	//机构赋值
	var user = JSON.parse(sessionStorage.getItem("user"));
	$("#organ").text(user.deptName);//deptName
	$("#people").text(user.userName);//userName
	//补零操作
	function addZero(num){
	    if(parseInt(num) < 10){
	        num = '0' + num;
	    }
	    return num;
	};
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth() + 1;
	var currentDay = currentDate.getDate();
	var currentTime = currentYear + "-" + addZero(currentMonth) + "-" + addZero(currentDay);
	$("#time").text(currentTime);
	//性别选择	
	$(".essential")
		.find("p")
			.find("span")
				.find("i")
					.click(function(){
						$(".essential")
							.find("p")
								.find("span")
									.find("i").html("&#xe678;");
						$(this).addClass("active").siblings().removeClass("active");
						if (($(this)[0].classList.length) == 2) {
							$(this).html("&#xe677;")
						}
					})
	//提示文字切换
	function altText(ele, placeHolder){
		$(ele).focus(function(){
			this.placeholder = "";
			$(ele).siblings().remove();
		});
		$(ele).blur(function(){
			this.placeholder = placeHolder;
			$(ele).siblings().remove();
		});
	}
	altText(".username", "请输入患者姓名");
	altText(".phone", "请输入手机号");
	altText(".age", "请输入年龄");
	altText(".IDcard", "请输入身份证");
	$("#form").validate();
	//确定按钮点击
	$(".sumbitbtn").click(function(){
		// console.log($(window.parent.document));
		var idcard_patter = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)$/;//身份证号校验
		if($("#form").valid()){
			if(!(/^1[345789]\d{9}$/.test($("#phone").val()))){
		    	$("#phone").siblings().remove();
				$("#phone").after('<label id="userTel-error" class="error" for="userTel"><i class="fa fa-times-circle"></i>  请输入正确手机号</label>');
			}else if(!(idcard_patter.test($("#iDcard").val()))){
				$("#iDcard").siblings().remove();
				$("#iDcard").after('<label id="identityCode-error" class="error" for="identityCode"><i class="fa fa-times-circle"></i>  请输入正确身份证号</label>');
			}else{				
				$.ajax({
					type: "get",
		//			url: "http://192.31.10.62:8001/oa/patinfo/save",
					url: config + "/oa/patinfo/save",
					async: true,
					dataType: "JSON",
					contentType: "application/json; charset=utf-8",//传到后台的数据格式
					data:{
						"sessionId": sessionId,
						'name': $('#username').val(),
						'mobile': $('#phone').val(),
						'sex': $('#sex').val(),
						'age': $('.age').val(),
						'idCode': $('#iDcard').val()
					},
					success: function(data){
						console.log(data);
						if(data.status == 1){
							alert(data.message);	
		//					$('#myModal').modal('hide');
							$(window.parent.document).find('#registrationModal').find(".close").click();
							$(window.parent.document).find(".addbtn").hide();
							$(window.parent.document).find(".overbtn").show();
							$(".btngroup").hide();
							$(".btngroup1").show();
							var pagereload = $(window.parent.document)[0];
							pagereload.location.reload();
							// console.log($(window.top).find(".page-tabs .J_menuTab .active"));
						}else{
							alert(data.message);
						}					
					},
					error: function(data){
						console.log(data);
						if(data.status == 2){
							alert(data.message);
						}
					}
				});
			}
		}
	})
	//取消按钮点击
	$(".resbtn").click(function(){
		$(window.parent.document).find('#registrationModal').find(".close").click();
		$("#username").siblings().remove();
		$("#sex").siblings().remove();
		$("#phone").siblings().remove();
		$("#age").siblings().remove();
		// $("#userTel-error").remove();
	})
	$(window.parent.document).find('#registrationModal').find(".close").click(function(){
		$("#username").siblings().remove();
		$("#sex").siblings().remove();
		$("#phone").siblings().remove();
		$("#age").siblings().remove();
	});
	//结束就诊初始化渲染数据
	var id = $(window.parent.document).find("#overId").val();
	var disId;
	function initData(){
		$(".btngroup").hide();
		$(".btngroup1").show();
		$.ajax({
			type: "get",
			url: config + "/oa/patinfo/getByParm",
			async: true,
			data:{
				"id": id
			},
			success: function(data){
				console.log(data);
				var dataList = data.resultMap.patinfo;
				$("#username").val(dataList.name);
				$("#username").attr("disabled","disabled");
				$("#phone").val(dataList.mobile);
				$("#phone").attr("disabled","disabled");
				$("#sex").val(dataList.sex);
				$("#sex").attr("disabled","disabled");
				$("#age").val(dataList.age);
				$("#age").attr("disabled","disabled");
				$("#iDcard").val(dataList.idCode);
				$("#iDcard").attr("disabled","disabled");
				disId = dataList.diagnosisId;
			},
			error: function(data){
				console.log(data);
			}
		})
	}
	//patient页结束新增按钮点击
	var addBtn = $(window.parent.document).find(".addbtn");
	$(addBtn).click(function(){
		$(".btngroup").show();
		$(".btngroup1").hide();
		$("#username").val("");
		$("#username").removeAttr("disabled");
		$("#phone").val("");
		$("#phone").removeAttr("disabled");
		$("#sex").val("");
		$("#sex").removeAttr("disabled");
		$("#age").val("");
		$("#age").removeAttr("disabled");
		$("#iDcard").val("");
		$("#iDcard").removeAttr("disabled");
	})
	//patient页结束就诊按钮点击
	var overBtn = $(window.parent.document).find(".overbtn");
	$(overBtn).click(function(){
		initData();
	})
	//本页结束就诊点击
	// var disId = localStorage.getItem("disid");
	$(".overBtn").click(function(){
		$.ajax({
			type: "get",
			url: config + "/oa/patinfoDiagnosis/overDiagnosis",
			async: true,
			data: {
				"sessionId": user.sessionId,
				"id": id,
				"diagnosisId": disId
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
					$(window.parent.document).find('#registrationOverModal').find(".close").click();
					$(window.parent.document).find(".addbtn").show();
					$(window.parent.document).find(".overbtn").hide();
					$(".btngroup").show();
					$(".btngroup1").hide();
					var pagereload = $(window.parent.document)[0]
					pagereload.location.reload();
				}else{
					alert(data.message);
				}
			},
			error: function(data){
				console.log(data);
				if(data.status == 2){
					alert(data.message);
				}
			}
		})
	})
	//数据渲染
//	$(".submitbtn").click(function(){
////		console.log($(".active").next("span").text())
//		console.log(typeof String($(".phone").val()))
//		var birthday = new Date("2019/05/19");
//		$.ajax({
//			type: "get",
////			url: "http://192.31.10.62:8001/oa/patinfo/save",
//			url: config + "/oa/patinfo/save",
//			async: true,
//			dataType: "JSON",
//			contentType: "application/json; charset=utf-8",//传到后台的数据格式
//			data:{
//				'name': $('.username').val(),
//				'mobile': $('.phone').val().toString(),
//				'sex': $('.active').next('span').text(),
//				'age': $('.age').val(),
//				'idCode': $('.IDcard').val()
//			},
//			success: function(data){
//				console.log(data);
//				if(data.status == 1){
//					alert(data.message);	
////					$('#myModal').modal('hide');
//				}else{
//					alert(data.message);
//				}
//					
//			},
//			error: function(data){
//				console.log(data);
//				if(data.status == 2){
//					alert(data.message);
//				}
//			}
//		});
//	})
})
