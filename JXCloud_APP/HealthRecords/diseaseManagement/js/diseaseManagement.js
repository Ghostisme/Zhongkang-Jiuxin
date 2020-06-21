$(document).ready(function(){
	//页面跳转
	pageGo(".gobackBtn","../healthrecord/healthrecord.html");//返回按钮->健康记录页
	pageGo(".hFamilyHistory", "../hypertensionFamilyHistory/hypertensionFamilyHistory.html");//高血压家族史
	pageGo(".hComplication", "../hypertensioncomplication/hypertensionComplication.html");//高血压并发症
	pageGo(".dFamilyHistory", "../diabetesFamilyHistory/diabetesFamilyHistory.html");//糖尿病家族史
	pageGo(".dScure", "../diabetescure/diabetescure.html");//糖尿病健康状况
	pageGo(".dControl", "../diabetescontrol/diabetescontrol.html");//糖尿病控制
	pageGo(".dComplication", "../diabetescomplication/diabetescomplication.html");//糖尿病并发症
	var eleId = sessionStorage.getItem("id");
	//高血压,糖尿病有无保存
	$(".click").click(function(){
		// console.log($(".isPressure").val());
		// console.log($(".isDiabetes").val());
		console.log($(".diabetes").find("span").attr("data-choose"));
		$.ajax({
			type:"get",
			url: config + "/oa/patinfo/updateOther",
			async:true,
			data:{
				"id": eleId,
				"isPressure": $(".hypertension").find("span").attr("data-choose"),
				"isDiabetes": $(".diabetes").find("span").attr("data-choose")
			},
			success: function(data){
				console.log(data);
				if(data.status == 1){
					alert(data.message);				
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
	})
	//数据渲染
	var eleId = sessionStorage.getItem("id");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoChronicDiseases/toDiseasesMain",
		async:true,
		data:{
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfo;
			if (dataList.isPressure == 0) {
				$(".hypertension").find("span").removeClass("switch-on").addClass("switch-off");
				$(".hypertension").find("span").attr("data-choose", "0");
			} else{
				$(".hypertension").find(".switch-off").click();
				$(".hypertension").find("span").removeClass("switch-off").addClass("switch-on");
				$(".hypertension").find("span").attr("data-choose", "1");
			}
			if (dataList.isDiabetes == 0) {
				$(".diabetes").find("span").removeClass("switch-on").addClass("switch-off");
				$(".diabetes").find("span").attr("data-choose", "0");
			} else{
				$(".diabetes").find(".switch-off").click();
				$(".diabetes").find("span").removeClass("switch-off").addClass("switch-on");
				$(".diabetes").find("span").attr("data-choose", "1");
			}
			var familyHistoryList = data.resultMap.gxyjzsList;
			var familyComplicationList = data.resultMap.gxybfzList;
			var diabetesFamilyHistoryList = data.resultMap.xtjzsList;
			var diabetesControlList = data.resultMap.xtqkList;
			var diabetesComplicationList = data.resultMap.xtbfzList;
			function dataLoop(list){
				var str = "";
				for (var i = 0; i < list.length; i++) {
					str += list[i].situation + "、";
				}
				return str;
			}
			//高血压家族史
			var familyHistoryStr = dataLoop(familyHistoryList);
			$(".hFamilyHistory").find("div").find("p").eq(1).text(familyHistoryStr);
			//高血压并发症
			var familyComplicationStr = dataLoop(familyComplicationList);
			$(".hComplication").find("div").find("p").eq(1).text(familyComplicationStr);
			//糖尿病家族史
			var diabetesFamilyHistoryStr = dataLoop(diabetesFamilyHistoryList);
			$(".dFamilyHistory").find("div").find("p").eq(1).text(diabetesFamilyHistoryStr);
			//糖尿病健康状况
			dataList.diabetesType = dataList.diabetesType || "暂无";
			dataList.diabetesTime = dataList.diabetesTime || "暂无";
			dataList.diabetesWay = dataList.diabetesWay || "暂无";
			var diabetesScureStr = dataList.diabetesType + "、" + dataList.diabetesTime + "、" + dataList.diabetesWay;
			$(".dScure").find("div").find("p").eq(1).text(diabetesScureStr);
			//糖尿病控制
			var diabetesControlStr = dataLoop(diabetesControlList);			
			$(".dControl").find("div").find("p").eq(1).text(diabetesControlStr);
			//糖尿病并发症
			var diabetesComplicationStr = dataLoop(diabetesComplicationList);
			$(".dComplication").find("div").find("p").eq(1).text(diabetesComplicationStr);
		},
		error: function(data){
			console.log(data);
		}
	});
	
	
})
