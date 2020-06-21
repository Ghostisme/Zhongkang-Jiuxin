$(document).ready(function(){	
	$("#sumbitBtn").click(function(){
		var sendObj = {};
		var user = JSON.parse(sessionStorage.getItem("user"));
		console.log(user);
		// inputId 录入人ID inputName 录入人名字 inputMobile 录入人手机
		sendObj.inputId = user.id;
		sendObj.inputName = user.userName;
		sendObj.inputMobile = user.mobile;
		//医院参数		
		var hospitalName = $("#applyHos").find("option:selected").attr("data-name");
		sendObj.hospitalName = hospitalName;
		sendObj.hospitalId = $("#applyHos").val();
		var hospitalIdFlag = formFull("#applyHos", "医院名称");
		if (hospitalIdFlag == true) {
			return;
		}
		//设备参数
//		sendObj.deviceId = $("#equipmentType").val();
//		var deviceName = $("#equipmentType").find("option:selected").attr("data-name");
//		sendObj.deviceName = deviceName;
//		var deviceModel = $("#equipmentType1").find("option:selected").attr("data-name");
//		sendObj.deviceModel = deviceModel;
//		var deviceType = $("#equipmentType2").find("option:selected").attr("data-name");
//		var deviceType = $("#equipmentType2").val();
//		sendObj.deviceType = deviceType;
		sendObj.deviceId = $("#deviceType").val();
//		sendObj.deviceName = $("#deviceModel").val();
		sendObj.deviceModel = $("#deviceName").val();
		sendObj.deviceType = $("#deviceId").val();
//		var deviceIdFlag = formFull("#deviceType", "设备类型");
//		if (deviceIdFlag == true) {
//			return;
//		}
		//患者姓名参数
		sendObj.patientName = $("#patientName").val();
//		var patientNameFlag = formFull("#patientName", "患者姓名");
//		if (patientNameFlag == true) {
//			return;
//		}
		//患者性别参数
		sendObj.patientSex = $("#patientSex").val();
//		var patientSexFlag = formFull("#patientSex", "患者性别");
//		if (patientSexFlag == true) {
//			return;
//		}
		//患者年龄参数
		sendObj.patientAge = $("#patientAge").val();
//		var patientAgeFlag = formFull("#patientAge", "患者年龄");
//		if (patientAgeFlag == true) {
//			return;
//		}
		//检查号参数
		sendObj.checkCode = $("#checkCode").val();
//		var checkCodeFlag = formFull("#checkCode", "检查号");
//		if (checkCodeFlag == true) {
//			return;
//		}
		//检查项目参数
		sendObj.inspectId = $("#inspectId").val();
		sendObj.inspectName = $("#inspectName1").val();
//		var inspectIdFlag = formFull("#inspectId", "检查项目");
//		if (inspectIdFlag == true) {
//			return;
//		}
//		var inspectName = $("#inspectName").find("option:selected").attr("data-name");
//		sendObj.inspectName = inspectName;
		
//		sendObj.inspectId = $("#inspectName").val();
		//应收金额参数
		sendObj.shouldPrice = $("#shouldPrice").val();
		//实收金额参数
		sendObj.factPrice = $("#factPrice").val();
//		var factPriceFlag = formFull("#factPrice", "实收金额");
//		if (factPriceFlag == true) {
//			return;
//		}
		//开单医生
		sendObj.billingDoctor = $("#billingDoctor").val();
		//操作医生
		sendObj.operationDoctor = $("#operationDoctor").val();
		//诊断医生
		sendObj.diagnosticDoctor = $("#diagnosticDoctor").val();
		//检查时间参数
		var checkTime = $("#checkTime").val().trim();
//		var checkTimeFlag = formFull("#checkTime", "检查时间");
//		if (checkTimeFlag == true) {
//			return;
//		}
//		console.log(checkTime)
//		var checkTime = $("#checkTime").val();
//		checkTime = new Date(checkTime);
		sendObj.checkTime = checkTime;
		//备注参数
		sendObj.memo = $("#memo").val();
//		console.log(sendObj)
//		for(var i in sendObj){
//			if (sendObj[i] == null || sendObj[i] == undefined || sendObj[i] == "") {
//				if(sendObj[i] == sendObj.inputMobile){
//					sendObj.inputMobile = user.phone;				
//				}else{
//					alert("数据不可为空!");
//					return;
//				}
//			}
//		};
//	if($("#applyHos").val()==""||$("#applyHos").val()==null){
//			alert("医院不可为空!");
//			return;
//		}
//			
//	});
		console.log(sendObj)
		ajaxGet("/operate/hospitalInfo/save", sendObj, function(data){
			console.log(data);
			if (data.status == "0") {
				alert(data.message);
				setTimeout(function(){ 
	            	parent.$(window.parent.document).find(".layui-layer-close").click();
	            }, 2000);
	            RefreshIframe("page/operationDataAdmin/hosMemberPush/hosMemberPushList.html","YYSJGL_YYYYXXWH");
			}else{
				alert(data.message);
			}
		})	
	})
})
//非空验证
function formFull(dom, labelText){
	var resVal = $(dom).val();	
	if (resVal == "") {
		alert(labelText + "不可为空！");
		return true;
	}
};
