$(document).ready(function(){
	//页面跳转
//	pageGo(".gobackBtn", "../visitingRecord/visitingRecord.html");//返回按钮->就诊记录页
	//数据渲染
	var diagnosisId = localStorage.getItem("diagnosisid");
	console.log(diagnosisId);
	$.ajax({
		type:"get",
//		url:"http://192.31.10.62:8001/oa/patinfoDiagnosis/get",
		url: config + "/oa/patinfoDiagnosis/get",
		async:true,
		data: {
			"id": diagnosisId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfoDiagnosis;
			//补零操作
			function addZero(num){
			    if(parseInt(num) < 10){
			        num = '0' + num;
			    }
			    return num;
			}
			//获取就诊时间
			var diagnosisDate = new Date(dataList.diagnosisTime),
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
			$(".basic-data-box")
				.find("div")
					.eq(1)
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.text(diagnosisTime);
			//就诊机构					
			$(".basic-data-box")
				.find("div")
					.eq(1)
						.find("p")
							.eq(1)
								.find("span")
									.eq(1)
										.text(dataList.fkDeptName);	
			//就诊患者					
			$(".basic-data-box")
				.find("div")
					.eq(0)
						.find("p")
							.eq(0)
								.find("span")
									.eq(1)
										.text(dataList.patinfoName);	
			//就诊性别
			$(".basic-data-box")
				.find("div")
					.eq(0)
						.find("p")
							.eq(1)
								.find("span")
									.eq(1)
										.text(dataList.sex);
			//就诊年龄
			$(".basic-data-box")
				.find("div")
					.eq(0)
						.find("p")
							.eq(2)
								.find("span")
									.eq(1)
										.text(dataList.age);
			//就诊医生
			$(".basic-data-box")
				.find("div")
					.eq(1)
						.find("p")
							.eq(0)
								.find("span")
									.eq(1)
										.text(dataList.diagnosisName);
			//测量项目
			var measureList = dataList.projectList;
			measureList.forEach(function(ele, index){
				var ocloneDom = $(".bp-tpl").clone().removeClass("bp-tpl");
				ocloneDom
					.find("p")
						.find("span")
							.eq(0)
								.text(ele.type)
									.next()
										.text(ele.fkProjectValue);
				$(".bloodPressureBox").append(ocloneDom);	
			})
			//处方数据渲染
			//判断药品列表和图片列表
			var dataDrug = dataList.drugList;
			var tabWrapper = $(".tabWrapper");
			if (dataDrug.length == 0) {
				$(".tableContent").append("<div></div>");
			} else{
				dataDrug.forEach(function(ele, index){
					var cloneDom = $(".tabtpl").clone().removeClass("tabtpl");
//						$(".tpl1").css({"display": "none"});
					cloneDom
						.find("td")
							.eq(0)
								.text(ele.drugName)
									.next()
										.text(ele.chemistryName)
											.next()
												.text(ele.firmName)
													.next()
														.text(ele.dosage)
															.next()
																.text(ele.memo);
					
					//药品文字数据插入	
					$(".tableContent").append(tabWrapper.append(cloneDom));
				})
			}
			var dataDrugImg = dataList.drugImgList;
			if (dataDrugImg.length == 0) {
				$(".imglist").append('<img src="../../img/user.png" alt="这是一个处方图片" title="这是一个处方图片">');
			} else{
				dataDrugImg.forEach(function(ele, index){
//						console.log(ele);
					var imgCloneDom = $(".imgtpl").clone().removeClass("imgtpl");
//						var imgCloneDom = $("<img src='" + ele.imgUrl + "' alt='这是一个图片' title='这是一个图片' />");
//						$(".imgtpl").css({"display": "none"});						
					imgCloneDom.attr("src", ele.imgUrl);
					//药品图片数据插入
					$(".prescription-img").append(imgCloneDom);
				})
				
			}
		},
		error: function(data){
			console.log(data);
		}
	});
})