$(document).ready(function(){
	var username;
	var searchNum;
	var sessionId = sessionStorage.getItem("sessionId");
	var username;
	var sex;
	var age;
	// console.log(sessionId);
	var year = sessionStorage.getItem("sendYear");
	var month = sessionStorage.getItem("sendMonth");
	var day = sessionStorage.getItem("sendDay");
	var dateTime;
	if(year == "0"){
		year = "";
		dateTime = "";
	}else{
		dateTime = year + "-" + month + "-" + day;
	}
	if(month == "0"){
		month = "";
		dateTime = year;
	}else{
		dateTime = year + "-" + month + "-" + day;
	}
	if(day == "0"){
		day = "";
		dateTime = year + "-" + month;
	}else{
		dateTime = year + "-" + month + "-" + day;
	}
	
	if(dateTime == "0-0-0" || dateTime == "null-null-null"){
		dateTime = "";
	}else{
		dateTime = dateTime;
	}
	console.log(dateTime);
	//url截取字段
	function parseUrl(url) {
//	    var pattern = /(\w+)=([^\#&]*)/ig,
//	    parames = {};
		var pattern = /([?&=]+)=([?&=])/g,
//		parames = {};
//		parames = [];
	    url = url || window.location.href;
	    // console.log(url);
//	    url.replace(pattern, function (attr, key, value) {
//	    	parames[key] = decodeURI(value);
//	    });
//		url.match(pattern, function (attr, key, value){
//			parames[key] = decodeURI(value);
//		})
		var a = url.split("?");
//	    console.log(parames);
//	    console.log(a);
	    var b = a[1].split("&");
	    // console.log(b);
	    var obj = {};
	    for(var i = 0; i < b.length; i++){
	    	var res = b[i].split("=");
	    	// console.log(res);
	    	obj[res[0]] = res[1];
	    }
	    // console.log(obj);
	    return obj;
//	    return parames;
	}
//	 
	// var p = parseUrl(window.location.href) || '';
	// console.log(p);
	
	//搜索框聚焦失焦提示文字切换
//	$(".searchinput").focus(function(){
//		this.placeholder = "";
//	})
//	$("#username").blur(function(){
////		this.placeholder = "输入患者、身份证号、手机号";
//		username = $(".username").val();
//		searchNum = $(".searchNum").val();
//	})
//	$(".querybtn")
	//查看按钮点击
	$(".querybtn").click(function(){
		username = $("#username").val();
		sex = $("#sex").val();
		age = $("#age").val();
		initData();
	})
	//清空按钮点击
	$(".resetbtn").click(function(){
//		username = $("#username").val("");
//		sex = $("#sex").val("");
//		age = $("#age").val("");
		if ($("#username").val() != "") {
			$("#username").val("");
		};
		if ($("#sex").val() != "") {
			$("#sex").val("");
		};
		if ($("#age").val() != "") {
			$("#age").val("");
		};
		username = $("#username").val();
		sex = $("#sex").val();
		age = $("#age").val();
		initData();
		$(".addbtn").hide();
		$(".overbtn").show();
	})
	//新增模态框确定按钮点击
	$("#sumbtn").click(function(){
//		var a = document.getElementById('registration').contentDocument.getElementsByTagName('username');
//		var a = window.frames[0].getElementById("username");
//		var usernameVal = document.getElementById('registration').contentWindow.document.getElementById("username");
//		var phoneVal = document.getElementById('registration').contentWindow.document.getElementById("username");
		var registrationIfram = document.getElementById('registration').contentWindow;
		var usernameVal = registrationIfram.$(".username");
		var phoneVal = registrationIfram.$(".phone");
		var sexVal = registrationIfram.$(".active");
		var ageVal = registrationIfram.$(".age");
		var idCodeVal = registrationIfram.$(".iDcard");
		if (usernameVal == "") {
			registrationIfram.$("#username").after('<label id="contactTel-error" class="error" for="contactTel"><i class="fa fa-times-circle"></i>  请输入正确手机号</label>')
			return false;
		}
		$(".addbtn").hide();
		$(".overbtn").show();
//		console.log(b);
//		$.ajax({
//			type: "get",
////			url: "http://192.31.10.62:8001/oa/patinfo/save",
//			url: config + "/oa/patinfo/save",
//			async: true,
//			dataType: "JSON",
//			contentType: "application/json; charset=utf-8",//传到后台的数据格式
//			data:{
//				'sessionId': sessionId,
//				'name': usernameVal.val(),
//				'mobile': phoneVal.val(),
//				'sex': sexVal.next('span').text(),
//				'age': ageVal.val(),
//				'idCode': idCodeVal.val()
//			},
//			success: function(data){
//				console.log(data);
//				if(data.status == 1){
//					alert(data.message);	
////					$('#myModal').modal('hide');
//					$(location).prop('href', "../patient/patient.html");
//					$('#registrationModal').modal('hide');
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
	})
	
	//		分页
	var currentPage = 1;
	var offsetPage = 0; //传输的页起始条数
	var showNum = 10; //页面需要显示的条数
	var doctoNum_pages;
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
			$(".flipOver.active").prev().addClass("active").siblings().removeClass("active");
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
			$(".flipOver.active").next().addClass("active").siblings().removeClass("active");
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
    initData();
	//数据渲染
	function initData(){
		//处理对象
//		var sendObj = sendObj;
//		var dateTime = sendObj.year + "-" + sendObj.month + "-" + sendObj.day;
//		console.log(dateTime);
		//获取dom插入盒子
		var oWrapper = $(".oWrapper");
		//初始化表格
		oWrapper.html(
			'<tr class="tpl">'
				+'<td></td>'
				+'<td>'
					+'<img src="../../img/user.png" class="headicon">'
				+'</td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td></td>'
				+'<td>'
					+'<button type="button" class="query btnTextColor">查看</button>'
//					+'<button type="button" class="delbtn btnTextColor">删除</button>'
				+'</td>'
				+'<td></td>'
				+'<td></td>'
			+'</tr>'
		);
		// console.log(sex);
		// console.log(showNum);
		
		$.ajax({
			type: "get",
	//		url: "http://192.31.10.62:8001/oa/patinfo/list",
			url: config + "/oa/patinfo/list",
			// url: "http://192.31.10.166:8001/oa/patinfo/list",
			async: true,
			data: {
				'sessionId': sessionId,
				"nameLike": username,
				'sex': sex,
				'age': age,
				"allYear": dateTime,
//				'year': sendObj.year,
//				'month': sendObj.month,
//				'day': "10"
				"offset": offsetPage, //（页码-1）*每页显示条数
				"limit": showNum //每页显示的条数	
			},
			success: function(data){
//				console.log(data);
				console.log(data);
				//获取总计dom元素并插入总数据
				$(".allnum").text("共计：" + data.resultMap.total + "人");
				doctoNum_pages = Math.ceil(parseInt(data.resultMap.total) / 10); //总条数除以每页十条数据为总页码
				var pageHtml = page(parseInt(currentPage), doctoNum_pages);
				$(".doctorpageN").html(pageHtml);
				// 结束就诊人ID存储
				var overData = data.resultMap.patinfoDiagnosis;
				$("#overId").val(overData.fkPatinfoId);
				var overStatus = data.resultMap.jzCount;
				if (overStatus == 0 || overData == null) {
					$(".addbtn").show();
					$(".overbtn").hide();
				} else{
					$(".addbtn").hide();
					$(".overbtn").show();
				}
				//找到数组数据
				var dataList = data.resultMap.patinfoList;
				//获取dom插入盒子
//				var oWrapper = $(".oWrapper");
				//补零操作
				function addZero(num){
				    if(parseInt(num) < 10){
				        num = '0' + num;
				    }
				    return num;
				}
				//获取当前时间
				var oDate = new Date().getFullYear();
				//循环数组
				dataList.forEach(function(ele, index){
					//获取克隆dom
					var oCloneDom = $(".tpl").clone().removeClass("tpl");
					//获取生日时间
	//				var birthdayDate = new Date(ele.birthday),
					//计算生日年份
	//				birthdayYear = birthdayDate.getFullYear(),
					//计算年龄
	//				birthdayTime = oDate - birthdayYear;
					//判断头像有无
					if (ele.headImage == null) {
						ele.headImage = '../../img/user.png';
					}
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
	//			    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin) + ':' +addZero(diagnosisSen);
				    diagnosisTime = diagnosisYear + '-' + addZero(diagnosisMonth) + '-' + addZero(diagnosisDay) + ' ' + addZero(diagnosisHour) + ':' +addZero(diagnosisMin);
					//数据渲染
					//ID渲染
					oCloneDom
						.find("td")
							.eq(0)
								.text(ele.fkUserId);
					//头像克隆
					oCloneDom
						.find("td")
							.eq(1)
								.find("img")
									.attr("src",ele.headImage);
					//数据克隆
					oCloneDom
						.find("td")
							.eq(1)							
								.next()
									.text(ele.name)
										.next()
											.text(ele.sex)
												.next()
													.text(ele.age)
														.next()
															.text(ele.idCode)
																.next()
																	.text(ele.mobile)
																		.next()
																			.next()
																				.text(ele.id)
																					.next()
																						.text(ele.diagnosisId);
					//数据插入											
					oWrapper.append(oCloneDom);									
				})
				
				var healthContent = $(".tableclick").find("tbody").find("tr").find("td").find(".query");
	//			pageGo(healthContent, "../healthrecord/healthrecord.html");//表格列表跳转健康记录页
				$(healthContent).click(function(){
					var eleId = $(this).parent("td").next().text();
					var eleDisid = $(this).parent("td").next().next().text();
					var fkUserId = $(this).parent("td").parent("tr").find("td").eq(0).text();
					// console.log(eleDisid,"asdasdasd123");
					localStorage.setItem("id",eleId);
					localStorage.setItem("disid",eleDisid);
					localStorage.setItem("fkUserId",fkUserId);
	//				console.log(this);				
	//				$(location).prop('href', "../health/health.html");
					RefreshIframe("page/health/health.html","healthPge");
				})
			},
			error: function(data){
				console.log(data);
			}
		});
	}
	// 结束就诊
	$(".overbtn").click(function(){
		// var registrationIfram = document.getElementById('registrationOverModal').contentWindow;
		// var id = $(".tableclick").find("tbody").find("tr").find("td").eq(0).text();
		// alert(id)
		// initData(id);
	})
	//页面跳转
	
//	pageGo(".gobackBtn", "首页菜单");//返回按钮页面跳转
//	var more = $(".moreBtn")
	$(".moreBtn").click(function(){
//		$(".moreContent").css({"right":"0.1rem"});
//		$(".moreContent").css({"display":"block"});
		$(".moreContent").toggle();
		pageGo(".registerBtn", "../registrationVisits/registrationVisits.html");//登记按钮页面跳转
		pageGo(".medicalBtn", "../visitingRecord/visitingRecord.html");//就诊记录按钮页面跳转		
	})
	//数据表格分页
//	$(".dataTables-example").dataTable();
//	var currentPage = 1;
//	var num_pages;
//	num_pages = Math.ceil(parseInt(listTotal)/10);
//	var pageHtml = page(parseInt(currentPage),num_pages);
//	$(".patientpageN").html(pageHtml);
//	var oTable = $("#editable").dataTable();
//	oTable.$("td").editable("../example_ajax.php", {
//		"callback": function(sValue, y) {
//			var aPos = oTable.fnGetPosition(this);
//			oTable.fnUpdate(sValue, aPos[0], aPos[1])
//		},
//		"submitdata": function(value, settings) {
//			return {
//				"row_id": this.parentNode.getAttribute("id"),
//				"column": oTable.fnGetPosition(this)[2]
//			}
//		},
//		"width": "90%",
//		"height": "100%"
//	})
//	function fnClickAddRow() {
//		$("#editable").dataTable().fnAddData(["Custom row", "New row", "New row", "New row", "New row"])
//	};
})