$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn", "../patient/patient.html");//返回按钮->患者管理页
//	pageGo(".essentialBox", "../basicInformation/basicInformation.html");//内容基本部分->基本信息页
//	pageGo(".medicalHistoryBox", "../medicalHistory/medicalHistory.html");//内容病史部分->病史选择页
//	pageGo(".habitsCustomsBox", "../habitscustoms/habitscustoms.html");//内容生活习惯部分->生活习惯页
//	pageGo(".diseaseManagementBox", "../diseaseManagement/diseaseManagement.html");//内容病症管理部分->病症管理页
//	pageGo(".bloodpressure", "../bloodPressure/bloodPressure.html");//内容健康数据之血压->血压详情页
//	pageGo(".bloodsugar", "../bloodSugar/bloodSugar.html");//内容健康数据之血糖->血糖详情页
//	pageGo(".bmiContent", "../BMI/BMI.html");//内容健康数据之BMI->BMI详情页
//	pageGo(".prescriptionDrugs", "../prescriptionDrugs/prescriptionDrugs.html");//内容诊疗信息之药品处方->药品处方页
	//跟原生交互
//	var test = window.location.href;
//	console.log(test);
//	window.location.href = window.location.href + "#" + test;
//	console.log(window.location.href)
	//数据请求级渲染
	var eleId = localStorage.getItem("id");
	var fkuserId = localStorage.getItem("fkUserId");
	var oldMobile;
	localStorage.setItem("id",eleId);
	console.log(eleId);
	$.ajax({
		type: "get",
//		url: "http://192.31.10.62:8001/oa/patinfo/get",
		url: config + "/oa/patinfo/get",
		async:true,
		dataType:'json',//接收值的格式
		data:{
			"id": eleId
		},
		success: function(data){
			console.log("/oa/patinfo/get",data);			
			var dataList = data.resultMap.patinfo;
			if (dataList.mobile == null || dataList.mobile == 0) {
				dataList.mobile = "0";
				oldMobile = '';
			}else{
				oldMobile = dataList.mobile;
			}
			//获取当前时间
//			var oDate = new Date().getFullYear();
//			var birthdayDate = new Date(dataList.birthday),
//				//计算生日年份
//				birthdayYear = birthdayDate.getFullYear(),
//				//计算年龄
//				birthdayTime = oDate - birthdayYear;
			//头像
			if (dataList.headImage == null) {
				dataList.headImage = "img/user.png";
			}else{
				dataList.headImage = dataList.headImage;
			}
			$(".headImg").find("img").attr("src", dataList.headImage);
			//患者姓名
			$(".essential").find("div").eq(0).find("span").eq(1).find("input").val(dataList.name);
			//性别
//			$(".essential").find("div").eq(1).find("span").eq(1).find("input").val(dataList.sex);
			$(".essential").find("div").eq(1).find("span").eq(1).find("select").val(dataList.sex);
			//年龄
			if (dataList.age == null) {
				dataList.age = "暂无";
			};
			$(".essential").find("div").eq(2).find("span").eq(1).find("input").val(dataList.age);
			//身份证号
			if (dataList.idCode == null) {
				dataList.idCode = "暂无";
			};
			$(".essential").find("div").eq(3).find("span").eq(1).find("input").val(dataList.idCode);
			//手机号
			if (dataList.mobile == null) {
				dataList.mobile = "暂无";
			};
			$(".essential").find("div").eq(4).find("span").eq(1).find("input").val(dataList.mobile);
			//fkuserID号
//			$(".essential").find("div").eq(5).find("span").eq(1).text(dataList.id);
//			$(".essential").find("div").eq(5).find("span").eq(1).find("input").val(dataList.id);
			//住址
			if (dataList.address == null) {
				dataList.address = "暂无";
			};
			$(".essential").find("div").eq(5).find("span").eq(1).find("input").val(dataList.address);
		},		
		error: function(data){
			console.log(data);
		}
	});
	// $(".chooseImg").attr("disabled","disabled");
	//头像上传
	var eleId = localStorage.getItem("id");
	$(".chooseImg").on("change",function(){
//		console.log($(this).val());
		var formData = new FormData();
		
//		var fileElementId=$("#files").attr("id");
//		console.log(fileElementId);
		//formData.append('file', $(this).val());
		formData.append('file', document.getElementsByClassName("chooseImg")[0].files[0]);
		formData.append("id",eleId);
		console.log(formData)
		console.log(formData.get('file'));
		$.ajax({
			type:"post",
//			url:"http://192.31.10.62:8001/oa/patinfo/uploadHeadImage",
			url: config + "/oa/patinfo/uploadHeadImage",
			cache: false, //上传文件不需要缓存
			async:true,
			data: formData,
			dataType:'JSON', //接收值的格式
			enctype:'multipart/form-data',
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);
					$(".headImg").find("img").attr("src", data.resultMap.headImage);
//					$(".essential")
//						.find("p")
//							.eq(0)
//								.find("img")
//									.attr("src", data.url);
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
	});
	$("#editSave").click(function(){
		var editSaveText = $("#editSave").text();
		if(editSaveText == "编辑"){
			$(".chooseImg").removeAttr("disabled");
			$(this).text("保存");
			$(this).removeClass("btn-info");
			$(this).addClass("btn-success");
			$("input[disabled]").attr("disabled",false);
			$(".sex").attr("disabled",false);
			var mPattern = /^1[34578]\d{9}$/;
			var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			var Cnumber = /^[0-9]*$/;
			$(".IDcard").blur(function(){
				if ($(".IDcard").val().length < 18) {
					alert("您输入的身份证号长度不够,请重新输入!");
					return false;
				}
				if (!(cP.test($(".IDcard").val()))) {
					alert("您输入的身份证号错误,请重新输入!");
					return false;
				}
			});
			$(".mobile").blur(function(){
				if ($(".mobile").val().length < 11) {
					alert("您输入的手机号长度不够,请重新输入!");
					return false;
				}
				if (!(mPattern.test($(".mobile").val()))) {
					alert("您输入的手机号错误,请重新输入!");
					return false;
				}
			});
		}else{			
			if ($(".username").val() == "") {
				alert("姓名不能为空!");
				return false;
			};
			if ($(".age").val() == "") {
				alert("年龄不能为空!");
				return false;
			};
			if ($(".IDcard").val() == "") {
				alert("身份证号不能为空!");
				return false;
			};
			if ($(".mobile").val() == "") {
				alert("手机号不能为空!");
				return false;
			};
			if ($(".address").val() == "") {
				alert("住址不能为空!");
				return false;
			}
			var eleId = localStorage.getItem("id");			
			console.log(oldMobile);
			$.ajax({
				type:"get",
				url: config + "/oa/patinfo/update",
				async:true,
				data:{
					"fkUserId" : fkuserId,
					"id": eleId,
					"name": $(".username").val(),
					"sex": $(".sex").val(),
					"age": $(".age").val(),
					"idCode": $(".IDcard").val(),
					"oldMobile": oldMobile,
					"mobile": $(".mobile").val(),
					"address": $(".address").val()
				},
				success: function(data){
					console.log(data);
					if(data.status == 1){
						alert(data.message);
						$(location).prop('href', "../healthrecord/healthrecord.html");
						$("input[disabled]").attr("disabled",true);
						$(".sex").attr("disabled",true);
						$(this).text("编辑");
						$(this).removeClass("btn-success");
						$(this).addClass("btn-info");
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
		};
	})
})
