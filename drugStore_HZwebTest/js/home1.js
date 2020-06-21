//全部商品分类
var liIndex;
//引入组件
$(".loadTop").load("pages/headerTop.html",function(){
	loadImg();
});
$("footer").load("pages/footerCommon.html",function(){
	loadImg();
});
$(".loadMenu").load("pages/fix_right_menu.html",function(){
	loadImg();
});
function loadImg(){
	sliderHover();
	if(window.user) {
		$(".mainTopLoginName").css("display", "inline-block");
		$(".mainTopLoginName .userLoginName").text(window.user.userName);
		$(".quitOnSafeBTN").css("display", "inline-block");
		sideCartNum();
		$(".sideShopCartNum").show();
	} else {
		$(".mainTopLoginName").css("display", "none");
		$(".mainTopLoginName .userLoginName").text('');
		$(".quitOnSafeBTN").css("display", "none");
		$(".mainToptoLoginBtn").css("display", "inline-block");
	}
	$(".quitOnSafeBTN").click(function() {
		sessionStorage.removeItem("user");
		sessionStorage.clear();
		window.location.href = window.src + "pages/login/login.html";
	});
	$(".mainToptoLoginBtn").click(function() {
		window.location.href = window.src + "pages/login/login.html";
	});
	//点击顶部购物车
	$("#arrow3").click(function() {
		window.location.href = window.src + "index.html";
	});
	//点击顶部我的订单
	$("#arrow4").click(function() {
		window.location.href = window.src + "aboutUs.html";

	});
	//点击logo
	$(".topMainLogo").click(function() {
		window.location.href = window.src + "index.html";
	});
//	点击侧边栏跳转购物车
	$(".sideCartJumpShopCart").click(function() {
		if(window.user) {
			window.location.href = window.src + "pages/shoppingCart/shoppingCart.html";
		} else {
			window.location.href = window.src + "pages/login/login.html";
		}
	});
	$(".sideCart").attr("src", window.src + "images/shop/gwc.png");
	$(".appCode").attr("src", window.src + "images/shop/shouji.png");
	$(".sideTotop").attr("src", window.src + "images/shop/xia.png");
	$(".ERCode").attr("src", window.src + "images/footer/ERCode.jpg");
	$("#arrow3 i img").attr("src", window.src + "images/header/shopCar.png");
	$(".mainTopTelImg").attr("src", window.src + "images/header/tel.png");
	$(".footerImg").attr("src", window.src + "images/header/tel.png");
	$(".footerImgStar").attr("src", window.src + "images/footer/star.png");
	$(".footerImgGood").attr("src", window.src + "images/footer/good.png");
	$(".footerImgHart").attr("src", window.src + "images/footer/hart.png");
	$(".footerImgSafe").attr("src", window.src + "images/footer/safe.png");
	$(".footerMiddle .erCodeImg").attr("src", window.src + "images/footer/ERCode.jpg");
	$(".scroll-logo").attr("src", window.src + "images/header/logo.png");
	$(".topMainLogoImg").attr("src", window.src + "images/header/logo.png");
	$(".mainTopMyOrderImg").attr("src", window.src + "images/header/order.png");
};
$(document).ready(function(){
	//返回主页
	$(".topMainLogo").click(function(){
		window.location.href = "index.html";
	})
	//热搜
	$(".other-search").ready(function(){
		$.ajax({
			type:"get",
			url: config + "/drug/hotSearch/list",
			async:true,
			data:{},
			success: function(data){
				console.log("/drug/hotSearch/list热搜",data);
				var typeId = "",
			    	categoryId = "",
					typeText = "",
					typeText2 = "",
					fullName = "";
				var dataList = data.resultMap.list;
				var oWrapper = $(".other-search");
				var arr = [];
				if(dataList.length > 6){
					for(var i = 0; i < 6; i++){
						arr.push(dataList[i]);
					}
				}else{
					for(var i = 0; i < dataList.length; i++){
						arr.push(dataList[i]);
					}
				}
				arr.forEach(function(ele,index){
					var aODom = $('<a href="#"></a>').clone();
					aODom.text(ele.content);
					aODom.attr("data-id", ele.id);
					oWrapper.append(aODom);
					aODom.click(function(){
						typeId = "";
				    	categoryId = "";
						typeText = "";
						typeText2 = "";
						fullName = aODom.text();
						window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2 + "&fullName=" + fullName;
					})
				})
			},
			error: function(data){
				console.log(data);
			}
		});
	})
	//我的订单点击
	$(".myOrder").click(function(){
		window.location.href = "pages/shop/orderList.html";
	})
	//搜索框点击
	$(".search-but").click(function(){
		$.ajax({
			type:"get",
			url: config + "/drug/info/getDrugList",
			async:true,
			data : {
                typeId: "",
				offset: "",
				limit: "",
				categoryId: "",
				retailPriceStart: "",
				retailPriceEnd: "",
				order: "",
				sort: "",
				fullName: $(".search-in").val()
			},
			success: function(data){
				console.log("/drug/info/getDrugList搜索框点击",data);
				if (data.status == "1") {
					window.location.href = "pages/shop/shop_index.html?fullName=" + $(".search-in").val();
				};
			},
			error: function(data){
				console.log(data);
			}
		});
	})
	//轮播图
	$.ajax({
		type: "get",
		url: config + "/drug/bannerPictures/list",
		async: true,
		data: {},
		success: function(data) {
			console.log("/drug/bannerPictures/list轮播图",data);
			//获取数据datalist
			var dataArr = data.resultMap.list;
			//获取dom插入盒子
			var oWrapper = $(".carousel-inner");
			var oWrapper1 = $(".carousel-indicators");
			//遍历数组
			dataArr.forEach(function(ele, index) {
				//获取克隆dom
				var oCloneDom = $(".bannertpl").clone().removeClass("bannertpl");
				var oCloneDom1 = $(".bannertpl1").clone().removeClass("bannertpl1");
				if(ele.bannerUrl == null || ele.bannerUrl == "") {
					oCloneDom.find("img").attr("src", "img/banner.png");
				} else {
					oCloneDom.find("img").attr("src", ele.bannerUrl);
				};
				oCloneDom1.attr("data-slide-to", index);
				if(index == 0) {
					oCloneDom.addClass("active");
					oCloneDom1.addClass("active");
				};
				oCloneDom.css({"cursor":"pointer"});
				//数据插入											
				oWrapper.append(oCloneDom);
				oWrapper1.append(oCloneDom1);
				//轮播图点击
				oCloneDom.click(function(){
					window.location.href = ele.accessPath;
				})
			})
			$(".bannertpl").remove();
			$(".bannertpl1").remove();
		},
		error: function(data) {
			console.log(data);
		}
	});
	//顶部带热字的横向导航栏
	$.ajax({
		type:"get",
//		url: config + "/drug/category/list",
		url: config + "/drug/info/firstList",
		async:true,
		data:{
			name: "",
			limit: "",
			offset: ""
		},
		success: function(data){
			console.log("/drug/info/firstList全部分类横向字",data);
//			var dataList = data.resultMap.list;
			var dataList = data.resultMap.commodityTypeList;
			var oWrapper = $(".top_main_navUl");
			var typeId = "",
		    	categoryId = "",
				typeText = "",
				typeText2 = "",
				fullName = "";
			var arr = [];
			if(dataList.length>0&&dataList.length<5){
				arr=dataList;
			}else{
				for(var i = 0; i < 5; i++){
					arr.push(dataList[i]);
				};
			}
			
			arr.forEach(function(ele,index){
				var liDom = $("<li></li>").clone();
				var str = $('<img src="img/hot_icon.png" class="hot_icon">');
//				liDom.attr("data-foreignId",ele.foreignId);
//				liDom.text(ele.drugCaName);
				liDom.attr("data-id",ele.id);
				liDom.text(ele.name);
				if (index == 0 || index == 1) {
					liDom.addClass("hot_icon_box");
					liDom.append(str);
					oWrapper.append(liDom);
				}else{
					oWrapper.append(liDom);
				};
				liDom.click(function(){
//					typeId = liDom.attr("data-foreignId");
					typeId = liDom.attr("data-id");
					typeText = liDom.text();
					categoryId = "";
					typeText2 = "";
					fullName = "";
//					window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2 + "&fullName=" + fullName;
					window.location.href = window.src + "index.html";
				})
			});
		},
		error: function(data){
			console.log(data);
		}
	});
	//全部分类侧边菜单/drug/info/list
	$.ajax({
		type:"get",
		url: config + "/drug/info/list",
		async:true,
		data:{},
		success: function(data){
			console.log("/drug/info/list左侧菜单二级类",data);
			var dataList = data.resultMap.commodityCategoryList;
			if (dataList.length > 8) {
				dataList = dataList.slice(0, 8);
			};
			var oWrapper = $(".ulDown1");
			var ooWrapper = $(".top_main_nav_content");
			var typeId = "",
		    	categoryId = "",
				typeText = "",
				typeText2 = "",
				fullName = "";
			var arr = [];
			dataList.forEach(function(ele,index){				
				var liDom = $("<li></li>").clone();
				var domValue = $('<input type="hidden" class="classI"/>').clone();
				liDom.text(ele.name);
				liDom.attr("data-index", index);
				domValue.val(ele.id);			
				liDom.append(domValue);
				oWrapper.append(liDom);						
				liDom.click(function(){
					typeId = "";
					typeText2 = liDom.text();
					fullName = "";
					categoryId = liDom.find(".classI").val();
					typeText = "";
//					window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2 + "&fullName=" + fullName;
					window.location.href = window.src + "index.html";
				});
				arr.push(ele.commodityInfoList);
//				var dataChildList = ele.commodityInfoList;
//				console.log("dataChildList",dataChildList)
//				$(this).hover(function(){
//					var dataChildList = ele.commodityInfoList;
//					console.log("dataChildList",dataChildList)
//				})				
			});
			console.log(arr);
			var str = '<li onclick="morejumpShop()" class="shopcategoryMoreBtn">更多</li>';
			oWrapper.append(str);
			$(".ulDown1 li").hover(function(){
				var oChildWrapper = $(".ulChildDown");
				var index = $(this).attr("data-index");
				$(".ulChildDown").show();
				$(this).addClass("hoverStyle").siblings().removeClass("hoverStyle");
				liIndex = $(this).index();
				if($(this).attr("class").indexOf("shopcategoryMoreBtn") != -1){
					$(this).click(function(){
//						window.location.href = window.src + 'pages/shop/shop_index.html';
						window.location.href = window.src + "index.html";
					});
				}else{
					oChildWrapper.html("");
					var dataChildList = arr[index];
	//					console.log("dataChildList",dataChildList)
					var typeId = "",
				    	categoryId = "",
						typeText = "",
						typeText2 = "",
						fullName = "";
					if (dataChildList.length == 0) {
						return;
					};
					var str = '<div class="more_more">' +
								'<a href="'+ window.src +'pages/shop/shop_index.html">查看更多</a>' +
								'<i class="glyphicon glyphicon-chevron-right"></i>' +
							'</div>';
					dataChildList.forEach(function(ele,index){
						var liChildDom = $("<li></li>").clone();
						liChildDom.text(ele.fullName);
						oChildWrapper.append(liChildDom);							
						liChildDom.click(function(){
							typeId = "";
							typeText2 = $(".hoverStyle").text();
							fullName = liChildDom.text();
							categoryId = $(".hoverStyle").find(".classI").val();
							typeText = "";
//							window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2+"&fullName="+fullName;
							window.location.href = window.src + "index.html";
						});
					});	
					oChildWrapper.append(str);
				}
			}, function() {
				$(".ulChildDown").hide();
				$(".ulDown1 li").removeClass("hoverStyle");
//				$(this).removeClass("hoverStyle");
			});
			$(".ulChildDown").hover(function() {
				$($(".ulDown1 li")[liIndex]).addClass("hoverStyle").siblings().removeClass("hoverStyle");
				$(".ulDown1").show();
				$(".ulChildDown").show();
			}, function() {
				$(".ulDown1").show();
				$(".ulChildDown").hide();
				$(".ulDown1 li").removeClass("hoverStyle");
			});			
		},
		error: function(data){
			console.log(data);
		}
	});
//	$.ajax({
//		type:"get",
//		url: config + "/drug/info/twoMenoInfo",
//		async:true,
//		data:{},
//		success: function(data){
//			console.log("/drug/info/twoMenoInfo左侧菜单二级类",data);
////			if (data) {
////				if (dataList.length != 0) {commodityCategoryList
////					var dataList = data.resultMap.commodityCategoryList;	
////					var oWrapper = $(".ulDown1");
////					var typeId = "",
////				    	categoryId = "",
////						typeText = "",
////						typeText2 = "",
////						fullName = "";
////				}
////			}
//			var dataList = data.resultMap.commodityCategoryList;	
//			var oWrapper = $(".ulDown1");
//			var typeId = "",
//		    	categoryId = "",
//				typeText = "",
//				typeText2 = "",
//				fullName = "";
//			dataList.forEach(function(ele,index){				
//				var liDom = $("<li></li>").clone();
//				var domValue = $('<input type="hidden" class="classI"/>').clone();
//				liDom.text(ele.name);
//				domValue.val(ele.id);			
//				liDom.append(domValue);
//				if(index <= 7){
//					oWrapper.append(liDom);	
//				}else{
//					return;
//				}						
//				liDom.click(function(){
//					typeId = "";
//					typeText2 = liDom.text();
//					fullName = "";
//					categoryId = liDom.find(".classI").val();
//					typeText = "";
//					window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2 + "&fullName=" + fullName;
//				});
//			});
//			var str = '<li onclick="morejumpShop()" class="shopcategoryMoreBtn">更多</li>';
//			oWrapper.append(str);
//			$(".ulDown1 li").hover(function(){
//				var typeId = $(this).find(".classI").val();
//				var oChildWrapper = $(".ulChildDown");
//				$(".ulChildDown").show();
//				$(this).addClass("hoverStyle").siblings().removeClass("hoverStyle");
//				liIndex = $(this).index();
//				if($(this).attr("class").indexOf("shopcategoryMoreBtn") != -1){
//					$(this).click(function(){
//						window.location.href = window.src + 'pages/shop/shop_index.html';
//					});
//				}else{
//					$.ajax({
//						type:"get",
//						url: config + "/drug/info/getDrugList",
//						async:true,
//						data:{
//							categoryId: typeId,
//							parId: "",
//							fullName: "",
//							offset: "",
//							limit: "",
//							retailPriceStart: "",
//							retailPriceEnd: "",
//							sort: "",
//							order: ""
//						},
//						success: function (data){
//							console.log("/drug/info/getDrugList二级类药品",data);
//							oChildWrapper.html("");
//							var dataChildList = data.resultMap.commodityInfoList;
//							var typeId = "",
//						    	categoryId = "",
//								typeText = "",
//								typeText2 = "",
//								fullName = "";
//							if (dataChildList.length == 0) {
//								return;
//							};
//							var str = '<div class="more_more">' +
//										'<a href="'+ window.src +'pages/shop/shop_index.html">查看更多</a>' +
//										'<i class="glyphicon glyphicon-chevron-right"></i>' +
//									'</div>';						
//							dataChildList.forEach(function(ele,index){
//								var liChildDom = $("<li></li>").clone();
//								liChildDom.text(ele.fullName);
//								oChildWrapper.append(liChildDom);								
//								liChildDom.click(function(){
//									typeId = "";
//									typeText2 = $(".hoverStyle").text();
//									fullName = liChildDom.text();
//									categoryId = $(".hoverStyle").find(".classI").val();
//									typeText = "";
//									window.location.href = window.src + 'pages/shop/shop_index.html?typeId=' + typeId + '&categoryId=' + categoryId + "&typeText=" + typeText + "&typeText2=" + typeText2+"&fullName="+fullName;
//								});
//							});	
//							oChildWrapper.append(str);
//						},
//						error: function(data){
//							console.log(data);
//						}
//					});	
//				}
//							
//			}, function() {
//				$(".ulChildDown").hide();
//				$(".ulDown1 li").removeClass("hoverStyle");
//			});
//			$(".ulChildDown").hover(function() {
//				$($(".ulDown1 li")[liIndex]).addClass("hoverStyle").siblings().removeClass("hoverStyle");
//				$(".ulDown1").show();
//				$(".ulChildDown").show();
//			}, function() {
//				$(".ulDown1").show();
//				$(".ulChildDown").hide();
//				$(".ulDown1 li").removeClass("hoverStyle");
//			});
//		},
//		error: function(data){
//			console.log(data);
//		}
//	});
	//页面商品数据
	$.ajax({
		type:"get",
		url: config + "/drug/banner/list",
		async:true,
		data: {},
		success: function(data){
			console.log("/drug/banner/list页面商品",data);
			//热卖部分			
			var hotList = data.resultMap.listHot;
			var hotoWrapper = $(".hot_sale_content").find("ul");
			if (hotList) {
				if (hotList.length != 0) {
					//热卖专区赋值					
					if (hotList.length > 5) {
						hotList = hotList.slice(0, 5);
//						console.log(hotList)
						hotList.forEach(function(ele,index){
							//获取克隆dom
							var oCloneDom = $(".hotItemTpl").clone().removeClass("hotItemTpl");
							if(ele.tagUrl == "" || ele.tagUrl == null){
								oCloneDom.find(".imgbox").find("img").eq(0).hide();
							}else{
								oCloneDom.find(".imgbox").find("img").eq(0).attr("src", ele.tagUrl).show();
							};							
							oCloneDom.find(".imgbox").find("img").eq(1).attr("src", ele.bannerUrl);
//							oCloneDom.find(".item_text").text(ele.title + ele.memo);
							oCloneDom.find(".item_text").text(ele.title);
							var price = ele.price;
							if(ele.price == null){
								ele.price = 0;
								price = ele.price;
							};
							if(price.toString().indexOf(".") != -1) {
								oCloneDom.find(".item_price").text("￥" + ele.price);
							}else{
								oCloneDom.find(".item_price").text("￥" + ele.price + ".0");
							};
							oCloneDom.find(".hot_value").val(ele.accessPath);
							//数据插入
							hotoWrapper.append(oCloneDom);
							oCloneDom.click(function(){
								window.location.href = "pages/shop/shop_des.html?rec=" + oCloneDom.find(".hot_value").val();
							});
						});
					}else{
						hotList.forEach(function(ele,index){							
							if(ele.drugList > 5) {
								var hotProduct = [];
								for(var i = 0; i < 5; i++) {
									console.log(i)
									hotProduct.push(ele.drugList[i]);
								};
							} else {
								var hotProduct = ele.drugList;
							};
							//获取克隆dom
							var oCloneDom = $(".hotItemTpl").clone().removeClass("hotItemTpl");
							if(ele.tagUrl == "" || ele.tagUrl == null){
								oCloneDom.find(".imgbox").find("img").eq(0).hide();
							}else{
								oCloneDom.find(".imgbox").find("img").eq(0).attr("src", ele.tagUrl).show();
							};			
							oCloneDom.find(".imgbox").find("img").eq(1).attr("src", ele.bannerUrl);
//							oCloneDom.find(".item_text").text(ele.title + ele.memo);
							oCloneDom.find(".item_text").text(ele.title);
							var price = ele.price;
							if(ele.price == null){
								ele.price = 0;
								price = ele.price;
							};
							if(price.toString().indexOf(".") != -1) {
								oCloneDom.find(".item_price").text("￥" + ele.price);
							}else{
								oCloneDom.find(".item_price").text("￥" + ele.price + ".0");
							};
							oCloneDom.find(".hot_value").val(ele.accessPath);
							//数据插入
							hotoWrapper.append(oCloneDom);
							oCloneDom.click(function(){
								window.location.href = "pages/shop/shop_des.html?rec=" + oCloneDom.find(".hot_value").val();
							});							
						});
//						var oCloneDom = $(".hotItemTpl").clone().removeClass("hotItemTpl");
//						oCloneDom.find(".imgbox").find("img").eq(0).hide();
//						oCloneDom.find(".imgbox").find("img").eq(1).hide();
//						hotoWrapper.append(oCloneDom);
					}
					$(".hot_sale_title .more_text").click(function(){
						window.location.href = "pages/shop/shop_des.html?rec=" + $(".hot_sale_title").find(".text").text();
					});
				}
			}	
			//系列菜单
			var seriesList = data.resultMap.list;
//			console.log(dataList);
			var outWrapper = $(".wrapper");
			if (seriesList) {
				if (seriesList.length != 0) {
					seriesList.forEach(function(ele,index){
						var outBoxCloneDom = $(".boxTpl").clone().removeClass("boxTpl");
						//系列之藏药系列赋值
						outBoxCloneDom.find(".text").text(ele.title);
						if(ele.drugList.length > 10) {
							var productArr = [];
							for(var i = 0; i < 10; i++) {
								productArr.push(ele.drugList[i]);
							};
						} else {
							var productArr = ele.drugList;
//							console.log("productArr",productArr)
						};
						//第一个内容	
						var firstData = productArr.slice(0, 1);
//						console.log("firstData",firstData)
						if (firstData.length != 0) {
							if(firstData[0].bjUrl != null){
								outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").css(
									{
										"background":"url(" + firstData[0].bjUrl + ") no-repeat",
										"background-origin":"content-box",
										"background-position":"center",
										"background-size":"cover"
									}
								)
							};						
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".left_box_title").text(firstData[0].title);
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".left_box_fTitle").text(firstData[0].memo);
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".left_img_box").find("img").attr("src", firstData[0].bannerUrl);
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".tibetan_value").val(firstData[0].accessPath);
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".left_box_more_btn").click(function(){
								window.location.href = "pages/shop/shop_des.html?rec=" + outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".tibetan_value").val();
							});
							if (firstData[0].content == "" || firstData[0].content.trim() == "请输入描述...") {
								var leftBoxContent = "<li>【此类详细】：维护中</li>";
							}else{
								var leftBoxContentStr = firstData[0].content;
								var leftBoxContent = leftBoxContentStr.replace(/p/g, "li");
							};			
							outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".left_box").find(".left_box_list").find("ul").html(leftBoxContent);
						}
						//中间6个内容
						var centerData = productArr.slice(1, 7);				
		//				console.log(centerData);
						if (centerData.length != 0) {
							var contentArr;				
							if (centerData.length < 6) {
								var contentBox = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".right_left_box");
								var tibetanCloneDom = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightLeftTpl").clone().removeClass("rightLeftTpl");
								centerData.forEach(function(ele,index){	
									var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
									if(tibetanItem.length > 1) {
										tibetanItem.splice(1, tibetanItem.length);
									};
									tibetanItem
										.find(".contentbox")
										.find("div")
										.eq(0)
										.text(ele.title)
										.next()
										.text(ele.memo)
										.next()
										.find("img")
										.attr("src", ele.bannerUrl);
									tibetanItem.find(".rightLeft_value").val(ele.accessPath);
									tibetanItem.find(".contentbox").hover(function(){
										$(this).css({"box-shadow":"none"});
									});
									//数据插入											
									tibetanCloneDom.append(tibetanItem);
									tibetanItem.click(function(){
										window.location.href = "pages/shop/shop_des.html?rec=" + tibetanItem.find(".rightLeft_value").val();
									});						
								});
								var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
								tibetanCloneDom.append(tibetanItem);
								tibetanItem.find("img").hide();
								tibetanItem.find(".contentbox").hover(function(){
									$(this).css({"box-shadow":"none"});
								});
								contentBox.append(tibetanCloneDom);
							}else{	
								var contentBox = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".right_left_box");
								var tibetanCloneDom = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightLeftTpl").clone().removeClass("rightLeftTpl");
								centerData.forEach(function(ele,index){						
									var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
									if(tibetanItem.length > 1) {
										tibetanItem.splice(1, tibetanItem.length);
									};
									tibetanItem
										.find(".contentbox")
										.find("div")
										.eq(0)
										.text(ele.title)
										.next()
										.text(ele.memo)
										.next()
										.find("img")
										.attr("src", ele.bannerUrl);
									tibetanItem.find(".rightLeft_value").val(ele.accessPath);	
									//数据插入											
									tibetanCloneDom.append(tibetanItem);
									tibetanItem.click(function(){
										window.location.href = "pages/shop/shop_des.html?rec=" + tibetanItem.find(".rightLeft_value").val();
									});
									contentBox.append(tibetanCloneDom);
								});				
							}
						}else{
							var contentBox = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".right_left_box");
							var tibetanCloneDom = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightLeftTpl").clone().removeClass("rightLeftTpl");
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							var tibetanItem = $(".rightLeftItemTpl").clone().removeClass("rightLeftItemTpl");
							tibetanItem.find("img").hide();
							tibetanItem.find(".contentbox").hover(function(){
								$(this).css({"box-shadow":"none"});
							});
							tibetanCloneDom.append(tibetanItem);
							contentBox.append(tibetanCloneDom);
						}
						//右边三个内容
						var rightBoxList = productArr.slice(7, 10);
