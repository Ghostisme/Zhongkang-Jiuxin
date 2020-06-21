$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn", "../patient/patient.html");//返回按钮->患者管理页
//	pageGo(".listBox", "../pleaseVisit/pleaseVisit.html");//内容列表选项跳转页面
	var sessionId = sessionStorage.getItem("sessionId");
	//		分页
	var currentPage = 1;
	var offsetPage = 0; //传输的页起始条数
	var showNum = 10; //页面需要显示的条数
	var doctoNum_pages;
	initData();
	//点击分页页数
	$(document).delegate(".flipOver", 'click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		currentPage = parseInt($(this).attr("pageId"));
		offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
		initData();
		window.scrollTo(0, 0);
	});
	//点击上一页
	$(document).delegate("#prev", 'click', function() {
		if($(".flipOver.active").prev().attr("id") == "prev") {
			return true
		} else {
			var page = parseInt($(".flipOver.active").attr("pageid")) - 1;
			$(".flipOver.active").prev().addClass("active").siblings().removeClass("active")
		}
		currentPage = page;
		offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
		initData();
		window.scrollTo(0, 0);
	});

	//点击下一页
	$(document).delegate("#Next", 'click', function() {
		if($(".flipOver.active").next().attr("id") == "Next") {
			return true
		} else {
			var page = parseInt($(".flipOver.active").attr("pageid")) + 1;
			$(".flipOver.active").next().addClass("active").siblings().removeClass("active")
		}
		currentPage = page;
		offsetPage = (currentPage - 1) * 10; //（页码-1）*每页显示条数
		initData();
		window.scrollTo(0, 0);
	});
		//点击分页跳转页按钮
    $(document).delegate(".srueToJumpPageBtn",'click',function(){
        currentPage = parseInt($(".toPageNum").val().trim());
        offsetPage = (currentPage-1)*10;//（页码-1）*每页显示条数
        initData();
        window.scrollTo(0,0);
    });
	//数据请求
	function initData(){
		//获取dom插入盒子
//		var oWrapper = $(".content");
		var oWrapper = $(".oWrapper");
		//初始化表格
		oWrapper.html(
			'<tr class="tpl">'
				+'<td>'
					+'<img src="../../img/default.png">'
				+'</td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td>'
					+'<button type="button" class="querybtn btnTextColor">查看</button>'
				+'</td>'
				+'<td></td>'
			+'</tr>'
		);
		$.ajax({
			type:"get",
	//		url:"http://192.31.10.62:8001/oa/patinfoDiagnosis/list",
			url: config + "/oa/patinfoDiagnosis/list",
			async:true,
			data: {
				'sessionId': sessionId,
				"offset": offsetPage, //（页码-1）*每页显示条数
				"limit": showNum //每页显示的条数	
			},
			success: function(data){
				console.log(data);
				var dataArr = data.resultMap.patinfoDiagnosisList;
				doctoNum_pages = Math.ceil(parseInt(data.resultMap.total) / 10); //总条数除以每页十条数据为总页码
				var pageHtml = page(parseInt(currentPage), doctoNum_pages);
				$(".doctorpageN").html(pageHtml);
				
				//获取当前时间
				var oDate = new Date().getFullYear();
				
				//补零操作
				function addZero(num){
				    if(parseInt(num) < 10){
				        num = '0' + num;
				    }
				    return num;
				}
				dataArr.forEach(function(ele, index){
					//获取克隆dom
					var oCloneDom = $(".tpl").clone().removeClass("tpl");
					
					//获取就诊时间
					var diagnosisDate = new Date(ele.diagnosisTime),
					//就诊年
					diagnosisYear = diagnosisDate.getFullYear(),
					//就诊月
					diagnosisMonth = diagnosisDate.getMonth() + 1,
					//就诊日
					diagnosisDay = diagnosisDate.getDate(),
					//就诊小时
					diagnosisHour = diagnosisDate.getHours(),
					//就诊分钟
				    diagnosisMin = diagnosisDate.getMinutes(),
				    //就诊秒
				    diagnosisSen = diagnosisDate.getSeconds(),
				    //最终就诊时间 年-月-日 时：分：秒
		//			diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin) + ':' +addZero(diagnosisSen);
				    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin);
					//数据渲染
					//头像赋值
					if (ele.headImage == null) {
						ele.headImage = "../../img/user.png";
					};
	//				oCloneDom
	//					.find(".imgBox")
	//						.find("img")
	//							.attr("src", ele.headImage);
					oCloneDom
						.find("td")
							.find("img")
								.attr("src", ele.headImage);
					//最近一次就诊时间赋值
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("p")
	//							.eq(0)
	//								.find("span")
	//									.text(diagnosisTime);
					oCloneDom
						.find("td")
							.eq(1)
								.text(diagnosisTime)
									.next()
										.text(ele.fkDeptName)
											.next()
												.text(ele.patinfoName)
													.next()
														.text(ele.sex)
															.next()
																.text(ele.memo)
																	.next()
																		.next()
																			.text(ele.id);
					//机构赋值
					if(ele.fkDeptName == null){
						ele.fkDeptName = "暂无";
					};
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("p")
	//							.eq(1)
	//								.find("span")
	//									.eq(1)
	//										.text(ele.fkDeptName);	
					//患者姓名赋值
					if(ele.patinfoName == null){
						ele.patinfoName = "暂无";
					};
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("p")
	//							.eq(2)
	//								.find("span")
	//									.eq(1)
	//										.text(ele.patinfoName);	
					//性别赋值
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("p")
	//							.eq(3)
	//								.find("span")
	//									.eq(1)
	//										.text(ele.sex);	
					//服务概要赋值
					if(ele.memo == null){
						ele.memo = "暂无";
					};
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("p")
	//							.eq(4)
	//								.find("span")
	//									.eq(1)
	//										.text(ele.memo);
					//患者ID
	//				oCloneDom
	//					.find(".centerContent")
	//						.find("input").val(ele.id);
					//数据插入											
					oWrapper.append(oCloneDom);																
				})
				var medicalContent = $(".content").find(".listBox").find("table").find("tbody").find("tr").find("td").find(".querybtn");
				$(medicalContent).click(function(){				
					//就诊ID
	//				console.log($(".diagnosisid").val());
					var diagnosisId = $(this).parent("td").next().text();
	//				var diagnosisId = $(".diagnosisid").val();
	//				console.log($(this).parent("td").next());
	//				console.log(diagnosisId);
					localStorage.setItem("diagnosisid", diagnosisId);				
	//				$(location).prop('href', "../pleaseVisit/pleaseVisit.html");
					RefreshIframe("page/pleaseVisit/pleaseVisit.html","pleaseVisit");
				})
			},
			error: function(data){
				console.log(data);
			}
		});
	}
})
