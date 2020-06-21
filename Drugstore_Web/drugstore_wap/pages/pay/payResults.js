$(function(){
	//判断支付结果
//	var payResults = sessionStorage.getItem("payResults");
//	console.log(payResults);
//	
//	if(payResults){
//		$(".fail").hide();
//	}else{
//		$(".success").show();
//	}
//	var orderId = sessionStorage.getItem("orderId");
//	var userId,drugId,drugNum,fromType;
//	var drugId,drugNum,fromType;
	var drugId,fromType;
	var orderId = localStorage.getItem("orderId");
	var arr = [];
	$.ajax({
		type:"get",
//		url: config + "/drug/orderInfo/getList",
		url: config + "/drug/orderInfo/getOrederInfo",
		async:true,
		data:{
			orderId: orderId,
//			orderId: "20200604103946067025a"
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.orederInfo;
			$(".orderId").find("span").text(orderId);
//			if(dataList.payFrom == null){
//				dataList.payFrom = dataList.payType;
//			}
//			userId = dataList.userId;
			if(dataList.type == 0){
				$(".anotherOrder").hide();
			}else{
				$(".anotherOrder").show();
			}
			var product = dataList.drugOrderProductList;			
			console.log(product);
			product.forEach(function(ele, index){
				if(ele.drugId == null){
					drugId = ele.mealId;
				}else{
					drugId = ele.drugId;
				}
//				drugNum = ele.drugNum;
				arr.push(drugId);
			});
			if (dataList.payFrom == null || dataList.payFrom == undefined) {
				dataList.payFrom = '在线支付';
			}
			fromType = dataList.payFrom;
			if (dataList.price.toString().indexOf(".") != -1) {
				var str = dataList.price;
			}else{
				var str = dataList.price + ".00元";				
			}
			$(".paymentDetails_content")
				.find("ul")
					.find("li")
						.eq(0)
							.text(str)
								.next()
									.text(dataList.payFrom)
										.next()
											.text(dataList.orderUser)
												.next()
													.text(dataList.address);
		},
		error: function(data){
			console.log(data);
		}
	});
	$(".viewOrders").click(function(){
		window.location.href = "../shopCart/order/orderdetail.html?orderId=" + orderId;
	});
	$(".anotherOrder").click(function(){
		$.ajax({
			type:"get",
			url: config + "/drug/cart/add",
			async:true,
			data: {
				userId: window.webUser.id,
//				userId: 936,
//				drugId: drugId,
//				drugNum: drugNum,
				fromType: 2,
				orderId: orderId,
//				orderId: "20200604103946067025a"
			},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					var str = "";
					if (arr.length <= 1) {
						str = arr[0];
						localStorage.setItem("prodcutIds", str);
					} else{
						for(var i = 0; i < arr.length; i++){						
							str += arr[i] + ",";
						}
						localStorage.setItem("prodcutIds", str.substr(0, str.length - 1));
					};
					window.location.href = "../shopCart/shopcart_index.html?page=orderpage";
				}
			},
			error: function(data){
				console.log(data);
			}
		});
//		window.location.href = "../shopCart/shopcart_index.html";
	});
})
	