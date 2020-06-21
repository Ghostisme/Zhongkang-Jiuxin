$(document).ready(function(){
	var changeIndex = sessionStorage.getItem("changeIndex");
	console.log(changeIndex);
	//城市选择
	$("#test").click(function(e) {
		// $("form").css({"background-color":"rgba(0, 0, 0, 1)"})
		SelCity(this, e);
		console.log(this);
	});
	if(!window.webUser){
		window.location.href = "../login/login.html";
	}
	// 表单提示字体切换
	function inputTips(ele, variable){
		variable = $(ele).attr("placeholder");
		$(ele).focus(function(){
			$(this).attr("placeholder", "");
		});
		$(ele).blur(function(){
			if ($(this).val() == "" || $(this).val() == null) {
				mui.toast('此项不可为空!',{ duration:'long', type:'div' });
				// $(this).attr("placeholder", variable);
//				$(this).focus();
			}
		});		
	};
	var consignee,
		phone,
		region,
		address,
		floor;
	inputTips(".consignee", consignee);//收货人
	inputTips(".phone", phone);//手机号码
	// inputTips(".region", region);//所在地区
	inputTips(".address", address);//收货地址
	inputTips(".floor", floor);//楼层门牌
	// 标签切换
//	$(document).on("click",".labelItem>span",function(){
//		$(this).hasClass("labelItemActive") == true ? $(this).removeClass("labelItemActive") : $(this).addClass("labelItemActive").siblings().removeClass("labelItemActive");
//		// if ($(this).hasClass("labelItemActive")) {
//		// 	$(this).removeClass("labelItemActive");
//		// } else{
//		// 	$(this).addClass("labelItemActive").siblings().removeClass("labelItemActive");
//		// }
//	});
	$(".labelItem>span").click(function(){
		$(this).hasClass("labelItemActive") == true ? $(this).removeClass("labelItemActive") : $(this).addClass("labelItemActive").siblings().removeClass("labelItemActive");
	})
	//初始化数据
	if(changeIndex != ""){
		var dataList = sessionStorage.getItem("dataList");
        editInit(changeIndex);
    }
	var addressId;
	function editInit(index){
		if (index == null || index == "") {
			return;
		} else{
			var data = eval("(" + dataList + ")")[index];
		}
		console.log(data);
		//标题更改
		$("#navTxt").text("编辑地址");
		$(".delBtn").show();
		$(".consignee").val(data.userName);
		$(".phone").val(data.userPhone);
		$("#city").text(data.province + data.city + data.town).css({"color":"#000"});
//		$(".address").val(data.detailAddr);
		$(".floor").val(data.detailAddr);
		addressId = data.id;
		var labelArr = $(".labelItem>span");
		for (var i = 0; i < labelArr.length; i++) {
			if ($(labelArr[i]).text() == data.label) {
				$(labelArr[i]).addClass("labelItemActive");
			} else{
				$(labelArr[i]).removeClass("labelItemActive");
			}
		};
		if (data.isDefault == 1) {
			$("#switchBtn").addClass("mui-active");
		}else{
			$("#switchBtn").removeClass("mui-active");
		}
		$(".btnBox1").show();
		$(".btnBox").hide();
	}
	//删除按钮点击
	$(".delBtn").click(function(){
		mui.confirm('你确定要删除么!','警告',['确定','取消'],function(e){
			if (e.index == 0) {
//				plus.runtime.quit();
				$.ajax({
					type:"get",
					url:config+"/drug/userAdress/batchRemove",
					async:true,
					data:{
						"userId": window.webUser.id,
						"id": addressId
					},
					success: function(data){
						console.log(data);
						if (data.status == "1") {
							mui.toast(data.message,{ duration:'long', type:'div' });
							//自动返回前一页
							setTimeout(function(){
								sessionStorage.removeItem("addressObj");
								window.location.href = "../add_address.html";
							},2000)
						} else{
							mui.toast(data.message,{ duration:'long', type:'div' });
						}
					},
					error: function(data){
						console.log(data);
					}
				});
			}
		},'div');
	});
	//新增地址	
	$(".submitBtn").click(function(){
		var province = localStorage.getItem("province");
		var city = localStorage.getItem("city");
		var town = localStorage.getItem("town");
		var cPhone = /^1[3456789]\d{9}$/;
		//非空验证
		if ($(".consignee").val() == "") {
			mui.toast('此项不可为空!',{ duration:'long', type:'div' });
			return false;
		};
		if ($(".phone").val() == "") {
			mui.toast('此项不可为空!',{ duration:'long', type:'div' });
			return false;
		} else{
			if (!(cPhone.test($(".phone").val()))) {
				mui.toast("手机号码有误，请重填!",{ duration:'long', type:'div' });
				return false;
			};
		};
		if ($("#city").text() == "请选择所在地区") {
			mui.toast('此项不可为空!',{ duration:'long', type:'div' });
			return false;
		};
		if ($(".floor").val() == "") {
			mui.toast('此项不可为空!',{ duration:'long', type:'div' });
			return false;
		};
		//看默认地址设置没设置
		var defaultAddress = $("#switchBtn").attr("class");
		var isDefault = 0;
		if (defaultAddress.indexOf("mui-active") != -1) {
			//等于-1是没找到
			isDefault = 1;
		} else{
			isDefault = 0;
		};
		$.ajax({
			type:"get",
			url:config+"/drug/userAdress/add",
			async:true,			
			data:{
				"userId": window.webUser.id,
				"userName": $(".consignee").val(),
				"userPhone": $(".phone").val(),
				"city": town,
				"province": province,
				"town": city,
				"detailAddr": $(".floor").val(),
				"label": $(".labelItem").find(".labelItemActive").text(),
				"isDefault": isDefault
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					mui.toast(data.message,{ duration:'long', type:'div' });
					//自动返回前一页
					setTimeout(function(){
						sessionStorage.setItem("rerefreshed", 0);
						window.location.href = "../add_address.html";
					},2000);
				} else{
					mui.toast(data.message,{ duration:'long', type:'div' });
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	});
	//更换按钮点击
	$(".submitBtn1").click(function(){		
		var province = localStorage.getItem("province");
		var city = localStorage.getItem("city");
		var town = localStorage.getItem("town");
		//看默认地址设置没设置
		var defaultAddress = $("#switchBtn").attr("class");
		var isDefault = 0;
		if (defaultAddress.indexOf("mui-active") != -1) {
			//等于-1是没找到
			isDefault = 1;
		} else{
			isDefault = 0;
		};
		console.log(addressId)
		$.ajax({
			type:"get",
			url:config+"/drug/userAdress/update",
			async:true,			
			data:{
				"Id": addressId,
				"userId": window.webUser.id,
				"userName": $(".consignee").val(),
				"userPhone": $(".phone").val(),
				"city": town,
				"province": province,
				"town": city,
				"detailAddr": $(".floor").val(),
				"label": $(".labelItem").find(".labelItemActive").text(),
				"isDefault": isDefault
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					mui.toast(data.message,{ duration:'long', type:'div' });
					//自动返回前一页
					setTimeout(function(){
						sessionStorage.setItem("rerefreshed", 1);
						window.location.href = "../add_address.html";
					},2000);
				} else{
					mui.toast(data.message,{ duration:'long', type:'div' });
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	})
})