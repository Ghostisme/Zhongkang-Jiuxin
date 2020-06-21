//这是要遍历时间轴的数据
	var dateTime,time,title,achievement;
	var dimeAxis = [];
//	if(!window.webUser){
//		window.location.href = "../login/login.html";
//	}
//	var dimeAxis = [{
//		date: dateTime,
//		time: time,
//		src:'img/icon.png',
//		title: title,
//		achievement: achievement
//	},
//	{
//		date:'08-02',
//		time:'16:02',
//		src:'img/icon.png',
//		title:'已签收',
//		achievement:'[天津市]快件已在天津和平一部签收 签收人：本人，如有疑问请电联：1567895126/022-27568951'
//	},
//	{
//		date:'08-02',
//		time:'16:02',
//		src:'img/icon.png',
//		title:'派送中',
//		achievement:'[天津市]天津和平一部的苟师傅[18965216578]正在派件（xxxxx为顺丰快递员外呼的专属号码，亲放心接听）'
//	},
//	{
//		date:'08-02',
//		time:'16:02',
//		src:'img/icon.png',
//		title:'运输中',
//		achievement:'[天津市]快件已到达天津和平一部'
//	},
//	{
//		date:'08-02',
//		time:'16:49',
//		src:'img/icon.png',
//		title:'',
//		achievement:'【天津市】快件已从天津中转部发出，准备发往天津和平一部'
//	},
//	{
//		date:'08-02',
//		time:'21:01',
//		src:'img/icon.png',
//		title:'',
//		achievement:'[天津市]快件已到达天津中转部'
//	},
//	{
//		date:'08-02',
//		time:'16:49',
//		src:'img/icon.png',
//		title:'',
//		achievement:'【绍兴市】快件已从绍兴中转部发出，准备发往天津中转部'
//	},
//	{
//		date:'08-02',
//		time:'21:01',
//		src:'img/icon.png',
//		title:'',
//		achievement:'[绍兴市]快件已到达绍兴中转部'
//	},
//	{
//		date:'08-02',
//		time:'16:49',
//		src:'img/icon.png',
//		title:'',
//		achievement:'【宁波市】快件已从余姚江南发出，准备发往天津中转部'
//	},
//	{
//		date:'08-02',
//		time:'16:02',
//		src:'img/icon.png',
//		title:'已揽件',
//		achievement:'[宁波市]余姚江南的雅尚[75865657985]已揽收'
//	},
//	{
//		date:'08-02',
//		time:'10:20',
//		src:'img/icon.png',
//		title:'已发货',
//		achievement:'包裹正在等待揽收'
//	}];
	
	
	$(function(){
//		$.each(dimeAxis, function(i, e) {
//			var html = '<li class="time-axis-item">' +
//				'<div class="time-axis-date">' + e.date + '<span></span></div>' +
//				'<div class="time-axis-title">' + e.title + '</div>' +
//				'<p class="time-axis-achievement">' + e.achievement + '</p>' +
//				'</li>';
//			$('.time-axis').append(html);
//		});
		var address = sessionStorage.getItem("address", address);
		address == null || address == undefined || address == "undefined" ? address = "数据维护中" : address;
		$(".address").text(address);
		var expNo = sessionStorage.getItem("expNo");
		var expCode = sessionStorage.getItem("expCode");
		if (expNo == undefined || expNo == null || expNo == "") {
			expNo = "";
			return;
		};
		if (expCode == undefined || expCode == null || expCode == "") {
			expCode = "";
			return;
		};
//		expCode = "YTO";
//		expNo = "806993611123620323";
//		expCode = "YD";
//		expNo = "3809770754944";
//		expCode = "YD";
//		expNo = "4300748307090";
//		expCode = "ZTO";
//		expNo = "75166270029696";
		$.ajax({
			type:"get",
			url:config+"/express/getCompany",
			async:true,
			data:{},
			success: function(data){
				console.log(data);
				if (data.status == "1") {
					var dataList = data.resultMap.comList;
					for (var i = 0; i < dataList.length; i++) {
						if (expCode == dataList[i].comCode) {
							$(".logistics_name").find("span").eq(1).text(dataList[i].comName);
						};
					};
				};
			},
			error: function(data){
				console.log(data);
			}
		});
		$.ajax({
			type:"post",
			url:config+"/express/getTraces",
//			url:"http://192.31.10.62:8003/express/getTraces",
			async:true,
			data:{
				expNo: expNo,//物流单号
				expCode: expCode//物流类型
			},
			success: function(data){
				console.log(data);
				if (data.message == "无效的输入[【ShipperCode】物流公司编号不正确]") {
					$(".logistics_status").find("span").eq(1).text("暂无物流信息");
					$(".logistics_name").find("span").eq(1).text("暂无物流信息");
					return;
				}
				switch (data.resultMap.expressMessage.State){
					case "1":
						$(".logistics_status").find("span").eq(1).text("已揽收");
						break;
					case "2":
						$(".logistics_status").find("span").eq(1).text("在途中");
						break;
					case "3":
						$(".logistics_status").find("span").eq(1).text("签收");
						break;
					case "4":
						$(".logistics_status").find("span").eq(1).text("问题件");
						break;	
					default:
						$(".logistics_status").find("span").eq(1).text("无轨迹");
						break;
				}
				var dataList = data.resultMap.expressMessage.Traces;
				console.log("dataList",dataList);
//				dataList = dataList.slice(0, 3);
				var arr1 = [];
				var arr = [];
				dataList.forEach(function(ele, index){
					var obj = {};
//					if(ele.AcceptTime){
//						var strArr = ele.AcceptTime.trim().split(" ");
//						dateTimeArr = strArr[0].split("-");
//						dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
//						timeArr = strArr[1].split(":");
//						time = timeArr[0] + ":" + timeArr[1];
//					};
					if (ele.AcceptStation) {						
						//先处理已发货
						if (ele.AcceptStation.indexOf("已收件") != -1) {
							var strArr = ele.AcceptTime.trim().split(" ");
							dateTimeArr = strArr[0].split("-");
							dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
							timeArr = strArr[1].split(":");
							time = timeArr[0] + ":" + timeArr[1];
							achievement = ele.AcceptStation.trim();
							title = "已发货";
							src = 'img/icon5.png';
							obj.date = dateTime;
							obj.time = time;
							obj.src = src;
							obj.title = title;
							obj.achievement = achievement;							
							dimeAxis.push(obj);
						};
						
						//然后揽件
						if (ele.AcceptStation.indexOf("已打包") != -1 || ele.AcceptStation.indexOf("已揽收") != -1) {
							var strArr = ele.AcceptTime.trim().split(" ");
							dateTimeArr = strArr[0].split("-");
							dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
							timeArr = strArr[1].split(":");
							time = timeArr[0] + ":" + timeArr[1];
							achievement = ele.AcceptStation.trim();
							title = "已揽件";
							src = 'img/icon5.png';
							obj.date = dateTime;
							obj.time = time;
							obj.src = src;
							obj.title = title;
							obj.achievement = achievement;
							dimeAxis.push(obj);
//							console.log(dimeAxis);
						};
						
						//运输中
//						for (var i = 0; i < arr1.length; i++) {
//							var obj = {};
//							if (i == (arr1.length - 1) ) {						
//								achievement = arr1[i].trim();
//								title = "运输中";
//								src = 'img/icon3.png';
//								obj.date = dateTime;
//								obj.time = time;
//								obj.src = src;
//								obj.title = title;
//								obj.achievement = achievement;
//								dimeAxis.push(obj);
//							}else{
//								achievement = arr1[i].trim();
//								title = "";
//								src = 'img/icon4.png';
//								obj.date = dateTime;
//								obj.time = time;
//								obj.src = src;
//								obj.title = title;
//								obj.achievement = achievement;
//								dimeAxis.push(obj);
//							}
//						}
						if (ele.AcceptStation.indexOf("已发出") != -1 || ele.AcceptStation.indexOf("已到达") != -1 || ele.AcceptStation.indexOf("发往") != -1 || ele.AcceptStation.indexOf("下一站") != -1 || ele.AcceptStation.indexOf("快件离开") != -1) {
							achievement = ele.AcceptStation.trim();
							arr1.push(achievement)
							arr.push(ele.AcceptTime)
//							title = "运输中";
//							src = 'img/icon3.png';
//							obj.date = dateTime;
//							obj.time = time;
//							obj.src = src;
//							obj.title = title;
//							obj.achievement = achievement;
//							dimeAxis.push(obj);
//							console.log(dimeAxis);
						};
						
						if (ele.AcceptStation.indexOf("已离开") != -1 || ele.AcceptStation.indexOf("已收入") != -1 || ele.AcceptStation.indexOf("快件已经到达") != -1 || ele.AcceptStation.indexOf("下一站") != -1) {
							achievement = ele.AcceptStation.trim();
							arr1.push(achievement)
							arr.push(ele.AcceptTime)
//							title = "运输中";
//							src = 'img/icon4.png';
//							obj.date = dateTime;
//							obj.time = time;
//							obj.src = src;
//							obj.title = title;
//							obj.achievement = achievement;
//							dimeAxis.push(obj);
//							console.log(dimeAxis);
						};
						
//						//派件
//						if (ele.AcceptStation.indexOf("派件人") != -1 || ele.AcceptStation.indexOf("派件员") != -1) {
//							achievement = ele.AcceptStation.trim();
//							title = "派送中";
//							src = 'img/icon2.png';
//							obj.date = dateTime;
//							obj.time = time;
//							obj.src = src;
//							obj.title = title;
//							obj.achievement = achievement;
//							dimeAxis.push(obj);
////							console.log(dimeAxis);
//						};
//						
//						//签收
//						if (ele.AcceptStation.indexOf("签收人") != -1 || ele.AcceptStation.indexOf("已签收") != -1) {
//							achievement = ele.AcceptStation.trim();
//							title = "已签收";
//							src = 'img/icon1.png';
//							obj.date = dateTime;
//							obj.time = time;
//							obj.src = src;
//							obj.title = title;
//							obj.achievement = achievement;
//							dimeAxis.push(obj);
////							console.log(dimeAxis);
//						};
//						console.log(obj);
//						console.log(dimeAxis);
//						function handleData(strArr1, titleVal, url){
//							for(var i = 0; i < strArr1.length; i++){
//								if (ele.AcceptStation.indexOf(strArr1[i]) != -1 && index == 5) {
//									title = "";
//									src = 'img/icon4.png';
//								}else if(ele.AcceptStation.indexOf(strArr1[i]) != -1 && index == 3){
//									title = "";
//									src = 'img/icon4.png';
//								}else{
//									if(ele.AcceptStation.indexOf(strArr1[i]) != -1){
//	//									var strArr = ele.AcceptStation.trim().split(str);
//										var strArr2 = ele.AcceptStation.trim();
//										achievement = strArr2;
//										title = titleVal;
//	//									achievement = strArr.length < 1 ? strArr[0] : strArr[0] + strArr[1];
//										src = url;
//									}
//								}
//							}
//							return {
//								title: title,
//								achievement: achievement,
//								src: src
//							}
//						}
//						handleData(["已收件", "已揽收"], "已发货", 'img/icon5.png');
//						handleData(["已打包", "已到达", "快件已经到达"], "已揽件", 'img/icon3.png');
//						handleData(["已发出", "已离开", "快件离开"], "", 'img/icon4.png');
//						handleData(["已收入", "已到达", "快件已经到达"], "", 'img/icon4.png');
//						handleData(["已发出", "已离开", "快件离开"], "", 'img/icon4.png');
//						handleData(["已收入", "已到达", "快件已经到达"], "", 'img/icon4.png');
//						handleData(["已发出", "已离开", "快件离开"], "", 'img/icon4.png');
//						handleData(["已收入", "已到达", "快件已经到达"], "运输中", 'img/icon3.png');
//						handleData(["派件人", "派件员", "正在第1次派件"], "派送中", 'img/icon2.png');
//						handleData(["签收人", "已签收"], "已签收", 'img/icon1.png');
//						handleData(["派件人", "派件员", "正在第1次派件"], "派送中", 'img/icon2.png');
//						handleData(["签收人", "已签收"], "已签收", 'img/icon1.png');
					}
//					obj.date = dateTime;
//					obj.time = time;
//					obj.src = src;
//					obj.title = title;
//					obj.achievement = achievement;
//					dimeAxis.push(obj);
//					console.log(dimeAxis);					
				});
				console.log(dimeAxis);
				console.log(arr1);
				for (var i = 0; i < arr1.length; i++) {
					var obj = {};
					if (i == (arr1.length - 1) ) {	
						var strArr = arr[i].trim().split(" ");
						dateTimeArr = strArr[0].split("-");
						dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
						timeArr = strArr[1].split(":");
						time = timeArr[0] + ":" + timeArr[1];
						achievement = arr1[i].trim();
						title = "运输中";
						src = 'img/icon3.png';
						obj.date = dateTime;
						obj.time = time;
						obj.src = src;
						obj.title = title;
						obj.achievement = achievement;
						dimeAxis.push(obj);
					}else{
						var strArr = arr[i].trim().split(" ");
						dateTimeArr = strArr[0].split("-");
						dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
						timeArr = strArr[1].split(":");
						time = timeArr[0] + ":" + timeArr[1];
						achievement = arr1[i].trim();
						title = " ";
						src = 'img/icon4.png';
						obj.date = dateTime;
						obj.time = time;
						obj.src = src;
						obj.title = title;
						obj.achievement = achievement;
						dimeAxis.push(obj);
					}
				}
				dataList.forEach(function(ele, index){
					
					var obj = {};
					//派件
					if (ele.AcceptStation.indexOf("派件人") != -1 || ele.AcceptStation.indexOf("派件员") != -1) {
						var strArr = ele.AcceptTime.trim().split(" ");
						dateTimeArr = strArr[0].split("-");
						dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
						timeArr = strArr[1].split(":");
						time = timeArr[0] + ":" + timeArr[1];
						achievement = ele.AcceptStation.trim();
						title = "派送中";
						src = 'img/icon2.png';
						obj.date = dateTime;
						obj.time = time;
						obj.src = src;
						obj.title = title;
						obj.achievement = achievement;
						dimeAxis.push(obj);
//							console.log(dimeAxis);
					};
						
					//签收
					if (ele.AcceptStation.indexOf("签收人") != -1 || ele.AcceptStation.indexOf("已签收") != -1) {
						var strArr = ele.AcceptTime.trim().split(" ");
						dateTimeArr = strArr[0].split("-");
						dateTime = dateTimeArr[1] + "-" + dateTimeArr[2];
						timeArr = strArr[1].split(":");
						time = timeArr[0] + ":" + timeArr[1];
						achievement = ele.AcceptStation.trim();
						title = "已签收";
						src = 'img/icon1.png';
						obj.date = dateTime;
						obj.time = time;
						obj.src = src;
						obj.title = title;
						obj.achievement = achievement;
						dimeAxis.push(obj);
//							console.log(dimeAxis);
					};
				})
				dimeAxis = dimeAxis.reverse();
//				console.log(dimeAxis);
				$.each(dimeAxis, function(i, e) {
					if(i == (dimeAxis.length - 1) ){
//						console.log("asad")					
						if(e.src == "img/icon4.png"){
							var html = '<li class="time-item">' +
							'<div class="time">' + 
								'<div>' + e.date + '</div>' + 
								'<div>' + e.time + '</div>' + 
							'</div>' +
							'<div class="iconBox" style="left:46px">' +
								'<img src="' + e.src + '" class="smallIcon" />' +
							'</div>' +
							'<div class="title">' + e.title + '</div>' +
							'<div class="mainTitle">' + e.achievement + '</div>' +
							'</li>';
						}else{
							var html = '<li class="time-item">' +
							'<div class="time">' + 
								'<div>' + e.date + '</div>' + 
								'<div>' + e.time + '</div>' + 
							'</div>' +
							'<div class="iconBox">' +
								'<img src="' + e.src + '" />' +
							'</div>' +
							'<div class="title">' + e.title + '</div>' +
							'<div class="mainTitle">' + e.achievement + '</div>' +
							'</li>';
						}
					}else{
						if(e.src == "img/icon4.png"){
							var html = '<li class="time-item line">' +
							'<div class="time">' + 
								'<div>' + e.date + '</div>' + 
								'<div>' + e.time + '</div>' + 
							'</div>' +
							'<div class="iconBox" style="left:46px">' +
								'<img src="' + e.src + '" class="smallIcon" />' +
							'</div>' +
							'<div class="title">' + e.title + '</div>' +
							'<div class="mainTitle">' + e.achievement + '</div>' +
							'</li>';
						}else{
							var html = '<li class="time-item line">' +
							'<div class="time">' + 
								'<div>' + e.date + '</div>' + 
								'<div>' + e.time + '</div>' + 
							'</div>' +
							'<div class="iconBox">' +
								'<img src="' + e.src + '" />' +
							'</div>' +
							'<div class="title">' + e.title + '</div>' +
							'<div class="mainTitle">' + e.achievement + '</div>' +
							'</li>';
						}
					}
					$('.time-line').append(html);
				});
			},
			error: function(data){
				console.log(data);
			}
		});
	});
