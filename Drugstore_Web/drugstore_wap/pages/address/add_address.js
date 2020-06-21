mui('.mui-scroll-wrapper').scroll({
	indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// $('.mui-content').on('tap', '#submit_btn', function() {
// 	
// });

if(!window.webUser){
	window.location.href = "../login/login.html";
}
//修改按钮
//var dataList = [{
//		"name":"张三",
//		"phone": 13500000001,
//		"address": "天津市南开区",
//		"address1": "和平路",
//		"floor": "3门101",
//		"label": "家",
//		"init": 0
//	},{
//		"name":"李四",
//		"phone": 13500000002,
//		"address": "天津市和平区",
//		"address1": "绍兴路",
//		"floor": "1门1002",
//		"label": "公司",
//		"init": 1
//	}];//渲染数据的list

$(document).ready(function(){
	var user = sessionStorage.getItem("webUser");
	
	
	$("header a").click(function() {
		if(getParam("detailToOrder")){
			var detailToOrder = getParam("detailToOrder");
			var cid = getParam("cid");
			var num = getParam("num");
			var storeNum = getParam("storeNum");
			window.location.href = "../shopCart/order/orderSettlement.html?detailToOrder=" + detailToOrder + "&cid=" + cid + "&num=" + num + "&storeNum=" + storeNum;
		}else if(getParam("packagedDetailToOrder")){
			var detailToOrder = getParam("packagedDetailToOrder");
			var cid = getParam("cid");
			var num = getParam("num");
			var storeNum = getParam("storeNum");
			window.location.href = "../shopCart/order/orderSettlement.html?packagedDetailToOrder=" + detailToOrder + "&mealId=" + cid + "&num=" + num + "&storeNum=" + storeNum;
		}
		else{
			window.location.href = "../shopCart/order/orderSettlement.html";
		}
		
		//	清除发票信息
//		localStorage.removeItem("titleType");
//		localStorage.removeItem("titleContent");
//		localStorage.removeItem("titleCompanyName");
//		localStorage.removeItem("titleTaxNum");
//		sessionStorage.removeItem("addressObj");
		//	清除地址信息
	})
	//判断是否刷新页面
	var rerefreshed = sessionStorage.getItem("rerefreshed");
	if (rerefreshed == 1) {
		initData();
	} else{
		initData();
	}
	//提交按钮点击
	var changeIndex = "";
	$("#submit_btn").click(function(){
		changeIndex = $(this).attr("data-index");
		sessionStorage.setItem("changeIndex", changeIndex);
		window.location.href = 'add/add.html';
	});
})
//初始化数据
function initData(){
	$.ajax({
		type:"get",
		url:config+"/drug/userAdress/list",
//		url:"http://192.31.10.197:8003/drug/userAdress/list",
		async:true,			
		data:{
			"userId": window.webUser.id
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.list;
			var oWrapper = $("#res_list");
			if (dataList.length == 0) {
				$(".noData").show();
				$("#res_list").hide();
			} else{
				$(".noData").hide();
				$("#res_list").show();
				dataList.forEach(function(ele, index){				
					var oCloneDom = $(".tpl").clone().removeClass("tpl");
					//判断删除显示
					var isDeletedStatus = oCloneDom.attr("data-isDeleted");
					if (isDeletedStatus == 0) {
						oCloneDom.show();
					} else{
						oCloneDom.hide();
					}
					//判断null
					if (ele.userName == null) {
						ele.userName = "无";					
					}
					if (ele.userPhone == null) {
						ele.userPhone = "无";
					}
					if (ele.isDefault == 0) {
						oCloneDom
							.find(".contBox_user")
								.find(".default")
									.hide();
					} else{
						oCloneDom
							.find(".contBox_user")
								.find(".default")
									.show();
					}
					oCloneDom.attr("data-isDeleted", ele.isDeleted);
//					if(ele.label == "家"){
//						ele.label = " " + ele.label + " ";
//					}
					oCloneDom
						.find(".contBox_user")
							.find("span")
								.eq(0)
									.text(ele.userName)
										.next()
											.text(ele.userPhone)
												.next()
													.next()
														.text(ele.label);
					oCloneDom.find(".contBox_adress").text(ele.province + ele.city + ele.town + ele.detailAddr);
					//传index为了读取数据
					oCloneDom.find(".rightIcon").attr("data-index", index);
					//存id
					oCloneDom.find(".addressId").val(ele.id);
					//数据插入
					oWrapper.append(oCloneDom);
					//地址标签显示
					if (ele.label == "" || ele.label == null) {
						oCloneDom
							.find(".contBox_user")
								.find("span")
									.eq(3)
										.hide();
					}else{
						oCloneDom
							.find(".contBox_user")
								.find("span")
									.eq(3)
										.show();
					};
					if(ele.label == "家"){
						oCloneDom
							.find(".contBox_user")
								.find("span")
									.eq(3)
										.css({"padding":"3px 10px"});
					}
				})
				//地址列表选中交互
				$(".iconBox").click(function(){
					$(this).find("i").html("&#xe672;").addClass("iconfont_active");
					$(this).parent(".itembox").parent(".item").siblings().find(".iconBox").find("i").html("&#xe68d;").removeClass("iconfont_active");
				});
				
				$(".rightIcon").click(function(){
					changeIndex = $(this).attr("data-index");//下标值				
					sessionStorage.setItem("changeIndex", changeIndex);			
					sessionStorage.setItem("dataList", JSON.stringify(dataList));
					window.location.href = 'add/add.html';
				});
				
				$(".jump").click(function(){
					changeIndex = $(this).siblings(".rightIcon").attr("data-index");//下标值
					console.log(changeIndex);
					var obj = dataList[changeIndex];
					sessionStorage.setItem("addressObj", JSON.stringify(obj));
					if(getParam("detailToOrder")){
						var detailToOrder = getParam("detailToOrder");
						var cid = getParam("cid");
						var num = getParam("num");
						var storeNum = getParam("storeNum");
						window.location.href = "../shopCart/order/orderSettlement.html?detailToOrder=" + detailToOrder + "&cid=" + cid + "&num=" + num + "&storeNum=" + storeNum;
					}
					else if(getParam("packagedDetailToOrder")){
						var detailToOrder = getParam("packagedDetailToOrder");
						var cid = getParam("cid");
						var num = getParam("num");
						var storeNum = getParam("storeNum");
						window.location.href = "../shopCart/order/orderSettlement.html?packagedDetailToOrder=" + detailToOrder + "&mealId=" + cid + "&num=" + num + "&storeNum=" + storeNum;
					}
					else{
						window.location.href = "../shopCart/order/orderSettlement.html";
					}
//					window.location.href = "../shopCart/order/orderSettlement.html?detailToOrder=" + detailToOrder + "&cid=" + cid + "&num=" + num + "&storeNum=" + storeNum;
				})
			}
		},
		error: function(data){
			console.log(data);
		}
	});
}
function getParam(paramName) {//获取url参数
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}