//						console.log("rightBoxList",rightBoxList)
						//rightBoxTpl
						if (rightBoxList.length != 0) {
							var tibetanMedicineBox = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".right_right_box").find("ul");
							if (rightBoxList.length < 3) {
								rightBoxList.forEach(function(ele,index){
									var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
									rightBoxItem
										.find("div")
										.eq(0)
										.text(ele.title)
										.next()
										.text(ele.memo)
										.next()
										.find("img")
										.attr("src", ele.bannerUrl);
									rightBoxItem.find(".rightBox_value").val(ele.accessPath);	
									//数据插入											
									tibetanMedicineBox.append(rightBoxItem);
									rightBoxItem.click(function(){
										window.location.href = "pages/shop/shop_des.html?rec=" + rightBoxItem.find(".rightBox_value").val();
									});
								});
								var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
								tibetanMedicineBox.append(rightBoxItem);
								rightBoxItem.find("img").hide();
								var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
								tibetanMedicineBox.append(rightBoxItem);
								rightBoxItem.find("img").hide();
								var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
								tibetanMedicineBox.append(rightBoxItem);
								rightBoxItem.find("img").hide();
							}else{
								rightBoxList.forEach(function(ele, index) {
									var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
									rightBoxItem
										.find("div")
										.eq(0)
										.text(ele.title)
										.next()
										.text(ele.memo)
										.next()
										.find("img")
										.attr("src", ele.bannerUrl);
									rightBoxItem.find(".rightBox_value").val(ele.accessPath);	
									//数据插入											
									tibetanMedicineBox.append(rightBoxItem);
									rightBoxItem.click(function(){
										window.location.href = "pages/shop/shop_des.html?rec=" + rightBoxItem.find(".rightBox_value").val();
									});
								});
							};							
						}else{
							var tibetanMedicineBox = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".right_right_box").find("ul");
							var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
							tibetanMedicineBox.append(rightBoxItem);
							rightBoxItem.find("img").hide();
							var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
							tibetanMedicineBox.append(rightBoxItem);
							rightBoxItem.find("img").hide();
							var rightBoxItem = outBoxCloneDom.find(".tibetanMedicine_sale_content").find(".rightBoxTpl").clone().removeClass("rightBoxTpl");
							tibetanMedicineBox.append(rightBoxItem);
							rightBoxItem.find("img").hide();
						}
						outWrapper.append(outBoxCloneDom);
					});
				}
			};	
		},
		error: function(data){
			console.log(data);
		}
	});
})