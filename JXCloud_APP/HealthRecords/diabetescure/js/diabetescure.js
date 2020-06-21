$(document).ready(function(){
	//页面跳转
	// pageGo(".gobackBtn","../diseaseManagement/diseaseManagement.html");//返回按钮->病症管理页
	//糖尿病类型选择交互
	var diseaseType = ['1型糖尿病','2型糖尿病','妊娠糖尿病','特殊型糖尿病','非糖尿病'];
	var mobileSelect1 = new MobileSelect({
	    trigger: '.trigger1', 
	    title: '糖尿病类型',  
	    wheels: [
	                {data: diseaseType}
	            ],
	    position:[2] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
	//确诊时间交互
	var yearArr = ['2019年','2018年','2017年','2016年','2015年','2014年','2013年']
	var mobileSelect2 = new MobileSelect({
	    trigger: '.trigger2', 
	    title: '确诊时间',  
	    wheels: [
	                {data: yearArr}
	            ],
	    position:[2] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
	//治疗方式交互
	var yearArr1 = ['饮食控制','运动','口服药','胰岛素']
	var mobileSelect3 = new MobileSelect({
	    trigger: '.trigger3', 
	    title: '治疗方式',  
	    wheels: [
	                {data: yearArr1}
	            ],
	    position:[2] //初始化定位 打开时默认选中的哪个  如果不填默认为0
	});
//	var status = $(this).find("i").attr("data-checked");
//	$(".trigger3").click(function(){
//		$(".mask").addClass("mask-show");
//		$(".maskbox").addClass("maskbox-show");
//	});
//	$(".cancelBtn").click(function(){
//		$(".mask").removeClass("mask-show");
//		$(".maskbox").removeClass("maskbox-show");
//	});
//	$(".mask").click(function(){
//		$(".mask").removeClass("mask-show");
//		$(".maskbox").removeClass("maskbox-show");
//	});
//	$(".checklist").find("ul").find("li").click(function(){
////		$(this).find("i").css({"color":"#2abf21"});		
//		if (status == 0) {
//			$(this).find("i").attr("data-checked", "1");
//			$(this).find("i").css({"color":"#2abf21"});
//		}else{
//			$(this).find("i").attr("data-checked", "0");
//			$(this).find("i").css({"color":"#C3C3C3"});
//		}
//	});
//	$('body').click(function(e) {
//	    var target = $(e.target);
//	    if(target.is('.mask') && !target.is(".maskbox")) {
//	       $(".mask").removeClass("maskbox-show");
//	    }
//	});
	
	//数据渲染
	var eleId = sessionStorage.getItem("id");
	$.ajax({
		type:"get",
		url: config + "/oa/patinfoChronicDiseases/toDiabetes",
		async:true,
		data: {
			"id": eleId
		},
		success: function(data){
			console.log(data);
			var dataList = data.resultMap.patinfo;
			if (dataList.diabetesType == null) {
				$(".trigger1").text("请选择");
			}else{
				$(".trigger1").text(dataList.diabetesType);
			}
			if (dataList.diabetesTime == null) {
				$(".trigger2").text("请选择");
			} else{
				$(".trigger2").text(dataList.diabetesTime);
			}
			if (dataList.diabetesWay == null) {
				$(".trigger3").text("请选择");
			} else{
				$(".trigger3").text(dataList.diabetesWay);
			}			
		},
		error: function(data){
			console.log(data);
		}
	});
	//保存数据
	$(".click").click(function(){
		$.ajax({
			type:"get",
			url: config + "/oa/patinfo/updateDiseases",
			async:true,
			data:{
				"id": eleId,
				"diabetesType": $(".trigger1").text(),
				"diabetesTime": $(".trigger2").text(),
				"diabetesWay": $(".trigger3").text()
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
})
