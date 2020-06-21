$(document).ready(function(){
	$("#sumbitBtn").click(function(){
//		$("#sumbitBtn").attr("disabled",true);
		console.log("----------")
		console.log(window.startTime)
		console.log(window.endTime)
		var sendObj = {};
		var user = JSON.parse(sessionStorage.getItem("user"));
		console.log(user);
		sendObj.hospitalId = $("#applyHos").val();
		//设备参数
		sendObj.deviceType = $("#equipmentType").val();
//		var deviceName = $("#equipmentType").find("option:selected").attr("data-name");
//		sendObj.deviceName = deviceName;
		var deviceModel = $("#equipmentType1").find("option:selected").attr("data-name");
		sendObj.deviceModel = deviceModel;
		//医院参数
		var deviceId= $("#equipmentType2").find("option:selected").attr("data-name");
		sendObj.deviceId = deviceId;
		//核算周期
		sendObj.returnBeginDate = window.startTime;
		sendObj.returnEndDate = window.endTime;
//		beginDate = new Date(beginDate);
//		sendObj.returnBeginDate = beginDate;
		//检查量
		sendObj.checkCode = $("#checkNum").val();

		//应收金额参数
		sendObj.returnShouldFee = $("#shouldPrice").val();
		//实收金额参数
		sendObj.returnFactFee  = $("#factPrice").val();
		//回款时间参数
	 	sendObj.returnTime =$("#returnTime").val();
	 	//成本
	 	sendObj.cost=$("#cost").val();
		//毛利 1应收汇款-成本； 2应收=毛利
	 	sendObj.num=$("#grossProfit").val();
		
		//备注参数
		sendObj.memo = $("#memo").val();
		console.log(sendObj)
//		for(var i in sendObj){
//			if (sendObj[i] == null || sendObj[i] == undefined || sendObj[i] == "") {
//				if(sendObj[i] == sendObj.inputMobile){
//					returndeviceType
//				}else{
//					alert("数据不可为空!");
//					return;
//				}
//			}
//		};
		console.log()
		

			if($("#applyHos").val() == "" || $("#applyHos").val() == null) {
						$("#applyHosError").css("display", "block")
						return;
			} else {
						$("#applyHosError").css("display", "none")
			}
			if($("#equipmentType2").val() == "" || $("#equipmentType2").val() == null) {
						$("#equipmentType2Error").css("display", "block")
						return;
			} else {
						$("#equipmentType2Error").css("display", "none")
			}
		if(window.startTime==undefined){ 
			$("#starTimeError").css("display", "block")
			return;
			}
		else {
						$("#starTimeError").css("display", "none")
			}
		if($("#returnTime").val()==""||$("#returnTime").val()==null){
			if($("#returnTime").val() == "" || $("#returnTime").val() == null) {
						$("#returnTimeError").css("display", "block")
			} else {
						$("#returnTimeError").css("display", "none")
			}
			return;
		}
		if($("#shouldPrice").val()==""||$("#shouldPrice").val()==null){
			if($("#shouldPrice").val() == "" || $("#shouldPrice").val() == null) {
						$("#shouldPriceError").css("display", "block")
					} else {
						$("#shouldPriceError").css("display", "none")
					}
			return;
		}
		if($("#factPrice").val() == "" || $("#factPrice").val() == null) {
						$("#factPriceError").css("display", "block")
						return;
					} else {
						$("#factPriceError").css("display", "none")
					}
		if($("#cost").val() == "" || $("#cost").val() == null) {
						$("#costError").css("display", "block")
						return false;
					} else {
						$("#costError").css("display", "none")
					}
		if($("#grossProfit").val()==""||$("#grossProfit").val()==null){
			alert("请选择毛利计算方式");
			return;
		}
		ajaxGet('/operate/jiuyueInfo/save',sendObj,function(data){
				console.log(data);
				if (data.status == "0") {
					alert(data.message);
					setTimeout(function(){ 
                    	parent.$(window.parent.document).find(".layui-layer-close").click();
                    }, 300);
                    RefreshIframe("page/operationDataAdmin/jyMemberPush/jyMemberList.html","YYSJGL_JYYYXXWH");  //标签配置Id
                    
				}else{
					alert(data.message);
				}
		})
	});
})
